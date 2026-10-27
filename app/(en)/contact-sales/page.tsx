import type { Metadata } from "next"
import Link from "next/link"
import { Building2, Cpu, Headset, ShieldCheck } from "lucide-react"

import { siteConfig } from "@/app/metadata"
import { Navigation } from "@/components/navigation"
import { ContactSalesForm } from "@/components/contact-sales-form"
import { CompanyLogoGrid } from "@/components/company-logo-grid"

// Title and description are sized to what Google shows (about 60 and 155
// characters).
const title = "Contact Sales: Deploy Multi-Agent AI at Scale | Swarms"
const description =
  "Talk to the Swarms sales team about deploying AI agents across your organization with Swarms Cloud, the Swarms API, RouteHub, and enterprise options."
const url = `${siteConfig.url}/contact-sales`

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms contact sales",
    "swarms enterprise",
    "swarms sales",
    "enterprise ai agents",
    "multi-agent platform for enterprise",
    "deploy ai agents",
    "on-premise ai agents",
    "swarms cloud enterprise",
    "swarms api pricing",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: "Contact the Swarms sales team", type: "image/jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
    images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: "Contact the Swarms sales team" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
}

const contactJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${url}#webpage`,
      name: title,
      description,
      url,
      inLanguage: "en",
      isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
      about: { "@id": `${siteConfig.url}#organization` },
      mainEntity: {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.company.name,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo.svg`,
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "sales",
            email: "kye@swarms.world",
            url,
            availableLanguage: ["English"],
          },
          {
            "@type": "ContactPoint",
            contactType: "customer support",
            url: "https://swarms.world/support",
            availableLanguage: ["English"],
          },
        ],
      },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Contact Sales", item: url },
      ],
    },
  ],
}

const FEATURES = [
  { icon: ShieldCheck, text: "Enterprise-grade security and data controls" },
  { icon: Cpu, text: "Every major model through one API, with per-agent cost tracking" },
  { icon: Building2, text: "Private and on-premise deployment options" },
  { icon: Headset, text: "Dedicated support from the engineers who build Swarms" },
]

export default function ContactSalesPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd).replace(/</g, "\\u003c") }}
      />
      <Navigation />

      <main id="main-content" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(255,255,255,0.09),transparent_70%)]"
        />

        <div className="container relative mx-auto grid max-w-7xl gap-14 px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
          {/* Pitch */}
          <div className="order-2 lg:order-1">
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tighter sm:text-6xl">
              Contact our
              <br />
              sales team
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/60">
              Get help evaluating and deploying Swarms agents across your organization, from a first prototype to
              production swarms.
            </p>

            <p className="mt-12 text-sm text-white/45">Features</p>
            <ul className="mt-4 space-y-3.5">
              {FEATURES.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-start gap-3 text-base text-white/80">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-white/60" aria-hidden="true" />
                  {text}
                </li>
              ))}
            </ul>

            <p className="mt-14 text-sm text-white/45">Join developers from teams like</p>
            <CompanyLogoGrid count={6} className="mt-6 max-w-md" />
          </div>

          {/* Form */}
          <div className="order-1 lg:order-2 lg:pt-2">
            <ContactSalesForm />
            <p className="mt-8 text-center text-sm text-white/40">
              For other questions, visit{" "}
              <a
                href="https://swarms.world/support"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 underline underline-offset-4 hover:text-white"
              >
                support
              </a>{" "}
              or{" "}
              <Link href="/pricing" className="text-white/60 underline underline-offset-4 hover:text-white">
                see pricing
              </Link>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
