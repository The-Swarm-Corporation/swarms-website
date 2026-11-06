import { getPostBySlug } from "@/lib/blog"
import { renderBlogCard, size, contentType } from "@/lib/og/blog-card"

export { size, contentType }
export const alt = "Swarms Blog"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return renderBlogCard(getPostBySlug(slug, "en"), "en")
}
