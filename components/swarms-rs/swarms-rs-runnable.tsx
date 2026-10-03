"use client"

import { useInView } from "framer-motion"
import { Play, RotateCcw } from "lucide-react"
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"

import { CopyButton } from "@/components/copy-button"
import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"

const DIM = /^(Compiling|Finished|Running|Creating|Adding)\b/

// A code panel in the style of the /stack explorer, with a terminal under it
// that types the command and prints the output when the panel scrolls into
// view. The output is illustrative, and the panel says so.
export function RunnableCode({
  file,
  code,
  codeNode,
  command,
  output,
}: {
  file: string
  code: string
  codeNode: ReactNode
  command?: string
  output: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduceMotion = useReducedMotionSafe()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [typed, setTyped] = useState(0)
  const [shown, setShown] = useState(0)
  const [running, setRunning] = useState(false)
  const [started, setStarted] = useState(false)

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  const later = (fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms))
  }

  const run = useCallback(() => {
    clear()
    setStarted(true)
    setTyped(0)
    setShown(0)

    if (reduceMotion) {
      setTyped(command?.length ?? 0)
      setShown(output.length)
      setRunning(false)
      return
    }

    setRunning(true)
    let t = 150
    const cmdLength = command?.length ?? 0
    for (let i = 1; i <= cmdLength; i++) {
      t += 32
      later(() => setTyped(i), t)
    }
    t += command ? 350 : 100
    output.forEach((line, i) => {
      t += DIM.test(line) ? 260 : 130
      later(() => setShown(i + 1), t)
    })
    later(() => setRunning(false), t + 200)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [command, output, reduceMotion])

  useEffect(() => {
    if (inView && !started) run()
  }, [inView, started, run])

  useEffect(() => clear, [])

  const rows = output.length + (command ? 1 : 0)

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-lg border border-white/[0.08] bg-black"
    >
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{file}</span>
        <CopyButton value={code} className="ml-auto" />
      </div>

      <div className="p-4 text-[11px] leading-relaxed sm:p-5 sm:text-[12.5px] [&_pre]:font-mono">
        {codeNode}
      </div>

      <div className="border-t border-white/[0.08] bg-[#050505]">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <span
            aria-hidden="true"
            className={`h-1.5 w-1.5 rounded-full ${running ? "animate-pulse bg-white" : "bg-white/30"}`}
          />
          <span className="font-mono text-[11px] text-white/40">
            {running ? "running" : started ? "done" : "terminal"} · example output
          </span>
          <button
            type="button"
            onClick={run}
            disabled={running}
            aria-label={started ? "Run again" : "Run"}
            className="ml-auto flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            {started ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {started ? "Run again" : "Run"}
          </button>
        </div>

        <div
          aria-live="polite"
          className="px-4 pb-4 font-mono text-[11px] leading-6 sm:text-[12.5px]"
          style={{ minHeight: `${rows * 1.5 + 1.25}rem` }}
        >
          {command && started && (
            <div className="whitespace-pre-wrap text-white/85">
              <span className="text-white/30">$ </span>
              {command.slice(0, typed)}
              {typed < command.length && <Cursor />}
            </div>
          )}
          {output.slice(0, shown).map((line, i) => (
            <div
              key={i}
              className={`whitespace-pre-wrap ${
                DIM.test(line) ? "text-white/35" : line.startsWith("──") ? "text-white/60" : "text-white/85"
              }`}
            >
              {line}
              {running && i === shown - 1 && <Cursor />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Cursor() {
  return <span aria-hidden="true" className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/70" />
}
