/**
 * Trading Analytics Platform - TypeScript Type Definitions
 * Complete type system for comprehensive trading data analysis
 */

// ============================================
// CSV DATA STRUCTURE (from PFP_TReset file)
// ============================================

/**
 * Raw trade record from CSV file
 * Maps directly to CSV columns
 */
export interface TradeRecord {
  tradeNumber: number       // "Trade #" column
  type: 'Entry long' | 'Entry short' | 'Exit long' | 'Exit short'  // "Type" column
  dateTime: Date            // "Date/Time" column
  signal: string            // "Signal" column (short, long, Time Exit, etc.)
  priceUSD: number          // "Price USD" column
  positionSizeQty: number   // "Position size (qty)" column
  positionSizeValue: number // "Position size (value)" column
  netPnLUSD: number         // "Net P&L USD" column
  netPnLPercent: number     // "Net P&L %" column
  runUpUSD: number          // "Run-up USD" column
  runUpPercent: number      // "Run-up %" column
  drawdownUSD: number       // "Drawdown USD" column
  drawdownPercent: number   // "Drawdown %" column
  cumulativePnLUSD: number  // "Cumulative P&L USD" column
  cumulativePnLPercent: number // "Cumulative P&L %" column
}

/**
 * Paired trade (entry + exit combined)
 */
export interface CompleteTrade {
  tradeNumber: number
  entryDate: Date
  exitDate: Date
  signal: string
  direction: 'long' | 'short'
  entryPrice: number
  exitPrice: number
  positionSize: number
  netPnL: number
  netPnLPercent: number
  maxRunUp: number
  maxDrawdown: number
  duration: number  // milliseconds
  isWinner: boolean
}

// ============================================
// TIME SERIES DATA
// ============================================

export interface TimeSeriesData {
  time: string | Date  // ISO date string or Date object
  value: number
}

export interface CandlestickData {
  time: string
  open: number
  high: number
  low: number
  close: number
}

// ============================================
// ACCOUNT METRICS
// ============================================

export interface AccountMetrics {
  balance: number
  equity: number
  floatingPnL: number
  closedProfit: number
  totalReturn: number
  monthlyReturn: number
  weeklyReturn: number
  peakDrawdown: number

  // Additional account stats
  startingBalance: number
  currentBalance: number
  highestBalance: number
  lowestDrawdown: number
}

// ============================================
// PERFORMANCE METRICS
// ============================================

export interface PerformanceMetrics {
  // Win Rate
  tradeWinPercent: number
  totalTrades: number
  winningTrades: number
  losingTrades: number

  // Profitability
  profitFactor: number
  averageResult: number
  averageWin: number
  averageLoss: number
  bestTrade: number
  worstTrade: number

  // Volume
  totalPnL: number
  totalPnLPercent: number
  totalRunUp: number
  totalDrawdown: number

  // Duration
  avgTradeLength: number  // hours
  avgWinDuration: number
  avgLossDuration: number
  shortestTrade: number
  longestTrade: number

  // Time-based
  tradesPerDay: number
  historyDuration: number  // days
  tradingDays: number

  // Risk metrics
  riskRewardRatio: number
  expectancy: number

  // Worst case
  worstDay: number
  worstWeek: number
  worstMonth: number
}

// ============================================
// RISK METRICS
// ============================================

export interface RiskMetrics {
  // Drawdown
  maxDrawdown: number
  maxDrawdownPercent: number
  maxDrawdownDuration: number  // days
  currentDrawdown: number
  averageDrawdown: number

  // Risk Ratios
  sharpeRatio: number
  sortinoRatio: number
  calmarRatio: number
  sterlingRatio: number
  recoveryFactor: number

  // Consecutive tracking
  maxConsecutiveWins: number
  maxConsecutiveLosses: number
  currentStreak: number
  currentStreakType: 'win' | 'loss' | 'none'

  // Risk of Ruin
  riskOfRuin: number

  // Volatility
  standardDeviation: number
  coefficientOfVariation: number
  ulcerIndex: number

  // Value at Risk
  valueAtRisk95: number
  valueAtRisk99: number
  conditionalVaR95: number
  conditionalVaR99: number
}

// ============================================
// STATISTICAL METRICS
// ============================================

export interface StatisticalMetrics {
  // Distribution
  mean: number
  median: number
  mode: number
  standardDeviation: number
  variance: number
  skewness: number
  kurtosis: number

  // Quartiles
  q1: number
  q2: number
  q3: number
  iqr: number

  // Range
  min: number
  max: number
  range: number

  // Correlation
  profitDurationCorrelation: number
  sizeReturnCorrelation: number

  // Additional
  coefficientOfVariation: number
  zScore: number
}

// ============================================
// AGGREGATED DATA
// ============================================

