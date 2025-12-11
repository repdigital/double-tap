/**
 * Chart Utilities
 * Helper functions for generating chart data
 */

import {
  TradeRecord,
  CompleteTrade,
  TimeSeriesData,
  HistogramData,
  PieChartData,
  ScatterData,
  DailyStats,
  WeeklyStats,
  MonthlyStats
} from './types'

/**
 * Generate weekly profit data
 */
export function generateWeeklyProfitData(trades: TradeRecord[]): TimeSeriesData[] {
  const weeklyMap = new Map<string, number>()

  for (const trade of trades) {
    const date = new Date(trade.dateTime)
    // Get Monday of the week
    const dayOfWeek = date.getDay()
    const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1)
    const monday = new Date(date.setDate(diff))
    const weekKey = monday.toISOString().split('T')[0]

    const existing = weeklyMap.get(weekKey) || 0
    weeklyMap.set(weekKey, existing + trade.netPnLUSD)
  }

  return Array.from(weeklyMap.entries())
    .map(([time, value]) => ({ time, value }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

/**
 * Generate monthly profit data
 */
export function generateMonthlyProfitData(trades: TradeRecord[]): TimeSeriesData[] {
  const monthlyMap = new Map<string, number>()

  for (const trade of trades) {
    const date = new Date(trade.dateTime)
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    const existing = monthlyMap.get(monthKey) || 0
    monthlyMap.set(monthKey, existing + trade.netPnLUSD)
  }

  return Array.from(monthlyMap.entries())
    .map(([time, value]) => ({ time: time + '-01', value }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

/**
 * Generate cumulative return data
 */
export function generateCumulativeReturnData(trades: TradeRecord[]): TimeSeriesData[] {
  return trades.map(trade => ({
    time: trade.dateTime.toISOString(),
    value: trade.cumulativePnLPercent
  }))
}

/**
 * Generate win rate over time
 */
export function generateWinRateOverTime(completeTrades: CompleteTrade[]): TimeSeriesData[] {
  const windowSize = Math.max(10, Math.floor(completeTrades.length / 20))
  const data: TimeSeriesData[] = []

  for (let i = windowSize; i < completeTrades.length; i++) {
    const window = completeTrades.slice(i - windowSize, i)
    const wins = window.filter(t => t.isWinner).length
    const winRate = (wins / windowSize) * 100

    data.push({
      time: completeTrades[i].exitDate.toISOString(),
      value: winRate
    })
  }

  return data
}

/**
 * Generate profit factor over time
 */
export function generateProfitFactorOverTime(completeTrades: CompleteTrade[]): TimeSeriesData[] {
  const windowSize = Math.max(10, Math.floor(completeTrades.length / 20))
  const data: TimeSeriesData[] = []

  for (let i = windowSize; i < completeTrades.length; i++) {
    const window = completeTrades.slice(i - windowSize, i)
    const wins = window.filter(t => t.isWinner)
    const losses = window.filter(t => !t.isWinner)

    const grossWins = wins.reduce((sum, t) => sum + t.netPnL, 0)
    const grossLosses = Math.abs(losses.reduce((sum, t) => sum + t.netPnL, 0))

    const profitFactor = grossLosses > 0 ? grossWins / grossLosses : grossWins > 0 ? 10 : 1

    data.push({
      time: completeTrades[i].exitDate.toISOString(),
      value: Math.min(profitFactor, 10) // Cap at 10 for visualization
    })
  }

  return data
}

/**
 * Generate distribution histogram
 */
export function generateReturnDistribution(completeTrades: CompleteTrade[], bins: number = 20): HistogramData[] {
  if (completeTrades.length === 0) return []

  const returns = completeTrades.map(t => t.netPnLPercent)
  const min = Math.min(...returns)
  const max = Math.max(...returns)
  const binSize = (max - min) / bins

  const histogram: Map<number, number> = new Map()

  for (const returnVal of returns) {
    const binIndex = Math.floor((returnVal - min) / binSize)
    const clampedIndex = Math.min(binIndex, bins - 1)
    histogram.set(clampedIndex, (histogram.get(clampedIndex) || 0) + 1)
  }

  return Array.from(histogram.entries())
    .map(([index, count]) => ({
      bin: `${(min + index * binSize).toFixed(1)}%`,
      count,
      percentage: (count / completeTrades.length) * 100
    }))
    .sort((a, b) => parseFloat(a.bin) - parseFloat(b.bin))
}

/**
 * Generate pie chart data for direction
 */
export function generateDirectionPieData(completeTrades: CompleteTrade[]): PieChartData[] {
  const longs = completeTrades.filter(t => t.direction === 'long')
  const shorts = completeTrades.filter(t => t.direction === 'short')

  return [
    {
      name: 'Long',
      value: longs.length,
      percentage: (longs.length / completeTrades.length) * 100
    },
    {
      name: 'Short',
      value: shorts.length,
      percentage: (shorts.length / completeTrades.length) * 100
    }
  ]
}

/**
 * Generate scatter plot for duration vs profitability
 */
export function generateDurationProfitScatter(completeTrades: CompleteTrade[]): ScatterData[] {
  return completeTrades.map(trade => ({
    x: trade.duration / (1000 * 60 * 60), // hours
    y: trade.netPnLPercent,
    label: `Trade #${trade.tradeNumber}`,
    color: trade.isWinner ? 'green' : 'red'
  }))
}

/**
 * Generate monthly return heatmap data
 */
export function generateMonthlyHeatmap(trades: TradeRecord[]): {
  year: number
  month: number
  return: number
}[] {
  const monthlyMap = new Map<string, { total: number, count: number }>()

  for (const trade of trades) {
    const date = new Date(trade.dateTime)
    const key = `${date.getFullYear()}-${date.getMonth()}`

    const existing = monthlyMap.get(key) || { total: 0, count: 0 }
    existing.total += trade.netPnLPercent
    existing.count += 1
    monthlyMap.set(key, existing)
  }

  return Array.from(monthlyMap.entries()).map(([key, data]) => {
    const [year, month] = key.split('-').map(Number)
    return {
      year,
      month,
      return: data.total / data.count
    }
  })
}

/**
 * Generate consecutive wins/losses data
 */
export function generateStreakData(completeTrades: CompleteTrade[]): {
  wins: TimeSeriesData[]
  losses: TimeSeriesData[]
} {
  const wins: TimeSeriesData[] = []
  const losses: TimeSeriesData[] = []

  let currentWinStreak = 0
  let currentLossStreak = 0

  for (const trade of completeTrades) {
    if (trade.isWinner) {
      currentWinStreak++
      currentLossStreak = 0
    } else {
      currentLossStreak++
      currentWinStreak = 0
    }

    wins.push({
      time: trade.exitDate.toISOString(),
      value: currentWinStreak
    })

    losses.push({
      time: trade.exitDate.toISOString(),
      value: currentLossStreak
    })
  }

  return { wins, losses }
}

/**
 * Calculate rolling volatility
 */
export function generateRollingVolatility(
  completeTrades: CompleteTrade[],
  windowSize: number = 30
): TimeSeriesData[] {
  const data: TimeSeriesData[] = []

  for (let i = windowSize; i < completeTrades.length; i++) {
    const window = completeTrades.slice(i - windowSize, i)
    const returns = window.map(t => t.netPnLPercent)
    const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
    const variance = returns.reduce((sum, r) => sum + Math.pow(r - mean, 2), 0) / returns.length
    const stdDev = Math.sqrt(variance)

    data.push({
      time: completeTrades[i].exitDate.toISOString(),
      value: stdDev
    })
  }

  return data
}

/**
 * Generate underwater equity chart (drawdown from peak)
 */
export function generateUnderwaterChart(trades: TradeRecord[]): TimeSeriesData[] {
  let peak = 0
  const data: TimeSeriesData[] = []

  for (const trade of trades) {
    const equity = trade.cumulativePnLPercent
    peak = Math.max(peak, equity)
    const drawdown = equity - peak

    data.push({
      time: trade.dateTime.toISOString(),
      value: drawdown
    })
  }

  return data
}

/**
 * Generate MAE/MFE data (Maximum Adverse/Favorable Excursion)
 */
export function generateMAEMFEData(trades: TradeRecord[]): {
  mae: ScatterData[]
  mfe: ScatterData[]
} {
  const mae: ScatterData[] = []
  const mfe: ScatterData[] = []

  for (const trade of trades) {
    mae.push({
      x: Math.abs(trade.drawdownUSD),
      y: trade.netPnLUSD,
      label: `Trade #${trade.tradeNumber}`,
      color: trade.netPnLUSD > 0 ? 'green' : 'red'
    })

    mfe.push({
      x: trade.runUpUSD,
      y: trade.netPnLUSD,
      label: `Trade #${trade.tradeNumber}`,
      color: trade.netPnLUSD > 0 ? 'green' : 'red'
    })
  }

  return { mae, mfe }
}
