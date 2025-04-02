export default function BlogPage() {
  return (
    <div className="prose prose-slate dark:prose-invert max-w-none">
      <h1>Blog System</h1>
      
      <p className="lead">
        NextReady includes a complete blog system that allows you to create, manage, and publish blog posts with support for internationalization.
      </p>

      <div className="my-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
        <h2 className="mt-0">On this page</h2>
        <ul>
          <li><a href="#overview">Overview</a></li>
          <li><a href="#data-model">Data Model</a></li>
          <li><a href="#blog-api">Blog API</a></li>
          <li><a href="#creating-posts">Creating and Editing Posts</a></li>
          <li><a href="#displaying-posts">Displaying Posts</a></li>
          <li><a href="#internationalization">Internationalization</a></li>
          <li><a href="#customization">Customizing the Blog</a></li>
        </ul>
      </div>

      <section id="overview">
        <h2>Overview</h2>
        <p>
          The blog system in NextReady allows you to create and manage blog posts directly from your application. 
          It supports rich text content, featured images, categories, and is fully integrated with the internationalization system.
        </p>
        
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg my-4">
          <h4 className="text-blue-800 dark:text-blue-200 mt-0 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            Key Features
          </h4>
          <ul className="mb-0">
            <li>MongoDB-based blog storage</li>
            <li>Admin interface for post management</li>
            <li>Multilingual support with next-intl</li>
            <li>SEO-friendly URLs and metadata</li>
            <li>Rich text editor for content creation</li>
            <li>Categories and tags for post organization</li>
            <li>Featured images and thumbnails</li>
          </ul>
        </div>
      </section>

      <section id="data-model">
        <h2>Data Model</h2>
        <p>
          NextReady uses MongoDB to store blog posts. The main data model for the blog system is:
        </p>
        
        <h3>Post Model</h3>
        <pre><code className="language-typescript">{`
// src/models/Post.ts
import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  excerpt: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  published: {
    type: Boolean,
    default: false,
  },
  publishedAt: {
    type: Date,
  },
  category: {
    type: String,
    default: "general",
  },
  tags: [String],
  locale: {
    type: String,
    enum: ["en", "fr", "es", "de"],
    default: "en",
  },
  translations: [
    {
      locale: {
        type: String,
        enum: ["en", "fr", "es", "de"],
      },
      slug: String,
      postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

// Add indexes
postSchema.index({ slug: 1 })
postSchema.index({ author: 1 })
postSchema.index({ category: 1 })
postSchema.index({ tags: 1 })
postSchema.index({ locale: 1 })
postSchema.index({ published: 1, publishedAt: -1 })

const Post = mongoose.models.Post || mongoose.model("Post", postSchema)

export default Post
`}</code></pre>
      </section>

      <section id="blog-api">
        <h2>Blog API</h2>
        <p>
          NextReady includes API routes for managing blog posts.
        </p>
        
        <h3>Blog API Routes</h3>
        <p>
          The following blog API routes are available:
        </p>
        <ul>
          <li><code>/api/posts</code> - Get all posts or create a new post</li>
          <li><code>/api/posts/[id]</code> - Get, update, or delete a specific post</li>
          <li><code>/api/posts/slug/[slug]</code> - Get a post by slug</li>
        </ul>
        
        <h3>Get All Posts</h3>
        <pre><code className="language-typescript">{`
// Example: Get all blog posts
const response = await fetch('/api/posts')
const posts = await response.json()
`}</code></pre>
        
        <h3>Create a New Post</h3>
        <pre><code className="language-typescript">{`
// Example: Create a new blog post
const response = await fetch('/api/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'My New Blog Post',
    content: 'This is the content of my blog post...',
    excerpt: 'A short excerpt for the blog post',
    slug: 'my-new-blog-post',
    coverImage: '/images/blog/my-image.jpg',
    category: 'technology',
    tags: ['nextjs', 'react', 'tutorial'],
    published: true,
    locale: 'en'
  })
})
`}</code></pre>
        
        <h3>Update a Post</h3>
        <pre><code className="language-typescript">{`
// Example: Update a blog post
const response = await fetch('/api/posts/' + postId, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'Updated Title',
    content: 'Updated content...'
    // Include other fields you want to update
  })
})
`}</code></pre>
        
        <h3>Delete a Post</h3>
        <pre><code className="language-typescript">{`
// Example: Delete a blog post
const response = await fetch('/api/posts/' + postId, {
  method: 'DELETE'
})
`}</code></pre>
        
        <h3>Get Post by Slug</h3>
        <pre><code className="language-typescript">{`
// Example: Get a post by slug
const response = await fetch('/api/posts/slug/' + slug)
const post = await response.json()
`}</code></pre>
      </section>

      <section id="creating-posts">
        <h2>Creating and Editing Posts</h2>
        <p>
          NextReady includes an admin interface for creating and editing blog posts.
        </p>
        
        <h3>Post Editor</h3>
        <p>
          The post editor allows you to create and edit blog posts with a rich text editor:
        </p>
        <pre><code className="language-typescript">{`
// Client component
'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { useSession } from "next-auth/react"

// Import rich text editor dynamically to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/RichTextEditor"), {
  ssr: false,
})

export default function PostEditor({ post }: { post?: any }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [title, setTitle] = useState(post?.title || "")
  const [slug, setSlug] = useState(post?.slug || "")
  const [content, setContent] = useState(post?.content || "")
  const [excerpt, setExcerpt] = useState(post?.excerpt || "")
  const [coverImage, setCoverImage] = useState(post?.coverImage || "")
  const [category, setCategory] = useState(post?.category || "general")
  const [tags, setTags] = useState(post?.tags?.join(", ") || "")
  const [published, setPublished] = useState(post?.published || false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    
    try {
      const formData = {
        title,
        slug,
        content,
        excerpt,
        coverImage,
        category,
        tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
        published,
      }
      
      const url = post ? '/api/posts/' + post._id : '/api/posts'
      const method = post ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save post")
      }
      
      const savedPost = await response.json()
      
      // Redirect to the post list or the post itself
      router.push('/admin/blog')
      router.refresh()
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  // Generate slug from title
  const generateSlug = () => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
    setSlug(slug)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => !post && generateSlug()}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>
      
      <div>
        <label htmlFor="slug" className="block text-sm font-medium">
          Slug
        </label>
        <div className="flex mt-1">
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            className="block w-full rounded-md border-gray-300 shadow-sm"
          />
          <button
            type="button"
            onClick={generateSlug}
            className="ml-2 px-3 py-2 bg-gray-200 rounded-md"
          >
            Generate
          </button>
        </div>
      </div>
      
      <div>
        <label htmlFor="content" className="block text-sm font-medium">
          Content
        </label>
        <RichTextEditor
          value={content}
          onChange={setContent}
          className="mt-1"
        />
      </div>
      
      {/* Other form fields... */}
      
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border rounded-md mr-2"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          {loading ? "Saving..." : post ? "Update Post" : "Create Post"}
        </button>
      </div>
    </form>
  )
}`}</code></pre>
      </section>

      <section id="displaying-posts">
        <h2>Displaying Posts</h2>
        <p>
          NextReady provides components and pages for displaying blog posts.
        </p>
        
        <h3>Blog List Page</h3>
        <p>
          The blog list page displays a list of blog posts:
        </p>
        <pre><code className="language-typescript">{`
// src/app/[locale]/blog/page.tsx
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { getPosts } from "@/lib/blog"

export const metadata: Metadata = {
  title: "Blog",
  description: "Latest news and articles",
}

export default async function BlogPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const posts = await getPosts(locale)
  
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article key={post._id} className="border rounded-lg overflow-hidden">
            {post.coverImage && (
              <div className="relative h-48">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={'/blog/' + post.slug}>{post.title}</Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <Link
                  href={'/blog/' + post.slug}
                  className="text-blue-600 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}`}</code></pre>
        
        <h3>Blog Post Page</h3>
        <p>
          The blog post page displays a single blog post:
        </p>
        <pre><code className="language-typescript">{`
// src/app/[locale]/blog/[slug]/page.tsx
import { Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getPost } from "@/lib/blog"

export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const post = await getPost(params.locale, params.slug)
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      images: post.coverImage ? [post.coverImage] : [],
    },
  }
}

async function getPost(locale: string, slug: string) {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_APP_URL + '/api/posts/slug/' + slug + '?locale=' + locale,
      { next: { revalidate: 60 } }
    )
    
    if (!res.ok) {
      return null
    }
    
    return res.json()
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const post = await getPost(params.locale, params.slug)
  
  if (!post) {
    notFound()
  }
  
  return (
    <div className="container mx-auto py-12">
      <article>
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-4">
            <span>
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span className="mx-2">•</span>
            <span>{post.category}</span>
          </div>
          {post.coverImage && (
            <div className="relative h-96 mb-8">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          )}
        </header>
        
        <div className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {post.tags.length > 0 && (
          <div className="mt-8 pt-4 border-t">
            <h3 className="text-lg font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  )
}`}</code></pre>
      </section>

      <section id="internationalization">
        <h2>Internationalization</h2>
        <p>
          The blog system in NextReady is fully integrated with the internationalization system, allowing you to create blog posts in multiple languages.
        </p>
        
        <h3>Creating Multilingual Posts</h3>
        <p>
          You can create posts in different languages and link them together as translations:
        </p>
        <pre><code className="language-typescript">{`
// Example: Link posts as translations
async function linkPostTranslations(postId, translations) {
  try {
    const response = await fetch('/api/posts/' + postId + '/translations', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ translations }),
    })
    
    if (!response.ok) {
      throw new Error('Failed to link translations')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error linking translations:', error)
    throw error
  }
}`}</code></pre>
        
        <h3>Language Switcher for Blog</h3>
        <p>
          The blog includes a language switcher that allows users to switch between available translations:
        </p>
        <pre><code className="language-typescript">{`
// Client component
'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function BlogLanguageSwitcher({ translations }) {
  const pathname = usePathname()
  
  // Extract current locale from pathname
  const currentLocale = pathname.split('/')[1]
  
  return (
    <div className="flex space-x-2 my-4">
      <span className="text-gray-600">Available in:</span>
      {translations.map((translation) => (
        <Link
          key={translation.locale}
          href={'/' + translation.locale + '/blog/' + translation.slug}
          className={
            translation.locale === currentLocale
              ? 'font-bold text-blue-600'
              : 'text-blue-600 hover:underline'
          }
        >
          {translation.locale.toUpperCase()}
        </Link>
      ))}
    </div>
  )
}`}</code></pre>
      </section>

      <section id="customization">
        <h2>Customizing the Blog</h2>
        <p>
          NextReady allows you to customize various aspects of the blog system.
        </p>
        
        <h3>Custom Categories</h3>
        <p>
          You can define custom categories for your blog posts:
        </p>
        <pre><code className="language-typescript">{`
// Example: Define custom categories
const BLOG_CATEGORIES = [
  { id: 'general', name: 'General' },
  { id: 'technology', name: 'Technology' },
  { id: 'business', name: 'Business' },
  { id: 'design', name: 'Design' },
  { id: 'marketing', name: 'Marketing' },
]

// Use in your component
<select
  id="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
>
  {BLOG_CATEGORIES.map((cat) => (
    <option key={cat.id} value={cat.id}>
      {cat.name}
    </option>
  ))}
</select>`}</code></pre>
        
        <h3>Custom Rich Text Editor</h3>
        <p>
          You can customize the rich text editor used for creating blog posts:
        </p>
        <pre><code className="language-typescript">{`
// Custom rich text editor component
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

// Import the editor dynamically to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function CustomRichTextEditor({ value, onChange }) {
  // Ensure we have access to the window object
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return null
  }
  
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }
  
  return <ReactQuill value={value} onChange={onChange} modules={modules} />
}`}</code></pre>
      </section>

      <div className="mt-8 rounded-xl bg-gray-50 dark:bg-gray-900 p-6">
        <h2 className="mt-0">Next Steps</h2>
        <p>
          Now that you understand how the blog system works in NextReady, you can:
        </p>
        <ul>
          <li>Create your first blog post</li>
          <li>Customize the blog appearance to match your brand</li>
          <li>Add additional features like comments or social sharing</li>
          <li>Implement SEO optimizations for your blog posts</li>
          <li>Set up analytics to track blog performance</li>
        </ul>
        
        <div className="flex flex-wrap gap-4 mt-6">
          <a
            href="/docs/internationalization"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Internationalization
          </a>
          <a
            href="/docs/payments"
            className="inline-flex items-center rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Payments
          </a>
        </div>
      </div>
    </div>
  );
}
