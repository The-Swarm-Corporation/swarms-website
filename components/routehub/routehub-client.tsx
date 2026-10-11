"use client"

import { motion, useInView } from "framer-motion"
import { Play, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { CopyButton } from "@/components/copy-button"
import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"
import { BenchBar } from "@/components/swarms-rs/bench-bar"

import { AGENT_MATH, BENCHMARKS, FEATURE_GROUPS, FEATURES, type CodeVariant, type Feature } from "./routehub-data"

// The interactive parts of the /routehub page. The sections themselves render
// on the server in app/(en)/routehub/page.tsx and pass highlighted code in.

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const DIM = /^(Collecting|Downloading|Installing)\b/

// A code panel in the style of the /swarms-rs quickstart: switchable variants
// (providers, before and after, and so on) and a terminal underneath that
// types the command and prints example output when the panel scrolls into
// view. Every variant's highlighted code is rendered on the server and kept in
// the HTML; only the active one is shown.
export function RouteHubCode({
  variants,
  nodes,
  label,
}: {
  variants: CodeVariant[]
  nodes: ReactNode[]
  label?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const reduceMotion = useReducedMotionSafe()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)

  const v = variants[active]
  const output = v.output ?? []
  const hasTerminal = output.length > 0

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const run = useCallback(() => {
    clear()
    setStarted(true)
    setTyped(0)
    setShown(0)
    const command = v.command ?? ""
    const lines = v.output ?? []

    if (reduceMotion) {
      setTyped(command.length)
      setShown(lines.length)
      setRunning(false)
      return
    }

    setRunning(true)
    let t = 150
    for (let i = 1; i <= command.length; i++) {
      t += 28
      later(() => setTyped(i), t)
    }
    t += command ? 380 : 120
    lines.forEach((line, i) => {
      t += DIM.test(line) ? 220 : 160
      later(() => setShown(i + 1), t)
    })
    later(() => setRunning(false), t + 200)
  }, [v, reduceMotion])

  // First run when scrolled into view, and again whenever the variant (and
  // with it `run`) changes.
  useEffect(() => {
    if (inView && hasTerminal) run()
    else clear()
  }, [inView, hasTerminal, run])

  useEffect(() => clear, [])

  const rows = output.length + (v.command ? 1 : 0)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-black">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="ml-3 truncate font-mono text-[11px] font-normal text-white/40">{v.file}</span>
        <CopyButton value={v.code} className="ml-auto" />
      </div>

      {variants.length > 1 && (
        <div
          role="tablist"
          aria-label={label ?? "Code variants"}
          className="flex gap-1 overflow-x-auto border-b border-white/[0.08] px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {variants.map((variant, i) => (
            <button
              key={variant.label}
              type="button"
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-colors sm:text-xs ${
                active === i ? "bg-white text-black" : "text-white/50 hover:text-white"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      )}

      {nodes.map((node, i) => (
        <div
          key={variants[i].label || i}
          role={variants.length > 1 ? "tabpanel" : undefined}
          hidden={i !== active}
          className="p-4 text-[11px] leading-relaxed sm:p-5 sm:text-[12.5px] [&_pre]:font-mono"
        >
          {node}
        </div>
      ))}

      {hasTerminal && (
        <div className="border-t border-white/[0.08] bg-[#050505]">
          <div className="flex items-center gap-3 px-4 py-2.5">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 rounded-full ${running ? "animate-pulse bg-white" : "bg-white/30"}`}
            />
            <span className="font-mono text-[11px] text-white/40">
              {running ? "running" : started ? "done" : "terminal"} · example output
            </span>
            <button
              type="button"
              onClick={run}
              disabled={running}
              aria-label={started ? "Run again" : "Run"}
              className="ml-auto flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-40"
            >
              {started ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              {started ? "Run again" : "Run"}
            </button>
          </div>

          <div
            aria-live="polite"
            className="px-4 pb-4 font-mono text-[11px] leading-6 sm:text-[12.5px]"
            style={{ minHeight: `${rows * 1.5 + 1.25}rem` }}
          >
            {v.command && started && (
              <div className="whitespace-pre-wrap text-white/85">
                <span className="select-none text-white/30">$ </span>
                {v.command.slice(0, typed)}
                {typed < v.command.length && <Cursor />}
              </div>
            )}
            {output.slice(0, shown).map((line, i) => (
              <div
                key={`${active}-${i}`}
                className={`whitespace-pre-wrap ${DIM.test(line) ? "text-white/35" : "text-white/85"}`}
              >
                {line}
                {running && i === shown - 1 && <Cursor />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function Cursor() {
  return (
    <span
      aria-hidden="true"
      className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/70"
    />
  )
}

export function FeatureExplorer({ nodes }: { nodes: Record<string, ReactNode[]> }) {
  const [value, setValue] = useState(FEATURES[0].id)

  // Panels animate in only after the visitor switches, never on first paint.
  const [switched, setSwitched] = useState(false)
  const first = useRef(value)
  useEffect(() => {
    if (value !== first.current) setSwitched(true)
  }, [value])

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="RouteHub features"
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:sticky lg:top-32 lg:flex-col lg:gap-0 lg:self-start lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {FEATURE_GROUPS.map((group) => (
          <div key={group.id} className="contents lg:block lg:pb-5">
            <p className="hidden px-4 pb-2 text-xs font-medium text-white/35 lg:block">{group.label}</p>
            {FEATURES.filter((f) => f.group === group.id).map((f) => {
              const active = f.id === value
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  id={`feature-tab-${f.id}`}
                  aria-selected={active}
                  aria-controls={`feature-panel-${f.id}`}
                  onClick={() => setValue(f.id)}
                  className={`flex shrink-0 flex-col items-start gap-0.5 rounded-md border px-4 py-3 text-left transition-colors lg:w-full lg:rounded-none lg:border-0 lg:border-l ${
                    active
                      ? "border-white/25 bg-white/[0.06] text-white lg:border-white lg:bg-white/[0.04]"
                      : "border-white/[0.1] bg-[#0a0a0a] text-white/55 hover:text-white lg:border-white/[0.1] lg:bg-transparent"
                  }`}
                >
                  <span className="whitespace-nowrap text-sm font-semibold">{f.name}</span>
                  <span className="hidden font-mono text-[11px] font-normal text-white/35 lg:block">
                    {f.handle}
                  </span>
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {FEATURES.map((f) => (
        <div
          key={f.id}
          role="tabpanel"
          id={`feature-panel-${f.id}`}
          aria-labelledby={`feature-tab-${f.id}`}
          hidden={f.id !== value}
          className="min-w-0"
        >
          <FeaturePanel
            key={f.id === value ? "active" : "inactive"}
            feature={f}
            nodes={nodes[f.id]}
            animateIn={switched}
          />
        </div>
      ))}
    </div>
  )
}

function FeaturePanel({
  feature,
  nodes,
  animateIn,
}: {
  feature: Feature
  nodes: ReactNode[]
  animateIn: boolean
}) {
  const group = FEATURE_GROUPS.find((g) => g.id === feature.group)!
  return (
    <motion.div
      initial={animateIn ? { opacity: 0, x: 12 } : false}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease }}
      className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-8"
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:gap-10">
        <div>
          <p className="text-xs font-medium text-white/40">{group.label}</p>
          <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            {feature.name}
          </h3>
          <p className="mt-4 text-base font-normal leading-relaxed text-white/60">{feature.summary}</p>
        </div>
        <ul className="divide-y divide-white/[0.06] self-start border-y border-white/[0.06]">
          {feature.facts.map((fact) => (
            <li key={fact} className="flex gap-3 py-3 text-sm font-normal leading-relaxed text-white/70">
              <span aria-hidden="true" className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-white/50" />
              {fact}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <RouteHubCode variants={feature.variants} nodes={nodes} label={`${feature.name} examples`} />
      </div>
    </motion.div>
  )
}

// Bars use a linear scale so the gap reads at its true size; a minimum width
// keeps the shortest bar visible.
const pct = (value: number, max: number) => Math.max(1.2, (value / max) * 100)

const ratioLabel = (value: number, ours: number) => {
  const r = value / ours
  if (r < 1.1) return undefined
  return `${r >= 10 ? Math.round(r) : r.toFixed(1)}x`
}

export function BenchExplorer() {
  const [metricId, setMetricId] = useState(BENCHMARKS[0].id)
  const [variants, setVariants] = useState<Record<string, number>>({})

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
      <div
        role="tablist"
        aria-label="Benchmarks"
        aria-orientation="vertical"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
      >
        {BENCHMARKS.map((m) => {
          const active = m.id === metricId
          return (
            <button
              key={m.id}
              type="button"
              role="tab"
              id={`bench-tab-${m.id}`}
              aria-selected={active}
              aria-controls={`bench-panel-${m.id}`}
              onClick={() => setMetricId(m.id)}
              className={`flex shrink-0 flex-col items-start gap-0.5 rounded-md border px-4 py-3 text-left transition-colors lg:w-full lg:rounded-none lg:border-0 lg:border-l ${
                active
                  ? "border-white/25 bg-white/[0.06] text-white lg:border-white lg:bg-white/[0.04]"
                  : "border-white/[0.1] bg-[#0a0a0a] text-white/55 hover:text-white lg:border-white/[0.1] lg:bg-transparent"
              }`}
            >
              <span className="whitespace-nowrap text-sm font-semibold">{m.label}</span>
              <span className={`font-mono text-[11px] ${active ? "text-white/60" : "text-white/35"}`}>
                {m.badge}
              </span>
            </button>
          )
        })}
      </div>

      {/* Every metric is in the HTML; inactive ones are hidden. */}
      {BENCHMARKS.map((m) => {
        const vi = Math.min(variants[m.id] ?? 0, m.variants.length - 1)
        const variant = m.variants[vi]
        const ours = variant.rows.find((r) => r.kind === "ours")!.value
        const max = Math.max(...variant.rows.map((r) => r.value))
        return (
          <div
            key={m.id}
            role="tabpanel"
            id={`bench-panel-${m.id}`}
            aria-labelledby={`bench-tab-${m.id}`}
            hidden={m.id !== metricId}
            className="min-w-0 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">{m.title}</h3>
                <p className="mt-1 text-sm font-normal text-white/45">{m.sub}</p>
              </div>
              <p className="shrink-0 font-mono text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {m.badge}
              </p>
            </div>

            {m.variants.length > 1 && (
              <div
                role="radiogroup"
                aria-label={`${m.label} workload`}
                className="mt-6 flex w-fit max-w-full flex-wrap gap-1 rounded-2xl border border-white/[0.12] bg-black p-1 sm:rounded-full"
              >
                {m.variants.map((v, i) => (
                  <button
                    key={v.id}
                    type="button"
                    role="radio"
                    aria-checked={i === vi}
                    onClick={() => setVariants((s) => ({ ...s, [m.id]: i }))}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                      i === vi ? "bg-white text-black" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            )}

            <ul key={variant.id} className="mt-8 space-y-5">
              {variant.rows.map((row, ri) => (
                <BenchBar
                  key={row.name}
                  name={row.name}
                  display={row.display}
                  pct={pct(row.value, max)}
                  ratio={row.kind === "ours" ? undefined : ratioLabel(row.value, ours)}
                  ours={row.kind === "ours"}
                  index={ri}
                />
              ))}
            </ul>

            <p className="mt-8 border-t border-white/[0.06] pt-5 text-sm font-normal leading-relaxed text-white/55 sm:text-base">
              {variant.note}
            </p>
          </div>
        )
      })}
    </div>
  )
}

const RUNS = [1_000, 10_000, 100_000]

function ms(value: number) {
  if (value >= 1000) return `${(value / 1000).toFixed(2)} s`
  if (value >= 10) return `${Math.round(value).toLocaleString("en-US")} ms`
  return `${value.toFixed(1)} ms`
}

// Adds up what each gateway costs one agent run, from the paper's measured
// startup, per-call and reconnect figures.
export function AgentMath() {
  const [steps, setSteps] = useState(50)
  const [runs, setRuns] = useState(10_000)
  const [fresh, setFresh] = useState(true)
  const [pauses, setPauses] = useState(true)

  const { coldStart, perCall, handshake } = AGENT_MATH
  const reconnects = pauses ? Math.max(0, steps - 1) : 0
  const lines = [
    {
      label: "Fresh process to first response",
      litellm: fresh ? coldStart.litellm : 0,
      routehub: fresh ? coldStart.routehub : 0,
      off: !fresh,
    },
    {
      label: `Gateway overhead across ${steps} ${steps === 1 ? "call" : "calls"}`,
      litellm: steps * perCall.litellm,
      routehub: steps * perCall.routehub,
      off: false,
    },
    {
      label: `Reconnects after ${reconnects} tool ${reconnects === 1 ? "pause" : "pauses"}`,
      litellm: reconnects * handshake,
      routehub: 0,
      off: !pauses,
    },
  ]
  const total = {
    litellm: lines.reduce((s, l) => s + l.litellm, 0),
    routehub: lines.reduce((s, l) => s + l.routehub, 0),
  }
  const saved = total.litellm - total.routehub
  const hoursPerDay = (saved * runs) / 1000 / 3600
  const max = Math.max(total.litellm, total.routehub, 1)

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="border-b border-white/[0.08] p-5 sm:p-8 lg:border-b-0 lg:border-r">
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
            What it adds up to over an agent run
          </h3>
          <p className="mt-2 text-sm font-normal leading-relaxed text-white/50">
            Describe your agent and see the client-side time each gateway adds, before the model
            generates a single token.
          </p>

          <div className="mt-8">
            <div className="flex items-baseline justify-between">
              <label htmlFor="agent-steps" className="text-sm font-medium text-white/80">
                Model calls per run
              </label>
              <span className="font-mono text-sm tabular-nums text-white">{steps}</span>
            </div>
            <input
              id="agent-steps"
              type="range"
              min={1}
              max={200}
              value={steps}
              onChange={(e) => setSteps(Number(e.target.value))}
              className="mt-3 w-full cursor-pointer accent-white"
            />
          </div>

          <div className="mt-6">
            <p id="agent-runs" className="text-sm font-medium text-white/80">
              Runs per day
            </p>
            <div
              role="radiogroup"
              aria-labelledby="agent-runs"
              className="mt-3 flex w-fit gap-1 rounded-full border border-white/[0.12] bg-black p-1"
            >
              {RUNS.map((n) => (
                <button
                  key={n}
                  type="button"
                  role="radio"
                  aria-checked={runs === n}
                  onClick={() => setRuns(n)}
                  className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors ${
                    runs === n ? "bg-white text-black" : "text-white/55 hover:text-white"
                  }`}
                >
                  {n.toLocaleString("en-US")}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Toggle
              checked={fresh}
              onChange={setFresh}
              label="Each run starts a fresh process"
              hint="Serverless functions, CI jobs, per-task workers"
            />
            <Toggle
              checked={pauses}
              onChange={setPauses}
              label="Tool calls longer than 5 s between steps"
              hint="Browsing, code execution, long API calls"
            />
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-wrap items-end gap-x-6 gap-y-2">
            <p className="text-4xl font-semibold tracking-tighter text-white tabular-nums sm:text-5xl">
              {ms(saved)}
            </p>
            <p className="pb-1.5 text-sm font-normal text-white/50">saved on every run</p>
          </div>
          <p className="mt-2 text-sm font-normal text-white/50">
            <span className="font-medium tabular-nums text-white/85">
              {hoursPerDay >= 10 ? Math.round(hoursPerDay).toLocaleString("en-US") : hoursPerDay.toFixed(1)}{" "}
              hours
            </span>{" "}
            of agent wall-clock time a day at {runs.toLocaleString("en-US")} runs.
          </p>

          <div className="mt-8 space-y-4">
            {(
              [
                ["LiteLLM", total.litellm, false],
                ["RouteHub", total.routehub, true],
              ] as const
            ).map(([name, value, ours]) => (
              <div key={name}>
                <div className="mb-1.5 flex items-baseline justify-between text-sm">
                  <span className={ours ? "font-medium text-white" : "text-white/50"}>{name}</span>
                  <span className={`font-mono text-xs tabular-nums ${ours ? "text-white" : "text-white/50"}`}>
                    {ms(value)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={`h-2 rounded-full ${ours ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]" : "bg-white/25"}`}
                    initial={false}
                    animate={{ width: `${Math.max(0.6, (value / max) * 100)}%` }}
                    transition={{ duration: 0.45, ease }}
                  />
                </div>
              </div>
            ))}
          </div>

          <table className="mt-8 w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/[0.08] text-white/40">
                <th scope="col" className="pb-2 font-medium">Where the time goes</th>
                <th scope="col" className="pb-2 text-right font-medium">LiteLLM</th>
                <th scope="col" className="pb-2 text-right font-medium">RouteHub</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06]">
              {lines.map((l) => (
                <tr key={l.label} className={l.off ? "text-white/25" : "text-white/70"}>
                  <th scope="row" className="py-2.5 pr-3 font-normal">{l.label}</th>
                  <td className="py-2.5 text-right font-mono tabular-nums">{ms(l.litellm)}</td>
                  <td className="py-2.5 text-right font-mono tabular-nums">{ms(l.routehub)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
  hint,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  hint: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex w-full items-start gap-3 rounded-md border border-white/[0.08] bg-black px-3.5 py-3 text-left transition-colors hover:border-white/20"
    >
      <span
        aria-hidden="true"
        className={`mt-0.5 flex h-4 w-7 shrink-0 items-center rounded-full p-0.5 transition-colors ${
          checked ? "bg-white" : "bg-white/15"
        }`}
      >
        <span
          className={`h-3 w-3 rounded-full transition-transform ${
            checked ? "translate-x-3 bg-black" : "translate-x-0 bg-white/60"
          }`}
        />
      </span>
      <span>
        <span className="block text-sm font-medium text-white/85">{label}</span>
        <span className="mt-0.5 block text-xs font-normal text-white/40">{hint}</span>
      </span>
    </button>
  )
}
