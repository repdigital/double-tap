import Image from "next/image"

export default function FounderSection() {
  return (
    <section className="py-24" style={{ backgroundColor: "#002914" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl border-8 border-white">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZTq2c84zmCuc5NdieuKVSGUQsiu6o5.png"
                alt="Michael Gonzalez, Founder of Double Tap Trading"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-17">
              <div className="inline-block">
                <span className="bg-gray-900 text-white px-9 py-3 text-lg font-medium tracking-wider uppercase rounded-lg">
                  Meet Our Founder
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">Michael Gonzalez</h2>
            </div>

            <div className="space-y-6 text-lg text-gray-200 leading-relaxed">
              <p>
                Michael Gonzalez is a visionary entrepreneur and strategic architect who transformed the wellness
                industry by founding Fit Tea—scaling it from a $10,000 startup to a $100+ million empire. His
                revolutionary approach to digital marketing and brand development didn't just disrupt markets; it
                redefined the blueprint for modern consumer engagement and exponential growth.
              </p>

              <p>
                After orchestrating his successful exit from Fit Tea, Gonzalez channeled his entrepreneurial mastery
                into the financial technology frontier. Leveraging decades of expertise in systematic growth,
                automation, and market disruption, he launched Double Tap Trading to democratize elite-level wealth
                generation through intelligent systems, cutting-edge automation, and precision-engineered trading
                strategies that deliver consistent results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
