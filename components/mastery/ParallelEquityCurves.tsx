'use client'

import { motion } from 'framer-motion'

export function ParallelEquityCurves() {
  // Generate 10 similar but slightly offset curves
  const curves = Array.from({ length: 10 }, (_, i) => {
    const offset = (i - 5) * 2
    return [
      { x: 0, y: 80 + offset },
      { x: 20, y: 75 + offset + Math.random() * 5 },
      { x: 40, y: 70 + offset + Math.random() * 5 },
      { x: 60, y: 55 + offset + Math.random() * 5 },
      { x: 80, y: 45 + offset + Math.random() * 5 },
      { x: 100, y: 30 + offset }
    ]
  })

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Grid Lines */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="0.5" />
      <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="0.5" />

      {/* All curves */}
      {curves.map((points, curveIndex) => {
        const pathData = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`
        const opacity = 0.3 + (curveIndex / curves.length) * 0.5

        return (
          <g key={curveIndex}>
            {/* Area under curve */}
            <motion.path
              d={`${pathData} L 100 100 L 0 100 Z`}
              fill="url(#gold-gradient)"
              opacity={opacity * 0.3}
              initial={{ opacity: 0 }}
              animate={{ opacity: opacity * 0.3 }}
              transition={{ duration: 0.8, delay: 0.5 + curveIndex * 0.05 }}
            />

            {/* Line */}
            <motion.path
              d={pathData}
              fill="none"
              stroke="var(--mastery-gold)"
              strokeWidth="1.5"
              opacity={opacity}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 + curveIndex * 0.05 }}
            />
          </g>
        )
      })}

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
