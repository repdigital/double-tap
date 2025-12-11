'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DirectionFilterProps {
  value: { long: boolean, short: boolean }
  onChange: (value: { long: boolean, short: boolean }) => void
}

export function DirectionFilter({ value, onChange }: DirectionFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
        Direction
      </label>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onChange({ ...value, long: !value.long })}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all",
            value.long
              ? "bg-[var(--analytics-positive)]/10 border-[var(--analytics-positive)] text-[var(--analytics-positive)]"
              : "bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-secondary)] hover:border-[var(--analytics-border-hover)]"
          )}
        >
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-medium">Long</span>
        </button>

        <button
          onClick={() => onChange({ ...value, short: !value.short })}
          className={cn(
            "flex items-center justify-center gap-2 px-4 py-2 rounded-lg border transition-all",
            value.short
              ? "bg-[var(--analytics-negative)]/10 border-[var(--analytics-negative)] text-[var(--analytics-negative)]"
              : "bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-secondary)] hover:border-[var(--analytics-border-hover)]"
          )}
        >
          <TrendingDown className="h-4 w-4" />
          <span className="text-sm font-medium">Short</span>
        </button>
      </div>
    </div>
  )
}
