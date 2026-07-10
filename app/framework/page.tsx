"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Code,
  Star,
  Download,
  Users,
  Network,
  Brain,
  Wrench,
  Database,
  Activity,
  Layers,
  Shield,
  Workflow,
  Cpu,
  GitBranch,
  Boxes,
  Terminal,
  CheckCircle,
  ChevronDown,
  Building,
  Heart,
  Server,
  Rocket,
  Sparkles,
  FileText,
  PlayCircle,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGithubStars } from "@/hooks/use-github-stars"
import { formatStarsLong } from "@/lib/github-stars"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const heroBadges = [
  { label: "Python 3.10+", icon: Terminal },
  { label: "Apache 2.0", icon: Heart },
  { label: "Production grade", icon: Shield },
]

const capabilities = [
  {
    icon: Network,
    title: "Multi-agent orchestration",
    description:
      "Sequential, concurrent, hierarchical, group-chat, mixture-of-agents and 15+ swarm topologies — composable in pure Python.",
  },
  {
    icon: Brain,
    title: "Provider-agnostic models",
    description:
      "1,000+ models from OpenAI, Anthropic, Gemini, Groq, DeepSeek, Cohere, Ollama, vLLM and any OpenAI-compatible endpoint.",
  },
  {
    icon: Wrench,
    title: "Tools & function calling",
    description:
      "Structured outputs, parallel tool use, retries, and built-in tools for web search, finance, code execution, browsing and more.",
  },
  {
    icon: Database,
    title: "Memory & RAG",
    description:
      "Long-term memory, vector store integrations (Chroma, Pinecone, FAISS, Qdrant) and document loaders out of the box.",
  },
  {
    icon: Boxes,
    title: "MCP & integrations",
    description:
      "First-class Model Context Protocol support — connect Notion, Supabase, GitHub, or any MCP server to your agents.",
  },
  {
    icon: Activity,
    title: "Observability",
    description:
      "Structured logging, per-agent telemetry, token accounting and tracing — drop-in compatibility with OpenTelemetry.",
  },
  {
    icon: Cpu,
    title: "Concurrency built-in",
    description:
      "Async-first runtime with thread, process and asyncio pools. Run thousands of agents in parallel from a single process.",
  },
  {
    icon: Workflow,
    title: "Composable workflows",
    description:
      "Drop agents into any workflow primitive. Mix swarm types, share state, and branch dynamically at runtime.",
  },
  {
    icon: Shield,
    title: "Production hardening",
    description:
      "Type-safe configs (Pydantic v2), exponential-backoff retries, fault isolation, and battle-tested in production deployments.",
  },
]

const architectures = [
  {
    name: "SequentialWorkflow",
    description: "Run agents one after another, passing state forward.",
    icon: GitBranch,
  },
  {
    name: "ConcurrentWorkflow",
    description: "Fan out agents in parallel, gather their outputs.",
    icon: Layers,
  },
  {
    name: "HierarchicalSwarm",
    description: "A director agent decomposes work to specialist workers.",
    icon: Network,
  },
  {
    name: "MixtureOfAgents",
    description: "Multiple agents independently solve, an aggregator merges.",
    icon: Boxes,
  },
  {
    name: "GroupChat",
    description: "Agents collaborate in a shared conversation loop.",
    icon: Users,
  },
  {
    name: "MajorityVoting",
    description: "Agents vote; the consensus answer wins.",
    icon: CheckCircle,
  },
  {
    name: "AgentRearrange",
    description: "Dynamically rearrange flow based on runtime signals.",
    icon: Workflow,
  },
  {
    name: "HeavySwarm",
    description: "Large fan-out swarms for high-recall research tasks.",
    icon: Cpu,
  },
  {
    name: "DebateWithJudge",
    description: "Agents debate; a judge agent decides the winner.",
    icon: Brain,
  },
  {
    name: "AutoSwarmBuilder",
    description: "LLM designs and instantiates the swarm for the task.",
    icon: Sparkles,
  },
  {
    name: "RoundRobin",
    description: "Cycle agents in turn — predictable, fair scheduling.",
    icon: GitBranch,
  },
  {
    name: "CouncilAsAJudge",
    description: "A council of judges scores and ranks candidate outputs.",
    icon: Users,
  },
]

