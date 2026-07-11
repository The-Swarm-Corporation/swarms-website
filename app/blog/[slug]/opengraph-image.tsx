import { getPostBySlug } from "@/lib/blog"
import { renderBlogCard, size, contentType } from "./og-shared"

export { size, contentType }
export const alt = "Swarms Blog"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  return renderBlogCard(post)
}
