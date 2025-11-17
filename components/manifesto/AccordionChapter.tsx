'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AccordionChapterProps {
  number: string
  title: string
  content: React.ReactNode
  defaultOpen?: boolean
}

export const AccordionChapter = ({
  number,
  title,
  content,
  defaultOpen = false
}: AccordionChapterProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="border-b border-border last:border-b-0">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full text-left py-8 px-0 md:px-8',
          'transition-all duration-300',
          'hover:bg-muted/20',
          'group'
        )}
      >
        <div className="flex items-center justify-between gap-8">
          {/* Chapter Number + Title */}
          <div className="flex items-baseline gap-4 md:gap-6 flex-1">
            {/* Number */}
            <span className="font-mono text-sm text-muted-foreground/40 tabular-nums flex-shrink-0 font-medium">
              {number}
            </span>

            {/* Title */}
            <h3
              className="font-display font-semibold text-foreground transition-colors group-hover:text-primary"
              style={{
                fontSize: 'clamp(20px, 3vw, 40px)',
                letterSpacing: '-0.01em',
                lineHeight: '1.2'
              }}
            >
              {title}
            </h3>
          </div>

          {/* Chevron Indicator */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0.0, 0.2, 1] }}
            className="flex-shrink-0"
          >
            <ChevronDown
              size={24}
              className="text-muted-foreground group-hover:text-primary transition-colors duration-300"
            />
          </motion.div>
        </div>
      </button>

      {/* Expandable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.4, 0.0, 0.2, 1] },
                opacity: { duration: 0.3, delay: 0.1 }
              }
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.4, 0.0, 0.2, 1] },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden"
          >
            <div className="pb-12 pl-[calc(14px+16px+24px)] md:pl-[calc(14px+24px+48px)] pr-0 md:pr-8">
              <div className="max-w-[800px]">
                {content}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
