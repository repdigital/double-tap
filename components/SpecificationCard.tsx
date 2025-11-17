'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { InfoTooltip } from './InfoTooltip'
import { cn } from '@/lib/utils'

interface SpecificationCardProps {
  number: string
  title: string
  subtitle?: string
  value: string
  visualization: ReactNode
  technicalNote: string
  delay?: number
  hero?: boolean
  statusIndicator?: ReactNode
}

export function SpecificationCard({
  number,
  title,
  subtitle,
  value,
  visualization,
  technicalNote,
  delay = 0,
  hero = false,
  statusIndicator
}: SpecificationCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative rounded-[24px] space-y-8 group transition-all duration-[400ms]',
        hero ? 'p-12 md:p-16 min-h-[500px]' : 'p-8 md:p-12 min-h-[400px]'
      )}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0.0, 0.2, 1] }}
      style={{
        background: `
          linear-gradient(var(--card), var(--card)) padding-box,
          linear-gradient(135deg,
            hsl(var(--primary) / 0.3) 0%,
            transparent 50%,
            hsl(var(--primary) / 0.15) 100%
          ) border-box
        `,
        border: '1px solid transparent',
      }}
    >
      {/* Card Number */}
      <div className="absolute top-6 left-6 font-mono text-[10px] text-muted-foreground/40 tracking-wider font-medium">
        {number}
      </div>

      {/* Info Tooltip */}
      <InfoTooltip content={technicalNote} />

      {/* Title Section */}
      <div className="pt-8">
        <h3 className="font-mono text-[11px] tracking-[0.08em] text-muted-foreground uppercase font-medium">
          {title}
        </h3>
        {subtitle && (
          <span className="block mt-1 font-mono text-[9px] tracking-[0.1em] text-primary/70 uppercase font-medium">
            {subtitle}
          </span>
        )}
      </div>

      {/* Value */}
      <div
        className="font-body font-semibold text-foreground tabular-nums"
        style={{
          fontSize: 'clamp(72px, 8vw, 120px)',
          lineHeight: '0.9',
          letterSpacing: '-0.02em',
          fontVariantNumeric: 'tabular-nums slashed-zero'
        }}
      >
        {value}
      </div>

      {/* Visualization */}
      <div className="min-h-[120px] flex items-start">
        {visualization}
      </div>

      {/* Status Indicator (optional) */}
      {statusIndicator && (
        <div className="pt-4 border-t border-border">
          {statusIndicator}
        </div>
      )}

      {/* Hover Glow Effect */}
      <div
        className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-all duration-[400ms] pointer-events-none"
        style={{
          boxShadow: '0 12px 48px hsl(var(--primary) / 0.2)',
          transform: 'translateY(-2px)',
        }}
      />
    </motion.div>
  )
}
