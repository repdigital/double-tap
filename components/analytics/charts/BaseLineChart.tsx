'use client'

import { useTheme } from 'next-themes'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TimeSeriesData } from '@/lib/analytics/types'

interface BaseLineChartProps {
  data: TimeSeriesData[]
  title: string
  description?: string
  yAxisLabel?: string
  color?: string
  height?: number
  formatValue?: (value: number) => string
  showGrid?: boolean
}

export function BaseLineChart({
  data,
  title,
  description,
  yAxisLabel,
  color,
  height = 300,
  formatValue = (v) => v.toFixed(2),
  showGrid = true
}: BaseLineChartProps) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  const lineColor = color || (isDark ? '#03873E' : '#04A04E')
  const gridColor = isDark ? '#E5E5E5' : '#2A2A2A'
  const textColor = isDark ? '#0A0A0A' : '#FFFFFF'

  const chartData = data.map((d, idx) => ({
    index: idx,
    value: d.value,
    time: new Date(d.time).toLocaleDateString()
  }))

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
        <LineChart data={chartData}>
          {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />}
          <XAxis
            dataKey="index"
            tick={{ fill: textColor, fontSize: 12 }}
            stroke={gridColor}
            tickFormatter={(value) => chartData[value]?.time || ''}
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
            labelFormatter={(value) => chartData[value]?.time || ''}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
