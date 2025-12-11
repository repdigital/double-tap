'use client'

import { OperatorPanel } from './OperatorPanel'

export function SystematicSplitSimulator() {
  return (
    <section className="relative py-32 bg-[#0A0A0A]">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">
          {/* Left: Manual Trading */}
          <OperatorPanel variant="manual" />

          {/* Gold Divider (Desktop Only) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <div className="h-full bg-gradient-to-b from-transparent via-[var(--mastery-gold)] to-transparent opacity-30" />
          </div>

          {/* Right: Systematic Trading */}
          <OperatorPanel variant="systematic" />
        </div>
      </div>
    </section>
  )
}
