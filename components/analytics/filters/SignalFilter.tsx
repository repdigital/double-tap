'use client'

import { X } from 'lucide-react'

interface SignalFilterProps {
  value: { include: string[], exclude: string[] }
  onChange: (value: { include: string[], exclude: string[] }) => void
}

export function SignalFilter({ value, onChange }: SignalFilterProps) {
  const handleAddInclude = (signal: string) => {
    if (signal && !value.include.includes(signal)) {
      onChange({
        ...value,
        include: [...value.include, signal]
      })
    }
  }

  const handleRemoveInclude = (signal: string) => {
    onChange({
      ...value,
      include: value.include.filter(s => s !== signal)
    })
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
        Signal Filter
      </label>

      <input
        type="text"
        placeholder="Enter signal (e.g., short, long, Time Exit)"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddInclude(e.currentTarget.value)
            e.currentTarget.value = ''
          }
        }}
        className="w-full px-3 py-2 bg-[var(--analytics-bg-primary)] border border-[var(--analytics-border-primary)] rounded-lg text-[var(--analytics-text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--analytics-positive)]"
      />

      {value.include.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.include.map(signal => (
            <div
              key={signal}
              className="flex items-center gap-1 px-2 py-1 bg-[var(--analytics-positive)]/10 border border-[var(--analytics-positive)]/20 rounded text-sm text-[var(--analytics-positive)]"
            >
              <span>{signal}</span>
              <button
                onClick={() => handleRemoveInclude(signal)}
                className="hover:opacity-70"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
