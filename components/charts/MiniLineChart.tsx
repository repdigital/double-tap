'use client'

import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getMinimalTheme, getLineSeriesStyle } from '@/lib/tradingview-themes'

interface MiniLineChartProps {
  data: { time: string; value: number }[]
  color?: string
  height?: number
}

export function MiniLineChart({ data, color, height = 80 }: MiniLineChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const lineColor = color || (isDark ? '#04A04E' : '#03873E')

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      ...getMinimalTheme(isDark),
      width: chartContainerRef.current.clientWidth,
      height,
    })

    chartRef.current = chart

    const lineSeries = chart.addLineSeries({
      ...getLineSeriesStyle(lineColor, 2),
      lastValueVisible: false,
      priceLineVisible: false,
    })

    lineSeries.setData(data as any)

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
  }, [data, lineColor, height, isDark])

  return (
    <div
      ref={chartContainerRef}
      className="w-full"
      style={{ height: `${height}px` }}
    />
  )
}
