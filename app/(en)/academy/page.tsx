"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Code, GraduationCap, Layers, Sparkles } from "lucide-react"

import { AcademyHero } from "@/components/academy/academy-hero"
import { CardCarousel } from "@/components/card-carousel"
import { Navigation } from "@/components/navigation"
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
  preview: string[]
  featured?: boolean
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
    preview: [
      "POST /v1/swarm/completions",
      "{",
      '  "swarm_type": "SequentialWorkflow",',
      '  "agents": [ ... ],',
      '  "task": "Research EV batteries"',
      "}",
    ],
    featured: true,
  },
  {
    title: "Swarms Marketplace",
    description:
      "Learn to publish, price, and sell agents and prompts on the open agent marketplace, and how to find production-ready agents built by the community.",
    icon: Sparkles,
    href: "https://swarms.world",
    external: true,
    meta: "swarms.world",
    preview: ["swarms.world", "", "agents    prompts", "tools     bundles", "", "publish · price · sell"],
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
    preview: [
      "$ pip install swarms",
      "",
      "from swarms import Agent",
      "",
      'agent = Agent(model_name="gpt-4.1")',
      'agent.run("Plan a product launch")',
    ],
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
    preview: ["swarms-rs       Rust", "swarms chat     no-code", "simulations", "research papers", "enterprise"],
  },
]

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
        <AcademyHero />

        {/* TRACKS */}
        <section className="border-b border-white/[0.08] bg-black py-16 sm:py-24 lg:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
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
              <h2 className="max-w-3xl text-2xl font-semibold leading-[1.15] tracking-tighter text-white sm:text-3xl">
                Courses for every part of the Swarms stack
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Each track teaches one surface of the Swarms stack, with docs, examples, and
                production patterns.
              </p>
            </motion.div>
          </div>

          <CardCarousel
            label="Learning tracks"
            items={tracks.map((track) => ({
              title: track.title,
              description: track.description,
              icon: track.icon,
              preview: track.preview,
              wide: track.featured,
              meta: track.comingSoon ? "Course coming soon" : track.meta,
              badge: track.comingSoon ? "Coming soon" : undefined,
              href: track.comingSoon ? undefined : track.href,
              external: track.external,
            }))}
          />
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
