import { ImageResponse } from "next/og"

import { industryBySlug, type IndustrySlug } from "@/lib/industries"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// The social card every industry page (and the index) generates at build
// time: the page title, its tagline, and a small schematic of a swarm run
// (task, three agents, output) in the site's black, white and red.

// Satori (next/og) cannot render SVG <text>, so the connectors are an SVG
// and every box with its labels is an absolutely positioned div on top.
type Box = { x: number; y: number; w: number; label: string; sub: string; active?: boolean }

const BOXES: Box[] = [
  { x: 0, y: 138, w: 110, label: "Task", sub: "/v1/swarm" },
  { x: 160, y: 40, w: 190, label: "Analyst", sub: "gpt-5.4-mini" },
  { x: 160, y: 138, w: 190, label: "Specialist", sub: "claude-sonnet-5-5", active: true },
  { x: 160, y: 236, w: 190, label: "Reviewer", sub: "gemini-2.5-pro" },
  { x: 390, y: 138, w: 80, label: "Out", sub: "200 OK" },
]

function edge(x1: number, y1: number, x2: number, y2: number) {
  const cx = (x1 + x2) / 2
  return `M${x1},${y1} C${cx},${y1} ${cx},${y2} ${x2},${y2}`
}

function FlowArt() {
  const agentYs = [40, 138, 236]
  return (
    <div style={{ display: "flex", position: "relative", width: 470, height: 340 }}>
      <svg width="470" height="340" viewBox="0 0 470 340" style={{ position: "absolute", top: 0, left: 0 }}>
        {agentYs.map((y) => (
          <path key={`in-${y}`} d={edge(110, 170, 160, y + 32)} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
        ))}
        {agentYs.map((y) => (
          <path key={`out-${y}`} d={edge(350, y + 32, 390, 170)} fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth={1.5} />
        ))}
      </svg>
      {BOXES.map((b) => (
        <div
          key={b.label}
          style={{
            position: "absolute",
            left: b.x,
            top: b.y,
            width: b.w,
            height: 64,
            display: "flex",
            alignItems: "center",
            borderRadius: 10,
            border: b.active ? "2px solid #ffffff" : "1.4px solid rgba(255,255,255,0.28)",
            backgroundColor: b.active ? "rgba(255,255,255,0.1)" : "rgba(10,10,10,1)",
            padding: "0 12px 0 14px",
          }}
        >
          <div style={{ display: "flex", width: 10, height: 10, borderRadius: 999, backgroundColor: b.active ? "#ef4444" : "rgba(255,255,255,0.35)", marginRight: 12, flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ display: "flex", fontSize: 17, fontWeight: 700, color: "#ffffff", lineHeight: 1.1 }}>{b.label}</span>
            <span style={{ display: "flex", fontSize: 12, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", marginTop: 4, whiteSpace: "nowrap" }}>{b.sub}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

export function renderIndustryCard(slug?: IndustrySlug) {
  const industry = slug ? industryBySlug(slug) : undefined
  const title = industry ? `Swarms for ${industry.name}` : "Swarms by industry"
  const tagline = industry
    ? industry.tagline
    : "Finance, healthcare, manufacturing, legal and more: agent teams on the Swarms API, with the code to run them."

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
          backgroundImage: "radial-gradient(circle at 80% 40%, rgba(255,255,255,0.08), transparent 50%)",
          padding: "64px 56px 64px 72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 600 }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 999, backgroundColor: "#ef4444", marginRight: 14 }} />
            <span style={{ display: "flex", fontSize: 26, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 2 }}>SWARMS</span>
          </div>
          <span style={{ display: "flex", fontSize: 64, fontWeight: 700, lineHeight: 1.04, color: "#ffffff", letterSpacing: -2, marginBottom: 26 }}>{title}</span>
          <span style={{ display: "flex", fontSize: 26, lineHeight: 1.4, color: "rgba(255,255,255,0.6)" }}>{tagline}</span>
          <span style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.4)", marginTop: 34, fontFamily: "monospace" }}>
            swarms.ai/industries{industry ? `/${industry.slug}` : ""}
          </span>
        </div>
        <FlowArt />
      </div>
    ),
    size,
  )
}
