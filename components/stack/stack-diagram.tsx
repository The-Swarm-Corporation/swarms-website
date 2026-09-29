"use client"

import { AnimatePresence, motion, useInView } from "framer-motion"
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react"

import { JOBS, productById, type Job, type ProductId } from "./stack-data"
import { useReducedMotionSafe } from "./use-reduced-motion-safe"

// Isometric projection: x runs down-right, y runs down-left, z runs up.
const C = Math.cos(Math.PI / 6)
const S = 0.5
const W = 240 // tier footprint, square
const T = 18 // slab thickness
const SPLIT = 10 // gap between the two blocks that share a tier
const HALF = (W - SPLIT) / 2

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

type Block = { id: ProductId; job: Job; x0: number; x1: number }

// Painter's order: bottom tier first, and within a tier the block nearer the
// viewer (larger x) last.
const BLOCKS: Block[] = [
  { id: "python", job: "build", x0: 0, x1: HALF },
  { id: "rust", job: "build", x0: W - HALF, x1: W },
  { id: "api", job: "deploy", x0: 0, x1: HALF },
  { id: "cloud", job: "deploy", x0: W - HALF, x1: W },
  { id: "marketplace", job: "monetize", x0: 0, x1: W },
]
const TIERS: Job[] = ["build", "deploy", "monetize"]

// Marketplace listing tiles, 5 x 4, in the top face's own coordinates.
const TILE = 34
const TILE_STEP = 44
const TILES = Array.from({ length: 20 }, (_, i) => ({
  x: 14 + (i % 5) * TILE_STEP,
  y: 14 + Math.floor(i / 5) * TILE_STEP,
}))
// The order new listings land in, scattered so the grid fills evenly.
const TILE_ORDER = [6, 13, 2, 17, 9, 0, 19, 11, 4, 15, 7, 18, 1, 12, 16, 3, 10, 5, 14, 8]
const PRELISTED = 4

// Position in TILE_ORDER of the tile the agent lands on in a given cycle.
function landingIndex(cycle: number) {
  return PRELISTED + (cycle % (TILE_ORDER.length - PRELISTED))
}

function iso(x: number, y: number, z: number): [number, number] {
  return [(x - y) * C, (x + y) * S - z]
}

function poly(points: [number, number, number][]) {
  return points
    .map((p) => iso(...p).map((n) => n.toFixed(2)).join(","))
    .join(" ")
}

// Maps the top face's (x, y) plane onto the screen, so text and tiles drawn in
// plain 2D coordinates land flat on the slab.
const TOP_FACE = `matrix(${C} ${S} ${-C} ${S} 0 ${-T})`

// Where the agent cube sits for each step of the loop.
function packetAnchor(step: number, cycle: number, elevation: (job: Job) => number) {
  const right = cycle % 2 === 1
  const cx = right ? W - HALF / 2 : HALF / 2
  if (step === 0) return iso(cx, 196, T + elevation("build"))
  if (step === 1) return iso(cx, 196, T + elevation("deploy"))
  const tile = TILES[TILE_ORDER[landingIndex(cycle)]]
  return iso(tile.x + TILE / 2, tile.y + TILE / 2, T + elevation("monetize"))
}

const CUBE = 16
const CUBE_FACES = (() => {
  const h = CUBE / 2
  return {
    top: poly([[-h, -h, CUBE], [h, -h, CUBE], [h, h, CUBE], [-h, h, CUBE]]),
    left: poly([[-h, h, 0], [h, h, 0], [h, h, CUBE], [-h, h, CUBE]]),
    right: poly([[h, -h, 0], [h, h, 0], [h, h, CUBE], [h, -h, CUBE]]),
  }
})()

const STEP_MS = [1500, 1500, 1700, 700]

