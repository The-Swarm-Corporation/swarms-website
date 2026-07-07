import * as React from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export const CONTACT_EMAIL = "notifications@swarms.world"
export const LAST_UPDATED = "July 7, 2026"

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/data-policy", label: "Data Policy" },
]

interface LegalPageProps {
  /** Page title, e.g. "Privacy Policy" */
  title: string
  /** Short one or two sentence summary shown under the title */
  intro: string
  /** The document body — semantic <h2>/<h3>/<p>/<ul> elements */
  children: React.ReactNode
  /** Current pathname so it can be excluded from the cross-links */
  current: string
}

export function LegalPage({ title, intro, children, current }: LegalPageProps) {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
        {/* Hero */}
        <section className="relative px-6 py-24 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-black to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neutral-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_60%,transparent_110%)]" />
          </div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Legal
            </p>
            <h1 className="text-4xl sm:text-5xl font-semibold mb-5 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight leading-[0.95]">
              {title}
            </h1>
            <p className="text-lg text-neutral-300 leading-relaxed font-light">
              {intro}
            </p>
            <p className="mt-6 text-sm text-neutral-500">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24 px-6">
          <div
            className="max-w-3xl mx-auto
              [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-semibold [&_h2]:text-white [&_h2]:tracking-tight [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:scroll-mt-24
              [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-base [&_p]:text-neutral-300 [&_p]:leading-relaxed [&_p]:font-light [&_p]:mb-4
              [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul]:space-y-2
              [&_li]:text-base [&_li]:text-neutral-300 [&_li]:leading-relaxed [&_li]:font-light [&_li]:pl-1
              [&_strong]:text-white [&_strong]:font-medium
              [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-neutral-600 hover:[&_a]:decoration-white
              [&_hr]:border-white/10 [&_hr]:my-12"
          >
            {children}
          </div>

          {/* Cross-links to the other legal documents */}
          <div className="max-w-3xl mx-auto mt-16 pt-10 border-t border-white/10">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-5">
              Related
            </p>
            <div className="flex flex-wrap gap-3">
              {LEGAL_LINKS.filter((l) => l.href !== current).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-900 border border-white/10 text-sm text-neutral-300 hover:text-white hover:border-white/20 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
