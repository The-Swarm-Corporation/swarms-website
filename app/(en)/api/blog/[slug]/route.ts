import { NextResponse } from 'next/server'
import { apiError } from '@/lib/api-error'
import { getPostBySlug } from '@/lib/blog'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const post = getPostBySlug(params.slug)
    
    if (!post) {
      return apiError(404, 'not_found', 'Post not found', 'List all posts at /api/blog or browse https://www.swarms.ai/blog.')
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching blog post:', error)
    return apiError(500, 'internal_error', 'Failed to fetch blog post', 'Retry shortly; the post is also readable at /blog/<slug>/markdown.')
  }
} 