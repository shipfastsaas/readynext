'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FaGoogle } from 'react-icons/fa'
import { toast } from 'sonner'

export function SignUpForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Register user
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error('Failed to sign in')
      }

      toast.success('Account created successfully!')
      router.push('/dashboard')
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast.error('Failed to sign in with Google')
    }
  }

  return (
    <div className="space-y-6">
      {/* Social Sign Up Options */}
      <div className="space-y-4">
        <button
          type="button"
          onClick={handleGoogleSignUp}
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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-text-primary">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-text-primary">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
            />
          </div>
        </div>

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
            minLength={8}
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-white/5 px-4 py-2 text-text-primary shadow-sm focus:border-primary-DEFAULT focus:ring-primary-DEFAULT"
          />
          <p className="mt-1 text-sm text-text-secondary">Must be at least 8 characters</p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary-dark to-primary-light hover:from-primary-dark/90 hover:to-primary-light/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-DEFAULT disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>

        <p className="text-sm text-center text-text-secondary">
          Already have an account?{' '}
          <Link href="/signin" className="bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light hover:opacity-80 transition-colors">
            Sign in
          </Link>
        </p>
      </form>
    </div>
  )
}
