"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"

// Hero visual: a contract outline that the review drafter scans top to
// bottom, flagging clauses against the playbook with a risk level. Open flags
// collect in the side panel for the reviewing attorney. Generated data.

const CLAUSES: { heading: string; rule: string; issue: string; risk: "high" | "medium" | "low"; flagRate: number }[] = [
  { heading: "Term", rule: "PB-03", issue: "auto-renews for successive 3-year periods, 30-day opt-out", risk: "medium", flagRate: 0.55 },
  { heading: "Termination", rule: "PB-05", issue: "no termination for convenience", risk: "high", flagRate: 0.5 },
  { heading: "Indemnification", rule: "PB-06", issue: "one-way indemnity, no cap, covers consequential loss", risk: "high", flagRate: 0.6 },
  { heading: "Limitation of Liability", rule: "PB-07", issue: "cap set at 3 months of fees", risk: "high", flagRate: 0.7 },
  { heading: "Assignment", rule: "PB-08", issue: "consent required on change of control", risk: "low", flagRate: 0.45 },
  { heading: "Governing Law", rule: "PB-09", issue: "governing law outside the playbook jurisdictions", risk: "medium", flagRate: 0.4 },
  { heading: "Data Protection", rule: "PB-12", issue: "no breach notification deadline", risk: "high", flagRate: 0.5 },
  { heading: "Non-compete", rule: "PB-11", issue: "12-month non-compete binding on us", risk: "high", flagRate: 0.5 },
]
const TICKS_PER_CLAUSE = 2
const SCAN_TICKS = CLAUSES.length * TICKS_PER_CLAUSE
const REST_TICKS = 5
const SCAN_PERIOD = SCAN_TICKS + REST_TICKS

const RISK_COLOR: Record<string, string> = { high: "#ef4444", medium: "rgba(255,255,255,0.6)", low: "rgba(255,255,255,0.3)" }

