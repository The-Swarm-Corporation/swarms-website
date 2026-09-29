"use client"

import { MotionConfig, motion } from "framer-motion"
import { ArrowDown, ArrowRight } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

import { StackCoverage } from "./stack-coverage"
import { StackDiagram } from "./stack-diagram"
import { StackExplorer } from "./stack-explorer"
import { StackLifecycle } from "./stack-lifecycle"
import type { ProductId } from "./stack-data"
import { useReducedMotionSafe } from "./use-reduced-motion-safe"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Owns the selected layer so the hero diagram and the coverage matrix can
// both open a product in the explorer.
export function StackPage() {
  const reduceMotion = useReducedMotionSafe()
  const [selected, setSelected] = useState<ProductId>("python")

  const openLayer = (id: ProductId) => {
    setSelected(id)
    document
      .getElementById("layers")
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" })
  }

  return (
    <MotionConfig reducedMotion="user">
      <StackHero onSelect={openLayer} />
      <StackExplorer value={selected} onValueChange={setSelected} />
      <StackLifecycle />
      <StackCoverage onSelect={openLayer} />
    </MotionConfig>
  )
}

function StackHero({ onSelect }: { onSelect: (id: ProductId) => void }) {
  return (
    <section className="relative overflow-hidden border-b border-white/[0.08] bg-black">
      <IsometricGrid />

      <div className="container relative px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:min-h-[calc(100vh-96px)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8 lg:py-16">
          <div>
            <motion.h1
              className="max-w-xl font-semibold leading-[1.02] tracking-tighter text-white"
              style={{ fontSize: "clamp(2.5rem, 5.6vw, 4.6rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              One stack to build, deploy, and sell agents
            </motion.h1>

            <motion.p
              className="mt-6 max-w-lg text-base font-normal leading-relaxed text-white/55 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
            >
              Write agents in Python or Rust. Run them through the Swarms API and manage them in
              Swarms Cloud. Sell them on the Swarms Marketplace and keep 90% of every sale.
            </motion.p>

            <motion.div
              className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease }}
            >
              <Button
                className="h-12 w-full rounded-full bg-white px-7 text-base font-medium text-black hover:bg-neutral-200 sm:w-auto"
                asChild
              >
                <a href="https://cloud.swarms.world" target="_blank" rel="noopener noreferrer">
                  Start building
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-7 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                asChild
              >
                <a href="#layers">
                  See each layer
                  <ArrowDown className="ml-2 h-5 w-5 text-white/50" />
                </a>
              </Button>
            </motion.div>

            <p className="mt-8 hidden text-sm font-normal text-white/35 lg:block">
              Point at a layer to see what it does. Click it to open the details.
            </p>
          </div>

          <StackDiagram onSelect={onSelect} className="mx-auto w-full max-w-[600px]" />
        </div>
      </div>
    </section>
  )
}

// The page's background echoes the diagram: a faint isometric lattice.
function IsometricGrid() {
  const h = 28
  const w = 2 * h * Math.cos(Math.PI / 6)
  return (
    <svg
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:radial-gradient(ellipse_60%_70%_at_72%_50%,black_10%,transparent_100%)]"
    >
      <defs>
        <pattern id="stack-iso-grid" width={w} height={h} patternUnits="userSpaceOnUse">
          <path
            d={`M0 0L${w} ${h}M0 ${h}L${w} 0`}
            stroke="rgba(255,255,255,0.055)"
            strokeWidth={1}
            fill="none"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stack-iso-grid)" />
    </svg>
  )
}
