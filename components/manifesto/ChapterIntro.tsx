'use client'

import { motion } from 'framer-motion'

export const ChapterIntro = () => {
  return (
    <motion.section
      className="py-16 bg-background border-y border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-narrow text-center max-w-[900px] mx-auto px-6">

        {/* Eyebrow - Urgency Trigger */}
        <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary mb-6 font-medium">
          Before You Wire Another $300
        </div>

        {/* Direct Challenge Headline */}
        <h2
          className="font-display font-semibold text-foreground mb-6 mx-auto"
          style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
            maxWidth: '700px'
          }}
        >
          You Think You Know Why You Failed. You Don't.
        </h2>

        {/* Urgency Copy */}
        <div className="space-y-4 max-w-[600px] mx-auto">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Eight chapters reveal the complete system designed to make you fail.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            The more you read, the clearer the escape path becomes.
          </p>
        </div>

        {/* Visual Indicator */}
        <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-8 opacity-60">
          Expand each chapter below ↓
        </div>

      </div>
    </motion.section>
  )
}
