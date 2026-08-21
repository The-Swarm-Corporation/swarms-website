import { NextResponse } from 'next/server'
import { apiError } from '@/lib/api-error'
import { getAllPosts } from '@/lib/blog'

export async function GET() {
  try {
    const posts = getAllPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return apiError(500, 'internal_error', 'Failed to fetch blog posts', 'Retry shortly; the post index is also served at https://www.swarms.ai/sitemap.xml.')
  }
} 