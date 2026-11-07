"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: a lease expiry timeline. Eight tenants across 36 months; the
// abstraction agent reads one lease at a time and fills in rent steps,
// options and critical dates as it goes.

const MONTHS = 36
const TENANTS = [
  { name: "Northwind Dental", suite: "410", start: 0, end: 22, steps: [8, 20], option: 12, notice: 16 },
  { name: "Carraway Books", suite: "120", start: 0, end: 9, steps: [], option: 0, notice: 3 },
  { name: "Pell & Grange LLP", suite: "600", start: 0, end: 34, steps: [12, 24], option: 24, notice: 28 },
  { name: "Vela Fitness", suite: "100", start: 2, end: 30, steps: [14, 26], option: 0, notice: 24 },
  { name: "Orchard Pediatrics", suite: "520", start: 0, end: 15, steps: [12], option: 36, notice: 9 },
  { name: "Tessera Studio", suite: "210", start: 4, end: 36, steps: [16, 28], option: 0, notice: 30 },
  { name: "Marlow Coffee", suite: "105", start: 0, end: 12, steps: [], option: 24, notice: 6 },
  { name: "Halden Insurance", suite: "300", start: 1, end: 27, steps: [13, 25], option: 12, notice: 21 },
]
const TICKS_PER_LEASE = 5 // read, extract, dates, write, rest
const FOUND = [
  "rent step found on page 14, annual 3% from month",
  "renewal option: one term, notice due month",
  "critical date: notice window opens month",
  "amendment 2 moves expiration to month",
  "termination option, fee equal to two months rent, notice month",
]

