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
  { label: "生产级就绪", icon: Shield },
]

const capabilities = [
  {
    icon: Network,
    title: "多智能体编排",
    description:
      "串行、并行、分层、群聊、混合智能体等 15+ 种群体拓扑结构，全部可用纯 Python 自由组合。",
  },
  {
    icon: Brain,
    title: "模型无关，自由切换",
    description:
      "支持 OpenAI、Anthropic、Gemini、Groq、DeepSeek、Cohere、Ollama、vLLM 以及任意 OpenAI 兼容接口在内的 1,000+ 种模型。",
  },
  {
    icon: Wrench,
    title: "工具调用与函数调用",
    description:
      "结构化输出、并行工具调用、自动重试，并内置网页搜索、金融数据、代码执行、浏览器等多种工具。",
  },
  {
    icon: Database,
    title: "记忆与 RAG",
    description:
      "开箱即用的长期记忆、向量数据库集成（Chroma、Pinecone、FAISS、Qdrant）以及文档加载器。",
  },
  {
    icon: Boxes,
    title: "MCP 与生态集成",
    description:
      "原生支持 Model Context Protocol（MCP）—— 将 Notion、Supabase、GitHub 或任意 MCP 服务器接入你的智能体。",
  },
  {
    icon: Activity,
    title: "可观测性",
    description:
      "结构化日志、按智能体维度的遥测数据、Token 用量统计与链路追踪 —— 与 OpenTelemetry 无缝兼容。",
  },
  {
    icon: Cpu,
    title: "内置高并发能力",
    description:
      "异步优先的运行时，内置线程池、进程池与 asyncio 池，单进程即可并行运行数千个智能体。",
  },
  {
    icon: Workflow,
    title: "可组合的工作流",
    description:
      "将智能体接入任意工作流原语，混用不同群体类型、共享状态，并在运行时动态分支。",
  },
  {
    icon: Shield,
    title: "生产级加固",
    description:
      "类型安全的配置（Pydantic v2）、指数退避重试、故障隔离，历经生产环境实战检验。",
  },
]

const architectures = [
  {
    name: "SequentialWorkflow",
    description: "依次运行智能体，并将状态向后传递。",
    icon: GitBranch,
  },
  {
    name: "ConcurrentWorkflow",
    description: "并行分发智能体任务，汇总各自输出。",
    icon: Layers,
  },
  {
    name: "HierarchicalSwarm",
    description: "由指挥官智能体拆解任务，分配给各专业执行者。",
    icon: Network,
  },
  {
    name: "MixtureOfAgents",
    description: "多个智能体独立求解，再由聚合器合并结果。",
    icon: Boxes,
  },
  {
    name: "GroupChat",
    description: "智能体在共享对话中协同讨论。",
    icon: Users,
  },
  {
    name: "MajorityVoting",
    description: "智能体投票表决，多数意见胜出。",
    icon: CheckCircle,
  },
  {
    name: "AgentRearrange",
    description: "根据运行时信号动态调整执行流程。",
    icon: Workflow,
  },
  {
    name: "HeavySwarm",
    description: "大规模扇出式群体，适用于高召回率的研究任务。",
    icon: Cpu,
  },
  {
    name: "DebateWithJudge",
    description: "智能体展开辩论，由裁判智能体判定胜方。",
    icon: Brain,
  },
  {
    name: "AutoSwarmBuilder",
    description: "由大模型自动设计并实例化适合任务的群体。",
    icon: Sparkles,
  },
  {
    name: "RoundRobin",
    description: "按顺序轮流调度智能体，公平且可预测。",
    icon: GitBranch,
  },
  {
    name: "CouncilAsAJudge",
    description: "由评审团对候选输出打分并排名。",
    icon: Users,
  },
]

