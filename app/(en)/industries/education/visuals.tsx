"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: a class mastery heatmap, 20 students by 8 learning objectives.
// A grading agent scores one submission per tick and the cell it touched
// updates; a tutor agent names the next step for the weakest cell. The
// instructor owns every grade; the panel says so.

const STUDENTS = 20
const OBJECTIVES = ["Thesis", "Evidence", "Analysis", "Structure", "Counter-arg", "Citations", "Style", "Mechanics"]
const NEXT_STEPS: Record<string, string> = {
  Thesis: "rewrite the thesis as one arguable sentence, then check each paragraph against it",
  Evidence: "replace the two generic claims in paragraph 3 with a quoted source",
  Analysis: "after each quote, add one sentence saying what it shows",
  Structure: "move the paragraph 4 idea next to paragraph 2 where it belongs",
  "Counter-arg": "name the strongest objection and answer it with a source",
  Citations: "fix the three in-text citations that lack page numbers",
  Style: "cut the sentences that restate the previous one",
  Mechanics: "run the comma splice exercise set, then revise paragraph 5",
}

function baseMastery(s: number, o: number) {
  // Each student has a level, each objective a difficulty; the pair sets a base.
  const student = 0.35 + noise(201, s) * 0.55
  const objective = 0.75 + noise(202, o) * 0.35
  return Math.min(1, Math.max(0, student * objective + (noise(203, s * 8 + o) - 0.5) * 0.25))
}

function cellColor(v: number) {
  // A white ramp: dim for low mastery, near solid for high.
  return `rgba(255,255,255,${(0.06 + Math.min(1, Math.max(0, v)) * 0.84).toFixed(2)})`
}

