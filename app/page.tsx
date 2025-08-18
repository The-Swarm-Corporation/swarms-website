"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardWrapper } from "@/components/card-wrapper"
import { motion } from "framer-motion"
import { 
  Terminal, ArrowRight, Zap, Cpu, Globe, Store, ExternalLink, 
  Network, Rocket, Eye, Shield, BookOpen, Code, FileText, Github,
  Calendar, Clock, User, Tag
} from "lucide-react"
import { TypingEffect } from "@/components/typing-effect"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"

export default function Home() {
  // Updated ticker announcements with the new messaging
  const tickerAnnouncements = [
    // Core benefits
    "BUILD MULTI-AGENT STRUCTURES",
    "构建多智能体结构",
    "マルチエージェント構造を構築",

    // Deployment
    "DEPLOY AGENTS INTO PRODUCTION",
    "将智能体部署到生产环境",
    "エージェントを本番環境にデプロイ",

    // Monitoring
    "MONITOR & OBSERVE YOUR AGENTS",
    "监控和观察您的智能体",
    "エージェントを監視・観察",

    // Automation
    "AUTOMATE YOUR ENTERPRISE",
    "自动化您的企业",
    "エンタープライズを自動化",

    // Product announcement
    "NEW: Swarms v2.0 - The First Multi-Agent Framework in Rust",
  ]

  const benefits = [
    {
      icon: Network,
      title: "BUILD MULTI-AGENT STRUCTURES",
      description: "Create complex hierarchical, sequential, and parallel agent collaboration systems with unprecedented flexibility",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Rocket,
      title: "DEPLOY AGENTS INTO PRODUCTION",
      description: "Seamlessly deploy your agent swarms to production environments with enterprise-grade reliability and scaling",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Eye,
      title: "MONITOR & OBSERVE YOUR AGENTS",
      description: "Real-time monitoring, observability, and debugging tools to track agent performance and behavior",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Zap,
      title: "AUTOMATE YOUR ENTERPRISE",
      description: "Transform your organization with intelligent automation powered by coordinated agent swarms",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Cpu,
      title: "RADICALLY SIMPLE TO USE",
      description: "Backwards compatible with every framework - LangChain, AutoGen, tools, MCP integration, RAG integration",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Shield,
      title: "ENTERPRISE-GRADE FEATURES",
      description: "Advanced security, compliance, and governance features built for mission-critical applications",
      gradient: "from-red-700 to-red-800"
    }
  ]

  const swarmsStack = [
    {
      icon: Cpu,
      title: "SWARMS-RS",
      subtitle: "The First Multi-Agent Framework in Rust",
      description: "Ultra-fast, memory-safe, and production-ready multi-agent framework built in Rust for maximum performance and reliability.",
      gradient: "from-red-600 to-red-700",
      link: "https://crates.io/crates/swarms-rs",
      docsLink: "https://docs.swarms.world",
      badge: "RUST"
    },
    {
      icon: Zap,
      title: "SWARMS PYTHON",
      subtitle: "Core Swarms Python Framework",
      description: "The original Swarms framework in Python with full backwards compatibility with LangChain, AutoGen, and other popular frameworks.",
      gradient: "from-red-500 to-red-600",
      link: "https://github.com/kyegomez/swarms",
      docsLink: "https://docs.swarms.world",
      badge: "PYTHON"
    },
    {
      icon: Globe,
      title: "SWARMS API",
      subtitle: "Ultra-Optimized Hosted Runtime",
      description: "Enterprise-grade hosted API with ultra-optimized runtime for deploying and scaling your agent swarms in production.",
      gradient: "from-red-700 to-red-800",
      link: "https://docs.swarms.ai",
      docsLink: "https://docs.swarms.ai",
      badge: "API"
    },
    {
      icon: Store,
      title: "SWARMS MARKETPLACE",
      subtitle: "Buy & Sell Agents, Prompts & More",
      description: "Discover, buy, and sell agents, prompts, tools, and components on swarms.world - the premier marketplace for AI agents.",
      gradient: "from-red-600 to-red-700",
      link: "https://swarms.world",
      docsLink: "https://swarms.world",
      badge: "MARKETPLACE"
    }
  ]

  const cookbookResources = [
    {
      icon: BookOpen,
      title: "Examples Overview",
      description: "Complete examples directory with comprehensive guides and tutorials",
      link: "https://docs.swarms.world/en/latest/examples/",
      gradient: "from-red-600 to-red-700",
      badge: "GUIDES"
    },
    {
      icon: Code,
      title: "Cookbook Index",
      description: "Curated example collection with best practices and patterns",
      link: "https://docs.swarms.world/en/latest/examples/cookbook_index/",
      gradient: "from-red-500 to-red-600",
      badge: "COOKBOOK"
    },
    {
      icon: FileText,
      title: "Paper Implementations",
      description: "Research paper implementations and academic examples",
      link: "https://docs.swarms.world/en/latest/examples/paper_implementations/",
      gradient: "from-red-700 to-red-800",
      badge: "RESEARCH"
    },
    {
      icon: ExternalLink,
      title: "Templates & Applications",
      description: "Reusable templates and production-ready applications",
      link: "https://docs.swarms.world/en/latest/examples/templates/",
      gradient: "from-red-600 to-red-700",
      badge: "TEMPLATES"
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ScrollingTicker
        announcements={tickerAnnouncements}
        className="py-3 bg-black/80 border-y border-red-600/30 backdrop-blur-sm"
      />
      
      <main id="main-content" role="main" className="select-text">
        <div className="sr-only">
          <h1>Swarms AI - Enterprise Multi-Agent Framework</h1>
          <p>Build, deploy, and scale autonomous AI agent swarms with unprecedented control and efficiency</p>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-black">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" aria-hidden="true" />
          <AnimatedBackground particleColor="rgba(239, 68, 68, 0.3)" className="opacity-30" />

          {/* Dynamic cyberpunk elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div
              className="absolute w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[100px] animate-pulse"
              style={{ top: "10%", left: "5%" }}
            />
            <div
              className="absolute w-[300px] h-[300px] rounded-full bg-red-500/5 blur-[80px] animate-pulse"
              style={{ top: "70%", right: "10%", animationDelay: "1s" }}
            />
          </div>

          <div className="container relative px-4 sm:px-6">
            <div className="flex flex-col items-center justify-center space-y-12 py-24 md:py-36 text-center">
              <motion.div
                className="space-y-8 md:space-y-12 select-text"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Glitch effect title */}
                <motion.div
                  className="relative select-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100,
                  }}
                >
                  <h1
                    id="hero-title"
                    className="relative select-text"
                    style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text', msUserSelect: 'text' }}
                  >
                    <span 
                      className="font-orbitron text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 animate-pulse select-text leading-none"
                      style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text', msUserSelect: 'text' }}
                    >
                      swarms
                    </span>
                  </h1>
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse" />
                </motion.div>

                <motion.p
                  className="text-lg md:text-4xl text-gray-300 max-w-3xl mx-auto font-light font-orbitron select-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  The Enterprise-Grade Multi-Agent Infrastructure Stack
                </motion.p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-6 sm:space-x-6 w-full sm:w-auto relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 w-full sm:w-auto font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron relative z-20 pointer-events-auto"
                  asChild
                >
                  <a
                    href="https://github.com/kyegomez/swarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get started with Swarms AI on GitHub"
                    className="flex items-center space-x-2 pointer-events-auto"
                  >
                    <Zap className="h-5 w-5" />
                    <span>Get Started</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:scale-105 transform transition-all duration-300 w-full sm:w-auto font-mono text-lg px-8 py-6 bg-black/50 backdrop-blur-sm font-orbitron relative z-20 pointer-events-auto"
                >
                  <Terminal className="mr-3 h-5 w-5" aria-hidden="true" />
                  <span aria-label="Installation command">pip install -U swarms</span>
                </Button>
              </motion.div>

              {/* Cyberpunk stats */}
              <motion.div
                className="grid grid-cols-3 gap-8 mt-16 select-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
              >
              {[
                { value: "160k+", label: "Users" },
                { value: "1.9Billion+", label: "Agents Deployed" },
                { value: "99.9%", label: "Uptime" }
                ].map((stat, index) => (
                  <div key={index} className="text-center select-text">
                    <div className="text-3xl md:text-4xl font-black text-red-500 mb-2 font-orbitron select-text">{stat.value}</div>
                    <div className="text-sm text-gray-400 font-sans tracking-wider select-text">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                BENEFITS OF SWARMS
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
              Transform your organization with the most advanced multi-agent framework ever created
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <motion.div key={index} variants={item}>
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-12px] hover:scale-105 group">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <CardHeader className="relative z-10">
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${benefit.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <CardTitle className="text-xl text-white font-bold mb-4 tracking-wider font-orbitron">
                          {benefit.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed font-sans">
                          {benefit.description}
                        </CardDescription>
                      </CardHeader>
                      
                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                    </Card>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom accent */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center space-x-4 text-red-500 font-orbitron tracking-wider">
              <div className="w-8 h-px bg-red-500" />
              <span className="text-sm">READY TO TRANSFORM YOUR ENTERPRISE?</span>
              <div className="w-8 h-px bg-red-500" />
            </div>
          </motion.div>
        </div>

        {/* Swarms Stack Section */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                The Swarms Stack
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
              A complete ecosystem for building, deploying, and scaling multi-agent systems
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {swarmsStack.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div key={index} variants={item}>
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="relative">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full">
                            <span className="text-xs font-orbitron text-red-400 tracking-wider">{item.badge}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl text-white font-black mb-2 tracking-wider font-orbitron">
                          {item.title}
                        </CardTitle>
                        <p className="text-red-400 font-semibold mb-4 tracking-wide font-sans">
                          {item.subtitle}
                        </p>
                        <CardDescription className="text-gray-300 leading-relaxed text-base font-sans">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <div className="p-6 pt-0 relative z-10">
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                            asChild
                          >
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <span>GET STARTED</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                            asChild
                          >
                            <a
                              href={item.docsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <span>DOCS</span>
                              <ExternalLink className="h-4 w-4" />
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

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
              asChild
            >
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>START BUILDING WITH SWARMS</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative overflow-hidden">
          {/* Static Grid Canvas Background */}
          <div className="absolute inset-0">
            {/* Static grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Features
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
              Swarms has pioneered world-class infrastructure for multi-agent collaboration such as communication protocols, optimized runtimes, memory systems, and simulation environments.
            </p>
          </motion.div>

          {/* Dynamic Grid Layout */}
          <div className="relative z-10">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {[
                {
                  title: "Multi-Agent Architectures",
                  description: "Build complex hierarchical, sequential, and parallel agent collaboration systems",
                  link: "https://docs.swarms.world",
                  icon: "🔗",
                  position: "col-span-1 md:col-span-2 lg:col-span-1"
                },
                {
                  title: "Agent-To-Agent Communication Protocols",
                  description: "Advanced communication protocols for seamless agent interaction",
                  link: "https://docs.swarms.world",
                  icon: "📡",
                  position: "col-span-1"
                },
                {
                  title: "Ultra-Optimized Agent Execution Runtime",
                  description: "High-performance runtime for maximum agent efficiency and speed",
                  link: "https://docs.swarms.world",
                  icon: "⚡",
                  position: "col-span-1 md:col-span-2 lg:col-span-1"
                },
                {
                  title: "Multi-Agent Memory Systems",
                  description: "Sophisticated memory management for complex agent workflows",
                  link: "https://docs.swarms.world",
                  icon: "🧠",
                  position: "col-span-1"
                },
                {
                  title: "Multi-Agent Simulation Environments",
                  description: "Advanced simulation environments for testing and training agent swarms",
                  link: "https://docs.swarms.world",
                  icon: "🌐",
                  position: "col-span-1 md:col-span-2 lg:col-span-1"
                },
                {
                  title: "Enterprise Security & Compliance",
                  description: "Built-in security, governance, and compliance features for enterprise deployments",
                  link: "https://docs.swarms.world",
                  icon: "🛡️",
                  position: "col-span-1"
                }
              ].map((feature, index) => (
                <motion.div 
                  key={index} 
                  variants={item}
                  className={feature.position}
                >
                  <CardWrapper className="h-full transition-all duration-700 hover:translate-y-[-12px] hover:scale-[1.03] group">
                    <Card className="border-2 border-red-500/30 bg-black/60 backdrop-blur-md h-full relative overflow-hidden">
                      {/* Animated border glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      
                      {/* Floating particles */}
                      <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                          className="absolute w-2 h-2 bg-red-500 rounded-full"
                          animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.5,
                          }}
                          style={{ top: "20%", left: "10%" }}
                        />
                        <motion.div
                          className="absolute w-1 h-1 bg-red-400 rounded-full"
                          animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: index * 0.7,
                          }}
                          style={{ top: "70%", right: "15%" }}
                        />
                      </div>

                      <CardHeader className="relative z-10 text-center p-8">
                        <div className="text-4xl mb-4">{feature.icon}</div>
                        <CardTitle className="text-xl text-white font-black mb-4 tracking-wider font-orbitron">
                          {feature.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed text-base font-sans">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <div className="p-8 pt-0 relative z-10">
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 hover:text-white transition-all duration-500 font-orbitron tracking-wider group-hover:scale-105"
                          asChild
                        >
                          <a
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-3"
                          >
                            <span>EXPLORE FEATURE</span>
                            <ExternalLink className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                      
                      {/* Animated progress bar */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-500 to-red-600"
                          initial={{ width: "0%" }}
                          whileInView={{ width: "100%" }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </Card>
                  </CardWrapper>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-20 text-center relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
              asChild
            >
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>GET STARTED ON GITHUB</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Cookbook Section */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Cookbook & Templates
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
              Get started quickly with curated examples, templates, and implementation guides
            </p>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {cookbookResources.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div key={index} variants={item}>
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-start justify-between mb-6">
                          <div className="relative">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                              <Icon className="h-8 w-8 text-white" />
                            </div>
                            <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          </div>
                          <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full">
                            <span className="text-xs font-orbitron text-red-400 tracking-wider">{item.badge}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-2xl text-white font-black mb-2 tracking-wider font-orbitron">
                          {item.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed text-base font-sans">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <div className="p-6 pt-0 relative z-10">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                          asChild
                        >
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2"
                          >
                            <span>Get Started</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      
                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                    </Card>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            className="mt-16 text-center relative z-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
              asChild
            >
              <a
                href="https://docs.swarms.world/en/latest/examples/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <span>BROWSE ALL EXAMPLES</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Call to Action Section */}
        <div className="container py-24 md:py-32 px-4 sm:px-6 bg-black relative">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute w-[800px] h-[800px] rounded-full bg-red-500/5 blur-[150px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            <div className="absolute top-1/4 left-1/4 w-1 h-16 bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-1 h-12 bg-gradient-to-b from-red-500 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
          </div>

          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 border-red-500/20 bg-black/50 backdrop-blur-sm px-8 py-16 md:py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative mx-auto max-w-4xl text-center">
              <motion.h2
                className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-orbitron"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <span className="text-white">READY TO </span>
                <TypingEffect
                  texts={[
                    "TRANSFORM YOUR ENTERPRISE",
                    "BUILD AGENT SWARMS", 
                    "AUTOMATE EVERYTHING",
                    "SCALE BEYOND LIMITS"
                  ]}
                  className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400 font-black font-orbitron"
                  typingSpeed={80}
                  deletingSpeed={50}
                  delayBetweenTexts={3000}
                />
              </motion.h2>
              
              <motion.p
                className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed font-sans"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of developers building the future of AI with the most advanced multi-agent framework ever created
              </motion.p>
              
              <motion.div
                className="mt-12 flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                  asChild
                >
                  <a
                    href="https://github.com/kyegomez/swarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3"
                  >
                    <Zap className="h-5 w-5" />
                    <span>GET STARTED NOW</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
                  asChild
                >
                  <a 
                    href="https://docs.swarms.world" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3"
                  >
                    <Github className="h-5 w-5" />
                    <span>VIEW DOCUMENTATION</span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Blog Section */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          {/* Floating elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 animate-pulse" />
            <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 animate-pulse" style={{ animationDelay: "1s" }} />
            <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: "2s" }} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Latest Insights
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
              Discover cutting-edge developments in multi-agent AI systems and enterprise automation
            </p>
          </motion.div>

          <motion.div
            className="max-w-7xl mx-auto relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {/* Featured Blog Post */}
            <motion.div
              className="mb-16"
              variants={item}
            >
              <CardWrapper className="transition-all duration-700 hover:translate-y-[-12px] hover:scale-[1.02] group">
                <Card className="border-2 border-red-500/30 bg-black/60 backdrop-blur-md relative overflow-hidden">
                  {/* Animated border glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-transparent to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="grid md:grid-cols-2 gap-0">
                    {/* Image/Visual Section */}
                    <div className="relative h-64 md:h-full bg-gradient-to-br from-red-500/20 via-purple-500/20 to-blue-500/20 overflow-hidden">
                      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.1)_50%,transparent_75%)] bg-[length:20px_20px] animate-pulse" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🚀</div>
                          <div className="text-red-400 font-orbitron tracking-wider">FEATURED</div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-400 font-sans">Jan 15, 2024</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-400 font-sans">8 min read</span>
                        </div>
                      </div>
                      
                      <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tighter font-orbitron group-hover:text-red-400 transition-colors duration-300">
                        Swarms v2.0: The First Multi-Agent Framework in Rust
                      </h3>
                      
                      <p className="text-gray-300 leading-relaxed text-lg font-sans mb-8">
                        Introducing the revolutionary Rust-based multi-agent framework that delivers unprecedented performance and memory safety for enterprise AI deployments.
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-8">
                        {["Rust", "Multi-Agent", "Performance", "Enterprise"].map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-orbitron text-red-400 tracking-wider"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-gray-400 font-sans">Kye Gomez</span>
                        </div>
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 hover:text-white transition-all duration-300 font-orbitron tracking-wider group-hover:scale-105"
                          asChild
                        >
                          <a href="/blog/swarms-v2-rust-framework" className="flex items-center space-x-2">
                            <span>READ ARTICLE</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-red-500/20">
                    <motion.div
                      className="h-full bg-gradient-to-r from-red-500 to-red-600"
                      initial={{ width: "0%" }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 2 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </Card>
              </CardWrapper>
            </motion.div>

            {/* Blog Grid */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Advanced Agent-to-Agent Communication Protocols",
                  excerpt: "Deep dive into the sophisticated communication protocols that enable seamless collaboration between AI agents in complex workflows.",
                  date: "Jan 10, 2024",
                  readTime: "12 min read",
                  author: "Swarms Team",
                  tags: ["Communication", "Protocols", "Architecture"],
                  slug: "agent-communication-protocols",
                  gradient: "from-blue-500/20 via-purple-500/20 to-pink-500/20"
                },
                {
                  title: "Enterprise Deployment Guide: Scaling AI Agents in Production",
                  excerpt: "Comprehensive guide to deploying and scaling multi-agent systems in enterprise environments with maximum reliability and performance.",
                  date: "Jan 5, 2024",
                  readTime: "15 min read",
                  author: "DevOps Team",
                  tags: ["Deployment", "Enterprise", "Scaling"],
                  slug: "enterprise-deployment-guide",
                  gradient: "from-green-500/20 via-teal-500/20 to-cyan-500/20"
                },
                {
                  title: "Building Intelligent Agent Workflows with Swarms",
                  excerpt: "Learn how to design and implement complex agent workflows that can handle real-world business challenges with unprecedented efficiency.",
                  date: "Dec 28, 2023",
                  readTime: "10 min read",
                  author: "AI Team",
                  tags: ["Workflows", "Design", "Implementation"],
                  slug: "intelligent-agent-workflows",
                  gradient: "from-orange-500/20 via-red-500/20 to-pink-500/20"
                }
              ].map((post, index) => (
                <motion.div
                  key={post.slug}
                  variants={item}
                  className="group"
                >
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02]">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                      {/* Animated border */}
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Visual Header */}
                      <div className={`h-48 bg-gradient-to-br ${post.gradient} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.1)_50%,transparent_75%)] bg-[length:15px_15px] animate-pulse" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-4xl">🤖</div>
                        </div>
                      </div>
                      
                      <CardHeader className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-400 font-sans">
                              {post.date}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-400 font-sans">{post.readTime}</span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl text-white font-black mb-4 tracking-wider font-orbitron group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        
                        <CardDescription className="text-gray-300 leading-relaxed text-sm font-sans mb-6 line-clamp-3">
                          {post.excerpt}
                        </CardDescription>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-red-500" />
                            <span className="text-sm text-gray-400 font-sans">{post.author}</span>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <div className="p-6 pt-0 relative z-10">
                        <div className="flex flex-wrap gap-2 mb-6">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded-full text-xs font-orbitron text-red-400 tracking-wider"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron tracking-wider"
                          asChild
                        >
                          <a href={`/blog/${post.slug}`} className="flex items-center justify-center space-x-2">
                            <span>READ MORE</span>
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </a>
                        </Button>
                      </div>
                      
                      {/* Hover effect line */}
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                    </Card>
                  </CardWrapper>
                </motion.div>
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              className="mt-16 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
                asChild
              >
                <a href="/blog" className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5" />
                  <span>VIEW ALL ARTICLES</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Newsletter Signup Section */}
        <div className="relative overflow-hidden bg-black border-t-2 border-red-500/20">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
          <AnimatedBackground particleColor="rgba(239, 68, 68, 0.3)" className="opacity-30" />
          
          <div className="container relative px-4 sm:px-6 py-24 md:py-32">
            <motion.div
              className="max-w-4xl mx-auto text-center space-y-8"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl md:text-6xl font-black text-white font-orbitron tracking-tighter mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                    STAY AHEAD OF THE CURVE
                  </span>
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-sans">
                  Sign up for our newsletter and get <span className="text-red-400 font-bold">$20 in free credits</span>, plus exclusive updates, technical guides, blogs, and more!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                viewport={{ once: true }}
                className="relative"
              >
                <NewsletterSignupForm />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </main>

    </div>
  )
}
