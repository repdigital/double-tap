'use client'

import { useState, useMemo } from 'react'
import { TradeRecord } from '@/lib/analytics/types'
import { formatCurrency, formatPercent, formatDate, formatTime } from '@/lib/analytics/formatters'
import { ArrowUpDown, ArrowUp, ArrowDown, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HistoryTabProps {
  trades: TradeRecord[]
}

type SortField = 'tradeNumber' | 'dateTime' | 'signal' | 'priceUSD' | 'netPnLUSD' | 'netPnLPercent' | 'cumulativePnLUSD'
type SortDirection = 'asc' | 'desc'

export function HistoryTab({ trades }: HistoryTabProps) {
  const [sortField, setSortField] = useState<SortField>('tradeNumber')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(50)

  // Sort trades
  const sortedTrades = useMemo(() => {
    return [...trades].sort((a, b) => {
      const aVal = a[sortField]
      const bVal = b[sortField]

      if (aVal instanceof Date && bVal instanceof Date) {
        return sortDirection === 'asc'
          ? aVal.getTime() - bVal.getTime()
          : bVal.getTime() - aVal.getTime()
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortDirection === 'asc' ? aVal - bVal : bVal - aVal
      }

      return sortDirection === 'asc'
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal))
    })
  }, [trades, sortField, sortDirection])

  // Pagination
  const totalPages = Math.ceil(sortedTrades.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedTrades = sortedTrades.slice(startIndex, endIndex)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const exportToCSV = () => {
    const headers = [
      'Trade #', 'Type', 'Date/Time', 'Signal', 'Price', 'Position Size',
      'Net P&L', 'Net P&L %', 'Run-up', 'Drawdown', 'Cumulative P&L'
    ]

    const rows = sortedTrades.map(trade => [
      trade.tradeNumber,
      trade.type,
      formatDate(trade.dateTime, 'medium'),
      trade.signal,
      trade.priceUSD,
      trade.positionSizeQty,
      trade.netPnLUSD,
      trade.netPnLPercent,
      trade.runUpUSD,
      trade.drawdownUSD,
      trade.cumulativePnLUSD
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `trading-history-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--analytics-text-primary)]">
            Trade History
          </h2>
          <p className="text-sm text-[var(--analytics-text-muted)] mt-1">
            Complete record of all {trades.length} trades
          </p>
        </div>

        <Button
          onClick={exportToCSV}
          className="bg-[var(--analytics-positive)] hover:bg-[var(--analytics-positive)]/90 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Table */}
      <div className="bg-[var(--analytics-bg-secondary)] border border-[var(--analytics-border-primary)] rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--analytics-bg-tertiary)] border-b border-[var(--analytics-border-primary)]">
              <tr>
                <SortableHeader
                  label="Trade #"
                  field="tradeNumber"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-4 py-3 text-left text-xs font-medium text-[var(--analytics-text-muted)] uppercase tracking-wider">
                  Type
                </th>
                <SortableHeader
                  label="Date/Time"
                  field="dateTime"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Signal"
                  field="signal"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <SortableHeader
                  label="Price"
                  field="priceUSD"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-4 py-3 text-right text-xs font-medium text-[var(--analytics-text-muted)] uppercase tracking-wider">
                  Position
                </th>
                <SortableHeader
                  label="P&L"
                  field="netPnLUSD"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                  align="right"
                />
                <SortableHeader
                  label="P&L %"
                  field="netPnLPercent"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                  align="right"
                />
                <SortableHeader
                  label="Cumulative"
                  field="cumulativePnLUSD"
                  currentField={sortField}
                  direction={sortDirection}
                  onSort={handleSort}
                  align="right"
                />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--analytics-border-primary)]">
              {paginatedTrades.map((trade) => (
                <tr
                  key={`${trade.tradeNumber}-${trade.dateTime.getTime()}`}
                  className="hover:bg-[var(--analytics-bg-tertiary)] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-sm text-[var(--analytics-text-primary)]">
                    {trade.tradeNumber}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--analytics-text-secondary)]">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      trade.type.includes('long')
                        ? 'bg-[var(--analytics-positive)]/10 text-[var(--analytics-positive)]'
                        : 'bg-[var(--analytics-negative)]/10 text-[var(--analytics-negative)]'
                    }`}>
                      {trade.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-[var(--analytics-text-secondary)]">
                    <div>{formatDate(trade.dateTime, 'short')}</div>
                    <div className="text-xs text-[var(--analytics-text-muted)]">
                      {formatTime(trade.dateTime)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--analytics-text-secondary)]">
                    {trade.signal}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-[var(--analytics-text-primary)]">
                    ${trade.priceUSD.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-right text-[var(--analytics-text-secondary)]">
                    {trade.positionSizeQty}
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm text-right font-semibold ${
                    trade.netPnLUSD >= 0 ? 'text-[var(--analytics-positive)]' : 'text-[var(--analytics-negative)]'
                  }`}>
                    {formatCurrency(trade.netPnLUSD)}
                  </td>
                  <td className={`px-4 py-3 font-mono text-sm text-right ${
                    trade.netPnLPercent >= 0 ? 'text-[var(--analytics-positive)]' : 'text-[var(--analytics-negative)]'
                  }`}>
                    {formatPercent(trade.netPnLPercent)}
                  </td>
                  <td className="px-4 py-3 font-mono text-sm text-right text-[var(--analytics-text-primary)] font-semibold">
                    {formatCurrency(trade.cumulativePnLUSD)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-[var(--analytics-border-primary)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--analytics-text-muted)]">
              Showing {startIndex + 1} - {Math.min(endIndex, sortedTrades.length)} of {sortedTrades.length}
            </span>

            <select
              value={rowsPerPage}
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value))
                setCurrentPage(1)
              }}
              className="px-3 py-1 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded text-sm text-[var(--analytics-text-primary)]"
            >
              <option value="25">25 per page</option>
              <option value="50">50 per page</option>
              <option value="100">100 per page</option>
              <option value="500">500 per page</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)]"
            >
              Previous
            </Button>

            <span className="text-sm text-[var(--analytics-text-secondary)] px-4">
              Page {currentPage} of {totalPages}
            </span>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)]"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SortableHeader({
  label,
  field,
  currentField,
  direction,
  onSort,
  align = 'left'
}: {
  label: string
  field: SortField
  currentField: SortField
  direction: SortDirection
  onSort: (field: SortField) => void
  align?: 'left' | 'right'
}) {
  const isActive = currentField === field

  return (
    <th
      className={`px-4 py-3 text-${align} text-xs font-medium text-[var(--analytics-text-muted)] uppercase tracking-wider cursor-pointer hover:text-[var(--analytics-text-primary)] transition-colors`}
      onClick={() => onSort(field)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : ''}`}>
        {label}
        {isActive ? (
          direction === 'asc' ? (
            <ArrowUp className="h-3 w-3" />
          ) : (
            <ArrowDown className="h-3 w-3" />
          )
        ) : (
          <ArrowUpDown className="h-3 w-3 opacity-30" />
        )}
      </div>
    </th>
  )
}
