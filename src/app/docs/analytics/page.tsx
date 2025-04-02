export default function AnalyticsPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Analytics</h1>
      
      <p>
        NextReady includes built-in support for analytics integration, allowing you to track user behavior, 
        monitor application performance, and make data-driven decisions. This guide explains how to set up 
        and customize analytics in your NextReady application.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>Google Analytics 4 integration</li>
          <li>Privacy-focused analytics options</li>
          <li>Custom event tracking</li>
          <li>E-commerce tracking for Stripe payments</li>
          <li>User journey analysis</li>
          <li>Performance monitoring</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="google-analytics">Google Analytics 4 Integration</h2>
        
        <h3>Setup</h3>
        <p>
          NextReady makes it easy to integrate Google Analytics 4 (GA4) with your application:
        </p>

        <ol>
          <li>Create a Google Analytics 4 property in the Google Analytics console</li>
          <li>Get your Measurement ID (G-XXXXXXXXXX)</li>
          <li>Add the Measurement ID to your environment variables</li>
        </ol>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# .env.local
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`}
          </code>
        </pre>

        <h3>Analytics Component</h3>
        <p>
          NextReady includes an Analytics component that uses the Next.js Script component for optimal loading:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/analytics/google-analytics.tsx
'use client'

import Script from 'next/script'

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  if (!measurementId) return null
  
  return (
    <>
      <Script
        src={\`https://www.googletagmanager.com/gtag/js?id=\${measurementId}\`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '\${measurementId}', {
            page_path: window.location.pathname,
          });
        \`}
      </Script>
    </>
  )
}`}
          </code>
        </pre>

        <h3>Integration in Layout</h3>
        <p>
          Add the Analytics component to your root layout:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/layout.tsx
import { GoogleAnalytics } from '@/components/analytics/google-analytics'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleAnalytics />
      </head>
      <body>{children}</body>
    </html>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="page-views">Page View Tracking</h2>
        
        <p>
          NextReady automatically tracks page views when using Google Analytics. For more advanced tracking 
          in a single-page application context, you can use a custom hook:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/hooks/use-page-view.ts
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function usePageView() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    if (pathname && window.gtag) {
      let url = pathname
      if (searchParams?.toString()) {
        url += '?' + searchParams.toString()
      }
      
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      })
    }
  }, [pathname, searchParams])
}`}
          </code>
        </pre>

        <p>
          Use this hook in your app:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/providers.tsx
'use client'

import { usePageView } from '@/hooks/use-page-view'

export function Providers({ children }) {
  usePageView()
  
  return <>{children}</>
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="custom-events">Custom Event Tracking</h2>
        
        <p>
          Track custom events to gain deeper insights into user behavior:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/analytics.ts
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Usage example
import { trackEvent } from '@/lib/analytics'

// Track a button click
trackEvent('click', 'engagement', 'pricing_button')

// Track a form submission
trackEvent('submit', 'form', 'contact_form')

// Track a purchase
trackEvent('purchase', 'ecommerce', 'premium_plan', 99)`}
          </code>
        </pre>

        <h3>React Component Example</h3>
        <p>
          Integrate event tracking in a React component:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/subscribe-button.tsx
'use client'

import { trackEvent } from '@/lib/analytics'

