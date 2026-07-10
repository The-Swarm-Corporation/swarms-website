"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  Zap,
  BarChart,
  Users,
  Code,
  Rocket,
  Award,
  Gift,
  Briefcase,
  Globe,
  MessageSquare,
  Layers,
  FileText,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const overviewFeatures = [
  {
    icon: Gift,
    title: "Platform Credits",
    description:
      "Up to $10,000 in Swarms AI platform credits to build and scale your multi-agent applications",
    link: "#program-tiers",
    linkText: "View Credit Tiers",
  },
  {
    icon: Code,
    title: "Technical Support",
    description:
      "Direct access to our engineering team for implementation guidance and technical assistance",
    link: "#technical-support",
    linkText: "Support Details",
  },
  {
    icon: Globe,
    title: "Go-to-Market Support",
    description: "Co-marketing opportunities, case studies, and promotional support for your startup",
    link: "#go-to-market",
    linkText: "Marketing Resources",
  },
  {
    icon: MessageSquare,
    title: "Dedicated Account Manager",
    description: "A dedicated point of contact to help you navigate and maximize program benefits",
    link: "#application-process",
    linkText: "Learn More",
  },
  {
    icon: Briefcase,
    title: "Investment Opportunities",
    description: "Top-performing startups may be considered for investment from Swarms AI",
    link: "#investment",
    linkText: "Investment Details",
  },
  {
    icon: Users,
    title: "Startup Community",
    description: "Join a community of AI founders building with Swarms technology",
    link: "https://discord.gg/EamjgSaEQf",
    linkText: "Join Community",
  },
]

type TierBenefit = { icon: React.ComponentType<{ className?: string; strokeWidth?: number }>; node: React.ReactNode }

const launchBenefits: TierBenefit[] = [
  {
    icon: Gift,
    node: (
      <>
        <strong className="font-semibold text-white">$2,500</strong> in Swarms AI platform credits
      </>
    ),
  },
  { icon: Code, node: "Email technical support with 48-hour response time" },
  { icon: Globe, node: "Basic go-to-market resources and templates" },
  { icon: Users, node: "Access to startup community and forums" },
  { icon: Layers, node: "Monthly office hours with Swarms engineers" },
]

const growthBenefits: TierBenefit[] = [
  {
    icon: Gift,
    node: (
      <>
        <strong className="font-semibold text-white">$5,000</strong> in Swarms AI platform credits
      </>
    ),
  },
  { icon: Code, node: "Priority email support with 24-hour response time" },
  { icon: MessageSquare, node: "Bi-weekly check-ins with a technical account manager" },
  { icon: Globe, node: "Co-marketing opportunities and case study" },
  { icon: Layers, node: "Architectural review session with Swarms engineers" },
  { icon: Users, node: "Introductions to relevant partners and customers" },
]

const scaleBenefits: TierBenefit[] = [
  {
    icon: Gift,
    node: (
      <>
        <strong className="font-semibold text-white">$10,000</strong> in Swarms AI platform credits
      </>
    ),
  },
  { icon: Code, node: "Premium support with dedicated Slack channel" },
  { icon: MessageSquare, node: "Dedicated account manager with weekly check-ins" },
  { icon: Globe, node: "Featured case study and joint PR opportunities" },
  { icon: Layers, node: "Custom implementation support and architecture design" },
  { icon: Briefcase, node: "Consideration for investment opportunities" },
  { icon: Award, node: "Executive sponsor from Swarms leadership team" },
]

const tiers = [
  {
    name: "Launch Tier",
    badge: "Early Stage",
    description: "For early-stage startups beginning their AI journey",
    benefits: launchBenefits,
    eligibility: [
      "Pre-seed or seed stage startup",
      "Less than $500K in funding",
      "Founded within the last 2 years",
    ],
    ctaLabel: "Apply for Launch Tier",
    ctaHref: "https://cal.com/swarms/startup-launch",
  },
  {
    name: "Growth Tier",
    badge: "Mid Stage",
    description: "For startups with initial traction looking to scale",
    benefits: growthBenefits,
    eligibility: ["Seed to Series A startup", "$500K to $3M in funding", "Demonstrated product-market fit"],
    ctaLabel: "Apply for Growth Tier",
    ctaHref: "https://cal.com/swarms/startup-growth",
  },
  {
    name: "Scale Tier",
    badge: "Advanced",
    description: "For high-growth startups ready for significant expansion",
    benefits: scaleBenefits,
    eligibility: [
      "Series A or beyond",
      "$3M+ in funding",
      "Significant revenue or user growth",
      "Strategic alignment with Swarms AI",
    ],
    ctaLabel: "Apply for Scale Tier",
    ctaHref: "https://cal.com/swarms/startup-scale",
  },
]

const implementationSupport = [
  {
    icon: Code,
    title: "Architecture Design",
    description: "Get expert guidance on designing your multi-agent system architecture",
  },
  {
    icon: Layers,
    title: "Integration Assistance",
    description: "Support for integrating Swarms AI with your existing systems and workflows",
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Guidance on optimizing your multi-agent systems for maximum efficiency",
  },
  {
    icon: Users,
    title: "Team Training",
    description: "Technical workshops and training sessions for your development team",
  },
]

