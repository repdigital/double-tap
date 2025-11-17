'use client'

import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getLightTheme, getDarkTheme, getAreaSeriesStyle } from '@/lib/tradingview-themes'
import { generateEquityCurveData } from '@/lib/mock-data'

interface EquityCurveProps {
  height?: number
}

export function EquityCurve({ height = 400 }: EquityCurveProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: chartContainerRef.current.clientWidth,
      height,
    })

    chartRef.current = chart

    // Generate equity curve data
    const { equity, drawdowns } = generateEquityCurveData(365)

    // Sort and deduplicate data to avoid duplicate timestamps
    const sortedEquity = [...equity]
      .sort((a, b) => (a.time as number) - (b.time as number))
      // Remove duplicates, keeping the last value for each timestamp
      .filter((item, index, array) => {
        if (index === array.length - 1) return true
        return item.time !== array[index + 1].time
      })

    // Add area series for equity
    const areaSeries = chart.addAreaSeries({
      ...getAreaSeriesStyle(isDark),
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01,
      },
    })

    areaSeries.setData(sortedEquity as any)

    // Add markers for significant drawdowns
    const markers = drawdowns
      .filter(dd => dd.depth < -8) // Only show drawdowns > 8%
      .map(dd => ({
        time: dd.start as any,
        position: 'belowBar' as const,
        color: isDark ? '#EF4444' : '#DC2626',
        shape: 'arrowDown' as const,
        text: `${dd.depth.toFixed(1)}% drawdown`,
      }))

    areaSeries.setMarkers(markers)

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
    <div
      ref={chartContainerRef}
      className="chart-container w-full"
      style={{ height: `${height}px` }}
    />
  )
}

export default EquityCurve
