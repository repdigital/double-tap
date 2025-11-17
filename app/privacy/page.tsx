import { Navigation } from '@/components/navigation'
import { FooterSection } from '@/components/footer-section'

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        <article className="container-narrow px-6">
          {/* Header */}
          <header className="text-center mb-16">
            <h1 className="font-display font-semibold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">
              Last updated: January 2025
            </p>
          </header>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, phone number, and any other information you choose to provide.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <ul className="text-muted-foreground leading-relaxed space-y-2 ml-6">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                3. Information Sharing
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We do not sell or share your contact information with third parties. However, we reserve the right to use leads collected from one product or subsidiary under the control of Double Tap Trading for another product or subsidiary also under our control.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                4. Data Security
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                5. Your Rights
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at hi@doubletaptrading.com.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="font-display font-semibold text-foreground text-3xl mb-4">
                6. Contact Us
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us at hi@doubletaptrading.com.
              </p>
            </section>
          </div>
        </article>
      </div>

      <FooterSection />
    </main>
  )
}
