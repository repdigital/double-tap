import { Navigation } from "@/components/navigation"
import { RevolutionaryHero } from "@/components/revolutionary-hero"
import FoundationSection from "@/components/foundation-section"
import FounderSection from "@/components/founder-section"
import TimelineSection from "@/components/timeline-section"
import FaqSection from "@/components/faq-section"
import CtaSection from "@/components/cta-section"
import { FooterSection } from "@/components/footer-section"

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <section id="hero">
        <RevolutionaryHero />
      </section>
      <section id="foundation">
        <FoundationSection />
      </section>
      <section id="timeline">
        <TimelineSection />
      </section>
      <section id="founder">
        <FounderSection />
      </section>
      <section id="faq">
        <FaqSection />
      </section>
      <section id="cta">
        <CtaSection />
      </section>
      <FooterSection />
    </main>
  )
}
