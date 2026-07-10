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
        <div className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
          {/* Hero */}
          <section className="border-b border-white/[0.08] bg-black">
            <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <div className="mx-auto max-w-3xl">
                <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Legal
                </p>
                <h1 className="text-4xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-5xl md:text-6xl">
                  {title}
                </h1>
                <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/60 sm:text-lg">
                  {intro}
                </p>
                <p className="mt-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Last updated: {LAST_UPDATED}
                </p>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="bg-black">
            <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
              <div
                className="mx-auto max-w-3xl
                  [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:border-t [&_h2]:border-white/[0.08] [&_h2]:pt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_h2]:text-white [&_h2]:scroll-mt-24 [&_h2]:sm:text-2xl
                  [&_h2:first-of-type]:mt-0 [&_h2:first-of-type]:border-t-0 [&_h2:first-of-type]:pt-0
                  [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-white
                  [&_p]:mb-4 [&_p]:text-base [&_p]:font-normal [&_p]:leading-relaxed [&_p]:text-white/60
                  [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6
                  [&_li]:pl-1 [&_li]:text-base [&_li]:font-normal [&_li]:leading-relaxed [&_li]:text-white/60
                  [&_strong]:font-medium [&_strong]:text-white
                  [&_a]:text-white [&_a]:underline [&_a]:underline-offset-4 [&_a]:decoration-white/30 [&_a]:transition-colors hover:[&_a]:decoration-white
                  [&_hr]:my-12 [&_hr]:border-white/[0.08]"
              >
                {children}
              </div>

              {/* Cross-links to the other legal documents */}
              <div className="mx-auto mt-16 max-w-3xl border-t border-white/[0.08] pt-10">
                <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Related
                </p>
                <div className="flex flex-wrap gap-3">
                  {LEGAL_LINKS.filter((l) => l.href !== current).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="inline-flex items-center rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/60 transition-colors hover:border-white/30 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
