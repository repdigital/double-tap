// app/layout.tsx
import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'
import { Inter } from 'next/font/google'
import { Geist } from 'next/font/google'
import { JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://doubletaptrading.com'),
  title: {
    default: 'Double Tap Trading - Elite Algorithmic Trading',
    template: '%s | Double Tap Trading',
  },
  description: 'AI precision meets human trading expertise. Elite algorithmic trading with systematic precision and institutional-grade risk controls. You capture alpha while the system handles execution.',
  applicationName: 'Double Tap Trading',
  keywords: ['algorithmic trading', 'AI trading', 'automated trading', 'futures trading', 'systematic trading', 'quantitative trading'],
  authors: [{ name: 'Double Tap Trading' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-192x192.png', sizes: '192x192' },
      { url: '/icon-512x512.png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://doubletaptrading.com',
    title: 'Double Tap Trading - Elite Algorithmic Trading',
    description: 'AI precision meets human trading expertise. Systematic, emotion-free returns with institutional-grade technology.',
    siteName: 'Double Tap Trading',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Double Tap Trading - Elite Algorithmic Trading',
    description: 'AI precision meets human trading expertise. Systematic, emotion-free returns.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} ${geist.variable} ${jetbrainsMono.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SidebarProvider>
            {children}
          </SidebarProvider>
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
