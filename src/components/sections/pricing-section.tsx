"use client"

import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useCheckout } from '@/hooks/use-checkout'
import Image from 'next/image'

const features = [
  {
    name: 'All features included',
    description: 'Authentication, billing, user management, and more'
  },
  {
    name: 'Lifetime updates',
    description: 'Get all future updates and improvements for free'
  },
  {
    name: 'Premium support',
    description: 'Access to private Discord community'
  },
  {
    name: 'Save 80+ hours',
    description: 'Start building your SaaS right away'
  }
]

export function PricingSection() {
  const { checkout, isLoading, error } = useCheckout()

  return (
    <section id="pricing" className="relative isolate bg-white dark:bg-gray-900 py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Column */}
          <div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">Pricing Section</span>
              <br />
              <span className="text-text-primary dark:text-white">Display your pricing plans here</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8">
              This section is where you should showcase your pricing plans. Explain your value proposition clearly and highlight the benefits of purchasing your product or service.
            </p>
            
            {/* Testimonials Section */}
            <div className="mb-8">
              <div className="flex items-center mb-2">
                <div className="flex -space-x-2 mr-4">
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/testimonials/cameron.jpg" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/testimonials/lee.jpg" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/testimonials/prageeth.jpg" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/testimonials/tobias.jpg" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                    <Image src="/testimonials/prokop.jpg" alt="User" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center text-yellow-400 mb-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                    <span className="ml-2 text-2xl font-semibold text-gray-800 dark:text-white">5.0</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Add social proof here with ratings from your customers</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-primary-purple/10 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <div className="bg-primary-purple/10 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <div className="bg-primary-purple/10 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-purple">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
              </div>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex gap-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{feature.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Right Column - Pricing Card */}
          <div className="relative">
            <div className="absolute -inset-x-4 -inset-y-4 z-0 bg-gradient-to-b from-primary-purple/5 to-primary-rose/5 rounded-xl"></div>
            <div className="relative z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-8">
              <div className="flex justify-between items-baseline gap-x-4">
                <h2 className="text-lg font-semibold leading-8 text-gray-900 dark:text-white">Your Main Plan</h2>
                <p className="text-sm font-semibold leading-6 text-primary-purple">Most popular</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">
                Describe the value of your product or service here. What makes it worth the price?
              </p>
              <div className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">$XX</span>
                <span className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-400">/month</span>
              </div>
              
              <ul className="mt-8 space-y-3 text-sm leading-6 text-gray-600 dark:text-gray-400">
                <li className="flex gap-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" aria-hidden="true" />
                  <span>Feature 1 description</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" aria-hidden="true" />
                  <span>Feature 2 description</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" aria-hidden="true" />
                  <span>Feature 3 description</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" aria-hidden="true" />
                  <span>Feature 4 description</span>
                </li>
                <li className="flex gap-x-3">
                  <CheckCircleIcon className="h-6 w-6 flex-none text-primary-purple" aria-hidden="true" />
                  <span>Feature 5 description</span>
                </li>
              </ul>
              
              <button
                onClick={() => checkout()}
                disabled={isLoading}
                className={`mt-8 block w-full rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-3 py-3 text-center text-sm font-semibold text-white shadow-sm hover:shadow-lg transition-all duration-200 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Processing...' : 'Buy Now Button'}
              </button>
              
              {error && <p className="mt-4 text-sm text-red-500">{error}</p>}
              
              <p className="mt-4 text-xs leading-5 text-gray-500 dark:text-gray-400 text-center">
                Add a money-back guarantee or other trust elements here
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
