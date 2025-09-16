"use client"

import type React from "react"

import { motion } from "framer-motion"
import { BrainCircuit, ShieldCheck, TrendingUp, Zap } from "lucide-react"

type CardItem = {
  title: string
  icon: React.ReactNode
  heading: string
  body: string
}

const items: CardItem[] = [
  {
    title: "AI-Powered Analysis",
    icon: <BrainCircuit className="h-8 w-8 text-[#03873E]" aria-hidden />,
    heading: "Proprietary AI Models",
    body: "Our system analyzes millions of data points to identify predictive patterns and generate high-probability trading signals, operating beyond human capability.",
  },
  {
    title: "Automated Execution",
    icon: <Zap className="h-8 w-8 text-[#03873E]" aria-hidden />,
    heading: "Microsecond Precision",
    body: "Trades are executed automatically at the optimal moment, eliminating emotional bias and slippage for superior entry and exit points.",
  },
  {
    title: "Dynamic Risk Management",
    icon: <ShieldCheck className="h-8 w-8 text-[#03873E]" aria-hidden />,
    heading: "Institutional-Grade Controls",
    body: "Every position is protected by a multi-layered risk management framework, including dynamic stop-losses and portfolio-level exposure limits.",
  },
  {
    title: "Consistent Compounding",
    icon: <TrendingUp className="h-8 w-8 text-[#03873E]" aria-hidden />,
    heading: "The Power of Compounding",
    body: "Profits are systematically reinvested, leveraging compounding to accelerate wealth generation over time.",
  },
]

export default function TimelineSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-24 bg-white dark:bg-neutral-950"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-4">
          The Double Tap Difference
        </h2>
        <p className="text-lg text-center text-white dark:text-neutral-300 mb-16 max-w-3xl mx-auto">
          Our systematic approach combines cutting-edge technology with rigorous risk management to deliver consistent,
          emotion-free returns.
        </p>

        {/* 4 cards side by side (wraps on smaller screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.05 * i, ease: "easeOut" }}
              className="group relative rounded-2xl border border-neutral-700/60 bg-[#002914] p-6 shadow-2xl overflow-hidden"
            >
              {/* hover glow (subtle, brand green) */}
              <div
                aria-hidden
                className="pointer-events-none absolute -inset-4 rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100 -z-10"
                style={{
                  background:
                    "radial-gradient(120% 80% at 50% 50%, rgba(34,197,94,0.8) 0%, rgba(34,197,94,0.5) 45%, transparent 80%)",
                  filter: "blur(16px)",
                }}
              />
              {/* top divider accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#03873E] to-transparent opacity-60" />

              <div className="relative z-10 flex items-start gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#002914] ring-1 ring-[#03873E]/30">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                  <p className="text-sm text-neutral-300">{item.heading}</p>
                </div>
              </div>

              <p className="relative z-10 mt-4 text-neutral-300 leading-relaxed">{item.body}</p>

              {/* subtle lift on hover */}
              <div className="absolute inset-0 rounded-2xl ring-0 ring-[#03873E]/0 transition duration-300 group-hover:ring-2 group-hover:ring-[#03873E]/40" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex justify-center mt-12"
        >
          <button
            onClick={() => window.open("https://api.leadconnectorhq.com/widget/booking/uNrtyVbgk34GwxL5JOXz", "_blank")}
            className="bg-[#002914] hover:bg-[#03873E] text-[#22c55e] hover:text-white font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg border border-[#03873E]/30 hover:border-[#03873E]"
          >
            Experience the Difference
          </button>
        </motion.div>
      </div>
    </motion.section>
  )
}
