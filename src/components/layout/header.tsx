"use client"

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { MoonIcon, SunIcon, GlobeAltIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const navigation = [
  { name: 'Features', href: '#features' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Français', code: 'fr' },
  { name: 'Español', code: 'es' },
  { name: 'Deutsch', code: 'de' },
]

export function Header() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isScrolled, setIsScrolled] = useState(false)
  const { data: session, status } = useSession()

  // Handle hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return null // Prevent flash of incorrect theme
  }

  return (
    <header className="fixed w-full z-50 px-4 py-3 flex justify-center">
      <div className={`max-w-5xl w-full rounded-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg' 
          : 'bg-gray-900/95 dark:bg-gray-800/95 shadow-md'
      } px-3 py-2 flex items-center justify-between`}>
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="ShipFast"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                isScrolled 
                  ? 'text-text-primary hover:text-primary-light dark:text-white dark:hover:text-primary-light' 
                  : 'text-gray-200 hover:text-primary-light'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`p-2 rounded-full ${
              isScrolled 
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700/50' 
                : 'hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <SunIcon className="h-5 w-5 text-gray-200" />
            ) : (
              <MoonIcon className={`h-5 w-5 ${isScrolled ? 'text-gray-700' : 'text-gray-200'}`} />
            )}
          </button>

          {/* Language selector */}
          <div className="relative group">
            <button className={`p-2 rounded-full ${
              isScrolled 
                ? 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-200' 
                : 'hover:bg-white/10 text-gray-200'
            } flex items-center`}>
              <GlobeAltIcon className="h-5 w-5" />
              <span className="sr-only">Select language</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              {languages.map((lang) => (
                <a
                  key={lang.code}
                  href={`/${lang.code}`}
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {lang.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          {status === 'authenticated' ? (
            <Link
              href="/profile"
              className="rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-primary-dark/20 hover:shadow-lg transition-all duration-200 relative overflow-hidden group flex items-center gap-1.5"
            >
              <UserCircleIcon className="h-4 w-4" />
              <span className="relative z-10">{session?.user?.name || 'Mon compte'}</span>
            </Link>
          ) : (
            <Link
              href="/signin"
              className="rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-primary-dark/20 hover:shadow-lg transition-all duration-200 relative overflow-hidden group flex items-center gap-1.5"
            >
              <ShoppingCartIcon className="h-4 w-4" />
              <span className="relative z-10">Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
