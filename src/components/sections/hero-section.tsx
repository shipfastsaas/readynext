import Image from 'next/image'
import { PlayCircleIcon, ArrowRightIcon } from '@heroicons/react/24/solid'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-primary-light/5 to-primary-dark/5" />
        
        {/* Simple grid pattern */}
        <div className="absolute -z-10 inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Elegant accent elements */}
        <div className="absolute top-20 right-1/4 w-64 h-64 bg-primary-dark/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl" />
      </div>

      <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8 lg:py-32">
        {/* Top Badge Section */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <div className="flex -space-x-3">
              <Image 
                src="/avatars/avatar-1.png" 
                alt="User Avatar" 
                width={36} 
                height={36} 
                className="rounded-full border-4 border-primary-rose shadow-lg hover:scale-110 transition-transform z-40"
              />
              <Image 
                src="/avatars/avatar-2.png" 
                alt="User Avatar" 
                width={36} 
                height={36} 
                className="rounded-full border-4 border-primary-purple shadow-lg hover:scale-110 transition-transform z-30"
              />
              <Image 
                src="/avatars/avatar-3.png" 
                alt="User Avatar" 
                width={36} 
                height={36} 
                className="rounded-full border-4 border-blue-400 shadow-lg hover:scale-110 transition-transform z-20"
              />
              <Image 
                src="/avatars/avatar-4.png" 
                alt="User Avatar" 
                width={36} 
                height={36} 
                className="rounded-full border-4 border-green-400 shadow-lg hover:scale-110 transition-transform z-10"
              />
            </div>
            <span className="text-sm font-medium text-text-secondary">Add user testimonials here</span>
          </div>
        </div>
        
        {/* Main Content - Centered Text */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl mb-6">
            <span className="text-from-primary-dark to-primary-light bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">Your Main Headline</span>
            <br />
            <span className="text-from-primary-dark to-primary-light from-primary-dark to-primary-light">Your Secondary Headline</span>
          </h1>

          <p className="text-xl text-text-secondary mb-12 max-w-2xl mx-auto">
            This is the hero section where you should place your main value proposition. Explain what your product does, who it's for, and why they should care. Keep it clear, concise, and compelling.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {/* CTA Button */}
            <a
              href="#pricing"
              className="rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-8 py-4 text-lg font-bold text-white shadow-md shadow-primary-dark/20 hover:shadow-lg transition-all duration-200 relative overflow-hidden group flex items-center gap-3"
            >
              <span className="relative z-10">Primary CTA</span>
              <ArrowRightIcon className="h-5 w-5 relative z-10" />
              <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
            </a>
            
            {/* Demo Button */}
            <a
              href="#demo"
              className="rounded-full bg-white border-2 border-gray-200 dark:bg-gray-800 dark:border-gray-700 px-8 py-4 text-lg font-bold text-text-primary hover:bg-gray-50 dark:hover:bg-gray-700 shadow-md hover:shadow-lg transition-all duration-200 flex items-center gap-3"
            >
              <PlayCircleIcon className="h-6 w-6 text-primary-purple" />
              <span>Secondary CTA</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
            </svg>
            Add a trust badge or special offer here
          </div>
        </div>

        {/* Bottom Image Section */}
        <div className="relative mt-16 mx-auto max-w-6xl">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/features-readynext.png"
              alt="ShipFast Starter Kit"
              width={1200}
              height={600}
              className="w-full h-auto object-cover rounded-2xl"
            />
            
            {/* Feature Badges */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-purple mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
              </svg>
              <span className="text-xs font-medium">Next.js 14</span>
            </div>
            
            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-rose mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                </svg>
                <span className="text-xs font-medium">Authentication</span>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-purple mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                </svg>
                <span className="text-xs font-medium">Payments</span>
              </div>
              
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-primary-rose mr-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                <span className="text-xs font-medium">Email</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Logos Section */}
        <div className="mt-20">
          <div className="text-center mb-8">
            <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider">BUILT WITH THE TOOLS YOU LOVE</h3>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-8">
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/nextjs-icon.svg" 
                  alt="Next.js" 
                  width={40} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Next.js</span>
            </div>
            
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/mongodb-logo.svg" 
                  alt="MongoDB" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">MongoDB</span>
            </div>
            
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/resend-logo.webp" 
                  alt="Resend" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Resend</span>
            </div>

            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/Logo_Google_Analytics.svg.png" 
                  alt="Resend" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Resend</span>
            </div>

            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/Google_Ads_logo.svg.png" 
                  alt="Resend" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Resend</span>
            </div>

            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/Google-Tag-Manager.jpg" 
                  alt="Resend" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Resend</span>
            </div>
            
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/tailwind-css-logo.png" 
                  alt="Tailwind CSS" 
                  width={100} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Tailwind CSS</span>
            </div>
            
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/stripe-logo.gif" 
                  alt="Stripe" 
                  width={80} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Stripe</span>
            </div>
            
            <div className="group relative">
              <div className="h-10 w-auto flex items-center justify-center">
                <Image 
                  src="/logo/Vercel-Logo.jpg" 
                  alt="Vercel" 
                  width={80} 
                  height={40} 
                  className="object-contain h-10 w-auto opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>
              <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Vercel</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
