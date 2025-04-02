export default function StylingPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Styling & Theming</h1>
      
      <p>
        NextReady provides a powerful and flexible styling system based on Tailwind CSS, 
        with built-in support for dark mode and customization. This guide explains how to 
        use and customize the styling in your application.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>Tailwind CSS integration</li>
          <li>Dark mode support via next-themes</li>
          <li>Custom color schemes</li>
          <li>Responsive design utilities</li>
          <li>Component-based styling</li>
          <li>CSS variables for theme customization</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="tailwind">Tailwind CSS Integration</h2>
        
        <p>
          NextReady uses Tailwind CSS for styling, providing utility classes for rapid development:
        </p>

        <h3>Configuration</h3>
        <p>
          The Tailwind configuration is defined in <code>tailwind.config.js</code>:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
          950: 'var(--primary-950)',
        },
        secondary: {
          50: 'var(--secondary-50)',
          // ... other shades
          950: 'var(--secondary-950)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}`}
          </code>
        </pre>

        <h3>CSS Variables</h3>
        <p>
          Theme colors are defined using CSS variables in <code>globals.css</code>:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`/* src/app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Light mode colors */
    --primary-50: #f0f9ff;
    --primary-100: #e0f2fe;
    --primary-200: #bae6fd;
    --primary-300: #7dd3fc;
    --primary-400: #38bdf8;
    --primary-500: #0ea5e9;
    --primary-600: #0284c7;
    --primary-700: #0369a1;
    --primary-800: #075985;
    --primary-900: #0c4a6e;
    --primary-950: #082f49;
    
    /* Secondary colors */
    --secondary-500: #8b5cf6;
    /* ... other secondary shades */
    
    /* Background colors */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
  }

  .dark {
    /* Dark mode colors */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    
    /* Dark mode primary colors */
    --primary-50: #082f49;
    --primary-100: #0c4a6e;
    --primary-200: #075985;
    --primary-300: #0369a1;
    --primary-400: #0284c7;
    --primary-500: #0ea5e9;
    --primary-600: #38bdf8;
    --primary-700: #7dd3fc;
    --primary-800: #bae6fd;
    --primary-900: #e0f2fe;
    --primary-950: #f0f9ff;
    
    /* Dark mode secondary colors */
    --secondary-500: #a78bfa;
    /* ... other secondary shades */
  }
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="dark-mode">Dark Mode</h2>
        
        <p>
          NextReady includes a complete dark mode implementation using next-themes:
        </p>

        <h3>Theme Provider</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/providers/theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}`}
          </code>
        </pre>

        <h3>Theme Switcher</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/theme-switcher.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon, ComputerDesktopIcon } from '@heroicons/react/24/outline'

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="flex items-center space-x-2 rounded-md border p-1">
      <button
        onClick={() => setTheme('light')}
        className={\`p-1.5 rounded-md \${
          theme === 'light' ? 'bg-primary-100 text-primary-800' : 'text-gray-500'
        }\`}
        aria-label="Light mode"
      >
        <SunIcon className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('dark')}
        className={\`p-1.5 rounded-md \${
          theme === 'dark' ? 'bg-primary-100 text-primary-800' : 'text-gray-500'
        }\`}
        aria-label="Dark mode"
      >
        <MoonIcon className="h-5 w-5" />
      </button>
      
      <button
        onClick={() => setTheme('system')}
        className={\`p-1.5 rounded-md \${
          theme === 'system' ? 'bg-primary-100 text-primary-800' : 'text-gray-500'
        }\`}
        aria-label="System preference"
      >
        <ComputerDesktopIcon className="h-5 w-5" />
      </button>
    </div>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="components">Component-Based Styling</h2>
        
        <p>
          NextReady uses a component-based approach to styling, with reusable UI components:
        </p>

        <h3>Button Component</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/ui/button.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary-600 text-white hover:bg-primary-700',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary-600',
      },
      size: {
        default: 'h-10 py-2 px-4',
        sm: 'h-9 px-3 rounded-md',
        lg: 'h-11 px-8 rounded-md',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }`}
          </code>
        </pre>

        <h3>Card Component</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/ui/card.tsx
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
))
Card.displayName = 'Card'

