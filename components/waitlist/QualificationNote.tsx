'use client'

import { motion } from 'framer-motion'

export const QualificationNote = () => {
  return (
    <motion.div
      className="mt-12 p-6 md:p-8 rounded-xl border border-border bg-muted/20 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
    >
      <div className="font-mono text-[11px] uppercase tracking-wider text-primary mb-4 font-medium">
        This Is For You If
      </div>

      <p className="text-lg text-foreground leading-relaxed mb-4 font-medium">
        You are ready to stop failing prop challenges and start using systematic precision.
      </p>

      <div className="pt-4 border-t border-border">
        <div className="font-mono text-xs text-muted-foreground leading-relaxed">
          Minimum $25,000 capital recommended • Serious traders only
        </div>
      </div>
    </motion.div>
  )
}
