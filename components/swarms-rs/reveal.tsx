"use client"

import { MotionConfig, motion } from "framer-motion"
import type { ReactNode } from "react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Fades and lifts its children in the first time they scroll into view.
// `delay` staggers siblings, so a grid of cards arrives one after another.
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

// Respects the visitor's reduced-motion setting for every animation below it.
export function MotionRoot({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
