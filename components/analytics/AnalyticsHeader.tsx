'use client'

import { CheckCircle2 } from 'lucide-react'
import { formatCurrency, formatPercent, formatDate } from '@/lib/analytics/formatters'

interface AnalyticsHeaderProps {
  totalTrades: number
  dateRange: { start: Date, end: Date }
  totalReturn: number
}

export function AnalyticsHeader({ totalTrades, dateRange, totalReturn }: AnalyticsHeaderProps) {
  return (
    <header className="border-b border-[var(--analytics-border-primary)] bg-[var(--analytics-bg-secondary)]">
      <div className="container-wide py-6">
        {/* Disclaimer Banner */}
        <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">
                Important Disclosure
              </h3>
              <p className="text-sm text-red-600 font-medium">
                PAST PERFORMANCE IS NOT INDICATIVE OF FUTURE RESULTS. Trading involves substantial risk of loss. The performance shown is historical and does not guarantee future outcomes.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Title & Description */}
          <div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-[var(--analytics-text-primary)] mb-2">
              Trading Analytics
            </h1>
            <p className="text-base text-[var(--analytics-text-secondary)]">
              Comprehensive performance analysis and institutional-grade metrics
            </p>
          </div>

          {/* Verification Badge & Quick Stats */}
          <div className="flex items-center gap-4">
            {/* Verification Badge */}
            <div className="flex items-center gap-3 px-4 py-3 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--analytics-positive)]/10">
                <CheckCircle2 className="h-5 w-5 text-[var(--analytics-positive)]" />
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--analytics-text-primary)]">
                  Verified Data
                </div>
                <div className="text-xs text-[var(--analytics-text-muted)]">
                  Real trading results
                </div>
              </div>
            </div>

            {/* Quick Stats Card */}
            <div className="hidden md:flex items-center gap-6 px-6 py-3 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg">
              <div>
                <div className="text-xs text-[var(--analytics-text-muted)] uppercase tracking-wide mb-1">
                  Total Trades
                </div>
                <div className="font-mono text-xl font-semibold text-[var(--analytics-text-primary)]">
                  {totalTrades}
                </div>
              </div>

              <div className="w-px h-10 bg-[var(--analytics-border-primary)]" />

              <div>
                <div className="text-xs text-[var(--analytics-text-muted)] uppercase tracking-wide mb-1">
                  Period
                </div>
                <div className="font-mono text-sm text-[var(--analytics-text-primary)]">
                  {formatDate(dateRange.start)} - {formatDate(dateRange.end)}
                </div>
              </div>

              <div className="w-px h-10 bg-[var(--analytics-border-primary)]" />

              <div>
                <div className="text-xs text-[var(--analytics-text-muted)] uppercase tracking-wide mb-1">
                  Total Return
                </div>
                <div className={`font-mono text-xl font-semibold ${
                  totalReturn >= 0 ? 'text-[var(--analytics-positive)]' : 'text-[var(--analytics-negative)]'
                }`}>
                  {formatPercent(totalReturn)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
