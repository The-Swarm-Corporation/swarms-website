import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import { releases } from "@/lib/story"

// Title and description are sized to what Google shows (about 60 and 155
// characters). The OG and Twitter images come from opengraph-image.tsx and
// twitter-image.tsx in this folder.
const title = "The Swarms Story: Timeline of Every Swarms Release"
const description =
  "The Swarms timeline from 2023 to today, with release dates for Swarms Python, Marketplace, Rust, API, Cloud, AgentHQ, and RouteHub."
const url = `${siteConfig.url}/story`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms story",
    "swarms timeline",
    "swarms history",
    "swarms release dates",
    "when was swarms released",
    "swarms python release",
    "swarms marketplace launch",
    "swarms rust release",
    "swarms api launch",
    "swarms cloud launch",
    "agenthq",
    "routehub",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const absolute = (href: string) => (href.startsWith("http") ? href : `${siteConfig.url}${href}`)

// Each release becomes a ListItem; products carry their release date as
// datePublished so search engines can answer "when did X launch".
const storyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  about: {
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.url,
    foundingDate: siteConfig.company.foundingDate,
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Swarms release timeline",
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    numberOfItems: releases.length,
    itemListElement: releases.map((release, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item:
        release.kind === "Product" || release.kind === "Open source"
          ? {
              "@type": "SoftwareApplication",
              name: release.title,
              description: release.description,
              datePublished: release.isoDate,
              applicationCategory: "DeveloperApplication",
              ...(release.href && { url: absolute(release.href) }),
              publisher: { "@type": "Organization", name: siteConfig.company.name },
            }
          : {
              "@type": "CreativeWork",
              name: release.title,
              description: release.description,
              datePublished: release.isoDate,
              ...(release.href && { url: absolute(release.href) }),
            },
    })),
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "About", item: `${siteConfig.url}/about` },
    { "@type": "ListItem", position: 3, name: "Our Story", item: url },
  ],
}

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(storyJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
