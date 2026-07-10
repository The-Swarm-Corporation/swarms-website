import type { Metadata } from "next"
import { siteConfig } from "../metadata"

const title = "Swarms API — Multi-Agent Orchestration API"
const description =
  "Production-grade multi-agent orchestration API. 15+ swarm topologies, 1,000+ models (OpenAI, Anthropic, Gemini, Groq), 500+ agents per request, sub-millisecond agent initialization. Free tier available. Built on a Rust runtime for enterprise-grade reliability."
const url = "https://swarms.ai/api"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms api",
    "multi-agent api",
    "agent orchestration api",
    "ai agent api",
    "multi-agent orchestration",
    "swarm completions",
    "agent completions",
    "hierarchical swarm api",
    "concurrent workflow api",
    "sequential workflow api",
    "mixture of agents api",
    "rust agent runtime",
    "openai api alternative",
    "anthropic claude api",
    "gemini api",
    "groq api",
    "mcp protocol",
    "model context protocol",
    "agent streaming",
    "enterprise ai api",
    "production ai infrastructure",
    "ai agent platform",
    "agent sdk",
    "swarms python sdk",
    "swarms typescript sdk",
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
        alt: "Swarms API — Multi-Agent Orchestration Platform",
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
        alt: "Swarms API — Multi-Agent Orchestration Platform",
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

const productJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Swarms API",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cloud",
  description,
  url,
  image: `${siteConfig.url}/seo_image.jpg`,
  brand: {
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.url,
  },
  offers: [
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      url: "https://cloud.swarms.world/api-keys",
      description: "100 requests / minute, 1,200 / day, 200K tokens per agent.",
    },
    {
      "@type": "Offer",
      name: "Pro",
      price: "19.99",
      priceCurrency: "USD",
      url: "https://swarms.world/platform/account?tab=subscription",
      description: "Higher rate limits, priority queue, and email support.",
    },
    {
      "@type": "Offer",
      name: "Premium",
      price: "100",
      priceCurrency: "USD",
      url: "https://swarms.world/platform/account?tab=subscription",
      description: "2,000 req/min, 2M tokens per agent, 500 agents per batch, 24/7 support.",
    },
    {
      "@type": "Offer",
      name: "Enterprise",
      url: "https://cal.com/swarms",
      description: "Custom rate limits, dedicated capacity, on-premise deployment, custom SLAs.",
    },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What makes Swarms different from a single-agent API?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Swarms is the only API purpose-built for orchestrating many agents in one request. You describe the topology, the agents, and the task — the runtime handles routing, memory, retries, and aggregation.",
      },
    },
    {
      "@type": "Question",
      name: "Which models can I use?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "1,000+ models including OpenAI (GPT-4o, o-series), Anthropic (Claude), Google (Gemini), Groq, and many open-weight providers. Each agent in a swarm can use a different model.",
      },
    },
    {
      "@type": "Question",
      name: "Can I start free and upgrade later?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The Free tier covers 100 req/min and 1,200 req/day with no card required. Upgrade to Pro or Premium any time from your platform subscription page — your existing API key is preserved.",
      },
    },
    {
      "@type": "Question",
      name: "Is there an on-premise option?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. On-premise is available under our Enterprise tier with Docker images, source access, unlimited usage, and priority updates — ideal for regulated environments.",
      },
    },
  ],
}

export default function APILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
