import { isValidObjectId } from 'mongoose'
import { notFound } from 'next/navigation'
import dbConnect from './db'
import Post from '@/models/Post'

export async function getPost(id: string) {
  if (!isValidObjectId(id)) {
    notFound()
  }

  await dbConnect()
  const post = await Post.findById(id)

  if (!post) {
    notFound()
  }

  return {
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.featuredImage,
    status: post.status,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  }
}
