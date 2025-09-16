import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"

export default function PrivacyPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <div className="pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
            <p className="text-gray-400 text-lg">Last updated: January 2025</p>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-800">
            <div className="prose prose-invert prose-amber max-w-none text-white">
              <h2 className="text-white">1. INFORMATION WE COLLECT</h2>
              <p className="text-gray-200">
                We collect information you provide directly to us, such as when you create an account, subscribe to our
                newsletter, or contact us for support. This may include your name, email address, phone number, and any
                other information you choose to provide.
              </p>

              <h2 className="text-white">2. HOW WE USE YOUR INFORMATION</h2>
              <p className="text-gray-200">We use the information we collect to:</p>
              <ul className="text-gray-200">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, and events</li>
              </ul>

              <h2 className="text-white">3. INFORMATION SHARING</h2>
              <p className="text-gray-200">
                We do not sell or share your contact information with third parties. However, we reserve the right to
                use leads collected from one product or subsidiary under the control of Double Tap Trading for another
                product or subsidiary also under our control.
              </p>

              <h2 className="text-white">4. TRACKING TECHNOLOGIES</h2>
              <p className="text-gray-200">
                We use tracking tools, including but not limited to Facebook, Instagram, TikTok, Hyros, Google
                Analytics, and others, for data collection and to improve user experience. By using this Site, you agree
                to the use of such tracking methods.
              </p>

              <h2 className="text-white">5. DATA SECURITY</h2>
              <p className="text-gray-200">
                We take reasonable measures to help protect information about you from loss, theft, misuse, unauthorized
                access, disclosure, alteration, and destruction. However, no internet or electronic storage system is
                100% secure.
              </p>

              <h2 className="text-white">6. YOUR CHOICES</h2>
              <p className="text-gray-200">
                You may opt out of receiving promotional communications from us by following the instructions in those
                communications. If you opt out, we may still send you non-promotional communications.
              </p>

              <h2 className="text-white">7. CHANGES TO THIS POLICY</h2>
              <p className="text-gray-200">
                We may change this privacy policy from time to time. If we make changes, we will notify you by revising
                the date at the top of the policy and, in some cases, provide additional notice.
              </p>

              <h2 className="text-white">8. CONTACT US</h2>
              <p className="text-gray-200">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="bg-gray-800/50 p-4 rounded-lg">
                <p className="text-white">
                  <strong>Double Tap Trading</strong>
                </p>
                <p className="text-gray-200">Email: hi@doubletaptrading.com</p>
                <p className="text-gray-200">Address: 10340 SW 187th St, Miami FL 33157</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  )
}
