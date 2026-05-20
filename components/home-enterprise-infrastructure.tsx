"use client"

import { Globe } from "@/components/ui/globe"
import { motion } from "framer-motion"
import { Shield, Server, Activity, BarChart } from "lucide-react"

const enterpriseFeatures = [
  {
    title: "Security",
    description: "HIPAA compliant and ISO 27001 certified infrastructure with enterprise-grade security practices.",
    icon: Shield,
  },
  {
    title: "Custom deployments",
    description: "Tailored agentic deployments for your specific requirements.",
    icon: Server,
  },
  {
    title: "Reliability",
    description: "99% uptime, 24/7 availability, and global presence across 4 major continents.",
    icon: Activity,
  },
  {
    title: "Monitoring & telemetry",
    description: "Comprehensive monitoring and extensive telemetry stack for real-time observability.",
    icon: BarChart,
  },
]

export function HomeEnterpriseInfrastructure() {
  return (
    <div className="container py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 bg-black">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 sm:space-y-8"
        >
          <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex items-center gap-2 sm:gap-3">
              <p className="text-[10px] sm:text-xs text-white/55 tracking-[0.22em] uppercase font-semibold">
                <span className="text-white font-bold">Built for production</span>
              </p>
              <span className="h-px w-6 sm:w-8 bg-gradient-to-r from-white/20 to-transparent" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Enterprise-grade infrastructure
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              Global availability, compliance certifications, and custom deployment options — built for the most demanding workloads.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
            {enterpriseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-2xl sm:rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm p-5 sm:p-6"
                >
                  <div className="p-2.5 sm:p-3 rounded-xl border-2 border-red-500/50 bg-red-500/10 w-fit mb-4 sm:mb-5">
                    <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-1.5 sm:mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Interactive Globe */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative flex items-center justify-center mt-8 lg:mt-0"
        >
          <div className="relative w-full max-w-lg aspect-square">
            <Globe className="relative" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}
