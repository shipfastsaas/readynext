'use client'

import Link from 'next/link'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useGoogleAdsPageViewConversion } from '@/components/analytics/google-ads'

export default function ThankYouPage() {
  // Activer le suivi de conversion Google Ads
  useGoogleAdsPageViewConversion()
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="flex justify-center mb-8">
          <div className="rounded-full bg-green-100 p-3 dark:bg-green-900">
            <CheckCircleIcon className="h-12 w-12 text-green-500" />
          </div>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Thank you for your purchase! 🎉
        </h1>
        <p className="text-xl text-text-secondary mb-8">
          You will receive an email shortly with instructions to access your purchase.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="rounded-xl bg-primary-rose px-8 py-4 text-white shadow-lg shadow-primary-rose/25 hover:shadow-xl hover:opacity-90 transition-all duration-200"
          >
            View Documentation
          </Link>
          <Link
            href="https://discord.gg/shipfast"
            className="rounded-xl bg-background-surface px-8 py-4 text-text-primary shadow hover:shadow-lg transition-all duration-200"
          >
            Join Discord Community
          </Link>
        </div>
      </div>
    </div>
  )
}
