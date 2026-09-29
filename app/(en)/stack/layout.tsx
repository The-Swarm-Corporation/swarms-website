import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import { FAQS } from "@/components/stack/stack-data"

const title = "The Swarms Stack: Build, Deploy, Monitor, and Sell AI Agents"
const description =
  "Build AI agents with Swarms Python and Rust, deploy them with the Swarms API, monitor them in Swarms Cloud, and sell them on the Swarms Marketplace."
const url = "https://www.swarms.ai/stack"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms stack",
    "ai agent infrastructure",
    "agent infrastructure",
    "ai agent platform",
    "build ai agents",
    "deploy ai agents",
    "monetize ai agents",
    "sell ai agents",
    "multi-agent framework",
    "multi-agent orchestration",
    "multi-agent systems",
    "python ai agents",
    "rust ai agents",
    "ai agent framework",
    "ai agent api",
    "agent deployment",
    "monitor ai agents",
    "ai agent monitoring",
    "ai agent observability",
    "agent telemetry",
    "llm observability",
    "agent logs",
    "token usage tracking",
    "agent marketplace",
    "sell prompts",
    "mcp servers",
    "swarms python",
    "swarms rust",
    "swarms-rs",
    "swarms api",
    "swarms cloud",
    "swarms marketplace",
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
        description: "Monitoring and telemetry for AI agents: logs, tokens, cost, and context use for every run.",
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

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "The Swarms Stack", item: url },
  ],
}

export default function StackLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stackJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
