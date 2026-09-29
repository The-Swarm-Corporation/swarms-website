import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// A static copy of the page's isometric stack diagram. The diagram itself is
// a "use client" component, so its geometry is repeated here in the few
// lines next/og needs to draw it on the server.
const C = Math.cos(Math.PI / 6)
const W = 240
const T = 16
const GAP = 44
const HALF = (W - 10) / 2

function iso(x: number, y: number, z: number) {
  return [(x - y) * C, (x + y) * 0.5 - z] as const
}

function pts(points: [number, number, number][]) {
  return points.map((p) => iso(...p).map((n) => n.toFixed(1)).join(",")).join(" ")
}

// Build (Python, Rust), Deploy (API), Monitor (Cloud), Monetize (Marketplace).
const BLOCKS = [
  { tier: 0, x0: 0, x1: HALF },
  { tier: 0, x0: W - HALF, x1: W },
  { tier: 1, x0: 0, x1: W },
  { tier: 2, x0: 0, x1: W },
  { tier: 3, x0: 0, x1: W },
]

// The telemetry bars printed on the Cloud slab.
const BARS = Array.from({ length: 12 }, (_, i) => 10 + ((i * 37) % 29))

// Listing tiles on the marketplace slab, a few of them sold.
const LIT = new Set([2, 6, 8, 13, 17])
const TILES = Array.from({ length: 20 }, (_, i) => ({
  x: 14 + (i % 5) * 44,
  y: 14 + Math.floor(i / 5) * 44,
  lit: LIT.has(i),
}))

function StackArt() {
  const elevation = (tier: number) => tier * (T + GAP)
  const top = elevation(3) + T
  const cloudTop = elevation(2) + T
  return (
    <svg width="500" height="560" viewBox="-215 -230 430 482">
      {BLOCKS.map((b, i) => {
        const z = elevation(b.tier)
        return (
          <g key={i}>
            <polygon
              points={pts([[b.x0, W, z], [b.x1, W, z], [b.x1, W, z + T], [b.x0, W, z + T]])}
              fill="#0c0c0c"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.2"
            />
            <polygon
              points={pts([[b.x1, 0, z], [b.x1, W, z], [b.x1, W, z + T], [b.x1, 0, z + T]])}
              fill="#070707"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.2"
            />
            <polygon
              points={pts([[b.x0, 0, z + T], [b.x1, 0, z + T], [b.x1, W, z + T], [b.x0, W, z + T]])}
              fill="#141414"
              stroke="rgba(255,255,255,0.32)"
              strokeWidth="1.2"
            />
          </g>
        )
      })}
      {BARS.map((h, i) => {
        const y = 24 + i * 13
        return (
          <polygon
            key={`bar-${i}`}
            points={pts([
              [W - 10 - h, y, cloudTop],
              [W - 10, y, cloudTop],
              [W - 10, y + 7, cloudTop],
              [W - 10 - h, y + 7, cloudTop],
            ])}
            fill={i === BARS.length - 1 ? "#ffffff" : "rgba(255,255,255,0.3)"}
          />
        )
      })}
      {TILES.map((t, i) => (
        <polygon
          key={i}
          points={pts([
            [t.x, t.y, top],
            [t.x + 34, t.y, top],
            [t.x + 34, t.y + 34, top],
            [t.x, t.y + 34, top],
          ])}
          fill={t.lit ? "#b91c1c" : "#1c1c1c"}
          stroke={t.lit ? "#f87171" : "rgba(255,255,255,0.12)"}
          strokeWidth="1"
        />
      ))}
    </svg>
  )
}

export function renderStackCard() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(255,255,255,0.09), transparent 50%)",
          padding: "64px 56px 64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <span
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 700,
              color: "rgba(255,255,255,0.55)",
              marginBottom: 28,
            }}
          >
            The Swarms Stack
          </span>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 60,
              fontWeight: 700,
              lineHeight: 1.04,
              color: "#ffffff",
              letterSpacing: -1.5,
              marginBottom: 28,
            }}
          >
            {/* One span per line: satori ignores <br /> inside a flex row. */}
            <span>One stack to build,</span>
            <span>deploy, monitor, and</span>
            <span>sell AI agents</span>
          </div>
          <span style={{ display: "flex", fontSize: 25, lineHeight: 1.4, color: "rgba(255,255,255,0.55)" }}>
            Swarms Python and Rust, the Swarms API, Swarms Cloud, and the Swarms Marketplace.
          </span>
        </div>
        <StackArt />
      </div>
    ),
    size,
  )
}
