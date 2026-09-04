import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Swarms Marketplace — Buy, Sell & Monetize AI Agents, Prompts, Tools, MCP Servers, and Skills"
const description =
  "Discover, buy, and sell AI agents, prompts, tools, MCP servers, and skills on the Swarms Marketplace at swarms.world. Publish for free, keep 90% of every sale, and choose how you get paid: one-time purchases, tokenized trading fees, or token-gated Vault Mode access. Built on a public API with a self-generating OpenAPI spec."
const url = "https://www.swarms.ai/marketplace"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms marketplace",
    "agent marketplace",
    "AI agent marketplace",
    "buy AI agents",
    "sell AI agents",
    "prompt marketplace",
    "sell prompts",
    "AI tools marketplace",
    "MCP server marketplace",
    "MCP portal",
    "skills marketplace",
    "monetize AI agents",
    "tokenized agents",
    "agent tokenization",
    "vault mode",
    "frenzy mode",
    "swarms.world",
    "marketplace API",
    "openapi marketplace",
    "sell prompts for money",
    "AI agent economy",
    "publish AI agent",
    "AI agent registry",
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
        url: "/marketplace_banner.png",
        width: 1280,
        height: 720,
        alt: "Swarms Marketplace — buy, sell, and monetize AI agents, prompts, tools, MCP servers, and skills",
        type: "image/png",
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
        url: "/marketplace_banner.png",
        width: 1280,
        height: 720,
        alt: "Swarms Marketplace — buy, sell, and monetize AI agents, prompts, tools, MCP servers, and skills",
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

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "AI agent, prompt, and tool marketplace",
  name: "Swarms Marketplace",
  description,
  url: "https://swarms.world",
  provider: {
    "@type": "Organization",
    name: siteConfig.company.name,
    url: siteConfig.url,
  },
  areaServed: "Worldwide",
  audience: {
    "@type": "Audience",
    audienceType: "Developers, AI creators, and enterprises",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Direct sale",
      description:
        "One-time purchase. Sellers keep 90% of every sale; Swarms takes a flat 10% platform fee. Buyers pay by card via Stripe (100+ countries, 100+ currencies) or crypto (SOL). Publishing is free with no listing fee and no minimum reputation required.",
    },
    {
      "@type": "Offer",
      name: "Tokenization",
      description:
        "Launch an agent or prompt as a tradeable token on Solana via a bonding curve. Standard trading fee is 1.0% per trade (0.5% to the creator, 0.5% to the platform); Frenzy Mode doubles it to 2.0% (1.0%/1.0%). No capital required to launch.",
    },
    {
      "@type": "Offer",
      name: "Vault Mode",
      description:
        "Gate access to an agent or prompt behind token ownership instead of a purchase price, aligning a community of holders around ongoing access.",
    },
    {
      "@type": "Offer",
      name: "Free",
      price: "0",
      priceCurrency: "USD",
      description: "Publish agents, prompts, tools, MCP servers, and skills for free with no listing fee.",
    },
  ],
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What can I buy and sell on the Swarms Marketplace?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Agents (executable code with dependencies and environment variables), prompts (text-only instructions, exportable to ChatGPT or Claude), tools (typed Python functions), MCP servers (Model Context Protocol implementations), and skills (Anthropic SKILL.md-format instruction packs). All are browsable and purchasable at swarms.world.",
      },
    },
    {
      "@type": "Question",
      name: "How much does the marketplace take from a sale?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "A flat 10% platform fee on every completed sale. Sellers keep 90%. The fee is identical whether the buyer pays by card or crypto, and there is no listing fee, no subscription tier, and no minimum reputation required to publish a paid listing.",
      },
    },
    {
      "@type": "Question",
      name: "What business models are available to sellers?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Direct one-time sale (90/10 split, paid by card or crypto), tokenization on Solana via a bonding curve with a 1.0% or 2.0% (Frenzy Mode) per-trade fee split with the platform, Vault Mode which gates access behind token ownership instead of a price, and free publishing to build reputation.",
      },
    },
    {
      "@type": "Question",
      name: "Is there a public Marketplace API?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. The marketplace publishes a self-generating OpenAPI 3.1 specification at swarms.world/openapi.json, derived directly from the route code so it cannot drift from what the API accepts. swarms.world/llms.txt catalogs all endpoints by purpose. Read endpoints are public; publishing and account endpoints require an API key.",
      },
    },
  ],
}

export default function MarketplaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {children}
    </>
  )
}
