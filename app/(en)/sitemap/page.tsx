import type { ReactNode } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { getAllPostMeta } from "@/lib/blog"
import { positions } from "@/lib/positions"
import { courseParts } from "@/lib/academy/swarms-api-course"

export const metadata: Metadata = {
  title: { absolute: "Sitemap | Swarms" },
  description:
    "Every page on swarms.ai in one place: products, docs, academy, research, blog posts, careers, programs, Chinese pages, and legal.",
  alternates: { canonical: "/sitemap" },
}

type SiteLink = { name: string; url: string }
type Section = { title: string; links: SiteLink[] }

const SECTIONS: Section[] = [
  {
    title: "Main",
    links: [
      { name: "Home", url: "/" },
      { name: "Pricing", url: "/pricing" },
      { name: "Blog", url: "/blog" },
      { name: "Newsletter", url: "/newsletter" },
    ],
  },
  {
    title: "Products",
    links: [
      { name: "Products Overview", url: "/products" },
      { name: "The Stack", url: "/stack" },
      { name: "Swarms Python Framework", url: "/framework" },
      { name: "Installation", url: "/installation" },
      { name: "Swarms RS", url: "/swarms-rs" },
      { name: "Swarms API", url: "/api" },
      { name: "RouteHub", url: "/routehub" },
      { name: "Swarms Marketplace", url: "/marketplace" },
      { name: "Applications", url: "/applications" },
      { name: "Simulations", url: "/simulations" },
      { name: "AgentHQ", url: "/agenthq" },
      { name: "Mobile App", url: "/mobile" },
    ],
  },
  {
    title: "Research",
    links: [
      { name: "Research", url: "/research" },
      { name: "Research Papers", url: "/research-papers" },
      { name: "Open Source", url: "/open-source" },
    ],
  },
  {
    title: "Programs",
    links: [
      { name: "Programs", url: "/programs" },
      { name: "Startup Program", url: "/programs/startups" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", url: "/about" },
      { name: "Our Story", url: "/story" },
      { name: "Careers", url: "/hiring" },
    ],
  },
  {
    title: "中文",
    links: [
      { name: "首页", url: "/zh" },
      { name: "框架", url: "/zh/framework" },
      { name: "安装", url: "/zh/installation" },
      { name: "定价", url: "/zh/pricing" },
      { name: "博客", url: "/zh/blog" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", url: "/privacy" },
      { name: "Terms of Service", url: "/terms" },
      { name: "Data Policy", url: "/data-policy" },
    ],
  },
  {
    title: "Elsewhere",
    links: [
      { name: "Swarms Cloud", url: "https://cloud.swarms.world" },
      { name: "swarms.world", url: "https://swarms.world" },
      { name: "Launch on the Marketplace", url: "https://swarms.world/launch" },
      { name: "Documentation", url: "https://docs.swarms.world" },
      { name: "API Documentation", url: "https://docs.swarms.ai" },
      { name: "Status Page", url: "https://status.swarms.ai" },
      { name: "Customer Support", url: "https://swarms.world/support" },
      { name: "Grants Program", url: "https://grants.swarms.world" },
      { name: "Foundry Program", url: "https://swarms.world/foundry" },
      { name: "Ecosystem Hub", url: "https://ecosystem.swarms.world" },
      { name: "GitHub", url: "https://github.com/kyegomez/swarms" },
      { name: "Discord", url: "https://discord.gg/EamjgSaEQf" },
      { name: "X (Twitter)", url: "https://twitter.com/swarms_corp" },
      { name: "LinkedIn", url: "https://www.linkedin.com/company/swarms-corp/" },
      { name: "YouTube", url: "https://www.youtube.com/@kyegomez3242" },
      { name: "Book a Call", url: "https://cal.com/swarms" },
    ],
  },
]

function SiteLinkItem({ name, url, meta }: SiteLink & { meta?: string }) {
  const external = url.startsWith("http")
  const className =
    "group inline-flex items-baseline gap-1.5 text-sm leading-relaxed text-white/60 transition-colors duration-200 hover:text-white"
  const label = (
    <>
      <span className="underline-offset-4 group-hover:underline">{name}</span>
      {external && <ArrowUpRight aria-hidden="true" className="h-3 w-3 shrink-0 self-center text-white/30" />}
      {meta && <span className="shrink-0 font-mono text-[11px] text-white/30">{meta}</span>}
    </>
  )
  return (
    <li>
      {external ? (
        <a href={url} target="_blank" rel="noopener noreferrer" className={className}>
          {label}
        </a>
      ) : (
        <Link href={url} className={className}>
          {label}
        </Link>
      )}
    </li>
  )
}

function SectionBlock({ title, count, children }: { title: string; count?: number; children: ReactNode }) {
  const id = `sitemap-${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`
  return (
    <section aria-labelledby={id} className="break-inside-avoid">
      <h2
        id={id}
        className="mb-4 flex items-baseline gap-2 border-b border-white/[0.08] pb-3 text-sm font-semibold uppercase tracking-[0.14em] text-white"
      >
        {title}
        {count !== undefined && <span className="font-mono text-xs font-normal text-white/35">{count}</span>}
      </h2>
      {children}
    </section>
  )
}

export default function SitemapPage() {
  const posts = getAllPostMeta()

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main id="main-content" className="container mx-auto max-w-7xl px-4 pb-24 pt-32 sm:px-6 sm:pt-40 lg:px-8">
        <header className="mb-14 max-w-3xl">
          <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">Sitemap</p>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Every page on swarms.ai</h1>
          <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
            All pages, guides, blog posts, and open roles on the site, grouped by section. Search engines can use the{" "}
            <a href="/sitemap.xml" className="text-white/80 underline underline-offset-4 hover:text-white">
              XML sitemap
            </a>{" "}
            instead.
          </p>
        </header>

        <div className="columns-1 gap-x-12 space-y-12 sm:columns-2 lg:columns-4">
          {SECTIONS.map((section) => (
            <SectionBlock key={section.title} title={section.title}>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <SiteLinkItem key={link.url} {...link} />
                ))}
              </ul>
            </SectionBlock>
          ))}

          <SectionBlock title="Academy" count={courseParts.length + 2}>
            <ul className="space-y-2">
              <SiteLinkItem name="Swarms Academy" url="/academy" />
              <SiteLinkItem name="The Swarms API Course" url="/academy/swarms-api" />
              {courseParts.map((part) => (
                <SiteLinkItem
                  key={part.slug}
                  name={`Part ${part.part}: ${part.title}`}
                  url={`/academy/swarms-api/${part.slug}`}
                />
              ))}
            </ul>
          </SectionBlock>

          <SectionBlock title="Open roles" count={positions.length}>
            <ul className="space-y-2">
              {positions.map((position) => (
                <SiteLinkItem key={position.slug} name={position.title} url={`/hiring/${position.slug}`} />
              ))}
            </ul>
          </SectionBlock>
        </div>

        <div className="mt-20">
          <SectionBlock title="Blog posts" count={posts.length}>
            <ul className="grid gap-x-12 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <SiteLinkItem key={post.slug} name={post.title} url={`/blog/${post.slug}`} meta={post.date} />
              ))}
            </ul>
          </SectionBlock>
        </div>
      </main>
    </div>
  )
}
