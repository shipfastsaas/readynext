'use client'

import { useState, FormEvent } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log('Tentative de connexion avec:', { email })
      console.log('URL de redirection prévue:', callbackUrl)
      
      const response = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      console.log('Réponse de l\'API:', data)

      if (response.ok) {
        // Authentification réussie
        toast.success('Connexion réussie! Redirection...')
        
        // Utiliser window.location pour une redirection forcée
        setTimeout(() => {
          window.location.href = callbackUrl
        }, 1000)
      } else {
        // Authentification échouée
        toast.error(data.error || 'Identifiants incorrects')
      }
    } catch (error) {
      toast.error('Une erreur est survenue')
      console.error('Erreur lors de la connexion:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex flex-col items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute top-0 -left-4 w-72 h-72 bg-primary-rose/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary-purple/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute -z-10 inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="w-full max-w-md px-6 py-12 relative z-10">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo.png"
              alt="ShipFastStarter Logo"
              width={80}
              height={80}
              className="mx-auto"
            />
          </div>
          
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm text-primary-purple bg-primary-purple/10 rounded-full">
              Administration
            </span>
            <span className="flex items-center text-sm text-text-secondary">
              <span className="w-2 h-2 mr-2 rounded-full bg-green-500 animate-pulse" />
              Sécurisé
            </span>
          </div>
          
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-2">
            Dashboard Admin
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Accès réservé aux administrateurs
          </p>
        </div>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-purple focus:ring-primary-purple sm:text-sm transition-all"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-primary-purple focus:ring-primary-purple sm:text-sm transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full rounded-xl bg-gradient-to-r from-primary-dark to-primary-light py-3.5 px-7 text-center text-sm font-semibold text-white shadow-lg transition-all hover:from-primary-dark/90 hover:to-primary-light/90 focus:outline-none focus:ring-2 focus:ring-primary-dark/50 disabled:opacity-70 overflow-hidden group"
              >
                <span className="absolute inset-0 h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.16)_100%)] opacity-0 transition-opacity group-hover:opacity-100"></span>
                {isLoading ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500">
          Accès réservé aux administrateurs de ShipFastStarter
          <div className="mt-1">
            &copy; {new Date().getFullYear()} ShipFastStarter. Tous droits réservés.
          </div>
        </div>
      </div>
    </section>
  )
}
