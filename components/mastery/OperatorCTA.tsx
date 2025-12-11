'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { MagneticButton } from '../interactive/MagneticButton'

export function OperatorCTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-200px' })

  return (
    <section ref={ref} className="relative py-32 bg-black border-t border-[rgba(212,175,55,0.2)]">
      <div className="container-wide max-w-5xl text-center">
        {/* Main Headline */}
        <motion.h2
          className="font-display font-bold text-white mb-6"
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            letterSpacing: '-0.03em',
            lineHeight: '1.0'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Become an Operator.
        </motion.h2>

        {/* Subtext */}
        <motion.p
          className="text-[20px] leading-relaxed text-[var(--mastery-text-secondary)] max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Transform your trading into a scalable business. Limited to proven profitable traders.
        </motion.p>

        {/* Stats Row */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div>
            <div className="font-mono text-4xl font-bold text-[var(--mastery-gold)] mb-1">37</div>
            <div className="text-sm text-[var(--mastery-text-muted)] uppercase tracking-wide">
              Operators Scaling
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-[var(--mastery-gold)]/20" />

          <div>
            <div className="font-mono text-4xl font-bold text-[var(--mastery-gold)] mb-1">$4.2M</div>
            <div className="text-sm text-[var(--mastery-text-muted)] uppercase tracking-wide">
              Combined AUM
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-[var(--mastery-gold)]/20" />

          <div>
            <div className="font-mono text-4xl font-bold text-[var(--mastery-gold)] mb-1">94.3%</div>
            <div className="text-sm text-[var(--mastery-text-muted)] uppercase tracking-wide">
              Avg Pass Rate
            </div>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <MagneticButton
            href="/waitlist"
            size="xl"
            className="bg-[var(--mastery-gold)] hover:bg-[var(--mastery-gold-dark)] text-black font-semibold"
          >
            Apply for Operator Program
          </MagneticButton>
        </motion.div>

        {/* Requirements */}
        <motion.p
          className="text-sm text-[var(--mastery-text-muted)] font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Verified profitable track record required • Elite program
        </motion.p>
      </div>
    </section>
  )
}
