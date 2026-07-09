"use client"

import { motion } from "framer-motion"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function HomeMission() {
  return (
    <section className="relative border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            Our Mission
          </p>
          <h2 className="max-w-5xl text-3xl font-semibold leading-[1.15] tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            <span className="text-white/40">
              Building the infrastructure necessary for the{" "}
            </span>
            <span className="text-white">
              multi-trillion dollar agent economy.
            </span>
          </h2>
          <p className="mt-8 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
            Our stack prioritizes performance, reliability, and scalability —
            serving as the foundation for teams shipping production-grade
            autonomous systems.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
