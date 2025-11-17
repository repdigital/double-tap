'use client'

import React from 'react'

interface ChartSkeletonProps {
  height?: number
  showTitle?: boolean
}

export function ChartSkeleton({ height = 400, showTitle = false }: ChartSkeletonProps) {
  return (
    <div className="w-full" style={{ height: `${height}px` }}>
      {showTitle && (
        <div className="mb-4">
          <div className="h-6 w-32 skeleton rounded-md" />
        </div>
      )}
      <div className="chart-container relative overflow-hidden">
        {/* Chart area skeleton */}
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          {/* Y-axis labels */}
          <div className="flex justify-between">
            <div className="flex flex-col justify-between h-full">
              <div className="h-3 w-12 skeleton rounded" />
              <div className="h-3 w-12 skeleton rounded" />
              <div className="h-3 w-12 skeleton rounded" />
              <div className="h-3 w-12 skeleton rounded" />
              <div className="h-3 w-12 skeleton rounded" />
            </div>

            {/* Chart lines skeleton */}
            <div className="flex-1 flex flex-col justify-between ml-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-px w-full bg-border" />
              ))}
            </div>
          </div>
        </div>

        {/* Animated shimmer overlay */}
        <div className="absolute inset-0 opacity-50">
          <div className="h-full w-full skeleton" />
        </div>

        {/* X-axis labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-16 pb-2">
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
          <div className="h-3 w-16 skeleton rounded" />
        </div>
      </div>
    </div>
  )
}