const supportChannels = [
  {
    icon: MessageSquare,
    title: "Dedicated Slack Channel",
    description: "Direct access to our engineering team for Scale tier members",
  },
  {
    icon: Users,
    title: "Office Hours",
    description: "Regular technical office hours with our engineering team",
  },
  {
    icon: Rocket,
    title: "Implementation Reviews",
    description: "Code and architecture reviews to ensure best practices",
  },
  {
    icon: Globe,
    title: "Documentation & Resources",
    description: "Access to premium documentation, tutorials, and code samples",
  },
]

const goToMarket = [
  {
    title: "Co-Marketing",
    description:
      "Joint marketing campaigns, blog posts, and social media promotion to increase your visibility",
    items: [
      "Featured case studies",
      "Joint webinars and events",
      "Social media promotion",
      "Newsletter features",
    ],
  },
  {
    title: "Sales Enablement",
    description: "Resources and support to help you effectively sell your Swarms-powered solutions",
    items: ["Sales deck templates", "ROI calculators", "Competitive positioning", "Demo environments"],
  },
  {
    title: "Market Access",
    description: "Connections and opportunities to reach potential customers and partners",
    items: [
      "Customer introductions",
      "Partner ecosystem access",
      "Industry event participation",
      "Marketplace listing",
    ],
  },
]

const investmentCriteria = [
  "Strong product-market fit with demonstrated traction",
  "Innovative use of multi-agent technology",
  "Strong founding team with domain expertise",
  "Clear path to scalability and growth",
]

const investmentBenefits = [
  "Strategic capital to accelerate growth",
  "Executive mentorship from Swarms leadership",
  "Introductions to our investor network",
  "Priority access to new Swarms features and capabilities",
]

const applicationSteps = [
  {
    icon: FileText,
    title: "1. Submit Application",
    description:
      "Schedule a call with our team to discuss your startup, your use case for Swarms AI, and which program tier is right for you.",
    link: "https://cal.com/swarms",
    linkText: "Schedule Application Call",
  },
  {
    icon: BarChart,
    title: "2. Evaluation",
    description:
      "Our team will review your application based on your startup's stage, technical needs, and strategic alignment with Swarms AI.",
    link: "#program-tiers",
    linkText: "Review Eligibility",
  },
  {
    icon: Rocket,
    title: "3. Onboarding",
    description:
      "Approved startups will be onboarded to the program, receive their credits, and be connected with their dedicated support resources.",
    link: "#technical-support",
    linkText: "View Support Resources",
  },
]

