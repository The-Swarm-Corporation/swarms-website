"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: the RFI and submittal queue. Tickets arrive, a router sends
// each one to a discipline, the specialist drafts a response, and the draft
// waits at the superintendent review gate before it is issued.

type Discipline = "Structural" | "MEP" | "Architectural" | "Civil"

const DISCIPLINES: { name: Discipline; agent: string; model: string }[] = [
  { name: "Structural", agent: "Structural", model: "claude-sonnet-5-5" },
  { name: "MEP", agent: "MEP", model: "gpt-5.4" },
  { name: "Architectural", agent: "Architectural", model: "claude-haiku-5-5" },
  { name: "Civil", agent: "Civil", model: "gemini-2.5-flash" },
]

const TICKETS: { kind: "RFI" | "SUB"; subject: string; discipline: Discipline }[] = [
  { kind: "RFI", subject: "Duct penetration at beam B-12, grid C-4", discipline: "Structural" },
  { kind: "SUB", subject: "AHU-2 product data, Division 23 05 00", discipline: "MEP" },
  { kind: "RFI", subject: "Door hardware set 04 conflicts with A-601", discipline: "Architectural" },
  { kind: "RFI", subject: "Storm inlet rim elevation vs. paving plan", discipline: "Civil" },
  { kind: "SUB", subject: "Curtain wall shop drawings, sheet 3 of 9", discipline: "Architectural" },
  { kind: "RFI", subject: "Rebar lap length at pile cap PC-7", discipline: "Structural" },
  { kind: "RFI", subject: "Panel LP-2 feeder size vs. one-line E-101", discipline: "MEP" },
  { kind: "SUB", subject: "Precast erection sequence and crane plan", discipline: "Structural" },
  { kind: "RFI", subject: "Fire rating of corridor soffit at level 2", discipline: "Architectural" },
  { kind: "SUB", subject: "Sanitary sewer tie-in detail, C-401", discipline: "Civil" },
  { kind: "RFI", subject: "Sprinkler main routing under W18 at grid E", discipline: "MEP" },
  { kind: "RFI", subject: "Retaining wall drainage board spec", discipline: "Civil" },
]

const STAGES = ["Received", "Routed", "Draft ready", "Superintendent review", "Issued"] as const
const ARRIVE_EVERY = 2
const ADVANCE_EVERY = 2

