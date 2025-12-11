/**
 * Hybrid Data Generator
 * Combines real CSV trading data with synthetic historical data
 * to create a complete 365-day equity curve
 */

import { TradeRecord, TimeSeriesData } from './types'

/**
 * Generate synthetic equity data going backwards from CSV start date
 * This creates realistic historical performance that leads up to the real data
 */
export function generateSyntheticHistory(
  daysToGenerate: number,
  endDate: Date,
  endingEquity: number = 100000
): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const startingEquity = 100000

  // We'll work backwards from endDate
  let currentEquity = endingEquity
  let currentDate = new Date(endDate)

  // Calculate target daily return to reach startingEquity from endingEquity
  // Using exponential growth/decay
  const totalReturn = (startingEquity - endingEquity) / endingEquity
  const avgDailyReturn = totalReturn / daysToGenerate

  for (let i = 0; i < daysToGenerate; i++) {
    // Random walk with slight negative bias to get back to starting equity
    const randomReturn = (Math.random() - 0.5) * 0.02 // ±1% daily volatility
    const targetReturn = avgDailyReturn
    const dailyReturn = (randomReturn + targetReturn) / 2

    currentEquity = currentEquity * (1 + dailyReturn)

    // Ensure we don't go below a reasonable threshold
    currentEquity = Math.max(currentEquity, startingEquity * 0.85)

    data.unshift({
      time: currentDate.toISOString().split('T')[0],
      value: currentEquity
    })

    // Move one day backwards
    currentDate = new Date(currentDate)
    currentDate.setDate(currentDate.getDate() - 1)
  }

  // Force first value to be exactly starting equity
  if (data.length > 0) {
    data[0].value = startingEquity
  }

  return data
}

/**
 * Convert CSV trades to equity time series
 */
export function convertCSVToEquityTimeSeries(
  trades: TradeRecord[],
  startingBalance: number = 100000
): TimeSeriesData[] {
  // Sort trades by date
  const sortedTrades = [...trades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  return sortedTrades.map(trade => ({
    time: trade.dateTime.toISOString().split('T')[0],
    value: startingBalance + trade.cumulativePnLUSD
  }))
}

/**
 * Merge synthetic history with real CSV data
 * Creates a seamless 365-day equity curve
 */
export function createHybridEquityCurve(
  csvTrades: TradeRecord[],
  startingBalance: number = 100000
): {
  equityCurve: TimeSeriesData[]
  realDataStartIndex: number
  syntheticDays: number
  realDays: number
} {
  if (csvTrades.length === 0) {
    // No CSV data, just generate 365 days
    return {
      equityCurve: generateSyntheticHistory(365, new Date(), startingBalance),
      realDataStartIndex: 365,
      syntheticDays: 365,
      realDays: 0
    }
  }

  // Sort trades to find date range
  const sortedTrades = [...csvTrades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  const firstTradeDate = sortedTrades[0].dateTime
  const lastTradeDate = sortedTrades[sortedTrades.length - 1].dateTime

  // Calculate how many days of real data we have
  const realDays = Math.ceil(
    (lastTradeDate.getTime() - firstTradeDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Calculate how many synthetic days we need
  const targetTotalDays = 365
  const syntheticDays = Math.max(0, targetTotalDays - realDays)

  // Generate synthetic history leading up to first trade
  const syntheticData = syntheticDays > 0
    ? generateSyntheticHistory(syntheticDays, firstTradeDate, startingBalance)
    : []

  // Convert CSV to equity time series
  const realData = convertCSVToEquityTimeSeries(sortedTrades, startingBalance)

  // Merge datasets
  const equityCurve = [...syntheticData, ...realData]

  // Remove duplicates by date (keep real data if duplicate)
  const uniqueData = new Map<string, number>()
  for (const point of equityCurve) {
    const dateKey = point.time.split('T')[0]
    uniqueData.set(dateKey, point.value)
  }

  const finalCurve = Array.from(uniqueData.entries())
    .map(([time, value]) => ({ time, value }))
    .sort((a, b) => a.time.localeCompare(b.time))

  return {
    equityCurve: finalCurve,
    realDataStartIndex: syntheticDays,
    syntheticDays,
    realDays
  }
}

/**
 * Get metadata about the hybrid dataset
 */
export function getHybridDataMetadata(
  realDataStartIndex: number,
  syntheticDays: number,
  realDays: number,
  csvStartDate: Date,
  csvEndDate: Date
) {
  return {
    totalDays: syntheticDays + realDays,
    syntheticDays,
    realDays,
    realDataPercentage: (realDays / (syntheticDays + realDays)) * 100,
    syntheticStartDate: new Date(
      csvStartDate.getTime() - syntheticDays * 24 * 60 * 60 * 1000
    ),
    syntheticEndDate: csvStartDate,
    realStartDate: csvStartDate,
    realEndDate: csvEndDate
  }
}
