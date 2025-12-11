'use client'

import { cn } from '@/lib/utils'

interface DayOfWeekFilterProps {
  value: boolean[] // [sun, mon, tue, wed, thu, fri, sat]
  onChange: (value: boolean[]) => void
}

const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S']
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export function DayOfWeekFilter({ value, onChange }: DayOfWeekFilterProps) {
  const toggleDay = (index: number) => {
    const newValue = [...value]
    newValue[index] = !newValue[index]
    onChange(newValue)
  }

  const toggleAll = () => {
    const allSelected = value.every(d => d)
    onChange(value.map(() => !allSelected))
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
          Days of Week
        </label>
        <button
          onClick={toggleAll}
          className="text-xs text-[var(--analytics-text-muted)] hover:text-[var(--analytics-text-primary)] transition-colors"
        >
          {value.every(d => d) ? 'Deselect All' : 'Select All'}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {dayLabels.map((label, index) => (
          <button
            key={index}
            onClick={() => toggleDay(index)}
            title={dayNames[index]}
            className={cn(
              "aspect-square flex items-center justify-center rounded-lg text-xs font-semibold transition-all border",
              value[index]
                ? "bg-[var(--analytics-positive)]/10 border-[var(--analytics-positive)] text-[var(--analytics-positive)]"
                : "bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-secondary)] hover:border-[var(--analytics-border-hover)]"
            )}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}
