import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

// OG/Twitter card for the company pages (/about, /story), in the same style
// as the blog and marketplace cards. `milestones` renders a dated strip along
// the bottom.
export function renderCompanyCard({
  eyebrow,
  title,
  subtitle,
  milestones,
}: {
  eyebrow: string
  title: string
  subtitle: string
  milestones: { date: string; label: string }[]
}) {
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
          backgroundImage: "radial-gradient(ellipse at 50% -20%, rgba(255,255,255,0.14), transparent 60%)",
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
          <span style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>Swarms</span>
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
            {eyebrow}
          </span>
          <span
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.05,
              color: "#ffffff",
              letterSpacing: -2,
              marginBottom: 20,
            }}
          >
            {title}
          </span>
          <span style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.55)" }}>{subtitle}</span>
        </div>

        <div style={{ display: "flex", position: "relative" }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 5,
              height: 1,
              backgroundColor: "rgba(255,255,255,0.2)",
            }}
          />
          {milestones.map((m) => (
            <div key={m.label} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 11,
                  backgroundColor: "#ffffff",
                  marginBottom: 14,
                }}
              />
              <span style={{ display: "flex", fontSize: 15, color: "rgba(255,255,255,0.45)", letterSpacing: 1 }}>
                {m.date}
              </span>
              <span style={{ display: "flex", fontSize: 19, fontWeight: 600, color: "#ffffff", marginTop: 4 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    ),
    size
  )
}
