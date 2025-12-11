'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

interface MasteryCalloutProps {
  number: string
  description: string
  subtext?: string
}

export function MasteryCallout({ number, description, subtext }: MasteryCalloutProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="relative py-32 bg-gradient-to-b from-[#0A0A0A] via-[#0F0F0F] to-[#0A0A0A] border-y border-[rgba(212,175,55,0.2)]">
      <div ref={ref} className="container-wide text-center">
        {/* Massive Number with Gold Shimmer */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="shimmer-number font-mono font-bold">
            {number}
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p
          className="text-[24px] leading-relaxed text-white max-w-3xl mx-auto mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Subtext */}
        {subtext && (
          <motion.p
            className="text-[16px] text-[var(--mastery-text-muted)]"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {subtext}
          </motion.p>
        )}
      </div>

      <style jsx>{`
        .shimmer-number {
          font-size: clamp(60px, 12vw, 200px);
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.02em;
          background: linear-gradient(135deg, #D4AF37 0%, #F4E4B0 50%, #D4AF37 100%);
          background-size: 200% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 80px rgba(212, 175, 55, 0.8));
          animation: shimmer 3s infinite;
          word-break: keep-all;
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .shimmer-number {
            font-size: clamp(48px, 10vw, 120px);
          }
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
