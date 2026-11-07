import type { Metadata } from "next"

import { siteConfig } from "@/app/metadata"
import { industryBySlug, type IndustrySlug } from "@/lib/industries"

// Shared <head> for every industry landing page: one title pattern, the
// registry's description and keywords, and canonical plus social cards.
export function industryMetadata(slug: IndustrySlug): Metadata {
  const industry = industryBySlug(slug)!
  const title = `AI Agents for ${industry.name} | Swarms`
  const url = `${siteConfig.url}/industries/${slug}`
  return {
    title: { absolute: title },
    description: industry.description,
    keywords: [...industry.keywords, "swarms", "multi-agent orchestration", "swarms api", "swarms cloud"],
    alternates: { canonical: url },
    openGraph: {
      title,
      description: industry.description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: industry.description,
    },
  }
}
