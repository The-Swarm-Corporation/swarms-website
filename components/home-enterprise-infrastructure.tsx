"use client"

import { Globe } from "@/components/ui/globe"
import { motion } from "framer-motion"
import { Shield, Server, Activity, BarChart } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const enterpriseFeatures = [
  {
    title: "Security",
    description:
      "HIPAA compliant and ISO 27001 certified infrastructure with enterprise-grade security practices.",
    icon: Shield,
  },
  {
    title: "Custom deployments",
    description: "Tailored agentic deployments for your specific requirements.",
    icon: Server,
  },
  {
    title: "Reliability",
    description:
      "99% uptime, 24/7 availability, and global presence across 4 major continents.",
    icon: Activity,
  },
  {
    title: "Monitoring & telemetry",
    description:
      "Comprehensive monitoring and extensive telemetry stack for real-time observability.",
    icon: BarChart,
  },
]

export function HomeEnterpriseInfrastructure() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="space-y-8"
          >
            <div className="space-y-5">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Built for Production
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Enterprise-grade infrastructure.
              </h2>
              <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Global availability, compliance certifications, and custom
                deployment options — built for the most demanding workloads.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2">
              {enterpriseFeatures.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-6"
                  >
                    <Icon
                      className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                      strokeWidth={1.5}
                    />
                    <h3 className="mb-1.5 text-sm font-medium text-white">
                      {feature.title}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Interactive Globe */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
            className="relative flex items-center justify-center"
          >
            <div className="relative aspect-square w-full max-w-lg">
              <Globe className="relative" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
