'use client'

import { motion } from 'framer-motion'
import { Clock, Users, Target } from 'lucide-react'

export const CallExpectations = () => {
  const expectations = [
    { icon: Clock, title: '15-minute discovery call', detail: 'Quick and focused' },
    { icon: Users, title: 'Assess your prop trading goals', detail: 'Understand your situation' },
    { icon: Target, title: 'Determine if you are a fit', detail: 'No hard sell, honest evaluation' },
  ]

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground font-medium">
        What to Expect on the Call
      </div>

      <div className="space-y-4">
        {expectations.map((item, i) => {
          const Icon = item.icon

          return (
            <motion.div
              key={i}
              className="flex gap-3 items-start group"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.5 + (i * 0.1)
              }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary/15">
                <Icon size={18} className="text-primary" strokeWidth={2} />
              </div>

              <div className="flex-1 pt-1">
                <div className="text-base text-foreground font-medium leading-snug mb-0.5">
                  {item.title}
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {item.detail}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
