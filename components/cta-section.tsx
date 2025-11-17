'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from './interactive/MagneticButton'

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cta" className="py-48 md:py-64 bg-background">
      <div ref={ref} className="container-wide">
        <div className="max-w-5xl mx-auto text-center space-y-20">
          {/* One Word - Maximum Impact */}
          <motion.h2
            className="font-display font-bold text-foreground"
            style={{
              fontSize: 'clamp(96px, 15vw, 240px)',
              lineHeight: '0.85',
              letterSpacing: '-0.06em'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.0 }}
          >
            Begin.
          </motion.h2>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <MagneticButton
              href="/waitlist"
              size="xl"
            >
              Get On The Waitlist
            </MagneticButton>
          </motion.div>

          {/* Disclaimer */}
          <motion.p
            className="font-mono text-xs text-muted-foreground tracking-wider"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            $25,000 MINIMUM CAPITAL RECOMMENDED
          </motion.p>
        </div>
      </div>
    </section>
  )
}
