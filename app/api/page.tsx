"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  Network,
  Shield,
  Code,
  CheckCircle,
  Database,
  Activity,
  BarChart3,
  Brain,
  Wrench,
  Puzzle,
  ChevronDown,
  Layers,
  Key,
  Github,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stats = [
  { value: "15+", label: "Multi-agent architectures" },
  { value: "1,000+", label: "Models supported" },
  { value: "500+", label: "Agents per API request" },
  { value: "<1ms", label: "Agent init time" },
]

const capabilities = [
  {
    icon: Network,
    title: "Multi-agent orchestration",
    description:
      "Sequential, concurrent, hierarchical, group-chat and custom topologies — handled by the runtime, not your code.",
  },
  {
    icon: Brain,
    title: "Shared memory",
    description:
      "Persistent, scoped memory across agents so swarms can collaborate, branch, and reason over long horizons.",
  },
  {
    icon: Wrench,
    title: "Pre-built tools",
    description:
      "Web search, scraping, finance, document processing, code execution and dozens more — ready out of the box.",
  },
  {
    icon: Database,
    title: "1,000+ models",
    description:
      "OpenAI, Anthropic, Gemini, Groq, open-weight providers and hundreds more behind a single interface.",
  },
  {
    icon: Puzzle,
    title: "MCP protocol",
    description:
      "Connect Notion, Supabase, GitHub or any internal system through the Model Context Protocol.",
  },
  {
    icon: Activity,
    title: "Streaming responses",
    description:
      "Token-by-token streaming for low-latency UX and live progress on long-running swarm executions.",
  },
  {
    icon: Zap,
    title: "Rust runtime",
    description:
      "Sub-millisecond initialization and zero-copy message passing built on a Rust-optimized core.",
  },
  {
    icon: Shield,
    title: "Enterprise infrastructure",
    description:
      "Multi-region deployment, fault-tolerant retries, SOC 2 controls and encrypted transport by default.",
  },
  {
    icon: BarChart3,
    title: "Telemetry & logs",
    description:
      "Per-agent traces, token accounting, latency metrics and structured logs for full observability.",
  },
]

const agentExamples = [
  {
    lang: "Python",
    file: "agent.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "agent_config": {
            "agent_name": "Research Analyst",
            "system_prompt": "You are a senior research analyst.",
            "model_name": "gpt-4o",
            "max_tokens": 8192,
            "temperature": 0.5,
        },
        "task": "Summarize the state of multi-agent AI in 2025.",
    },
)

print(response.json())`,
  },
  {
    lang: "cURL",
    file: "agent.sh",
    code: `curl -X POST https://api.swarms.world/v1/agent/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_config": {
      "agent_name": "Research Analyst",
      "system_prompt": "You are a senior research analyst.",
      "model_name": "gpt-4o",
      "max_tokens": 8192,
      "temperature": 0.5
    },
    "task": "Summarize the state of multi-agent AI in 2025."
  }'`,
  },
  {
    lang: "JavaScript",
    file: "agent.js",
    code: `const res = await fetch("https://api.swarms.world/v1/agent/completions", {
  method: "POST",
  headers: {
    "x-api-key": process.env.SWARMS_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agent_config: {
      agent_name: "Research Analyst",
      system_prompt: "You are a senior research analyst.",
      model_name: "gpt-4o",
      max_tokens: 8192,
      temperature: 0.5,
    },
    task: "Summarize the state of multi-agent AI in 2025.",
  }),
})

console.log(await res.json())`,
  },
]

const swarmExamples = [
  {
    lang: "Python SDK",
    file: "swarm.py",
    code: `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

response = client.swarms.run(
    name="Medical Analysis Swarm",
    description="Analyzes symptoms and recommends ICD codes",
    swarm_type="ConcurrentWorkflow",
    task="45-year-old female with chest pain. Analyze and provide ICD codes.",
    agents=[
        {
            "agent_name": "Symptom Analyzer",
            "system_prompt": "You analyze patient symptoms and surface key indicators.",
            "model_name": "gpt-4o",
            "temperature": 0.3,
        },
        {
            "agent_name": "ICD Code Specialist",
            "system_prompt": "You map symptoms to ICD codes with rationale.",
            "model_name": "gpt-4o",
            "temperature": 0.2,
        },
    ],
)

print(response)`,
  },
  {
    lang: "Python REST",
    file: "swarm_rest.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/swarm/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "name": "Market Research Swarm",
        "swarm_type": "MixtureOfAgents",
        "task": "Build a quarterly outlook for the semiconductor sector.",
        "agents": [
            {
                "agent_name": "Macro Analyst",
                "model_name": "gpt-4o",
                "system_prompt": "You are a macroeconomic analyst.",
            },
            {
                "agent_name": "Equity Analyst",
                "model_name": "claude-3-5-sonnet",
                "system_prompt": "You are an equity research analyst.",
            },
        ],
    },
)

