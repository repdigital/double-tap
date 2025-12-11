/**
 * Static Transparency Section Data
 * Uses consistent year-long MS_FVI dataset (doesn't change on each render)
 */

import { TimeSeriesData } from './analytics/types'

// Static seed for consistent data generation
const STATIC_SEED = 12345

// Seeded random number generator for consistency
function seededRandom(seed: number) {
  let value = seed
  return function() {
    value = (value * 9301 + 49297) % 233280
    return value / 233280
  }
}

/**
 * Generate static equity curve data (always the same)
 */
export function getStaticEquityCurve(): { equity: TimeSeriesData[], drawdowns: any[] } {
  const random = seededRandom(STATIC_SEED)
  const equity: TimeSeriesData[] = []
  const drawdowns: any[] = []

  let currentValue = 10000
  let peak = currentValue
  let drawdownStart: string | null = null

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - 365)

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Progressive growth with realistic drawdowns
    const dailyReturn = (random() - 0.38) * 0.025
    currentValue = currentValue * (1 + dailyReturn)

    // Track drawdowns
    if (currentValue > peak) {
      peak = currentValue
      if (drawdownStart) {
        const depth = ((peak - currentValue) / peak) * 100
        if (depth > 5) {
          drawdowns.push({
            start: drawdownStart,
            end: date.toISOString().split('T')[0],
            depth
          })
        }
        drawdownStart = null
      }
    } else {
      if (!drawdownStart) {
        drawdownStart = date.toISOString().split('T')[0]
      }
    }

    equity.push({
      time: date.toISOString().split('T')[0],
      value: currentValue
    })
  }

  return { equity, drawdowns }
}

/**
 * Generate static monthly returns (always the same)
 * Calculated FROM the equity curve data for consistency
 * Shows exactly last 12 consecutive months with all cells having data
 */
export function getStaticMonthlyReturns(): Array<{ year: number, month: number, return: number }> {
  const { equity } = getStaticEquityCurve()

  if (equity.length === 0) return []

  // Get last date from equity curve
  const lastDate = new Date(equity[equity.length - 1].time)
  const data: Array<{ year: number, month: number, return: number }> = []

  // Generate exactly 12 months going backwards
  for (let i = 11; i >= 0; i--) {
    const targetDate = new Date(lastDate)
    targetDate.setMonth(lastDate.getMonth() - i)

    const year = targetDate.getFullYear()
    const month = targetDate.getMonth()

    // Find all equity points for this month
    const monthEquity = equity.filter(e => {
      const d = new Date(e.time)
      return d.getFullYear() === year && d.getMonth() === month
    })

    if (monthEquity.length > 0) {
      // Calculate return for this month
      const startValue = monthEquity[0].value
      const endValue = monthEquity[monthEquity.length - 1].value
      const monthReturn = ((endValue - startValue) / startValue) * 100

      data.push({
        year,
        month,
        return: monthReturn
      })
    } else {
      // If no data, use small positive return to avoid gray cells
      data.push({
        year,
        month,
        return: 0.5 + Math.random() * 2
      })
    }
  }

  return data
}

/**
 * Generate static return distribution (always the same)
 * Calculated FROM daily returns in equity curve for consistency
 */
export function getStaticDistribution(): Array<{ bin: number, count: number }> {
  const { equity } = getStaticEquityCurve()

  // Calculate daily returns from equity curve
  const dailyReturns: number[] = []
  for (let i = 1; i < equity.length; i++) {
    const dailyReturn = ((equity[i].value - equity[i-1].value) / equity[i-1].value) * 100
    dailyReturns.push(dailyReturn)
  }

  // Create more granular histogram bins (30 bins from -3% to +3%)
  const binSize = 0.2 // Smaller bins for more detail
  const minBin = -3
  const maxBin = 3
  const numBins = Math.ceil((maxBin - minBin) / binSize)

  const distribution: Map<number, number> = new Map()

  // Initialize all bins with 0
  for (let i = 0; i < numBins; i++) {
    const binValue = minBin + i * binSize
    distribution.set(Math.round(binValue * 10) / 10, 0)
  }

  // Count returns in each bin
  for (const returnVal of dailyReturns) {
    const binIndex = Math.floor((returnVal - minBin) / binSize)
    const clampedBin = Math.max(0, Math.min(numBins - 1, binIndex))
    const binValue = Math.round((minBin + clampedBin * binSize) * 10) / 10
    distribution.set(binValue, (distribution.get(binValue) || 0) + 1)
  }

  return Array.from(distribution.entries())
    .map(([bin, count]) => ({ bin, count }))
    .filter(d => d.count > 0) // Only show bins with data
    .sort((a, b) => a.bin - b.bin)
}
