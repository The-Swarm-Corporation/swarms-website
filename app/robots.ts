import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata"

// Deliberately permissive: every page, asset, and file type is crawlable by
// every bot. The only paths kept off-limits are non-content machine endpoints
// (JSON APIs, form handlers) and non-public path prefixes. Note robots.txt is
// a courtesy signal, not access control; anything truly sensitive must be
// protected server-side, never just listed here.
const disallow = ["/api/", "/admin/", "/private/"]

// AI crawlers we explicitly welcome. A crawler that matches a specific
// user-agent group ignores the * group entirely, so each group must carry the
// same disallows or the bot ends up with MORE access than generic crawlers.
const aiCrawlers = [
  "GPTBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "CCBot",
  "Applebot-Extended",
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/",
        disallow,
      })),
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}
