"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ExternalLink,
  CheckCircle,
  Key,
  Code,
  ChevronDown,
  Database,
  Activity,
  Users,
  Image as ImageIcon,
  Globe,
  Wrench,
  Search,
  Moon,
  Zap,
  CreditCard,
  DollarSign,
  Server,
  Shield,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

type PricingTier = {
  name: string
  price: string
  cadence: string
  description: string
  features: string[]
  cta: { label: string; href: string }
  highlight?: boolean
}

const tiers: PricingTier[] = [
  {
    name: "Free",
    price: "$0",
    cadence: "Pay only for what you use",
    description: "Get started with AI. No monthly fees — pay-per-use credits.",
    features: [
      "Sign-up bonus credits",
      "Pay-per-use API access",
      "100 requests / minute",
      "1,200 requests / day",
      "200K tokens per agent",
      "Marketplace access",
      "Community support",
    ],
    cta: { label: "Get API key", href: "https://swarms.world/platform/api-keys" },
  },
  {
    name: "Pro",
    price: "$19.99",
    cadence: "per month",
    description: "For professionals who need more power and features.",
    features: [
      "Everything in Free",
      "Global availability zones",
      "Exclusive multi-agent architectures",
      "Accelerated hardware",
      "API telemetry platform",
      "Priority queue access",
      "Pro models",
      "Premium endpoints: batch, reasoning, advanced workflows",
    ],
    cta: { label: "Upgrade to Pro", href: "https://swarms.world/platform/account?tab=subscription" },
  },
  {
    name: "Premium",
    price: "$100",
    cadence: "per month · or $1,020/yr (save 15%)",
    description: "Production workloads with priority access.",
    highlight: true,
    features: [
      "Everything in Pro",
      "2,000 requests / minute",
      "100,000 requests / day",
      "2M tokens per agent",
      "500 agents per batch",
      "Premium models access",
      "SOC 2 compliance",
      "Priority region/zone routing",
      "24/7 email & Discord support",
    ],
    cta: { label: "Upgrade to Premium", href: "https://swarms.world/platform/account?tab=subscription" },
  },
  {
    name: "Enterprise",
    price: "Custom",
    cadence: "Tailored to your scale",
    description: "Dedicated infrastructure, on-premise, and SLAs.",
    features: [
      "Custom rate limits — no caps",
      "Dedicated infrastructure",
      "On-premise & VPC deployment",
      "Custom SLAs & uptime guarantees",
      "Dedicated solutions engineer",
      "Onsite training & onboarding",
      "Custom agent development",
      "White-label options",
    ],
    cta: { label: "Talk to sales", href: "https://cal.com/swarms" },
  },
]

const usageItems = [
  {
    icon: Database,
    item: "Input tokens",
    cost: "$6.50",
    unit: "per 1M tokens",
    note: "Unified across all endpoints",
  },
  {
    icon: Activity,
    item: "Output tokens",
    cost: "$18.50",
    unit: "per 1M tokens",
    note: "Unified across all endpoints",
  },
  {
    icon: Users,
    item: "Agent cost",
    cost: "$0.01",
    unit: "per agent",
    note: "For swarms and workflows",
  },
  {
    icon: ImageIcon,
    item: "Image processing",
    cost: "$0.25",
    unit: "per image",
    note: "When an image is provided",
  },
  {
    icon: Globe,
    item: "MCP call",
    cost: "$0.10",
    unit: "per call",
    note: "When MCP URL is provided",
  },
  {
    icon: Search,
    item: "Exa search tool",
    cost: "$0.04",
    unit: "per search",
    note: "Per search execution",
  },
  {
    icon: Wrench,
    item: "Web scraper tool",
    cost: "$0.15",
    unit: "per scrape",
    note: "Per scrape execution",
  },
]

