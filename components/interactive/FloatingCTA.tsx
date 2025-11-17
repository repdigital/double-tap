'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if user already dismissed
    const dismissed = localStorage.getItem('dt-floating-cta-dismissed')
    if (dismissed === 'true') {
      setIsDismissed(true)
      return
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100

      // Show after 60% scroll
      if (scrollPercentage > 60 && !isDismissed) {
        setIsVisible(true)
      } else if (scrollPercentage < 60) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsVisible(false)
    setIsDismissed(true)
    localStorage.setItem('dt-floating-cta-dismissed', 'true')
  }

  if (isDismissed) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 no-print"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        >
          <div className="bg-background/95 backdrop-blur-md border-t-2 border-primary shadow-xl">
            <div className="container-wide py-4">
              <div className="flex items-center justify-between gap-6">
                {/* Message */}
                <div className="flex-1">
                  <p className="font-semibold text-foreground mb-1">
                    Ready to stop failing prop challenges?
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Join the waitlist and learn how systematic precision beats emotional trading
                  </p>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                  <MagneticButton
                    href="/waitlist"
                    size="default"
                  >
                    Get On Waitlist
                  </MagneticButton>

                  {/* Dismiss Button */}
                  <button
                    onClick={handleDismiss}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Dismiss"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
