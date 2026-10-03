"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github } from "lucide-react"

import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"

import { CountUp } from "./count-up"
import { SwarmsRsLogo3D } from "./swarms-rs-logo-3d"
import { CRATE_URL, HERO_STATS, REPO_URL, VERSION } from "./swarms-rs-data"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function SwarmsRsHero() {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-black">
      <IsometricGrid />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
          <div>
          <motion.p
            className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Swarms Rust · v{VERSION}
          </motion.p>

          <motion.h1
            className="max-w-xl font-semibold leading-[1.02] tracking-tighter text-white"
            style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.8rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            Multi-agent systems in Rust, ready in 6&nbsp;milliseconds
          </motion.h1>

          <motion.p
            className="mt-6 max-w-lg text-base font-normal leading-relaxed text-white/55 sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
          >
            swarms-rs is the enterprise-grade multi-agent orchestration framework for Rust. Build
            agents with tools and MCP, run them on any model, and compose them into sequential,
            concurrent, graph and router workflows that use a fraction of the memory.
          </motion.p>

          <motion.div
            className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
          >
            <Button
              className="h-12 w-full rounded-full bg-white px-7 text-base font-medium text-black hover:bg-neutral-200 sm:w-auto"
              asChild
            >
              <a href="#quickstart">
                Start the quickstart
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-7 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
              asChild
            >
              <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5 text-white/60" />
                View on GitHub
                <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="mt-8 flex max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
          >
            <span className="font-mono text-sm text-white/30">$</span>
            <code className="font-mono text-sm text-white/85">cargo add swarms-rs</code>
            <CopyButton value="cargo add swarms-rs" className="ml-auto" />
            <a
              href={CRATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden font-mono text-[11px] text-white/40 transition-colors hover:text-white sm:inline"
            >
              crates.io
            </a>
          </motion.div>

          </div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <SwarmsRsLogo3D className="mx-auto w-full max-w-[620px]" />
          </motion.div>
          </div>

          <motion.dl
            className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
          >
            {HERO_STATS.map((stat, i) => (
              <div key={stat.label} className="flex flex-col bg-black p-5 sm:p-6">
                <dt className="order-2 mt-2 text-sm font-normal text-white/55">{stat.label}</dt>
                <dd className="order-1 text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  <CountUp value={stat.value} delay={0.5 + i * 0.1} duration={1.6} />
                </dd>
                <p className="order-3 mt-1 text-xs font-normal text-white/35">{stat.note}</p>
              </div>
            ))}
          </motion.dl>
          <p className="mt-3 text-xs font-normal text-white/35">
            Measured on swarms-rs 0.3.0 against Swarms Python, LangGraph and CrewAI, all driving
            Claude Sonnet 5.5.
          </p>
        </div>
      </div>
    </section>
  )
}

// Same faint isometric lattice as the /stack hero.
function IsometricGrid() {
  const h = 28
  const w = 2 * h * Math.cos(Math.PI / 6)
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_60%_70%_at_72%_40%,black_10%,transparent_100%)]"
    >
      <defs>
        <pattern id="rs-iso-grid" width={w} height={h} patternUnits="userSpaceOnUse">
          <path
            d={`M0 0L${w} ${h}M0 ${h}L${w} 0`}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={1}
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#rs-iso-grid)" />
    </svg>
  )
}
