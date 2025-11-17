'use client'

import { motion } from 'framer-motion'
import { TradingViewEquityCurve } from './TradingViewEquityCurve'
import { TimelineEvent } from './TimelineEvent'

interface JourneyEvent {
  day: number
  type: 'success' | 'warning' | 'failure'
  title: string
  description: string
  equity: number
  drawdown?: number
}

interface JourneyData {
  title: string
  subtitle: string
  events: JourneyEvent[]
  finalEquity: number
  totalLost?: number
  totalGained?: number
  daysWasted?: number
  daysElapsed?: number
  attempts?: number
  status: string
  statusColor: 'destructive' | 'primary'
}

interface JourneyPanelProps {
  journey: JourneyData
  variant: 'failure' | 'success'
  isInView: boolean
}

export const JourneyPanel = ({ journey, variant, isInView }: JourneyPanelProps) => {
  const isFailure = variant === 'failure'

  return (
    <div className={`p-8 md:p-12 min-h-[600px] ${
      isFailure
        ? 'bg-[rgba(0,0,0,0.01)] dark:bg-[rgba(255,255,255,0.01)]'
        : 'bg-[rgba(3,135,62,0.02)] dark:bg-[rgba(4,160,78,0.02)]'
    }`} style={{ filter: isFailure ? 'saturate(0.6)' : 'saturate(1.1)' }}>

      {/* Header */}
      <motion.div
        className="mb-8 pb-6 border-b border-border"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h3 className="font-mono text-sm uppercase tracking-wider text-muted-foreground mb-3 font-medium">
          {journey.title}
        </h3>
        <div className={`font-mono text-xl md:text-2xl font-semibold ${
          isFailure ? 'text-muted-foreground' : 'text-primary'
        }`}>
          {journey.subtitle}
        </div>
      </motion.div>

      {/* Equity Curve */}
      <motion.div
        className="mb-8 relative rounded-lg border border-border bg-card/50 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <TradingViewEquityCurve
          data={journey.events.map((e, i) => ({
            time: `2024-01-${String(e.day).padStart(2, '0')}`,
            value: e.equity
          }))}
          isFailure={isFailure}
        />
      </motion.div>

      {/* Timeline Events */}
      <div className="space-y-4 mb-8">
        {journey.events.map((event, i) => (
          <TimelineEvent
            key={i}
            event={event}
            isFailure={isFailure}
            delay={0.4 + (i * 0.15)}
            isInView={isInView}
          />
        ))}
      </div>

      {/* Current Status */}
      <motion.div
        className="pt-6 border-t border-border"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3 font-medium">
          Current Status
        </div>
        <div className={`font-mono text-4xl md:text-5xl font-bold tabular-nums ${
          isFailure ? 'text-destructive' : 'text-primary'
        }`}>
          ${journey.finalEquity.toLocaleString()}
        </div>

        {/* Summary Stats */}
        <div className="mt-4 space-y-2">
          {isFailure ? (
            <>
              <div className="font-mono text-sm text-muted-foreground">
                Total Lost: <span className="text-destructive font-semibold">${journey.totalLost?.toLocaleString()}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                Days Wasted: <span className="text-destructive font-semibold">{journey.daysWasted}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                Failed Attempts: <span className="text-destructive font-semibold">{journey.attempts}</span>
              </div>
            </>
          ) : (
            <>
              <div className="font-mono text-sm text-muted-foreground">
                Total Gained: <span className="text-primary font-semibold">${journey.totalGained?.toLocaleString()}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                Days Elapsed: <span className="text-primary font-semibold">{journey.daysElapsed}</span>
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                Status: <span className="text-primary font-semibold">{journey.status}</span>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  )
}
