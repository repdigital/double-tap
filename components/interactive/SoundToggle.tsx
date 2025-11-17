'use client'

import React, { useEffect, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { soundManager } from '@/lib/sound-manager'

export function SoundToggle() {
  const [mounted, setMounted] = useState(false)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    setMounted(true)
    setEnabled(soundManager.isEnabled())
  }, [])

  if (!mounted) {
    return (
      <button className="w-9 h-9 rounded-lg bg-muted animate-pulse" disabled />
    )
  }

  const toggle = () => {
    const newState = !enabled
    soundManager.setEnabled(newState)
    setEnabled(newState)

    // Play test sound when enabling
    if (newState) {
      soundManager.play('whoosh')
    }
  }

  return (
    <button
      onClick={toggle}
      className="
        w-9 h-9 rounded-lg
        flex items-center justify-center
        border border-border
        hover:border-primary/50
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
      "
      aria-label={`${enabled ? 'Disable' : 'Enable'} sound effects`}
      title={`Sound effects ${enabled ? 'on' : 'off'}`}
    >
      {enabled ? (
        <Volume2 className="w-4 h-4 text-foreground" />
      ) : (
        <VolumeX className="w-4 h-4 text-muted-foreground" />
      )}
    </button>
  )
}
