'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { createChart, IChartApi, ISeriesApi, Time } from 'lightweight-charts'
import { TimeSeriesData } from '@/lib/analytics/types'
import { getLightTheme, getDarkTheme, getAreaSeriesStyle } from '@/lib/tradingview-themes'

interface EquityCurveChartProps {
  data: TimeSeriesData[]
  startingBalance: number
  height?: number
  realDataStartIndex?: number
}

export function EquityCurveChart({ data, startingBalance, height = 400 }: EquityCurveChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration
  useEffect(() => {
    setMounted(true)
  }, [])

  // Create and configure chart
  useEffect(() => {
    if (!chartContainerRef.current || !mounted) return

    const isDark = resolvedTheme === 'dark'

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? '#0A0A0A' : '#FFFFFF'
      },
      grid: {
        vertLines: {
          color: isDark ? '#E5E5E5' : '#2A2A2A',
          style: 1,
          visible: true
        },
        horzLines: {
          color: isDark ? '#E5E5E5' : '#2A2A2A',
          style: 1,
          visible: true
        }
      },
      rightPriceScale: {
        borderColor: isDark ? '#D4D4D4' : '#3A3A3A'
      },
      timeScale: {
        borderColor: isDark ? '#D4D4D4' : '#3A3A3A',
        timeVisible: true,
        secondsVisible: false
      }
    })

    // Create area series
    const areaSeries = chart.addAreaSeries({
      ...getAreaSeriesStyle(isDark),
      lineColor: isDark ? '#03873E' : '#04A04E',
      topColor: isDark ? 'rgba(3, 135, 62, 0.4)' : 'rgba(4, 160, 78, 0.4)',
      bottomColor: isDark ? 'rgba(3, 135, 62, 0.0)' : 'rgba(4, 160, 78, 0.0)',
      lineWidth: 2
    })

    // Set data
    const chartData = data.map(d => ({
      time: new Date(d.time).getTime() / 1000 as Time,
      value: d.value
    }))

    areaSeries.setData(chartData)

    // Fit content
    chart.timeScale().fitContent()

    // Store refs
    chartRef.current = chart
    seriesRef.current = areaSeries

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({
          width: chartContainerRef.current.clientWidth
        })
      }
    }

    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, height, mounted, resolvedTheme])

  // Update theme
  useEffect(() => {
    if (!chartRef.current || !mounted) return

    const isDark = resolvedTheme === 'dark'

    chartRef.current.applyOptions({
      ...(isDark ? getDarkTheme() : getLightTheme()),
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? '#0A0A0A' : '#FFFFFF'
      },
      grid: {
        vertLines: {
          color: isDark ? '#E5E5E5' : '#2A2A2A'
        },
        horzLines: {
          color: isDark ? '#E5E5E5' : '#2A2A2A'
        }
      }
    })

    if (seriesRef.current) {
      seriesRef.current.applyOptions({
        lineColor: isDark ? '#03873E' : '#04A04E',
        topColor: isDark ? 'rgba(3, 135, 62, 0.4)' : 'rgba(4, 160, 78, 0.4)',
        bottomColor: isDark ? 'rgba(3, 135, 62, 0.0)' : 'rgba(4, 160, 78, 0.0)'
      })
    }
  }, [resolvedTheme, mounted])

  if (!mounted) {
    return <div style={{ height }} className="bg-[var(--analytics-bg-secondary)] rounded-lg animate-pulse" />
  }

  return (
    <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
      {/* Chart Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-[var(--analytics-text-primary)]">
            Account Equity
          </h3>
          <p className="text-sm text-[var(--analytics-text-muted)]">
            Starting balance: ${startingBalance.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart Container */}
      <div ref={chartContainerRef} className="w-full" />
    </div>
  )
}
