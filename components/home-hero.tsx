"use client"

import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github } from "lucide-react"

import { Button } from "@/components/ui/button"
import { HomeAnnouncementBanner } from "@/components/home-announcement-banner"
import { StackDiagram } from "@/components/stack/stack-diagram"
import type { ProductId } from "@/components/stack/stack-data"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Clicking a layer of the stack opens that product's page.
const LAYER_LINKS: Record<ProductId, string> = {
  python: "/framework",
  rust: "/swarms-rs",
  api: "/api",
  cloud: "https://cloud.swarms.world",
  marketplace: "/marketplace",
}

// Stars are the total across the kyegomez and The-Swarm-Corporation repos
// (the nav badge counts the main swarms repo only).
const METRICS = [
  { value: "800K+", label: "Developers" },
  { value: "40K+", label: "GitHub stars" },
  { value: "40%", label: "Of the Fortune 500" },
  { value: "2B+", label: "Agents created" },
]

const GITHUB_URL = "https://github.com/kyegomez/swarms"

export function HomeHero() {
  const router = useRouter()

  const openLayer = (id: ProductId) => {
    const href = LAYER_LINKS[id]
    if (href.startsWith("http")) window.open(href, "_blank", "noopener,noreferrer")
    else router.push(href)
  }

  return (
    <section
      aria-labelledby="hero-title"
      className="relative flex min-h-screen flex-col overflow-hidden border-b border-white/[0.08] bg-black lg:h-[100dvh] lg:min-h-[680px]"
    >
      {/* Soft monochrome glow behind the stack */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[640px] w-[640px] rounded-full bg-white/[0.04] blur-3xl"
      />

      <div className="container relative flex min-h-0 w-full flex-1 items-center px-4 pt-24 sm:px-6 sm:pt-28 lg:items-start lg:px-8 lg:pt-[calc(96px+4dvh)]">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-12 py-10 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:py-4">
          {/* Copy */}
          <div className="flex flex-col items-start">
            <HomeAnnouncementBanner />

            <motion.h1
              id="hero-title"
              className="bg-gradient-to-b from-white from-30% to-[#5a5a60] bg-clip-text pb-1 font-semibold leading-[1.02] tracking-tighter text-transparent"
              style={{ fontSize: "clamp(2.75rem, 6vw, 5.25rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              Swarms
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/55 sm:text-lg md:text-xl"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              The End-To-End Infrastructure Stack To Build, Deploy, And Monetize AI Agents.
            </motion.p>

            <motion.div
              className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
            >
              <Button
                className="h-12 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-8 text-base font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:h-14 sm:w-auto sm:text-lg"
                asChild
              >
                <a
                  href="https://cloud.swarms.world"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Start building on Swarms Cloud"
                >
                  Start building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                asChild
              >
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5" />
                  Star on GitHub
                  <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* The product stack: Python and Rust, API, Cloud, Marketplace */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease }}
          >
            <StackDiagram
              onSelect={openLayer}
              className="mx-auto w-full max-w-[560px] lg:max-w-[min(540px,calc((96dvh_-_330px)*0.92))]"
            />
          </motion.div>
        </div>
      </div>

      {/* Adoption metrics */}
      <motion.div
        className="relative border-t border-white/[0.08]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.35, ease }}
      >
        <ul className="container mx-auto grid max-w-7xl grid-cols-2 gap-px px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
          {METRICS.map(({ value, label }) => (
            <li key={label} className="py-5 sm:py-6">
              <div className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl md:text-4xl">
                {value}
              </div>
              <div className="mt-1 text-xs font-normal leading-relaxed text-white/50 sm:text-sm">{label}</div>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  )
}
