import type { MetadataRoute } from "next"
import { siteConfig } from "./metadata"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/", "/admin/", "/*.json$"],
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/docs/", "/blog/"],
        disallow: "/private/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  }
}
