"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { linePath, noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: the asset health matrix. Twelve assets by four signals; the
// inspection agents sweep across the fleet and recolour each cell as they
// rate it, and three agents discuss the worst asset in a short group chat.

const ASSETS = ["WTG-01", "WTG-02", "WTG-03", "WTG-04", "T-14", "T-22", "GT-1", "GT-2", "PV-A inv", "PV-B inv", "BESS-1", "Pump P-3"]
const SIGNALS: { key: string; label: string; agent: string; model: string }[] = [
  { key: "vib", label: "Vibration", agent: "Vibration Agent", model: "gpt-4.1-mini" },
  { key: "temp", label: "Temperature", agent: "Temperature Agent", model: "claude-haiku-5-5" },
  { key: "out", label: "Output", agent: "Output Agent", model: "gemini-2.5-flash" },
  { key: "age", label: "Age", agent: "Age Agent", model: "deepseek-chat" },
]
const CELLS = ASSETS.length * SIGNALS.length

type Rating = 0 | 1 | 2 // green, amber, red

function ratingFor(asset: number, signal: number, pass: number): Rating {
  // A slow drift per cell so most of the fleet stays green and a few assets
  // move through amber and red over time.
  const v = noise(200 + asset * 4 + signal, pass) * 0.6 + noise(300 + asset, Math.floor(pass / 2)) * 0.4
  return v > 0.86 ? 2 : v > 0.66 ? 1 : 0
}

const RATING_BG = ["rgba(255,255,255,0.08)", "rgba(255,255,255,0.42)", "rgba(239,68,68,0.8)"]
const RATING_LABEL = ["green", "amber", "red"]

