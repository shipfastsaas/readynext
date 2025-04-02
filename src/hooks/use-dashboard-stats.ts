'use client'

import { useEffect, useState } from 'react'

interface DashboardStats {
  totalRevenue: number
  totalPosts: number
  totalUsers: number
  recentPayments: Array<{
    id: string
    amount: number
    status: string
    email: string
    date: string
  }>
  recentPosts: Array<{
    id: string
    title: string
    status: string
    date: string
  }>
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [statsRes, paymentsRes, postsRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/payments?limit=5'),
          fetch('/api/posts?limit=5')
        ])

        const [statsData, paymentsData, postsData] = await Promise.all([
          statsRes.json(),
          paymentsRes.json(),
          postsRes.json()
        ])

        setStats({
          ...statsData,
          recentPayments: paymentsData,
          recentPosts: postsData
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}
