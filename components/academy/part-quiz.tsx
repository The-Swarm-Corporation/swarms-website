"use client"

import { useState } from "react"
import { Check, RotateCcw, X } from "lucide-react"
import type { QuizQuestion } from "@/lib/academy/swarms-api-course"
import { POINTS, recordQuiz, useAcademyProgress } from "@/lib/academy/progress"

export function PartQuiz({ questions, partNumber }: { questions: QuizQuestion[]; partNumber: number }) {
  const [answers, setAnswers] = useState<(number | null)[]>(questions.map(() => null))
  const [submitted, setSubmitted] = useState(false)
  const progress = useAcademyProgress()
  const previousBest = progress.quizBest[String(partNumber)]

  const answered = answers.filter((a) => a !== null).length
  const score = answers.filter((a, i) => a === questions[i].answer).length

  const submit = () => {
    recordQuiz(partNumber, score, questions.length)
    setSubmitted(true)
  }

  const select = (qi: number, oi: number) => {
    if (submitted) return
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))
  }

  const reset = () => {
    setAnswers(questions.map(() => null))
    setSubmitted(false)
  }

  return (
    <div className="rounded-lg border border-white/[0.14] bg-white/[0.02]">
      <div className="border-b border-white/[0.08] p-6 sm:p-8">
        <p className="mb-2 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          Knowledge check · Part {partNumber}
        </p>
        <h2 className="text-2xl font-semibold leading-tight tracking-tighter text-white sm:text-3xl">
          Test what you remember
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          {questions.length} questions. Answer from memory before checking; look back at the
          lessons only after you see your score.
        </p>
      </div>

      <ol className="divide-y divide-white/[0.06]">
        {questions.map((q, qi) => {
          const chosen = answers[qi]
          const correct = submitted && chosen === q.answer
          const wrong = submitted && chosen !== null && chosen !== q.answer
          return (
            <li key={qi} className="p-6 sm:p-8">
              <p className="mb-4 text-[15px] font-medium leading-relaxed text-white">
                <span className="mr-2 font-mono text-white/35">{qi + 1}.</span>
                {q.question}
              </p>
              <div className="space-y-2">
                {q.options.map((option, oi) => {
                  const isChosen = chosen === oi
                  const isAnswer = submitted && oi === q.answer
                  let style = "border-white/[0.1] text-white/60 hover:border-white/30 hover:text-white"
                  if (!submitted && isChosen) style = "border-white/50 bg-white/[0.06] text-white"
                  if (isAnswer) style = "border-emerald-400/50 bg-emerald-400/[0.06] text-white"
                  if (submitted && isChosen && !isAnswer) style = "border-red-400/50 bg-red-400/[0.06] text-white"
                  return (
                    <button
                      key={oi}
                      type="button"
                      onClick={() => select(qi, oi)}
                      disabled={submitted}
                      className={`flex w-full items-start gap-3 rounded-md border px-4 py-2.5 text-left text-sm leading-relaxed transition-colors disabled:cursor-default ${style}`}
                    >
                      <span className="mt-0.5 font-mono text-[11px] text-white/35">
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1">{option}</span>
                      {isAnswer && <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-400" />}
                      {submitted && isChosen && !isAnswer && (
                        <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                      )}
                    </button>
                  )
                })}
              </div>
              {submitted && (
                <p
                  className={`mt-3 rounded-md border px-4 py-2.5 text-[13px] leading-relaxed ${
                    correct
                      ? "border-emerald-400/20 bg-emerald-400/[0.04] text-white/60"
                      : "border-white/[0.1] bg-white/[0.02] text-white/60"
                  }`}
                >
                  <span className={`mr-2 font-medium ${correct ? "text-emerald-400/90" : wrong ? "text-red-400/90" : "text-white/70"}`}>
                    {correct ? "Correct." : wrong ? "Not quite." : "Skipped."}
                  </span>
                  {q.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      <div className="flex flex-wrap items-center gap-4 border-t border-white/[0.08] p-6 sm:p-8">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={submit}
              disabled={answered === 0}
              className="rounded-full bg-white px-6 py-2.5 text-sm font-medium text-black transition-colors hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50"
            >
              Check answers
            </button>
            <span className="text-[13px] text-white/40">
              {answered} of {questions.length} answered
              {previousBest !== undefined && ` · best so far ${previousBest}/${questions.length}`}
            </span>
          </>
        ) : (
          <>
            <span className="text-lg font-semibold tracking-tight text-white">
              {score} / {questions.length}
            </span>
            <span className="rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-3 py-1 font-mono text-[11px] font-semibold text-emerald-300">
              {score * POINTS.quizCorrect + (score === questions.length ? POINTS.quizPerfectBonus : 0)}{" "}
              pts
              {score === questions.length && " · perfect bonus"}
            </span>
            <span className="text-[13px] leading-relaxed text-white/50">
              {score === questions.length
                ? "Perfect. Move on to the next part."
                : score >= Math.ceil(questions.length * 0.7)
                  ? "Solid. Skim the lessons you missed, then continue."
                  : "Worth a second pass through this part before continuing."}
              {" "}Your best score counts toward your points.
            </span>
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-5 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Retake
            </button>
          </>
        )}
      </div>
    </div>
  )
}
