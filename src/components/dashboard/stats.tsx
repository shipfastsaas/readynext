'use client'

import { CurrencyDollarIcon, DocumentTextIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { Skeleton } from '@/components/ui/skeleton'
import { formatCurrency } from '@/lib/utils'

export function DashboardStats() {
  const { stats, loading, error } = useDashboardStats()

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4">
        <p className="text-sm text-red-500 dark:text-red-400">
          Error loading dashboard stats: {error}
        </p>
      </div>
    )
  }

  const statsConfig = [
    {
      name: 'Total Revenue',
      value: stats ? formatCurrency(stats.totalRevenue) : '$0',
      icon: CurrencyDollarIcon,
      trend: '+12.5%',
      trendColor: 'text-green-500',
    },
    {
      name: 'Total Posts',
      value: stats && stats.totalPosts !== undefined ? stats.totalPosts.toString() : '0',
      icon: DocumentTextIcon,
      trend: '+4.75%',
      trendColor: 'text-green-500',
    },
    {
      name: 'Total Users',
      value: stats && stats.totalUsers !== undefined ? stats.totalUsers.toString() : '0',
      icon: UsersIcon,
      trend: '+21.2%',
      trendColor: 'text-green-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {statsConfig.map((stat) => (
        <div
          key={stat.name}
          className="group bg-white dark:bg-gray-800 overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-3 bg-primary-50 dark:bg-primary-900/10 rounded-lg group-hover:bg-primary-100 dark:group-hover:bg-primary-900/20 transition-colors duration-200">
                  <stat.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                    {stat.name}
                  </dt>
                  <dd>
                    {loading ? (
                      <Skeleton className="h-7 w-24 mt-1" />
                    ) : (
                      <>
                        <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <p className={`text-sm ${stat.trendColor} flex items-center mt-1`}>
                          <span className="mr-1.5">↑</span>
                          {stat.trend} <span className="ml-1">vs last month</span>
                        </p>
                      </>
                    )}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
