"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Github,
  Code,
  Sparkles,
  Rocket,
  MessageCircle,
  DollarSign,
  Smartphone,
  Building,
  Shield,
  Layers,
  Activity,
  Headphones,
  Package,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
    title: "ATP",
    description:
      "The Agent Trade Protocol. An open standard for autonomous agents to discover, negotiate, and transact with each other.",
    icon: DollarSign,
    href: "/atp",
    external: false,
    meta: "Agent Trade Protocol",
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
    href: "https://cal.com/swarms",
    external: true,
    meta: "Custom deployment",
  },
]

const featuredCode = [
  {
    lang: "Python",
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

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/40">code</span>
      </div>
      <div className="overflow-x-auto">
        <pre className="px-4 py-5 sm:px-6 sm:py-6 font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/85 whitespace-pre">
          {code}
        </pre>
      </div>
    </div>
  )
}

function CodeTabs({ examples, defaultLang }: { examples: { lang: string; code: string }[]; defaultLang?: string }) {
  const initial = defaultLang ?? examples[0].lang
  return (
    <Tabs defaultValue={initial} className="w-full">
      <TabsList className="mb-4 flex w-full flex-wrap justify-start gap-1 bg-white/[0.03] border border-white/10 p-1 rounded-xl h-auto">
        {examples.map((ex) => (
          <TabsTrigger
            key={ex.lang}
            value={ex.lang}
            className="text-xs sm:text-sm font-medium text-white/60 data-[state=active]:bg-white/10 data-[state=active]:text-white data-[state=active]:border-white/20 border border-transparent rounded-lg px-3 py-1.5 transition-all"
          >
            {ex.lang}
          </TabsTrigger>
        ))}
      </TabsList>
      {examples.map((ex) => (
        <TabsContent key={ex.lang} value={ex.lang} className="mt-0">
          <CodeBlock code={ex.code} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`max-w-3xl ${alignClass} space-y-2.5 sm:space-y-4 md:space-y-5 mb-8 sm:mb-14 md:mb-20 px-1 sm:px-0`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 sm:gap-3 ${align === "center" ? "justify-center" : ""}`}>
          {align === "center" && <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/20" />}
          <p className="text-[10px] sm:text-xs text-white/55 tracking-[0.22em] uppercase font-semibold">
            <span className="text-white font-bold">{eyebrow}</span>
          </p>
          {align === "center" && <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/20" />}
        </div>
      )}
      <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-3xl font-normal leading-relaxed">
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

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px] overflow-x-hidden">
        {/* HERO */}
        <section className="relative overflow-hidden bg-black sm:min-h-[80vh] flex items-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(239,68,68,0.10)_0%,_rgba(0,0,0,0)_60%)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto text-center space-y-5 sm:space-y-8 md:space-y-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[11px] sm:text-sm text-white/70 font-medium">
                  The complete multi-agent stack
                </span>
              </div>

              <h1
                className="font-bold leading-[0.9] tracking-tight text-red-500 break-words"
                style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)", fontFamily: "var(--font-orbitron)" }}
              >
                Products
              </h1>

              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-medium leading-snug sm:leading-tight px-1 sm:px-0">
                Frameworks, APIs, marketplaces, and infrastructure for building the agent economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-2xl mx-auto pt-2">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3.5 sm:py-6 md:py-7 h-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get started
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3.5 sm:py-6 md:py-7 h-auto bg-transparent backdrop-blur-sm"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Read the docs
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-black py-10 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 md:p-8"
                >
                  <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-1 sm:mb-2 break-words">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-sm md:text-base text-white/55 font-medium leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PRODUCT GRID */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="The suite"
              title="One stack. End-to-end agent infrastructure."
              description="Pick the surface that fits your team — Python, Rust, REST, hosted, on-prem, or no-code."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
              {productCards.map((product, i) => (
                <motion.div
                  key={product.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <ProductLink
                    product={product}
                    className="block h-full"
                  >
                    <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:scale-[1.01] hover:shadow-2xl hover:shadow-white/5">
                      <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-5 md:gap-6 min-h-0 sm:min-h-[280px] md:min-h-[300px]">
                        <div className="flex items-start justify-between gap-2">
                          <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-500">
                            <product.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
                          </div>
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white/30 group-hover:text-white group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1" />
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-snug">
                            {product.title}
                          </h3>
                          <p className="text-white/65 text-[13px] sm:text-base leading-relaxed flex-1">
                            {product.description}
                          </p>
                          <div className="mt-3 sm:mt-5 inline-flex items-center font-mono text-[10px] sm:text-xs text-white/50 group-hover:text-white/75 transition-colors break-all">
                            {product.meta}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ProductLink>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED CODE */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-6 sm:gap-10 md:gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-4 sm:space-y-6 lg:sticky lg:top-32 min-w-0"
              >
                <p className="text-[10px] sm:text-xs text-white font-bold tracking-[0.22em] uppercase">
                  Same swarm. Any language.
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Ship in&nbsp;
                  <span className="text-red-500">your stack</span>.
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 leading-relaxed">
                  Idiomatic SDKs in Python and Rust, plus a hosted REST API for any language. The same agents, the same swarms, the same runtime.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button
                    className="bg-white text-black hover:bg-white/90 font-bold w-full sm:w-auto"
                    asChild
                  >
                    <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Documentation
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/api">
                      <Code className="h-4 w-4 mr-2" />
                      API reference
                    </Link>
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-3 min-w-0 w-full"
              >
                <CodeTabs examples={featuredCode} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY SWARMS */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Built for production"
              title="The foundations every team needs"
              description="Security, scale, reliability, and support — built into every product in the suite."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 md:gap-6">
              {pillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 md:p-8"
                >
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-3 sm:mb-5">
                    <pillar.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2 leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-white/65 text-[13px] sm:text-base leading-relaxed">
                    {pillar.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(239,68,68,0.12)_0%,_rgba(0,0,0,0)_55%)]"
              />
              <div className="relative z-10 px-5 sm:px-10 md:px-14 py-10 sm:py-16 md:py-20 text-center space-y-5 sm:space-y-8">
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Pick a product. Ship a swarm.
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Open-source frameworks. Hosted APIs. Enterprise deployments. The stack is yours.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center pt-2">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3.5 sm:py-6 md:py-7 h-auto"
                    asChild
                  >
                    <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                      Get started
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3.5 sm:py-6 md:py-7 h-auto bg-transparent backdrop-blur-sm"
                    asChild
                  >
                    <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                      Talk to sales
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
