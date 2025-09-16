"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { useRef } from "react"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { FlipWords } from "./ui/flip-words"
import LiveTradingWidget from "@/components/live-trading-widget"

// Brand colors
const BRAND_GREEN = "#03873E"
const BRAND_DARK = "rgb(17, 24, 39)" // header bar tone

export const RevolutionaryHero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const words = ["effortless", "systematic", "automated", "intelligent"]

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle dotted background with brand tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(3,135,62,0.06)_1px,transparent_0)] [background-size:24px_24px]" />

      <motion.div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-8 sm:pb-16"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left column */}
          <div className="space-y-6 sm:space-y-8">
            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="block">Elite level trading,</span>
                <span className="relative bg-gradient-to-r from-[var(--brand-green,#03873E)] via-emerald-700 to-emerald-800 bg-clip-text text-transparent block">
                  <FlipWords words={words} />
                </span>
              </h1>
            </motion.div>

            {/* Subhead */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextGenerateEffect
                words="AI precision with human trading expertise. You get all the upside, none of the noise."
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              />
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.a
                href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg overflow-hidden inline-block"
                style={{ backgroundColor: BRAND_GREEN }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, #026B32, #025A2B)" }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Schedule a Call</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right column — interactive widget */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0 flex lg:justify-end"
            style={
              {
                // expose CSS vars so the widget can read brand colors if desired
                // (handy if you later theme inside the widget using var(--brand-*)
                ["--brand-green" as any]: BRAND_GREEN,
                ["--brand-dark" as any]: BRAND_DARK,
              } as React.CSSProperties
            }
          >
            <div className="w-full max-w-xl">
              <LiveTradingWidget />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
