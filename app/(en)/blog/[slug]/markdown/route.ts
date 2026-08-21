import { getPostBySlug, formatPostMarkdown } from '@/lib/blog'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return new Response(
      '# Post not found\n\nNo blog post exists at this slug. Browse the index at https://www.swarms.ai/blog or the sitemap at https://www.swarms.ai/sitemap.xml.\n',
      {
        status: 404,
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
      },
    )
  }

  return new Response(formatPostMarkdown(post), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      // This URL doubles as the Accept-negotiated variant of /blog/<slug>
      // (see proxy.ts), so caches must key on the Accept header.
      'Vary': 'Accept, Accept-Encoding',
    },
  })
}
