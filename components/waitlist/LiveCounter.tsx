'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface LiveCounterProps {
  value: number
  label: string
  sublabel?: string
  animateOnMount?: boolean
  liveUpdates?: boolean
  updateInterval?: number
}

export const LiveCounter = ({
  value,
  label,
  sublabel,
  animateOnMount = true,
  liveUpdates = true,
  updateInterval = 8000
}: LiveCounterProps) => {
  const [count, setCount] = useState(animateOnMount ? 0 : value)

  // Initial count-up animation
  useEffect(() => {
    if (!animateOnMount) {
      setCount(value)
      return
    }

    let start = 0
    const end = value
    const duration = 1500
    const frames = 60
    const increment = end / frames

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, duration / frames)

    return () => clearInterval(timer)
  }, [value, animateOnMount])

  // Live random increments
  useEffect(() => {
    if (!liveUpdates) return

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setCount(c => c + 1)
      }
    }, updateInterval)

    return () => clearInterval(interval)
  }, [liveUpdates, updateInterval])

  return (
    <motion.div
      className="flex flex-col gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.4
      }}
    >
      {/* Counter Number */}
      <motion.div
        className="font-mono font-bold text-primary tabular-nums"
        key={count}
        initial={{ opacity: 0.7, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        style={{
          fontSize: 'clamp(40px, 6vw, 64px)',
          lineHeight: '1',
          letterSpacing: '-0.02em',
          textShadow: '0 4px 24px hsl(var(--primary) / 0.15)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {label.includes('%') ? `${count}%` : count}
      </motion.div>

      {/* Labels */}
      <div>
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
          {label}
        </div>
        {sublabel && (
          <div className="font-mono text-[9px] text-muted-foreground/60 mt-1 tracking-wide">
            {sublabel}
          </div>
        )}
      </div>
    </motion.div>
  )
}
