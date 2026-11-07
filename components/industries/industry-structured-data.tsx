import { siteConfig } from "@/app/metadata"
import { industryBySlug, type IndustrySlug } from "@/lib/industries"

// Breadcrumb and WebPage structured data for one industry page. The FAQ
// section adds its own FAQPage block.
export function IndustryStructuredData({ slug }: { slug: IndustrySlug }) {
  const industry = industryBySlug(slug)!
  const url = `${siteConfig.url}/industries/${slug}`
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Industries", item: `${siteConfig.url}/industries` },
        { "@type": "ListItem", position: 3, name: industry.name, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: `Swarms for ${industry.name}`,
      description: industry.description,
      url,
      isPartOf: { "@type": "WebSite", name: "Swarms", url: siteConfig.url },
      about: { "@type": "Thing", name: `AI agents for ${industry.name.toLowerCase()}` },
    },
  ]
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
