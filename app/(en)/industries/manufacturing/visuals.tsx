"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { linePath, noise, useSimulationClock, walk } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: the production line. Six stations with OEE-style gauges, a
// defect-rate sparkline, and the router dispatching each ticket the line
// raises to the quality, maintenance or supply specialist.

const STATIONS = ["Stamping", "Welding", "Paint", "Assembly", "Test", "Pack"]

type Specialist = { name: string; model: string }
const SPECIALISTS: Record<"quality" | "maintenance" | "supply", Specialist> = {
  quality: { name: "Quality Engineer", model: "claude-sonnet-5-5" },
  maintenance: { name: "Maintenance Planner", model: "gpt-5.4" },
  supply: { name: "Supply Analyst", model: "gemini-2.5-flash" },
}

const TICKETS: { station: number; text: string; to: keyof typeof SPECIALISTS }[] = [
  { station: 2, text: "orange peel on 14 door panels, booth humidity 71%", to: "quality" },
  { station: 0, text: "press P-2 drive bearing 7.1 mm/s, alarm at 7.5", to: "maintenance" },
  { station: 3, text: "M8 flange bolt lot late, 2 days of cover left", to: "supply" },
  { station: 1, text: "weld spatter on B-pillar, tip dresser skipped", to: "quality" },
  { station: 4, text: "leak tester drift, 3 false fails this hour", to: "maintenance" },
  { station: 5, text: "corrugate blanks short for second shift", to: "supply" },
  { station: 2, text: "oven zone 3 running 8 C under setpoint", to: "maintenance" },
  { station: 3, text: "torque tool 14 out of calibration window", to: "quality" },
  { station: 1, text: "robot R-07 cycle time up 0.4 s since lunch", to: "maintenance" },
  { station: 0, text: "coil supplier notice: next delivery slips a day", to: "supply" },
  { station: 4, text: "EOL test flagged harness connector not seated", to: "quality" },
  { station: 5, text: "label printer ribbon stock at one roll", to: "supply" },
]
const TICKET_EVERY = 2