export interface DailyStats {
  date: Date
  trades: number
  netPnL: number
  netPnLPercent: number
  winners: number
  losers: number
  winRate: number
  runUp: number
  drawdown: number
}

export interface WeeklyStats {
  weekStart: Date
  weekEnd: Date
  trades: number
  netPnL: number
  netPnLPercent: number
  winners: number
  losers: number
  winRate: number
}

export interface MonthlyStats {
  year: number
  month: number
  monthName: string
  trades: number
  netPnL: number
  netPnLPercent: number
  winners: number
  losers: number
  winRate: number
  bestDay: number
  worstDay: number
}

export interface HourlyStats {
  hour: number  // 0-23
  trades: number
  netPnL: number
  averagePnL: number
  winRate: number
}

export interface DayOfWeekStats {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6  // Sunday = 0
  dayName: string
  trades: number
  netPnL: number
  averagePnL: number
  winRate: number
}

export interface SignalStats {
  signal: string
  trades: number
  netPnL: number
  averagePnL: number
  winRate: number
  avgDuration: number
}

// ============================================
// FILTER STATE
// ============================================

export interface FilterState {
  dateRange: {
    start: Date | null
    end: Date | null
  }

  positionSize: {
    min: number | null
    max: number | null
  }

  signals: {
    include: string[]
    exclude: string[]
  }

  direction: {
    long: boolean
    short: boolean
  }

  daysOfWeek: boolean[]  // [sun, mon, tue, wed, thu, fri, sat]

  hoursOfDay: {
    ranges: Array<{ start: number, end: number }>
    specific: number[]
  }

  profitRange: {
    min: number | null
    max: number | null
  }

  returnRange: {
    min: number | null  // percent
    max: number | null
  }

  tradeType: {
    entry: boolean
    exit: boolean
  }

  performanceFilter: 'all' | 'winners' | 'losers'
}

// Default filter state
export const DEFAULT_FILTERS: FilterState = {
  dateRange: { start: null, end: null },
  positionSize: { min: null, max: null },
  signals: { include: [], exclude: [] },
  direction: { long: true, short: true },
  daysOfWeek: [true, true, true, true, true, true, true],
  hoursOfDay: { ranges: [], specific: [] },
  profitRange: { min: null, max: null },
  returnRange: { min: null, max: null },
  tradeType: { entry: true, exit: true },
  performanceFilter: 'all'
}

// ============================================
// CHART DATA TYPES
// ============================================

export interface HistogramData {
  bin: string
  count: number
  percentage: number
}

export interface PieChartData {
  name: string
  value: number
  percentage: number
}

export interface HeatmapCell {
  x: number | string
  y: number | string
  value: number
  color?: string
}

export interface ScatterData {
  x: number
  y: number
  label?: string
  color?: string
}

// ============================================
// COMPLETE ANALYTICS STATE
// ============================================

export interface AnalyticsState {
  // Raw Data
  rawTrades: TradeRecord[]
  completeTrades: CompleteTrade[]

  // CSV Metadata
  csvMetadata: {
    filename: string
    loadedAt: Date
    totalRecords: number
    dateRange: { start: Date, end: Date }
  }

  // Filtered Data
  filteredTrades: TradeRecord[]
  filteredCompleteTrades: CompleteTrade[]
  filterState: FilterState

  // Calculated Metrics
  metrics: {
    account: AccountMetrics
    performance: PerformanceMetrics
    risk: RiskMetrics
    statistics: StatisticalMetrics
  }

  // Time Series Data
  timeSeries: {
    equity: TimeSeriesData[]
    drawdown: TimeSeriesData[]
    dailyPnL: TimeSeriesData[]
    weeklyPnL: TimeSeriesData[]
    monthlyPnL: TimeSeriesData[]
    cumulativeReturn: TimeSeriesData[]
    runningWinRate: TimeSeriesData[]
  }

  // Aggregated Data
  aggregations: {
    daily: DailyStats[]
    weekly: WeeklyStats[]
    monthly: MonthlyStats[]
    hourly: HourlyStats[]
    dayOfWeek: DayOfWeekStats[]
    bySignal: SignalStats[]
  }

  // UI State
  ui: {
    activeTab: 'overview' | 'analysis' | 'statistics' | 'risk' | 'history'
    filterPanelOpen: boolean
    selectedCharts: string[]
    loading: boolean
    error: string | null
  }
}

// ============================================
// UTILITY TYPES
// ============================================

export type TrendDirection = 'up' | 'down' | 'neutral'

export type ChartType = 'line' | 'area' | 'column' | 'bar' | 'pie' | 'scatter' | 'heatmap' | 'histogram' | 'boxplot'

export type TimeFrame = 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'all'

export type MetricFormat = 'currency' | 'percent' | 'number' | 'duration' | 'date'
