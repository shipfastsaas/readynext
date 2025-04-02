'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { formatDate } from '@/lib/utils'

interface Post {
  _id: string
  title: string
  excerpt: string
  content: string
  featuredImage?: string
  status: string
  createdAt: string
  updatedAt: string
}

export function BlogSection() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true)
        setError(null)
        console.log('Fetching posts...')
        
        const response = await fetch('/api/posts', {
          cache: 'no-store',
          next: { revalidate: 0 }
        })
        
        if (!response.ok) {
          throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log(`Fetched ${data.length} posts`)
        
        // Ne récupérer que les articles publiés
        const publishedPosts = data.filter((post: Post) => post.status === 'published')
        console.log(`${publishedPosts.length} published posts`)
        
        setPosts(publishedPosts)
      } catch (error) {
        console.error('Error fetching posts:', error)
        setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de la récupération des articles')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  // État de chargement avec skeleton loader
  if (loading) {
    return (
      <section className="relative py-24 bg-background">
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              <span className="text-black bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">
                Blog
              </span>
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-12">
              Découvrez nos derniers articles et actualités
            </p>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col bg-card rounded-2xl shadow-lg overflow-hidden h-64">
                  <div className="animate-pulse p-6 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  // État d'erreur
  if (error) {
    return (
      <section className="relative py-24 bg-background">
        <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">
                Blog
              </span>
            </h1>
            <div className="mt-12 p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">Erreur</h2>
              <p className="text-red-500 dark:text-red-300">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-primary-purple text-white rounded-md hover:bg-primary-purple/90 transition-colors"
              >
                Réessayer
              </button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Affichage normal des articles
  return (
    <section className="relative py-24 bg-background">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
        <div className="absolute top-0 -left-4 w-96 h-96 bg-primary-rose/30 rounded-full filter blur-3xl opacity-70 animate-pulse" />
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-primary-purple/30 rounded-full filter blur-3xl opacity-70 animate-pulse delay-75" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      <div className="relative px-6 mx-auto max-w-7xl lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-rose to-primary-purple">
              Blog
            </span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Découvrez nos derniers articles et actualités
          </p>
        </div>

        {/* Message si aucun article */}
        {posts.length === 0 ? (
          <div className="text-center p-12 bg-card rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-2">Aucun article disponible pour le moment</h2>
            <p className="text-text-secondary mb-6">Revenez bientôt pour découvrir nos nouveaux contenus!</p>
          </div>
        ) : (
          /* Blog posts grid */
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post._id}
                className="flex flex-col bg-card rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full"
              >
                {post.featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image 
                      src={post.featuredImage} 
                      alt={post.title} 
                      fill 
                      style={{ objectFit: 'cover' }} 
                      className="transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback en cas d'erreur de chargement d'image
                        const target = e.target as HTMLImageElement;
                        target.src = '/img-blog/default-post-image.jpg';
                        console.log('Image error, using fallback');
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-x-4 text-xs mb-4">
                    <time dateTime={post.createdAt} className="text-text-secondary font-medium">
                      {formatDate(post.createdAt)}
                    </time>
                  </div>
                  <div className="group relative">
                    <h3 className="text-xl font-semibold leading-6 text-card-foreground group-hover:text-primary-purple transition-colors duration-200">
                      <Link href={`/blog/${post._id}`}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-text-secondary line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Link 
                      href={`/blog/${post._id}`}
                      className="text-sm font-medium text-primary-purple hover:text-primary-rose transition-colors duration-200"
                    >
                      Lire l'article →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