const faqs = [
  {
    question: "How long do the platform credits last?",
    answer: "Platform credits are valid for 12 months from the date of enrollment in the program.",
  },
  {
    question: "Can I upgrade to a higher tier later?",
    answer:
      "Yes, startups can apply to upgrade to a higher tier as they grow and meet the eligibility requirements.",
  },
  {
    question: "Is the program available globally?",
    answer: "Yes, the Swarms AI Startup Program is open to eligible startups worldwide.",
  },
  {
    question: "Do you take equity in exchange for the program benefits?",
    answer:
      "No, we do not take equity in exchange for program benefits. Investment opportunities are separate and optional.",
  },
  {
    question: "What happens after the 12-month program period?",
    answer:
      "Startups can apply for program renewal or transition to our standard pricing with potential discounts based on usage.",
  },
  {
    question: "How quickly will I hear back after applying?",
    answer:
      "We typically review applications within 1-2 weeks and will schedule a follow-up call to discuss next steps.",
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

export default function StartupsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
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
                Startup Initiative
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Swarms Startup Program
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Accelerate your AI startup with technical support, go-to-market resources, and up to
                $10,000 in credits.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="#program-tiers">
                    View Program Tiers
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAM OVERVIEW */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Program Overview"
              title="Built to help AI startups build, scale, and succeed."
              description="The Swarms Startup Program is designed to help AI startups build, scale, and succeed with our multi-agent platform."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {overviewFeatures.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.link}
                  target={feature.link.startsWith("http") ? "_blank" : undefined}
                  rel={feature.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <feature.icon
                    className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{feature.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    {feature.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROGRAM TIERS */}
        <section id="program-tiers" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Program Tiers"
              title="Choose the tier that fits your stage"
              description="Choose the tier that best fits your startup's stage and needs."
            />

            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-3 lg:gap-6">
              {tiers.map((tier, i) => (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  className="flex flex-col rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-7 md:p-8"
                >
                  <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
                    <h3 className="text-xl font-semibold text-white sm:text-2xl">{tier.name}</h3>
                    <span className="inline-flex items-center whitespace-nowrap rounded-full border border-white/[0.14] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                      {tier.badge}
                    </span>
                  </div>
                  <p className="mb-6 text-sm leading-relaxed text-white/50 sm:text-base">
                    {tier.description}
                  </p>

                  <div className="mb-6 border-b border-white/[0.08] pb-6">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Benefits Include
                    </h4>
                    <ul className="space-y-3">
                      {tier.benefits.map((benefit, bi) => (
                        <li key={bi} className="flex items-start gap-2.5">
                          <benefit.icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                          <span className="text-sm leading-relaxed text-white/60">{benefit.node}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 flex-1">
                    <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Eligibility
                    </h4>
                    <ul className="space-y-2">
                      {tier.eligibility.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                          <span className="text-sm leading-relaxed text-white/60">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    className="w-full rounded-full bg-white font-medium text-black hover:bg-neutral-200"
                    asChild
                  >
                    <a href={tier.ctaHref} target="_blank" rel="noopener noreferrer">
                      {tier.ctaLabel}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TECHNICAL SUPPORT */}
        <section id="technical-support" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Technical Support"
              title="Technical Support"
              description="Get the technical guidance you need to build successful multi-agent applications."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-lg border border-white/[0.08] bg-black md:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="border-b border-white/[0.08] p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <h3 className="mb-6 text-xl font-semibold text-white sm:text-2xl">
                  Implementation Support
                </h3>
                <ul className="space-y-5">
                  {implementationSupport.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/40" strokeWidth={1.5} />
                      <div>
                        <span className="block text-sm font-medium text-white">{item.title}</span>
                        <span className="text-sm leading-relaxed text-white/50">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 sm:p-8 md:p-10">
                <h3 className="mb-6 text-xl font-semibold text-white sm:text-2xl">Support Channels</h3>
                <ul className="space-y-5">
                  {supportChannels.map((item) => (
                    <li key={item.title} className="flex items-start gap-3">
                      <item.icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/40" strokeWidth={1.5} />
                      <div>
                        <span className="block text-sm font-medium text-white">{item.title}</span>
                        <span className="text-sm leading-relaxed text-white/50">{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* GO-TO-MARKET SUPPORT */}
        <section id="go-to-market" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Go-to-Market"
              title="Go-to-Market Support"
              description="Accelerate your market entry and growth with our marketing and business development resources."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {goToMarket.map((section) => (
                <div key={section.title} className="flex flex-col gap-4 bg-black p-5 sm:p-8">
                  <h3 className="text-base font-medium text-white">{section.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{section.description}</p>
                  <div className="mt-2">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/40">
                      Includes
                    </h4>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                          <span className="text-sm text-white/50">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* INVESTMENT OPPORTUNITIES */}
        <section id="investment" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Investment"
              title="Investment Opportunities"
              description="Top-performing startups in our program may be considered for investment."
            />

            <motion.div
              className="mx-auto max-w-7xl rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 lg:p-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <h3 className="mb-2 text-2xl font-semibold text-white">Swarms AI Ventures</h3>
              <p className="mb-6 text-base text-white/50">Strategic investment for exceptional startups</p>
              <p className="mb-8 max-w-3xl text-base leading-relaxed text-white/50">
                Swarms AI is committed to supporting the most promising startups in our ecosystem. Scale
                tier members who demonstrate exceptional growth, innovation, and strategic alignment with
                our vision may be considered for investment opportunities.
              </p>

              <div className="mb-8 grid gap-8 md:grid-cols-2">
                <div>
                  <h4 className="mb-4 text-lg font-semibold text-white">Investment Criteria</h4>
                  <ul className="space-y-2.5">
                    {investmentCriteria.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="mb-4 text-lg font-semibold text-white">Investment Benefits</h4>
                  <ul className="space-y-2.5">
                    {investmentBenefits.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/30" />
                        <span className="text-sm leading-relaxed text-white/60">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button className="w-full rounded-full bg-white font-medium text-black hover:bg-neutral-200 sm:w-auto" asChild>
                <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                  Schedule Investment Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </motion.div>
          </div>
        </section>

        {/* APPLICATION PROCESS */}
        <section id="application-process" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="How to Apply"
              title="Application Process"
              description="Join our startup program in three simple steps."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {applicationSteps.map((step) => (
                <a
                  key={step.title}
                  href={step.link}
                  target={step.link.startsWith("http") ? "_blank" : undefined}
                  rel={step.link.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <step.icon
                    className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{step.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">{step.description}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    {step.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              description="Common questions about the Swarms AI Startup Program."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:grid-cols-2 sm:p-10 lg:p-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              {faqs.map((faq) => (
                <div key={faq.question} className="space-y-2">
                  <h3 className="text-base font-semibold text-white">{faq.question}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{faq.answer}</p>
                </div>
              ))}
            </motion.div>
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
                  Ready to Accelerate Your AI Startup?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Join the Swarms AI Startup Program today and get the resources, support, and technology
                  you need to build the next generation of AI applications.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                    Apply Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="mailto:kye@swarms.world">Contact Startup Team</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://swarms.ai"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Swarms AI
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/kyegomez/swarms"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
