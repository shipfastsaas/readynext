"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface Purchase {
  id: string
  name: string
  location: string
  product: string
  time: string
}

// Sample data - you can replace this with real data from your API
const samplePurchases: Purchase[] = [
  {
    id: '1',
    name: 'Sarah',
    location: 'Los Angeles, USA',
    product: 'Lifetime access',
    time: '2 minutes ago'
  },
  {
    id: '2',
    name: 'Michael',
    location: 'London, UK',
    product: 'Lifetime access',
    time: '5 minutes ago'
  },
  {
    id: '3',
    name: 'Emma',
    location: 'Toronto, Canada',
    product: 'Lifetime access',
    time: '8 minutes ago'
  },
  {
    id: '4',
    name: 'James',
    location: 'Sydney, Australia',
    product: 'Lifetime access',
    time: '12 minutes ago'
  },
]

export function RecentPurchases() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let currentIndex = 0
    
    // Function to show next purchase
    const showNextPurchase = () => {
      setIsVisible(false)
      
      // Wait for exit animation to complete
      setTimeout(() => {
        setCurrentPurchase(samplePurchases[currentIndex])
        setIsVisible(true)
        currentIndex = (currentIndex + 1) % samplePurchases.length
      }, 500)
    }

    // Initial display
    showNextPurchase()

    // Set up interval to show purchases periodically
    const interval = setInterval(() => {
      showNextPurchase()
    }, 5000) // Show new purchase every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <AnimatePresence>
        {isVisible && currentPurchase && (
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="fixed bottom-24 left-4 z-50"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 pr-12 max-w-sm border-l-4 border-primary-light">
              {/* Content */}
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm text-text-primary">
                    <span className="font-semibold">{currentPurchase.name}</span> from{' '}
                    <span className="font-medium">{currentPurchase.location}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-text-secondary">
                    purchased <span className="text-primary-light font-medium">{currentPurchase.product}</span>
                  </p>
                  <Image
                    src="/paiement-securise.png"
                    alt="Paiement sécurisé"
                    width={80}
                    height={32}
                    className="w-auto h-5"
                  />
                </div>
                <p className="text-xs text-text-secondary mt-1">{currentPurchase.time}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
