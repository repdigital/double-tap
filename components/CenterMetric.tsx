'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface CenterMetricProps {
  value?: number
  label?: string
  animate?: boolean
}

export const CenterMetric = ({
  value = 127,
  label = 'Funded Accounts',
  animate = false
}: CenterMetricProps) => {
  const [count, setCount] = useState(0)

  // Counter animation
  useEffect(() => {
    if (animate) {
      let start = 0
      const end = value
      const duration = 800
      const increment = end / (duration / 16)

      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(timer)
    } else {
      setCount(value)
    }
  }, [animate, value])

  return (
    <motion.div
      className="text-center select-none"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Main Number */}
      <div
        className="font-body font-semibold text-foreground tabular-nums"
        style={{
          fontSize: 'clamp(80px, 10vw, 120px)',
          lineHeight: '0.9',
          letterSpacing: '-0.03em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {count}
      </div>

      {/* Label */}
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-2 mb-4 font-medium">
        {label}
      </div>

      {/* Status Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="relative flex items-center justify-center">
          {/* Pulsing ring */}
          <div className="absolute w-4 h-4 bg-primary rounded-full opacity-30 animate-pulse" />
          {/* Solid dot */}
          <div className="w-2 h-2 bg-primary rounded-full" />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-primary font-semibold">
          Active Trading
        </span>
      </div>
    </motion.div>
  )
}
