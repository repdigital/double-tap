'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, Suspense, lazy } from 'react'
import { ChartSkeleton } from './charts/ChartSkeleton'

// Lazy load charts
const EquityCurve = lazy(() => import('./charts/EquityCurve').then(mod => ({ default: mod.EquityCurve })))
const MonthlyHeatmap = lazy(() => import('./charts/MonthlyHeatmap').then(mod => ({ default: mod.MonthlyHeatmap })))
const DistributionChart = lazy(() => import('./charts/DistributionChart').then(mod => ({ default: mod.DistributionChart })))

export default function RiskSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const riskMetrics = [
    { label: 'Max Drawdown', value: '3.2%', type: 'positive' },
    { label: 'Funded Accounts', value: '127', type: 'positive' },
    { label: 'Days to Funded', value: '9', type: 'positive' },
    { label: 'Sharpe Ratio', value: '2.8', type: 'positive' },
    { label: 'Win Rate', value: '87.3%', type: 'positive' },
    { label: 'Success Rate', value: '94.3%', type: 'positive' },
  ]

  return (
    <section id="risk" className="py-24 md:py-32 bg-muted/30">
      <div ref={ref} className="container-wide">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16 md:mb-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-semibold text-foreground mb-6">
            Risk Transparency
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            We show you everything—the wins and the losses. Past performance doesn't guarantee future results, but transparency builds trust. Here's the full picture, not just the highlight reel.
          </p>
        </motion.div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 mb-12">
          {/* Equity Curve - 40% */}
          <motion.div
            className="lg:col-span-4 space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-semibold text-foreground text-center">
              Equity Curve
            </h3>
            <Suspense fallback={<ChartSkeleton height={400} />}>
              <EquityCurve height={400} />
            </Suspense>
            <p className="text-sm text-muted-foreground text-center">
              Account value over time with drawdown markers
            </p>
          </motion.div>

          {/* Monthly Heatmap - 30% */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-semibold text-foreground text-center">
              Algo Monthly Performance
            </h3>
            <Suspense fallback={<ChartSkeleton height={400} />}>
              <MonthlyHeatmap height={400} />
            </Suspense>
            <p className="text-sm text-muted-foreground text-center">
              Performance by month and year
            </p>
          </motion.div>

          {/* Distribution - 30% */}
          <motion.div
            className="lg:col-span-3 space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="font-semibold text-foreground text-center">
              Return Distribution
            </h3>
            <Suspense fallback={<ChartSkeleton height={400} />}>
              <DistributionChart height={400} />
            </Suspense>
            <p className="text-sm text-muted-foreground text-center">
              Daily return frequency distribution
            </p>
          </motion.div>
        </div>

        {/* Key Metrics Panel */}
        <motion.div
          className="bg-card border border-border rounded-xl p-8"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {riskMetrics.map((metric, index) => (
              <div key={metric.label} className="text-center">
                <div
                  className={`font-mono text-2xl font-semibold mb-2 ${
                    metric.type === 'positive'
                      ? 'text-primary'
                      : metric.type === 'negative'
                      ? 'text-destructive'
                      : 'text-foreground'
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
