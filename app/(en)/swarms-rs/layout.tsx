import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import { CRATE_URL, FAQS, REPO_URL, VERSION } from "@/components/swarms-rs/swarms-rs-data"

const title = "Swarms Rust (swarms-rs): The Multi-Agent Framework for Rust"
const description =
  "swarms-rs is the enterprise-grade multi-agent orchestration framework for Rust. 6 ms cold starts, 3.7 MB of memory, any model by name, MCP, and sequential, concurrent, graph and router workflows. Start with cargo add swarms-rs."
const url = `${siteConfig.url}/swarms-rs`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms-rs",
    "swarms rust",
    "rust agent framework",
    "rust ai agents",
    "rust multi-agent framework",
    "multi-agent orchestration rust",
    "rust llm framework",
    "rust mcp client",
    "cargo add swarms-rs",
    "langgraph alternative",
    "crewai alternative",
    "openrouter rust",
    "tokio ai agents",
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

const softwareJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "swarms-rs",
  alternateName: "Swarms Rust",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Any",
  programmingLanguage: "Rust",
  softwareVersion: VERSION,
  license: "https://www.apache.org/licenses/LICENSE-2.0",
  description,
  url,
  downloadUrl: CRATE_URL,
  codeRepository: REPO_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: siteConfig.company.name, url: siteConfig.url },
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
    { "@type": "ListItem", position: 2, name: "Swarms Rust", item: url },
  ],
}

export default function SwarmsRsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
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
