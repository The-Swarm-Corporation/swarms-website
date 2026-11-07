"use client"

import { useInView } from "framer-motion"
import { useEffect, useState, type RefObject } from "react"

import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"

// A tick counter for the simulated "live" visualizations on the industry
// pages. It only advances while the element is on screen, the tab is visible
// and the visitor has not asked for reduced motion, so a page full of
// diagrams costs nothing while it sits below the fold. The server and the
// first client render both see tick 0, which keeps hydration clean.
export function useSimulationClock(ref: RefObject<Element | null>, intervalMs: number) {
  const inView = useInView(ref, { margin: "-10% 0px -10% 0px" })
  const reduceMotion = useReducedMotionSafe()
  const [tick, setTick] = useState(0)
  const running = inView && !reduceMotion

  useEffect(() => {
    if (!running) return
    let id: number | undefined
    const start = () => {
      if (id === undefined) id = window.setInterval(() => setTick((t) => t + 1), intervalMs)
    }
    const stop = () => {
      if (id !== undefined) window.clearInterval(id)
      id = undefined
    }
    const onVisibility = () => (document.hidden ? stop() : start())
    start()
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      stop()
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [running, intervalMs])

  return { tick, running }
}

// Small deterministic PRNG so every simulated series is reproducible from its
// seed: the same tick always draws the same number, on the server and client.
export function mulberry32(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** One pseudo-random number in [0, 1) for a (seed, index) pair. */
export function noise(seed: number, index: number) {
  return mulberry32(seed * 7919 + index * 104729)()
}

/** A smooth random walk of `length` points ending at `tick`, in [min, max]. */
export function walk(seed: number, tick: number, length: number, min: number, max: number, step = 0.08) {
  const points: number[] = []
  let v = 0.5
  // Replay the walk from the beginning so a given tick always produces the
  // same window, without storing any state between renders.
  const start = Math.max(0, tick - length + 1)
  for (let i = 0; i <= tick; i++) {
    v += (noise(seed, i) - 0.5) * step * 2
    v += (0.5 - v) * 0.02
    v = Math.min(1, Math.max(0, v))
    if (i >= start) points.push(min + v * (max - min))
  }
  while (points.length < length) points.unshift(points[0] ?? (min + max) / 2)
  return points
}

/** Builds an SVG path for a polyline, scaled into the given box. */
export function linePath(values: number[], width: number, height: number, min: number, max: number) {
  if (values.length === 0) return ""
  const span = max - min || 1
  const dx = values.length > 1 ? width / (values.length - 1) : 0
  return values
    .map((v, i) => {
      const x = i * dx
      const y = height - ((v - min) / span) * height
      return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(" ")
}

export function formatCompact(n: number) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return `${Math.round(n)}`
}
