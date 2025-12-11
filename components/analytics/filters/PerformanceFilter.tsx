'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PerformanceFilterProps {
  value: 'all' | 'winners' | 'losers'
  onChange: (value: 'all' | 'winners' | 'losers') => void
}

export function PerformanceFilter({ value, onChange }: PerformanceFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
        Performance
      </label>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-primary)]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Trades</SelectItem>
          <SelectItem value="winners">Winners Only</SelectItem>
          <SelectItem value="losers">Losers Only</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
