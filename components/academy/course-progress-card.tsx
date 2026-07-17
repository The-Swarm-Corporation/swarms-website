"use client"

import Link from "next/link"
import { ArrowRight, Award, RotateCcw, Star } from "lucide-react"
import {
  isPartComplete,
  LEVELS,
  levelFor,
  partLessonsDone,
  resetProgress,
  totalPoints,
  useAcademyProgress,
} from "@/lib/academy/progress"

export type PartSummary = {
  part: number
  slug: string
  title: string
  lessonIds: string[]
  quizTotal: number
}

export function CourseProgressCard({ parts }: { parts: PartSummary[] }) {
  const progress = useAcademyProgress()
  const points = totalPoints(progress)
  const { current, next } = levelFor(points)

  const totalLessons = parts.reduce((n, p) => n + p.lessonIds.length, 0)
  const doneLessons = parts.reduce((n, p) => n + partLessonsDone(progress, p.lessonIds), 0)
  const started = doneLessons > 0 || points > 0

  const firstIncomplete =
    parts.find((p) => !isPartComplete(progress, p.part, p.lessonIds)) ?? parts[0]

  const levelPct = next
    ? Math.min(100, Math.round(((points - current.min) / (next.min - current.min)) * 100))
    : 100

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-col gap-6 border-b border-white/[0.08] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <div>
          <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Your progress
          </p>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
              {points}
            </span>
            <span className="text-sm text-white/50">points</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1 text-xs font-medium text-white/70">
              <Star className="h-3 w-3 text-white/50" strokeWidth={1.5} />
              {current.name}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-white/[0.08] sm:w-56">
              <div
                className="h-full rounded-full bg-white/60 transition-all duration-500"
                style={{ width: `${levelPct}%` }}
              />
            </div>
            <span className="font-mono text-[11px] text-white/40">
              {next ? `${next.min - points} pts to ${next.name}` : "Max rank reached"}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <Link
            href={`/academy/swarms-api/${firstIncomplete.slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            {started ? `Continue Part ${firstIncomplete.part}` : "Start Part 1"}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <span className="text-[12px] text-white/40">
            {doneLessons}/{totalLessons} lessons complete
          </span>
        </div>
      </div>

      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
        {parts.map((p) => {
          const done = partLessonsDone(progress, p.lessonIds)
          const complete = isPartComplete(progress, p.part, p.lessonIds)
          const quizBest = progress.quizBest[String(p.part)]
          const pct = Math.round((done / p.lessonIds.length) * 100)
          return (
            <Link
              key={p.slug}
              href={`/academy/swarms-api/${p.slug}`}
              className="group bg-[#0a0a0a] p-5 transition-colors hover:bg-black"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Part {p.part}
                </span>
                {complete && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
                    <Award className="h-3 w-3" strokeWidth={1.5} />
                    Badge
                  </span>
                )}
              </div>
              <p className="mt-2 truncate text-sm font-medium text-white/80 group-hover:text-white">
                {p.title}
              </p>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/[0.08]">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    complete ? "bg-emerald-400/80" : "bg-white/50"
                  }`}
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-2 font-mono text-[11px] text-white/40">
                {done}/{p.lessonIds.length} lessons
                {quizBest !== undefined && ` · quiz ${quizBest}/${p.quizTotal}`}
              </p>
            </Link>
          )
        })}
      </div>

      {started && (
        <div className="flex items-center justify-between border-t border-white/[0.08] px-6 py-3 sm:px-8">
          <span className="text-[12px] text-white/35">
            Progress is saved in this browser. Ranks: {LEVELS.map((l) => l.name).join(" → ")}.
          </span>
          <button
            type="button"
            onClick={() => {
              if (window.confirm("Reset all course progress and points?")) resetProgress()
            }}
            className="inline-flex items-center gap-1.5 text-[12px] text-white/35 transition-colors hover:text-white/70"
          >
            <RotateCcw className="h-3 w-3" />
            Reset
          </button>
        </div>
      )}
    </div>
  )
}
