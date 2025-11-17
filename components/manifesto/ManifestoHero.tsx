'use client'

import { motion } from 'framer-motion'

export const ManifestoHero = () => {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-background py-20 border-b border-border">
      <div className="container-wide text-center max-w-[1200px]">
        {/* Eyebrow */}
        <motion.div
          className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary mb-8 font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          The Prop Firm Asymmetry
        </motion.div>

        {/* The Haunting Question */}
        <motion.h1
          className="font-display font-bold text-foreground uppercase mb-8"
          style={{
            fontSize: 'clamp(64px, 12vw, 160px)',
            lineHeight: '0.95',
            letterSpacing: '-0.04em',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Why Do You Keep Failing?
        </motion.h1>

        {/* Thesis Statement */}
        <motion.p
          className="text-xl md:text-2xl text-muted-foreground max-w-[800px] mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Prop firms are designed to make you fail. Unless you have perfect emotional control and a systematic edge.
        </motion.p>

        {/* Scroll Indicator */}
        <motion.div
          className="mt-16 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
              Scroll to see the truth
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" className="text-muted-foreground">
                <path
                  d="M10 3v14m0 0l-4-4m4 4l4-4"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
