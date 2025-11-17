'use client'

import { cn } from '@/lib/utils'

interface DotMatrixVizProps {
  className?: string
}

export const DotMatrixViz = ({ className }: DotMatrixVizProps) => {
  // 8x3 grid = 24 dots (reduced for better proportions)
  const rows = 3
  const cols = 8
  const totalDots = rows * cols

  return (
    <div
      className={cn(
        'relative w-full rounded-lg border border-border bg-card p-3',
        className
      )}
    >
      {/* Header */}
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-muted-foreground">
          Performance
        </span>
        <span className="font-mono text-xs text-primary">LIVE</span>
      </div>

      {/* Dot Matrix Grid */}
      <div
        className="relative mx-auto py-1"
        style={{
          width: 'fit-content',
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 6px)`,
          gridTemplateRows: `repeat(${rows}, 6px)`,
          gap: '11px',
        }}
      >
        {Array.from({ length: totalDots }).map((_, index) => {
          // Stagger animation delays randomly for organic feel
          const delay = (index * 137.5) % 2000 // Golden ratio based distribution

          return (
            <div
              key={index}
              className="dot-pulse"
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary)',
                animationDelay: `${delay}ms`,
              }}
            />
          )
        })}
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes dotPulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }

        .dot-pulse {
          animation: dotPulse 2000ms ease-in-out infinite;
          will-change: opacity;
        }

        @media (prefers-reduced-motion: reduce) {
          .dot-pulse {
            animation: none;
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  )
}