export function LeaseExpiryTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1100)

  const cursor = Math.floor(tick / TICKS_PER_LEASE) // which lease is being read
  const phase = tick % TICKS_PER_LEASE
  const pass = Math.floor(cursor / TENANTS.length)
  const current = cursor % TENANTS.length

  // How much of each row has been filled in: finished leases show everything;
  // the current lease fills in by phase; later leases show only the bar.
  const level = (i: number) => {
    if (pass > 0 && i !== current) return 4
    if (i < current) return 4
    if (i === current) return phase
    return 0
  }

  const feed = useMemo(() => {
    const out: { key: string; text: string }[] = []
    for (let t = tick; t > tick - 3 && t >= 0; t--) {
      const c = Math.floor(t / TICKS_PER_LEASE) % TENANTS.length
      const p = t % TICKS_PER_LEASE
      const tenant = TENANTS[c]
      if (p === 0) out.push({ key: `t${t}`, text: `Lease Reader: ${tenant.name}, suite ${tenant.suite}, base lease and amendments ordered` })
      else if (p === 1) out.push({ key: `t${t}`, text: `Term Extractor: ${tenant.steps.length} rent steps, ${tenant.option ? "one option" : "no option"}, CAM pro rata` })
      else if (p === 2) out.push({ key: `t${t}`, text: `Critical Dates: ${FOUND[Math.floor(noise(400 + c, t) * FOUND.length)]} ${tenant.notice + 1}` })
      else if (p === 3) out.push({ key: `t${t}`, text: `Abstract Writer: ${tenant.name} abstract assembled, ${Math.floor(noise(410 + c, t) * 3)} clauses for counsel` })
      else out.push({ key: `t${t}`, text: `Run complete for suite ${tenant.suite}, abstract written to the asset system` })
    }
    return out
  }, [tick])

  const LABEL_W = 150
  const ROW_H = 24
  const ROW_GAP = 6
  const HEAD_H = 18
  const GRID_W = 480
  const W = LABEL_W + GRID_W
  const H = HEAD_H + TENANTS.length * (ROW_H + ROW_GAP)
  const mx = (m: number) => LABEL_W + (m / MONTHS) * GRID_W

  const expiringSoon = TENANTS.filter((t) => t.end <= 12).length

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Riverside Plaza · lease expiries</span>
        <span className="font-mono text-[11px] text-white/45">{expiringSoon} expiring within 12 months</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated portfolio" : "Paused"} />
      </div>

      <div className="p-3 sm:p-4">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated lease expiry timeline for eight tenants over 36 months, filled in by the abstraction agents">
          {Array.from({ length: 4 }, (_, i) => i * 12).map((m) => (
            <g key={m}>
              <line x1={mx(m)} x2={mx(m)} y1={HEAD_H - 4} y2={H} stroke="rgba(255,255,255,0.08)" />
              <text x={mx(m) + 3} y={10} fontSize={8.5} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                {m === 0 ? "now" : `+${m / 12}y`}
              </text>
            </g>
          ))}
          <line x1={mx(12)} x2={mx(12)} y1={HEAD_H - 4} y2={H} stroke={`${ACCENT}66`} strokeDasharray="3 3" />

          {TENANTS.map((t, i) => {
            const y = HEAD_H + i * (ROW_H + ROW_GAP)
            const lv = level(i)
            const reading = i === current && phase < 4
            return (
              <g key={t.name}>
                <text x={0} y={y + 11} fontSize={9.5} fontWeight={600} fill={reading ? "#fff" : "rgba(255,255,255,0.8)"}>
                  {t.name}
                </text>
                <text x={0} y={y + 21} fontSize={8} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                  suite {t.suite}
                </text>
                {/* Lease term */}
                <rect x={mx(t.start)} y={y + 4} width={mx(t.end) - mx(t.start)} height={ROW_H - 8} rx={3} fill={t.end <= 12 ? `${ACCENT}55` : "rgba(255,255,255,0.1)"} stroke={reading ? ACCENT : "transparent"} strokeWidth={1} style={{ transition: "stroke 300ms" }} />
                {/* Renewal option, drawn hatched past expiry once extracted */}
                {t.option > 0 && lv >= 2 && (
                  <rect x={mx(t.end)} y={y + 6} width={Math.max(0, mx(Math.min(MONTHS, t.end + t.option)) - mx(t.end))} height={ROW_H - 12} rx={2} fill="none" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 2" style={{ transition: "opacity 400ms" }} />
                )}
                {/* Rent steps */}
                {lv >= 2 &&
                  t.steps.map((s) => (
                    <g key={s}>
                      <line x1={mx(s)} x2={mx(s)} y1={y + 4} y2={y + ROW_H - 4} stroke="#fff" strokeOpacity={0.7} strokeWidth={1.2} />
                      <text x={mx(s) + 2} y={y + 10} fontSize={6.5} fontFamily={MONO} fill="rgba(255,255,255,0.55)">
                        step
                      </text>
                    </g>
                  ))}
                {/* Critical date: notice window */}
                {lv >= 3 && (
                  <g transform={`translate(${mx(t.notice)}, ${y + ROW_H / 2})`}>
                    <polygon points="0,-5 5,0 0,5 -5,0" fill={ACCENT} />
                  </g>
                )}
                {/* Abstract written */}
                {lv >= 4 && (
                  <text x={W - 2} y={y + 15} textAnchor="end" fontSize={8} fontFamily={MONO} fill={ACCENT}>
                    abstracted
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
          <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm" style={{ background: `${ACCENT}55` }} aria-hidden="true" />expires within 12 months</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-4 rounded-sm border border-dashed border-white/40" aria-hidden="true" />renewal option</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-px bg-white/70" aria-hidden="true" />rent step</span>
          <span className="flex items-center gap-1.5"><span className="h-2 w-2 rotate-45" style={{ background: ACCENT }} aria-hidden="true" />notice date</span>
        </div>
      </div>

      <div className="border-t border-white/[0.08] px-4 py-3 font-mono text-[11px] leading-5 text-white/50">
        {feed.length === 0 ? <p>Scroll into view to start the abstraction run.</p> : feed.map((f) => <p key={f.key} className="truncate">{f.text}</p>)}
      </div>
    </div>
  )
}

// Second visual: the due diligence checklist board. Items grouped by
// workstream move from pending to drafted to reviewed, and the analyst's
// notes appear underneath.

type ItemState = "pending" | "drafted" | "reviewed"

const WORKSTREAMS: { name: string; agent: string; model: string; items: string[] }[] = [
  { name: "Title", agent: "Title Agent", model: "gpt-4.1-mini", items: ["Commitment exceptions", "ALTA survey vs legal", "Recorded easements", "Zoning letter"] },
  { name: "Environmental", agent: "Environmental Agent", model: "claude-haiku-5-5", items: ["Phase I RECs", "UST closure records", "Asbestos survey", "Wetlands check"] },
  { name: "Financials", agent: "Financials Agent", model: "gpt-5.4", items: ["Rent roll vs leases", "T12 normalisation", "CAM reconciliation", "Arrears and credits", "Capex history"] },
  { name: "Physical", agent: "Physical Agent", model: "gemini-2.5-flash", items: ["PCA immediate repairs", "Roof warranty", "Elevator inspection", "ADA items"] },
]
const NOTES = [
  "rent roll shows suite 520 at 28.50 psf, lease says 27.75 after the 2025 amendment",
  "Phase I lists one REC: former dry cleaner, 1998 UST closure letter on file",
  "survey shows a 2 ft encroachment on the north line, title exception 14",
  "roof warranty expires eight months after closing, flag for the capex budget",
  "CAM recon under-recovered 2025 by the management fee cap in three leases",
  "elevator inspection has an open item from 2025, repair quote in folder",
  "zoning letter is from 2019, request a current one as a closing condition",
]
const TOTAL = WORKSTREAMS.reduce((n, w) => n + w.items.length, 0)
const CYCLE = TOTAL * 2 + 8

export function DueDiligenceBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 900)

  const step = tick % CYCLE
  const round = Math.floor(tick / CYCLE)

  // Items are drafted in a shuffled order, then reviewed in the same order
  // one cycle later, so the board fills in twice per round.
  const order = useMemo(() => {
    const idx = Array.from({ length: TOTAL }, (_, i) => i)
    return idx.map((i) => ({ i, k: noise(500 + round, i) })).sort((a, b) => a.k - b.k).map((o) => o.i)
  }, [round])

  const stateOf = (flat: number): ItemState => {
    const pos = order.indexOf(flat)
    if (step > TOTAL + pos) return "reviewed"
    if (step > pos) return "drafted"
    return "pending"
  }

  let flat = 0
  const groups = WORKSTREAMS.map((w) => {
    const items = w.items.map((label) => ({ label, state: stateOf(flat++) }))
    return { ...w, items }
  })

  const counts = groups.flatMap((g) => g.items).reduce(
    (acc, it) => ({ ...acc, [it.state]: acc[it.state] + 1 }),
    { pending: 0, drafted: 0, reviewed: 0 } as Record<ItemState, number>,
  )

  const notes = useMemo(() => {
    const out: { key: number; text: string }[] = []
    for (let t = tick; t > tick - 3 && t >= 0; t--) {
      if (t % 3 !== 0) continue
      out.push({ key: t, text: NOTES[Math.floor(noise(520, t) * NOTES.length)] })
    }
    return out
  }, [tick])

  const dot = (s: ItemState) => (s === "reviewed" ? ACCENT : s === "drafted" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.18)")

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Riverside Plaza · diligence board</span>
        <span className="font-mono text-[11px] text-white/45">HierarchicalSwarm · 4 workstreams</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated deal" : "Paused"} />
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1 border-b border-white/[0.08] px-4 py-2 font-mono text-[10px] text-white/45">
        {(["pending", "drafted", "reviewed"] as ItemState[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ background: dot(s) }} aria-hidden="true" />
            {s} <span className="tabular-nums text-white/70">{counts[s]}</span>
          </span>
        ))}
        <span className="ml-auto">reviewed by the deal analyst</span>
      </div>

      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g) => (
          <div key={g.name} className="bg-[#0a0a0a] p-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-sm font-semibold text-white/85">{g.name}</h3>
              <span className="font-mono text-[10px] tabular-nums text-white/40">
                {g.items.filter((i) => i.state === "reviewed").length}/{g.items.length}
              </span>
            </div>
            <p className="font-mono text-[10px] text-white/35">
              {g.agent} · {g.model}
            </p>
            <ul className="mt-3 space-y-1.5">
              {g.items.map((it) => (
                <li key={it.label} className="flex items-center gap-2 text-xs">
                  <span className="h-2 w-2 shrink-0 rounded-full transition-colors duration-500" style={{ background: dot(it.state) }} aria-hidden="true" />
                  <span className="truncate" style={{ color: it.state === "pending" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.8)" }}>
                    {it.label}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-[9.5px] text-white/35">{it.state === "pending" ? "" : it.state}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.08] px-4 py-3 font-mono text-[11px] leading-5 text-white/50">
        <p className="text-[10px] uppercase tracking-[0.16em] text-white/35">Analyst notes</p>
        {notes.length === 0 ? <p>Waiting for the first finding.</p> : notes.map((n) => <p key={n.key} className="truncate">{n.text}</p>)}
      </div>
    </div>
  )
}
