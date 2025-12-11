'use client'

import { DoubleTapSidebar } from '@/components/double-tap-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { MasteryHero } from '@/components/mastery/MasteryHero'
import { SystematicSplitSimulator } from '@/components/mastery/SystematicSplitSimulator'
import { MasteryCallout } from '@/components/mastery/MasteryCallout'
import { ChapterIntro } from '@/components/mastery/ChapterIntro'
import { TransformationChapter } from '@/components/mastery/TransformationChapter'
import { OperatorCTA } from '@/components/mastery/OperatorCTA'

export default function MasteryPage() {
  return (
    <>
      <DoubleTapSidebar />
      <SidebarInset>
        {/* Mobile Sidebar Trigger */}
        <div className="lg:hidden fixed top-4 left-4 z-40">
          <SidebarTrigger className="h-10 w-10" />
        </div>

        {/* Main Content */}
        <main className="bg-black min-h-screen">
          {/* Hero */}
          <MasteryHero />

          {/* Split Simulator */}
          <SystematicSplitSimulator />

          {/* Callout #1 - Hours Wasted */}
          <MasteryCallout
            number="2,920 HOURS"
            description="Wasted on mechanical execution that algorithms do in milliseconds"
            subtext="That's 365 eight-hour days. Over a full year of your life."
          />

          {/* Chapter Introduction */}
          <ChapterIntro />

          {/* Transformation Chapters */}
          <section className="py-24 bg-black">
            <div className="container-wide max-w-5xl">
              <div className="space-y-4">
                <TransformationChapter
                  number="01"
                  title="Your First Funded Account"
                  content={`The validation hit different.

After months of practice, discipline, strategy refinement—you did it. Funded. Real money. Real trades.

Your first $10K month felt like vindication. 68% win rate. Consistent profitability. You weren't lucky. You were skilled.

The prop firm's $100K was yours to manage. You'd proven you could trade.

But something gnawed at you: What if this is just the beginning?`}
                  stats={[
                    { label: 'Win Rate', value: '68%' },
                    { label: 'Best Month', value: '$10,142' },
                    { label: 'Max Drawdown', value: '4.2%' },
                    { label: 'Status', value: 'FUNDED ✓' }
                  ]}
                />

                <TransformationChapter
                  number="02"
                  title="The $10K Month"
                  content={`Everything clicked.

Your strategy, your discipline, your execution—all aligned. The market gave, and you took.

The best setup of the year came at 2:47pm on a Tuesday. ES moving exactly as predicted. You scaled in perfectly.

Result: $2,400. Single trade. Textbook execution.

You remember thinking: 'If I could just capture setups like this every time they appear...'

You didn't know how prophetic that thought would become.`}
                />

                <TransformationChapter
                  number="03"
                  title="The Replication Problem"
                  defaultOpen={true}
                  content={`It was 3:14am when it happened.

The same pattern. The EXACT same setup from that Tuesday. ES, identical technical structure, same momentum profile.

Your algorithm caught it.

On 10 accounts.

$2,400 × 10 = $24,000.

You were asleep.

This is the problem profitable traders face: Your edge works. Your execution works. But you're still bound by biology.

You can only be in one place. You need sleep. You can't watch 10 accounts simultaneously while maintaining decision quality.

Your best trade? You'll only catch it once.

Unless you systematize.`}
                  highlightStats={[
                    { label: 'Setup Time', value: '03:14 AM' },
                    { label: 'Your P&L', value: '$0', color: 'muted' },
                    { label: 'Algorithm P&L', value: '$24,000', color: 'gold' },
                    { label: 'Opportunity Cost', value: '$24,000', color: 'gold' }
                  ]}
                />

                <TransformationChapter
                  number="04"
                  title="The Grind Never Stops"
                  content={`Calculate the hours:

Market open to close: 8 hours
Pre-market preparation: 1 hour
Post-market analysis: 1 hour
252 trading days per year

Total: 2,920 hours/year

That's 365 eight-hour days. An entire year of your life spent watching screens, clicking buttons, monitoring positions.

For ONE account.

Try to scale to 3 accounts? Decision quality degrades. You miss entries. You hold losers too long. You exit winners too early. You revenge trade after a loss because you're tired.

The human brain isn't designed for parallel systematic execution across multiple accounts.

But algorithms are.

Your edge is proven. Your limitation isn't skill.

It's biology.`}
                />

                <TransformationChapter
                  number="05"
                  title="The Vision: 10 Accounts"
                  content={`Imagine this:

Your exact strategy. Your proven edge. Your risk parameters. Your entry rules. Your profit targets. Your stop discipline.

Executing perfectly on 10 funded accounts. Simultaneously. 24/7.

Missing zero setups. No sleep required. No decision fatigue. No emotional degradation at 2pm when you're tired. No revenge trading. No hope. No fear.

Just your proven edge, replicated with machine precision.

Same 68% win rate. Same risk management. Same strategy that already works.

Just... everywhere. All at once. Forever.

The math is simple:
$50,000/year per account × 10 accounts = $500,000/year

Same you. Same edge. Systematized. Multiplied. Scaled.`}
                />

                <TransformationChapter
                  number="06"
                  title="Systematic Multiplication"
                  content={`Here's what changes:

The algorithm doesn't replicate random trading. It replicates YOUR BEST decisions.

Your A+ setups → Identified by pattern recognition
Your risk management → Encoded into execution rules
Your profit targets → Systematically enforced without emotion
Your stop discipline → No emotional override possible

The algorithm doesn't get tired at 2pm.
It doesn't revenge trade after a loss.
It doesn't skip the 3am setup because you're human.
It doesn't hold a loser hoping it comes back.
It doesn't cut a winner early out of fear.

94.3% challenge pass rate.
3.2% maximum drawdown.
9 days average to funded.
127 funded accounts (and growing).

This is your edge, executed with DoD-trained precision, across as many accounts as prop firms will approve.

This is multiplication, not addition.
This is scaling, not grinding.
This is systematic, not emotional.`}
                  stats={[
                    { label: 'Pass Rate', value: '94.3%' },
                    { label: 'Max Drawdown', value: '3.2%' },
                    { label: 'Avg to Funded', value: '9 days' },
                    { label: 'Emotional Decisions', value: '0' }
                  ]}
                />

                <TransformationChapter
                  number="07"
                  title="Operator Status"
                  content={`You're no longer a trader.

You're a trading operator.

Your day:
• 09:00 AM - Review overnight performance ($4,200 captured while you slept)
• 09:30 AM - Adjust risk parameters if needed (5 minutes)
• 10:00 AM - Gym, breakfast, family time, life
• 14:00 PM - Check mid-day dashboard (all accounts green)
• 16:00 PM - Review daily summary
• Rest of day - Yours

Your algorithm:
• 24/7 monitoring across all funded accounts
• Instant execution on your proven setups
• Perfect discipline, zero emotional decisions
• Scales infinitely without quality degradation
• Captures opportunities you'd sleep through
• Never fatigues, never fears, never hopes

You've built a trading business, not a trading job.

You supervise. The system executes.
You set parameters. The algorithm performs.
You scale accounts. The returns multiply.

This is what mastery looks like.`}
                />
              </div>
            </div>
          </section>

          {/* Callout #2 - Money Lost */}
          <MasteryCallout
            number="$450,000/YEAR"
            description="Left on the table by limiting yourself to manual execution"
            subtext="Nine accounts you could fund. All running your proven strategy. Right now."
          />

          {/* Callout #3 - Multiplication */}
          <MasteryCallout
            number="10×"
            description="Your proven edge, multiplied across funded accounts"
            subtext="Same strategy. Same risk. Ten times the capture rate."
          />

          {/* Final CTA */}
          <OperatorCTA />
        </main>
      </SidebarInset>
      <MobileBottomNav />
    </>
  )
}
