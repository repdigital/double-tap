import type React from "react"
import { cn } from "@/lib/utils"

interface BentoGridItemProps {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}

const BentoGridItem = ({ className, title, description, header, icon }: BentoGridItemProps) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input p-4 border border-transparent justify-between flex flex-col space-y-4",
        "!bg-gradient-to-br !from-neutral-900 !to-neutral-800",
        className,
      )}
      style={{
        background: "linear-gradient(to bottom right, rgb(23, 23, 23), rgb(38, 38, 38)) !important",
        backgroundImage: "linear-gradient(to bottom right, rgb(23, 23, 23), rgb(38, 38, 38)) !important",
      }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {icon}
        <div className="font-sans font-bold text-white mb-2 mt-2">{title}</div>
        <div className="font-sans font-normal text-white/80 text-xs">{description}</div>
      </div>
    </div>
  )
}

export default BentoGridItem
