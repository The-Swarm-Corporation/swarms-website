"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Network, Rocket, Eye, Zap, Cpu, Shield } from "lucide-react"
import { CardWrapper } from "./card-wrapper"
import { motion } from "framer-motion"

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const benefits = [
    {
      icon: Network,
      title: "BUILD MULTI-AGENT STRUCTURES",
      description: "Create complex hierarchical, sequential, and parallel agent collaboration systems with unprecedented flexibility",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Rocket,
      title: "DEPLOY AGENTS INTO PRODUCTION",
      description: "Seamlessly deploy your agent swarms to production environments with enterprise-grade reliability and scaling",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Eye,
      title: "MONITOR & OBSERVE YOUR AGENTS",
      description: "Real-time monitoring, observability, and debugging tools to track agent performance and behavior",
      gradient: "from-red-700 to-red-800"
    },
    {
      icon: Zap,
      title: "AUTOMATE YOUR ENTERPRISE",
      description: "Transform your organization with intelligent automation powered by coordinated agent swarms",
      gradient: "from-red-500 to-red-600"
    },
    {
      icon: Cpu,
      title: "Simple",
      description: "Backwards compatible with every framework - LangChain, AutoGen, tools, MCP integration, RAG integration",
      gradient: "from-red-600 to-red-700"
    },
    {
      icon: Shield,
      title: "ENTERPRISE-GRADE FEATURES",
      description: "Advanced security, compliance, and governance features built for mission-critical applications",
      gradient: "from-red-700 to-red-800"
    }
  ]

  return (
    <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
      >
        <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
            BENEFITS OF SWARMS
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-orbitron">
          Transform your organization with the most advanced multi-agent framework ever created
        </p>
      </motion.div>

      <motion.div
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {benefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div key={index} variants={item}>
              <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-12px] hover:scale-105 group">
                <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                  {/* Animated border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${benefit.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    <CardTitle className="text-xl text-white font-bold mb-4 tracking-wider font-orbitron">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed font-orbitron">
                      {benefit.description}
                    </CardDescription>
                  </CardHeader>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                </Card>
              </CardWrapper>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Bottom accent */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="inline-flex items-center space-x-4 text-red-500 font-orbitron tracking-wider">
          <div className="w-8 h-px bg-red-500" />
          <span className="text-sm">READY TO TRANSFORM YOUR ENTERPRISE?</span>
          <div className="w-8 h-px bg-red-500" />
        </div>
      </motion.div>
    </div>
  )
}
