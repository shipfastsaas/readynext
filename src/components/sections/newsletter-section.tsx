"use client"

import { useState } from 'react'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) return
    
    setStatus('loading')
    
    // Simulate API call - replace with your actual newsletter signup endpoint
    try {
      // Mock successful API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setStatus('success')
      setMessage('Thanks for subscribing! Check your email for a confirmation.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <section className="relative py-16 bg-background-secondary overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 -left-4 w-72 h-72 bg-primary-light/20 rounded-full filter blur-3xl opacity-70" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-dark/20 rounded-full filter blur-3xl opacity-70" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Stay Updated with SaaS Development Tips
          </h2>
          <p className="mt-4 text-lg text-text-secondary">
            Join our newsletter for exclusive SaaS building insights, global market trends, and early access to new features.
          </p>
          
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <div className="flex-grow">
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-full border-0 px-5 py-4 text-text-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-DEFAULT"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading' || status === 'success'}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="flex-none rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-6 py-4 text-white font-medium shadow-lg shadow-primary-DEFAULT/25 hover:shadow-xl transition-all duration-200 disabled:opacity-70"
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          
          {status === 'success' && (
            <div className="mt-4 text-sm text-green-600 dark:text-green-400">
              {message}
            </div>
          )}
          
          {status === 'error' && (
            <div className="mt-4 text-sm text-red-600 dark:text-red-400">
              {message}
            </div>
          )}
          
          <p className="mt-4 text-xs text-text-secondary">
            By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            <br />
            <span className="mt-2 inline-block">
              We respect your privacy and will never share your information.
            </span>
          </p>
          
          {/* Trust badges */}
          <div className="mt-8 flex items-center justify-center space-x-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-DEFAULT mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-text-secondary">No spam</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-DEFAULT mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-text-secondary">Unsubscribe anytime</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-primary-DEFAULT mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-text-secondary">Weekly digest</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
