'use client'

import { useEffect, useState } from 'react'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  duration?: number
  onClose?: () => void
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className={`rounded-lg p-4 ${
        type === 'success' 
          ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-200' 
          : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-200'
      } shadow-lg max-w-md flex items-center gap-2`}>
        {type === 'success' ? (
          <CheckCircleIcon className="h-5 w-5 text-green-400 dark:text-green-300" />
        ) : (
          <XMarkIcon className="h-5 w-5 text-red-400 dark:text-red-300" />
        )}
        <p className="flex-1">{message}</p>
        <button
          onClick={() => {
            setIsVisible(false)
            onClose?.()
          }}
          className="text-gray-400 hover:text-gray-500 dark:text-gray-300 dark:hover:text-gray-200"
        >
          <XMarkIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
