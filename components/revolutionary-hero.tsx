"use client"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { ArrowRight, Zap } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import { TextGenerateEffect } from "./ui/text-generate-effect"
import { FlipWords } from "./ui/flip-words"

const tradingData = [
  { symbol: "ES", price: 4567.25, change: 23.75, volume: "2.1M", status: "LONG" },
  { symbol: "NQ", price: 15432.8, change: -45.2, volume: "1.8M", status: "SHORT" },
  { symbol: "YM", price: 34567.9, change: 156.3, volume: "890K", status: "LONG" },
  { symbol: "RTY", price: 2134.56, change: 12.45, volume: "1.2M", status: "LONG" },
]

export const RevolutionaryHero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 0.3], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  const [currentProfit, setCurrentProfit] = useState(47392.5)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProfit((prev) => prev + (Math.random() - 0.5) * 1000)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const words = ["effortless", "systematic", "automated", "intelligent"]

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.05)_1px,transparent_0)] [background-size:24px_24px]" />

      <motion.div
        ref={ref}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-32 pb-8 sm:pb-16"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 sm:space-y-8">
            {/* Main Headline with Advanced Typography */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-3 sm:space-y-4"
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-gray-900 leading-[0.9] tracking-tight">
                <span className="block">Elite level trading,</span>
                <span className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent block">
                  <FlipWords words={words} />
                </span>
              </h1>
            </motion.div>

            {/* Subtitle with Text Generation Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <TextGenerateEffect
                words="AI precision with human trading expertise. You get all the upside, none of the noise."
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl"
              />
            </motion.div>

            {/* CTA Buttons with Advanced Interactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.a
                href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg overflow-hidden inline-block"
                style={{ backgroundColor: "#03873E" }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to right, #026B32, #025A2B)" }}
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "0%" }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  <span>Schedule a Call</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.a>
            </motion.div>
          </div>

          {/* Right Column - Simplified Trading Interface */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative mt-8 lg:mt-0"
          >
            <SimplifiedTradingInterface />
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

const SimplifiedTradingInterface = () => {
  return (
    <div className="relative">
      {/* Main Trading Dashboard */}
      <motion.div
        className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Header */}
        <div
          className="bg-gray-900 px-4 sm:px-6 py-3 sm:py-4"
          style={{
            background: "rgb(17, 24, 39) !important",
            backgroundColor: "rgb(17, 24, 39) !important",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-white text-xs sm:text-sm font-medium" style={{ color: "white !important" }}>
                  Live Trading System
                </span>
              </div>
              <div className="text-gray-400 text-xs sm:text-sm" style={{ color: "rgb(156, 163, 175) !important" }}>
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4" style={{ color: "#03873E" }} />
              <span className="text-white text-xs sm:text-sm" style={{ color: "white !important" }}>
                AI Active
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-4">
            <button className="px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">Positions</button>
            <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Performance</button>
            <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Alerts</button>
          </div>

          {/* Trading Positions */}
          <div className="space-y-3">
            {tradingData.map((trade, index) => (
              <div key={trade.symbol} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs font-bold text-blue-600">{trade.symbol}</span>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Vol: {trade.volume}</div>
                    <div
                      className={`text-xs px-2 py-1 rounded-full ${
                        trade.status === "LONG" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {trade.status}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-gray-900">${trade.price.toLocaleString()}</div>
                  <div className={`text-xs ${trade.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {trade.change >= 0 ? "+" : ""}
                    {trade.change}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View Full Dashboard Button */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              className="w-full text-white py-2 px-4 rounded-lg text-sm font-medium"
              style={{ backgroundColor: "#03873e" }}
            >
              Sign in to View Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
