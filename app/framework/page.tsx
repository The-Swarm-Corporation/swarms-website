"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  BookOpen,
  Github,
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

const stats = [
  { value: "7,000+", label: "GitHub stars", icon: Star },
  { value: "5M+", label: "Downloads", icon: Download },
  { value: "100+", label: "Contributors", icon: Users },
  { value: "Apache 2.0", label: "Open source license", icon: Heart },
]

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
    code: `# pip
pip install -U swarms

# or with uv
uv pip install -U swarms

# verify
python -c "import swarms; print(swarms.__version__)"`,
  },
  {
    lang: "Single Agent",
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

const reasonsCards = [
  {
    icon: Shield,
    title: "Battle-tested",
    description:
      "Trusted in production by financial institutions, healthcare networks, and Fortune 500 R&D teams. Hardened by 100+ contributors and 7,000+ stars worth of community usage.",
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

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="w-full max-w-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="flex items-center gap-1.5 border-b border-white/5 px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-3 font-mono text-[10px] uppercase tracking-widest text-white/40">python</span>
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

export default function FrameworkPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

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
              <h1
                className="font-bold leading-[0.9] tracking-tight text-red-500 break-words"
                style={{ fontSize: "clamp(2.5rem, 10vw, 9rem)", fontFamily: "var(--font-orbitron)" }}
              >
                Swarms
              </h1>

              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-medium leading-snug sm:leading-tight px-1 sm:px-0">
                The enterprise-grade Python framework for production multi-agent systems.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
                {heroBadges.map((b) => (
                  <span
                    key={b.label}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-xs font-medium text-white/70"
                  >
                    <b.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                    {b.label}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-2xl mx-auto pt-2">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-3.5 sm:py-6 md:py-7 h-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Star on GitHub
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

              {/* Install line */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="pt-3 sm:pt-6"
              >
                <div className="mx-auto inline-flex items-center gap-2 sm:gap-3 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm px-3 sm:px-4 py-2 sm:py-2.5 font-mono text-[12px] sm:text-sm text-white/85 max-w-full overflow-x-auto whitespace-nowrap">
                  <Terminal className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500 flex-shrink-0" />
                  <span className="text-white/40">$</span>
                  <span>pip install -U swarms</span>
                </div>
              </motion.div>
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
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <stat.icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500 flex-shrink-0" />
                  </div>
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

        {/* QUICKSTART */}
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
                  Quickstart
                </p>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  From <span className="text-red-500">pip install</span> to a multi-agent system in minutes.
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 leading-relaxed">
                  Pure Python. No DSLs, no YAML, no glue code. Build single agents, sequential pipelines, hierarchical swarms — all from the same primitives.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: Download, text: "Install with pip — one package, zero setup" },
                    { icon: Code, text: "Define agents with a system prompt and model" },
                    { icon: Workflow, text: "Compose them with any swarm topology" },
                    { icon: PlayCircle, text: "Run — Swarms handles orchestration" },
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
                <div className="flex flex-col sm:flex-row gap-3 pt-3">
                  <Button
                    className="bg-white text-black hover:bg-white/90 font-bold w-full sm:w-auto"
                    asChild
                  >
                    <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Full docs
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal w-full sm:w-auto"
                    asChild
                  >
                    <Link href="/installation">
                      <Download className="h-4 w-4 mr-2" />
                      Installation
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
                <CodeTabs examples={codeExamples} defaultLang="Single Agent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Capabilities"
              title="Everything you need to ship agents in production"
              description="A complete multi-agent toolkit — orchestration, memory, tools, observability — first-class in Python."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
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
                    <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col gap-3 sm:gap-5 md:gap-6 min-h-0 sm:min-h-[240px] md:min-h-[260px]">
                      <div className="flex items-start">
                        <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-500">
                          <cap.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-red-500" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 leading-snug">
                          {cap.title}
                        </h3>
                        <p className="text-white/65 text-[13px] sm:text-base leading-relaxed">
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

        {/* ARCHITECTURES */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="15+ architectures"
              title={
                <>
                  Every swarm topology, <span className="text-red-500">batteries included</span>.
                </>
              }
              description="Pick a primitive, pass your agents and a task — Swarms handles routing, memory and aggregation."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
              {architectures.map((arch, i) => (
                <motion.div
                  key={arch.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-5 md:p-6 hover:border-white/25 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="p-2 rounded-lg border border-red-500/40 bg-red-500/10 flex-shrink-0 group-hover:border-red-500 transition-all">
                      <arch.icon className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-mono text-[12px] sm:text-sm font-bold text-white mb-1 sm:mb-1.5 truncate">
                        {arch.name}
                      </h3>
                      <p className="text-white/60 text-[12px] sm:text-sm leading-relaxed">
                        {arch.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto mt-8 sm:mt-10 text-center"
            >
              <p className="text-sm sm:text-base text-white/55">
                And more — including BatchedGridWorkflow, MultiAgentRouter, AutoSwarmBuilder, PlannerWorkerSwarm, and custom topologies.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PROVIDERS */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="1,000+ models"
              title={
                <>
                  Every provider, <span className="text-red-500">one interface</span>.
                </>
              }
              description="Switch models with a string. Mix providers inside the same swarm. No SDK lock-in."
            />

            <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-2 sm:gap-2.5 md:gap-3">
              {providers.map((p, i) => (
                <motion.span
                  key={p}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  viewport={{ once: true }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 sm:px-4 py-1.5 sm:py-2 text-[12px] sm:text-sm font-medium text-white/80 hover:border-white/25 hover:bg-white/[0.06] hover:text-white transition-all"
                >
                  {p}
                </motion.span>
              ))}
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Used in production"
              title="Across every industry that runs on Python"
              description="From Fortune 500 R&D teams to fast-moving startups — Swarms powers production workloads at scale."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
              {useCases.map((u, i) => (
                <motion.div
                  key={u.industry}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-4 sm:p-6 md:p-8"
                >
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-3 sm:mb-5">
                    <u.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white mb-1.5 sm:mb-2 leading-snug">
                    {u.industry}
                  </h3>
                  <p className="text-white/65 text-[13px] sm:text-base leading-relaxed">
                    {u.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY SWARMS */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Why Swarms"
              title="The framework teams trust to ship agents"
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 md:gap-6">
              {reasonsCards.map((r, i) => (
                <motion.div
                  key={r.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-7 md:p-8"
                >
                  <div className="p-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-4 sm:mb-6">
                    <r.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 leading-snug">
                    {r.title}
                  </h3>
                  <p className="text-white/65 text-[13px] sm:text-base leading-relaxed">
                    {r.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNITY / OPEN SOURCE */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="relative rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,_rgba(239,68,68,0.10)_0%,_rgba(0,0,0,0)_55%)]"
                />
                <div className="relative z-10 grid md:grid-cols-2 gap-6 sm:gap-10 p-6 sm:p-10 md:p-14 items-center">
                  <div className="space-y-3 sm:space-y-5">
                    <p className="text-[10px] sm:text-xs text-white font-bold tracking-[0.22em] uppercase">
                      Open source
                    </p>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                      Built in the open. <span className="text-red-500">Used everywhere.</span>
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-white/65 leading-relaxed">
                      Swarms is Apache 2.0 licensed and built in public on GitHub. Read the source, contribute a feature, file an issue, or fork it.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        className="bg-white text-black hover:bg-white/90 font-bold w-full sm:w-auto"
                        asChild
                      >
                        <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                          <Star className="h-4 w-4 mr-2" />
                          Star on GitHub
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        className="border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal w-full sm:w-auto"
                        asChild
                      >
                        <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                          <Users className="h-4 w-4 mr-2" />
                          Join Discord
                        </a>
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 sm:gap-4">
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                      <Star className="h-4 w-4 text-red-500 mb-2" />
                      <div className="text-xl sm:text-3xl font-bold text-white tracking-tight">7,000+</div>
                      <div className="text-[11px] sm:text-xs text-white/55 mt-0.5">GitHub stars</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                      <Download className="h-4 w-4 text-red-500 mb-2" />
                      <div className="text-xl sm:text-3xl font-bold text-white tracking-tight">5M+</div>
                      <div className="text-[11px] sm:text-xs text-white/55 mt-0.5">Downloads</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                      <Users className="h-4 w-4 text-red-500 mb-2" />
                      <div className="text-xl sm:text-3xl font-bold text-white tracking-tight">100+</div>
                      <div className="text-[11px] sm:text-xs text-white/55 mt-0.5">Contributors</div>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/40 p-4 sm:p-5">
                      <GitBranch className="h-4 w-4 text-red-500 mb-2" />
                      <div className="text-xl sm:text-3xl font-bold text-white tracking-tight">Weekly</div>
                      <div className="text-[11px] sm:text-xs text-white/55 mt-0.5">Releases</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black py-12 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="FAQ" title="Common questions" />

            <div className="max-w-3xl mx-auto space-y-2.5 sm:space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04 }}
                    viewport={{ once: true }}
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-3 sm:gap-4 px-4 sm:px-6 py-3.5 sm:py-5 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-[13px] sm:text-base md:text-lg font-semibold text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
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
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-[13px] sm:text-base text-white/65 leading-relaxed">
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
                  Build the multi-agent layer of your stack.
                </h2>
                <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  One <span className="font-mono text-white/85">pip install</span> away. Open source. Production-ready. Trusted by 100,000+ developers.
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
