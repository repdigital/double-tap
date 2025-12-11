'use client'

import { useState } from 'react'
import { Filter, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { DateRangeFilter } from './DateRangeFilter'
import { PositionSizeFilter } from './PositionSizeFilter'
import { SignalFilter } from './SignalFilter'
import { DirectionFilter } from './DirectionFilter'
import { DayOfWeekFilter } from './DayOfWeekFilter'
import { ProfitRangeFilter } from './ProfitRangeFilter'
import { PerformanceFilter } from './PerformanceFilter'
import { FilterState, DEFAULT_FILTERS } from '@/lib/analytics/types'
import { hasActiveFilters, getFilterSummary } from '@/lib/analytics/filterEngine'
import { cn } from '@/lib/utils'

interface FilterPanelProps {
  filterState: FilterState
  onChange: (filters: FilterState) => void
  totalTrades: number
  filteredTrades: number
}

export function FilterPanel({
  filterState,
  onChange,
  totalTrades,
  filteredTrades
}: FilterPanelProps) {
  const [open, setOpen] = useState(false)
  const hasFilters = hasActiveFilters(filterState)

  const handleClearAll = () => {
    onChange(DEFAULT_FILTERS)
  }

  const filterSummary = getFilterSummary(filterState, totalTrades, filteredTrades)

  return (
    <div className="border-b border-[var(--analytics-border-primary)] bg-[var(--analytics-bg-secondary)]">
      <div className="container-wide">
        <Collapsible open={open} onOpenChange={setOpen}>
          {/* Filter Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <CollapsibleTrigger className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <Filter className="h-4 w-4 text-[var(--analytics-text-secondary)]" />
                <span className="font-medium text-[var(--analytics-text-primary)]">
                  Filters
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-[var(--analytics-text-secondary)] transition-transform duration-200",
                    open && "rotate-180"
                  )}
                />
              </CollapsibleTrigger>

              {hasFilters && (
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[var(--analytics-positive)] animate-pulse" />
                  <span className="text-sm text-[var(--analytics-text-muted)]">
                    {Object.keys(filterState).filter(key => {
                      const value = filterState[key as keyof FilterState]
                      if (typeof value === 'object' && value !== null) {
                        return Object.values(value).some(v =>
                          v !== null && v !== undefined &&
                          (Array.isArray(v) ? v.length > 0 : true)
                        )
                      }
                      return false
                    }).length} active
                  </span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm text-[var(--analytics-text-muted)] font-mono">
                {filteredTrades.toLocaleString()} / {totalTrades.toLocaleString()} trades
              </span>

              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearAll}
                  className="text-[var(--analytics-text-secondary)] hover:text-[var(--analytics-text-primary)]"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>

          {/* Filter Controls */}
          <CollapsibleContent>
            <div className="pb-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Date Range */}
                <DateRangeFilter
                  value={filterState.dateRange}
                  onChange={(dateRange) => onChange({ ...filterState, dateRange })}
                />

                {/* Position Size */}
                <PositionSizeFilter
                  value={filterState.positionSize}
                  onChange={(positionSize) => onChange({ ...filterState, positionSize })}
                />

                {/* Signal */}
                <SignalFilter
                  value={filterState.signals}
                  onChange={(signals) => onChange({ ...filterState, signals })}
                />

                {/* Direction */}
                <DirectionFilter
                  value={filterState.direction}
                  onChange={(direction) => onChange({ ...filterState, direction })}
                />

                {/* Day of Week */}
                <DayOfWeekFilter
                  value={filterState.daysOfWeek}
                  onChange={(daysOfWeek) => onChange({ ...filterState, daysOfWeek })}
                />

                {/* Profit Range */}
                <ProfitRangeFilter
                  value={filterState.profitRange}
                  onChange={(profitRange) => onChange({ ...filterState, profitRange })}
                />

                {/* Return Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
                    Return % Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min %"
                      value={filterState.returnRange.min ?? ''}
                      onChange={(e) => onChange({
                        ...filterState,
                        returnRange: {
                          ...filterState.returnRange,
                          min: e.target.value ? parseFloat(e.target.value) : null
                        }
                      })}
                      className="flex-1 px-3 py-2 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg text-[var(--analytics-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--analytics-positive)]"
                    />
                    <input
                      type="number"
                      placeholder="Max %"
                      value={filterState.returnRange.max ?? ''}
                      onChange={(e) => onChange({
                        ...filterState,
                        returnRange: {
                          ...filterState.returnRange,
                          max: e.target.value ? parseFloat(e.target.value) : null
                        }
                      })}
                      className="flex-1 px-3 py-2 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg text-[var(--analytics-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--analytics-positive)]"
                    />
                  </div>
                </div>

                {/* Performance Filter */}
                <PerformanceFilter
                  value={filterState.performanceFilter}
                  onChange={(performanceFilter) => onChange({ ...filterState, performanceFilter })}
                />
              </div>

              {/* Filter Summary */}
              {hasFilters && (
                <div className="pt-4 border-t border-[var(--analytics-border-primary)]">
                  <p className="text-sm text-[var(--analytics-text-muted)]">
                    {filterSummary}
                  </p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
