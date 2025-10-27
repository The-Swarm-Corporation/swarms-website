"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CardWrapper } from "./card-wrapper"
import { motion } from "framer-motion"
import { Store, Share2, ShoppingCart, Users, Star, TrendingUp, Zap, ArrowRight, ExternalLink } from "lucide-react"

export function Marketplace() {
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

  const marketplaceFeatures = [
    {
      icon: Share2,
      title: "SHARE YOUR AGENTS",
      description: "Upload and monetize your custom agents. Set your own pricing and earn from the community.",
      gradient: "from-red-500 to-red-600",
      features: ["Custom pricing", "Revenue sharing", "Version control", "Analytics dashboard"]
    },
    {
      icon: ShoppingCart,
      title: "BUY & SELL PROMPTS",
      description: "Access thousands of optimized prompts or sell your own. Quality-tested and community-rated.",
      gradient: "from-red-600 to-red-700",
      features: ["Quality ratings", "Category filtering", "Bulk licensing", "Prompt templates"]
    },
    {
      icon: Zap,
      title: "TOOLS & COMPONENTS",
      description: "Discover specialized tools and components to enhance your agent capabilities.",
      gradient: "from-red-700 to-red-800",
      features: ["API integrations", "Custom tools", "Workflow components", "Testing suites"]
    },
    {
      icon: Users,
      title: "COMMUNITY MARKETPLACE",
      description: "Connect with other builders, share knowledge, and collaborate on projects.",
      gradient: "from-red-500 to-red-600",
      features: ["Developer profiles", "Collaboration tools", "Discussion forums", "Mentorship programs"]
    }
  ]

  const marketplaceStats = [
    { value: "10K+", label: "AGENTS SHARED" },
    { value: "50K+", label: "PROMPTS AVAILABLE" },
    { value: "1K+", label: "ACTIVE SELLERS" },
    { value: "100K+", label: "DOWNLOADS" }
  ]

  return (
    <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
      >
        <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
            SWARMS MARKETPLACE
          </span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-orbitron">
          Share your agents, prompts, and tools. Buy and sell AI entities in the premier marketplace for multi-agent systems.
        </p>
      </motion.div>

      {/* Marketplace Features Grid */}
      <motion.div
        className="grid gap-8 md:grid-cols-2 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {marketplaceFeatures.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div key={index} variants={item}>
              <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                  {/* Animated border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <CardTitle className="text-2xl text-white font-black mb-2 tracking-wider font-orbitron">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed text-base font-orbitron mb-6">
                      {feature.description}
                    </CardDescription>

                    {/* Feature list */}
                    <div className="space-y-2">
                      {feature.features.map((feat, featIndex) => (
                        <div key={featIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-sm text-gray-300 font-orbitron">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                </Card>
              </CardWrapper>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Marketplace Preview Section */}
      <motion.div
        className="mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-black/50 backdrop-blur-sm border-2 border-red-500/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white font-orbitron mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                VISIT SWARMS.WORLD
              </span>
            </h3>
            <p className="text-gray-300 font-orbitron max-w-2xl mx-auto">
              Join thousands of developers sharing and discovering AI agents, prompts, and tools. 
              Start monetizing your creations or find the perfect components for your next project.
            </p>
          </div>

          {/* Mock marketplace preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "Data Analysis Agent", author: "by @alex_ai", price: "$29", rating: "4.9", downloads: "1.2K" },
              { title: "Customer Support Bot", author: "by @swarm_builder", price: "$49", rating: "4.8", downloads: "856" },
              { title: "Code Review Assistant", author: "by @dev_agent", price: "$39", rating: "4.7", downloads: "2.1K" }
            ].map((item, index) => (
              <div key={index} className="bg-black/30 border border-red-500/20 rounded-lg p-4 hover:border-red-500/40 transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-bold font-orbitron text-sm">{item.title}</h4>
                  <span className="text-red-400 font-orbitron text-sm">{item.price}</span>
                </div>
                <p className="text-gray-400 text-xs font-orbitron mb-2">{item.author}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <span className="text-xs text-gray-300 font-orbitron">{item.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400 font-orbitron">{item.downloads} downloads</span>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
              asChild
            >
              <a
                href="https://swarms.world"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <Store className="h-5 w-5" />
                <span>VISIT MARKETPLACE</span>
                <ExternalLink className="h-5 w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
              asChild
            >
              <a
                href="https://docs.swarms.world"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3"
              >
                <TrendingUp className="h-5 w-5" />
                <span>LEARN TO SELL</span>
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 