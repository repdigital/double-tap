'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransformationChapterProps {
  number: string
  title: string
  content: string
  stats?: Array<{ label: string, value: string, color?: string }>
  highlightStats?: Array<{ label: string, value: string, color?: string }>
  defaultOpen?: boolean
}

export function TransformationChapter({
  number,
  title,
  content,
  stats,
  highlightStats,
  defaultOpen = false
}: TransformationChapterProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-[rgba(212,175,55,0.1)] last:border-0">
      {/* Chapter Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between group hover:bg-[rgba(212,175,55,0.03)] transition-colors"
      >
        <div className="flex items-center gap-6">
          <span className="font-mono text-sm text-[var(--mastery-gold)] font-semibold">
            {number}
          </span>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-[var(--mastery-text-secondary)] group-hover:text-white transition-colors text-left">
            {title}
          </h3>
        </div>

        <ChevronDown
          className={cn(
            "h-5 w-5 text-[var(--mastery-gold)] transition-transform duration-300 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Chapter Content - Expandable */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.4 }, opacity: { duration: 0.3 } }}
            className="overflow-hidden"
          >
            <div className="pb-8 pl-12 pr-4 space-y-6">
              {/* Content Text */}
              <div className="prose prose-invert max-w-none">
                {content.split('\n\n').map((paragraph, idx) => (
                  <motion.p
                    key={idx}
                    className="text-[18px] leading-relaxed text-[var(--mastery-text-secondary)] mb-6"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>

              {/* Regular Stats Grid */}
              {stats && stats.length > 0 && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-black border border-[rgba(212,175,55,0.1)] rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--mastery-gold)] mb-2">
                        {stat.label}
                      </div>
                      <div className="font-mono text-xl font-semibold text-white">
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Highlight Stats (Gold Box) */}
              {highlightStats && highlightStats.length > 0 && (
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-6 bg-[var(--mastery-gold)]/5 border-2 border-[var(--mastery-gold)]/30 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {highlightStats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--mastery-gold)] mb-2">
                        {stat.label}
                      </div>
                      <div className={cn(
                        "font-mono text-xl font-semibold",
                        stat.color === 'gold' && 'text-[var(--mastery-gold)]',
                        stat.color === 'muted' && 'text-[var(--mastery-text-muted)]',
                        !stat.color && 'text-white'
                      )}>
                        {stat.value}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
