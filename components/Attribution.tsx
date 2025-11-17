'use client'

import { motion } from 'framer-motion'

interface AttributionProps {
  name: string
  title: string
  isInView: boolean
}

export const Attribution = ({ name, title, isInView }: AttributionProps) => {
  return (
    <motion.div
      className="text-center mt-12 max-w-[400px] mx-auto"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      {/* Divider line */}
      <div className="w-[60px] h-px bg-border mx-auto mb-5" />

      {/* Name */}
      <div
        className="font-display font-semibold text-foreground mb-2"
        style={{
          fontSize: '24px',
          letterSpacing: '-0.01em'
        }}
      >
        {name}
      </div>

      {/* Title */}
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        {title}
      </div>
    </motion.div>
  )
}
