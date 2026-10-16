"use client"

import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { PaperCard } from "@/components/paper-card"
import { ResearchHero } from "@/components/research/research-hero"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Hospital,
  Activity,
  Workflow,
} from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// The mark from public/routehub_logo.svg, drawn in currentColor so it styles like the lucide icons.
function RouteHubIcon({ className }: { className?: string; strokeWidth?: number }) {
  return (
    <svg viewBox="4 2 116 116" fill="none" aria-hidden="true" className={className}>
      <path d="M16 26H34C54 26 54 60 74 60M74 60H16M74 60C54 60 54 94 34 94H16" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle cx="16" cy="26" r="6" fill="currentColor" />
      <circle cx="16" cy="60" r="6" fill="currentColor" />
      <circle cx="16" cy="94" r="6" fill="currentColor" />
      <path d="M70 60H108M92 76L108 60L92 44" stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const researchProjects = [
  {
    icon: RouteHubIcon,
    title: "RouteHub",
    subtitle: "Low-Overhead, SDK-Native LLM Gateway for Agentic Workloads",
    description: "A technical report on the open-source LLM gateway that connects 20+ providers through one completion() call while keeping as little code as possible between the caller and the official provider SDK. Against LiteLLM 1.104.0 it imports 383x faster, reaches its first response 5.5x sooner, uses 3.9x less peak memory, and adds 9 µs per call instead of 647 µs.",
    paper: "https://github.com/The-Swarm-Corporation/RouteHub/blob/main/docs/routehub.pdf",
    tags: ["LLM Gateway", "Inference", "Benchmarks", "Systems"],
    status: "Published",
    impact: "High",
    categories: ["novel-architecture"]
  },
  {
    icon: Workflow,
    title: "GraphWorkflow",
    subtitle: "Compile-Once Graph Execution Engine for Multi-Agent Systems",
    description: "A systems paper on the graph orchestration engine inside the Swarms framework. Compiles static agent DAGs once into a frozen layered execution plan, then runs them with near-zero per-node overhead: a geometric-mean 7.0x speedup over LangGraph across five topologies, rising to 62.5x on 200-node chains, with an open benchmark suite.",
    paper: "https://github.com/The-Swarm-Corporation/GraphWorkflow-Paper/blob/main/main.pdf",
    tags: ["Orchestration", "Graph Execution", "Benchmarks", "Systems"],
    status: "Published",
    impact: "High",
    categories: ["multi-agent", "novel-architecture"]
  }
]

const focusAreas = [
  {
    icon: Brain,
    title: "Multimodal AI",
    description: "Models that integrate vision, language, and action modalities for comprehensive understanding and generation.",
    focus: ["Vision-Language Models", "Action Prediction", "Cross-Modal Learning"],
  },
  {
    icon: Activity,
    title: "Autonomous Systems",
    description: "Fully autonomous systems capable of independent decision-making, coordination, and adaptation in complex environments.",
    focus: ["Multi-Agent Coordination", "Decision Making", "Adaptive Systems"],
  },
  {
    icon: Hospital,
    title: "Domain Simulation",
    description: "Realistic simulations of complex real-world systems including healthcare, organizations, and economies.",
    focus: ["Healthcare Systems", "Organizational Dynamics", "Economic Models"],
  },
  {
    icon: Cpu,
    title: "System Optimization",
    description: "Frameworks for efficient resource allocation, memory management, and computational optimization in distributed AI systems.",
    focus: ["Resource Management", "Memory Allocation", "Scalable Computing"],
  },
]

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
      <Navigation />

      <main>
        <ResearchHero />

        {/* Research Projects */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Portfolio
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Active projects
              </h2>
              <p className="mt-5 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Past and present research in multi-agent collaboration and
                multimodal intelligence.
              </p>
            </motion.div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
              {researchProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.06, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex"
                >
                  <PaperCard
                    title={`${project.title}: ${project.subtitle}`}
                    href={project.paper}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Domains
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Research focus areas
              </h2>
              <p className="mt-5 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Core domains driving our research initiatives.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {focusAreas.map((area) => {
                const Icon = area.icon
                return (
                  <div
                    key={area.title}
                    className="group flex min-h-[220px] flex-col bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                  >
                    <Icon
                      className="mb-5 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    <h3 className="mb-2 text-base font-medium text-white">
                      {area.title}
                    </h3>
                    <p className="mb-5 text-sm font-normal leading-relaxed text-white/50">
                      {area.description}
                    </p>
                    <ul className="mt-auto space-y-2">
                      {area.focus.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                          <span className="text-xs text-white/40">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
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
                  Join our research team
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Help shape the future of autonomous systems and multimodal
                  intelligence.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full border border-[#27272a] bg-[#121214] px-6 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:w-auto"
                  asChild
                >
                  <Link href="/hiring">
                    See open roles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                    Join Discord
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
