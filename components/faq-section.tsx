'use client'

import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { ChevronDown } from 'lucide-react'

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const faqs = [
    {
      question: 'How does AI-powered trading work?',
      answer: 'Our AI systems analyze market data, news, and patterns in real-time to execute trades automatically. The AI learns from market conditions and adapts strategies without human emotion or bias, leading to more consistent execution.'
    },
    {
      question: "What's the minimum capital requirement?",
      answer: 'We recommend a minimum of $25,000 in trading capital to effectively utilize our software license. This allows for proper diversification and risk management across multiple positions and strategies.'
    },
    {
      question: 'Is my capital safe with Double Tap Trading?',
      answer: 'You are utilizing prop firm funds, never your own capital. We provide trading signals and automation through secure API connections to regulated prop firms.'
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer: 'Yes, you can cancel your subscription at any time with 30 days notice.'
    },
    {
      question: 'Do you provide training and support?',
      answer: 'Absolutely. All plans include comprehensive onboarding, training materials, and ongoing support. Professional and Enterprise plans include regular strategy calls and dedicated support.'
    }
  ]

  return (
    <section id="faq" className="py-32 md:py-48 bg-muted/30">
      <div ref={ref} className="container-wide">
        {/* Section Header */}
        <motion.div
          className="mb-24"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display font-semibold text-foreground text-7xl mb-4">
            Common Questions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Answers to frequently asked questions about our systems
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-card border-l-4 border-l-transparent hover:border-l-primary transition-all duration-300"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
            >
              <button
                className="w-full px-12 py-8 text-left flex justify-between items-start gap-6 hover:bg-muted/30 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-semibold text-foreground text-xl flex-1">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-12 pb-8 text-muted-foreground leading-relaxed text-lg">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
