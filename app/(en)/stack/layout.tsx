import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "The Swarms Stack: Build, Deploy, and Monetize AI Agents"
const description =
  "Build agents with Swarms Python and Swarms Rust, deploy them with the Swarms API and Swarms Cloud, and sell them on the Swarms Marketplace. One stack of agent infrastructure, from first line of code to first sale."
const url = "https://www.swarms.ai/stack"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms stack",
    "agent infrastructure",
    "ai agent stack",
    "build ai agents",
    "deploy ai agents",
    "monetize ai agents",
    "sell ai agents",
    "swarms python",
    "swarms rust",
    "swarms-rs",
    "swarms api",
    "swarms cloud",
    "swarms marketplace",
    "multi-agent framework",
    "agent hosting",
    "agent marketplace",
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
        alt: "The Swarms Stack: build, deploy, and monetize AI agents",
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
        alt: "The Swarms Stack: build, deploy, and monetize AI agents",
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

const stackJsonLd = {
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
        description: "The core Python framework for agents and multi-agent systems.",
      },
      {
        "@type": "SoftwareApplication",
        position: 2,
        name: "Swarms Rust",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        url: "https://github.com/The-Swarm-Corporation/swarms-rs",
        description: "A memory-safe Rust framework for agents and multi-agent workflows.",
      },
      {
        "@type": "SoftwareApplication",
        position: 3,
        name: "Swarms API",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Cloud",
        url: "https://www.swarms.ai/api",
        description: "Hosted multi-agent orchestration over REST.",
      },
      {
        "@type": "SoftwareApplication",
        position: 4,
        name: "Swarms Cloud",
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Web",
        url: "https://cloud.swarms.world",
        description: "The control plane for designing, running, tracing, and hosting agents.",
      },
      {
        "@type": "WebSite",
        position: 5,
        name: "Swarms Marketplace",
        url: "https://swarms.world",
        description: "Buy and sell agents, prompts, tools, MCP servers, and skills.",
      },
    ],
  },
}

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackJsonLd) }}
      />
      {children}
    </>
  )
}
