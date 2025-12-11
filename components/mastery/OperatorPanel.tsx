'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { TimelineEvent } from './TimelineEvent'
import { SingleEquityCurve } from './SingleEquityCurve'
import { ParallelEquityCurves } from './ParallelEquityCurves'
import { cn } from '@/lib/utils'

interface OperatorPanelProps {
  variant: 'manual' | 'systematic'
}

const manualData = {
  label: "YOU, TRADING MANUALLY",
  description: "One account. One human. Impressive, but limited.",
  timeline: [
    { time: "05:00", event: "Wake up, coffee, market prep", icon: "•", highlight: false },
    { time: "09:30", event: "Market open, execute trades", icon: "•", highlight: false },
    { time: "13:00", event: "Perfect setup appears... you're at lunch", icon: "×", highlight: true },
    { time: "16:00", event: "Market close, analyze performance", icon: "•", highlight: false },
    { time: "22:00", event: "Sleep (market still moving)", icon: "•", highlight: false },
    { time: "03:00", event: "Best setup of month... you're asleep", icon: "×", highlight: true }
  ],
  stats: [
    { label: "Accounts", value: "1", color: "muted" },
    { label: "Hours/Year", value: "2,920", color: "muted" },
    { label: "Annual Revenue", value: "$50,000", color: "white" },
    { label: "Limitation", value: "Biology", color: "muted" }
  ]
}

const systematicData = {
  label: "YOU, OPERATING SYSTEMATICALLY",
  description: "Your proven edge, multiplied across accounts.",
  timeline: [
    { time: "00:00", event: "Algorithm runs 24/7 across all accounts", icon: "•", highlight: false },
    { time: "03:00", event: "Perfect setup caught on 10 accounts", icon: "✓", highlight: true },
    { time: "09:30", event: "You review overnight performance", icon: "•", highlight: false },
    { time: "13:00", event: "Another setup, captured instantly", icon: "✓", highlight: true },
    { time: "15:00", event: "You're at the gym, system still trading", icon: "•", highlight: false },
    { time: "24/7", event: "Never misses your A+ setups", icon: "•", highlight: false }
  ],
  stats: [
    { label: "Accounts", value: "10", color: "gold" },
    { label: "Active Hours", value: "0", color: "gold" },
    { label: "Annual Revenue", value: "$500,000", color: "gold" },
    { label: "Limitation", value: "None", color: "gold" }
  ]
}

export function OperatorPanel({ variant }: OperatorPanelProps) {
  const data = variant === 'manual' ? manualData : systematicData
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative rounded-2xl p-8 sm:p-12",
        variant === 'manual' && "bg-[var(--mastery-dark-gray)] opacity-85 border-2 border-[var(--mastery-medium-gray)]",
        variant === 'systematic' && "bg-[var(--mastery-dark-gray)] border-2 border-[var(--mastery-gold)] shadow-[0_0_60px_rgba(212,175,55,0.3)]"
      )}
      initial={{ opacity: 0, x: variant === 'manual' ? -40 : 40 }}
      animate={isInView ? { opacity: variant === 'manual' ? 0.85 : 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: variant === 'systematic' ? 0.2 : 0 }}
    >
      {/* Gold shimmer border for systematic */}
      {variant === 'systematic' && (
        <div className="absolute inset-0 rounded-2xl opacity-40 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-[var(--mastery-gold)] animate-pulse" style={{ animationDuration: '3s' }} />
        </div>
      )}

      {/* Label */}
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--mastery-gold)] mb-4">
        {data.label}
      </div>

      {/* Description */}
      <p className="text-[16px] text-[var(--mastery-text-secondary)] mb-8">
        {data.description}
      </p>

      {/* Equity Curve Visualization */}
      <div className="mb-8 h-[200px] bg-black rounded-lg p-6 border border-[rgba(212,175,55,0.1)]">
        {variant === 'manual' ? (
          <SingleEquityCurve />
        ) : (
          <ParallelEquityCurves />
        )}
      </div>

      {/* Timeline */}
      <div className="space-y-3 mb-8">
        {data.timeline.map((event, idx) => (
          <TimelineEvent
            key={idx}
            time={event.time}
            event={event.event}
            icon={event.icon}
            highlight={event.highlight}
            delay={idx * 0.1}
          />
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[rgba(212,175,55,0.1)]">
        {data.stats.map((stat, idx) => (
          <div key={idx}>
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--mastery-gold)] mb-1">
              {stat.label}
            </div>
            <div className={cn(
              "font-mono text-2xl font-semibold",
              stat.color === 'gold' && 'text-[var(--mastery-gold)]',
              stat.color === 'white' && 'text-white',
              stat.color === 'muted' && 'text-[var(--mastery-text-muted)]'
            )}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
