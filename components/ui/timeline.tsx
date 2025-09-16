"use client"
import React from "react"
import { cn } from "@/lib/utils"

const Timeline = React.forwardRef<HTMLOListElement, React.HTMLAttributes<HTMLOListElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <ol ref={ref} className={cn("relative border-l-2 border-gray-700 ml-3", className)} {...props}>
        {children}
      </ol>
    )
  },
)
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.LiHTMLAttributes<HTMLLIElement> & { icon?: React.ReactNode }
>(({ className, children, icon, ...props }, ref) => {
  return (
    <li ref={ref} className={cn("mb-10 ml-10", className)} {...props}>
      <span className="absolute -left-5 flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 ring-4 ring-gray-900 text-blue-400">
        {icon}
      </span>
      {children}
    </li>
  )
})
TimelineItem.displayName = "TimelineItem"

export { Timeline, TimelineItem }
