"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: seven hubs on an abstract map with shipments moving along the
// lanes between them. Exceptions appear on a lane, and the feed beside the
// map shows the worker agent's reroute draft for each one, marked for the
// ops desk to approve.

const HUBS = [
  { id: "LAX", x: 60, y: 120 },
  { id: "ORD", x: 150, y: 70 },
  { id: "JFK", x: 220, y: 95 },
  { id: "AMS", x: 330, y: 60 },
  { id: "DXB", x: 410, y: 130 },
  { id: "SIN", x: 490, y: 165 },
  { id: "SHA", x: 520, y: 80 },
]
const LANES: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [3, 6],
  [0, 5],
  [1, 3],
]

const EXCEPTION_TYPES = [
  { kind: "Customs hold", color: "rgba(255,255,255,0.6)", draft: (a: string, b: string) => `Documents Worker: HS line corrected on ${a} invoice, broker note drafted for ${b} entry` },
  { kind: "Weather delay", color: "rgba(255,255,255,0.35)", draft: (a: string, b: string) => `Reroute Worker: hold at ${a}, next departure +9h, ETA ${b} revised` },
  { kind: "Missed connection", color: RED, draft: (a: string, b: string) => `Reroute Worker: rebook ${a} to ${b} via next hub, +14h, 2 options` },
]
const EXCEPTION_EVERY = 3

