'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface PipelineStageProps {
  stageNumber: string
  title: string
  metric: string
  metricLabel: string
  description: string
  icon: LucideIcon
  visualization?: ReactNode
  delay?: number
  showConnector?: boolean
}

export function PipelineStage({
  stageNumber,
  title,
  metric,
  metricLabel,
  description,
  icon: Icon,
  visualization,
  delay = 0,
  showConnector = true
}: PipelineStageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="relative flex items-center gap-8">
      {/* Stage Card */}
      <motion.div
        className="relative flex-1 bg-card border border-border rounded-2xl p-12 space-y-8"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay }}
      >
        {/* Stage Number */}
        <div className="flex items-center justify-between">
          <div className="font-mono text-xs tracking-[0.2em] text-muted-foreground/40 uppercase">
            Stage {stageNumber}
          </div>
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-mono text-sm tracking-[0.2em] text-foreground uppercase">
          {title}
        </h3>

        {/* Metric */}
        <div>
          <div
            className="font-mono font-medium text-primary tabular-nums mb-2"
            style={{
              fontSize: 'clamp(36px, 4vw, 48px)',
              lineHeight: '1',
              letterSpacing: '-0.01em'
            }}
          >
            {metric}
          </div>
          <div className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
            {metricLabel}
          </div>
        </div>

        {/* Visualization (if provided) */}
        {visualization && (
          <div className="min-h-[80px]">
            {visualization}
          </div>
        )}

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-6">
          {description}
        </p>
      </motion.div>

      {/* Connector Arrow */}
      {showConnector && (
        <motion.div
          className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-primary"
          >
            <path
              d="M8 16H24M24 16L18 10M24 16L18 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Animated dash */}
            <motion.path
              d="M8 16H24"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="4 8"
              animate={{
                strokeDashoffset: [0, -12],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear'
              }}
              opacity={0.3}
            />
          </svg>
        </motion.div>
      )}
    </div>
  )
}
