"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

import { CountUp } from "./count-up"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// One row of a benchmark chart. The bar fills when the chart scrolls into
// view, and longer bars take longer, so the rows read as a race: swarms-rs is
// across the line before the others have covered half the track.
export function BenchBar({
  name,
  display,
  pct,
  ratio,
  ours,
  index,
}: {
  name: string
  display: string
  pct: number
  ratio?: string
  ours?: boolean
  index: number
}) {
  const ref = useRef<HTMLLIElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const duration = 0.5 + (pct / 100) * 1.3

  return (
    <li ref={ref}>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
        <span className={ours ? "font-medium text-white" : "text-white/50"}>
          {name}
          {ratio && <span className="ml-2 font-mono text-[11px] text-white/30">{ratio}</span>}
        </span>
        <CountUp
          value={display}
          duration={duration}
          delay={index * 0.12}
          className={`font-mono text-xs tabular-nums ${ours ? "text-white" : "text-white/50"}`}
        />
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className={`h-2 rounded-full ${
            ours ? "bg-white shadow-[0_0_14px_rgba(255,255,255,0.55)]" : "bg-white/25"
          }`}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${pct}%` : 0 }}
          transition={{ duration, delay: index * 0.12, ease }}
        />
      </div>
    </li>
  )
}
