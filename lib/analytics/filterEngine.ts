/**
 * Filter Engine
 * Apply filters to trade data
 */

import { TradeRecord, CompleteTrade, FilterState } from './types'

/**
 * Apply filters to trade records
 */
export function applyFilters<T extends TradeRecord | CompleteTrade>(
  trades: T[],
  filters: FilterState
): T[] {
  let filtered = [...trades]

  // Date range filter
  if (filters.dateRange.start || filters.dateRange.end) {
    filtered = filtered.filter(trade => {
      const tradeDate = 'entryDate' in trade ? trade.entryDate : trade.dateTime

      if (filters.dateRange.start && tradeDate < filters.dateRange.start) {
        return false
      }

      if (filters.dateRange.end && tradeDate > filters.dateRange.end) {
        return false
      }

      return true
    })
  }

  // Position size filter
  if (filters.positionSize.min !== null || filters.positionSize.max !== null) {
    filtered = filtered.filter(trade => {
      const size = 'positionSize' in trade ? trade.positionSize : trade.positionSizeQty

      if (filters.positionSize.min !== null && size < filters.positionSize.min) {
        return false
      }

      if (filters.positionSize.max !== null && size > filters.positionSize.max) {
        return false
      }

      return true
    })
  }

  // Signal filter
  if (filters.signals.include.length > 0 || filters.signals.exclude.length > 0) {
    filtered = filtered.filter(trade => {
      const signal = trade.signal.toLowerCase()

      // Check excludes first
      if (filters.signals.exclude.some(ex => signal.includes(ex.toLowerCase()))) {
        return false
      }

      // If includes specified, must match one
      if (filters.signals.include.length > 0) {
        return filters.signals.include.some(inc => signal.includes(inc.toLowerCase()))
      }

      return true
    })
  }

  // Direction filter
  if (!filters.direction.long || !filters.direction.short) {
    filtered = filtered.filter(trade => {
      const isLong = 'direction' in trade
        ? trade.direction === 'long'
        : trade.type.includes('long')

      if (isLong && !filters.direction.long) return false
      if (!isLong && !filters.direction.short) return false

      return true
    })
  }

  // Day of week filter
  const activeDays = filters.daysOfWeek.filter(d => d).length
  if (activeDays > 0 && activeDays < 7) {
    filtered = filtered.filter(trade => {
      const tradeDate = 'entryDate' in trade ? trade.entryDate : trade.dateTime
      const dayOfWeek = tradeDate.getDay()
      return filters.daysOfWeek[dayOfWeek]
    })
  }

  // Hour of day filter
  if (filters.hoursOfDay.specific.length > 0 || filters.hoursOfDay.ranges.length > 0) {
    filtered = filtered.filter(trade => {
      const tradeDate = 'entryDate' in trade ? trade.entryDate : trade.dateTime
      const hour = tradeDate.getHours()

      // Check specific hours
      if (filters.hoursOfDay.specific.includes(hour)) {
        return true
      }

      // Check ranges
      return filters.hoursOfDay.ranges.some(range =>
        hour >= range.start && hour <= range.end
      )
    })
  }

  // Profit range filter
  if (filters.profitRange.min !== null || filters.profitRange.max !== null) {
    filtered = filtered.filter(trade => {
      const profit = 'netPnL' in trade ? trade.netPnL : trade.netPnLUSD

      if (filters.profitRange.min !== null && profit < filters.profitRange.min) {
        return false
      }

      if (filters.profitRange.max !== null && profit > filters.profitRange.max) {
        return false
      }

      return true
    })
  }

  // Return range filter (percentage)
  if (filters.returnRange.min !== null || filters.returnRange.max !== null) {
    filtered = filtered.filter(trade => {
      const returnPct = 'netPnLPercent' in trade ? trade.netPnLPercent : trade.netPnLPercent

      if (filters.returnRange.min !== null && returnPct < filters.returnRange.min) {
        return false
      }

      if (filters.returnRange.max !== null && returnPct > filters.returnRange.max) {
        return false
      }

      return true
    })
  }

  // Trade type filter (entry/exit)
  if (!filters.tradeType.entry || !filters.tradeType.exit) {
    filtered = filtered.filter(trade => {
      if ('type' in trade) {
        const isEntry = trade.type.includes('Entry')

        if (isEntry && !filters.tradeType.entry) return false
        if (!isEntry && !filters.tradeType.exit) return false
      }

      return true
    })
  }

  // Performance filter (winners/losers)
  if (filters.performanceFilter !== 'all') {
    filtered = filtered.filter(trade => {
      const profit = 'netPnL' in trade ? trade.netPnL : trade.netPnLUSD
      const isWinner = profit > 0

      if (filters.performanceFilter === 'winners' && !isWinner) return false
      if (filters.performanceFilter === 'losers' && isWinner) return false

      return true
    })
  }

  return filtered
}

/**
 * Get filter summary text
 */
export function getFilterSummary(filters: FilterState, totalCount: number, filteredCount: number): string {
  const parts: string[] = []

  if (filters.dateRange.start || filters.dateRange.end) {
    parts.push('date range')
  }

  if (filters.positionSize.min !== null || filters.positionSize.max !== null) {
    parts.push('position size')
  }

  if (filters.signals.include.length > 0 || filters.signals.exclude.length > 0) {
    parts.push('signals')
  }

  if (!filters.direction.long || !filters.direction.short) {
    parts.push('direction')
  }

  const activeDays = filters.daysOfWeek.filter(d => d).length
  if (activeDays < 7) {
    parts.push('days of week')
  }

  if (filters.hoursOfDay.specific.length > 0 || filters.hoursOfDay.ranges.length > 0) {
    parts.push('hours')
  }

  if (filters.profitRange.min !== null || filters.profitRange.max !== null) {
    parts.push('profit range')
  }

  if (filters.returnRange.min !== null || filters.returnRange.max !== null) {
    parts.push('return %')
  }

  if (filters.performanceFilter !== 'all') {
    parts.push(filters.performanceFilter)
  }

  if (parts.length === 0) {
    return `Showing all ${totalCount} trades`
  }

  return `${filteredCount} of ${totalCount} trades (filtered by: ${parts.join(', ')})`
}

/**
 * Check if any filters are active
 */
export function hasActiveFilters(filters: FilterState): boolean {
  if (filters.dateRange.start || filters.dateRange.end) return true
  if (filters.positionSize.min !== null || filters.positionSize.max !== null) return true
  if (filters.signals.include.length > 0 || filters.signals.exclude.length > 0) return true
  if (!filters.direction.long || !filters.direction.short) return true
  if (filters.daysOfWeek.filter(d => d).length < 7) return true
  if (filters.hoursOfDay.specific.length > 0 || filters.hoursOfDay.ranges.length > 0) return true
  if (filters.profitRange.min !== null || filters.profitRange.max !== null) return true
  if (filters.returnRange.min !== null || filters.returnRange.max !== null) return true
  if (!filters.tradeType.entry || !filters.tradeType.exit) return true
  if (filters.performanceFilter !== 'all') return true

  return false
}
