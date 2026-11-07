"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { formatCompact, noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: a 96-well assay plate. The assay agent scores wells as the
// plate reader export streams in; wells above the hit threshold light up and
// land on a ranked hit list that a screening scientist still has to confirm.
// Column 1 holds negative controls, column 12 positive controls.

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"]
const COLS = 12
const WELLS = ROWS.length * COLS
const WELLS_PER_TICK = 4
const SCORING_TICKS = WELLS / WELLS_PER_TICK
const REST_TICKS = 6
const PLATE_PERIOD = SCORING_TICKS + REST_TICKS
const HIT_THRESHOLD = 0.82

function wellId(index: number) {
  const row = ROWS[Math.floor(index / COLS)]
  const col = (index % COLS) + 1
  return `${row}${String(col).padStart(2, "0")}`
}

export function AssayPlate() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 700)

  const plate = Math.floor(tick / PLATE_PERIOD)
  const progress = tick % PLATE_PERIOD
  const scored = Math.min(WELLS, (progress + 1) * WELLS_PER_TICK)

  const wells = useMemo(() => {
    return Array.from({ length: WELLS }, (_, i) => {
      const col = i % COLS
      const isNeg = col === 0
      const isPos = col === COLS - 1
      const base = noise(101 + plate, i)
      // Controls sit at the ends of the scale; samples are mostly inactive
      // with a long tail so a few wells per plate clear the threshold.
      const score = isNeg ? 0.03 + base * 0.08 : isPos ? 0.9 + base * 0.08 : Math.pow(base, 3.2)
      return { index: i, id: wellId(i), score, control: isNeg ? "neg" : isPos ? "pos" : null, scored: i < scored }
    })
  }, [plate, scored])

  const hits = wells
    .filter((w) => w.scored && !w.control && w.score >= HIT_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)

  const zPrime = 0.58 + noise(131, plate) * 0.3
  const done = scored >= WELLS

  const CELL = 22
  const GAP = 4
  const LABEL = 18
  const W = LABEL + COLS * (CELL + GAP)
  const H = LABEL + ROWS.length * (CELL + GAP)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Assay agent · plate {String(17 + plate).padStart(3, "0")}</span>
        <span className="font-mono text-[11px] tabular-nums text-white/45">
          {scored}/{WELLS} wells
        </span>
        <span className="hidden font-mono text-[11px] tabular-nums text-white/45 sm:inline">Z&apos; {zPrime.toFixed(2)}</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated plate" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_200px]">
        <div className="p-3 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated 96-well plate heatmap scored by the assay agent">
            {Array.from({ length: COLS }, (_, c) => (
              <text key={`c${c}`} x={LABEL + c * (CELL + GAP) + CELL / 2} y={11} textAnchor="middle" fontSize={8.5} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                {c + 1}
              </text>
            ))}
            {ROWS.map((r, ri) => (
              <text key={r} x={6} y={LABEL + ri * (CELL + GAP) + CELL / 2 + 3} textAnchor="middle" fontSize={8.5} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                {r}
              </text>
            ))}
            {wells.map((w) => {
              const x = LABEL + (w.index % COLS) * (CELL + GAP)
              const y = LABEL + Math.floor(w.index / COLS) * (CELL + GAP)
              const hit = w.scored && !w.control && w.score >= HIT_THRESHOLD
              const fill = !w.scored
                ? "rgba(255,255,255,0.04)"
                : w.control === "neg"
                  ? "rgba(255,255,255,0.1)"
                  : w.control === "pos"
                    ? "rgba(255,255,255,0.55)"
                    : `rgba(167,139,250,${0.12 + w.score * 0.85})`
              return (
                <g key={w.id}>
                  <rect x={x} y={y} width={CELL} height={CELL} rx={CELL / 2} fill={fill} stroke={hit ? "#fff" : w.scored ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.06)"} strokeWidth={hit ? 1.2 : 1} style={{ transition: "fill 400ms" }} />
                  {hit && <circle cx={x + CELL / 2} cy={y + CELL / 2} r={3} fill="#fff" />}
                </g>
              )
            })}
          </svg>
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/10" aria-hidden="true" /> col 1 negative control
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-white/55" aria-hidden="true" /> col 12 positive control
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: ACCENT }} aria-hidden="true" /> normalised activity
            </span>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Hit list · threshold {HIT_THRESHOLD.toFixed(2)}</p>
          <ol className="mt-3 space-y-2">
            {hits.length === 0 && <li className="text-xs text-white/40">{tick === 0 ? "Scroll into view to start the read." : "No wells above threshold yet."}</li>}
            {hits.map((h, i) => (
              <li key={h.id} className="grid grid-cols-[14px_40px_minmax(0,1fr)_34px] items-center gap-2 text-xs">
                <span className="font-mono text-white/35">{i + 1}</span>
                <span className="font-mono text-white/85">{h.id}</span>
                <div className="h-1.5 rounded-full bg-white/[0.06]">
                  <div className="h-1.5 rounded-full" style={{ width: `${h.score * 100}%`, background: ACCENT }} />
                </div>
                <span className="text-right font-mono tabular-nums text-white/60">{h.score.toFixed(2)}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-5 text-white/45">
            {done ? `${hits.length} candidate hits queued for the screening scientist to confirm.` : "Agent scores; scientist confirms."}
          </p>
        </div>
      </div>
    </div>
  )
}

// Second visual: literature triage as a funnel. Papers retrieved for a
// question, screened on abstract, read in full and extracted into an
// evidence table. The counts tick up through a query and the paper the
// reviewer is on is shown with its call. Titles are invented.

const TITLES = [
  "Kinase inhibition reduces collagen deposition in a bleomycin lung model",
  "Single-cell atlas of fibroblast states in late-stage fibrotic tissue",
  "A review of kinase signalling in organ fibrosis",
  "Docking and free-energy study of kinase ligands",
  "Loss of the kinase protects against liver fibrosis in mice",
  "Serum biomarkers of fibrosis progression in a two-year cohort",
  "Zebrafish model of kinase-dependent scarring",
  "Pharmacokinetics of a kinase inhibitor in healthy volunteers",
  "Antifibrotic effect of kinase inhibition in precision-cut lung slices",
  "Transcriptomic signature of kinase activity in patient biopsies",
]
const CALLS: { stage: number; call: string; reason: string }[] = [
  { stage: 1, call: "include", reason: "primary data, in vivo" },
  { stage: 2, call: "extracted", reason: "n=12 per arm, hydroxyproline endpoint" },
  { stage: 1, call: "exclude", reason: "review article" },
  { stage: 1, call: "exclude", reason: "in silico only" },
  { stage: 2, call: "extracted", reason: "knockout vs wild type, Sirius red" },
  { stage: 1, call: "unsure", reason: "human, observational: scientist to decide" },
  { stage: 1, call: "exclude", reason: "non-mammalian model" },
  { stage: 1, call: "exclude", reason: "no fibrosis endpoint" },
  { stage: 2, call: "extracted", reason: "ex vivo human tissue, collagen 1 readout" },
  { stage: 1, call: "include", reason: "primary data, human biopsies" },
]
const STAGES = [
  { label: "Retrieved", total: 1240 },
  { label: "Screened on abstract", total: 212 },
  { label: "Full text reviewed", total: 58 },
  { label: "Extracted to evidence table", total: 31 },
]
const QUERY_TICKS = 36
const EVIDENCE_ROWS = [
  { model: "Mouse, bleomycin", readout: "Hydroxyproline", effect: "down 38%", n: "12/arm" },
  { model: "Mouse, knockout", readout: "Sirius red area", effect: "down 29%", n: "8/arm" },
  { model: "Human PCLS", readout: "Collagen 1 mRNA", effect: "down 44%", n: "6 donors" },
  { model: "Rat, CCl4", readout: "Fibrosis score", effect: "down 1.1 pt", n: "10/arm" },
  { model: "Human biopsy", readout: "Kinase activity", effect: "correlates", n: "41" },
]

export function LiteratureFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 900)

  const query = Math.floor(tick / QUERY_TICKS)
  const p = (tick % QUERY_TICKS) / (QUERY_TICKS - 1)
  // Each stage lags the one before it, so the funnel fills from the top.
  const counts = STAGES.map((s, i) => {
    const start = i * 0.18
    const f = Math.max(0, Math.min(1, (p - start) / (1 - start)))
    const eased = 1 - Math.pow(1 - f, 2.2)
    return Math.round(s.total * eased)
  })

  const paperIndex = tick % TITLES.length
  const call = CALLS[paperIndex]
  const rowsShown = Math.min(EVIDENCE_ROWS.length, Math.floor(p * (EVIDENCE_ROWS.length + 1)))

  const W = 320
  const H = 168
  const BAR_H = 30
  const GAP = 10

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Literature triage · query {String(7 + query).padStart(2, "0")}</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">kinase AND fibrosis, 3 years</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated review" : "Paused"} />
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated literature funnel from retrieved papers to extracted evidence">
            {STAGES.map((s, i) => {
              const y = i * (BAR_H + GAP)
              const fullW = W * (1 - i * 0.2)
              const fillW = fullW * (counts[i] / s.total)
              const x = (W - fullW) / 2
              return (
                <g key={s.label}>
                  <rect x={x} y={y} width={fullW} height={BAR_H} rx={4} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.08)" />
                  <rect x={x} y={y} width={fillW} height={BAR_H} rx={4} fill={ACCENT} opacity={0.22 + i * 0.2} style={{ transition: "width 600ms ease-out" }} />
                  <text x={x + 10} y={y + BAR_H / 2 + 3.5} fontSize={10} fill="rgba(255,255,255,0.75)">
                    {s.label}
                  </text>
                  <text x={x + fullW - 10} y={y + BAR_H / 2 + 3.5} textAnchor="end" fontSize={11} fontFamily={MONO} fill="rgba(255,255,255,0.9)">
                    {formatCompact(counts[i])}
                  </text>
                </g>
              )
            })}
          </svg>
          <div className="mt-3 rounded-md border border-white/[0.08] bg-black/40 p-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{call.stage === 1 ? "Abstract Screener · gemini-2.5-flash" : "Full-text Reviewer · gemini-2.5-pro"}</p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-snug text-white/80">{TITLES[paperIndex]}</p>
            <p className="mt-1.5 font-mono text-[11px]">
              <span style={{ color: call.call === "unsure" ? "rgba(255,255,255,0.55)" : call.call === "exclude" ? "rgba(255,255,255,0.45)" : ACCENT }}>{call.call.toUpperCase()}</span>
              <span className="text-white/45"> · {call.reason}</span>
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Evidence table · Evidence Extractor</p>
          <table className="mt-3 w-full border-collapse text-left text-xs">
            <thead>
              <tr className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">
                <th className="pb-2 font-medium">Model</th>
                <th className="pb-2 font-medium">Readout</th>
                <th className="pb-2 font-medium">Effect</th>
                <th className="pb-2 text-right font-medium">n</th>
              </tr>
            </thead>
            <tbody>
              {EVIDENCE_ROWS.map((r, i) => {
                const shown = i < rowsShown
                return (
                  <tr key={r.model} className="border-t border-white/[0.06]" style={{ opacity: shown ? 1 : 0.25, transition: "opacity 500ms" }}>
                    <td className="py-2 pr-2 text-white/75">{shown ? r.model : "pending"}</td>
                    <td className="py-2 pr-2 text-white/55">{shown ? r.readout : ""}</td>
                    <td className="py-2 pr-2 font-mono text-white/75">{shown ? r.effect : ""}</td>
                    <td className="py-2 text-right font-mono text-white/55">{shown ? r.n : ""}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <p className="mt-3 font-mono text-[11px] leading-5 text-white/45">Every cell carries the quoted passage in the run output. UNSURE calls wait for a scientist.</p>
        </div>
      </div>
    </div>
  )
}