export function ProductionLineBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1300)
  const t = tick + 30

  // OEE components per station: availability, performance, quality.
  const stations = useMemo(
    () =>
      STATIONS.map((name, i) => {
        const a = walk(100 + i, t, 2, 86, 99, 0.05)[1]
        const p = walk(120 + i, t, 2, 82, 98, 0.06)[1]
        const q = walk(140 + i, t, 2, 96, 99.8, 0.04)[1]
        return { name, a, p, q, oee: (a / 100) * (p / 100) * (q / 100) * 100 }
      }),
    [t],
  )

  const feed = useMemo(() => {
    const newest = Math.floor(t / TICKET_EVERY)
    const out: { k: number; id: string; station: number; text: string; to: Specialist; routed: boolean }[] = []
    for (let k = newest; k > newest - 4 && k >= 0; k--) {
      const tpl = TICKETS[k % TICKETS.length]
      const age = t - k * TICKET_EVERY
      out.push({ k, id: `#${4460 + k}`, station: tpl.station, text: tpl.text, to: SPECIALISTS[tpl.to], routed: age >= 1 })
    }
    return out
  }, [t])

  const current = feed[0]
  const defects = useMemo(() => walk(160, t, 40, 180, 900, 0.09), [t])
  const defectNow = defects[defects.length - 1]
  const SW = 300
  const SH = 36

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Line 2 · ticket desk</span>
        <span className="font-mono text-[11px] text-white/45">MultiAgentRouter · gpt-5.4-mini routes</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated line" : "Paused"} />
      </div>

      <div className="p-3 sm:p-4">
        <div className="relative">
          <div aria-hidden="true" className="absolute left-3 right-3 top-[18px] h-px bg-white/[0.12]" />
          <ol className="relative grid grid-cols-3 gap-2 sm:grid-cols-6" aria-label="Six production stations with availability, performance and quality gauges">
            {stations.map((s, i) => {
              const active = current && current.station === i
              return (
                <li key={s.name} className="rounded-md border bg-[#0d0d0d] p-2" style={{ borderColor: active ? `${ACCENT}99` : "rgba(255,255,255,0.08)", transition: "border-color 400ms" }}>
                  <div className="flex items-center justify-between">
                    <span className="h-2 w-2 rounded-full" style={{ background: active ? ACCENT : "rgba(255,255,255,0.25)" }} aria-hidden="true" />
                    <span className="font-mono text-[9px] text-white/40">S{i + 1}</span>
                  </div>
                  <p className="mt-1.5 truncate text-[11px] font-semibold text-white/85">{s.name}</p>
                  <p className="font-mono text-[10px] tabular-nums text-white/55">
                    OEE <span className="text-white/85">{s.oee.toFixed(1)}%</span>
                  </p>
                  <div className="mt-1.5 space-y-1">
                    {[
                      ["A", s.a, 80],
                      ["P", s.p, 75],
                      ["Q", s.q, 94],
                    ].map(([label, v, floor]) => (
                      <div key={label as string} className="flex items-center gap-1.5">
                        <span className="w-2 font-mono text-[9px] text-white/40">{label}</span>
                        <div className="h-1 flex-1 rounded-full bg-white/[0.07]">
                          <div className="h-1 rounded-full transition-[width] duration-700" style={{ width: `${Math.max(4, (((v as number) - (floor as number)) / (100 - (floor as number))) * 100)}%`, background: (v as number) < (floor as number) + 4 ? RED : ACCENT }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </li>
              )
            })}
          </ol>
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px]">
          <ul className="divide-y divide-white/[0.06] rounded-md border border-white/[0.08]">
            {feed.map((f) => (
              <li key={f.k} className="grid grid-cols-[48px_minmax(0,1fr)] gap-2 px-3 py-2 text-xs">
                <span className="font-mono text-[11px] text-white/50">{f.id}</span>
                <div className="min-w-0">
                  <p className="truncate text-white/80">
                    <span className="text-white/45">{STATIONS[f.station]}: </span>
                    {f.text}
                  </p>
                  <p className="mt-0.5 truncate font-mono text-[10px]" style={{ color: f.routed ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.4)" }}>
                    {f.routed ? `routed to ${f.to.name} · ${f.to.model}` : "router reading ticket"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="rounded-md border border-white/[0.08] p-3">
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Defect rate</p>
              <p className="font-mono text-xs tabular-nums text-white/85">{Math.round(defectNow)} PPM</p>
            </div>
            <svg viewBox={`0 0 ${SW} ${SH}`} width="100%" className="mt-2 block overflow-visible" role="img" aria-label="Simulated defect rate sparkline in parts per million">
              <line x1={0} x2={SW} y1={SH - ((500 - 180) / (900 - 180)) * SH} y2={SH - ((500 - 180) / (900 - 180)) * SH} stroke="rgba(255,255,255,0.15)" strokeDasharray="3 3" />
              <path d={linePath(defects, SW, SH, 180, 900)} fill="none" stroke={defectNow > 500 ? RED : ACCENT} strokeWidth={1.5} strokeLinejoin="round" />
            </svg>
            <p className="mt-1 font-mono text-[10px] text-white/40">target under 500 PPM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Second visual: the maintenance work-order board. Sensor flags arrive, the
// maintenance agent drafts a work order with a priority, and the planner
// agent slots it into the shift grid for the human planner to confirm.

const FLAGS: { asset: string; signal: string; priority: 1 | 2 | 3; parts: string }[] = [
  { asset: "Press P-2", signal: "drive bearing 7.1 mm/s RMS, rising", priority: 1, parts: "bearing 22220, seal kit" },
  { asset: "Robot R-07", signal: "axis 4 motor 18 C over baseline", priority: 2, parts: "none, inspect cooling" },
  { asset: "Oven zone 3", signal: "8 C under setpoint for 40 min", priority: 2, parts: "heater element, thermocouple" },
  { asset: "Conveyor C-11", signal: "gearbox oil temperature trend up", priority: 3, parts: "oil change, breather" },
  { asset: "Leak tester LT-1", signal: "3 false fails in one hour", priority: 2, parts: "reference leak, fittings" },
  { asset: "Compressor K-2", signal: "unload cycles doubled since Monday", priority: 3, parts: "inlet filter, unloader valve" },
  { asset: "Weld gun W-14", signal: "water flow below 4 L/min", priority: 1, parts: "flow switch, hose set" },
  { asset: "Hoist H-3", signal: "brake test overdue 12 days", priority: 2, parts: "brake pads" },
  { asset: "Paint pump PP-4", signal: "pressure pulsation on booth 2", priority: 3, parts: "diaphragm kit" },
]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"]
const SHIFTS = ["1st", "2nd", "3rd"]
const FLAG_EVERY = 3

export function WorkOrderBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1500)
  const t = tick + 27

  const orders = useMemo(() => {
    const newest = Math.floor(t / FLAG_EVERY)
    const out: { k: number; wo: string; asset: string; signal: string; priority: 1 | 2 | 3; parts: string; stage: number; day: number; shift: number }[] = []
    for (let k = newest; k > newest - 7 && k >= 0; k--) {
      const f = FLAGS[k % FLAGS.length]
      const age = t - k * FLAG_EVERY
      const stage = Math.min(2, age) // 0 flagged, 1 drafted, 2 slotted
      // P1 goes into the next shift; the rest spread across the week.
      const day = f.priority === 1 ? 0 : Math.floor(noise(31, k) * DAYS.length)
      const shift = f.priority === 1 ? 0 : Math.floor(noise(32, k) * SHIFTS.length)
      out.push({ k, wo: `WO-${7100 + k}`, ...f, stage, day, shift })
    }
    return out
  }, [t])

  const latest = orders[0]
  const slotted = orders.filter((o) => o.stage === 2)
  const prFg = (p: 1 | 2 | 3) => (p === 1 ? RED : p === 2 ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.55)")
  const prBg = (p: 1 | 2 | 3) => (p === 1 ? "rgba(239,68,68,0.16)" : p === 2 ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.05)")

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Maintenance work orders</span>
        <span className="font-mono text-[11px] text-white/45">flag → draft → shift slot</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated board" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[232px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Latest flag</p>
          {latest && (
            <div className="mt-2 text-xs">
              <p className="font-semibold text-white/85">{latest.asset}</p>
              <p className="mt-0.5 text-white/55">{latest.signal}</p>
              <div className="mt-3 space-y-2 font-mono text-[11px]">
                <p className="flex items-center gap-2" style={{ color: latest.stage >= 0 ? "rgba(255,255,255,0.75)" : undefined }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} aria-hidden="true" />
                  sensor flag received
                </p>
                <p className="flex items-center gap-2" style={{ color: latest.stage >= 1 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: latest.stage >= 1 ? ACCENT : "rgba(255,255,255,0.15)" }} aria-hidden="true" />
                  Maintenance Planner drafted {latest.wo}
                </p>
                <p className="flex items-center gap-2" style={{ color: latest.stage >= 2 ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.3)" }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: latest.stage >= 2 ? ACCENT : "rgba(255,255,255,0.15)" }} aria-hidden="true" />
                  slotted {DAYS[latest.day]} {SHIFTS[latest.shift]} shift
                </p>
              </div>
              {latest.stage >= 1 && (
                <div className="mt-3 rounded border border-white/[0.1] bg-white/[0.02] p-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-white/85">{latest.wo}</span>
                    <span className="rounded px-1.5 font-mono text-[10px] font-semibold" style={{ color: prFg(latest.priority), border: `1px solid ${latest.priority === 1 ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.25)"}` }}>
                      P{latest.priority}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-white/55">parts: {latest.parts}</p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">for planner review</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="grid grid-cols-[36px_repeat(5,minmax(0,1fr))] gap-1" role="table" aria-label="Simulated shift grid of maintenance work orders for the week">
            <span aria-hidden="true" />
            {DAYS.map((d) => (
              <span key={d} role="columnheader" className="text-center font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                {d}
              </span>
            ))}
            {SHIFTS.map((s, si) => (
              <div key={s} className="contents" role="row">
                <span role="rowheader" className="self-center font-mono text-[10px] text-white/40">
                  {s}
                </span>
                {DAYS.map((d, di) => {
                  const here = slotted.filter((o) => o.day === di && o.shift === si)
                  return (
                    <div key={d} role="cell" className="min-h-[44px] rounded border border-white/[0.06] bg-white/[0.02] p-1">
                      {here.slice(0, 2).map((o) => (
                        <div key={o.k} className="mb-1 truncate rounded px-1 py-0.5 font-mono text-[9px] last:mb-0" style={{ background: prBg(o.priority), color: prFg(o.priority), transition: "background 400ms" }} title={`${o.wo} ${o.asset}`}>
                        P{o.priority} {o.asset}
                      </div>
                      ))}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: RED }} /> P1 next shift</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white/80" /> P2 this week</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white/35" /> P3 when the line is down</span>
            <span className="ml-auto">{slotted.length} orders on the board</span>
          </div>
        </div>
      </div>
    </div>
  )
}
