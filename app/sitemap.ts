import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata"

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/docs", "/tools", "/examples", "/ecosystem", "/community", "/blog", "/pricing", "/api"]

  const baseUrl = siteConfig.url

  return [
    // Main pages
    ...routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === "" ? ("daily" as const) : ("weekly" as const),
      priority: route === "" ? 1 : 0.8,
    })),

    // Documentation sections
    {
      url: `${baseUrl}/docs/getting-started`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs/architectures`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },

    // External important links
    {
      url: siteConfig.links.marketplace,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
    {
      url: siteConfig.links.docs,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ]
}
