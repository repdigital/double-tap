'use client'

import { DoubleTapSidebar } from '@/components/double-tap-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { ManifestoHero } from '@/components/manifesto/ManifestoHero'
import { SplitJourneySimulator } from '@/components/manifesto/SplitJourneySimulator'
import { DramaticCallout } from '@/components/manifesto/DramaticCallout'
import { ChapterIntro } from '@/components/manifesto/ChapterIntro'
import { AccordionChapter } from '@/components/manifesto/AccordionChapter'
import { MagneticButton } from '@/components/interactive/MagneticButton'
import { CheckCircle2, X } from 'lucide-react'

export default function ManifestoPage() {
  return (
    <>
      <DoubleTapSidebar />
      <SidebarInset>
        <main className="min-h-screen bg-background">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden fixed top-4 left-4 z-40">
            <SidebarTrigger className="h-10 w-10" />
          </div>

      {/* 1. HERO - The Haunting Question */}
      <ManifestoHero />

      {/* 2. SPLIT SIMULATOR - The Contrast */}
      <SplitJourneySimulator />

      {/* 3. CALLOUT #1 - Money Lost */}
      <DramaticCallout
        number="$12,000"
        label="LOST"
        description="Average cost before giving up. Eight failed attempts at $300 each. Opportunity cost of 142 days. The price of repeated hope."
        color="red"
      />

      {/* 3.5 CHAPTER INTRO - The Hook */}
      <ChapterIntro />

      {/* 4. ACCORDION CHAPTERS - The Story */}
      <section className="py-20 bg-muted/10">
        <div className="container-narrow">

          {/* Chapter 01: Day One */}
          <AccordionChapter
            number="01"
            title="Day One: The Hope"
            content={
              <div className="space-y-8">
                <p className="text-xl leading-relaxed text-foreground font-medium">
                  You wire $300 to the prop firm. Your palms sweat as you open the trading platform.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  You've studied for months. Watched every YouTube video. Backtested your strategy on TradingView.
                  Joined the Discord groups. Read the books. This time will be different.
                </p>

                <div className="my-8 p-8 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                  <div className="font-mono text-sm text-muted-foreground mb-3">Initial Confidence Level</div>
                  <div className="font-mono font-bold text-primary" style={{ fontSize: '64px', lineHeight: '1' }}>
                    92%
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 italic">
                    "This strategy has a 65% win rate in backtesting. I just need to stick to the plan."
                  </p>
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  The first trade goes well. You're up $200. Your heart races. You can already feel
                  the funded account. You can see yourself quitting your job. Financial freedom is
                  just 9 days away.
                </p>

                <blockquote className="my-8 pl-6 border-l-2 border-border italic text-xl text-foreground/80">
                  "I've got this figured out. I just need to execute."
                </blockquote>

                <p className="text-lg leading-relaxed text-destructive font-semibold">
                  You don't know it yet, but you're already making the mistakes that will end this challenge.
                </p>
              </div>
            }
          />

          {/* Chapter 02: Week One */}
          <AccordionChapter
            number="02"
            title="Week One: Reality Hits"
            content={
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-foreground">
                  Day 3: You gave back yesterday's gains. Plus another $400. Your stomach churns.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  Day 5: A revenge trade. You doubled your position size to "make it back."
                  It went against you. Drawdown: 4.2%. Dangerously close to the 5% limit.
                </p>

                <div className="my-8 grid grid-cols-2 gap-6">
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <div className="font-mono text-xs text-muted-foreground mb-2">Your Drawdown</div>
                    <div className="font-mono text-3xl font-bold text-destructive">4.2%</div>
                  </div>
                  <div className="p-6 border border-border rounded-lg bg-card">
                    <div className="font-mono text-xs text-muted-foreground mb-2">Prop Limit</div>
                    <div className="font-mono text-3xl font-bold text-foreground">5.0%</div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-destructive font-semibold">
                  You're trading scared now. Every tick makes your heart pound.
                </p>
              </div>
            }
          />

          {/* Chapter 03: The First Failure */}
          <AccordionChapter
            number="03"
            title="The First Failure"
            defaultOpen={true}
            content={
              <div className="space-y-8">
                <div className="my-12 text-center py-12 bg-destructive/5 rounded-2xl border border-destructive/20">
                  <div className="font-mono font-bold text-destructive tabular-nums" style={{ fontSize: '120px', lineHeight: '1' }}>
                    5.1%
                  </div>
                  <div className="font-mono text-2xl uppercase tracking-wider text-destructive mt-6 font-semibold">
                    Challenge Failed
                  </div>
                  <div className="font-mono text-sm text-muted-foreground mt-4">
                    Maximum Drawdown Limit: 5.0%
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  One bad trade. The market gapped overnight. Your stop didn't protect you.
                  You wake up to the email: <span className="font-semibold text-destructive">"Unfortunately, you have exceeded the maximum drawdown limit."</span>
                </p>

                <div className="p-8 bg-muted/30 rounded-lg border border-border">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    Post-Mortem Analysis
                  </div>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <span className="text-foreground">Emotional decision to increase position size after early win</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <span className="text-foreground">Held losing trade hoping it would reverse</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-destructive">•</span>
                      <span className="text-foreground">Didn't account for overnight gap risk</span>
                    </li>
                  </ul>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  $300 gone. 7 days wasted. But you learned something, right?
                  Next time you'll manage risk better. Next time you won't let emotions control you.
                </p>

                <blockquote className="pl-6 border-l-2 border-destructive italic text-xl text-foreground/80">
                  "I know exactly what I did wrong. I won't make that mistake again."
                </blockquote>

                <p className="text-lg leading-relaxed text-destructive font-semibold">
                  Except you will. Because you're human. And prop firms count on that.
                </p>
              </div>
            }
          />

          {/* Chapter 04: The Grinding Loop */}
          <AccordionChapter
            number="04"
            title="The Grinding Loop"
            content={
              <div className="space-y-8">
                <p className="text-lg leading-relaxed text-foreground">
                  Attempt 2: Hit the drawdown limit on day 4. Different mistake, same result.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  Attempt 3: Made it to day 6. Got cocky. Oversized position. Failed.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  Attempt 4: Almost made it. 8 days in, 4.8% drawdown. One bad overnight move. Failed.
                </p>

                <div className="my-12 space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7].map((attempt) => (
                    <div key={attempt} className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border">
                      <X size={20} className="text-destructive flex-shrink-0" />
                      <div className="flex-1">
                        <span className="font-mono text-sm text-foreground font-semibold">Attempt #{attempt}</span>
                        <span className="text-sm text-muted-foreground ml-4">Failed</span>
                      </div>
                      <span className="font-mono text-sm text-destructive font-semibold">-$300</span>
                    </div>
                  ))}
                </div>

                <p className="text-xl leading-relaxed text-foreground font-semibold">
                  The pattern is always the same. Different trades. Different days. Same ending.
                </p>
              </div>
            }
          />

        </div>
      </section>

      {/* 5. CALLOUT #2 - Time Wasted */}
      <DramaticCallout
        number="142"
        label="DAYS WASTED"
        description="Months of grinding. Testing strategies that don't work. Emotional roller coasters. Opportunity cost that compounds. Time you'll never get back."
        color="amber"
      />

      {/* 6. MORE CHAPTERS */}
      <section className="py-20 bg-muted/10">
        <div className="container-narrow">

          {/* Chapter 05: Breaking Point */}
          <AccordionChapter
            number="05"
            title="Breaking Point"
            content={
              <div className="space-y-8">
                <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="font-mono text-5xl font-bold text-destructive tabular-nums">8</div>
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-3">
                      Failed Attempts
                    </div>
                  </div>
                  <div className="text-center p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="font-mono text-5xl font-bold text-destructive tabular-nums">$2,400</div>
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-3">
                      Challenge Fees
                    </div>
                  </div>
                  <div className="text-center p-6 bg-destructive/5 rounded-lg border border-destructive/20">
                    <div className="font-mono text-5xl font-bold text-destructive tabular-nums">142</div>
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mt-3">
                      Days Invested
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  You sit at your desk at 2 AM, spreadsheet open. Every failed attempt documented.
                  Every reason analyzed. Every "lesson learned" written down.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  The real cost isn't the $2,400 in fees. It's the $12,000 you could have made
                  in those 142 days doing literally anything else. It's the hope that dies a little more
                  each time you see "Challenge Failed."
                </p>

                <div className="my-8 p-8 bg-card border border-border rounded-lg">
                  <p className="font-mono text-sm text-muted-foreground mb-6">
                    The questions that haunt you:
                  </p>
                  <ul className="space-y-4">
                    <li className="text-lg text-foreground italic">"Am I just not good enough?"</li>
                    <li className="text-lg text-foreground italic">"Is prop trading even possible?"</li>
                    <li className="text-lg text-foreground italic">"Should I give up?"</li>
                  </ul>
                </div>

                <p className="text-xl leading-relaxed text-foreground font-semibold">
                  You're asking the wrong questions.
                </p>
              </div>
            }
          />

          {/* Chapter 06: The Asymmetry Revealed */}
          <AccordionChapter
            number="06"
            title="The Asymmetry Revealed"
            content={
              <div className="space-y-8">
                <p className="text-xl leading-relaxed text-foreground font-semibold">
                  Here's what they don't tell you: Prop firms are designed to make you fail.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  Not because they're evil. Because it's a business model. They make money from challenge fees.
                  They lose money on funded traders. The math is simple.
                </p>

                <div className="my-12 p-8 bg-muted/30 rounded-xl border border-border">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-8">
                    The Business Model
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <div className="font-mono text-sm text-muted-foreground mb-2">Revenue (Challenge Fees)</div>
                      <div className="font-mono text-4xl font-bold text-primary">$3M/month</div>
                      <p className="text-sm text-muted-foreground mt-2">10,000 attempts × $300 each</p>
                    </div>
                    <div>
                      <div className="font-mono text-sm text-muted-foreground mb-2">Cost (Funded Payouts)</div>
                      <div className="font-mono text-4xl font-bold text-destructive">$500K/month</div>
                      <p className="text-sm text-muted-foreground mt-2">1,000 funded × avg $500 payout</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-border text-center">
                    <div className="font-mono text-sm text-muted-foreground mb-2">Success Rate Needed for Profitability</div>
                    <div className="font-mono text-6xl font-bold text-foreground tabular-nums">
                      &lt;10%
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  So they set the rules to ensure that. Tight drawdown limits. Aggressive profit targets.
                  Time pressure. Consistency requirements. All designed to trigger emotional mistakes.
                </p>

                <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-lg p-6 text-xl italic text-foreground">
                  "The game isn't unwinnable. It's just optimized for human failure."
                </blockquote>

                <p className="text-lg leading-relaxed text-primary font-semibold">
                  Unless you remove the human.
                </p>
              </div>
            }
          />

          {/* Chapter 07: Systematic Precision */}
          <AccordionChapter
            number="07"
            title="Systematic Precision"
            content={
              <div className="space-y-8">
                <p className="text-xl leading-relaxed text-foreground font-semibold">
                  Algorithms don't feel fear. They don't revenge trade. They don't hope a losing position will reverse.
                </p>

                <p className="text-lg leading-relaxed text-foreground">
                  Double Tap's DoD-trained quants built a system that exploits the asymmetry.
                  Not by being smarter. By being inhuman.
                </p>

                <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-muted/20 rounded-lg border border-border">
                    <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                      Manual Trader
                    </div>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex gap-2"><X size={16} className="text-destructive flex-shrink-0 mt-0.5" /> Emotional decisions</li>
                      <li className="flex gap-2"><X size={16} className="text-destructive flex-shrink-0 mt-0.5" /> Inconsistent execution</li>
                      <li className="flex gap-2"><X size={16} className="text-destructive flex-shrink-0 mt-0.5" /> Sleep deprivation</li>
                      <li className="flex gap-2"><X size={16} className="text-destructive flex-shrink-0 mt-0.5" /> Revenge trading</li>
                    </ul>
                  </div>

                  <div className="p-6 bg-primary/5 rounded-lg border border-primary/20">
                    <div className="font-mono text-xs uppercase tracking-wider text-primary mb-4">
                      Double Tap System
                    </div>
                    <ul className="space-y-3 text-sm text-foreground">
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" /> Zero emotions</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" /> Perfect consistency</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" /> 24/7 monitoring</li>
                      <li className="flex gap-2"><CheckCircle2 size={16} className="text-primary flex-shrink-0 mt-0.5" /> Systematic risk control</li>
                    </ul>
                  </div>
                </div>

                <div className="my-8 p-8 bg-card border border-border rounded-xl">
                  <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-4">
                    The Results
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="font-mono text-4xl font-bold text-primary tabular-nums">94.3%</div>
                      <div className="font-mono text-xs text-muted-foreground mt-2">Pass Rate</div>
                    </div>
                    <div>
                      <div className="font-mono text-4xl font-bold text-primary tabular-nums">9</div>
                      <div className="font-mono text-xs text-muted-foreground mt-2">Avg Days to Funded</div>
                    </div>
                    <div>
                      <div className="font-mono text-4xl font-bold text-primary tabular-nums">3.2%</div>
                      <div className="font-mono text-xs text-muted-foreground mt-2">Max Drawdown</div>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  Not because our algorithms are magic. Because they can't make emotional mistakes.
                  They execute the same way every single time. In a game designed to exploit human weakness,
                  being inhuman is the edge.
                </p>
              </div>
            }
          />

          {/* Chapter 08: Your Path Forward */}
          <AccordionChapter
            number="08"
            title="Your Path Forward"
            content={
              <div className="space-y-8">
                <p className="text-xl leading-relaxed text-foreground font-semibold">
                  You have two choices.
                </p>

                <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="p-8 bg-muted/20 rounded-xl border-2 border-border">
                    <div className="font-display text-2xl font-semibold mb-4 text-foreground">Keep Trying</div>
                    <ul className="space-y-3 text-base text-muted-foreground">
                      <li>• Another $300 entry fee</li>
                      <li>• Another 7-14 days grinding</li>
                      <li>• Another emotional roller coaster</li>
                      <li>• Another likely failure</li>
                      <li>• Same 90% fail rate</li>
                    </ul>
                  </div>

                  <div className="p-8 bg-primary/5 rounded-xl border-2 border-primary">
                    <div className="font-display text-2xl font-semibold mb-4 text-primary">Use The System</div>
                    <ul className="space-y-3 text-base text-foreground">
                      <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" /> 94.3% pass rate</li>
                      <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" /> 9 days average to funded</li>
                      <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" /> 3.2% max drawdown</li>
                      <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" /> Zero emotional decisions</li>
                      <li className="flex gap-2"><CheckCircle2 size={18} className="text-primary flex-shrink-0 mt-0.5" /> 127 funded accounts</li>
                    </ul>
                  </div>
                </div>

                <p className="text-lg leading-relaxed text-foreground">
                  The choice seems obvious when you see it laid out. But making it requires accepting one truth:
                </p>

                <blockquote className="my-8 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-lg p-8 text-2xl italic text-foreground font-semibold">
                  "You can't beat the prop firms by being better at what they designed you to fail at. You beat them by changing the game."
                </blockquote>
              </div>
            }
          />

        </div>
      </section>

      {/* 7. CALLOUT #3 - The Almost */}
      <DramaticCallout
        number="3.2%"
        label="OVER LIMIT"
        description="The heartbreak number. You were so close. Just slightly over the 5% drawdown limit. One bad overnight gap. Challenge failed. The almost-made-it that haunts you."
        color="red"
      />

      {/* 8. FINAL CTA - The Exit */}
      <section className="py-32 md:py-48 bg-background text-center border-t border-border">
        <div className="container-wide max-w-[900px]">
          <h2
            className="font-display font-bold text-foreground mb-4"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              letterSpacing: '-0.03em',
              lineHeight: '1'
            }}
          >
            Break The Cycle.
          </h2>

          <p className="text-xl text-muted-foreground mb-12 max-w-[600px] mx-auto">
            Join 127 funded traders who stopped relying on discipline and started using systems.
          </p>

          <MagneticButton
            href="/waitlist"
            size="xl"
          >
            Get On The Waitlist
          </MagneticButton>

          <p className="font-mono text-xs text-muted-foreground mt-8 uppercase tracking-wider">
            Limited Availability • Serious Traders Only
          </p>
        </div>
      </section>

        </main>
      </SidebarInset>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  )
}
