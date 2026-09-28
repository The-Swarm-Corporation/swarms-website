"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  FileText,
  Wrench,
  Plug,
  Sparkles,
  TrendingUp,
  ChevronDown,
  CheckCircle,
  Code,
  Key,
  Rocket,
  Bot,
  Globe,
  Tag,
} from "lucide-react"

import { CardCarousel, type CarouselCardItem } from "@/components/card-carousel"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CopyButton } from "@/components/copy-button"
import { CodeBlock } from "@/components/code-block"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats = [
  { value: "6,000+", label: "Agents and prompts listed" },
  { value: "90%", label: "Seller payout, flat, every sale" },
  { value: "100+", label: "Countries buyers can pay from" },
  { value: "26", label: "Public API endpoints" },
]

const categories: CarouselCardItem[] = [
  {
    icon: Bot,
    title: "Agents",
    description: "Executable code with its dependencies and required environment variables bundled in.",
    meta: "e.g. ETF Analysis BatchedGridWorkflow",
    preview: ["compliance-checker/", "  main.py", "  requirements.txt", "  .env.example"],
  },
  {
    icon: FileText,
    title: "Prompts",
    description: "Text-only instructions with no code needed. Export to ChatGPT or Claude with one click.",
    meta: "e.g. Medical Researcher System Prompt",
    preview: ["# Medical Researcher", "", "You are a medical researcher.", "Cite every claim.", "Flag weak evidence."],
  },
  {
    icon: Wrench,
    title: "Tools",
    description: "Typed Python functions built to be pulled into your own agents as dependencies.",
    meta: "e.g. API connectors, data processors",
    preview: ["def get_stock_price(", "    ticker: str,", ") -> float:", '    """Latest close price."""'],
  },
  {
    icon: Plug,
    title: "MCP Servers",
    description: "Model Context Protocol implementations that give any agent real tool access: search, scraping, docs.",
    meta: "e.g. Firecrawl, DeepWiki, Exa",
    preview: ["{", '  "mcpServers": {', '    "firecrawl": { "url": "..." }', "  }", "}"],
  },
  {
    icon: Sparkles,
    title: "Skills",
    description: "Anthropic SKILL.md-format instruction packs. Drag a file onto the launch form and it fills itself in.",
    meta: "Named, reusable capabilities",
    preview: ["---", "name: commit-messages", "description: Write commit", "  messages from staged diffs", "---"],
  },
]

const mcpExamples = [
  {
    lang: "Claude Code",
    file: "terminal",
    code: `claude mcp add --transport http swarms https://swarms.world/mcp \\
  --header "Authorization: Bearer $SWARMS_API_KEY"`,
  },
  {
    lang: "Cursor",
    file: ".cursor/mcp.json",
    code: `{
  "mcpServers": {
    "swarms": {
      "url": "https://swarms.world/mcp",
      "headers": { "Authorization": "Bearer sk-..." }
    }
  }
}`,
  },
]

const industries = [
  "Healthcare",
  "Education",
  "Finance",
  "Research",
  "Public Safety",
  "Marketing",
  "Sales",
  "Customer Support",
]

const businessModels: CarouselCardItem[] = [
  {
    title: "Direct sale",
    description: "One-time purchase. Buyer pays once, gets permanent access. Card or crypto, chosen per listing.",
    stat: { value: "90%", label: "of every sale goes to you" },
  },
  {
    title: "Tokenization",
    description: "Launch as a tradeable token on Solana via a bonding curve. You bring the agent, not capital.",
    stat: { value: "0.5%", label: "of every trade goes to you" },
  },
  {
    title: "Frenzy Mode",
    description: "Launch your tokenized agent in Frenzy Mode and every trade pays a 2.0% fee, split evenly between you and the platform.",
    stat: { value: "1%", label: "of every trade goes to you, 2x fees" },
  },
  {
    title: "Vault Mode",
    description: "Gate access behind token ownership instead of a price. Holders get in, with no purchase needed.",
    stat: { value: "Hold", label: "the token to unlock the listing" },
  },
  {
    title: "Free & open",
    description: "Publish free to build reach, ratings, and reputation before you ever charge.",
    stat: { value: "$0", label: "to list, in every category" },
  },
]

