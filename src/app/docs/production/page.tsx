export default function ProductionPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Going to Production</h1>
      
      <p>
        Preparing your NextReady application for production involves several important steps to ensure 
        optimal performance, security, and reliability. This guide covers the essential considerations 
        before deploying your application to a production environment.
      </p>

      <div className="mt-8">
        <h2 id="checklist">Production Checklist</h2>
        <ul>
          <li>Environment configuration</li>
          <li>Performance optimization</li>
          <li>Security hardening</li>
          <li>Error handling and monitoring</li>
          <li>Database optimization</li>
          <li>Content delivery optimization</li>
          <li>Testing and quality assurance</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="environment">Environment Configuration</h2>
        
        <p>
          Properly configure environment variables for production:
        </p>

        <h3>Production Environment Variables</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# .env.production
# Base URLs
NEXT_PUBLIC_APP_URL=https://yourapp.com
NEXTAUTH_URL=https://yourapp.com

# Database
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/production-db?retryWrites=true&w=majority

# Authentication
NEXTAUTH_SECRET=your-production-secret-key
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Email
EMAIL_SERVER_HOST=smtp.provider.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-production-email
EMAIL_SERVER_PASSWORD=your-production-email-password
EMAIL_FROM=noreply@yourapp.com`}
          </code>
        </pre>

        <h3>Environment Variable Validation</h3>
        <p>
          Validate required environment variables on startup:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/env.ts
export function validateEnv() {
  const requiredEnvVars = [
    'MONGODB_URI',
    'NEXTAUTH_SECRET',
    'NEXTAUTH_URL',
    'STRIPE_SECRET_KEY',
    'STRIPE_WEBHOOK_SECRET',
    'EMAIL_SERVER_HOST',
    'EMAIL_FROM',
  ]

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  )

  if (missingEnvVars.length > 0) {
    throw new Error(
      \`Missing required environment variables: \${missingEnvVars.join(', ')}\`
    )
  }
}

// Call this in your app initialization
// src/app/api/init.ts
import { validateEnv } from '@/lib/env'

// Only validate in production
if (process.env.NODE_ENV === 'production') {
  validateEnv()
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="performance">Performance Optimization</h2>
        
        <h3>Build Optimization</h3>
        <p>
          Optimize your Next.js build for production:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  },
  "dependencies": {
    // ...
  },
  "devDependencies": {
    "@next/bundle-analyzer": "^14.0.0",
    // ...
  }
}`}
          </code>
        </pre>

        <h3>Image Optimization</h3>
        <p>
          Configure Next.js Image component for production:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourcdn.com', 'youruploads.com'],
    formats: ['image/avif', 'image/webp'],
  },
  // ...
}

module.exports = nextConfig`}
          </code>
        </pre>

        <h3>Caching Strategy</h3>
        <p>
          Implement effective caching for your API routes:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/api/data/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const data = await fetchData()
  
  // Set cache headers
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=600',
    },
  })
}

// For dynamic routes that shouldn't be cached
export async function GET() {
  const data = await fetchDynamicData()
  
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="security">Security Hardening</h2>
        
        <h3>HTTP Security Headers</h3>
        <p>
          Configure security headers in your Next.js config:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Add CSP in production
          ...(process.env.NODE_ENV === 'production'
            ? [
                {
                  key: 'Content-Security-Policy',
                  value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data: https://yourcdn.com; font-src 'self'; connect-src 'self' https://api.yourapp.com; frame-src 'self' https://js.stripe.com;",
                },
              ]
            : []),
        ],
      },
    ]
  },
  // ...
}

module.exports = nextConfig`}
          </code>
        </pre>

        <h3>API Rate Limiting</h3>
        <p>
          Implement rate limiting for your API routes:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/rate-limit.ts
import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

// Initialize Redis client
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL,
  token: process.env.UPSTASH_REDIS_TOKEN,
})

export async function rateLimit(
  ip: string,
  limit = 10,
  duration = 60 // in seconds
) {
  const key = \`rate-limit:\${ip}\`
  
  // Get current count
  const count = await redis.get(key)
  
  if (!count) {
    // First request, set count to 1 with expiration
    await redis.set(key, 1, { ex: duration })
    return { success: true, remaining: limit - 1 }
  }
  
  if (count >= limit) {
    // Rate limit exceeded
    return { success: false, remaining: 0 }
  }
  
  // Increment count
  await redis.incr(key)
  return { success: true, remaining: limit - Number(count) - 1 }
}

// Usage in API route
export async function POST(request: Request) {
  // Get client IP
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Check rate limit
  const { success, remaining } = await rateLimit(ip)
  
  if (!success) {
    return NextResponse.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: {
          'Retry-After': '60',
          'X-RateLimit-Limit': '10',
          'X-RateLimit-Remaining': '0',
        }
      }
    )
  }
  
  // Process request
  // ...
  
  return NextResponse.json(
    { success: true },
    {
      headers: {
        'X-RateLimit-Limit': '10',
        'X-RateLimit-Remaining': remaining.toString(),
      }
    }
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="monitoring">Error Handling and Monitoring</h2>
        
        <h3>Error Boundary</h3>
        <p>
          Implement error boundaries for graceful error handling:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/error-boundary.tsx
'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to monitoring service
    console.error('Unhandled error:', error)
    
    // Send to error tracking service
    if (typeof window !== 'undefined' && window.errorTracker) {
      window.errorTracker.captureException(error)
    }
  }, [error])
  
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="mb-8 text-gray-600">
              We've been notified about this issue and are working to fix it.
            </p>
            <button
              onClick={reset}
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}`}
          </code>
        </pre>

        <h3>Monitoring Integration</h3>
        <p>
          Set up error monitoring with a service like Sentry:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

