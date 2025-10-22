"use client"
import { motion } from "framer-motion"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does AI-powered trading work?",
      answer:
        "Our AI systems analyze market data, news, and patterns in real-time to execute trades automatically. The AI learns from market conditions and adapts strategies without human emotion or bias, leading to more consistent execution.",
    },
    {
      question: "What's the minimum capital requirement?",
      answer:
        "We recommend a minimum of $25,000 in trading capital to effecively utilize our software licence. This allows for proper diversification and risk management across multiple positions and strategies.",
    },
    {
      question: "Is my capital safe with Double Tap Trading?",
      answer:
        "You are utilizng prop firm funds, never your own capital. We provide trading signals and automation through secure API connections to regulated prop firms.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time with 30 days notice.",
    },
    {
      question: "Do you provide training and support?",
      answer:
        "Absolutely. All plans include comprehensive onboarding, training materials, and ongoing support. Professional and Enterprise plans include regular strategy calls and dedicated support.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto font-medium" // added font-medium for medium bold weight
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Get answers to common questions about our AI trading systems
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-700 last:border-b-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-gray-800/50 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.question}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>

              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-6">
                  <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
