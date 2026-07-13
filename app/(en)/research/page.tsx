"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Users,
  ArrowRight,
  ArrowUpRight,
  Brain,
  Cpu,
  Hospital,
  Zap,
  Activity,
  Github,
  BookOpen,
  Grid3X3,
  Table,
  X,
} from "lucide-react"
import { useState, useMemo } from "react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const researchProjects = [
  {
    icon: Brain,
    title: "VLAM",
    subtitle: "Vision-Language-Action Model",
    description: "A novel multimodal architecture combining vision perception, natural language understanding, and robotic action prediction in a unified framework. Built upon Mamba SSM for efficient processing of long visual sequences.",
    github: "https://github.com/The-Swarm-Corporation/VLAM",
    tags: ["Vision", "Language", "Action", "Robotics"],
    status: "Active",
    impact: "High",
    categories: ["multi-modal", "novel-architecture"]
  },
  {
    icon: Cpu,
    title: "ModelGrid",
    subtitle: "Dynamic Memory Allocation Framework",
    description: "A quantitative framework for dynamic memory allocation in multi-model deployment. Enables efficient resource management and optimization across complex AI systems and distributed computing environments.",
    github: "https://github.com/The-Swarm-Corporation/ModelGrid",
    tags: ["Memory", "Allocation", "Deployment", "Optimization"],
    status: "Active",
    impact: "Medium",
    categories: ["novel-architecture"]
  },
  {
    icon: Hospital,
    title: "HospitalSim",
    subtitle: "Multi-Agent Hospital Simulation",
    description: "Comprehensive simulation of real-world hospital operations using coordinated agent systems. Models patient care protocols, medical staff coordination, resource management, and emergency response systems.",
    github: "https://github.com/The-Swarm-Corporation/HospitalSim",
    tags: ["Healthcare", "Simulation", "Multi-Agent", "Operations"],
    status: "Active",
    impact: "High",
    categories: ["multi-agent", "simulation", "healthcare"]
  },
  {
    icon: Zap,
    title: "DART",
    subtitle: "Diffusion-Autoregressive Recursive Transformer",
    description: "Advanced transformer architecture combining diffusion models with autoregressive generation for enhanced sequence modeling and generation capabilities across multiple domains.",
    github: "https://github.com/The-Swarm-Corporation/DART",
    tags: ["Transformers", "Diffusion", "Generation", "Sequence Modeling"],
    status: "Active",
    impact: "High",
    categories: ["novel-architecture", "language-modeling"]
  },
  {
    icon: Brain,
    title: "SpikeMamba",
    subtitle: "Joint Spiking Neural Network and State Space Model Architecture",
    description: "A novel integration of spiking neural networks (SNNs) with the Mamba state space model architecture, investigating the potential for biologically-inspired temporal dynamics in language modeling.",
    github: "https://github.com/The-Swarm-Corporation/SpikeMamba",
    tags: ["Spiking Neural Networks", "Mamba", "Language Modeling", "Neuromorphic Computing"],
    status: "Active",
    impact: "High",
    categories: ["novel-architecture", "language-modeling"]
  },
  {
    icon: Users,
    title: "Senator Assembly",
    subtitle: "A Large-Scale Multi-Agent Simulation of the US Senate",
    description: "Comprehensive simulation of US Senate operations using coordinated agent systems. Models legislative processes, voting patterns, committee dynamics, and political decision-making in a realistic multi-agent environment.",
    github: "https://github.com/The-Swarm-Corporation/SenatorAssembly",
    tags: ["Multi-Agent", "Simulation", "Politics", "Legislative Process"],
    status: "Active",
    impact: "Medium",
    categories: ["multi-agent", "simulation"]
  }
]

