'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Download, PlayCircle } from 'lucide-react'
import { MagneticButton } from './MagneticButton'

export function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if already shown this session
    const shown = sessionStorage.getItem('dt-exit-intent-shown')
    if (shown === 'true') return

    // Desktop only
    if (window.innerWidth < 768) return

    let timeoutId: NodeJS.Timeout

    const handleMouseLeave = (e: MouseEvent) => {
      // Detect mouse moving toward top of viewport (to close tab/window)
      if (e.clientY < 50 && !shown) {
        // Small delay to avoid false positives
        timeoutId = setTimeout(() => {
          setIsVisible(true)
          sessionStorage.setItem('dt-exit-intent-shown', 'true')
        }, 300)
      }
    }

    const handleMouseEnter = () => {
      clearTimeout(timeoutId)
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(timeoutId)
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-2xl"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-background border border-border rounded-2xl shadow-xl p-8 md:p-12 relative mx-4">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="text-center space-y-8">
                <div>
                  <h3 className="font-display font-semibold text-foreground text-4xl mb-4">
                    Before you go...
                  </h3>
                  <p className="text-xl text-muted-foreground">
                    Join 127 funded traders
                  </p>
                </div>

                {/* Options */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Option 1: Transparency */}
                  <a
                    href="/#risk"
                    onClick={handleClose}
                    className="bg-muted/50 rounded-xl p-6 space-y-4 hover:bg-muted/70 transition-colors cursor-pointer border border-border block"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      <PlayCircle className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-2">
                        View Transparency
                      </div>
                      <p className="text-sm text-muted-foreground">
                        See our complete risk metrics and performance data
                      </p>
                    </div>
                  </a>

                  {/* Option 2: Manifesto */}
                  <a
                    href="/manifesto"
                    onClick={handleClose}
                    className="bg-muted/50 rounded-xl p-6 space-y-4 hover:bg-muted/70 transition-colors cursor-pointer border border-border block"
                  >
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                      <Download className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground mb-2">
                        Read The Truth
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Discover why prop firms are designed to make you fail
                      </p>
                    </div>
                  </a>
                </div>

                {/* Primary CTA */}
                <div className="pt-6 flex flex-col items-center gap-6">
                  <MagneticButton
                    href="/waitlist"
                    size="large"
                  >
                    Get On The Waitlist
                  </MagneticButton>

                  <button
                    onClick={handleClose}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
