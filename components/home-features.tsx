"use client"

import { motion } from "framer-motion"
import { Network, MessageSquare, Zap, Brain, Cpu, Shield } from "lucide-react"

import { CardCarousel, type CarouselCardItem } from "@/components/card-carousel"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const features: CarouselCardItem[] = [
  {
    title: "Multi-Agent Architectures",
    description: "Build complex hierarchical, sequential, and parallel agent collaboration systems.",
    icon: Network,
    preview: [
      "from swarms import SwarmRouter",
      "",
      "router = SwarmRouter(",
      "  agents=agents,",
      '  swarm_type="HierarchicalSwarm",',
      ")",
    ],
    href: "https://docs.swarms.world/architectures/overview",
    external: true,
    wide: true,
  },
  {
    title: "Agent-To-Agent Communication",
    description: "Advanced communication protocols for seamless agent interaction.",
    icon: MessageSquare,
    preview: [
      "from swarms import AgentRearrange",
      "",
      "team = AgentRearrange(",
      "  agents=[lead, coder, tester],",
      '  flow="lead -> coder, tester",',
      ")",
    ],
    href: "https://docs.swarms.world/architectures/agent-rearrange",
    external: true,
  },
  {
    title: "Ultra-Optimized Runtime",
    description: "High-performance runtime for maximum agent efficiency and speed.",
    icon: Zap,
    preview: [
      "GraphWorkflow vs LangGraph 1.0.4",
      "",
      "execution    7.0x faster",
      "deep chains  up to 62.5x",
      "compile      21.6x to 31.3x",
    ],
    href: "https://docs.swarms.ai/docs/documentation/multi-agent/graph_workflow",
    external: true,
  },
  {
    title: "Multi-Agent Memory Systems",
    description: "Sophisticated memory management for complex agent workflows.",
    icon: Brain,
    preview: [
      "agent = Agent(",
      '  agent_name="analyst",',
      "  persistent_memory=True,",
      "  context_compression=True,",
      "  context_length=32000,",
      ")",
    ],
    href: "https://docs.swarms.world/agents/agent-memory",
    external: true,
  },
  {
    title: "Simulation Environments",
    description: "Advanced simulation environments for testing and training agent swarms.",
    icon: Cpu,
    preview: [
      "simulations/",
      "",
      "autonomous corporations",
      "autonomous senate",
      "autonomous hospitals",
      "social algorithms",
    ],
    href: "https://docs.swarms.world/architectures/social-algorithms",
    external: true,
  },
  {
    title: "Enterprise Security & Compliance",
    description: "Built-in security, governance, and compliance features for enterprise deployments.",
    icon: Shield,
    preview: [
      "SOC 2 Type 2   certified",
      "SOC 3          public report",
      "HIPAA          compliant",
      "GDPR           compliant",
      "EU-US DPF      certified",
      "Swiss-US DPF   certified",
    ],
    href: "https://docs.swarms.ai/docs/documentation/resources/security",
    external: true,
  },
]

export function HomeFeatures() {
  return (
    <section className="border-b border-white/[0.08] bg-black py-16 sm:py-24 lg:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-10 max-w-7xl sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Capabilities
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
            Everything you need to ship agents
          </h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Pioneered infrastructure for multi-agent collaboration: communication
            protocols, optimized runtimes, memory systems, and simulation
            environments.
          </p>
        </motion.div>
      </div>

      <CardCarousel label="Capabilities" items={features} />
    </section>
  )
}
