'use client'

import { cn } from '@/lib/utils'

interface StatPillProps {
  label: string
  value: string
  className?: string
}

export const StatPill = ({ label, value, className }: StatPillProps) => {
  return (
    <div
      className={cn(
        'group px-5 py-3 rounded-full',
        'bg-[rgba(10,10,10,0.02)] dark:bg-[rgba(255,255,255,0.02)]',
        'backdrop-blur-md',
        'border border-border',
        'transition-all duration-300 ease-out',
        'hover:border-primary/40 hover:-translate-y-0.5',
        'hover:shadow-[0_4px_16px_hsl(var(--primary)/0.1)]',
        className
      )}
    >
      <div className="text-center">
        <div className="font-mono text-base font-semibold text-foreground tabular-nums mb-1">
          {value}
        </div>
        <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  )
}
