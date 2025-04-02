'use client'

import { DashboardStats } from '@/components/dashboard/stats'
import { RecentPayments } from '@/components/dashboard/recent-payments'
import { RecentPosts } from '@/components/dashboard/recent-posts'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
      <DashboardStats />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentPosts />
        <RecentPayments />
      </div>
    </div>
  )
}