const discounts = [
  {
    icon: Moon,
    title: "Night-time discount",
    label: "50% off tokens",
    description:
      "Swarm Completions receive a 50% token discount between 8 PM – 6 AM Pacific Time. Agent costs unchanged. Applied automatically.",
  },
  {
    icon: Zap,
    title: "Frenzy mode",
    label: "All requests free",
    description:
      "All API requests are free for 24 hours during Black Friday (4th Friday of November). Applied automatically — no action needed.",
  },
  {
    icon: Sparkles,
    title: "Unified pricing",
    label: "Same cost everywhere",
    description:
      "All endpoints — Swarm Completions, Agent Completions, Advanced Research, Auto Swarm Builder, Graph and Batched Grid Workflows — use identical token pricing.",
  },
]

const creditDetails = [
  {
    icon: CreditCard,
    title: "Credit priority",
    description:
      "Free credits are consumed before paid credits, ensuring maximum value from promotional and free-tier allowances.",
  },
  {
    icon: DollarSign,
    title: "Per-call billing",
    description:
      "Credits deduct on each call based on operation, token usage, agent count, and any add-ons like MCP or image processing.",
  },
  {
    icon: Server,
    title: "Live cost API",
    description:
      "Retrieve up-to-the-minute pricing programmatically via the /v1/usage/costs endpoint for accurate budgeting.",
  },
]

const enterpriseBenefits = [
  {
    icon: Shield,
    title: "Security & compliance",
    description: "SOC 2 controls, audit logging, encrypted transport, scoped API keys, and on-premise deployments for data sovereignty.",
  },
  {
    icon: Server,
    title: "Dedicated infrastructure",
    description: "Reserved capacity, custom regions, dedicated workers, and zero shared-tenant noise for predictable performance.",
  },
  {
    icon: HeadphonesIcon,
    title: "White-glove support",
    description: "Named solutions engineer, custom SLA, onsite training, and direct engineering escalation channels.",
  },
]

