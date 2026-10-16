"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
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
  CreditCard,
  DollarSign,
  Server,
  Shield,
  HeadphonesIcon,
  Sparkles,
} from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
    cta: { label: "Get API key", href: "https://cloud.swarms.world/api-keys" },
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
    cta: { label: "Upgrade to Pro", href: "https://cloud.swarms.world/settings" },
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
    cta: { label: "Upgrade to Premium", href: "https://cloud.swarms.world/settings" },
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
    cta: { label: "Talk to sales", href: "https://cal.com/swarms/swarms-strategy-session" },
  },
]

const usageItems = [
  {
    icon: Database,
    item: "Input tokens",
    cost: "Model price",
    unit: "+ 15%",
    note: "Each model's provider price per 1M tokens",
  },
  {
    icon: Activity,
    item: "Output tokens",
    cost: "Model price",
    unit: "+ 15%",
    note: "Each model's provider price per 1M tokens",
  },
  {
    icon: Users,
    item: "Agent cost",
    cost: "$0.01",
    unit: "per agent",
    note: "Swarms, graph and grid workflows",
  },
  {
    icon: ImageIcon,
    item: "Image processing",
    cost: "$0.25",
    unit: "per image",
    note: "Each image sent to an agent",
  },
  {
    icon: Search,
    item: "Exa search tool",
    cost: "$0.04",
    unit: "per request",
    note: "Once per request with search enabled",
  },
  {
    icon: Globe,
    item: "MCP servers & web scraper",
    cost: "$0",
    unit: "no fee",
    note: "Only the tokens are billed",
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
    icon: Sparkles,
    title: "Per-model pricing",
    label: "Pay for the model you pick",
    description:
      "Every agent is billed at its own model's price, so a swarm that puts lighter models on simple steps costs less. Look up any model with /v1/models/pricing.",
  },
  {
    icon: Wrench,
    title: "Free MCP & scraping",
    label: "No tool fees",
    description:
      "Attaching MCP servers and using the web scraper tool cost nothing extra. Only the tokens the agent uses are billed.",
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
      "Credits deduct on each call based on each agent's tokens at its model's price, the agent count, and add-ons like images or web search.",
  },
  {
    icon: Server,
    title: "Live price API",
    description:
      "Get any model's current price from /v1/models/pricing, every model's price from /v1/models/available, and the flat fees from /v1/usage/costs.",
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
      "Credits are deducted automatically after each request. Tokens are billed at each model's provider price plus a 15% service fee, and a swarm that mixes models bills each agent at its own model. Flat fees apply on top: $0.01 per agent on swarm, graph and grid workflows, $0.25 per image, and $0.04 per request that enables web search. Free credits are consumed before paid credits.",
  },
  {
    question: "How much does a specific model cost?",
    answer:
      "Its provider's price per 1M tokens plus 15%. GET /v1/models/pricing returns one model's price with the fee included, and GET /v1/models/available lists every model on your plan with its price. A model with no published price data is billed at fallback rates of $6.50 per 1M input and $18.50 per 1M output tokens before the fee.",
  },
  {
    question: "How does the night-time discount work?",
    answer:
      "Swarm Completions receive 50% off token costs between 8 PM – 6 AM Pacific Time. Agent costs are unchanged. The discount applies automatically to eligible calls within that window.",
  },
  {
    question: "What are Premium Endpoints?",
    answer:
      "Premium Endpoints — batch agent and swarm completions, reasoning agents, batched grid workflows, and graph workflows — are available on Pro and Premium plans. They are not accessible on the Free tier.",
  },
  {
    question: "What's the difference between Pro and Premium?",
    answer:
      "Pro ($19.99/mo) adds global availability, multi-agent architectures, accelerated hardware, API telemetry, priority support, Pro models, and Premium Endpoints. Premium ($100/mo or $1,020/yr) adds 2,000 req/min, 2M tokens per agent, 500 agents per batch, SOC 2 compliance, enhanced security, priority region/zone routing, and 24/7 support.",
  },
  {
    question: "Can I switch between plans?",
    answer:
      "Yes. Upgrade or downgrade any time from cloud.swarms.world/settings. Changes take effect immediately. Your API keys are preserved.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Billable endpoints need a credit balance above $1.00 and return a 402 Payment Required error below that. You can top up credits or upgrade your plan for higher limits. Billing alerts are configurable in the dashboard.",
  },
  {
    question: "Is there an on-premise option?",
    answer:
      "Yes. On-premise deployment is available under our Enterprise tier — full stack as Docker images, source access, unlimited usage, and a priority-update enterprise license. Ideal for regulated environments and data-sovereignty requirements.",
  },
  {
    question: "How is image processing charged?",
    answer:
      "Each image sent to an agent, in img or imgs, is billed at $0.25 on top of the tokens. This applies on every plan.",
  },
  {
    question: "Do MCP servers or tools cost extra?",
    answer:
      "MCP servers and the web scraper tool are free: only the tokens the agent uses are billed. The Exa web search tool costs $0.04 once per request that enables it, however many searches the agent runs.",
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-7xl sm:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {eyebrow && (
        <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
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
        <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Transparent. Usage-based. Enterprise-ready.
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Pricing
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Start free. Pay per use. Scale to enterprise on the same API key.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-8 text-base font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    Get started free
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    Talk to sales
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SUBSCRIPTION TIERS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Subscription plans"
              title="A plan for every stage"
              description="Free for prototyping. Pro and Premium for production teams. Enterprise for mission-critical workloads."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`relative flex flex-col rounded-lg border p-6 transition-colors duration-300 sm:p-7 md:p-8 ${
                    tier.highlight
                      ? "border-white/20 bg-[#0a0a0a]"
                      : "border-white/[0.08] bg-black hover:bg-[#0a0a0a]"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center rounded-full border border-white/20 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
                      Most popular
                    </div>
                  )}
                  <div className="mb-5 sm:mb-6">
                    <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{tier.name}</h3>
                    <p className="text-xs leading-relaxed text-white/50 sm:text-sm">{tier.description}</p>
                  </div>
                  <div className="mb-5 border-b border-white/[0.08] pb-5 sm:mb-6 sm:pb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                        {tier.price}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-white/50 sm:text-sm">{tier.cadence}</p>
                  </div>
                  <ul className="mb-6 flex-1 space-y-2.5 sm:mb-8 sm:space-y-3">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-white/70 sm:text-sm"
                      >
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                        <span className={feature.startsWith("Everything in") ? "font-semibold text-white" : ""}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={
                      tier.highlight
                        ? "w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d]"
                        : "w-full rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }
                    variant={tier.highlight ? "default" : "outline"}
                    asChild
                  >
                    <a href={tier.cta.href} target="_blank" rel="noopener noreferrer">
                      {tier.cta.label}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* USAGE-BASED PRICING TABLE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Usage-based pricing"
              title="Pay only for what you use"
              description="Every model at its provider's token price plus a 15% service fee, with a few flat fees on top."
            />

            <div className="mx-auto max-w-7xl">
              <div className="max-w-5xl overflow-hidden rounded-lg border border-white/[0.08]">
                <div className="hidden gap-4 border-b border-white/[0.08] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40 md:grid md:grid-cols-12 lg:px-8">
                  <div className="col-span-5">Item</div>
                  <div className="col-span-3 text-right">Price</div>
                  <div className="col-span-4 text-right">Notes</div>
                </div>
                {usageItems.map((row, i) => (
                  <motion.div
                    key={row.item}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.04, ease }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 gap-3 border-b border-white/[0.08] px-4 py-5 transition-colors duration-300 last:border-b-0 hover:bg-[#0a0a0a] sm:px-6 md:grid-cols-12 md:gap-4 md:py-6 lg:px-8"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 md:col-span-5">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-black sm:h-10 sm:w-10">
                        <row.icon className="h-4 w-4 text-white/50" strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-white sm:text-base">{row.item}</span>
                    </div>
                    <div className="md:col-span-3 md:text-right">
                      <span className="font-mono text-base font-semibold text-white sm:text-lg">{row.cost}</span>
                      <span className="ml-1.5 text-xs text-white/50 sm:text-sm">{row.unit}</span>
                    </div>
                    <div className="text-xs text-white/50 sm:text-sm md:col-span-4 md:text-right">{row.note}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* DISCOUNTS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Discounts & policies"
              title="Built-in savings"
              description="Off-peak discounts, per-model token pricing, and no fees for MCP or scraping."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {discounts.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <d.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-1 text-lg font-semibold text-white sm:text-xl">{d.title}</h3>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40 sm:text-sm">
                    {d.label}
                  </p>
                  <p className="text-sm leading-relaxed text-white/50 sm:text-base">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CREDIT DETAILS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Billing"
              title="How billing works"
              description="Predictable deductions, clear priority order, and live price endpoints to power your dashboards."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3">
              {creditDetails.map((d, i) => (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <d.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50 sm:text-base">{d.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENTERPRISE & ON-PREMISE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32 xl:py-40">
            <motion.div
              className="mx-auto max-w-7xl overflow-hidden rounded-lg border border-white/[0.08] bg-black"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="grid gap-0 lg:grid-cols-5">
                <div className="flex flex-col justify-between gap-8 border-b border-white/[0.08] p-6 sm:p-8 md:p-10 lg:col-span-2 lg:border-b-0 lg:border-r lg:p-12">
                  <div>
                    <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                      Enterprise & on-premise
                    </p>
                    <h2 className="mb-4 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:mb-5 sm:text-4xl md:text-5xl">
                      Run Swarms your way.
                    </h2>
                    <p className="text-base leading-relaxed text-white/50 sm:text-lg">
                      Dedicated capacity, custom SLAs, white-label options, and full on-premise deployments. Built for regulated industries and large-scale agentic workloads.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Button className="rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d]" asChild>
                      <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                        Talk to sales
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                      asChild
                    >
                      <Link href="/api">
                        <Code className="mr-2 h-4 w-4" />
                        API reference
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:col-span-3">
                  {enterpriseBenefits.map((b, i) => (
                    <div
                      key={b.title}
                      className={`p-6 sm:p-7 md:p-8 ${i < enterpriseBenefits.length - 1 ? "border-b border-white/[0.08] sm:border-b-0 sm:border-r" : ""}`}
                    >
                      <b.icon className="mb-4 h-5 w-5 text-white/50" strokeWidth={1.5} />
                      <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{b.title}</h3>
                      <p className="text-sm leading-relaxed text-white/50">{b.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="FAQ" title="Common pricing questions" />

            <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl space-y-3 sm:space-y-4">
              {faqs.map((faq, i) => {
                const isOpen = openFaq === i
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: i * 0.03, ease }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="overflow-hidden rounded-lg border border-white/[0.08] bg-black transition-colors duration-300 hover:bg-[#0a0a0a]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                    >
                      <span className="text-sm font-medium leading-snug text-white sm:text-base md:text-lg">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 flex-shrink-0 text-white/50 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-white" : ""
                        }`}
                      />
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: isOpen ? "auto" : 0,
                        opacity: isOpen ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, ease }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 text-sm leading-relaxed text-white/50 sm:px-6 sm:pb-6 sm:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
            >
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  Start free. Scale when you&apos;re ready.
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Generate an API key in under a minute. Upgrade to Pro, Premium, or Enterprise on the same key — no migrations, no downtime.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-6 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:w-auto"
                  asChild
                >
                  <a href="https://cloud.swarms.world/api-keys" target="_blank" rel="noopener noreferrer">
                    Get API key
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    Talk to sales
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
