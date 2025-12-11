'use client'

import { MetricCard } from '../metrics/MetricCard'
import { MetricsGrid } from '../metrics/MetricsGrid'
import { BaseLineChart } from '../charts/BaseLineChart'
import { RiskMetrics, TimeSeriesData } from '@/lib/analytics/types'
import { formatPercent } from '@/lib/analytics/formatters'

interface RiskTabProps {
  riskMetrics: RiskMetrics
  drawdownTimeSeries: TimeSeriesData[]
}

export function RiskTab({ riskMetrics, drawdownTimeSeries }: RiskTabProps) {
  return (
    <div className="space-y-12">
      {/* Drawdown Metrics */}
      <Section title="Drawdown Analysis" description="Peak drawdown and recovery metrics">
        <MetricsGrid columns={3}>
          <MetricCard
            label="Max Drawdown"
            value={riskMetrics.maxDrawdown}
            format="currency"
            trend="down"
          />
          <MetricCard
            label="Max Drawdown %"
            value={riskMetrics.maxDrawdownPercent}
            format="percent"
            trend="down"
          />
          <MetricCard
            label="Max DD Duration (days)"
            value={riskMetrics.maxDrawdownDuration}
            format="number"
          />
          <MetricCard
            label="Current Drawdown"
            value={riskMetrics.currentDrawdown}
            format="percent"
          />
          <MetricCard
            label="Average Drawdown"
            value={riskMetrics.averageDrawdown}
            format="percent"
          />
          <MetricCard
            label="Recovery Factor"
            value={riskMetrics.recoveryFactor}
            format="number"
            trend={riskMetrics.recoveryFactor > 1 ? 'up' : 'down'}
          />
        </MetricsGrid>

        <BaseLineChart
          data={drawdownTimeSeries}
          title="Drawdown Timeline"
          yAxisLabel="Drawdown (%)"
          formatValue={formatPercent}
          color="#EF4444"
        />
      </Section>

      {/* Risk-Adjusted Returns */}
      <Section title="Risk-Adjusted Returns" description="Sharpe, Sortino, and other ratios">
        <MetricsGrid columns={4}>
          <MetricCard
            label="Sharpe Ratio"
            value={riskMetrics.sharpeRatio}
            format="number"
            trend={riskMetrics.sharpeRatio > 1 ? 'up' : 'down'}
          />
          <MetricCard
            label="Sortino Ratio"
            value={riskMetrics.sortinoRatio}
            format="number"
            trend={riskMetrics.sortinoRatio > 1 ? 'up' : 'down'}
          />
          <MetricCard
            label="Calmar Ratio"
            value={riskMetrics.calmarRatio}
            format="number"
            trend={riskMetrics.calmarRatio > 1 ? 'up' : 'down'}
          />
          <MetricCard
            label="Sterling Ratio"
            value={riskMetrics.sterlingRatio}
            format="number"
            trend={riskMetrics.sterlingRatio > 1 ? 'up' : 'down'}
          />
        </MetricsGrid>

        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <div className="space-y-2 text-sm text-[var(--analytics-text-secondary)]">
            <p><strong>Sharpe Ratio:</strong> Measures risk-adjusted returns. {'>'}1.0 is good, {'>'}2.0 is excellent.</p>
            <p><strong>Sortino Ratio:</strong> Like Sharpe but only considers downside volatility.</p>
            <p><strong>Calmar Ratio:</strong> Return divided by maximum drawdown.</p>
            <p><strong>Sterling Ratio:</strong> Return divided by average drawdown.</p>
          </div>
        </div>
      </Section>

      {/* Volatility Metrics */}
      <Section title="Volatility & Variance" description="Standard deviation and variance">
        <MetricsGrid columns={3}>
          <MetricCard
            label="Standard Deviation"
            value={riskMetrics.standardDeviation}
            format="percent"
          />
          <MetricCard
            label="Coefficient of Variation"
            value={riskMetrics.coefficientOfVariation}
            format="number"
          />
          <MetricCard
            label="Ulcer Index"
            value={riskMetrics.ulcerIndex}
            format="number"
          />
        </MetricsGrid>
      </Section>

      {/* Value at Risk */}
      <Section title="Value at Risk (VaR)" description="Potential loss estimates">
        <MetricsGrid columns={2}>
          <MetricCard
            label="VaR (95%)"
            value={riskMetrics.valueAtRisk95}
            format="percent"
          />
          <MetricCard
            label="VaR (99%)"
            value={riskMetrics.valueAtRisk99}
            format="percent"
          />
          <MetricCard
            label="CVaR (95%)"
            value={riskMetrics.conditionalVaR95}
            format="percent"
          />
          <MetricCard
            label="CVaR (99%)"
            value={riskMetrics.conditionalVaR99}
            format="percent"
          />
        </MetricsGrid>

        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <div className="space-y-2 text-sm text-[var(--analytics-text-secondary)]">
            <p><strong>VaR (Value at Risk):</strong> Maximum expected loss at given confidence level.</p>
            <p><strong>CVaR (Conditional VaR):</strong> Average loss beyond the VaR threshold.</p>
          </div>
        </div>
      </Section>

      {/* Consecutive Performance */}
      <Section title="Consecutive Performance" description="Win and loss streaks">
        <MetricsGrid columns={3}>
          <MetricCard
            label="Max Consecutive Wins"
            value={riskMetrics.maxConsecutiveWins}
            format="number"
            trend="up"
          />
          <MetricCard
            label="Max Consecutive Losses"
            value={riskMetrics.maxConsecutiveLosses}
            format="number"
            trend="down"
          />
          <MetricCard
            label="Current Streak"
            value={`${riskMetrics.currentStreak} ${riskMetrics.currentStreakType}s`}
            format="number"
          />
        </MetricsGrid>
      </Section>

      {/* Risk of Ruin */}
      <Section title="Risk Assessment" description="Risk of ruin probability">
        <MetricsGrid columns={1}>
          <MetricCard
            label="Risk of Ruin"
            value={riskMetrics.riskOfRuin * 100}
            format="percent"
            trend={riskMetrics.riskOfRuin < 0.01 ? 'neutral' : 'down'}
          />
        </MetricsGrid>

        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <div className="space-y-2 text-sm text-[var(--analytics-text-secondary)]">
            <p><strong>Risk of Ruin:</strong> Probability of losing all trading capital.</p>
            <p>
              {riskMetrics.riskOfRuin < 0.01
                ? '✅ Very low risk - strategy shows strong edge'
                : riskMetrics.riskOfRuin < 0.05
                  ? '⚠️ Low risk - acceptable for most traders'
                  : riskMetrics.riskOfRuin < 0.20
                    ? '⚠️ Moderate risk - consider reducing position size'
                    : '🚨 High risk - strategy needs improvement'}
            </p>
          </div>
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
