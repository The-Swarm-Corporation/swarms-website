"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Github, Rocket, Code, Sparkles, Cloud } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const timeline = [
  {
    marker: "2023",
    title: "A group chat of GPT-3s",
    description:
      "Swarms started as a research project. We wired several GPT-3 instances into a shared group chat and let them debate, critique, and build on each other's answers. The result surprised us: the group consistently reasoned better than any single model working alone.",
  },
  {
    marker: "2023",
    title: "Swarms goes open source",
    description:
      "Soon after, we packaged the orchestration code as the Swarms Python framework and released it on GitHub so anyone could build their own multi-agent systems.",
  },
  {
    marker: "Community",
    title: "Developers join in",
    description:
      "Builders, researchers, and companies started shipping swarms in production, contributing code, and sharing what worked. That community shaped the roadmap for everything that followed.",
  },
  {
    marker: "Today",
    title: "A full multi-agent stack",
    description:
      "What began as one experiment is now a suite of products: a Rust framework, a hosted API, a marketplace for agents, and managed cloud infrastructure.",
  },
]

type Product = {
  title: string
  description: string
  icon: typeof Github
  href: string
  external: boolean
  meta: string
}

const products: Product[] = [
  {
    title: "Swarms Python",
    description:
      "The original open-source framework. Build sequential, concurrent, hierarchical, and group-chat swarms in Python.",
    icon: Github,
    href: "https://github.com/kyegomez/swarms",
    external: true,
    meta: "pip install swarms",
  },
  {
    title: "Swarms Rust",
    description:
      "A memory-safe, high-performance Rust implementation for teams that need speed and reliability at scale.",
    icon: Rocket,
    href: "/swarms-rs",
    external: false,
    meta: "cargo add swarms-rs",
  },
  {
    title: "Swarms API",
    description:
      "Hosted multi-agent orchestration behind a single endpoint, with hundreds of models and every swarm topology.",
    icon: Code,
    href: "/api",
    external: false,
    meta: "api.swarms.world",
  },
  {
    title: "Swarms Marketplace",
    description:
      "Discover, buy, and sell agents, prompts, tools, and MCP servers built by the community.",
    icon: Sparkles,
    href: "/marketplace",
    external: false,
    meta: "swarms.world",
  },
  {
    title: "Swarms Cloud",
    description:
      "A hosted agent runtime for deploying and running swarms in production without managing infrastructure.",
    icon: Cloud,
    href: "https://cloud.swarms.world",
    external: true,
    meta: "cloud.swarms.world",
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

function ProductLink({
  product,
  children,
  className,
}: {
  product: Product
  children: React.ReactNode
  className?: string
}) {
  if (product.external) {
    return (
      <a href={product.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={product.href} className={className}>
      {children}
    </Link>
  )
}

export default function AboutPage() {
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
                Founded 2023
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                About Swarms
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl lg:text-2xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                We build the infrastructure for agents that work together. It started with one question: are
                many models smarter than one?
              </motion.p>
            </div>
          </div>
        </section>

        {/* ORIGIN STORY */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-5 lg:gap-16">
              <motion.div
                className="space-y-5 lg:sticky lg:top-32 lg:col-span-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease }}
              >
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  How it started
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Many models, one conversation.
                </h2>
              </motion.div>

              <motion.div
                className="space-y-6 text-base font-normal leading-relaxed text-white/60 sm:text-lg lg:col-span-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.1, ease }}
              >
                <p>
                  In 2023, Swarms was a research project. We were testing GPT-3 and wanted to know what would
                  happen if several instances could talk to each other, so we put them in a group chat and gave
                  them problems to solve together.
                </p>
                <p>
                  The models questioned each other, caught each other&apos;s mistakes, and refined their answers
                  over multiple turns. Again and again, the group produced better results than a single GPT-3
                  working on its own. Multiple models were smarter than one.
                </p>
                <p>
                  That finding became the idea behind everything we build: the most capable AI systems will be
                  teams of agents that collaborate, specialize, and check each other&apos;s work.
                </p>
                <p>
                  We open sourced the Swarms Python framework soon after so other developers could run the same
                  experiments and build on them. A community formed around it quickly, and their feedback has
                  driven the framework and every product since.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading eyebrow="Our journey" title="From experiment to platform" />

            <motion.ol
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {timeline.map((step, index) => (
                <li key={step.title} className="flex flex-col bg-black p-5 sm:p-8">
                  <div className="mb-6 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    <span>{step.marker}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-2 text-base font-medium text-white sm:text-lg">{step.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">{step.description}</p>
                </li>
              ))}
            </motion.ol>

            <div className="mx-auto mt-6 max-w-7xl">
              <Link
                href="/story"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                See every release on the full timeline
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </section>

        {/* PRODUCTS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="What we've shipped"
              title="Products built on that first experiment"
              description="Each release extends the same idea: make it easy to build, run, and share agents that work as a team."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {products.map((product) => (
                <ProductLink
                  key={product.title}
                  product={product}
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div className="flex items-start justify-between gap-2">
                    <product.icon
                      className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    <ArrowRight className="h-4 w-4 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white sm:text-lg">{product.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">{product.description}</p>
                    <div className="mt-4 font-mono text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                      {product.meta}
                    </div>
                  </div>
                </ProductLink>
              ))}
              <Link
                href="/products"
                className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
              >
                <ArrowRight className="h-5 w-5 text-white/50 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
                <div>
                  <h3 className="mb-2 text-base font-medium text-white sm:text-lg">See all products</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">
                    The full suite, including Swarms Chat, mobile, and enterprise deployments.
                  </p>
                </div>
              </Link>
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
                  Build the next chapter with us.
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Star the framework, join the community, or come work on multi-agent systems full time.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full border border-[#27272a] bg-[#121214] shadow-none hover:shadow-none px-6 text-sm font-medium text-white hover:border-[#3f3f46] hover:bg-[#1a1a1d] sm:w-auto"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                    Star on GitHub
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <Link href="/hiring">
                    View open roles
                    <ArrowRight className="ml-2 h-4 w-4 text-white/50" />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
