'use client'

import { useTheme } from 'next-themes'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface BaseColumnChartProps {
  data: Array<{ name: string, value: number }>
  title: string
  description?: string
  yAxisLabel?: string
  height?: number
  formatValue?: (value: number) => string
  colorByValue?: boolean
}

export function BaseColumnChart({
  data,
  title,
  description,
  yAxisLabel,
  height = 300,
  formatValue = (v) => v.toFixed(2),
  colorByValue = true
}: BaseColumnChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const positiveColor = isDark ? '#03873E' : '#04A04E'
  const negativeColor = isDark ? '#DC2626' : '#EF4444'
  const gridColor = isDark ? '#E5E5E5' : '#2A2A2A'
  const textColor = isDark ? '#0A0A0A' : '#FFFFFF'

  return (
    <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[var(--analytics-text-primary)]">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-[var(--analytics-text-muted)] mt-1">
            {description}
          </p>
        )}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />
          <XAxis
            dataKey="name"
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={gridColor}
          />
          <YAxis
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={gridColor}
            label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft', fill: textColor } : undefined}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#FFFFFF' : '#1A1A1A',
              border: `1px solid ${gridColor}`,
              borderRadius: '8px',
              color: isDark ? '#0A0A0A' : '#FFFFFF'
            }}
            formatter={(value: any) => [formatValue(value), 'Value']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {colorByValue && data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.value >= 0 ? positiveColor : negativeColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
