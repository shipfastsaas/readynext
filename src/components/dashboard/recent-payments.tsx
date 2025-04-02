'use client'

import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { formatCurrency } from '@/lib/utils'
import { Skeleton } from '@/components/ui/skeleton'

export function RecentPayments() {
  const { stats, loading, error } = useDashboardStats()

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4">
        <p className="text-sm text-red-500 dark:text-red-400">
          Error loading recent payments: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Payments</h3>
        <div className="mt-6 flow-root">
          <div className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="py-5">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              stats?.recentPayments.map((payment) => (
                <div key={payment.id} className="py-5">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="relative h-12 w-12">
                        <div className="absolute inset-0 rounded-full bg-primary-100 dark:bg-primary-900/20 flex items-center justify-center">
                          <span className="text-primary-700 dark:text-primary-300 font-medium">
                            {payment.email[0].toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                        {payment.email}
                      </p>
                      <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                        {new Date(payment.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          payment.status === 'succeeded'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}
                      >
                        {formatCurrency(payment.amount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
