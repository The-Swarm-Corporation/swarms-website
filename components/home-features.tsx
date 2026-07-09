"use client"

import { motion } from "framer-motion"
import { Network, MessageSquare, Zap, Brain, Cpu, Shield } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const features = [
  {
    title: "Multi-Agent Architectures",
    description: "Build complex hierarchical, sequential, and parallel agent collaboration systems.",
    link: "https://docs.swarms.world",
    icon: Network,
  },
  {
    title: "Agent-To-Agent Communication",
    description: "Advanced communication protocols for seamless agent interaction.",
    link: "https://docs.swarms.world",
    icon: MessageSquare,
  },
  {
    title: "Ultra-Optimized Runtime",
    description: "High-performance runtime for maximum agent efficiency and speed.",
    link: "https://docs.swarms.world",
    icon: Zap,
  },
  {
    title: "Multi-Agent Memory Systems",
    description: "Sophisticated memory management for complex agent workflows.",
    link: "https://docs.swarms.world",
    icon: Brain,
  },
  {
    title: "Simulation Environments",
    description: "Advanced simulation environments for testing and training agent swarms.",
    link: "https://docs.swarms.world",
    icon: Cpu,
  },
  {
    title: "Enterprise Security & Compliance",
    description: "Built-in security, governance, and compliance features for enterprise deployments.",
    link: "https://docs.swarms.world",
    icon: Shield,
  },
]

export function HomeFeatures() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
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
            Everything you need to ship agents.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Pioneered infrastructure for multi-agent collaboration — communication
            protocols, optimized runtimes, memory systems, and simulation
            environments.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {features.map((feature) => (
            <a
              key={feature.title}
              href={feature.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-[160px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:min-h-[220px] sm:p-8"
            >
              <feature.icon
                className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                strokeWidth={1.5}
              />
              <div>
                <h3 className="mb-2 text-base font-medium text-white">
                  {feature.title}
                </h3>
                <p className="text-sm font-normal leading-relaxed text-white/50">
                  {feature.description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
