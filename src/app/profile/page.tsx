'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { PencilIcon, UserIcon, EnvelopeIcon, LanguageIcon } from '@heroicons/react/24/outline'
import { CheckIcon } from '@heroicons/react/24/solid'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin')
    }
  }, [status, router])
  
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate saving
    setIsEditing(false)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }
  
  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-light mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading...</p>
        </div>
      </div>
    )
  }
  
  if (!session?.user) {
    return null // Don't display anything during redirection
  }
  
  const user = session.user
  const initials = user.name 
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() 
    : user.email?.charAt(0).toUpperCase() || '?'

  return (
    <div className="container max-w-6xl mx-auto px-4 py-10">
      {/* Profile page header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">User Profile</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your personal information and preferences</p>
      </div>
      
      {/* Success notification */}
      {saveSuccess && (
        <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center text-green-700 dark:text-green-400">
          <CheckIcon className="h-5 w-5 mr-2" />
          <span>Your changes have been saved successfully!</span>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main profile card */}
        <div className="md:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your personal information and how we can contact you
                </p>
              </div>
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="flex items-center gap-1.5 text-sm font-medium text-primary-light hover:text-primary-dark transition-colors"
              >
                <PencilIcon className="h-4 w-4" />
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <UserIcon className="h-4 w-4" />
                    Full Name
                  </label>
                  <input 
                    id="name" 
                    defaultValue={user.name || ''} 
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 rounded-lg border ${
                      isEditing 
                        ? 'border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/20' 
                        : 'border-gray-200 bg-gray-50'
                    } dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors`}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <EnvelopeIcon className="h-4 w-4" />
                    Email Address
                  </label>
                  <input 
                    id="email" 
                    type="email" 
                    defaultValue={user.email || ''} 
                    readOnly 
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="language" className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  <LanguageIcon className="h-4 w-4" />
                  Preferred Language
                </label>
                <select
                  id="language"
                  disabled={!isEditing}
                  defaultValue="en"
                  className={`w-full px-4 py-2.5 rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/20' 
                      : 'border-gray-200 bg-gray-50'
                  } dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors`}
                >
                  <option value="en">English</option>
                  <option value="fr">French</option>
                  <option value="es">Spanish</option>
                  <option value="de">German</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Biography
                </label>
                <textarea 
                  id="bio" 
                  disabled={!isEditing}
                  className={`w-full min-h-[120px] p-4 rounded-lg border ${
                    isEditing 
                      ? 'border-gray-300 focus:border-primary-light focus:ring-2 focus:ring-primary-light/20' 
                      : 'border-gray-200 bg-gray-50'
                  } dark:border-gray-600 dark:bg-gray-700 dark:text-white transition-colors`}
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
              
              {isEditing && (
                <button 
                  type="submit" 
                  className="rounded-full bg-gradient-to-r from-primary-dark to-primary-light px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-primary-dark/20 hover:shadow-lg transition-all duration-200 relative overflow-hidden"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>
        </div>
        
        {/* Secondary profile card */}
        <div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Your Profile</h2>
            
            <div className="flex flex-col items-center space-y-5">
              <div className="relative group">
                <div className="relative w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-primary-light to-primary-dark flex items-center justify-center">
                  {user.image ? (
                    <Image 
                      src={user.image} 
                      alt={user.name || 'Avatar'} 
                      width={112}
                      height={112}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-semibold text-white">{initials}</span>
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white dark:bg-gray-700 rounded-full p-2 shadow-md border border-gray-200 dark:border-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <PencilIcon className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              
              <div className="text-center">
                <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{user.name || 'User'}</h3>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              
              <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Member since</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">April 2023</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Status</span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              
              <button 
                onClick={() => signOut({ callbackUrl: '/' })}
                className="w-full py-2.5 px-4 rounded-lg border border-orange-200 dark:border-orange-900/50 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors text-sm font-medium text-left"
              >
                Sign Out
              </button>
              <button className="w-full py-2.5 px-4 rounded-lg border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-sm font-medium text-left">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
