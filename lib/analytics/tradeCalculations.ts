/**
 * Trade Calculations Engine
 * Core logic for calculating all trading metrics and statistics
 */

import {
  TradeRecord,
  CompleteTrade,
  AccountMetrics,
  PerformanceMetrics,
  RiskMetrics,
  StatisticalMetrics,
  TimeSeriesData,
  DailyStats,
  WeeklyStats,
  MonthlyStats,
  HourlyStats,
  DayOfWeekStats,
  SignalStats
} from './types'

// ============================================
// ACCOUNT METRICS
// ============================================

export function calculateAccountMetrics(trades: TradeRecord[]): AccountMetrics {
  if (trades.length === 0) {
    return {
      balance: 0,
      equity: 0,
      floatingPnL: 0,
      closedProfit: 0,
      totalReturn: 0,
      monthlyReturn: 0,
      weeklyReturn: 0,
      peakDrawdown: 0,
      startingBalance: 100000,
      currentBalance: 100000,
      highestBalance: 100000,
      lowestDrawdown: 0
    }
  }

  const lastTrade = trades[trades.length - 1]
  const startingBalance = 100000 // Assumed starting balance

  const closedProfit = lastTrade.cumulativePnLUSD
  const currentBalance = startingBalance + closedProfit
  const totalReturn = (closedProfit / startingBalance) * 100

  // Find highest balance (max cumulative P&L)
  const highestPnL = Math.max(...trades.map(t => t.cumulativePnLUSD))
  const highestBalance = startingBalance + highestPnL

  // Find peak drawdown
  const peakDrawdown = Math.min(...trades.map(t => t.drawdownPercent))

  // Calculate time-based returns
  const { monthlyReturn, weeklyReturn } = calculateTimeBasedReturns(trades)

  return {
    balance: currentBalance,
    equity: currentBalance, // Assuming no open positions
    floatingPnL: 0,
    closedProfit,
    totalReturn,
    monthlyReturn,
    weeklyReturn,
    peakDrawdown,
    startingBalance,
    currentBalance,
    highestBalance,
    lowestDrawdown: peakDrawdown
  }
}

// ============================================
// PERFORMANCE METRICS
// ============================================

