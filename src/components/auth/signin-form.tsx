'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'

export function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  // Show error from URL if present
  const error = searchParams.get('error')
  if (error) {
    toast.error(decodeURIComponent(error))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      toast.success('Signed in successfully!')
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error: any) {
      toast.error('Failed to sign in with Google')
    }
  }

  return (
    <div className="space-y-6">
      {/* Social Sign In Options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary hover:bg-white/10 transition-colors duration-200"
        >
          <FaGoogle className="w-5 h-5" />
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300/30"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-text-secondary">Or continue with</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-primary">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-primary">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary-DEFAULT focus:ring-primary-DEFAULT"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link href="#" className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light hover:opacity-80 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-dark to-primary-light hover:from-primary-dark/90 hover:to-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>

        <p className="text-sm text-center text-text-secondary">
          Don't have an account?{' '}
          <Link href="/signup" className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light hover:opacity-80 transition-colors">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
