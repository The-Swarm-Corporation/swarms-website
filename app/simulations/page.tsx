"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardWrapper } from "@/components/card-wrapper"
import { 
  Building, 
  Users, 
  Activity, 
  ArrowRight, 
  MessageCircle,
  Code,
  Database,
  Search,
  GitBranch,
  ExternalLink,
  ShoppingBag,
} from "lucide-react"
import Image from "next/image"

export default function SimulationsPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      
      <main className="select-text">
        {/* Hero Section */}
        <div className="relative h-screen overflow-hidden bg-black">
          {/* Full-screen background image */}
          <div className="absolute inset-0">
            <Image
              src="/simulation.png"
              alt="Large Scale Multi-Agent Simulation Architecture - Swarms AI Autonomous Agent Infrastructure for Organizational Simulation"
              fill
              className="object-cover"
              priority
            />
            {/* 40% brightness overlay */}
            <div className="absolute inset-0 bg-black/60" />
          </div>
          
          {/* Grid background overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.1)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/40" />

          {/* Content overlay */}
          <div className="container relative px-3 sm:px-6 h-full flex items-center justify-center z-10 overflow-x-hidden">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                className="space-y-8"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-black text-white font-orbitron tracking-tighter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                    LARGE SCALE
                  </span>
                  <br />
                  <span className="text-white">
                    MULTI-AGENT
                  </span>
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-red-600">
                    SIMULATIONS
                  </span>
                </motion.h1>
                
                <motion.p
                  className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto font-light font-sans leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  At Swarms, we're building large-scale multi-agent infrastructure to simulate organizations with thousands of coordinated agents
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-6 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                    asChild
                  >
                    <a href="/hiring" className="flex items-center space-x-3">
                      <Users className="h-5 w-5" />
                      <span>JOIN THE TEAM</span>
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
                    asChild
                  >
                    <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                      <ExternalLink className="h-5 w-5" />
                      <span>GITHUB</span>
                    </a>
                  </Button>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* What We're Building */}
        <div className="container py-12 sm:py-16 md:py-20 lg:py-32 px-3 sm:px-6 bg-black relative overflow-x-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 relative z-10"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tighter text-white font-orbitron break-words px-1">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                Simulating The World Economy
              </span>
            </h2>
            <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans px-2 sm:px-4 break-words">
              Digital replicas of complex human organizations using coordinated agent systems
            </p>
          </motion.div>

          <motion.div
            className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: Building,
                title: "AUTONOMOUS CORPORATIONS",
                description: "Complete corporate hierarchies with agent employees across all departments - from engineering teams to executive decision-making, financial planning, and operations management.",
                gradient: "from-red-600 to-red-700",
                capabilities: ["Distributed Decision Making", "Cross-Department Workflows", "Resource Allocation", "Performance Analytics"],
                image: "/generation-408b1bc1-baaa-42d9-8644-839b1a6aef4d.png",
                imageAlt: "Corporate Agent Hierarchy Visualization"
              },
              {
                icon: Users,
                title: "AUTONOMOUS SENATE",
                description: "Legislative simulation with agent senators representing constituencies, conducting policy debates, coalition building, and legislative processes with realistic political dynamics.",
                gradient: "from-red-500 to-red-600",
                capabilities: ["Policy Analysis & Drafting", "Constituent Representation", "Negotiation Protocols", "Voting Mechanisms"],
                image: "/generation-810573f6-57a8-4cc4-b777-fb289b42760a.png",
                imageAlt: "Legislative Agent Interaction Map"
              },
              {
                icon: Activity,
                title: "AUTONOMOUS HOSPITALS",
                description: "Healthcare system simulation with coordinated medical staff agents, patient care protocols, resource management, and emergency response coordination.",
                gradient: "from-red-700 to-red-800",
                capabilities: ["Medical Decision Trees", "Patient Care Coordination", "Resource Optimization", "Emergency Protocols"],
                image: "/generation-c179a831-b828-467c-b51b-730fcfe8d4ef.png",
                imageAlt: "Healthcare Agent Coordination System"
              },
              {
                icon: ShoppingBag,
                title: "PRODUCT MARKETING AGENCY",
                description: "Multi-agent marketing system generating professional product images and content. Specialized agents collaborate to create comprehensive marketing campaigns with diverse visual styles.",
                gradient: "from-red-500 to-red-700",
                capabilities: ["10 Specialized Image Types", "Multi-Agent Workflows", "Campaign Analytics", "Content Generation"],
                image: "product_agency.jpg",
                imageAlt: "Product Marketing Agent Network"
              }
            ].map((domain, index) => {
              const Icon = domain.icon
              return (
                <motion.div key={index} variants={item} className="h-full">
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden flex flex-col">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Image Header */}
                      <div className="relative h-40 sm:h-48 overflow-hidden rounded-t-lg flex-shrink-0">
                        <Image
                          src={domain.image}
                          alt={`${domain.imageAlt} - ${domain.title} Multi-Agent System Visualization - Swarms AI Enterprise Agent Infrastructure`}
                          width={400}
                          height={200}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                        <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-r ${domain.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <CardHeader className="relative z-10 flex-grow flex flex-col p-4 sm:p-6">
                        <CardTitle className="text-lg sm:text-xl lg:text-2xl text-white font-bold mb-2 tracking-wider font-orbitron">
                          {domain.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed font-sans text-sm sm:text-base flex-grow mb-6">
                          {domain.description}
                        </CardDescription>
                        
                        {/* Simulation Example Links - Always at bottom */}
                        <div className="mt-auto pt-4">
                          {index === 0 && ( // Autonomous Corporations
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-bold text-xs sm:text-sm px-4 py-2 font-orbitron w-full bg-black/50 backdrop-blur-sm"
                              asChild
                            >
                              <a
                                href="https://github.com/kyegomez/swarms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>COMING SOON</span>
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                          
                          {index === 2 && ( // Hospital simulation
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-xs sm:text-sm px-4 py-2 border border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full"
                              asChild
                            >
                              <a
                                href="https://github.com/The-Swarm-Corporation/HospitalSim"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>GET STARTED</span>
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                          
                          {index === 1 && ( // Senate simulation
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-xs sm:text-sm px-4 py-2 border border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full"
                              asChild
                            >
                              <a
                                href="https://github.com/kyegomez/swarms"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>GET STARTED</span>
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                          
                          {index === 3 && ( // Product Marketing Agency
                            <Button
                              size="sm"
                              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-xs sm:text-sm px-4 py-2 border border-red-500 shadow-lg shadow-red-500/25 font-orbitron w-full"
                              asChild
                            >
                              <a
                                href="https://github.com/The-Swarm-Corporation/Product-Marketing-Agency"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2"
                              >
                                <span>GET STARTED</span>
                                <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
                              </a>
                            </Button>
                          )}
                        </div>

                      </CardHeader>
                      
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                    </Card>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* How We're Building It */}
        <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
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
                Building Simulation Infrastructure
              </span>
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-sans mb-8">
              Core infrastructure systems enabling coordination at unprecedented scale
            </p>
            
            <motion.div
              className="flex justify-center gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                asChild
              >
                <a
                  href="https://github.com/kyegomez/swarms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3"
                >
                  <span>GITHUB</span>
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
                  <span>DOCUMENTATION</span>
                  <ExternalLink className="h-5 w-5" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              {
                icon: MessageCircle,
                title: "MULTI-AGENT COMMUNICATION",
                description: "Distributed message passing protocols enabling real-time coordination between thousands of agents with guaranteed delivery and ordering",
                gradient: "from-red-600 to-red-700",
                specs: ["P2P Message Routing", "Event Sourcing", "State Synchronization"]
              },
              {
                icon: GitBranch,
                title: "SOCIAL ALGORITHMS",
                description: "Behavioral modeling systems that simulate realistic social dynamics, relationship formation, and group decision-making processes",
                gradient: "from-red-500 to-red-600",
                specs: ["Relationship Graphs", "Influence Networks", "Group Dynamics"]
              },
              {
                icon: Search,
                title: "AGENT DISCOVERY",
                description: "Service mesh protocols allowing agents to discover capabilities, form teams, and delegate tasks based on expertise and availability",
                gradient: "from-red-700 to-red-800",
                specs: ["Capability Matching", "Load Balancing", "Task Routing"]
              },
              {
                icon: Database,
                title: "DISTRIBUTED MEMORY",
                description: "Scalable knowledge sharing systems with persistent memory, experience replay, and collaborative learning across agent populations",
                gradient: "from-red-600 to-red-700",
                specs: ["Vector Databases", "Memory Pooling", "Knowledge Graphs"]
              }
            ].map((tech, index) => {
              const Icon = tech.icon
              return (
                <motion.div key={index} variants={item}>
                  <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                    <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <CardHeader className="relative z-10">
                        <div className="relative mb-6">
                          <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${tech.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <CardTitle className="text-xl text-white font-black mb-4 tracking-wider font-orbitron">
                          {tech.title}
                        </CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed text-sm font-sans mb-4">
                          {tech.description}
                        </CardDescription>
                        
                        <div className="space-y-2">
                          {tech.specs.map((spec, specIndex) => (
                            <div key={specIndex} className="flex items-center space-x-2">
                              <Code className="w-3 h-3 text-red-500 flex-shrink-0" />
                              <span className="text-xs text-gray-400">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </CardHeader>
                      
                      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                    </Card>
                  </CardWrapper>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Call to Action */}
        <div className="container py-24 md:py-32 px-4 sm:px-6 bg-black relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:30px_30px]" />
          
          <motion.div
            className="relative overflow-hidden rounded-2xl border-2 border-red-500/20 bg-black/50 backdrop-blur-sm px-8 py-16 md:py-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 font-orbitron">
                <span className="text-white">TRANSFORM </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">SIMULATION</span>
                <span className="text-white"> INTO REALITY</span>
              </h2>
              
              <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto font-light leading-relaxed font-sans">
                Join our engineering team building the infrastructure for autonomous digital societies that will reshape how organizations operate
              </p>
              
              <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
                <Button
                  size="lg"
                  className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
                  asChild
                >
                  <a href="/hiring" className="flex items-center space-x-3">
                    <Users className="h-5 w-5" />
                    <span>JOIN OUR TEAM</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-6 bg-black/50 backdrop-blur-sm"
                  asChild
                >
                  <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                    <ExternalLink className="h-5 w-5" />
                    <span>GITHUB</span>
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}