export function calculatePerformanceMetrics(
  trades: TradeRecord[],
  completeTrades: CompleteTrade[]
): PerformanceMetrics {
  if (completeTrades.length === 0) {
    return {
      tradeWinPercent: 0,
      totalTrades: 0,
      winningTrades: 0,
      losingTrades: 0,
      profitFactor: 0,
      averageResult: 0,
      averageWin: 0,
      averageLoss: 0,
      bestTrade: 0,
      worstTrade: 0,
      totalPnL: 0,
      totalPnLPercent: 0,
      totalRunUp: 0,
      totalDrawdown: 0,
      avgTradeLength: 0,
      avgWinDuration: 0,
      avgLossDuration: 0,
      shortestTrade: 0,
      longestTrade: 0,
      tradesPerDay: 0,
      historyDuration: 0,
      tradingDays: 0,
      riskRewardRatio: 0,
      expectancy: 0,
      worstDay: 0,
      worstWeek: 0,
      worstMonth: 0
    }
  }

  // Win/Loss breakdown
  const winners = completeTrades.filter(t => t.isWinner)
  const losers = completeTrades.filter(t => !t.isWinner)

  const totalWins = winners.length
  const totalLosses = losers.length
  const totalTrades = completeTrades.length

  const tradeWinPercent = (totalWins / totalTrades) * 100

  // P&L calculations
  const grossWins = winners.reduce((sum, t) => sum + t.netPnL, 0)
  const grossLosses = Math.abs(losers.reduce((sum, t) => sum + t.netPnL, 0))
  const totalPnL = completeTrades.reduce((sum, t) => sum + t.netPnL, 0)
  const totalPnLPercent = completeTrades.reduce((sum, t) => sum + t.netPnLPercent, 0)

  const profitFactor = grossLosses > 0 ? grossWins / grossLosses : grossWins > 0 ? Infinity : 0

  // Averages
  const averageResult = totalPnL / totalTrades
  const averageWin = totalWins > 0 ? grossWins / totalWins : 0
  const averageLoss = totalLosses > 0 ? -grossLosses / totalLosses : 0

  // Best/Worst
  const allPnLs = completeTrades.map(t => t.netPnL)
  const bestTrade = Math.max(...allPnLs)
  const worstTrade = Math.min(...allPnLs)

  // Duration calculations
  const durations = completeTrades.map(t => t.duration)
  const avgTradeLength = durations.reduce((sum, d) => sum + d, 0) / durations.length / (1000 * 60 * 60) // hours

  const winDurations = winners.map(t => t.duration)
  const avgWinDuration = winDurations.length > 0
    ? winDurations.reduce((sum, d) => sum + d, 0) / winDurations.length / (1000 * 60 * 60)
    : 0

  const lossDurations = losers.map(t => t.duration)
  const avgLossDuration = lossDurations.length > 0
    ? lossDurations.reduce((sum, d) => sum + d, 0) / lossDurations.length / (1000 * 60 * 60)
    : 0

  const shortestTrade = Math.min(...durations) / (1000 * 60 * 60)
  const longestTrade = Math.max(...durations) / (1000 * 60 * 60)

  // Time-based metrics
  const sortedTrades = [...completeTrades].sort((a, b) =>
    a.entryDate.getTime() - b.entryDate.getTime()
  )

  const firstDate = sortedTrades[0].entryDate
  const lastDate = sortedTrades[sortedTrades.length - 1].exitDate
  const historyDuration = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24) // days

  const tradingDays = calculateTradingDays(completeTrades)
  const tradesPerDay = totalTrades / tradingDays

  // Risk metrics
  const riskRewardRatio = averageLoss !== 0 ? Math.abs(averageWin / averageLoss) : 0
  const expectancy = (tradeWinPercent / 100) * averageWin + ((100 - tradeWinPercent) / 100) * averageLoss

  // Worst periods
  const { worstDay, worstWeek, worstMonth } = calculateWorstPeriods(trades)

  // Run-up and drawdown totals
  const totalRunUp = trades.reduce((sum, t) => sum + t.runUpUSD, 0)
  const totalDrawdown = trades.reduce((sum, t) => sum + t.drawdownUSD, 0)

  return {
    tradeWinPercent,
    totalTrades,
    winningTrades: totalWins,
    losingTrades: totalLosses,
    profitFactor,
    averageResult,
    averageWin,
    averageLoss,
    bestTrade,
    worstTrade,
    totalPnL,
    totalPnLPercent,
    totalRunUp,
    totalDrawdown,
    avgTradeLength,
    avgWinDuration,
    avgLossDuration,
    shortestTrade,
    longestTrade,
    tradesPerDay,
    historyDuration,
    tradingDays,
    riskRewardRatio,
    expectancy,
    worstDay,
    worstWeek,
    worstMonth
  }
}

// ============================================
// RISK METRICS
// ============================================

export function calculateRiskMetrics(
  trades: TradeRecord[],
  completeTrades: CompleteTrade[]
): RiskMetrics {
  if (trades.length === 0) {
    return {
      maxDrawdown: 0,
      maxDrawdownPercent: 0,
      maxDrawdownDuration: 0,
      currentDrawdown: 0,
      averageDrawdown: 0,
      sharpeRatio: 0,
      sortinoRatio: 0,
      calmarRatio: 0,
      sterlingRatio: 0,
      recoveryFactor: 0,
      maxConsecutiveWins: 0,
      maxConsecutiveLosses: 0,
      currentStreak: 0,
      currentStreakType: 'none',
      riskOfRuin: 0,
      standardDeviation: 0,
      coefficientOfVariation: 0,
      ulcerIndex: 0,
      valueAtRisk95: 0,
      valueAtRisk99: 0,
      conditionalVaR95: 0,
      conditionalVaR99: 0
    }
  }

  // Drawdown calculations
  const drawdowns = trades.map(t => t.drawdownPercent)
  const maxDrawdownPercent = Math.min(...drawdowns)
  const maxDrawdownUSD = Math.min(...trades.map(t => t.drawdownUSD))
  const averageDrawdown = drawdowns.reduce((sum, d) => sum + d, 0) / drawdowns.length

  // Current drawdown (last trade)
  const currentDrawdown = trades[trades.length - 1].drawdownPercent

  // Drawdown duration
  const maxDrawdownDuration = calculateMaxDrawdownDuration(trades)

  // Consecutive wins/losses
  const { maxWins, maxLosses, currentStreak, streakType } = calculateStreaks(completeTrades)

  // Volatility
  const returns = completeTrades.map(t => t.netPnLPercent)
  const stdDev = calculateStandardDeviation(returns)
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const coefficientOfVariation = mean !== 0 ? stdDev / Math.abs(mean) : 0

  // Risk ratios
  const sharpeRatio = calculateSharpeRatio(returns)
  const sortinoRatio = calculateSortinoRatio(returns)
  const calmarRatio = calculateCalmarRatio(returns, maxDrawdownPercent)
  const sterlingRatio = calculateSterlingRatio(returns, maxDrawdownPercent)

  // Recovery factor
  const totalReturn = trades[trades.length - 1].cumulativePnLPercent
  const recoveryFactor = maxDrawdownPercent !== 0 ? Math.abs(totalReturn / maxDrawdownPercent) : 0

  // Risk of ruin (simplified Kelly criterion approach)
  const winRate = completeTrades.filter(t => t.isWinner).length / completeTrades.length
  const avgWin = mean
  const avgLoss = Math.abs(returns.filter(r => r < 0).reduce((sum, r) => sum + r, 0) / returns.filter(r => r < 0).length || 1)
  const riskOfRuin = calculateRiskOfRuin(winRate, avgWin, avgLoss)

  // Ulcer Index
  const ulcerIndex = calculateUlcerIndex(trades)

  // Value at Risk
  const { var95, var99, cvar95, cvar99 } = calculateVaR(returns)

  return {
    maxDrawdown: maxDrawdownUSD,
    maxDrawdownPercent,
    maxDrawdownDuration,
    currentDrawdown,
    averageDrawdown,
    sharpeRatio,
    sortinoRatio,
    calmarRatio,
    sterlingRatio,
    recoveryFactor,
    maxConsecutiveWins: maxWins,
    maxConsecutiveLosses: maxLosses,
    currentStreak,
    currentStreakType: streakType,
    riskOfRuin,
    standardDeviation: stdDev,
    coefficientOfVariation,
    ulcerIndex,
    valueAtRisk95: var95,
    valueAtRisk99: var99,
    conditionalVaR95: cvar95,
    conditionalVaR99: cvar99
  }
}

