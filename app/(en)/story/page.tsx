"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from "framer-motion"
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Building2,
  Cloud,
  Code,
  Github,
  MessagesSquare,
  Rocket,
  Route,
  Sparkles,
  Star,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { releases, type Release } from "@/lib/story"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const icons: Record<string, typeof Github> = {
  "A group chat of GPT-3s": MessagesSquare,
  "Swarms Python": Github,
  "Swarms Marketplace": Sparkles,
  "Swarms Rust": Rocket,
  "Swarms API": Code,
  "Swarms Cloud": Cloud,
  "7,000 GitHub stars": Star,
  AgentHQ: Building2,
  RouteHub: Route,
}

const years = Array.from(new Set(releases.map((r) => r.year)))

function ReleaseIcon({ title, className, strokeWidth }: { title: string; className?: string; strokeWidth?: number }) {
  const Icon = icons[title] ?? Sparkles
  return <Icon className={className} strokeWidth={strokeWidth} />
}

function ReleaseLink({ release }: { release: Release }) {
  if (!release.href || !release.cta) return null
  const className =
    "group/link mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
  if (release.href.startsWith("http")) {
    return (
      <a href={release.href} target="_blank" rel="noopener noreferrer" className={className}>
        {release.cta}
        <ArrowUpRight className="h-4 w-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
      </a>
    )
  }
  return (
    <Link href={release.href} className={className}>
      {release.cta}
      <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
    </Link>
  )
}

