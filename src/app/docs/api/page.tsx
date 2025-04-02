export default function ApiPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>API Routes</h1>
      
      <p className="lead">
        NextReady provides a comprehensive set of API routes built with Next.js App Router, allowing you to easily interact with your database and external services.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#route-handlers">Route Handlers</a></li>
          <li><a href="#authentication-api">Authentication API</a></li>
          <li><a href="#blog-api">Blog API</a></li>
          <li><a href="#contact-api">Contact API</a></li>
          <li><a href="#payment-api">Payment API</a></li>
          <li><a href="#user-api">User API</a></li>
          <li><a href="#webhooks">Webhooks</a></li>
          <li><a href="#custom-api">Creating Custom API Routes</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          NextReady uses Next.js App Router API routes, which are serverless functions that run on-demand. 
          These API routes are located in the <code>src/app/api</code> directory and follow the Next.js App Router conventions.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>Built on Next.js App Router API routes</li>
            <li>TypeScript support for type safety</li>
            <li>Authentication and authorization middleware</li>
            <li>MongoDB integration</li>
            <li>Error handling and response formatting</li>
          </ul>
        </div>
      </section>

      <section id="route-handlers">
        <h2>Route Handlers</h2>
        <p>
          NextReady uses the Next.js App Router route handlers to create API endpoints. These handlers are defined in <code>route.ts</code> files within the <code>src/app/api</code> directory structure.
        </p>
        
        <h3>Basic Route Handler Structure</h3>
        <pre><code className="language-typescript">{`// src/app/api/example/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import SomeModel from '@/models/SomeModel'

export const dynamic = 'force-dynamic' // Optional: prevents caching

export async function GET(request: Request) {
  try {
    await dbConnect()
    const items = await SomeModel.find({})
    return NextResponse.json(items)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    await dbConnect()
    const newItem = await SomeModel.create(data)
    return NextResponse.json(newItem, { status: 201 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
`}</code></pre>
        
        <h3>Available HTTP Methods</h3>
        <p>
          NextReady supports all standard HTTP methods for API routes:
        </p>
        <ul>
          <li><code>GET</code> - Retrieve data</li>
          <li><code>POST</code> - Create new data</li>
          <li><code>PUT</code> - Update existing data</li>
          <li><code>PATCH</code> - Partially update existing data</li>
          <li><code>DELETE</code> - Delete data</li>
        </ul>
        
        <h3>Dynamic Routes</h3>
        <p>
          For routes that need to handle dynamic parameters, NextReady uses the Next.js dynamic route segments:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/posts/[id]/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Post from '@/models/Post'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect()
    const post = await Post.findById(params.id)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
`}</code></pre>
      </section>

      <section id="authentication-api">
        <h2>Authentication API</h2>
        <p>
          NextReady includes a complete authentication system with API routes for user registration, login, and profile management.
        </p>
        
        <h3>Authentication Routes</h3>
        <p>
          The following authentication routes are available:
        </p>
        <ul>
          <li><code>/api/auth/[...nextauth]</code> - NextAuth.js API routes for authentication</li>
          <li><code>/api/auth/signup</code> - User registration endpoint</li>
          <li><code>/api/admin-auth</code> - Admin authentication endpoint</li>
        </ul>
        
        <h3>User Registration</h3>
        <pre><code className="language-typescript">{`// Example request to register a new user
const response = await fetch('/api/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'securepassword'
  })
})`}</code></pre>
        
        <h3>Authentication with NextAuth.js</h3>
        <p>
          NextReady uses NextAuth.js for authentication. You can use the NextAuth.js API routes for login, logout, and session management:
        </p>
        <pre><code className="language-typescript">{`// Example: Sign in with credentials
import { signIn } from 'next-auth/react'

await signIn('credentials', {
  email: 'user@example.com',
  password: 'password',
  redirect: false
})

// Example: Sign in with Google
await signIn('google', {
  callbackUrl: '/dashboard'
})

// Example: Sign out
import { signOut } from 'next-auth/react'

await signOut({
  callbackUrl: '/'
})`}</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Dependency Conflict Note
          </h4>
          <p className="mb-0">
            NextReady has a known dependency conflict between <code>next-auth</code>, <code>@auth/core</code> and <code>@auth/mongodb-adapter</code>. To resolve this, make sure to add a <code>.npmrc</code> file with <code>legacy-peer-deps=true</code> to your project.
          </p>
        </div>
      </section>

      <section id="blog-api">
        <h2>Blog API</h2>
        <p>
          NextReady includes a complete blog system with API routes for managing blog posts.
        </p>
        
        <h3>Blog Routes</h3>
        <p>
          The following blog API routes are available:
        </p>
        <ul>
          <li><code>/api/posts</code> - Get all posts or create a new post</li>
          <li><code>/api/posts/[id]</code> - Get, update, or delete a specific post</li>
        </ul>
        
        <h3>Get All Posts</h3>
        <pre><code className="language-typescript">{`// Example: Get all blog posts
const response = await fetch('/api/posts')
const posts = await response.json()`}</code></pre>
        
        <h3>Create a New Post</h3>
        <pre><code className="language-typescript">{`// Example: Create a new blog post
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My New Blog Post',
    content: 'This is the content of my blog post...',
    excerpt: 'A short excerpt for the blog post',
    slug: 'my-new-blog-post',
    coverImage: '/images/blog/my-image.jpg',
    published: true
  })
})`}</code></pre>
        
        <h3>Update a Post</h3>
        <pre><code className="language-typescript">{`// Example: Update a blog post
