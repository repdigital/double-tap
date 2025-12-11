'use client'

import { motion } from 'framer-motion'

interface MetricsGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4
  className?: string
}

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.05
    }
  }
}

export function MetricsGrid({ children, columns = 3, className = '' }: MetricsGridProps) {
  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  }[columns]

  return (
    <motion.div
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
      className={`grid ${gridClass} gap-4 ${className}`}
    >
      {children}
    </motion.div>
  )
}
