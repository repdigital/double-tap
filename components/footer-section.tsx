"use client"
import { motion } from "framer-motion"
import Image from "next/image"

export const FooterSection = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      viewport={{ once: true }}
      className="bg-black text-white py-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left side */}
          <div className="lg:col-span-2">
            <div className="mb-6 flex items-center gap-3">
              <Image
                src="/double-tap-logo.png"
                alt="Double Tap Trading Logo"
                width={166}
                height={55}
                className="h-14 w-auto object-contain"
              />
            </div>

            <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl">
              Elite quantitative trading systems designed for consistent alpha generation through systematic precision
              and institutional-grade risk management.
            </p>

            <div className="space-y-4">
              <div>
                <div className="font-semibold text-white mb-2">EARNINGS DISCLAIMER:</div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  The information provided by Double Tap Trading is for educational and informational purposes only and
                  is not intended as a guarantee of earnings. No guarantees are made that you will achieve any specific
                  results. Any examples or testimonials provided are not intended to represent or guarantee that anyone
                  will achieve the same or similar results. Your use of this website and reliance on any information
                  contained herein is solely at your own risk. Double Tap Trading disclaims any and all liability for
                  any losses or damages of any kind that may arise from your reliance on the content presented.
                </p>
              </div>
            </div>
          </div>

          {/* Right side */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Connect</h4>
            <div className="space-y-3 text-gray-300">
              <p>hi@doubletaptrading.com</p>
              <div className="pt-4 space-y-2">
                <a href="/terms" className="block hover:text-white transition-colors">
                  Terms of Service
                </a>
                <a href="/privacy" className="block hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <div className="text-gray-400 text-sm">© 2025 Double Tap Trading. All rights reserved.</div>
        </div>
      </div>
    </motion.footer>
  )
}
