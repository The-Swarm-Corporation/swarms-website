import { siteConfig } from "@/app/metadata"
import { getAllPosts, hasZhTranslation } from "@/lib/blog"
import { courseParts } from "@/lib/academy/swarms-api-course"

export const dynamic = "force-static"

// llms.txt: a machine-readable index of the site for AI agents and answer
// engines, following the llms.txt convention (https://llmstxt.org). Generated
// from the same data sources as the sitemap so it never goes stale.
export function GET() {
  const base = siteConfig.url
  const posts = getAllPosts()

  const staticPages: { path: string; title: string; description: string }[] = [
    { path: "/products", title: "Products", description: "The complete multi-agent stack: Swarms Python, Swarms API, Swarms Marketplace, Swarms RS, Swarms Chat, and enterprise deployments." },
    { path: "/framework", title: "Swarms Framework", description: "The production-grade Python framework for multi-agent orchestration." },
    { path: "/api", title: "Swarms API", description: "Hosted multi-agent orchestration with 1,000+ models and 15+ swarm architectures behind one endpoint." },
    { path: "/pricing", title: "Pricing", description: "Plans and pricing for the Swarms platform." },
    { path: "/installation", title: "Installation", description: "Install the Swarms framework and set up your environment." },
    { path: "/open-source", title: "Open Source", description: "The open-source repositories behind the Swarms ecosystem." },
    { path: "/research", title: "Research", description: "Research on multi-agent collaboration and swarm intelligence." },
    { path: "/mobile", title: "Mobile App", description: "Swarms for iOS and Android." },
    { path: "/hiring", title: "Hiring", description: "Open roles at Swarms." },
  ]

  const lines: string[] = [
    "# Swarms",
    "",
    "> Swarms is the multi-agent AI orchestration platform: an open-source Python framework, a hosted API with 15+ swarm architectures, an open marketplace for agents and prompts, and a free academy that teaches the entire stack. This site (swarms.ai) is the main company site; the marketplace runs at swarms.world, the API at api.swarms.world, and API docs at docs.swarms.ai.",
    "",
    "## Main Pages",
    "",
    ...staticPages.map((p) => `- [${p.title}](${base}${p.path}): ${p.description}`),
    "",
    "## Swarms Academy",
    "",
    `- [Swarms Academy](${base}/academy): Free courses for the multi-agent stack, from your first AI agent to production swarms.`,
    `- [The Swarms API Course](${base}/academy/swarms-api): Free four-part multi-agent course with 31 lessons, 12 live API trials, checkpoint projects, and graded quizzes.`,
    ...courseParts.map(
      (p) => `- [Part ${p.part}: ${p.title}](${base}/academy/swarms-api/${p.slug}): ${p.tagline}`
    ),
    "",
    "## Blog",
    "",
    "Every post is also available as raw markdown at /blog/<slug>/markdown (append /markdown to the post URL). Chinese translations live under /zh/blog/<slug>.",
    "",
    ...posts.map((post) => {
      const zh = hasZhTranslation(post.slug) ? " (中文: available)" : ""
      return `- [${post.title}](${base}/blog/${post.slug}): ${post.description}${zh}`
    }),
    "",
    "## Ecosystem",
    "",
    "- [Swarms API Docs](https://docs.swarms.ai): Full API reference, guides, and examples. Serves its own llms.txt at https://docs.swarms.ai/llms.txt.",
    "- [Swarms Framework Docs](https://docs.swarms.world): Python framework documentation and quickstart.",
    "- [Swarms Marketplace](https://swarms.world): Discover, buy, and sell AI agents, prompts, and tools.",
    "- [GitHub](https://github.com/kyegomez/swarms): The open-source Swarms framework repository.",
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  })
}