const faqs = [
  {
    question: "How does usage-based pricing work?",
    answer:
      "Credits are deducted automatically after each request. All endpoints use unified pricing: $6.50 per 1M input tokens and $18.50 per 1M output tokens. Additional per-agent, per-image, per-MCP-call, and per-tool costs may apply. Free credits are consumed before paid credits.",
  },
  {
    question: "What is unified pricing?",
    answer:
      "Every endpoint — Swarm Completions, Agent Completions, Advanced Research, Auto Swarm Builder, Graph Workflow, and Batched Grid Workflow — uses identical token pricing. One predictable rate across the platform.",
  },
  {
    question: "How does the night-time discount work?",
    answer:
      "Swarm Completions receive 50% off token costs between 8 PM – 6 AM Pacific Time. Agent costs are unchanged. The discount applies automatically to eligible calls within that window.",
  },
  {
    question: "What are Premium Endpoints?",
    answer:
      "Premium Endpoints — batch processing, reasoning agents, batched grid workflows, graph workflows, auto-swarm-builder, and advanced research — are available on Pro and Premium plans. They are not accessible on the Free tier.",
  },
  {
    question: "What's the difference between Pro and Premium?",
    answer:
      "Pro ($19.99/mo) adds global availability, multi-agent architectures, accelerated hardware, API telemetry, priority support, Pro models, and Premium Endpoints. Premium ($100/mo or $1,020/yr) adds 2,000 req/min, 2M tokens per agent, 500 agents per batch, SOC 2 compliance, enhanced security, priority region/zone routing, and 24/7 support.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. Upgrade or downgrade any time from the platform Account Dashboard → Billing → Plans. Changes take effect immediately. Your API keys are preserved.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "API calls return an explicit error code. You can top up credits or upgrade your plan for higher limits. Billing alerts are configurable in the dashboard.",
  },
  {
    question: "Is there an on-premise option?",
    answer:
      "Yes. On-premise deployment is available under our Enterprise tier — full stack as Docker images, source access, unlimited usage, and a priority-update enterprise license. Ideal for regulated environments and data-sovereignty requirements.",
  },
  {
    question: "How is image processing charged?",
    answer:
      "Each image passed to an agent is billed at $0.25. This applies uniformly across all tiers and endpoints.",
  },
  {
    question: "How does Frenzy Mode work?",
    answer:
      "All API requests are free for 24 hours starting on Black Friday (4th Friday of November). The promotion applies automatically — no codes or action required.",
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
  align?: "center" | "left"
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "text-left"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={`max-w-3xl ${alignClass} space-y-3 sm:space-y-4 md:space-y-5 mb-10 sm:mb-14 md:mb-20 px-2 sm:px-0`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-2 sm:gap-3 ${align === "center" ? "justify-center" : ""}`}>
          {align === "center" && <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-transparent to-white/20" />}
          <p className="text-[10px] sm:text-xs text-white/55 tracking-[0.22em] uppercase font-semibold">
            <span className="text-white font-bold">{eyebrow}</span>
          </p>
          {align === "center" && <span className="h-px w-6 sm:w-8 bg-gradient-to-l from-transparent to-white/20" />}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl font-normal leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative overflow-hidden bg-black min-h-[70vh] flex items-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(239,68,68,0.10)_0%,_rgba(0,0,0,0)_60%)]" />
          </div>

          <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 md:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs sm:text-sm text-white/70 font-medium">
                  Transparent. Usage-based. Enterprise-ready.
                </span>
              </div>

              <h1
                className="font-bold leading-[0.9] tracking-tight text-red-500"
                style={{ fontSize: "clamp(2.75rem, 9vw, 9rem)", fontFamily: "var(--font-orbitron)" }}
              >
                Pricing
              </h1>

              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/80 max-w-3xl mx-auto font-medium leading-tight px-2 sm:px-0">
                Start free. Pay per use. Scale to enterprise on the same API key.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-2xl mx-auto pt-2">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                  asChild
                >
                  <a href="https://swarms.world/platform/api-keys" target="_blank" rel="noopener noreferrer">
                    <Key className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get started free
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
                  asChild
                >
                  <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                    Talk to sales
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SUBSCRIPTION TIERS */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Subscription plans"
              title="A plan for every stage"
              description="Free for prototyping. Pro and Premium for production teams. Enterprise for mission-critical workloads."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col rounded-2xl sm:rounded-3xl border backdrop-blur-sm p-6 sm:p-7 md:p-8 ${
                    tier.highlight
                      ? "border-red-500/40 bg-gradient-to-b from-red-500/[0.06] to-white/[0.02]"
                      : "border-white/10 bg-white/[0.02]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center rounded-full border border-red-500/40 bg-red-500/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-300">
                      Most popular
                    </div>
                  )}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{tier.name}</h3>
                    <p className="text-xs sm:text-sm text-white/55 leading-relaxed">{tier.description}</p>
                  </div>
                  <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-white/5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
                        {tier.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-white/50 mt-1">{tier.cadence}</p>
                  </div>
                  <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-white/75 leading-relaxed"
                      >
                        <CheckCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className={feature.startsWith("Everything in") ? "font-semibold text-white" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.highlight
                        ? "bg-white text-black hover:bg-white/90 font-bold w-full"
                        : "border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal w-full"
                    }
                    variant={tier.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href={tier.cta.href} target="_blank" rel="noopener noreferrer">
                      {tier.cta.label}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USAGE-BASED PRICING TABLE */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Usage-based pricing"
              title="Pay only for what you use"
              description="Transparent per-operation pricing across every endpoint. No surprises, no minimums."
            />

            <div className="max-w-5xl mx-auto rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              <div className="hidden md:grid md:grid-cols-12 gap-4 px-6 lg:px-8 py-4 border-b border-white/10 text-[10px] uppercase tracking-[0.18em] text-white/40 font-semibold">
                <div className="col-span-5">Item</div>
                <div className="col-span-3 text-right">Price</div>
                <div className="col-span-4 text-right">Notes</div>
              </div>
              {usageItems.map((row, i) => (
                <motion.div
                  key={row.item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="md:col-span-5 flex items-center gap-3 sm:gap-4">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 flex-shrink-0 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center">
                      <row.icon className="h-4 w-4 text-red-500" />
                    </div>
                    <span className="text-sm sm:text-base text-white font-medium">{row.item}</span>
                  </div>
                  <div className="md:col-span-3 md:text-right">
                    <span className="font-mono text-base sm:text-lg text-white font-semibold">{row.cost}</span>
                    <span className="text-xs sm:text-sm text-white/50 ml-1.5">{row.unit}</span>
                  </div>
                  <div className="md:col-span-4 md:text-right text-xs sm:text-sm text-white/50">{row.note}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DISCOUNTS */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Discounts & policies"
              title="Built-in savings"
              description="Time-based discounts, unified token pricing, and automatic promotional credits."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {discounts.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 md:p-8"
                >
                  <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-4 sm:mb-5">
                    <d.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{d.title}</h3>
                  <p className="text-xs sm:text-sm text-red-300 font-semibold uppercase tracking-wider mb-3">
                    {d.label}
                  </p>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDIT DETAILS */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              eyebrow="Billing"
              title="How billing works"
              description="Predictable deductions, clear priority order, and a live cost endpoint to power your dashboards."
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {creditDetails.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6 md:p-8"
                >
                  <div className="p-2.5 sm:p-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-4 sm:mb-5">
                    <d.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2">{d.title}</h3>
                  <p className="text-white/65 text-sm sm:text-base leading-relaxed">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE & ON-PREMISE */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden">
              <div className="grid lg:grid-cols-5 gap-0">
                <div className="lg:col-span-2 p-6 sm:p-8 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col justify-between gap-8">
                  <div>
                    <p className="text-[10px] sm:text-xs text-white font-bold tracking-[0.22em] uppercase mb-4">
                      Enterprise & on-premise
                    </p>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight mb-4 sm:mb-5">
                      Run Swarms&nbsp;
                      <span className="text-red-500">your way</span>.
                    </h2>
                    <p className="text-base sm:text-lg text-white/60 leading-relaxed">
                      Dedicated capacity, custom SLAs, white-label options, and full on-premise deployments. Built for regulated industries and large-scale agentic workloads.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-white text-black hover:bg-white/90 font-bold"
                      asChild
                    >
                      <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                        Talk to sales
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-white/20 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm font-normal"
                      asChild
                    >
                      <Link href="/api">
                        <Code className="h-4 w-4 mr-2" />
                        API reference
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3">
                  {enterpriseBenefits.map((b, i) => (
                    <div
                      key={b.title}
                      className={`p-6 sm:p-7 md:p-8 ${i < enterpriseBenefits.length - 1 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""}`}
                    >
                      <div className="p-2.5 rounded-xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-4">
                        <b.icon className="w-5 h-5 text-red-500" />
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2">{b.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="FAQ" title="Common pricing questions" />

            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                    viewport={{ once: true }}
                    className="rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left hover:bg-white/[0.02] transition-colors"
                    >
                      <span className="text-sm sm:text-base md:text-lg font-semibold text-white leading-snug">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-red-500" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-white/65 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(239,68,68,0.12)_0%,_rgba(0,0,0,0)_55%)]"
              />
              <div className="relative z-10 px-6 sm:px-10 md:px-14 py-12 sm:py-16 md:py-20 text-center space-y-6 sm:space-y-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  Start free. Scale when you're ready.
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                  Generate an API key in under a minute. Upgrade to Pro, Premium, or Enterprise on the same key — no migrations, no downtime.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center pt-2">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                    asChild
                  >
                    <a href="https://swarms.world/platform/api-keys" target="_blank" rel="noopener noreferrer">
                      Get API key
                      <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
                    asChild
                  >
                    <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                      Talk to sales
                      <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
