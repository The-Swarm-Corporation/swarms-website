"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
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

  // Every panel is rendered into the page HTML (inactive ones hidden) so all
  // five products are readable without clicking. The entrance animation only
  // plays after the selection changes, never on the server-rendered first view.
  const [switched, setSwitched] = useState(false)
  const firstValue = useRef(value)
  useEffect(() => {
    if (value !== firstValue.current) setSwitched(true)
  }, [value])

  return (
    <section id="layers" className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              AI agent infrastructure, layer by layer
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Open-source frameworks to build agents, a hosted API to run them, telemetry to watch
              them, and a marketplace to sell them. Start with the piece you need today; each one
              hands off to the next when your agent outgrows it.
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
                forceMount
                className="mt-0 min-w-0 ring-offset-black focus-visible:ring-white/40 data-[state=inactive]:hidden"
              >
                <ProductPanel
                  key={value === product.id ? "active" : "inactive"}
                  product={product}
                  animateIn={switched}
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

function ProductPanel({
  product,
  animateIn,
  starCount,
}: {
  product: StackProduct
  animateIn: boolean
  starCount?: number
}) {
  const job = JOBS.find((j) => j.id === product.job)!

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, x: 12 } : false}
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
        {product.artifact.kind === "telemetry" ? (
          <CloudTelemetry />
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

type Run = {
  agent: string
  model: "gpt-4.1" | "gpt-4.1-mini"
  input: number
  output: number
  ok: boolean
}

// Per-million-token prices, so every cost in the demo is what that run
// would actually cost.
const PRICE: Record<Run["model"], [number, number]> = {
  "gpt-4.1": [2, 8],
  "gpt-4.1-mini": [0.4, 1.6],
}
const CONTEXT_WINDOW = 1_047_576

const RUNS: Run[] = [
  { agent: "Research-Agent", model: "gpt-4.1", input: 412, output: 638, ok: true },
  { agent: "Triage-Agent", model: "gpt-4.1-mini", input: 230, output: 95, ok: true },
  { agent: "Writer-Agent", model: "gpt-4.1", input: 1840, output: 1210, ok: true },
  { agent: "Triage-Agent", model: "gpt-4.1-mini", input: 0, output: 0, ok: false },
  { agent: "Research-Agent", model: "gpt-4.1", input: 520, output: 702, ok: true },
  { agent: "Writer-Agent", model: "gpt-4.1", input: 2010, output: 1344, ok: true },
  { agent: "Triage-Agent", model: "gpt-4.1-mini", input: 198, output: 88, ok: true },
]

const VISIBLE_RUNS = 5
const RUN_EVERY_MS = 2200
const MAX_RUNS = 200

const runAt = (id: number) => RUNS[id % RUNS.length]
const costOf = (r: Run) => (r.input * PRICE[r.model][0] + r.output * PRICE[r.model][1]) / 1e6
const runTime = (id: number) => {
  const t = 14 * 3600 + 2 * 60 + 5 + id * 4 + ((id * 7) % 3)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(t % 60)}`
}
const runRef = (id: number) => `agent-${((id + 11) * 2654435761 >>> 0).toString(16).slice(0, 6)}`

// A miniature of Swarms Cloud's completion logs: runs stream in while the
// panel is on screen, and any run opens to show what Cloud records about it.
function CloudTelemetry() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-60px" })
  const [nextId, setNextId] = useState(VISIBLE_RUNS)
  const [selected, setSelected] = useState(VISIBLE_RUNS - 1)
  const [paused, setPaused] = useState(false)

  const live = inView && !reduceMotion && !paused && nextId < MAX_RUNS

  useEffect(() => {
    if (!live) return
    const id = setTimeout(() => setNextId((n) => n + 1), RUN_EVERY_MS)
    return () => clearTimeout(id)
  }, [live, nextId])

  const ids = Array.from({ length: Math.min(VISIBLE_RUNS, nextId) }, (_, i) => nextId - 1 - i)
  const all = Array.from({ length: nextId }, (_, id) => runAt(id))
  const totals = {
    runs: 482 + nextId,
    tokens: 611_240 + all.reduce((sum, r) => sum + r.input + r.output, 0),
    spend: 3.08 + all.reduce((sum, r) => sum + costOf(r), 0),
  }
  const detail = runAt(selected)

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-lg border border-white/[0.08] bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="truncate font-mono text-[11px] font-normal text-white/40">
          cloud.swarms.world/history
        </span>
        <span className="ml-auto inline-flex items-center gap-1.5 text-[11px] font-medium text-white/50">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-white" : "bg-white/30"}`}
          />
          {live ? "Live" : "Paused"}
        </span>
      </div>

      <dl className="grid grid-cols-3 divide-x divide-white/[0.06] border-b border-white/[0.08]">
        {[
          { label: "Runs today", value: totals.runs.toLocaleString("en-US") },
          { label: "Tokens", value: totals.tokens.toLocaleString("en-US") },
          { label: "Spend", value: `$${totals.spend.toFixed(2)}` },
        ].map((stat) => (
          <div key={stat.label} className="px-4 py-3">
            <dt className="text-[11px] font-normal text-white/40">{stat.label}</dt>
            <dd className="mt-0.5 text-sm font-semibold tabular-nums text-white sm:text-base">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="px-2 pt-2 sm:px-3">
        <div className="grid grid-cols-[4.5rem_minmax(0,1fr)_3.5rem_4rem_0.75rem] gap-2 px-2 pb-1.5 text-[11px] font-medium text-white/35">
          <span>Time</span>
          <span>Agent</span>
          <span className="text-right">Tokens</span>
          <span className="text-right">Cost</span>
          <span className="sr-only">Status</span>
        </div>
        <div>
          <AnimatePresence initial={false} mode="popLayout">
            {ids.map((id) => {
              const run = runAt(id)
              const active = id === selected
              return (
                <motion.button
                  key={id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease }}
                  onClick={() => setSelected(id)}
                  aria-pressed={active}
                  className={`grid w-full grid-cols-[4.5rem_minmax(0,1fr)_3.5rem_4rem_0.75rem] items-center gap-2 rounded px-2 py-2 text-left text-xs transition-colors ${
                    active ? "bg-white/[0.07] text-white" : "text-white/65 hover:bg-white/[0.03]"
                  }`}
                >
                  <span className="font-mono text-[11px] text-white/40">{runTime(id)}</span>
                  <span className="truncate font-medium">{run.agent}</span>
                  <span className="text-right tabular-nums">
                    {run.ok ? (run.input + run.output).toLocaleString("en-US") : "0"}
                  </span>
                  <span className="text-right tabular-nums">
                    {run.ok ? `$${costOf(run).toFixed(4)}` : "$0"}
                  </span>
                  <span
                    className={`h-1.5 w-1.5 justify-self-end rounded-full ${run.ok ? "bg-white/60" : "bg-red-400"}`}
                    aria-label={run.ok ? "Succeeded" : "Failed"}
                    role="img"
                  />
                </motion.button>
              )
            })}
          </AnimatePresence>
        </div>
      </div>

      <div className="m-3 rounded-md border border-white/[0.08] bg-[#0a0a0a] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-semibold text-white">{detail.agent}</p>
          <p className="font-mono text-[11px] text-white/40">{runRef(selected)}</p>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-xs sm:grid-cols-3">
          {[
            ["Model", detail.model],
            ["Input tokens", detail.input.toLocaleString("en-US")],
            ["Output tokens", detail.output.toLocaleString("en-US")],
            ["Cost", `$${costOf(detail).toFixed(4)}`],
            ["Context used", `${(((detail.input + detail.output) / CONTEXT_WINDOW) * 100).toFixed(2)}%`],
            ["Status", detail.ok ? "Succeeded" : "429, rate limited"],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <dt className="text-white/40">{label}</dt>
              <dd
                className={`mt-0.5 truncate font-medium tabular-nums ${
                  label === "Status" && !detail.ok ? "text-red-400" : "text-white/85"
                }`}
              >
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="px-4 pb-4 text-xs font-normal leading-relaxed text-white/40">
        Every request your agents make through the Swarms API lands here. Select a run to see what
        Cloud records about it.
      </p>
    </div>
  )
}
