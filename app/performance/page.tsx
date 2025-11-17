import { Navigation } from '@/components/navigation'
import { FooterSection } from '@/components/footer-section'
import { Suspense, lazy } from 'react'
import { ChartSkeleton } from '@/components/charts/ChartSkeleton'
import { MagneticButton } from '@/components/interactive/MagneticButton'

// Lazy load charts
const PerformanceChart = lazy(() =>
  import('@/components/charts/PerformanceChart').then(mod => ({ default: mod.PerformanceChart }))
)
const EquityCurve = lazy(() =>
  import('@/components/charts/EquityCurve').then(mod => ({ default: mod.EquityCurve }))
)
const MonthlyHeatmap = lazy(() =>
  import('@/components/charts/MonthlyHeatmap').then(mod => ({ default: mod.MonthlyHeatmap }))
)
const DistributionChart = lazy(() =>
  import('@/components/charts/DistributionChart').then(mod => ({ default: mod.DistributionChart }))
)

export const metadata = {
  title: 'Performance Analytics',
  description: 'Comprehensive system performance metrics and analysis for Double Tap Trading algorithmic strategies.',
}

export default function PerformancePage() {
  const metrics = [
    { label: 'Total Return (YTD)', value: '+24.3%', type: 'positive' },
    { label: 'Sharpe Ratio', value: '2.8', type: 'positive' },
    { label: 'Max Drawdown', value: '-12.4%', type: 'negative' },
    { label: 'Win Rate', value: '87.3%', type: 'positive' },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-32 pb-24">
        {/* Page Header */}
        <div className="container-wide mb-16">
          <div className="text-center space-y-6">
            <h1 className="font-display font-semibold text-foreground">
              Performance Analytics
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive system performance metrics and analysis. All data represents simulated historical performance for demonstration purposes.
            </p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="container-wide mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="bg-card border border-border rounded-xl p-6 text-center"
              >
                <div
                  className={`font-mono text-4xl font-semibold mb-2 ${
                    metric.type === 'positive' ? 'text-primary' : 'text-destructive'
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Equity Curve */}
        <div className="container-wide mb-16">
          <div className="space-y-6">
            <h2 className="font-display font-semibold text-2xl text-foreground">
              Equity Curve
            </h2>
            <Suspense fallback={<ChartSkeleton height={600} showTitle={false} />}>
              <PerformanceChart
                height={600}
                showComparison={true}
                showVolume={true}
                showControls={true}
              />
            </Suspense>
          </div>
        </div>

        {/* Advanced Analysis Grid */}
        <div className="container-wide mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Algo Monthly Performance */}
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-2xl text-foreground">
                Algo Monthly Performance
              </h2>
              <Suspense fallback={<ChartSkeleton height={400} />}>
                <MonthlyHeatmap height={400} />
              </Suspense>
            </div>

            {/* Distribution */}
            <div className="space-y-6">
              <h2 className="font-display font-semibold text-2xl text-foreground">
                Return Distribution
              </h2>
              <Suspense fallback={<ChartSkeleton height={400} />}>
                <DistributionChart height={400} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="container-wide">
          <div className="bg-muted/30 rounded-2xl p-12 text-center space-y-6">
            <h3 className="font-display font-semibold text-3xl text-foreground">
              Want to see these results for yourself?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Schedule a discovery call to learn how our algorithmic systems can work for your portfolio.
            </p>
            <MagneticButton
              href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
              size="large"
            >
              Schedule Discovery Call
            </MagneticButton>
          </div>
        </div>
      </div>

      <FooterSection />
    </main>
  )
}
