export default function SEOPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>SEO Optimization</h1>
      
      <p>
        NextReady includes comprehensive SEO features to help your application rank well in search engines. 
        This guide explains how to leverage Next.js's built-in SEO capabilities and the additional optimizations 
        included in NextReady.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>Metadata API for page-specific SEO</li>
          <li>Automatic sitemap generation</li>
          <li>Structured data (JSON-LD) support</li>
          <li>Open Graph and Twitter card metadata</li>
          <li>Internationalized SEO</li>
          <li>Performance optimizations for Core Web Vitals</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="metadata">Metadata API</h2>
        
        <p>
          Next.js 14 provides a powerful Metadata API that NextReady leverages for SEO optimization. 
          You can define metadata at the app level and override it for specific pages:
        </p>

        <h3>App-Level Metadata</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://yoursite.com'),
  title: {
    default: 'NextReady - SaaS Starter Kit',
    template: '%s | NextReady'
  },
  description: 'A complete SaaS starter kit built with Next.js',
  keywords: ['Next.js', 'React', 'SaaS', 'Starter Kit'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  creator: 'Your Company',
  publisher: 'Your Company',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://yoursite.com',
    siteName: 'NextReady',
    title: 'NextReady - SaaS Starter Kit',
    description: 'A complete SaaS starter kit built with Next.js',
    images: [
      {
        url: 'https://yoursite.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'NextReady - SaaS Starter Kit'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NextReady - SaaS Starter Kit',
    description: 'A complete SaaS starter kit built with Next.js',
    creator: '@yourtwitter',
    images: ['https://yoursite.com/twitter-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}`}
          </code>
        </pre>

        <h3>Page-Level Metadata</h3>
        <p>
          Override metadata for specific pages:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/pricing/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Flexible pricing plans for your SaaS application',
  openGraph: {
    title: 'Pricing - NextReady',
    description: 'Flexible pricing plans for your SaaS application',
    url: 'https://yoursite.com/pricing'
  }
}`}
          </code>
        </pre>

        <h3>Dynamic Metadata</h3>
        <p>
          Generate metadata dynamically based on content:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next'
import { getPostBySlug } from '@/lib/posts'

export async function generateMetadata({ 
  params 
}: { 
  params: { slug: string } 
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested post could not be found'
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author.name],
      images: [
        {
          url: post.coverImage,
          width: 1200,
          height: 630,
          alt: post.title
        }
      ]
    }
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="sitemap">Sitemap Generation</h2>
        
        <p>
          NextReady automatically generates a sitemap for your application:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://yoursite.com'
  const currentDate = new Date()
  
  // Static pages
  const staticPages = [
    { path: '', priority: 1.0, changeFrequency: 'daily' },
    { path: '/pricing', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/features', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/blog', priority: 0.9, changeFrequency: 'daily' },
  ]
  
  // Transform to sitemap format
  return staticPages.map(page => ({
    url: \`\${baseUrl}\${page.path}\`,
    lastModified: currentDate,
    changeFrequency: page.changeFrequency as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: page.priority,
  }))
}`}
          </code>
        </pre>

        <h3>Dynamic Sitemap Entries</h3>
        <p>
          Add dynamic content to your sitemap:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { getAllProducts } from '@/lib/products'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com'
  const currentDate = new Date()
  
  // Static pages
  const staticPages = [
    // ... static pages as above
  ]
  
  // Blog posts
  const posts = await getAllPosts()
  const blogPages = posts.map(post => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt || post.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  // Products
  const products = await getAllProducts()
  const productPages = products.map(product => ({
    url: \`\${baseUrl}/products/\${product.slug}\`,
    lastModified: new Date(product.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  // Combine all pages
  return [
    ...staticPages.map(page => ({
      url: \`\${baseUrl}\${page.path}\`,
      lastModified: currentDate,
      changeFrequency: page.changeFrequency as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
      priority: page.priority,
    })),
    ...blogPages,
    ...productPages,
  ]
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="structured-data">Structured Data</h2>
        
        <p>
          Structured data helps search engines understand your content better. NextReady includes a component 
          for adding JSON-LD structured data:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/schema-markup.tsx
export function SchemaMarkup({ 
  type, 
  data 
}: { 
  type: 'Organization' | 'Product' | 'Article' | 'FAQPage' | 'BreadcrumbList',
  data: any 
}) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}

// Usage example for an organization
export function OrganizationSchema() {
  const data = {
    name: 'Your Company',
    url: 'https://yoursite.com',
    logo: 'https://yoursite.com/logo.png',
    sameAs: [
      'https://twitter.com/yourcompany',
      'https://facebook.com/yourcompany',
      'https://linkedin.com/company/yourcompany'
    ]
  }
  
  return <SchemaMarkup type="Organization" data={data} />
}

// Usage example for a product
export function ProductSchema({ product }) {
  const data = {
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  }
  
  return <SchemaMarkup type="Product" data={data} />
}`}
          </code>
        </pre>

        <p>
          Add these components to your pages:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/products/[slug]/page.tsx
import { ProductSchema } from '@/components/schema-markup'

export default async function ProductPage({ params }) {
  const product = await getProductBySlug(params.slug)
  
  return (
    <>
      <ProductSchema product={product} />
      {/* Rest of your page content */}
    </>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="i18n-seo">Internationalized SEO</h2>
        
        <p>
          NextReady supports internationalized SEO with next-intl. Here's how to optimize SEO for multiple languages:
        </p>

        <h3>Language-Specific Metadata</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/[locale]/layout.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const locale = params.locale
  
  // Load translations for metadata
  const messages = await import(\`@/messages/\${locale}/metadata.json\`)
  
  return {
    title: {
      default: messages.defaultTitle,
      template: messages.titleTemplate
    },
    description: messages.description,
    openGraph: {
      locale: locale === 'en' ? 'en_US' : locale === 'fr' ? 'fr_FR' : locale === 'es' ? 'es_ES' : 'de_DE',
      title: messages.defaultTitle,
      description: messages.description
    }
  }
}`}
          </code>
        </pre>

        <h3>Alternate Language Links</h3>
        <p>
          Add alternate language links to help search engines understand your multilingual content:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/[locale]/layout.tsx
import { Metadata } from 'next'

export async function generateMetadata({ 
  params 
}: { 
  params: { locale: string } 
}): Promise<Metadata> {
  const locale = params.locale
  const path = '/' // This would be dynamic based on the current path
  
  // Supported locales
  const locales = ['en', 'fr', 'es', 'de']
  
  // Generate alternate links for each locale
  const alternates = {
    canonical: \`https://yoursite.com/\${locale}\${path}\`,
    languages: {}
  }
  
  locales.forEach(l => {
    alternates.languages[l] = \`https://yoursite.com/\${l}\${path}\`
  })
  
  return {
    // Other metadata properties
    alternates
  }
}`}
          </code>
        </pre>

        <h3>Hreflang Tags</h3>
        <p>
          Next.js automatically generates hreflang tags based on the alternates property in your metadata.
        </p>
      </div>

      <div className="mt-8">
        <h2 id="performance">Performance Optimization</h2>
        
        <p>
          SEO is heavily influenced by performance. NextReady includes several optimizations for Core Web Vitals:
        </p>

        <h3>Image Optimization</h3>
        <p>
          Use Next.js Image component for automatic image optimization:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/path/to/image.jpg"
      alt="Description of the image"
      width={800}
      height={600}
      priority={true} // For LCP images
      quality={85}
      placeholder="blur" // Optional blur-up
      blurDataURL="data:image..." // Base64 encoded placeholder
    />
  )
}`}
          </code>
        </pre>

        <h3>Font Optimization</h3>
        <p>
          NextReady uses Next.js font optimization to eliminate layout shift:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}`}
          </code>
        </pre>

        <h3>Script Optimization</h3>
        <p>
          Use the Next.js Script component to optimize loading of third-party scripts:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`import Script from 'next/script'

export function Analytics() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {\`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        \`}
      </Script>
    </>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="robots">Robots.txt and robots Meta Tags</h2>
        
        <p>
          NextReady provides a robots.txt file and robots meta tags:
        </p>

        <h3>Robots.txt</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/private/'],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  }
}`}
          </code>
        </pre>

        <h3>Page-Specific Robot Instructions</h3>
        <p>
          Control indexing for specific pages:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// For pages that should not be indexed
export const metadata = {
  robots: {
    index: false,
    follow: true,
  }
}

// For private pages
export const metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing SEO</h2>
        
        <h3>Environment-Based Configuration</h3>
        <p>
          Configure different SEO settings based on environment:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/seo.ts
export function getSeoConfig() {
  const isProd = process.env.NODE_ENV === 'production'
  const baseUrl = isProd 
    ? 'https://yoursite.com' 
    : 'http://localhost:3000'
  
  return {
    baseUrl,
    defaultTitle: 'NextReady - SaaS Starter Kit',
    titleTemplate: '%s | NextReady',
    robotsPolicy: isProd 
      ? { index: true, follow: true } 
      : { index: false, follow: false, nocache: true }
  }
}`}
          </code>
        </pre>

        <h3>Custom SEO Component</h3>
        <p>
          Create a reusable SEO component for pages that don't use the App Router metadata:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/seo.tsx
import Head from 'next/head'

interface SeoProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  noindex?: boolean
}

export function SEO({
  title,
  description,
  canonical,
  ogImage,
  noindex = false
}: SeoProps) {
  const siteTitle = title 
    ? \`\${title} | NextReady\` 
    : 'NextReady - SaaS Starter Kit'
  
  return (
    <Head>
      <title>{siteTitle}</title>
      {description && <meta name="description" content={description} />}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={siteTitle} />
      {description && <meta property="og:description" content={description} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      {description && <meta name="twitter:description" content={description} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
    </Head>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">SEO Best Practices</h2>
        
        <ul>
          <li>
            <strong>Unique Titles and Descriptions:</strong> Ensure each page has a unique, descriptive title and meta description.
          </li>
          <li>
            <strong>Semantic HTML:</strong> Use proper heading hierarchy (h1, h2, h3) and semantic HTML elements.
          </li>
          <li>
            <strong>Mobile Responsiveness:</strong> Ensure your site is fully responsive for all devices.
          </li>
          <li>
            <strong>Page Speed:</strong> Optimize images, minimize CSS/JS, and leverage caching for faster load times.
          </li>
          <li>
            <strong>Internal Linking:</strong> Create a logical site structure with meaningful internal links.
          </li>
          <li>
            <strong>URL Structure:</strong> Use clean, descriptive URLs with relevant keywords.
          </li>
          <li>
            <strong>Content Quality:</strong> Provide valuable, original content that answers user queries.
          </li>
          <li>
            <strong>Structured Data:</strong> Implement schema markup for rich search results.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After implementing SEO optimizations, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/analytics" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Set up analytics to track SEO performance
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your SEO-optimized application
            </a>
          </li>
          <li>
            <a href="/docs/internationalization" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Implement internationalization for global SEO
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
