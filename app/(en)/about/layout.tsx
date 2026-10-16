import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

// Title and description are sized to what Google shows (about 60 and 155
// characters). The OG and Twitter images come from opengraph-image.tsx and
// twitter-image.tsx in this folder.
const title = "About Swarms: How the Multi-Agent Framework Started"
const description =
  "Swarms began in 2023 as a research project putting GPT-3 models in a group chat. See how it grew into Swarms Python, Rust, API, Marketplace, and Cloud."
const url = `${siteConfig.url}/about`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "about swarms",
    "swarms ai",
    "swarms corporation",
    "who built swarms",
    "swarms history",
    "swarms founder",
    "multi-agent research",
    "multi-agent framework",
    "swarms python",
    "swarms rust",
    "swarms api",
    "swarms marketplace",
    "swarms cloud",
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

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: title,
  description,
  url,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.company.name,
    description: siteConfig.company.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.svg`,
    foundingDate: siteConfig.company.foundingDate,
    founders: siteConfig.company.founders.map((founder) => ({
      "@type": "Person",
      name: founder.name,
      url: founder.url,
    })),
    sameAs: [
      "https://github.com/kyegomez/swarms",
      "https://github.com/The-Swarm-Corporation",
      "https://x.com/swarms_corp",
      "https://www.linkedin.com/company/swarms-corp/",
    ],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "About", item: url },
  ],
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
