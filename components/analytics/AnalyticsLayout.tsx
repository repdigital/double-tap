'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AnalyticsHeader } from './AnalyticsHeader'
import { FilterPanel } from './filters/FilterPanel'
import { OverviewTab } from './tabs/OverviewTab'
import { AnalysisTab } from './tabs/AnalysisTab'
import { StatisticsTab } from './tabs/StatisticsTab'
import { RiskTab } from './tabs/RiskTab'
import { HistoryTab } from './tabs/HistoryTab'
import {
  TradeRecord,
  CompleteTrade,
  AccountMetrics,
  PerformanceMetrics,
  RiskMetrics,
  TimeSeriesData,
  HourlyStats,
  DayOfWeekStats,
  SignalStats,
  FilterState
} from '@/lib/analytics/types'

interface AnalyticsLayoutProps {
  trades: TradeRecord[]
  completeTrades: CompleteTrade[]
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
  aggregations: {
    hourly: HourlyStats[]
    dayOfWeek: DayOfWeekStats[]
    bySignal: SignalStats[]
  }
  filterState: FilterState
  onFilterChange: (filters: FilterState) => void
  csvMetadata: {
    filename: string
    loadedAt: Date
    totalRecords: number
    dateRange: { start: Date, end: Date }
  }
  hybridMetadata: {
    realDataStartIndex: number
    syntheticDays: number
    realDays: number
  }
}

export function AnalyticsLayout({
  trades,
  completeTrades,
  metrics,
  timeSeries,
  aggregations,
  filterState,
  onFilterChange,
  csvMetadata,
  hybridMetadata
}: AnalyticsLayoutProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-[var(--analytics-bg-primary)]">
      {/* Header */}
      <AnalyticsHeader
        totalTrades={completeTrades.length}
        dateRange={csvMetadata.dateRange}
        totalReturn={metrics.account.totalReturn}
      />

      {/* Filter Panel */}
      <FilterPanel
        filterState={filterState}
        onChange={onFilterChange}
        totalTrades={csvMetadata.totalRecords}
        filteredTrades={trades.length}
      />

      {/* Main Content */}
      <main className="container-wide py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Tab Navigation */}
          <TabsList className="mb-8 bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] p-1">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-[var(--analytics-bg-primary)] data-[state=active]:text-[var(--analytics-positive)]"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analysis"
              className="data-[state=active]:bg-[var(--analytics-bg-primary)] data-[state=active]:text-[var(--analytics-positive)]"
            >
              Analysis
            </TabsTrigger>
            <TabsTrigger
              value="statistics"
              className="data-[state=active]:bg-[var(--analytics-bg-primary)] data-[state=active]:text-[var(--analytics-positive)]"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="data-[state=active]:bg-[var(--analytics-bg-primary)] data-[state=active]:text-[var(--analytics-positive)]"
            >
              Risk
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-[var(--analytics-bg-primary)] data-[state=active]:text-[var(--analytics-positive)]"
            >
              History
            </TabsTrigger>
          </TabsList>

          {/* Tab Content */}
          <TabsContent value="overview" className="mt-0">
            <OverviewTab
              metrics={metrics}
              timeSeries={timeSeries}
              completeTrades={completeTrades}
              hybridMetadata={hybridMetadata}
            />
          </TabsContent>

          <TabsContent value="analysis" className="mt-0">
            <AnalysisTab
              trades={trades}
              completeTrades={completeTrades}
              timeSeries={timeSeries}
              aggregations={aggregations}
            />
          </TabsContent>

          <TabsContent value="statistics" className="mt-0">
            <StatisticsTab completeTrades={completeTrades} />
          </TabsContent>

          <TabsContent value="risk" className="mt-0">
            <RiskTab
              riskMetrics={metrics.risk}
              drawdownTimeSeries={timeSeries.drawdown}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-0">
            <HistoryTab trades={trades} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
