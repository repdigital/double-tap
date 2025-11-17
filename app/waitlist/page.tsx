'use client'

import { WaitlistHero } from '@/components/waitlist/WaitlistHero'
import { LiveCounter } from '@/components/waitlist/LiveCounter'
import { CallExpectations } from '@/components/waitlist/CallExpectations'
import { QualificationNote } from '@/components/waitlist/QualificationNote'
import { SocialProofTicker } from '@/components/waitlist/SocialProofTicker'
import { BookingEmbed } from '@/components/waitlist/BookingEmbed'
import { DoubleTapSidebar } from '@/components/double-tap-sidebar'
import { MobileBottomNav } from '@/components/mobile-bottom-nav'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default function WaitlistPage() {
  return (
    <>
      <DoubleTapSidebar />
      <SidebarInset>
        <main className="min-h-screen bg-background py-16 md:py-24">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden fixed top-4 left-4 z-40">
            <SidebarTrigger className="h-10 w-10" />
          </div>

          <div className="container-wide max-w-[1400px]">

            {/* Hero Section */}
            <WaitlistHero />

            {/* Split Layout: Content + Booking */}
            <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-start">

              {/* LEFT COLUMN: Supporting Content */}
              <div className="space-y-10">

                {/* Live Counters Row */}
                <div className="flex flex-col sm:flex-row gap-8 sm:gap-12">
                  <LiveCounter
                    value={127}
                    label="Funded Accounts"
                    sublabel="Active traders"
                    animateOnMount={true}
                    liveUpdates={true}
                  />
                  <LiveCounter
                    value={94}
                    label="Success Rate"
                    sublabel="Challenge pass %"
                    animateOnMount={true}
                    liveUpdates={false}
                  />
                </div>

                {/* Social Proof Live Ticker */}
                <SocialProofTicker />

                {/* Divider */}
                <div className="h-px bg-border w-full" />

                {/* What to Expect */}
                <CallExpectations />

                {/* Qualification */}
                <QualificationNote />

              </div>

              {/* RIGHT COLUMN: Booking Embed (Sticky) */}
              <div className="lg:sticky lg:top-24">
                <BookingEmbed />
              </div>

            </div>
          </div>
        </main>
      </SidebarInset>

      {/* Mobile Bottom Nav */}
      <MobileBottomNav />
    </>
  )
}
