"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: the claims pipeline as connected stages with claim packets
// moving between them, and underneath it the vote on the claim that just
// reached review: three reviewer agents, the majority, and any dissent.

const STAGES = ["FNOL", "Documents", "Triage", "Review", "Decision"]
const STAGE_SEEDS = [41, 42, 43, 44, 45]

type Vote = "approve" | "investigate" | "deny"
const VOTE_COLOR: Record<Vote, string> = { approve: "rgba(255,255,255,0.9)", investigate: "rgba(255,255,255,0.55)", deny: RED }
const VOTE_BORDER: Record<Vote, string> = { approve: "rgba(255,255,255,0.35)", investigate: "rgba(255,255,255,0.2)", deny: "rgba(239,68,68,0.5)" }

const REVIEWERS = [
  { name: "Coverage Reviewer", model: "gpt-5.4-mini", seed: 61 },
  { name: "Damage Reviewer", model: "claude-sonnet-5-5", seed: 62 },
  { name: "Fraud Reviewer", model: "gemini-2.5-flash", seed: 63 },
]

const REASONS: Record<Vote, string[]> = {
  approve: ["peril covered under the form, estimate in range", "documents consistent with the statement", "no history or timing indicators"],
  investigate: ["invoice predates the reported loss date", "two prior claims at the address in 24 months", "estimate 40% above the photo-based range"],
  deny: ["gradual seepage exclusion applies", "loss date outside the policy period", "damage not consistent with the reported peril"],
}

const PERILS = ["water, burst supply line", "wind, roof shingles", "theft, detached garage", "fire, kitchen", "hail, siding", "collision, rear-ended"]

function voteFor(seed: number, claim: number): Vote {
  const r = noise(seed, claim)
  // Most claims are clean; a minority split the reviewers.
  if (r < 0.62) return "approve"
  if (r < 0.88) return "investigate"
  return "deny"
}

