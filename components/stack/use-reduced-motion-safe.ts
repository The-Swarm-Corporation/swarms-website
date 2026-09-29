import { useReducedMotion } from "framer-motion"
import { useEffect, useState } from "react"

// useReducedMotion reads matchMedia on the client's first render, but the
// server always renders as if motion were allowed. Branching markup on it
// directly causes a hydration mismatch for reduced-motion users, so this
// reports false until after hydration and the real preference from then on.
export function useReducedMotionSafe() {
  const prefersReduced = useReducedMotion()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  return mounted && !!prefersReduced
}
