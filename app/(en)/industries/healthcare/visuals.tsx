"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ef4444"

// Hero visual: an emergency department intake board. Cases arrive, the
// triage agent proposes an acuity level, every case passes through the
// clinician review gate, and only then is a disposition recorded. Bed
// occupancy per unit moves alongside. All of it is generated data.

const COMPLAINTS = [
  "Chest tightness on exertion, 54",
  "Ankle inversion injury, 23",
  "Fever and cough, 3",
  "Shortness of breath, 71",
  "Hand laceration, 38",
  "Abdominal pain, right lower, 29",
  "Headache, sudden onset, 46",
  "Allergic reaction, lip swelling, 19",
  "Fall from standing, 81",
  "Dizziness, 63",
  "Back pain after lifting, 42",
  "Palpitations, 35",
]
const ARRIVAL_EVERY = 3
const DISPOSITIONS = ["Admit", "Treat and discharge", "Observation", "Treat and discharge"]
const UNITS = [
  { name: "Resus", beds: 4, seed: 61 },
  { name: "Acute", beds: 12, seed: 62 },
  { name: "Fast track", beds: 8, seed: 63 },
  { name: "Observation", beds: 6, seed: 64 },
]

type Phase = "arrived" | "proposed" | "review" | "disposition"

function phaseFor(age: number): Phase {
  if (age < 2) return "arrived"
  if (age < 5) return "proposed"
  if (age < 8) return "review"
  return "disposition"
}

// Acuity as a gray ramp, with red reserved for level 1 (resuscitation).
const ESI_COLORS: Record<number, string> = {
  1: "#ef4444",
  2: "rgba(255,255,255,0.92)",
  3: "rgba(255,255,255,0.65)",
  4: "rgba(255,255,255,0.42)",
  5: "rgba(255,255,255,0.26)",
}