export function SubscribeButton({ plan, price }) {
  const handleClick = () => {
    // Track the click event
    trackEvent('click', 'subscription', \`plan_\${plan}\`, price)
    
    // Continue with subscription logic
    // ...
  }
  
  return (
    <button 
      onClick={handleClick}
      className="px-4 py-2 bg-blue-600 text-white rounded-md"
    >
      Subscribe to {plan}
    </button>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="ecommerce">E-commerce Tracking</h2>
        
        <p>
          NextReady includes e-commerce tracking for Stripe payments:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/analytics-ecommerce.ts
export function trackPurchase(purchase: {
  transaction_id: string
  value: number
  currency: string
  items: Array<{
    item_id: string
    item_name: string
    price: number
    quantity: number
  }>
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'purchase', purchase)
  }
}

// Usage in checkout success page
import { trackPurchase } from '@/lib/analytics-ecommerce'

// After successful Stripe payment
trackPurchase({
  transaction_id: session.id,
  value: session.amount_total / 100,
  currency: session.currency,
  items: [{
    item_id: 'plan_premium',
    item_name: 'Premium Plan',
    price: session.amount_total / 100,
    quantity: 1
  }]
})`}
          </code>
        </pre>

        <h3>Stripe Webhook Integration</h3>
        <p>
          Track purchases server-side using Stripe webhooks:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { sendServerAnalytics } from '@/lib/server-analytics'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request: Request) {
  const payload = await request.text()
  const signature = request.headers.get('stripe-signature')
  
  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )
    
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      
      // Track purchase server-side
      await sendServerAnalytics({
        type: 'purchase',
        data: {
          transaction_id: session.id,
          value: session.amount_total / 100,
          currency: session.currency,
          user_id: session.metadata?.userId,
          product_id: session.metadata?.productId
        }
      })
      
      // Process the order
      // ...
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="privacy">Privacy-Focused Analytics</h2>
        
        <p>
          NextReady also supports privacy-focused analytics alternatives:
        </p>

        <h3>Fathom Analytics</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/analytics/fathom-analytics.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function FathomAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Load Fathom script
    const script = document.createElement('script')
    script.setAttribute('data-site', process.env.NEXT_PUBLIC_FATHOM_SITE_ID)
    script.setAttribute('defer', '')
    script.setAttribute('src', 'https://cdn.usefathom.com/script.js')
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [])
  
  // Track page views
  useEffect(() => {
    if (pathname && window.fathom) {
      window.fathom.trackPageview()
    }
  }, [pathname, searchParams])
  
  return null
}`}
          </code>
        </pre>

        <h3>Plausible Analytics</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/analytics/plausible-analytics.tsx
'use client'

import Script from 'next/script'

export function PlausibleAnalytics() {
  return (
    <Script
      data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="user-consent">User Consent Management</h2>
        
        <p>
          Implement cookie consent for GDPR compliance:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/cookie-consent.tsx
'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

export function CookieConsent() {
  const [consent, setConsent] = useState<'accepted' | 'rejected' | null>(null)
  
  useEffect(() => {
    // Check for existing consent
    const savedConsent = localStorage.getItem('cookie-consent')
    if (savedConsent) {
      setConsent(savedConsent as 'accepted' | 'rejected')
    }
  }, [])
  
  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setConsent('accepted')
    trackEvent('accept', 'cookie_consent')
    
    // Enable analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'granted'
    })
  }
  
  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setConsent('rejected')
    trackEvent('reject', 'cookie_consent')
    
    // Disable analytics
    window.gtag('consent', 'update', {
      analytics_storage: 'denied'
    })
  }
  
  if (consent) return null
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg z-50">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-sm">
            We use cookies to improve your experience. By continuing to use our site, 
            you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm border border-gray-300 rounded-md"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}`}
          </code>
        </pre>

        <h3>Consent-Based Analytics Initialization</h3>
        <p>
          Initialize analytics based on user consent:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/analytics/google-analytics-with-consent.tsx
'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export function GoogleAnalyticsWithConsent() {
  const [consent, setConsent] = useState<boolean | null>(null)
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent')
    setConsent(savedConsent === 'accepted')
  }, [])
  
  if (!measurementId || consent === null) return null
  
  return (
    <>
      <Script
        src={\`https://www.googletagmanager.com/gtag/js?id=\${measurementId}\`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('consent', 'default', {
            'analytics_storage': '\${consent ? 'granted' : 'denied'}'
          });
          gtag('config', '\${measurementId}', {
            page_path: window.location.pathname,
          });
        \`}
      </Script>
    </>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="dashboard">Analytics Dashboard</h2>
        
        <p>
          NextReady includes a simple analytics dashboard for your admin panel:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/admin/analytics/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { Chart } from 'react-chartjs-2'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function AnalyticsDashboard() {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [period, setPeriod] = useState('7d')
  
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      try {
        const response = await fetch(\`/api/stats?period=\${period}\`)
        const result = await response.json()
        setData(result)
      } catch (error) {
        console.error('Failed to fetch analytics data:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchData()
  }, [period])
  
  if (isLoading) return <div>Loading analytics...</div>
  if (!data) return <div>No data available</div>
  
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Page Views</h3>
          <p className="text-3xl font-bold">{data.pageViews.total}</p>
          <p className="text-sm text-gray-500">
            {data.pageViews.change > 0 ? '+' : ''}{data.pageViews.change}% vs previous period
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Unique Visitors</h3>
          <p className="text-3xl font-bold">{data.visitors.total}</p>
          <p className="text-sm text-gray-500">
            {data.visitors.change > 0 ? '+' : ''}{data.visitors.change}% vs previous period
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Conversion Rate</h3>
          <p className="text-3xl font-bold">{data.conversionRate.total}%</p>
          <p className="text-sm text-gray-500">
            {data.conversionRate.change > 0 ? '+' : ''}{data.conversionRate.change}% vs previous period
          </p>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">Traffic Overview</h3>
        <div className="h-80">
          <Chart 
            type="line" 
            data={{
              labels: data.traffic.labels,
              datasets: [
                {
                  label: 'Page Views',
                  data: data.traffic.pageViews,
                  borderColor: 'rgb(59, 130, 246)',
                  backgroundColor: 'rgba(59, 130, 246, 0.5)',
                },
                {
                  label: 'Unique Visitors',
                  data: data.traffic.visitors,
                  borderColor: 'rgb(16, 185, 129)',
                  backgroundColor: 'rgba(16, 185, 129, 0.5)',
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Top Pages</h3>
          <div className="space-y-2">
            {data.topPages.map((page, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="truncate max-w-xs">{page.path}</span>
                <span>{page.views} views</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">Traffic Sources</h3>
          <div className="space-y-2">
            {data.sources.map((source, index) => (
              <div key={index} className="flex justify-between items-center">
                <span>{source.name}</span>
                <span>{source.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}`}
          </code>
        </pre>

        <h3>API Route for Analytics Data</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/stats/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { fetchAnalyticsData } from '@/lib/analytics-api'

export async function GET(request: Request) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session || !session.user.isAdmin) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Get query parameters
  const { searchParams } = new URL(request.url)
  const period = searchParams.get('period') || '7d'
  
  try {
    // Fetch analytics data
    const data = await fetchAnalyticsData(period)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching analytics data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch analytics data' },
      { status: 500 }
    )
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing Analytics</h2>
        
        <h3>Adding Custom Dimensions</h3>
        <p>
          Track additional data with custom dimensions:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Set up custom dimensions in Google Analytics 4
