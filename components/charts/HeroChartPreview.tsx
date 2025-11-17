'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart, IChartApi } from 'lightweight-charts'
import { useTheme } from 'next-themes'
import { getLightTheme, getDarkTheme, getAreaSeriesStyle } from '@/lib/tradingview-themes'

export default function HeroChartPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  // Client-side mount
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize chart (same pattern as EquityCurve.tsx - THE WORKING ONE!)
  useEffect(() => {
    if (!mounted || !containerRef.current) return

    const chart = createChart(containerRef.current, {
      ...(isDark ? getDarkTheme() : getLightTheme()),
      width: containerRef.current.clientWidth,  // RESPONSIVE!
      height: 220,
      // Minimal overrides for hero
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        timeVisible: false,
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
    })

    chartRef.current = chart

    // Add area series using theme helper (CONSISTENT!)
    const areaSeries = chart.addAreaSeries({
      ...getAreaSeriesStyle(isDark),
      priceLineVisible: false,
      lastValueVisible: false,
    })

    // Generate 30 days of upward trending data
    const now = new Date()
    const data = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(now)
      date.setDate(date.getDate() - (30 - i))
      const value = 10000 + i * 80 + (Math.random() - 0.3) * 200
      return {
        time: date.toISOString().split('T')[0],
        value: Math.max(10000, value)
      }
    })

    areaSeries.setData(data as any)
    chart.timeScale().fitContent()

    // Resize handler
    const handleResize = () => {
      if (containerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: containerRef.current.clientWidth,
        })
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
      chartRef.current = null
    }
  }, [isDark, mounted])

  // Update theme (same as other charts)
  useEffect(() => {
    if (!mounted || !chartRef.current) return

    chartRef.current.applyOptions(isDark ? getDarkTheme() : getLightTheme())
  }, [isDark, mounted])

  // Show skeleton while mounting
  if (!mounted) {
    return (
      <div className="w-full h-[220px] skeleton rounded-lg" />
    )
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-[220px]"
      suppressHydrationWarning
    />
  )
}
