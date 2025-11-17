'use client'

import { motion } from 'framer-motion'

export const WaitlistHero = () => {
  return (
    <div className="mb-16 md:mb-20 max-w-[1000px]">
      {/* Monumental Headline */}
      <motion.h1
        className="font-display font-bold text-foreground uppercase mb-6"
        style={{
          fontSize: 'clamp(64px, 10vw, 120px)',
          lineHeight: '0.95',
          letterSpacing: '-0.04em',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1]
        }}
      >
        Get On The Waitlist
      </motion.h1>

      {/* Subtext with Social Proof */}
      <motion.p
        className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-[700px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.2
        }}
      >
        Join 127 funded traders who stopped relying on discipline and started using systems.
      </motion.p>
    </div>
  )
}