// ============================================
// TIME SERIES GENERATION
// ============================================

export function generateEquityTimeSeries(trades: TradeRecord[]): TimeSeriesData[] {
  const startingBalance = 100000

  // Sort trades by date first
  const sortedTrades = [...trades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  // Group by day and take the last equity value for each day
  const dailyEquity = new Map<string, number>()

  for (const trade of sortedTrades) {
    const dateKey = trade.dateTime.toISOString().split('T')[0]
    dailyEquity.set(dateKey, startingBalance + trade.cumulativePnLUSD)
  }

  // Convert to array and sort
  return Array.from(dailyEquity.entries())
    .map(([time, value]) => ({ time, value }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

export function generateDrawdownTimeSeries(trades: TradeRecord[]): TimeSeriesData[] {
  // Sort trades by date first
  const sortedTrades = [...trades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  // Group by day and take the worst (most negative) drawdown for each day
  const dailyDrawdown = new Map<string, number>()

  for (const trade of sortedTrades) {
    const dateKey = trade.dateTime.toISOString().split('T')[0]
    const existing = dailyDrawdown.get(dateKey) || 0
    // Keep the worst (most negative) drawdown for the day
    dailyDrawdown.set(dateKey, Math.min(existing, trade.drawdownPercent))
  }

  // Convert to array and sort
  return Array.from(dailyDrawdown.entries())
    .map(([time, value]) => ({ time, value }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

export function generateDailyPnLTimeSeries(trades: TradeRecord[]): TimeSeriesData[] {
  const dailyMap = new Map<string, number>()

  for (const trade of trades) {
    const dateKey = trade.dateTime.toISOString().split('T')[0]
    const existing = dailyMap.get(dateKey) || 0
    dailyMap.set(dateKey, existing + trade.netPnLUSD)
  }

  return Array.from(dailyMap.entries())
    .map(([date, value]) => ({ time: date, value }))
    .sort((a, b) => a.time.localeCompare(b.time))
}

// ============================================
// AGGREGATIONS
// ============================================

export function aggregateByHour(trades: TradeRecord[]): HourlyStats[] {
  const hourlyMap = new Map<number, TradeRecord[]>()

  for (const trade of trades) {
    const hour = trade.dateTime.getHours()
    const existing = hourlyMap.get(hour) || []
    existing.push(trade)
    hourlyMap.set(hour, existing)
  }

  return Array.from(hourlyMap.entries()).map(([hour, hourTrades]) => {
    const netPnL = hourTrades.reduce((sum, t) => sum + t.netPnLUSD, 0)
    const winners = hourTrades.filter(t => t.netPnLUSD > 0).length

    return {
      hour,
      trades: hourTrades.length,
      netPnL,
      averagePnL: netPnL / hourTrades.length,
      winRate: (winners / hourTrades.length) * 100
    }
  }).sort((a, b) => a.hour - b.hour)
}

export function aggregateByDayOfWeek(trades: TradeRecord[]): DayOfWeekStats[] {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const dayMap = new Map<number, TradeRecord[]>()

  for (const trade of trades) {
    const day = trade.dateTime.getDay() as 0 | 1 | 2 | 3 | 4 | 5 | 6
    const existing = dayMap.get(day) || []
    existing.push(trade)
    dayMap.set(day, existing)
  }

  return Array.from(dayMap.entries()).map(([day, dayTrades]) => {
    const netPnL = dayTrades.reduce((sum, t) => sum + t.netPnLUSD, 0)
    const winners = dayTrades.filter(t => t.netPnLUSD > 0).length

    return {
      day: day as 0 | 1 | 2 | 3 | 4 | 5 | 6,
      dayName: dayNames[day],
      trades: dayTrades.length,
      netPnL,
      averagePnL: netPnL / dayTrades.length,
      winRate: (winners / dayTrades.length) * 100
    }
  }).sort((a, b) => a.day - b.day)
}

export function aggregateBySignal(trades: TradeRecord[]): SignalStats[] {
  const signalMap = new Map<string, TradeRecord[]>()

  for (const trade of trades) {
    const existing = signalMap.get(trade.signal) || []
    existing.push(trade)
    signalMap.set(trade.signal, existing)
  }

  return Array.from(signalMap.entries()).map(([signal, signalTrades]) => {
    const netPnL = signalTrades.reduce((sum, t) => sum + t.netPnLUSD, 0)
    const winners = signalTrades.filter(t => t.netPnLUSD > 0).length
    const durations = signalTrades.map(t => 0) // Would need complete trades for accurate duration

    return {
      signal,
      trades: signalTrades.length,
      netPnL,
      averagePnL: netPnL / signalTrades.length,
      winRate: (winners / signalTrades.length) * 100,
      avgDuration: durations.reduce((sum, d) => sum + d, 0) / durations.length
    }
  })
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function calculateStandardDeviation(values: number[]): number {
  const mean = values.reduce((sum, v) => sum + v, 0) / values.length
  const squaredDiffs = values.map(v => Math.pow(v - mean, 2))
  const variance = squaredDiffs.reduce((sum, d) => sum + d, 0) / values.length
  return Math.sqrt(variance)
}

function calculateSharpeRatio(returns: number[], riskFreeRate: number = 0): number {
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const stdDev = calculateStandardDeviation(returns)
  return stdDev !== 0 ? (mean - riskFreeRate) / stdDev : 0
}

function calculateSortinoRatio(returns: number[], targetReturn: number = 0): number {
  const mean = returns.reduce((sum, r) => sum + r, 0) / returns.length
  const negativeReturns = returns.filter(r => r < targetReturn)
  const downsideDev = negativeReturns.length > 0
    ? Math.sqrt(negativeReturns.map(r => Math.pow(r - targetReturn, 2)).reduce((sum, d) => sum + d, 0) / returns.length)
    : 0
  return downsideDev !== 0 ? (mean - targetReturn) / downsideDev : 0
}

function calculateCalmarRatio(returns: number[], maxDD: number): number {
  const annualizedReturn = returns.reduce((sum, r) => sum + r, 0)
  return maxDD !== 0 ? Math.abs(annualizedReturn / maxDD) : 0
}

function calculateSterlingRatio(returns: number[], avgDD: number): number {
  const annualizedReturn = returns.reduce((sum, r) => sum + r, 0)
  return avgDD !== 0 ? Math.abs(annualizedReturn / avgDD) : 0
}

function calculateUlcerIndex(trades: TradeRecord[]): number {
  const drawdowns = trades.map(t => Math.abs(t.drawdownPercent))
  const squaredDrawdowns = drawdowns.map(d => d * d)
  const sumSquares = squaredDrawdowns.reduce((sum, d) => sum + d, 0)
  return Math.sqrt(sumSquares / drawdowns.length)
}

function calculateVaR(returns: number[]): {
  var95: number
  var99: number
  cvar95: number
  cvar99: number
} {
  const sorted = [...returns].sort((a, b) => a - b)
  const idx95 = Math.floor(sorted.length * 0.05)
  const idx99 = Math.floor(sorted.length * 0.01)

  const var95 = sorted[idx95]
  const var99 = sorted[idx99]

  const belowVar95 = sorted.slice(0, idx95 + 1)
  const belowVar99 = sorted.slice(0, idx99 + 1)

  const cvar95 = belowVar95.length > 0
    ? belowVar95.reduce((sum, r) => sum + r, 0) / belowVar95.length
    : var95

  const cvar99 = belowVar99.length > 0
    ? belowVar99.reduce((sum, r) => sum + r, 0) / belowVar99.length
    : var99

  return { var95, var99, cvar95, cvar99 }
}

function calculateStreaks(trades: CompleteTrade[]): {
  maxWins: number
  maxLosses: number
  currentStreak: number
  streakType: 'win' | 'loss' | 'none'
} {
  let maxWins = 0
  let maxLosses = 0
  let currentWins = 0
  let currentLosses = 0

  for (const trade of trades) {
    if (trade.isWinner) {
      currentWins++
      currentLosses = 0
      maxWins = Math.max(maxWins, currentWins)
    } else {
      currentLosses++
      currentWins = 0
      maxLosses = Math.max(maxLosses, currentLosses)
    }
  }

  const lastTrade = trades[trades.length - 1]
  const currentStreak = currentWins > 0 ? currentWins : currentLosses
  const streakType = currentWins > 0 ? 'win' : currentLosses > 0 ? 'loss' : 'none'

  return { maxWins, maxLosses, currentStreak, streakType }
}

function calculateRiskOfRuin(winRate: number, avgWin: number, avgLoss: number): number {
  // Simplified risk of ruin calculation
  if (winRate >= 1 || avgWin <= 0) return 0
  if (winRate <= 0) return 1

  const p = winRate
  const q = 1 - winRate
  const a = avgWin
  const b = Math.abs(avgLoss)

  if (p * a <= q * b) return 1 // Negative expectancy

  const riskPerTrade = 0.02 // 2% risk assumption
  const capital = 1.0
  const r = (p * a - q * b) / (q * b)

  // Simplified formula
  const ror = Math.pow((q / p) * (b / a), capital / riskPerTrade)
  return Math.min(ror, 1)
}

function calculateTradingDays(trades: CompleteTrade[]): number {
  const uniqueDays = new Set<string>()

  for (const trade of trades) {
    const dateKey = trade.entryDate.toISOString().split('T')[0]
    uniqueDays.add(dateKey)
  }

  return uniqueDays.size
}

function calculateMaxDrawdownDuration(trades: TradeRecord[]): number {
  let maxDuration = 0
  let currentDuration = 0
  let inDrawdown = false
  let drawdownStart: Date | null = null

  for (const trade of trades) {
    if (trade.drawdownPercent < -0.01) {
      if (!inDrawdown) {
        inDrawdown = true
        drawdownStart = trade.dateTime
      }
      currentDuration++
    } else {
      if (inDrawdown && drawdownStart) {
        const duration = (trade.dateTime.getTime() - drawdownStart.getTime()) / (1000 * 60 * 60 * 24)
        maxDuration = Math.max(maxDuration, duration)
      }
      inDrawdown = false
      currentDuration = 0
      drawdownStart = null
    }
  }

  return maxDuration
}

function calculateTimeBasedReturns(trades: TradeRecord[]): {
  monthlyReturn: number
  weeklyReturn: number
} {
  // Simplified calculation
  const lastTrade = trades[trades.length - 1]
  const totalDays = (lastTrade.dateTime.getTime() - trades[0].dateTime.getTime()) / (1000 * 60 * 60 * 24)

  const totalReturn = lastTrade.cumulativePnLPercent
  const dailyReturn = totalReturn / totalDays
  const monthlyReturn = dailyReturn * 30
  const weeklyReturn = dailyReturn * 7

  return { monthlyReturn, weeklyReturn }
}

function calculateWorstPeriods(trades: TradeRecord[]): {
  worstDay: number
  worstWeek: number
  worstMonth: number
} {
  // Group by day
  const dailyMap = new Map<string, number>()

  for (const trade of trades) {
    const dateKey = trade.dateTime.toISOString().split('T')[0]
    const existing = dailyMap.get(dateKey) || 0
    dailyMap.set(dateKey, existing + trade.netPnLUSD)
  }

  const dailyPnLs = Array.from(dailyMap.values())
  const worstDay = Math.min(...dailyPnLs, 0)

  // Simplified week/month calculations
  const worstWeek = worstDay * 2 // Approximation
  const worstMonth = worstDay * 5 // Approximation

  return { worstDay, worstWeek, worstMonth }
}
