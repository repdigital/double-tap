'use client'

import React, { useRef, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import { ArrowRight } from 'lucide-react'

interface MagneticButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  size?: 'default' | 'large' | 'xl'
  className?: string
  showIcon?: boolean
}

export function MagneticButton({
  children,
  href,
  onClick,
  size = 'default',
  className = '',
  showIcon = true
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { mass: 1, tension: 170, friction: 26 }
  }))

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const distanceX = e.clientX - centerX
    const distanceY = e.clientY - centerY
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2)

    // Magnetic effect: attract cursor when within 80px radius
    const magneticRadius = 80
    if (distance < magneticRadius) {
      const strength = 1 - distance / magneticRadius
      api.start({
        x: distanceX * strength * 0.15,
        y: distanceY * strength * 0.15,
        scale: 1.02
      })
    } else {
      api.start({ x: 0, y: 0, scale: 1 })
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    api.start({ x: 0, y: 0, scale: 1 })
  }

  const sizeClasses = {
    default: 'h-12 px-6 text-base',
    large: 'h-14 px-8 text-lg',
    xl: 'h-16 px-10 text-xl'
  }

  const baseClasses = `
    inline-flex items-center justify-center gap-2
    rounded-lg font-medium
    bg-primary text-primary-foreground
    shadow-accent
    transition-shadow duration-200
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2
    active:scale-[0.98]
    ${sizeClasses[size]}
    ${className}
  `

  const ButtonContent = () => (
    <>
      {children}
      {showIcon && (
        <animated.div
          style={{
            transform: x.to(val => isHovered ? `translateX(${Math.abs(val) * 0.3 + 4}px)` : 'translateX(0px)')
          }}
        >
          <ArrowRight className={size === 'xl' ? 'w-6 h-6' : size === 'large' ? 'w-5 h-5' : 'w-4 h-4'} />
        </animated.div>
      )}
    </>
  )

  if (href) {
    return (
      <animated.a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={baseClasses}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: x.to((x, y) => `translate3d(${x}px, ${y}px, 0) scale(${scale.get()})`),
        }}
      >
        <ButtonContent />
      </animated.a>
    )
  }

  return (
    <animated.button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={baseClasses}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: x.to((x, y) => `translate3d(${x}px, ${y}px, 0) scale(${scale.get()})`),
      }}
    >
      <ButtonContent />
    </animated.button>
  )
}
