"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Code, GraduationCap, Layers, Sparkles } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { academyFaq } from "@/lib/academy/academy-faq"
import { academyJsonLd } from "@/lib/academy/academy-jsonld"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type AcademyTrack = {
  title: string
  description: string
  icon: typeof Code
  href: string
  external: boolean
  meta: string
  comingSoon?: boolean
}

const tracks: AcademyTrack[] = [
  {
    title: "Swarms API",
    description:
      "A four-part course on hosted multi-agent orchestration. Run your first agent, master streaming and tools, compose swarms, and ship to production.",
    icon: Code,
    href: "/academy/swarms-api",
    external: false,
    meta: "4-part course · ~6 hrs",
  },
  {
    title: "Swarms Marketplace",
    description:
      "Learn to publish, price, and sell agents and prompts on the open agent marketplace, and how to find production-ready agents built by the community.",
    icon: Sparkles,
    href: "https://swarms.world",
    external: true,
    meta: "swarms.world",
    comingSoon: true,
  },
  {
    title: "Swarms Framework",
    description:
      "Master the flagship Python framework. Build single agents, then compose them into sequential, concurrent, and hierarchical swarms in pure Python.",
    icon: Layers,
    href: "https://docs.swarms.world",
    external: true,
    meta: "pip install swarms",
    comingSoon: true,
  },
  {
    title: "And More",
    description:
      "Go deeper across the rest of the stack: Swarms RS in Rust, no-code swarms with Swarms Chat, simulations, research papers, and enterprise deployment guides.",
    icon: GraduationCap,
    href: "/products",
    external: false,
    meta: "Full curriculum",
  },
]

function TrackLink({
  track,
  children,
  className,
}: {
  track: AcademyTrack
  children: React.ReactNode
  className?: string
}) {
  if (track.comingSoon) {
    return <div className={className}>{children}</div>
  }
  if (track.external) {
    return (
      <a href={track.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={track.href} className={className}>
      {children}
    </Link>
  )
}

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {academyJsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Learn the multi-agent stack
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3rem, 9vw, 7rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Swarms Academy
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Free, structured courses for every Swarms product. Pick a track and go from
                your first AI agent to production multi-agent systems.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Start learning
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://discord.gg/swarms" target="_blank" rel="noopener noreferrer">
                    Join the community
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TRACKS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              className="mx-auto mb-10 max-w-7xl sm:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Learning tracks
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Four tracks. One agent economy.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Each track teaches one surface of the Swarms stack, with docs, examples, and
                production patterns.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {tracks.map((track) => (
                <TrackLink
                  key={track.title}
                  track={track}
                  className="group flex min-h-[240px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-2">
                    <track.icon
                      className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    {track.comingSoon ? (
                      <span className="rounded-full border border-white/[0.14] bg-white/[0.03] px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                        Coming soon
                      </span>
                    ) : (
                      <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                    )}
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white sm:text-lg">
                      {track.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {track.description}
                    </p>
                    <div className="mt-4 font-mono text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                      {track.comingSoon ? "Course coming soon" : track.meta}
                    </div>
                  </div>
                </TrackLink>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY SWARMS ACADEMY */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Why learn here
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Multi-agent courses built by the team that builds the stack.
              </h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
                {[
                  {
                    title: "Learn by executing, on the real API",
                    body: "Swarms Academy courses embed live API trials directly in the lessons. You run real requests against api.swarms.world from the page, edit the JSON, and read real responses, so the multi-agent concepts stick as working muscle memory rather than theory.",
                  },
                  {
                    title: "The complete multi-agent curriculum",
                    body: "From your first AI agent completion to sequential pipelines, concurrent fan-outs, hierarchical swarms, debate and consensus patterns, and graph workflows, the curriculum covers every orchestration architecture the Swarms API supports, with guidance on choosing between them.",
                  },
                  {
                    title: "Free, structured, and tested",
                    body: "Every course is free with no signup. Parts build on each other in order, each ends with a checkpoint project and a graded quiz, and the material is kept in sync with the official Swarms API documentation.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-black p-6 sm:p-8">
                    <h3 className="mb-3 text-base font-medium text-white sm:text-lg">{item.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                FAQ
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Swarms Academy, answered.
              </h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {academyFaq.map((item) => (
                  <div key={item.question} className="bg-black p-6 sm:p-8">
                    <h3 className="mb-3 text-base font-medium text-white sm:text-lg">
                      {item.question}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
