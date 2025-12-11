'use client'

import { useMemo } from 'react'
import { MetricCard } from '../metrics/MetricCard'
import { MetricsGrid } from '../metrics/MetricsGrid'
import { CompleteTrade } from '@/lib/analytics/types'

interface StatisticsTabProps {
  completeTrades: CompleteTrade[]
}

export function StatisticsTab({ completeTrades }: StatisticsTabProps) {
  const stats = useMemo(() => {
    if (completeTrades.length === 0) {
      return {
        mean: 0,
        median: 0,
        stdDev: 0,
        variance: 0,
        skewness: 0,
        kurtosis: 0,
        q1: 0,
        q3: 0,
        iqr: 0,
        min: 0,
        max: 0,
        range: 0
      }
    }

    const returns = completeTrades.map(t => t.netPnLPercent).sort((a, b) => a - b)
    const n = returns.length

    // Mean
    const mean = returns.reduce((sum, r) => sum + r, 0) / n

    // Median
    const median = n % 2 === 0
      ? (returns[n / 2 - 1] + returns[n / 2]) / 2
      : returns[Math.floor(n / 2)]

    // Standard Deviation & Variance
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / n
    const stdDev = Math.sqrt(variance)

    // Skewness
    const skewness = returns.reduce((sum, r) => sum + Math.pow((r - mean) / stdDev, 3), 0) / n

    // Kurtosis
    const kurtosis = returns.reduce((sum, r) => sum + Math.pow((r - mean) / stdDev, 4), 0) / n - 3

    // Quartiles
    const q1Index = Math.floor(n * 0.25)
    const q3Index = Math.floor(n * 0.75)
    const q1 = returns[q1Index]
    const q3 = returns[q3Index]
    const iqr = q3 - q1

    // Range
    const min = returns[0]
    const max = returns[n - 1]
    const range = max - min

    return { mean, median, stdDev, variance, skewness, kurtosis, q1, q3, iqr, min, max, range }
  }, [completeTrades])

  return (
    <div className="space-y-12">
      {/* Descriptive Statistics */}
      <Section title="Descriptive Statistics" description="Core statistical measures">
        <MetricsGrid columns={3}>
          <MetricCard label="Mean Return" value={stats.mean} format="percent" />
          <MetricCard label="Median Return" value={stats.median} format="percent" />
          <MetricCard label="Standard Deviation" value={stats.stdDev} format="percent" />
          <MetricCard label="Variance" value={stats.variance} format="number" />
          <MetricCard label="Minimum" value={stats.min} format="percent" />
          <MetricCard label="Maximum" value={stats.max} format="percent" />
          <MetricCard label="Range" value={stats.range} format="percent" />
        </MetricsGrid>
      </Section>

      {/* Distribution Shape */}
      <Section title="Distribution Shape" description="Skewness and kurtosis">
        <MetricsGrid columns={2}>
          <MetricCard
            label="Skewness"
            value={stats.skewness}
            format="number"
            trend={stats.skewness > 0 ? 'up' : stats.skewness < 0 ? 'down' : 'neutral'}
          />
          <MetricCard
            label="Kurtosis"
            value={stats.kurtosis}
            format="number"
            trend={stats.kurtosis > 0 ? 'up' : stats.kurtosis < 0 ? 'down' : 'neutral'}
          />
        </MetricsGrid>
        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <div className="space-y-2 text-sm text-[var(--analytics-text-secondary)]">
            <p><strong>Skewness:</strong> {
              stats.skewness > 0.5 ? 'Positively skewed (more large wins)'
                : stats.skewness < -0.5 ? 'Negatively skewed (more large losses)'
                  : 'Approximately symmetric'
            }</p>
            <p><strong>Kurtosis:</strong> {
              stats.kurtosis > 1 ? 'Heavy tails (more extreme outcomes)'
                : stats.kurtosis < -1 ? 'Light tails (fewer extreme outcomes)'
                  : 'Normal distribution'
            }</p>
          </div>
        </div>
      </Section>

      {/* Quartile Analysis */}
      <Section title="Quartile Analysis" description="Quartiles and interquartile range">
        <MetricsGrid columns={3}>
          <MetricCard label="Q1 (25th percentile)" value={stats.q1} format="percent" />
          <MetricCard label="Q2 (Median)" value={stats.median} format="percent" />
          <MetricCard label="Q3 (75th percentile)" value={stats.q3} format="percent" />
          <MetricCard label="Interquartile Range" value={stats.iqr} format="percent" />
        </MetricsGrid>
      </Section>

      {/* Summary */}
      <Section title="Statistical Summary">
        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <p className="text-[var(--analytics-text-secondary)]">
            Statistical analysis based on {completeTrades.length} complete trades.
            All metrics update in real-time based on active filters.
          </p>
        </div>
      </Section>
    </div>
  )
}

function Section({
  title,
  description,
  children
}: {
  title: string
  description?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-[var(--analytics-text-primary)]">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-[var(--analytics-text-muted)] mt-1">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  )
}
