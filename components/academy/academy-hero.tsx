"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check, Play } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState, type MouseEvent } from "react"

import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"
import { Button } from "@/components/ui/button"
import { courseParts } from "@/lib/academy/swarms-api-course"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// One console scene per course part: the request a learner sends at that
// stage of the course and what comes back. Typed out line by line.
const SCENES: { request: string[]; response: string[] }[] = [
  {
    request: [
      "POST /v1/agent/completions",
      "{",
      '  "agent_config": {',
      '    "agent_name": "Research Analyst",',
      '    "model_name": "gpt-5.4-mini",',
      '    "max_loops": 1',
      "  },",
      '  "task": "Summarize the state of multi-agent AI"',
      "}",
    ],
    response: ["200 OK · 1.8s", '"outputs": "Multi-agent systems split work across..."', '"usage": { "total_tokens": 812 }'],
  },
  {
    request: [
      "POST /v1/agent/completions",
      "{",
      '  "agent_config": {',
      '    "agent_name": "Pricing Agent",',
      '    "model_name": "claude-haiku-5-5",',
      '    "tools_list_dictionary": [ get_model_pricing ],',
      '    "streaming_on": true',
      "  },",
      '  "task": "What does gpt-5.4 cost per million tokens?"',
      "}",
    ],
    response: ["200 OK · streaming", "tool_call → get_model_pricing(\"gpt-5.4\")", "Δ Input $2.88 · output $17.25 per 1M tokens"],
  },
  {
    request: [
      "POST /v1/swarm/completions",
      "{",
      '  "swarm_type": "SequentialWorkflow",',
      '  "agents": [',
      '    { "agent_name": "Researcher", "model_name": "gemini-2.5-pro" },',
      '    { "agent_name": "Writer", "model_name": "claude-sonnet-5-5" },',
      '    { "agent_name": "Editor", "model_name": "gpt-5.4" }',
      "  ],",
      '  "task": "Explain grid-scale battery storage"',
      "}",
    ],
    response: ["200 OK · 3 agents · 9.4s", '"output": "Grid-scale batteries shift energy from..."', '"usage": { "total_tokens": 4120 }'],
  },
  {
    request: [
      "POST /v1/swarm/batch/completions",
      "[",
      '  { "name": "nightly-report-us", "swarm_type": "ConcurrentWorkflow", ... },',
      '  { "name": "nightly-report-eu", "swarm_type": "ConcurrentWorkflow", ... },',
      '  { "name": "nightly-report-apac", "swarm_type": "ConcurrentWorkflow", ... }',
      "]",
      "",
      "GET /v1/swarm/logs",
      "GET /v1/account/credits",
    ],
    response: ["200 OK · 3 jobs queued", "logs: 3 runs · 11,904 tokens", "credits: balance updated"],
  },
]

const TYPE_MS = 55 // per character
const HOLD_MS = 4200 // time a finished scene stays before auto-advancing

