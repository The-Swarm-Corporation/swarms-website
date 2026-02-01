"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { 
  ArrowRight, Zap, Globe,
  BookOpen, Code,
  Calendar, Key, Database,
  Activity, BarChart3, DollarSign, Moon,
  HelpCircle, ChevronDown, CreditCard, Users, Check
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import Link from "next/link"

export default function PricingPage() {
  const shouldReduceMotion = useReducedMotion()
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  })

  const heroOpacity = shouldReduceMotion ? 1 : useTransform(smoothProgress, [0, 0.5], [1, 0])
  const heroY = shouldReduceMotion ? 0 : useTransform(smoothProgress, [0, 0.5], [0, -50])
  const glowOpacity = shouldReduceMotion ? 0.1 : useTransform(smoothProgress, [0, 0.5], [0.1, 0])

  const pricingItems = [
    {
      item: "Input Tokens",
      cost: "$6.50 per 1M tokens",
      notes: "Unified pricing across all endpoints",
      icon: Database
    },
    {
      item: "Output Tokens",
      cost: "$18.50 per 1M tokens",
      notes: "Unified pricing across all endpoints",
      icon: Activity
    },
    {
      item: "Agent Cost",
      cost: "$0.01 per agent",
      notes: "For swarms and workflows",
      icon: Users
    },
    {
      item: "Image Processing",
      cost: "$0.25 per image",
      notes: "Charged when image provided",
      icon: BarChart3
    },
    {
      item: "MCP Call",
      cost: "$0.10 per call",
      notes: "Charged when MCP URL provided",
      icon: Globe
    },
    {
      item: "Exa Search Tool",
      cost: "$0.04 per search",
      notes: "Charged per search execution",
      icon: Activity
    },
    {
      item: "Web Scraper Tool",
      cost: "$0.15 per scrape",
      notes: "Charged per scrape execution",
      icon: Globe
    }
  ]

  const cloudTiers = [
    {
      tier: "Free",
      price: "$0",
      period: "/month",
      annualPrice: "$0/year",
      discount: "N/A",
      description: "Get started with AI. No monthly fees — pay only for usage.",
      features: [
        "Sign-up bonus credits",
        "Basic API access",
        "Pay-per-use pricing",
        "Community support",
        "Standard processing speed",
        "Access to the Marketplace",
        "Premium endpoints not available"
      ]
    },
    {
      tier: "Pro",
      price: "$19.99",
      period: "/month",
      annualPrice: "$203.90/year",
      discount: "15%",
      description: "Most popular. Perfect for professionals who need more power and features.",
      popular: true,
      features: [
        "Everything in Free, plus",
        "Global availability",
        "Exclusive multi-agent architectures",
        "Accelerated hardware",
        "API telemetry platform",
        "Priority support",
        "Access to Pro models",
        "Access to Premium Endpoints: batch processing, reasoning agents, and advanced workflows"
      ]
    },
    {
      tier: "Ultra",
      price: "$100",
      period: "/month",
      annualPrice: "$1,020/year",
      discount: "15%",
      description: "Best for growing teams and production workloads that need higher limits and security.",
      features: [
        "Everything in Pro, plus",
        "Premium models",
        "More agents per request",
        "More completions",
        "Increased rate limits",
        "SOC 2 compliance",
        "Enhanced security features",
        "Fetch agents directly from the Marketplace",
        "View previous agent configurations",
        "Priority region/zone routing",
        "Full access to Premium Endpoints"
      ]
    },
    {
      tier: "Enterprise",
      description: "Critical support, compliance, and control for large-scale enterprises.",
      features: [
        "Contact sales for custom pricing",
        "Dedicated 24/7 support",
        "Custom solutions engineering",
        "Onsite training and onboarding",
        "Custom agent development",
        "No rate limits",
        "Access to experimental features"
      ]
    }
  ]

  const onPremiseTiers = [
    {
      tier: "On-Premise",
      price: "$9,999",
      period: "/year",
      requests: "Unlimited",
      tokens: "Unlimited",
      batch: "Unlimited",
      description: "Run on your own infrastructure",
      features: [
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
      answer: "Credits are deducted automatically after each request completes. All API endpoints use unified pricing: $6.50 per 1M input tokens and $18.50 per 1M output tokens. Additional costs apply for agent costs ($0.01 per agent for swarms/workflows), image processing ($0.25 per image), MCP calls ($0.10 per call), Exa Search ($0.04 per search), and Web Scraper ($0.15 per scrape). Free credits are used first, followed by regular credits."
    },
    {
      question: "What is unified pricing?",
      answer: "All API endpoints (Swarm Completions, Agent Completions, Advanced Research, Auto Swarm Builder, Graph Workflow, Batched Grid Workflow) use the same token pricing: $6.50 per 1M input tokens and $18.50 per 1M output tokens. This simplifies cost calculation across all endpoints."
    },
    {
      question: "How does the night-time discount work?",
      answer: "Swarm Completions receive a 50% discount on token costs during 8 PM - 6 AM Pacific Time. Agent costs remain the same. The discount is automatically applied to eligible API calls during these hours."
    },
    {
      question: "What are Premium Endpoints?",
      answer: "Premium Endpoints are advanced features available on Pro and Ultra plans, including batch processing (/v1/agent/batch/completions, /v1/swarm/batch/completions), reasoning agents (/v1/reasoning-agent/completions), batched grid workflows, graph workflows, auto-swarm-builder, and advanced research. These are not available on the Free tier."
    },
    {
      question: "What's the difference between Pro and Ultra plans?",
      answer: "Pro ($19.99/month) includes global availability, multi-agent architectures, accelerated hardware, API telemetry, priority support, Pro models, and Premium Endpoints access. Ultra ($100/month) includes everything in Pro plus premium models, higher limits, SOC 2 compliance, enhanced security, priority region/zone routing, and full Premium Endpoints access."
    },
    {
      question: "Can I switch between pricing tiers?",
      answer: "Yes! You can upgrade your plan at any time through the Account Dashboard. Go to the Billing tab, scroll to the Plans section, and select your desired plan. You'll be redirected to Stripe to complete payment. Your API keys remain the same, and the upgrade takes effect immediately."
    },
    {
      question: "What happens when I run out of credits?",
      answer: "When your credits are exhausted, API calls will fail with appropriate error codes. You can purchase additional credits or upgrade your plan for higher limits. We recommend setting up billing alerts to monitor your usage."
    },
    {
      question: "How is image processing charged?",
      answer: "Image processing costs $0.25 per image and is charged when an image is provided to an agent. This applies across all tiers and endpoints."
    },
    {
      question: "What is Frenzy Mode?",
      answer: "Frenzy Mode is a special promotion where all API requests are free during Black Friday (4th Friday of November) for 24 hours. The discount is automatically applied - no action needed."
    },
    {
      question: "How does the on-premise license work?",
      answer: "The on-premise license ($9,999/year) includes complete Docker deployment, full source code access, unlimited usage, and 1-year enterprise license with priority support. Perfect for organizations requiring data sovereignty and custom deployments."
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      
      {/* Hero Section - Apple-inspired */}
      <motion.section
        ref={heroRef}
        className="relative overflow-hidden bg-black min-h-[80vh] sm:min-h-screen flex items-center"
        style={{ opacity: heroOpacity, y: heroY }}
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: 'url(/product_agency.jpg)' }}
        />
        
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Atmospheric background */}
        <motion.div
          aria-hidden="true"
          style={{ opacity: glowOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -top-40 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-48 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_rgba(0,0,0,0)_55%)]" />
        </motion.div>

        {/* Subtle hairlines */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>

        <div className="container relative px-2 sm:px-4 md:px-6 lg:px-8 z-10 w-full max-w-full overflow-hidden">
          <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-8 md:space-y-12 py-12 sm:py-16 md:py-24 text-center max-w-6xl mx-auto">
            <motion.div
              className="space-y-4 sm:space-y-6 md:space-y-8 w-full px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[10rem] 2xl:text-[12rem] font-bold text-white leading-none tracking-tight break-words">
                Pricing
              </h1>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/60 max-w-4xl mx-auto font-normal leading-relaxed px-2">
                Transparent usage-based pricing and service tiers for The Swarms API.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 w-full max-w-2xl mx-auto relative z-10 justify-center items-center px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank" className="flex items-center justify-center">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>Get started free</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 flex-shrink-0" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
                asChild
              >
                <Link href="https://docs.swarms.ai/resources/pricing" className="flex items-center justify-center">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 mr-2 flex-shrink-0" />
                  <span>View API docs</span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Usage-Based Pricing Table */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-black">
        <div className="container px-2 sm:px-4 md:px-6 lg:px-8 max-w-full overflow-hidden">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6 break-words">
              Usage-based pricing
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed">
              Pay only for what you use with transparent, per-operation pricing. All API endpoints use a unified pricing structure for token costs.
            </p>
          </motion.div>

          {/* Pricing Table */}
          <motion.div
            className="w-full max-w-full min-w-0 overflow-x-auto -mx-2 sm:-mx-4 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-full min-w-0 sm:min-w-[800px] px-2 sm:px-4 md:px-0">
              <Card className="bg-white/[0.02] border-white/10 overflow-hidden w-full max-w-full">
                <CardHeader className="p-0 max-w-full overflow-hidden">
                  {/* Table Header - Hidden on mobile, shown on desktop */}
                  <div className="hidden sm:grid sm:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 border-b border-white/10">
                    <div className="font-semibold text-white text-xs sm:text-sm md:text-base">Item</div>
                    <div className="font-semibold text-white text-xs sm:text-sm md:text-base text-center">Price</div>
                    <div className="font-semibold text-white/60 text-xs sm:text-sm md:text-base text-center">Notes</div>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="sm:hidden space-y-3 p-3 sm:p-4 min-w-0 overflow-hidden">
                    {pricingItems.map((item, index) => (
                      <motion.div
                        key={item.item}
                        className="p-3 sm:p-4 rounded-lg border border-white/10 bg-white/[0.01] min-w-0 overflow-hidden"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-start gap-3 mb-3 min-w-0">
                          <div className="w-6 h-6 rounded border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <item.icon className="w-3 h-3 text-white/80" />
                          </div>
                          <span className="text-white text-sm font-medium flex-1 min-w-0 break-words">{item.item}</span>
                        </div>
                        <div className="text-xs mb-2 min-w-0 overflow-hidden">
                          <div className="text-white/60 mb-1">Price</div>
                          <div className="text-white/80 font-mono break-all">{item.cost}</div>
                        </div>
                        <div className="text-white/50 text-xs mt-2 pt-2 border-t border-white/10 break-words">{item.notes}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop Table Rows */}
                  {pricingItems.map((item, index) => (
                    <motion.div
                      key={`desktop-${item.item}`}
                      className="hidden sm:grid sm:grid-cols-3 gap-3 md:gap-4 p-4 md:p-6 border-b border-white/10 transition-colors hover:bg-white/[0.02]"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex items-center space-x-2 md:space-x-3 min-w-0">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-3 h-3 md:w-4 md:h-4 text-white/80" />
                        </div>
                        <span className="text-white text-xs sm:text-sm md:text-base font-medium truncate">{item.item}</span>
                      </div>
                      <div className="text-white/80 text-xs sm:text-sm md:text-base text-center font-mono break-words">{item.cost}</div>
                      <div className="text-white/50 text-xs sm:text-sm text-center break-words">{item.notes}</div>
                    </motion.div>
                  ))}
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* Special Offers & Unified Pricing */}
          <motion.div
            className="mt-8 sm:mt-12 md:mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-6 sm:mb-8 md:mb-10 px-2">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight mb-3 sm:mb-4 break-words">
                Discounts & pricing details
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-white/60 max-w-2xl mx-auto font-normal leading-relaxed break-words">
                Time-based discounts and unified token pricing across all API endpoints.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                      <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-white text-lg sm:text-xl font-bold break-words">Night-time Discount</CardTitle>
                      <CardDescription className="text-white/60 text-xs sm:text-sm">50% off tokens</CardDescription>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed break-words flex-1">
                    Swarm Completions receive a 50% discount on token costs during 8 PM - 6 AM Pacific Time.
                    Agent costs remain the same. Automatically applied.
                  </p>
                </CardHeader>
              </Card>

              <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-white text-lg sm:text-xl font-bold break-words">Frenzy Mode</CardTitle>
                      <CardDescription className="text-white/60 text-xs sm:text-sm">All requests free</CardDescription>
                    </div>
                  </div>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed break-words flex-1">
                    All API requests are free during Black Friday (4th Friday of November) for 24 hours.
                    Automatically applied.
                  </p>
                </CardHeader>
              </Card>

              <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col">
                <CardHeader className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col">
                  <CardTitle className="text-white text-lg sm:text-xl font-bold mb-3 sm:mb-4 break-words">Unified Pricing</CardTitle>
                  <CardDescription className="text-white/60 text-xs sm:text-sm leading-relaxed break-words mb-3 sm:mb-4">
                    All API endpoints use the same token pricing:
                  </CardDescription>
                  <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/80 flex-1">
                    <div className="flex items-start">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="break-words"><strong>Input Tokens:</strong> $6.50 per 1M tokens</span>
                    </div>
                    <div className="flex items-start">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="break-words"><strong>Output Tokens:</strong> $18.50 per 1M tokens</span>
                    </div>
                  </div>
                  <CardDescription className="text-white/50 text-xs sm:text-sm leading-relaxed break-words mt-2">
                    Retrieve current pricing via <code className="bg-white/10 px-1 py-0.5 rounded text-xs">/v1/usage/costs</code>.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Credit Deductions */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-black">
        <div className="container px-2 sm:px-4 md:px-6 lg:px-8 max-w-full overflow-hidden">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6 break-words">
              Credit deductions
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed">
              How credits are deducted and billing logic works
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full">
              <CardHeader className="p-4 sm:p-5 md:p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                  <CreditCard className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80" />
                </div>
                <CardTitle className="text-white text-lg sm:text-xl mb-2 sm:mb-3 break-words">Credit Priority</CardTitle>
                <CardDescription className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                  Free credits are used first, then regular credits. This ensures you get maximum value from promotional credits and free tier allowances.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full">
              <CardHeader className="p-4 sm:p-5 md:p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                  <DollarSign className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80" />
                </div>
                <CardTitle className="text-white text-lg sm:text-xl mb-2 sm:mb-3 break-words">Per-Call Billing</CardTitle>
                <CardDescription className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                  Credits are deducted for each API call based on operation type, token usage, agent count, and any additional services like MCP or image processing.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 h-full sm:col-span-2 md:col-span-1">
              <CardHeader className="p-4 sm:p-5 md:p-6 text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center">
                  <Globe className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80" />
                </div>
                <CardTitle className="text-white text-lg sm:text-xl mb-2 sm:mb-3 break-words">MCP Additional Costs</CardTitle>
                <CardDescription className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                  If your agent uses an MCP URL for external integrations, an additional $0.10 is deducted per call on top of standard operation costs.
                </CardDescription>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* API Pricing Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-black">
        <div className="container px-2 sm:px-4 md:px-6 lg:px-8 max-w-full overflow-hidden">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6 break-words">
              API Pricing
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed">
              Flexible subscription plans that scale with your needs. Choose a plan for higher limits and features; usage is billed per operation. Prices shown are subscription fees; API usage is billed per operation.
            </p>
          </motion.div>

          <Tabs defaultValue="cloud" className="w-full">
            <div className="flex justify-center mb-8 sm:mb-12 md:mb-16 px-2">
              <TabsList className="bg-white/[0.02] border border-white/10 backdrop-blur-sm w-full sm:w-auto">
                <TabsTrigger 
                  value="cloud" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/60 data-[state=active]:text-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex-1 sm:flex-initial"
                >
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>Cloud</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="on-premise" 
                  className="data-[state=active]:bg-white data-[state=active]:text-black text-white/60 data-[state=active]:text-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm flex-1 sm:flex-initial"
                >
                  <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  <span>On-Premise</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="cloud" className="mt-0">
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {cloudTiers.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 z-20">
                        <span className="bg-white text-black text-[10px] sm:text-xs font-semibold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <Card className={`h-full border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300 ${tier.popular ? 'sm:scale-105' : ''}`}>
                      <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">{tier.tier}</CardTitle>
                        <CardDescription className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 break-words">
                          {tier.description}
                        </CardDescription>
                        {tier.price && (
                          <div className="mt-3 sm:mt-4">
                            <div className="flex flex-col items-center">
                              <div>
                                <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                                <span className="text-white/60 text-sm sm:text-lg ml-2">{tier.period}</span>
                              </div>
                              {tier.annualPrice && tier.discount && tier.discount !== "N/A" && (
                                <div className="mt-2">
                                  <span className="text-white/60 text-xs sm:text-sm">{tier.annualPrice}</span>
                                  <span className="text-white/40 text-xs sm:text-sm ml-1">({tier.discount} off)</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </CardHeader>
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <Button
                          className={`w-full ${tier.tier === 'Enterprise' ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20' : 'bg-white text-black hover:bg-white/90'} font-semibold text-xs sm:text-sm py-5 sm:py-6`}
                          asChild
                        >
                          {tier.tier === 'Enterprise' ? (
                            <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                              Contact Sales
                            </a>
                          ) : (
                            <a href="https://swarms.world/platform/account" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                              Get Started
                            </a>
                          )}
                        </Button>
                        <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3 text-xs sm:text-sm text-white/60">
                          {tier.features?.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-start">
                              <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                              <span className={`break-words ${feature.includes('Everything in') ? 'text-white font-semibold' : ''}`}>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="on-premise" className="mt-0">
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 max-w-5xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {onPremiseTiers.map((tier, index) => (
                  <motion.div
                    key={tier.tier}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <Card className="h-full border border-white/10 bg-white/[0.02] backdrop-blur-sm hover:border-white/20 transition-all duration-300">
                      <CardHeader className="text-center pb-3 sm:pb-4 p-4 sm:p-6">
                        <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-2 break-words">{tier.tier}</CardTitle>
                        <CardDescription className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 break-words">
                          {tier.description}
                        </CardDescription>
                        {tier.price && (
                          <div className="mt-3 sm:mt-4">
                            <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                            <span className="text-white/60 text-sm sm:text-lg ml-2">{tier.period}</span>
                          </div>
                        )}
                      </CardHeader>
                      <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                        <Button
                          className="w-full bg-white text-black hover:bg-white/90 font-semibold text-xs sm:text-sm py-5 sm:py-6"
                          asChild
                        >
                          <Link href="https://buy.stripe.com/eVq4gz7Nph072rZ1J6aAw09" target="_blank" className="flex items-center justify-center">
                            Purchase license
                          </Link>
                        </Button>
                        <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
                          <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                            <span className="text-xs sm:text-sm text-white/60 font-medium break-words">Requests per minute</span>
                            <span className="text-xs sm:text-sm font-semibold text-white ml-2 flex-shrink-0">
                              {tier.requests}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 sm:py-3 border-b border-white/10">
                            <span className="text-xs sm:text-sm text-white/60 font-medium break-words">Tokens per agent</span>
                            <span className="text-xs sm:text-sm font-semibold text-white ml-2 flex-shrink-0">
                              {tier.tokens}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 sm:py-3">
                            <span className="text-xs sm:text-sm text-white/60 font-medium break-words">Agents per request</span>
                            <span className="text-xs sm:text-sm font-semibold text-white ml-2 flex-shrink-0">
                              {tier.batch}
                            </span>
                          </div>
                          
                          {tier.features && (
                            <div className="border-t pt-4 sm:pt-6 mt-4 sm:mt-6 border-white/10">
                              <div className="font-semibold text-sm sm:text-base mb-3 sm:mb-4 text-white">
                                Included with license:
                              </div>
                              <div className="space-y-2 sm:space-y-3">
                                {tier.features.map((benefit, benefitIndex) => (
                                  <div key={benefitIndex} className="flex items-start text-xs sm:text-sm leading-relaxed text-white/60">
                                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white/80 mr-2 mt-0.5 flex-shrink-0" />
                                    <span className="break-words">{benefit}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-black">
        <div className="container px-2 sm:px-4 md:px-6 lg:px-8 max-w-full overflow-hidden">
          <motion.div
            className="text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-6 break-words">
              Frequently asked questions
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed">
              Everything you need to know about pricing, billing, and features
            </p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            {faqData.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                className="mb-3 sm:mb-4"
              >
                <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
                  <CardHeader
                    className="cursor-pointer p-4 sm:p-5 md:p-6 transition-all duration-300 hover:bg-white/[0.02]"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  >
                    <div className="flex items-center justify-between gap-2 sm:gap-4">
                      <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-1 min-w-0">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white/80" />
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-white text-left leading-tight break-words flex-1">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex-shrink-0 ml-1 sm:ml-2"
                      >
                        <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/60" />
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
                    <div className="px-4 sm:px-5 md:px-6 pb-4 sm:pb-5 md:pb-6">
                      <div className="ml-0 sm:ml-10 md:ml-14">
                        <p className="text-xs sm:text-sm md:text-base text-white/60 leading-relaxed break-words">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 xl:py-40 bg-black">
        <div className="container px-2 sm:px-4 md:px-6 lg:px-8 text-center max-w-full overflow-hidden">
          <motion.div
            className="max-w-5xl mx-auto space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight break-words">
              Start building <span className="text-white/60">today</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed font-normal">
              Get started with transparent pricing and pay only for what you use
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center pt-2 sm:pt-4">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-semibold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6"
                asChild
              >
                <Link href="https://swarms.world/platform/api-keys" target="_blank" className="flex items-center justify-center">
                  <Key className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                  <span>Get API key</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ml-2 flex-shrink-0" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 bg-transparent backdrop-blur-sm"
                asChild
              >
                <Link href="/api" className="flex items-center justify-center">
                  <Code className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2 flex-shrink-0" />
                  <span>View API docs</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}