const postId = 'your-post-id'; // Déclaration de la variable
const response = await fetch(\`/api/posts/\${postId}\`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated Title',
    content: 'Updated content...'
    // Include other fields you want to update
  })
})`}</code></pre>
        
        <h3>Delete a Post</h3>
        <pre><code className="language-typescript">{`// Example: Delete a blog post
const postId = 'your-post-id'; // Déclaration de la variable
const response = await fetch(\`/api/posts/\${postId}\`, {
  method: 'DELETE'
})`}</code></pre>
      </section>

      <section id="contact-api">
        <h2>Contact API</h2>
        <p>
          NextReady includes API routes for managing contact form submissions.
        </p>
        
        <h3>Contact Routes</h3>
        <p>
          The following contact API routes are available:
        </p>
        <ul>
          <li><code>/api/contact</code> - Submit a contact form or get all contacts</li>
        </ul>
        
        <h3>Submit Contact Form</h3>
        <pre><code className="language-typescript">{`// Example: Submit a contact form
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Hello, I have a question about your service...'
  })
})`}</code></pre>
        
        <h3>Get All Contacts (Admin Only)</h3>
        <pre><code className="language-typescript">{`// Example: Get all contacts (requires admin authentication)
const response = await fetch('/api/contact')
const contacts = await response.json()`}</code></pre>
      </section>

      <section id="payment-api">
        <h2>Payment API</h2>
        <p>
          NextReady includes API routes for handling payments and subscriptions with Stripe.
        </p>
        
        <h3>Payment Routes</h3>
        <p>
          The following payment API routes are available:
        </p>
        <ul>
          <li><code>/api/checkout</code> - Create a checkout session</li>
          <li><code>/api/payments</code> - Get payment information</li>
          <li><code>/api/webhooks/stripe</code> - Handle Stripe webhooks</li>
        </ul>
        
        <h3>Create a Checkout Session</h3>
        <pre><code className="language-typescript">{`// Example: Create a checkout session for a subscription
const response = await fetch('/api/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    priceId: 'price_1234567890',
    successUrl: 'https://yourdomain.com/success',
    cancelUrl: 'https://yourdomain.com/cancel'
  })
})

const { url } = await response.json()
window.location.href = url // Redirect to Stripe Checkout`}</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Stripe Status Check Note
          </h4>
          <p className="mb-0">
            When working with Stripe webhooks, ensure that the payment status checks are looking for <code>succeeded</code> status (not <code>completed</code>) to avoid payment processing issues.
          </p>
        </div>
      </section>

      <section id="user-api">
        <h2>User API</h2>
        <p>
          NextReady includes API routes for managing user profiles and settings.
        </p>
        
        <h3>User Routes</h3>
        <p>
          The following user API routes are available:
        </p>
        <ul>
          <li><code>/api/users</code> - Get all users or update the current user</li>
        </ul>
        
        <h3>Update User Profile</h3>
        <pre><code className="language-typescript">{`// Example: Update user profile
const response = await fetch('/api/users', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Updated Name',
    image: 'https://example.com/profile-image.jpg'
  })
})`}</code></pre>
      </section>

      <section id="webhooks">
        <h2>Webhooks</h2>
        <p>
          NextReady includes webhook handlers for integrating with external services.
        </p>
        
        <h3>Stripe Webhooks</h3>
        <p>
          The Stripe webhook handler is located at <code>/api/webhooks/stripe</code> and processes events from Stripe:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/webhooks/stripe/route.ts
import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import { buffer } from 'micro'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function POST(request: Request) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')
  
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2023-10-16',
  })
  
  let event
  
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }
  
  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      // Handle completed checkout session
      break
    case 'customer.subscription.created':
      // Handle subscription creation
      break
    case 'customer.subscription.updated':
      // Handle subscription update
      break
    case 'customer.subscription.deleted':
      // Handle subscription deletion
      break
    default:
      console.log(\`Unhandled event type: \${event.type}\`)
  }
  
  return NextResponse.json({ received: true })
`}</code></pre>
        
        <h3>Setting Up Webhooks</h3>
        <p>
          To set up webhooks for your application:
        </p>
        <ol>
          <li>Configure the webhook endpoint in the external service (e.g., Stripe Dashboard)</li>
          <li>Set the webhook URL to <code>https://yourdomain.com/api/webhooks/stripe</code></li>
          <li>Configure the webhook secret in your environment variables</li>
          <li>Implement the webhook handler in your API route</li>
        </ol>
      </section>

      <section id="custom-api">
        <h2>Creating Custom API Routes</h2>
        <p>
          You can easily extend NextReady with your own custom API routes.
        </p>
        
        <h3>Creating a New API Route</h3>
        <p>
          To create a new API route:
        </p>
        <ol>
          <li>Create a new directory in <code>src/app/api</code> for your route (e.g., <code>src/app/api/custom</code>)</li>
          <li>Create a <code>route.ts</code> file in the directory</li>
          <li>Implement the HTTP methods you need (GET, POST, etc.)</li>
        </ol>
        
        <pre><code className="language-typescript">{`// src/app/api/custom/route.ts
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth-config'

export async function GET(request: Request) {
  // Check authentication if needed
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }
  
  // Process the request
  try {
    await dbConnect()
    // Your custom logic here
    
    return NextResponse.json({ success: true, data: 'Your data here' })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}`}</code></pre>
        
        <h3>API Middleware</h3>
        <p>
          You can create middleware to handle common tasks like authentication, logging, or error handling:
        </p>
        <pre><code className="language-typescript">{`// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Example: Add custom headers to API responses
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const response = NextResponse.next()
    response.headers.set('X-API-Version', '1.0')
    return response
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/api/:path*',
}`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how to work with API routes in NextReady, you might want to explore:
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/docs/authentication"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Authentication
          </a>
          <a
            href="/docs/payments"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Payments
          </a>
        </div>
      </div>
    </div>
  )
}