export function AcademyHero() {
  const reduceMotion = useReducedMotionSafe()
  const parts = courseParts.slice(0, SCENES.length)
  const [active, setActive] = useState(0)
  const [pinned, setPinned] = useState(false)
  const [chars, setChars] = useState(0)
  const [spot, setSpot] = useState({ x: 70, y: 35 })
  const sectionRef = useRef<HTMLElement>(null)

  const scene = SCENES[active]
  const requestText = scene.request.join("\n")
  const total = requestText.length
  const done = chars >= total

  // Type the request out, then show the response and move on unless the
  // visitor has pinned a part by clicking it.
  useEffect(() => {
    if (reduceMotion) {
      setChars(total)
      return
    }
    setChars(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 3
      setChars(Math.min(i, total))
      if (i >= total) window.clearInterval(id)
    }, TYPE_MS)
    return () => window.clearInterval(id)
  }, [active, total, reduceMotion])

  useEffect(() => {
    if (!done || pinned || reduceMotion) return
    const id = window.setTimeout(() => setActive((a) => (a + 1) % SCENES.length), HOLD_MS)
    return () => window.clearTimeout(id)
  }, [done, pinned, reduceMotion, active])

  const onMove = (e: MouseEvent<HTMLElement>) => {
    const r = sectionRef.current?.getBoundingClientRect()
    if (!r) return
    setSpot({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 })
  }

  const typed = requestText.slice(0, chars)
  const lines = typed.split("\n")

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      className="relative flex min-h-[calc(100dvh-64px)] w-full items-center overflow-hidden border-b border-white/[0.08] bg-black sm:min-h-[calc(100dvh-80px)] md:min-h-[calc(100dvh-96px)]"
    >
      {/* A soft spotlight that follows the pointer, in place of the old grid. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-[background] duration-300"
        style={{ background: `radial-gradient(600px circle at ${spot.x}% ${spot.y}%, rgba(255,255,255,0.07), transparent 60%)` }}
      />

      <div className="relative w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-12 xl:px-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Free courses on the Swarms stack
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="mt-6 font-bold leading-[1.02] tracking-tighter text-white"
              style={{ fontSize: "clamp(2.25rem, 4vw, 3.75rem)" }}
            >
              Swarms Academy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/55 sm:text-lg"
            >
              Structured courses for every Swarms product. Go from your first API call to production multi-agent systems, one part at a time, with a quiz and a checkpoint at each step.
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-7 space-y-2.5"
            >
              {["Run real requests against the Swarms API from inside each lesson", "Earn points and track progress across parts", "Free, no account needed to read; an API key to run the trials"].map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/70 sm:text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button className="h-11 rounded-full px-6 text-sm font-medium" asChild>
                <Link href="/academy/swarms-api">
                  Start the Swarms API course
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-11 rounded-full border-white/15 bg-transparent px-6 text-sm font-medium text-white hover:bg-white/[0.06]" asChild>
                <a href="https://discord.gg/swarms" target="_blank" rel="noopener noreferrer">
                  Join the community
                  <ArrowUpRight className="ml-1 h-4 w-4 text-white/50" />
                </a>
              </Button>
            </motion.div>
          </div>

          {/* Interactive course console */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="min-w-0"
          >
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
              <div className="grid lg:grid-cols-[230px_minmax(0,1fr)]">
                {/* Part rail */}
                <div role="tablist" aria-label="Course parts" className="flex gap-2 overflow-x-auto border-b border-white/[0.08] p-3 lg:flex-col lg:gap-1 lg:border-b-0 lg:border-r">
                  {parts.map((p, i) => {
                    const isActive = i === active
                    return (
                      <button
                        key={p.slug}
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => {
                          setActive(i)
                          setPinned(true)
                        }}
                        className={`group relative flex shrink-0 flex-col items-start rounded-md border px-3 py-2.5 text-left transition-colors lg:w-full ${
                          isActive ? "border-white/25 bg-white/[0.06]" : "border-transparent hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Part {p.part} · {p.duration}</span>
                        <span className={`mt-1 text-sm font-semibold ${isActive ? "text-white" : "text-white/70 group-hover:text-white"}`}>{p.title.split(":")[0]}</span>
                        {isActive && !reduceMotion && (
                          <span className="absolute inset-x-3 bottom-1 h-px overflow-hidden bg-white/10" aria-hidden="true">
                            <motion.span
                              key={`${active}-${done}`}
                              className="block h-full bg-white"
                              initial={{ width: "0%" }}
                              animate={{ width: done && !pinned ? "100%" : "0%" }}
                              transition={{ duration: done && !pinned ? HOLD_MS / 1000 : 0, ease: "linear" }}
                            />
                          </span>
                        )}
                      </button>
                    )
                  })}
                </div>

                {/* Console */}
                <div className="flex min-h-[340px] flex-col">
                  <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
                    <span className="ml-3 truncate font-mono text-[11px] text-white/40">{parts[active].title}</span>
                    <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.14em] text-white/35 sm:inline">{pinned ? "pinned" : "auto-play"}</span>
                  </div>
                  <pre className="flex-1 overflow-x-auto p-4 font-mono text-[11.5px] leading-relaxed text-white/85 sm:text-[12.5px]">
                    {lines.map((l, i) => (
                      <div key={i} className="whitespace-pre">
                        {l}
                        {i === lines.length - 1 && !done && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/80" aria-hidden="true" />}
                      </div>
                    ))}
                  </pre>
                  <AnimatePresence mode="wait">
                    {done && (
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] leading-5"
                      >
                        {scene.response.map((r, i) => (
                          <div key={r} className={i === 0 ? "flex items-center gap-2 text-white" : "text-white/55"}>
                            {i === 0 && <Play className="h-3 w-3 fill-current text-red-500" aria-hidden="true" />}
                            {r}
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-4 py-2.5">
                <p className="text-xs text-white/45">Click a part to see what you will be sending by the end of it.</p>
                <Link href={`/academy/swarms-api/${parts[active].slug}`} className="inline-flex items-center gap-1 text-xs font-medium text-white/70 transition-colors hover:text-white">
                  Open part {parts[active].part}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
