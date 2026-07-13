import type { Metadata } from "next"
import type React from "react"
import { siteConfig, zhSiteConfig } from "@/app/metadata"
import { montserrat, orbitron } from "@/app/fonts"
import "../globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Footer } from "@/components/footer"
import { NewsletterPopupProvider } from "@/components/newsletter-popup-provider"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: zhSiteConfig.name,
    template: `%s | Swarms AI`,
  },
  description: zhSiteConfig.description,
  keywords: zhSiteConfig.keywords,
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
    locale: "zh_CN",
    url: zhSiteConfig.url,
    title: zhSiteConfig.name,
    description: zhSiteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: zhSiteConfig.name,
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: zhSiteConfig.name,
    description: zhSiteConfig.description,
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: zhSiteConfig.name,
      },
    ],
    creator: "@swarms_corp",
    site: "@swarms_corp",
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  alternates: {
    canonical: zhSiteConfig.url,
    languages: {
      en: siteConfig.url,
      "zh-Hans": zhSiteConfig.url,
      "x-default": siteConfig.url,
    },
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
  generator: "Next.js",
  category: "technology",
  applicationName: siteConfig.name,
  referrer: "origin-when-cross-origin",
}

interface ZhRootLayoutProps {
  children: React.ReactNode
}

export default function ZhRootLayout({ children }: ZhRootLayoutProps) {
  return (
    <html lang="zh-Hans" suppressHydrationWarning className="smooth-scroll">
      <head>
        <link rel="preconnect" href="https://www.swarms.ai" />
        <link rel="dns-prefetch" href="https://www.swarms.ai" />
        <link rel="preconnect" href="https://docs.swarms.world" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://docs.swarms.world" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={siteConfig.name} />
      </head>
      <body className={`${montserrat.variable} ${orbitron.variable} font-sans antialiased smooth-scroll`}>
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <NewsletterPopupProvider>
            {children}
            <Footer />
          </NewsletterPopupProvider>
        </ThemeProvider>

        <Analytics />

        {/* SEO: Organization structured data (Chinese) */}
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
                  description: zhSiteConfig.description,
                  logo: {
                    "@type": "ImageObject",
                    url: `${siteConfig.url}/logo.svg`,
                    width: 180,
                    height: 180,
                  },
                  sameAs: [siteConfig.links.github, "https://twitter.com/swarms_corp", "https://discord.gg/EamjgSaEQf"],
                },
                {
                  "@type": "WebSite",
                  "@id": `${zhSiteConfig.url}/#website`,
                  url: zhSiteConfig.url,
                  name: zhSiteConfig.name,
                  description: zhSiteConfig.description,
                  inLanguage: "zh-Hans",
                  publisher: {
                    "@id": `${siteConfig.url}/#organization`,
                  },
                },
              ],
            }),
          }}
        />
      </body>
    </html>
  )
}