export function MasteryHeatmap() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1000)

  const grid = useMemo(() => {
    const g: number[][] = Array.from({ length: STUDENTS }, (_, s) => Array.from({ length: OBJECTIVES.length }, (_, o) => baseMastery(s, o)))
    // Replay the grading agent's updates up to this tick.
    for (let t = 1; t <= tick; t++) {
      const s = Math.floor(noise(210, t) * STUDENTS)
      const o = Math.floor(noise(211, t) * OBJECTIVES.length)
      const score = noise(212, t)
      g[s][o] = g[s][o] * 0.6 + score * 0.4
    }
    return g
  }, [tick])

  const last = tick > 0 ? { s: Math.floor(noise(210, tick) * STUDENTS), o: Math.floor(noise(211, tick) * OBJECTIVES.length), score: noise(212, tick) } : null

  // Weakest cell and class average per objective.
  let weakest = { s: 0, o: 0, v: 1 }
  grid.forEach((row, s) =>
    row.forEach((v, o) => {
      if (v < weakest.v) weakest = { s, o, v }
    }),
  )
  const averages = OBJECTIVES.map((_, o) => grid.reduce((a, row) => a + row[o], 0) / STUDENTS)
  const graded = Math.min(tick, 200)

  // Objectives as rows, students as columns, class average at the right.
  const CELL = 20
  const GAP = 3
  const LABEL_W = 84
  const TOP = 18
  const AVG_W = 70
  const W = LABEL_W + STUDENTS * (CELL + GAP) + 12 + AVG_W
  const H = TOP + OBJECTIVES.length * (CELL + GAP) + 4

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Period 3 · mastery by objective</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">{graded} submissions scored</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated class" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_210px]">
        <div className="p-3 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated mastery heatmap of 20 students across 8 learning objectives, updated as a grading agent scores submissions">
            {Array.from({ length: STUDENTS }, (_, s) => (
              <text key={s} x={LABEL_W + s * (CELL + GAP) + CELL / 2} y={11} textAnchor="middle" fontSize={7} fontFamily={MONO} fill={last && last.s === s ? "#fff" : "rgba(255,255,255,0.35)"}>
                {String(s + 1).padStart(2, "0")}
              </text>
            ))}
            <text x={LABEL_W + STUDENTS * (CELL + GAP) + 12} y={11} fontSize={7} fontFamily={MONO} fill="rgba(255,255,255,0.35)" style={{ letterSpacing: 1 }}>
              CLASS AVG
            </text>
            {OBJECTIVES.map((label, o) => {
              const y = TOP + o * (CELL + GAP)
              const avgX = LABEL_W + STUDENTS * (CELL + GAP) + 12
              return (
                <g key={label}>
                  <text x={LABEL_W - 8} y={y + CELL / 2 + 3} textAnchor="end" fontSize={9} fontFamily={MONO} fill={o === weakest.o ? RED : "rgba(255,255,255,0.55)"}>
                    {label}
                  </text>
                  {grid.map((row, s) => {
                    const v = row[o]
                    const touched = last && last.s === s && last.o === o
                    const weak = weakest.s === s && weakest.o === o
                    return (
                      <rect
                        key={s}
                        x={LABEL_W + s * (CELL + GAP)}
                        y={y}
                        width={CELL}
                        height={CELL}
                        rx={3}
                        fill={cellColor(v)}
                        stroke={touched ? "#fff" : weak ? RED : "rgba(255,255,255,0.04)"}
                        strokeWidth={touched || weak ? 1.2 : 1}
                        style={{ transition: "fill 500ms" }}
                      />
                    )
                  })}
                  <rect x={avgX} y={y + CELL / 2 - 3} width={AVG_W - 26} height={6} rx={2} fill="rgba(255,255,255,0.06)" />
                  <rect x={avgX} y={y + CELL / 2 - 3} width={(AVG_W - 26) * averages[o]} height={6} rx={2} fill={ACCENT} style={{ transition: "width 500ms" }} />
                  <text x={avgX + AVG_W - 22} y={y + CELL / 2 + 3} fontSize={8} fontFamily={MONO} fill="rgba(255,255,255,0.5)">
                    {Math.round(averages[o] * 100)}%
                  </text>
                </g>
              )
            })}
          </svg>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Grading agent</p>
          {last ? (
            <p className="mt-2 text-xs leading-snug text-white/55">
              scored <span className="font-mono text-white/80">s{String(last.s + 1).padStart(2, "0")}</span> on <span className="text-white/80">{OBJECTIVES[last.o]}</span> at {Math.round(last.score * 4)}/4, proposed for instructor review
            </p>
          ) : (
            <p className="mt-2 text-xs text-white/40">Scroll into view to start scoring.</p>
          )}
          <p className="mt-1 font-mono text-[10px] text-white/35">claude-haiku-5-5</p>

          <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Tutor agent · weakest cell</p>
          <p className="mt-2 text-xs leading-snug text-white/55">
            <span className="font-mono text-white/80">s{String(weakest.s + 1).padStart(2, "0")}</span> on <span style={{ color: RED }}>{OBJECTIVES[weakest.o]}</span> ({Math.round(weakest.v * 100)}%): {NEXT_STEPS[OBJECTIVES[weakest.o]]}
          </p>
          <p className="mt-1 font-mono text-[10px] text-white/35">claude-sonnet-5-5</p>

          <p className="mt-5 border-t border-white/[0.08] pt-3 font-mono text-[10px] leading-4 text-white/35">Scores are proposals. The instructor records grades.</p>
        </div>
      </div>
    </div>
  )
}

// Second visual: the debate transcript for one rubric criterion. Advocate
// and challenger take turns, the judge proposes, the instructor accepts or
// overrides. The instructor line is the only one that counts as a grade.

