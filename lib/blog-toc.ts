// Heading ids and the "On this page" outline for blog posts.
//
// The same slug function is used in two places that must agree:
//   - rehypeHeadingIds, which stamps ids onto the rendered <h2>/<h3> elements
//   - extractHeadings, which builds the sidebar outline from the raw markdown
// The sidebar re-reads the rendered headings from the DOM after hydration, so
// a rare mismatch (odd inline markup in a heading) only affects the first
// paint, never the links themselves.

export interface TocHeading {
  id: string
  text: string
  depth: 2 | 3
}

// GitHub-style slug: lowercase, keep letters/numbers (any script, so Chinese
// headings keep their characters), spaces become hyphens.
export function slugifyHeading(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\p{Pc} -]/gu, "")
    .replace(/ /g, "-")
}

function createSlugger() {
  const seen = new Map<string, number>()
  return (text: string) => {
    const base = slugifyHeading(text) || "section"
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    return count === 0 ? base : `${base}-${count}`
  }
}

// Reduce a markdown heading line to the plain text react-markdown renders.
function headingPlainText(source: string): string {
  // Split out inline code spans so their contents stay literal.
  return source
    .split(/(`+[^`]*`+)/)
    .map((part) => {
      if (part.startsWith("`")) return part.replace(/^`+|`+$/g, "")
      return part
        .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
        .replace(/<[^>]+>/g, "")
        .replace(/(\*\*|__)(.+?)\1/g, "$2")
        .replace(/\*(.+?)\*/g, "$1")
        .replace(/(^|\W)_(.+?)_(?=\W|$)/g, "$1$2")
        .replace(/~~(.+?)~~/g, "$1")
        .replace(/\\(.)/g, "$1")
    })
    .join("")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

export function extractHeadings(markdown: string): TocHeading[] {
  const slug = createSlugger()
  const headings: TocHeading[] = []
  let fence: string | null = null

  for (const line of markdown.split(/\r?\n/)) {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})/)
    if (fenceMatch) {
      const marker = fenceMatch[1]
      if (fence === null) fence = marker[0].repeat(marker.length)
      else if (marker[0] === fence[0] && marker.length >= fence.length) fence = null
      continue
    }
    if (fence !== null) continue

    const match = line.match(/^ {0,3}(#{1,6})\s+(.+?)\s*#*\s*$/)
    if (!match) continue
    const level = match[1].length
    const text = headingPlainText(match[2])
    // Every h2/h3 gets an id from the slugger, in document order, exactly as
    // the rehype plugin does. Other levels don't consume slugs there either.
    if (level !== 2 && level !== 3) continue
    headings.push({ id: slug(text), text, depth: level as 2 | 3 })
  }

  return headings
}

// Minimal HAST shapes, so this file has no dependency on @types/hast.
interface HastNode {
  type: string
  tagName?: string
  value?: string
  properties?: Record<string, unknown>
  children?: HastNode[]
}

function hastText(node: HastNode): string {
  if (node.type === "text") return node.value ?? ""
  return (node.children ?? []).map(hastText).join("")
}

// Rehype plugin: give every <h2>/<h3> a stable id for the sidebar to link to.
export function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const slug = createSlugger()
    const walk = (node: HastNode) => {
      if (node.type === "element" && (node.tagName === "h2" || node.tagName === "h3")) {
        node.properties = node.properties ?? {}
        if (!node.properties.id) node.properties.id = slug(hastText(node).trim())
      }
      node.children?.forEach(walk)
    }
    walk(tree)
  }
}
