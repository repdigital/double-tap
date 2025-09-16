import { Navigation } from "@/components/navigation"
import { FooterSection } from "@/components/footer-section"

export default function TermsPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <Navigation />
      <div className="pt-24 pb-16 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
            <p className="text-gray-400 text-lg">Last updated: January 2025</p>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-gray-800">
            <div className="prose prose-invert prose-amber max-w-none text-white">
              <h2 className="text-white">1. AGREEMENT TO TERMS</h2>
              <p className="text-gray-200">
                These Terms of Use constitute a legally binding agreement made between you, whether personally or on
                behalf of an entity ("you") and Double Tap Trading ("Company," "we," "us," or "our"), concerning your
                access to and use of the doubletaptrading.com website, as well as any other media form, media channel,
                mobile website, or mobile application related, linked, or otherwise connected thereto (collectively, the
                "Site"). You agree that by accessing the Site, you have read, understood, and agreed to be bound by all
                of these Terms of Use. IF YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE EXPRESSLY
                PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE USE IMMEDIATELY.
              </p>
              <p className="text-gray-200">
                Supplemental terms and conditions or documents that may be posted on the Site from time to time are
                hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make
                changes or modifications to these Terms of Use from time to time. We will alert you about any changes by
                updating the "Last updated" date of these Terms of Use, and you waive any right to receive specific
                notice of each such change.
              </p>

              <h2 className="text-white">2. INTELLECTUAL PROPERTY RIGHTS</h2>
              <p className="text-gray-200">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases,
                functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
                (collectively, the "Content") and the trademarks, service marks, and logos contained therein (the
                "Marks") are owned or controlled by us or licensed to us, and are protected by copyright and trademark
                laws and various other intellectual property rights and unfair competition laws of the United States,
                international copyright laws, and international conventions.
              </p>

              <h2 className="text-white">3. USER REPRESENTATIONS</h2>
              <p className="text-gray-200">By using the Site, you represent and warrant that:</p>
              <ul className="text-gray-200">
                <li>you have the legal capacity and you agree to comply with these Terms of Use;</li>
                <li>you are not a minor in the jurisdiction in which you reside;</li>
                <li>
                  you will not access the Site through automated or non-human means, whether through a bot, script, or
                  otherwise;
                </li>
                <li>you will not use the Site for any illegal or unauthorized purpose; and</li>
                <li>your use of the Site will not violate any applicable law or regulation.</li>
              </ul>

              <h2 className="text-white">4. PROHIBITED ACTIVITIES</h2>
              <p className="text-gray-200">
                You may not access or use the Site for any purpose other than that for which we make the Site available.
                The Site may not be used in connection with any commercial endeavors except those that are specifically
                endorsed or approved by us.
              </p>

              <h2 className="text-white">5. PRIVACY POLICY</h2>
              <p className="text-gray-200">
                We do not sell or share contact information with third parties. However, we reserve the right to use
                leads collected from one product or subsidiary under the control of Double Tap Trading for another
                product or subsidiary also under our control.
              </p>

              <h2 className="text-white">6. GOVERNING LAW</h2>
              <p className="text-gray-200">
                These Terms shall be governed by and construed in accordance with the laws of the State of Florida.
                Double Tap Trading and you agree to submit to the exclusive jurisdiction of the courts located in
                Florida to resolve any disputes relating to these Terms.
              </p>

              <h2 className="text-white">7. DISCLAIMER</h2>
              <p className="text-gray-200">
                The Site is provided on an "as-is" and "as-available" basis. Your use of the Site is at your sole risk.
                To the fullest extent permitted by law, we disclaim all warranties, express or implied, including but
                not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.
              </p>

              <h2 className="text-white">8. CONTACT US</h2>
              <p className="text-gray-200">
                To resolve a complaint or receive more information about the Site, please contact us at:
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
