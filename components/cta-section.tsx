"use client"
import { motion } from "framer-motion"

export default function CtaSection() {
  const href = "https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"

  return (
    <section className="py-20 bg-black">
      <div className="max-w-5xl mx-auto px-6">
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="
            group block w-full rounded-2xl 
            bg-[#002914] 
            shadow-[0_10px_30px_rgba(0,0,0,0.35)] 
            ring-1 ring-[#03873E]/30 
            p-8 md:p-12 
            relative overflow-hidden
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#03873E]/60
          "
        >
          {/* hover glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background:
                "radial-gradient(80% 60% at 50% 40%, rgba(3,135,62,0.25) 0%, rgba(3,135,62,0.15) 40%, transparent 80%)",
              filter: "blur(10px)",
            }}
          />

          <div className="relative z-10 text-center">
            <h2 className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent font-bold tracking-tight text-4xl md:text-6xl">
              Ready to start?
              <span className="block text-[#03873E] mt-2 md:mt-3">Schedule a call.</span>
            </h2>
            <p className="mt-5 md:mt-6 text-sm md:text-base text-white/80">Click here to book</p>
          </div>
        </motion.a>
      </div>
    </section>
  )
}
