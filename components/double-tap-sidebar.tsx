'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { Home, Layers, TrendingUp, HelpCircle, MessageSquare, LogIn, FileText } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { ThemeToggle } from '@/components/interactive/ThemeToggle'
import { LiveMarketStatus } from '@/components/interactive/LiveMarketStatus'
import { DotMatrixViz } from '@/components/widgets/DotMatrixViz'
import { cn } from '@/lib/utils'

// Homepage sections
const homepageNavItems = [
  { label: 'Home', id: 'hero', icon: Home },
  { label: 'Foundation', id: 'foundation', icon: Layers },
  { label: 'Process', id: 'timeline', icon: TrendingUp },
  { label: 'Transparency', id: 'risk', icon: HelpCircle },
  { label: 'FAQ', id: 'faq', icon: HelpCircle },
  { label: 'Contact', id: 'cta', icon: MessageSquare },
]

// External pages
const externalNavItems = [
  { label: 'How Prop Firms Cheat', id: 'manifesto', icon: FileText, href: '/manifesto' },
]

export function DoubleTapSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [activeSection, setActiveSection] = useState('hero')

  // Set active based on route
  useEffect(() => {
    if (pathname === '/manifesto') {
      setActiveSection('manifesto')
      return
    }

    // Default to hero for homepage
    setActiveSection('hero')
  }, [pathname])

  // Handle hash scrolling on homepage load
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const hash = window.location.hash.substring(1)
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [pathname])

  // Track active section with IntersectionObserver (only on homepage)
  useEffect(() => {
    if (pathname !== '/') return

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
  }, [pathname])

  const scrollToSection = (sectionId: string) => {
    // If not on homepage, navigate home first with hash
    if (pathname !== '/') {
      router.push(`/#${sectionId}`)
      return
    }

    // On homepage, scroll to section
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <Sidebar collapsible="icon">
      {/* Header with Logo */}
      <SidebarHeader className="border-b border-sidebar-border px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            className="flex items-center transition-opacity duration-200 hover:opacity-80"
            onClick={() => {
              if (pathname === '/') {
                scrollToSection('hero')
              } else {
                router.push('/')
              }
            }}
          >
            <div className="group-data-[collapsible=icon]:hidden">
              <Image
                src="/double-tap-logo.png"
                alt="Double Tap Trading"
                width={138}
                height={46}
                className="h-10 w-auto"
                priority
              />
            </div>
            <div className="hidden group-data-[collapsible=icon]:block">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display font-bold text-sm">
                DT
              </div>
            </div>
          </button>
        </div>
      </SidebarHeader>

      {/* Main Content */}
      <SidebarContent className="px-3 py-3">
        {/* Navigation Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* Homepage sections */}
              {homepageNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => scrollToSection(item.id)}
                    isActive={activeSection === item.id}
                    tooltip={item.label}
                    className={cn(
                      'h-9 px-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.0,0.2,1)]',
                      activeSection === item.id &&
                        'bg-primary/[0.08] border-l-[3px] border-primary pl-[13px] font-medium text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* Separator */}
              <SidebarSeparator className="my-2" />

              {/* External pages */}
              {externalNavItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => router.push(item.href!)}
                    isActive={activeSection === item.id}
                    tooltip={item.label}
                    className={cn(
                      'h-9 px-4 transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.0,0.2,1)]',
                      activeSection === item.id &&
                        'bg-primary/[0.08] border-l-[3px] border-primary pl-[13px] font-medium text-foreground'
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Widgets Section */}
        <SidebarGroup className="mt-4">
          <SidebarGroupLabel className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider group-data-[collapsible=icon]:hidden">
            Market Data
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-2 px-3">
            {/* Dot Matrix Visualization */}
            <div className="group-data-[collapsible=icon]:hidden">
              <DotMatrixViz />
            </div>

            {/* Live Market Status */}
            <div className="group-data-[collapsible=icon]:hidden">
              <LiveMarketStatus variant="vertical" />
            </div>

            {/* Collapsed state - show minimal indicator */}
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-sidebar-border px-3 py-3">
        <div className="space-y-2">
          {/* Theme Toggle */}
          <div className="flex justify-center group-data-[collapsible=icon]:justify-center">
            <ThemeToggle />
          </div>

          {/* Sign In Button */}
          <a
            href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'flex items-center justify-center gap-2 h-10 px-4',
              'border border-border rounded-lg text-sm font-medium',
              'hover:border-primary/50 hover:bg-primary/5',
              'transition-all duration-[400ms] ease-[cubic-bezier(0.4,0.0,0.2,1)]',
              'group-data-[collapsible=icon]:w-10 group-data-[collapsible=icon]:px-0'
            )}
          >
            <LogIn className="h-4 w-4" />
            <span className="group-data-[collapsible=icon]:hidden">Sign In</span>
          </a>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
