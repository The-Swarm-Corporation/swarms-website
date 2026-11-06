import { renderOgCard, size, contentType } from "@/lib/og/card"
import { ogPages } from "@/lib/og/pages"
import { getPositionBySlug, positions } from "@/lib/positions"

export { size, contentType }
export const alt = "Open role at The Swarms Corporation"

export function generateStaticParams() {
  return positions.map((position) => ({ slug: position.slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const position = getPositionBySlug(slug)
  if (!position) return renderOgCard(ogPages["/hiring"])
  return renderOgCard({
    eyebrow: `Careers · ${position.department}`,
    title: position.title,
    description: `${position.type} · ${position.location}`,
  })
}
