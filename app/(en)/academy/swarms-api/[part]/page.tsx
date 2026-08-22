import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { courseParts, getPart } from "@/lib/academy/swarms-api-course"
import { siteConfig } from "@/app/metadata"
import { CoursePartClient } from "./CoursePartClient"

type PageProps = { params: Promise<{ part: string }> }

export function generateStaticParams() {
  return courseParts.map((p) => ({ part: p.slug }))
}

const partKeywords: Record<string, string[]> = {
  foundations: [
    "swarms api quickstart",
    "first ai agent tutorial",
    "agent completions endpoint",
    "swarms api key setup",
    "ai agent api for beginners",
  ],
  "agent-capabilities": [
    "ai agent streaming tutorial",
    "structured outputs llm",
    "llm function calling tutorial",
    "mcp integration tutorial",
    "autonomous ai agent tutorial",
    "openai compatible api",
  ],
  "multi-agent-orchestration": [
    "multi-agent orchestration course",
    "multi-agent orchestration tutorial",
    "sequential workflow agents",
    "concurrent workflow agents",
    "hierarchical swarm tutorial",
    "graph workflow agents",
    "multi-agent architectures",
  ],
  production: [
    "ai agents in production",
    "llm batch processing",
    "api rate limit handling",
    "llm cost optimization",
    "ai agent observability",
    "production llm checklist",
  ],
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) return {}
  const title = `Part ${part.part}: ${part.title} — The Swarms API Course`
  const url = `https://www.swarms.ai/academy/swarms-api/${part.slug}`
  return {
    title: { absolute: title },
    description: part.summary,
    keywords: [
      "swarms api course",
      "swarms academy courses",
      "multi-agent course",
      "learn multi-agent systems",
      ...(partKeywords[part.slug] ?? []),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: part.summary,
      siteName: siteConfig.name,
      images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: part.summary,
      creator: "@swarms_corp",
      site: "@swarms_corp",
    },
  }
}

export default async function CoursePartPage({ params }: PageProps) {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) notFound()

  return <CoursePartClient part={part} slug={slug} />
}