'use client'

import { useState, useEffect, useMemo } from 'react'
import { DoubleTapSidebar } from '@/components/double-tap-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { AnalyticsLayout } from '@/components/analytics/AnalyticsLayout'
import { parseCSV, pairTrades, getCSVMetadata, validateTrades } from '@/lib/analytics/csvParser'
import {
  calculateAccountMetrics,
  calculatePerformanceMetrics,
  calculateRiskMetrics,
  generateEquityTimeSeries,
  generateDrawdownTimeSeries,
  generateDailyPnLTimeSeries,
  aggregateByHour,
  aggregateByDayOfWeek,
  aggregateBySignal
} from '@/lib/analytics/tradeCalculations'
import { applyFilters } from '@/lib/analytics/filterEngine'
import { createYearLongDataset, analyzeTradingCharacteristics } from '@/lib/analytics/tradeGenerator'
import { TradeRecord, CompleteTrade, FilterState, DEFAULT_FILTERS } from '@/lib/analytics/types'

export default function AnalyticsPage() {
  // Year-long dataset (synthetic + real MS_FVI trades)
  const [rawTrades, setRawTrades] = useState<TradeRecord[]>([])
  const [completeTrades, setCompleteTrades] = useState<CompleteTrade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filter state
  const [filterState, setFilterState] = useState<FilterState>(DEFAULT_FILTERS)

  // CSV metadata
  const [csvMetadata, setCsvMetadata] = useState({
    filename: 'MS_FVI_TReset_CME_MINI_NQ1!_2025-11-16_fb372.csv',
    loadedAt: new Date(),
    totalRecords: 0,
    dateRange: { start: new Date(), end: new Date() }
  })

  // Load MS_FVI data and generate full year
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        setError(null)

        // Load MS_FVI CSV file
        const response = await fetch('/MS_FVI_TReset_CME_MINI_NQ1!_2025-11-16_fb372.csv')

        if (!response.ok) {
          throw new Error(`Failed to load CSV: ${response.statusText}`)
        }

        const csvText = await response.text()

        // Parse real MS_FVI trades
        const realTrades = parseCSV(csvText)
        const validation = validateTrades(realTrades)

        if (!validation.valid) {
          console.warn('CSV validation warnings:', validation.errors)
        }

        // Generate full year dataset (325 days synthetic + 40 days real MS_FVI)
        const yearLongTrades = createYearLongDataset(realTrades, 365)

        // Pair all trades
        const paired = pairTrades(yearLongTrades)

        // Get metadata
        const metadata = getCSVMetadata(yearLongTrades, csvMetadata.filename)

        // Update state
        setRawTrades(yearLongTrades)
        setCompleteTrades(paired)
        setCsvMetadata(metadata)

        const realCount = realTrades.length / 2
        const syntheticCount = (yearLongTrades.length - realTrades.length) / 2

        console.log(
          `Generated full year: ${syntheticCount} synthetic trades + ${realCount} real MS_FVI trades = ${paired.length} total trades`
        )
      } catch (err) {
        console.error('Failed to load trading data:', err)
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  // Calculate analytics from full year dataset
  const analyticsData = useMemo(() => {
    if (rawTrades.length === 0) {
      return null
    }

    // Apply filters
    const filteredTrades = applyFilters(rawTrades, filterState)
    const filteredComplete = applyFilters(completeTrades, filterState)

    // Calculate all metrics
    const accountMetrics = calculateAccountMetrics(filteredTrades)
    const performanceMetrics = calculatePerformanceMetrics(filteredTrades, filteredComplete)
    const riskMetrics = calculateRiskMetrics(filteredTrades, filteredComplete)

    // Generate all time series
    const equityTimeSeries = generateEquityTimeSeries(filteredTrades)
    const drawdownTimeSeries = generateDrawdownTimeSeries(filteredTrades)
    const dailyPnLTimeSeries = generateDailyPnLTimeSeries(filteredTrades)

    // Generate aggregations
    const hourlyStats = aggregateByHour(filteredTrades)
    const dayOfWeekStats = aggregateByDayOfWeek(filteredTrades)
    const signalStats = aggregateBySignal(filteredTrades)

    return {
      filteredTrades,
      filteredComplete,
      metrics: {
        account: accountMetrics,
        performance: performanceMetrics,
        risk: riskMetrics
      },
      timeSeries: {
        equity: equityTimeSeries,
        drawdown: drawdownTimeSeries,
        dailyPnL: dailyPnLTimeSeries
      },
      aggregations: {
        hourly: hourlyStats,
        dayOfWeek: dayOfWeekStats,
        bySignal: signalStats
      },
      hybridMetadata: {
        realDataStartIndex: 0,
        syntheticDays: 0,
        realDays: 365
      }
    }
  }, [rawTrades, completeTrades, filterState])

  // Loading state
  if (loading) {
    return (
      <>
        <DoubleTapSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-[var(--analytics-bg-primary)] flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--analytics-positive)] mx-auto" />
              <p className="text-[var(--analytics-text-secondary)] font-mono text-sm">
                Loading trading data...
              </p>
            </div>
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </>
    )
  }

  // Error state
  if (error) {
    return (
      <>
        <DoubleTapSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-[var(--analytics-bg-primary)] flex items-center justify-center p-6">
            <div className="max-w-md text-center space-y-4">
              <div className="text-[var(--analytics-negative)] text-4xl mb-4">⚠️</div>
              <h2 className="text-xl font-semibold text-[var(--analytics-text-primary)]">
                Failed to Load Data
              </h2>
              <p className="text-[var(--analytics-text-secondary)]">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-[var(--analytics-positive)] text-white rounded-lg hover:opacity-90 transition-opacity"
              >
                Retry
              </button>
            </div>
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </>
    )
  }

  // No data state
  if (!analyticsData) {
    return (
      <>
        <DoubleTapSidebar />
        <SidebarInset>
          <div className="min-h-screen bg-[var(--analytics-bg-primary)] flex items-center justify-center">
            <p className="text-[var(--analytics-text-secondary)]">No trading data available</p>
          </div>
        </SidebarInset>
        <MobileBottomNav />
      </>
    )
  }

  // Main analytics view
  return (
    <>
      <DoubleTapSidebar />
      <SidebarInset>
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <SidebarTrigger className="h-10 w-10" />
        </div>

        <AnalyticsLayout
          trades={analyticsData.filteredTrades}
          completeTrades={analyticsData.filteredComplete}
          metrics={analyticsData.metrics}
          timeSeries={analyticsData.timeSeries}
          aggregations={analyticsData.aggregations}
          filterState={filterState}
          onFilterChange={setFilterState}
          csvMetadata={csvMetadata}
          hybridMetadata={analyticsData.hybridMetadata}
        />
      </SidebarInset>
      <MobileBottomNav />
    </>
  )
}
