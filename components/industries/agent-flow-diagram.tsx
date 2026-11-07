"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useRef } from "react"

import { SimulatedBadge } from "./simulated-badge"
import { formatCompact, noise, useSimulationClock } from "./use-simulation"

// A live diagram of one swarm run. Agents are laid out in stages from left
// to right; a packet travels from the task through each stage to the output
// while an event log fills in underneath, the way a run reads in Swarms
// Cloud. Each industry page configures its own stages, so the same component
// draws a three-analyst research desk, a triage pipeline or a planner with a
// queue of workers.

export type FlowNode = {
  id: string
  label: string
  /** Model id as it would be sent to the Swarms API. */
  model: string
  /** One short line the log prints when this agent finishes. */
  says?: string
}

export type FlowStage = {
  id: string
  label: string
  nodes: FlowNode[]
  /** "parallel" fans the packet out to every node; "pick" sends it to one node per run (routers). */
  mode?: "parallel" | "pick"
}

const NODE_W = 168
const NODE_H = 56
const COL_GAP = 72
const ROW_GAP = 18
const PAD_X = 20
const PAD_Y = 20
const END_W = 112
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

type Placed = FlowNode & { x: number; y: number; stage: number }

export function AgentFlowDiagram({
  swarmType,
  task,
  stages,
  accent,
  outputLabel = "Output",
  intervalMs = 1500,
  className,
}: {
  swarmType: string
  task: string
  stages: FlowStage[]
  accent: string
  outputLabel?: string
  intervalMs?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, intervalMs)

  // Geometry: one column per stage plus the task and output columns.
  const rows = Math.max(1, ...stages.map((s) => s.nodes.length))
  const height = PAD_Y * 2 + rows * NODE_H + (rows - 1) * ROW_GAP
  const width = PAD_X * 2 + END_W * 2 + COL_GAP * (stages.length + 1) + NODE_W * stages.length
  const midY = height / 2

  const placed: Placed[] = useMemo(() => {
    const out: Placed[] = []
    stages.forEach((stage, si) => {
      const x = PAD_X + END_W + COL_GAP + si * (NODE_W + COL_GAP)
      const stackH = stage.nodes.length * NODE_H + (stage.nodes.length - 1) * ROW_GAP
      const top = (height - stackH) / 2
      stage.nodes.forEach((n, ni) => out.push({ ...n, x, y: top + ni * (NODE_H + ROW_GAP), stage: si }))
    })
    return out
  }, [stages, height])

  const taskBox = { x: PAD_X, y: midY - 22, w: END_W, h: 44 }
  const outBox = { x: width - PAD_X - END_W, y: midY - 22, w: END_W, h: 44 }

  // One run = task -> every stage -> output -> a short rest. The step counter
  // walks through those phases and wraps.
  const steps = stages.length + 2
  const run = Math.floor(tick / steps)
  const step = tick % steps
  const activeStage = step >= 1 && step <= stages.length ? step - 1 : -1

  // For "pick" stages (routers), one node is chosen per run.
  const pickFor = (si: number) => {
    const stage = stages[si]
    if (stage.mode !== "pick") return null
    return stage.nodes[Math.floor(noise(si + 11, run) * stage.nodes.length)]?.id ?? null
  }

  const isActiveNode = (n: Placed) => {
    if (n.stage !== activeStage) return false
    const pick = pickFor(n.stage)
    return pick === null || pick === n.id
  }

  // Packets for the current step: from the previous column to the next.
  const packets = useMemo(() => {
    const list: { key: string; x1: number; y1: number; x2: number; y2: number }[] = []
    const to = step - 1 // stage the packet is entering; -1 means into output
    if (step === 0) return list
    const fromNodes = (si: number) => {
      const pick = pickFor(si)
      return placed.filter((n) => n.stage === si && (pick === null || pick === n.id))
    }
    if (to >= 0 && to < stages.length) {
      const sources = to === 0 ? [{ x: taskBox.x + taskBox.w, y: midY }] : fromNodes(to - 1).map((n) => ({ x: n.x + NODE_W, y: n.y + NODE_H / 2 }))
      const targets = fromNodes(to)
      sources.forEach((s, i) =>
        targets.forEach((t) => list.push({ key: `${tick}-${i}-${t.id}`, x1: s.x, y1: s.y, x2: t.x, y2: t.y + NODE_H / 2 })),
      )
    } else if (step === stages.length + 1) {
      fromNodes(stages.length - 1).forEach((n, i) =>
        list.push({ key: `${tick}-${i}-out`, x1: n.x + NODE_W, y1: n.y + NODE_H / 2, x2: outBox.x, y2: midY }),
      )
    }
    return list
  }, [tick, placed, stages.length, midY])

  // The event log: the last six agent completions, newest last.
  const events = useMemo(() => {
    const lines: { key: string; text: string; model: string; meta: string }[] = []
    for (let t = Math.max(0, tick - 40); t <= tick; t++) {
      const r = Math.floor(t / steps)
      const s = t % steps
      if (s === 0) lines.push({ key: `t${t}`, text: `run #${1041 + r} started`, model: swarmType, meta: task })
      else if (s <= stages.length) {
        const si = s - 1
        const stage = stages[si]
        const pick = stage.mode === "pick" ? stage.nodes[Math.floor(noise(si + 11, r) * stage.nodes.length)]?.id : null
        stage.nodes.forEach((n, ni) => {
          if (pick && n.id !== pick) return
          const latency = (0.6 + noise(t, ni) * 2.6).toFixed(1)
          const tokens = formatCompact(300 + noise(t + 7, ni) * 2400)
          lines.push({ key: `t${t}-${n.id}`, text: n.says ? `${n.label}: ${n.says}` : `${n.label} finished`, model: n.model, meta: `${latency}s · ${tokens} tok` })
        })
      } else lines.push({ key: `t${t}-out`, text: `${outputLabel} returned`, model: "swarm", meta: `run #${1041 + r} complete` })
    }
    return lines.slice(-6)
  }, [tick, steps, stages, swarmType, task, outputLabel])

  const edgeColor = "rgba(255,255,255,0.14)"
  const edgePath = (x1: number, y1: number, x2: number, y2: number) => {
    const cx = (x1 + x2) / 2
    return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
  }

  // Static edges between consecutive columns.
  const edges = useMemo(() => {
    const list: { key: string; d: string }[] = []
    stages.forEach((stage, si) => {
      const here = placed.filter((n) => n.stage === si)
      const prev = si === 0 ? [{ x: taskBox.x + taskBox.w, y: midY }] : placed.filter((n) => n.stage === si - 1).map((n) => ({ x: n.x + NODE_W, y: n.y + NODE_H / 2 }))
      prev.forEach((p, pi) => here.forEach((n) => list.push({ key: `e${si}-${pi}-${n.id}`, d: edgePath(p.x, p.y, n.x, n.y + NODE_H / 2) })))
    })
    placed
      .filter((n) => n.stage === stages.length - 1)
      .forEach((n) => list.push({ key: `eo-${n.id}`, d: edgePath(n.x + NODE_W, n.y + NODE_H / 2, outBox.x, midY) }))
    return list
  }, [placed, stages.length, midY])

  return (
    <div ref={ref} className={className}>
      <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
        <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
          <span className="font-mono text-[11px] text-white/45">swarm_type</span>
          <span className="rounded border border-white/[0.12] bg-white/[0.04] px-2 py-0.5 font-mono text-[11px] text-white/80">{swarmType}</span>
          <span className="hidden font-mono text-[11px] text-white/35 sm:inline">·</span>
          <span className="hidden truncate font-mono text-[11px] text-white/45 sm:inline">{stages.reduce((n, s) => n + s.nodes.length, 0)} agents</span>
          <SimulatedBadge className="ml-auto" label={running ? "Live simulation" : "Simulation paused"} />
        </div>

        <div className="overflow-x-auto p-3 sm:p-4">
          <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ minWidth: Math.min(width, 640) }} className="block" role="img" aria-label={`${swarmType} with ${stages.map((s) => s.label).join(", ")} stages`}>
            <defs>
              <filter id="afd-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {edges.map((e) => (
              <path key={e.key} d={e.d} fill="none" stroke={edgeColor} strokeWidth={1} />
            ))}

            {/* Stage labels */}
            {stages.map((s, si) => {
              const x = PAD_X + END_W + COL_GAP + si * (NODE_W + COL_GAP) + NODE_W / 2
              return (
                <text key={s.id} x={x} y={12} textAnchor="middle" fontSize={10} fontFamily={MONO} fill={si === activeStage ? accent : "rgba(255,255,255,0.35)"} style={{ letterSpacing: 1.5, textTransform: "uppercase" }}>
                  {s.label.toUpperCase()}
                  {s.mode === "pick" ? " · ROUTED" : ""}
                </text>
              )
            })}

            {/* Task */}
            <g>
              <rect x={taskBox.x} y={taskBox.y} width={taskBox.w} height={taskBox.h} rx={6} fill={step === 0 ? `${accent}22` : "rgba(255,255,255,0.04)"} stroke={step === 0 ? accent : "rgba(255,255,255,0.14)"} />
              <text x={taskBox.x + taskBox.w / 2} y={taskBox.y + 19} textAnchor="middle" fontSize={11} fontWeight={600} fill="rgba(255,255,255,0.85)">Task</text>
              <text x={taskBox.x + taskBox.w / 2} y={taskBox.y + 33} textAnchor="middle" fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.4)">POST /v1/swarm</text>
            </g>

            {/* Agents */}
            {placed.map((n) => {
              const active = isActiveNode(n)
              const dimmed = stages[n.stage].mode === "pick" && activeStage === n.stage && !active
              return (
                <g key={n.id} opacity={dimmed ? 0.45 : 1} style={{ transition: "opacity 300ms" }}>
                  <rect x={n.x} y={n.y} width={NODE_W} height={NODE_H} rx={8} fill={active ? `${accent}1f` : "rgba(255,255,255,0.03)"} stroke={active ? accent : "rgba(255,255,255,0.14)"} strokeWidth={active ? 1.5 : 1} filter={active ? "url(#afd-glow)" : undefined} style={{ transition: "fill 300ms, stroke 300ms" }} />
                  <circle cx={n.x + 16} cy={n.y + NODE_H / 2} r={4} fill={active ? accent : "rgba(255,255,255,0.25)"}>
                    {active && running && <animate attributeName="r" values="3.5;5;3.5" dur="1s" repeatCount="indefinite" />}
                  </circle>
                  <text x={n.x + 30} y={n.y + 24} fontSize={12} fontWeight={600} fill="rgba(255,255,255,0.9)">{n.label}</text>
                  <text x={n.x + 30} y={n.y + 40} fontSize={10} fontFamily={MONO} fill="rgba(255,255,255,0.42)">{n.model}</text>
                </g>
              )
            })}

            {/* Output */}
            <g>
              <rect x={outBox.x} y={outBox.y} width={outBox.w} height={outBox.h} rx={6} fill={step === stages.length + 1 ? `${accent}22` : "rgba(255,255,255,0.04)"} stroke={step === stages.length + 1 ? accent : "rgba(255,255,255,0.14)"} />
              <text x={outBox.x + outBox.w / 2} y={outBox.y + 19} textAnchor="middle" fontSize={11} fontWeight={600} fill="rgba(255,255,255,0.85)">{outputLabel}</text>
              <text x={outBox.x + outBox.w / 2} y={outBox.y + 33} textAnchor="middle" fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.4)">200 OK · JSON</text>
            </g>

            {/* Packets */}
            <AnimatePresence>
              {running &&
                packets.map((p) => (
                  <motion.circle
                    key={p.key}
                    r={4}
                    fill={accent}
                    initial={{ cx: p.x1, cy: p.y1, opacity: 0 }}
                    animate={{ cx: p.x2, cy: p.y2, opacity: [0, 1, 1, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: Math.min(1.1, intervalMs / 1000 - 0.2), ease }}
                  />
                ))}
            </AnimatePresence>
          </svg>
        </div>

        <div className="border-t border-white/[0.08] bg-black/40 px-4 py-3">
          <ul className="space-y-1 font-mono text-[11px] leading-5" aria-live="off">
            {events.length === 0 && (
              <li className="text-white/35">Waiting for the first run. Scroll the diagram into view to start the simulation.</li>
            )}
            {events.map((e, i) => (
              <li key={e.key} className="flex min-w-0 items-baseline gap-3" style={{ opacity: 0.45 + (i / Math.max(1, events.length - 1)) * 0.55 }}>
                <span className="shrink-0 text-white/35">{String(i + 1).padStart(2, "0")}</span>
                <span className="truncate text-white/85">{e.text}</span>
                <span className="hidden shrink-0 rounded border border-white/[0.1] px-1.5 text-[10px] text-white/45 sm:inline" style={{ color: e.model === swarmType || e.model === "swarm" ? accent : undefined }}>{e.model}</span>
                <span className="ml-auto hidden shrink-0 text-white/35 md:inline">{e.meta}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
