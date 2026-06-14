import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "../metadata"

const title = "Products — The Complete Multi-Agent Stack"
const description =
  "Swarms Python, Swarms API, Swarms Marketplace, Swarms RS, Swarms Chat, and Enterprise deployments. The complete suite of frameworks, APIs, marketplaces, and infrastructure for building the agent economy."
const url = "https://swarms.ai/products"

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "swarms products",
    "swarms python",
    "swarms api",
    "swarms rust",
    "swarms rs",
    "swarms marketplace",
    "swarms chat",
    "swarms enterprise",
    "multi-agent framework",
    "agent orchestration framework",
    "ai agent platform",
    "python multi-agent",
    "rust multi-agent",
    "no-code ai agents",
    "agent marketplace",
    "agent sdk",
    "swarms sdk",
    "swarms platform",
    "enterprise ai stack",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms Products — The Complete Multi-Agent Stack",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms Products — The Complete Multi-Agent Stack",
      },
    ],
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

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url,
  image: `${siteConfig.url}/seo_image.jpg`,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "SoftwareApplication",
        position: 1,
        name: "Swarms Python",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        url: "https://github.com/kyegomez/swarms",
        description: "Production-grade Python multi-agent orchestration framework.",
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "Swarms API",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cloud",
        url: "https://swarms.ai/api",
        description: "Hosted multi-agent orchestration REST API.",
      },
      {
        "@type": "WebSite",
        position: 3,
        name: "Swarms Marketplace",
        url: "https://swarms.world",
        description: "Open marketplace for agents, prompts, and tools.",
      },
      {
        "@type": "SoftwareApplication",
        position: 4,
        name: "Swarms RS",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        url: "https://github.com/The-Swarm-Corporation/swarms-rs",
        description: "Memory-safe Rust multi-agent framework.",
      },
      {
        "@type": "SoftwareApplication",
        position: 5,
        name: "Swarms Chat",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: "https://swarms.world/platform/chat",
        description: "No-code chat interface for multi-agent swarms.",
      },
    ],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      {children}
    </>
  )
}
