export default function DarkModePage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Dark Mode Implementation</h1>
      
      <p>
        NextReady comes with a fully implemented dark mode system that seamlessly integrates with 
        Next.js and Tailwind CSS. This guide explains how the dark mode is implemented and how you 
        can customize it for your application.
      </p>

      <div className="mt-8">
        <h2 id="features">Key Features</h2>
        <ul>
          <li>System preference detection</li>
          <li>Manual toggle between light and dark modes</li>
          <li>Persistent user preference across sessions</li>
          <li>Smooth transitions between themes</li>
          <li>Tailwind CSS integration</li>
          <li>Support for custom color schemes</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="implementation">Implementation Details</h2>
        
        <h3>Dependencies</h3>
        <p>
          The dark mode implementation uses the <code>next-themes</code> library, which provides 
          an easy way to add dark mode support to Next.js applications:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`npm install next-themes`}
          </code>
        </pre>
        
        <h3>Theme Provider</h3>
        <p>
          The core of the dark mode implementation is the ThemeProvider component, which wraps your 
          application and provides theme context:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/providers/theme-provider.tsx
'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

const ThemeProviderContext = createContext({
  theme: 'system' as string,
  setTheme: (theme: string) => {},
})

export function ThemeProvider({
  children,
  ...props
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProviderContext.Provider value={{ theme: theme || 'system', setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}`}
          </code>
        </pre>

        <h3>Application Provider Setup</h3>
        <p>
          The ThemeProvider is integrated into the application through the Providers component:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/app/providers.tsx
'use client'

import * as React from 'react'
import { ThemeProvider } from 'next-themes'
import { SessionProvider } from 'next-auth/react'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}`}
          </code>
        </pre>

        <p>
          The key configuration options for the ThemeProvider are:
        </p>
        <ul>
          <li><code>attribute="class"</code>: Uses CSS classes for theme switching</li>
          <li><code>defaultTheme="system"</code>: Defaults to the system preference</li>
          <li><code>enableSystem</code>: Enables detection of system preference</li>
        </ul>
      </div>

      <div className="mt-8">
        <h2 id="tailwind">Tailwind CSS Configuration</h2>
        
        <p>
          NextReady uses Tailwind CSS for styling, which has built-in support for dark mode. 
          The configuration in <code>tailwind.config.js</code> enables dark mode using the class strategy:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// tailwind.config.js
module.exports = {
  darkMode: 'class',
  // other configuration...
  theme: {
    extend: {
      colors: {
        // Custom colors that support dark mode
        background: {
          DEFAULT: 'var(--background)',
          secondary: 'var(--background-secondary)',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        // other colors...
      },
    },
  },
}`}
          </code>
        </pre>

        <p>
          With this configuration, you can use Tailwind's dark mode variant to apply different styles in dark mode:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`<div className="bg-white dark:bg-gray-900 text-black dark:text-white">
  This element will have a white background and black text in light mode,
  and a dark gray background with white text in dark mode.
</div>`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="theme-toggle">Theme Toggle Component</h2>
        
        <p>
          NextReady includes a theme toggle component that allows users to switch between light and dark modes:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// src/components/theme-toggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-rose dark:focus:ring-offset-gray-900"
      aria-label="Toggle dark mode"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-yellow-300" />
      ) : (
        <MoonIcon className="h-5 w-5 text-gray-700" />
      )}
    </button>
  )
}`}
          </code>
        </pre>

        <p>
          This component can be placed in your layout or navigation to provide users with an easy way to toggle between themes.
        </p>
      </div>

      <div className="mt-8">
        <h2 id="css-variables">CSS Variables for Theme Colors</h2>
        
        <p>
          To provide a consistent color scheme across both light and dark modes, NextReady uses CSS variables 
          defined in the global CSS file:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`/* globals.css */
:root {
  /* Light mode variables */
  --background: #ffffff;
  --background-secondary: #f9fafb;
  --text-primary: #111827;
  --text-secondary: #6b7280;
  /* other variables... */
}

.dark {
  /* Dark mode variables */
  --background: #111827;
  --background-secondary: #1f2937;
  --text-primary: #f9fafb;
  --text-secondary: #d1d5db;
  /* other variables... */
}

/* Use these variables in your Tailwind config */`}
          </code>
        </pre>

        <p>
          These CSS variables are then referenced in the Tailwind configuration, allowing you to use 
          semantic color names that automatically adapt to the current theme.
        </p>
      </div>

      <div className="mt-8">
        <h2 id="usage">Using Dark Mode in Components</h2>
        
        <h3>Accessing Theme in React Components</h3>
        <p>
          You can access the current theme and theme-switching function in any React component:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`'use client'

import { useTheme } from 'next-themes'

export function MyComponent() {
  const { theme, setTheme } = useTheme()
  
  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => setTheme('light')}>Light Mode</button>
      <button onClick={() => setTheme('dark')}>Dark Mode</button>
      <button onClick={() => setTheme('system')}>System Preference</button>
    </div>
  )
}`}
          </code>
        </pre>

        <h3>Conditional Rendering Based on Theme</h3>
        <p>
          You can conditionally render different content based on the current theme:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`'use client'

import { useTheme } from 'next-themes'

export function ThemeAwareComponent() {
  const { resolvedTheme } = useTheme()
  
  return (
    <div>
      {resolvedTheme === 'dark' ? (
        <p>Dark mode content</p>
      ) : (
        <p>Light mode content</p>
      )}
    </div>
  )
}`}
          </code>
        </pre>

        <div className="bg-amber-50 dark:bg-amber-900/30 border-l-4 border-amber-500 p-4 my-4">
          <p className="text-amber-800 dark:text-amber-200">
            <strong>Note:</strong> Use <code>resolvedTheme</code> instead of <code>theme</code> when you need to know the actual theme being applied. This is especially important when the theme is set to 'system', as <code>resolvedTheme</code> will tell you whether the system preference resulted in 'light' or 'dark'.
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h2 id="images">Handling Images in Dark Mode</h2>
        
        <p>
          For images that need different versions in light and dark modes, you can use CSS or conditional rendering:
        </p>

        <h3>CSS Approach</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`/* In your CSS */
.theme-image {
  content: url('/path/to/light-image.png');
}

.dark .theme-image {
  content: url('/path/to/dark-image.png');
}

/* In your JSX */
<img className="theme-image" alt="Theme-aware image" />`}
          </code>
        </pre>

        <h3>React Approach</h3>
        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'

