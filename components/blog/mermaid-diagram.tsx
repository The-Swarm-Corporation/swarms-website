"use client"

import { useEffect, useId, useRef, useState } from "react"

let mermaidInitialized = false

// The site's global `body` rule sets font-weight: 600, and mermaid sizes node
// boxes assuming normal-weight text — an explicit, non-"inherit" stack keeps
// both the sizing pass and the final render agreeing on the same metrics.
const MERMAID_FONT_FAMILY =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "")
  const containerRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function render() {
      const { default: mermaid } = await import("mermaid")

      if (!mermaidInitialized) {
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          fontFamily: MERMAID_FONT_FAMILY,
          theme: "base",
          themeVariables: {
            background: "transparent",
            primaryColor: "#111111",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "rgba(255,255,255,0.25)",
            secondaryColor: "#1a1a1a",
            tertiaryColor: "#0a0a0a",
            textColor: "#ffffff",
            mainBkg: "#0a0a0a",
            nodeBorder: "rgba(255,255,255,0.25)",
            clusterBkg: "#0a0a0a",
            clusterBorder: "rgba(255,255,255,0.15)",
            lineColor: "rgba(255,255,255,0.45)",
            edgeLabelBackground: "#000000",
            actorBkg: "#0a0a0a",
            actorBorder: "rgba(255,255,255,0.25)",
            actorTextColor: "#ffffff",
            signalColor: "rgba(255,255,255,0.45)",
            signalTextColor: "#ffffff",
            labelTextColor: "#ffffff",
          },
        })
        mermaidInitialized = true
      }

      try {
        const { svg } = await mermaid.render(`mermaid-${id}`, chart.trim())
        if (cancelled || !containerRef.current) return
        containerRef.current.innerHTML = svg
        const svgEl = containerRef.current.querySelector("svg")
        if (svgEl) {
          svgEl.style.maxWidth = "100%"
          svgEl.style.height = "auto"
          svgEl.style.fontFamily = MERMAID_FONT_FAMILY
          svgEl.style.fontWeight = "400"
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to render diagram")
        }
      }
    }

    render()

    return () => {
      cancelled = true
    }
  }, [chart, id])

  if (error) {
    return (
      <div className="mb-8 rounded-lg border border-red-500/20 bg-red-500/[0.03] p-4 font-mono text-sm text-red-400">
        Failed to render diagram: {error}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className="mb-8 flex justify-center overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] p-6"
    />
  )
}
