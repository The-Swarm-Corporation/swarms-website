"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { 
  ArrowRight, Zap, Globe,
  BookOpen, Code,
  Calendar, Key, Database,
  Activity, BarChart3, DollarSign, Moon,
  HelpCircle, ChevronDown, CreditCard, Users
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  
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

  const pricingItems = [
    {
      item: "Base cost per agent",
      standardCost: "$0.01 per agent",
      flexCost: "$0.01 per agent",
      notes: "Charged for each agent in a swarm",
      icon: Users
    },
    {
      item: "Input tokens (swarm)",
      standardCost: "$3.00 per 1M tokens",
      flexCost: "$0.75 per 1M tokens",
      notes: "75% discount in Flex mode",
      icon: Database,
      highlight: "flex"
    },
    {
      item: "Output tokens (swarm)",
      standardCost: "$15.00 per 1M tokens",
      flexCost: "$3.75 per 1M tokens",
      notes: "75% discount in Flex mode",
      icon: Activity,
      highlight: "flex"
    },
    {
      item: "MCP cost",
      standardCost: "$0.10 per call",
      flexCost: "$0.10 per call",
      notes: "Charged if an agent uses an MCP URL",
      icon: Globe
    },
    {
      item: "Image cost",
      standardCost: "$0.25 per image",
      flexCost: "$0.25 per image",
      notes: "Charged for each image processed",
      icon: BarChart3
    }
  ]

  const cloudTiers = [
    {
      tier: "Free tier",
      requests: "100 req/min",
      tokens: "200K tokens/agent",
      batch: "100 agents/request",
      gradient: "from-black to-red-950",
      description: "Pay as you go • Perfect for getting started"
    },
    {
      tier: "Pro",
      price: "$19.99/month",
      requests: "500 req/min",
      tokens: "500K tokens/agent",
      batch: "200 agents/request",
      gradient: "from-red-500 to-red-600",
      description: "Perfect for professionals who need more power and features",
      benefits: [
        "Global Availability",
        "Exclusive Multi-Agent Architectures",
        "Accelerated Hardware",
        "API Telemetry Platform",
        "Priority Support",
        "Pro Models"
      ]
    },
    {
      tier: "Premium tier",
      price: "$100/user/month",
      requests: "2,000 req/min",
      tokens: "2M tokens/agent",
      batch: "500 agents/batch",
      gradient: "from-green-600 to-green-700",
      description: "Best for growing businesses",
      benefits: [
        "24/7 premium support (email, calls, Discord)",
        "Significantly increased rate limits",
        "Latest access to new features",
        "Closest availability zone priority",
        "And much more enterprise features"
      ]
    },
    {
      tier: "Enterprise",
      requests: "Custom limits",
      tokens: "Unlimited",
      batch: "Unlimited",
      gradient: "from-red-800 to-red-900",
      description: "Unlimited scalability"
    }
  ]

  const onPremiseTiers = [
    {
      tier: "On-Premise",
      price: "$9,999/year",
      requests: "Unlimited",
      tokens: "Unlimited",
      batch: "Unlimited",
      gradient: "from-amber-600 to-amber-700",
      description: "Run on your own infrastructure",
      isOnPremise: true,
      benefits: [
        "Complete Docker deployment",
        "1-year enterprise license",
        "Full source code access",
        "Priority support & updates",
        "Unlimited usage on your infrastructure",
        "Custom integrations and configurations",
        "Data sovereignty and compliance",
        "Dedicated technical support"
      ]
    }
  ]

  const faqData = [
    {
      question: "How does the usage-based pricing work?",
      answer: "Credits are deducted from your account for each API call based on our transparent pricing structure. Free credits are used first, then regular credits. You're charged for base agent costs, input/output tokens, MCP calls, and image processing according to the rates in our pricing table."
    },
    {
      question: "What's the difference between Standard and Flex pricing?",
      answer: "Flex tier offers a 75% discount on token costs but may have higher latency or require retries. Standard tier provides consistent performance with standard pricing. Flex is perfect for non-time-sensitive workloads where cost savings are prioritized over speed."
    },
    {
      question: "How does the night-time discount work?",
      answer: "You get a 75% discount on token costs between 8pm and 6am California time. This applies to both Standard and Flex pricing tiers and is automatically applied to eligible API calls during these hours."
    },
    {
      question: "What are MCP costs and when are they charged?",
      answer: "MCP (Model Context Protocol) costs are $0.10 per call and are charged when an agent uses an MCP URL for external integrations like Notion, Supabase, or GitHub. This enables seamless integration with any platform supporting the MCP protocol."
    },
    {
      question: "How are swarm vs single agent costs different?",
      answer: "Swarm operations use different token pricing ($3.00/$15.00 per 1M input/output tokens in Standard, $0.75/$3.75 in Flex) plus $0.01 per agent. Single agent completions use $2.00/$4.50 per 1M input/output tokens and don't include the per-agent base cost."
    },
    {
      question: "Can I switch between pricing tiers?",
      answer: "Yes! You can upgrade from Free to Premium at any time. Your API keys remain the same, and the upgrade takes effect immediately. Premium users get increased rate limits, priority support, and access to the latest features."
    },
    {
      question: "What happens when I run out of credits?",
      answer: "When your credits are exhausted, API calls will fail with appropriate error codes. You can purchase additional credits or upgrade to Premium for higher limits. We recommend setting up billing alerts to monitor your usage."
    },
    {
      question: "How is image processing charged?",
      answer: "Image processing costs $0.25 per image across all tiers. This applies when agents analyze, generate, or manipulate images as part of their tasks. The cost is the same whether using Standard or Flex pricing."
    },
    {
      question: "What's included in the Premium tier support?",
      answer: "Premium users get 24/7 support through email, scheduled calls, and exclusive Discord channels with direct engineer access. You also receive priority processing, access to closest availability zones, and early access to new features."
    },
    {
      question: "How does the on-premise license work?",
      answer: "The on-premise license ($9,999/year) includes complete Docker deployment, full source code access, unlimited usage, and 1-year enterprise license with priority support. Perfect for organizations requiring data sovereignty and custom deployments."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-black min-h-screen flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
          style={{ backgroundImage: 'url(/product_agency.jpg)' }}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70" />
        {/* Cyberpunk grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-red-950/20 to-black/50" aria-hidden="true" />

        <div className="container relative px-4 sm:px-6 py-16 sm:py-20 md:py-24 lg:py-32 w-full">
          <div className="text-center space-y-6 sm:space-y-8">
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter font-orbitron leading-none"
              variants={mobileOptimizedVariants}
              initial="hidden"
              animate="visible"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600 drop-shadow-2xl">
                Pricing
              </span>
            </motion.h1>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-red-200 max-w-4xl mx-auto leading-relaxed"
              variants={mobileOptimizedVariants}
              initial="hidden"
              animate="visible"
            >
              Transparent usage-based pricing and service tiers for The Swarms API.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-center"
              variants={mobileOptimizedVariants}
              initial="hidden"
              animate="visible"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank">
                  <Key className="w-5 h-5 mr-2" />
                  Get started free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 px-8 py-4 text-lg font-semibold rounded-xl"
                asChild
              >
                <Link href="https://docs.swarms.ai/resources/pricing">
                  <Code className="w-5 h-5 mr-2" />
                  View API docs
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Usage-Based Pricing Table */}
      <section className="py-12 sm:py-16 md:py-20 bg-black">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron">
              Usage-based <span className="text-red-500">pricing</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto">
              Pay only for what you use with transparent, per-operation pricing
            </p>
          </motion.div>

          {/* Pricing Table */}
          <motion.div
            className="overflow-x-auto"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <div className="min-w-full">
              <Card className="bg-black/50 border-red-900/30 overflow-hidden">
                <CardHeader className="p-0">
                  {/* Table Header */}
                  <div className="grid grid-cols-4 gap-4 p-4 sm:p-6 bg-gradient-to-r from-red-950/20 to-red-900/20 border-b border-red-900/30">
                    <div className="font-semibold text-white text-sm sm:text-base">Operation</div>
                    <div className="font-semibold text-white text-sm sm:text-base text-center">Standard Cost</div>
                    <div className="font-semibold text-green-400 text-sm sm:text-base text-center">Flex Cost</div>
                    <div className="font-semibold text-red-300 text-sm sm:text-base text-center">Notes</div>
                  </div>

                  {/* Table Rows */}
                  {pricingItems.map((item, index) => (
                    <motion.div
                      key={item.item}
                      className={`grid grid-cols-4 gap-4 p-4 sm:p-6 border-b border-red-900/20 transition-all duration-300 hover:bg-red-950/10 ${
                        item.highlight === 'flex' ? 'bg-green-950/10' : ''
                      }`}
                      variants={mobileOptimizedVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white text-sm sm:text-base font-medium">{item.item}</span>
                      </div>
                      <div className="text-red-300 text-sm sm:text-base text-center font-mono">{item.standardCost}</div>
                      <div className={`text-sm sm:text-base text-center font-mono ${
                        item.flexCost === 'N/A' ? 'text-red-500' : 'text-green-400'
                      }`}>
                        {item.flexCost}
                      </div>
                      <div className="text-red-200 text-xs sm:text-sm text-center">{item.notes}</div>
                    </motion.div>
                  ))}
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* Special Offers */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 sm:mt-12"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <motion.div variants={mobileOptimizedVariants}>
              <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-500/40 hover:border-green-500/60 transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-green-400 text-xl font-bold">Flex Tier</CardTitle>
                      <CardDescription className="text-green-200">75% discount on token costs</CardDescription>
                    </div>
                  </div>
                  <p className="text-green-100 text-sm leading-relaxed">
                    Perfect for non-time-sensitive workloads where cost savings are prioritized over speed. 
                    May have higher latency or require retries, but offers significant savings on token usage.
                  </p>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={mobileOptimizedVariants}>
              <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-500/40 hover:border-blue-500/60 transition-all duration-300">
                <CardHeader className="p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <Moon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-blue-400 text-xl font-bold">Night-time Discount</CardTitle>
                      <CardDescription className="text-blue-200">75% off token costs</CardDescription>
                    </div>
                  </div>
                  <p className="text-blue-100 text-sm leading-relaxed">
                    Automatic 75% discount on token costs between 8pm–6am California time. 
                    Applies to both Standard and Flex pricing tiers for maximum savings during off-peak hours.
                  </p>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Credit Deductions */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-black to-red-950/10">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron">
              Credit <span className="text-red-500">deductions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto">
              How credits are deducted and billing logic works
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
            variants={staggeredContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <motion.div variants={mobileOptimizedVariants}>
              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 h-full">
                <CardHeader className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <CreditCard className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl mb-3">Credit Priority</CardTitle>
                  <CardDescription className="text-red-200 text-sm leading-relaxed">
                    Free credits are used first, then regular credits. This ensures you get maximum value from promotional credits and free tier allowances.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={mobileOptimizedVariants}>
              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 h-full">
                <CardHeader className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <DollarSign className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl mb-3">Per-Call Billing</CardTitle>
                  <CardDescription className="text-red-200 text-sm leading-relaxed">
                    Credits are deducted for each API call based on operation type, token usage, agent count, and any additional services like MCP or image processing.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div variants={mobileOptimizedVariants}>
              <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 h-full">
                <CardHeader className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl mb-3">MCP Additional Costs</CardTitle>
                  <CardDescription className="text-red-200 text-sm leading-relaxed">
                    If your agent uses an MCP URL for external integrations, an additional $0.10 is deducted per call on top of standard operation costs.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* API Pricing Section */}
      <div className="relative overflow-hidden bg-black border-t-2 border-red-500/20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
        
        <div className="container relative px-4 sm:px-6 py-24 md:py-32">
          <motion.div
            className="max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white font-orbitron tracking-tighter mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                  API Pricing
                </span>
              </h2>
              <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto font-sans mb-8">
                Flexible subscription plans that scale with your needs. From free to enterprise.
              </p>
              
              {/* Billing Toggle */}
              <div className="flex justify-center gap-4 mb-8">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 font-orbitron"
                >
                  Monthly
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 font-orbitron"
                >
                  Annually
                  <span className="ml-2 text-xs text-green-400">-15%</span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-gray-400 hover:bg-red-500/10 hover:border-red-500/50 font-orbitron"
                >
                  Lifetime
                </Button>
              </div>
            </motion.div>

            <Tabs defaultValue="cloud" className="w-full">
              <div className="flex justify-center mb-12 md:mb-16">
                <TabsList className="bg-black/50 border border-red-500/30 backdrop-blur-sm">
                  <TabsTrigger 
                    value="cloud" 
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400 font-orbitron tracking-wider px-6 py-3"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Cloud
                  </TabsTrigger>
                  <TabsTrigger 
                    value="on-premise" 
                    className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-gray-400 font-orbitron tracking-wider px-6 py-3"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    On-Premise
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="cloud" className="mt-0">
                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                  {/* Free Plan */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-2 border-red-500/20 bg-black/50 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-white font-orbitron mb-2">Free</CardTitle>
                        <CardDescription className="text-gray-400 text-sm mb-4">
                          Get started with Swarms Cloud. No fees pay only for what you use.
                        </CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-black text-white font-orbitron">$0</span>
                          <span className="text-gray-400 text-lg ml-2">/month</span>
                        </div>
                      </CardHeader>
                      <div className="px-6 pb-6">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 font-orbitron"
                          asChild
                        >
                          <a href="https://swarms.world/platform/account" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                        <div className="mt-6 space-y-3 text-sm text-gray-300">
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Sign-up Bonus</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Basic Access</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Pay-Per-Use Pricing</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Community Support</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Standard Processing Speed</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Access to the Marketplace</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Pro Plan */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="relative pt-8 md:pt-10"
                  >
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                      <span className="bg-red-600 text-white text-xs font-bold px-4 py-1.5 rounded-full font-orbitron shadow-lg shadow-red-600/50 whitespace-nowrap">
                        Most Popular
                      </span>
                    </div>
                    <Card className="h-full border-2 border-red-500 bg-black/50 backdrop-blur-sm hover:border-red-500 hover:bg-black/60 transition-all duration-300 scale-105 md:scale-110">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-white font-orbitron mb-2">Pro</CardTitle>
                        <CardDescription className="text-gray-300 text-sm mb-4">
                          Perfect for professionals who need more power and features.
                        </CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-black text-white font-orbitron">$19.99</span>
                          <span className="text-gray-400 text-lg ml-2">/month</span>
                        </div>
                      </CardHeader>
                      <div className="px-6 pb-6">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 font-orbitron"
                          asChild
                        >
                          <a href="https://swarms.world/platform/account" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                        <div className="mt-6 space-y-3 text-sm text-gray-300">
                          <div className="text-white font-semibold mb-2">Everything in Free, plus</div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Global Availability</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Exclusive Multi-Agent Architectures</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Accelerated Hardware</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>API Telemetry Platform</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Priority Support</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Pro Models</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Premium Plan */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-2 border-red-500/20 bg-black/50 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-white font-orbitron mb-2">Premium</CardTitle>
                        <CardDescription className="text-gray-400 text-sm mb-4">
                          Subscribe annually and save 15%, with a reduced rate of $1,020/year.
                        </CardDescription>
                        <div className="mt-4">
                          <span className="text-4xl font-black text-white font-orbitron">$100</span>
                          <span className="text-gray-400 text-lg ml-2">/month</span>
                        </div>
                      </CardHeader>
                      <div className="px-6 pb-6">
                        <Button
                          className="w-full bg-red-600 hover:bg-red-700 font-orbitron"
                          asChild
                        >
                          <a href="https://swarms.world/platform/account" target="_blank" rel="noopener noreferrer">
                            Get Started
                          </a>
                        </Button>
                        <div className="mt-6 space-y-3 text-sm text-gray-300">
                          <div className="text-white font-semibold mb-2">Everything in Pro, plus</div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Premium Models</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>More Agents Per Request</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>More Completions</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Increased Rate Limits</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>SOC 2 Compliance</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Priority Support</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Enhanced Security Features</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Fetch Agents from the Marketplace</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>View Previous Agent Configurations</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Everything in Pro</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>

                  {/* Enterprise Plan */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <Card className="h-full border-2 border-red-500/20 bg-black/50 backdrop-blur-sm hover:border-red-500/40 transition-all duration-300">
                      <CardHeader className="text-center pb-4">
                        <CardTitle className="text-2xl font-black text-white font-orbitron mb-2">Enterprise</CardTitle>
                        <CardDescription className="text-gray-400 text-sm mb-4">
                          Critical support, compliance, and control for large-scale enterprises.
                        </CardDescription>

                      </CardHeader>
                      <div className="px-6 pb-6">
                        <Button
                          variant="outline"
                          className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 font-orbitron"
                          asChild
                        >
                          <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                            Contact Sales
                          </a>
                        </Button>
                        <div className="mt-6 space-y-3 text-sm text-gray-300">
                          <div className="text-white font-semibold mb-2">Everything in Premium, plus</div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Dedicated 24/7 Support</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Custom Solutions Engineering</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Onsite Training and Onboarding</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Priority Support</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Custom Agent Development</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>No Rate Limits</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-red-400 mr-2">✓</span>
                            <span>Access to Experimental Features</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </div>

                {/* Footer Note */}
                <motion.div
                  className="text-center mt-12"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-400 text-sm md:text-base">
                    All plans include 24/7 support and 99.9% uptime guarantee
                  </p>
                </motion.div>
              </TabsContent>

            <TabsContent value="on-premise" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 max-w-5xl mx-auto"
                variants={staggeredContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
              >
                {onPremiseTiers.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    variants={mobileOptimizedVariants}
                    className="relative pt-8 md:pt-10"
                  >
                    {/* On-Premise tier highlight */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-1.5 rounded-full text-xs font-bold font-orbitron shadow-lg shadow-amber-600/50 whitespace-nowrap">
                        Self-Hosted
                      </div>
                    </div>
                    
                    <div className={`relative overflow-hidden rounded-3xl border-2 transition-all duration-300 ${shouldReduceMotion ? '' : 'hover:scale-[1.02]'} bg-gradient-to-br from-amber-900/20 to-amber-800/10 border-amber-500/50 shadow-2xl shadow-amber-500/20 backdrop-blur-sm h-full`}>
                      <div className="relative p-8 md:p-10">
                        {/* Tier name */}
                        <div className="text-center mb-8">
                          <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-orbitron">
                            {tier.tier}
                          </h3>
                          {tier.price && (
                            <div className="text-2xl md:text-3xl font-bold mb-3 font-orbitron text-amber-400">
                              {tier.price}
                            </div>
                          )}
                          <p className="text-sm md:text-base leading-relaxed text-amber-300">
                            {tier.description}
                          </p>
                        </div>

                        {/* Features list */}
                        <div className="space-y-6 mb-10">
                          <div className="flex justify-between items-center py-3 border-b border-red-900/30">
                            <span className="text-sm md:text-base text-red-200 font-medium">Requests per minute</span>
                            <span className="text-sm md:text-base font-bold font-orbitron text-amber-400">
                              {tier.requests}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3 border-b border-red-900/30">
                            <span className="text-sm md:text-base text-red-200 font-medium">Tokens per agent</span>
                            <span className="text-sm md:text-base font-bold font-orbitron text-amber-400">
                              {tier.tokens}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-3">
                            <span className="text-sm md:text-base text-red-200 font-medium">Agents per request</span>
                            <span className="text-sm md:text-base font-bold font-orbitron text-amber-400">
                              {tier.batch}
                            </span>
                          </div>
                          
                          {/* Tier-specific benefits */}
                          {tier.benefits && (
                            <div className="border-t pt-6 mt-6 border-amber-500/30">
                              <div className="font-semibold text-base mb-4 text-amber-400">
                                Included with license:
                              </div>
                              <div className="space-y-3">
                                {tier.benefits.map((benefit, benefitIndex) => (
                                  <div key={benefitIndex} className="flex items-start text-sm md:text-base leading-relaxed text-amber-200">
                                    <div className="w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 bg-amber-400"></div>
                                    <span>{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* CTA Button */}
                        <div className="text-center mt-8">
                          <Button
                            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-5 text-base md:text-lg font-semibold shadow-lg shadow-amber-500/30 transition-all duration-300"
                            asChild
                          >
                            <Link href="https://buy.stripe.com/eVq4gz7Nph072rZ1J6aAw09" target="_blank">
                              Purchase license
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
            </motion.div>
          </div>
        </div>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-black to-red-950/10">
        <div className="container px-4 sm:px-6">
          <motion.div
            className="text-center mb-8 sm:mb-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 font-orbitron">
              Frequently asked <span className="text-red-500">questions</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 max-w-3xl mx-auto">
              Everything you need to know about pricing, billing, and features
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
                className="mb-4"
              >
                <Card className="bg-black/50 border-red-900/30 hover:border-red-500/30 transition-all duration-300 overflow-hidden">
                  <CardHeader
                    className="cursor-pointer p-6 transition-all duration-300 hover:bg-red-950/10"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white text-left leading-tight">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-2"
                      >
                        <ChevronDown className="w-6 h-6 text-red-400" />
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
                    <div className="px-6 pb-6">
                      <div className="ml-14">
                        <p className="text-base text-red-200 leading-relaxed">
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
            className="text-center mt-12"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-500/30 text-red-400 text-lg font-medium mb-6">
              <HelpCircle className="w-5 h-5 mr-2" />
              Have more questions?
            </div>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
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
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-8 py-4 text-lg font-semibold rounded-lg"
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
      <section className="py-12 sm:py-16 bg-gradient-to-b from-red-950/10 to-black">
        <div className="container px-4 sm:px-6 text-center">
          <motion.div
            className="max-w-4xl mx-auto"
            variants={mobileOptimizedVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6 font-orbitron">
              Start building <span className="text-red-500">today</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-red-200 mb-8 max-w-2xl mx-auto">
              Get started with transparent pricing and pay only for what you use
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-lg"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank">
                  <Key className="w-5 h-5 mr-2" />
                  Get API key
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 px-8 py-4 text-lg font-semibold rounded-lg"
                asChild
              >
                <Link href="/api">
                  <Code className="w-5 h-5 mr-2" />
                  View API docs
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
