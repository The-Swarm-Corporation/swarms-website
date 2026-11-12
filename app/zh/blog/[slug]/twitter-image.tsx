import { getPostBySlug } from "@/lib/blog"
import { renderBlogCard, size, contentType } from "@/lib/og/blog-card"

export { size, contentType }
export const alt = "Swarms 博客"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return renderBlogCard(getPostBySlug(slug, "zh"), "zh")
}
