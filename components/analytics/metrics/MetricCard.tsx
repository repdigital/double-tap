'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import { formatCurrency, formatPercent, formatNumber, formatDuration, getColorClass } from '@/lib/analytics/formatters'
import { MetricFormat, TrendDirection } from '@/lib/analytics/types'

interface MetricCardProps {
  label: string
  value: number | string
  format?: MetricFormat
  trend?: TrendDirection
  change?: number
  className?: string
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

export function MetricCard({
  label,
  value,
  format = 'number',
  trend,
  change,
  className = ''
}: MetricCardProps) {
  const formattedValue = typeof value === 'string'
    ? value
    : format === 'currency'
      ? formatCurrency(value)
      : format === 'percent'
        ? formatPercent(value)
        : format === 'duration'
          ? formatDuration(value)
          : formatNumber(value, 2)

  const valueColor = typeof value === 'number' ? getColorClass(value) : 'text-[var(--analytics-text-primary)]'

  return (
    <motion.div
      variants={fadeInUp}
      className={`
        bg-[var(--analytics-bg-secondary)]
        border border-[var(--analytics-border-primary)]
        rounded-lg
        p-6
        hover:border-[var(--analytics-border-hover)]
        transition-all duration-200
        ${className}
      `}
    >
      {/* Label */}
      <div className="text-xs font-medium text-[var(--analytics-text-muted)] uppercase tracking-wider mb-3">
        {label}
      </div>

      {/* Value */}
      <div className="flex items-end justify-between">
        <div className={`font-mono text-3xl font-semibold ${valueColor}`}>
          {formattedValue}
        </div>

        {/* Trend Indicator */}
        {trend && (
          <div className="flex items-center">
            {trend === 'up' && (
              <TrendingUp className="h-5 w-5 text-[var(--analytics-positive)]" />
            )}
            {trend === 'down' && (
              <TrendingDown className="h-5 w-5 text-[var(--analytics-negative)]" />
            )}
            {trend === 'neutral' && (
              <Minus className="h-5 w-5 text-[var(--analytics-neutral)]" />
            )}
          </div>
        )}
      </div>

      {/* Change indicator */}
      {change !== undefined && (
        <div className={`text-sm mt-2 ${getColorClass(change)}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(2)}% from previous
        </div>
      )}
    </motion.div>
  )
}
