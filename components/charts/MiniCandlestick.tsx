'use client'

import React, { useEffect, useRef } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getMinimalTheme, getCandlestickSeriesStyle } from '@/lib/tradingview-themes'
import { CandlestickData } from '@/lib/mock-data'

interface MiniCandlestickProps {
  data: CandlestickData[]
  height?: number
}

export function MiniCandlestick({ data, height = 100 }: MiniCandlestickProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      ...getMinimalTheme(isDark),
      width: chartContainerRef.current.clientWidth,
      height,
    })

    chartRef.current = chart

    const candlestickSeries = chart.addCandlestickSeries(getCandlestickSeriesStyle(isDark))
    candlestickSeries.setData(data as any)

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
  }, [data, height, isDark])

  return (
    <div
      ref={chartContainerRef}
      className="w-full"
      style={{ height: `${height}px` }}
    />
  )
}
