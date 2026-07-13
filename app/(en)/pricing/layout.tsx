import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Pricing — Free, Pro, Premium, and Enterprise"
const description =
  "Transparent pricing for the Swarms multi-agent platform. Free tier with no card required, Pro at $19.99/month, Premium at $100/month ($1,020/year). Usage-based token pricing across all endpoints. Enterprise and on-premise available."
const url = "https://swarms.ai/pricing"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms pricing",
    "swarms api pricing",
    "multi-agent api pricing",
    "agent api cost",
    "ai api pricing",
    "swarms free tier",
    "swarms pro plan",
    "swarms premium plan",
    "swarms enterprise pricing",
    "swarms on-premise pricing",
    "ai usage based pricing",
    "ai token pricing",
    "agent token costs",
    "mcp call pricing",
    "ai api rate limits",
    "openai pricing alternative",
    "anthropic pricing comparison",
    "enterprise ai pricing",
    "ai subscription plans",
  ],
  alternates: {
    canonical: url,
    languages: {
      en: url,
      "zh-Hans": "https://swarms.ai/zh/pricing",
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
        alt: "Swarms Pricing — Transparent Multi-Agent Platform Pricing",
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
        alt: "Swarms Pricing — Transparent Multi-Agent Platform Pricing",
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
  "@type": "Product",
  name: "Swarms Multi-Agent Platform",
  description,
  url,
  image: `${siteConfig.url}/seo_image.jpg`,
  brand: {
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.url,
  },
  offers: {
    "@type": "AggregateOffer",
    priceCurrency: "USD",
    lowPrice: "0",
    highPrice: "9999",
    offerCount: 5,
    offers: [
      { "@type": "Offer", name: "Free", price: "0", priceCurrency: "USD" },
      { "@type": "Offer", name: "Pro", price: "19.99", priceCurrency: "USD" },
      { "@type": "Offer", name: "Premium (monthly)", price: "100", priceCurrency: "USD" },
      { "@type": "Offer", name: "Premium (annual)", price: "1020", priceCurrency: "USD" },
      { "@type": "Offer", name: "On-Premise", price: "9999", priceCurrency: "USD" },
    ],
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How does usage-based pricing work?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Credits are deducted after each request. Unified pricing: $6.50 per 1M input tokens and $18.50 per 1M output tokens. Additional per-agent, per-MCP-call, per-image, and per-tool costs may apply.",
      },
    },
    {
      "@type": "Question",
      name: "What is the night-time discount?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Swarm Completions receive a 50% discount on token costs during 8 PM – 6 AM Pacific Time. Agent costs remain unchanged. Discounts apply automatically.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between Pro and Premium?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Pro at $19.99/month adds higher rate limits, multi-agent architectures, accelerated hardware, and priority support. Premium at $100/month (or $1,020/year) adds 2,000 req/min, 2M tokens per agent, 500 agents per batch, SOC 2 compliance, and 24/7 support.",
      },
    },
  ],
}

export default function PricingLayout({
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