export function ClaimsPipelineBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1400)

  const W = 560
  const H = 150
  const BOX_W = 86
  const BOX_H = 54
  const GAP = (W - 24 - BOX_W * STAGES.length) / (STAGES.length - 1)
  const boxX = (i: number) => 12 + i * (BOX_W + GAP)
  const boxY = 40

  // Queue depth per stage drifts slowly; the review stage is the bottleneck.
  const counts = STAGES.map((_, i) => {
    const base = [38, 27, 19, 12, 6][i]
    return Math.round(base + (noise(STAGE_SEEDS[i], Math.floor(tick / 2)) - 0.5) * base * 0.5)
  })

  // Packets: at every tick a claim hops one stage forward from a varying
  // starting stage, so the belt never looks like a single marching dot.
  const packets = useMemo(() => {
    const out: { key: string; from: number; phase: number }[] = []
    for (let k = 0; k < 3; k++) {
      const from = (tick + k * 2) % (STAGES.length - 1)
      out.push({ key: `${tick}-${k}`, from, phase: k })
    }
    return out
  }, [tick])

  // The claim under review changes every third tick.
  const claim = Math.floor(tick / 3)
  const claimId = `HO-2026-${String(118300 + (claim % 97) * 7).padStart(6, "0")}`
  const peril = PERILS[Math.floor(noise(70, claim) * PERILS.length)]
  const votes = REVIEWERS.map((r) => {
    const v = voteFor(r.seed, claim)
    const reason = REASONS[v][Math.floor(noise(r.seed + 5, claim) * REASONS[v].length)]
    return { ...r, vote: v, reason }
  })
  const tallies = votes.reduce<Record<Vote, number>>((acc, v) => ({ ...acc, [v.vote]: acc[v.vote] + 1 }), { approve: 0, investigate: 0, deny: 0 })
  const majority = (Object.keys(tallies) as Vote[]).reduce((a, b) => (tallies[b] > tallies[a] ? b : a), "approve")
  const unanimous = tallies[majority] === 3
  const split = tallies[majority] === 1
  const dissent = votes.filter((v) => v.vote !== majority)
  const revealed = Math.min(3, (tick % 3) + 1)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Claims desk · pipeline and vote</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">{counts.reduce((a, b) => a + b, 0)} open claims</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated claims" : "Paused"} />
      </div>

      <div className="p-3 sm:p-4">
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated claims pipeline: FNOL, documents, triage, review and decision stages with claim counts">
          {STAGES.slice(0, -1).map((_, i) => {
            const x1 = boxX(i) + BOX_W
            const x2 = boxX(i + 1)
            const y = boxY + BOX_H / 2
            return <line key={`e${i}`} x1={x1} x2={x2} y1={y} y2={y} stroke="rgba(255,255,255,0.14)" strokeWidth={1} />
          })}
          {STAGES.map((label, i) => {
            const active = packets.some((p) => p.from + 1 === i)
            return (
              <g key={label}>
                <rect x={boxX(i)} y={boxY} width={BOX_W} height={BOX_H} rx={7} fill={active ? `${ACCENT}14` : "rgba(255,255,255,0.03)"} stroke={active ? ACCENT : "rgba(255,255,255,0.14)"} style={{ transition: "fill 300ms, stroke 300ms" }} />
                <text x={boxX(i) + BOX_W / 2} y={boxY + 20} textAnchor="middle" fontSize={10.5} fontWeight={600} fill="rgba(255,255,255,0.85)">
                  {label}
                </text>
                <text x={boxX(i) + BOX_W / 2} y={boxY + 40} textAnchor="middle" fontSize={15} fontFamily={MONO} fill={i === 3 ? ACCENT : "rgba(255,255,255,0.7)"}>
                  {counts[i]}
                </text>
                <text x={boxX(i) + BOX_W / 2} y={boxY + BOX_H + 22} textAnchor="middle" fontSize={8.5} fontFamily={MONO} fill="rgba(255,255,255,0.35)" style={{ letterSpacing: 1 }}>
                  {["INTAKE READER", "DOC EXTRACTOR", "TRIAGE WRITER", "3 REVIEWERS", "ADJUSTER"][i]}
                </text>
              </g>
            )
          })}
          {running &&
            packets.map((p) => {
              const x1 = boxX(p.from) + BOX_W
              const x2 = boxX(p.from + 1)
              const y = boxY + BOX_H / 2
              return (
                <circle key={p.key} cy={y} r={3.5} fill={ACCENT}>
                  <animate attributeName="cx" from={x1} to={x2} dur="1.1s" begin={`${p.phase * 0.1}s`} fill="freeze" />
                  <animate attributeName="opacity" values="0;1;1;0" dur="1.1s" begin={`${p.phase * 0.1}s`} fill="freeze" />
                </circle>
              )
            })}
          <text x={12} y={16} fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.35)" style={{ letterSpacing: 1.5 }}>
            QUEUE DEPTH PER STAGE
          </text>
        </svg>
      </div>

      <div className="border-t border-white/[0.08] px-4 py-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">In review</span>
          <span className="font-mono text-xs text-white/80">{claimId}</span>
          <span className="text-xs text-white/50">{peril}</span>
          <span className="ml-auto font-mono text-[11px] text-white/45">swarm_type MajorityVoting</span>
        </div>
        <ul className="mt-3 grid gap-2 sm:grid-cols-3">
          {votes.map((v, i) => {
            const shown = i < revealed
            return (
              <li key={v.name} className="rounded-md border border-white/[0.08] bg-black/40 p-2.5 text-xs" style={{ opacity: shown ? 1 : 0.4, transition: "opacity 300ms" }}>
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate font-semibold text-white/85">{v.name}</span>
                  <span className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide" style={{ color: shown ? VOTE_COLOR[v.vote] : "rgba(255,255,255,0.35)", border: `1px solid ${shown ? VOTE_BORDER[v.vote] : "rgba(255,255,255,0.12)"}` }}>
                    {shown ? v.vote : "voting"}
                  </span>
                </div>
                <p className="mt-1 truncate font-mono text-[10px] text-white/35">{v.model}</p>
                <p className="mt-1.5 leading-snug text-white/55">{shown ? v.reason : "reading the claim file"}</p>
              </li>
            )
          })}
        </ul>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] leading-5 text-white/50">
          {revealed < 3 ? (
            <span>Tally: waiting for {3 - revealed} reviewer{3 - revealed === 1 ? "" : "s"}</span>
          ) : (
            <>
              <span>
                Majority: <span style={{ color: VOTE_COLOR[majority] }}>{majority.toUpperCase()}</span> {split ? "(no majority, 1-1-1)" : `(${tallies[majority]} of 3${unanimous ? ", unanimous" : ""})`}
              </span>
              {dissent.length > 0 && !split && (
                <span className="text-white/45">
                  Dissent: {dissent.map((d) => `${d.name.replace(" Reviewer", "")} ${d.vote}`).join(", ")}
                </span>
              )}
              <span className="ml-auto text-white/40">adjuster decides</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Second visual: an underwriting submission scored factor by factor. Each
// specialist agent reports one factor; the composite dial settles as reports
// land and the panel ends with the referral the underwriter will read.

const FACTORS = [
  { label: "Property age", agent: "Property Agent", seed: 81 },
  { label: "Location exposure", agent: "Location Agent", seed: 82 },
  { label: "Prior losses", agent: "Loss History Agent", seed: 83 },
  { label: "Coverage requested", agent: "Property Agent", seed: 84 },
]
const CYCLE = 7 // 4 reports, 2 ticks settled, 1 tick reset

export function UnderwritingRiskPanel() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1300)

  const submission = Math.floor(tick / CYCLE)
  const step = tick % CYCLE
  const reported = Math.min(FACTORS.length, step + 1)
  const settled = step >= FACTORS.length

  // Each factor scores 1 (favorable) to 5 (adverse).
  const scores = FACTORS.map((f) => 1 + noise(f.seed, submission) * 4)
  const visible = scores.slice(0, reported)
  const composite = visible.length ? visible.reduce((a, b) => a + b, 0) / visible.length : 0
  // The dial moves toward the running composite as reports arrive.
  const dialValue = settled ? composite : composite * (0.7 + 0.3 * (reported / FACTORS.length))
  const refer = composite >= 3.2
  const applicant = ["Harbor Street Bakery LLC", "Northside Dental Group", "Pine Ridge Storage", "Linden Ave Apartments", "Westgate Auto Body"][submission % 5]

  const R = 54
  const C = 70
  const arc = (from: number, to: number) => {
    // Gauge from 200 to 340 degrees + wrap, drawn as a 280 degree arc.
    const a0 = Math.PI * (0.75 + 1.5 * from)
    const a1 = Math.PI * (0.75 + 1.5 * to)
    const x0 = C + R * Math.cos(a0)
    const y0 = C + R * Math.sin(a0)
    const x1 = C + R * Math.cos(a1)
    const y1 = C + R * Math.sin(a1)
    const large = to - from > 2 / 3 ? 1 : 0
    return `M${x0.toFixed(1)},${y0.toFixed(1)} A${R},${R} 0 ${large} 1 ${x1.toFixed(1)},${y1.toFixed(1)}`
  }
  const frac = Math.max(0, Math.min(1, (dialValue - 1) / 4))
  const dialColor = frac < 0.4 ? "rgba(255,255,255,0.9)" : frac < 0.65 ? "rgba(255,255,255,0.55)" : RED

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Underwriting · submission score</span>
        <span className="truncate font-mono text-[11px] text-white/45">{applicant}</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated scoring" : "Paused"} />
      </div>
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,1fr)_150px]">
        <ul className="space-y-3">
          {FACTORS.map((f, i) => {
            const shown = i < reported
            const s = scores[i]
            const color = s < 2.6 ? "rgba(255,255,255,0.9)" : s < 3.6 ? "rgba(255,255,255,0.5)" : RED
            return (
              <li key={f.label} className="text-xs">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="text-white/70">{f.label}</span>
                  <span className="font-mono text-[10px] text-white/35">{shown ? f.agent : "waiting"}</span>
                </div>
                <div className="mt-1.5 flex items-center gap-3">
                  <div className="relative h-2 flex-1 rounded-full bg-white/[0.06]">
                    <div className="h-2 rounded-full transition-[width] duration-700 ease-out" style={{ width: shown ? `${((s - 1) / 4) * 100}%` : "0%", background: color }} />
                  </div>
                  <span className="w-8 text-right font-mono tabular-nums text-white/70">{shown ? s.toFixed(1) : "·"}</span>
                </div>
              </li>
            )
          })}
        </ul>
        <div className="flex flex-col items-center justify-center">
          <svg viewBox="0 0 140 120" width={140} height={120} role="img" aria-label={`Simulated composite underwriting score ${settled ? composite.toFixed(1) : "settling"} out of 5`}>
            <path d={arc(0, 1)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={9} strokeLinecap="round" />
            {frac > 0.005 && <path d={arc(0, frac)} fill="none" stroke={dialColor} strokeWidth={9} strokeLinecap="round" style={{ transition: "d 600ms" }} />}
            <text x={C} y={C + 2} textAnchor="middle" fontSize={24} fontWeight={600} fontFamily={MONO} fill="rgba(255,255,255,0.9)">
              {reported > 0 ? dialValue.toFixed(1) : "0.0"}
            </text>
            <text x={C} y={C + 18} textAnchor="middle" fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
              composite / 5
            </text>
            <text x={C} y={112} textAnchor="middle" fontSize={9} fontFamily={MONO} fill={settled ? dialColor : "rgba(255,255,255,0.35)"} style={{ letterSpacing: 1.2 }}>
              {settled ? (refer ? "REFER" : "WITHIN APPETITE") : `${reported}/${FACTORS.length} REPORTED`}
            </text>
          </svg>
        </div>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-3 font-mono text-[11px] leading-5 text-white/50">
        {settled ? (
          <p>
            Aggregator: composite {composite.toFixed(1)}, {refer ? "refer to underwriter, " + FACTORS[scores.indexOf(Math.max(...scores))].label.toLowerCase() + " drives the score" : "inside appetite, memo drafted for underwriter sign-off"}.
            <span className="text-white/35"> Underwriter decides.</span>
          </p>
        ) : (
          <p>Aggregator: waiting on {FACTORS.length - reported} factor report{FACTORS.length - reported === 1 ? "" : "s"} before writing the memo.</p>
        )}
      </div>
    </div>
  )
}
