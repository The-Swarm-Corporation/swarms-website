"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Star } from "lucide-react"
import { useGithubStars } from "@/hooks/use-github-stars"
import { formatStarsShort } from "@/lib/github-stars"
import Image from "next/image"
import Link from "next/link"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const swarmsStack = [
  {
    title: "Swarms Python",
    github: "kyegomez/swarms",
    subtitle: "Core Framework",
    file: "workflow.py",
    description:
      "The original Swarms framework in Python with full backwards compatibility with LangChain, AutoGen, and other popular frameworks.",
    link: "https://github.com/kyegomez/swarms",
    docsLink: "https://docs.swarms.world",
    code: `from swarms import Agent, SequentialWorkflow

# Agent 1: The Researcher
researcher = Agent(
    agent_name="Researcher",
    system_prompt="Your job is to research...",
    model_name="gpt-4o-mini",
)

# Agent 2: The Writer
writer = Agent(
    agent_name="Writer",
    system_prompt="Your job is to write...",
    model_name="gpt-4o-mini",
)

# Create workflow
workflow = SequentialWorkflow(
    agents=[researcher, writer]
)
final_post = workflow.run("AI history")`,
  },
  {
    title: "Swarms API",
    subtitle: "Swarms Cloud",
    file: "agent.py",
    description:
      "Build, deploy, and scale enterprise-grade multi-agent systems in the cloud",
    link: "https://docs.swarms.ai",
    docsLink: "https://docs.swarms.ai",
    code: `import requests

payload = {
    "agent_config": {
        "agent_name": "Research Analyst",
        "description": "Expert in analyzing research data",
        "system_prompt": "You are a Research Analyst...",
        "model_name": "gpt-4o-mini",
        "max_tokens": 8192,
        "temperature": 0.7
    },
    "task": "Analyze the impact of AI on healthcare"
}

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": "your-api-key"},
    json=payload
)`,
  },
  {
    title: "Swarms-RS",
    github: "The-Swarm-Corporation/swarms-rs",
    subtitle: "Rust Framework",
    file: "main.rs",
    description:
      "Ultra-fast, memory-safe, and production-ready multi-agent framework built in Rust for maximum performance and reliability.",
    link: "https://crates.io/crates/swarms-rs",
    docsLink: "https://docs.rs/swarms-rs/latest/swarms_rs/",
    code: `use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    let client = OpenAI::from_url(
        base_url, api_key
    ).set_model("deepseek-chat");

    let workflow = ConcurrentWorkflow::builder()
        .name("Trading Strategy")
        .agents(vec![...])
        .build();

    let result = workflow
        .run("BTC/USD").await?;
    Ok(())
}`,
  },
  {
    title: "Swarms Marketplace",
    subtitle: "Buy & Sell Agents",
    description:
      "Discover, buy, and sell agents, prompts, tools, and components on swarms.world — the premier marketplace for AI agents.",
    link: "https://swarms.world",
    docsLink: "https://swarms.world",
    image: "/marketplace_banner.png",
  },
]

export function HomeProducts() {
  const stars = useGithubStars()

  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto mb-8 max-w-7xl sm:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Products
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
            One stack. End-to-end agent infrastructure.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Frameworks, interfaces, and cloud services to help you build your own
            multi-agent systems.
          </p>
        </motion.div>

        <div className="mx-auto max-w-7xl">
          {swarmsStack.map((product, index) => (
            <ProductRow
              key={product.title}
              product={product}
              index={index}
              starCount={product.github ? stars[product.github] : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductRow({
  product,
  index,
  starCount,
}: {
  product: (typeof swarmsStack)[0]
  index: number
  starCount?: number
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      className="grid items-center gap-8 border-t border-white/[0.08] py-10 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-16 lg:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {/* Copy */}
      <div className={`space-y-5 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {String(index + 1).padStart(2, "0")} — {product.subtitle}
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-white sm:text-3xl md:text-4xl">
            {product.title}
          </h3>
          {starCount !== undefined && (
            <a
              href={`https://github.com/${product.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
            >
              <Star className="h-3 w-3" />
              {formatStarsShort(starCount)}
            </a>
          )}
        </div>
        <p className="max-w-xl text-base font-normal leading-relaxed text-white/50">
          {product.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Button
            className="h-10 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200"
            asChild
          >
            {product.link.startsWith("/") ? (
              <Link href={product.link}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <a href={product.link} target="_blank" rel="noopener noreferrer">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            )}
          </Button>
          <a
            href={product.docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-10 items-center gap-1.5 px-2 text-sm font-medium text-white/60 transition-colors hover:text-white"
          >
            Documentation
            <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
          </a>
        </div>
      </div>

      {/* Code / image panel */}
      <div className={`w-full min-w-0 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
        {product.image ? (
          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg border border-white/[0.08] transition-colors hover:border-white/20"
          >
            <Image
              src={product.image}
              alt={`${product.title} — ${product.subtitle}`}
              width={800}
              height={600}
              className="h-auto w-full object-cover"
              loading="lazy"
            />
          </a>
        ) : (
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="ml-3 font-mono text-[11px] font-normal text-white/40">
                {product.file}
              </span>
            </div>
            <div className="overflow-x-auto p-4 sm:p-5">
              <pre className="font-mono text-[11px] font-normal leading-relaxed text-white/70 sm:text-[12.5px]">
                <code>{product.code}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}
