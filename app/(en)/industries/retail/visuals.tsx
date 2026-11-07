"use client"

import { useMemo, useRef, type ReactNode } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock, walk } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: demand by store and SKU as a heatmap that shifts each tick,
// with a feed where the pricing agent proposes a change and the merchandiser
// approves or holds it.

const STORES = ["Austin", "Denver", "Seattle", "Chicago", "Boston", "Online"]
const SKUS = ["CW-2041", "CW-2042", "BK-1177", "BK-1180", "KT-0310", "KT-0322", "TX-5501", "TX-5508", "GL-2200", "GL-2210"]
const PROPOSALS = [
  { sku: "CW-2041", from: 34, to: 31, why: "19 weeks of cover, two competitors under 32" },
  { sku: "BK-1177", from: 42, to: 46, why: "sold out in three stores, no restock until June" },
  { sku: "TX-5508", from: 18, to: 15, why: "seasonal, cover rising every week since March" },
  { sku: "KT-0310", from: 24, to: 24, why: "hold: markdown would break the category floor" },
  { sku: "GL-2210", from: 12, to: 10, why: "bundle with GL-2200, clears slow colourways" },
  { sku: "CW-2042", from: 29, to: 27, why: "match the 20cm markdown to keep the set priced in step" },
]
const PROPOSAL_EVERY = 3

function cellColor(v: number) {
  // v in [0, 1]: dark for low demand, accent for high.
  const a = 0.06 + v * 0.9
  return `rgba(244, 114, 182, ${a.toFixed(3)})`
}

