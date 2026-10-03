"use client"

import { animate, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"

import { useReducedMotionSafe } from "@/components/stack/use-reduced-motion-safe"

// Counts a formatted figure such as "3.7 MB" or "1,439 ms" up from zero the
// first time it is on screen. The server renders the final text, so crawlers
// and no-JS visitors see the real number.
export function CountUp({
  value,
  duration = 1.4,
  delay = 0,
  className,
}: {
  value: string
  duration?: number
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const reduceMotion = useReducedMotionSafe()
  const [text, setText] = useState(value)

  const match = value.match(/^([\d,]*\.?\d+)(.*)$/)
  const target = match ? parseFloat(match[1].replace(/,/g, "")) : NaN
  const decimals = match?.[1].split(".")[1]?.length ?? 0
  const grouped = match?.[1].includes(",") ?? false
  const suffix = match?.[2] ?? ""

  const format = (n: number) =>
    `${n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
      useGrouping: grouped,
    })}${suffix}`

  // Start from zero as soon as the client takes over, before the figure scrolls in.
  useEffect(() => {
    if (!match || reduceMotion) return
    setText(format(0))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduceMotion, value])

  useEffect(() => {
    if (!match || reduceMotion || !inView) return
    const controls = animate(0, target, {
      duration,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (n) => setText(format(n)),
      onComplete: () => setText(value),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value])

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  )
}
