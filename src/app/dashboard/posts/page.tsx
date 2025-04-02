'use client'

import Link from 'next/link'
import { PlusIcon } from '@heroicons/react/24/outline'
import { BlogPostList } from '@/components/dashboard/blog-post-list'

export default function BlogPostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <Link
          href="/dashboard/posts/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon className="h-5 w-5 mr-2" aria-hidden="true" />
          New Post
        </Link>
      </div>
      <BlogPostList />
    </div>
  )
}
