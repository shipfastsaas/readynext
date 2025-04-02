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
}
