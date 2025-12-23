"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useReducedMotion } from "framer-motion"
import { useState, useEffect } from "react"
import { 
  ArrowRight, Zap, Cpu, Globe, ExternalLink, 
  Network, Shield, BookOpen, Code,
  Calendar, Key, CheckCircle, Play, Database,
  Activity, MapPin, BarChart3, GitBranch, Brain, Wrench, Puzzle,
  HelpCircle, ChevronDown, ChevronUp, DollarSign
} from "lucide-react"
import { TypingEffect } from "@/components/typing-effect"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import Link from "next/link"
import Image from "next/image"

export default function APIPage() {
  const shouldReduceMotion = useReducedMotion()
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  const [showProgressIndicator, setShowProgressIndicator] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
  // Scroll detection for progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const featureElements = document.querySelectorAll('[data-feature-index]')
      const featuresSection = document.querySelector('[data-section="features"]')
      
      if (!featuresSection || featureElements.length === 0) return
      
      const scrollPosition = window.scrollY + window.innerHeight / 2
      const featuresSectionRect = featuresSection.getBoundingClientRect()
      const featuresSectionTop = featuresSectionRect.top + window.scrollY
      const featuresSectionBottom = featuresSectionTop + featuresSectionRect.height
      
      // Check if we're in the features section
      const isInFeaturesSection = scrollPosition >= featuresSectionTop && scrollPosition <= featuresSectionBottom
      setShowProgressIndicator(isInFeaturesSection)
      
      if (isInFeaturesSection) {
        let activeIndex = 0
        featureElements.forEach((element, index) => {
          const rect = element.getBoundingClientRect()
          const elementTop = rect.top + window.scrollY
          const elementBottom = elementTop + rect.height
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            activeIndex = index
          }
        })
        
        setCurrentFeatureIndex(activeIndex)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Mobile-optimized animation variants
  const mobileOptimizedVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: "easeOut"
      }
    }
  }

  const staggeredContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0.05 : 0.1,
        delayChildren: 0.1
      }
    }
  }

  const tickerAnnouncements = [
    "Swarms API: The only multi-agent API in the world",
    "Rust-optimized: 100x faster than raw Python",
    "600+ models: OpenAI, Anthropic, Gemini & more",
    "MCP protocol: Integrate any platform seamlessly",
    "Enterprise-grade infrastructure & reliability",
    "100 agents per request for free users"
  ]

  const apiFeatures = [
    {
      icon: GitBranch,
      title: "Multi-agent architectures",
      description: "Support for concurrent, sequential, hierarchical, and custom multi-agent workflow patterns",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Brain,
      title: "Multi-agent memory",
      description: "Persistent and shared memory systems enabling agents to collaborate and learn from interactions",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Wrench,
      title: "Pre-built tools ecosystem",
      description: "Ready-to-use tools including search, web scraping, Yahoo Finance, and dozens of other integrations",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Network,
      title: "Orchestration handled",
      description: "We handle all the complex orchestration logic - you focus on building and configuring your agents",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Globe,
      title: "World's only multi-agent API",
      description: "The first and only comprehensive multi-agent orchestration API platform available globally",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Database,
      title: "600+ model support",
      description: "Support for leading AI models including OpenAI, Anthropic, Gemini, and hundreds of others for maximum flexibility",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Puzzle,
      title: "MCP protocol integration",
      description: "Model Context Protocol enables seamless integration with any platform including Notion, Supabase, and countless other tools",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Activity,
      title: "Streaming support",
      description: "Real-time streaming responses for immediate feedback and enhanced user experience",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Cpu,
      title: "100 agents per request",
      description: "Scale from 100 agents per request on free tier to unlimited enterprise deployments",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Zap,
      title: "Rust-optimized performance",
      description: "100x speed increase over raw Python with sub-millisecond initialization and enterprise-grade reliability",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Shield,
      title: "Enterprise infrastructure",
      description: "Enterprise-grade infrastructure and reliability with advanced security and fault tolerance",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: MapPin,
      title: "Multi-region deployment",
      description: "Global infrastructure with multi-region deployment for optimal performance and reliability",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: BarChart3,
      title: "Extensive telemetry & logging",
      description: "Comprehensive monitoring, detailed analytics, and real-time logging for complete observability",
      gradient: "from-red-700 to-red-800"
    }
  ]

  const performanceSpecs = [
    {
      icon: Zap,
      title: "Sub-millisecond initialization",
      description: "Agent runtime starts in under 1ms for instant response",
      value: "<1ms"
    },
    {
      icon: Network,
      title: "Concurrent agents",
      description: "Handle thousands of simultaneous agent operations",
      value: "10,000+"
    },
    {
      icon: Database,
      title: "Zero-copy data passing",
      description: "Memory-efficient inter-agent communication",
      value: "0-copy"
    },
    {
      icon: Shield,
      title: "Fault tolerance",
      description: "Automatic retry with exponential backoff",
      value: "99.9%"
    }
  ]

  const rateLimits = [
    {
      tier: "Free tier",
      requests: "100 req/min",
      tokens: "200K tokens/agent",
      batch: "100 agents/request",
      gradient: "from-black to-red-950"
    },
    {
      tier: "Premium tier",
      price: "$100/user/month",
      requests: "2,000 req/min",
      tokens: "2M tokens/agent",
      batch: "500 agents/batch",
      gradient: "from-green-600 to-green-700"
    },
    {
      tier: "On-Premise",
      price: "$9,999/year",
      requests: "Unlimited",
      tokens: "Unlimited",
      batch: "Unlimited",
      gradient: "from-amber-600 to-amber-700",
      isOnPremise: true
    },
    {
      tier: "Enterprise",
      requests: "Custom limits",
      tokens: "Unlimited",
      batch: "Unlimited",
      gradient: "from-red-800 to-red-900"
    }
  ]

  const integrationSteps = [
    {
      step: 1,
      icon: Code,
      title: "Install SDK or client",
      description: "Choose and install your preferred Swarms client library to get started with the world's most advanced multi-agent API.",
      codeExamples: [
        {
          language: "Python",
          code: `# Install the Python client
pip install swarms-client

# Or with poetry
poetry add swarms-client

# Or with conda
conda install -c conda-forge swarms-client

# Verify installation
python -c "import swarms_client; print('✅ swarms-client installed successfully!')"

# Available at: https://github.com/The-Swarm-Corporation/swarms-client`
        },
        {
          language: "Node.js",
          code: `# Install the TypeScript/Node.js client
npm install swarms-ts

# Or with yarn
yarn add swarms-ts

# Or with pnpm
pnpm add swarms-ts

# Verify installation
node -e "console.log('✅ swarms-ts installed successfully!')"

# Available at: https://github.com/The-Swarm-Corporation/swarms-ts`
        },
        {
          language: "Other SDKs",
          code: `# Browse all available client libraries
Visit: https://docs.swarms.ai/resources/client-libraries

Available Production-Ready SDKs:
✅ Python: swarms-client
✅ TypeScript/Node.js: swarms-ts  
✅ Go: swarms-client-go
✅ Java: swarms-java

Coming Soon:
🚧 Kotlin
🚧 Ruby
🚧 Rust
🚧 C#/.NET

# Choose the SDK that matches your tech stack`
        }
      ]
    },
    {
      step: 2,
      icon: Key,
      title: "Get your API key",
      description: "Create your account and generate your API key from the Swarms platform to authenticate your requests.",
      codeExamples: [
        {
          language: "Setup",
          code: `# 1. Visit the Swarms platform
https://swarms.world/platform/api-keys

# 2. Sign up for a free account
- Create your account
- Verify your email
- Navigate to API keys section

# 3. Generate your API key
- Click "Create API Key"
- Give it a descriptive name
- Copy and securely store your key

# 4. Set as environment variable
export SWARMS_API_KEY="your_api_key_here"`
        },
        {
          language: "Python",
          code: `# Set up environment variables
import os
from dotenv import load_dotenv

# Create a .env file in your project root:
# SWARMS_API_KEY=your_api_key_here

# Load environment variables
load_dotenv()

# Verify API key is loaded
api_key = os.getenv("SWARMS_API_KEY")
if api_key:
    print("✅ API key loaded successfully!")
else:
    print("❌ API key not found. Check your .env file.")`
        },
        {
          language: "JavaScript",
          code: `// Set up environment variables
require('dotenv').config();

// Create a .env file in your project root:
// SWARMS_API_KEY=your_api_key_here

// Verify API key is loaded
const apiKey = process.env.SWARMS_API_KEY;
if (apiKey) {
    console.log("✅ API key loaded successfully!");
} else {
    console.log("❌ API key not found. Check your .env file.");
}

// Alternative: Set directly in your environment
// export SWARMS_API_KEY="your_api_key_here"`
        }
      ]
    },
    {
      step: 3,
      icon: Play,
      title: "Run your agent",
      description: "Initialize the client and run your first agent to start building with the Swarms multi-agent platform.",
      codeExamples: [
        {
          language: "Python",
          code: `import requests

payload = {
    "agent_config": {
        "agent_name": "Research Analyst",
        "description": "Expert in analyzing and synthesizing research data",
        "system_prompt": "You are a Research Analyst with expertise in data analysis and synthesis.",
        "model_name": "gpt-4o-mini",
        "max_tokens": 8192,
        "temperature": 0.7
    },
    "task": "Analyze the impact of artificial intelligence on healthcare"
}

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": "your-api-key"},
    json=payload
)`
        },
        {
          language: "cURL",
          code: `# Run your first agent with cURL
curl -X POST "https://api.swarms.world/v1/agent/completions" \\
  -H "x-api-key: your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_config": {
      "agent_name": "Research Analyst",
      "description": "Expert in analyzing and synthesizing research data",
      "system_prompt": "You are a Research Analyst with expertise in data analysis and synthesis.",
      "model_name": "gpt-4o-mini",
      "max_tokens": 8192,
      "temperature": 0.7
    },
    "task": "Analyze the impact of artificial intelligence on healthcare"
  }'

# You should receive a JSON response with your agent's output`
        },
        {
          language: "JavaScript",
          code: `const axios = require('axios');

const payload = {
  agent_config: {
    agent_name: "Research Analyst",
    description: "Expert in analyzing and synthesizing research data",
    system_prompt: "You are a Research Analyst with expertise in data analysis and synthesis.",
    model_name: "gpt-4o-mini",
    max_tokens: 8192,
    temperature: 0.7
  },
  task: "Analyze the impact of artificial intelligence on healthcare"
};

axios.post(
  "https://api.swarms.world/v1/agent/completions",
  payload,
  {
    headers: {
      "x-api-key": "your-api-key"
    }
  }
)
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error("Error:", error.response?.data || error.message);
});`
        }
      ]
    }
  ]

  const faqData = [
    {
      question: "What makes Swarms API different from other AI APIs?",
      answer: "Swarms API is the world's only comprehensive multi-agent orchestration platform. Unlike single-agent APIs, we handle complex multi-agent workflows, memory management, and tool integration out of the box. Our Rust-optimized infrastructure delivers 100x faster performance than traditional Python-based solutions."
    },
    {
      question: "How does pricing work for the Premium tier?",
      answer: "Premium tier is $100 per user per month. This includes significantly increased rate limits (2,000 req/min), 2M tokens per agent, 500 agents per batch, 24/7 premium support through email, calls, and Discord channels, latest access to new features, closest availability zone priority, and many more enterprise features."
    },
    {
      question: "What kind of support do Premium users get?",
      answer: "Premium users receive 24/7 premium support through multiple channels: dedicated email support with faster response times, scheduled phone/video calls with our technical team, access to exclusive Discord channels with direct engineer support, and priority handling for all technical issues."
    },
    {
      question: "Can I start with the free tier and upgrade later?",
      answer: "Absolutely! You can start with our generous free tier (100 req/min, 200K tokens/agent, 100 agents/request) and upgrade to Premium at any time. Your API keys remain the same, and the upgrade takes effect immediately with no downtime."
    },
    {
      question: "What models and tools are supported?",
      answer: "We support 600+ AI models including OpenAI (GPT-4, GPT-3.5), Anthropic (Claude), Google (Gemini), and hundreds more. Our pre-built tools ecosystem includes web search, scraping, Yahoo Finance, document processing, and dozens of integrations. Plus, MCP protocol support enables seamless integration with any platform."
    },
    {
      question: "How does the multi-agent orchestration work?",
      answer: "Our platform handles complex orchestration patterns including concurrent workflows, sequential pipelines, hierarchical structures, and custom patterns. Agents can share memory, collaborate on tasks, and use tools dynamically. All orchestration logic is managed by our Rust-optimized engine for maximum performance."
    },
    {
      question: "Is there an on-premise option?",
      answer: "Yes! Our on-premise license is $9,999/year and includes complete Docker deployment, full source code access, unlimited usage, and 1-year enterprise license with priority support and updates. Perfect for organizations requiring data sovereignty and custom deployments."
    },
    {
      question: "What are the rate limits and how do they scale?",
      answer: "Free tier: 100 req/min, Premium: 2,000 req/min, On-premise: unlimited. Rate limits are per API key and reset every minute. Premium users also get priority processing and access to the closest availability zones for optimal performance."
    },
    {
      question: "How quickly can I get started?",
      answer: "You can start building in minutes! Simply: 1) Install our SDK (Python, TypeScript, Go, Java), 2) Get your free API key from our platform, 3) Run your first agent. Our quickstart guide and comprehensive documentation make integration seamless."
    },
    {
      question: "What happens if I exceed my rate limits?",
      answer: "Requests that exceed rate limits receive a 429 status code with retry-after headers. Free tier users can upgrade to Premium for higher limits, or contact sales for Enterprise solutions with custom limits. Our platform includes automatic retry logic with exponential backoff."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Yes! Our Enterprise tier offers custom rate limits, unlimited tokens and agents, dedicated infrastructure, custom SLA agreements, white-label options, and direct integration support. Contact our sales team to discuss your specific requirements."
    },
    {
      question: "How secure is the Swarms API platform?",
      answer: "We implement enterprise-grade security including encrypted data transmission, secure API key management, comprehensive audit logging, SOC 2 compliance, and multi-region redundancy. On-premise deployments give you complete control over your data and security policies."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 opacity-40">
          <Image
            src="/generation-c179a831-b828-467c-b51b-730fcfe8d4ef.png"
            alt="Swarms API Multi-Agent Orchestration Platform - Enterprise-Grade AI Agent Infrastructure Background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </div>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-red-950/20 to-black/50" aria-hidden="true" />
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

        <div className="container relative px-4 sm:px-6 h-screen">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16 h-full text-center">
            <motion.div
              className="space-y-6 sm:space-y-8 md:space-y-12 lg:space-y-16"
              variants={staggeredContainer}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, margin: "-10%" }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-4xl font-black tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] 2xl:text-[10rem] font-orbitron leading-none"
                variants={mobileOptimizedVariants}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 drop-shadow-2xl">
                  Swarms API
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                className="mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold"
                variants={mobileOptimizedVariants}
              >
                <TypingEffect
                  texts={[
                    "Enterprise-Grade Multi-Agent API Platform",
                    "Rust-optimized: 100x faster than Python",
                    "600+ models: OpenAI, Anthropic, Gemini & more",
                    "MCP protocol: Integrate any platform seamlessly",
                    "Enterprise-grade infrastructure & reliability"
                  ]}
                  typingSpeed={shouldReduceMotion ? 120 : 60}
                  deletingSpeed={shouldReduceMotion ? 80 : 40}
                  delayBetweenTexts={shouldReduceMotion ? 2000 : 3000}
                  className="text-white font-orbitron tracking-wider"
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center w-full px-4 sm:px-0"
                variants={mobileOptimizedVariants}
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-semibold rounded-xl border-0 shadow-2xl hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  asChild
                >
                  <Link href="https://docs.swarms.ai" target="_blank">
                    <BookOpen className="w-6 h-6 mr-3" />
                    View documentation
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 px-8 sm:px-10 md:px-12 py-4 sm:py-5 md:py-6 text-lg sm:text-xl md:text-2xl font-semibold rounded-xl transition-all duration-300 hover:scale-105 w-full sm:w-auto backdrop-blur-sm"
                  asChild
                >
                  <Link href="https://swarms.world/platform/api-keys" target="_blank">
                    <Key className="w-6 h-6 mr-3" />
                    Get API key
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scrolling Ticker */}
      <ScrollingTicker announcements={tickerAnnouncements} />

      {/* Core Capabilities - Mobile-Optimized Single Feature Showcase */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 bg-black" data-section="features">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center sm:text-left mb-6 sm:mb-8 md:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Core <span className="text-red-500">capabilities</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-red-200 max-w-4xl mx-auto sm:mx-0 mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2 sm:px-0">
              Discover the powerful features that make Swarms the world's most advanced multi-agent API platform
            </p>
          </motion.div>

          {/* Fixed Scroll Progress Indicator */}
          <motion.div 
            className="fixed left-1/2 bottom-8 transform -translate-x-1/2 z-[100] flex flex-row items-center space-x-3 bg-black/90 backdrop-blur-sm rounded-full px-6 py-3 border border-red-500/30 shadow-lg shadow-red-500/20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ 
              opacity: showProgressIndicator ? 1 : 0,
              y: showProgressIndicator ? 0 : 50
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            style={{ display: showProgressIndicator ? 'flex' : 'none' }}
          >
            {/* Progress Text */}
            <div className="text-red-400 text-sm font-medium font-orbitron">
              {currentFeatureIndex + 1}/{apiFeatures.length}
            </div>
            
            {/* Progress Bar */}
            <div className="flex items-center space-x-2">
              {apiFeatures.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentFeatureIndex 
                      ? 'bg-red-500 shadow-lg shadow-red-500/50 scale-125' 
                      : index < currentFeatureIndex
                      ? 'bg-red-600/80'
                      : 'bg-red-950/60'
                  }`}
                  whileHover={{ scale: index === currentFeatureIndex ? 1.4 : 1.2 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: index === currentFeatureIndex ? 1.25 : 1 }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  {index === currentFeatureIndex && (
                    <motion.div
                      className="absolute inset-0 bg-red-400 rounded-full animate-pulse"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Feature Label */}
            <div className="text-red-300/80 text-xs font-medium">
              Features
            </div>
          </motion.div>

          {/* Feature Showcase Container */}
          <div className="relative">
            {apiFeatures.map((feature, featureIndex) => (
              <motion.div
                key={feature.title}
                data-feature-index={featureIndex}
                className="min-h-[70vh] sm:min-h-[75vh] md:min-h-[80vh] lg:min-h-screen flex items-center justify-center py-6 sm:py-8 md:py-12"
                variants={mobileOptimizedVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-25%" }}
              >
                <div className="w-full max-w-7xl mx-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12 items-center">
                    {/* Left Side - Feature Content */}
                    <motion.div
                      className="space-y-3 sm:space-y-4 md:space-y-6 order-1 lg:order-1"
                      variants={mobileOptimizedVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-20%" }}
                    >
                      

                      {/* Feature Icon and Number */}
                      <div className="flex items-center space-x-3 sm:space-x-4 md:space-x-6">
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-18 lg:h-18 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white font-bold text-base sm:text-lg md:text-xl shadow-lg shadow-red-500/25"
                          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            duration: shouldReduceMotion ? 0.2 : 0.5, 
                            delay: shouldReduceMotion ? 0 : 0.2, 
                            type: shouldReduceMotion ? "tween" : "spring", 
                            bounce: shouldReduceMotion ? 0 : 0.4 
                          }}
                          viewport={{ once: true }}
                        >
                          {featureIndex + 1}
                        </motion.div>
                        <motion.div
                          className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center border border-red-500/30`}
                          initial={{ 
                            scale: shouldReduceMotion ? 1 : 0, 
                            rotate: shouldReduceMotion ? 0 : -90 
                          }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: shouldReduceMotion ? 0.2 : 0.5, 
                            delay: shouldReduceMotion ? 0 : 0.4 
                          }}
                          viewport={{ once: true }}
                        >
                          <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                        </motion.div>
                      </div>

                      {/* Feature Title */}
                      <motion.h3
                        className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white font-orbitron leading-tight"
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {feature.title}
                      </motion.h3>

                      {/* Feature Description */}
                      <motion.p
                        className="text-sm sm:text-base md:text-lg lg:text-xl text-red-200 leading-relaxed"
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {feature.description}
                      </motion.p>

                      {/* Feature-specific additional details */}
                      {featureIndex === 0 && (
                        <motion.div
                          className="bg-red-950/20 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <h4 className="text-red-400 font-semibold text-sm sm:text-base mb-3">Supported Architectures:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Concurrent workflows
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Sequential pipelines
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Hierarchical structures
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Custom patterns
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {featureIndex === 2 && (
                        <motion.div
                          className="bg-red-950/20 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <h4 className="text-red-400 font-semibold text-sm sm:text-base mb-3">Available Tools:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Web search & scraping
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Yahoo Finance API
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Document processing
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Custom integrations
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {featureIndex === 5 && (
                        <motion.div
                          className="bg-red-950/20 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <h4 className="text-red-400 font-semibold text-sm sm:text-base mb-3">Supported Models:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              OpenAI (GPT-4, GPT-3.5)
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Anthropic (Claude)
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Google (Gemini)
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              And 600+ more models
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {featureIndex === 6 && (
                        <motion.div
                          className="bg-red-950/20 border border-red-500/20 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <h4 className="text-red-400 font-semibold text-sm sm:text-base mb-3">MCP Integrations:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Notion workspace
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Supabase database
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              GitHub repositories
                            </div>
                            <div className="flex items-center text-red-200 text-xs sm:text-sm">
                              <div className="w-2 h-2 bg-red-400 rounded-full mr-2 flex-shrink-0"></div>
                              Any platform via MCP
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Right Side - Visual Element */}
                    <motion.div
                      className="order-2 lg:order-2 px-2 sm:px-4 lg:px-0"
                      variants={mobileOptimizedVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-30%" }}
                    >
                      <motion.div
                        className="relative"
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {/* Feature Visualization Card */}
                        <Card className="bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/40 shadow-lg shadow-red-500/10 backdrop-blur-sm">
                          <CardHeader className="p-4 sm:p-6 md:p-8">
                            <div className="text-center space-y-4 sm:space-y-6">
                              <motion.div
                                className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 mx-auto rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-lg`}
                                whileHover={shouldReduceMotion ? {} : { scale: 1.05, rotate: 2 }}
                                whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                                transition={{ 
                                  type: shouldReduceMotion ? "tween" : "spring", 
                                  stiffness: shouldReduceMotion ? 0 : 300,
                                  duration: shouldReduceMotion ? 0.1 : undefined
                                }}
                              >
                                <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white" />
                              </motion.div>
                              
                              <div className="space-y-3 sm:space-y-4">
                                <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white font-orbitron">
                                  {feature.title}
                                </h4>
                                
                                {/* Animated metrics or visual elements based on feature */}
                                {featureIndex === 0 && !shouldReduceMotion && (
                                  <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                      <motion.div
                                        key={i}
                                        className="w-2 sm:w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                                        initial={{ height: 8 }}
                                        whileInView={{ height: Math.random() * 24 + 8 }}
                                        transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: "reverse" }}
                                        viewport={{ once: true }}
                                      />
                                    ))}
                                  </div>
                                )}
                                
                                {featureIndex === 0 && shouldReduceMotion && (
                                  <div className="flex justify-center space-x-2 sm:space-x-3 md:space-x-4">
                                    {[1, 2, 3, 4].map((i) => (
                                      <div
                                        key={i}
                                        className="w-2 sm:w-3 bg-gradient-to-t from-red-600 to-red-400 rounded-full"
                                        style={{ height: `${20 + i * 4}px` }}
                                      />
                                    ))}
                                  </div>
                                )}
                                
                                {featureIndex === 1 && (
                                  <div className="space-y-1.5 sm:space-y-2">
                                    {[1, 2, 3].map((i) => (
                                      <motion.div
                                        key={i}
                                        className="h-1.5 sm:h-2 bg-gradient-to-r from-red-500 to-red-400 rounded-full"
                                        initial={{ width: "0%" }}
                                        whileInView={{ width: `${60 + i * 15}%` }}
                                        transition={{ 
                                          duration: shouldReduceMotion ? 0.3 : 1, 
                                          delay: shouldReduceMotion ? 0 : i * 0.2 
                                        }}
                                        viewport={{ once: true }}
                                      />
                                    ))}
                                  </div>
                                )}
                                
                                <p className="text-red-200 text-xs sm:text-sm leading-relaxed line-clamp-3">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                        </Card>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Mobile-Friendly Feature Navigation Indicator */}
                <motion.div
                  className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex md:hidden space-x-2"
                  variants={mobileOptimizedVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {apiFeatures.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === featureIndex ? 'bg-red-500' : 'bg-red-950'
                      }`}
                    />
                  ))}
                </motion.div>


              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Specifications */}
      <section className="py-8 sm:py-12 md:py-16 bg-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-6 sm:mb-8 md:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Performance <span className="text-red-500">specifications</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Enterprise-grade performance metrics that scale with your needs
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            {performanceSpecs.map((spec, index) => (
              <motion.div
                key={spec.title}
                variants={mobileOptimizedVariants}
                className="text-center"
              >
                <div className={`bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 ${shouldReduceMotion ? '' : 'hover:border-red-500/40 hover:scale-105'}`}>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <spec.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-red-400 mb-2 font-orbitron">
                    {spec.value}
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-red-200 text-xs sm:text-sm">
                    {spec.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>



      {/* Step-by-Step Integration Guide */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-left mb-8 sm:mb-12 md:mb-16"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-orbitron leading-tight">
              Integration <span className="text-red-500">guide</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-200 max-w-4xl mb-6 sm:mb-8 leading-relaxed">
              Follow our focused step-by-step guide to start building with the world's most advanced multi-agent API
            </p>
            
            {/* Quick Links */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-red-500/25 w-full sm:w-auto"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank">
                  <Key className="w-5 h-5 mr-2" />
                  Get API key
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                asChild
              >
                <Link href="https://docs.swarms.ai/resources/client-libraries" target="_blank">
                  <Code className="w-5 h-5 mr-2" />
                  Download SDKs
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Focused Step Container */}
          <div className="relative">
            {integrationSteps.map((step, stepIndex) => (
              <motion.div
                key={step.step}
                className="min-h-[70vh] sm:min-h-[80vh] md:min-h-screen flex items-center justify-center py-8 sm:py-12 md:py-16"
                variants={mobileOptimizedVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30%" }}
              >
                <div className="w-full max-w-7xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <motion.div
                      className="space-y-6 sm:space-y-8"
                      variants={mobileOptimizedVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-20%" }}
                    >
                      {/* Step Progress */}
                      <div className="flex items-center space-x-4 mb-6">
                        <div className="text-red-400 text-sm font-medium">
                          Step {step.step} of 3
                        </div>
                        <div className="flex-1 h-1 bg-red-950 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-red-500 to-red-600"
                            initial={{ width: "0%" }}
                            whileInView={{ width: `${(step.step / 3) * 100}%` }}
                            transition={{ 
                              duration: shouldReduceMotion ? 0.4 : 1, 
                              delay: shouldReduceMotion ? 0.1 : 0.4 
                            }}
                            viewport={{ once: true }}
                          />
                        </div>
                      </div>

                      {/* Step Number and Icon */}
                      <div className="flex items-center space-x-4 sm:space-x-6">
                        <motion.div
                          className="flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white font-bold text-lg sm:text-xl md:text-2xl shadow-lg shadow-red-500/25"
                          initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ 
                            duration: shouldReduceMotion ? 0.2 : 0.6, 
                            delay: shouldReduceMotion ? 0 : 0.3, 
                            type: shouldReduceMotion ? "tween" : "spring", 
                            bounce: shouldReduceMotion ? 0 : 0.4 
                          }}
                          viewport={{ once: true }}
                        >
                          {step.step}
                        </motion.div>
                        <motion.div
                          className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30"
                          initial={{ 
                            scale: shouldReduceMotion ? 1 : 0, 
                            rotate: shouldReduceMotion ? 0 : -180 
                          }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ 
                            duration: shouldReduceMotion ? 0.2 : 0.6, 
                            delay: shouldReduceMotion ? 0 : 0.5 
                          }}
                          viewport={{ once: true }}
                        >
                          <step.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-red-400" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <motion.h3
                        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white font-orbitron leading-tight"
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {step.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        className="text-base sm:text-lg md:text-xl text-red-200 leading-relaxed"
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        {step.description}
                      </motion.p>

                      {/* Step-specific action buttons */}
                      {step.step === 1 && (
                        <motion.div
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Button
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                            asChild
                          >
                            <Link href="https://docs.swarms.ai/resources/client-libraries" target="_blank">
                              <Code className="w-4 h-4 mr-2" />
                              Browse all SDKs
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                      {step.step === 2 && (
                        <motion.div
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4"
                          variants={mobileOptimizedVariants}
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                        >
                          <Button
                            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                            asChild
                          >
                            <Link href="https://swarms.world/platform/api-keys" target="_blank">
                              <Key className="w-4 h-4 mr-2" />
                              Get your API key
                              <ExternalLink className="w-4 h-4 ml-2" />
                            </Link>
                          </Button>
                        </motion.div>
                      )}
                    </motion.div>

                    {/* Right Side - Code Tabs */}
                    <motion.div
                      className="space-y-3 sm:space-y-4 px-4 sm:px-0"
                      variants={mobileOptimizedVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true, margin: "-20%" }}
                    >
                      <motion.div
                        variants={mobileOptimizedVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                      >
                        <Tabs defaultValue={step.codeExamples[0].language} className="w-full">
                          <TabsList className={`grid w-full bg-red-950/20 border border-red-500/20 text-sm sm:text-base ${step.codeExamples.length === 3 ? 'grid-cols-3' : 'grid-cols-2'}`}>
                            {step.codeExamples.map((example) => (
                              <TabsTrigger
                                key={example.language}
                                value={example.language}
                                className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400 text-red-200 transition-all duration-300"
                              >
                                {example.language}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                          
                          {step.codeExamples.map((example) => (
                            <TabsContent key={example.language} value={example.language}>
                              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300">
                                <CardHeader className="p-0">
                                  <pre className="bg-black/80 p-3 sm:p-4 md:p-6 rounded-lg overflow-x-auto text-xs sm:text-sm text-red-100 font-mono leading-relaxed max-h-64 sm:max-h-80 md:max-h-96 overflow-y-auto">
                                    <code>{example.code}</code>
                                  </pre>
                                </CardHeader>
                              </Card>
                            </TabsContent>
                          ))}
                        </Tabs>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Step Navigation Indicator */}
                <motion.div
                  className="absolute right-3 sm:right-6 md:right-8 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-2"
                  variants={mobileOptimizedVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {integrationSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 sm:w-2 h-6 sm:h-8 rounded-full transition-all duration-300 ${
                        index === stepIndex ? 'bg-red-500' : 'bg-red-950'
                      }`}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Final CTA */}
          <motion.div
            className="text-center mt-8 sm:mt-12 md:mt-16"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 text-base sm:text-lg font-medium mb-4 sm:mb-6 mx-4 sm:mx-0">
              <CheckCircle className="w-5 h-5 mr-2" />
              Ready to build with Swarms API?
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank">
                  <Play className="w-5 h-5 mr-2" />
                  Start building now
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://docs.swarms.ai/api-reference/root" target="_blank">
                  <BookOpen className="w-5 h-5 mr-2" />
                  View full docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-red-950/20 to-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-6 sm:mb-8 md:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Developer <span className="text-red-500">resources</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Everything you need to get started with the world's most advanced multi-agent API
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-0"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className={`bg-black/50 border-red-900/30 transition-all duration-300 group h-full ${shouldReduceMotion ? '' : 'hover:border-red-500/30 hover:scale-105'}`}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-transform duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                    <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    API documentation
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Comprehensive API reference with endpoints, examples, and integration guides
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://docs.swarms.ai/api-reference/root" target="_blank">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View docs
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className={`bg-black/50 border-red-900/30 transition-all duration-300 group h-full ${shouldReduceMotion ? '' : 'hover:border-red-500/30 hover:scale-105'}`}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-transform duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                    <Zap className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    Quickstart guide
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Get started quickly with examples and step-by-step instructions
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://docs.swarms.ai/getting-started/quickstart" target="_blank">
                      <Play className="w-4 h-4 mr-2" />
                      Start guide
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className={`bg-black/50 border-red-900/30 transition-all duration-300 group h-full ${shouldReduceMotion ? '' : 'hover:border-red-500/30 hover:scale-105'}`}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-transform duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                    <Key className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    API key setup
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Step-by-step guide for setting up your API authentication
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://docs.swarms.ai/getting-started/api-key-setup" target="_blank">
                      <Key className="w-4 h-4 mr-2" />
                      Setup guide
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className={`bg-black/50 border-red-900/30 transition-all duration-300 group h-full ${shouldReduceMotion ? '' : 'hover:border-red-500/30 hover:scale-105'}`}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-transform duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                    <Code className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    Setup & configuration
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Advanced configuration and deployment instructions
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://docs.swarms.ai/getting-started/setup" target="_blank">
                      <Code className="w-4 h-4 mr-2" />
                      View setup
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className={`bg-black/50 border-red-900/30 transition-all duration-300 group h-full ${shouldReduceMotion ? '' : 'hover:border-red-500/30 hover:scale-105'}`}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center transition-transform duration-300 ${shouldReduceMotion ? '' : 'group-hover:scale-110'}`}>
                    <Database className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    Telemetry & logs
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Monitor your API usage and view detailed request logs
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://swarms.world/platform/telemetry" target="_blank">
                      <Database className="w-4 h-4 mr-2" />
                      View logs
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              variants={mobileOptimizedVariants}
            >
              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group h-full">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    Onboarding session
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Schedule a personalized onboarding session with our expert team
                  </CardDescription>
                  <Button
                    variant="outline"
                    className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50"
                    asChild
                  >
                    <Link href="https://cal.com/swarms/swarms-onboarding-session" target="_blank">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book session
                    </Link>
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-black to-red-950/10">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-6 sm:mb-8 md:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Service <span className="text-red-500">tiers</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0 mb-4 sm:mb-6">
              Choose the plan that fits your scale and performance requirements
            </p>
            <div className="flex justify-center">
              <Button
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 py-3 text-base font-semibold rounded-lg transition-all duration-300"
                asChild
              >
                <Link href="/pricing">
                  <DollarSign className="w-5 h-5 mr-2" />
                  View detailed pricing
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto px-4 sm:px-0"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            {rateLimits.map((tier, index) => (
              <motion.div
                key={tier.tier}
                variants={mobileOptimizedVariants}
                className="relative"
              >
                {/* Premium tier highlight */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                {/* On-Premise tier highlight */}
                {index === 2 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Self-Hosted
                    </div>
                  </div>
                )}
                
                <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${shouldReduceMotion ? '' : 'hover:scale-105'} ${
                  index === 1 
                    ? 'bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/40 shadow-lg shadow-green-500/10' 
                    : index === 2
                    ? 'bg-gradient-to-br from-amber-900/20 to-amber-800/10 border-amber-500/40 shadow-lg shadow-amber-500/10'
                    : `bg-black/40 border-red-900/30 ${shouldReduceMotion ? '' : 'hover:border-red-500/40'}`
                } backdrop-blur-sm`}>
                  {/* Background pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(239,68,68,0.02)_50%,transparent_75%)] bg-[length:20px_20px]" />
                  
                  <div className="relative p-4 sm:p-6 md:p-8">
                    {/* Tier name */}
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-orbitron">
                        {tier.tier}
                      </h3>
                      {tier.price && (
                        <div className={`text-lg sm:text-xl font-bold mb-2 font-orbitron ${
                          index === 1 ? 'text-green-400' : index === 2 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {tier.price}
                        </div>
                      )}
                      {index === 0 && (
                        <p className="text-red-300 text-sm">Pay as you go • Perfect for getting started</p>
                      )}
                      {index === 1 && (
                        <p className="text-green-300 text-sm">Best for growing businesses</p>
                      )}
                      {index === 2 && (
                        <p className="text-amber-300 text-sm">Run on your own infrastructure</p>
                      )}
                      {index === 3 && (
                        <p className="text-red-300 text-sm">Unlimited scalability</p>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-red-900/20">
                        <span className="text-xs sm:text-sm text-red-200">Requests per minute</span>
                        <span className={`text-sm sm:text-lg font-bold font-orbitron ${
                          index === 1 ? 'text-green-400' : index === 2 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {tier.requests}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-red-900/20">
                        <span className="text-xs sm:text-sm text-red-200">Tokens per agent</span>
                        <span className={`text-sm sm:text-base font-bold font-orbitron ${
                          index === 1 ? 'text-green-400' : index === 2 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {tier.tokens}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 sm:py-3">
                        <span className="text-xs sm:text-sm text-red-200">Agents per request</span>
                        <span className={`text-sm sm:text-base font-bold font-orbitron ${
                          index === 1 ? 'text-green-400' : index === 2 ? 'text-amber-400' : 'text-red-400'
                        }`}>
                          {tier.batch}
                        </span>
                      </div>
                      
                      {/* Premium tier specific features */}
                      {index === 1 && (
                        <>
                          <div className="border-t border-green-500/20 pt-4">
                            <div className="text-green-400 font-semibold text-sm mb-3">Premium benefits:</div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-green-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                24/7 premium support (email, calls, Discord)
                              </div>
                              <div className="flex items-center text-sm text-green-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                Significantly increased rate limits
                              </div>
                              <div className="flex items-center text-sm text-green-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                Latest access to new features
                              </div>
                              <div className="flex items-center text-sm text-green-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                Closest availability zone priority
                              </div>
                              <div className="flex items-center text-sm text-green-200">
                                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                And much more enterprise features
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                      
                      {/* On-premise specific features */}
                      {index === 2 && (
                        <>
                          <div className="border-t border-amber-500/20 pt-4">
                            <div className="text-amber-400 font-semibold text-sm mb-3">Included with license:</div>
                            <div className="space-y-2">
                              <div className="flex items-center text-sm text-amber-200">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                Complete Docker deployment
                              </div>
                              <div className="flex items-center text-sm text-amber-200">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                1-year enterprise license
                              </div>
                              <div className="flex items-center text-sm text-amber-200">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                Full source code access
                              </div>
                              <div className="flex items-center text-sm text-amber-200">
                                <div className="w-2 h-2 bg-amber-400 rounded-full mr-2"></div>
                                Priority support & updates
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="text-center">
                      {index === 0 && (
                        <Button
                          variant="outline"
                          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 py-4 sm:py-6 text-base sm:text-lg font-semibold"
                          asChild
                        >
                          <Link href="https://swarms.world/platform/api-keys" target="_blank">
                            Get started free
                          </Link>
                        </Button>
                      )}
                      {index === 1 && (
                        <Button
                          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold"
                          asChild
                        >
                          <Link href="https://swarms.world/platform/account" target="_blank">
                            Upgrade to premium
                          </Link>
                        </Button>
                      )}
                      {index === 2 && (
                        <Button
                          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold"
                          asChild
                        >
                          <Link href="https://buy.stripe.com/eVq4gz7Nph072rZ1J6aAw09" target="_blank">
                            Purchase license
                          </Link>
                        </Button>
                      )}
                      {index === 3 && (
                        <Button
                          variant="outline"
                          className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 py-4 sm:py-6 text-base sm:text-lg font-semibold"
                          asChild
                        >
                          <Link href="https://cal.com/swarms/swarms-onboarding-session" target="_blank">
                            Contact sales
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Promotional Banner */}
          <motion.div
            className="text-center mt-8 sm:mt-12 md:mt-16"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <div className="inline-flex items-center px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 text-lg sm:text-xl font-semibold mx-4 sm:mx-0 backdrop-blur-sm">
              <span className="text-2xl mr-3">🎉</span>
              Get $5 in free credits when you 
              <Link href="https://swarms.world/platform/account" target="_blank" className="text-red-300 hover:text-red-200 underline decoration-red-400 ml-1">
                sign up right now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-red-950/10 to-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 font-orbitron leading-tight">
              Frequently asked <span className="text-red-500">questions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-200 max-w-4xl mx-auto leading-relaxed px-4 sm:px-0">
              Everything you need to know about Swarms API pricing, features, and implementation
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                variants={mobileOptimizedVariants}
                className="mb-4 sm:mb-6"
              >
                <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 overflow-hidden">
                  <CardHeader
                    className="cursor-pointer p-4 sm:p-6 transition-all duration-300 hover:bg-red-950/10"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl font-semibold text-white text-left leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" />
                      </motion.div>
                    </div>
                  </CardHeader>

                  <motion.div
                    initial={false}
                    animate={{
                      height: openFaqIndex === index ? "auto" : 0,
                      opacity: openFaqIndex === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                      <div className="ml-11 sm:ml-14">
                        <p className="text-sm sm:text-base md:text-lg text-red-200 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* FAQ CTA */}
          <motion.div
            className="text-center mt-8 sm:mt-12 md:mt-16"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 text-base sm:text-lg font-medium mb-4 sm:mb-6 mx-4 sm:mx-0">
              <HelpCircle className="w-5 h-5 mr-2" />
              Have more questions?
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://cal.com/swarms/swarms-onboarding-session" target="_blank">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule consultation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg w-full sm:w-auto"
                asChild
              >
                <Link href="https://docs.swarms.ai" target="_blank">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read documentation
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-black to-red-950/20">
        <div className="container px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 font-orbitron leading-tight">
              Get started <span className="text-red-500">now</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Start orchestrating intelligent agent swarms today with the world's only multi-agent API platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 sm:px-0">
              <Button
                size="lg"
                className={`bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-red-500/25 transition-all duration-300 w-full sm:w-auto ${shouldReduceMotion ? '' : 'hover:scale-105'}`}
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank">
                  <Key className="w-5 h-5 mr-2" />
                  Get started now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 w-full sm:w-auto ${shouldReduceMotion ? '' : 'hover:scale-105'}`}
                asChild
              >
                <Link href="https://docs.swarms.ai" target="_blank">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