// Then use them in your tracking code:

// Track user type
window.gtag('set', 'user_properties', {
  user_type: 'premium' // or 'free', 'admin', etc.
})

// Track experiment variations
window.gtag('set', 'user_properties', {
  experiment_variant: 'A' // or 'B', 'control', etc.
})

// Track user preferences
window.gtag('set', 'user_properties', {
  theme_preference: 'dark' // or 'light', 'system'
})`}
          </code>
        </pre>

        <h3>A/B Testing Integration</h3>
        <p>
          Integrate analytics with A/B testing:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/hooks/use-ab-test.ts
'use client'

import { useState, useEffect } from 'react'
import { trackEvent } from '@/lib/analytics'

type Variant = 'A' | 'B'

export function useABTest(testName: string): Variant {
  const [variant, setVariant] = useState<Variant | null>(null)
  
  useEffect(() => {
    // Check for existing variant assignment
    const savedVariant = localStorage.getItem(\`ab-test-\${testName}\`)
    
    if (savedVariant === 'A' || savedVariant === 'B') {
      setVariant(savedVariant)
    } else {
      // Randomly assign variant
      const newVariant: Variant = Math.random() < 0.5 ? 'A' : 'B'
      localStorage.setItem(\`ab-test-\${testName}\`, newVariant)
      setVariant(newVariant)
      
      // Track experiment view
      trackEvent('experiment_view', 'ab_test', testName, newVariant === 'A' ? 0 : 1)
    }
  }, [testName])
  
  return variant || 'A' // Default to A if not yet determined
}

// Usage example
function PricingPage() {
  const variant = useABTest('pricing_layout')
  
  return (
    <div>
      {variant === 'A' ? (
        <PricingLayoutA />
      ) : (
        <PricingLayoutB />
      )}
    </div>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Analytics Best Practices</h2>
        
        <ul>
          <li>
            <strong>Respect User Privacy:</strong> Always implement proper consent management and comply with privacy regulations like GDPR and CCPA.
          </li>
          <li>
            <strong>Minimize Data Collection:</strong> Only collect data that you actually need and will use.
          </li>
          <li>
            <strong>Use Descriptive Event Names:</strong> Create a consistent naming convention for events to make analysis easier.
          </li>
          <li>
            <strong>Set Up Goals:</strong> Define conversion goals in your analytics platform to track important user actions.
          </li>
          <li>
            <strong>Regular Analysis:</strong> Schedule regular reviews of your analytics data to identify trends and opportunities.
          </li>
          <li>
            <strong>Test Your Implementation:</strong> Verify that your analytics tracking is working correctly using the debug mode or real-time reports.
          </li>
          <li>
            <strong>Optimize Page Speed:</strong> Ensure that your analytics implementation doesn't significantly impact page load times.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After implementing analytics, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/seo" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Optimize your site for SEO
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your application
            </a>
          </li>
          <li>
            <a href="/docs/production" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Prepare for production
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
