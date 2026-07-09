"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import {
  Users,
  ArrowRight,
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

      <main className="select-text">
        {/* Hero */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-6 py-24 pt-32">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-black to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neutral-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_60%,transparent_110%)]" />
          </div>

          <motion.div
            className="relative z-10 text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-6">
              Research
            </p>
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent leading-[0.95] tracking-tight">
              Swarms Research
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
              Advancing multi-agent collaboration, multimodal intelligence, and large-scale agentic simulation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="/hiring"
                className="group inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-medium text-base transition-all duration-300 hover:bg-neutral-200"
              >
                <Users className="w-4 h-4" />
                Join the team
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-white px-7 py-3.5 rounded-full font-medium text-base transition-colors duration-300 hover:bg-neutral-800 hover:border-white/20"
              >
                Join Discord
              </a>
            </div>
          </motion.div>
        </section>

        {/* Research Projects */}
        <section className="py-24 px-6 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Portfolio
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                Active projects
              </h2>
              <p className="mt-6 text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
                Past and present research in multi-agent collaboration and multimodal intelligence.
              </p>
            </motion.div>

            {/* Filters + view toggle */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-10">
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((filter) => {
                  const Icon = filter.icon
                  const isActive = activeFilters.includes(filter.id)
                  return (
                    <button
                      key={filter.id}
                      onClick={() => toggleFilter(filter.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border ${
                        isActive
                          ? 'bg-white text-black border-white'
                          : 'bg-neutral-900 text-neutral-400 border-white/10 hover:bg-neutral-800 hover:text-white'
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-neutral-500 hover:text-white transition-colors duration-200"
                  >
                    <X className="h-4 w-4" />
                    Clear
                  </button>
                )}
              </div>

              <div className="flex items-center bg-neutral-900 rounded-full p-1 border border-white/10 flex-shrink-0">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'grid' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-200 ${
                    viewMode === 'table' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <Table className="h-4 w-4" />
                  Table
                </button>
              </div>
            </div>

            {/* Projects */}
            {viewMode === 'grid' ? (
              <div className="grid gap-4 md:gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
                      transition={{ duration: 0.5, delay: index * 0.06 }}
                      viewport={{ once: true }}
                      className="group flex flex-col bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-5">
                        <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-colors duration-300">
                          <Icon className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                        </div>
                        <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-1 tracking-tight">
                        {project.title}
                      </h3>
                      <p className="text-sm text-neutral-400 font-medium mb-3">
                        {project.subtitle}
                      </p>
                      <p className="text-sm text-neutral-400 font-light leading-relaxed mb-5 flex-grow">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.map((tag) => (
                          <span key={tag} className="px-2.5 py-1 text-xs bg-white/5 text-neutral-400 rounded-full border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm text-neutral-500 group-hover:text-white transition-colors duration-300">
                        <Github className="w-4 h-4" />
                        <span>View on GitHub</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            ) : (
              <motion.div
                className="overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/60"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left p-4 md:p-5 text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">Project</th>
                        <th className="text-left p-4 md:p-5 text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">Description</th>
                        <th className="text-left p-4 md:p-5 text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">Categories</th>
                        <th className="text-left p-4 md:p-5 text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">Status</th>
                        <th className="text-left p-4 md:p-5 text-neutral-500 font-medium text-xs uppercase tracking-[0.15em]">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project) => {
                        const Icon = project.icon
                        return (
                          <tr
                            key={project.title}
                            className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.03] transition-colors duration-200"
                          >
                            <td className="p-4 md:p-5">
                              <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg flex-shrink-0">
                                  <Icon className="h-4 w-4 text-neutral-300" strokeWidth={1.5} />
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-sm md:text-base font-semibold text-white truncate">{project.title}</h3>
                                  <p className="text-neutral-500 text-xs truncate">{project.subtitle}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 md:p-5">
                              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-xs line-clamp-3">
                                {project.description}
                              </p>
                            </td>
                            <td className="p-4 md:p-5">
                              <div className="flex flex-wrap gap-1">
                                {project.categories.map((category) => {
                                  const filter = filterOptions.find(f => f.id === category)
                                  return (
                                    <span key={category} className="px-2 py-0.5 text-xs bg-white/5 text-neutral-400 rounded-full border border-white/10">
                                      {filter?.label}
                                    </span>
                                  )
                                })}
                              </div>
                            </td>
                            <td className="p-4 md:p-5">
                              <span className="flex items-center gap-1.5 text-xs text-neutral-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                {project.status}
                              </span>
                            </td>
                            <td className="p-4 md:p-5">
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-neutral-800 border border-white/10 rounded-full text-xs font-medium text-white hover:bg-neutral-700 transition-colors duration-200"
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
              <div className="text-center py-16 text-neutral-400">
                <p>No projects match your filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-white hover:text-neutral-300 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="py-24 px-6 bg-black border-t border-white/5">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Domains
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                Research focus areas
              </h2>
              <p className="mt-6 text-lg text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
                Core domains driving our research initiatives.
              </p>
            </motion.div>

            <div className="grid gap-4 md:gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {focusAreas.map((area, index) => {
                const Icon = area.icon
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.06 }}
                    viewport={{ once: true }}
                    className="flex flex-col bg-neutral-900/60 border border-white/10 rounded-2xl p-6 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit mb-5">
                      <Icon className="w-5 h-5 text-neutral-300" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 tracking-tight">
                      {area.title}
                    </h3>
                    <p className="text-sm text-neutral-400 font-light leading-relaxed mb-5">
                      {area.description}
                    </p>
                    <ul className="mt-auto space-y-2">
                      {area.focus.map((item) => (
                        <li key={item} className="flex items-center gap-2.5">
                          <span className="w-1 h-1 rounded-full bg-neutral-500 flex-shrink-0" />
                          <span className="text-xs text-neutral-500">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-black border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Careers
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
              Join our research team
            </h2>
            <p className="mt-6 text-lg text-neutral-400 mb-10 leading-relaxed font-light max-w-xl mx-auto">
              Help shape the future of autonomous systems and multimodal intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <a
                href="/hiring"
                className="group inline-flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:bg-neutral-200"
              >
                See open roles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-neutral-900 border border-white/10 text-white px-8 py-4 rounded-full font-medium text-base transition-colors duration-300 hover:bg-neutral-800 hover:border-white/20"
              >
                Join Discord
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
