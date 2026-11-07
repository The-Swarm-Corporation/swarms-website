"use client"

import { ArrowUpRight } from "lucide-react"
import { useRef } from "react"

import { SimulatedBadge } from "./simulated-badge"
import { formatCompact, linePath, useSimulationClock, walk } from "./use-simulation"

// The kind of panel a run shows in Swarms Cloud: runs, latency, tokens and
// spend, each with a sparkline that moves. Pages pass plain data (no
// functions, so a server page can hand it over) and can scale the defaults
// so a claims desk and a trading desk do not draw the same numbers.

export type TelemetryMetric = {
  label: string
  min: number
  max: number
  /** How the current value is printed. */
  unit: "compact" | "int" | "seconds" | "usd" | "percent"
  /** Seed for the series so the sparklines do not move in lockstep. */
  seed: number
}

function defaultMetrics(scale: number): TelemetryMetric[] {
  return [
    { label: "Runs / min", min: 18 * scale, max: 64 * scale, unit: "int", seed: 3 },
    { label: "p50 latency", min: 1.4, max: 4.8, unit: "seconds", seed: 5 },
    { label: "Tokens / min", min: 40_000 * scale, max: 160_000 * scale, unit: "compact", seed: 7 },
    { label: "Spend / hour", min: 1.8 * scale, max: 6.4 * scale, unit: "usd", seed: 9 },
  ]
}

function format(v: number, unit: TelemetryMetric["unit"]) {
  switch (unit) {
    case "compact":
      return formatCompact(v)
    case "int":
      return `${Math.round(v)}`
    case "seconds":
      return `${v.toFixed(1)}s`
    case "usd":
      return `$${v.toFixed(2)}`
    case "percent":
      return `${v.toFixed(1)}%`
  }
}

export function CloudTelemetry({
  accent,
  metrics,
  scale = 1,
  swarmName,
  className,
}: {
  accent: string
  /** Custom tiles; when omitted the four default tiles are drawn, multiplied by `scale`. */
  metrics?: TelemetryMetric[]
  scale?: number
  swarmName: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1000)
  const tiles = metrics ?? defaultMetrics(scale)
  const POINTS = 28
  const W = 160
  const H = 36

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
          <span className="text-sm font-semibold text-white/85">Swarms Cloud</span>
          <span className="truncate font-mono text-[11px] text-white/45">{swarmName}</span>
          <SimulatedBadge className="ml-auto" label={running ? "Simulated telemetry" : "Simulation paused"} />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {tiles.map((m, i) => {
            const series = walk(m.seed, tick + 40, POINTS, m.min, m.max, 0.1)
            const value = series[series.length - 1]
            const prev = series[series.length - 2] ?? value
            const up = value >= prev
            const border = [i % 2 === 1 ? "border-l border-white/[0.08]" : "", i >= 2 ? "border-t border-white/[0.08] lg:border-t-0" : "", i >= 2 && i % 2 === 0 ? "lg:border-l lg:border-white/[0.08]" : ""].join(" ")
            return (
              <div key={m.label} className={`p-4 ${border}`}>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{m.label}</p>
                <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-white">{format(value, m.unit)}</p>
                <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="mt-2 block overflow-visible" aria-hidden="true">
                  <path d={linePath(series, W, H - 4, m.min, m.max)} fill="none" stroke={accent} strokeWidth={1.5} strokeLinejoin="round" style={{ opacity: 0.9 }} />
                  <circle cx={W} cy={H - 4 - ((value - m.min) / (m.max - m.min || 1)) * (H - 4)} r={2.5} fill={accent} />
                </svg>
                <p className="mt-1 font-mono text-[10px] text-white/35">{up ? "▲" : "▼"} last 30s</p>
              </div>
            )
          })}
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.08] px-4 py-2.5">
          <p className="text-xs text-white/45">Every run on the Swarms API appears in Swarms Cloud with its logs, token usage, cost and context use.</p>
          <a href="https://cloud.swarms.world" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-medium text-white/70 transition-colors hover:text-white">
            Open Swarms Cloud
            <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
          </a>
        </div>
      </div>
    </div>
  )
}
