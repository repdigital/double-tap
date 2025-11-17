'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Lock, Zap, Shield, CheckCircle } from 'lucide-react'
import { ThemeToggle } from './interactive/ThemeToggle'
import { SoundToggle } from './interactive/SoundToggle'

export const FooterSection = () => {
  const trustSignals = [
    { icon: Lock, label: 'SSL Secured', sublabel: 'Bank-grade encryption' },
    { icon: Zap, label: '94.3% Pass Rate', sublabel: 'Prop challenges' },
    { icon: Shield, label: '127 Funded', sublabel: 'Active accounts' },
    { icon: CheckCircle, label: '9 Days Avg', sublabel: 'To funding' },
  ]

  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container-wide">
        {/* Trust Signals */}
        <div className="mb-12 pb-12 border-b border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustSignals.map((signal) => {
              const Icon = signal.icon
              return (
                <div key={signal.label} className="text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="font-semibold text-foreground text-sm mb-1">
                    {signal.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {signal.sublabel}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Logo & Description */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <Link href="/">
                <Image
                  src="/double-tap-logo.png"
                  alt="Double Tap Trading"
                  width={138}
                  height={46}
                  className="h-11 w-auto"
                />
              </Link>
            </div>

            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Elite quantitative trading systems designed for consistent alpha generation through systematic precision and institutional-grade risk management.
            </p>

            {/* Earnings Disclaimer */}
            <div className="pt-6 border-t border-border space-y-3">
              <div className="font-semibold text-foreground text-sm">
                EARNINGS DISCLAIMER:
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl">
                The information provided by Double Tap Trading is for educational and informational purposes only and is not intended as a guarantee of earnings. No guarantees are made that you will achieve any specific results. Any examples or testimonials provided are not intended to represent or guarantee that anyone will achieve the same or similar results. Your use of this website and reliance on any information contained herein is solely at your own risk. Double Tap Trading disclaims any and all liability for any losses or damages of any kind that may arise from your reliance on the content presented.
              </p>
            </div>
          </div>

          {/* Right: Contact & Legal */}
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Connect
              </h4>
              <a
                href="mailto:hi@doubletaptrading.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                hi@doubletaptrading.com
              </a>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">
                Legal
              </h4>
              <div className="space-y-2">
                <Link
                  href="/terms"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
                <Link
                  href="/privacy"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Double Tap Trading. All rights reserved.
            </p>

            {/* Theme & Sound Toggles */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SoundToggle />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