export function DemandHeatmap() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1300)
  const t = tick + 60

  const grid = useMemo(
    () =>
      STORES.map((_, si) =>
        SKUS.map((_, ki) => {
          const base = noise(200 + si, ki) // each store has its own taste
          const drift = walk(300 + si * 10 + ki, t, 2, 0, 1, 0.12)[1]
          return Math.min(1, Math.max(0, base * 0.5 + drift * 0.5))
        }),
      ),
    [t],
  )

  const hot = useMemo(() => {
    let best = { si: 0, ki: 0, v: -1 }
    grid.forEach((row, si) => row.forEach((v, ki) => { if (v > best.v) best = { si, ki, v } }))
    return best
  }, [grid])

  const feed = useMemo(() => {
    const out: { key: number; p: (typeof PROPOSALS)[number]; approved: boolean }[] = []
    for (let k = t; k > t - PROPOSAL_EVERY * 3; k--) {
      if (k % PROPOSAL_EVERY !== 0) continue
      const p = PROPOSALS[Math.floor(noise(210, k) * PROPOSALS.length)]
      out.push({ key: k, p, approved: p.from !== p.to && noise(211, k) > 0.25 })
    }
    return out
  }, [t])

  const CELL = 34
  const GAP = 3
  const LABEL_W = 56
  const HEAD_H = 16
  const W = LABEL_W + SKUS.length * (CELL + GAP)
  const H = HEAD_H + STORES.length * (CELL + GAP)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Demand · store by SKU</span>
        <span className="font-mono text-[11px] text-white/45">units vs 4-week average</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated demand" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_216px]">
        <div className="p-3 sm:p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="block" role="img" aria-label="Simulated demand heatmap, six stores by ten SKUs">
            {SKUS.map((sku, ki) => (
              <text key={sku} x={LABEL_W + ki * (CELL + GAP) + CELL / 2} y={10} textAnchor="middle" fontSize={7.5} fontFamily={MONO} fill="rgba(255,255,255,0.4)">
                {sku}
              </text>
            ))}
            {STORES.map((store, si) => (
              <g key={store} transform={`translate(0, ${HEAD_H + si * (CELL + GAP)})`}>
                <text x={LABEL_W - 8} y={CELL / 2 + 3} textAnchor="end" fontSize={9} fill="rgba(255,255,255,0.55)">
                  {store}
                </text>
                {SKUS.map((sku, ki) => {
                  const v = grid[si][ki]
                  const isHot = hot.si === si && hot.ki === ki
                  return (
                    <g key={sku}>
                      <rect x={LABEL_W + ki * (CELL + GAP)} y={0} width={CELL} height={CELL} rx={4} fill={cellColor(v)} stroke={isHot ? "#fff" : "transparent"} strokeWidth={1} style={{ transition: "fill 700ms ease" }} />
                      <text x={LABEL_W + ki * (CELL + GAP) + CELL / 2} y={CELL / 2 + 3} textAnchor="middle" fontSize={8} fontFamily={MONO} fill={v > 0.55 ? "rgba(0,0,0,0.75)" : "rgba(255,255,255,0.45)"}>
                        {v >= 0.5 ? "+" : ""}
                        {Math.round((v - 0.5) * 80)}%
                      </text>
                    </g>
                  )
                })}
              </g>
            ))}
          </svg>
          <div className="mt-2 flex items-center gap-2 font-mono text-[10px] text-white/40">
            <span>below average</span>
            <span className="h-2 flex-1 rounded-sm" style={{ background: "linear-gradient(90deg, rgba(244,114,182,0.06), rgba(244,114,182,0.96))" }} aria-hidden="true" />
            <span>above average</span>
          </div>
        </div>

        <div className="border-t border-white/[0.08] p-4 lg:border-l lg:border-t-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Price changes</p>
          <ul className="mt-3 space-y-3">
            {feed.map(({ key, p, approved }) => (
              <li key={key} className="text-xs leading-snug">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[11px] text-white/85">{p.sku}</span>
                  <span className="font-mono text-[11px] tabular-nums text-white/55">
                    ${p.from}
                    {p.from !== p.to && (
                      <>
                        {" "}to <span style={{ color: ACCENT }}>${p.to}</span>
                      </>
                    )}
                  </span>
                </div>
                <p className="mt-0.5 text-white/50">
                  <span className="text-white/70">Pricing Agent:</span> {p.why}
                </p>
                <p className="mt-0.5 font-mono text-[10px]" style={{ color: approved ? ACCENT : "rgba(255,255,255,0.4)" }}>
                  {p.from === p.to ? "Merchandiser: no change" : approved ? "Merchandiser: approved" : "Merchandiser: held for review"}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

// Second visual: the catalog enrichment stream. A raw supplier row comes in,
// and the fields the swarm produces appear one after another, with a
// running count per field across the run.

const PRODUCTS = [
  {
    sku: "CW-2041-BLK",
    raw: "SAUCEPAN 20CM S/S INDUCTION BLK HNDL",
    title: "20 cm Stainless Steel Saucepan with Glass Lid, Induction Ready",
    bullets: ["18/10 stainless steel body with a 2.8 litre capacity", "Tempered glass lid lets you check without lifting", "Works on induction, gas and electric hobs"],
    attrs: { material: "stainless 18/10", capacity_l: 2.8, dishwasher_safe: true, induction_ready: true },
    compliance: "pass · EU listing needs PFAS statement",
  },
  {
    sku: "BK-1177-WHT",
    raw: "MIXING BOWL SET 3PC CERAMIC WHT",
    title: "Ceramic Mixing Bowl Set of 3, White",
    bullets: ["Three nesting sizes for prep, mixing and serving", "Glazed stoneware, oven safe to 220 C", "Dishwasher and microwave safe"],
    attrs: { material: "stoneware", pieces: 3, colour: "white", dishwasher_safe: true },
    compliance: "pass",
  },
  {
    sku: "TX-5508-GRY",
    raw: "BATH TOWEL 70X140 600GSM GREY COTTON",
    title: "Cotton Bath Towel 70 x 140 cm, 600 gsm, Grey",
    bullets: ["600 gsm combed cotton for a heavy, absorbent towel", "Double-stitched hems hold up to frequent washing", "Machine wash at 60 C, tumble dry low"],
    attrs: { material: "cotton", gsm: 600, width_cm: 70, length_cm: 140, colour: "grey" },
    compliance: "fail · fibre composition label missing for EU",
  },
  {
    sku: "GL-2210-AMB",
    raw: "TUMBLER 350ML AMBER GLASS 4PK",
    title: "Amber Glass Tumblers 350 ml, Set of 4",
    bullets: ["Hand-blown look with a weighted base", "350 ml capacity suits water, juice and cocktails", "Dishwasher safe on the top rack"],
    attrs: { material: "glass", capacity_ml: 350, pieces: 4, colour: "amber", dishwasher_safe: true },
    compliance: "pass",
  },
]
const FIELDS = ["title", "bullets", "attributes", "compliance"] as const
const STEPS_PER_PRODUCT = 6 // raw, title, bullets, attributes, compliance, published

export function CatalogEnrichmentStream() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1000)

  const productIndex = Math.floor(tick / STEPS_PER_PRODUCT)
  const step = tick % STEPS_PER_PRODUCT
  const product = PRODUCTS[productIndex % PRODUCTS.length]
  const completed = 1_240 + productIndex // listings already enriched in this run
  const counts = FIELDS.map((_, i) => completed + (step > i ? 1 : 0))
  const failed = Math.floor(completed * 0.06)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">Catalog enrichment · stream</span>
        <span className="font-mono text-[11px] text-white/45">AgentRearrange · one run per SKU</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated run" : "Paused"} />
      </div>

      <div className="grid gap-px bg-white/[0.06] sm:grid-cols-4">
        {FIELDS.map((f, i) => (
          <div key={f} className="bg-[#0a0a0a] px-4 py-3">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">{f}</p>
            <p className="mt-1 text-lg font-semibold tabular-nums text-white">{counts[i].toLocaleString("en-US")}</p>
            <p className="font-mono text-[10px] text-white/35">{f === "compliance" ? `${failed} flagged` : "written"}</p>
          </div>
        ))}
      </div>

      <div className="grid border-t border-white/[0.08] lg:grid-cols-[200px_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 lg:border-b-0 lg:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Supplier row</p>
          <p className="mt-2 font-mono text-[11px] text-white/85">{product.sku}</p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-white/50">{product.raw}</p>
          <p className="mt-3 font-mono text-[10px] text-white/35">
            {step === 0 ? "Intake: normalising" : step < 3 ? "Copywriter, Attributes: running" : step === 3 ? "Compliance: checking" : step === 4 ? "Publisher: assembling" : "published"}
          </p>
        </div>

        <div className="p-4 text-xs">
          <Row label="title" ready={step >= 1}>
            <span className="text-white/85">{product.title}</span>
          </Row>
          <Row label="bullets" ready={step >= 2}>
            <ul className="space-y-0.5 text-white/65">
              {product.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Row>
          <Row label="attributes" ready={step >= 3}>
            <code className="font-mono text-[11px] text-white/65">{JSON.stringify(product.attrs)}</code>
          </Row>
          <Row label="compliance" ready={step >= 4}>
            <span className="font-mono text-[11px]" style={{ color: product.compliance.startsWith("fail") ? "#ef4444" : ACCENT }}>
              {product.compliance}
            </span>
          </Row>
        </div>
      </div>
    </div>
  )
}

function Row({ label, ready, children }: { label: string; ready: boolean; children: ReactNode }) {
  return (
    <div className="grid grid-cols-[84px_minmax(0,1fr)] gap-3 border-b border-white/[0.06] py-2 last:border-b-0">
      <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</span>
      <div className="min-h-[18px] transition-opacity duration-500" style={{ opacity: ready ? 1 : 0.25 }}>
        {ready ? children : <span className="font-mono text-[11px] text-white/35">waiting</span>}
      </div>
    </div>
  )
}
