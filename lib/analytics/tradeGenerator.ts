/**
 * Realistic Trade Generator
 * Generate synthetic trades that match real trading algorithm characteristics
 */

import { TradeRecord } from './types'

interface TradingCharacteristics {
  winRate: number
  avgWinSize: number
  avgLossSize: number
  tradesPerDay: number
  avgTradeDuration: number // minutes
  longShortRatio: number
  signals: string[]
  avgRunUp: number
  avgDrawdown: number
}

/**
 * Analyze real trades to extract characteristics
 */
export function analyzeTradingCharacteristics(trades: TradeRecord[]): TradingCharacteristics {
  if (trades.length === 0) {
    return {
      winRate: 0.67, // Default 67% win rate
      avgWinSize: 0.7,
      avgLossSize: -0.15,
      tradesPerDay: 1.5,
      avgTradeDuration: 120,
      longShortRatio: 0.5,
      signals: ['long', 'short', 'long_exit', 'short_exit'],
      avgRunUp: 0.3,
      avgDrawdown: -0.1
    }
  }

  // Only analyze EXIT trades to avoid double counting (each complete trade has entry + exit)
  const exitTrades = trades.filter(t => t.type.includes('Exit'))

  // Filter out zero P&L trades for win/loss analysis
  const nonZeroTrades = exitTrades.filter(t => Math.abs(t.netPnLPercent) > 0.001)

  const winners = nonZeroTrades.filter(t => t.netPnLPercent > 0)
  const losers = nonZeroTrades.filter(t => t.netPnLPercent < 0)

  const winRate = nonZeroTrades.length > 0 ? winners.length / nonZeroTrades.length : 0.67
  const avgWinSize = winners.length > 0
    ? winners.reduce((sum, t) => sum + t.netPnLPercent, 0) / winners.length
    : 0.5

  const avgLossSize = losers.length > 0
    ? losers.reduce((sum, t) => sum + t.netPnLPercent, 0) / losers.length
    : -0.3

  // Calculate trades per day (use exit trades only)
  const sortedExits = [...exitTrades].sort((a, b) => a.dateTime.getTime() - b.dateTime.getTime())
  const firstDate = sortedExits[0]?.dateTime || new Date()
  const lastDate = sortedExits[sortedExits.length - 1]?.dateTime || new Date()
  const daysDiff = Math.max(1, (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24))
  const tradesPerDay = exitTrades.length / daysDiff

  // Long/short ratio
  const longs = exitTrades.filter(t => t.type.includes('long')).length
  const longShortRatio = exitTrades.length > 0 ? longs / exitTrades.length : 0.5

  // Get unique signals
  const signals = Array.from(new Set(trades.map(t => t.signal)))

  // Average run-up and drawdown (from exit trades)
  const avgRunUp = exitTrades.length > 0
    ? exitTrades.reduce((sum, t) => sum + t.runUpPercent, 0) / exitTrades.length
    : 0.3
  const avgDrawdown = exitTrades.length > 0
    ? exitTrades.reduce((sum, t) => sum + t.drawdownPercent, 0) / exitTrades.length
    : -0.1

  return {
    winRate,
    avgWinSize,
    avgLossSize,
    tradesPerDay,
    avgTradeDuration: 120, // Default 2 hours
    longShortRatio,
    signals,
    avgRunUp,
    avgDrawdown
  }
}

/**
 * Generate realistic synthetic trades with proper drawdown periods
 */
