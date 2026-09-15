"use client"

import { useSyncExternalStore } from "react"
import { courseParts, courseMeta } from "./swarms-api-course"

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
  profile?: {
    name?: string
  }
}

export type CompletedPart = {
  part: number
  title: string
  slug: string
}

export type CertificateData = {
  recipientName: string | undefined
  courseTitle: string
  completionDate: string | null
  totalPoints: number
  finalRank: string
  completedParts: CompletedPart[]
  certificateId: string
}

const EMPTY: AcademyProgress = {
  lessons: {},
  checkpoints: {},
  trials: {},
  quizBest: {},
  quizTotals: {},
  profile: undefined,
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

export function isCourseComplete(p: AcademyProgress): boolean {
  return courseParts.every((part) =>
    isPartComplete(p, part.part, part.lessons.map((l) => l.id))
  )
}

export function getProfile(p: AcademyProgress): { name?: string } {
  return p.profile ?? { name: undefined }
}

export function setProfileName(name: string): void {
  const trimmed = name.trim()
  if (!trimmed) return
  const p = read()
  write({
    ...p,
    profile: { ...p.profile, name: trimmed },
  })
}

function getPartCompletionTimestamp(p: AcademyProgress, partNumber: number): number | null {
  const part = courseParts.find((cp) => cp.part === partNumber)
  if (!part) return null

  const lessonTimestamps = part.lessons
    .map((l) => p.lessons[l.id])
    .filter((ts): ts is number => typeof ts === "number")
  const checkpointTimestamp = p.checkpoints[String(partNumber)]

  const allTimestamps = [...lessonTimestamps]
  if (checkpointTimestamp) allTimestamps.push(checkpointTimestamp)

  if (allTimestamps.length === 0) return null
  return Math.max(...allTimestamps)
}

export function getCourseCompletionDate(p: AcademyProgress): string | null {
  if (!isCourseComplete(p)) return null

  const partTimestamps = courseParts
    .map((part) => getPartCompletionTimestamp(p, part.part))
    .filter((ts): ts is number => ts !== null)

  if (partTimestamps.length === 0) return null

  const latestTimestamp = Math.max(...partTimestamps)
  return new Date(latestTimestamp).toISOString().split("T")[0]
}

function arrayBufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

function djb2Hash(str: string): string {
  let hash = 5381
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash).toString(16).padStart(8, "0")
}

export function createCertificateId(
  recipientName: string | undefined,
  completionDate: string | null,
  totalPoints: number,
  finalRank: string,
  completedParts: CompletedPart[]
): string {
  const payload = JSON.stringify({
    name: recipientName ?? "",
    date: completionDate ?? "",
    points: totalPoints,
    rank: finalRank,
    parts: completedParts.map((cp) => ({ part: cp.part, slug: cp.slug })),
  })

  return "swarms-" + djb2Hash(payload)
}

export function getCertificateData(p: AcademyProgress): CertificateData | null {
  if (!isCourseComplete(p)) return null

  const profile = getProfile(p)
  const points = totalPoints(p)
  const { current } = levelFor(points)
  const completionDate = getCourseCompletionDate(p)

  const completedParts: CompletedPart[] = courseParts.map((part) => ({
    part: part.part,
    title: part.title,
    slug: part.slug,
  }))

  const certificateId = createCertificateId(
    profile.name,
    completionDate,
    points,
    current.name,
    completedParts
  )

  return {
    recipientName: profile.name,
    courseTitle: courseMeta.title,
    completionDate,
    totalPoints: points,
    finalRank: current.name,
    completedParts,
    certificateId,
  }
}

function getAllLessonIds(): string[] {
  return courseParts.flatMap((part) => part.lessons.map((l) => l.id))
}

function getAllTrialKeys(): string[] {
  return courseParts.flatMap((part) =>
    part.lessons.flatMap((lesson) =>
      lesson.blocks
        .filter((b): b is { type: "trial"; method: "GET" | "POST"; path: string; body?: string; note?: string } => b.type === "trial")
        .map((b) => `${b.method}:${b.path}`)
    )
  )
}

function getQuizData() {
  return courseParts.map((part) => ({
    part: part.part,
    total: part.quiz.length,
    perfectScore: part.quiz.length,
  }))
}

export function seedFullProgress(): void {
  if (process.env.NODE_ENV !== "development") {
    console.warn("[dev] seedFullProgress() only available in development")
    return
  }
  const now = Date.now()
  const lessonIds = getAllLessonIds()
  const trialKeys = getAllTrialKeys()
  const quizData = getQuizData()

  const lessons: Record<string, number> = {}
  lessonIds.forEach((id, i) => {
    lessons[id] = now - (lessonIds.length - i) * 3600000
  })

  const checkpoints: Record<string, number> = {}
  courseParts.forEach((part) => {
    checkpoints[String(part.part)] = now - 1800000
  })

  const trials: Record<string, number> = {}
  trialKeys.forEach((key, i) => {
    trials[key] = now - (trialKeys.length - i) * 1800000
  })

  const quizBest: Record<string, number> = {}
  const quizTotals: Record<string, number> = {}
  quizData.forEach((q) => {
    quizBest[String(q.part)] = q.perfectScore
    quizTotals[String(q.part)] = q.total
  })

  const seeded: AcademyProgress = {
    lessons,
    checkpoints,
    trials,
    quizBest,
    quizTotals,
    profile: undefined,
  }

  write(seeded)
  console.log("[dev] Seeded full academy progress:", {
    lessons: Object.keys(lessons).length,
    checkpoints: Object.keys(checkpoints).length,
    trials: Object.keys(trials).length,
    quizParts: Object.keys(quizBest).length,
  })
}

export function resetSeededProgress(): void {
  if (process.env.NODE_ENV !== "development") {
    console.warn("[dev] resetSeededProgress() only available in development")
    return
  }
  write({ ...EMPTY })
  console.log("[dev] Reset academy progress to empty")
}

if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  ;(window as any).__SEED_ACADEMY__ = { seedFullProgress, resetSeededProgress }
  console.log("[dev] Academy seeder available at window.__SEED_ACADEMY__.seedFullProgress() / resetSeededProgress()")
}
