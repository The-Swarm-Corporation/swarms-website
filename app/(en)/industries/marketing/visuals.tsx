"use client"

import { useMemo, useRef, type ReactNode } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { formatCompact, noise, useSimulationClock, walk } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: a campaign funnel with four live stages drawn as proportional
// bars, the channel mix underneath, and a feed of what the analyst agent
// noticed in the last few ticks.

const STAGES = ["Impressions", "Clicks", "Sign-ups", "Activations"]
const CHANNELS = [
  { name: "Paid social", color: "rgba(255,255,255,0.92)" },
  { name: "Search", color: "rgba(255,255,255,0.65)" },
  { name: "Email", color: "rgba(255,255,255,0.42)" },
  { name: "Organic", color: "rgba(255,255,255,0.22)" },
]
const NOTES = [
  "LinkedIn variant B carries most of the click lift, variant A flat",
  "sign-up rate dipped after the pricing line changed, flagged to the writer",
  "email two outperforms email one on clicks, swap the order next send",
  "search spend up on the brand term, no change in activations",
  "organic traffic is the only channel with a rising activation rate",
  "preview text with the end date beats the open-ended one",
  "instagram clicks arrive, sign-ups do not: landing page mismatch",
]
const NOTE_EVERY = 4

export function CampaignFunnelBoard() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1100)
  const t = tick + 120

  // Each stage is a share of the previous one; the shares drift with their own walks.
  const { counts, rates } = useMemo(() => {
    const impressions = walk(61, t, 2, 380_000, 620_000, 0.1)[1]
    const ctr = walk(62, t, 2, 0.018, 0.034, 0.08)[1]
    const signup = walk(63, t, 2, 0.09, 0.17, 0.08)[1]
    const activation = walk(64, t, 2, 0.28, 0.46, 0.08)[1]
    const clicks = impressions * ctr
    const signups = clicks * signup
    const activations = signups * activation
    return { counts: [impressions, clicks, signups, activations], rates: [1, ctr, signup, activation] }
  }, [t])

  const mix = useMemo(() => {
    const raw = CHANNELS.map((_, i) => 0.6 + noise(70 + i, Math.floor(t / 2)) * 1.6)
    const total = raw.reduce((a, b) => a + b, 0)
    return raw.map((v) => (v / total) * 100)
  }, [t])

  const feed = useMemo(() => {
    const out: { key: number; text: string; stage: string }[] = []
    for (let k = t; k > t - NOTE_EVERY * 3; k--) {
      if (k % NOTE_EVERY !== 0) continue
      const idx = Math.floor(noise(81, k) * NOTES.length)
      out.push({ key: k, text: NOTES[idx], stage: STAGES[Math.floor(noise(82, k) * STAGES.length)] })
    }
    return out
  }, [t])

  // Bars are drawn relative to the funnel top on a log-ish scale so the last
  // stage stays readable instead of collapsing to a hairline.
  const widthFor = (i: number) => {
    const ratio = counts[i] / counts[0]
    return 100 * Math.pow(ratio, 0.35)
  }

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Spring launch · funnel</span>
        <span className="font-mono text-[11px] text-white/45">analyst agent · gpt-5.4-mini</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated campaign" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_220px]">
        <div className="p-4">
          <ul className="space-y-3">
            {STAGES.map((label, i) => (
              <li key={label} className="grid grid-cols-[92px_minmax(0,1fr)_64px] items-center gap-3 text-xs">
                <span className="text-white/60">{label}</span>
                <div className="relative h-6 rounded bg-white/[0.04]">
                  <div
                    className="h-6 rounded transition-[width] duration-700 ease-out"
                    style={{
                      width: `${widthFor(i)}%`,
                      background: `linear-gradient(90deg, ${ACCENT}${["ee", "cc", "aa", "88"][i]}, ${ACCENT}44)`,
                    }}
                  />
                  {i > 0 && (
                    <span className="absolute inset-y-0 right-2 flex items-center font-mono text-[10px] tabular-nums text-white/55">
                      {(rates[i] * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
                <span className="text-right font-mono tabular-nums text-white/80">{formatCompact(counts[i])}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <div className="mb-1.5 flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Channel mix · clicks</span>
              <span className="font-mono text-[10px] text-white/35">last 24h</span>
            </div>
            <svg viewBox="0 0 400 14" width="100%" height="14" className="block" role="img" aria-label="Simulated share of clicks by channel">
              {mix.reduce<{ x: number; els: ReactNode[] }>(
                (acc, v, i) => {
                  const w = (v / 100) * 400
                  acc.els.push(
                    <rect key={CHANNELS[i].name} x={acc.x} y={0} width={Math.max(0, w - 1.5)} height={14} rx={2} fill={CHANNELS[i].color} style={{ transition: "x 700ms, width 700ms" }} />,
                  )
                  acc.x += w
                  return acc
                },
                { x: 0, els: [] },
              ).els}
            </svg>
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {CHANNELS.map((c, i) => (
                <li key={c.name} className="flex items-center gap-1.5 font-mono text-[10px] text-white/50">
                  <span className="h-2 w-2 rounded-sm" style={{ background: c.color }} aria-hidden="true" />
                  {c.name}
                  <span className="tabular-nums text-white/70">{mix[i].toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Analyst noticed</p>
          <ul className="mt-3 space-y-3">
            {feed.map((n) => (
              <li key={n.key} className="text-xs leading-snug">
                <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: ACCENT }}>
                  {n.stage}
                </span>
                <p className="mt-0.5 text-white/55">{n.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: the content pipeline as a kanban. Cards move one column to
// the right per tick; now and then the brand reviewer sends one back to the
// draft column with a reason.

const COLUMNS = ["Brief", "Research", "Draft", "Brand review", "Scheduled"]
const CARDS = [
  { name: "Spring launch hero", channel: "Landing" },
  { name: "Welcome email 1 of 3", channel: "Email" },
  { name: "Freelancer case study", channel: "Blog" },
  { name: "LinkedIn variant B", channel: "Paid social" },
  { name: "Annual plan reminder", channel: "Email" },
  { name: "Invoice templates post", channel: "Blog" },
  { name: "Instagram carousel", channel: "Paid social" },
  { name: "Pricing page refresh", channel: "Landing" },
]
const REASONS = [
  "superlative without a source",
  "names a competitor",
  "price written with decimals",
  "exclamation mark in the headline",
  "product name capitalised wrong",
]

// One card's life is a fixed path through the columns; -1 means off the board.
const NORMAL_PATH = [0, 1, 2, 3, 4, 4, -1, -1, -1]
const SENT_BACK_PATH = [0, 1, 2, 3, 2, 3, 4, -1, -1]
const CYCLE = NORMAL_PATH.length

export function ContentPipelineKanban() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1600)

  const { board, events } = useMemo(() => {
    const board: { name: string; channel: string; col: number; back: boolean }[] = []
    const events: { key: string; text: string }[] = []
    CARDS.forEach((card, i) => {
      const offset = i * 2
      const age = tick + offset
      const cycle = Math.floor(age / CYCLE)
      const step = age % CYCLE
      const sentBack = noise(90 + i, cycle) < 0.35
      const path = sentBack ? SENT_BACK_PATH : NORMAL_PATH
      const col = path[step]
      if (col >= 0) board.push({ name: card.name, channel: card.channel, col, back: sentBack && step === 4 })
      if (sentBack && step === 4) {
        events.push({ key: `${i}-${cycle}-back`, text: `Brand Reviewer sent "${card.name}" back: ${REASONS[Math.floor(noise(95 + i, cycle) * REASONS.length)]}` })
      } else if (col === 4 && step === 4) {
        events.push({ key: `${i}-${cycle}-ok`, text: `Brand Reviewer approved "${card.name}", Channel Formatter scheduled it` })
      }
    })
    return { board, events }
  }, [tick])

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Content pipeline · board</span>
        <span className="font-mono text-[11px] text-white/45">one SequentialWorkflow run per card</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated board" : "Paused"} />
      </div>
      <div className="overflow-x-auto p-3">
        <div className="grid min-w-[560px] grid-cols-5 gap-2">
          {COLUMNS.map((col, ci) => {
            const cards = board.filter((c) => c.col === ci)
            return (
              <div key={col} className="min-h-[200px] rounded-md border border-white/[0.06] bg-black/40 p-2">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">{col}</span>
                  <span className="font-mono text-[10px] tabular-nums text-white/35">{cards.length}</span>
                </div>
                <ul className="space-y-1.5">
                  {cards.map((c) => (
                    <li
                      key={c.name}
                      className="rounded border px-2 py-1.5 transition-colors duration-500"
                      style={{
                        borderColor: c.back ? "#ef4444" : ci === 3 ? `${ACCENT}99` : "rgba(255,255,255,0.1)",
                        background: c.back ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.03)",
                      }}
                    >
                      <p className="truncate text-[11px] font-medium text-white/85">{c.name}</p>
                      <p className="font-mono text-[9.5px] text-white/40">{c.channel}{c.back ? " · sent back" : ""}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
      <div className="border-t border-white/[0.08] px-4 py-3 font-mono text-[11px] leading-5 text-white/50" style={{ fontFamily: MONO }}>
        {events.length === 0 ? (
          <p>Brand Reviewer: nothing reached review this tick.</p>
        ) : (
          events.slice(0, 2).map((e) => (
            <p key={e.key} className="truncate">
              {e.text}
            </p>
          ))
        )}
      </div>
    </div>
  )
}
