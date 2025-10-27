"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardWrapper } from "@/components/card-wrapper"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useScroll, useTransform } from "framer-motion"
import {
  Terminal, ArrowRight, Zap, Cpu, Globe, Store, ExternalLink,
  Network, Rocket, Eye, Shield, BookOpen, Code, FileText, Github,
  Calendar, Clock, User, Tag, Menu, X, MessageCircle, Twitter, Users
} from "lucide-react"
import { TypingEffect } from "@/components/typing-effect"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { NewsletterSignupForm } from "@/components/newsletter-signup-form"
import { useState, useEffect } from "react"

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  // Mobile detection and responsive state management
  useEffect(() => {
    setMounted(true)
    const checkDevice = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setIsTablet(width >= 768 && width < 1024)
    }

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleMotionChange)

    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => {
      window.removeEventListener('resize', checkDevice)
      mediaQuery.removeEventListener('change', handleMotionChange)
    }
  }, [])

  // Scroll-based animations for mobile performance
  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.98])

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

        {/* Hero Section - Mobile Optimized */}
        <motion.div
          className="relative overflow-hidden bg-black min-h-screen flex items-center"
          style={{
            opacity: heroOpacity,
            scale: heroScale
          }}
        >
          {/* Background Video - Optimized for mobile */}
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-40 md:opacity-60 z-0"
            autoPlay
            muted
            loop
            playsInline
            preload={isMobile ? "metadata" : "auto"}
          >
            <source src="/swarms_characters_video.mp4" type="video/mp4" />
          </video>

          {/* Overlay for better text readability - Mobile optimized */}
          <div className="absolute inset-0 w-full h-full bg-black/40 md:bg-black/30 z-10" />

          {/* Cyberpunk grid background - Simplified for mobile performance */}
          <div
            className={`absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.08)_1px,transparent_1px)] ${isMobile ? 'bg-[size:20px_20px]' : 'bg-[size:50px_50px]'} opacity-10 z-20`}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black z-30" aria-hidden="true" />

          {/* AnimatedBackground - Completely disabled for mobile performance */}
          {!isMobile && !isTablet && <AnimatedBackground particleColor="rgba(239, 68, 68, 0.3)" className="opacity-30 z-40" />}

          {/* Dynamic cyberpunk elements - Further simplified for mobile */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className={`absolute ${isMobile ? 'w-[150px] h-[150px]' : 'w-[400px] h-[400px]'} rounded-full bg-red-600/10 ${isMobile ? 'blur-[30px]' : 'blur-[100px]'} animate-pulse`}
              style={{ top: "10%", left: "5%" }}
            />
            <motion.div
              className={`absolute ${isMobile ? 'w-[100px] h-[100px]' : 'w-[300px] h-[300px]'} rounded-full bg-red-500/5 ${isMobile ? 'blur-[20px]' : 'blur-[80px]'} animate-pulse`}
              style={{ top: "70%", right: "10%", animationDelay: "1s" }}
            />
          </div>

          <div className="container relative px-4 sm:px-6 lg:px-8 z-50 w-full">
            <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 py-16 md:py-24 text-center max-w-6xl mx-auto">
              <motion.div
                className="space-y-6 md:space-y-8 select-text w-full"
                initial={{ opacity: 0, y: 30 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {/* Glitch effect title - Mobile optimized */}
                <motion.div
                  className="relative select-text"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={mounted ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.6,
                    type: "spring",
                    stiffness: 100,
                    delay: 0.2
                  }}
                >
                  <h1
                    id="hero-title"
                    className="relative select-text"
                    style={{ userSelect: 'text', WebkitUserSelect: 'text', MozUserSelect: 'text', msUserSelect: 'text' }}
                  >
                    <span
                      className={`font-orbitron ${isMobile ? 'text-5xl sm:text-6xl' : 'text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem]'} text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 animate-pulse select-text leading-none block`}
                      style={{
                        userSelect: 'text',
                        WebkitUserSelect: 'text',
                        MozUserSelect: 'text',
                        msUserSelect: 'text',
                        fontSize: isMobile ? 'clamp(2.5rem, 12vw, 5rem)' : 'clamp(5rem, 12vw, 14rem)'
                      }}
                    >
                      swarms
                    </span>
                  </h1>
                  <div className={`absolute -bottom-1 md:-bottom-2 left-1/2 transform -translate-x-1/2 ${isMobile ? 'w-12 md:w-16' : 'w-16 md:w-24'} h-0.5 md:h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse`} />
                </motion.div>

                <motion.p
                  className={`text-base sm:text-lg md:text-2xl lg:text-4xl text-gray-300 max-w-4xl mx-auto font-light font-orbitron select-text ${isMobile ? 'px-6' : 'px-4'} leading-tight`}
                  initial={{ opacity: 0 }}
                  animate={mounted ? { opacity: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  The Enterprise-Grade Multi-Agent Infrastructure Stack
                </motion.p>
              </motion.div>

              <motion.div
                className={`flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl mx-auto relative z-10 ${isMobile ? 'px-6' : 'px-4'} justify-center items-center`}
                initial={{ opacity: 0, y: 20 }}
                animate={mounted ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Button
                  size="lg"
                  className={`bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 w-full sm:w-auto font-bold ${isMobile ? 'text-base px-8 py-5 min-h-[56px]' : 'text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 min-h-[48px]'} border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron relative z-20 touch-manipulation`}
                  asChild
                >
                  <a
                    href="https://github.com/kyegomez/swarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Get started with Swarms AI on GitHub"
                    className="flex items-center justify-center space-x-2 pointer-events-auto"
                  >
                    <Zap className={`h-4 w-4 ${isMobile ? 'sm:h-5 sm:w-5' : 'sm:h-5 sm:w-5'}`} />
                    <span>Get Started</span>
                    <ArrowRight className={`h-4 w-4 ${isMobile ? 'sm:h-5 sm:w-5' : 'sm:h-5 sm:w-5'}`} />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={`border-2 border-red-500 text-red-500 hover:bg-red-500/10 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 w-full sm:w-auto ${isMobile ? 'font-mono text-sm px-8 py-5 min-h-[56px]' : 'font-mono text-sm sm:text-lg px-6 sm:px-8 py-4 sm:py-6 min-h-[48px]'} bg-black/50 backdrop-blur-sm font-orbitron relative z-20 touch-manipulation`}
                  asChild
                >
                  <a
                    href="https://docs.swarms.world"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Swarms Installation Documentation"
                    className="flex items-center justify-center"
                  >
                    <Terminal className={`mr-2 sm:mr-3 h-4 w-4 ${isMobile ? 'sm:h-5 sm:w-5' : 'sm:h-5 sm:w-5'}`} aria-hidden="true" />
                    <span aria-label="Installation command" className="text-center">pip install -U swarms</span>
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Section - Mobile Optimized */}
        <div className={`container ${isMobile ? 'py-12 md:py-16' : 'py-16 md:py-20 lg:py-32'} ${isMobile ? 'px-4' : 'px-4 sm:px-6'} bg-black relative overflow-hidden`}>
          {/* Static Grid Canvas Background - Mobile optimized */}
          <div className="absolute inset-0">
            {/* Static grid lines - Further reduced complexity on mobile */}
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] ${isMobile ? 'bg-[size:20px_20px]' : 'bg-[size:50px_50px]'}`} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={`text-center ${isMobile ? 'space-y-3 md:space-y-4 mb-8 md:mb-12' : 'space-y-4 md:space-y-6 mb-12 md:mb-16 lg:mb-20'} relative z-10`}
          >
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white font-orbitron leading-tight`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Features
              </span>
            </h2>
            <div className={`${isMobile ? 'w-12 md:w-16' : 'w-16 md:w-24'} h-0.5 md:h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto`} />
            <p className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans ${isMobile ? 'px-2 leading-relaxed' : 'px-4 leading-relaxed'}`}>
              Swarms has pioneered world-class infrastructure for multi-agent collaboration such as communication protocols, optimized runtimes, memory systems, and simulation environments.
            </p>
          </motion.div>

          {/* Dynamic Grid Layout - Mobile optimized */}
          <div className="relative z-10">
            <motion.div
              className={`grid ${isMobile ? 'grid-cols-1 gap-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8'} max-w-7xl mx-auto`}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {[
                {
                  title: "Multi-Agent Architectures",
                  description: "Build complex hierarchical, sequential, and parallel agent collaboration systems",
                  link: "https://docs.swarms.world",
                  icon: "🔗"
                },
                {
                  title: "Agent-To-Agent Communication Protocols",
                  description: "Advanced communication protocols for seamless agent interaction",
                  link: "https://docs.swarms.world",
                  icon: "📡"
                },
                {
                  title: "Ultra-Optimized Agent Execution Runtime",
                  description: "High-performance runtime for maximum agent efficiency and speed",
                  link: "https://docs.swarms.world",
                  icon: "⚡"
                },
                {
                  title: "Multi-Agent Memory Systems",
                  description: "Sophisticated memory management for complex agent workflows",
                  link: "https://docs.swarms.world",
                  icon: "🧠"
                },
                {
                  title: "Multi-Agent Simulation Environments",
                  description: "Advanced simulation environments for testing and training agent swarms",
                  link: "https://docs.swarms.world",
                  icon: "🌐"
                },
                {
                  title: "Enterprise Security & Compliance",
                  description: "Built-in security, governance, and compliance features for enterprise deployments",
                  link: "https://docs.swarms.world",
                  icon: "🛡️"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  variants={item}
                >
                  <motion.div 
                    className="h-full group cursor-pointer"
                    whileHover={{ y: -16, scale: 1.02 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <div className="relative h-full">
                      {/* Glassomorphic Card */}
                      <div className="relative h-full rounded-3xl overflow-hidden">
                        {/* Glass effect with gradient border */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-2xl border-2 border-red-500/30 group-hover:border-red-500/60 transition-all duration-500" />
                        
                        {/* Inner glow effect */}
                        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                        </div>
                        
                        {/* Content */}
                        <div className="relative z-10 p-8 md:p-10 flex flex-col items-center text-center space-y-6 h-full">
                          {/* Icon with glass effect */}
                          <div className="relative">
                            <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                            <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-500 shadow-2xl shadow-red-500/20">
                              <span className="text-4xl md:text-5xl">{feature.icon}</span>
                            </div>
                          </div>
                          
                          {/* Text content */}
                          <div className="space-y-3 flex-1 flex flex-col justify-center">
                            <h3 className="text-xl md:text-2xl font-black text-white font-orbitron tracking-wider group-hover:text-red-400 transition-colors duration-300 leading-tight">
                              {feature.title}
                            </h3>
                            
                            <p className="text-gray-300 leading-relaxed font-sans text-sm md:text-base group-hover:text-gray-200 transition-colors duration-300">
                              {feature.description}
                            </p>
                          </div>
                          
                          {/* Button with glass effect */}
                          <div className="w-full">
                            <a
                              href={feature.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center space-x-2 w-full px-6 py-3 md:py-4 rounded-xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-red-500/30 font-orbitron font-bold text-red-400 tracking-wider hover:from-red-500/20 hover:to-red-600/20 hover:border-red-400/50 hover:text-red-300 hover:scale-105 transition-all duration-300 touch-manipulation text-sm"
                            >
                              <span>LEARN MORE</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom CTA - Mobile optimized */}
          <motion.div
            className={`${isMobile ? 'mt-8 md:mt-12' : 'mt-12 md:mt-16 lg:mt-20'} text-center relative z-10 ${isMobile ? 'px-4' : 'px-4'}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className={`bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold ${isMobile ? 'text-base px-8 py-5 min-h-[56px]' : 'text-base md:text-lg px-6 md:px-8 py-4 md:py-6 min-h-[48px]'} border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron touch-manipulation w-full sm:w-auto max-w-sm mx-auto`}
              asChild
            >
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2"
              >
                <span>GET STARTED</span>
                <ArrowRight className={`h-4 w-4 ${isMobile ? 'md:h-5 md:w-5' : 'md:h-5 md:w-5'}`} />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Swarms Stack Section - Individual Product Showcases */}
        <div className="bg-black relative">

          {/* Installation Section - Mobile Optimized */}
          <div className={`relative ${isMobile ? 'min-h-screen' : 'min-h-screen'} flex items-center ${isMobile ? 'py-8 md:py-12' : 'py-12 md:py-20'} bg-gradient-to-b from-black to-red-950/10`}>
            {/* Background - Optimized for mobile */}
            <div className={`absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] ${isMobile ? 'bg-[size:20px_20px]' : 'bg-[size:50px_50px]'}`} />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent" />

            <div className={`container ${isMobile ? 'px-4' : 'px-4 sm:px-6'} relative z-10 w-full`}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={`text-center ${isMobile ? 'space-y-3 md:space-y-4 mb-6 md:mb-8' : 'space-y-4 md:space-y-6 mb-8 md:mb-16'} relative z-10`}
              >
                <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white font-orbitron leading-tight`}>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                    Installation
                  </span>
                </h2>
                <div className={`${isMobile ? 'w-12 md:w-16' : 'w-16 md:w-32'} h-0.5 md:h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto`} />
                <p className={`text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans ${isMobile ? 'px-2 leading-relaxed' : 'px-4 leading-relaxed'}`}>
                  Get started with Swarms in seconds. Choose your preferred language and install the framework.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className={`${isMobile ? 'max-w-full' : 'max-w-4xl'} mx-auto`}
              >
                <Tabs defaultValue="python" className="w-full">
                  <TabsList className={`grid w-full grid-cols-2 bg-black/50 border border-red-500/30 backdrop-blur-sm ${isMobile ? 'h-14' : 'h-12 md:h-auto'}`}>
                    <TabsTrigger
                      value="python"
                      className={`data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400 font-orbitron tracking-wider ${isMobile ? 'text-sm min-h-[48px]' : 'text-sm md:text-base touch-manipulation min-h-[44px] md:min-h-auto'}`}
                    >
                      <Zap className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2`} />
                      Python
                    </TabsTrigger>
                    <TabsTrigger
                      value="rust"
                      className={`data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400 font-orbitron tracking-wider ${isMobile ? 'text-sm min-h-[48px]' : 'text-sm md:text-base touch-manipulation min-h-[44px] md:min-h-auto'}`}
                    >
                      <Cpu className={`h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2`} />
                      Rust
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="python" className={`${isMobile ? 'mt-4 md:mt-6' : 'mt-6 md:mt-8'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className={`${isMobile ? 'space-y-3 md:space-y-6' : 'space-y-4 md:space-y-8'}`}
                    >
                      <div className={`flex items-center ${isMobile ? 'space-x-2 md:space-x-3 mb-3 md:mb-4' : 'space-x-3 md:space-x-4 mb-4 md:mb-6'}`}>
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/25`}>
                          <Zap className={`h-6 w-6 md:h-8 md:w-8 text-white`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl md:text-3xl font-black text-white font-orbitron tracking-tighter`}>
                            Python Installation
                          </h3>
                          <p className={`text-sm md:text-lg text-gray-300 leading-relaxed font-sans ${isMobile ? 'mt-0 md:mt-1' : 'mt-1 md:mt-0'}`}>
                            Install the core Swarms Python framework with pip.
                          </p>
                        </div>
                      </div>

                      {/* Installation Command - Mobile optimized */}
                      <div className={`bg-black/80 border-2 border-red-500/30 ${isMobile ? 'rounded-lg p-3 md:p-4' : 'rounded-lg md:rounded-xl p-4 md:p-6'} backdrop-blur-sm`}>
                        <div className={`flex items-center space-x-2 ${isMobile ? 'mb-2 md:mb-3' : 'mb-3 md:mb-4'}`}>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full`}></div>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full`}></div>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full`}></div>
                          <span className={`text-gray-400 ${isMobile ? 'text-xs ml-1 md:ml-2' : 'text-xs md:text-sm ml-2 md:ml-4'} font-mono`}>terminal</span>
                        </div>
                        <div className={`flex flex-col ${isMobile ? 'sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2' : 'sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3'}`}>
                          <span className={`text-green-400 font-mono ${isMobile ? 'text-sm md:text-base' : 'text-sm md:text-lg'} self-start sm:self-auto`}>$</span>
                          <code className={`text-green-400 font-mono ${isMobile ? 'text-sm md:text-base' : 'text-sm md:text-lg'} select-all flex-1 break-all`}>
                            pip3 install -U swarms
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`border-gray-600 text-gray-400 hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 self-start sm:self-auto touch-manipulation ${isMobile ? 'min-h-[40px] text-xs' : 'min-h-[36px] text-xs md:text-sm'}`}
                            onClick={() => navigator.clipboard.writeText('pip3 install -U swarms')}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div className={`flex flex-col sm:flex-row ${isMobile ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                        <Button
                          size="lg"
                          className={`bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold ${isMobile ? 'px-6 py-4 min-h-[52px] text-base' : 'px-4 md:px-6 py-3 md:py-3 min-h-[48px] text-sm md:text-base'} border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full sm:w-auto touch-manipulation`}
                          asChild
                        >
                          <a
                            href="https://github.com/kyegomez/swarms"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span className={`${isMobile ? 'text-base' : 'text-sm md:text-base'}`}>GET STARTED</span>
                            <ExternalLink className={`h-3 w-3 md:h-4 md:w-4`} />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className={`border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron ${isMobile ? 'px-6 py-4 min-h-[52px] text-base' : 'px-4 md:px-6 py-3 md:py-3 min-h-[48px] text-sm md:text-base'} w-full sm:w-auto touch-manipulation`}
                          asChild
                        >
                          <a
                            href="https://docs.swarms.world"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span className={`${isMobile ? 'text-base' : 'text-sm md:text-base'}`}>DOCS</span>
                            <ExternalLink className={`h-3 w-3 md:h-4 md:w-4`} />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>

                  <TabsContent value="rust" className={`${isMobile ? 'mt-4 md:mt-6' : 'mt-6 md:mt-8'}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      viewport={{ once: true }}
                      className={`${isMobile ? 'space-y-3 md:space-y-6' : 'space-y-4 md:space-y-8'}`}
                    >
                      <div className={`flex items-center ${isMobile ? 'space-x-2 md:space-x-3 mb-3 md:mb-4' : 'space-x-3 md:space-x-4 mb-4 md:mb-6'}`}>
                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25`}>
                          <Cpu className={`h-6 w-6 md:h-8 md:w-8 text-white`} />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl md:text-3xl font-black text-white font-orbitron tracking-tighter`}>
                            Rust Installation
                          </h3>
                          <p className={`text-sm md:text-lg text-gray-300 leading-relaxed font-sans ${isMobile ? 'mt-0 md:mt-1' : 'mt-1 md:mt-0'}`}>
                            Add the ultra-fast Swarms Rust framework to your Cargo.toml.
                          </p>
                        </div>
                      </div>

                      {/* Installation Command - Mobile optimized */}
                      <div className={`bg-black/80 border-2 border-red-500/30 ${isMobile ? 'rounded-lg p-3 md:p-4' : 'rounded-lg md:rounded-xl p-4 md:p-6'} backdrop-blur-sm`}>
                        <div className={`flex items-center space-x-2 ${isMobile ? 'mb-2 md:mb-3' : 'mb-3 md:mb-4'}`}>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full`}></div>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full`}></div>
                          <div className={`w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full`}></div>
                          <span className={`text-gray-400 ${isMobile ? 'text-xs ml-1 md:ml-2' : 'text-xs md:text-sm ml-2 md:ml-4'} font-mono`}>terminal</span>
                        </div>
                        <div className={`flex flex-col ${isMobile ? 'sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2' : 'sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3'}`}>
                          <span className={`text-blue-400 font-mono ${isMobile ? 'text-sm md:text-base' : 'text-sm md:text-lg'} self-start sm:self-auto`}>$</span>
                          <code className={`text-blue-400 font-mono ${isMobile ? 'text-sm md:text-base' : 'text-sm md:text-lg'} select-all flex-1 break-all`}>
                            cargo add swarms-rs
                          </code>
                          <Button
                            size="sm"
                            variant="outline"
                            className={`border-gray-600 text-gray-400 hover:bg-gray-800/50 hover:border-gray-500 transition-all duration-300 self-start sm:self-auto touch-manipulation ${isMobile ? 'min-h-[40px] text-xs' : 'min-h-[36px] text-xs md:text-sm'}`}
                            onClick={() => navigator.clipboard.writeText('cargo add swarms-rs')}
                          >
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div className={`flex flex-col sm:flex-row ${isMobile ? 'gap-2 md:gap-3' : 'gap-3 md:gap-4'}`}>
                        <Button
                          size="lg"
                          className={`bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold ${isMobile ? 'px-6 py-4 min-h-[52px] text-base' : 'px-4 md:px-6 py-3 md:py-3 min-h-[48px] text-sm md:text-base'} border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full sm:w-auto touch-manipulation`}
                          asChild
                        >
                          <a
                            href="https://crates.io/crates/swarms-rs"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span className={`${isMobile ? 'text-base' : 'text-sm md:text-base'}`}>GET STARTED</span>
                            <ExternalLink className={`h-3 w-3 md:h-4 md:w-4`} />
                          </a>
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className={`border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron ${isMobile ? 'px-6 py-4 min-h-[52px] text-base' : 'px-4 md:px-6 py-3 md:py-3 min-h-[48px] text-sm md:text-base'} w-full sm:w-auto touch-manipulation`}
                          asChild
                        >
                          <a
                            href="https://docs.swarms.world"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2"
                          >
                            <span className={`${isMobile ? 'text-base' : 'text-sm md:text-base'}`}>DOCS</span>
                            <ExternalLink className={`h-3 w-3 md:h-4 md:w-4`} />
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>

          {/* Code Examples Section Header */}
          <div className="container py-20 px-4 sm:px-6 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 relative z-10"
            >
              <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                  Code Examples
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans">
                See Swarms in action with real-world examples and production-ready code snippets
              </p>
            </motion.div>
          </div>

          {/* Product 1: Swarms Python - Mobile Optimized */}
          <div className="relative min-h-screen flex items-center py-12 md:py-20">
            {/* Background - Mobile optimized */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent" />

            <div className={`container ${isMobile ? 'px-4' : 'px-4 sm:px-6'} relative z-10 w-full`}>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-8 md:gap-12 items-center`}>
                {/* Content - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`space-y-4 md:space-y-8 ${isMobile ? 'order-1' : 'order-2 lg:order-1'}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center shadow-lg shadow-red-500/25">
                      <Zap className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full">
                        <span className="text-xs font-orbitron text-red-400 tracking-wider">PYTHON</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700/50 px-2 py-1 rounded-full">
                        <Github className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                        <span className="text-xs md:text-sm font-mono text-gray-300">5.2k</span>
                        <span className="text-xs text-gray-500">stars</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-orbitron tracking-tighter leading-tight">
                      SWARMS PYTHON
                    </h3>
                    <p className="text-base md:text-xl text-red-400 font-semibold tracking-wide font-sans">
                      Core Swarms Python Framework
                    </p>
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed font-sans">
                      The original Swarms framework in Python with full backwards compatibility with LangChain, AutoGen, and other popular frameworks. Build complex multi-agent workflows with just a few lines of code.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold px-4 md:px-6 py-3 md:py-3 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full sm:w-auto touch-manipulation min-h-[48px]"
                      asChild
                    >
                      <a
                        href="https://github.com/kyegomez/swarms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span className="text-sm md:text-base">GET STARTED</span>
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron px-4 md:px-6 py-3 md:py-3 w-full sm:w-auto touch-manipulation min-h-[48px]"
                      asChild
                    >
                      <a
                        href="https://docs.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span className="text-sm md:text-base">DOCS</span>
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Code Example - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`relative ${isMobile ? 'order-2' : 'order-1 lg:order-2'}`}
                >
                  <div className="bg-black/80 border-2 border-red-500/30 rounded-lg md:rounded-xl p-4 md:p-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-3 md:mb-4">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-xs md:text-sm ml-2 md:ml-4 font-mono">swarms_python.py</span>
                    </div>
                    <pre className="text-green-400 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`from swarms import Agent, SequentialWorkflow