export function IntakeBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1000)
  const t = tick + 30

  const cases = useMemo(() => {
    const newest = Math.floor(t / ARRIVAL_EVERY)
    const out: { id: number; label: string; esi: number; age: number; phase: Phase; disposition: string }[] = []
    for (let k = newest; k >= 0 && out.length < 6; k--) {
      const age = t - k * ARRIVAL_EVERY
      // Lean toward ESI 3 and 4, which is where most intake sits.
      const r = noise(41, k)
      const esi = r < 0.06 ? 1 : r < 0.22 ? 2 : r < 0.6 ? 3 : r < 0.9 ? 4 : 5
      out.push({
        id: 4800 + k,
        label: COMPLAINTS[k % COMPLAINTS.length],
        esi,
        age,
        phase: phaseFor(age),
        disposition: DISPOSITIONS[Math.floor(noise(43, k) * DISPOSITIONS.length)],
      })
    }
    return out
  }, [t])

  const occupancy = UNITS.map((u) => {
    const frac = 0.35 + noise(u.seed, Math.floor(t / 4)) * 0.6
    return { ...u, used: Math.min(u.beds, Math.round(frac * u.beds)) }
  })

  const awaiting = cases.filter((c) => c.phase === "review").length
  const dispositioned = Math.max(0, Math.floor(t / ARRIVAL_EVERY) - 2)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Triage agent · intake board</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">de-identified</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated intake" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_190px]">
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-[52px_minmax(0,1fr)_44px_112px] gap-2 border-b border-white/[0.08] pb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
            <span>Case</span>
            <span>Complaint, age</span>
            <span>ESI</span>
            <span>Status</span>
          </div>
          <ul className="divide-y divide-white/[0.06]">
            {cases.map((c) => (
              <li key={c.id} className="grid grid-cols-[52px_minmax(0,1fr)_44px_112px] items-center gap-2 py-2 text-xs">
                <span className="font-mono text-white/55">{c.id}</span>
                <span className="truncate text-white/80">{c.label}</span>
                <span className="font-mono tabular-nums">
                  {c.phase === "arrived" ? (
                    <span className="text-white/35">...</span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full" style={{ background: ESI_COLORS[c.esi] }} aria-hidden="true" />
                      <span className="text-white/80">{c.esi}</span>
                    </span>
                  )}
                </span>
                <span className="truncate font-mono text-[11px]">
                  {c.phase === "arrived" && <span className="text-white/45">intake reading</span>}
                  {c.phase === "proposed" && <span style={{ color: ACCENT }}>acuity proposed</span>}
                  {c.phase === "review" && <span className="text-white/85">clinician review</span>}
                  {c.phase === "disposition" && <span className="text-white/55">{c.disposition}</span>}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 rounded-md border border-white/[0.08] bg-black/40 px-3 py-2 font-mono text-[11px]">
            <span className="text-white/45">
              Review gate: <span className="text-white/85">{awaiting}</span> awaiting a clinician
            </span>
            <span className="text-white/45">
              Dispositions this shift: <span className="text-white/85">{dispositioned}</span>
            </span>
            <span className="text-white/35">agent proposes, nurse assigns</span>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Bed occupancy</p>
          <ul className="mt-3 space-y-3">
            {occupancy.map((u) => {
              const pct = (u.used / u.beds) * 100
              return (
                <li key={u.name} className="text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="text-white/70">{u.name}</span>
                    <span className="font-mono tabular-nums text-white/55">
                      {u.used}/{u.beds}
                    </span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                    <div
                      className="h-1.5 rounded-full transition-[width] duration-700 ease-out"
                      style={{ width: `${pct}%`, background: pct >= 90 ? ACCENT : "rgba(255,255,255,0.45)" }}
                    />
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: one encounter moving through the documentation pipeline.
// Visit note, sections extracted, ICD-10 candidates with confidence, then the
// coder review queue. The codes are real ICD-10-CM codes; the confidences
// and the coder's decision are generated.

const ENCOUNTERS = [
  {
    id: "ENC-2291",
    note: "Follow-up for type 2 diabetes. Two weeks of polyuria. A1c 9.4%, up from 7.8%. On metformin 1000 mg twice daily. Feet examined, no ulcers.",
    sections: ["HPI", "History", "Exam", "Assessment", "Plan"],
    codes: [
      { code: "E11.65", text: "Type 2 diabetes mellitus with hyperglycemia", conf: 0.82 },
      { code: "Z79.84", text: "Long term (current) use of oral hypoglycemic drugs", conf: 0.64 },
      { code: "E11.9", text: "Type 2 diabetes mellitus without complications", conf: 0.31 },
    ],
  },
  {
    id: "ENC-2304",
    note: "Three days of productive cough and fever to 38.6 C. No shortness of breath. Lungs: scattered rhonchi, no focal consolidation. SpO2 97%.",
    sections: ["HPI", "ROS", "Exam", "Assessment", "Plan"],
    codes: [
      { code: "J20.9", text: "Acute bronchitis, unspecified", conf: 0.79 },
      { code: "J18.9", text: "Pneumonia, unspecified organism", conf: 0.36 },
      { code: "R05.9", text: "Cough, unspecified", conf: 0.28 },
    ],
  },
  {
    id: "ENC-2310",
    note: "Twisted right ankle stepping off a curb yesterday. Lateral swelling, able to bear weight for four steps. No bony tenderness at the malleoli.",
    sections: ["HPI", "Exam", "Assessment", "Plan"],
    codes: [
      { code: "S93.401A", text: "Sprain of unspecified ligament of right ankle, initial encounter", conf: 0.76 },
      { code: "M25.571", text: "Pain in right ankle and joints of right foot", conf: 0.41 },
      { code: "S99.911A", text: "Unspecified injury of right ankle, initial encounter", conf: 0.22 },
    ],
  },
  {
    id: "ENC-2318",
    note: "Hypertension visit. Home readings 140 to 150 over 90. Taking amlodipine 5 mg. Lipid panel from last month shows LDL 162.",
    sections: ["HPI", "History", "Exam", "Assessment", "Plan"],
    codes: [
      { code: "I10", text: "Essential (primary) hypertension", conf: 0.91 },
      { code: "E78.5", text: "Hyperlipidemia, unspecified", conf: 0.58 },
      { code: "Z79.899", text: "Other long term (current) drug therapy", conf: 0.33 },
    ],
  },
]

const STATIONS = ["Visit note", "Sections extracted", "ICD-10 candidates", "Coder review"]
const TICKS_PER_STATION = 3
const PERIOD = STATIONS.length * TICKS_PER_STATION

export function DocumentationPipeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1100)

  const caseIndex = Math.floor(tick / PERIOD)
  const encounter = ENCOUNTERS[caseIndex % ENCOUNTERS.length]
  const within = tick % PERIOD
  const station = Math.floor(within / TICKS_PER_STATION)
  const sub = within % TICKS_PER_STATION
  const coderAccepts = encounter.codes.filter((_, i) => i === 0 || noise(71 + i, caseIndex) > 0.45).map((c) => c.code)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Documentation pipeline</span>
        <span className="font-mono text-[11px] text-white/45">{encounter.id}</span>
        <span className="hidden font-mono text-[11px] text-white/35 sm:inline">processed: {caseIndex}</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated encounter" : "Paused"} />
      </div>

      <ol className="grid grid-cols-4 border-b border-white/[0.08]">
        {STATIONS.map((s, i) => {
          const state = i < station ? "done" : i === station ? "active" : "todo"
          return (
            <li key={s} className={`relative px-3 py-3 ${i > 0 ? "border-l border-white/[0.08]" : ""}`}>
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: state === "todo" ? "rgba(255,255,255,0.18)" : state === "done" ? "rgba(255,255,255,0.6)" : ACCENT }}
                  aria-hidden="true"
                />
                <span className={`truncate text-[11px] font-medium ${state === "active" ? "text-white" : state === "done" ? "text-white/60" : "text-white/35"}`}>{s}</span>
              </div>
              {state === "active" && (
                <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: ACCENT, width: `${((sub + 1) / TICKS_PER_STATION) * 100}%`, transition: "width 600ms ease-out" }} aria-hidden="true" />
              )}
            </li>
          )
        })}
      </ol>

      <div className="min-h-[196px] p-4">
        {station === 0 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Dictation, de-identified</p>
            <p className="mt-2 text-sm leading-relaxed text-white/70">{encounter.note}</p>
            <p className="mt-3 font-mono text-[11px] text-white/45">Transcript Cleaner (claude-haiku-5-5) normalising abbreviations and units</p>
          </div>
        )}
        {station === 1 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Section Extractor · claude-haiku-5-5</p>
            <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
              {encounter.sections.map((sec, i) => {
                const found = i <= Math.floor(((sub + 1) / TICKS_PER_STATION) * encounter.sections.length) - 1 || sub === TICKS_PER_STATION - 1
                return (
                  <li key={sec} className="flex items-center gap-2 text-xs">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: found ? ACCENT : "rgba(255,255,255,0.18)" }} aria-hidden="true" />
                    <span className={found ? "text-white/80" : "text-white/35"}>{sec}</span>
                    <span className="font-mono text-[10px] text-white/35">{found ? "quoted from dictation" : "pending"}</span>
                  </li>
                )
              })}
              {!encounter.sections.includes("ROS") && (
                <li className="flex items-center gap-2 text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/[0.18]" aria-hidden="true" />
                  <span className="text-white/35">ROS</span>
                  <span className="font-mono text-[10px]" style={{ color: ACCENT }}>
                    [CLINICIAN TO COMPLETE]
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
        {station === 2 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Coding Agent · gpt-4.1-mini · candidates with confidence</p>
            <ul className="mt-2 space-y-2.5">
              {encounter.codes.map((c, i) => {
                const shown = i <= sub
                const width = shown ? c.conf * 100 : 0
                return (
                  <li key={c.code} className="grid grid-cols-[76px_minmax(0,1fr)_40px] items-center gap-3 text-xs">
                    <span className={`font-mono ${shown ? "text-white/85" : "text-white/30"}`}>{c.code}</span>
                    <div>
                      <p className={`truncate ${shown ? "text-white/65" : "text-white/30"}`}>{c.text}</p>
                      <div className="mt-1 h-1.5 rounded-full bg-white/[0.06]">
                        <div className="h-1.5 rounded-full transition-[width] duration-700 ease-out" style={{ width: `${width}%`, background: c.conf >= 0.6 ? ACCENT : "rgba(255,255,255,0.4)" }} />
                      </div>
                    </div>
                    <span className="text-right font-mono tabular-nums text-white/55">{shown ? c.conf.toFixed(2) : ""}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
        {station === 3 && (
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Certified coder decides</p>
            {sub === 0 ? (
              <p className="mt-2 text-sm text-white/60">Queued for the coder with the draft note, the three candidates and the supporting text for each.</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {encounter.codes.map((c) => {
                  const accepted = coderAccepts.includes(c.code)
                  return (
                    <li key={c.code} className="flex items-center gap-3 text-xs">
                      <span className="w-[76px] font-mono text-white/85">{c.code}</span>
                      <span className="font-mono text-[11px]" style={{ color: accepted ? ACCENT : "rgba(255,255,255,0.4)" }}>
                        {accepted ? "accepted" : "dropped"}
                      </span>
                      <span className="truncate text-white/45">{c.text}</span>
                    </li>
                  )
                })}
                <li className="pt-1 font-mono text-[11px] text-white/45">
                  Decision recorded against run {encounter.id}; the agent's candidates stay in the log.
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