export default function StoryPage() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // The rail fills as the timeline passes through the middle of the screen.
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const activeRelease = releases[active]

  const jumpToYear = (year: string) => {
    const index = releases.findIndex((r) => r.year === year)
    document.getElementById(`release-${index}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white">
        <Navigation />

        <main>
          {/* HERO */}
          <section className="relative flex min-h-[100dvh] items-center pt-[64px] sm:pt-[80px] md:pt-[96px] overflow-hidden border-b border-white/[0.08] bg-black">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,#1a1a1a_0%,#0a0a0a_45%,#000_100%)]"
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
                  2023 to today
                </motion.div>

                <motion.h1
                  className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                  style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.05, ease }}
                >
                  The Swarms Story
                </motion.h1>

                <motion.p
                  className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.12, ease }}
                >
                  One experiment with GPT-3 became a framework, a community, and a full multi-agent stack. Here is
                  every release along the way.
                </motion.p>

                <motion.button
                  type="button"
                  onClick={() => jumpToYear(years[0])}
                  className="mt-12 inline-flex flex-col items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/70"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.3, ease }}
                >
                  Scroll the timeline
                  <motion.span
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <ArrowDown className="h-4 w-4" />
                  </motion.span>
                </motion.button>
              </div>
            </div>
          </section>

          {/* TIMELINE */}
          <section className="border-b border-white/[0.08] bg-black">
            {/* Compact year bar for small screens */}
            <div className="sticky top-[64px] z-20 border-b border-white/[0.08] bg-black/85 backdrop-blur-md sm:top-[80px] lg:hidden">
              <div className="container flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
                <div className="flex gap-1.5 overflow-x-auto">
                  {years.map((year) => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => jumpToYear(year)}
                      className={`rounded-full px-3 py-1 font-mono text-xs transition-colors ${
                        activeRelease.year === year ? "bg-white text-black" : "text-white/50 hover:text-white"
                      }`}
                    >
                      {year}
                    </button>
                  ))}
                </div>
                <span className="flex-shrink-0 font-mono text-[11px] text-white/40">
                  {String(active + 1).padStart(2, "0")} / {String(releases.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
              <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Sticky year display */}
                <aside className="hidden lg:col-span-4 lg:block">
                  <div className="sticky top-40">
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                      Timeline
                    </p>
                    <div className="relative mt-4 h-[9rem] overflow-hidden">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.div
                          key={activeRelease.year}
                          className="absolute inset-0 text-[8rem] font-bold leading-none tracking-tighter text-white"
                          initial={{ y: "100%", opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: "-100%", opacity: 0 }}
                          transition={{ duration: 0.5, ease }}
                        >
                          {activeRelease.year}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.p
                        key={activeRelease.title}
                        className="mt-2 text-lg font-medium text-white/70"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25 }}
                      >
                        {activeRelease.date} · {activeRelease.title}
                      </motion.p>
                    </AnimatePresence>

                    <nav aria-label="Jump to year" className="mt-10 space-y-1">
                      {years.map((year) => {
                        const count = releases.filter((r) => r.year === year).length
                        const isActive = activeRelease.year === year
                        return (
                          <button
                            key={year}
                            type="button"
                            onClick={() => jumpToYear(year)}
                            className="group flex w-full items-center gap-4 py-1.5 text-left"
                          >
                            <span
                              className={`h-px transition-all duration-500 ${
                                isActive ? "w-12 bg-white" : "w-6 bg-white/25 group-hover:w-9 group-hover:bg-white/50"
                              }`}
                            />
                            <span
                              className={`font-mono text-sm transition-colors ${
                                isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                              }`}
                            >
                              {year}
                            </span>
                            <span className="font-mono text-[11px] text-white/25">
                              {count} {count === 1 ? "event" : "events"}
                            </span>
                          </button>
                        )
                      })}
                    </nav>
                  </div>
                </aside>

                {/* Entries */}
                <div ref={timelineRef} className="relative lg:col-span-8">
                  <div aria-hidden="true" className="absolute bottom-0 left-[7px] top-0 w-px bg-white/[0.1]" />
                  <motion.div
                    aria-hidden="true"
                    className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-white"
                    style={{ scaleY: progress }}
                  />

                  <ol className="space-y-16 sm:space-y-24">
                    {releases.map((release, index) => {
                      const isActive = index === active
                      const isPast = index < active
                      return (
                        <motion.li
                          key={release.title}
                          id={`release-${index}`}
                          className="relative scroll-mt-40 pl-10 sm:pl-14"
                          onViewportEnter={() => setActive(index)}
                          viewport={{ margin: "-45% 0px -45% 0px" }}
                        >
                          <span
                            aria-hidden="true"
                            className={`absolute left-0 top-1.5 flex h-[15px] w-[15px] items-center justify-center rounded-full border transition-all duration-500 ${
                              isActive
                                ? "border-white bg-white shadow-[0_0_0_6px_rgba(255,255,255,0.08)]"
                                : isPast
                                  ? "border-white bg-black"
                                  : "border-white/25 bg-black"
                            }`}
                          />

                          <motion.div
                            initial={{ opacity: 0, y: 32 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ duration: 0.7, ease }}
                          >
                            <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
                              <span className={isActive ? "text-white" : "text-white/50"}>{release.date}</span>
                              <span className="rounded-full border border-white/[0.12] px-2 py-0.5 text-[10px] tracking-[0.15em] text-white/40">
                                {release.kind}
                              </span>
                            </div>

                            <div
                              className={`mt-5 rounded-lg border p-5 transition-colors duration-500 sm:p-8 ${
                                isActive ? "border-white/20 bg-[#0a0a0a]" : "border-white/[0.08] bg-black"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <ReleaseIcon
                                  title={release.title}
                                  className={`h-5 w-5 transition-colors duration-500 ${
                                    isActive ? "text-white" : "text-white/50"
                                  }`}
                                  strokeWidth={1.5}
                                />
                                <h2 className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                                  {release.title}
                                </h2>
                              </div>
                              <p className="mt-4 text-base font-normal leading-relaxed text-white/55 sm:text-lg">
                                {release.description}
                              </p>
                              <ReleaseLink release={release} />
                            </div>
                          </motion.div>
                        </motion.li>
                      )
                    })}
                  </ol>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-black">
            <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
                className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
              >
                <div className="max-w-2xl space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                    The next release is being built in the open.
                  </h2>
                  <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                    Follow along on GitHub, or learn more about the team behind Swarms.
                  </p>
                </div>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button
                    className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                    asChild
                  >
                    <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                      Star on GitHub
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                    asChild
                  >
                    <Link href="/about">
                      About Swarms
                      <ArrowRight className="ml-2 h-4 w-4 text-white/50" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
      </div>
    </MotionConfig>
  )
}
