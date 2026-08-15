import type { Metadata, Viewport } from "next"
import { siteConfig } from "@/app/metadata"

const title = "AgentHQ — Join the Waitlist"
const description =
  "Join the waitlist for AgentHQ by Swarms: build your own headquarters of AI agents, hire them, assign research, and grow your operation."
const url = "https://www.swarms.ai/agenthq"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
}

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "agenthq",
    "agent hq",
    "swarms agenthq",
    "agenthq waitlist",
    "ai agent simulation",
    "ai agent company game",
    "multi-agent ai",
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
        url: "/agent_hq_bg_white.png",
        width: 1280,
        height: 720,
        alt: title,
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
        url: "/agent_hq_bg_white.png",
        width: 1280,
        height: 720,
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
    { "@type": "ListItem", position: 2, name: "AgentHQ", item: url },
  ],
}

export default function AgentHQLayout({
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
