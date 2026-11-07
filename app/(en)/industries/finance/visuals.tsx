"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { linePath, noise, useSimulationClock, walk } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: a streaming price series with the moments where each desk
// agent spoke marked on the tape, and the last few signals listed beside it.

const SIGNALS = [
  { agent: "Quant", model: "gpt-5.4-mini", text: "momentum crossed the 20-day high, long bias" },
  { agent: "Risk", model: "claude-sonnet-5-5", text: "gross exposure trimmed to the 4.5% desk limit" },
  { agent: "Macro", model: "gemini-2.5-pro", text: "rates print already priced, no change to thesis" },
  { agent: "Equity", model: "claude-haiku-5-5", text: "guidance raise confirmed in the 8-K, margins intact" },
  { agent: "Risk", model: "claude-sonnet-5-5", text: "stop moved to 2% below entry after the gap" },
  { agent: "Quant", model: "gpt-5.4-mini", text: "volume 1.8x the 30-day average into the close" },
  { agent: "Director", model: "gpt-5.4", text: "memo approved, position sized at 60 bps" },
]
const SIGNAL_EVERY = 6

export function MarketSignalChart() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 900)

  const W = 560
  const H = 220
  const PAD = { l: 8, r: 44, t: 18, b: 22 }
  const innerW = W - PAD.l - PAD.r
  const innerH = H - PAD.t - PAD.b
  const POINTS = 72
  const t = tick + 300

  const series = useMemo(() => walk(21, t, POINTS, 96, 118, 0.09), [t])
  const min = Math.min(...series) - 1
  const max = Math.max(...series) + 1
  const last = series[series.length - 1]
  const first = series[0]
  const change = ((last - first) / first) * 100

  const path = linePath(series, innerW, innerH, min, max)
  const area = `${path} L${innerW},${innerH} L0,${innerH} Z`
  const yFor = (v: number) => innerH - ((v - min) / (max - min)) * innerH

  // Signal markers that fall inside the visible window.
  const markers = useMemo(() => {
    const out: { x: number; y: number; i: number; signal: (typeof SIGNALS)[number] }[] = []
    const start = t - POINTS + 1
    for (let k = start; k <= t; k++) {
      if (k % SIGNAL_EVERY !== 0) continue
      const idx = k - start
      const signal = SIGNALS[Math.floor(noise(3, k) * SIGNALS.length)]
      out.push({ x: (idx / (POINTS - 1)) * innerW, y: yFor(series[idx]), i: k, signal })
    }
    return out
  }, [t, series])

  const feed = markers.slice(-4).reverse()

  const tape = [
    { sym: "SPX", seed: 31 },
    { sym: "NDX", seed: 32 },
    { sym: "US10Y", seed: 33 },
    { sym: "BTC", seed: 34 },
  ].map((q) => {
    const v = (noise(q.seed, Math.floor(t / 3)) - 0.5) * 2.4
    return { ...q, pct: v }
  })

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-4 overflow-hidden border-b border-white/[0.08] px-4 py-2.5">
        {tape.map((q) => (
          <span key={q.sym} className="flex shrink-0 items-baseline gap-1.5 font-mono text-[11px]">
            <span className="text-white/55">{q.sym}</span>
            <span className="tabular-nums" style={{ color: q.pct >= 0 ? ACCENT : "#ef4444" }}>
              {q.pct >= 0 ? "+" : ""}
              {q.pct.toFixed(2)}%
            </span>
          </span>
        ))}
        <SimulatedBadge className="ml-auto" label={running ? "Simulated tape" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_200px]">
        <div className="p-3 sm:p-4">
          <div className="mb-2 flex items-baseline gap-3">
            <span className="text-sm font-semibold text-white/85">Research desk · live signals</span>
            <span className="font-mono text-xs tabular-nums text-white/60">{last.toFixed(2)}</span>
            <span className="font-mono text-xs tabular-nums" style={{ color: change >= 0 ? ACCENT : "#ef4444" }}>
              {change >= 0 ? "+" : ""}
              {change.toFixed(2)}%
            </span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated price series with agent signal markers">
            <defs>
              <linearGradient id="fin-area" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.28" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
            <g transform={`translate(${PAD.l},${PAD.t})`}>
              {[0, 0.25, 0.5, 0.75, 1].map((f) => (
                <g key={f}>
                  <line x1={0} x2={innerW} y1={innerH * f} y2={innerH * f} stroke="rgba(255,255,255,0.06)" />
                  <text x={innerW + 6} y={innerH * f + 3} fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.35)">
                    {(max - (max - min) * f).toFixed(0)}
                  </text>
                </g>
              ))}
              <path d={area} fill="url(#fin-area)" />
              <path d={path} fill="none" stroke={ACCENT} strokeWidth={1.6} strokeLinejoin="round" />
              {markers.map((m) => (
                <g key={m.i}>
                  <line x1={m.x} x2={m.x} y1={m.y} y2={innerH} stroke="rgba(255,255,255,0.12)" strokeDasharray="2 3" />
                  <circle cx={m.x} cy={m.y} r={3.5} fill="#0a0a0a" stroke={m.signal.agent === "Risk" ? "#ef4444" : "#fff"} strokeWidth={1.2} />
                  <text x={m.x} y={innerH + 14} textAnchor="middle" fontSize={8.5} fontFamily={MONO} fill="rgba(255,255,255,0.45)">
                    {m.signal.agent.toUpperCase()}
                  </text>
                </g>
              ))}
              <circle cx={innerW} cy={yFor(last)} r={3.5} fill={ACCENT}>
                {running && <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite" />}
              </circle>
            </g>
          </svg>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Latest signals</p>
          <ul className="mt-3 space-y-3">
            {feed.length === 0 && <li className="text-xs text-white/40">Scroll into view to start the tape.</li>}
            {feed.map((m) => (
              <li key={m.i} className="text-xs leading-snug">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white/85">{m.signal.agent}</span>
                  <span className="truncate font-mono text-[10px] text-white/35">{m.signal.model}</span>
                </div>
                <p className="mt-0.5 text-white/55">{m.signal.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: sector exposure across the book. The Risk agent trims any
// sleeve that drifts over the desk limit, and the trim is written to the log.

const SECTORS = ["Technology", "Financials", "Energy", "Healthcare", "Industrials", "Consumer"]
const LIMIT = 25

export function RiskAllocationBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1800)

  const { weights, trims } = useMemo(() => {
    const raw = SECTORS.map((_, i) => 10 + noise(50 + i, tick) * 22)
    const total = raw.reduce((a, b) => a + b, 0)
    let w = raw.map((v) => (v / total) * 100)
    const trims: { sector: string; from: number; to: number }[] = []
    w = w.map((v, i) => {
      if (v > LIMIT) {
        trims.push({ sector: SECTORS[i], from: v, to: LIMIT - 1 })
        return LIMIT - 1
      }
      return v
    })
    const cash = Math.max(0, 100 - w.reduce((a, b) => a + b, 0))
    return { weights: [...w, cash], trims }
  }, [tick])

  const labels = [...SECTORS, "Cash"]

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Risk agent · book exposure</span>
        <span className="font-mono text-[11px] text-white/45">limit {LIMIT}% per sector</span>
        <SimulatedBadge className="ml-auto" label={running ? "Rebalancing" : "Paused"} />
      </div>
      <div className="p-4">
        <ul className="space-y-2.5">
          {labels.map((label, i) => {
            const w = weights[i]
            const trimmed = trims.some((t) => t.sector === label)
            return (
              <li key={label} className="grid grid-cols-[88px_minmax(0,1fr)_48px] items-center gap-3 text-xs">
                <span className="truncate text-white/60">{label}</span>
                <div className="relative h-2 rounded-full bg-white/[0.06]">
                  <div
                    className="h-2 rounded-full transition-[width] duration-700 ease-out"
                    style={{ width: `${Math.min(100, (w / 40) * 100)}%`, background: label === "Cash" ? "rgba(255,255,255,0.35)" : trimmed ? "#ef4444" : ACCENT }}
                  />
                  {label !== "Cash" && <span className="absolute top-[-3px] h-[14px] w-px bg-white/30" style={{ left: `${(LIMIT / 40) * 100}%` }} aria-hidden="true" />}
                </div>
                <span className="text-right font-mono tabular-nums text-white/70">{w.toFixed(1)}%</span>
              </li>
            )
          })}
        </ul>
        <div className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-5 text-white/50">
          {trims.length === 0 ? (
            <p>Risk Agent: all sleeves inside limits, no action.</p>
          ) : (
            trims.map((t) => (
              <p key={t.sector}>
                Risk Agent: trimmed <span className="text-white/85">{t.sector}</span> {t.from.toFixed(1)}% to {t.to.toFixed(1)}%
              </p>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
