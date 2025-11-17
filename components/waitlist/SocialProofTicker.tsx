'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

export const SocialProofTicker = () => {
  const [recentBookings, setRecentBookings] = useState(47)
  const [justUpdated, setJustUpdated] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.4) {
        setRecentBookings(prev => prev + 1)
        setJustUpdated(true)
        setTimeout(() => setJustUpdated(false), 1000)
      }
    }, 12000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}
    >
      <div className="relative flex items-center justify-center">
        <div className="absolute w-3 h-3 bg-primary rounded-full opacity-30 animate-pulse" />
        <div className="w-2 h-2 bg-primary rounded-full" />
      </div>

      <span className="font-mono text-xs text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={recentBookings}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className={`text-primary font-semibold ${justUpdated ? 'animate-pulse' : ''}`}
          >
            {recentBookings}
          </motion.span>
        </AnimatePresence>
        {' '}people booked in last 7 days
      </span>

      <span className="font-mono text-[9px] uppercase tracking-wider text-primary/60">
        LIVE
      </span>
    </motion.div>
  )
}