const discoveryExamples = [
  { lang: "Load a prompt", file: "load_prompt.py", code: `from swarms import Agent

# Fetches the prompt from the marketplace and installs it
# as the system prompt automatically.
agent = Agent(
    model_name="gpt-4o-mini",
    marketplace_prompt_id="75fc0d28-b0d0-4372-bc04-824aa388b7d2",
)

response = agent.run("Summarize the key risks in this quarterly filing.")` },
  { lang: "Publish an agent", file: "publish_agent.py", code: `from swarms import Agent

agent = Agent(
    agent_name="Compliance Checker",
    agent_description="Reviews documents for regulatory compliance issues",
    model_name="gpt-4o",
    publish_to_marketplace=True,
    use_cases=[
        {"title": "Contract review", "description": "Flag non-compliant clauses in contracts"},
        {"title": "Policy audit", "description": "Check internal policies against regulations"},
    ],
    tags=["compliance", "legal", "document-review"],
)

# Validated and published to swarms.world the moment it runs.
agent.run("Review this vendor agreement for GDPR issues.")` },
]

const apiExamples = [
  { lang: "cURL", file: "openapi.spec.sh", code: `# The full API surface, generated from the live route code,
# so it cannot drift from what the API actually accepts.
curl https://swarms.world/openapi.json

# Human- and agent-readable index of the same 26 endpoints,
# grouped by purpose.
curl https://swarms.world/llms.txt` },
]

function CodePanel({ file, code }: { file: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{file}</span>
        <CopyButton value={code} className="ml-auto" />
      </div>
      <div className="p-4 sm:p-5">
        <CodeBlock code={code} file={file} className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]" />
      </div>
    </div>
  )
}

