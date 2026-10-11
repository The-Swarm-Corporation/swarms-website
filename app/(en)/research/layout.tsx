import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Swarms Research: RouteHub and GraphWorkflow Papers"
const description =
  "Research papers from the Swarms team: RouteHub, a low-overhead SDK-native LLM gateway for agentic workloads, and GraphWorkflow, a compile-once graph execution engine for multi-agent systems."
const url = "https://www.swarms.ai/research"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms research",
    "routehub",
    "routehub paper",
    "llm gateway",
    "graphworkflow",
    "graphworkflow paper",
    "graph execution engine",
    "multi-agent systems",
    "agent orchestration",
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
        alt: title,
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
        alt: title,
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
        "@type": "ScholarlyArticle",
        position: 1,
        name: "RouteHub: A Low-Overhead, SDK-Native LLM Gateway for Agentic Workloads",
        url: "https://github.com/The-Swarm-Corporation/RouteHub/blob/main/docs/routehub.pdf",
      },
      {
        "@type": "ScholarlyArticle",
        position: 2,
        name: "GraphWorkflow: A Low-Overhead Compile-Once Graph Execution Engine for Multi-Agent Systems",
        url: "https://github.com/The-Swarm-Corporation/GraphWorkflow-Paper/blob/main/main.pdf",
      },
    ],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Research", item: url },
  ],
}

export default function ResearchLayout({
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
