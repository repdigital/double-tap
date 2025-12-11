'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TimelineEventProps {
  time: string
  event: string
  icon: string
  highlight?: boolean
  delay?: number
}

export function TimelineEvent({ time, event, icon, highlight = false, delay = 0 }: TimelineEventProps) {
  return (
    <motion.div
      className={cn(
        "flex items-start gap-3 p-3 rounded-lg transition-all",
        highlight && "bg-[var(--mastery-gold)]/5 border border-[var(--mastery-gold)]/20"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <span className={cn(
        "text-lg flex-shrink-0 font-bold",
        highlight ? "text-[var(--mastery-gold)]" : "text-[var(--mastery-text-muted)]"
      )}>
        {icon}
      </span>
      <div className="flex-1">
        <div className="font-mono text-xs text-[var(--mastery-gold)] mb-1">{time}</div>
        <div className={cn(
          "text-sm leading-relaxed",
          highlight ? "text-white font-medium" : "text-[var(--mastery-text-secondary)]"
        )}>
          {event}
        </div>
      </div>
    </motion.div>
  )
}
