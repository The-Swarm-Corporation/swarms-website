"use client"

import { motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check, RotateCcw, Star } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { CodeBlock } from "@/components/code-block"
import { CopyButton } from "@/components/copy-button"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGithubStars } from "@/hooks/use-github-stars"
import { formatStarsShort } from "@/lib/github-stars"

import { StackDiagram } from "./stack-diagram"
import { JOBS, PRODUCTS, type ProductId, type StackProduct } from "./stack-data"
import { useReducedMotionSafe } from "./use-reduced-motion-safe"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function StackExplorer({
  value,
  onValueChange,
}: {
  value: ProductId
  onValueChange: (id: ProductId) => void
}) {
  const stars = useGithubStars()

  return (
    <section id="layers" className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              What each layer does
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Start with the piece you need today. Each one works on its own, and each one hands
              off to the next when your agent outgrows it.
            </p>
          </div>

          <Tabs
            value={value}
            onValueChange={(v) => onValueChange(v as ProductId)}
            orientation="vertical"
            className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10"
          >
            <TabsList
              aria-label="Swarms products"
              className="grid h-auto grid-cols-2 items-stretch gap-2 bg-transparent p-0 sm:grid-cols-3 lg:sticky lg:top-32 lg:flex lg:flex-col lg:justify-start lg:gap-0 lg:self-start"
            >
              {JOBS.map((job) => (
                <div key={job.id} className="contents lg:block lg:pb-6">
                  <p className="hidden px-4 pb-2 text-xs font-medium text-white/35 lg:block">
                    {job.label}
                  </p>
                  {PRODUCTS.filter((p) => p.job === job.id).map((product) => (
                    <TabsTrigger
                      key={product.id}
                      value={product.id}
                      className="group relative flex h-auto flex-col items-start justify-start gap-1 whitespace-normal rounded-md border border-white/[0.1] bg-[#0a0a0a] px-4 py-3 text-left text-white/60 ring-offset-black transition-colors hover:text-white data-[state=active]:border-white/25 data-[state=active]:bg-white/[0.06] data-[state=active]:text-white data-[state=active]:shadow-none lg:w-full lg:rounded-none lg:border-0 lg:border-l lg:border-white/[0.1] lg:bg-transparent lg:data-[state=active]:border-white lg:data-[state=active]:bg-white/[0.04]"
                    >
                      <span className="text-[11px] font-normal text-white/35 lg:hidden">
                        {job.label}
                      </span>
                      <span className="text-sm font-semibold">{product.name}</span>
                      <span className="hidden font-mono text-[11px] font-normal text-white/35 lg:block">
                        {product.handle}
                      </span>
                    </TabsTrigger>
                  ))}
                </div>
              ))}
            </TabsList>

            {PRODUCTS.map((product) => (
              <TabsContent
                key={product.id}
                value={product.id}
                className="mt-0 min-w-0 ring-offset-black focus-visible:ring-white/40"
              >
                <ProductPanel
                  product={product}
                  starCount={product.github ? stars[product.github] : undefined}
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

function ProductPanel({ product, starCount }: { product: StackProduct; starCount?: number }) {
  const job = JOBS.find((j) => j.id === product.job)!

  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease }}
      className="grid gap-8 overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-8 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-10"
    >
      <div className="min-w-0">
        <div className="flex items-center gap-4">
          <StackDiagram compact highlight={product.id} className="w-16 shrink-0 sm:w-20" />
          <div className="min-w-0">
            <p className="text-xs font-medium text-white/40">{job.label}</p>
            <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="mt-5 text-base font-normal leading-relaxed text-white/60">{product.role}</p>

        <ul className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {product.facts.map((fact) => (
            <li key={fact} className="flex gap-3 py-3 text-sm font-normal leading-relaxed text-white/70">
              <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-white/50" />
              {fact}
            </li>
          ))}
        </ul>

        {product.install && (
          <div className="mt-6 flex items-center gap-3 rounded-md border border-white/[0.08] bg-black px-4 py-3">
            <span className="font-mono text-xs text-white/35" aria-hidden="true">
              $
            </span>
            <code className="min-w-0 flex-1 truncate font-mono text-xs font-normal text-white/85 sm:text-[13px]">
              {product.install}
            </code>
            <CopyButton value={product.install} />
          </div>
        )}

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button
            className="h-10 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200"
            asChild
          >
            <SmartLink href={product.primary.href}>
              {product.primary.label}
              <ArrowRight className="ml-2 h-4 w-4" />
            </SmartLink>
          </Button>
          <SmartLink
            href={product.docs.href}
            className="group inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            {product.docs.label}
            <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
          </SmartLink>
          {starCount !== undefined && product.github && (
            <a
              href={`https://github.com/${product.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
              aria-label={`${starCount.toLocaleString("en-US")} GitHub stars`}
            >
              <Star className="h-3 w-3" />
              {formatStarsShort(starCount)}
            </a>
          )}
        </div>
      </div>

      <div className="min-w-0">
        {product.artifact.kind === "grid" ? (
          <CloudGrid />
        ) : (
          <>
            <CodePanel file={product.artifact.file} code={product.artifact.code} />
            {product.artifact.kind === "sale" && <SaleSplit />}
          </>
        )}
      </div>
    </motion.div>
  )
}

function SmartLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: ReactNode
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function CodePanel({ file, code }: { file: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{file}</span>
        <CopyButton value={code} className="ml-auto" />
      </div>
      <div className="p-4 sm:p-5">
        <CodeBlock
          code={code}
          file={file}
          className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
        />
      </div>
    </div>
  )
}

// A $20 sale split the way the Marketplace pays it out.
function SaleSplit() {
  return (
    <div className="mt-4 rounded-lg border border-white/[0.08] bg-black p-5">
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-white/70">A $20.00 sale</span>
        <span className="text-xs font-normal text-white/35">card or crypto</span>
      </div>
      <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.08]">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          whileInView={{ width: "90%" }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.2 }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between gap-4 text-sm">
        <span className="font-semibold text-white">You keep $18.00</span>
        <span className="text-xs font-normal text-white/40">Platform fee $2.00</span>
      </div>
    </div>
  )
}

const GRID_AGENTS = ["Analyst", "Skeptic", "Editor", "Auditor"]
const GRID_TASKS = [
  "Summarize the 10-K",
  "Flag risky clauses",
  "Check the numbers",
  "Draft the memo",
  "List open questions",
  "Rewrite for execs",
]
const CELL_COUNT = GRID_AGENTS.length * GRID_TASKS.length

// Deterministic "random" timings so every run fills the grid the same
// believable, uneven way.
const CELL_TIMING = Array.from({ length: CELL_COUNT }, (_, i) => ({
  start: 200 + ((i * 7) % CELL_COUNT) * 70,
  duration: 450 + ((i * 53) % 9) * 110,
}))

type CellState = 0 | 1 | 2 // queued, running, done

// A miniature of Swarms Cloud's Grid runner: every task against every agent.
function CloudGrid() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [cells, setCells] = useState<CellState[]>(() => Array(CELL_COUNT).fill(0))
  const [run, setRun] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setCells(Array(CELL_COUNT).fill(2))
      return
    }
    setCells(Array(CELL_COUNT).fill(0))
    const set = (i: number, state: CellState) =>
      setCells((prev) => {
        const next = [...prev]
        next[i] = state
        return next
      })
    const timers = CELL_TIMING.flatMap(({ start, duration }, i) => [
      setTimeout(() => set(i, 1), start),
      setTimeout(() => set(i, 2), start + duration),
    ])
    return () => timers.forEach(clearTimeout)
  }, [inView, run, reduceMotion])

  const done = cells.filter((c) => c === 2).length
  const running = cells.filter((c) => c === 1).length

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-black">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="font-mono text-[11px] font-normal text-white/40">
          cloud.swarms.world/grid
        </span>
        <button
          type="button"
          onClick={() => setRun((r) => r + 1)}
          disabled={done < CELL_COUNT}
          className="ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[11px] font-medium text-white/50 transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-30"
        >
          <RotateCcw className="h-3 w-3" />
          Run again
        </button>
      </div>

      <div className="p-4 sm:p-5">
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-sm font-semibold text-white">
            {GRID_TASKS.length} tasks, {GRID_AGENTS.length} agents
          </p>
          <p className="text-xs font-normal tabular-nums text-white/50" aria-live="polite">
            {done} of {CELL_COUNT} done{running > 0 ? `, ${running} running` : ""}
          </p>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[320px] border-separate border-spacing-1.5 text-left">
            <thead>
              <tr>
                <th className="sr-only">Task</th>
                {GRID_AGENTS.map((agent) => (
                  <th
                    key={agent}
                    scope="col"
                    className="px-1 pb-1 text-center text-[11px] font-medium text-white/45"
                  >
                    {agent}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GRID_TASKS.map((task, row) => (
                <tr key={task}>
                  <th
                    scope="row"
                    className="whitespace-nowrap pr-2 text-[11px] font-normal text-white/55 sm:text-xs"
                  >
                    {task}
                  </th>
                  {GRID_AGENTS.map((agent, col) => {
                    const state = cells[row * GRID_AGENTS.length + col]
                    return (
                      <td key={agent} className="p-0">
                        <div
                          className={`relative flex h-7 items-center justify-center overflow-hidden rounded-[3px] border transition-colors duration-300 ${
                            state === 2
                              ? "border-white/25 bg-white/[0.12]"
                              : state === 1
                                ? "border-white/40 bg-white/[0.06]"
                                : "border-white/[0.08] bg-transparent"
                          }`}
                          role="img"
                          aria-label={`${task}, ${agent}: ${
                            state === 2 ? "done" : state === 1 ? "running" : "queued"
                          }`}
                        >
                          {state === 2 && (
                            <motion.span
                              aria-hidden="true"
                              initial={{ opacity: 0, scale: 0.6 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ duration: 0.25 }}
                            >
                              <Check className="h-3.5 w-3.5 text-white/80" strokeWidth={2.5} />
                            </motion.span>
                          )}
                          {state === 1 && (
                            <motion.span
                              aria-hidden="true"
                              className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "200%" }}
                              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                            />
                          )}
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs font-normal leading-relaxed text-white/40">
          Each cell is a completion with its own page, payload, tokens, and cost. Batch runs one
          agent over up to 500 tasks the same way.
        </p>
      </div>
    </div>
  )
}
