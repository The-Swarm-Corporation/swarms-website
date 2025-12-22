"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe } from "@/components/ui/globe"
import { motion } from "framer-motion"
import { Shield, Server, Activity, BarChart } from "lucide-react"

const enterpriseFeatures = [
  {
    title: "Security",
    description: "HIPAA compliant and ISO 27001 certified infrastructure with enterprise-grade security practices",
    icon: Shield
  },
  {
    title: "Custom Deployments",
    description: "Tailored agentic deployments for your specific requirements",
    icon: Server
  },
  {
    title: "Reliability",
    description: "99% uptime, 24/7 availability, and global availability across 4 major continents",
    icon: Activity
  },
  {
    title: "Monitoring & Telemetry",
    description: "Comprehensive monitoring and extensive telemetry stack for real-time insights and observability",
    icon: BarChart
  }
]

export function HomeEnterpriseInfrastructure() {
  return (
    <div className="container py-24 md:py-32 lg:py-40 px-4 sm:px-6 bg-black">
      <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight mb-6">
              Enterprise-Grade Infrastructure
            </h2>
            <p className="text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed">
              Built for the most demanding enterprise requirements with global availability, compliance certifications, and custom deployment options.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {enterpriseFeatures.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-white/10 bg-white/[0.02] h-full">
                    <CardHeader className="p-6">
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                        <Icon className="h-6 w-6 text-white/80" />
                      </div>
                      <CardTitle className="text-lg font-bold text-white mb-2">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-white/60 text-sm leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
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
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-lg aspect-square">
            <Globe className="relative" />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

