import { Navigation } from '@/components/navigation'
import { FooterSection } from '@/components/footer-section'

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <article className="container-narrow px-6">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="font-display font-semibold text-foreground mb-4">
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2025
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and Double Tap Trading ("Company," "we," "us," or "our"), concerning your access to and use of the doubletaptrading.com website, as well as any other media form, media channel, mobile website, or mobile application related, linked, or otherwise connected thereto (collectively, the "Site").
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You agree that by accessing the Site, you have read, understood, and agreed to be bound by all of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                2. Intellectual Property Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the "Marks") are owned or controlled by us or licensed to us.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                3. User Representations
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Use; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means; (4) you will not use the Site for any illegal or unauthorized purpose; and (5) your use of the Site will not violate any applicable law or regulation.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                4. Prohibited Activities
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You may not access or use the Site for any purpose other than that for which we make the Site available. The Site may not be used in connection with any commercial endeavors except those that are specifically endorsed or approved by us.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                5. Disclaimer
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                THE SITE IS PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SITE AND OUR SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SITE AND YOUR USE THEREOF.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SITE.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                7. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about these Terms of Service, please contact us at hi@doubletaptrading.com.
              </p>
            </section>
          </div>
        </article>
      </div>

      <FooterSection />
    </main>
  )
}
