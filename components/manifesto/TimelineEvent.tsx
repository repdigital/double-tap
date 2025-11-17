'use client'

import { motion } from 'framer-motion'
import { X, Check, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineEventProps {
  event: {
    day: number
    type: 'success' | 'warning' | 'failure'
    title: string
    description: string
    equity: number
    drawdown?: number
  }
  isFailure: boolean
  delay: number
  isInView: boolean
}

export const TimelineEvent = ({ event, isFailure, delay, isInView }: TimelineEventProps) => {
  const iconMap = {
    success: Check,
    warning: AlertTriangle,
    failure: X
  }

  const Icon = iconMap[event.type]

  const getColor = () => {
    if (isFailure) {
      return 'text-muted-foreground'
    } else {
      if (event.type === 'success') return 'text-primary'
      if (event.type === 'warning') return 'text-amber-500'
      return 'text-destructive'
    }
  }

  return (
    <motion.div
      className={cn(
        'flex items-start gap-3',
        isFailure ? 'opacity-60' : 'opacity-100'
      )}
      initial={{
        opacity: 0,
        x: isFailure ? -20 : 20
      }}
      animate={isInView ? {
        opacity: isFailure ? 0.6 : 1,
        x: 0
      } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      {/* Icon */}
      <div className={cn('mt-1 flex-shrink-0', getColor())}>
        <Icon size={16} strokeWidth={2.5} />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Day + Title */}
        <div className="flex flex-wrap items-baseline gap-2 md:gap-3 mb-1">
          <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
            Day {event.day}
          </span>
          <span className={cn(
            'font-mono text-sm font-semibold',
            isFailure ? 'text-muted-foreground' : 'text-foreground'
          )}>
            {event.title}
          </span>
        </div>

        {/* Description */}
        <p className={cn(
          'text-sm leading-relaxed',
          isFailure ? 'text-muted-foreground/70' : 'text-muted-foreground'
        )}>
          {event.description}
        </p>

        {/* Metrics */}
        <div className="mt-2 flex flex-wrap gap-4">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            Equity: ${event.equity.toLocaleString()}
          </span>
          {event.drawdown !== undefined && event.drawdown > 0 && (
            <span className={cn(
              'font-mono text-xs tabular-nums',
              event.drawdown > 4
                ? 'text-destructive font-semibold'
                : 'text-muted-foreground'
            )}>
              DD: {event.drawdown.toFixed(1)}%
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}
