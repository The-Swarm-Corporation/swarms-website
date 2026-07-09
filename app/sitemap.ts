import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata"
import { getAllPosts } from "@/lib/blog"
import { positions } from "@/lib/positions"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url
  const now = new Date()

  // Core marketing pages, weighted by importance
  const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[] = [
    { path: "", priority: 1, changeFrequency: "daily" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/framework", priority: 0.9, changeFrequency: "weekly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
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
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
    { path: "/data-policy", priority: 0.3, changeFrequency: "yearly" },
  ]

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  // Blog posts
  const blogEntries: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  // Open positions
  const hiringEntries: MetadataRoute.Sitemap = positions.map((position) => ({
    url: `${baseUrl}/hiring/${position.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }))

  return [...staticEntries, ...blogEntries, ...hiringEntries]
}
