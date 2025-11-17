'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { GeometricFrame } from './GeometricFrame'
import { QuoteCard } from './QuoteCard'
import { TerminalStatReadout } from './TerminalStatReadout'
import { Attribution } from './Attribution'

export default function FounderSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="founder" className="py-16 md:py-24 bg-background">
      <div ref={ref} className="container-wide">
        {/* Section Label */}
        <motion.div
          className="font-mono text-sm uppercase tracking-wide text-muted-foreground mb-12 text-center lg:text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          The Architect
        </motion.div>

        {/* Main Composition */}
        <div className="relative max-w-[1200px] mx-auto min-h-[900px] lg:min-h-[800px]">

          {/* Enhanced Portrait with ALL 4 layers */}
          <motion.div
            className="portrait-wrapper relative mx-auto lg:mx-0 lg:w-[65%] max-w-[700px]"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* LAYER 1 & 2: Gradient Border + Glow Shadow */}
            <div
              className="portrait-frame transition-shadow duration-[400ms]"
              style={{
                padding: '8px',
                borderRadius: '24px',
                background: `
                  linear-gradient(var(--background), var(--background)) padding-box,
                  linear-gradient(135deg,
                    hsl(var(--primary) / 0.4) 0%,
                    transparent 40%,
                    hsl(var(--primary) / 0.2) 100%
                  ) border-box
                `,
                border: '2px solid transparent',
                boxShadow: `
                  0 24px 80px hsl(var(--primary) / 0.12),
                  0 8px 32px hsl(var(--foreground) / 0.08)
                `,
              }}
            >
              {/* LAYER 3 & 4: Portrait Container with Duotone */}
              <div className="portrait-container relative overflow-hidden rounded-[20px]" style={{ height: '700px' }}>
                {/* Image with CSS Duotone Filter */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZTq2c84zmCuc5NdieuKVSGUQsiu6o5.png"
                  alt="Michael Gonzalez"
                  fill
                  className="object-cover"
                  priority
                  quality={90}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 700px"
                  style={{
                    filter: `
                      saturate(0.7)
                      contrast(1.1)
                      brightness(0.95)
                      sepia(0.15)
                      hue-rotate(-10deg)
                    `
                  }}
                />

                {/* Duotone Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 60%)',
                    mixBlendMode: 'overlay',
                  }}
                />
              </div>

              {/* LAYER 5: Geometric Frame Brackets */}
              <GeometricFrame />
            </div>
          </motion.div>

          {/* Floating Quote Card */}
          <QuoteCard
            quote="I built Fit Tea from $10,000 to $100 million. Double Tap applies that same systematic precision to algorithmic trading."
            isInView={isInView}
            className="lg:absolute lg:bottom-[12%] lg:right-[5%] relative mt-8 lg:mt-0"
          />

          {/* Terminal Stats Row */}
          <div className="mt-8 lg:mt-12">
            <div className="flex flex-col md:flex-row gap-4 justify-center flex-wrap lg:flex-nowrap max-w-[700px] mx-auto lg:mx-0">
              <TerminalStatReadout
                command="echo $FIT_TEA_EXIT"
                output="$100M+"
                label="Business Growth"
                delay={0.5}
              />
              <TerminalStatReadout
                command="echo $TRADING_EXP"
                output="14 Years"
                label="Trading Experience"
                delay={0.6}
              />
              <TerminalStatReadout
                command="echo $CAPITAL_AUM"
                output="$24M+"
                label="Assets Under Management"
                delay={0.7}
              />
            </div>
          </div>

          {/* Attribution Signature */}
          <Attribution
            name="Michael Gonzalez"
            title="Founder & Chief Architect"
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  )
}
