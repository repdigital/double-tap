'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { generateMonthlyReturnsData } from '@/lib/mock-data'

interface MonthlyHeatmapProps {
  height?: number
}

export function MonthlyHeatmap({ height = 400 }: MonthlyHeatmapProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [hoveredCell, setHoveredCell] = useState<{ year: number; month: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  // Generate data once on mount to avoid hydration mismatch
  const data = useMemo(() => generateMonthlyReturnsData(), [])
  const years = useMemo(() => [...new Set(data.map(d => d.year))].sort(), [data])
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    setMounted(true)
  }, [])

  // Get return for specific year/month
  const getReturn = (year: number, month: number) => {
    const item = data.find(d => d.year === year && d.month === month)
    return item?.return || null
  }

  // Color scale function
  const getColor = (value: number | null): string => {
    if (value === null) return isDark ? '#2A2A2A' : '#F5F5F5'

    if (value > 10) return isDark ? '#04A04E' : '#03873E'
    if (value > 5) return isDark ? '#059669' : '#059669'
    if (value > 2) return isDark ? '#10B981' : '#10B981'
    if (value > 0) return isDark ? '#34D399' : '#6EE7B7'
    if (value === 0) return isDark ? '#525252' : '#D4D4D4'
    if (value > -3) return isDark ? '#FCA5A5' : '#FCA5A5'
    if (value > -5) return isDark ? '#F87171' : '#F87171'
    return isDark ? '#EF4444' : '#DC2626'
  }

  if (!mounted) {
    return (
      <div className="w-full skeleton rounded-xl" style={{ height: `${height}px` }} />
    )
  }

  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      <div className="h-full flex flex-col">
        {/* Month labels */}
        <div className="grid grid-cols-[60px_repeat(12,1fr)] gap-1 mb-2">
          <div className="text-xs text-muted-foreground" />
          {months.map((month) => (
            <div key={month} className="text-xs text-center text-muted-foreground font-mono">
              {month}
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="flex-1 flex flex-col gap-1">
          {years.map((year) => (
            <div key={year} className="grid grid-cols-[60px_repeat(12,1fr)] gap-1 flex-1">
              {/* Year label */}
              <div className="text-xs text-muted-foreground font-mono flex items-center">
                {year}
              </div>

              {/* Month cells */}
              {[...Array(12)].map((_, monthIndex) => {
                const month = monthIndex + 1
                const returnValue = getReturn(year, month)
                const isHovered = hoveredCell?.year === year && hoveredCell?.month === month

                return (
                  <div
                    key={`${year}-${month}`}
                    className="relative rounded transition-all duration-200 cursor-pointer"
                    style={{
                      backgroundColor: getColor(returnValue),
                      transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                      zIndex: isHovered ? 10 : 1,
                    }}
                    onMouseEnter={() => setHoveredCell({ year, month })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && returnValue !== null && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-20">
                        <div className="text-xs font-mono">
                          <div className="text-muted-foreground mb-1">
                            {months[monthIndex]} {year}
                          </div>
                          <div className={`font-semibold ${returnValue > 0 ? 'text-primary' : 'text-destructive'}`}>
                            {returnValue > 0 ? '+' : ''}{returnValue.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-2 mt-4 text-xs text-muted-foreground">
          <span>-8%</span>
          <div className="flex gap-0.5">
            {[-8, -5, -2, 0, 2, 5, 10].map((val) => (
              <div
                key={val}
                className="w-4 h-4 rounded-sm"
                style={{ backgroundColor: getColor(val) }}
              />
            ))}
          </div>
          <span>+10%</span>
        </div>
      </div>
    </div>
  )
}

export default MonthlyHeatmap