export function generateRealisticTrades(
  startDate: Date,
  endDate: Date,
  characteristics: TradingCharacteristics,
  startingBalance: number = 100000
): TradeRecord[] {
  const trades: TradeRecord[] = []
  let currentDate = new Date(startDate)
  let tradeNumber = 1
  let cumulativePnL = 0
  let cumulativePnLPercent = 0
  let peakEquity = 0
  let inDrawdownPeriod = false
  let drawdownTradeCount = 0
  let winStreak = 0
  let lossStreak = 0

  const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
  const targetEndReturn = 0 // End near starting balance for real data to take over

  while (currentDate < endDate) {
    // Determine trades for this day
    const dayOfWeek = currentDate.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6

    const tradesThisDay = isWeekend
      ? 0
      : Math.random() < 0.8
        ? 1 + Math.floor(Math.random() * 2)
        : 0

    for (let i = 0; i < tradesThisDay; i++) {
      // Trading hours (9:00 - 16:00)
      const hour = 11 + Math.floor(Math.random() * 5)
      const minute = Math.floor(Math.random() * 60)
      const tradeDate = new Date(currentDate)
      tradeDate.setHours(hour, minute, 0, 0)

      if (tradeDate >= endDate) break

      // Drawdown period logic (create realistic losing streaks)
      if (Math.random() < 0.15 && !inDrawdownPeriod && cumulativePnLPercent > 5) {
        inDrawdownPeriod = true
        drawdownTradeCount = 0
      }

      if (inDrawdownPeriod) {
        drawdownTradeCount++
        if (drawdownTradeCount > 8 || Math.random() < 0.2) {
          inDrawdownPeriod = false
          drawdownTradeCount = 0
        }
      }

      // Win/loss determination
      let isWinner: boolean
      if (inDrawdownPeriod) {
        // Higher loss probability during drawdown
        isWinner = Math.random() < (characteristics.winRate * 0.4)
      } else {
        isWinner = Math.random() < characteristics.winRate
      }

      // Streak tracking
      if (isWinner) {
        winStreak++
        lossStreak = 0
      } else {
        lossStreak++
        winStreak = 0
      }

      // Generate realistic P&L with streaks
      let basePnLPercent: number
      if (isWinner) {
        const winMultiplier = 0.3 + Math.random() * 2.0 // Vary win sizes
        basePnLPercent = characteristics.avgWinSize * winMultiplier

        // Occasional big winner
        if (Math.random() < 0.05) {
          basePnLPercent *= 2.5
        }
      } else {
        const lossMultiplier = 0.5 + Math.random() * 1.5
        basePnLPercent = characteristics.avgLossSize * lossMultiplier

        // Occasional big loser during drawdowns
        if (inDrawdownPeriod && Math.random() < 0.15) {
          basePnLPercent *= 1.8
        }
      }

      const currentEquity = startingBalance + cumulativePnL
      const pnlUSD = (currentEquity * basePnLPercent) / 100

      // Update cumulative
      cumulativePnL += pnlUSD
      cumulativePnLPercent = (cumulativePnL / startingBalance) * 100

      // Track peak for drawdown calculation
      peakEquity = Math.max(peakEquity, cumulativePnL)
      const currentDrawdownPercent = peakEquity > 0
        ? ((cumulativePnL - peakEquity) / (startingBalance + peakEquity)) * 100
        : 0

      // Generate realistic run-up and drawdown
      const runUpPercent = isWinner
        ? Math.abs(basePnLPercent) * (1.2 + Math.random() * 0.5)
        : Math.abs(basePnLPercent) * (0.3 + Math.random() * 0.4)

      const drawdownPercent = !isWinner
        ? -Math.abs(basePnLPercent) * (0.8 + Math.random() * 0.4)
        : -Math.abs(basePnLPercent) * (0.2 + Math.random() * 0.3)

      const runUpUSD = (currentEquity * runUpPercent) / 100
      const drawdownUSD = (currentEquity * drawdownPercent) / 100

      // Direction and signal
      const isLong = Math.random() < characteristics.longShortRatio
      const signalOptions = isLong
        ? ['long', 'long_exit']
        : ['short', 'short_exit']
      const signal = signalOptions[Math.floor(Math.random() * signalOptions.length)]
      const type = isLong ? 'Entry long' : 'Entry short'
      const exitType = isLong ? 'Exit long' : 'Exit short'

      const basePrice = 25000 + Math.random() * 1500
      const price = basePrice

      // Entry trade
      trades.push({
        tradeNumber,
        type: type as any,
        dateTime: new Date(tradeDate),
        signal,
        priceUSD: price,
        positionSizeQty: 1,
        positionSizeValue: price,
        netPnLUSD: pnlUSD,
        netPnLPercent: basePnLPercent,
        runUpUSD: runUpUSD,
        runUpPercent: runUpPercent,
        drawdownUSD: drawdownUSD,
        drawdownPercent: currentDrawdownPercent,
        cumulativePnLUSD: cumulativePnL,
        cumulativePnLPercent: cumulativePnLPercent
      })

      // Exit trade
      const exitDate = new Date(tradeDate)
      exitDate.setMinutes(exitDate.getMinutes() + 30 + Math.floor(Math.random() * 180))

      const exitPrice = isWinner
        ? price * (1 + (isLong ? 1 : -1) * Math.abs(basePnLPercent / 100))
        : price * (1 + (isLong ? 1 : -1) * basePnLPercent / 100)

      trades.push({
        tradeNumber,
        type: exitType as any,
        dateTime: exitDate,
        signal: signal.includes('exit') ? signal : `${signal}_exit`,
        priceUSD: exitPrice,
        positionSizeQty: 1,
        positionSizeValue: exitPrice,
        netPnLUSD: pnlUSD,
        netPnLPercent: basePnLPercent,
        runUpUSD: runUpUSD,
        runUpPercent: runUpPercent,
        drawdownUSD: drawdownUSD,
        drawdownPercent: currentDrawdownPercent,
        cumulativePnLUSD: cumulativePnL,
        cumulativePnLPercent: cumulativePnLPercent
      })

      tradeNumber++
    }

    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return trades
}

/**
 * Create complete year-long dataset with real MS_FVI data
 */
export function createYearLongDataset(
  realTrades: TradeRecord[],
  targetYearLength: number = 365
): TradeRecord[] {
  if (realTrades.length === 0) {
    return []
  }

  // Analyze real trades
  const characteristics = analyzeTradingCharacteristics(realTrades)

  // Sort real trades to find date range
  const sortedReal = [...realTrades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  const firstRealDate = sortedReal[0].dateTime
  const lastRealDate = sortedReal[sortedReal.length - 1].dateTime

  // Calculate how many days of real data
  const realDays = Math.ceil(
    (lastRealDate.getTime() - firstRealDate.getTime()) / (1000 * 60 * 60 * 24)
  )

  // Calculate synthetic period
  const syntheticDays = Math.max(0, targetYearLength - realDays)

  // Generate synthetic start date (go back from first real trade)
  const syntheticStartDate = new Date(firstRealDate)
  syntheticStartDate.setDate(syntheticStartDate.getDate() - syntheticDays)

  // Generate synthetic trades
  const syntheticTrades = generateRealisticTrades(
    syntheticStartDate,
    firstRealDate,
    characteristics,
    100000
  )

  // Renumber all trades
  const combined = [...syntheticTrades, ...sortedReal]
  let newTradeNumber = 1

  const renumbered = combined.map(trade => {
    const result = { ...trade, tradeNumber: Math.ceil(newTradeNumber / 2) }
    if (trade.type.includes('Exit')) {
      newTradeNumber++
    }
    newTradeNumber++
    return result
  })

  // Recalculate cumulative P&L
  let runningPnL = 0
  let runningPnLPercent = 0

  return renumbered.map(trade => {
    if (trade.type.includes('Exit')) {
      runningPnL += trade.netPnLUSD
      runningPnLPercent += trade.netPnLPercent
    }

    return {
      ...trade,
      cumulativePnLUSD: runningPnL,
      cumulativePnLPercent: runningPnLPercent
    }
  })
}
