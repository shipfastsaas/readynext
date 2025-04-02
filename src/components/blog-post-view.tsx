'use client'

import { formatDate } from '@/lib/utils'
import { MarkdownContent } from '@/components/markdown-content'
import Image from 'next/image'

interface BlogPostViewProps {
  post: {
    title: string
    content: string
    excerpt: string
    featuredImage?: string
    createdAt: string
    updatedAt: string
  }
}

export function BlogPostView({ post }: BlogPostViewProps) {
  return (
    <section className="relative py-24 bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-light/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-dark/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <article className="relative px-6 mx-auto max-w-4xl lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-dark to-primary-light">
            {post.title}
          </h1>
          <time dateTime={post.createdAt} className="text-text-secondary">
            {formatDate(post.createdAt)}
          </time>
        </div>
        
        {post.featuredImage && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <Image 
              src={post.featuredImage} 
              alt={post.title}
              width={1200}
              height={600}
              className="w-full h-auto max-h-[600px] object-contain transition-transform duration-300"
              priority
              onError={(e) => {
                // Fallback en cas d'erreur de chargement d'image
                const target = e.target as HTMLImageElement;
                target.src = '/img-blog/default-post-image.jpg';
              }}
            />
          </div>
        )}
        
        {post.excerpt && (
          <div className="mb-8 p-6 bg-card rounded-xl border border-border">
            <h2 className="text-xl font-semibold mb-2">Summary</h2>
            <p className="text-text-secondary">{post.excerpt}</p>
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <MarkdownContent content={post.content} />
        </div>
      </article>
    </section>
  )
}
