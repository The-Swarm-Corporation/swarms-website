"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CardWrapper } from "@/components/card-wrapper"
import { Badge } from "@/components/ui/badge"
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
  Sparkles,
  Layers,
  TrendingUp,
  ChevronRight,
  Star,
  Grid3X3,
  Table,
  X,
  CheckCircle,
} from "lucide-react"
import { useState, useMemo } from "react"

const researchProjects = [
  {
    icon: Brain,
    title: "VLAM",
    subtitle: "Vision-Language-Action Model",
    description: "A novel multimodal architecture combining vision perception, natural language understanding, and robotic action prediction in a unified framework. Built upon Mamba SSM for efficient processing of long visual sequences.",
    gradient: "from-red-500/20 to-red-600/20",
    borderGradient: "from-red-500/30 to-red-600/30",
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
    gradient: "from-red-400/20 to-red-500/20",
    borderGradient: "from-red-400/30 to-red-500/30",
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
    gradient: "from-red-600/20 to-red-700/20",
    borderGradient: "from-red-600/30 to-red-700/30",
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
    gradient: "from-red-500/20 to-red-600/20",
    borderGradient: "from-red-500/30 to-red-600/30",
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
    gradient: "from-red-600/20 to-red-700/20",
    borderGradient: "from-red-600/30 to-red-700/30",
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
    gradient: "from-red-500/20 to-red-600/20",
    borderGradient: "from-red-500/30 to-red-600/30",
    github: "https://github.com/The-Swarm-Corporation/SenatorAssembly",
    tags: ["Multi-Agent", "Simulation", "Politics", "Legislative Process"],
    status: "Active",
    impact: "Medium",
    categories: ["multi-agent", "simulation"]
  }
]

