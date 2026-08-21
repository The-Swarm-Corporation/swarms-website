#!/usr/bin/env node
/**
 * Verifies the agent-readiness behaviors from issues #67, #68, #70, #71
 * against a running instance of the site.
 *
 *   pnpm build && pnpm start &     # or any deployed URL
 *   node scripts/verify-agent-readiness.mjs http://localhost:3000
 *
 * Exits non-zero if any check fails. NOTE: proxy.ts only enforces the
 * scaffolding guard in production builds; markdown negotiation and JSON 404s
 * work in `next start` but not `next dev`.
 */

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "")

// A published post slug that must exist for the negotiation checks.
const BLOG_SLUG = process.argv[3] ?? "graphworkflow-research-paper"

const isLocal = /localhost|127\.0\.0\.1/.test(base)
let failures = 0

function check(name, ok, detail = "", localWarnOnly = false) {
  const warn = !ok && localWarnOnly && isLocal
  const status = ok ? "PASS" : warn ? "WARN" : "FAIL"
  if (!ok && !warn) failures++
  console.log(`${status}  ${name}${detail ? `  (${detail})` : ""}`)
}

async function main() {
  // --- #67: agent-friendly 404s ---
  {
    const res = await fetch(`${base}/some-path-that-does-not-exist`)
    const body = await res.text()
    check("#67 unknown path returns HTTP 404", res.status === 404, `got ${res.status}`)
    check("#67 404 body links the sitemap", body.includes("/sitemap.xml"))
    check("#67 404 body links llms.txt", body.includes("llms.txt"))
    check("#67 404 body links the docs index", body.includes("docs.swarms.ai"))
  }

  // --- #68: content without JavaScript ---
  {
    const res = await fetch(`${base}/`)
    const html = await res.text()
    const text = html
      .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
    const h1s = html.match(/<h1[\s>]/g) ?? []
    const h2s = html.match(/<h2[\s>]/g) ?? []
    const h3s = html.match(/<h3[\s>]/g) ?? []
    check("#68 homepage has exactly one H1", h1s.length === 1, `got ${h1s.length}`)
    check("#68 homepage has H2 sections in raw HTML", h2s.length >= 4, `got ${h2s.length}`)
    check("#68 homepage has H3 subsections in raw HTML", h3s.length >= 4, `got ${h3s.length}`)
    check("#68 homepage raw text is 500+ chars", text.length >= 500, `got ${text.length}`)
    check(
      "#68 below-the-fold sections are server-rendered",
      /Cookbook|Community/i.test(html) && /Hiring|hiring/.test(html),
    )
  }

  // --- #70: structured JSON errors ---
  {
    const res = await fetch(`${base}/api/route-that-does-not-exist`)
    let ok = false, code = ""
    try {
      const data = await res.json()
      code = data?.error?.code
      ok = res.status === 404 && typeof data?.error?.message === "string" && !!code
    } catch {}
    check("#70 unknown API path returns structured JSON 404", ok, `status ${res.status}, code ${code}`)
  }
  {
    const res = await fetch(`${base}/api/newsletter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    })
    let ok = false, code = ""
    try {
      const data = await res.json()
      code = data?.error?.code
      ok =
        res.status === 400 &&
        typeof data?.error?.message === "string" &&
        typeof data?.error?.hint === "string"
    } catch {}
    check("#70 newsletter validation error is structured JSON", ok, `status ${res.status}, code ${code}`)
  }

  // --- #71: markdown content negotiation ---
  {
    const res = await fetch(`${base}/blog/${BLOG_SLUG}`, {
      headers: { Accept: "text/markdown" },
    })
    const type = res.headers.get("content-type") ?? ""
    const vary = res.headers.get("vary") ?? ""
    check("#71 Accept: text/markdown returns markdown", type.includes("text/markdown"), type)
    check("#71 markdown variant sends Vary: Accept", /(^|,\s*)accept(,|$)/i.test(vary), vary)
  }
  {
    const res = await fetch(`${base}/blog/${BLOG_SLUG}`, {
      headers: { Accept: "text/html" },
    })
    const type = res.headers.get("content-type") ?? ""
    const vary = res.headers.get("vary") ?? ""
    check("#71 Accept: text/html still returns HTML", type.includes("text/html"), type)
    // Next's local server overwrites Vary on prerendered HTML; the header is
    // declared in next.config.mjs and applied by Vercel's routing layer, so
    // this check is strict only against a deployed URL.
    check("#71 HTML variant also sends Vary: Accept", /(^|,\s*)accept(,|$)/i.test(vary), vary, true)
  }

  console.log(failures === 0 ? "\nAll checks passed." : `\n${failures} check(s) failed.`)
  process.exit(failures === 0 ? 0 : 1)
}

main().catch((err) => {
  console.error("verify-agent-readiness failed to run:", err.message)
  process.exit(1)
})