export function ShipmentNetworkMap() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1200)

  const W = 580
  const H = 220

  // Six shipments in flight: each sits on a lane and its progress along the
  // lane is a function of the tick, so a lane is never empty for long.
  const shipments = useMemo(
    () =>
      Array.from({ length: 6 }, (_, k) => {
        const laneIdx = (k * 2 + Math.floor(tick / 7)) % LANES.length
        const [a, b] = LANES[laneIdx]
        const p = ((tick * (0.11 + k * 0.03) + k * 0.37) % 1 + 1) % 1
        const forward = k % 2 === 0
        const from = HUBS[forward ? a : b]
        const to = HUBS[forward ? b : a]
        return { key: k, x: from.x + (to.x - from.x) * p, y: from.y + (to.y - from.y) * p, laneIdx }
      }),
    [tick],
  )

  // Exceptions: one every few ticks, on a lane chosen by the clock.
  const exceptions = useMemo(() => {
    const out: { key: number; lane: number; type: (typeof EXCEPTION_TYPES)[number]; ref: string; at: number }[] = []
    for (let t = Math.max(0, tick - 12); t <= tick; t++) {
      if (t % EXCEPTION_EVERY !== 0) continue
      const lane = Math.floor(noise(90, t) * LANES.length)
      const type = EXCEPTION_TYPES[Math.floor(noise(91, t) * EXCEPTION_TYPES.length)]
      const ref = `${["AWB", "MSKU", "TL"][Math.floor(noise(92, t) * 3)]}-${String(Math.floor(noise(93, t) * 90000) + 10000)}`
      out.push({ key: t, lane, type, ref, at: t })
    }
    return out.slice(-3).reverse()
  }, [tick])
  const activeLanes = new Set(exceptions.slice(0, 2).map((e) => e.lane))

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Network · shipments and exceptions</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">{HUBS.length} hubs · {LANES.length} lanes</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated network" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_210px]">
        <div className="p-3 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated shipment network: seven hubs connected by lanes with shipments in transit and lanes with open exceptions highlighted">
            <defs>
              <pattern id="log-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M24 0H0V24" fill="none" stroke="rgba(255,255,255,0.04)" />
              </pattern>
            </defs>
            <rect width={W} height={H} fill="url(#log-grid)" />
            {LANES.map(([a, b], i) => {
              const A = HUBS[a]
              const B = HUBS[b]
              const hot = activeLanes.has(i)
              const exc = exceptions.find((e) => e.lane === i)
              return (
                <line key={`l${i}`} x1={A.x} y1={A.y} x2={B.x} y2={B.y} stroke={hot && exc ? exc.type.color : "rgba(255,255,255,0.14)"} strokeWidth={hot ? 1.6 : 1} strokeDasharray={hot ? "4 3" : undefined} style={{ transition: "stroke 400ms" }} />
              )
            })}
            {running &&
              shipments.map((s) => (
                <circle key={s.key} cx={s.x} cy={s.y} r={3} fill={ACCENT} style={{ transition: "cx 1.1s linear, cy 1.1s linear" }} />
              ))}
            {HUBS.map((h) => (
              <g key={h.id}>
                <circle cx={h.x} cy={h.y} r={9} fill="#0a0a0a" stroke="rgba(255,255,255,0.3)" strokeWidth={1} />
                <circle cx={h.x} cy={h.y} r={3} fill="rgba(255,255,255,0.7)" />
                <text x={h.x} y={h.y + 22} textAnchor="middle" fontSize={9.5} fontFamily={MONO} fill="rgba(255,255,255,0.55)">
                  {h.id}
                </text>
              </g>
            ))}
            {exceptions.slice(0, 2).map((e) => {
              const [a, b] = LANES[e.lane]
              const mx = (HUBS[a].x + HUBS[b].x) / 2
              const my = (HUBS[a].y + HUBS[b].y) / 2
              return (
                <g key={`x${e.key}`}>
                  <circle cx={mx} cy={my} r={6} fill="#0a0a0a" stroke={e.type.color} strokeWidth={1.2}>
                    {running && <animate attributeName="r" values="5;8;5" dur="1.4s" repeatCount="indefinite" />}
                  </circle>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Exception feed</p>
          <ul className="mt-3 space-y-3">
            {exceptions.length === 0 && <li className="text-xs text-white/40">Scroll into view to start the feed.</li>}
            {exceptions.map((e) => {
              const [a, b] = LANES[e.lane]
              return (
                <li key={e.key} className="text-xs leading-snug">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: e.type.color }} aria-hidden="true" />
                    <span className="font-semibold text-white/85">{e.type.kind}</span>
                    <span className="ml-auto font-mono text-[10px] text-white/35">
                      {HUBS[a].id}
                      {"→"}
                      {HUBS[b].id}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-white/35">{e.ref}</p>
                  <p className="mt-1 text-white/55">{e.type.draft(HUBS[a].id, HUBS[b].id)}</p>
                  <p className="mt-0.5 font-mono text-[10px] uppercase tracking-wide text-white/35">draft · ops approval</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: the planner and worker queue. Planners add sub-tasks to the
// queue, workers pull them off, and the panel shows queue depth plus what
// each worker is doing right now.

const WORKERS = [
  { name: "Reroute Worker", model: "gpt-5.4-mini", seed: 101 },
  { name: "Documents Worker", model: "claude-haiku-5-5", seed: 102 },
  { name: "Notify Worker", model: "gemini-2.5-flash", seed: 103 },
]
const PLANNERS = [
  { name: "Route Planner", model: "gpt-5.4", seed: 111 },
  { name: "Customs Planner", model: "claude-sonnet-5-5", seed: 112 },
]
const TASKS = [
  "evaluate alternative routing via FRA",
  "draft customer delay notice",
  "verify HS heading for line 4",
  "correct commercial invoice values",
  "update ETA milestone in TMS draft",
  "draft broker message on hold",
  "compare two carriers for rebooking",
  "draft consignee message with new ETA",
  "check origin certificate requirement",
  "propose split shipment option",
]

export function PlannerWorkerQueue() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1100)

  // Replay the queue from tick 0 so a given tick always shows the same state.
  const state = useMemo(() => {
    const queue: { id: number; text: string; by: string }[] = []
    const working: ({ id: number; text: string; left: number } | null)[] = WORKERS.map(() => null)
    const done: { id: number; worker: string; text: string }[] = []
    let nextId = 1
    for (let t = 0; t <= tick; t++) {
      // Planners push: each planner adds a task on roughly half the ticks.
      PLANNERS.forEach((p, i) => {
        if (noise(p.seed, t) < 0.55 && queue.length < 9) {
          queue.push({ id: nextId++, text: TASKS[Math.floor(noise(p.seed + 1, t + i) * TASKS.length)], by: p.name })
        }
      })
      // Workers finish or pull.
      WORKERS.forEach((w, i) => {
        const cur = working[i]
        if (cur) {
          cur.left -= 1
          if (cur.left <= 0) {
            done.push({ id: cur.id, worker: w.name, text: cur.text })
            working[i] = null
          }
        }
        if (!working[i] && queue.length > 0) {
          const task = queue.shift()!
          working[i] = { id: task.id, text: task.text, left: 1 + Math.floor(noise(w.seed, t) * 3) }
        }
      })
    }
    return { queue, working, done: done.slice(-3).reverse(), total: nextId - 1 }
  }, [tick])

  const DEPTH_MAX = 9

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">PlannerWorkerSwarm · task queue</span>
        <span className="font-mono text-[11px] text-white/45">{state.total} tasks planned</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated queue" : "Paused"} />
      </div>

      <div className="grid gap-0 sm:grid-cols-[150px_minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 sm:border-b-0 sm:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Planners</p>
          <ul className="mt-3 space-y-3">
            {PLANNERS.map((p) => {
              const pushed = noise(p.seed, tick) < 0.55
              return (
                <li key={p.name} className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: pushed ? ACCENT : "rgba(255,255,255,0.25)" }} aria-hidden="true" />
                    <span className="font-semibold text-white/85">{p.name}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-white/35">{p.model}</p>
                  <p className="mt-1 text-white/50">{pushed ? "queued a task" : "reading exception"}</p>
                </li>
              )
            })}
          </ul>
        </div>

        <div className="border-b border-white/[0.08] p-4 sm:border-b-0 sm:border-r">
          <div className="flex items-baseline justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Queue</p>
            <span className="font-mono text-xs tabular-nums text-white/70">depth {state.queue.length}</span>
          </div>
          <svg viewBox="0 0 120 10" width="100%" height={10} className="mt-2 block" aria-hidden="true">
            {Array.from({ length: DEPTH_MAX }, (_, i) => (
              <rect key={i} x={i * 13.3} y={1} width={11} height={8} rx={2} fill={i < state.queue.length ? ACCENT : "rgba(255,255,255,0.08)"} style={{ transition: "fill 300ms" }} />
            ))}
          </svg>
          <ol className="mt-3 space-y-1.5">
            {state.queue.length === 0 && <li className="text-xs text-white/40">Queue empty, workers idle.</li>}
            {state.queue.slice(0, 5).map((q) => (
              <li key={q.id} className="flex items-baseline gap-2 text-xs">
                <span className="shrink-0 font-mono text-[10px] text-white/35">#{q.id}</span>
                <span className="truncate text-white/60">{q.text}</span>
              </li>
            ))}
            {state.queue.length > 5 && <li className="text-xs text-white/35">+{state.queue.length - 5} more</li>}
          </ol>
        </div>

        <div className="p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Workers</p>
          <ul className="mt-3 space-y-3">
            {WORKERS.map((w, i) => {
              const cur = state.working[i]
              return (
                <li key={w.name} className="text-xs">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                      {cur && running && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: ACCENT }} />}
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: cur ? ACCENT : "rgba(255,255,255,0.25)" }} />
                    </span>
                    <span className="font-semibold text-white/85">{w.name}</span>
                    <span className="ml-auto font-mono text-[10px] text-white/35">{cur ? "busy" : "idle"}</span>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-white/35">{w.model}</p>
                  <p className="mt-1 truncate text-white/55">{cur ? `#${cur.id} ${cur.text}` : "waiting on queue"}</p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] leading-5">
        {state.done.length === 0 ? (
          <p className="text-white/35">No tasks returned yet.</p>
        ) : (
          state.done.map((d) => (
            <p key={d.id} className="truncate text-white/50">
              <span className="text-white/35">#{d.id}</span> {d.worker}: {d.text} <span className="text-white/35">· draft returned</span>
            </p>
          ))
        )}
      </div>
    </div>
  )
}
