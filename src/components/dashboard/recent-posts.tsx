'use client'

import Link from 'next/link'
import { useDashboardStats } from '@/hooks/use-dashboard-stats'
import { Skeleton } from '@/components/ui/skeleton'

export function RecentPosts() {
  const { stats, loading, error } = useDashboardStats()

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 dark:bg-red-900/10 p-4">
        <p className="text-sm text-red-500 dark:text-red-400">
          Error loading recent posts: {error}
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Posts</h3>
          <Link
            href="/dashboard/posts/new"
            className="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Create Post
          </Link>
        </div>
        <div className="mt-6 flow-root">
          <div className="-my-5 divide-y divide-gray-200 dark:divide-gray-700">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="py-5">
                  <div className="flex flex-col space-y-2">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                </div>
              ))
            ) : (
              stats?.recentPosts.map((post) => (
                <div key={post.id} className="py-5">
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/dashboard/posts/${post.id}`}
                        className="block focus:outline-none"
                      >
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
                          {post.title}
                        </p>
                        <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                          {new Date(post.date).toLocaleDateString()}
                        </p>
                      </Link>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.status === 'published'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                        }`}
                      >
                        {post.status}
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
