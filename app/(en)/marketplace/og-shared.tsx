import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

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
  return new ImageResponse(<MarketplaceCard />, size)
}

function MarketplaceCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        backgroundImage:
          "radial-gradient(circle at 12% -10%, rgba(255,255,255,0.14), transparent 55%)",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            fontSize: 22,
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          S
        </div>
        <span style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
          Swarms
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <span
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 22,
          }}
        >
          Marketplace
        </span>
        <span
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 700,
            lineHeight: 1.05,
            color: "#ffffff",
            letterSpacing: -1.5,
            marginBottom: 22,
          }}
        >
          Buy, sell, and monetize
          <br />
          AI agents
        </span>
        <span style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.55)" }}>
          Agents, prompts, tools, MCP servers, and skills. Publish for free, keep 90% of every sale.
        </span>
      </div>

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
            <span style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#ffffff", letterSpacing: -1 }}>
              {stat.value}
            </span>
            <span
              style={{
                display: "flex",
                fontSize: 16,
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
    </div>
  )
}
