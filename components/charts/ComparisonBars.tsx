'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ComparisonData {
  label: string
  value: number
}

interface ComparisonBarsProps {
  data: ComparisonData[]
  width?: number
  height?: number
  animate?: boolean
}

export function ComparisonBars({
  data,
  width = 160,
  height = 100,
  animate = false
}: ComparisonBarsProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (animate) {
      setTimeout(() => setVisible(true), 600)
    }
  }, [animate])

  const maxValue = Math.max(...data.map(d => d.value))
  const barWidth = 24
  const gap = 32
  const totalWidth = data.length * (barWidth + gap) - gap
  const startX = (width - totalWidth) / 2
  const chartHeight = height - 30 // Reserve space for labels

  return (
    <svg width={width} height={height}>
      {/* Grid lines */}
      {[0.5, 1.0, 1.5, 2.0, 2.5, 3.0].map((tick) => (
        <line
          key={tick}
          x1={0}
          y1={(1 - tick / maxValue) * chartHeight}
          x2={width}
          y2={(1 - tick / maxValue) * chartHeight}
          stroke="hsl(var(--border))"
          strokeWidth={0.5}
          opacity={0.2}
        />
      ))}

      {/* Bars */}
      {data.map((item, i) => {
        const x = startX + i * (barWidth + gap)
        const barHeight = (item.value / maxValue) * chartHeight
        const y = chartHeight - barHeight
        const isStrategy = item.label === 'Strategy'

        return (
          <g key={i}>
            {/* Bar */}
            <motion.rect
              x={x}
              y={chartHeight}
              width={barWidth}
              height={0}
              fill={isStrategy ? 'var(--primary)' : 'hsl(var(--muted-foreground) / 0.3)'}
              rx={4}
              initial={{ height: 0, y: chartHeight }}
              animate={visible ? {
                height: barHeight,
                y: y
              } : {
                height: 0,
                y: chartHeight
              }}
              transition={{
                duration: 0.6,
                delay: i * 0.1,
                ease: 'easeOut'
              }}
            />

            {/* Value label on top of bar */}
            <motion.text
              x={x + barWidth / 2}
              y={y - 6}
              textAnchor="middle"
              fontSize={11}
              fontFamily="var(--font-mono)"
              fontWeight={isStrategy ? 600 : 500}
              fill={isStrategy ? 'var(--primary)' : 'var(--muted-foreground)'}
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
            >
              {item.value.toFixed(1)}x
            </motion.text>

            {/* Label below */}
            <text
              x={x + barWidth / 2}
              y={chartHeight + 16}
              textAnchor="middle"
              fontSize={9}
              fontFamily="var(--font-mono)"
              fill="var(--muted-foreground)"
              opacity={0.7}
            >
              {item.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
