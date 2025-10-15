// components/live-trading-widget.tsx
"use client"
import { useEffect, useState } from "react"

type Position = { sym: "ES" | "NQ" | "YM" | "RTY"; dir: "LONG" | "SHORT"; vol: number; pnl: number }

const DEMO: Position[] = [
  { sym: "ES",  dir: "LONG",  vol: 2100000, pnl: 4567.25 },
  { sym: "NQ",  dir: "SHORT", vol: 1800000, pnl: -15432.8 },
  { sym: "YM",  dir: "LONG",  vol: 890000,  pnl: 34567.9 },
  { sym: "RTY", dir: "LONG",  vol: 1200000, pnl: 2134.56 },
]

export default function LiveTradingWidget() {
  const [positions, setPositions] = useState<Position[]>([])

  // No API? Just load demo data.
  useEffect(() => {
    setPositions(DEMO)
  }, [])

  return (
    <div className="rounded-2xl border border-gray-200 shadow-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Live Trading System</h3>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="text-sm text-gray-600">AI Active</span>
        </div>
      </div>

      {/* Tabs (static visuals) */}
      <div className="flex gap-4 mb-6">
        <button className="px-5 py-2 rounded-xl bg-white shadow-sm border">Positions</button>
        <button className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600">Performance</button>
        <button className="px-5 py-2 rounded-xl bg-gray-100 text-gray-600">Alerts</button>
      </div>

      {/* Positions list */}
      <ul className="space-y-3">
        {positions.map((p) => (
          <li key={p.sym} className="flex items-center justify-between rounded-2xl bg-white border p-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 grid place-items-center rounded-lg bg-indigo-100 text-indigo-700 text-sm font-bold">
                {p.sym}
              </span>
              <div>
                <div className="text-sm text-gray-500">Vol: {Intl.NumberFormat().format(p.vol)}</div>
                <div className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-md ${p.dir === "LONG" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                  {p.dir}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">${Math.abs(p.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
              <div className={`text-sm ${p.pnl >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {p.pnl >= 0 ? "+" : "-"}{Math.abs(p.pnl).toLocaleString(undefined, { maximumFractionDigits: 1 })}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

