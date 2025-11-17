'use client'

import { StatPill } from './StatPill'

export const PropStatsRow = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-16 md:mt-20">
      <StatPill label="Avg Pass Time" value="9 days" />
      <StatPill label="Success Rate" value="94.3%" />
      <StatPill label="Capital Deployed" value="$3.2M" />
      <StatPill label="Active Traders" value="127" />
    </div>
  )
}