export function ThemeAwareImage() {
  const { resolvedTheme } = useTheme()
  
  return (
    <Image
      src={resolvedTheme === 'dark' 
        ? '/path/to/dark-image.png' 
        : '/path/to/light-image.png'
      }
      alt="Theme-aware image"
      width={200}
      height={200}
    />
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="customization">Customizing the Dark Mode</h2>
        
        <h3>Changing Default Theme</h3>
        <p>
          To change the default theme, update the <code>defaultTheme</code> prop in the ThemeProvider:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`<ThemeProvider
  attribute="class"
  defaultTheme="dark" // Changed from "system" to "dark"
  enableSystem
>
  {children}
</ThemeProvider>`}
          </code>
        </pre>

        <h3>Adding Custom Color Themes</h3>
        <p>
          You can extend the theme system to support more than just light and dark modes:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// 1. Update your ThemeProvider
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  themes={['light', 'dark', 'purple', 'green']} // Add custom themes
>
  {children}
</ThemeProvider>

// 2. Add CSS classes for each theme
/* globals.css */
:root {
  /* Light theme variables */
}

.dark {
  /* Dark theme variables */
}

.purple {
  --background: #f3e8ff;
  --text-primary: #581c87;
  /* other purple theme variables */
}

.green {
  --background: #ecfdf5;
  --text-primary: #064e3b;
  /* other green theme variables */
}`}
          </code>
        </pre>

        <h3>Theme Selector Component</h3>
        <p>
          For multiple themes, you can create a theme selector component:
        </p>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`'use client'

import { useTheme } from 'next-themes'

export function ThemeSelector() {
  const { theme, setTheme } = useTheme()
  
  return (
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="p-2 rounded border border-gray-300 dark:border-gray-700"
    >
      <option value="system">System Preference</option>
      <option value="light">Light Mode</option>
      <option value="dark">Dark Mode</option>
      <option value="purple">Purple Theme</option>
      <option value="green">Green Theme</option>
    </select>
  )
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="best-practices">Best Practices</h2>
        
        <ul>
          <li>
            <strong>Handle Flash of Incorrect Theme:</strong> The mounted state check in the ThemeProvider 
            prevents the flash of incorrect theme on initial load.
          </li>
          <li>
            <strong>Use Semantic Color Names:</strong> Instead of using specific color names like "gray-900", 
            use semantic names like "text-primary" that can adapt to the current theme.
          </li>
          <li>
            <strong>Test Both Themes:</strong> Always test your application in both light and dark modes to 
            ensure good contrast and readability.
          </li>
          <li>
            <strong>Respect User Preference:</strong> Default to the system preference but allow users to 
            override it.
          </li>
          <li>
            <strong>Smooth Transitions:</strong> Add CSS transitions for color changes to make theme switching 
            feel smooth.
          </li>
        </ul>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`/* Add to your CSS for smooth transitions */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="troubleshooting">Troubleshooting</h2>
        
        <h3>Theme Not Applying Correctly</h3>
        <p>
          If the theme is not applying correctly, check the following:
        </p>
        <ul>
          <li>Ensure the ThemeProvider is wrapping your application</li>
          <li>Verify that Tailwind's darkMode is set to 'class' in the configuration</li>
          <li>Check for any CSS that might be overriding your theme styles</li>
          <li>Make sure you're using the dark: variant correctly in your Tailwind classes</li>
        </ul>

        <h3>Flash of Incorrect Theme</h3>
        <p>
          If you're experiencing a flash of incorrect theme on page load:
        </p>
        <ul>
          <li>Ensure you're checking the mounted state before rendering theme-dependent content</li>
          <li>Consider adding a script to the head of your HTML to set the theme class before React hydration</li>
        </ul>

        <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
          <code>
{`// Add this script to your document head
<script dangerouslySetInnerHTML={{ __html: \`
  (function() {
    try {
      const theme = localStorage.getItem('theme') || 'system';
      
      if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })()
\` }} />`}
          </code>
        </pre>
      </div>

      <div className="mt-8">
        <h2 id="next-steps">Next Steps</h2>
        
        <p>
          After implementing dark mode, consider these next steps:
        </p>

        <ul>
          <li>
            <a href="/docs/admin-dashboard" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Apply dark mode to your admin dashboard
            </a>
          </li>
          <li>
            <a href="/docs/contact-management" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Implement contact management with dark mode support
            </a>
          </li>
          <li>
            <a href="/docs/seo" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              Optimize your site for SEO
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}
