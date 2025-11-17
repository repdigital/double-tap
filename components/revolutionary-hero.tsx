'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { MagneticButton } from './interactive/MagneticButton'
import HeroChartPreview from './charts/HeroChartPreview'

export const RevolutionaryHero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-200px' })
  const [liveCount, setLiveCount] = useState(847)

  // Live systems counter
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCount(prev => prev + Math.floor(Math.random() * 3) - 1)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen bg-background overflow-hidden">
      <div ref={ref} className="container-wide min-h-screen flex items-start lg:items-center pt-20 pb-16 lg:pt-24 lg:pb-24">
        <div className="relative w-full max-w-7xl mx-auto">
          <div className="grid w-full gap-10 lg:gap-8 xl:gap-12 lg:grid-cols-12 items-center">

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl space-y-8 lg:space-y-10 lg:col-span-6 xl:col-span-6">

              {/* Monumental Headline */}
              <motion.h1
                className="font-display font-bold text-foreground uppercase text-balance"
                style={{
                  fontSize: 'clamp(48px, 6vw, 120px)',
                  lineHeight: '0.9',
                  letterSpacing: '-0.035em',
                  textShadow: '0 4px 24px rgba(0,0,0,0.15)'
                }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 60, scale: 0.95, letterSpacing: '-0.09em' }}
                  animate={isInView ? {
                    opacity: 1, y: 0, scale: 1, letterSpacing: '-0.07em'
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  Institutional
                </motion.span>

                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 60, scale: 0.95, letterSpacing: '-0.09em' }}
                  animate={isInView ? {
                    opacity: 1, y: 0, scale: 1, letterSpacing: '-0.07em'
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  Grade Tools.
                </motion.span>

                <motion.span
                  className="block mt-2 sm:mt-4"
                  initial={{ opacity: 0, y: 60, scale: 0.95, letterSpacing: '-0.09em' }}
                  animate={isInView ? {
                    opacity: 1, y: 0, scale: 1, letterSpacing: '-0.07em'
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  Retail
                </motion.span>

                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 60, scale: 0.95, letterSpacing: '-0.09em' }}
                  animate={isInView ? {
                    opacity: 1, y: 0, scale: 1, letterSpacing: '-0.07em'
                  } : {}}
                  transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                >
                  Accessibility.
                </motion.span>
              </motion.h1>

              {/* Divider */}
              <motion.div
                className="h-px bg-border w-full max-w-lg"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                style={{ transformOrigin: 'left' }}
              />

              {/* Subheadline */}
              <motion.div
                className="space-y-3 text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <p>Beat prop firms at their own game. DoD-trained quants.</p>
                <p>94% challenge pass rate. 9 days to funded accounts.</p>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="pt-2"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <MagneticButton
                  href="/waitlist"
                  size="xl"
                >
                  Get On The Waitlist
                </MagneticButton>
              </motion.div>

              {/* Live Indicator */}
              <motion.div
                className="mt-6 flex flex-wrap items-center gap-4 font-mono text-sm tabular-nums"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-primary font-semibold tracking-wider">ALGORITHM ACTIVE</span>
                </div>
                <span className="text-muted-foreground hidden sm:inline">•</span>
                <span className="text-foreground">{liveCount} systems trading</span>
              </motion.div>
            </div>

            <motion.div
              className="mt-12 lg:mt-0 lg:col-span-6 xl:col-span-5 xl:col-start-8"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
            >
              <div className="bg-card/80 backdrop-blur-xl border border-primary/15 rounded-3xl p-6 sm:p-8 shadow-accent w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                    <span className="font-mono text-xs text-primary tracking-wider">LIVE PERFORMANCE</span>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">30D</span>
                </div>

                {/* Chart */}
                <HeroChartPreview />

                {/* Quick Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <div className="font-mono text-2xl font-semibold text-primary">127</div>
                    <div className="text-xs text-muted-foreground">Funded Accounts</div>
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-semibold text-foreground">9 Days</div>
                    <div className="text-xs text-muted-foreground">Avg to Funded</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 2.0 }}
      >
        <p className="text-xs text-muted-foreground mb-2 tracking-wider uppercase font-mono">
          Scroll to explore
        </p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="mx-auto">
            <path
              d="M10 3v14m0 0l-4-4m4 4l4-4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  )
}
