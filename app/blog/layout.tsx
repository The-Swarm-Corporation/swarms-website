import type { Metadata } from "next"
import { siteConfig } from "../metadata"

export const metadata: Metadata = {
  title: "Blog | Swarms AI - Multi-Agent AI Insights & Tutorials",
  description: "Explore cutting-edge insights, tutorials, and developments in multi-agent AI systems. Stay updated with the latest in AI agent orchestration, enterprise automation, and Swarms framework advancements.",
  keywords: [
    "swarms blog", "AI blog", "multi-agent blog", "AI agents", "enterprise AI", 
    "AI orchestration", "agent collaboration", "AI automation", "AI tutorials",
    "AI insights", "AI development", "AI framework", "AI technology", "machine learning",
    "artificial intelligence", "multi-agent systems", "AI deployment", "AI production"
  ],
  authors: [{ name: "Swarms AI Team" }],
  creator: "Swarms AI",
  publisher: "Swarms AI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
  openGraph: {
    title: "Blog | Swarms AI - Multi-Agent AI Insights & Tutorials",
    description: "Explore cutting-edge insights, tutorials, and developments in multi-agent AI systems. Stay updated with the latest in AI agent orchestration and enterprise automation.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms AI Blog - Multi-Agent AI Insights and Tutorials",
        type: "image/jpeg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Swarms AI - Multi-Agent AI Insights & Tutorials",
    description: "Explore cutting-edge insights, tutorials, and developments in multi-agent AI systems",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms AI Blog - Multi-Agent AI Insights and Tutorials",
      },
    ],
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
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* SEO: Blog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Swarms AI Blog",
            "description": "Explore cutting-edge insights, tutorials, and developments in multi-agent AI systems",
            "url": `${siteConfig.url}/blog`,
            "publisher": {
              "@type": "Organization",
              "name": siteConfig.company.name,
              "url": siteConfig.url,
              "logo": {
                "@type": "ImageObject",
                "url": "/logo.svg"
              },
              "sameAs": [
                "https://github.com/kyegomez/swarms",
                "https://twitter.com/swarms_corp",
                "https://discord.gg/EamjgSaEQf"
              ]
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteConfig.url}/blog`
            },
            "potentialAction": {
              "@type": "ReadAction",
              "target": `${siteConfig.url}/blog`
            },
            "inLanguage": "en-US",
            "isAccessibleForFree": true,
            "accessibilityControl": [
              "fullKeyboardControl",
              "fullMouseControl"
            ],
            "accessibilityFeature": [
              "readingOrder",
              "structuralNavigation",
              "tableOfContents"
            ],
            "accessibilityHazard": "none",
            "accessibilityAPI": "ARIA"
          }),
        }}
      />
      
      {/* SEO: BreadcrumbList structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": siteConfig.url
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Blog",
                "item": `${siteConfig.url}/blog`
              }
            ]
          }),
        }}
      />
      
      {/* SEO: WebSite structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": siteConfig.name,
            "url": siteConfig.url,
            "description": siteConfig.description,
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${siteConfig.url}/blog?search={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          }),
        }}
      />
      
      {children}
    </>
  )
} 