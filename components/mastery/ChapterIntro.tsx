'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ChapterIntro() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-24 bg-black">
      <div className="container-wide max-w-4xl text-center">
        {/* Overline */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--mastery-gold)]">
            Seven Chapters
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          className="font-display font-bold text-white mb-6"
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Before You Burn Another Year Grinding
        </motion.h2>

        {/* Body */}
        <motion.p
          className="text-[18px] leading-relaxed text-[var(--mastery-text-secondary)]"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          You've mastered the game. Now master the business.
        </motion.p>

        {/* Divider */}
        <motion.div
          className="mt-12 h-px bg-gradient-to-r from-transparent via-[var(--mastery-gold)] to-transparent opacity-30"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.0, delay: 0.6 }}
        />
      </div>
    </section>
  )
}
