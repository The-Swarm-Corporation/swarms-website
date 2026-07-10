"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Building,
  Users,
  Activity,
  ArrowRight,
  ArrowUpRight,
  MessageCircle,
  Database,
  Search,
  GitBranch,
  ExternalLink,
  ShoppingBag,
} from "lucide-react"
import Image from "next/image"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const domains = [
  {
    icon: Building,
    title: "Autonomous Corporations",
    description: "Complete corporate hierarchies with agent employees across all departments — from engineering teams to executive decision-making, financial planning, and operations management.",
    image: "/generation-408b1bc1-baaa-42d9-8644-839b1a6aef4d.png",
    imageAlt: "Corporate Agent Hierarchy Visualization",
    cta: { label: "Coming soon", href: "https://github.com/kyegomez/swarms", variant: "outline" as const },
  },
  {
    icon: Users,
    title: "Autonomous Senate",
    description: "Legislative simulation with agent senators representing constituencies, conducting policy debates, coalition building, and legislative processes with realistic political dynamics.",
    image: "/generation-810573f6-57a8-4cc4-b777-fb289b42760a.png",
    imageAlt: "Legislative Agent Interaction Map",
    cta: { label: "Get started", href: "https://github.com/kyegomez/swarms", variant: "default" as const },
  },
  {
    icon: Activity,
    title: "Autonomous Hospitals",
    description: "Healthcare system simulation with coordinated medical staff agents, patient care protocols, resource management, and emergency response coordination.",
    image: "/generation-c179a831-b828-467c-b51b-730fcfe8d4ef.png",
    imageAlt: "Healthcare Agent Coordination System",
    cta: { label: "Get started", href: "https://github.com/The-Swarm-Corporation/HospitalSim", variant: "default" as const },
  },
  {
    icon: ShoppingBag,
    title: "Product Marketing Agency",
    description: "Multi-agent marketing system generating professional product images and content. Specialized agents collaborate to create comprehensive marketing campaigns with diverse visual styles.",
    image: "product_agency.jpg",
    imageAlt: "Product Marketing Agent Network",
    cta: { label: "Get started", href: "https://github.com/The-Swarm-Corporation/Product-Marketing-Agency", variant: "default" as const },
  },
]

const infrastructure = [
  {
    icon: MessageCircle,
    title: "Multi-Agent Communication",
    description: "Distributed message passing protocols enabling real-time coordination between thousands of agents with guaranteed delivery and ordering.",
    specs: ["P2P Message Routing", "Event Sourcing", "State Synchronization"],
  },
  {
    icon: GitBranch,
    title: "Social Algorithms",
    description: "Behavioral modeling systems that simulate realistic social dynamics, relationship formation, and group decision-making processes.",
    specs: ["Relationship Graphs", "Influence Networks", "Group Dynamics"],
  },
  {
    icon: Search,
    title: "Agent Discovery",
    description: "Service mesh protocols allowing agents to discover capabilities, form teams, and delegate tasks based on expertise and availability.",
    specs: ["Capability Matching", "Load Balancing", "Task Routing"],
  },
  {
    icon: Database,
    title: "Distributed Memory",
    description: "Scalable knowledge sharing systems with persistent memory, experience replay, and collaborative learning across agent populations.",
    specs: ["Vector Databases", "Memory Pooling", "Knowledge Graphs"],
  },
]

export default function SimulationsPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center overflow-hidden border-b border-white/[0.08] bg-black">
          {/* Full-screen background image */}
          <div className="absolute inset-0">
            <Image
              src="/simulation.png"
              alt="Large Scale Multi-Agent Simulation Architecture - Swarms AI Autonomous Agent Infrastructure for Organizational Simulation"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>

          {/* Hairline grid overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Simulations
              </p>
              <h1
                className="font-bold leading-[0.95] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
              >
                Large scale multi-agent simulations
              </h1>

              <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl">
                At Swarms, we&apos;re building large-scale multi-agent
                infrastructure to simulate organizations with thousands of
                coordinated agents.
              </p>

              <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="/hiring">
                    Join the team
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    GitHub
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What We're Building */}
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
                Simulating the world economy
              </h2>
              <p className="mt-5 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Digital replicas of complex human organizations using
                coordinated agent systems.
              </p>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {domains.map((domain) => {
                const Icon = domain.icon
                return (
                  <motion.div key={domain.title} variants={item} className="h-full">
                    <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/[0.08] bg-black transition-colors duration-300 hover:bg-[#0a0a0a]">
                      <div className="relative h-40 flex-shrink-0 overflow-hidden sm:h-48">
                        <Image
                          src={domain.image}
                          alt={`${domain.imageAlt} - ${domain.title} Multi-Agent System Visualization - Swarms AI Enterprise Agent Infrastructure`}
                          width={400}
                          height={200}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                        <div className="absolute left-3 top-3 flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.14] bg-black/70 backdrop-blur-sm sm:left-4 sm:top-4 sm:h-11 sm:w-11">
                          <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-5 sm:p-6">
                        <h3 className="mb-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                          {domain.title}
                        </h3>
                        <p className="mb-6 flex-1 text-sm font-normal leading-relaxed text-white/50">
                          {domain.description}
                        </p>
                        <Button
                          size="sm"
                          className={
                            domain.cta.variant === "default"
                              ? "w-full rounded-full bg-white text-sm font-medium text-black hover:bg-neutral-200"
                              : "w-full rounded-full border-white/[0.14] bg-black text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                          }
                          variant={domain.cta.variant === "default" ? "default" : "outline"}
                          asChild
                        >
                          <a
                            href={domain.cta.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2"
                          >
                            <span>{domain.cta.label}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* How We're Building It */}
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
                Infrastructure
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Building simulation infrastructure
              </h2>
              <p className="mt-5 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Core infrastructure systems enabling coordination at
                unprecedented scale.
              </p>
              <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    GitHub
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    Documentation
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {infrastructure.map((tech) => {
                const Icon = tech.icon
                return (
                  <motion.div
                    key={tech.title}
                    variants={item}
                    className="group flex min-h-[240px] flex-col bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                  >
                    <Icon
                      className="mb-5 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    <h3 className="mb-2 text-base font-medium text-white">
                      {tech.title}
                    </h3>
                    <p className="mb-5 text-sm font-normal leading-relaxed text-white/50">
                      {tech.description}
                    </p>
                    <div className="mt-auto space-y-2">
                      {tech.specs.map((spec) => (
                        <div key={spec} className="flex items-center gap-2.5">
                          <span className="h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                          <span className="text-xs text-white/40">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-8 text-center sm:p-12"
            >
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Transform simulation into reality
              </h2>
              <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Join our engineering team building the infrastructure for
                autonomous digital societies that will reshape how
                organizations operate.
              </p>
              <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="/hiring">
                    Join our team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    GitHub
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
