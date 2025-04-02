'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { motion, AnimatePresence } from 'framer-motion'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = Cookies.get('cookie-consent')
    if (!consent) {
      // Petit délai pour ne pas afficher immédiatement au chargement de la page
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  const acceptCookies = () => {
    Cookies.set('cookie-consent', 'accepted', { expires: 365 })
    setShowBanner(false)
    // Activer Google Analytics et GTM après acceptation
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
      })
    }
  }

  const declineCookies = () => {
    Cookies.set('cookie-consent', 'declined', { expires: 365 })
    setShowBanner(false)
    // Désactiver Google Analytics et GTM après refus
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied',
      })
    }
  }

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed bottom-8 left-0 right-0 z-50 px-4 mx-auto"
        >
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="relative">
              {/* Accent top border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-dark to-primary-light"></div>
              
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary-DEFAULT/10 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary-DEFAULT">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-text-primary mb-2">Votre vie privée est importante</h3>
                    <p className="text-sm text-text-secondary mb-2">
                      Nous utilisons des cookies pour améliorer votre expérience, analyser le trafic et personnaliser le contenu. 
                      En acceptant, vous nous aidez à optimiser notre site pour vous.
                    </p>
                    <a href="/privacy" className="text-sm font-medium text-primary-DEFAULT hover:text-primary-DEFAULT/80 inline-flex items-center">
                      En savoir plus
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </a>
                  </div>
                  
                  {/* Buttons */}
                  <div className="flex gap-3 w-full md:w-auto">
                    <button
                      onClick={declineCookies}
                      className="flex-1 md:flex-initial px-4 py-2 text-sm font-medium text-text-primary bg-background-surface hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
                    >
                      Refuser
                    </button>
                    <button
                      onClick={acceptCookies}
                      className="flex-1 md:flex-initial px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-dark to-primary-light hover:from-primary-dark/90 hover:to-primary-light/90 rounded-lg transition-colors shadow-sm"
                    >
                      Accepter
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
