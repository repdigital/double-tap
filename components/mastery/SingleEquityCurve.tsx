'use client'

import { motion } from 'framer-motion'

export function SingleEquityCurve() {
  // Simple upward trending curve data
  const points = [
    { x: 0, y: 80 },
    { x: 20, y: 70 },
    { x: 40, y: 75 },
    { x: 60, y: 60 },
    { x: 80, y: 65 },
    { x: 100, y: 40 }
  ]

  const pathData = `M ${points.map((p, i) => `${p.x} ${p.y}`).join(' L ')}`

  return (
    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
      {/* Grid Lines */}
      <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(107, 107, 107, 0.2)" strokeWidth="0.5" />
      <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(107, 107, 107, 0.2)" strokeWidth="0.5" />

      {/* Area under curve */}
      <motion.path
        d={`${pathData} L 100 100 L 0 100 Z`}
        fill="url(#manual-gradient)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />

      {/* Line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke="#6B6B6B"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient id="manual-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#6B6B6B" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#6B6B6B" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}
