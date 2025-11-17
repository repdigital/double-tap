// Mock data generators for TradingView charts

export interface TimeSeriesData {
  time: string
  value: number
}

export interface CandlestickData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

export interface VolumeData {
  time: string
  value: number
  color?: string
}

// Generate performance chart data (30-90 days)
export function generatePerformanceData(days: number = 30): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let value = 10000 // Starting portfolio value

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    // Simulate realistic trading returns (upward trend with volatility)
    const dailyReturn = (Math.random() - 0.35) * 0.03 // Slight positive bias
    value *= (1 + dailyReturn)

    data.push({
      time: date.toISOString().split('T')[0],
      value: Math.round(value * 100) / 100
    })
  }

  return data
}

// Generate comparison data (S&P 500 vs Strategy)
export function generateComparisonData(days: number = 30): {
  strategy: TimeSeriesData[]
  benchmark: TimeSeriesData[]
} {
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let strategyValue = 10000
  let benchmarkValue = 10000

  const strategy: TimeSeriesData[] = []
  const benchmark: TimeSeriesData[] = []

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const timeStr = date.toISOString().split('T')[0]

    // Strategy: higher returns, more volatile
    strategyValue *= (1 + (Math.random() - 0.35) * 0.03)

    // Benchmark: lower returns, less volatile
    benchmarkValue *= (1 + (Math.random() - 0.4) * 0.015)

    strategy.push({
      time: timeStr,
      value: Math.round(strategyValue * 100) / 100
    })

    benchmark.push({
      time: timeStr,
      value: Math.round(benchmarkValue * 100) / 100
    })
  }

  return { strategy, benchmark }
}

// Generate candlestick data for trade analysis
export function generateCandlestickData(count: number = 20): CandlestickData[] {
  const data: CandlestickData[] = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - count)

  let basePrice = 5200

  for (let i = 0; i < count; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    const open = basePrice + (Math.random() - 0.5) * 20
    const close = open + (Math.random() - 0.35) * 30 // Slight upward bias
    const high = Math.max(open, close) + Math.random() * 15
    const low = Math.min(open, close) - Math.random() * 15

    data.push({
      time: date.toISOString().split('T')[0],
      open: Math.round(open * 100) / 100,
      high: Math.round(high * 100) / 100,
      low: Math.round(low * 100) / 100,
      close: Math.round(close * 100) / 100
    })

    basePrice = close
  }

  return data
}

// Generate volume data
export function generateVolumeData(days: number = 30): VolumeData[] {
  const data: VolumeData[] = []
  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)

    data.push({
      time: date.toISOString().split('T')[0],
      value: Math.floor(Math.random() * 50 + 10),
      color: Math.random() > 0.4 ? '#03873E' : '#DC2626'
    })
  }

  return data
}

// Generate histogram data for drawdown analysis
export function generateHistogramData(): { value: number; count: number }[] {
  return [
    { value: -5, count: 2 },
    { value: -4, count: 3 },
    { value: -3, count: 5 },
    { value: -2, count: 12 },
    { value: -1, count: 28 },
    { value: 0, count: 45 },
    { value: 1, count: 52 },
    { value: 2, count: 38 },
    { value: 3, count: 18 },
    { value: 4, count: 8 },
    { value: 5, count: 4 }
  ]
}

// Generate live signal strength data (for real-time simulation)
export function generateSignalData(points: number = 60): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const now = new Date()

  for (let i = points; i > 0; i--) {
    const time = new Date(now.getTime() - i * 2000) // 2 seconds apart
    const value = Math.sin(i * 0.2) * 50 + (Math.random() - 0.5) * 20

    data.push({
      time: time.toISOString(),
      value: Math.round(value * 100) / 100
    })
  }

  return data
}

// Generate latency data (execution speed)
export function generateLatencyData(points: number = 100): TimeSeriesData[] {
  const data: TimeSeriesData[] = []
  const startDate = new Date()
  startDate.setHours(9, 30, 0, 0) // Market open

  for (let i = 0; i < points; i++) {
    const time = new Date(startDate.getTime() + i * 60000) // 1 minute apart
    // Most trades execute fast, occasional spike
    const latency = Math.random() > 0.95
      ? Math.random() * 300 + 150
      : Math.random() * 80 + 20

    data.push({
      time: time.toISOString(),
      value: Math.round(latency * 100) / 100
    })
  }

  return data
}

