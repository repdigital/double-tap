'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function MasteryHero() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative min-h-screen bg-black overflow-hidden">
      {/* Background Gold Gradient Mesh */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.3)_0%,transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.2)_0%,transparent_70%)] blur-3xl" />
      </div>

      <div ref={ref} className="container-wide min-h-screen flex flex-col justify-center items-center text-center py-24 relative z-10">

        {/* Eyebrow */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--mastery-gold)]">
            For Profitable Traders Only
          </span>
        </motion.div>

        {/* Main Headline - Mathematical Equation */}
        <div className="space-y-6">
          {/* "Your Edge" */}
          <motion.h1
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(48px, 10vw, 120px)',
              letterSpacing: '-0.04em',
              lineHeight: '0.9'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Your Edge
          </motion.h1>

          {/* Operator "×" */}
          <motion.div
            className="font-mono font-bold text-[var(--mastery-gold)]"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              textShadow: '0 0 60px rgba(212, 175, 55, 0.8)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? {
              opacity: 1,
              scale: [0.8, 1.2, 1.0],
            } : {}}
            transition={{ duration: 1.0, delay: 0.5 }}
          >
            ×
          </motion.div>

          {/* "10 Accounts" */}
          <motion.h1
            className="font-display font-bold text-white"
            style={{
              fontSize: 'clamp(48px, 10vw, 120px)',
              letterSpacing: '-0.04em',
              lineHeight: '0.9'
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            10 Accounts
          </motion.h1>

          {/* Operator "=" */}
          <motion.div
            className="font-mono font-bold text-[var(--mastery-gold)]"
            style={{
              fontSize: 'clamp(64px, 12vw, 140px)',
              textShadow: '0 0 60px rgba(212, 175, 55, 0.8)'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? {
              opacity: 1,
              scale: [0.8, 1.2, 1.0],
            } : {}}
            transition={{ duration: 1.0, delay: 1.1 }}
          >
            =
          </motion.div>

          {/* Question Mark with Shimmer */}
          <motion.h1
            className="font-display font-bold shimmer-text"
            style={{
              fontSize: 'clamp(64px, 12vw, 160px)',
              letterSpacing: '-0.04em',
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            ?
          </motion.h1>
        </div>

        {/* Thesis Statement */}
        <motion.p
          className="mt-16 text-[20px] leading-relaxed text-[var(--mastery-text-secondary)] max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          You've proven you can win. Now learn to multiply.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <p className="text-xs text-[var(--mastery-text-muted)] mb-2 tracking-wider uppercase font-mono">
            Scroll to Transform
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 3v14m0 0l-4-4m4 4l4-4"
                stroke="var(--mastery-gold)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        .shimmer-text {
          background: linear-gradient(135deg, #D4AF37 0%, #F4E4B0 50%, #D4AF37 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}
