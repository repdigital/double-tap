'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { createChart, IChartApi, ISeriesApi, Time } from 'lightweight-charts'
import { TimeSeriesData } from '@/lib/analytics/types'
import { getLightTheme, getDarkTheme } from '@/lib/tradingview-themes'

interface DrawdownChartProps {
  data: TimeSeriesData[]
  title: string
  height?: number
}

export function DrawdownChart({ data, title, height = 300 }: DrawdownChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<'Line'> | null>(null)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!chartContainerRef.current || !mounted) return

    const isDark = resolvedTheme === 'dark'

    const chart = createChart(chartContainerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: chartContainerRef.current.clientWidth,
      height,
      layout: {
        background: { color: 'transparent' },
        textColor: isDark ? '#0A0A0A' : '#FFFFFF'
      },
      grid: {
        vertLines: { color: isDark ? '#E5E5E5' : '#2A2A2A', style: 1 },
        horzLines: { color: isDark ? '#E5E5E5' : '#2A2A2A', style: 1 }
      }
    })

    const lineSeries = chart.addLineSeries({
      color: isDark ? '#DC2626' : '#EF4444',
      lineWidth: 2
    })

    const chartData = data.map(d => ({
      time: new Date(d.time).getTime() / 1000 as Time,
      value: d.value
    }))

    lineSeries.setData(chartData)
    chart.timeScale().fitContent()

    chartRef.current = chart
    seriesRef.current = lineSeries

    const handleResize = () => {
      if (chartContainerRef.current && chart) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [data, height, mounted, resolvedTheme])

  if (!mounted) {
    return <div style={{ height }} className="bg-[var(--analytics-bg-secondary)] rounded-lg animate-pulse" />
  }

  return (
    <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
      <h3 className="text-lg font-semibold text-[var(--analytics-text-primary)] mb-4">
        {title}
      </h3>
      <div ref={chartContainerRef} className="w-full" />
    </div>
  )
}
