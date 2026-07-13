"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Github,
  Code,
  Sparkles,
  Rocket,
  MessageCircle,
  Smartphone,
  Building,
  Shield,
  Layers,
  Activity,
  Headphones,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats = [
  { value: "8", label: "Products in the suite" },
  { value: "4", label: "Native SDK languages" },
  { value: "1,000+", label: "Models supported" },
  { value: "15+", label: "Multi-agent topologies" },
]

type ProductCard = {
  title: string
  description: string
  icon: typeof Github
  href: string
  external: boolean
  meta: string
}

const productCards: ProductCard[] = [
  {
    title: "Swarms Python",
    description:
      "The flagship production-grade multi-agent framework. Build sequential, concurrent, hierarchical and group-chat swarms in pure Python.",
    icon: Github,
    href: "https://github.com/kyegomez/swarms",
    external: true,
    meta: "pip install swarms",
  },
  {
    title: "Swarms API",
    description:
      "Hosted multi-agent orchestration with sub-millisecond agent init, 1,000+ models, and 15+ swarm topologies behind one endpoint.",
    icon: Code,
    href: "/api",
    external: false,
    meta: "api.swarms.world",
  },
  {
    title: "Swarms Marketplace",
    description:
      "Discover, buy, and sell agents, prompts, and tools. The first open marketplace for the multi-agent economy.",
    icon: Sparkles,
    href: "https://swarms.world",
    external: true,
    meta: "swarms.world",
  },
  {
    title: "Mobile App",
    description:
      "Swarms in your pocket — orchestrate agents from iOS and Android. Join the waitlist for early access.",
    icon: Smartphone,
    href: "/mobile",
    external: false,
    meta: "iOS · Android",
  },
  {
    title: "Swarms RS",
    description:
      "Memory-safe, ultra-fast Rust framework for production-grade swarms. Zero-copy message passing and concurrent workflows.",
    icon: Rocket,
    href: "https://github.com/The-Swarm-Corporation/swarms-rs",
    external: true,
    meta: "cargo add swarms-rs",
  },
  {
    title: "Swarms Chat",
    description:
      "A no-code chat interface to build, test, and deploy agent swarms through natural language — no SDK required.",
    icon: MessageCircle,
    href: "https://swarms.world/platform/chat",
    external: true,
    meta: "No-code",
  },
  {
    title: "Swarms Enterprise",
    description:
      "Dedicated infrastructure, on-premise deployments, custom SLAs and white-label options for mission-critical workloads.",
    icon: Building,
    href: "https://cal.com/swarms/swarms-strategy-session",
    external: true,
    meta: "Custom deployment",
  },
]

const featuredCode = [
  {
    lang: "Python",
    file: "workflow.py",
    code: `from swarms import Agent, SequentialWorkflow

researcher = Agent(
    agent_name="Researcher",
    system_prompt="Research the provided topic thoroughly.",
    model_name="gpt-4o",
)

writer = Agent(
    agent_name="Writer",
    system_prompt="Turn the research into a publishable blog post.",
    model_name="gpt-4o",
)

workflow = SequentialWorkflow(agents=[researcher, writer])
result = workflow.run("The future of multi-agent AI systems")
print(result)`,
  },
  {
    lang: "Swarms API",
    file: "request.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/swarm/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "name": "Financial Analysis Swarm",
        "swarm_type": "HierarchicalSwarm",
        "task": "What are the best ETFs for AI and tech?",
        "agents": [
            {
                "agent_name": "Market Analyst",
                "system_prompt": "You are a financial analyst expert.",
                "model_name": "gpt-4o",
            },
            {
                "agent_name": "Economic Forecaster",
                "system_prompt": "You are an expert in economic forecasting.",
                "model_name": "gpt-4o",
            },
        ],
    },
)

print(response.json())`,
  },
  {
    lang: "Rust",
    file: "main.rs",
    code: `use anyhow::Result;
