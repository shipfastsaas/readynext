export default function PaymentsPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Payments</h1>
      
      <p className="lead">
        NextReady integrates with Stripe to provide a complete payment system for your SaaS application, supporting subscriptions, one-time payments, and usage-based billing.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#setup">Stripe Setup</a></li>
          <li><a href="#subscriptions">Subscriptions</a></li>
          <li><a href="#checkout">Checkout Process</a></li>
          <li><a href="#webhooks">Stripe Webhooks</a></li>
          <li><a href="#customer-portal">Customer Portal</a></li>
          <li><a href="#payment-api">Payment API</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          NextReady uses Stripe for payment processing, providing a secure and reliable way to handle payments in your SaaS application. 
          The payment system supports various features including subscriptions, one-time payments, and usage-based billing.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>Stripe integration for secure payment processing</li>
            <li>Subscription management with different pricing tiers</li>
            <li>One-time payments for specific products or services</li>
            <li>Automatic invoicing and receipt generation</li>
            <li>Customer portal for subscription management</li>
            <li>Webhook handling for payment events</li>
          </ul>
        </div>
      </section>

      <section id="setup">
        <h2>Stripe Setup</h2>
        <p>
          To use the payment system in NextReady, you need to set up a Stripe account and configure the necessary environment variables.
        </p>
        
        <h3>Creating a Stripe Account</h3>
        <ol>
          <li>Sign up for a Stripe account at <a href="https://stripe.com" target="_blank" rel="noopener noreferrer">stripe.com</a></li>
          <li>Complete the onboarding process to activate your account</li>
          <li>Get your API keys from the Stripe Dashboard</li>
        </ol>
        
        <h3>Environment Variables</h3>
        <p>
          Set up the following environment variables in your <code>.env.local</code> file:
        </p>
        <pre><code className="language-bash">{`# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
STRIPE_CUSTOMER_PORTAL_URL=https://yourdomain.com/account/billing`}</code></pre>
        
        <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg my-4">
          <h4 className="text-yellow-800 dark:text-yellow-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Important Note
          </h4>
          <p className="mb-0">
            Always use test keys during development. Only switch to live keys when you're ready to deploy to production. Never commit your Stripe API keys to version control.
          </p>
        </div>
        
        <h3>Stripe Products and Prices</h3>
        <p>
          Before using the payment system, you need to set up your products and prices in the Stripe Dashboard:
        </p>
        <ol>
          <li>Create products for your different offerings</li>
          <li>Set up prices for each product (one-time or recurring)</li>
          <li>Note the price IDs for use in your application</li>
        </ol>
      </section>

      <section id="subscriptions">
        <h2>Subscriptions</h2>
        <p>
          NextReady includes a complete subscription management system built on Stripe Subscriptions.
        </p>
        
        <h3>Subscription Model</h3>
        <p>
          The subscription data is stored in your MongoDB database and linked to the user or organization:
        </p>
        <pre><code className="language-typescript">{`// Example subscription data in User or Organization model
{
  subscription: {
    id: "sub_1234567890",
    status: "active", // active, canceled, past_due, etc.
    plan: "pro",
    currentPeriodEnd: "2023-12-31T00:00:00.000Z",
    cancelAtPeriodEnd: false,
    stripeCustomerId: "cus_1234567890"
  }
}`}</code></pre>
        
        <h3>Creating a Subscription</h3>
        <p>
          To create a new subscription, you redirect the user to the Stripe Checkout page:
        </p>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SubscribeButton({ plan, userId }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          plan,
          userId,
        }),
      })
      
      const data = await response.json()
      
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="btn btn-primary"
    >
      {loading ? 'Loading...' : \`Subscribe to \${plan}\`}
    </button>
  )
}`}</code></pre>
        
        <h3>Subscription Status</h3>
        <p>
          You can check the subscription status to determine user access to features:
        </p>
        <pre><code className="language-typescript">{`// Helper function to check subscription
export function hasActiveSubscription(user) {
  if (!user?.subscription) {
    return false
  }
  
  const { status, currentPeriodEnd } = user.subscription
  
  // Check if subscription is active
  if (status !== 'active' && status !== 'trialing') {
    return false
  }
  
  // Check if subscription is expired
  if (new Date(currentPeriodEnd) < new Date()) {
    return false
  }
  
  return true
}

// Check if user has access to a specific feature
export function hasFeatureAccess(user, featureName) {
  if (!hasActiveSubscription(user)) {
    return false
  }
  
  const planFeatures = getPlanFeatures(user.subscription.plan)
  return planFeatures.includes(featureName)
}`}</code></pre>
      </section>

      <section id="checkout">
        <h2>Checkout Process</h2>
        <p>
          NextReady uses Stripe Checkout to handle the payment process. This provides a secure, pre-built payment page that you can customize.
        </p>
        
        <h3>Creating a Checkout Session</h3>
        <p>
          The checkout process starts by creating a Stripe Checkout session:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/checkout/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const { plan } = await req.json()
    
    // Get price ID based on plan
    const priceId = getPriceIdForPlan(plan)
    
    if (!priceId) {
      return NextResponse.json(
        { error: 'Invalid plan selected' },
        { status: 400 }
      )
    }
    
    // Create checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/account/billing?success=true\`,
      cancel_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/account/billing?canceled=true\`,
      customer_email: session.user.email,
      metadata: {
        userId: session.user.id,
        plan,
      },
    })
    
    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

// Helper function to get price ID for a plan
function getPriceIdForPlan(plan: string): string | null {
  const prices = {
    basic: process.env.STRIPE_PRICE_BASIC,
    pro: process.env.STRIPE_PRICE_PRO,
    enterprise: process.env.STRIPE_PRICE_ENTERPRISE,
  }
  
  return prices[plan] || null
}`}</code></pre>
        
        <h3>Handling Checkout Success</h3>
        <p>
          After a successful checkout, Stripe will redirect the user to your success URL. You can display a confirmation message and update the UI:
        </p>
        <pre><code className="language-typescript">{`// Client component for success page
'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function BillingPage() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'success' | 'canceled' | null>(null)
  
  useEffect(() => {
    if (searchParams.get('success')) {
      setStatus('success')
    } else if (searchParams.get('canceled')) {
      setStatus('canceled')
    }
  }, [searchParams])
  
  return (
    <div>
      {status === 'success' && (
        <div className="p-4 bg-green-50 text-green-700 rounded-lg mb-4">
          Your subscription has been successfully activated! You now have access to all features.
        </div>
      )}
      
      {status === 'canceled' && (
        <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg mb-4">
          Your checkout was canceled. No charges were made.
        </div>
      )}
      
      {/* Rest of billing page content */}
    </div>
  )
}`}</code></pre>
      </section>

      <section id="webhooks">
        <h2>Stripe Webhooks</h2>
        <p>
          Webhooks are essential for handling asynchronous events from Stripe, such as successful payments, subscription updates, and failed payments.
        </p>
        
        <h3>Setting Up Webhooks</h3>
        <ol>
          <li>Go to the Stripe Dashboard and navigate to Developers &gt; Webhooks</li>
          <li>Add an endpoint with your webhook URL (e.g., <code>https://yourdomain.com/api/webhooks/stripe</code>)</li>
          <li>Select the events you want to listen for (e.g., <code>checkout.session.completed</code>, <code>invoice.paid</code>, etc.)</li>
          <li>Copy the webhook signing secret and add it to your environment variables</li>
        </ol>
        
        <h3>Webhook Handler</h3>
        <p>
          NextReady includes a webhook handler to process Stripe events:
        </p>
        <pre><code className="language-typescript">{`// src/app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { buffer } from 'micro'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  try {
    const buf = await buffer(req)
    const sig = req.headers.get('stripe-signature')
    
    if (!sig) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }
    
    // Verify webhook signature
    let event: Stripe.Event
    
    try {
      event = stripe.webhooks.constructEvent(
        buf,
        sig,
        webhookSecret
      )
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Webhook signature verification failed' },
        { status: 400 }
      )
    }
    
    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        // Update user subscription
        await handleCheckoutSessionCompleted(session)
        break
      }
      
      case 'invoice.paid': {
        const invoice = event.data.object as Stripe.Invoice
        
        // Update subscription period
        await handleInvoicePaid(invoice)
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update subscription status
        await handleSubscriptionUpdated(subscription)
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Cancel subscription
        await handleSubscriptionDeleted(subscription)
        break
      }
      
      default:
        console.log(\`Unhandled event type: \${event.type}\`)
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Helper functions for handling different events
async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
  if (!session.metadata?.userId || !session.customer) {
    return
  }
  
  await dbConnect()
  
  const user = await User.findById(session.metadata.userId)
  
  if (!user) {
    return
  }
  
  // Get subscription details from Stripe
  const subscriptions = await stripe.subscriptions.list({
    customer: session.customer as string,
    limit: 1,
  })
  
  if (subscriptions.data.length === 0) {
    return
  }
  
  const subscription = subscriptions.data[0]
  
  // Update user subscription
  user.subscription = {
    id: subscription.id,
    status: subscription.status,
    plan: session.metadata.plan,
    currentPeriodEnd: new Date(subscription.current_period_end * 1000),
    cancelAtPeriodEnd: subscription.cancel_at_period_end,
    stripeCustomerId: session.customer,
  }
  
  await user.save()
}`}</code></pre>
      </section>

      <section id="customer-portal">
        <h2>Customer Portal</h2>
        <p>
          Stripe Customer Portal allows users to manage their subscriptions, update payment methods, and view invoices.
        </p>
        
        <h3>Setting Up Customer Portal</h3>
        <ol>
          <li>Go to the Stripe Dashboard and navigate to Settings &gt; Customer Portal</li>
          <li>Configure the portal settings, including branding, features, and products</li>
          <li>Save your changes</li>
        </ol>
        
        <h3>Creating a Customer Portal Session</h3>
        <pre><code className="language-typescript">{`// src/app/api/customer-portal/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import Stripe from 'stripe'
import User from '@/models/User'
import dbConnect from '@/lib/mongodb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
})

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    await dbConnect()
    
    const user = await User.findById(session.user.id)
    
    if (!user?.subscription?.stripeCustomerId) {
      return NextResponse.json(
        { error: 'No active subscription found' },
        { status: 400 }
      )
    }
    
    // Create customer portal session
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: user.subscription.stripeCustomerId,
      return_url: \`\${process.env.NEXT_PUBLIC_APP_URL}/account/billing\`,
    })
    
    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Error creating customer portal session:', error)
    return NextResponse.json(
      { error: 'Failed to create customer portal session' },
      { status: 500 }
    )
  }
}`}</code></pre>
        
        <h3>Customer Portal Button</h3>
        <pre><code className="language-typescript">{`// Client component
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  
  const handleManageSubscription = async () => {
    try {
      setLoading(true)
      
      const response = await fetch('/api/customer-portal', {
        method: 'POST',
      })
      
      const data = await response.json()
      
      if (data.url) {
        router.push(data.url)
      }
    } catch (error) {
      console.error('Error opening customer portal:', error)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <button
      onClick={handleManageSubscription}
      disabled={loading}
      className="btn btn-outline"
    >
      {loading ? 'Loading...' : 'Manage Subscription'}
    </button>
  )
}`}</code></pre>
      </section>

      <section id="payment-api">
        <h2>Payment API</h2>
        <p>
          NextReady provides a set of API endpoints for managing payments and subscriptions.
        </p>
        
        <h3>API Endpoints</h3>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Endpoint</th>
              <th className="text-left">Method</th>
              <th className="text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>/api/checkout</code></td>
              <td>POST</td>
              <td>Create a Stripe Checkout session for subscription or one-time payment</td>
            </tr>
            <tr>
              <td><code>/api/customer-portal</code></td>
              <td>POST</td>
              <td>Create a Stripe Customer Portal session for managing subscriptions</td>
            </tr>
            <tr>
              <td><code>/api/webhooks/stripe</code></td>
              <td>POST</td>
              <td>Handle Stripe webhook events</td>
            </tr>
            <tr>
              <td><code>/api/subscriptions</code></td>
              <td>GET</td>
              <td>Get current user's subscription details</td>
            </tr>
            <tr>
              <td><code>/api/subscriptions/cancel</code></td>
              <td>POST</td>
              <td>Cancel current subscription at period end</td>
            </tr>
          </tbody>
        </table>
        
        <h3>Subscription Details API</h3>
        <pre><code className="language-typescript">{`// src/app/api/subscriptions/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    await dbConnect()
    
    const user = await User.findById(session.user.id)
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    
    // Return subscription details
    return NextResponse.json({
      subscription: user.subscription || null,
    })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription details' },
      { status: 500 }
    )
  }
}`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how payments work in NextReady, you can:
        </p>
        <ul>
          <li>Set up your Stripe account and create products and prices</li>
          <li>Implement subscription-based access control for your features</li>
          <li>Customize the checkout experience with Stripe Checkout</li>
          <li>Set up webhook handlers for payment events</li>
          <li>Create a billing dashboard for users to manage their subscriptions</li>
        </ul>
      </div>
    </div>
  );
}
