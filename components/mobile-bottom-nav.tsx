'use client'

import { useState, useEffect } from 'react'
import { Home, Layers, TrendingUp, HelpCircle, MessageSquare } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Home', id: 'hero', icon: Home },
  { label: 'Foundation', id: 'foundation', icon: Layers },
  { label: 'Process', id: 'timeline', icon: TrendingUp },
  { label: 'FAQ', id: 'faq', icon: HelpCircle },
  { label: 'Contact', id: 'cta', icon: MessageSquare },
]

export function MobileBottomNav() {
  const [activeSection, setActiveSection] = useState('hero')

  // Track active section with IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    const sections = ['hero', 'foundation', 'timeline', 'risk', 'faq', 'cta']
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 z-50',
        'lg:hidden', // Hide on desktop (sidebar takes over)
        'h-16 bg-background/95 backdrop-blur-md',
        'border-t border-border',
        'shadow-lg'
      )}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
    >
      <div className="flex h-full items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                'flex flex-1 flex-col items-center justify-center gap-1',
                'min-h-[44px] min-w-[44px]', // Touch target size
                'transition-all duration-200',
                'active:scale-95'
              )}
            >
              <Icon
                className={cn(
                  'h-6 w-6 transition-colors duration-200',
                  isActive ? 'text-primary' : 'text-muted-foreground'
                )}
              />
              <span
                className={cn(
                  'text-[11px] font-medium transition-colors duration-200',
                  isActive ? 'text-primary font-semibold' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
