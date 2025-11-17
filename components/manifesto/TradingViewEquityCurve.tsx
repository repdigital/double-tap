'use client'

import { useEffect, useRef } from 'react'
import { createChart, IChartApi, UTCTimestamp, ColorType } from 'lightweight-charts'
import { useTheme } from 'next-themes'

interface TradingViewEquityCurveProps {
  data: Array<{ time: string; value: number }>
  isFailure: boolean
}

export const TradingViewEquityCurve = ({ data, isFailure }: TradingViewEquityCurveProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  useEffect(() => {
    if (!chartContainerRef.current) return

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: isDark ? '#6B6B6B' : '#A3A3A3',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
      },
      grid: {
        vertLines: { visible: false },
        horzLines: {
          visible: true,
          color: isDark ? '#2A2A2A' : '#E5E5E5',
          style: 0,
        },
      },
      width: chartContainerRef.current.clientWidth,
      height: 160,
      rightPriceScale: {
        visible: true,
        borderVisible: false,
        scaleMargins: { top: 0.15, bottom: 0.15 },
        textColor: isDark ? '#6B6B6B' : '#A3A3A3',
      },
      timeScale: {
        visible: true,
        borderVisible: false,
        timeVisible: true,
        secondsVisible: false,
        textColor: isDark ? '#6B6B6B' : '#A3A3A3',
      },
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
      handleScroll: false,
      handleScale: false,
    })

    chartRef.current = chart

    // Configure area series based on failure/success
    const areaSeries = chart.addAreaSeries({
      lineColor: isFailure
        ? '#DC2626'
        : (isDark ? '#04A04E' : '#03873E'),
      topColor: isFailure
        ? (isDark ? 'rgba(220, 38, 38, 0.15)' : 'rgba(220, 38, 38, 0.2)')
        : (isDark ? 'rgba(4, 160, 78, 0.25)' : 'rgba(3, 135, 62, 0.3)'),
      bottomColor: isFailure
        ? (isDark ? 'rgba(220, 38, 38, 0.02)' : 'rgba(220, 38, 38, 0.05)')
        : (isDark ? 'rgba(4, 160, 78, 0.05)' : 'rgba(3, 135, 62, 0.08)'),
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: true,
      crosshairMarkerVisible: false,
    })

    // Convert data to TradingView format
    const formattedData = data.map(d => ({
      time: d.time as UTCTimestamp,
      value: d.value
    }))

    areaSeries.setData(formattedData)
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
  }, [data, isFailure, isDark])

  return (
    <div
      ref={chartContainerRef}
      className="w-full"
      style={{
        height: '160px',
        filter: isFailure ? 'saturate(0.7) opacity(0.8)' : 'saturate(1.1)'
      }}
    />
  )
}
