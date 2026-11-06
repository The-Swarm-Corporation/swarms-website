import { releases } from "@/lib/story"

// Dated release strip for the company cards (/about, /story), rendered in the
// shared card's footer slot.
export function OgMilestones({ dateFormat }: { dateFormat: "year" | "date" }) {
  const milestones = releases
    .filter((r) => r.kind === "Product" || r.kind === "Open source")
    .map((r) => ({ date: dateFormat === "year" ? r.year : r.date, label: r.title.replace(/^Swarms /, "") }))

  return (
    <div style={{ display: "flex", position: "relative", width: "100%" }}>
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
          <div style={{ width: 11, height: 11, borderRadius: 11, backgroundColor: "#ffffff", marginBottom: 14 }} />
          <span style={{ display: "flex", fontSize: 14, color: "rgba(255,255,255,0.45)", letterSpacing: 0.5 }}>
            {m.date}
          </span>
          <span style={{ display: "flex", fontSize: 16, fontWeight: 600, marginTop: 4 }}>{m.label}</span>
        </div>
      ))}
    </div>
  )
}