const codeExamples = [
  {
    lang: "安装",
    file: "install.sh",
    code: `# pip
pip install -U swarms

# or with uv
uv pip install -U swarms

# verify
python -c "import swarms; print(swarms.__version__)"`,
  },
  {
    lang: "单智能体",
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
    lang: "串行",
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
    lang: "并行",
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
    lang: "分层",
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
    lang: "工具调用",
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
    industry: "金融",
    description: "多智能体研究团队、投资组合分析、风险建模与合规自动化。",
  },
  {
    icon: Heart,
    industry: "医疗健康",
    description: "临床推理、ICD 编码、理赔处理与诊断决策支持群体。",
  },
  {
    icon: Server,
    industry: "工程研发",
    description: "代码生成、代码评审、重构、测试用例生成与开发工具类智能体。",
  },
  {
    icon: FileText,
    industry: "科研",
    description: "文献综述、论文撰写、实验规划与科研写作流水线。",
  },
  {
    icon: Sparkles,
    industry: "市场营销",
    description: "简报生成、内容创作、品牌语调审核与营销活动编排。",
  },
  {
    icon: Rocket,
    industry: "运营",
    description: "业务流程自动化、文档工作流、工单分诊与后台运营群体。",
  },
]

const faqs = [
  {
    question: "Swarms 与 LangChain、CrewAI 或 AutoGen 相比有何不同？",
    answer:
      "Swarms 从一开始就为生产级多智能体编排而设计，而非单一智能体的链式调用。它内置 15+ 种群体拓扑作为一等公民，开箱即支持 1,000+ 种模型，并针对高并发场景做了充分加固。团队可以从原型直接迈向生产环境，无需重写技术栈。",
  },
  {
    question: "执行 pip install swarms 之后能获得什么？",
    answer:
      "你将获得完整框架：Agent 类、全部群体拓扑（SequentialWorkflow、ConcurrentWorkflow、HierarchicalSwarm、MixtureOfAgents、GroupChat 等）、模型层、记忆模块、工具集成、结构化输出、MCP 支持以及遥测能力 —— 一个包搞定，无需任何胶水代码。",
  },
  {
    question: "我可以使用哪些模型？",
    answer:
      "超过 1,000 种模型。只需在任意 Agent 中传入 model_name 即可 —— 涵盖 OpenAI（GPT-4o、o 系列）、Anthropic（Claude）、Google（Gemini）、Groq、DeepSeek、Cohere、xAI、OpenRouter、Together、Ollama、vLLM、LM Studio、Azure、Bedrock，以及任意 OpenAI 兼容接口。",
  },
  {
    question: "可以在自有基础设施上运行 Swarms 吗？",
    answer:
      "可以。Swarms 本质上是一个 Python 库 —— 只要能运行 Python 的地方就能运行它。你可以自托管在 Kubernetes、Docker、裸机或无服务器环境中。如果需要托管式多智能体基础设施，Swarms API 提供了同样的运行时能力，并以 REST 服务的形式对外提供。",
  },
  {
    question: "如何观测和调试多智能体运行过程？",
    answer:
      "每个智能体和群体都会输出结构化日志与遥测数据 —— 包括单智能体延迟、Token 用量、工具调用、错误信息与完整调用链路。你可以接入 OpenTelemetry、自有日志系统，或在本地开发时使用内置的控制台格式化工具。",
  },
  {
    question: "是否提供企业级支持？",
    answer:
      "提供。Swarms 企业版包含专属工程对接人、SLA 保障、本地化部署授权、定制化集成以及白标方案。欢迎预约与团队沟通，共同规划部署方案。",
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
    { value: starsText, label: "GitHub 星标", icon: Star },
    { value: "5M+", label: "下载量", icon: Download },
    { value: "100+", label: "贡献者", icon: Users },
    { value: "Apache 2.0", label: "开源协议", icon: Heart },
  ]

  const reasonsCards = [
    {
      icon: Shield,
      title: "久经实战检验",
      description: `深受金融机构、医疗网络与财富 500 强研发团队信赖，稳定运行于生产环境。经过 100+ 位贡献者与 ${starsText} 星标背后海量社区实践的持续打磨。`,
    },
    {
      icon: Layers,
      title: "组合自由，而非强绑定",
      description:
        "Swarms 提供的是基础原语，而非一个封闭的生态花园。你可以将智能体接入任意架构、在它们之间共享状态，并用自己的 Python 代码自由扩展。",
    },
    {
      icon: Heart,
      title: "永远开源",
      description:
        "采用 Apache 2.0 协议开源。你可以阅读源码、审计运行时、参与共建，或部署在自有基础设施上 —— 完全没有厂商锁定。",
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
                面向生产环境的企业级 Python 多智能体框架。
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
                    在 GitHub 上点亮 Star
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    阅读文档
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
                  快速开始
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  从 pip install 到搭建多智能体系统，只需几分钟。
                </h2>
                <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  纯 Python 实现，没有 DSL、没有 YAML、没有胶水代码。单智能体、串行流水线、分层群体
                  —— 全部基于同一套原语构建。
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: Download, text: "使用 pip 安装 —— 一个包，零配置" },
                    { icon: Code, text: "用系统提示词和模型定义智能体" },
                    { icon: Workflow, text: "用任意群体拓扑将它们组合起来" },
                    { icon: PlayCircle, text: "运行 —— 编排调度交给 Swarms" },
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
                      完整文档
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 rounded-full border-white/[0.14] bg-[#0a0a0a] px-5 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    asChild
                  >
                    <Link href="/zh/installation">
                      安装指南
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
                <CodeTabs examples={codeExamples} defaultLang="单智能体" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* CAPABILITIES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="核心能力"
              title="生产环境交付智能体所需的一切"
              description="一整套多智能体工具集 —— 编排、记忆、工具、可观测性，在 Python 中皆为一等公民。"
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
              eyebrow="15+ 种架构"
              title="覆盖所有群体拓扑，开箱即用。"
              description="选择一个原语，传入智能体与任务 —— 路由、记忆与结果聚合都交给 Swarms 处理。"
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
              还有更多 —— 包括 BatchedGridWorkflow、MultiAgentRouter、AutoSwarmBuilder、PlannerWorkerSwarm，
              以及可自定义的拓扑结构。
            </motion.p>
          </div>
        </section>

        {/* PROVIDERS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="1,000+ 种模型"
              title="统一接口，接入所有服务商。"
              description="只需一个字符串即可切换模型，同一群体内可混用不同服务商，无需绑定任何 SDK。"
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
              eyebrow="已在生产环境验证"
              title="覆盖每一个使用 Python 的行业"
              description="从财富 500 强研发团队到快速成长的初创公司 —— Swarms 支撑着大规模的生产级工作负载。"
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
            <SectionHeading eyebrow="为什么选择 Swarms" title="团队信赖的智能体交付框架" />

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
                      开源
                    </p>
                    <h2 className="mb-4 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:mb-5 sm:text-4xl">
                      开放构建，广泛应用。
                    </h2>
                    <p className="text-base leading-relaxed text-white/50 sm:text-lg">
                      Swarms 采用 Apache 2.0 协议，在 GitHub 上公开开发。你可以阅读源码、贡献新功能、
                      提交 Issue，或直接 Fork。
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="rounded-full bg-white font-medium text-black hover:bg-neutral-200" asChild>
                      <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                        在 GitHub 上点亮 Star
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                        加入 Discord
                        <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/[0.08] lg:col-span-3">
                  {[
                    { icon: Star, value: starsText, label: "GitHub 星标" },
                    { icon: Download, value: "5M+", label: "下载量" },
                    { icon: Users, value: "100+", label: "贡献者" },
                    { icon: GitBranch, value: "每周", label: "版本发布" },
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
            <SectionHeading eyebrow="FAQ" title="常见问题" />

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
                  为你的技术栈构建多智能体层。
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  只需一次 pip install。开源、生产就绪，已获得 100,000+ 开发者信赖。
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    立即开始
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    联系销售
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
