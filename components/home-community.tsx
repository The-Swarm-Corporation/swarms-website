"use client"

import React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Twitter, Users } from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const socialLinks = [
  {
    icon: Discord,
    name: "Discord",
    handle: "Join the server",
    href: "https://discord.gg/EamjgSaEQf",
  },
  {
    icon: Twitter,
    name: "X / Twitter",
    handle: "@swarms_corp",
    href: "https://twitter.com/swarms_corp",
  },
  {
    icon: Users,
    name: "X Community",
    handle: "Swarms Community",
    href: "https://x.com/i/communities/1875452887414804745",
  },
]

export function HomeCommunity() {
  return (
    <section className="bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <div className="mb-14 sm:mb-16">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Community
            </p>
            <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Join the swarm.
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Join thousands of engineers building multi-agent systems together:
              discussions on agent architectures, research papers, live events,
              and direct access to the team behind Swarms.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3">
            {socialLinks.map((item) => {
              const Icon = item.icon as React.ComponentType<{ className?: string }>
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div className="flex items-center gap-4">
                    <Icon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white" />
                    <div>
                      <p className="text-sm font-medium text-white">{item.name}</p>
                      <p className="text-sm font-normal text-white/50">{item.handle}</p>
                    </div>
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-white/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
                </a>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
