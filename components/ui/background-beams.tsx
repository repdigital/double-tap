"use client"
import { cn } from "@/lib/utils"

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute h-full w-full inset-0 [mask-image:radial-gradient(900px_at_center,white,transparent)] pointer-events-none",
        className,
      )}
    >
      <svg
        className="absolute inset-0 h-full w-full opacity-20"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g opacity="0.5">
          <path
            d="M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875"
            stroke="url(#linearGradient-1)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          <path
            d="M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867"
            stroke="url(#linearGradient-2)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          <path
            d="M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859"
            stroke="url(#linearGradient-3)"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
        </g>
        <defs>
          <linearGradient id="linearGradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#18CCFC" stopOpacity="0"></stop>
            <stop stopColor="#18CCFC" stopOpacity="0.05"></stop>
            <stop offset="32.5%" stopColor="#6344F5" stopOpacity="0.08"></stop>
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0.1"></stop>
          </linearGradient>
          <linearGradient id="linearGradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#18CCFC" stopOpacity="0"></stop>
            <stop stopColor="#18CCFC" stopOpacity="0.05"></stop>
            <stop offset="32.5%" stopColor="#6344F5" stopOpacity="0.08"></stop>
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0.1"></stop>
          </linearGradient>
          <linearGradient id="linearGradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop stopColor="#18CCFC" stopOpacity="0"></stop>
            <stop stopColor="#18CCFC" stopOpacity="0.05"></stop>
            <stop offset="32.5%" stopColor="#6344F5" stopOpacity="0.08"></stop>
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0.1"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}
