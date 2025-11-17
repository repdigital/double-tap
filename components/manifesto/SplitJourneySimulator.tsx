'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { JourneyPanel } from './JourneyPanel'

export const SplitJourneySimulator = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Manual trader journey (failing)
  const manualJourney = {
    title: 'Manual Trader',
    subtitle: 'Attempt #8 in progress...',
    events: [
      { day: 1, type: 'success' as const, title: 'Strong start', description: 'Up $200, feeling confident', equity: 10200, drawdown: 0 },
      { day: 3, type: 'warning' as const, title: 'Gave it back', description: 'Lost $400, revenge trading begins', equity: 9800, drawdown: 2.0 },
      { day: 5, type: 'failure' as const, title: 'Doubled position', description: 'Emotional decision, drawdown: 4.2%', equity: 9580, drawdown: 4.2 },
      { day: 7, type: 'failure' as const, title: 'Challenge Failed', description: 'Hit 5.1% drawdown overnight', equity: 9490, drawdown: 5.1 },
    ],
    finalEquity: 9490,
    totalLost: 12000,
    daysWasted: 142,
    attempts: 8,
    status: 'Failed',
    statusColor: 'destructive' as const
  }

  // Double Tap journey (succeeding)
  const doubleTapJourney = {
    title: 'Double Tap System',
    subtitle: 'Challenge #1',
    events: [
      { day: 1, type: 'success' as const, title: 'System activated', description: 'Risk parameters set, trading begins', equity: 25000, drawdown: 0 },
      { day: 3, type: 'success' as const, title: 'Controlled growth', description: 'Drawdown: 1.2%, on target', equity: 25800, drawdown: 1.2 },
      { day: 5, type: 'success' as const, title: 'Phase 1 complete', description: '5% profit target reached', equity: 26250, drawdown: 0.8 },
      { day: 7, type: 'success' as const, title: 'Phase 2 progress', description: '50% to funding goal', equity: 27100, drawdown: 1.5 },
      { day: 9, type: 'success' as const, title: 'FUNDED ✓', description: 'Account approved, capital deployed', equity: 27500, drawdown: 0 },
    ],
    finalEquity: 27500,
    totalGained: 2500,
    daysElapsed: 9,
    status: 'Funded',
    statusColor: 'primary' as const
  }

  return (
    <section ref={ref} className="py-0 bg-muted/20 border-y border-border">
      <div className="max-w-[1400px] mx-auto">
        {/* Split View Container */}
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* LEFT: Manual Trader (Failing - Desaturated) */}
          <JourneyPanel
            journey={manualJourney}
            variant="failure"
            isInView={isInView}
          />

          {/* RIGHT: Double Tap (Succeeding - Vibrant) */}
          <JourneyPanel
            journey={doubleTapJourney}
            variant="success"
            isInView={isInView}
          />
        </div>
      </div>
    </section>
  )
}