export function ContractScan() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 800)

  const doc = Math.floor(tick / SCAN_PERIOD)
  const within = tick % SCAN_PERIOD
  const scanning = within < SCAN_TICKS ? Math.floor(within / TICKS_PER_CLAUSE) : -1
  const scannedThrough = within < SCAN_TICKS ? Math.floor(within / TICKS_PER_CLAUSE) - 1 : CLAUSES.length - 1

  const flags = useMemo(
    () =>
      CLAUSES.map((c, i) => ({
        ...c,
        index: i,
        flagged: noise(301 + i, doc) < c.flagRate,
      })),
    [doc],
  )

  const open = flags.filter((f) => f.flagged && f.index <= scannedThrough)
  const done = within >= SCAN_TICKS

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Review Drafter · MSA draft {String(14 + doc).padStart(2, "0")}</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">counterparty paper · playbook v6</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated review" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="p-3 sm:p-4">
          <ol className="relative rounded-md border border-white/[0.08] bg-black/40 p-3 font-serif">
            <li className="mb-2 px-2 text-center text-[11px] uppercase tracking-[0.18em] text-white/45">Master Services Agreement</li>
            {flags.map((c, i) => {
              const isScanning = i === scanning
              const isDone = i <= scannedThrough
              const show = isDone && c.flagged
              return (
                <li
                  key={c.heading}
                  className="flex items-center gap-3 rounded px-2 py-1.5 text-sm"
                  style={{ background: isScanning ? `${ACCENT}1f` : "transparent", transition: "background 300ms" }}
                >
                  <span className="w-5 shrink-0 font-mono text-[10px] text-white/35">{i + 1}.</span>
                  <span className={isDone || isScanning ? "text-white/85" : "text-white/40"}>{c.heading}</span>
                  <span className="ml-2 hidden h-px flex-1 bg-white/[0.06] sm:block" aria-hidden="true" />
                  <span className="ml-auto shrink-0 font-mono text-[10px]">
                    {isScanning && <span style={{ color: ACCENT }}>reading</span>}
                    {!isScanning && show && <span style={{ color: RISK_COLOR[c.risk] }}>{c.risk} · {c.rule}</span>}
                    {!isScanning && isDone && !c.flagged && <span className="text-white/35">within playbook</span>}
                  </span>
                </li>
              )
            })}
          </ol>
          <p className="mt-3 font-mono text-[11px] text-white/45">
            {done ? `${open.length} flags to the reviewing attorney; nothing redlined by the agent.` : "Agent flags against the playbook; the attorney decides."}
          </p>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Open flags · {open.length}</p>
          <ul className="mt-3 space-y-3">
            {open.length === 0 && <li className="text-xs text-white/40">{tick === 0 ? "Scroll into view to start the review." : "No flags yet."}</li>}
            {open.map((f) => (
              <li key={f.heading} className="text-xs leading-snug">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: RISK_COLOR[f.risk] }} aria-hidden="true" />
                  <span className="font-semibold text-white/85">{f.heading}</span>
                  <span className="ml-auto font-mono text-[10px] text-white/35">{f.rule}</span>
                </div>
                <p className="mt-0.5 text-white/55">{f.issue}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: a citation check meter. A judge council verifies each
// citation in a draft; three verifiers vote, the majority call is recorded,
// and the running count of verified citations fills the meter. Parties and
// reporters are placeholders.

type Call = "verified" | "needs source" | "wrong pin cite"
const CALLS: Call[] = ["verified", "needs source", "wrong pin cite"]
const CITATIONS: { cite: string; truth: Call }[] = [
  { cite: "Northwind Traders v. Contoso Ltd., 412 F.3d 118, 124 (2d Cir. 2005)", truth: "verified" },
  { cite: "Litware, Inc. v. Tailspin Toys, 230 Cal. App. 4th 455, 462 (2014)", truth: "wrong pin cite" },
  { cite: "In re Fabrikam Holdings, 98 B.R. 331, 337 (Bankr. D. Del. 2011)", truth: "verified" },
  { cite: "Adventure Works v. Wide World Importers, 719 F. Supp. 2d 901, 909 (S.D.N.Y. 2010)", truth: "verified" },
  { cite: "Proseware Corp. v. Woodgrove Bank, 88 A.3d 614, 620 (Del. 2014)", truth: "needs source" },
  { cite: "Coho Winery v. Alpine Ski House, 455 F.3d 1032, 1040 (9th Cir. 2006)", truth: "verified" },
  { cite: "Margie's Travel v. Humongous Insurance, 2017 WL 4418281, at *4 (N.D. Ill. 2017)", truth: "wrong pin cite" },
  { cite: "Trey Research v. Lucerne Publishing, 301 F. Supp. 3d 212, 219 (D. Mass. 2018)", truth: "verified" },
]
const JUDGES = [
  { name: "Verifier A", model: "gpt-5.4" },
  { name: "Verifier B", model: "claude-sonnet-5-5" },
  { name: "Verifier C", model: "gemini-2.5-pro" },
]
const TICKS_PER_CITE = 4
const DRAFT_TICKS = CITATIONS.length * TICKS_PER_CITE + 4
const CALL_COLOR: Record<Call, string> = { verified: ACCENT, "needs source": "rgba(255,255,255,0.55)", "wrong pin cite": "#ef4444" }

function voteFor(draft: number, cite: number, judge: number): Call {
  const truth = CITATIONS[cite].truth
  const r = noise(401 + judge, draft * CITATIONS.length + cite)
  if (r < 0.78) return truth
  const others = CALLS.filter((c) => c !== truth)
  return others[Math.floor(noise(451 + judge, draft * CITATIONS.length + cite) * others.length)]
}

function majority(votes: Call[]): Call | "split" {
  for (const c of CALLS) if (votes.filter((v) => v === c).length >= 2) return c
  return "split"
}

export function CitationCheck() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 900)

  const draft = Math.floor(tick / DRAFT_TICKS)
  const within = tick % DRAFT_TICKS
  const current = Math.min(CITATIONS.length - 1, Math.floor(within / TICKS_PER_CITE))
  const sub = within % TICKS_PER_CITE
  const finished = within >= CITATIONS.length * TICKS_PER_CITE

  const rulings = useMemo(() => {
    return CITATIONS.map((_, i) => {
      const votes = JUDGES.map((_, j) => voteFor(draft, i, j))
      return { votes, ruling: majority(votes) }
    })
  }, [draft])

  const decided = finished ? CITATIONS.length : current + (sub === TICKS_PER_CITE - 1 ? 1 : 0)
  const counts = { verified: 0, "needs source": 0, "wrong pin cite": 0, split: 0 }
  for (let i = 0; i < decided; i++) counts[rulings[i].ruling] += 1

  const votesShown = finished ? JUDGES.length : Math.min(JUDGES.length, sub)
  const showRuling = finished || sub === TICKS_PER_CITE - 1

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Citation council · memo draft {String(3 + draft).padStart(2, "0")}</span>
        <span className="font-mono text-[11px] tabular-nums text-white/45">
          {decided}/{CITATIONS.length} checked
        </span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated check" : "Paused"} />
      </div>

      <div className="p-4">
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Verified</p>
          <p className="font-mono text-sm tabular-nums text-white/85">
            {counts.verified} <span className="text-white/40">of {CITATIONS.length}</span>
          </p>
        </div>
        <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-white/[0.06]" role="img" aria-label={`${counts.verified} verified, ${counts["needs source"]} need a source, ${counts["wrong pin cite"]} wrong pin cites`}>
          {(["verified", "needs source", "wrong pin cite", "split"] as const).map((k) => (
            <div key={k} className="h-2 transition-[width] duration-500" style={{ width: `${(counts[k] / CITATIONS.length) * 100}%`, background: k === "split" ? "rgba(255,255,255,0.35)" : CALL_COLOR[k] }} />
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[10px] text-white/45">
          {(["verified", "needs source", "wrong pin cite"] as const).map((k) => (
            <span key={k} className="inline-flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full" style={{ background: CALL_COLOR[k] }} aria-hidden="true" />
              {k} {counts[k]}
            </span>
          ))}
          {counts.split > 0 && <span>split {counts.split}, attorney resolves</span>}
        </div>
      </div>

      <div className="grid border-t border-white/[0.08] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <ol className="divide-y divide-white/[0.06] p-2">
          {CITATIONS.map((c, i) => {
            const state = i < decided ? rulings[i].ruling : i === current && !finished ? "checking" : "queued"
            return (
              <li key={c.cite} className="flex items-start gap-3 px-2 py-2 text-xs" style={{ opacity: state === "queued" ? 0.4 : 1, transition: "opacity 400ms" }}>
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: state === "checking" ? ACCENT : state === "queued" ? "rgba(255,255,255,0.2)" : state === "split" ? "rgba(255,255,255,0.4)" : CALL_COLOR[state as Call] }} aria-hidden="true" />
                <span className="min-w-0 flex-1 truncate text-white/70">{c.cite}</span>
                <span className="shrink-0 font-mono text-[10px]" style={{ color: state === "checking" ? ACCENT : state === "queued" ? "rgba(255,255,255,0.3)" : state === "split" ? "rgba(255,255,255,0.5)" : CALL_COLOR[state as Call] }}>
                  {state}
                </span>
              </li>
            )
          })}
        </ol>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{finished ? "Draft complete" : `Citation ${current + 1} · judges vote independently`}</p>
          <p className="mt-2 text-xs leading-snug text-white/80">{CITATIONS[current].cite}</p>
          <ul className="mt-3 space-y-2">
            {JUDGES.map((j, k) => {
              const shown = k < votesShown
              const vote = rulings[current].votes[k]
              return (
                <li key={j.name} className="flex items-center gap-3 text-xs">
                  <span className="w-20 shrink-0 text-white/70">{j.name}</span>
                  <span className="hidden w-32 shrink-0 truncate font-mono text-[10px] text-white/35 sm:inline">{j.model}</span>
                  <span className="font-mono text-[11px]" style={{ color: shown ? CALL_COLOR[vote] : "rgba(255,255,255,0.3)" }}>
                    {shown ? vote : "..."}
                  </span>
                </li>
              )
            })}
          </ul>
          <p className="mt-3 border-t border-white/[0.08] pt-3 font-mono text-[11px] leading-5 text-white/45">
            {showRuling ? (
              <>
                Ruling: <span style={{ color: rulings[current].ruling === "split" ? "rgba(255,255,255,0.7)" : CALL_COLOR[rulings[current].ruling as Call] }}>{rulings[current].ruling}</span>
                {rulings[current].ruling === "split" ? ", attorney resolves" : "; associate confirms against the reporter"}
              </>
            ) : (
              "Waiting for the council."
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
