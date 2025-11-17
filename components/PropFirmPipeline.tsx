'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { CheckCircle2, Check } from 'lucide-react'
import { PipelineTerminalStage } from './PipelineTerminalStage'
import { CenterMetric } from './CenterMetric'

export const PropFirmPipeline = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  // Stage configuration with all content and visualizations
  const stages = [
    // Stage 01 - Top (0°)
    {
      number: "01",
      title: "CHALLENGE QUALIFICATION",
      command: "validate_entry --requirements",
      output: "Account verified • Rules confirmed • Ready",
      metric: "QUALIFIED",
      metricSubtext: "Entry Approved",
      visualization: (
        <div className="flex items-center gap-1 justify-center">
          <CheckCircle2 size={12} className="text-primary opacity-70" />
          <CheckCircle2 size={12} className="text-primary opacity-70" />
          <CheckCircle2 size={12} className="text-primary opacity-70" />
        </div>
      ),
      delay: 0.2,
    },
    // Stage 02 - Right (90°)
    {
      number: "02",
      title: "DRAWDOWN CONTROL",
      command: "monitor_risk --limit=5%",
      output: "Current: 3.2% • Threshold: 5.0% • Safe",
      metric: "3.2%",
      metricSubtext: "Max Drawdown",
      visualization: (
        <div className="w-full space-y-1 px-2">
          <div className="w-full h-1 bg-muted/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary rounded-full"
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
            />
          </div>
          <div className="flex justify-between">
            <span className="font-mono text-[8px] text-muted-foreground">0%</span>
            <span className="font-mono text-[8px] text-primary font-semibold">3.2</span>
            <span className="font-mono text-[8px] text-muted-foreground">5%</span>
          </div>
        </div>
      ),
      delay: 0.3,
    },
    // Stage 03 - Bottom (180°)
    {
      number: "03",
      title: "TARGET ACHIEVEMENT",
      command: "track_targets --phase=all",
      output: "Phase 1: ✓ • Phase 2: 84% progress",
      metric: "9 DAYS",
      metricSubtext: "Avg to Target",
      visualization: (
        <div className="space-y-1.5">
          <div className="flex gap-2 justify-center">
            <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
              <Check size={10} className="text-background stroke-[3]" />
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            </div>
            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/20" />
          </div>
          <div className="flex gap-2 justify-center text-[8px] font-mono">
            <span className="text-primary">P1</span>
            <span className="text-primary opacity-70">P2</span>
            <span className="text-muted-foreground">Out</span>
          </div>
        </div>
      ),
      delay: 0.4,
    },
    // Stage 04 - Left (270°)
    {
      number: "04",
      title: "ACCOUNT FUNDED",
      command: "deploy_capital --accounts=127",
      output: "127 funded • $3.2M deployed • Trading live",
      metric: "$25K",
      metricSubtext: "Avg Account Size",
      visualization: (
        <div className="space-y-1">
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 24 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-primary"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 0.7, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.6 + (i * 0.02),
                }}
              />
            ))}
          </div>
          <div className="font-mono text-[8px] text-muted-foreground text-center">
            Live accounts
          </div>
        </div>
      ),
      delay: 0.5,
    },
  ]

  return (
    <div ref={ref} className="relative w-full mx-auto" style={{ maxWidth: '900px', minHeight: '1000px', paddingTop: '140px', paddingBottom: '200px', paddingLeft: '20px', paddingRight: '20px' }}>
      {/* SVG Circle with Animated Trail */}
      <svg
        viewBox="0 0 800 800"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: isInView ? 1 : 0, transition: 'opacity 600ms', pointerEvents: 'none' }}
      >
        <defs>
          {/* Flowing gradient trail */}
          <linearGradient id="flowGradient">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0;0.8;0.6;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="25%" stopColor="var(--primary)" stopOpacity="0.6">
              <animate
                attributeName="stop-opacity"
                values="0.6;0;0;0.8;0.6"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8">
              <animate
                attributeName="stop-opacity"
                values="0.8;0.6;0;0;0.8"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="75%" stopColor="var(--primary)" stopOpacity="0.6">
              <animate
                attributeName="stop-opacity"
                values="0.6;0.8;0.6;0;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0">
              <animate
                attributeName="stop-opacity"
                values="0;0.6;0.8;0.6;0"
                dur="4s"
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="trailGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base track circle (dashed) */}
        <circle
          cx="400"
          cy="400"
          r="280"
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="1"
          opacity="0.3"
          strokeDasharray="4 8"
        />

        {/* Animated gradient trail */}
        <circle
          cx="400"
          cy="400"
          r="280"
          fill="none"
          stroke="url(#flowGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#trailGlow)"
        />

        {/* Connection node pulses at each stage */}
        {[
          { cx: 400, cy: 120, delay: 0 },  // Top
          { cx: 680, cy: 400, delay: 1 },  // Right
          { cx: 400, cy: 680, delay: 2 },  // Bottom
          { cx: 120, cy: 400, delay: 3 },  // Left
        ].map((node, i) => (
          <g key={i}>
            {/* Pulsing outer ring */}
            <circle
              cx={node.cx}
              cy={node.cy}
              r="8"
              fill="var(--primary)"
              opacity="0.2"
            >
              <animate
                attributeName="r"
                values="8;12;8"
                dur="2s"
                begin={`${node.delay}s`}
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.2;0;0.2"
                dur="2s"
                begin={`${node.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
            {/* Solid center dot */}
            <circle cx={node.cx} cy={node.cy} r="4" fill="var(--primary)" />
          </g>
        ))}
      </svg>

      {/* Center Metric */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <CenterMetric value={127} label="Funded Accounts" animate={isInView} />
      </div>

      {/* Stages positioned around circle */}
      <div className="absolute inset-0 hidden md:block">
        {/* Stage 1 - Top */}
        <div className="absolute" style={{ top: '28%', left: '50%', transform: 'translate(-50%, -100%)' }}>
          <PipelineTerminalStage {...stages[0]} />
        </div>

        {/* Stage 2 - Right */}
        <div className="absolute" style={{ top: '50%', right: '8%', transform: 'translate(100%, -50%)' }}>
          <PipelineTerminalStage {...stages[1]} />
        </div>

        {/* Stage 3 - Bottom */}
        <div className="absolute" style={{ bottom: '28%', left: '50%', transform: 'translate(-50%, 100%)' }}>
          <PipelineTerminalStage {...stages[2]} />
        </div>

        {/* Stage 4 - Left */}
        <div className="absolute" style={{ top: '50%', left: '8%', transform: 'translate(-100%, -50%)' }}>
          <PipelineTerminalStage {...stages[3]} />
        </div>
      </div>

      {/* Mobile Vertical Stack */}
      <div className="md:hidden space-y-4">
        {/* Center metric card on mobile */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <CenterMetric value={127} label="Funded Accounts" animate={isInView} />
        </div>

        {/* Vertical stages with arrows */}
        {stages.map((stage, i) => (
          <div key={i}>
            {/* Arrow connector */}
            {i > 0 && (
              <div className="flex justify-center py-2">
                <svg width="24" height="32" viewBox="0 0 24 32">
                  <defs>
                    <linearGradient id={`arrowGradient${i}`} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.2" />
                    </linearGradient>
                  </defs>
                  <line x1="12" y1="0" x2="12" y2="28" stroke={`url(#arrowGradient${i})`} strokeWidth="2" />
                  <path d="M 12 28 L 8 24 M 12 28 L 16 24" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" fill="none" />
                </svg>
              </div>
            )}

            {/* Stage */}
            <PipelineTerminalStage {...stage} />
          </div>
        ))}
      </div>
    </div>
  )
}