print(response.json())`,
  },
  {
    lang: "cURL",
    file: "swarm.sh",
    code: `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Market Research Swarm",
    "swarm_type": "MixtureOfAgents",
    "task": "Build a quarterly outlook for the semiconductor sector.",
    "agents": [
      { "agent_name": "Macro Analyst", "model_name": "gpt-4o" },
      { "agent_name": "Equity Analyst", "model_name": "claude-3-5-sonnet" }
    ]
  }'`,
  },
  {
    lang: "JavaScript",
    file: "swarm.js",
    code: `const res = await fetch("https://api.swarms.world/v1/swarm/completions", {
  method: "POST",
  headers: {
    "x-api-key": process.env.SWARMS_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Market Research Swarm",
    swarm_type: "MixtureOfAgents",
    task: "Build a quarterly outlook for the semiconductor sector.",
    agents: [
      { agent_name: "Macro Analyst", model_name: "gpt-4o" },
      { agent_name: "Equity Analyst", model_name: "claude-3-5-sonnet" },
    ],
  }),
})

console.log(await res.json())`,
  },
]

const swarmTypes = [
  "SequentialWorkflow",
  "ConcurrentWorkflow",
  "HierarchicalSwarm",
  "MixtureOfAgents",
  "GroupChat",
  "MajorityVoting",
  "AgentRearrange",
  "MultiAgentRouter",
  "AutoSwarmBuilder",
  "HeavySwarm",
  "DebateWithJudge",
  "RoundRobin",
  "PlannerWorkerSwarm",
  "CouncilAsAJudge",
  "BatchedGridWorkflow",
  "auto",
]

const sdks = [
  {
    name: "Python",
    install: "pip install swarms-client",
    repo: "https://github.com/The-Swarm-Corporation/swarms-client",
  },
  {
    name: "TypeScript / Node",
    install: "npm install swarms-ts",
    repo: "https://github.com/The-Swarm-Corporation/swarms-ts",
  },
  {
    name: "Go",
    install: "go get github.com/The-Swarm-Corporation/swarms-client-go",
    repo: "https://github.com/The-Swarm-Corporation/swarms-client-go",
  },
  {
    name: "Java",
    install: "implementation 'world.swarms:swarms-java'",
    repo: "https://github.com/The-Swarm-Corporation/swarms-java",
  },
]

type PricingTier = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  highlight?: boolean
}

const pricingTiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "Pay only for what you use",
    description: "Get started with AI. No fees — perfect for prototyping.",
    features: [
      "100 requests / minute",
      "1,200 requests / day",
      "200K tokens per agent",
      "10 agents per batch",
      "Community support",
    ],
    cta: { label: "Get API key", href: "https://cloud.swarms.world/api-keys" },
  },
  {
    name: "Pro",
    price: "$19.99",
    cadence: "per month",
    description: "For professionals who need more power and features.",
    features: [
      "Higher rate limits than Free",
      "Pay-as-you-go usage credits",
      "Priority queue access",
      "Email support",
      "All standard features",
    ],
    cta: { label: "Upgrade to Pro", href: "https://swarms.world/platform/account?tab=subscription" },
  },
  {
    name: "Premium",
    price: "$100",
    cadence: "per month · or $1,020/yr (save 15%)",
    description: "Production workloads with priority access.",
    highlight: true,
    features: [
      "2,000 requests / minute",
      "100,000 requests / day",
      "2M tokens per agent",
      "500 agents per batch",
      "Priority availability zones",
      "24/7 email & Discord support",
    ],
    cta: { label: "Upgrade to Premium", href: "https://swarms.world/platform/account?tab=subscription" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "Tailored to your scale",
    description: "Dedicated infrastructure, on-premise, and SLAs.",
    features: [
      "Custom rate limits",
      "Dedicated capacity",
      "On-premise deployment available",
      "Custom SLAs & integration support",
      "White-label options",
    ],
    cta: { label: "Talk to sales", href: "https://cal.com/swarms/swarms-strategy-session" },
  },
]

