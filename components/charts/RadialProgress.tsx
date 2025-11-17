'use client'

import React, { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

interface RadialProgressProps {
  value: number // 0-100
  size?: number
  strokeWidth?: number
  color?: string
  showCenter?: boolean
}

export function RadialProgress({
  value,
  size = 80,
  strokeWidth = 8,
  color = 'var(--primary)',
  showCenter = true
}: RadialProgressProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (inView) {
      const duration = 1200
      const steps = 60
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
  }, [inView, value])

  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (displayValue / 100) * circumference

  return (
    <div ref={ref} className="relative inline-flex items-center justify-center">
      <svg width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="hsl(var(--muted) / 0.2)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle with glow */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-all duration-300 ease-out"
          style={{
            filter: 'drop-shadow(0 0 8px hsl(var(--primary) / 0.4))'
          }}
        />

        {/* Center text */}
        {showCenter && (
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dy="0.3em"
            fontSize="16"
            fontWeight="600"
            fontFamily="var(--font-mono)"
            fill="var(--foreground)"
          >
            {displayValue.toFixed(1)}%
          </text>
        )}
      </svg>
    </div>
  )
}
