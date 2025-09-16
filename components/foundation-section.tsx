"use client"

import { BackgroundBeams } from "./ui/background-beams"
import { ShieldCheck, Lock, Timer, Workflow } from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
}

export default function FoundationSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-black overflow-hidden">
      <BackgroundBeams />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            The Foundation of <span className="text-[#03873E]">Your Success</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            Built on technology, security, and process.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="mx-auto max-w-6xl relative overflow-hidden rounded-2xl border border-neutral-700 bg-[#002914] p-6 sm:p-8 lg:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
        >
          {/* depth + soft hover glow */}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/10" />
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 50% 35%, rgba(3,135,62,0.12) 0%, rgba(3,135,62,0.06) 45%, transparent 80%)",
              filter: "blur(10px)",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Left */}
            <div className="lg:col-span-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-black/20 ring-1 ring-white/10">
                  <Image
                    src="/dtt-square-logo.png"
                    alt="Double Tap Trading"
                    width={28}
                    height={28}
                    className="w-7 h-7"
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-white">The Double Tap Edge</h3>
              </div>

              <p className="text-neutral-200 leading-relaxed">
                Our system scans market structure, automates execution, and enforces rules-based risk controls.
                Decisions stay consistent — never emotional.
              </p>

              {/* Bullets: concise, 2-col on desktop */}
              <ul className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                <li className="flex gap-3">
                  <Workflow className="mt-1 h-5 w-5 text-[#03873E]" />
                  <div className="text-neutral-200 leading-relaxed">
                    <span className="text-white font-semibold">Signal → Execute → Manage</span>
                    <br />
                    Automated pipeline: detect, place, exit.
                  </div>
                </li>
                <li className="flex gap-3">
                  <Timer className="mt-1 h-5 w-5 text-[#03873E]" />
                  <div className="text-neutral-200 leading-relaxed">
                    <span className="text-white font-semibold">Latency-aware execution</span>
                    <br />
                    Programmatic orders reduce hesitation.
                  </div>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="mt-1 h-5 w-5 text-[#03873E]" />
                  <div className="text-neutral-200 leading-relaxed">
                    <span className="text-white font-semibold">Layered risk discipline</span>
                    <br />
                    Stops and sizing control downside.
                  </div>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div className="lg:col-span-4">
              <h4 className="text-white font-semibold">Operational guardrails</h4>
              <div className="mt-3 h-px w-full bg-white/10" />
              <ul className="mt-4 space-y-2.5 text-neutral-200">
                <li className="flex gap-3">
                  <Lock className="mt-0.5 h-5 w-5 text-[#03873E]" />
                  <span>Role-based access & change control</span>
                </li>
                <li className="flex gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-[#03873E]" />
                  <span>Pre/post-trade risk checks</span>
                </li>
                <li className="flex gap-3">
                  <Workflow className="mt-0.5 h-5 w-5 text-[#03873E]" />
                  <span>Versioned deployments with rollback</span>
                </li>
                <li className="flex gap-3">
                  <Timer className="mt-0.5 h-5 w-5 text-[#03873E]" />
                  <span>Live monitoring & automated fail-safes</span>
                </li>
              </ul>

              <p className="mt-5 text-xs text-white/60">
                For information only. Not an offer, solicitation, or performance guarantee. Trading involves risk. No
                personalized investment advice is provided.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="mx-auto max-w-6xl mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { h: "Markets & Sessions", t: "Index futures; RTH/ETH coverage." },
            { h: "Execution & Hosting", t: "Low-latency infra; automated routing." },
            { h: "Risk & Controls", t: "Position limits; circuit-breakers." },
          ].map(({ h, t }) => (
            <div key={h} className="rounded-xl border border-neutral-700 bg-[#002914] p-4">
              <div className="text-white font-semibold">{h}</div>
              <p className="text-neutral-300 text-sm mt-1 leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
