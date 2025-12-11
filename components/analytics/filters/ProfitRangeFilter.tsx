'use client'

interface ProfitRangeFilterProps {
  value: { min: number | null, max: number | null }
  onChange: (value: { min: number | null, max: number | null }) => void
}

export function ProfitRangeFilter({ value, onChange }: ProfitRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
        Profit Range ($)
      </label>

      <div className="flex gap-2">
        <input
          type="number"
          placeholder="Min $"
          value={value.min ?? ''}
          onChange={(e) => onChange({
            ...value,
            min: e.target.value ? parseFloat(e.target.value) : null
          })}
          className="flex-1 px-3 py-2 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg text-[var(--analytics-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--analytics-positive)]"
        />
        <input
          type="number"
          placeholder="Max $"
          value={value.max ?? ''}
          onChange={(e) => onChange({
            ...value,
            max: e.target.value ? parseFloat(e.target.value) : null
          })}
          className="flex-1 px-3 py-2 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg text-[var(--analytics-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--analytics-positive)]"
        />
      </div>
    </div>
  )
}
