import Link from "next/link"

// Crawlers landing on a dead URL should find live routes to follow rather than
// a bare dead end, so the most important destinations are linked directly.
const enDestinations = [
  { href: "/", label: "Home", detail: "The multi-agent stack, start to finish" },
  { href: "/framework", label: "Framework", detail: "The open-source Python framework" },
  { href: "/api", label: "API", detail: "Hosted multi-agent orchestration" },
  { href: "/academy", label: "Academy", detail: "Free courses on building swarms" },
  { href: "/blog", label: "Blog", detail: "Product news and engineering writing" },
  { href: "/pricing", label: "Pricing", detail: "Plans for every stage" },
]

const zhDestinations = [
  { href: "/zh", label: "首页", detail: "完整的多智能体技术栈" },
  { href: "/zh/framework", label: "框架", detail: "开源 Python 多智能体框架" },
  { href: "/zh/installation", label: "安装", detail: "快速开始使用 Swarms" },
  { href: "/zh/pricing", label: "定价", detail: "适合各阶段团队的方案" },
  { href: "/zh/blog", label: "博客", detail: "产品动态与工程实践" },
  { href: "/", label: "English site", detail: "The full English site" },
]

// Agents recovering from a dead URL need machine-readable indexes, not just
// navigation: the sitemap lists every live route, llms.txt is the AI entry
// point, and the docs index covers the API surface.
const machineIndexes = [
  { href: "/sitemap.xml", label: "sitemap.xml" },
  { href: "https://docs.swarms.ai/llms.txt", label: "llms.txt" },
  { href: "https://docs.swarms.ai", label: "docs.swarms.ai" },
]

const copy = {
  en: {
    eyebrow: "Error 404",
    heading: "This page does not exist",
    body: "The URL may be mistyped, or the page may have been moved or retired. Everything below is live.",
    destinations: enDestinations,
    machineNote: "Looking for a full index? Every live route is listed in",
  },
  zh: {
    eyebrow: "错误 404",
    heading: "页面不存在",
    body: "该网址可能有误，或页面已迁移或下线。以下链接均可正常访问。",
    destinations: zhDestinations,
    machineNote: "需要完整索引？所有在线路由都列在",
  },
}

export function NotFoundContent({ locale = "en" }: { locale?: "en" | "zh" }) {
  const { eyebrow, heading, body, destinations, machineNote } = copy[locale]

  return (
    <main className="min-h-[70vh] bg-black px-4 pb-24 pt-40 text-white">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-red-500">{eyebrow}</p>
        <h1 className="mt-4 font-orbitron text-4xl font-bold tracking-tight sm:text-5xl">{heading}</h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-400">{body}</p>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-lg border border-neutral-800 bg-neutral-800 sm:grid-cols-2">
          {destinations.map((destination) => (
            <li key={destination.href}>
              <Link
                href={destination.href}
                className="flex h-full flex-col bg-black p-5 transition-colors hover:bg-neutral-950"
              >
                <span className="font-orbitron text-base font-semibold text-white">{destination.label}</span>
                <span className="mt-1 text-sm text-neutral-500">{destination.detail}</span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-sm text-neutral-500">
          {machineNote}{" "}
          {machineIndexes.map((index, i) => (
            <span key={index.href}>
              <a
                href={index.href}
                className="text-neutral-400 underline underline-offset-4 transition-colors hover:text-white"
              >
                {index.label}
              </a>
              {i < machineIndexes.length - 1 ? " · " : ""}
            </span>
          ))}
        </p>
      </div>
    </main>
  )
}
