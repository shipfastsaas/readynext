import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@/components/analytics/google-analytics'
import { GoogleTagManager, GoogleTagManagerNoScript } from '@/components/analytics/google-tag-manager'
import { GoogleAds } from '@/components/analytics/google-ads'
import { CookieConsent } from '@/components/cookie-consent'
import { SchemaMarkup } from '@/components/schema-markup'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://shipfaststarter.com'),
  title: 'The Best Next.js Boilerplate | SaaS Starter Kit Template | All-in-One Next.js Solution',
  description: 'Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.',
  keywords: 'best next.js boilerplate, next.js template, saas starter kit, react saas boilerplate, nextjs boilerplate, saas template, next.js 14, global saas solution, build and ship faster, multi-language saas, global payments',
  alternates: {
    canonical: 'https://shipfaststarter.com',
    
  },
  openGraph: {
    title: 'The Best Next.js Boilerplate | SaaS Starter Kit Template | ShipFastStarter',
    description: 'Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.',
    url: 'https://shipfaststarter.com',
    siteName: 'ShipFastStarter',
    images: [
      {
        url: 'https://shipfaststarter.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'The Best Next.js Boilerplate and SaaS Starter Kit Template',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Best Next.js Boilerplate | SaaS Starter Kit Template',
    description: 'Launch your SaaS with the best Next.js template and boilerplate. Complete React SaaS starter kit with authentication, payments, and beautiful UI components to ship faster.',
    images: ['https://shipfaststarter.com/twitter-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <GoogleAds />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <GoogleTagManagerNoScript />
        <Providers>
          <GoogleTagManager />
          <CookieConsent />
          <SchemaMarkup />
          {children}
        </Providers>
      </body>
    </html>
  )
}
