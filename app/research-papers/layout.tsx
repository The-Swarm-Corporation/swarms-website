import type { Metadata } from "next"
import { siteConfig } from "../metadata"

const title = "Swarms Research Papers — Published Work on Multi-Agent Systems"
const description =
  "Published research papers from The Swarm Corporation covering multi-agent orchestration protocols, dynamic memory allocation, and large-scale agentic simulation."
const url = "https://swarms.ai/research-papers"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms research papers",
    "multi-agent papers",
    "agent orchestration protocol",
    "AOP paper",
    "ModelGrid paper",
    "SenatorAssembly paper",
    "multi-agent simulation research",
    "ai research publications",
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
        name: "ModelGrid: A Quantitative Framework for Dynamic Memory Allocation in Multi-Model Deployment",
        url: "https://github.com/The-Swarm-Corporation/ModelGrid",
      },
      {
        "@type": "ScholarlyArticle",
        position: 2,
        name: "Agent Orchestration Protocol (AOP): A Distributed Framework for Large-Scale Multi-Agent Collaboration",
        url: "https://github.com/The-Swarm-Corporation/AOP-Paper",
      },
      {
        "@type": "ScholarlyArticle",
        position: 3,
        name: "SenatorAssembly: A Multi-Agent Simulation Framework for Modeling US Senate Deliberative Processes",
        url: "https://github.com/The-Swarm-Corporation/SenatorAssembly-Paper",
      },
    ],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Research Papers", item: url },
  ],
}

export default function ResearchPapersLayout({
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
