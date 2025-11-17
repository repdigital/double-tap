'use client'

import { motion } from 'framer-motion'

interface DataPoint {
  day: number
  equity: number
}

interface EquityCurveVizProps {
  data: DataPoint[]
  isFailure: boolean
  isInView: boolean
}

export const EquityCurveViz = ({ data, isFailure, isInView }: EquityCurveVizProps) => {
  if (data.length < 2) return null

  const width = 100
  const height = 100
  const padding = 5

  const maxEquity = Math.max(...data.map(d => d.equity))
  const minEquity = Math.min(...data.map(d => d.equity))
  const range = maxEquity - minEquity || 1

  const scaleY = (equity: number) => {
    return height - padding - ((equity - minEquity) / range * (height - padding * 2))
  }

  const scaleX = (day: number) => {
    const maxDay = Math.max(...data.map(d => d.day))
    return padding + ((day - 1) / (maxDay - 1 || 1) * (width - padding * 2))
  }

  const pathData = data
    .map((point, i) => {
      const x = scaleX(point.day)
      const y = scaleY(point.equity)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')

  const areaPath = `${pathData} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`

  const strokeColor = isFailure ? '#DC2626' : 'var(--primary)'
  const fillGradient = isFailure ? 'failureGradient' : 'successGradient'

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="failureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="successGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Area fill */}
      <motion.path
        d={areaPath}
        fill={`url(#${fillGradient})`}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Line */}
      <motion.path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        opacity={isFailure ? 0.4 : 0.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: isFailure ? 0.4 : 0.8 } : {}}
        transition={{
          pathLength: { duration: 1.5, delay: 0.4, ease: 'easeOut' },
          opacity: { duration: 0.3, delay: 0.4 }
        }}
      />

      {/* Data points */}
      {data.map((point, i) => (
        <motion.circle
          key={i}
          cx={scaleX(point.day)}
          cy={scaleY(point.equity)}
          r="2.5"
          fill={strokeColor}
          opacity={isFailure ? 0.5 : 1}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? {
            scale: 1,
            opacity: isFailure ? 0.5 : 1
          } : {}}
          transition={{ duration: 0.3, delay: 0.6 + (i * 0.1) }}
        />
      ))}
    </svg>
  )
}