# Agent 1: The Researcher
researcher = Agent(
    agent_name="Researcher",
    system_prompt="Your job is to research the provided topic and provide a detailed summary.",
    model_name="gpt-4o-mini",
)

# Agent 2: The Writer
writer = Agent(
    agent_name="Writer",
    system_prompt="Your job is to take the research summary and write a beautiful, engaging blog post about it.",
    model_name="gpt-4o-mini",
)

# Create a sequential workflow where the researcher's output feeds into the writer's input
workflow = SequentialWorkflow(agents=[researcher, writer])

# Run the workflow on a task
final_post = workflow.run("The history and future of artificial intelligence")
print(final_post)`}
                    </pre>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Product 2: Swarms Rust - Mobile Optimized */}
          <div className="relative min-h-screen flex items-center py-12 md:py-20 bg-gradient-to-b from-black to-red-950/10">
            {/* Background - Mobile optimized */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-l from-red-950/20 via-transparent to-transparent" />

            <div className={`container ${isMobile ? 'px-4' : 'px-4 sm:px-6'} relative z-10 w-full`}>
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'} gap-8 md:gap-12 items-center`}>
                {/* Code Example - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : -50, y: isMobile ? 30 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={`relative ${isMobile ? 'order-2' : 'order-2 lg:order-1'}`}
                >
                  <div className="bg-black/80 border-2 border-red-500/30 rounded-lg md:rounded-xl p-4 md:p-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-3 md:mb-4">
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-xs md:text-sm ml-2 md:ml-4 font-mono">swarms_rust.rs</span>
                    </div>
                    <pre className="text-blue-400 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
{`use std::env;
use anyhow::Result;
use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    let client = OpenAI::from_url(base_url, api_key)
        .set_model("deepseek-chat");

    // Create specialized trading agents
    let market_analysis_agent = client
        .agent_builder()
        .agent_name("Market Analysis Agent")
        .system_prompt("You are a market analysis specialist...")
        .max_loops(1)
        .temperature(0.2)
        .build();

    // Create concurrent workflow
    let workflow = ConcurrentWorkflow::builder()
        .name("Trading Strategy Workflow")
        .agents(vec![
            Box::new(market_analysis_agent),
            Box::new(trade_strategy_agent),
            Box::new(risk_assessment_agent),
        ])
        .build();

    let result = workflow.run("BTC/USD analysis...").await?;
    println!("{}", serde_json::to_string_pretty(&result)?);
    Ok(())
}`}
                    </pre>
                  </div>
                </motion.div>

                {/* Content - Mobile optimized */}
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 50, y: isMobile ? 30 : 0 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className={`space-y-4 md:space-y-8 ${isMobile ? 'order-1' : 'order-1 lg:order-2'}`}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-4 md:mb-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25">
                      <Cpu className="h-6 w-6 md:h-8 md:w-8 text-white" />
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <div className="bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full">
                        <span className="text-xs font-orbitron text-red-400 tracking-wider">RUST</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-gray-800/50 border border-gray-700/50 px-2 py-1 rounded-full">
                        <Github className="h-3 w-3 md:h-4 md:w-4 text-gray-400" />
                        <span className="text-xs md:text-sm font-mono text-gray-300">73</span>
                        <span className="text-xs text-gray-500">stars</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-orbitron tracking-tighter leading-tight">
                      SWARMS-RS
                    </h3>
                    <p className="text-base md:text-xl text-red-400 font-semibold tracking-wide font-sans">
                      The First Multi-Agent Framework in Rust
                    </p>
                    <p className="text-sm md:text-lg text-gray-300 leading-relaxed font-sans">
                      Ultra-fast, memory-safe, and production-ready multi-agent framework built in Rust for maximum performance and reliability. Perfect for high-throughput enterprise applications.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold px-4 md:px-6 py-3 md:py-3 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full sm:w-auto touch-manipulation min-h-[48px]"
                      asChild
                    >
                      <a
                        href="https://crates.io/crates/swarms-rs"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center space-x-2"
                      >
                        <span className="text-sm md:text-base">GET STARTED</span>
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron px-4 md:px-6 py-3 md:py-3 w-full sm:w-auto touch-manipulation min-h-[48px]"
                      asChild
                    >
                      <a
                        href="https://docs.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <span className="text-sm md:text-base">DOCS</span>
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Product 3: Swarms API */}
          <div className="relative min-h-screen flex items-center py-20">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
            <div className="absolute inset-0 bg-gradient-to-r from-red-950/20 via-transparent to-transparent" />
            
            <div className="container px-4 sm:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="space-y-8"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-700 to-red-800 flex items-center justify-center shadow-lg shadow-red-500/25">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full">
                      <span className="text-sm font-orbitron text-red-400 tracking-wider">API</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-black text-white font-orbitron tracking-tighter">
                    SWARMS API
                  </h3>
                  <p className="text-xl text-red-400 font-semibold tracking-wide font-sans">
                    Ultra-Optimized Hosted Runtime
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed font-sans">
                    Enterprise-grade hosted API with ultra-optimized runtime for deploying and scaling your agent swarms in production. No infrastructure management required.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold px-6 py-3 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                      asChild
                    >
                      <a
                        href="https://docs.swarms.ai"
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
                      size="lg"
                      className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron px-6 py-3"
                      asChild
                    >
                      <a
                        href="https://docs.swarms.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <span>DOCS</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>

                {/* Code Example */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-black/80 border-2 border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm ml-4 font-mono">api_request.sh</span>
                    </div>
                    <pre className="text-yellow-400 font-mono text-sm leading-relaxed overflow-x-auto">
{`curl -X POST "https://api.swarms.world/v1/swarm/completions" \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Content Creation Pipeline",
    "description": "Sequential content creation from research to final output",
    "swarm_type": "SequentialWorkflow",
    "task": "Create a comprehensive blog post about the future of renewable energy",
    "agents": [
      {
        "agent_name": "Research Specialist",
        "description": "Conducts thorough research on the topic",
        "system_prompt": "You are a research specialist...",
        "model_name": "gpt-4o",
        "max_loops": 1,
        "temperature": 0.3
      },
      {
        "agent_name": "Content Writer",
        "description": "Creates engaging written content",
        "system_prompt": "You are a skilled content writer...",
        "model_name": "gpt-4o",
        "max_loops": 1,
        "temperature": 0.6
      }
    ],
    "max_loops": 1
  }'`}
                    </pre>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Product 4: Swarms Marketplace */}
          <div className="relative min-h-screen flex items-center py-20 bg-gradient-to-b from-black to-red-950/10">
            {/* Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-l from-red-950/20 via-transparent to-transparent" />
            
            <div className="container px-4 sm:px-6 relative z-10">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                {/* Marketplace Banner */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="relative order-2 lg:order-1"
                >
                  <div className="relative group">
                    {/* Banner Image */}
                    <div className="relative overflow-hidden rounded-2xl border-2 border-red-500/30 bg-black/50 backdrop-blur-sm">
                      <img
                        src="/marketplace_banner.png"
                        alt="Swarms Marketplace - Buy & Sell AI Agents"
                        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Floating elements */}
                      <div className="absolute top-4 right-4 bg-red-500/20 border border-red-500/30 px-3 py-1 rounded-full backdrop-blur-sm">
                        <span className="text-xs font-orbitron text-red-400 tracking-wider">LIVE</span>
                      </div>
                      
                    </div>
                  </div>
                </motion.div>

                {/* Content */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-8 order-1 lg:order-2"
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center shadow-lg shadow-red-500/25">
                      <Store className="h-8 w-8 text-white" />
                    </div>
                    <div className="bg-red-500/20 border border-red-500/30 px-4 py-2 rounded-full">
                      <span className="text-sm font-orbitron text-red-400 tracking-wider">MARKETPLACE</span>
                    </div>
                  </div>
                  
                  <h3 className="text-4xl font-black text-white font-orbitron tracking-tighter">
                    SWARMS MARKETPLACE
                  </h3>
                  <p className="text-xl text-red-400 font-semibold tracking-wide font-sans">
                    Buy & Sell Agents, Prompts & More
                  </p>
                  <p className="text-lg text-gray-300 leading-relaxed font-sans">
                    Discover, buy, and sell agents, prompts, tools, and components on swarms.world - the premier marketplace for AI agents. Monetize your creations and access specialized agents built by the community.
                  </p>
                  
                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold px-6 py-3 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                      asChild
                    >
                      <a
                        href="https://swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <span>EXPLORE MARKETPLACE</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300 font-orbitron px-6 py-3"
                      asChild
                    >
                      <a
                        href="https://swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2"
                      >
                        <span>SELL AGENTS</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="container py-20 px-4 sm:px-6 relative">
            <motion.div
              className="text-center relative z-10"
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

        {/* Call to Action Section - Mobile Optimized */}
        <div className="container py-16 md:py-20 lg:py-24 px-4 sm:px-6 bg-black relative overflow-hidden">
          {/* Cyberpunk grid background - Mobile optimized */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:25px_25px] md:bg-[size:30px_30px]" />

          {/* Animated background elements - Simplified for mobile */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-red-500/5 blur-[100px] md:blur-[150px]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
            />
            {!isMobile && (
              <>
                <div className="absolute top-1/4 left-1/4 w-1 h-12 md:h-16 bg-gradient-to-b from-red-500 to-transparent animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-1 h-8 md:h-12 bg-gradient-to-b from-red-500 to-transparent animate-pulse" style={{ animationDelay: "1s" }} />
              </>
            )}
          </div>

          <motion.div
            className="relative overflow-hidden rounded-xl md:rounded-2xl border-2 border-red-500/20 bg-black/50 backdrop-blur-sm px-4 md:px-8 py-8 md:py-12 lg:py-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <div className="relative mx-auto max-w-4xl text-center">
              <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-black tracking-tighter mb-4 md:mb-6 font-orbitron leading-tight px-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
                  typingSpeed={isMobile ? 60 : 80}
                  deletingSpeed={isMobile ? 40 : 50}
                  delayBetweenTexts={isMobile ? 2500 : 3000}
                />
              </motion.h2>

              <motion.p
                className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed font-sans px-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Join thousands of developers building the future of AI with the most advanced multi-agent framework ever created
              </motion.p>

              <motion.div
                className="mt-8 md:mt-12 flex flex-col sm:flex-row justify-center gap-4 md:gap-6 px-4"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-bold text-sm md:text-base lg:text-lg px-6 md:px-8 py-4 md:py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron touch-manipulation min-h-[48px] w-full sm:w-auto max-w-sm mx-auto sm:mx-0"
                  asChild
                >
                  <a
                    href="https://github.com/kyegomez/swarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Zap className="h-4 w-4 md:h-5 md:w-5" />
                    <span>GET STARTED NOW</span>
                    <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-[1.02] active:scale-95 transform transition-all duration-200 font-orbitron text-sm md:text-base lg:text-lg px-6 md:px-8 py-4 md:py-6 bg-black/50 backdrop-blur-sm touch-manipulation min-h-[48px] w-full sm:w-auto max-w-sm mx-auto sm:mx-0"
                  asChild
                >
                  <a
                    href="https://docs.swarms.world"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2"
                  >
                    <Github className="h-4 w-4 md:h-5 md:w-5" />
                    <span>VIEW DOCUMENTATION</span>
                  </a>
                </Button>
              </motion.div>
            </div>
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
                  Try Swarms for free
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

        {/* Community Section */}
        <div className="relative min-h-screen flex items-center justify-center bg-black border-t-2 border-red-500/20 overflow-hidden">
          {/* Cyberpunk grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:50px_50px]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/10 to-black" />
          
          {/* Animated background elements */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              className="absolute w-[600px] h-[600px] rounded-full bg-red-500/10 blur-[120px]"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
              style={{ top: "20%", left: "10%" }}
            />
            <motion.div
              className="absolute w-[400px] h-[400px] rounded-full bg-red-600/10 blur-[100px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: 2,
              }}
              style={{ bottom: "20%", right: "10%" }}
            />
          </div>

          {!isMobile && !isTablet && <AnimatedBackground particleColor="rgba(239, 68, 68, 0.3)" className="opacity-20" />}

          <div className="container relative z-10 px-4 sm:px-6 py-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white font-orbitron">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                  Join The Community
                </span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
              <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-light font-sans leading-relaxed">
                Connect with agent engineers, discover the best multi-agent papers, and stay updated on the latest from Swarms.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {/* Discord */}
              <motion.div variants={item}>
                <motion.div 
                  className="h-full group cursor-pointer"
                  whileHover={{ y: -16, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="relative h-full">
                    {/* Glassomorphic Card */}
                    <div className="relative h-full rounded-3xl overflow-hidden">
                      {/* Glass effect with gradient border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-2xl border-2 border-red-500/30 group-hover:border-red-500/60 transition-all duration-500" />
                      
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6 h-full">
                        {/* Icon with glass effect */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-500 shadow-2xl shadow-red-500/20">
                            <MessageCircle className="h-12 w-12 text-red-400 group-hover:text-red-300 transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                        </div>
                        
                        {/* Text content */}
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          <h3 className="text-3xl font-black text-white font-orbitron tracking-wider group-hover:text-red-400 transition-colors duration-300">
                            Discord
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed font-sans text-base group-hover:text-gray-200 transition-colors duration-300">
                            Join our vibrant Discord community to chat with developers, get help, and collaborate on projects
                          </p>
                        </div>
                        
                        {/* Button with glass effect */}
                        <div className="w-full">
                          <a
                            href="https://discord.gg/EamjgSaEQf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-red-500/30 font-orbitron font-bold text-red-400 tracking-wider hover:from-red-500/20 hover:to-red-600/20 hover:border-red-400/50 hover:text-red-300 hover:scale-105 transition-all duration-300 touch-manipulation"
                          >
                            <span>JOIN US</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Twitter */}
              <motion.div variants={item}>
                <motion.div 
                  className="h-full group cursor-pointer"
                  whileHover={{ y: -16, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="relative h-full">
                    {/* Glassomorphic Card */}
                    <div className="relative h-full rounded-3xl overflow-hidden">
                      {/* Glass effect with gradient border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-2xl border-2 border-red-500/30 group-hover:border-red-500/60 transition-all duration-500" />
                      
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6 h-full">
                        {/* Icon with glass effect */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-500 shadow-2xl shadow-red-500/20">
                            <Twitter className="h-12 w-12 text-red-400 group-hover:text-red-300 transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                        </div>
                        
                        {/* Text content */}
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          <h3 className="text-3xl font-black text-white font-orbitron tracking-wider group-hover:text-red-400 transition-colors duration-300">
                            Twitter
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed font-sans text-base group-hover:text-gray-200 transition-colors duration-300">
                            Follow us on Twitter for the latest updates, announcements, and insights from the Swarms team
                          </p>
                        </div>
                        
                        {/* Button with glass effect */}
                        <div className="w-full">
                          <a
                            href="https://twitter.com/swarms_corp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-red-500/30 font-orbitron font-bold text-red-400 tracking-wider hover:from-red-500/20 hover:to-red-600/20 hover:border-red-400/50 hover:text-red-300 hover:scale-105 transition-all duration-300 touch-manipulation"
                          >
                            <span>FOLLOW US</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Events */}
              <motion.div variants={item}>
                <motion.div 
                  className="h-full group cursor-pointer"
                  whileHover={{ y: -16, scale: 1.02 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <div className="relative h-full">
                    {/* Glassomorphic Card */}
                    <div className="relative h-full rounded-3xl overflow-hidden">
                      {/* Glass effect with gradient border */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-black/40 via-black/20 to-transparent backdrop-blur-2xl border-2 border-red-500/30 group-hover:border-red-500/60 transition-all duration-500" />
                      
                      {/* Inner glow effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-red-500/5 via-transparent to-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Shine effect on hover */}
                      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/40 to-transparent" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 p-10 flex flex-col items-center text-center space-y-6 h-full">
                        {/* Icon with glass effect */}
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-red-500/20 blur-2xl group-hover:blur-3xl transition-all duration-500" />
                          <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-red-500/30 flex items-center justify-center group-hover:scale-110 group-hover:border-red-400/50 transition-all duration-500 shadow-2xl shadow-red-500/20">
                            <Users className="h-12 w-12 text-red-400 group-hover:text-red-300 transition-colors duration-300" strokeWidth={1.5} />
                          </div>
                        </div>
                        
                        {/* Text content */}
                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                          <h3 className="text-3xl font-black text-white font-orbitron tracking-wider group-hover:text-red-400 transition-colors duration-300">
                            Join our X Community
                          </h3>
                          
                          <p className="text-gray-300 leading-relaxed font-sans text-base group-hover:text-gray-200 transition-colors duration-300">
                            Connect with fellow developers, share insights, and stay updated on the latest in multi-agent systems
                          </p>
                        </div>
                        
                        {/* Button with glass effect */}
                        <div className="w-full">
                          <a
                            href="https://x.com/i/communities/1875452887414804745"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center space-x-2 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-black/60 to-black/40 backdrop-blur-sm border border-red-500/30 font-orbitron font-bold text-red-400 tracking-wider hover:from-red-500/20 hover:to-red-600/20 hover:border-red-400/50 hover:text-red-300 hover:scale-105 transition-all duration-300 touch-manipulation"
                          >
                            <span>JOIN US</span>
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
        </main>
    </div>
  )
}
