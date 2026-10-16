// The Swarms timeline, shared by the /story page, its JSON-LD, and its
// generated OG image. Dates come from public records: GitHub repos and first
// production deploys, first PyPI and crates.io publishes, and the launch posts
// on this blog.

export type ReleaseKind = "Origin" | "Open source" | "Product" | "Milestone"

export type Release = {
  year: string
  date: string
  // ISO 8601 (year or year-month), used for schema.org datePublished
  isoDate: string
  kind: ReleaseKind
  title: string
  description: string
  href?: string
  cta?: string
}

export const releases: Release[] = [
  {
    year: "2023",
    date: "2023",
    isoDate: "2023",
    kind: "Origin",
    title: "A group chat of GPT-3s",
    description:
      "Swarms began as a research project. We connected several GPT-3 instances in a shared group chat and gave them problems to solve together. They questioned each other, caught mistakes, and refined their answers, and the group consistently beat any single model working alone.",
  },
  {
    year: "2023",
    date: "May 2023",
    isoDate: "2023-05",
    kind: "Open source",
    title: "Swarms Python",
    description:
      "We open sourced the orchestration code as the Swarms Python framework so anyone could build multi-agent systems. A community of developers and researchers formed around it and has shaped the roadmap ever since.",
    href: "https://github.com/kyegomez/swarms",
    cta: "View on GitHub",
  },
  {
    year: "2024",
    date: "August 2024",
    isoDate: "2024-08",
    kind: "Product",
    title: "Swarms Marketplace",
    description:
      "A marketplace at swarms.world to discover, buy, and sell agents, prompts, tools, and MCP servers. It was redesigned in June 2025, and fiat payments went live in January 2026.",
    href: "/marketplace",
    cta: "Explore the marketplace",
  },
  {
    year: "2025",
    date: "March 2025",
    isoDate: "2025-03",
    kind: "Product",
    title: "Swarms Rust",
    description:
      "swarms-rs brought the framework to Rust: memory safety, zero-copy message passing, and concurrent workflows for teams that need speed and reliability at scale.",
    href: "/swarms-rs",
    cta: "Meet swarms-rs",
  },
  {
    year: "2025",
    date: "May 2025",
    isoDate: "2025-05",
    kind: "Product",
    title: "Swarms API",
    description:
      "Hosted multi-agent orchestration behind a single endpoint, with official SDKs. Pick a swarm architecture, describe your agents, and run them on hundreds of models without running any infrastructure.",
    href: "/api",
    cta: "Read the API overview",
  },
  {
    year: "2026",
    date: "June 2026",
    isoDate: "2026-06",
    kind: "Product",
    title: "Swarms Cloud",
    description:
      "Hosted infrastructure for running agents without managing servers. Today Swarms Cloud is the home for API keys, usage and billing, a visual workflow builder, completion logs, and the hosted MCP server.",
    href: "https://cloud.swarms.world",
    cta: "Open Swarms Cloud",
  },
  {
    year: "2026",
    date: "July 2026",
    isoDate: "2026-07",
    kind: "Milestone",
    title: "7,000 GitHub stars",
    description:
      "The Swarms Python repository passed 7,000 stars, a marker of how far the community has carried a framework that started as one experiment.",
    href: "/blog/swarms-7000-github-stars",
    cta: "Read the post",
  },
  {
    year: "2026",
    date: "August 2026",
    isoDate: "2026-08",
    kind: "Product",
    title: "AgentHQ",
    description:
      "An office where your AI agents work. Hire Claude and Codex agents, give them desks, assign tasks, and watch every tool call happen live. AgentHQ opened in pre-beta with early access through a waitlist.",
    href: "/agenthq",
    cta: "Join the waitlist",
  },
  {
    year: "2026",
    date: "October 2026",
    isoDate: "2026-10",
    kind: "Product",
    title: "RouteHub",
    description:
      "An open-source LLM gateway that connects 20+ providers through one completion() call. It keeps LiteLLM's interface and imports 383x faster.",
    href: "/routehub",
    cta: "Try RouteHub",
  },
]
