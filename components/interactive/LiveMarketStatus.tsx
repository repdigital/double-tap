'use client'

import React, { useEffect, useState } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface MarketData {
  isOpen: boolean
  esPrice: number
  esChange: number
}

interface LiveMarketStatusProps {
  variant?: 'horizontal' | 'vertical'
}

export function LiveMarketStatus({ variant = 'horizontal' }: LiveMarketStatusProps = {}) {
  const [marketData, setMarketData] = useState<MarketData>({
    isOpen: false,
    esPrice: 5247.50,
    esChange: 0.3
  })

  useEffect(() => {
    // Check if markets are open (NYSE hours: 9:30 AM - 4:00 PM ET, weekdays)
    const checkMarketStatus = () => {
      const now = new Date()
      const et = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }))
      const day = et.getDay()
      const hour = et.getHours()
      const minute = et.getMinutes()

      // Weekend check
      if (day === 0 || day === 6) {
        setMarketData(prev => ({ ...prev, isOpen: false }))
        return
      }

      // Market hours: 9:30 AM - 4:00 PM ET
      const marketOpen = (hour > 9 || (hour === 9 && minute >= 30)) && hour < 16

      setMarketData(prev => ({
        ...prev,
        isOpen: marketOpen,
        // Simulate slight price changes
        esPrice: prev.esPrice + (Math.random() - 0.5) * 2,
        esChange: prev.esChange + (Math.random() - 0.5) * 0.1
      }))
    }

    checkMarketStatus()
    const interval = setInterval(checkMarketStatus, 30000) // Update every 30s

    return () => clearInterval(interval)
  }, [])

  const isPositive = marketData.esChange > 0

  // Vertical variant for sidebar
  if (variant === 'vertical') {
    return (
      <div className="w-full rounded-lg border border-border bg-card p-3">
        {/* Market Status */}
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium text-muted-foreground">Markets</span>
          <div className="flex items-center gap-1.5">
            <div
              className={`h-2 w-2 rounded-full ${
                marketData.isOpen ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
              }`}
            />
            <span className={`font-mono text-xs font-semibold ${
              marketData.isOpen ? 'text-primary' : 'text-muted-foreground'
            }`}>
              {marketData.isOpen ? 'OPEN' : 'CLOSED'}
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="mb-2 h-px bg-border" />

        {/* ES Futures Price */}
        <div className="space-y-1.5 pb-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">ES Futures</span>
            <span className="font-mono text-base font-semibold text-foreground">
              {marketData.esPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-end gap-1">
            {isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-primary" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-destructive" />
            )}
            <span className={`font-mono text-sm font-semibold ${
              isPositive ? 'text-primary' : 'text-destructive'
            }`}>
              {isPositive ? '+' : ''}{marketData.esChange.toFixed(2)}%
            </span>
          </div>
        </div>
      </div>
    )
  }

  // Horizontal variant (default)
  return (
    <div className="hidden lg:flex items-center gap-4 text-sm font-mono">
      {/* Market Status */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">Markets:</span>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${
              marketData.isOpen ? 'bg-primary animate-pulse' : 'bg-muted-foreground'
            }`}
          />
          <span className={marketData.isOpen ? 'text-primary font-semibold' : 'text-muted-foreground'}>
            {marketData.isOpen ? 'OPEN' : 'CLOSED'}
          </span>
        </div>
      </div>

      {/* Separator */}
      <div className="w-px h-4 bg-border" />

      {/* ES Price */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground">ES:</span>
        <span className="text-foreground font-semibold">
          {marketData.esPrice.toFixed(2)}
        </span>
        <div className={`flex items-center gap-1 ${isPositive ? 'text-primary' : 'text-destructive'}`}>
          {isPositive ? (
            <TrendingUp className="w-3.5 h-3.5" />
          ) : (
            <TrendingDown className="w-3.5 h-3.5" />
          )}
          <span className="font-semibold">
            {isPositive ? '+' : ''}{marketData.esChange.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  )
}
