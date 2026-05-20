"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  Zap,
  Network,
  Shield,
  BookOpen,
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

const pricingTiers = [
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
    cta: { label: "Get API key", href: "https://swarms.world/platform/api-keys", external: true },
    highlight: false,
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
    cta: { label: "Upgrade to Pro", href: "https://swarms.world/platform/account?tab=subscription", external: true },
    highlight: false,
  },
  {
    name: "Premium",
    price: "$100",
    cadence: "per month · or $1,020/yr (save 15%)",
    description: "Production workloads with priority access.",
    features: [
      "2,000 requests / minute",
      "100,000 requests / day",
      "2M tokens per agent",
      "500 agents per batch",
      "Priority availability zones",
      "24/7 email & Discord support",
    ],
    cta: { label: "Upgrade to Premium", href: "https://swarms.world/platform/account?tab=subscription", external: true },
    highlight: true,
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
    cta: { label: "Talk to sales", href: "https://cal.com/swarms", external: true },
    highlight: false,
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

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/40">code</span>
      </div>
      <pre className="px-4 py-5 sm:px-6 sm:py-6 font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed text-white/85 whitespace-pre">
        {code}
      </pre>
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
      className={`max-w-3xl ${alignClass} space-y-3 sm:space-y-4 md:space-y-5 mb-10 sm:mb-14 md:mb-20 px-2 sm:px-0`}
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
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl font-normal leading-relaxed">
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
        <section className="relative overflow-hidden bg-black min-h-[80vh] flex items-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(239,68,68,0.10)_0%,_rgba(0,0,0,0)_60%)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-white/70 font-medium">
                  Production multi-agent infrastructure
                </span>
              </div>

              <h1
                className="font-bold leading-[0.9] tracking-tight text-red-500"
                style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)", fontFamily: "var(--font-orbitron)" }}
              >
                Swarms API
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-medium leading-tight px-2 sm:px-0">
                The only API for orchestrating multi-agent systems at production scale.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-2xl mx-auto pt-2">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                  asChild
                >
                  <a href="https://swarms.world/platform/api-keys" target="_blank" rel="noopener noreferrer">
                    <Key className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get API key
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
                  asChild
                >
                  <a href="https://docs.swarms.ai" target="_blank" rel="noopener noreferrer">
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
        <section className="bg-black py-12 sm:py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 md:p-8"
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-1.5 sm:mb-2">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base text-white/55 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything you need to ship agents in production"
              description="A complete multi-agent stack — orchestration, memory, tooling, and observability — behind one API."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative h-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:scale-[1.01] hover:shadow-2xl hover:shadow-white/5">
                    <div className="relative z-10 p-5 sm:p-6 md:p-8 flex flex-col gap-4 sm:gap-5 md:gap-6 min-h-[220px] sm:min-h-[240px] md:min-h-[260px]">
                      <div className="flex items-start">
                        <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-500">
                          <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2">
                          {cap.title}
                        </h3>
                        <p className="text-white/65 text-sm sm:text-base leading-relaxed">
                          {cap.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* QUICKSTART - SINGLE AGENT */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-5 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="lg:col-span-2 space-y-4 sm:space-y-6"
              >
                <p className="text-[10px] sm:text-xs text-white font-bold tracking-[0.22em] uppercase">
                  Quickstart
                </p>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Your first agent in&nbsp;
                  <span className="text-red-500">three lines</span>.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/60 leading-relaxed">
                  Sign up, drop in your API key, and call <code className="font-mono text-white/85">/v1/agent/completions</code>. No infrastructure to provision.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: Key, text: "Generate an API key on the platform" },
                    { icon: Code, text: "Install the SDK or call the REST endpoint" },
                    { icon: CheckCircle, text: "Run agents — we handle the runtime" },
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-0.5 h-8 w-8 flex-shrink-0 flex items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
                        <step.icon className="h-4 w-4 text-red-500" />
                      </div>
                      <p className="text-sm sm:text-base text-white/80 leading-relaxed pt-1">
                        {step.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="lg:col-span-3"
              >
                <CodeTabs examples={agentExamples} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* MULTI-AGENT EXAMPLE */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Multi-agent"
              title={
                <>
                  One request. <span className="text-red-500">A whole swarm.</span>
                </>
              }
              description="Describe the topology and the agents — Swarms handles routing, memory, and aggregation."
            />

            <div className="max-w-7xl mx-auto">
              <CodeTabs examples={swarmExamples} defaultLang="Python SDK" />

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mt-8 sm:mt-10 md:mt-12"
              >
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <Layers className="h-4 w-4 text-red-500" />
                  <p className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-white">
                    Available swarm topologies
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  {swarmTypes.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs sm:text-sm font-mono text-white/75 hover:border-white/25 hover:bg-white/[0.06] hover:text-white transition-all"
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
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Official SDKs"
              title="Native clients for every stack"
              description="Type-safe, idiomatic, production-ready libraries maintained by the Swarms team."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {sdks.map((sdk, i) => (
                <motion.a
                  key={sdk.name}
                  href={sdk.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="group block rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <h3 className="text-base sm:text-lg font-semibold text-white">{sdk.name}</h3>
                    <Github className="h-4 w-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div className="rounded-lg border border-white/10 bg-black/50 px-3 py-2.5 font-mono text-[11px] sm:text-xs text-white/75 overflow-x-auto whitespace-nowrap">
                    {sdk.install}
                  </div>
                  <div className="mt-4 flex items-center text-xs sm:text-sm text-white/50 group-hover:text-white transition-colors">
                    View on GitHub
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Pricing"
              title="Start free. Scale when you ship."
              description="Generous free tier. Predictable team pricing. On-premise and enterprise when you need them."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {pricingTiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col rounded-2xl sm:rounded-3xl border backdrop-blur-sm p-6 sm:p-7 md:p-8 ${
                    tier.highlight
                      ? "border-red-500/40 bg-gradient-to-b from-red-500/[0.06] to-white/[0.02]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-300">
                      Most popular
                    </div>
                  )}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{tier.name}</h3>
                    <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                      {tier.description}
                    </p>
                  </div>
                  <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                        {tier.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">{tier.cadence}</p>
                  </div>
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 leading-relaxed">
                        <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.highlight
                        ? "bg-white text-black hover:bg-white/90 font-bold w-full"
                        : "border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal w-full"
                    }
                    variant={tier.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a
                      href={tier.cta.href}
                      target={tier.cta.external ? "_blank" : undefined}
                      rel={tier.cta.external ? "noopener noreferrer" : undefined}
                    >
                      {tier.cta.label}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="FAQ"
              title="Common questions"
            />

            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-red-500" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-white/65 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(239,68,68,0.12)_0%,_rgba(0,0,0,0)_55%)]"
              />
              <div className="relative z-10 px-6 sm:px-10 md:px-14 py-12 sm:py-16 md:py-20 text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Ready to ship a swarm?
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Generate an API key in under a minute. Run your first multi-agent workflow before your coffee gets cold.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center pt-2">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                    asChild
                  >
                    <a href="https://swarms.world/platform/api-keys" target="_blank" rel="noopener noreferrer">
                      Get API key
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
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
