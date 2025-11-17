// Sound management system using Web Audio API
// Lightweight alternative to Howler.js using native browser APIs

class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map()
  private enabled: boolean = false

  constructor() {
    // Check localStorage for user preference
    if (typeof window !== 'undefined') {
      this.enabled = localStorage.getItem('dt-sound-enabled') === 'true'
    }
  }

  // Initialize sound (using data URI for tiny sounds, or external URLs)
  register(name: string, dataUri: string) {
    if (typeof window === 'undefined') return

    const audio = new Audio(dataUri)
    audio.preload = 'auto'
    audio.volume = 0.3
    this.sounds.set(name, audio)
  }

  // Play a sound
  play(name: string) {
    if (!this.enabled) return

    const sound = this.sounds.get(name)
    if (sound) {
      sound.currentTime = 0
      sound.play().catch(() => {
        // Ignore errors (user interaction required, etc.)
      })
    }
  }

  // Enable/disable sounds
  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('dt-sound-enabled', enabled.toString())
    }
  }

  isEnabled(): boolean {
    return this.enabled
  }
}

// Singleton instance
export const soundManager = new SoundManager()

// Tiny sound effects as data URIs (minimal file size)
// These are silent placeholders - replace with actual sound data URIs or URLs

// Soft tick sound (20ms)
const TICK_SOUND = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='

// Gentle whoosh (15ms)
const WHOOSH_SOUND = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='

// Subtle ping (25ms)
const PING_SOUND = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='

// Success ding (200ms)
const SUCCESS_SOUND = 'data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA='

// Register sounds
if (typeof window !== 'undefined') {
  soundManager.register('tick', TICK_SOUND)
  soundManager.register('whoosh', WHOOSH_SOUND)
  soundManager.register('ping', PING_SOUND)
  soundManager.register('success', SUCCESS_SOUND)
}

export const playSound = (name: string) => soundManager.play(name)
export const setSoundEnabled = (enabled: boolean) => soundManager.setEnabled(enabled)
export const isSoundEnabled = () => soundManager.isEnabled()
