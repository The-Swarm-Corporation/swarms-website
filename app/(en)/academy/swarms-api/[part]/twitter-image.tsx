import { courseParts, getPart } from "@/lib/academy/swarms-api-course"
import { renderOgCard, size, contentType } from "@/lib/og/card"
import { ogPages } from "@/lib/og/pages"

export { size, contentType }
export const alt = "The Swarms API Course from Swarms Academy"

export function generateStaticParams() {
  return courseParts.map((part) => ({ part: part.slug }))
}

export default async function Image({ params }: { params: Promise<{ part: string }> }) {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) return renderOgCard(ogPages["/academy/swarms-api"])
  return renderOgCard({
    eyebrow: `The Swarms API Course · Part ${part.part}`,
    title: part.title,
    description: part.tagline,
  })
}
