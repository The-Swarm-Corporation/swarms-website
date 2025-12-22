"use client"

import { motion } from "framer-motion"
import { Network, MessageSquare, Zap, Brain, Cpu, Shield } from "lucide-react"

const features = [
  {
    title: "Multi-Agent Architectures",
    description: "Build complex hierarchical, sequential, and parallel agent collaboration systems",
    link: "https://docs.swarms.world",
    icon: Network,
    gradient: "from-red-500/20 via-red-600/10 to-red-700/20",
    bgGradient: "from-red-500/5 to-transparent"
  },
  {
    title: "Agent-To-Agent Communication",
    description: "Advanced communication protocols for seamless agent interaction",
    link: "https://docs.swarms.world",
    icon: MessageSquare,
    gradient: "from-blue-500/20 via-blue-600/10 to-blue-700/20",
    bgGradient: "from-blue-500/5 to-transparent"
  },
  {
    title: "Ultra-Optimized Runtime",
    description: "High-performance runtime for maximum agent efficiency and speed",
    link: "https://docs.swarms.world",
    icon: Zap,
    gradient: "from-purple-500/20 via-purple-600/10 to-purple-700/20",
    bgGradient: "from-purple-500/5 to-transparent"
  },
  {
    title: "Multi-Agent Memory Systems",
    description: "Sophisticated memory management for complex agent workflows",
    link: "https://docs.swarms.world",
    icon: Brain,
    gradient: "from-green-500/20 via-green-600/10 to-green-700/20",
    bgGradient: "from-green-500/5 to-transparent"
  },
  {
    title: "Simulation Environments",
    description: "Advanced simulation environments for testing and training agent swarms",
    link: "https://docs.swarms.world",
    icon: Cpu,
    gradient: "from-orange-500/20 via-orange-600/10 to-orange-700/20",
    bgGradient: "from-orange-500/5 to-transparent"
  },
  {
    title: "Enterprise Security & Compliance",
    description: "Built-in security, governance, and compliance features for enterprise deployments",
    link: "https://docs.swarms.world",
    icon: Shield,
    gradient: "from-cyan-500/20 via-cyan-600/10 to-cyan-700/20",
    bgGradient: "from-cyan-500/5 to-transparent"
  }
]

export function HomeFeatures() {
  return (
    <div className="container py-24 md:py-32 lg:py-40 px-4 sm:px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center space-y-4 md:space-y-6 mb-16 md:mb-20"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
          Features
        </h2>
        <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed">
          Swarms has pioneered world-class infrastructure for multi-agent collaboration such as communication protocols, optimized runtimes, memory systems, and simulation environments.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <a
                href={feature.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative h-[280px] md:h-[300px] lg:h-[320px] rounded-3xl overflow-hidden border border-white/10 bg-black/50 backdrop-blur-sm transition-all duration-500 hover:border-white/30 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gray-300/20">
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Animated gradient overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                    {/* Icon with border */}
                    <div className="flex items-start">
                      <div className="p-3 rounded-2xl border-2 border-red-500/50 bg-red-500/10 group-hover:border-red-500 group-hover:bg-red-500/20 transition-all duration-500">
                        <feature.icon className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
                      </div>
                    </div>
                    
                    {/* Title and description */}
                    <div>
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-white/70 text-sm md:text-base leading-relaxed group-hover:text-white/90 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover effect line */}
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

