import { getPostBySlug, formatPostMarkdown } from '@/lib/blog'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return new Response('Post not found', { status: 404 })
  }

  return new Response(formatPostMarkdown(post), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
