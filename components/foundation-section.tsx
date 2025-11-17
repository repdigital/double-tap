'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, Suspense, lazy } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { SpecificationCard } from './SpecificationCard'
import { RadialProgress } from './charts/RadialProgress'
import { ComparisonBars } from './charts/ComparisonBars'
import { LivePulse } from './charts/LivePulse'
import { DrawdownGauge } from './charts/DrawdownGauge'
import { generatePerformanceData, generateCandlestickData } from '@/lib/mock-data'

// Lazy load charts
const MiniLineChart = lazy(() => import('./charts/MiniLineChart').then(m => ({ default: m.MiniLineChart })))
const MiniCandlestick = lazy(() => import('./charts/MiniCandlestick').then(m => ({ default: m.MiniCandlestick })))

export default function FoundationSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Mock data
  const winRateData = generatePerformanceData(90).map(d => ({ time: d.time, value: Math.random() * 30 + 70 }))
  const tradeData = generateCandlestickData(20)
  const comparisonData = [
    { label: 'Market', value: 1.0 },
    { label: 'Strategy', value: 2.8 },
    { label: 'Target', value: 2.0 },
  ]

  return (
    <section id="foundation" className="py-16 md:py-24 bg-background">
      <div ref={ref} className="container-wide">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20 max-w-[800px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary mb-6">
            Performance Metrics
          </span>
          <h2 className="font-display font-semibold text-foreground mb-5" style={{ fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: '1.1', letterSpacing: '-0.02em' }}>
            Engineered for Consistency
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-[600px] mx-auto">
            Real-time data. Institutional precision. Updated every 30 seconds.
          </p>
        </motion.div>

        {/* Asymmetric Specifications Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Row 1: Win Rate (Hero) + Avg Return (Hero) */}
          <div className="lg:col-span-6">
            <SpecificationCard
              number="01"
              title="WIN RATE"
              value="75.3%"
              hero={true}
              visualization={
                <div className="flex justify-start">
                  <RadialProgress value={75.3} size={80} strokeWidth={8} showCenter={true} />
                </div>
              }
              technicalNote="Percentage of profitable trades over 40-day period. 67 winning trades out of 89 total executions. Based on systematic entry and exit signals."
              delay={0.1}
            />
          </div>

          <div className="lg:col-span-6">
            <SpecificationCard
              number="02"
              title="AVERAGE RETURN PER TRADE"
              value="+$322"
              hero={true}
              visualization={
                <Suspense fallback={<div className="w-full h-24 skeleton rounded" />}>
                  <MiniCandlestick data={tradeData} height={120} />
                </Suspense>
              }
              technicalNote="Mean profit across 89 executed trades over 40-day period. Total P&L: $28,630. Includes winning and losing trades. Verified results from October-November 2025."
              delay={0.2}
            />
          </div>

          {/* Row 2: Max Drawdown + Sharpe + Uptime (All Equal) */}
          <div className="lg:col-span-4">
            <SpecificationCard
              number="03"
              title="MAX DRAWDOWN"
              subtitle="Prop Firm Optimized"
              value="3.2%"
              hero={false}
              visualization={
                <DrawdownGauge
                  value={3.2}
                  maxSafe={5}
                  maxWarning={8}
                  maxDanger={10}
                  width={240}
                  height={80}
                  animate={isInView}
                />
              }
              statusIndicator={
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-primary" />
                  <span className="font-mono text-xs text-muted-foreground">Well within limits</span>
                </div>
              }
              technicalNote="Maximum peak-to-trough decline. Designed to stay within prop firm challenge limits of 5-8%. Current drawdown well below industry standards."
              delay={0.3}
            />
          </div>

          <div className="lg:col-span-4">
            <SpecificationCard
              number="04"
              title="SHARPE RATIO"
              value="2.8x"
              hero={false}
              visualization={
                <ComparisonBars
                  data={comparisonData}
                  width={160}
                  height={100}
                  animate={isInView}
                />
              }
              technicalNote="Risk-adjusted returns vs S&P 500 benchmark. Calculated using 90-day rolling window with 0% risk-free rate assumption."
              delay={0.4}
            />
          </div>

          <div className="lg:col-span-4">
            <SpecificationCard
              number="05"
              title="SYSTEM UPTIME"
              value="99.7%"
              hero={false}
              visualization={
                <LivePulse
                  size={8}
                  color="var(--primary)"
                  showTimeline={true}
                  animate={isInView}
                />
              }
              technicalNote="Operational reliability measured over trailing 12 months. Includes scheduled maintenance windows. 99.99% target SLA for production systems."
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