// Generate position data (multi-instrument)
export function generatePositionData(hours: number = 6): {
  es: TimeSeriesData[]
  nq: TimeSeriesData[]
  ym: TimeSeriesData[]
  rty: TimeSeriesData[]
} {
  const startDate = new Date()
  startDate.setHours(startDate.getHours() - hours)

  const generateInstrument = (baseValue: number, volatility: number) => {
    const data: TimeSeriesData[] = []
    let value = baseValue

    for (let i = 0; i < hours * 60; i += 5) { // Every 5 minutes
      const time = new Date(startDate.getTime() + i * 60000)
      value += (Math.random() - 0.5) * volatility
      value = Math.max(0, value) // Can't be negative

      data.push({
        time: time.toISOString(),
        value: Math.round(value * 100) / 100
      })
    }

    return data
  }

  return {
    es: generateInstrument(15000, 2000),
    nq: generateInstrument(12000, 1500),
    ym: generateInstrument(8000, 1000),
    rty: generateInstrument(5000, 800)
  }
}

// Generate Fit Tea growth data (2010-2015)
export function generateFitTeaGrowthData(): TimeSeriesData[] {
  const years = [
    { year: 2010, value: 10000 },
    { year: 2011, value: 150000 },
    { year: 2012, value: 2500000 },
    { year: 2013, value: 15000000 },
    { year: 2014, value: 58000000 },
    { year: 2015, value: 100000000 }
  ]

  return years.map(({ year, value }) => ({
    time: `${year}-06-01`,
    value
  }))
}

// Generate monthly returns heatmap data
export function generateMonthlyReturnsData(): {
  year: number
  month: number
  return: number
}[] {
  const data: { year: number; month: number; return: number }[] = []
  const currentYear = new Date().getFullYear()

  for (let year = currentYear - 2; year <= currentYear; year++) {
    const monthsInYear = year === currentYear ? new Date().getMonth() + 1 : 12

    for (let month = 1; month <= monthsInYear; month++) {
      // Most months positive, occasional negative
      const returnValue = Math.random() > 0.2
        ? Math.random() * 15 + 1  // Positive return 1-16%
        : Math.random() * -8      // Negative return 0 to -8%

      data.push({
        year,
        month,
        return: Math.round(returnValue * 100) / 100
      })
    }
  }

  return data
}

// Generate equity curve with drawdown zones
export function generateEquityCurveData(days: number = 365): {
  equity: TimeSeriesData[]
  drawdowns: { start: string; end: string; depth: number }[]
} {
  const equity: TimeSeriesData[] = []
  const drawdowns: { start: string; end: string; depth: number }[] = []

  const startDate = new Date()
  startDate.setDate(startDate.getDate() - days)

  let value = 10000
  let peak = value
  let drawdownStart: string | null = null
  let maxDrawdown = 0

  for (let i = 0; i < days; i++) {
    const date = new Date(startDate)
    date.setDate(date.getDate() + i)
    const timeStr = date.toISOString().split('T')[0]

    // Simulate realistic returns
    const dailyReturn = (Math.random() - 0.38) * 0.025
    value *= (1 + dailyReturn)

    equity.push({
      time: timeStr,
      value: Math.round(value * 100) / 100
    })

    // Track drawdowns
    if (value > peak) {
      if (drawdownStart && maxDrawdown < -5) {
        drawdowns.push({
          start: drawdownStart,
          end: equity[i - 1].time,
          depth: maxDrawdown
        })
      }
      peak = value
      drawdownStart = null
      maxDrawdown = 0
    } else {
      if (!drawdownStart) {
        drawdownStart = timeStr
      }
      const currentDrawdown = ((value - peak) / peak) * 100
      if (currentDrawdown < maxDrawdown) {
        maxDrawdown = currentDrawdown
      }
    }
  }

  return { equity, drawdowns }
}

// Generate distribution data (returns histogram)
export function generateDistributionData(): { bin: number; count: number }[] {
  // Normal distribution centered slightly positive
  const data: { bin: number; count: number }[] = []

  for (let i = -10; i <= 10; i += 0.5) {
    const distance = Math.abs(i - 0.3) // Centered at +0.3%
    const count = Math.round(100 * Math.exp(-(distance * distance) / 2))

    data.push({
      bin: i,
      count
    })
  }

  return data
}
