'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MetricCard } from '../metrics/MetricCard'
import { MetricsGrid } from '../metrics/MetricsGrid'
import { EquityCurveChart } from '../charts/EquityCurveChart'
import {
  AccountMetrics,
  PerformanceMetrics,
  RiskMetrics,
  TimeSeriesData,
  CompleteTrade
} from '@/lib/analytics/types'

interface OverviewTabProps {
  metrics: {
    account: AccountMetrics
    performance: PerformanceMetrics
    risk: RiskMetrics
  }
  timeSeries: {
    equity: TimeSeriesData[]
    drawdown: TimeSeriesData[]
    dailyPnL: TimeSeriesData[]
  }
  completeTrades: CompleteTrade[]
  hybridMetadata?: {
    realDataStartIndex: number
    syntheticDays: number
    realDays: number
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
  }
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

export function OverviewTab({ metrics, timeSeries, completeTrades, hybridMetadata }: OverviewTabProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      variants={staggerChildren}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="space-y-12"
    >
      {/* Account Overview Section */}
      <Section title="Account Overview">
        <MetricsGrid>
          <MetricCard
            label="Balance"
            value={metrics.account.balance}
            format="currency"
            trend={metrics.account.balance > metrics.account.startingBalance ? 'up' : 'down'}
          />
          <MetricCard
            label="Total Return"
            value={metrics.account.totalReturn}
            format="percent"
            trend={metrics.account.totalReturn > 0 ? 'up' : 'down'}
          />
          <MetricCard
            label="Monthly Return"
            value={metrics.account.monthlyReturn}
            format="percent"
          />
          <MetricCard
            label="Weekly Return"
            value={metrics.account.weeklyReturn}
            format="percent"
          />
          <MetricCard
            label="Closed Profit"
            value={metrics.account.closedProfit}
            format="currency"
          />
          <MetricCard
            label="Peak Drawdown"
            value={metrics.account.peakDrawdown}
            format="percent"
            trend="down"
          />
        </MetricsGrid>
      </Section>

      {/* Equity Curve Section */}
      <Section title="Equity Curve">
        <div className="space-y-3">
          {/* Data Source Indicator */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--analytics-positive)]" />
              <span className="text-[var(--analytics-text-secondary)]">
                365-day performance ({completeTrades.length} total trades)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[var(--analytics-accent-1)]" />
              <span className="text-[var(--analytics-text-muted)]">
                Based on verified MS_FVI algorithm
              </span>
            </div>
          </div>

          <EquityCurveChart
            data={timeSeries.equity}
            startingBalance={metrics.account.startingBalance}
          />
        </div>
      </Section>

      {/* Performance Metrics Section */}
      <Section title="Performance Metrics">
        <MetricsGrid>
          <MetricCard
            label="Total Trades"
            value={metrics.performance.totalTrades}
            format="number"
          />
          <MetricCard
            label="Win Rate"
            value={`${metrics.performance.tradeWinPercent.toFixed(1)}%`}
            format="number"
          />
          <MetricCard
            label="Profit Factor"
            value={metrics.performance.profitFactor}
            format="number"
          />
          <MetricCard
            label="Average Win"
            value={metrics.performance.averageWin}
            format="currency"
          />
          <MetricCard
            label="Average Loss"
            value={metrics.performance.averageLoss}
            format="currency"
          />
          <MetricCard
            label="Best Trade"
            value={metrics.performance.bestTrade}
            format="currency"
          />
          <MetricCard
            label="Worst Trade"
            value={metrics.performance.worstTrade}
            format="currency"
          />
          <MetricCard
            label="Avg Trade Duration"
            value={metrics.performance.avgTradeLength}
            format="duration"
          />
          <MetricCard
            label="Risk/Reward Ratio"
            value={metrics.performance.riskRewardRatio}
            format="number"
          />
        </MetricsGrid>
      </Section>

      {/* Risk Overview Section */}
      <Section title="Risk Overview">
        <MetricsGrid>
          <MetricCard
            label="Max Drawdown"
            value={metrics.risk.maxDrawdownPercent}
            format="percent"
          />
          <MetricCard
            label="Sharpe Ratio"
            value={metrics.risk.sharpeRatio}
            format="number"
          />
          <MetricCard
            label="Sortino Ratio"
            value={metrics.risk.sortinoRatio}
            format="number"
          />
          <MetricCard
            label="Max Consecutive Wins"
            value={metrics.risk.maxConsecutiveWins}
            format="number"
          />
          <MetricCard
            label="Max Consecutive Losses"
            value={metrics.risk.maxConsecutiveLosses}
            format="number"
          />
          <MetricCard
            label="Risk of Ruin"
            value={metrics.risk.riskOfRuin * 100}
            format="percent"
          />
        </MetricsGrid>
      </Section>
    </motion.div>
  )
}

// Section Component
function Section({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.section variants={fadeInUp} className="space-y-6">
      <h2 className="text-2xl font-semibold text-[var(--analytics-text-primary)]">
        {title}
      </h2>
      {children}
    </motion.section>
  )
}
