'use client'

import { useEffect, useState } from 'react'
import { formatDate } from '@/lib/utils'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { Toast } from '@/components/ui/toast'
import { ChatBubbleLeftRightIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface Contact {
  _id: string
  name: string
  email: string
  message: string
  status: 'new' | 'read' | 'replied'
  createdAt: string
}

interface FilterState {
  status: string
  search: string
  sortBy: string
  order: string
}

export function ContactList() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    order: 'desc'
  })

  const fetchContacts = async () => {
    try {
      const queryParams = new URLSearchParams()
      if (filters.status !== 'all') queryParams.set('status', filters.status)
      if (filters.search) queryParams.set('search', filters.search)
      queryParams.set('sortBy', filters.sortBy)
      queryParams.set('order', filters.order)

      const response = await fetch(`/api/contact?${queryParams.toString()}`)
      if (!response.ok) {
        throw new Error('Failed to fetch contacts')
      }
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
      showToastMessage('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, newStatus: 'new' | 'read' | 'replied') => {
    try {
      const response = await fetch('/api/contact', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (!response.ok) {
        throw new Error('Failed to update status')
      }

      showToastMessage('Status updated successfully')
      fetchContacts()
    } catch (error) {
      console.error('Error updating status:', error)
      showToastMessage('Failed to update status')
    }
  }

  const showToastMessage = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  useEffect(() => {
    fetchContacts()
  }, [filters])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200"
              />
            </div>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="w-full sm:w-auto rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200"
            >
              <option value="createdAt">Date</option>
              <option value="name">Name</option>
              <option value="status">Status</option>
            </select>
            <select
              value={filters.order}
              onChange={(e) => setFilters({ ...filters, order: e.target.value })}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-4 py-2 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Messages List */}
      {contacts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400">No messages found</p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact) => (
            <div
              key={contact._id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-200 hover:shadow-md ${
                contact.status === 'new'
                  ? 'border-primary-DEFAULT'
                  : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary-DEFAULT/10 flex items-center justify-center">
                      <span className="text-primary-DEFAULT font-semibold text-lg">
                        {contact.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{contact.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{contact.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <time className="text-sm text-gray-500 dark:text-gray-400">
                      {formatDate(contact.createdAt)}
                    </time>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                          contact.status === 'new'
                            ? 'bg-primary-DEFAULT/10 text-primary-DEFAULT'
                            : contact.status === 'read'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        }`}
                      >
                        {contact.status}
                      </span>
                      <select
                        value={contact.status}
                        onChange={(e) => updateStatus(contact._id, e.target.value as 'new' | 'read' | 'replied')}
                        className="text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-2.5 py-1 focus:ring-2 focus:ring-primary-DEFAULT focus:border-transparent transition-all duration-200"
                      >
                        <option value="new">Mark as New</option>
                        <option value="read">Mark as Read</option>
                        <option value="replied">Mark as Replied</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4 pl-14">
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">{contact.message}</p>
                  {contact.status === 'new' && (
                    <div className="mt-4">
                      <button
                        onClick={() => updateStatus(contact._id, 'read')}
                        className="inline-flex items-center text-sm text-primary-DEFAULT hover:text-primary-DEFAULT/80 transition-colors"
                      >
                        <CheckCircleIcon className="w-4 h-4 mr-1" />
                        Mark as Read
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
