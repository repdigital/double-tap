'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface PipelineTerminalStageProps {
  number: string
  title: string
  command: string
  output: string
  metric: string
  metricSubtext?: string
  visualization?: ReactNode
  delay: number
  className?: string
}

export const PipelineTerminalStage = ({
  number,
  title,
  command,
  output,
  metric,
  metricSubtext,
  visualization,
  delay,
  className
}: PipelineTerminalStageProps) => {
  return (
    <motion.div
      className={cn('w-full md:w-[200px] lg:w-[200px]', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div
        className={cn(
          'terminal-panel group',
          'bg-[rgba(10,10,10,0.03)] dark:bg-[rgba(255,255,255,0.03)]',
          'backdrop-blur-xl',
          'border border-border',
          'rounded-xl overflow-hidden',
          'transition-all duration-[400ms]',
          'hover:bg-[rgba(10,10,10,0.06)] dark:hover:bg-[rgba(255,255,255,0.06)]',
          'hover:border-primary/40',
          'hover:shadow-[0_8px_24px_hsl(var(--primary)/0.15)]',
          'hover:scale-105'
        )}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-3 py-2 bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] border-b border-border">
          {/* macOS-style dots */}
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#EF4444] opacity-50" />
            <div className="w-2 h-2 rounded-full bg-[#F59E0B] opacity-50" />
            <div className="w-2 h-2 rounded-full bg-primary opacity-50" />
          </div>

          {/* Filename */}
          <span className="font-mono text-[9px] text-muted-foreground tracking-wide">
            stage_{number}.sh
          </span>
        </div>

        {/* Terminal Body */}
        <div className="p-4 space-y-3">
          {/* Stage Number Badge */}
          <div className="font-mono text-[10px] text-muted-foreground/40 tracking-wider font-medium">
            STAGE {number}
          </div>

          {/* Title */}
          <h3 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
            {title}
          </h3>

          {/* Command Line */}
          <div className="flex gap-2 font-mono text-[11px] leading-relaxed">
            <span className="text-primary font-semibold flex-shrink-0">$</span>
            <span className="text-foreground break-all">{command}</span>
          </div>

          {/* Output */}
          <div className="flex gap-2 font-mono text-[10px] text-muted-foreground items-start">
            <span className="text-primary text-xs flex-shrink-0">✓</span>
            <span className="leading-relaxed">{output}</span>
          </div>

          {/* Visualization (optional) */}
          {visualization && (
            <div className="py-2">
              {visualization}
            </div>
          )}

          {/* Metric Display */}
          <div className="pt-3 border-t border-border text-center space-y-1">
            <div className="font-mono text-sm font-semibold text-foreground uppercase tracking-wide">
              {metric}
            </div>
            {metricSubtext && (
              <div className="font-mono text-[8px] text-muted-foreground uppercase tracking-wider">
                {metricSubtext}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