export function StackDiagram({
  compact = false,
  highlight,
  onSelect,
  className,
}: {
  /** Small, static "you are here" version: no labels, loop, or interaction. */
  compact?: boolean
  highlight?: ProductId
  onSelect?: (id: ProductId) => void
  className?: string
}) {
  const reduceMotion = useReducedMotionSafe()
  const uid = useId().replace(/:/g, "")
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: "-80px" })

  const [hovered, setHovered] = useState<ProductId | null>(null)
  const [exploded, setExploded] = useState(false)
  const [assembled, setAssembled] = useState(compact)
  const [step, setStep] = useState(0)
  const [cycle, setCycle] = useState(0)

  const gap = compact ? 44 : exploded ? 98 : 78
  const elevation = (job: Job) => TIERS.indexOf(job) * (T + gap)

  const looping = !compact && !reduceMotion && assembled && inView && !hovered

  useEffect(() => {
    if (assembled) return
    const id = setTimeout(() => setAssembled(true), 1100)
    return () => clearTimeout(id)
  }, [assembled])

  useEffect(() => {
    if (!looping) return
    const id = setTimeout(() => {
      if (step === 3) {
        setCycle((c) => c + 1)
        setStep(0)
      } else {
        setStep(step + 1)
      }
    }, STEP_MS[step])
    return () => clearTimeout(id)
  }, [looping, step])

  // Tiles listed so far. Reduced motion shows a settled, partly filled grid.
  const listedCount = compact
    ? highlight === "marketplace" ? PRELISTED + 3 : 0
    : reduceMotion
      ? PRELISTED + 3
      : landingIndex(cycle) + (step >= 2 ? 1 : 0)
  const landingTile = !reduceMotion && step >= 2 ? TILE_ORDER[landingIndex(cycle)] : -1
  const listed = new Set(TILE_ORDER.slice(0, listedCount))

  const pathRight = cycle % 2 === 1
  const packetBlock: ProductId | null =
    compact || reduceMotion || !assembled || hovered || step === 3
      ? null
      : step === 0
        ? pathRight ? "rust" : "python"
        : step === 1
          ? pathRight ? "cloud" : "api"
          : "marketplace"

  const focus = compact ? highlight ?? null : hovered
  const [px, py] = packetAnchor(Math.min(step, 2), cycle, elevation)

  const activeJob = hovered ? productById[hovered].job : TIERS[Math.min(step, 2)]
  const caption = hovered
    ? { title: productById[hovered].name, text: productById[hovered].role }
    : { title: JOBS[Math.min(step, 2)].label, text: JOBS[Math.min(step, 2)].caption }

  const viewBox = compact ? "-214 -170 428 420" : "-222 -262 540 520"

  return (
    <div ref={ref} className={className}>
      <svg
        viewBox={viewBox}
        className="block h-auto w-full overflow-visible font-sans"
        role={compact ? "img" : "group"}
        aria-label={
          compact && highlight
            ? `${productById[highlight].name} highlighted in the Swarms stack`
            : "The Swarms stack: Build with Python and Rust, Deploy with the API and Cloud, Monetize on the Marketplace"
        }
        onMouseEnter={compact ? undefined : () => setExploded(true)}
        onMouseLeave={compact ? undefined : () => setExploded(false)}
      >
        <defs>
          <filter id={`glow-${uid}`} x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {TIERS.map((job, tierIndex) => {
          const elev = elevation(job)
          const tierBlocks = BLOCKS.filter((b) => b.job === job)
          const label = JOBS[tierIndex].label
          const [lx, ly] = iso(W, 0, T / 2)

          return (
            <motion.g
              key={job}
              initial={compact ? false : { y: -(elev + 80), opacity: 0 }}
              animate={{ y: -elev, opacity: 1 }}
              transition={
                assembled
                  ? { duration: 0.55, ease }
                  : { duration: 0.8, delay: 0.15 + tierIndex * 0.16, ease }
              }
            >
              {/* Dashed risers to the tier below, at the three visible corners */}
              {tierIndex > 0 &&
                ([
                  [0, W],
                  [W, W],
                  [W, 0],
                ] as const).map(([cx, cy]) => {
                  const [x1, y1] = iso(cx, cy, 0)
                  return (
                    <motion.line
                      key={`${cx}-${cy}`}
                      x1={x1}
                      y1={y1}
                      x2={x1}
                      initial={false}
                      animate={{ y2: y1 + gap }}
                      transition={{ duration: 0.55, ease }}
                      stroke="rgba(255,255,255,0.16)"
                      strokeDasharray="3 5"
                      strokeWidth={1}
                    />
                  )
                })}

              {tierBlocks.map((block) => (
                <SlabBlock
                  key={block.id}
                  block={block}
                  compact={compact}
                  focused={focus === block.id}
                  dimmed={focus !== null && focus !== block.id}
                  active={!focus && packetBlock === block.id}
                  listed={listed}
                  landingTile={landingTile}
                  onHover={compact ? undefined : setHovered}
                  onSelect={compact ? undefined : onSelect}
                />
              ))}

              {!compact && (
                <g aria-hidden="true">
                  <line
                    x1={lx + 6}
                    y1={ly}
                    x2={lx + 24}
                    y2={ly}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={1}
                  />
                  <text
                    x={lx + 32}
                    y={ly + 4.5}
                    fontSize={13}
                    fontWeight={600}
                    fill={activeJob === job ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.4)"}
                    style={{ transition: "fill 300ms" }}
                  >
                    {label}
                  </text>
                </g>
              )}
            </motion.g>
          )
        })}

        {/* The agent: a small cube that climbs the stack and lands as a listing */}
        <AnimatePresence>
          {packetBlock && (
            <motion.g
              key={cycle}
              aria-hidden="true"
              filter={`url(#glow-${uid})`}
              initial={{ x: px, y: py - 36, opacity: 0 }}
              animate={{ x: px, y: py, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.35 } }}
              transition={{ duration: step === 0 ? 0.5 : 0.7, ease }}
            >
              {/* Remounts per step so each move between tiers gets one hop */}
              <motion.g
                key={step}
                initial={{ y: 0 }}
                animate={{ y: step === 0 ? 0 : [0, -34, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <polygon points={CUBE_FACES.left} fill="#b91c1c" />
                <polygon points={CUBE_FACES.right} fill="#7f1d1d" />
                <polygon points={CUBE_FACES.top} fill="#f87171" />
              </motion.g>
            </motion.g>
          )}
        </AnimatePresence>
      </svg>

      {!compact && (
        <div className="mt-2 flex min-h-[4.5rem] items-start gap-4 sm:mt-4">
          <div className="flex gap-1 pt-2" aria-hidden="true">
            {TIERS.map((job) => (
              <span
                key={job}
                className={`h-1 w-5 rounded-full transition-colors duration-300 ${
                  activeJob === job ? "bg-white/80" : "bg-white/15"
                }`}
              />
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={caption.title}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="min-w-0"
            >
              <p className="text-sm font-semibold text-white">{caption.title}</p>
              <p className="mt-0.5 text-sm font-normal leading-relaxed text-white/55">
                {caption.text}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

function SlabBlock({
  block,
  compact,
  focused,
  dimmed,
  active,
  listed,
  landingTile,
  onHover,
  onSelect,
}: {
  block: Block
  compact: boolean
  focused: boolean
  dimmed: boolean
  active: boolean
  listed: Set<number>
  landingTile: number
  onHover?: (id: ProductId | null) => void
  onSelect?: (id: ProductId) => void
}) {
  const product = productById[block.id]
  const { x0, x1 } = block
  const isMarket = block.id === "marketplace"
  const interactive = !!onSelect

  const edge = focused
    ? "rgba(255,255,255,0.85)"
    : active
      ? "rgba(255,255,255,0.5)"
      : "rgba(255,255,255,0.2)"

  return (
    <motion.g
      initial={false}
      animate={{ y: focused && !compact ? -8 : 0, opacity: dimmed ? 0.35 : 1 }}
      transition={{ duration: 0.3, ease }}
      {...(interactive ? {
        role: "button",
        tabIndex: 0,
        "aria-label": `${product.name}: ${product.role} Show details.`,
        style: { cursor: "pointer", outline: "none" },
        onMouseEnter: () => onHover?.(block.id),
        onMouseLeave: () => onHover?.(null),
        onFocus: () => onHover?.(block.id),
        onBlur: () => onHover?.(null),
        onClick: () => onSelect?.(block.id),
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onSelect?.(block.id)
          }
        },
      } : {})}
    >
      {/* Left-front face (y = W) */}
      <polygon
        points={poly([[x0, W, 0], [x1, W, 0], [x1, W, T], [x0, W, T]])}
        fill={focused ? "#161616" : "#0c0c0c"}
        stroke={edge}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      {/* Right-front face (x = x1) */}
      <polygon
        points={poly([[x1, 0, 0], [x1, W, 0], [x1, W, T], [x1, 0, T]])}
        fill={focused ? "#101010" : "#070707"}
        stroke={edge}
        strokeWidth={1}
        strokeLinejoin="round"
      />
      {/* Top face */}
      <polygon
        points={poly([[x0, 0, T], [x1, 0, T], [x1, W, T], [x0, W, T]])}
        fill={focused ? "#1f1f1f" : active ? "#171717" : "#121212"}
        stroke={edge}
        strokeWidth={1}
        strokeLinejoin="round"
        style={{ transition: "fill 300ms" }}
      />

      <g transform={TOP_FACE} pointerEvents="none">
        {isMarket &&
          TILES.map((tile, i) => {
            const isListed = listed.has(i)
            const landing = i === landingTile
            return (
              <motion.rect
                key={i}
                x={tile.x}
                y={tile.y}
                width={TILE}
                height={TILE}
                rx={4}
                initial={false}
                animate={{
                  fill: landing ? "#ef4444" : isListed ? "#7f1d1d" : "#1a1a1a",
                  stroke: landing ? "#fca5a5" : isListed ? "#b91c1c" : "rgba(255,255,255,0.1)",
                }}
                transition={{ duration: 0.4 }}
                strokeWidth={1}
              />
            )
          })}
        {!compact && (
          <>
            <text
              x={x0 + 14}
              y={W - 26}
              fontSize={isMarket ? 19 : 17}
              fontWeight={600}
              fill={focused || active ? "#fff" : "rgba(255,255,255,0.78)"}
            >
              {isMarket ? "Marketplace" : product.short}
            </text>
            <text
              x={x0 + 14}
              y={W - 12}
              fontSize={8}
              fontFamily={MONO}
              fill="rgba(255,255,255,0.42)"
            >
              {product.handle}
            </text>
          </>
        )}
      </g>
    </motion.g>
  )
}
