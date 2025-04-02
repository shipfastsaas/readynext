"use client"

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'

interface ComparisonItem {
  feature: string
  shipFast: boolean
  competitors: boolean
}

export function UniqueValueSection() {
  const { resolvedTheme } = useTheme()
  const comparisonItems: ComparisonItem[] = [
    { feature: "Optimized for global deployment", shipFast: true, competitors: false },
    { feature: "Integrated multi-language support", shipFast: true, competitors: false },
    { feature: "International payments", shipFast: true, competitors: true },
    { feature: "GDPR compliance", shipFast: true, competitors: true },
    { feature: "International SEO optimization", shipFast: true, competitors: false },
    { feature: "Multi-language documentation", shipFast: true, competitors: false },
    { feature: "24/7 technical support", shipFast: true, competitors: false },
    { feature: "Regular updates", shipFast: true, competitors: true },
  ]

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-gray-900 dark:text-white">
            Why choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">ShipFastStarter</span>
          </h2>
          <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
            Our starter kit stands out with its global deployment-oriented design, allowing your SaaS to reach an international audience from day one.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Comparison table */}
          <div>
            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <div className="grid grid-cols-3">
                {/* Header */}
                <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center font-medium">
                  Feature
                </div>
                <div className="bg-primary-purple/10 dark:bg-primary-purple/20 p-4 text-center font-medium text-primary-purple dark:text-primary-purple">
                  ShipFastStarter
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center font-medium">
                  Competitors
                </div>
                
                {/* Rows */}
                {comparisonItems.map((item, index) => (
                  <React.Fragment key={`row-${index}`}>
                    <div 
                      className={`p-4 border-t border-gray-200 dark:border-gray-800 ${index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'}`}
                    >
                      {item.feature}
                    </div>
                    <div 
                      className={`p-4 border-t border-gray-200 dark:border-gray-800 text-center ${index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'}`}
                    >
                      {item.shipFast ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 mx-auto">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 mx-auto">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <div 
                      className={`p-4 border-t border-gray-200 dark:border-gray-800 text-center ${index % 2 === 0 ? 'bg-white dark:bg-gray-950' : 'bg-gray-50 dark:bg-gray-900'}`}
                    >
                      {item.competitors ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500 mx-auto">
                          <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-red-500 mx-auto">
                          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right column - Global map illustration */}
          <div className="relative">
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-rose to-primary-purple rounded-lg blur opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl overflow-hidden p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Global Presence</h3>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  ShipFastStarter is designed to help you reach customers worldwide, with features specifically tailored for international deployment.
                </p>
                
                <div className="relative h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Image
                      src="/world-map-dots.jpg"
                      alt="Global presence map"
                      fill
                      className={`object-contain ${resolvedTheme === 'dark' ? 'dark-map-filter' : 'light-map-filter'}`}
                      style={{
                        filter: resolvedTheme === 'dark' ? 'invert(0.8) hue-rotate(180deg) brightness(0.8) contrast(1.2)' : 'brightness(1) contrast(1)',
                        mixBlendMode: resolvedTheme === 'dark' ? 'lighten' : 'normal',
                        opacity: resolvedTheme === 'dark' ? '0.9' : '0.85'
                      }}
                    />
                  </div>
                </div>
                
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary-purple">150+</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Countries</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-purple">20+</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Languages</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary-purple">50+</div>
                    <div className="text-sm text-gray-700 dark:text-gray-300">Currencies</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
