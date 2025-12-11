'use client'

import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getLightTheme, getDarkTheme, getHistogramSeriesStyle } from '@/lib/tradingview-themes'
import { getStaticDistribution, getStaticEquityCurve } from '@/lib/transparency-data'

interface DistributionChartProps {
  height?: number
}

export function DistributionChart({ height = 400 }: DistributionChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Calculate stats from equity curve
  const { equity } = getStaticEquityCurve()
  const dailyReturns: number[] = []
  for (let i = 1; i < equity.length; i++) {
    const dailyReturn = ((equity[i].value - equity[i-1].value) / equity[i-1].value) * 100
    dailyReturns.push(dailyReturn)
  }

  const mean = dailyReturns.length > 0 ? dailyReturns.reduce((sum, r) => sum + r, 0) / dailyReturns.length : 0
  const sortedReturns = [...dailyReturns].sort((a, b) => a - b)
  const median = sortedReturns.length > 0 ? sortedReturns[Math.floor(sortedReturns.length / 2)] : 0
  const variance = dailyReturns.length > 0 ? dailyReturns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / dailyReturns.length : 0
  const stdDev = Math.sqrt(variance)

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: chartContainerRef.current.clientWidth,
      height,
      timeScale: {
        visible: false, // Hide time scale since we're showing distribution bins
      },
    })

    chartRef.current = chart

    // Use static distribution data (consistent, doesn't change)
    const distributionData = getStaticDistribution()

    // Add histogram series
    const histogramSeries = chart.addHistogramSeries({
      color: isDark ? '#04A04E' : '#03873E',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'left',
    })

    // Format data for TradingView (use index-based "dates")
    const baseDate = new Date('2024-01-01')
    const formattedData = distributionData.map((d, index) => ({
      time: new Date(baseDate.getTime() + index * 86400000).toISOString().split('T')[0] as any,
      value: d.count,
      color: d.bin > 0
        ? (isDark ? '#04A04E' : '#03873E')
        : d.bin < 0
        ? (isDark ? '#EF4444' : '#DC2626')
        : (isDark ? '#525252' : '#A3A3A3')
    }))

    histogramSeries.setData(formattedData)

    chart.timeScale().fitContent()

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [isDark, height])

  return (
    <div className="space-y-4">
      <div
        ref={chartContainerRef}
        className="chart-container w-full"
        style={{ height: `${height}px` }}
      />

      {/* Stats below chart */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <div className="font-mono text-sm text-primary font-semibold">
            {mean >= 0 ? '+' : ''}{mean.toFixed(2)}%
          </div>
          <div className="text-xs text-muted-foreground">Mean Return</div>
        </div>
        <div>
          <div className="font-mono text-sm text-foreground font-semibold">
            {median >= 0 ? '+' : ''}{median.toFixed(2)}%
          </div>
          <div className="text-xs text-muted-foreground">Median Return</div>
        </div>
        <div>
          <div className="font-mono text-sm text-foreground font-semibold">
            {stdDev.toFixed(2)}%
          </div>
          <div className="text-xs text-muted-foreground">Std Deviation</div>
        </div>
      </div>
    </div>
  )
}

export default DistributionChart
