"use client"

import { Check, Star } from "lucide-react"
import {
  levelFor,
  partLessonsDone,
  totalPoints,
  useAcademyProgress,
} from "@/lib/academy/progress"

export function PartProgress({
  partNumber,
  lessonIds,
}: {
  partNumber: number
  lessonIds: string[]
}) {
  const progress = useAcademyProgress()
  const done = partLessonsDone(progress, lessonIds)
  const points = totalPoints(progress)
  const { current } = levelFor(points)
  const pct = Math.round((done / lessonIds.length) * 100)

  return (
    <div className="mt-6 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          Part {partNumber} progress · {done}/{lessonIds.length} lessons
        </span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
          <Star className="h-3.5 w-3.5 text-white/40" strokeWidth={1.5} />
          {points} pts · {current.name}
        </span>
      </div>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.08]">
        <div
          className="h-full rounded-full bg-emerald-400/70 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function PartToc({
  partNumber,
  lessons,
  checkpointTitle,
  quizCount,
}: {
  partNumber: number
  lessons: { id: string; title: string }[]
  checkpointTitle: string
  quizCount: number
}) {
  const progress = useAcademyProgress()
  const quizBest = progress.quizBest[String(partNumber)]
  const checkpointDone = Boolean(progress.checkpoints[String(partNumber)])

  const tick = (done: boolean) =>
    done ? (
      <Check className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-emerald-400" strokeWidth={2} />
    ) : null

  return (
    <ol className="space-y-2.5">
      {lessons.map((lesson) => {
        const done = Boolean(progress.lessons[lesson.id])
        return (
          <li key={lesson.id}>
            <a
              href={`#lesson-${lesson.id}`}
              className={`flex gap-3 text-[13px] leading-relaxed transition-colors hover:text-white ${
                done ? "text-white/40 line-through decoration-white/20" : "text-white/60"
              }`}
            >
              <span className="font-mono text-white/35">{lesson.id.replace("-", ".")}</span>
              <span className="flex-1">{lesson.title}</span>
              {tick(done)}
            </a>
          </li>
        )
      })}
      <li>
        <a
          href="#checkpoint"
          className={`flex gap-3 text-[13px] leading-relaxed transition-colors hover:text-white ${
            checkpointDone ? "text-white/40" : "text-white/60"
          }`}
        >
          <span className="font-mono text-white/35">✦</span>
          <span className="flex-1">{checkpointTitle}</span>
          {tick(checkpointDone)}
        </a>
      </li>
      <li>
        <a
          href="#quiz"
          className="flex gap-3 text-[13px] leading-relaxed text-white/60 transition-colors hover:text-white"
        >
          <span className="font-mono text-white/35">?</span>
          <span className="flex-1">
            Knowledge check ({quizCount} questions)
            {quizBest !== undefined && (
              <span className="ml-2 font-mono text-[11px] text-emerald-400/80">
                best {quizBest}/{quizCount}
              </span>
            )}
          </span>
          {tick(quizBest !== undefined)}
        </a>
      </li>
    </ol>
  )
}