const CRITERIA = [
  {
    name: "Argument",
    advocate: "The thesis in paragraph 1 ('uniform policies widen, rather than narrow, how students express themselves') is arguable and every body paragraph returns to it.",
    challenger: "Paragraph 4 names the cost objection but never answers it; the rubric's level 4 requires a response with evidence, so this is a 3.",
    judge: "PROPOSED SCORE 3/4. The thesis is sustained; the counter-argument is named but not answered. Deciding quote: 'some say uniforms are expensive' with no follow-up.",
  },
  {
    name: "Evidence",
    advocate: "Three district reports are cited with years, and the paragraph 2 statistic is explained in the student's own words.",
    challenger: "The paragraph 3 claim about 'most teachers' has no source at all, which the rubric treats as a generic claim.",
    judge: "PROPOSED SCORE 3/4. Most claims are supported; one unsupported generalization in paragraph 3.",
  },
  {
    name: "Counter-argument",
    advocate: "The objection is stated fairly and in the opponent's terms, which is more than the level 2 descriptor asks.",
    challenger: "Stating it fairly is not answering it. There is no evidence offered against the cost objection.",
    judge: "PROPOSED SCORE 2/4. The objection is acknowledged but not addressed. Flag for instructor: borderline with 3 if the paragraph 5 aside counts as a response.",
  },
]
const TURNS = 5 // advocate, challenger, judge, instructor, pause

export function DebateTranscript() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1700)

  const round = Math.floor(tick / TURNS)
  const turn = tick % TURNS
  const criterion = CRITERIA[round % CRITERIA.length]
  // The instructor accepts most proposals and overrides some, by one point.
  const overrides = noise(230, round) < 0.3
  const proposed = Number(criterion.judge.match(/SCORE (\d)/)?.[1] ?? 3)
  const final = overrides ? (noise(231, round) < 0.5 ? Math.max(0, proposed - 1) : Math.min(4, proposed + 1)) : proposed

  const lines = [
    { who: "Criterion Advocate", model: "claude-sonnet-5-5", text: criterion.advocate, color: "rgba(255,255,255,0.9)" },
    { who: "Criterion Challenger", model: "gpt-5.4", text: criterion.challenger, color: "rgba(255,255,255,0.6)" },
    { who: "Rubric Judge", model: "claude-opus-5-5", text: criterion.judge, color: "rgba(255,255,255,0.35)" },
    {
      who: "Instructor",
      model: "human",
      text: overrides ? `Override: ${final}/4. ${final > proposed ? "The paragraph 5 aside does answer the objection, if thinly." : "The quoted thesis is restated, not sustained, in paragraph 3."} Recorded in the gradebook.` : `Accepted ${final}/4. Recorded in the gradebook with the transcript attached.`,
      color: "#fff",
    },
  ]
  const shown = Math.min(lines.length, turn + 1)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">DebateWithJudge · transcript</span>
        <span className="font-mono text-[11px] text-white/45">
          s04 · criterion: {criterion.name}
        </span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated debate" : "Paused"} />
      </div>
      <ol className="divide-y divide-white/[0.06]">
        {lines.map((l, i) => {
          const visible = i < shown
          return (
            <li key={l.who} className="grid gap-2 px-4 py-3 sm:grid-cols-[160px_minmax(0,1fr)]" style={{ opacity: visible ? 1 : 0.28, transition: "opacity 400ms" }}>
              <div className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: l.color }} aria-hidden="true" />
                <div>
                  <p className="text-xs font-semibold text-white/85">{l.who}</p>
                  <p className="font-mono text-[10px] text-white/35">{l.model}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-white/60">{visible ? l.text : i === 3 ? "waiting for the proposed score" : "composing"}</p>
            </li>
          )
        })}
      </ol>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] text-white/45">
        <span>
          proposed <span className="text-white/75">{shown >= 3 ? `${proposed}/4` : "pending"}</span>
        </span>
        <span>
          grade <span style={{ color: shown >= 4 ? ACCENT : undefined }}>{shown >= 4 ? `${final}/4` : "instructor decides"}</span>
        </span>
        <span className="ml-auto text-white/35" style={{ fontFamily: MONO }}>
          round {round + 1} of {CRITERIA.length} criteria
        </span>
      </div>
    </div>
  )
}
