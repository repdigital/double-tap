// Double Tap Trading - Home Page with Luxury Sidebar
import { DoubleTapSidebar } from "@/components/double-tap-sidebar"
import { MobileBottomNav } from "@/components/mobile-bottom-nav"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { RevolutionaryHero } from "@/components/revolutionary-hero"
import FoundationSection from "@/components/foundation-section"
import TimelineSection from "@/components/timeline-section"
import RiskSection from "@/components/risk-section"
import FounderSection from "@/components/founder-section"
import FaqSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"
import { FloatingCTA } from "@/components/interactive/FloatingCTA"
import { ExitIntent } from "@/components/interactive/ExitIntent"

export default function HomePage() {
  return (
    <>
      <DoubleTapSidebar />
      <SidebarInset>
        <main className="min-h-screen w-full">
          {/* Mobile Sidebar Trigger */}
          <div className="lg:hidden fixed top-4 left-4 z-40">
            <SidebarTrigger className="h-10 w-10" />
          </div>

          <RevolutionaryHero />
          <FoundationSection />
          <TimelineSection />
          <RiskSection />
          <FounderSection />
          <FaqSection />
          <CtaSection />
          <FooterSection />

          {/* Conversion Optimization Components */}
          <FloatingCTA />
          <ExitIntent />
        </main>
      </SidebarInset>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </>
  )
}
