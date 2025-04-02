'use client'

import { useEffect, useState } from 'react'
import MDEditor from '@uiw/react-md-editor'
import rehypeSanitize from 'rehype-sanitize'

export function MarkdownContent({ content }: { content: string }) {
  const [mounted, setMounted] = useState(false)

  // Nécessaire pour éviter les erreurs d'hydratation avec next.js
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="prose prose-lg dark:prose-invert max-w-none">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div data-color-mode="light" className="markdown-body w-full dark:data-color-mode-dark">
      <MDEditor.Markdown 
        source={content} 
        rehypePlugins={[rehypeSanitize]} 
        style={{ 
          backgroundColor: 'transparent',
          color: 'inherit',
          fontFamily: 'inherit'
        }}
      />
    </div>
  )
}
