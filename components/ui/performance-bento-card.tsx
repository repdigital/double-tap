"use client"

export default function PerformanceBentoCard() {
  // Example bar heights (percentages)
  const bars = [38, 42, 55, 47, 60, 52, 66, 58, 72, 64, 70, 88]

  return (
    <div className="relative flex h-full w-full overflow-hidden rounded-xl">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 to-neutral-900" />

      {/* centered content */}
      <div className="relative z-20 flex flex-col items-center justify-center w-full h-full pb-32 gap-4">
        {/* icon */}
        <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-xl bg-[#002914]">
          <svg
            viewBox="0 0 24 24"
            className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 text-[#03873E] drop-shadow-[0_0_12px_rgba(3,135,62,0.6)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M3 3v18h18" />
            <path d="M6.5 16.5l4.2-4.2 3 3 4.8-4.8" />
            <circle cx="18.5" cy="10.5" r="0.9" fill="currentColor" />
          </svg>
        </div>

        {/* number */}
        <span className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white leading-tight text-center">
          18.7%
        </span>

        {/* label */}
        <span className="text-neutral-300 text-sm sm:text-base md:text-lg text-center -mt-2">
          average monthly return
        </span>
      </div>

      {/* simple bar chart at bottom (no month names, just bars) */}
      <div className="absolute inset-x-6 bottom-6 z-10">
        <div className="h-24 sm:h-28 md:h-32 flex items-end gap-2 lg:gap-3">
          {bars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-md ${
                i === bars.length - 1
                  ? "bg-[#03873E] shadow-[0_0_12px_rgba(3,135,62,0.4)]"
                  : "bg-neutral-700/70"
              }`}
              style={{ height: `${Math.max(6, Math.min(h, 100))}%` }}
            />
          ))}
        </div>
        {/* base line */}
        <div className="h-[1.5px] w-full mt-2 bg-neutral-700/60" />
      </div>

      {/* overlay for contrast */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
    </div>
  )
}