export function RfiQueueBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1400)
  const t = tick + 14

  const tickets = useMemo(() => {
    const out: { k: number; number: string; kind: "RFI" | "SUB"; subject: string; discipline: Discipline; stage: number }[] = []
    const newest = Math.floor(t / ARRIVE_EVERY)
    for (let k = newest; k >= Math.max(0, newest - 7); k--) {
      const tpl = TICKETS[k % TICKETS.length]
      const age = t - k * ARRIVE_EVERY
      // Some tickets wait a little longer at the review gate.
      const hold = noise(21, k) > 0.6 ? 1 : 0
      const raw = Math.floor(age / ADVANCE_EVERY)
      const stage = Math.min(STAGES.length - 1, raw >= 3 ? Math.max(3, raw - hold) : raw)
      out.push({ k, number: `${tpl.kind}-${String(80 + k).padStart(3, "0")}`, ...tpl, stage })
    }
    return out
  }, [t])

  const visible = tickets.slice(0, 6)
  const open = tickets.filter((x) => x.stage < 4)
  const atGate = open.filter((x) => x.stage === 3)
  const issuedToday = Math.floor(t / ARRIVE_EVERY) - open.length
  const counts = DISCIPLINES.map((d) => ({ ...d, open: open.filter((x) => x.discipline === d.name).length }))
  const maxOpen = Math.max(1, ...counts.map((c) => c.open))

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">RFI and submittal desk</span>
        <span className="font-mono text-[11px] text-white/45">MultiAgentRouter · 4 disciplines</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated queue" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_184px]">
        <ul className="divide-y divide-white/[0.06]">
          {visible.map((x) => {
            const d = DISCIPLINES.find((d) => d.name === x.discipline)!
            const atReview = x.stage === 3
            const issued = x.stage === 4
            return (
              <li key={x.k} className="grid grid-cols-[64px_minmax(0,1fr)] items-start gap-3 px-4 py-2.5 text-xs" style={{ opacity: issued ? 0.5 : 1, transition: "opacity 400ms" }}>
                <span className="font-mono text-[11px] text-white/55">{x.number}</span>
                <div className="min-w-0">
                  <p className="truncate text-white/80">{x.subject}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <span className="rounded border border-white/[0.1] px-1.5 font-mono text-[10px] text-white/55" style={{ borderColor: x.stage >= 1 ? "rgba(255,255,255,0.3)" : undefined, color: x.stage >= 1 ? "rgba(255,255,255,0.85)" : undefined }}>
                      {x.stage >= 1 ? `${d.agent} · ${d.model}` : "routing"}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.12em]" style={{ color: atReview ? "#fff" : issued ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.55)" }}>
                      {STAGES[x.stage]}
                    </span>
                  </div>
                  <div className="mt-1.5 flex gap-1" aria-hidden="true">
                    {STAGES.slice(0, 4).map((s, i) => (
                      <span key={s} className="h-1 flex-1 rounded-full" style={{ background: i <= x.stage ? (i === 3 ? "#fff" : "rgba(255,255,255,0.5)") : "rgba(255,255,255,0.08)", transition: "background 400ms" }} />
                    ))}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Open by discipline</p>
          <ul className="mt-3 space-y-2">
            {counts.map((c) => (
              <li key={c.name} className="text-xs">
                <div className="flex items-baseline justify-between">
                  <span className="text-white/65">{c.name}</span>
                  <span className="font-mono tabular-nums text-white/80">{c.open}</span>
                </div>
                <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-1.5 rounded-full transition-[width] duration-500" style={{ width: `${(c.open / maxOpen) * 100}%`, background: ACCENT }} />
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 rounded-md border border-white/[0.12] bg-white/[0.03] p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">Superintendent review</p>
            <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{atGate.length}</p>
            <p className="text-[11px] text-white/50">drafts waiting for a person</p>
          </div>
          <p className="mt-3 font-mono text-[11px] text-white/45">
            issued this shift <span className="text-white/75">{Math.max(0, issuedToday)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

// Second visual: the project schedule. Eight trades over 24 weeks; the
// schedule risk agent marks the activities that slipped, pushes the critical
// path and reports how much float is left on the rest.

type Trade = { name: string; start: number; dur: number; critical: boolean; float: number; seed: number }

const TRADES: Trade[] = [
  { name: "Sitework", start: 0, dur: 3, critical: true, float: 0, seed: 1 },
  { name: "Foundations", start: 3, dur: 4, critical: true, float: 0, seed: 2 },
  { name: "Structural steel", start: 7, dur: 4, critical: true, float: 0, seed: 3 },
  { name: "Concrete decks", start: 9, dur: 3, critical: false, float: 2, seed: 4 },
  { name: "Envelope", start: 11, dur: 5, critical: true, float: 0, seed: 5 },
  { name: "MEP rough-in", start: 12, dur: 6, critical: false, float: 1, seed: 6 },
  { name: "Interior finishes", start: 16, dur: 5, critical: true, float: 0, seed: 7 },
  { name: "Commissioning", start: 21, dur: 3, critical: true, float: 0, seed: 8 },
]

const WEEKS = 24

export function ScheduleRiskGantt() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1600)

  // The reporting week advances half a week per tick and wraps.
  const now = ((tick + 20) % (WEEKS * 2)) / 2
  const update = Math.floor((tick + 20) / 6)

  const { rows, carry, log, floatLeft } = useMemo(() => {
    let carry = 0
    const log: { name: string; slip: number; critical: boolean; floatLeft: number }[] = []
    let floatLeft = 0
    const rows = TRADES.map((tr) => {
      const start = tr.start + carry
      const started = start <= now
      // Only work in progress (or just finished) can slip, and at most two
      // activities slip per update so the chart stays inside its window.
      const inProgress = started && start + tr.dur + 1 >= now
      const slip = inProgress && log.length < 2 && noise(60 + tr.seed, update) > 0.62 ? 1 + Math.floor(noise(70 + tr.seed, update) * 2) : 0
      let critical = tr.critical
      let remaining = tr.float
      if (tr.critical) {
        carry += slip
      } else {
        remaining = tr.float - slip
        if (remaining < 0) {
          carry += -remaining
          critical = true
          remaining = 0
        }
        floatLeft += remaining
      }
      if (slip > 0) log.push({ name: tr.name, slip, critical, floatLeft: remaining })
      return { ...tr, start, end: start + tr.dur + slip, slip, critical, remaining, started }
    })
    return { rows, carry, log, floatLeft }
  }, [now, update])

  const W = 600
  const LABEL_W = 118
  const ROW_H = 22
  const TOP = 20
  const H = TOP + TRADES.length * ROW_H + 8
  const gridW = W - LABEL_W - 12
  const weeksShown = WEEKS + 5
  const xFor = (w: number) => LABEL_W + (w / weeksShown) * gridW
  const finish = WEEKS + carry

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Schedule risk agent · week {Math.floor(now) + 1} update</span>
        <span className="font-mono text-[11px] text-white/45">gemini-2.5-pro</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated schedule" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_176px]">
        <div className="p-3 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated 24-week construction schedule with slipping activities and the critical path highlighted">
            {Array.from({ length: Math.floor(weeksShown / 4) + 1 }, (_, i) => i * 4).map((w) => (
              <g key={w}>
                <line x1={xFor(w)} x2={xFor(w)} y1={TOP - 4} y2={H - 6} stroke="rgba(255,255,255,0.06)" />
                <text x={xFor(w)} y={10} fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.4)" textAnchor="middle">
                  wk {w}
                </text>
              </g>
            ))}
            <line x1={xFor(WEEKS)} x2={xFor(WEEKS)} y1={TOP - 4} y2={H - 6} stroke="rgba(255,255,255,0.25)" strokeDasharray="3 3" />
            {rows.map((r, i) => {
              const y = TOP + i * ROW_H
              const color = r.slip > 0 ? RED : r.critical ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)"
              return (
                <g key={r.name}>
                  <text x={0} y={y + 14} fontSize={10.5} fill={r.critical ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)"}>
                    {r.name}
                  </text>
                  {/* Baseline */}
                  <rect x={xFor(TRADES[i].start)} y={y + 4} width={xFor(TRADES[i].start + TRADES[i].dur) - xFor(TRADES[i].start)} height={12} rx={2} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
                  {/* Current */}
                  <rect x={xFor(r.start)} y={y + 6} width={Math.max(2, xFor(r.end) - xFor(r.start))} height={8} rx={2} fill={color} opacity={r.started ? 0.95 : 0.5} style={{ transition: "x 500ms, width 500ms" }} />
                  {!r.critical && r.remaining > 0 && (
                    <line x1={xFor(r.end)} x2={xFor(r.end + r.remaining)} y1={y + 10} y2={y + 10} stroke="rgba(255,255,255,0.35)" strokeDasharray="2 2" />
                  )}
                  {r.slip > 0 && (
                    <text x={xFor(r.end) + 4} y={y + 14} fontSize={9} fontFamily={MONO} fill={RED}>
                      +{r.slip} wk
                    </text>
                  )}
                </g>
              )
            })}
            {/* Data date */}
            <line x1={xFor(now)} x2={xFor(now)} y1={TOP - 6} y2={H - 4} stroke="#fff" strokeOpacity={0.6} strokeWidth={1} />
            <rect x={xFor(now) - 16} y={H - 14} width={32} height={12} rx={2} fill="#0a0a0a" stroke="rgba(255,255,255,0.3)" />
            <text x={xFor(now)} y={H - 5} fontSize={8} fontFamily={MONO} fill="rgba(255,255,255,0.8)" textAnchor="middle">
              today
            </text>
          </svg>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm" style={{ background: ACCENT }} /> critical path</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm bg-white/35" /> has float</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm" style={{ background: RED }} /> slipped this update</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-3 rounded-sm border border-white/20 bg-white/5" /> baseline</span>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Projected finish</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-white">
            wk {finish}
            <span className="ml-2 text-sm font-medium" style={{ color: carry > 0 ? RED : ACCENT }}>
              {carry > 0 ? `+${carry}` : "on plan"}
            </span>
          </p>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Float remaining</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-white">{floatLeft} wk</p>
          <p className="text-[11px] text-white/50">across non-critical trades</p>
          <div className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-5 text-white/55">
            {log.length === 0 ? (
              <p>Schedule Risk: no slips this update, finish holds at week {WEEKS}.</p>
            ) : (
              log.map((l) => (
                <p key={l.name}>
                  Schedule Risk: <span className="text-white/85">{l.name}</span> +{l.slip} wk, {l.critical ? "on the critical path" : `float down to ${l.floatLeft} wk`}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