const faqs = [
  {
    question: "What makes Swarms different from a single-agent API?",
    answer:
      "Swarms is the only API purpose-built for orchestrating many agents in one request. You describe the topology, the agents, and the task — the runtime handles routing, memory, retries, and aggregation. You ship multi-agent workflows in minutes instead of building the plumbing yourself.",
  },
  {
    question: "Which models can I use?",
    answer:
      "1,000+ models including OpenAI (GPT-4o, o-series), Anthropic (Claude), Google (Gemini), Groq, and a long tail of open-weight providers. You pass a model_name per agent — each agent in a swarm can use a different model.",
  },
  {
    question: "Can I start free and upgrade later?",
    answer:
      "Yes. The Free tier covers 100 req/min and 1,200 req/day with no card required. Upgrade to Pro or Premium any time from your platform subscription page — your existing API key is preserved and the new limits apply immediately with no downtime.",
  },
  {
    question: "How does multi-agent orchestration work?",
    answer:
      "Pick a swarm_type (SequentialWorkflow, ConcurrentWorkflow, HierarchicalSwarm, MixtureOfAgents, GroupChat, and more), pass a list of agent configs and a task. The runtime instantiates each agent on a Rust core, shares memory according to the topology, and returns the aggregated result.",
  },
  {
    question: "Is there an on-premise option?",
    answer:
      "Yes. On-premise is available under our Enterprise tier — full stack as Docker images, source access, unlimited usage, and an enterprise license with priority updates. Ideal for regulated environments and data-sovereignty requirements. Contact sales to scope a deployment.",
  },
  {
    question: "What happens when I exceed rate limits?",
    answer:
      "You'll receive HTTP 429 with retry-after headers. Premium tiers raise the ceiling 20×; Enterprise removes it entirely. The SDKs include automatic retry with exponential backoff.",
  },
  {
    question: "How is the API secured?",
    answer:
      "Encrypted transport, scoped API keys, audit logging, multi-region redundancy, and SOC 2 controls. On-Premise deployments give you full control of keys, data, and the security boundary.",
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

export default function APIPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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
                Production multi-agent infrastructure
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Swarms API
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                The only API for orchestrating multi-agent systems at production scale.
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
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    Get API key
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.ai" target="_blank" rel="noopener noreferrer">
                    Read the docs
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

        {/* CAPABILITIES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything you need to ship agents in production"
              description="A complete multi-agent stack — orchestration, memory, tooling, and observability — behind one API."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {capabilities.map((cap) => (
                <div
                  key={cap.title}
                  className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <cap.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-white">{cap.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{cap.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* QUICKSTART - SINGLE AGENT */}
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
                  Quickstart
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Your first agent in three lines.
                </h2>
                <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Sign up, drop in your API key, and call{" "}
                  <code className="font-mono text-white/85">/v1/agent/completions</code>. No infrastructure to
                  provision.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: Key, text: "Generate an API key on the platform" },
                    { icon: Code, text: "Install the SDK or call the REST endpoint" },
                    { icon: CheckCircle, text: "Run agents — we handle the runtime" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black">
                        <step.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                      </div>
                      <p className="pt-1 text-sm font-normal leading-relaxed text-white/70 sm:text-base">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="min-w-0 w-full lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <CodeTabs examples={agentExamples} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* MULTI-AGENT EXAMPLE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Multi-agent"
              title="One request. A whole swarm."
              description="Describe the topology and the agents — Swarms handles routing, memory, and aggregation."
            />

            <div className="mx-auto min-w-0 max-w-7xl">
              <CodeTabs examples={swarmExamples} defaultLang="Python SDK" />

              <motion.div
                className="mt-8 sm:mt-10 md:mt-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <div className="mb-5 flex items-center gap-3">
                  <Layers className="h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.5} />
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    Available swarm topologies
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {swarmTypes.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 font-mono text-xs text-white/60 transition-colors hover:border-white/25 hover:text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SDKs */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Official SDKs"
              title="Native clients for every stack"
              description="Type-safe, idiomatic, production-ready libraries maintained by the Swarms team."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {sdks.map((sdk) => (
                <a
                  key={sdk.name}
                  href={sdk.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between gap-2">
                    <h3 className="truncate text-sm font-medium text-white sm:text-base">{sdk.name}</h3>
                    <Github className="h-4 w-4 flex-shrink-0 text-white/40 transition-colors group-hover:text-white" />
                  </div>
                  <div className="overflow-x-auto whitespace-nowrap rounded-lg border border-white/[0.08] bg-[#0a0a0a] px-3 py-2.5 font-mono text-[11px] text-white/60">
                    {sdk.install}
                  </div>
                  <div className="mt-4 flex items-center text-xs text-white/50 transition-colors group-hover:text-white">
                    View on GitHub
                    <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PRICING */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Pricing"
              title="Start free. Scale when you ship."
              description="Generous free tier. Predictable team pricing. On-premise and enterprise when you need them."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {pricingTiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col rounded-lg border p-6 transition-colors duration-300 sm:p-7 md:p-8 ${
                    tier.highlight
                      ? "border-white/20 bg-[#0a0a0a]"
                      : "border-white/[0.08] bg-black hover:bg-[#0a0a0a]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-white/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                      Most popular
                    </div>
                  )}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{tier.name}</h3>
                    <p className="text-xs leading-relaxed text-white/50 sm:text-sm">{tier.description}</p>
                  </div>
                  <div className="mb-5 border-b border-white/[0.08] pb-5 sm:mb-6 sm:pb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">{tier.cadence}</p>
                  </div>
                  <ul className="mb-6 flex-1 space-y-2.5 sm:mb-8 sm:space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-white/70 sm:text-sm"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.highlight
                        ? "w-full rounded-full bg-white font-medium text-black hover:bg-neutral-200"
                        : "w-full rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }
                    variant={tier.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href={tier.cta.href} target="_blank" rel="noopener noreferrer">
                      {tier.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
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
                  Ready to ship a swarm?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Generate an API key in under a minute. Run your first multi-agent workflow before your coffee
                  gets cold.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    Get API key
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
