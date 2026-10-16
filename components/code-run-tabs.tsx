"use client"

import { Play, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { CopyButton } from "@/components/copy-button"
import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"

const DIM = /^(Compiling|Finished|Running|Creating|Adding)\b/

// A code panel whose header has Code / Output tabs and a Run button. Running
// switches to the Output tab and streams the illustrative output there. Both
// views share one grid cell, so the panel is never taller than its code.
export function CodeRunTabs({
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
  const reduceMotion = useReducedMotionSafe()
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const [view, setView] = useState<"code" | "output">("code")
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

  useEffect(() => clear, [])

  const run = () => {
    clear()
    setView("output")
    setStarted(true)
    setTyped(0)
    setShown(0)

    if (reduceMotion) {
      setTyped(command?.length ?? 0)
      setShown(output.length)
      return
    }

    setRunning(true)
    let t = 150
    const cmdLength = command?.length ?? 0
    for (let i = 1; i <= cmdLength; i++) {
      t += 28
      later(() => setTyped(i), t)
    }
    t += command ? 300 : 100
    output.forEach((line, i) => {
      t += DIM.test(line) ? 240 : 110
      later(() => setShown(i + 1), t)
    })
    later(() => setRunning(false), t + 200)
  }

  const tab = (id: "code" | "output", label: string) => (
    <button
      type="button"
      role="tab"
      aria-selected={view === id}
      onClick={() => setView(id)}
      className={`rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
        view === id ? "bg-white/[0.08] text-white" : "text-white/40 hover:text-white/70"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-3 py-2 sm:px-4">
        <div role="tablist" aria-label={`${file} views`} className="flex items-center gap-1">
          {tab("code", file)}
          {tab("output", "Output")}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="flex items-center gap-1.5 rounded-full border border-white/[0.14] px-3 py-1 text-[11px] font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-40"
          >
            {started && !running ? <RotateCcw className="h-3 w-3" /> : <Play className="h-3 w-3" />}
            {running ? "Running" : started ? "Run again" : "Run"}
          </button>
          <CopyButton value={code} />
        </div>
      </div>

      {/* Both views occupy the same cell; the hidden one keeps its height. */}
      <div className="grid">
        <div
          className={`col-start-1 row-start-1 p-4 sm:p-5 ${view === "code" ? "" : "invisible"}`}
          aria-hidden={view !== "code"}
        >
          {codeNode}
        </div>
        <div
          role="tabpanel"
          aria-live="polite"
          aria-hidden={view !== "output"}
          className={`col-start-1 row-start-1 overflow-hidden bg-[#050505] p-4 font-mono text-[11px] leading-6 sm:p-5 sm:text-[12.5px] ${
            view === "output" ? "" : "invisible"
          }`}
        >
          {!started ? (
            <p className="text-white/35">Press Run to see the example output.</p>
          ) : (
            <>
              {command && (
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
              {!running && <p className="mt-2 text-white/25">example output</p>}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function Cursor() {
  return <span aria-hidden="true" className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-white/70" />
}
