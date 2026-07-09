"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cookbookResources = [
  {
    title: "Examples Overview",
    description: "Complete examples directory with comprehensive guides and tutorials.",
    link: "https://docs.swarms.world/examples/overviews/examples-index",
    badge: "Guides",
  },
  {
    title: "Cookbook Index",
    description: "Curated example collection with best practices and patterns.",
    link: "https://docs.swarms.world/examples/overviews/cookbook",
    badge: "Cookbook",
  },
  {
    title: "Paper Implementations",
    description: "Research paper implementations and academic examples.",
    link: "https://docs.swarms.world/examples/overviews/paper-implementations",
    badge: "Research",
  },
  {
    title: "Templates & Applications",
    description: "Reusable templates and production-ready applications.",
    link: "https://docs.swarms.world/examples/overviews/templates",
    badge: "Templates",
  },
  {
    title: "Swarms API Examples",
    description: "Client setup, basic usage, and API integration examples for the Swarms platform.",
    link: "https://docs.swarms.ai/docs/examples/examples/client-setup",
    badge: "API",
  },
  {
    title: "Marketplace API",
    description: "Create, update, and manage prompts and agents on the marketplace via API.",
    link: "https://docs.swarms.ai/docs/marketplace/prompts-api",
    badge: "Marketplace",
  },
  {
    title: "AutoHedge",
    description: "Build your autonomous hedge fund in minutes. Automates market analysis, risk management, and trade execution on Solana.",
    link: "https://github.com/The-Swarm-Corporation/AutoHedge",
    badge: "Finance",
  },
  {
    title: "ClawSwarm",
    description: "A multi-agent messaging platform integrating Telegram, Discord, and WhatsApp through a unified gateway.",
    link: "https://github.com/The-Swarm-Corporation/ClawSwarm",
    badge: "Messaging",
  },
]

export function HomeCookbook() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto mb-10 max-w-7xl sm:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Cookbook
          </p>
          <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
            Templates and recipes.
          </h2>
          <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Curated examples, templates, implementation guides, and API
            documentation — ship in minutes.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-7xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
        >
          {cookbookResources.map((resource) => (
            <a
              key={resource.title}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 transition-colors duration-300 hover:border-white/25 sm:p-6"
            >
              <div>
                <p className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-white/40">
                  {resource.badge}
                </p>
                <h3 className="mb-2 flex items-start justify-between gap-2 text-base font-medium text-white">
                  {resource.title}
                  <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </h3>
                <p className="text-sm font-normal leading-relaxed text-white/50">
                  {resource.description}
                </p>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
