'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TerminalStatReadoutProps {
  command: string
  output: string
  label: string
  delay: number
  className?: string
}

export const TerminalStatReadout = ({
  command,
  output,
  label,
  delay,
  className
}: TerminalStatReadoutProps) => {
  return (
    <motion.div
      className={cn('w-full md:w-auto md:flex-1 md:min-w-[180px] md:max-w-[220px]', className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.4, 0.0, 0.2, 1]
      }}
    >
      <div className={cn(
        'group',
        'bg-[rgba(10,10,10,0.03)] dark:bg-[rgba(255,255,255,0.03)]',
        'backdrop-blur-xl',
        'border border-border',
        'rounded-xl overflow-hidden',
        'transition-all duration-[400ms]',
        'hover:bg-[rgba(10,10,10,0.05)] dark:hover:bg-[rgba(255,255,255,0.05)]',
        'hover:border-primary/30',
        'hover:-translate-y-0.5',
        'hover:shadow-[0_8px_24px_hsl(var(--primary)/0.1)]'
      )}>

        {/* Terminal Header with dots */}
        <div className="flex items-center gap-1 px-3 py-1.5 bg-[rgba(0,0,0,0.02)] dark:bg-[rgba(255,255,255,0.02)] border-b border-border">
          <div className="w-1.5 h-1.5 rounded-full bg-[#EF4444] opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-40" />
        </div>

        {/* Terminal Body */}
        <div className="p-4 min-h-[92px]">
          {/* Command line */}
          <div className="flex gap-1.5 mb-2">
            <span className="text-primary text-[10px] font-mono font-semibold flex-shrink-0">$</span>
            <span className="text-foreground text-[10px] font-mono break-all">{command}</span>
          </div>

          {/* Output (large metric) */}
          <div className="font-mono font-semibold text-foreground text-2xl mb-1 tabular-nums transition-colors duration-200 group-hover:text-primary">
            {output}
          </div>

          {/* Label */}
          <div className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground font-medium">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
