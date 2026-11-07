import type { Metadata } from "next"
import type React from "react"

import { siteConfig } from "@/app/metadata"

const title = "AI Agents by Industry: Finance, Healthcare, Manufacturing and More | Swarms"
const description =
  "Multi-agent AI landing pages for finance, healthcare, life sciences, marketing, construction, manufacturing, legal, insurance, retail, logistics, energy, real estate, education and security, each with live diagrams and runnable Swarms API code."

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "ai agents by industry",
    "multi-agent ai use cases",
    "enterprise ai agents",
    "swarms api examples",
    "industry ai solutions",
    "ai agent orchestration",
  ],
  alternates: { canonical: `${siteConfig.url}/industries` },
  openGraph: { title, description, url: `${siteConfig.url}/industries`, siteName: siteConfig.name, type: "website" },
  twitter: { card: "summary_large_image", title, description },
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
