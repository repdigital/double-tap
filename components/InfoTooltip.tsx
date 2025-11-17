'use client'

import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface InfoTooltipProps {
  content: string
}

export const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="absolute top-6 right-6 text-muted-foreground opacity-0 transition-opacity duration-200 hover:text-foreground group-hover:opacity-100 focus:opacity-100"
            aria-label="More information"
            type="button"
          >
            <Info size={16} />
          </button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          align="end"
          className="max-w-[250px] bg-card border border-border shadow-lg"
          sideOffset={8}
        >
          <p className="text-xs leading-relaxed">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
