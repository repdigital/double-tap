'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface DramaticCalloutProps {
  number: string
  label: string
  description?: string
  color?: 'red' | 'amber' | 'gray'
}

export const DramaticCallout = ({
  number,
  label,
  description,
  color = 'red'
}: DramaticCalloutProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  const colorMap = {
    red: '#DC2626',
    amber: '#F59E0B',
    gray: 'hsl(var(--muted-foreground))'
  }

  return (
    <section ref={ref} className="py-20 md:py-32 bg-background border-y border-border">
      <div className="container-narrow text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Monumental Number */}
          <div
            className="font-mono font-bold tabular-nums"
            style={{
              fontSize: 'clamp(100px, 15vw, 180px)',
              lineHeight: '0.9',
              letterSpacing: '-0.03em',
              color: colorMap[color],
              textShadow: `0 4px 24px ${colorMap[color]}40`,
            }}
          >
            {number}
          </div>

          {/* Label */}
          <div
            className="font-mono font-semibold uppercase mt-4 md:mt-6"
            style={{
              fontSize: 'clamp(24px, 4vw, 48px)',
              letterSpacing: '0.08em',
              color: colorMap[color],
              opacity: 0.9
            }}
          >
            {label}
          </div>

          {/* Description */}
          {description && (
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mt-8 max-w-[700px] mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {description}
            </motion.p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