const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      'text-2xl font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
))
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
))
CardFooter.displayName = 'CardFooter'

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing the Theme</h2>
        
        <h3>Changing the Color Scheme</h3>
        <p>
          To customize the color scheme, modify the CSS variables in <code>globals.css</code>:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`/* src/app/globals.css */
@layer base {
  :root {
    /* Change primary color to purple */
    --primary-50: #faf5ff;
    --primary-100: #f3e8ff;
    --primary-200: #e9d5ff;
    --primary-300: #d8b4fe;
    --primary-400: #c084fc;
    --primary-500: #a855f7;
    --primary-600: #9333ea;
    --primary-700: #7e22ce;
    --primary-800: #6b21a8;
    --primary-900: #581c87;
    --primary-950: #3b0764;
    
    /* Change secondary color to teal */
    --secondary-50: #f0fdfa;
    --secondary-100: #ccfbf1;
    --secondary-200: #99f6e4;
    --secondary-300: #5eead4;
    --secondary-400: #2dd4bf;
    --secondary-500: #14b8a6;
    --secondary-600: #0d9488;
    --secondary-700: #0f766e;
    --secondary-800: #115e59;
    --secondary-900: #134e4a;
    --secondary-950: #042f2e;
  }
}`}
          </code>
        </pre>

        <h3>Adding Custom Fonts</h3>
        <p>
          NextReady uses Next.js font optimization. To change fonts:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/layout.tsx
import { Inter, Poppins } from 'next/font/google'

// Define fonts
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={\`\${inter.variable} \${poppins.variable}\`}>
      <body>{children}</body>
    </html>
  )
}`}
          </code>
        </pre>

        <p>
          Then update the Tailwind configuration:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        heading: ['var(--font-poppins)', 'sans-serif'],
      },
    },
  },
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="responsive">Responsive Design</h2>
        
        <p>
          NextReady is fully responsive using Tailwind's breakpoint system:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Tailwind's default breakpoints
// sm: 640px
// md: 768px
// lg: 1024px
// xl: 1280px
// 2xl: 1536px

// Example of responsive design
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Content */}
</div>`}
          </code>
        </pre>

        <h3>Custom Breakpoints</h3>
        <p>
          To add custom breakpoints, modify the Tailwind configuration:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="utilities">Custom Utilities</h2>
        
        <p>
          NextReady includes utility functions for class name management:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Usage
import { cn } from '@/lib/utils'

function MyComponent({ className }) {
  return (
    <div className={cn(
      'base-styles',
      condition && 'conditional-styles',
      className
    )}>
      {/* Content */}
    </div>
  )
}`}
          </code>
        </pre>

        <h3>Custom Tailwind Plugins</h3>
        <p>
          You can extend Tailwind with custom plugins:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// tailwind.config.js
const plugin = require('tailwindcss/plugin')

module.exports = {
  // ...
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // Custom plugin example
    plugin(function({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-sm': {
          textShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
        },
        '.text-shadow': {
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-lg': {
          textShadow: '0 4px 6px rgba(0, 0, 0, 0.15)',
        },
      }
      addUtilities(newUtilities)
    }),
  ],
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Styling Best Practices</h2>
        
        <ul>
          <li>
            <strong>Use Tailwind Classes:</strong> Leverage Tailwind's utility classes for consistent styling.
          </li>
          <li>
            <strong>Component Abstraction:</strong> Create reusable UI components for common elements.
          </li>
          <li>
            <strong>CSS Variables:</strong> Use CSS variables for theme customization.
          </li>
          <li>
            <strong>Mobile-First Approach:</strong> Design for mobile first, then enhance for larger screens.
          </li>
          <li>
            <strong>Dark Mode Compatibility:</strong> Ensure all components work well in both light and dark modes.
          </li>
          <li>
            <strong>Accessibility:</strong> Maintain sufficient color contrast and focus states.
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After customizing your application's styling, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/dark-mode" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Learn more about dark mode implementation
            </a>
          </li>
          <li>
            <a href="/docs/internationalization" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Set up internationalization
            </a>
          </li>
          <li>
            <a href="/docs/deployment" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Deploy your styled application
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
