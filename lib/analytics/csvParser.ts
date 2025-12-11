/**
 * CSV Parser for Trading Data
 * Parses PFP_TReset CSV format into TypeScript objects
 */

import { TradeRecord, CompleteTrade } from './types'

/**
 * Parse CSV text into TradeRecord array
 */
export function parseCSV(csvText: string): TradeRecord[] {
  // Remove BOM if present
  const cleanText = csvText.replace(/^\uFEFF/, '')

  // Split into lines
  const lines = cleanText.split('\n').filter(line => line.trim())

  // Remove header line
  const dataLines = lines.slice(1)

  // Parse each line
  const trades: TradeRecord[] = []

  for (const line of dataLines) {
    try {
      const record = parseCSVLine(line)
      if (record) {
        trades.push(record)
      }
    } catch (error) {
      console.warn('Failed to parse CSV line:', line, error)
    }
  }

  return trades
}

/**
 * Parse a single CSV line into TradeRecord
 */
function parseCSVLine(line: string): TradeRecord | null {
  // Handle CSV parsing with proper quote handling
  const values = parseCSVRow(line)

  if (values.length < 15) {
    console.warn('Insufficient columns in CSV line:', values.length)
    return null
  }

  try {
    return {
      tradeNumber: parseInt(values[0]),
      type: values[1] as any,
      dateTime: parseDateTime(values[2]),
      signal: values[3],
      priceUSD: parseFloat(values[4]),
      positionSizeQty: parseFloat(values[5]),
      positionSizeValue: parseFloat(values[6]),
      netPnLUSD: parseFloat(values[7]),
      netPnLPercent: parseFloat(values[8]),
      runUpUSD: parseFloat(values[9]),
      runUpPercent: parseFloat(values[10]),
      drawdownUSD: parseFloat(values[11]),
      drawdownPercent: parseFloat(values[12]),
      cumulativePnLUSD: parseFloat(values[13]),
      cumulativePnLPercent: parseFloat(values[14])
    }
  } catch (error) {
    console.error('Error parsing CSV values:', values, error)
    return null
  }
}

/**
 * Parse CSV row handling quotes and commas
 */
function parseCSVRow(line: string): string[] {
  const values: string[] = []
  let current = ''
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === ',' && !inQuotes) {
      values.push(current.trim())
      current = ''
    } else {
      current += char
    }
  }

  // Push last value
  if (current) {
    values.push(current.trim())
  }

  return values
}

/**
 * Parse date/time string to Date object
 * Format: "2025-10-06 10:48"
 */
function parseDateTime(dateTimeStr: string): Date {
  // Parse YYYY-MM-DD HH:mm format
  const [datePart, timePart] = dateTimeStr.split(' ')
  const [year, month, day] = datePart.split('-').map(Number)
  const [hours, minutes] = timePart.split(':').map(Number)

  return new Date(year, month - 1, day, hours, minutes)
}

/**
 * Pair entry and exit records into complete trades
 */
export function pairTrades(trades: TradeRecord[]): CompleteTrade[] {
  const completeTrades: CompleteTrade[] = []

  // Group by trade number
  const tradeGroups = new Map<number, TradeRecord[]>()

  for (const trade of trades) {
    const existing = tradeGroups.get(trade.tradeNumber) || []
    existing.push(trade)
    tradeGroups.set(trade.tradeNumber, existing)
  }

  // Create complete trades from pairs
  for (const [tradeNum, records] of tradeGroups) {
    // Find entry and exit
    const entry = records.find(r => r.type.includes('Entry'))
    const exit = records.find(r => r.type.includes('Exit'))

    if (entry && exit) {
      const direction = entry.type.includes('long') ? 'long' : 'short'

      completeTrades.push({
        tradeNumber: tradeNum,
        entryDate: entry.dateTime,
        exitDate: exit.dateTime,
        signal: entry.signal,
        direction,
        entryPrice: entry.priceUSD,
        exitPrice: exit.priceUSD,
        positionSize: entry.positionSizeQty,
        netPnL: exit.netPnLUSD,
        netPnLPercent: exit.netPnLPercent,
        maxRunUp: Math.max(entry.runUpUSD, exit.runUpUSD),
        maxDrawdown: Math.min(entry.drawdownUSD, exit.drawdownUSD),
        duration: exit.dateTime.getTime() - entry.dateTime.getTime(),
        isWinner: exit.netPnLUSD > 0
      })
    }
  }

  return completeTrades.sort((a, b) => a.tradeNumber - b.tradeNumber)
}

/**
 * Get CSV metadata
 */
export function getCSVMetadata(trades: TradeRecord[], filename: string) {
  if (trades.length === 0) {
    return {
      filename,
      loadedAt: new Date(),
      totalRecords: 0,
      dateRange: { start: new Date(), end: new Date() }
    }
  }

  // Sort by date to find range
  const sorted = [...trades].sort((a, b) =>
    a.dateTime.getTime() - b.dateTime.getTime()
  )

  return {
    filename,
    loadedAt: new Date(),
    totalRecords: trades.length,
    dateRange: {
      start: sorted[0].dateTime,
      end: sorted[sorted.length - 1].dateTime
    }
  }
}

/**
 * Validate parsed trades
 */
export function validateTrades(trades: TradeRecord[]): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (trades.length === 0) {
    errors.push('No trades found in CSV')
    return { valid: false, errors }
  }

  // Check for required fields
  for (let i = 0; i < Math.min(trades.length, 10); i++) {
    const trade = trades[i]

    if (isNaN(trade.tradeNumber)) {
      errors.push(`Invalid trade number at row ${i + 1}`)
    }

    if (!(trade.dateTime instanceof Date) || isNaN(trade.dateTime.getTime())) {
      errors.push(`Invalid date at row ${i + 1}`)
    }

    if (isNaN(trade.priceUSD) || trade.priceUSD <= 0) {
      errors.push(`Invalid price at row ${i + 1}`)
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}
