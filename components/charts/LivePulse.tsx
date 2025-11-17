'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'

interface LivePulseProps {
  size?: number
  color?: string
  showTimeline?: boolean
  animate?: boolean
}

// 12 months of uptime % (mock data)
const uptimeData = [99.9, 99.8, 100, 99.9, 99.6, 99.9, 100, 99.9, 99.8, 100, 99.9, 99.7]

export function LivePulse({
  size = 8,
  color = 'var(--primary)',
  showTimeline = false,
  animate = false
}: LivePulseProps) {
  const [mounted, setMounted] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (animate) {
      setTimeout(() => setVisible(true), 800)
    }
  }, [animate])

  if (!mounted) {
    return <div className="h-6 w-16 skeleton rounded" />
  }

  if (showTimeline) {
    return (
      <div className="flex flex-col gap-4">
        {/* Status Row */}
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            {/* Pulsing outer ring */}
            <div
              className="absolute animate-pulse"
              style={{
                width: `${size * 2}px`,
                height: `${size * 2}px`,
                backgroundColor: color,
                opacity: 0.3,
                borderRadius: '50%',
              }}
            />

            {/* Main dot */}
            <div
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color,
                borderRadius: '50%',
              }}
            />
          </div>

          <span
            className="font-mono text-[10px] font-semibold uppercase tracking-wider"
            style={{ color }}
          >
            OPERATIONAL
          </span>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          <svg width={168} height={40}>
            {uptimeData.map((uptime, i) => {
              const barWidth = 12
              const gap = 2
              const x = i * (barWidth + gap)
              const barHeight = (uptime / 100) * 40
              const y = 40 - barHeight
              const isPerfect = uptime >= 99.9

              return (
                <motion.rect
                  key={i}
                  x={x}
                  y={40}
                  width={barWidth}
                  height={0}
                  fill={isPerfect ? 'var(--primary)' : 'hsl(var(--muted-foreground) / 0.4)'}
                  opacity={0.7}
                  rx={2}
                  initial={{ height: 0, y: 40 }}
                  animate={visible ? {
                    height: barHeight,
                    y: y
                  } : {
                    height: 0,
                    y: 40
                  }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.05,
                    ease: 'easeOut'
                  }}
                />
              )
            })}
          </svg>

          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] text-muted-foreground">12mo</span>
            <span className="font-mono text-[9px] text-muted-foreground">Now</span>
          </div>
        </div>

        {/* Last Incident */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
          <Clock size={12} />
          <span>Last downtime: 47 days ago</span>
        </div>
      </div>
    )
  }

  // Simple pulse (original behavior)
  return (
    <div className="inline-flex items-center gap-2">
      <div className="relative flex items-center justify-center">
        {/* Pulsing outer ring */}
        <div
          className="absolute animate-pulse"
          style={{
            width: `${size * 2}px`,
            height: `${size * 2}px`,
            backgroundColor: color,
            opacity: 0.3,
            borderRadius: '50%',
          }}
        />

        {/* Main dot */}
        <div
          className="relative"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            borderRadius: '50%',
          }}
        />
      </div>

      <span className="text-sm font-medium" style={{ color }}>
        Live
      </span>
    </div>
  )
}
