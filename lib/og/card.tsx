import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import path from "node:path"
import type { ReactNode } from "react"

// One template for every Open Graph and Twitter card on the site (1200×630).
// Each route's opengraph-image.tsx / twitter-image.tsx is a thin wrapper that
// passes its copy to renderOgCard. Route-specific art (the stack diagram, a
// product screenshot) goes in the optional `art` slot on the right, and extra
// detail (milestones, stats, post metadata) in the optional `footer` slot.

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export type OgLocale = "en" | "zh"

export interface OgCard {
  eyebrow: string
  title: string
  description?: string
  footer?: ReactNode
  art?: ReactNode
  locale?: OgLocale
}

const PADDING = 72

export async function renderOgCard(card: OgCard) {
  const [logo, fonts] = await Promise.all([getLogo(), loadFonts(card)])
  return new ImageResponse(<Card card={card} logo={logo} />, { ...size, fonts })
}

function Card({ card, logo }: { card: OgCard; logo: string }) {
  const { eyebrow, title, description, footer, art } = card
  const textWidth = art ? 560 : 1000

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at 12% -10%, rgba(255,255,255,0.14), transparent 55%)",
        padding: PADDING,
        fontFamily: FONT_FAMILY,
        color: "#ffffff",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} width={44} height={44} alt="" />
        <span style={{ marginLeft: 14, fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>Swarms</span>
      </div>

      <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", width: textWidth }}>
          <span
            style={{
              display: "flex",
              fontSize: 18,
              fontWeight: 600,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.45)",
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </span>
          <span
            style={{
              display: "flex",
              fontSize: titleSize(title, Boolean(art)),
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: -1.5,
              textWrap: "balance",
            }}
          >
            {title}
          </span>
          {description && (
            <span
              style={{
                display: "flex",
                marginTop: 22,
                fontSize: 24,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.55)",
                textWrap: "balance",
              }}
            >
              {description}
            </span>
          )}
        </div>
        {art && <div style={{ display: "flex", marginLeft: 40 }}>{art}</div>}
      </div>

      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <div style={{ display: "flex", flex: 1 }}>{footer}</div>
        <span style={{ display: "flex", marginLeft: 32, fontSize: 20, fontWeight: 600, color: "rgba(255,255,255,0.5)" }}>
          swarms.ai
        </span>
      </div>
    </div>
  )
}

// Sized by visual width: a CJK character is about as wide as two Latin ones.
function titleSize(title: string, withArt: boolean) {
  const width = Array.from(title).reduce((sum, ch) => sum + (/[\u2E80-\uFFEF]/.test(ch) ? 2 : 1), 0)
  if (withArt) return width > 40 ? 48 : 58
  return width > 70 ? 50 : width > 45 ? 58 : 70
}

