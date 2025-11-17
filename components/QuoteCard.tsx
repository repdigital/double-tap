'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface QuoteCardProps {
  quote: string
  isInView: boolean
  className?: string
}

export const QuoteCard = ({ quote, isInView, className }: QuoteCardProps) => {
  return (
    <motion.div
      className={cn(
        'absolute bottom-[35%] right-[5%] w-[500px] max-w-[90%] z-20',
        'lg:absolute lg:bottom-[35%] lg:right-[5%]',
        'md:relative md:bottom-auto md:right-auto md:mt-[-60px] md:mx-auto',
        className
      )}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.8,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }}
    >
      <div
        className={cn(
          'group',
          'backdrop-blur-[20px]',
          'rounded-[20px]',
          'p-10 md:p-12',
          'transition-all duration-[400ms]',
          'hover:-translate-y-1',
        )}
        style={{
          background: `
            linear-gradient(var(--card), var(--card)) padding-box,
            linear-gradient(135deg,
              hsl(var(--primary) / 0.3) 0%,
              transparent 50%,
              hsl(var(--primary) / 0.15) 100%
            ) border-box
          `,
          border: '1px solid transparent',
          boxShadow: `
            0 24px 60px hsl(var(--foreground) / 0.12),
            0 8px 24px hsl(var(--primary) / 0.08)
          `,
        }}
      >
        {/* Quotation Mark */}
        <div className="mb-6">
          <svg
            width="40"
            height="32"
            viewBox="0 0 40 32"
            fill="var(--primary)"
            opacity="0.2"
            className="transition-opacity duration-300 group-hover:opacity-30"
          >
            <path d="M0 32V16C0 7.168 7.168 0 16 0v8C11.584 8 8 11.584 8 16v4h8v12H0zm24 0V16c0-8.832 7.168-16 16-16v8c-4.416 0-8 3.584-8 8v4h8v12H24z"/>
          </svg>
        </div>

        {/* Quote text */}
        <blockquote
          className="font-display font-medium italic text-foreground m-0"
          style={{
            fontSize: 'clamp(24px, 3vw, 32px)',
            lineHeight: '1.4',
            letterSpacing: '-0.01em'
          }}
        >
          {quote}
        </blockquote>
      </div>
    </motion.div>
  )
}
