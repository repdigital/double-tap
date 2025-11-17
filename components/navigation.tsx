'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import { ThemeToggle } from './interactive/ThemeToggle'
import { LiveMarketStatus } from './interactive/LiveMarketStatus'

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
        setIsOpen(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', controlNavbar)
    return () => window.removeEventListener('scroll', controlNavbar)
  }, [lastScrollY])

  // Track active section
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

    const sections = ['hero', 'foundation', 'timeline', 'faq', 'cta']
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
    setIsOpen(false)
  }

  const navItems = [
    { label: 'Home', id: 'hero' },
    { label: 'Foundation', id: 'foundation' },
    { label: 'Process', id: 'timeline' },
    { label: 'FAQ', id: 'faq' },
    { label: 'Contact', id: 'cta' },
  ]

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
    >
      <div className="container-wide">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <a
            href="/"
            className="flex-shrink-0 transition-opacity duration-200 hover:opacity-80"
            onClick={(e) => {
              e.preventDefault()
              scrollToSection('hero')
            }}
          >
            <Image
              src="/double-tap-logo.png"
              alt="Double Tap Trading"
              width={138}
              height={46}
              className="h-11 w-auto"
              priority
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 group"
                >
                  {item.label}
                  {/* Active indicator */}
                  <span
                    className={`
                      absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300
                      ${activeSection === item.id ? 'w-8' : 'w-0 group-hover:w-8'}
                    `}
                  />
                </button>
              ))}
            </div>

            {/* Live Market Status */}
            <LiveMarketStatus />

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Sign In Link */}
            <a
              href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
              target="_blank"
              rel="noopener noreferrer"
              className="
                px-4 py-2 text-sm font-medium
                border border-border rounded-lg
                hover:border-primary/50 hover:bg-primary/5
                transition-all duration-200
              "
            >
              Sign In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-foreground hover:text-foreground/80 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden border-t border-border bg-background"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container-wide py-6 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`
                    block w-full text-left px-4 py-3 rounded-lg
                    text-base font-medium transition-colors
                    ${activeSection === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/80 hover:bg-muted'
                    }
                  `}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.a
                href="https://api.leadconnectorhq.com/widget/bookings/double-tap-discovery"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  block w-full text-center px-4 py-3 rounded-lg
                  border border-border
                  text-base font-medium
                  hover:border-primary/50 hover:bg-primary/5
                  transition-all
                "
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                Sign In
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
