import { ArrowRight } from "lucide-react"
import Link from "next/link"

import { otherIndustries, type IndustrySlug } from "@/lib/industries"

export function MoreIndustries({ current }: { current: IndustrySlug }) {
  const items = otherIndustries(current, 4)
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold tracking-tighter text-white sm:text-2xl">More industries</h2>
            <Link href="/industries" className="inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-colors hover:text-white">
              All industries
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
            {items.map((i) => (
              <Link key={i.slug} href={`/industries/${i.slug}`} className="group flex flex-col bg-[#0a0a0a] p-5 transition-colors hover:bg-[#0e0e0e]">
                <i.icon className="h-5 w-5" style={{ color: i.accent }} aria-hidden="true" />
                <span className="mt-4 text-base font-semibold text-white">{i.name}</span>
                <span className="mt-1 text-sm leading-relaxed text-white/50">{i.tagline}</span>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-white/50 transition-colors group-hover:text-white">
                  Explore
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
