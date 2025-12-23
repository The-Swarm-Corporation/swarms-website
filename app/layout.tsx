/**
 * SEO & Favicon improvements
 * - Use /logo.svg for favicon and all icon fields
 * - Use /backend.jpg for Open Graph and Twitter images
 * - Add high-performance SEO best practices
 */

import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { siteConfig } from "./metadata"
import "./globals.css"
import type React from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { NewsletterPopupProvider } from "@/components/newsletter-popup-provider"
import { Analytics } from "@vercel/analytics/next"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.company.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.company.name,
  publisher: siteConfig.company.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/backend.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms AI - Enterprise Multi-Agent Framework",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/backend.jpg"],
    creator: "@swarms_corp",
    site: "@swarms_corp",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
  alternates: {
    canonical: siteConfig.url,
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
  generator: 'v0.dev',
  category: 'technology',
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className="smooth-scroll">
      <head>
        {/* Performance: help the browser establish early connections to frequently used origins */}
        <link rel="preconnect" href="https://www.swarms.ai" />
        <link rel="dns-prefetch" href="https://www.swarms.ai" />
        <link rel="preconnect" href="https://docs.swarms.world" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://docs.swarms.world" />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased smooth-scroll`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <NewsletterPopupProvider>
            {children}
            <Footer />
          </NewsletterPopupProvider>
        </ThemeProvider>

        <Analytics />

        {/* SEO: Organization, Website, and Application structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${siteConfig.url}/#organization`,
                  name: siteConfig.company.name,
                  url: siteConfig.url,
                  description: siteConfig.company.description,
                  logo: "/logo.svg",
                  foundingDate: siteConfig.company.foundingDate,
                  founder: {
                    "@type": "Person",
                    name: siteConfig.company.founders[0].name,
                    url: siteConfig.company.founders[0].url,
                  },
                  address: {
                    "@type": "PostalAddress",
                    addressCountry: siteConfig.company.address.addressCountry,
                  },
                  sameAs: [siteConfig.links.github, "https://twitter.com/swarms_corp", "https://discord.gg/EamjgSaEQf"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${siteConfig.url}/#website`,
                  url: siteConfig.url,
                  name: siteConfig.name,
                  description: siteConfig.description,
                  publisher: {
                    "@id": `${siteConfig.url}/#organization`,
                  },
                },
                {
                  "@type": "SoftwareApplication",
                  name: siteConfig.name,
                  description: siteConfig.description,
                  applicationCategory: "DeveloperApplication",
                  operatingSystem: "Any",
                  offers: {
                    "@type": "Offer",
                    price: "0",
                    priceCurrency: "USD",
                  },
                  author: {
                    "@id": `${siteConfig.url}/#organization`,
                  },
                  keywords: siteConfig.keywords.join(", "),
                  image: "/backend.jpg",
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