const codeExamples = [
  {
    lang: "Install",
    file: "install.sh",
    code: `# pip
pip install -U swarms

# or with uv
uv pip install -U swarms

# verify
python -c "import swarms; print(swarms.__version__)"`,
  },
  {
    lang: "Single Agent",
    file: "agent.py",
    code: `from swarms import Agent

agent = Agent(
    agent_name="Financial-Analyst",
    system_prompt="You are a senior financial analyst.",
    model_name="gpt-4o",
    max_loops=1,
    temperature=0.2,
)

response = agent.run(
    "Analyze the macro outlook for the semiconductor sector in 2026."
)
print(response)`,
  },
  {
    lang: "Sequential",
    file: "sequential.py",
    code: `from swarms import Agent, SequentialWorkflow

researcher = Agent(
    agent_name="Researcher",
    system_prompt="Research the topic and surface key facts.",
    model_name="gpt-4o",
)

writer = Agent(
    agent_name="Writer",
    system_prompt="Turn research into a publishable brief.",
    model_name="gpt-4o",
)

editor = Agent(
    agent_name="Editor",
    system_prompt="Tighten tone, fix structure, ship-ready output.",
    model_name="claude-3-5-sonnet",
)

workflow = SequentialWorkflow(agents=[researcher, writer, editor])
result = workflow.run("The future of multi-agent AI in finance")
print(result)`,
  },
  {
    lang: "Concurrent",
    file: "concurrent.py",
    code: `from swarms import Agent
from swarms.structs.concurrent_workflow import ConcurrentWorkflow

macro = Agent(
    agent_name="Macro-Analyst",
    system_prompt="You analyze macroeconomic trends.",
    model_name="gpt-4o",
)

equity = Agent(
    agent_name="Equity-Analyst",
    system_prompt="You analyze company fundamentals.",
    model_name="claude-3-5-sonnet",
)

quant = Agent(
    agent_name="Quant-Analyst",
    system_prompt="You analyze price action and signals.",
    model_name="gpt-4o",
)

workflow = ConcurrentWorkflow(agents=[macro, equity, quant])
print(workflow.run("Quarterly outlook for NVDA"))`,
  },
  {
    lang: "Hierarchical",
    file: "hierarchical.py",
    code: `from swarms import Agent
from swarms.structs.hiearchical_swarm import HierarchicalSwarm

director = Agent(
    agent_name="Director",
    system_prompt="Plan and delegate research tasks.",
    model_name="gpt-4o",
)

workers = [
    Agent(
        agent_name=f"Worker-{i}",
        system_prompt="Execute the assigned research subtask.",
        model_name="gpt-4o",
    )
    for i in range(3)
]

swarm = HierarchicalSwarm(
    name="Research Swarm",
    director=director,
    agents=workers,
    max_loops=2,
)
print(swarm.run("Build a 2026 outlook for AI infrastructure."))`,
  },
  {
    lang: "Tools",
    file: "tools.py",
    code: `from swarms import Agent
from swarms_tools import yahoo_finance_api, exa_search

agent = Agent(
    agent_name="Markets-Analyst",
    system_prompt="Use tools to answer market questions with citations.",
    model_name="gpt-4o",
    tools=[yahoo_finance_api, exa_search],
    max_loops=3,
)

print(agent.run("Latest earnings + analyst sentiment on AMD"))`,
  },
]

const providers = [
  "OpenAI",
  "Anthropic",
  "Google Gemini",
  "Groq",
  "DeepSeek",
  "Cohere",
  "Mistral",
  "xAI Grok",
  "Together",
  "OpenRouter",
  "Ollama",
  "vLLM",
  "LM Studio",
  "Azure OpenAI",
  "AWS Bedrock",
  "Hugging Face",
]

const useCases = [
  {
    icon: Building,
    industry: "Finance",
    description: "Multi-agent research desks, portfolio analysis, risk modeling, and compliance automation.",
  },
  {
    icon: Heart,
    industry: "Healthcare",
    description: "Clinical reasoning, ICD coding, claims processing, and diagnostic decision-support swarms.",
  },
  {
    icon: Server,
    industry: "Engineering",
    description: "Code generation, code review, refactoring, test synthesis and dev-tooling agents.",
  },
  {
    icon: FileText,
    industry: "Research",
    description: "Literature review, paper synthesis, experiment planning and scientific writing pipelines.",
  },
  {
    icon: Sparkles,
    industry: "Marketing",
    description: "Brief generation, content production, brand-voice critique and campaign orchestration.",
  },
  {
    icon: Rocket,
    industry: "Operations",
    description: "Business-process automation, document workflows, intake triage and back-office swarms.",
  },
]

