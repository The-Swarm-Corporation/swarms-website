"use client"

import { useInView } from "framer-motion"
import { Pause, Play, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import { useReducedMotionSafe } from "./use-reduced-motion-safe"

type LineKind = "cmd" | "cont" | "code" | "add" | "out" | "ok" | "dim" | "log" | "sale"
type Line = { kind: LineKind; text: string }

const cmd = (text: string): Line => ({ kind: "cmd", text })
const cont = (text: string): Line => ({ kind: "cont", text })
const code = (text: string): Line => ({ kind: "code", text })
const add = (text: string): Line => ({ kind: "add", text })
const out = (text: string): Line => ({ kind: "out", text })
const ok = (text: string): Line => ({ kind: "ok", text })
const dim = (text: string): Line => ({ kind: "dim", text })
const log = (text: string): Line => ({ kind: "log", text })
const sale = (text: string): Line => ({ kind: "sale", text })

type Lang = "python" | "rust"

const BUILD: Record<Lang, Line[]> = {
  python: [
    cmd("pip install -U swarms"),
    ok("Successfully installed swarms"),
    cmd("cat research_agent.py"),
    code("from swarms import Agent"),
    code(""),
    code("agent = Agent("),
    code('    agent_name="Research-Agent",'),
    code('    system_prompt="Summarize each paper in three bullets.",'),
    code('    model_name="gpt-4.1",'),
    code("    max_loops=1,"),
    code(")"),
    code('agent.run("Summarize this week\'s agent papers")'),
    cmd("python research_agent.py"),
    ok("Research-Agent finished in 1 loop"),
  ],
  rust: [
    cmd("cargo add swarms-rs"),
    ok("Adding swarms-rs to dependencies"),
    cmd("cat src/main.rs"),
    code("let agent = client"),
    code("    .agent_builder()"),
    code('    .agent_name("Research-Agent")'),
    code('    .system_prompt("Summarize each paper in three bullets.")'),
    code("    .max_loops(1)"),
    code("    .build();"),
    code(""),
    code('agent.run("Summarize this week\'s agent papers".into()).await?;'),
    cmd("cargo run --release"),
    ok("Research-Agent finished in 1 loop"),
  ],
}

type Step = {
  id: string
  title: string
  body: string
  window: string
  lines: Line[]
}

const STEPS: Step[] = [
  {
    id: "build",
    title: "Build it",
    body: "Write the agent in Swarms Python or Swarms Rust and run it locally against any model.",
    window: "zsh",
    lines: [],
  },
  {
    id: "deploy",
    title: "Deploy it",
    body: "Send the same config to the Swarms API. It runs on hosted infrastructure and returns the output with token usage.",
    window: "api.swarms.world",
    lines: [
      cmd("curl -X POST https://api.swarms.world/v1/agent/completions \\"),
      cont('  -H "x-api-key: $SWARMS_API_KEY" \\'),
      cont("  -d @research_agent.json"),
      out("{"),
      out('  "id": "agent-7c1e...",'),
      out('  "outputs": [ ... ],'),
      out('  "usage": {'),
      out('    "input_tokens": 412,'),
      out('    "output_tokens": 638,'),
      out('    "total_tokens": 1050'),
      out("  }"),
      out("}"),
    ],
  },
  {
    id: "monitor",
    title: "Monitor it",
    body: "Watch every run in Swarms Cloud, with its logs, tokens, cost, and context use per agent.",
    window: "cloud.swarms.world/history",
    // Costs are gpt-4.1's rate ($2 in, $8 out per million tokens), and the
    // totals follow from them: ~500 runs a day at ~$0.006 each.
    lines: [
      dim("Completion logs for Research-Agent"),
      log("14:02:11  200  1,050 tokens  $0.0059"),
      log("14:02:15  200  1,222 tokens  $0.0067"),
      log("14:02:19  200    987 tokens  $0.0055"),
      ok("500 runs today, 0 failed, $3.02 spent"),
      out("Peak context use: 0.12% of the window"),
      dim("On track for $90.60 this month"),
    ],
  },
  {
    id: "sell",
    title: "Sell it",
    body: "Publish it to the Swarms Marketplace with one line. Buyers pay by card or crypto, and you keep 90%.",
    window: "swarms.world",
    lines: [
      cmd("git diff research_agent.py"),
      add('     model_name="gpt-4.1",'),
      add("+    publish_to_marketplace=True,"),
      cmd("python research_agent.py"),
      ok("Published Research-Agent to swarms.world"),
      dim("Waiting for a buyer..."),
      sale("Sale    $20.00 by card"),
      sale("You keep $18.00 (90%)"),
    ],
  },
]

// Every transcript, so the ones not on screen can still ship in the HTML.
const TRANSCRIPTS: { id: string; step: number; lang?: Lang; title: string; lines: Line[] }[] = [
  { id: "build-python", step: 0, lang: "python", title: "Build it in Python", lines: BUILD.python },
  { id: "build-rust", step: 0, lang: "rust", title: "Build it in Rust", lines: BUILD.rust },
  ...STEPS.slice(1).map((s, i) => ({ id: s.id, step: i + 1, title: s.title, lines: s.lines })),
]

function linesFor(stepIndex: number, lang: Lang) {
  return stepIndex === 0 ? BUILD[lang] : STEPS[stepIndex].lines
}

// Delay before a line of each kind starts to appear, in ms.
const DELAY: Record<LineKind, number> = {
  cmd: 380,
  cont: 60,
  code: 55,
  add: 260,
  out: 70,
  ok: 240,
  dim: 320,
  log: 520,
  sale: 900,
}
const TYPE_MS = 22
const DWELL_MS = 2600

export function StackLifecycle() {
  const reduceMotion = useReducedMotionSafe()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-120px" })

  const [step, setStep] = useState(0)
  const [lang, setLang] = useState<Lang>("python")
  const [autoplay, setAutoplay] = useState(true)
  // Lines fully shown and characters typed on the current command. The
  // server renders step 1 complete, so the transcript is in the page HTML; it
  // restarts and types once scrolled into view.
  const [shown, setShown] = useState(() => linesFor(0, "python").length)
  const [typed, setTyped] = useState(0)
  const [armed, setArmed] = useState(false)

  const lines = linesFor(step, lang)
  const complete = shown >= lines.length

  function goTo(next: number, nextLang = lang) {
    setStep(next)
    setLang(nextLang)
    setShown(reduceMotion ? linesFor(next, nextLang).length : 0)
    setTyped(0)
    if (!reduceMotion) setArmed(true)
  }

  useEffect(() => {
    if (!inView || reduceMotion || armed) return
    setArmed(true)
    setShown(0)
    setTyped(0)
  }, [inView, reduceMotion, armed])

  // Reduced motion: every step renders complete, nothing types.
  useEffect(() => {
    if (reduceMotion) setShown(lines.length)
  }, [reduceMotion, lines.length])

  // The typing engine: one timer at a time, advancing a line or a character.
  useEffect(() => {
    if (!armed || reduceMotion || complete) return
    const line = lines[shown]
    let id: ReturnType<typeof setTimeout>

    if (line.kind === "cmd") {
      if (typed < line.text.length) {
        id = setTimeout(() => setTyped((t) => t + 1), typed === 0 ? DELAY.cmd : TYPE_MS)
      } else {
        id = setTimeout(() => {
          setShown((s) => s + 1)
          setTyped(0)
        }, 220)
      }
    } else {
      id = setTimeout(() => setShown((s) => s + 1), DELAY[line.kind])
    }
    return () => clearTimeout(id)
  }, [armed, reduceMotion, complete, lines, shown, typed])

  // Autoplay moves on to the next step after a pause, and stops at the end.
  useEffect(() => {
    if (!armed || !complete || !autoplay || reduceMotion || step === STEPS.length - 1) return
    const id = setTimeout(() => goTo(step + 1), DWELL_MS)
    return () => clearTimeout(id)
  }, [armed, complete, autoplay, reduceMotion, step])

  const atEnd = complete && step === STEPS.length - 1

  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div ref={ref} className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Take one AI agent from first line of code to first sale
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              The same research agent built, deployed, monitored, and sold on Swarms. Watch it run,
              or pick a step.
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <ol className="grid grid-cols-4 gap-2 lg:grid-cols-1">
              {STEPS.map((s, i) => {
                const active = i === step
                const fill = i < step ? 1 : active ? (lines.length ? shown / lines.length : 0) : 0
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        setAutoplay(false)
                        goTo(i)
                      }}
                      aria-current={active ? "step" : undefined}
                      className={`group relative h-full w-full overflow-hidden rounded-md border px-2 py-3 text-left transition-colors sm:px-4 lg:px-5 lg:py-4 ${
                        active
                          ? "border-white/20 bg-white/[0.05]"
                          : "border-white/[0.08] bg-transparent hover:border-white/15 hover:bg-white/[0.02]"
                      }`}
                    >
                      <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                        <span
                          className={`text-sm font-semibold tabular-nums ${active ? "text-white" : "text-white/35"}`}
                        >
                          {i + 1}
                        </span>
                        <span
                          className={`text-[13px] font-semibold sm:text-base ${active ? "text-white" : "text-white/60 group-hover:text-white/80"}`}
                        >
                          {s.title}
                        </span>
                      </div>
                      <p
                        className={`mt-1.5 hidden pl-6 text-sm font-normal leading-relaxed lg:block ${active ? "text-white/60" : "text-white/40"}`}
                      >
                        {s.body}
                      </p>
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-px bg-white/[0.06]"
                      >
                        <span
                          className="block h-full bg-white/70 transition-[width] duration-200 ease-linear"
                          style={{ width: `${fill * 100}%` }}
                        />
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="min-w-0">
              <p className="mb-4 text-sm font-normal leading-relaxed text-white/60 lg:hidden">
                {STEPS[step].body}
              </p>
              <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
                <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                  <span className="ml-3 truncate font-mono text-[11px] font-normal text-white/40">
                    {STEPS[step].window}
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    {step === 0 && (
                      <div
                        role="radiogroup"
                        aria-label="Framework language"
                        className="flex rounded-full border border-white/[0.12] p-0.5"
                      >
                        {(["python", "rust"] as const).map((l) => (
                          <button
                            key={l}
                            type="button"
                            role="radio"
                            aria-checked={lang === l}
                            onClick={() => {
                              if (l !== lang) goTo(0, l)
                            }}
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-colors ${
                              lang === l ? "bg-white text-black" : "text-white/50 hover:text-white"
                            }`}
                          >
                            {l === "python" ? "Python" : "Rust"}
                          </button>
                        ))}
                      </div>
                    )}
                    {!reduceMotion && (
                      <button
                        type="button"
                        onClick={() => {
                          if (atEnd) {
                            setAutoplay(true)
                            goTo(0)
                          } else {
                            setAutoplay((a) => !a)
                          }
                        }}
                        aria-label={atEnd ? "Replay from the start" : autoplay ? "Pause autoplay" : "Play all steps"}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
                      >
                        {atEnd ? (
                          <RotateCcw className="h-3.5 w-3.5" />
                        ) : autoplay ? (
                          <Pause className="h-3.5 w-3.5" />
                        ) : (
                          <Play className="h-3.5 w-3.5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>

                <div
                  className="min-h-[21rem] whitespace-pre-wrap break-words p-4 font-mono text-[11.5px] font-normal leading-[1.7] sm:min-h-[23rem] sm:p-5 sm:text-[13px]"
                >
                  {lines.slice(0, Math.min(shown + 1, lines.length)).map((line, i) => {
                    const current = i === shown
                    if (current && line.kind !== "cmd") return null
                    return (
                      <TerminalLine
                        key={`${step}-${lang}-${i}`}
                        line={line}
                        text={current && line.kind === "cmd" ? line.text.slice(0, typed) : line.text}
                        caret={current}
                      />
                    )
                  })}
                  {complete && !reduceMotion && (
                    <span aria-hidden="true" className="inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] animate-pulse bg-white/60" />
                  )}
                </div>
              </div>

              {/* The transcripts not on screen, present in the HTML for search
                  engines and hidden like inactive tabs. */}
              <div hidden>
                {TRANSCRIPTS.filter(
                  (t) => !(t.step === step && (t.step !== 0 || t.lang === lang))
                ).map((t) => (
                  <div key={t.id}>
                    <p>{t.title}</p>
                    {t.lines.map((line, i) => (
                      <TerminalLine key={i} line={line} text={line.text} caret={false} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TerminalLine({
  line,
  text,
  caret,
}: {
  line: Line
  text: string
  caret: boolean
}) {
  switch (line.kind) {
    case "cmd":
      return (
        <div>
          <span className="select-none text-white/35">$ </span>
          <span className="text-white">{text}</span>
          {caret && (
            <span
              aria-hidden="true"
              className="ml-px inline-block h-[1.1em] w-[0.55em] translate-y-[0.2em] bg-white/70"
            />
          )}
        </div>
      )
    case "cont":
      return <div className="text-white">{text}</div>
    case "code":
      return <div className="text-white/60">{text || " "}</div>
    case "add":
      return <div className={text.startsWith("+") ? "text-white" : "text-white/40"}>{text}</div>
    case "out":
      return <div className="text-white/55">{text}</div>
    case "ok":
      return (
        <div className="text-white/85">
          <span className="select-none text-white/45">✓ </span>
          {text}
        </div>
      )
    case "dim":
      return <div className="text-white/35">{text}</div>
    case "sale":
      return <div className="font-semibold text-red-400">{text}</div>
    case "log":
      return <div className="text-white/75">{text}</div>
  }
}
