'use client'

import { useMemo } from 'react'
import { BaseLineChart } from '../charts/BaseLineChart'
import { BaseColumnChart } from '../charts/BaseColumnChart'
import { DrawdownChart } from '../charts/DrawdownChart'
import { TimeSeriesData, HourlyStats, DayOfWeekStats, CompleteTrade, TradeRecord } from '@/lib/analytics/types'
import {
  generateWeeklyProfitData,
  generateMonthlyProfitData,
  generateCumulativeReturnData,
  generateWinRateOverTime,
  generateProfitFactorOverTime,
  generateReturnDistribution,
  generateDurationProfitScatter,
  generateStreakData,
  generateRollingVolatility,
  generateUnderwaterChart,
  generateMAEMFEData
} from '@/lib/analytics/chartUtils'
import { formatCurrency, formatPercent, formatDuration } from '@/lib/analytics/formatters'

interface AnalysisTabProps {
  trades: TradeRecord[]
  completeTrades: CompleteTrade[]
  timeSeries: {
    equity: TimeSeriesData[]
    drawdown: TimeSeriesData[]
    dailyPnL: TimeSeriesData[]
  }
  aggregations: {
    hourly: HourlyStats[]
    dayOfWeek: DayOfWeekStats[]
  }
}

export function AnalysisTab({ trades, completeTrades, timeSeries, aggregations }: AnalysisTabProps) {
  // Generate all chart data
  const chartData = useMemo(() => ({
    weeklyProfit: generateWeeklyProfitData(trades),
    monthlyProfit: generateMonthlyProfitData(trades),
    cumulativeReturn: generateCumulativeReturnData(trades),
    winRateOverTime: generateWinRateOverTime(completeTrades),
    profitFactorOverTime: generateProfitFactorOverTime(completeTrades),
    returnDistribution: generateReturnDistribution(completeTrades),
    durationProfit: generateDurationProfitScatter(completeTrades),
    streaks: generateStreakData(completeTrades),
    rollingVolatility: generateRollingVolatility(completeTrades),
    underwater: generateUnderwaterChart(trades),
    maeMfe: generateMAEMFEData(trades)
  }), [trades, completeTrades])

  // Prepare data for charts
  const hourlyData = aggregations.hourly.map(h => ({
    name: `${h.hour}:00`,
    value: h.netPnL
  }))

  const dayOfWeekData = aggregations.dayOfWeek.map(d => ({
    name: d.dayName,
    value: d.netPnL
  }))

  const monthlyData = chartData.monthlyProfit.map((d, idx) => ({
    name: new Date(d.time).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
    value: d.value
  }))

  const weeklyData = chartData.weeklyProfit.map((d, idx) => ({
    name: `W${idx + 1}`,
    value: d.value
  }))

  return (
    <div className="space-y-12">
      {/* Profit & Return Charts */}
      <Section title="Profit & Return Analysis" description="Track profitability across different timeframes">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BaseLineChart
            data={timeSeries.dailyPnL}
            title="Daily Profit/Loss"
            yAxisLabel="P&L ($)"
            formatValue={formatCurrency}
          />

          <BaseColumnChart
            data={weeklyData}
            title="Weekly Profit/Loss"
            yAxisLabel="P&L ($)"
            formatValue={formatCurrency}
          />

          <BaseColumnChart
            data={monthlyData}
            title="Monthly Profit/Loss"
            yAxisLabel="P&L ($)"
            formatValue={formatCurrency}
          />

          <BaseLineChart
            data={chartData.cumulativeReturn}
            title="Cumulative Return %"
            yAxisLabel="Return (%)"
            formatValue={formatPercent}
          />
        </div>
      </Section>

      {/* Drawdown & Risk */}
      <Section title="Drawdown & Risk Analysis" description="Understand risk and drawdown patterns">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DrawdownChart
            data={timeSeries.drawdown}
            title="Balance Drawdown %"
          />

          <BaseLineChart
            data={chartData.underwater}
            title="Underwater Equity Chart"
            description="Drawdown from peak equity"
            yAxisLabel="Drawdown (%)"
            formatValue={formatPercent}
            color="#EF4444"
          />

          <BaseLineChart
            data={chartData.profitFactorOverTime}
            title="Profit Factor Over Time"
            description="Rolling profit factor (30-trade window)"
            yAxisLabel="Profit Factor"
          />

          <BaseLineChart
            data={chartData.winRateOverTime}
            title="Win Rate Over Time"
            description="Rolling win rate (30-trade window)"
            yAxisLabel="Win Rate (%)"
            formatValue={formatPercent}
          />
        </div>
      </Section>

      {/* Time-Based Analysis */}
      <Section title="Time-Based Performance" description="Performance by day and hour">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BaseColumnChart
            data={dayOfWeekData}
            title="Performance by Day of Week"
            yAxisLabel="Net P&L ($)"
            formatValue={formatCurrency}
          />

          <BaseColumnChart
            data={hourlyData}
            title="Performance by Hour of Day"
            yAxisLabel="Net P&L ($)"
            formatValue={formatCurrency}
          />
        </div>
      </Section>

      {/* Statistical Distribution */}
      <Section title="Statistical Analysis" description="Distribution and volatility metrics">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BaseColumnChart
            data={chartData.returnDistribution.map(d => ({
              name: d.bin,
              value: d.count
            }))}
            title="Return Distribution"
            description="Frequency of return percentages"
            yAxisLabel="Frequency"
            colorByValue={false}
          />

          <BaseLineChart
            data={chartData.rollingVolatility}
            title="Rolling Volatility (30-day)"
            description="Standard deviation of returns"
            yAxisLabel="Volatility"
            color="#8B5CF6"
          />
        </div>
      </Section>

      {/* Win/Loss Patterns */}
      <Section title="Win/Loss Patterns" description="Streaks and consecutive performance">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BaseLineChart
            data={chartData.streaks.wins}
            title="Consecutive Wins"
            yAxisLabel="Win Streak"
            color="#04A04E"
          />

          <BaseLineChart
            data={chartData.streaks.losses}
            title="Consecutive Losses"
            yAxisLabel="Loss Streak"
            color="#EF4444"
          />
        </div>
      </Section>

      {/* Summary */}
      <Section title="Analysis Summary">
        <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg p-6">
          <p className="text-[var(--analytics-text-secondary)]">
            Analysis based on {trades.length} trade records ({completeTrades.length} complete trades).
            All charts update in real-time based on active filters.
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
