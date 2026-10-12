import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Pricing — Free, Pro, Premium, and Enterprise"
const description =
  "Transparent pricing for the Swarms multi-agent platform. Free tier with no card required, Pro at $19.99/month, Premium at $100/month ($1,020/year). Per-model token pricing at each provider's rate plus a 15% service fee. Enterprise and on-premise available."
const url = "https://www.swarms.ai/pricing"

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
    "per-model token pricing",
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
      "zh-Hans": "https://www.swarms.ai/zh/pricing",
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
          "Credits are deducted automatically after each request. Tokens are billed at each model's provider price plus a 15% service fee, and a swarm that mixes models bills each agent at its own model. Flat fees apply on top: $0.01 per agent on swarm, graph and grid workflows, $0.25 per image, and $0.04 per request that enables web search. Free credits are consumed before paid credits.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a specific model cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Its provider's price per 1M tokens plus 15%. GET /v1/models/pricing returns one model's price with the fee included, and GET /v1/models/available lists every model on your plan with its price. A model with no published price data is billed at fallback rates of $6.50 per 1M input and $18.50 per 1M output tokens before the fee.",
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
