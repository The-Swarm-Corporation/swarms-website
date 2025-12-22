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
      item: "Agent cost",
      standardCost: "$0.01 per agent",
      flexCost: "$0.01 per agent",
      notes: "Charged for each agent (swarm, workflow, etc.)",
      icon: Users
    },
    {
      item: "Swarm completions input tokens",
      standardCost: "$3.00 per 1M tokens",
      flexCost: "$1.50 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Database,
      highlight: "flex"
    },
    {
      item: "Swarm completions output tokens",
      standardCost: "$15.00 per 1M tokens",
      flexCost: "$7.50 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Activity,
      highlight: "flex"
    },
    {
      item: "Agent/Workflow completions input tokens",
      standardCost: "$4.00 per 1M tokens",
      flexCost: "$2.00 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Database,
      highlight: "flex"
    },
    {
      item: "Agent/Workflow completions output tokens",
      standardCost: "$12.50 per 1M tokens",
      flexCost: "$6.25 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Activity,
      highlight: "flex"
    },
    {
      item: "Advanced research input tokens",
      standardCost: "$20.00 per 1M tokens",
      flexCost: "$10.00 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Database,
      highlight: "flex"
    },
    {
      item: "Advanced research output tokens",
      standardCost: "$60.00 per 1M tokens",
      flexCost: "$30.00 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Activity,
      highlight: "flex"
    },
    {
      item: "Auto swarm builder input tokens",
      standardCost: "$6.00 per 1M tokens",
      flexCost: "$3.00 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Database,
      highlight: "flex"
    },
    {
      item: "Auto swarm builder output tokens",
      standardCost: "$18.00 per 1M tokens",
      flexCost: "$9.00 per 1M tokens",
      notes: "50% discount in Flex mode",
      icon: Activity,
      highlight: "flex"
    },
    {
      item: "Image processing",
      standardCost: "$0.25 per image",
      flexCost: "$0.25 per image",
      notes: "Charged for each image processed",
      icon: BarChart3
    },
    {
      item: "MCP cost",
      standardCost: "$0.10 per call",
      flexCost: "$0.10 per call",
      notes: "Charged if an agent uses an MCP URL",
      icon: Globe
    }
  ]

  const cloudTiers = [
    {
      tier: "Free",
      price: "$0",
      period: "/month",
      requests: "100 req/min",
      tokens: "200K tokens/agent",
      batch: "100 agents/request",
      description: "Pay as you go • Perfect for getting started",
      features: [
        "$5 in free credits when you sign up",
        "Basic Access",
        "Pay-Per-Use Pricing",
        "Community Support",
        "Standard Processing Speed",
        "Access to the Marketplace"
      ]
    },
    {
      tier: "Pro",
      price: "$19.99",
      period: "/month",
      requests: "500 req/min",
      tokens: "500K tokens/agent",
      batch: "200 agents/request",
      description: "Perfect for professionals who need more power and features",
      popular: true,
      features: [
        "Everything in Free, plus",
        "Global Availability",
        "Exclusive Multi-Agent Architectures",
        "Accelerated Hardware",
        "API Telemetry Platform",
        "Priority Support",
        "Pro Models"
      ]
    },
    {
      tier: "Premium",
      price: "$100",
      period: "/user/month",
      requests: "2,000 req/min",
      tokens: "2M tokens/agent",
      batch: "500 agents/batch",
      description: "Best for growing businesses",
      features: [
        "Everything in Pro, plus",
        "Premium Models",
        "More Agents Per Request",
        "More Completions",
        "Increased Rate Limits",
        "SOC 2 Compliance",
        "Priority Support",
        "Enhanced Security Features",
        "Fetch Agents from the Marketplace",
        "View Previous Agent Configurations"
      ]
    },
    {
      tier: "Enterprise",
      requests: "Custom limits",
      tokens: "Unlimited",
      batch: "Unlimited",
      description: "Unlimited scalability",
      features: [
        "Everything in Premium, plus",
        "Dedicated 24/7 Support",
        "Custom Solutions Engineering",
        "Onsite Training and Onboarding",
        "Priority Support",
        "Custom Agent Development",
        "No Rate Limits",
        "Access to Experimental Features"
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
      answer: "Credits are deducted from your account for each API call based on our transparent pricing structure. Free credits are used first, then regular credits. You're charged for base agent costs, input/output tokens, MCP calls, and image processing according to the rates in our pricing table."
    },
    {
      question: "What's the difference between Standard and Flex pricing?",
      answer: "Flex tier offers a 50% discount on token costs but may have higher latency or require retries. Standard tier provides consistent performance with standard pricing. Flex is perfect for non-time-sensitive workloads where cost savings are prioritized over speed."
    },
    {
      question: "How does the night-time discount work?",
      answer: "You get a 50% discount on token costs between 8pm and 6am California time. This applies to both Standard and Flex pricing tiers and is automatically applied to eligible API calls during these hours."
    },
    {
      question: "What are MCP costs and when are they charged?",
      answer: "MCP (Model Context Protocol) costs are $0.10 per call and are charged when an agent uses an MCP URL for external integrations like Notion, Supabase, or GitHub. This enables seamless integration with any platform supporting the MCP protocol."
    },
    {
      question: "How are swarm vs single agent costs different?",
      answer: "Swarm completions use token pricing ($3.00/$15.00 per 1M input/output tokens in Standard, $1.50/$7.50 in Flex) plus $0.01 per agent. Agent completions (single agent) use $4.00/$12.50 per 1M input/output tokens ($2.00/$6.25 in Flex) and don't include the per-agent base cost. Advanced research uses $20.00/$60.00 per 1M tokens ($10.00/$30.00 in Flex), and auto swarm builder uses $6.00/$18.00 per 1M tokens ($3.00/$9.00 in Flex)."
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
              Pay only for what you use with transparent, per-operation pricing
            </p>
          </motion.div>

          {/* Pricing Table */}
          <motion.div
            className="overflow-x-auto -mx-2 sm:-mx-4 md:mx-0"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="min-w-[800px] sm:min-w-full px-2 sm:px-4 md:px-0">
              <Card className="bg-white/[0.02] border-white/10 overflow-hidden">
                <CardHeader className="p-0">
                  {/* Table Header - Hidden on mobile, shown on desktop */}
                  <div className="hidden sm:grid sm:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 border-b border-white/10">
                    <div className="font-semibold text-white text-xs sm:text-sm md:text-base">Operation</div>
                    <div className="font-semibold text-white text-xs sm:text-sm md:text-base text-center">Standard Cost</div>
                    <div className="font-semibold text-white/80 text-xs sm:text-sm md:text-base text-center">Flex Cost</div>
                    <div className="font-semibold text-white/60 text-xs sm:text-sm md:text-base text-center">Notes</div>
                  </div>

                  {/* Mobile Card Layout */}
                  <div className="sm:hidden space-y-3 p-4">
                    {pricingItems.map((item, index) => (
                      <motion.div
                        key={item.item}
                        className={`p-4 rounded-lg border border-white/10 bg-white/[0.01] ${
                          item.highlight === 'flex' ? 'bg-white/[0.02]' : ''
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-6 h-6 rounded border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0 mt-0.5">
                            <item.icon className="w-3 h-3 text-white/80" />
                          </div>
                          <span className="text-white text-sm font-medium flex-1">{item.item}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <div className="text-white/60 mb-1">Standard</div>
                            <div className="text-white/80 font-mono">{item.standardCost}</div>
                          </div>
                          <div>
                            <div className="text-white/60 mb-1">Flex</div>
                            <div className="text-white/60 font-mono">{item.flexCost}</div>
                          </div>
                        </div>
                        <div className="text-white/50 text-xs mt-2 pt-2 border-t border-white/10">{item.notes}</div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Desktop Table Rows */}
                  {pricingItems.map((item, index) => (
                    <motion.div
                      key={`desktop-${item.item}`}
                      className={`hidden sm:grid sm:grid-cols-4 gap-3 md:gap-4 p-4 md:p-6 border-b border-white/10 transition-colors hover:bg-white/[0.02] ${
                        item.highlight === 'flex' ? 'bg-white/[0.01]' : ''
                      }`}
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
                      <div className="text-white/80 text-xs sm:text-sm md:text-base text-center font-mono break-words">{item.standardCost}</div>
                      <div className="text-white/60 text-xs sm:text-sm md:text-base text-center font-mono break-words">
                        {item.flexCost}
                      </div>
                      <div className="text-white/50 text-xs sm:text-sm text-center break-words">{item.notes}</div>
                    </motion.div>
                  ))}
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* Special Offers */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-8 sm:mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-lg sm:text-xl font-bold break-words">Flex Tier</CardTitle>
                    <CardDescription className="text-white/60 text-xs sm:text-sm">50% discount on token costs</CardDescription>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                  Perfect for non-time-sensitive workloads where cost savings are prioritized over speed. 
                  May have higher latency or require retries, but offers significant savings on token usage.
                </p>
              </CardHeader>
            </Card>

            <Card className="bg-white/[0.02] border-white/10 hover:border-white/20 transition-all duration-300">
              <CardHeader className="p-4 sm:p-5 md:p-6">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center flex-shrink-0">
                    <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-white text-lg sm:text-xl font-bold break-words">Night-time Discount</CardTitle>
                    <CardDescription className="text-white/60 text-xs sm:text-sm">50% off token costs</CardDescription>
                  </div>
                </div>
                <p className="text-white/60 text-xs sm:text-sm leading-relaxed break-words">
                  Automatic 50% discount on token costs between 8pm–6am California time. 
                  Applies to both Standard and Flex pricing tiers for maximum savings during off-peak hours.
                </p>
              </CardHeader>
            </Card>
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
              Flexible subscription plans that scale with your needs. From free to enterprise.
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
                            <span className="text-3xl sm:text-4xl font-bold text-white">{tier.price}</span>
                            <span className="text-white/60 text-sm sm:text-lg ml-2">{tier.period}</span>
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
