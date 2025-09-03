"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CardWrapper } from "@/components/card-wrapper"
import { motion } from "framer-motion"
import { 
  ArrowRight, Zap, Cpu, Globe, ExternalLink, 
  Network, Shield, BookOpen, Code,
  Calendar, Key, CheckCircle, Play, Database
} from "lucide-react"
import { TypingEffect } from "@/components/typing-effect"
import { AnimatedBackground } from "@/components/animated-background"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import Link from "next/link"

export default function APIPage() {
  const tickerAnnouncements = [
    "Swarms API: The only multi-agent API in the world",
    "Rust-optimized: 100x faster than raw Python",
    "600+ model support with MCP protocol",
    "Enterprise-grade infrastructure & reliability",
    "100 agents per request for free users"
  ]

  const apiFeatures = [
    {
      icon: Globe,
      title: "World's only multi-agent API",
      description: "The first and only comprehensive multi-agent orchestration API platform available globally",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Zap,
      title: "Rust-optimized performance",
      description: "100x speed increase over raw Python with sub-millisecond initialization and enterprise-grade reliability",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Database,
      title: "600+ model support",
      description: "Comprehensive model ecosystem with MCP (Model Context Protocol) support for maximum flexibility",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Shield,
      title: "Enterprise infrastructure",
      description: "Enterprise-grade infrastructure and reliability with advanced security and fault tolerance",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Network,
      title: "Orchestration handled",
      description: "We handle all the complex orchestration logic - you focus on building and configuring your agents",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Cpu,
      title: "100 agents per request",
      description: "Scale from 100 agents per request on free tier to unlimited enterprise deployments",
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
      price: "$100/month",
      requests: "2,000 req/min",
      tokens: "2M tokens/agent",
      batch: "500 agents/batch",
      gradient: "from-red-600 to-red-700"
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
          code: `import os
from swarms_client import SwarmsClient

# Initialize the Swarms client
client = SwarmsClient(
    api_key=os.getenv("SWARMS_API_KEY")
)

# Define your agent
agent_config = {
    "agent_name": "Research Assistant",
    "description": "A helpful research assistant",
    "system_prompt": "You are a helpful research assistant that provides accurate and detailed information.",
    "model_name": "gpt-4o",
    "max_tokens": 4000,
    "temperature": 0.7
}

# Run your agent
response = client.agents.run(
    agent_config=agent_config,
    task="Explain the benefits of multi-agent AI systems"
)

print("Agent Response:")
print(response)`
        },
        {
          language: "cURL",
          code: `# Run your first agent with cURL
curl -X POST "https://api.swarms.world/v1/agent/completions" \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_config": {
      "agent_name": "Research Assistant",
      "description": "A helpful research assistant",
      "system_prompt": "You are a helpful research assistant that provides accurate and detailed information.",
      "model_name": "gpt-4o",
      "max_tokens": 4000,
      "temperature": 0.7
    },
    "task": "Explain the benefits of multi-agent AI systems"
  }'

# You should receive a JSON response with your agent's output`
        },
        {
          language: "JavaScript",
          code: `const axios = require('axios');

// Initialize the API client
const swarmsAPI = axios.create({
  baseURL: 'https://api.swarms.world',
  headers: {
    'x-api-key': process.env.SWARMS_API_KEY,
    'Content-Type': 'application/json'
  }
});

// Define your agent
const agentConfig = {
  agent_name: "Research Assistant",
  description: "A helpful research assistant",
  system_prompt: "You are a helpful research assistant that provides accurate and detailed information.",
  model_name: "gpt-4o",
  max_tokens: 4000,
  temperature: 0.7
};

// Run your agent
async function runAgent() {
  try {
    const response = await swarmsAPI.post('/v1/agent/completions', {
      agent_config: agentConfig,
      task: "Explain the benefits of multi-agent AI systems"
    });
    
    console.log("Agent Response:");
    console.log(response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

runAgent();`
        }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
          style={{ backgroundImage: 'url(/generation-c179a831-b828-467c-b51b-730fcfe8d4ef.png)' }}
        />
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
          <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20 h-full text-center">
            <motion.div
              className="space-y-8 sm:space-y-12 md:space-y-16 lg:space-y-20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-6xl font-black tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] 2xl:text-[12rem] font-orbitron leading-none"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 drop-shadow-2xl">
                  Swarms API
                </span>
              </motion.h1>

              {/* Subtitle */}
              <motion.div
                className="mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
              >
                <TypingEffect
                  texts={[
                    "Enterprise-Grade Bleeding-Edge Multi-Agent API Platform",
                    "Rust-optimized: 100x faster than Python",
                    "600+ models with MCP protocol support",
                    "Enterprise-grade infrastructure & reliability"
                  ]}
                  typingSpeed={60}
                  deletingSpeed={40}
                  delayBetweenTexts={3000}
                  className="text-white font-orbitron tracking-wider"
                />
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-center justify-center w-full px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
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

      {/* Features Grid */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-red-950/20">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Core <span className="text-red-500">capabilities</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Comprehensive API endpoints for every aspect of multi-agent orchestration
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {apiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group h-full">
                  <CardHeader className="text-center p-4 sm:p-6">
                    <div className={`w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-red-200 mt-2 text-sm sm:text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Specifications */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Performance <span className="text-red-500">specifications</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Enterprise-grade performance metrics that scale with your needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {performanceSpecs.map((spec, index) => (
              <motion.div
                key={spec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/20 rounded-xl p-4 sm:p-6 md:p-8 hover:border-red-500/40 transition-all duration-300 hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <spec.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2 font-orbitron">
                    {spec.value}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-2">
                    {spec.title}
                  </h3>
                  <p className="text-red-200 text-xs sm:text-sm">
                    {spec.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Step-by-Step Integration Guide */}
      <section className="py-24 bg-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-left mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 font-orbitron leading-tight">
              Integration <span className="text-red-500">guide</span>
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl text-red-200 max-w-4xl mb-8 sm:mb-10 leading-relaxed">
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
                className="min-h-screen flex items-center justify-center py-16"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: false, margin: "-20%" }}
              >
                <div className="w-full max-w-7xl">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <motion.div
                      className="space-y-8"
                      initial={{ opacity: 0, x: -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: false, margin: "-10%" }}
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
                            transition={{ duration: 1, delay: 0.4 }}
                            viewport={{ once: false }}
                          />
                        </div>
                      </div>

                      {/* Step Number and Icon */}
                      <div className="flex items-center space-x-6">
                        <motion.div
                          className="flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 text-white font-bold text-2xl shadow-lg shadow-red-500/25"
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          transition={{ duration: 0.6, delay: 0.3, type: "spring", bounce: 0.4 }}
                          viewport={{ once: false }}
                        >
                          {step.step}
                        </motion.div>
                        <motion.div
                          className="w-16 h-16 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30"
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          viewport={{ once: false }}
                        >
                          <step.icon className="w-8 h-8 text-red-400" />
                        </motion.div>
                      </div>

                      {/* Title */}
                      <motion.h3
                        className="text-4xl md:text-5xl font-bold text-white font-orbitron leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: false }}
                      >
                        {step.title}
                      </motion.h3>

                      {/* Description */}
                      <motion.p
                        className="text-xl text-red-200 leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: false }}
                      >
                        {step.description}
                      </motion.p>

                      {/* Step-specific action buttons */}
                      {step.step === 1 && (
                        <motion.div
                          className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-3 sm:pt-4"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          viewport={{ once: false }}
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
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.8, delay: 0.8 }}
                          viewport={{ once: false }}
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
                      initial={{ opacity: 0, x: 100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: false, margin: "-10%" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: false }}
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
                  className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col space-y-2"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: false }}
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
            className="text-center mt-12 sm:mt-16 md:mt-24"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
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
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-red-950/20 to-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Developer <span className="text-red-500">resources</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Everything you need to get started with the world's most advanced multi-agent API
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 hover:scale-105 group h-full">
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <BookOpen className="w-6 sm:w-8 h-6 sm:h-8 text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                    API documentation
                  </CardTitle>
                  <CardDescription className="text-red-200 mt-2 mb-3 sm:mb-4 text-sm sm:text-base">
                    Comprehensive API reference with endpoints, examples, and integration guides
                  </CardDescription>
                  <Button
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
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
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-red-950/10">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 md:mb-6 font-orbitron leading-tight">
              Service <span className="text-red-500">tiers</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-200 max-w-3xl mx-auto px-4 sm:px-0">
              Choose the plan that fits your scale and performance requirements
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto px-4 sm:px-0">
            {rateLimits.map((tier, index) => (
              <motion.div
                key={tier.tier}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Premium tier highlight */}
                {index === 1 && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className={`relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-105 ${
                  index === 1 
                    ? 'bg-gradient-to-br from-red-900/20 to-red-800/10 border-red-500/40 shadow-lg shadow-red-500/10' 
                    : 'bg-black/40 border-red-900/30 hover:border-red-500/40'
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
                        <div className="text-2xl sm:text-3xl font-bold text-red-400 mb-2 font-orbitron">
                          {tier.price}
                        </div>
                      )}
                      {index === 0 && (
                        <p className="text-red-300 text-sm">Perfect for getting started</p>
                      )}
                      {index === 1 && (
                        <p className="text-red-300 text-sm">Best for growing businesses</p>
                      )}
                      {index === 2 && (
                        <p className="text-red-300 text-sm">Unlimited scalability</p>
                      )}
                    </div>

                    {/* Features list */}
                    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-red-900/20">
                        <span className="text-sm sm:text-base text-red-200">Requests per minute</span>
                        <span className="text-lg sm:text-2xl font-bold text-red-400 font-orbitron">
                          {tier.requests}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 sm:py-3 border-b border-red-900/20">
                        <span className="text-sm sm:text-base text-red-200">Tokens per agent</span>
                        <span className="text-base sm:text-xl font-bold text-red-400 font-orbitron">
                          {tier.tokens}
                        </span>
                      </div>
                      <div className="flex justify-between items-center py-2 sm:py-3">
                        <span className="text-sm sm:text-base text-red-200">Agents per request</span>
                        <span className="text-base sm:text-xl font-bold text-red-400 font-orbitron">
                          {tier.batch}
                        </span>
                      </div>
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
                          className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white py-4 sm:py-6 text-base sm:text-lg font-semibold"
                          asChild
                        >
                          <Link href="https://swarms.world/platform/account" target="_blank">
                            Upgrade to premium
                          </Link>
                        </Button>
                      )}
                      {index === 2 && (
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
          </div>
          
          {/* Promotional Banner */}
          <motion.div
            className="text-center mt-12 sm:mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center px-6 sm:px-8 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 text-lg sm:text-xl font-semibold mx-4 sm:mx-0 backdrop-blur-sm">
              <span className="text-2xl mr-3">🎉</span>
              Get $20 in free credits when you 
              <Link href="https://swarms.world/platform/account" target="_blank" className="text-red-300 hover:text-red-200 underline decoration-red-400 ml-1">
                sign up right now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-red-950/20">
        <div className="container px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 font-orbitron leading-tight">
              Get started <span className="text-red-500">now</span>
            </h2>
            <p className="text-lg sm:text-xl text-red-200 mb-6 sm:mb-8 max-w-2xl mx-auto px-4 sm:px-0">
              Start orchestrating intelligent agent swarms today with the world's only multi-agent API platform
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center px-4 sm:px-0">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg border-0 shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-lg transition-all duration-300 hover:scale-105 w-full sm:w-auto"
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
