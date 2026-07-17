"use client"

import { useSyncExternalStore } from "react"

const STORAGE_KEY = "swarms-academy-progress-v1"
const EVENT = "swarms-academy-progress-change"

export const POINTS = {
  lesson: 10,
  trial: 15,
  checkpoint: 25,
  quizCorrect: 5,
  quizPerfectBonus: 10,
} as const

export type AcademyProgress = {
  lessons: Record<string, number>
  checkpoints: Record<string, number>
  trials: Record<string, number>
  quizBest: Record<string, number>
  quizTotals: Record<string, number>
}

const EMPTY: AcademyProgress = {
  lessons: {},
  checkpoints: {},
  trials: {},
  quizBest: {},
  quizTotals: {},
}

let cache: AcademyProgress | null = null

function read(): AcademyProgress {
  if (cache) return cache
  if (typeof window === "undefined") return EMPTY
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    cache = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<AcademyProgress>) } : EMPTY
  } catch {
    cache = EMPTY
  }
  return cache
}

function write(next: AcademyProgress) {
  cache = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // storage full or blocked; keep in-memory progress for this session
  }
  window.dispatchEvent(new Event(EVENT))
}

function subscribe(callback: () => void) {
  const onChange = () => callback()
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null
      callback()
    }
  }
  window.addEventListener(EVENT, onChange)
  window.addEventListener("storage", onStorage)
  return () => {
    window.removeEventListener(EVENT, onChange)
    window.removeEventListener("storage", onStorage)
  }
}

export function useAcademyProgress(): AcademyProgress {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function toggleLesson(id: string) {
  const p = read()
  const lessons = { ...p.lessons }
  if (lessons[id]) delete lessons[id]
  else lessons[id] = Date.now()
  write({ ...p, lessons })
}

export function toggleCheckpoint(part: number) {
  const p = read()
  const key = String(part)
  const checkpoints = { ...p.checkpoints }
  if (checkpoints[key]) delete checkpoints[key]
  else checkpoints[key] = Date.now()
  write({ ...p, checkpoints })
}

/** Returns true when the trial was completed for the first time (points newly earned). */
export function recordTrial(key: string): boolean {
  const p = read()
  if (p.trials[key]) return false
  write({ ...p, trials: { ...p.trials, [key]: Date.now() } })
  return true
}

/** Best score per part counts; retakes can only improve it. */
export function recordQuiz(part: number, correct: number, total: number) {
  const p = read()
  const key = String(part)
  const prevBest = p.quizBest[key] ?? -1
  if (correct <= prevBest) return
  write({
    ...p,
    quizBest: { ...p.quizBest, [key]: correct },
    quizTotals: { ...p.quizTotals, [key]: total },
  })
}

export function resetProgress() {
  write({ ...EMPTY })
}

export function totalPoints(p: AcademyProgress): number {
  let points =
    Object.keys(p.lessons).length * POINTS.lesson +
    Object.keys(p.checkpoints).length * POINTS.checkpoint +
    Object.keys(p.trials).length * POINTS.trial
  for (const [part, best] of Object.entries(p.quizBest)) {
    points += best * POINTS.quizCorrect
    const total = p.quizTotals[part]
    if (total && best === total) points += POINTS.quizPerfectBonus
  }
  return points
}

export function partLessonsDone(p: AcademyProgress, lessonIds: string[]): number {
  return lessonIds.filter((id) => p.lessons[id]).length
}

export function isPartComplete(p: AcademyProgress, part: number, lessonIds: string[]): boolean {
  return (
    partLessonsDone(p, lessonIds) === lessonIds.length &&
    Boolean(p.checkpoints[String(part)]) &&
    p.quizBest[String(part)] !== undefined
  )
}

export const LEVELS: { name: string; min: number }[] = [
  { name: "Recruit", min: 0 },
  { name: "Agent Operator", min: 60 },
  { name: "Swarm Builder", min: 220 },
  { name: "Orchestrator", min: 440 },
  { name: "Swarm Architect", min: 660 },
]

export function levelFor(points: number) {
  let current = LEVELS[0]
  for (const level of LEVELS) {
    if (points >= level.min) current = level
  }
  const nextIndex = LEVELS.findIndex((l) => l.name === current.name) + 1
  const next = nextIndex < LEVELS.length ? LEVELS[nextIndex] : null
  return { current, next }
}