// A product screenshot or banner, framed like the screenshots on the site.
export function OgScreenshot({ src, width = 460, height = 300 }: { src: string; width?: number; height?: number }) {
  return (
    <div
      style={{
        display: "flex",
        width,
        height,
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.16)",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} width={width} height={height} alt="" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
    </div>
  )
}

// satori (the engine behind ImageResponse) cannot resolve a root-relative
// path like "/banner.png" on its own. Remote images can be passed straight
// through, but local public/ assets must be embedded as data URLs, otherwise
// the card renders blank on Twitter and other social previews.
export async function resolvePublicImage(image: string): Promise<string | null> {
  if (/^https?:\/\//.test(image)) return image
  try {
    const data = await readFile(path.join(process.cwd(), "public", image.replace(/^\//, "")))
    const ext = path.extname(image).slice(1).toLowerCase()
    const mime =
      ext === "svg"
        ? "image/svg+xml"
        : ext === "jpg" || ext === "jpeg"
          ? "image/jpeg"
          : ext === "webp"
            ? "image/webp"
            : ext === "gif"
              ? "image/gif"
              : "image/png"
    return `data:${mime};base64,${data.toString("base64")}`
  } catch {
    return null
  }
}

let logoPromise: Promise<string> | undefined

function getLogo() {
  logoPromise ??= resolvePublicImage("/logo.svg").then((src) => {
    if (!src) throw new Error("lib/og/card: public/logo.svg is missing")
    return src
  })
  return logoPromise
}

// Fonts. ImageResponse only bundles Geist Regular, so without these every
// fontWeight renders at 400 and Chinese text renders as empty boxes. Cards
// use Montserrat, the site's own typeface; Chinese cards add Noto Sans SC,
// subset by Google Fonts to just the characters on the card. If a font
// cannot be fetched the card still renders with the bundled Geist, so a
// network hiccup never fails the build.
type Font = { name: string; data: ArrayBuffer; weight: 400 | 600 | 700; style: "normal" }

const FONT_FAMILY = "Montserrat, Noto Sans SC"
const LATIN_WEIGHTS = [400, 600, 700] as const
const CJK_WEIGHTS = [400, 700] as const

const fontCache = new Map<string, Promise<ArrayBuffer | null>>()

async function loadFonts(card: OgCard): Promise<Font[] | undefined> {
  const latin = LATIN_WEIGHTS.map((weight) => loadFont("Montserrat", weight))
  const cjkText = card.locale === "zh" ? collectText(card) : ""
  const cjk = cjkText ? CJK_WEIGHTS.map((weight) => loadFont("Noto Sans SC", weight, cjkText)) : []

  const results = await Promise.all([...latin, ...cjk])
  const fonts: Font[] = []
  results.forEach((data, i) => {
    if (!data) return
    const isLatin = i < LATIN_WEIGHTS.length
    fonts.push({
      name: isLatin ? "Montserrat" : "Noto Sans SC",
      data,
      weight: isLatin ? LATIN_WEIGHTS[i] : CJK_WEIGHTS[i - LATIN_WEIGHTS.length],
      style: "normal",
    })
  })
  // Passing a partial set would drop the bundled fallback, so it's all or nothing.
  return fonts.length === results.length ? fonts : undefined
}

function loadFont(family: string, weight: number, text?: string) {
  const key = `${family}:${weight}:${text ?? ""}`
  let font = fontCache.get(key)
  if (!font) {
    font = fetchGoogleFont(family, weight, text).catch((error) => {
      console.warn(`[og] Could not load ${family} ${weight}, using the bundled font instead:`, error)
      fontCache.delete(key)
      return null
    })
    fontCache.set(key, font)
  }
  return font
}

async function fetchGoogleFont(family: string, weight: number, text?: string) {
  const params = new URLSearchParams({ family: `${family}:wght@${weight}` })
  if (text) params.set("text", text)
  // Without a browser user agent, Google Fonts serves TrueType, which satori
  // can read (it cannot read WOFF2).
  const cssResponse = await fetch(`https://fonts.googleapis.com/css2?${params}`)
  if (!cssResponse.ok) throw new Error(`CSS request failed with ${cssResponse.status}`)
  const css = await cssResponse.text()
  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!url) throw new Error("No TrueType source in the stylesheet")
  const fontResponse = await fetch(url)
  if (!fontResponse.ok) throw new Error(`Font request failed with ${fontResponse.status}`)
  return fontResponse.arrayBuffer()
}

// Every string on the card, so the CJK subset covers footer text too. Footer
// nodes are walked for their string children.
function collectText(card: OgCard) {
  const parts = [card.eyebrow, card.title, card.description ?? ""]
  const walk = (node: ReactNode): void => {
    if (typeof node === "string" || typeof node === "number") parts.push(String(node))
    else if (Array.isArray(node)) node.forEach(walk)
    else if (node && typeof node === "object" && "props" in node) {
      walk((node.props as { children?: ReactNode }).children)
    }
  }
  walk(card.footer)
  return Array.from(new Set(parts.join(""))).join("")
}
