"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Check, Circle } from "lucide-react"
import {
  POINTS,
  toggleCheckpoint,
  toggleLesson,
  useAcademyProgress,
} from "@/lib/academy/progress"

export function LessonComplete({
  id,
  kind = "lesson",
}: {
  id: string
  kind?: "lesson" | "checkpoint"
}) {
  const progress = useAcademyProgress()
  const [popKey, setPopKey] = useState(0)

  const done =
    kind === "lesson" ? Boolean(progress.lessons[id]) : Boolean(progress.checkpoints[id])
  const points = kind === "lesson" ? POINTS.lesson : POINTS.checkpoint

  const onClick = () => {
    if (!done) setPopKey((k) => k + 1)
    if (kind === "lesson") toggleLesson(id)
    else toggleCheckpoint(Number(id))
  }

  return (
    <div className="relative mt-8 inline-flex items-center gap-3">
      <button
        type="button"
        onClick={onClick}
        aria-pressed={done}
        className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
          done
            ? "border-emerald-400/40 bg-emerald-400/[0.08] text-emerald-300"
            : "border-white/[0.16] text-white/70 hover:border-white/35 hover:text-white"
        }`}
      >
        {done ? (
          <Check className="h-4 w-4" />
        ) : (
          <Circle className="h-4 w-4 text-white/30" strokeWidth={1.5} />
        )}
        {done
          ? `${kind === "lesson" ? "Lesson" : "Checkpoint"} complete · ${points} pts earned`
          : `Mark ${kind === "lesson" ? "lesson" : "checkpoint"} complete · +${points} pts`}
      </button>

      <AnimatePresence>
        {popKey > 0 && done && (
          <motion.span
            key={popKey}
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: -34, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="pointer-events-none absolute -right-2 top-0 font-mono text-sm font-semibold text-emerald-300"
          >
            +{points}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}
