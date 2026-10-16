"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { BlogCover } from "@/components/blog/blog-cover"
import { getPositionBySlug, positions, Position } from "@/lib/positions"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Shown first; every other open role follows in the carousel.
const FEATURED_ROLE_SLUGS = [
  "head-of-multi-agent-research",
  "front-end-engineer",
  "growth-marketers",
  "head-of-marketplace",
  "devops-engineer",
]

const featuredPositions = FEATURED_ROLE_SLUGS
  .map(getPositionBySlug)
  .filter((p): p is Position => Boolean(p))

const orderedPositions = [
  ...featuredPositions,
  ...positions.filter((p) => !FEATURED_ROLE_SLUGS.includes(p.slug)),
]

// Same layout as BlogCard: a 16:9 cover, an uppercase meta line, the title,
// and a two-line description.
function RoleCard({ position }: { position: Position }) {
  return (
    <Link
      href={`/hiring/${position.slug}`}
      data-carousel-card
      className="group block w-[80vw] shrink-0 snap-start sm:w-[340px] lg:w-[384px]"
    >
      <div className="overflow-hidden rounded-xl border border-white/10">
        <div className="relative aspect-video transition-transform duration-500 ease-out group-hover:scale-[1.03]">
          {/* Same title-in-cover treatment BlogCover uses for posts without art */}
          <BlogCover slug={position.slug} title={position.title} className="absolute inset-0" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
        <span className="text-white/60">{position.department}</span>
        <span aria-hidden="true">&middot;</span>
        <span>{position.type}</span>
      </div>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">{position.description}</p>
    </Link>
  )
}

export function HomeHiring() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener("resize", updateScrollState)
    return () => window.removeEventListener("resize", updateScrollState)
  }, [updateScrollState])

  // Step one card forward or back, landing on its snap position.
  const scrollCards = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"))
    const inset = cards[0]?.offsetLeft ?? 0
    const stops = cards.map((card) => card.offsetLeft - inset)
    const target =
      direction === 1
        ? stops.find((stop) => stop > el.scrollLeft + 4)
        : [...stops].reverse().find((stop) => stop < el.scrollLeft - 4)
    el.scrollTo({ left: target ?? (direction === 1 ? el.scrollWidth : 0), behavior: "smooth" })
  }

  const navButton =
    "flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-30"

  return (
    <section className="border-b border-white/[0.08] bg-black py-16 sm:py-24 lg:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
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
              Join the Swarms team
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
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.1, ease }}
      >
        {/* Starts at the content edge and bleeds off the right of the viewport */}
        <div
          ref={scrollerRef}
          onScroll={updateScrollState}
          aria-label="Open roles"
          className="scrollbar-hide flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 sm:gap-6 [padding-inline:max(1rem,calc((100%_-_80rem)_/_2))] [scroll-padding-inline:max(1rem,calc((100%_-_80rem)_/_2))] sm:[padding-inline:max(1.5rem,calc((100%_-_80rem)_/_2))] sm:[scroll-padding-inline:max(1.5rem,calc((100%_-_80rem)_/_2))] lg:[padding-inline:max(2rem,calc((100%_-_80rem)_/_2))] lg:[scroll-padding-inline:max(2rem,calc((100%_-_80rem)_/_2))]"
        >
          {orderedPositions.map((position) => (
            <RoleCard key={position.slug} position={position} />
          ))}
        </div>

        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mt-8 hidden max-w-7xl items-center justify-between gap-3 sm:flex">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              {orderedPositions.length} open roles
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => scrollCards(-1)}
                disabled={!canScrollPrev}
                aria-label="Previous roles"
                className={navButton}
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollCards(1)}
                disabled={!canScrollNext}
                aria-label="Next roles"
                className={navButton}
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