const filterOptions = [
  { id: 'multi-agent', label: 'Multi-Agent', icon: Users },
  { id: 'multi-modal', label: 'Multi-Modal', icon: Brain },
  { id: 'novel-architecture', label: 'Novel Architecture', icon: Cpu },
  { id: 'simulation', label: 'Simulation', icon: Activity },
  { id: 'healthcare', label: 'Healthcare', icon: Hospital },
  { id: 'language-modeling', label: 'Language Modeling', icon: BookOpen },
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
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const clearFilters = () => {
    setActiveFilters([])
  }

  const filteredProjects = useMemo(() => {
    if (activeFilters.length === 0) return researchProjects
    return researchProjects.filter(project =>
      activeFilters.some(filter => project.categories.includes(filter))
    )
  }, [activeFilters])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-white/[0.08] bg-black sm:min-h-[70vh]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Research
              </p>
              <h1
                className="font-bold leading-[0.95] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
              >
                Swarms Research
              </h1>
              <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/50 sm:mt-8 sm:text-lg">
                Advancing multi-agent collaboration, multimodal intelligence,
                and large-scale agentic simulation.
              </p>
              <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="/hiring">
                    Join the team
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
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

            {/* Filters + view toggle */}
            <div className="mx-auto mb-10 flex max-w-7xl flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => {
                  const Icon = filter.icon
                  const isActive = activeFilters.includes(filter.id)
                  return (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? 'border-white bg-white text-black'
                          : 'border-white/[0.14] bg-[#0a0a0a] text-white/50 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{filter.label}</span>
                    </button>
                  )
                })}
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium text-white/40 transition-colors duration-200 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex flex-shrink-0 items-center rounded-full border border-white/[0.14] bg-[#0a0a0a] p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'table' ? 'bg-white text-black' : 'text-white/50 hover:text-white'
                  }`}
                >
                  <Table className="h-4 w-4" />
                  Table
                </button>
              </div>
            </div>

            {/* Projects */}
            {viewMode === 'grid' ? (
              <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredProjects.map((project, index) => {
                  const Icon = project.icon
                  return (
                    <motion.a
                      key={project.title}
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.06, ease }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="group flex flex-col rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                    >
                      <div className="mb-5 flex items-center justify-between">
                        <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-3 transition-colors duration-300 group-hover:border-white/20">
                          <Icon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-white/40">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                          {project.status}
                        </span>
                      </div>

                      <h3 className="mb-1 text-xl font-semibold tracking-tight text-white">
                        {project.title}
                      </h3>
                      <p className="mb-3 text-sm font-medium text-white/50">
                        {project.subtitle}
                      </p>
                      <p className="mb-5 flex-grow text-sm font-normal leading-relaxed text-white/50">
                        {project.description}
                      </p>

                      <div className="mb-5 flex flex-wrap gap-1.5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/50">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-white/40 transition-colors duration-300 group-hover:text-white">
                        <Github className="h-4 w-4" />
                        <span>View on GitHub</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            ) : (
              <motion.div
                className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/[0.08]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:p-5">Project</th>
                        <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:p-5">Description</th>
                        <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:p-5">Categories</th>
                        <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:p-5">Status</th>
                        <th className="p-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:p-5">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => {
                        const Icon = project.icon
                        return (
                          <tr
                            key={project.title}
                            className="border-b border-white/[0.08] transition-colors duration-200 last:border-b-0 hover:bg-[#0a0a0a]"
                          >
                            <td className="p-4 md:p-5">
                              <div className="flex items-center gap-3">
                                <div className="flex-shrink-0 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-2.5">
                                  <Icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                                </div>
                                <div className="min-w-0">
                                  <h3 className="truncate text-sm font-semibold text-white md:text-base">{project.title}</h3>
                                  <p className="truncate text-xs text-white/40">{project.subtitle}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 md:p-5">
                              <p className="line-clamp-3 max-w-xs text-xs font-normal leading-relaxed text-white/50 md:text-sm">
                                {project.description}
                              </p>
                            </td>
                            <td className="p-4 md:p-5">
                              <div className="flex flex-wrap gap-1">
                                {project.categories.map((category) => {
                                  const filter = filterOptions.find(f => f.id === category)
                                  return (
                                    <span key={category} className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-xs text-white/50">
                                      {filter?.label}
                                    </span>
                                  )
                                })}
                              </div>
                            </td>
                            <td className="p-4 md:p-5">
                              <span className="flex items-center gap-1.5 text-xs text-white/40">
                                <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
                                {project.status}
                              </span>
                            </td>
                            <td className="p-4 md:p-5">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-3.5 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:border-white/30 hover:bg-white/[0.06]"
                              >
                                <Github className="h-3.5 w-3.5" />
                                View
                              </a>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {filteredProjects.length === 0 && (
              <div className="py-16 text-center text-white/50">
                <p>No projects match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-white transition-colors hover:text-white/70"
                >
                  Clear filters
                </button>
              </div>
            )}
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
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="/hiring">
                    See open roles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
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