function CodeTabs({
  examples,
  defaultLang,
}: {
  examples: { lang: string; file: string; code: string }[]
  defaultLang?: string
}) {
  const initial = defaultLang ?? examples[0].lang
  return (
    <Tabs defaultValue={initial} className="w-full">
      <TabsList className="mb-4 flex h-auto w-full flex-wrap justify-start gap-2 bg-transparent p-0">
        {examples.map((ex) => (
          <TabsTrigger
            key={ex.lang}
            value={ex.lang}
            className="rounded-full border border-white/[0.14] bg-[#0a0a0a] px-4 py-1.5 text-xs font-medium text-white/60 transition-colors data-[state=active]:border-white/30 data-[state=active]:bg-white data-[state=active]:text-black"
          >
            {ex.lang}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((ex) => (
        <TabsContent key={ex.lang} value={ex.lang} className="mt-0">
          <CodePanel file={ex.file} code={ex.code} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-7xl sm:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {eyebrow && (
        <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

const faqs = [
  {
    question: "What can I actually buy and sell here?",
    answer:
      "Agents (executable code with dependencies and environment variables), prompts (text-only instructions, no code needed), tools (typed Python functions), MCP servers (Model Context Protocol implementations), and skills (Anthropic SKILL.md-format instruction packs). All five are browsable and purchasable at swarms.world.",
  },
  {
    question: "How much does the marketplace take from a sale?",
    answer:
      "A flat 10% platform fee on every completed sale, identical whether the buyer pays by card or crypto. You keep 90%. There is no listing fee, no subscription tier, and no sliding scale by volume or rating.",
  },
  {
    question: "Do I need a minimum rating or number of published items before I can sell?",
    answer:
      "No. There is currently no minimum published-item count and no minimum rating required to publish a paid listing. Any account can list a paid product from day one.",
  },
  {
    question: "Can I sell some listings in crypto and others in fiat?",
    answer:
      "Yes. The payment rail is chosen per listing, not per account, so a single seller profile can run both side by side under the same flat 10% fee.",
  },
  {
    question: "What is tokenization, and do I need capital to launch a token?",
    answer:
      "Tokenizing attaches a live, tradeable token on Solana to your agent or prompt through a bonding curve rather than a liquidity pool you fund. You bring the agent; you don't bring money. Standard trading fees are 1.0% per trade, or 2.0% with Frenzy Mode.",
  },
  {
    question: "What is Vault Mode?",
    answer:
      "A launch-time option that turns your token into an access key: only holders can use the agent or prompt. It is mutually exclusive with setting a price: you choose selling access or gating access, not both.",
  },
  {
    question: "Is there a public Marketplace API?",
    answer:
      "Yes. A self-generating OpenAPI 3.1 spec lives at swarms.world/openapi.json, built from the same route code and validators the live API runs, so it cannot drift from what the API actually accepts. swarms.world/llms.txt catalogs all 26 endpoints by purpose. Read endpoints are public; publishing and account endpoints need an API key.",
  },
  {
    question: "How do I load a marketplace prompt into my own agent?",
    answer:
      "Pass a marketplace_prompt_id when constructing an Agent in the Swarms Python framework, and it fetches and installs the prompt as the system prompt automatically. Publishing back is just as direct: set publish_to_marketplace=True on the Agent.",
  },
]

export default function MarketplacePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  // React does not always render the `muted` attribute, which some browsers need before
  // they allow autoplay, so set it on the element and start playback directly.
  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return
    video.muted = true
    video.play().catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO VIDEO: full width, scaled to fit the viewport below the nav without cropping */}
        <section className="relative w-full overflow-hidden bg-black">
          <div className="relative mx-auto aspect-[1920/1070] max-h-[calc(100svh-64px)] w-full sm:max-h-[calc(100svh-80px)] md:max-h-[calc(100svh-96px)]">
            <video
              ref={heroVideoRef}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 h-full w-full object-contain"
              src="/swarms_marketplace_ad_2.mp4"
              poster="/swarms_marketplace_ad_2_poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            />
          </div>
        </section>

        {/* HERO TEXT */}
        <section className="relative border-b border-white/[0.08] bg-black">
          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center pb-20 pt-10 text-center sm:pb-24 sm:pt-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                The commercial layer of the agent economy
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.75rem, 8vw, 6.5rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Swarms Marketplace
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Discover, buy, and sell agents, prompts, tools, MCP servers, and skills. Publish for free.
                Keep 90% of every sale.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://swarms.world" target="_blank" rel="noopener noreferrer">
                    Browse the marketplace
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://swarms.world/launch" target="_blank" rel="noopener noreferrer">
                    Publish a product
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div className="text-2xl font-semibold tracking-tighter text-white sm:text-4xl md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs font-normal leading-relaxed text-white/50 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* TWO PATHS: DISCOVER VS PUBLISH */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Two sides, one marketplace"
              title="Come to find something. Stay to sell something."
              description="Every listing on swarms.world was published by someone who started on the other side of this page."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8 md:p-10"
              >
                <Search className="mb-5 h-6 w-6 text-white/60" strokeWidth={1.5} />
                <h3 className="mb-3 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">Discover</h3>
                <p className="mb-6 flex-1 text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                  Browse production-ready agents, prompts, tools, MCP servers, and skills built by the community.
                  Filter by industry, sort by what's trending, or just describe what you need in plain English.
                  Load anything you buy straight into the Swarms framework in a few lines.
                </p>
                <Button
                  className="w-full rounded-full bg-white font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://swarms.world/platform/registry" target="_blank" rel="noopener noreferrer">
                    Browse the registry
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.08, ease }}
                className="flex flex-col rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-8 md:p-10"
              >
                <Rocket className="mb-5 h-6 w-6 text-white/60" strokeWidth={1.5} />
                <h3 className="mb-3 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                  Publish &amp; monetize
                </h3>
                <p className="mb-6 flex-1 text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                  List what you've built in minutes. No listing fee, no approval queue, no minimum reputation
                  before you can charge. Choose how you get paid: a one-time sale, a tokenized launch with
                  ongoing trading fees, or token-gated Vault access.
                </p>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://swarms.world/launch" target="_blank" rel="noopener noreferrer">
                    Publish a product
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="border-b border-white/[0.08] bg-black py-16 sm:py-24 lg:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="What's on the marketplace"
              title="Five product types for sale."
              description="Every listing on swarms.world is one of these five types, and each one can be published free or sold at a one-time price."
            />
          </div>

          <CardCarousel label="Product types" items={categories} />
        </section>

        {/* DISCOVERY MECHANICS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                className="space-y-5 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Discovery
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Or just describe what you need.
                </h2>
                <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Type <span className="text-white/80">&ldquo;free healthcare agents from this month&rdquo;</span>{" "}
                  into the registry search bar. An agent translates that sentence into filters and applies them
                  live, then automatically relaxes them if nothing matches.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {industries.map((industry) => (
                    <span
                      key={industry}
                      className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-white/50"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/[0.08]">
                  <Image
                    src="/autonomous_marketplace_blog.png"
                    alt="The Swarms Marketplace registry: search, filters, and industries applied live"
                    fill
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
              </motion.div>

              <motion.div
                className="min-w-0 w-full space-y-3 lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                {[
                  {
                    icon: Search,
                    title: "Natural language search",
                    text: "Describe what you want in plain English. Filters set themselves, and relax automatically if nothing matches.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Trending sections",
                    text: "Top-Rated, Community Favorites (ranked by shares and downloads), Recent Additions, and platform-Featured Content.",
                  },
                  {
                    icon: Tag,
                    title: "Tags and ratings",
                    text: "Creators tag every listing, and community upvotes drive the \"most popular\" sort, so good work surfaces fast.",
                  },
                  {
                    icon: Globe,
                    title: "MCP Portal",
                    text: "Every MCP-tagged agent, prompt, and tool has its own home at swarms.world/mcp, browsable without an account.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-lg border border-white/[0.08] bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a]"
                  >
                    <div className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
                      <item.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-sm font-medium text-white sm:text-base">{item.title}</h3>
                      <p className="text-sm font-normal leading-relaxed text-white/50">{item.text}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* WIRED INTO YOUR CODE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Framework integration"
              title="Buy it, and it's already in your code."
              description="Marketplace components load into the Swarms Python framework by ID, and agents publish back with a single parameter."
            />

            <div className="mx-auto min-w-0 max-w-7xl">
              <CodeTabs examples={discoveryExamples} />
            </div>
          </div>
        </section>

        {/* MARKETPLACE MCP */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Swarms Marketplace MCP"
              title="Swarms Marketplace MCP"
              description="swarms.world/mcp is a Model Context Protocol server. Connect Claude Code, Cursor, or any MCP client with your Swarms API key, and your agent can search 6,000+ agents, prompts, and tools, read free listings in full, and publish and manage its own."
            />

            <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                className="space-y-3 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                {[
                  { icon: Search, text: "Search the catalog by name, tag, category, use case, or price, then fetch any listing by id." },
                  { icon: FileText, text: "Free agents come back with their runnable source, and free prompts with their full body." },
                  { icon: Rocket, text: "Publish and edit your own agents and prompts, leave reviews, and publish bundles of up to fifty items." },
                  { icon: Key, text: "Runs as the account that owns the API key, so an agent can act for you without a browser." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black">
                      <item.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                    </div>
                    <p className="pt-1 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
                <div className="flex flex-wrap gap-3 pt-3">
                  <Button
                    className="rounded-full bg-white text-sm font-medium text-black hover:bg-neutral-200"
                    asChild
                  >
                    <a href="https://swarms.world/mcp" target="_blank" rel="noopener noreferrer">
                      Open swarms.world/mcp
                      <ArrowUpRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="rounded-full border-white/[0.14] bg-[#0a0a0a] text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    asChild
                  >
                    <a href="/blog/swarms-marketplace-mcp-server">
                      Read the setup guide
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="min-w-0 w-full lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <CodeTabs examples={mcpExamples} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* BUSINESS MODELS */}
        <section className="border-b border-white/[0.08] bg-black py-16 sm:py-24 lg:py-32">
          <div className="container px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Business models"
              title="Choose how you get paid."
              description="Every model runs at the same flat, honest fee. Mix and match across your own catalog: the rail is chosen per listing, not per account."
            />
          </div>

          <CardCarousel label="Business models" items={businessModels} />
        </section>

        {/* MARKETPLACE API */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Marketplace API"
              title="Developer Integration"
              description="The marketplace publishes a self-generating OpenAPI 3.1 spec, built from the same route code and validators the live API runs, so it cannot drift from what the API actually accepts."
            />

            <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                className="space-y-3 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                {[
                  { icon: Code, text: "swarms.world/openapi.json: the full spec, generated at build time from the actual route files." },
                  { icon: FileText, text: "swarms.world/llms.txt: the same 26 endpoints, human- and agent-readable, cataloged by purpose." },
                  { icon: CheckCircle, text: "Read endpoints (search, listing detail, catalogs) are public. No key required." },
                  { icon: Key, text: "Publishing and account endpoints require an API key from your platform dashboard." },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black">
                      <item.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                    </div>
                    <p className="pt-1 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
                      {item.text}
                    </p>
                  </div>
                ))}
                <div className="pt-3">
                  <Button
                    variant="outline"
                    className="rounded-full border-white/[0.14] bg-[#0a0a0a] text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    asChild
                  >
                    <a href="https://swarms.world/platform/api-keys" target="_blank" rel="noopener noreferrer">
                      Get an API key
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="min-w-0 w-full lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <CodePanel file={apiExamples[0].file} code={apiExamples[0].code} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* PUBLISHING WORKFLOW */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Publishing workflow"
              title="From idea to listing, in four steps."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {[
                {
                  step: "01",
                  title: "Set up payouts",
                  text: "Optional. Connect a Stripe seller account if you want card sales. Skip it entirely for crypto-only.",
                },
                {
                  step: "02",
                  title: "Decide type and price",
                  text: "Agent, prompt, tool, MCP server, or skill. Set a one-time price, or publish free.",
                },
                {
                  step: "03",
                  title: "Publish from /launch",
                  text: "From the dashboard, or programmatically with publish_to_marketplace=True in the SDK.",
                },
                {
                  step: "04",
                  title: "Choose your rail",
                  text: "Crypto (SOL) or Card (Stripe), per listing. Same flat 10% fee either way.",
                },
              ].map((item) => (
                <div key={item.step} className="bg-black p-5 sm:p-8">
                  <div className="mb-3 font-mono text-xs text-white/30">{item.step}</div>
                  <h3 className="mb-2 text-base font-medium text-white">{item.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="FAQ" title="Common questions" />

            <div className="mx-auto max-w-7xl">
              <div className="max-w-3xl space-y-3 sm:space-y-4">
                {faqs.map((faq, i) => {
                  const isOpen = openFaq === i
                  return (
                    <motion.div
                      key={faq.question}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.03, ease }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="overflow-hidden rounded-lg border border-white/[0.08] bg-black transition-colors duration-300 hover:bg-[#0a0a0a]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                      >
                        <span className="text-sm font-medium leading-snug text-white sm:text-base md:text-lg">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                            isOpen ? "rotate-180 text-white" : ""
                          }`}
                        />
                      </button>
                      <motion.div
                        initial={false}
                        animate={{
                          height: isOpen ? "auto" : 0,
                          opacity: isOpen ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm leading-relaxed text-white/50 sm:px-6 sm:pb-6 sm:text-base">
                          {faq.answer}
                        </div>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
            >
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  Ready to join the agent economy?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Browse thousands of production-ready agents, prompts, tools, MCP servers, and skills, or
                  publish your own in the next five minutes.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://swarms.world" target="_blank" rel="noopener noreferrer">
                    Browse the marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://swarms.world/launch" target="_blank" rel="noopener noreferrer">
                    Publish a product
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