export function AssetHealthMatrix() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 700)
  const t = tick + CELLS * 2

  const { cells, cursor, worst } = useMemo(() => {
    const cursor = t % CELLS
    const pass = Math.floor(t / CELLS)
    const cells: Rating[][] = ASSETS.map((_, a) =>
      SIGNALS.map((_, s) => {
        const idx = a * SIGNALS.length + s
        // Cells the sweep has passed this round carry the new rating, the
        // rest still show last round's.
        return ratingFor(a, s, idx <= cursor ? pass : pass - 1)
      }),
    )
    let worst = 0
    let worstScore = -1
    cells.forEach((row, a) => {
      const score = row.reduce<number>((sum, r) => sum + r * r, 0) + (a === 4 ? 0.1 : 0)
      if (score > worstScore) {
        worstScore = score
        worst = a
      }
    })
    return { cells, cursor, worst }
  }, [t])

  const worstRow = cells[worst]
  const worstSignal = worstRow.indexOf(Math.max(...worstRow) as Rating)
  const sig = SIGNALS[worstSignal]
  const level = RATING_LABEL[worstRow[worstSignal]]
  const reds = cells.flat().filter((r) => r === 2).length
  const ambers = cells.flat().filter((r) => r === 1).length

  const transcript = [
    { agent: "Grid Ops Analyst", model: "gpt-5.4", text: `${ASSETS[worst]} is ${level} on ${sig.label.toLowerCase()}. Can it carry its share of the evening peak?` },
    { agent: "Asset Engineer", model: "claude-sonnet-5-5", text: worstRow[worstSignal] === 2 ? `Only at reduced loading. I would ask the operator to hold it under 80 percent of rating until a field check.` : `Yes for tonight. The ${sig.label.toLowerCase()} trend is inside limits; put it on the inspection list, no operator action.` },
    { agent: "Market Analyst", model: "gemini-2.5-pro", text: worstRow[worstSignal] === 2 ? `A derate on ${ASSETS[worst]} at the peak means buying the gap at real-time prices. Flag it for the desk.` : `No market impact if it runs. I will note the inspection in tomorrow's morning note.` },
  ]
  const shown = Math.min(3, Math.floor((t % 12) / 3) + 1)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Fleet health · inspection sweep</span>
        <span className="font-mono text-[11px] text-white/45">
          {reds} red · {ambers} amber
        </span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated fleet" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-[72px_repeat(4,minmax(0,1fr))] gap-1" role="table" aria-label="Simulated asset health matrix: twelve assets rated green, amber or red on vibration, temperature, output and age">
            <span aria-hidden="true" />
            {SIGNALS.map((s) => (
              <span key={s.key} role="columnheader" className="truncate text-center font-mono text-[9px] uppercase tracking-[0.12em] text-white/45">
                {s.label}
              </span>
            ))}
            {ASSETS.map((name, a) => (
              <div key={name} className="contents" role="row">
                <span role="rowheader" className="self-center truncate font-mono text-[10px]" style={{ color: a === worst ? "#fff" : "rgba(255,255,255,0.55)" }}>
                  {name}
                </span>
                {SIGNALS.map((s, si) => {
                  const idx = a * SIGNALS.length + si
                  const r = cells[a][si]
                  const active = idx === cursor
                  return (
                    <div
                      key={s.key}
                      role="cell"
                      aria-label={`${name} ${s.label} ${RATING_LABEL[r]}`}
                      className="h-5 rounded-sm"
                      style={{
                        background: RATING_BG[r],
                        outline: active ? `1.5px solid ${ACCENT}` : "1.5px solid transparent",
                        outlineOffset: -1,
                        transition: "background 500ms, outline-color 200ms",
                      }}
                    />
                  )
                })}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
            {SIGNALS.map((s) => (
              <span key={s.key} className="truncate">
                {s.label}: <span className="text-white/60">{s.model}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">GroupChat · {ASSETS[worst]}</p>
          <ul className="mt-3 space-y-3">
            {transcript.slice(0, shown).map((line) => (
              <li key={line.agent} className="text-xs leading-snug">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white/85">{line.agent}</span>
                  <span className="truncate font-mono text-[10px] text-white/35">{line.model}</span>
                </div>
                <p className="mt-0.5 text-white/55">{line.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">Transcript to control room</p>
        </div>
      </div>
    </div>
  )
}

// Second visual: 24 hours of grid load against generation, the duck-curve
// shape scrolling under a window of events where the agents flagged a ramp,
// a price spike or an asset, and the battery fleet's state of charge.

const STEPS_PER_HOUR = 4
const WINDOW = 24 * STEPS_PER_HOUR

function hourOf(j: number) {
  return ((j / STEPS_PER_HOUR) % 24 + 24) % 24
}

function netLoadAt(j: number) {
  const h = hourOf(j)
  const base = 22 + 4 * Math.cos(((h - 18) * Math.PI) / 12)
  const solar = h > 6 && h < 18 ? 9 * Math.sin(((h - 6) * Math.PI) / 12) : 0
  return base - solar + (noise(400, j) - 0.5) * 0.9
}

function generationAt(j: number) {
  // Dispatch follows net load with a small lag and a reserve margin, and the
  // battery covers part of the evening ramp.
  const h = hourOf(j)
  const battery = h >= 17 && h <= 21 ? 2.2 : h >= 10 && h <= 15 ? -1.6 : 0
  return netLoadAt(j - 2) + 0.9 + battery * 0.6 + (noise(401, j) - 0.5) * 0.6
}

function socAt(j: number) {
  const h = hourOf(j)
  return 55 + 35 * Math.cos(((h - 16) * Math.PI) / 12)
}

type GridEvent = { j: number; agent: string; model: string; text: string; color: string }

function eventAt(j: number): GridEvent | null {
  if (j % 20 !== 0) return null
  const h = hourOf(j)
  if (h >= 16 && h <= 20) return { j, agent: "Grid Ops", model: "gpt-5.4", text: `ramp ${(2.4 + noise(402, j) * 1.2).toFixed(1)} GW/h flagged, ${Math.round(20 + noise(403, j) * 40)} min early`, color: "rgba(255,255,255,0.9)" }
  if (h >= 10 && h <= 15) return { j, agent: "Market", model: "gemini-2.5-pro", text: `midday price near zero, charge window noted`, color: "rgba(255,255,255,0.6)" }
  if (h >= 21 || h < 2) return { j, agent: "Market", model: "gemini-2.5-pro", text: `real-time price ${(2 + noise(404, j) * 2).toFixed(1)}x day-ahead at the peak`, color: RED }
  return { j, agent: "Asset", model: "claude-sonnet-5-5", text: `T-14 top-oil ${Math.round(84 + noise(405, j) * 10)} C, inside rating`, color: "rgba(255,255,255,0.6)" }
}

export function GridLoadCurve() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 800)
  const now = tick + 24 * STEPS_PER_HOUR * 3 + 17 * STEPS_PER_HOUR

  const W = 640
  const H = 200
  const PAD = { l: 8, r: 40, t: 16, b: 22 }
  const innerW = W - PAD.l - PAD.r
  const innerH = H - PAD.t - PAD.b
  const MIN = 10
  const MAX = 30

  const { load, gen, events, hourTicks } = useMemo(() => {
    const load: number[] = []
    const gen: number[] = []
    const events: (GridEvent & { x: number })[] = []
    const hourTicks: { x: number; label: string }[] = []
    const start = now - WINDOW + 1
    for (let i = 0; i < WINDOW; i++) {
      const j = start + i
      load.push(netLoadAt(j))
      gen.push(generationAt(j))
      const x = (i / (WINDOW - 1)) * innerW
      const ev = eventAt(j)
      if (ev) events.push({ ...ev, x })
      if (j % (6 * STEPS_PER_HOUR) === 0) hourTicks.push({ x, label: `${String(hourOf(j)).padStart(2, "0")}:00` })
    }
    return { load, gen, events, hourTicks }
  }, [now, innerW])

  const yFor = (v: number) => innerH - ((v - MIN) / (MAX - MIN)) * innerH
  const loadPath = linePath(load, innerW, innerH, MIN, MAX)
  const genPath = linePath(gen, innerW, innerH, MIN, MAX)
  const soc = socAt(now)
  const h = hourOf(now)
  const batteryState = h >= 17 && h <= 21 ? "discharging" : h >= 10 && h <= 15 ? "charging" : "holding"
  const latest = events.slice(-3).reverse()

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Balancing area · last 24 hours</span>
        <span className="font-mono text-[11px] tabular-nums text-white/45">
          {String(Math.floor(h)).padStart(2, "0")}:{String((now % STEPS_PER_HOUR) * 15).padStart(2, "0")} local
        </span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated grid" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_224px]">
        <div className="p-3 sm:p-4">
          <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
            <span className="inline-flex items-center gap-1.5"><span className="h-px w-4 bg-white/70" /> net load {load[load.length - 1].toFixed(1)} GW</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-px w-4" style={{ background: ACCENT }} /> dispatched generation {gen[gen.length - 1].toFixed(1)} GW</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated 24-hour net load and generation curves with agent-flagged events">
            <defs>
              <linearGradient id="energy-gen" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor={ACCENT} stopOpacity="0.14" />
                <stop offset="100%" stopColor={ACCENT} stopOpacity="0" />
              </linearGradient>
            </defs>
            <g transform={`translate(${PAD.l},${PAD.t})`}>
              {[10, 15, 20, 25, 30].map((v) => (
                <g key={v}>
                  <line x1={0} x2={innerW} y1={yFor(v)} y2={yFor(v)} stroke="rgba(255,255,255,0.06)" />
                  <text x={innerW + 6} y={yFor(v) + 3} fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.35)">
                    {v} GW
                  </text>
                </g>
              ))}
              {hourTicks.map((ht) => (
                <g key={ht.x}>
                  <line x1={ht.x} x2={ht.x} y1={0} y2={innerH} stroke="rgba(255,255,255,0.08)" />
                  <text x={ht.x} y={innerH + 14} textAnchor="middle" fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                    {ht.label}
                  </text>
                </g>
              ))}
              <path d={`${genPath} L${innerW},${innerH} L0,${innerH} Z`} fill="url(#energy-gen)" />
              <path d={genPath} fill="none" stroke={ACCENT} strokeWidth={1.5} strokeLinejoin="round" />
              <path d={loadPath} fill="none" stroke="rgba(255,255,255,0.75)" strokeWidth={1.3} strokeLinejoin="round" />
              {events.map((ev) => (
                <g key={ev.j}>
                  <line x1={ev.x} x2={ev.x} y1={0} y2={innerH} stroke={ev.color} strokeOpacity={0.5} strokeDasharray="2 3" />
                  <circle cx={ev.x} cy={yFor(load[Math.round((ev.x / innerW) * (WINDOW - 1))])} r={3.5} fill="#0a0a0a" stroke={ev.color} strokeWidth={1.3} />
                  <text x={ev.x} y={-5} textAnchor="middle" fontSize={8} fontFamily={MONO} fill={ev.color}>
                    {ev.agent.toUpperCase()}
                  </text>
                </g>
              ))}
              <circle cx={innerW} cy={yFor(gen[gen.length - 1])} r={3.5} fill={ACCENT}>
                {running && <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite" />}
              </circle>
            </g>
          </svg>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Battery fleet</p>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-semibold tabular-nums text-white">{Math.round(soc)}%</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: batteryState === "discharging" ? ACCENT : batteryState === "charging" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.5)" }}>
              {batteryState}
            </span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/[0.06]" role="img" aria-label={`Simulated battery state of charge ${Math.round(soc)} percent`}>
            <div className="h-2 rounded-full transition-[width] duration-700" style={{ width: `${soc}%`, background: ACCENT }} />
          </div>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Agent flags</p>
          <ul className="mt-2 space-y-2.5">
            {latest.map((ev) => (
              <li key={ev.j} className="text-xs leading-snug">
                <div className="flex items-center gap-2">
                  <span className="font-semibold" style={{ color: ev.color === RED ? RED : "rgba(255,255,255,0.85)" }}>
                    {ev.agent}
                  </span>
                  <span className="truncate font-mono text-[10px] text-white/35">{ev.model}</span>
                </div>
                <p className="mt-0.5 text-white/55">{ev.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-white/[0.08] pt-3 text-[11px] leading-snug text-white/45">Flags are read by the control room. Dispatch stays with the operator.</p>
        </div>
      </div>
    </div>
  )
}