export function initMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 0.5,
      environment: process.env.NODE_ENV,
    })
  }
}

// Initialize in your app
// src/app/layout.tsx
import { initMonitoring } from '@/lib/monitoring'

// Only initialize in production
if (process.env.NODE_ENV === 'production') {
  initMonitoring()
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="database">Database Optimization</h2>
        
        <h3>Connection Pooling</h3>
        <p>
          Optimize MongoDB connections for production:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/mongodb.ts
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_URI
const options = {
  maxPoolSize: 10, // Adjust based on your needs
  minPoolSize: 5,
  maxIdleTimeMS: 60000,
  connectTimeoutMS: 10000,
}

let client
let clientPromise: Promise<MongoClient>

if (!MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local')
}

if (process.env.NODE_ENV === 'development') {
  // In development, use a global variable to preserve the value
  // across module reloads caused by HMR (Hot Module Replacement)
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI, options)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production, create a new client
  client = new MongoClient(MONGODB_URI, options)
  clientPromise = client.connect()
}

export default clientPromise`}
          </code>
        </pre>

        <h3>Indexes</h3>
        <p>
          Create proper indexes for your MongoDB collections:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/db-indexes.ts
import clientPromise from '@/lib/mongodb'

export async function createIndexes() {
  const client = await clientPromise
  const db = client.db()
  
  // Create indexes for users collection
  await db.collection('users').createIndexes([
    { key: { email: 1 }, unique: true },
    { key: { createdAt: 1 } },
  ])
  
  // Create indexes for organizations collection
  await db.collection('organizations').createIndexes([
    { key: { slug: 1 }, unique: true },
    { key: { ownerId: 1 } },
  ])
  
  // Create indexes for posts collection
  await db.collection('posts').createIndexes([
    { key: { slug: 1 }, unique: true },
    { key: { authorId: 1 } },
    { key: { createdAt: -1 } },
    { key: { tags: 1 } },
  ])
  
  console.log('Database indexes created successfully')
}

// Run this during deployment or in a one-time script`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="content-delivery">Content Delivery Optimization</h2>
        
        <h3>Static Generation</h3>
        <p>
          Leverage Next.js static generation for improved performance:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { getAllPosts, getPostBySlug } from '@/lib/posts'

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await getAllPosts()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Generate metadata for each post
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
  }
}

// Static page component
export default async function BlogPost({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return <div>Post not found</div>
  }
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  )
}`}
          </code>
        </pre>

        <h3>CDN Configuration</h3>
        <p>
          Configure your CDN for optimal caching:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Example Vercel configuration
// vercel.json
{
  "headers": [
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/_next/image(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400, stale-while-revalidate=604800"
        }
      ]
    },
    {
      "source": "/(.*).png",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=86400"
        }
      ]
    }
  ]
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="testing">Testing and Quality Assurance</h2>
        
        <h3>Pre-deployment Testing</h3>
        <p>
          Run comprehensive tests before deployment:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`# package.json
{
  "scripts": {
    "test": "jest",
    "test:ci": "jest --ci",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "build": "next build",
    "preprod-check": "npm run lint && npm run typecheck && npm run test:ci && npm run build"
  }
}`}
          </code>
        </pre>

        <h3>Lighthouse CI</h3>
        <p>
          Set up Lighthouse CI for performance monitoring:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['https://staging.yourapp.com/'],
      numberOfRuns: 3,
    },
    assert: {
      preset: 'lighthouse:recommended',
      assertions: {
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'interactive': ['error', { maxNumericValue: 3500 }],
        'max-potential-fid': ['warn', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Production Best Practices</h2>
        
        <ul>
          <li>
            <strong>Use Production Builds:</strong> Always deploy using <code>next build</code> and <code>next start</code>.
          </li>
          <li>
            <strong>Environment Separation:</strong> Maintain separate environments for development, staging, and production.
          </li>
          <li>
            <strong>Secret Management:</strong> Use a secure vault for managing production secrets.
          </li>
          <li>
            <strong>Database Backups:</strong> Implement regular automated backups of your production database.
          </li>
          <li>
            <strong>Monitoring:</strong> Set up comprehensive monitoring for your application and infrastructure.
          </li>
          <li>
            <strong>Logging:</strong> Implement structured logging for easier debugging and analysis.
          </li>
          <li>
            <strong>CI/CD Pipeline:</strong> Automate testing and deployment with a CI/CD pipeline.
          </li>
          <li>
            <strong>Rollback Strategy:</strong> Have a plan for quickly rolling back problematic deployments.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After preparing your application for production, proceed to:
        </p>

        <ul>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your application
            </a>
          </li>
          <li>
            <a href="/docs/analytics" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Set up analytics and monitoring
            </a>
          </li>
          <li>
            <a href="/docs/seo" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Optimize for search engines
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
