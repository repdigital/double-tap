'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { PropFirmPipeline } from './PropFirmPipeline'
import { PropStatsRow } from './PropStatsRow'

export default function TimelineSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-150px' })

  return (
    <section id="timeline" className="relative py-16 md:py-24 bg-muted/30">
      <div ref={ref} className="container-wide">
        {/* Section Header */}
        <motion.div
          className="text-center mb-32 md:mb-40 max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary mb-6">
            Prop Firm Engine
          </span>
          <h2
            className="font-display font-semibold text-foreground mb-5"
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em'
            }}
          >
            Built to Pass. Built to Scale.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
            Automated prop firm challenge success. From qualification to funded account in weeks, not months.
          </p>
        </motion.div>

        {/* Circular Pipeline */}
        <PropFirmPipeline />

        {/* Supporting Stats */}
        <PropStatsRow />
      </div>
    </section>
  )
}
