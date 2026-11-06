import { renderOgCard, size, contentType } from "@/lib/og/card"

export { size, contentType }

// Same stats shown on the page itself (stats array in page.tsx). Duplicated
// here rather than imported, since page.tsx is a "use client" module and
// this file renders on the server at request/build time via next/og.
const stats = [
  { value: "6,000+", label: "Listed" },
  { value: "90%", label: "Seller payout" },
  { value: "100+", label: "Countries" },
  { value: "26", label: "API endpoints" },
]

export function renderMarketplaceCard() {
  return renderOgCard({
    eyebrow: "Marketplace",
    title: "Buy, sell, and monetize AI agents",
    description: "Agents, prompts, tools, MCP servers, and skills. Publish for free, keep 90% of every sale.",
    footer: <Stats />,
  })
}

function Stats() {
  return (
    <div style={{ display: "flex", alignItems: "stretch" }}>
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          style={{
            display: "flex",
            flexDirection: "column",
            paddingRight: 40,
            marginRight: 40,
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.14)" : "none",
          }}
        >
          <span style={{ display: "flex", fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>{stat.value}</span>
          <span
            style={{
              display: "flex",
              fontSize: 15,
              color: "rgba(255,255,255,0.45)",
              marginTop: 4,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  )
}