use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    let client = OpenAI::new(std::env::var("OPENAI_API_KEY")?)
        .set_model("gpt-4o");

    let planner = client
        .agent_builder()
        .agent_name("Planner")
        .system_prompt("Plan the work into clear steps.")
        .build();

    let solver = client
        .agent_builder()
        .agent_name("Solver")
        .system_prompt("Execute the plan and return the answer.")
        .build();

    let workflow = ConcurrentWorkflow::builder()
        .name("ConcurrentWorkflow")
        .description("Two agents collaborating concurrently.")
        .agents(vec![Box::new(planner), Box::new(solver)])
        .build();

    let result = workflow.run("How to learn Rust efficiently?").await?;
    println!("{}", serde_json::to_string_pretty(&result)?);
    Ok(())
}`,
  },
]

const pillars = [
  {
    icon: Shield,
    title: "Security",
    description:
      "Encrypted transport, scoped API keys, SOC 2 controls, audit logging, and on-premise deployments for data sovereignty.",
  },
  {
    icon: Layers,
    title: "Scale",
    description:
      "Sub-millisecond agent init, 10,000+ concurrent agents, multi-region deployment, and zero-copy message passing.",
  },
  {
    icon: Activity,
    title: "Reliability",
    description:
      "99.9% platform uptime, automatic retries with exponential backoff, fault-tolerant orchestration, and full telemetry.",
  },
  {
    icon: Headphones,
    title: "Support",
    description:
      "24/7 Premium support via email and Discord, dedicated engineering contact for Enterprise, and an active community.",
  },
]

function CodePanel({ file, code }: { file: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
        <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{file}</span>
      </div>
      <div className="overflow-x-auto p-4 sm:p-5">
        <pre className="font-mono text-[11px] font-normal leading-relaxed text-white/70 sm:text-[12.5px]">
          <code>{code}</code>
        </pre>
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

function ProductLink({
  product,
  children,
  className,
}: {
  product: ProductCard
  children: React.ReactNode
  className?: string
}) {
  if (product.external) {
    return (
      <a href={product.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={product.href} className={className}>
      {children}
    </Link>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                The complete multi-agent stack
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Products
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Frameworks, APIs, marketplaces, and infrastructure for building the agent economy.
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
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    Get started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Documentation
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

        {/* PRODUCT GRID */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="The suite"
              title="One stack. End-to-end agent infrastructure."
              description="Pick the surface that fits your team — Python, Rust, REST, hosted, on-prem, or no-code."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {productCards.map((product) => (
                <ProductLink
                  key={product.title}
                  product={product}
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-2">
                    <product.icon
                      className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white sm:text-lg">
                      {product.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {product.description}
                    </p>
                    <div className="mt-4 font-mono text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                      {product.meta}
                    </div>
                  </div>
                </ProductLink>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FEATURED CODE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                className="space-y-5 lg:sticky lg:top-32 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Same swarm. Any language.
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Ship in your stack.
                </h2>
                <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Idiomatic SDKs in Python and Rust, plus a hosted REST API for any language. The same agents,
                  the same swarms, the same runtime.
                </p>
                <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                  <Button
                    className="h-10 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200"
                    asChild
                  >
                    <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                      Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 rounded-full border-white/[0.14] bg-[#0a0a0a] px-5 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    asChild
                  >
                    <Link href="/api">
                      API reference
                      <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                    </Link>
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
                <CodeTabs examples={featuredCode} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY SWARMS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Built for production"
              title="The foundations every team needs"
              description="Security, scale, reliability, and support — built into every product in the suite."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {pillars.map((pillar) => (
                <div
                  key={pillar.title}
                  className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <pillar.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-white">{pillar.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{pillar.description}</p>
                </div>
              ))}
            </motion.div>
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
                  Pick a product. Ship a swarm.
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Open-source frameworks. Hosted APIs. Enterprise deployments. The stack is yours.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    Talk to sales
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
