import { siteConfig } from "@/app/metadata"
import { getAllPosts, type BlogLocale } from "@/lib/blog"

const FEED_LIMIT = 50

const channels = {
  en: {
    title: "Swarms Blog",
    description:
      "Engineering deep-dives, tutorials, and product updates on multi-agent AI systems, agent orchestration, and the Swarms framework.",
    language: "en-us",
    blogPath: "/blog",
    feedPath: "/feed.xml",
  },
  zh: {
    title: "Swarms 博客",
    description: "关于多智能体 AI 系统、智能体编排和 Swarms 框架的工程文章、教程和产品动态。",
    language: "zh-cn",
    blogPath: "/zh/blog",
    feedPath: "/zh/feed.xml",
  },
} as const

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}

export function buildBlogFeed(locale: BlogLocale): string {
  const channel = channels[locale]
  const base = siteConfig.url
  const posts = getAllPosts(locale).slice(0, FEED_LIMIT)

  const items = posts
    .map((post) => {
      const url = `${base}${channel.blogPath}/${post.slug}`
      const pubDate = new Date(post.date)
      return [
        "    <item>",
        `      <title>${escapeXml(post.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        Number.isNaN(pubDate.getTime()) ? "" : `      <pubDate>${pubDate.toUTCString()}</pubDate>`,
        `      <description>${escapeXml(post.description ?? "")}</description>`,
        ...post.categories.map((category) => `      <category>${escapeXml(category)}</category>`),
        "    </item>",
      ]
        .filter(Boolean)
        .join("\n")
    })
    .join("\n")

  const newest = posts[0] && new Date(posts[0].date)
  const lastBuildDate = newest && !Number.isNaN(newest.getTime()) ? newest : new Date()

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(channel.title)}</title>
    <link>${base}${channel.blogPath}</link>
    <description>${escapeXml(channel.description)}</description>
    <language>${channel.language}</language>
    <lastBuildDate>${lastBuildDate.toUTCString()}</lastBuildDate>
    <atom:link href="${base}${channel.feedPath}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`
}

export function feedResponse(locale: BlogLocale) {
  return new Response(buildBlogFeed(locale), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  })
}
