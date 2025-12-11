'use client'

import React, { useState, useEffect, useMemo } from 'react'
import { useTheme } from 'next-themes'
import { getStaticMonthlyReturns } from '@/lib/transparency-data'

interface MonthlyHeatmapProps {
  height?: number
}

export function MonthlyHeatmap({ height = 400 }: MonthlyHeatmapProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'
  const [hoveredCell, setHoveredCell] = useState<{ year: number; month: number } | null>(null)
  const [mounted, setMounted] = useState(false)

  // Use static data (consistent, doesn't change)
  const data = useMemo(() => getStaticMonthlyReturns(), [])
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  useEffect(() => {
    setMounted(true)
  }, [])

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
      <div className="h-full flex flex-col justify-between py-4">
        {/* 2x6 Grid - Last 12 Months */}
        <div className="flex-1 flex flex-col gap-3">
          {/* Row 1 - Months 1-6 */}
          <div className="grid grid-cols-6 gap-2 flex-1">
            {data.slice(0, 6).map((item, idx) => {
              const isHovered = hoveredCell?.year === item.year && hoveredCell?.month === item.month

              return (
                <div
                  key={`${item.year}-${item.month}`}
                  className="relative rounded-lg transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-2"
                  style={{
                    backgroundColor: getColor(item.return),
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredCell({ year: item.year, month: item.month })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <div className="text-[10px] font-mono text-white/60 mb-1">
                    {months[item.month]}
                  </div>
                  <div className="text-xs font-mono font-semibold text-white">
                    {item.return > 0 ? '+' : ''}{item.return.toFixed(1)}%
                  </div>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-20">
                      <div className="text-xs font-mono">
                        <div className="text-muted-foreground mb-1">
                          {months[item.month]} {item.year}
                        </div>
                        <div className={`font-semibold ${item.return > 0 ? 'text-primary' : 'text-destructive'}`}>
                          {item.return > 0 ? '+' : ''}{item.return.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Row 2 - Months 7-12 */}
          <div className="grid grid-cols-6 gap-2 flex-1">
            {data.slice(6, 12).map((item, idx) => {
              const isHovered = hoveredCell?.year === item.year && hoveredCell?.month === item.month

              return (
                <div
                  key={`${item.year}-${item.month}`}
                  className="relative rounded-lg transition-all duration-200 cursor-pointer flex flex-col items-center justify-center p-2"
                  style={{
                    backgroundColor: getColor(item.return),
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    zIndex: isHovered ? 10 : 1,
                  }}
                  onMouseEnter={() => setHoveredCell({ year: item.year, month: item.month })}
                  onMouseLeave={() => setHoveredCell(null)}
                >
                  <div className="text-[10px] font-mono text-white/60 mb-1">
                    {months[item.month]}
                  </div>
                  <div className="text-xs font-mono font-semibold text-white">
                    {item.return > 0 ? '+' : ''}{item.return.toFixed(1)}%
                  </div>

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card border border-border rounded-lg shadow-lg whitespace-nowrap z-20">
                      <div className="text-xs font-mono">
                        <div className="text-muted-foreground mb-1">
                          {months[item.month]} {item.year}
                        </div>
                        <div className={`font-semibold ${item.return > 0 ? 'text-primary' : 'text-destructive'}`}>
                          {item.return > 0 ? '+' : ''}{item.return.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
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
