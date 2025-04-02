'use client'

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

// Fonction pour suivre les conversions de pages vues
export function useGoogleAdsPageViewConversion() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  useEffect(() => {
    // Vérifier si nous sommes sur la page thank-you
    const isThankYouPage = pathname === '/thank-you' || pathname === '/merci'
    
    if (!isThankYouPage) return
    
    // Attendre que gtag soit disponible
    const checkGtagAndSendConversion = () => {
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        // Envoyer l'événement de conversion avec l'ID spécifique
        (window as any).gtag('event', 'conversion', {
          'send_to': 'AW-16887311626/aaFxCKCerqkaElrav_Q-'
        })
        console.log('Google Ads conversion tracked for page:', pathname)
      } else {
        // Réessayer dans 1 seconde
        setTimeout(checkGtagAndSendConversion, 1000)
      }
    }
    
    // Démarrer la vérification
    checkGtagAndSendConversion()
  }, [pathname, searchParams])
}

export function GoogleAds() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-16887311626"
        strategy="beforeInteractive"
      />
      <Script id="google-ads" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          // Configuration par défaut - consentement requis
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied'
          });
          
          gtag('config', 'AW-16887311626');
        `}
      </Script>
    </>
  )
}
