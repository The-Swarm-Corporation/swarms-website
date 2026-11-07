import { ArrowRight, ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { IndustryCta } from "@/components/industries/industry-cta"
import { Navigation } from "@/components/navigation"
import { INDUSTRIES } from "@/lib/industries"

const pillars = [
  {
    title: "Swarms API",
    body: "One POST runs a whole team of agents under a named orchestration pattern and returns structured output with usage.",
    href: "/api",
  },
  {
    title: "Swarms Cloud",
    body: "Every run is logged with each agent's output, tokens, latency and cost, so teams can audit and charge back model spend.",
    href: "https://cloud.swarms.world",
    external: true,
  },
  {
    title: "Python and Rust frameworks",
    body: "The same agents and workflows run in-process when data cannot leave your environment or latency rules out a hosted call.",
    href: "/framework",
  },
]

export default function IndustriesIndexPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main id="main-content">
        <section className="relative overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_30%,black_20%,transparent_100%)]"
          />
          <div className="container relative px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8 lg:pt-36">
            <div className="mx-auto max-w-7xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Industries
              </p>
              <h1 className="mt-6 max-w-4xl font-bold leading-[1.02] tracking-tighter text-white" style={{ fontSize: "clamp(2rem, 3.6vw, 3.25rem)" }}>
                Applications
              </h1>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/55 sm:text-base">
                One page per industry, with the orchestration pattern, a live run diagram, use cases and runnable Swarms API code.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
            <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {INDUSTRIES.map((i) => (
                <Link key={i.slug} href={`/industries/${i.slug}`} className="group relative flex flex-col rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 transition-colors hover:border-white/20 hover:bg-[#0e0e0e]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.03]">
                    <i.icon className="h-5 w-5" style={{ color: i.accent }} aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 text-xl font-semibold tracking-tight text-white">{i.name}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{i.tagline}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/60 transition-colors group-hover:text-white">
                    Explore {i.name.toLowerCase()}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-7xl">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">What every page is built on</p>
              <h2 className="max-w-3xl text-2xl font-semibold leading-[1.15] tracking-tighter text-white sm:text-3xl">The same three pieces under every industry</h2>
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {pillars.map((p) => (
                  <div key={p.title} className="flex flex-col rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{p.body}</p>
                    {p.external ? (
                      <a href={p.href} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white">
                        Learn more
                        <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
                      </a>
                    ) : (
                      <Link href={p.href} className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white">
                        Learn more
                        <ArrowRight className="h-3.5 w-3.5 text-white/40" />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <IndustryCta
          title="Do not see your industry?"
          description="The Swarms API runs any roster of agents under any of its orchestration patterns. Tell us what your team does and we will sketch the swarm with you."
        />
      </main>
    </div>
  )
}