const faqs = [
  {
    question: "How is Swarms different from LangChain, CrewAI or AutoGen?",
    answer:
      "Swarms is built for production multi-agent orchestration, not single-agent chains. It ships 15+ swarm topologies as first-class primitives, supports 1,000+ models out of the box, and is hardened for high-concurrency workloads. Teams move from prototype to production without rewriting their stack.",
  },
  {
    question: "What does pip install swarms give me?",
    answer:
      "The full framework: Agent class, every swarm topology (SequentialWorkflow, ConcurrentWorkflow, HierarchicalSwarm, MixtureOfAgents, GroupChat and more), the model layer, memory, tool integration, structured outputs, MCP support, and telemetry — one package, zero glue code.",
  },
  {
    question: "Which models can I use?",
    answer:
      "1,000+ models. Pass model_name to any Agent — OpenAI (GPT-4o, o-series), Anthropic (Claude), Google (Gemini), Groq, DeepSeek, Cohere, xAI, OpenRouter, Together, Ollama, vLLM, LM Studio, Azure, Bedrock and any OpenAI-compatible endpoint.",
  },
  {
    question: "Can I run Swarms on my own infrastructure?",
    answer:
      "Yes. Swarms is a Python library — it runs wherever Python runs. Self-host on Kubernetes, Docker, bare metal, or serverless. For managed multi-agent infrastructure, the Swarms API offers the same runtime as a hosted REST service.",
  },
  {
    question: "How do I observe and debug multi-agent runs?",
    answer:
      "Every agent and swarm emits structured logs and telemetry — per-agent latency, token counts, tool calls, errors, and full traces. Integrate with OpenTelemetry, your logging stack, or use the built-in console formatter for local development.",
  },
  {
    question: "Is there enterprise support?",
    answer:
      "Yes. Swarms Enterprise offers dedicated engineering contact, SLAs, on-premise licensing, custom integrations, and white-label options. Book a call with the team to scope a deployment.",
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

export default function FrameworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const stars = useGithubStars()
  const mainStars = stars["kyegomez/swarms"]
  const starsText = formatStarsLong(mainStars)

  const stats = [
    { value: starsText, label: "GitHub stars", icon: Star },
    { value: "5M+", label: "Downloads", icon: Download },
    { value: "100+", label: "Contributors", icon: Users },
    { value: "Apache 2.0", label: "Open source license", icon: Heart },
  ]

  const reasonsCards = [
    {
      icon: Shield,
      title: "Battle-tested",
      description: `Trusted in production by financial institutions, healthcare networks, and Fortune 500 R&D teams. Hardened by 100+ contributors and ${starsText} stars worth of community usage.`,
    },
    {
      icon: Layers,
      title: "Composable, not opinionated",
      description:
        "Swarms gives you primitives, not a walled garden. Drop agents into any architecture, share state across them, and extend with your own Python.",
    },
    {
      icon: Heart,
      title: "Open source, forever",
      description:
        "Apache 2.0 licensed. Read the source, audit the runtime, contribute back, or run on your own infrastructure — no vendor lock-in.",
    },
  ]

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
              <motion.h1
                className="font-bold leading-[0.95] tracking-tighter text-white"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
              >
                Swarms
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                The enterprise-grade Python framework for production multi-agent systems.
              </motion.p>

              <motion.div
                className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                {heroBadges.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60"
                  >
                    <b.icon className="h-3.5 w-3.5 text-white/40" strokeWidth={1.5} />
                    {b.label}
                  </span>
                ))}
              </motion.div>

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
                    Star on GitHub
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Read the docs
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>

              <motion.div
                className="mt-8 inline-flex max-w-full items-center gap-2 overflow-x-auto whitespace-nowrap rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/70 sm:mt-10 sm:text-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3, ease }}
              >
                <Terminal className="h-3.5 w-3.5 flex-shrink-0 text-white/40" strokeWidth={1.5} />
                <span className="text-white/40">$</span>
                <span>pip install -U swarms</span>
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
                  <stat.icon className="mb-3 h-4 w-4 text-white/40" strokeWidth={1.5} />
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

        {/* QUICKSTART */}
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
                  Quickstart
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  From pip install to a multi-agent system in minutes.
                </h2>
                <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Pure Python. No DSLs, no YAML, no glue code. Build single agents, sequential pipelines,
                  hierarchical swarms — all from the same primitives.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: Download, text: "Install with pip — one package, zero setup" },
                    { icon: Code, text: "Define agents with a system prompt and model" },
                    { icon: Workflow, text: "Compose them with any swarm topology" },
                    { icon: PlayCircle, text: "Run — Swarms handles orchestration" },
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
                <div className="flex flex-col gap-3 pt-3 sm:flex-row">
                  <Button
                    className="h-10 rounded-full bg-white px-5 text-sm font-medium text-black hover:bg-neutral-200"
                    asChild
                  >
                    <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                      Full docs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 rounded-full border-white/[0.14] bg-[#0a0a0a] px-5 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    asChild
                  >
                    <Link href="/installation">
                      Installation
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
                <CodeTabs examples={codeExamples} defaultLang="Single Agent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything you need to ship agents in production"
              description="A complete multi-agent toolkit — orchestration, memory, tools, observability — first-class in Python."
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

        {/* ARCHITECTURES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="15+ architectures"
              title="Every swarm topology, batteries included."
              description="Pick a primitive, pass your agents and a task — Swarms handles routing, memory and aggregation."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {architectures.map((arch) => (
                <div
                  key={arch.name}
                  className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-6"
                >
                  <arch.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-1.5 truncate font-mono text-xs font-medium text-white">{arch.name}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{arch.description}</p>
                </div>
              ))}
            </motion.div>

            <motion.p
              className="mx-auto mt-8 max-w-3xl text-center text-sm font-normal leading-relaxed text-white/40 sm:mt-10"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease }}
            >
              And more — including BatchedGridWorkflow, MultiAgentRouter, AutoSwarmBuilder, PlannerWorkerSwarm,
              and custom topologies.
            </motion.p>
          </div>
        </section>

        {/* PROVIDERS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="1,000+ models"
              title="Every provider, one interface."
              description="Switch models with a string. Mix providers inside the same swarm. No SDK lock-in."
            />

            <motion.div
              className="mx-auto flex max-w-5xl flex-wrap gap-2.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {providers.map((p) => (
                <span
                  key={p}
                  className="rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
                >
                  {p}
                </span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Used in production"
              title="Across every industry that runs on Python"
              description="From Fortune 500 R&D teams to fast-moving startups — Swarms powers production workloads at scale."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {useCases.map((u) => (
                <div
                  key={u.industry}
                  className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <u.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-white">{u.industry}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{u.description}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* WHY SWARMS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="Why Swarms" title="The framework teams trust to ship agents" />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {reasonsCards.map((r) => (
                <div
                  key={r.title}
                  className="group bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <r.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-lg font-semibold text-white sm:text-xl">{r.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50 sm:text-base">
                    {r.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* COMMUNITY / OPEN SOURCE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/[0.08] bg-black"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="grid gap-0 lg:grid-cols-5">
                <div className="flex flex-col justify-between gap-8 border-b border-white/[0.08] p-6 sm:p-8 md:p-10 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-12">
                  <div>
                    <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                      Open source
                    </p>
                    <h2 className="mb-4 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:mb-5 sm:text-4xl">
                      Built in the open. Used everywhere.
                    </h2>
                    <p className="text-base leading-relaxed text-white/50 sm:text-lg">
                      Swarms is Apache 2.0 licensed and built in public on GitHub. Read the source, contribute a
                      feature, file an issue, or fork it.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="rounded-full bg-white font-medium text-black hover:bg-neutral-200" asChild>
                      <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                        Star on GitHub
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                        Join Discord
                        <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/[0.08] lg:col-span-3">
                  {[
                    { icon: Star, value: starsText, label: "GitHub stars" },
                    { icon: Download, value: "5M+", label: "Downloads" },
                    { icon: Users, value: "100+", label: "Contributors" },
                    { icon: GitBranch, value: "Weekly", label: "Releases" },
                  ].map((s) => (
                    <div key={s.label} className="bg-black p-6 sm:p-8">
                      <s.icon className="mb-4 h-5 w-5 text-white/50" strokeWidth={1.5} />
                      <div className="text-xl font-semibold tracking-tighter text-white sm:text-3xl">
                        {s.value}
                      </div>
                      <div className="mt-1 text-xs text-white/50 sm:text-sm">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
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
                  Build the multi-agent layer of your stack.
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  One pip install away. Open source. Production-ready. Trusted by 100,000+ developers.
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
