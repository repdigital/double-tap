'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export const BookingEmbed = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const scriptLoaded = useRef(false)

  useEffect(() => {
    if (scriptLoaded.current) return

    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.type = 'text/javascript'
    script.async = true
    script.onload = () => {
      scriptLoaded.current = true
    }

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <motion.div
      className="booking-embed-wrapper"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div
        className="relative rounded-2xl border border-border bg-card overflow-hidden transition-shadow duration-400 hover:shadow-lg"
        style={{
          padding: '24px',
          boxShadow: '0 8px 24px hsl(var(--foreground) / 0.06)',
          minHeight: '600px',
        }}
      >
        {/* Loading State */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-card z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
              <div className="font-mono text-sm text-muted-foreground">
                Loading calendar...
              </div>
            </div>
          </div>
        )}

        {/* Booking Iframe */}
        <iframe
          src="https://api.leadconnectorhq.com/widget/booking/StzMUP1l1mfnVC3QvEpV"
          style={{
            width: '100%',
            border: 'none',
            overflow: 'hidden',
            minHeight: '600px',
          }}
          scrolling="no"
          id="StzMUP1l1mfnVC3QvEpV_1763259189908"
          onLoad={() => setIsLoaded(true)}
        />
      </div>
    </motion.div>
  )
}
