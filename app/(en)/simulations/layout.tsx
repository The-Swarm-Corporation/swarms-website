import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Swarms Simulations — Large-Scale Multi-Agent Organization Simulation"
const description =
  "Swarms is building large-scale multi-agent infrastructure to simulate organizations with thousands of coordinated agents, from hospitals to enterprises to governments."
const url = "https://swarms.ai/simulations"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms simulations",
    "multi-agent simulation",
    "large scale agent simulation",
    "organization simulation",
    "enterprise simulation ai",
    "agent based modeling",
    "hospital simulation ai",
    "multi-agent coordination",
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

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Simulations", item: url },
  ],
}

export default function SimulationsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
