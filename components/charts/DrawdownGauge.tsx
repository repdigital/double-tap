'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface DrawdownGaugeProps {
  value: number        // Current drawdown %
  maxSafe: number      // Green zone limit (5%)
  maxWarning: number   // Amber zone limit (8%)
  maxDanger: number    // Red zone limit (10%)
  width?: number
  height?: number
  animate?: boolean
}

export const DrawdownGauge = ({
  value,
  maxSafe,
  maxWarning,
  maxDanger,
  width = 240,
  height = 80,
  animate = false
}: DrawdownGaugeProps) => {
  const [displayValue, setDisplayValue] = useState(0)
  const barHeight = 24
  const labelHeight = 20
  const tickHeight = 8

  // Animate value
  useEffect(() => {
    if (animate) {
      const duration = 1000
      const steps = 40
      const increment = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= value) {
          setDisplayValue(value)
          clearInterval(timer)
        } else {
          setDisplayValue(current)
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [animate, value])

  // Calculate positions
  const getX = (val: number) => (val / maxDanger) * width

  return (
    <svg width={width} height={height}>
      <defs>
        <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset={`${(maxSafe / maxDanger) * 100}%`} stopColor="var(--primary)" stopOpacity="0.8" />
          <stop offset={`${(maxSafe / maxDanger) * 100}%`} stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset={`${(maxWarning / maxDanger) * 100}%`} stopColor="#F59E0B" stopOpacity="0.6" />
          <stop offset={`${(maxWarning / maxDanger) * 100}%`} stopColor="var(--destructive)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--destructive)" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Background bar */}
      <rect
        x={0}
        y={labelHeight}
        width={width}
        height={barHeight}
        fill="hsl(var(--muted) / 0.2)"
        rx={4}
      />

      {/* Gradient bar */}
      <rect
        x={0}
        y={labelHeight}
        width={width}
        height={barHeight}
        fill="url(#gaugeGradient)"
        rx={4}
        opacity={0.3}
      />

      {/* Zone markers (vertical lines) */}
      {[maxSafe, maxWarning].map((mark, i) => (
        <g key={i}>
          <line
            x1={getX(mark)}
            y1={labelHeight}
            x2={getX(mark)}
            y2={labelHeight + barHeight}
            stroke="hsl(var(--border))"
            strokeWidth={1}
            opacity={0.5}
          />
          <text
            x={getX(mark)}
            y={labelHeight - 4}
            textAnchor="middle"
            fontSize={9}
            fontFamily="var(--font-mono)"
            fill="var(--muted-foreground)"
            opacity={0.6}
          >
            {mark}%
          </text>
        </g>
      ))}

      {/* Current value indicator */}
      <motion.g
        initial={{ x: 0 }}
        animate={{ x: getX(displayValue) }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Vertical line */}
        <line
          x1={0}
          y1={labelHeight - 4}
          x2={0}
          y2={labelHeight + barHeight + 4}
          stroke="var(--foreground)"
          strokeWidth={2}
        />

        {/* Triangle marker */}
        <path
          d={`M -4,${labelHeight + barHeight + 8} L 0,${labelHeight + barHeight + 4} L 4,${labelHeight + barHeight + 8} Z`}
          fill="var(--foreground)"
        />

        {/* Value label */}
        <text
          x={0}
          y={labelHeight + barHeight + 24}
          textAnchor="middle"
          fontSize={12}
          fontFamily="var(--font-mono)"
          fontWeight={600}
          fill="var(--foreground)"
        >
          {displayValue.toFixed(1)}%
        </text>
      </motion.g>

      {/* Tick marks at bottom */}
      {[0, 2, 4, 6, 8, 10].map((tick) => (
        <line
          key={tick}
          x1={getX(tick)}
          y1={labelHeight + barHeight}
          x2={getX(tick)}
          y2={labelHeight + barHeight + tickHeight}
          stroke="hsl(var(--border))"
          strokeWidth={1}
          opacity={0.3}
        />
      ))}
    </svg>
  )
}
