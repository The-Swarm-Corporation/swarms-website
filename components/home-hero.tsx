"use client"

import { Button } from "@/components/ui/button"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Classic Space Invaders crab sprite, 2 pixel rows per text line.
// One character per pixel: a mono cell is ~1:2, so half-blocks come out square.
const CRAB_FRAMES = [
  `  ▀▄   ▄▀
 ▄█▀███▀█▄
█▀███████▀█
▀ ▀▄▄ ▄▄▀ ▀`,
  `▄ ▀▄   ▄▀ ▄
█▄█▀███▀█▄█
▀█████████▀
 ▄▀     ▀▄`,
]

export function HomeHero() {
  const prefersReducedMotion = useReducedMotion()
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setFrame((f) => (f + 1) % 2), 700)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/[0.08] bg-black">
      {/* Hairline grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
      />
      {/* Soft monochrome glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
      />

      <div className="container relative w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-center pb-16 pt-24 text-center sm:pb-20 sm:pt-28">
          {/* Crab invader hovering above the wordmark */}
          <motion.div
            aria-hidden="true"
            className="mb-6 select-none sm:mb-8"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <motion.pre
              className="text-center font-mono text-xl leading-none text-white/80 sm:text-2xl md:text-3xl"
              style={{ textShadow: "0 0 24px rgba(255,255,255,0.35)" }}
              {...(prefersReducedMotion
                ? {}
                : {
                    animate: { y: [0, -5, 0] },
                    transition: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut" as const,
                    },
                  })}
            >
              {CRAB_FRAMES[frame]}
            </motion.pre>
          </motion.div>

          <motion.h1
            id="hero-title"
            className="font-bold leading-[0.95] tracking-tighter text-white"
            style={{ fontSize: "clamp(4.5rem, 13vw, 11rem)" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease }}
          >
            swarms
          </motion.h1>

          <motion.p
            className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            Swarms is the enterprise-grade infrastructure for the agent economy,
            one platform from your first agent to production swarms.
          </motion.p>

          <motion.div
            className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease }}
          >
            <Button
              className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
              asChild
            >
              <a
                href="https://cloud.swarms.world"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Start building on Swarms Cloud"
              >
                Start Building
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
              asChild
            >
              <a
                href="https://docs.swarms.ai"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swarms Documentation"
              >
                Documentation
                <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
              </a>
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
