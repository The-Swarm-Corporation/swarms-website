import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata"
import { getAllPosts, hasZhTranslation } from "@/lib/blog"
import { positions } from "@/lib/positions"

type ChangeFrequency = MetadataRoute.Sitemap[0]["changeFrequency"]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const now = new Date()

  // Pages that are actively maintained and iterated on — a build-time
  // lastModified is a reasonable freshness signal for these.
  const activeRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/framework", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/api", priority: 0.8, changeFrequency: "weekly" },
    { path: "/installation", priority: 0.8, changeFrequency: "weekly" },
    { path: "/applications", priority: 0.8, changeFrequency: "weekly" },
    { path: "/open-source", priority: 0.8, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.8, changeFrequency: "daily" },
    { path: "/research", priority: 0.7, changeFrequency: "weekly" },
    { path: "/research-papers", priority: 0.7, changeFrequency: "weekly" },
    { path: "/simulations", priority: 0.7, changeFrequency: "weekly" },
    { path: "/mobile", priority: 0.7, changeFrequency: "weekly" },
    { path: "/programs", priority: 0.6, changeFrequency: "monthly" },
    { path: "/programs/startups", priority: 0.6, changeFrequency: "monthly" },
    { path: "/hiring", priority: 0.6, changeFrequency: "weekly" },
    { path: "/newsletter", priority: 0.5, changeFrequency: "monthly" },
  ]

  // Stable legal pages: content rarely changes, so a fabricated "modified
  // today" signal on every build would be misleading. Omit lastModified and
  // let crawlers rely on actual HTTP caching headers instead.
  const stableRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/data-policy", priority: 0.3, changeFrequency: "yearly" },
  ]

  const activeEntries: MetadataRoute.Sitemap = activeRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const stableEntries: MetadataRoute.Sitemap = stableRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Blog posts: real per-post dates from frontmatter.
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
    ...(hasZhTranslation(post.slug) && {
      alternates: {
        languages: {
          en: `${baseUrl}/blog/${post.slug}`,
          "zh-Hans": `${baseUrl}/zh/blog/${post.slug}`,
        },
      },
    }),
  }))

  // Simplified Chinese route tree (/zh) for Baidu/Google zh-Hans indexing.
  const zhRoutes: { path: string; priority: number; changeFrequency: ChangeFrequency }[] = [
    { path: "/zh", priority: 0.9, changeFrequency: "weekly" },
    { path: "/zh/framework", priority: 0.8, changeFrequency: "weekly" },
    { path: "/zh/pricing", priority: 0.8, changeFrequency: "weekly" },
    { path: "/zh/installation", priority: 0.8, changeFrequency: "weekly" },
    { path: "/zh/blog", priority: 0.8, changeFrequency: "daily" },
  ]

  const zhEntries: MetadataRoute.Sitemap = zhRoutes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  const zhBlogEntries: MetadataRoute.Sitemap = getAllPosts("zh").map((post) => ({
    url: `${baseUrl}/zh/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
    alternates: {
      languages: {
        en: `${baseUrl}/blog/${post.slug}`,
        "zh-Hans": `${baseUrl}/zh/blog/${post.slug}`,
      },
    },
  }))

  // Open positions: no per-posting timestamp is tracked, so omit
  // lastModified rather than fabricate one.
  const hiringEntries: MetadataRoute.Sitemap = positions.map((position) => ({
    url: `${baseUrl}/hiring/${position.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [...activeEntries, ...stableEntries, ...blogEntries, ...zhEntries, ...zhBlogEntries, ...hiringEntries]
}
