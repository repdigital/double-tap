'use client'

import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { formatDate } from '@/lib/analytics/formatters'

interface DateRangeFilterProps {
  value: { start: Date | null, end: Date | null }
  onChange: (value: { start: Date | null, end: Date | null }) => void
}

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-[var(--analytics-text-primary)]">
        Date Range
      </label>

      <div className="flex gap-2">
        {/* Start Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-start text-left font-normal bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-primary)] hover:bg-[var(--analytics-bg-tertiary)]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value.start ? formatDate(value.start, 'short') : 'Start date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value.start || undefined}
              onSelect={(date) => onChange({ ...value, start: date || null })}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* End Date */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="flex-1 justify-start text-left font-normal bg-[var(--analytics-bg-primary)] border-[var(--analytics-border-primary)] text-[var(--analytics-text-primary)] hover:bg-[var(--analytics-bg-tertiary)]"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {value.end ? formatDate(value.end, 'short') : 'End date'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={value.end || undefined}
              onSelect={(date) => onChange({ ...value, end: date || null })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
