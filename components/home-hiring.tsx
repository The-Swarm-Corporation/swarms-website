"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { getPositionBySlug, Position } from "@/lib/positions"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const FEATURED_ROLE_SLUGS = [
  "head-of-multi-agent-research",
  "front-end-engineer",
  "growth-marketers",
  "head-of-marketplace",
]

const featuredPositions = FEATURED_ROLE_SLUGS
  .map(getPositionBySlug)
  .filter((p): p is Position => Boolean(p))

export function HomeHiring() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto mb-10 flex max-w-7xl flex-col items-start justify-between gap-6 sm:mb-14 md:flex-row md:items-end"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <div>
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              We&apos;re Hiring
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Build autonomous corporations with us.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              We&apos;re hiring researchers and engineers to build the
              orchestration, infrastructure, and marketplace of the agent
              economy.
            </p>
          </div>
          <Link
            href="/hiring"
            className="inline-flex h-11 shrink-0 items-center justify-center rounded-full border border-white/[0.14] bg-[#0a0a0a] px-6 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
          >
            View all open roles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {featuredPositions.map((position) => (
            <Link
              key={position.slug}
              href={`/hiring/${position.slug}`}
              className="group flex min-h-[200px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:min-h-[240px] sm:p-8"
            >
              <position.icon
                className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2 text-base font-medium text-white">
                  {position.title}
                </h3>
                <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                  {position.department} · {position.location}
                </p>
                <p className="text-sm font-normal leading-relaxed text-white/50">
                  {position.description}
                </p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
