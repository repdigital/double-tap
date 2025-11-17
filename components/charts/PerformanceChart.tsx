'use client'

import React, { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi, ISeriesApi, Time } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getLightTheme, getDarkTheme, getAreaSeriesStyle, getLineSeriesStyle, getHistogramSeriesStyle } from '@/lib/tradingview-themes'
import { generatePerformanceData, generateComparisonData, generateVolumeData } from '@/lib/mock-data'
import { ChartSkeleton } from './ChartSkeleton'
import { Download } from 'lucide-react'

type TimeRange = '24H' | '7D' | '30D' | '90D' | '1Y'

interface PerformanceChartProps {
  height?: number
  showComparison?: boolean
  showVolume?: boolean
  showControls?: boolean
}

export default function PerformanceChart({
  height = 500,
  showComparison = true,
  showVolume = true,
  showControls = true
}: PerformanceChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const areaSeriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const benchmarkSeriesRef = useRef<ISeriesApi<'Line'> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null)

  const [timeRange, setTimeRange] = useState<TimeRange>('30D')
  const [comparisonEnabled, setComparisonEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  const { theme, resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Client-side only mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize chart
  useEffect(() => {
    if (!mounted) return
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: chartContainerRef.current.clientWidth,
      height,
    })

    chartRef.current = chart

    // Add area series for strategy performance
    const areaSeries = chart.addAreaSeries(getAreaSeriesStyle(isDark))
    areaSeriesRef.current = areaSeries

    // Add volume histogram if enabled
    if (showVolume) {
      const volumeSeries = chart.addHistogramSeries(
        getHistogramSeriesStyle(isDark ? '#04A04E' : '#03873E')
      )
      volumeSeriesRef.current = volumeSeries
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    setIsLoading(false)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [isDark, height, showVolume, mounted])

  // Update data based on time range
  useEffect(() => {
    if (!mounted || !areaSeriesRef.current) return

    const days = {
      '24H': 1,
      '7D': 7,
      '30D': 30,
      '90D': 90,
      '1Y': 365
    }[timeRange]

    if (comparisonEnabled && showComparison) {
      const { strategy, benchmark } = generateComparisonData(days)
      areaSeriesRef.current.setData(strategy as any)

      // Add benchmark series if not exists
      if (!benchmarkSeriesRef.current && chartRef.current) {
        const benchmarkSeries = chartRef.current.addLineSeries(
          getLineSeriesStyle(isDark ? '#6B6B6B' : '#A3A3A3', 2)
        )
        benchmarkSeriesRef.current = benchmarkSeries
      }

      if (benchmarkSeriesRef.current) {
        benchmarkSeriesRef.current.setData(benchmark as any)
      }
    } else {
      // Remove benchmark if exists
      if (benchmarkSeriesRef.current && chartRef.current) {
        chartRef.current.removeSeries(benchmarkSeriesRef.current)
        benchmarkSeriesRef.current = null
      }

      const data = generatePerformanceData(days)
      areaSeriesRef.current.setData(data as any)
    }

    if (showVolume && volumeSeriesRef.current) {
      const volumeData = generateVolumeData(days)
      volumeSeriesRef.current.setData(volumeData as any)
    }

    // Fit content
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent()
    }
  }, [timeRange, comparisonEnabled, showComparison, showVolume, isDark])

  // Update theme when it changes
  useEffect(() => {
    if (!mounted || !chartRef.current) return

    chartRef.current.applyOptions(isDark ? getDarkTheme() : getLightTheme())

    if (areaSeriesRef.current) {
      areaSeriesRef.current.applyOptions(getAreaSeriesStyle(isDark))
    }

    if (benchmarkSeriesRef.current) {
      benchmarkSeriesRef.current.applyOptions(
        getLineSeriesStyle(isDark ? '#6B6B6B' : '#A3A3A3', 2)
      )
    }

    if (volumeSeriesRef.current) {
      volumeSeriesRef.current.applyOptions(
        getHistogramSeriesStyle(isDark ? '#04A04E' : '#03873E')
      )
    }
  }, [isDark])

  const handleExport = () => {
    if (!chartRef.current) return

    // Take screenshot of canvas
    const canvas = chartContainerRef.current?.querySelector('canvas')
    if (canvas) {
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `double-tap-performance-${timeRange.toLowerCase()}.png`
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    }
  }

  if (!mounted || isLoading) {
    return <ChartSkeleton height={height} showTitle={false} />
  }

  return (
    <div className="w-full space-y-4">
      {/* Controls */}
      {showControls && (
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Time Range Selector */}
          <div className="flex items-center gap-2">
            {(['24H', '7D', '30D', '90D', '1Y'] as TimeRange[]).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200
                  ${timeRange === range
                    ? 'bg-primary text-primary-foreground shadow-accent'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }
                `}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Comparison & Export */}
          <div className="flex items-center gap-3">
            {showComparison && (
              <button
                onClick={() => setComparisonEnabled(!comparisonEnabled)}
                className={`
                  px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 border
                  ${comparisonEnabled
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary/50'
                  }
                `}
              >
                {comparisonEnabled ? 'Hide' : 'Show'} S&P 500
              </button>
            )}

            <button
              onClick={handleExport}
              className="px-4 py-2 text-sm font-medium rounded-lg border border-border hover:border-primary/50 transition-all duration-200 flex items-center gap-2"
              title="Export chart as PNG"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div
        ref={chartContainerRef}
        className="chart-container w-full"
        style={{ height: `${height}px` }}
      />

      {/* Legend */}
      {showComparison && comparisonEnabled && (
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Double Tap Strategy</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-gray-500' : 'bg-gray-400'}`} />
            <span className="text-muted-foreground">S&P 500 Benchmark</span>
          </div>
        </div>
      )}
    </div>
  )
}
