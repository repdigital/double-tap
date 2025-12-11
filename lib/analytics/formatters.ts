/**
 * Value Formatting Utilities
 * Format numbers, currencies, percentages, dates, etc.
 */

import { MetricFormat } from './types'

/**
 * Format currency value
 */
export function formatCurrency(value: number, compact: boolean = false): string {
  if (compact && Math.abs(value) >= 1000) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value)
}

/**
 * Format percentage value
 */
export function formatPercent(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(decimals)}%`
}

/**
 * Format number with thousands separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Format duration (hours)
 */
export function formatDuration(hours: number): string {
  if (hours < 1) {
    return `${Math.round(hours * 60)}m`
  }

  if (hours < 24) {
    return `${hours.toFixed(1)}h`
  }

  const days = Math.floor(hours / 24)
  const remainingHours = Math.round(hours % 24)

  if (remainingHours === 0) {
    return `${days}d`
  }

  return `${days}d ${remainingHours}h`
}

/**
 * Format date
 */
export function formatDate(date: Date, format: 'short' | 'medium' | 'long' = 'short'): string {
  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date)
  }

  if (format === 'medium') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date)
  }

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

/**
 * Format time only
 */
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date)
}

/**
 * Format value based on type
 */
export function formatValue(value: number | string, format: MetricFormat): string {
  if (typeof value === 'string') return value

  switch (format) {
    case 'currency':
      return formatCurrency(value)

    case 'percent':
      return formatPercent(value)

    case 'duration':
      return formatDuration(value)

    case 'date':
      return formatDate(new Date(value))

    default:
      return formatNumber(value, 2)
  }
}

/**
 * Format large number with K, M, B suffixes
 */
export function formatCompact(value: number): string {
  if (Math.abs(value) < 1000) {
    return formatNumber(value, 0)
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1
  }).format(value)
}

/**
 * Format pips
 */
export function formatPips(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)} pips`
}

/**
 * Format ratio (e.g., 2.5:1)
 */
export function formatRatio(value: number): string {
  return `${value.toFixed(2)}:1`
}

/**
 * Get color class for value
 */
export function getColorClass(value: number): string {
  if (value > 0) return 'text-[var(--analytics-positive)]'
  if (value < 0) return 'text-[var(--analytics-negative)]'
  return 'text-[var(--analytics-neutral)]'
}

/**
 * Format metric label (convert camelCase to Title Case)
 */
export function formatLabel(key: string): string {
  // Handle special cases
  const specialCases: Record<string, string> = {
    pnl: 'P&L',
    roi: 'ROI',
    aum: 'AUM',
    var: 'VaR',
    cvar: 'CVaR',
    mae: 'MAE',
    mfe: 'MFE',
    sharpeRatio: 'Sharpe Ratio',
    sortinoRatio: 'Sortino Ratio',
    calmarRatio: 'Calmar Ratio',
    riskOfRuin: 'Risk of Ruin'
  }

  if (specialCases[key]) {
    return specialCases[key]
  }

  // Convert camelCase to Title Case
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}