export default function ResearchPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid')
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  // Filter configuration
  const filterOptions = [
    { id: 'multi-agent', label: 'Multi-Agent', icon: Users },
    { id: 'multi-modal', label: 'Multi-Modal', icon: Brain },
    { id: 'novel-architecture', label: 'Novel Architecture', icon: Cpu },
    { id: 'simulation', label: 'Simulation', icon: Activity },
    { id: 'healthcare', label: 'Healthcare', icon: Hospital },
    { id: 'language-modeling', label: 'Language Modeling', icon: BookOpen },
  ]

  // Filter logic
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

  // Animation variants - consolidated and optimized
  const animations = {
    container: {
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0.1,
        },
      },
    },
    item: {
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.5, 
          ease: [0.25, 0.46, 0.45, 0.94] // Custom easing
        } 
      },
    },
    fadeInUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
          duration: 0.6, 
          ease: [0.25, 0.46, 0.45, 0.94] 
        } 
      },
    },
    stagger: {
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay: i * 0.1,
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      })
    }
  }

  // CSS class utilities for better maintainability
  const styles = {
    // Layout classes
    container: "container relative px-4 sm:px-6 lg:px-8",
    section: "relative py-16 md:py-24 lg:py-32",
    
    // Background classes
    heroBg: "relative min-h-screen overflow-hidden bg-black",
    sectionBg: "bg-gradient-to-b from-black via-gray-900/20 to-black",
    
    // Text classes
    heading: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white font-orbitron",
    subheading: "text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed",
    
    // Button classes
    primaryButton: "group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-4 border-0 shadow-2xl shadow-red-500/25 font-orbitron",
    secondaryButton: "group border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-4 bg-black/30 backdrop-blur-sm",
    
    // Card classes
    projectCard: "relative h-full overflow-hidden border-0 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl",
    cardHover: "transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group",
    
    // Filter classes
    filterButton: "group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 text-sm font-medium",
    filterActive: "bg-red-600 hover:bg-red-700 text-white border-red-500",
    filterInactive: "border-red-500/50 text-red-300 hover:bg-red-500/10 hover:border-red-500",
    
    // Status classes
    statusActive: "text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full border border-green-500/30",
    impactHigh: "text-xs px-3 py-1 bg-red-500/20 text-red-400 rounded-full border border-red-500/30",
    impactMedium: "text-xs px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30",
    
    // Grid classes
    projectGrid: "grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    focusGrid: "grid gap-6 md:grid-cols-2 lg:grid-cols-4",
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="select-text">
        {/* Hero Section */}
        <div className={styles.heroBg}>
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-600/5 rounded-full blur-2xl animate-pulse delay-500" />
          </div>

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:60px_60px] opacity-40" />

          {/* Content */}
          <div className={`${styles.container} min-h-screen flex items-center justify-center z-10 pt-20 md:pt-24`}>
            <div className="text-center max-w-6xl mx-auto">
              <motion.div
                className="space-y-8 md:space-y-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white font-orbitron tracking-tighter leading-[0.85]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                    Swarms
                  </span>
                  <span className="block text-white">
                    Research
                  </span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                    Department
                  </span>
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Advancing 
                  <span className="text-red-400 font-medium"> multi-agent research</span>, 
                  <span className="text-red-400 font-medium"> multi-modal research</span>, and 
                  <span className="text-red-400 font-medium"> large-scale agentic simulations</span>
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <Button
                    size="lg"
                    className={styles.primaryButton}
                    asChild
                  >
                    <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                      <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>JOIN DISCORD</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={styles.secondaryButton}
                    asChild
                  >
                    <a href="/hiring" className="flex items-center space-x-3">
                      <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>JOIN RESEARCH</span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Research Projects */}
        <div className={`${styles.section} bg-black`}>
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-gray-900/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(239,68,68,0.05)_0%,transparent_50%)]" />
          
          <div className={`${styles.container} z-10`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-6">
                <Star className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Research Portfolio</span>
              </div>
              
              <h2 className={styles.heading}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                  Active Research
                </span>
                <br />
                <span className="text-white">Projects</span>
              </h2>
              
              <p className={styles.subheading}>
                Groundbreaking initiatives pushing the boundaries of artificial intelligence and autonomous systems
              </p>
            </motion.div>

            {/* Filter Controls */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-3">
                  {filterOptions.map((filter) => {
                    const Icon = filter.icon
                    const isActive = activeFilters.includes(filter.id)
                    return (
                      <Button
                        key={filter.id}
                        variant={isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleFilter(filter.id)}
                        className={`${styles.filterButton} ${
                          isActive ? styles.filterActive : styles.filterInactive
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{filter.label}</span>
                        {isActive && <CheckCircle className="h-4 w-4" />}
                      </Button>
                    )
                  })}
                  {activeFilters.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearFilters}
                        className="text-red-400 hover:text-white hover:bg-red-500/10 px-3 py-2 rounded-lg transition-all duration-300"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Clear All
                      </Button>
                  )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-gray-400 font-medium">View:</span>
                  <div className="flex bg-red-500/10 rounded-lg p-1 border border-red-500/20">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-1 rounded-md transition-all duration-300 ${
                        viewMode === 'grid'
                          ? 'bg-red-600 text-white'
                          : 'text-red-300 hover:text-white hover:bg-red-500/20'
                      }`}
                    >
                      <Grid3X3 className="h-4 w-4 mr-2" />
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === 'table' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('table')}
                      className={`px-3 py-1 rounded-md transition-all duration-300 ${
                        viewMode === 'table'
                          ? 'bg-red-600 text-white'
                          : 'text-red-300 hover:text-white hover:bg-red-500/20'
                      }`}
                    >
                      <Table className="h-4 w-4 mr-2" />
                      Table
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilters.length > 0 && (
                <motion.div 
                  className="mt-6 flex items-center space-x-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-sm text-gray-400">Active filters:</span>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filterId) => {
                      const filter = filterOptions.find(f => f.id === filterId)
                      return (
                        <Badge
                          key={filterId}
                          variant="secondary"
                          className="bg-red-600/20 text-red-300 border-red-500/30 px-3 py-1 transition-all duration-300 hover:bg-red-600/30"
                        >
                          {filter?.label}
                          <button
                            onClick={() => toggleFilter(filterId)}
                            className="ml-2 hover:text-white transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Projects Display */}
            {viewMode === 'grid' ? (
              <motion.div
                className={styles.projectGrid}
                variants={animations.container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
              >
                {filteredProjects.map((project, index) => {
                const Icon = project.icon
                return (
                  <motion.div key={index} variants={animations.item} className="h-full">
                    <CardWrapper className={`h-full ${styles.cardHover}`}>
                      <Card className={styles.projectCard}>
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Border gradient */}
                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${project.borderGradient} p-[1px]`}>
                          <div className="h-full w-full rounded-lg bg-black/90" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col p-6 md:p-8">
                          {/* Header */}
                          <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center space-x-4">
                              <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                                <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                              </div>
                              <div>
                                <div className="flex flex-col sm:flex-row gap-2">
                                  <span className={styles.statusActive}>
                                    {project.status}
                                  </span>
                                  <span className={project.impact === 'High' ? styles.impactHigh : styles.impactMedium}>
                                    {project.impact} Impact
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-grow">
                            <h3 className="text-xl md:text-2xl font-black text-white mb-2 font-orbitron tracking-tight">
                              {project.title}
                            </h3>
                            <p className="text-red-400 font-semibold text-base md:text-lg mb-4 font-orbitron">
                              {project.subtitle}
                            </p>
                            <p className="text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                              {project.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.tags.map((tag, tagIndex) => (
                                <span key={tagIndex} className="px-3 py-1 text-xs bg-red-500/10 text-red-300 rounded-full border border-red-500/20 backdrop-blur-sm">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="mt-auto">
                            <Button
                              size="lg"
                              className="group/btn w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:scale-105 transform transition-all duration-300 font-bold text-sm px-6 py-3 border-0 shadow-2xl shadow-red-500/25 font-orbitron"
                              asChild
                            >
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-3"
                              >
                                <Github className="h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                                <span>EXPLORE PROJECT</span>
                                <ChevronRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                              </a>
                            </Button>
                          </div>
                        </div>

                        {/* Hover effect line */}
                        <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                      </Card>
                    </CardWrapper>
                  </motion.div>
                )
              })}
            </motion.div>
            ) : (
              /* Table View */
              <motion.div
                className="overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                viewport={{ once: true }}
              >
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-red-500/20">
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Project</th>
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Description</th>
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Categories</th>
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Status</th>
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Impact</th>
                        <th className="text-left p-4 md:p-6 text-red-300 font-semibold text-xs md:text-sm uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProjects.map((project, index) => {
                        const Icon = project.icon
                        return (
                          <motion.tr
                            key={index}
                            className="border-b border-red-500/10 hover:bg-red-500/5 transition-colors duration-300"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                            viewport={{ once: true }}
                          >
                            <td className="p-4 md:p-6">
                              <div className="flex items-center space-x-3 md:space-x-4">
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center shadow-lg flex-shrink-0`}>
                                  <Icon className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </div>
                                <div className="min-w-0">
                                  <h3 className="text-base md:text-lg font-bold text-white truncate">{project.title}</h3>
                                  <p className="text-red-300 text-xs md:text-sm font-medium truncate">{project.subtitle}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 md:p-6">
                              <p className="text-gray-300 text-xs md:text-sm leading-relaxed max-w-xs line-clamp-3">
                                {project.description}
                              </p>
                            </td>
                            <td className="p-4 md:p-6">
                              <div className="flex flex-wrap gap-1">
                                {project.categories.map((category) => {
                                  const filter = filterOptions.find(f => f.id === category)
                                  return (
                                    <Badge
                                      key={category}
                                      variant="secondary"
                                      className="bg-red-600/20 text-red-300 border-red-500/30 text-xs px-2 py-1"
                                    >
                                      {filter?.label}
                                    </Badge>
                                  )
                                })}
                              </div>
                            </td>
                            <td className="p-4 md:p-6">
                              <span className={styles.statusActive}>
                                {project.status}
                              </span>
                            </td>
                            <td className="p-4 md:p-6">
                              <span className={project.impact === 'High' ? styles.impactHigh : styles.impactMedium}>
                                {project.impact}
                              </span>
                            </td>
                            <td className="p-4 md:p-6">
                              <Button
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:border-red-400 transition-all duration-300"
                                asChild
                              >
                                <a
                                  href={project.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center space-x-2"
                                >
                                  <Github className="h-4 w-4" />
                                  <span className="hidden sm:inline">View</span>
                                </a>
                              </Button>
                            </td>
                          </motion.tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Research Focus Areas */}
        <div className={`${styles.section} ${styles.sectionBg}`}>
          {/* Background elements */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(239,68,68,0.08)_0%,transparent_70%)]" />
          
          <div className={`${styles.container} z-10`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-6">
                <Layers className="h-4 w-4 text-red-400" />
                <span className="text-sm font-medium text-red-300">Research Domains</span>
              </div>
              
              <h2 className={styles.heading}>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                  Research Focus
                </span>
                <br />
                <span className="text-white">Areas</span>
              </h2>
              
              <p className={styles.subheading}>
                Core domains driving our research initiatives and technological innovations
              </p>
            </motion.div>

            <motion.div
              className={styles.focusGrid}
              variants={animations.container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  icon: Brain,
                  title: "MULTIMODAL AI",
                  description: "Advanced models that seamlessly integrate vision, language, and action modalities for comprehensive AI understanding and generation",
                  gradient: "from-red-500/20 to-red-600/20",
                  borderGradient: "from-red-500/30 to-red-600/30",
                  focus: ["Vision-Language Models", "Action Prediction", "Cross-Modal Learning"],
                  color: "red"
                },
                {
                  icon: Activity,
                  title: "AUTONOMOUS SYSTEMS",
                  description: "Research into fully autonomous systems capable of independent decision-making, coordination, and adaptation in complex environments",
                  gradient: "from-red-400/20 to-red-500/20",
                  borderGradient: "from-red-400/30 to-red-500/30",
                  focus: ["Multi-Agent Coordination", "Decision Making", "Adaptive Systems"],
                  color: "orange"
                },
                {
                  icon: Hospital,
                  title: "DOMAIN SIMULATION",
                  description: "Creating realistic simulations of complex real-world systems including healthcare, organizations, and economic systems",
                  gradient: "from-red-600/20 to-red-700/20",
                  borderGradient: "from-red-600/30 to-red-700/30",
                  focus: ["Healthcare Systems", "Organizational Dynamics", "Economic Models"],
                  color: "red"
                },
                {
                  icon: Cpu,
                  title: "SYSTEM OPTIMIZATION",
                  description: "Developing frameworks for efficient resource allocation, memory management, and computational optimization in distributed AI systems",
                  gradient: "from-red-500/20 to-red-600/20",
                  borderGradient: "from-red-500/30 to-red-600/30",
                  focus: ["Resource Management", "Memory Allocation", "Scalable Computing"],
                  color: "red"
                }
              ].map((area, index) => {
                const Icon = area.icon
                return (
                  <motion.div key={index} variants={animations.item}>
                    <CardWrapper className={`h-full ${styles.cardHover}`}>
                      <Card className="relative h-full overflow-hidden border-0 bg-gradient-to-br from-gray-900/30 to-black/60 backdrop-blur-xl">
                        {/* Animated background gradient */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${area.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        
                        {/* Border gradient */}
                        <div className={`absolute inset-0 rounded-lg bg-gradient-to-r ${area.borderGradient} p-[1px]`}>
                          <div className="h-full w-full rounded-lg bg-black/80" />
                        </div>

                        <div className="relative z-10 h-full flex flex-col p-5 md:p-6">
                          {/* Icon */}
                          <div className="relative mb-6">
                            <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${area.gradient} flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                              <Icon className="h-7 w-7 md:h-8 md:w-8 text-white" />
                            </div>
                            <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>

                          {/* Content */}
                          <div className="flex-grow">
                            <h3 className="text-lg md:text-xl font-black text-white mb-4 tracking-wider font-orbitron">
                              {area.title}
                            </h3>
                            <p className="text-gray-300 leading-relaxed text-sm mb-6">
                              {area.description}
                            </p>

                            {/* Focus areas */}
                            <div className="space-y-2 md:space-y-3">
                              {area.focus.map((item, itemIndex) => (
                                <div key={itemIndex} className="flex items-center space-x-3">
                                  <div className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                                  <span className="text-xs text-gray-400 font-medium">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Hover effect line */}
                          <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                        </div>
                      </Card>
                    </CardWrapper>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className={`${styles.section} bg-black`}>
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-gray-900/30 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.1)_0%,transparent_70%)]" />
          
          <div className={`${styles.container} z-10`}>
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-2xl px-6 md:px-8 py-16 md:py-20 lg:py-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Animated background elements */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
              
              <div className="relative mx-auto max-w-5xl text-center">
                <motion.div
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 backdrop-blur-sm mb-8"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <TrendingUp className="h-4 w-4 text-red-400" />
                  <span className="text-sm font-medium text-red-300">Join the Future</span>
                </motion.div>

                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-8 font-orbitron leading-[0.9]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <span className="text-white">JOIN OUR </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                    RESEARCH
                  </span>
                  <br />
                  <span className="text-white">TEAM</span>
                </motion.h2>

                <motion.p
                  className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  Join our research team and help shape the future of 
                  <span className="text-red-400 font-medium"> autonomous systems</span> and 
                  <span className="text-red-400 font-medium"> multimodal intelligence</span>
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className={styles.primaryButton}
                    asChild
                  >
                    <a href="/hiring" className="flex items-center space-x-3">
                      <Users className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>JOIN OUR TEAM</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className={styles.secondaryButton}
                    asChild
                  >
                    <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                      <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>JOIN DISCORD</span>
                    </a>
                  </Button>
                </motion.div>

              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
