// Interactive Trading Widget
// Stack: Next.js App Router, React, Tailwind, shadcn/ui Tabs + Card
// Drop-in usage: <LiveTradingWidget />

// =============================
// app/components/LiveTradingWidget.tsx
// =============================
"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

// Types for data coming from the API
export type Position = {
  symbol: string
  volume: string
  side: "LONG" | "SHORT"
  pnl: number
  delta: number
}

export type PerformancePoint = {
  ts: string // ISO timestamp
  value: number // equity or PnL
}

export type Alert = {
  id: string
  ts: string
  message: string
  severity: "info" | "warning" | "critical"
}

export type WidgetPayload = {
  positions: Position[]
  performance: PerformancePoint[]
  alerts: Alert[]
}

function Pnl({ value }: { value: number }) {
  const sign = value >= 0 ? "+" : ""
  return (
    <span className={value >= 0 ? "text-emerald-600" : "text-red-600"}>
      {sign}
      {value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </span>
  )
}

export default function LiveTradingWidget() {
  const [data, setData] = React.useState<WidgetPayload | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let mounted = true
    const fetchData = async () => {
      try {
        const res = await fetch("/api/trading/widget", { cache: "no-store" })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const json: WidgetPayload = await res.json()
        if (mounted) setData(json)
      } catch (e: any) {
        if (mounted) setError(e.message || "Failed to load")
      } finally {
        if (mounted) setLoading(false)
      }
    }

    fetchData()
    const id = setInterval(fetchData, 10_000) // refresh every 10s
    return () => {
      mounted = false
      clearInterval(id)
    }
  }, [])

  return (
    <Card className="w-full max-w-xl rounded-2xl shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">Live Trading System</CardTitle>
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          <span>AI Active</span>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="positions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="positions" className="mt-4">
            {loading && (
              <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading positions
              </div>
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {!loading && data && (
              <ul className="divide-y">
                {data.positions.map((p) => (
                  <li key={p.symbol} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold uppercase tracking-wide text-slate-700">{p.symbol}</span>
                      <span className="text-xs text-muted-foreground">Vol: {p.volume}</span>
                      <Badge variant={p.side === "LONG" ? "secondary" : "destructive"}>{p.side}</Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium"><Pnl value={p.pnl} /></div>
                      <div className="text-xs text-muted-foreground">{p.delta >= 0 ? "+" : ""}{p.delta.toFixed(1)}</div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>

          <TabsContent value="performance" className="mt-4">
            {loading && (
              <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading performance
              </div>
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {!loading && data && <PerformanceChart points={data.performance} />}
          </TabsContent>

          <TabsContent value="alerts" className="mt-4">
            {loading && (
              <div className="flex items-center justify-center py-10 text-sm text-muted-foreground">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading alerts
              </div>
            )}
            {error && <div className="text-red-600 text-sm">{error}</div>}
            {!loading && data && (
              <ul className="space-y-3">
                {data.alerts.map((a) => (
                  <li key={a.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={a.severity === "critical" ? "destructive" : a.severity === "warning" ? "secondary" : "outline"}>
                        {a.severity}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{new Date(a.ts).toLocaleTimeString()}</span>
                    </div>
                    <p className="mt-2 text-sm">{a.message}</p>
                  </li>
                ))}
              </ul>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

// Tiny inline chart without external libs
function PerformanceChart({ points }: { points: PerformancePoint[] }) {
  if (!points.length) return <div className="text-sm text-muted-foreground">No data</div>

  // Build a simple SVG sparkline
  const w = 520
  const h = 140
  const pad = 12
  const xs = points.map((_, i) => i)
  const ys = points.map((p) => p.value)
  const minY = Math.min(...ys)
  const maxY = Math.max(...ys)
  const dx = (w - pad * 2) / Math.max(1, xs.length - 1)
  const scaleY = (v: number) => {
    if (maxY === minY) return h / 2
    return h - pad - ((v - minY) / (maxY - minY)) * (h - pad * 2)
  }
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${pad + i * dx},${scaleY(p.value)}`)
    .join(" ")

  const last = points[points.length - 1]

  return (
    <div className="w-full overflow-hidden rounded-lg border">
      <svg width={w} height={h} className="block w-full">
        <rect x={0} y={0} width={w} height={h} fill="white" />
        <path d={d} fill="none" stroke="currentColor" strokeWidth={2} />
        <circle cx={pad + (points.length - 1) * dx} cy={scaleY(last.value)} r={3} />
      </svg>
      <div className="flex items-center justify-between px-3 py-2 text-xs text-muted-foreground">
        <span>{new Date(points[0].ts).toLocaleDateString()} → {new Date(last.ts).toLocaleDateString()}</span>
        <span>Last: {last.value.toLocaleString()}</span>
      </div>
    </div>
  )
}

// =============================
// app/api/trading/widget/route.ts
// =============================
// Example API handler returning mock data. Replace with your real feed.

import { NextResponse } from "next/server"

export async function GET() {
  // Generate deterministic mock data so the component works out of the box
  const now = new Date()
  const mkTs = (minsAgo: number) => new Date(now.getTime() - minsAgo * 60_000).toISOString()

  const payload: WidgetPayload = {
    positions: [
      { symbol: "ES", volume: "2.1M", side: "LONG", pnl: 4567.25, delta: 23.75 },
      { symbol: "NQ", volume: "1.8M", side: "SHORT", pnl: -15432.8, delta: -45.2 },
      { symbol: "YM", volume: "890K", side: "LONG", pnl: 34567.9, delta: 156.3 },
      { symbol: "RTY", volume: "1.2M", side: "LONG", pnl: 2134.56, delta: 12.45 },
    ],
    performance: Array.from({ length: 30 }, (_, i) => ({
      ts: mkTs((30 - i) * 10),
      value: 100_000 + Math.round(Math.sin(i / 3) * 5_000) + i * 250,
    })),
    alerts: [
      { id: "a1", ts: mkTs(5), message: "ES trailing stop tightened", severity: "info" },
      { id: "a2", ts: mkTs(18), message: "NQ drawdown exceeded 2% intraday", severity: "warning" },
      { id: "a3", ts: mkTs(55), message: "Connectivity issue resolved: feed A", severity: "critical" },
    ],
  }

  return NextResponse.json(payload)
}

// =============================
// Usage example
// =============================
// Import and place the widget anywhere in your homepage hero right column.
//
// import LiveTradingWidget from "@/app/components/LiveTradingWidget"
//
// export default function Home() {
//   return (
//     <main className="...">
//       <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//         <div>{/* left hero copy */}</div>
//         <div className="flex justify-center lg:justify-end">
//           <LiveTradingWidget />
//         </div>
//       </section>
//     </main>
//   )
// }

// Notes
// 1. Replace the mock API with your real data source or proxy your provider here.
// 2. For authenticated data, gate the API route with your auth solution and forward a JWT.
// 3. If you already use shadcn/ui, Tabs/Card/Badge come from it. If not, run `npx shadcn@latest add tabs card badge`.
// 4. All styling is Tailwind and should match your existing design system with minimal tweaks.
