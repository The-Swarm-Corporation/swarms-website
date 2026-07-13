import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"
export const alt = "Swarms Blog"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#000000",
          backgroundImage: "radial-gradient(circle at 12% -10%, rgba(255,255,255,0.14), transparent 55%)",
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
            Blog
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#ffffff",
              letterSpacing: -1.5,
            }}
          >
            Swarms Blog
          </span>
        </div>

        <span style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.5)" }}>
          Engineering notes, product updates, and guides for multi-agent AI
        </span>
      </div>
    ),
    size
  )
}
