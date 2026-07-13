import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import { getGithubStars, formatStarsLong } from "@/lib/github-stars"

const title = "Swarms Framework — The Premier Python Framework for Multi-Agent Systems"
const url = "https://swarms.ai/framework"

export async function generateMetadata(): Promise<Metadata> {
  const stars = await getGithubStars()
  const starsStr = formatStarsLong(stars["kyegomez/swarms"])
  const description =
    `The enterprise-grade Python framework for production multi-agent systems. ${starsStr} GitHub stars, 5M+ downloads, 100+ contributors. 15+ swarm architectures, 1,000+ models, MCP support, RAG, tools, structured outputs and full observability. Apache 2.0.`

  return {
  title: { absolute: title },
  description,
  keywords: [
    "swarms framework",
    "swarms python",
    "swarms",
    "python multi-agent framework",
    "multi-agent framework",
    "multi-agent orchestration",
    "agent orchestration",
    "ai agent framework",
    "production multi-agent",
    "enterprise multi-agent",
    "open source multi-agent",
    "pip install swarms",
    "sequential workflow",
    "concurrent workflow",
    "hierarchical swarm",
    "mixture of agents",
    "group chat agents",
    "agent rearrange",
    "auto swarm builder",
    "majority voting agents",
    "swarms architectures",
    "swarms agents",
    "kyegomez swarms",
    "the swarm corporation",
    "ai agents python",
    "langchain alternative",
    "crewai alternative",
    "autogen alternative",
    "openai agents",
    "anthropic agents",
    "claude agents",
    "gemini agents",
    "mcp python",
    "model context protocol python",
  ],
  alternates: {
    canonical: url,
    languages: {
      en: url,
      "zh-Hans": "https://swarms.ai/zh/framework",
    },
  },
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
        alt: "Swarms Framework — The Premier Python Framework for Multi-Agent Systems",
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
        alt: "Swarms Framework — The Premier Python Framework for Multi-Agent Systems",
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
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: siteConfig.url,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Products",
      item: `${siteConfig.url}/products`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Framework",
      item: url,
    },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is Swarms different from LangChain, CrewAI or AutoGen?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Swarms is built for production multi-agent orchestration, not single-agent chains. It ships 15+ swarm topologies as first-class primitives, supports 1,000+ models out of the box, and is hardened for high-concurrency production workloads.",
      },
    },
    {
      "@type": "Question",
      name: "What does pip install swarms give me?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "The full framework: Agent class, every swarm topology, the model layer, memory, tool integration, structured outputs, MCP support, and telemetry — one package, zero glue code.",
      },
    },
    {
      "@type": "Question",
      name: "Which models can I use with Swarms?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Over 1,000 models from OpenAI, Anthropic, Gemini, Groq, DeepSeek, Cohere, xAI, OpenRouter, Together, Ollama, vLLM, LM Studio, Azure, Bedrock and any OpenAI-compatible endpoint.",
      },
    },
    {
      "@type": "Question",
      name: "Can I run Swarms on my own infrastructure?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. Swarms is a Python library — it runs wherever Python runs: Kubernetes, Docker, bare metal or serverless. The hosted Swarms API offers the same runtime as a managed REST service.",
      },
    },
  ],
}

export default async function FrameworkLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const stars = await getGithubStars()
  const starsStr = formatStarsLong(stars["kyegomez/swarms"])
  const description =
    `The enterprise-grade Python framework for production multi-agent systems. ${starsStr} GitHub stars, 5M+ downloads, 100+ contributors. 15+ swarm architectures, 1,000+ models, MCP support, RAG, tools, structured outputs and full observability. Apache 2.0.`
  const ratingCount = stars["kyegomez/swarms"] ? String(stars["kyegomez/swarms"]) : "7000"

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Swarms",
    alternateName: "Swarms Framework",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    url,
    description,
    image: `${siteConfig.url}/seo_image.jpg`,
    downloadUrl: "https://pypi.org/project/swarms/",
    codeRepository: "https://github.com/kyegomez/swarms",
    programmingLanguage: "Python",
    license: "https://www.apache.org/licenses/LICENSE-2.0",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount,
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Person",
      name: "Kye Gomez",
      url: "https://github.com/kyegomez",
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.company.name,
      url: siteConfig.url,
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
