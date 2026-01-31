"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Github,
  BookOpen,
} from "lucide-react"

const researchPapers = [
  {
    title: "ModelGrid: A Quantitative Framework for Dynamic Memory Allocation in Multi-Model Deployment",
    link: "https://github.com/The-Swarm-Corporation/ModelGrid",
  },
  {
    title: "Agent Orchestration Protocol (AOP): A Distributed Framework for Large-Scale Multi-Agent Collaboration",
    link: "https://github.com/The-Swarm-Corporation/AOP-Paper",
  },
  {
    title: "SenatorAssembly: A Multi-Agent Simulation Framework for Modeling US Senate Deliberative Processes",
    link: "https://github.com/The-Swarm-Corporation/SenatorAssembly-Paper",
  }
]

export default function ResearchPapersPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="select-text">
        {/* Hero Section */}
        <div className="relative min-h-screen overflow-hidden bg-black">
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_70%)]" />
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-red-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="container relative px-3 sm:px-6 lg:px-8 min-h-screen flex items-center justify-center z-10 pt-20 md:pt-24 overflow-x-hidden">
            <div className="text-center max-w-6xl mx-auto">
              <motion.div
                className="space-y-8 md:space-y-12"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <motion.h1
                  className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white font-orbitron tracking-tighter leading-[0.85]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                    Research
                  </span>
                  <span className="block text-white">
                    Papers
                  </span>
                </motion.h1>

                <motion.p
                  className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-gray-300 max-w-4xl mx-auto font-light leading-relaxed break-words px-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  Published research papers and academic publications from the 
                  <span className="text-red-400 font-medium"> Swarms Research Department</span>
                </motion.p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Research Papers Table */}
        <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-black overflow-x-hidden">
          <div className="container relative px-3 sm:px-6 lg:px-8 z-10">

            {/* Simple Table */}
            <motion.div
              className="overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-gray-900/50 to-black/80 backdrop-blur-xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-red-500/20">
                      <th className="text-left p-6 text-red-300 font-semibold text-sm uppercase tracking-wider">Paper Title</th>
                      <th className="text-left p-6 text-red-300 font-semibold text-sm uppercase tracking-wider">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {researchPapers.map((paper, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-red-500/10 hover:bg-red-500/5 transition-colors duration-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                        viewport={{ once: true }}
                      >
                        <td className="p-6">
                          <h3 className="text-lg font-bold text-white">{paper.title}</h3>
                        </td>
                        <td className="p-6">
                          <Button
                            size="sm"
                            className="bg-red-600 hover:bg-red-700 text-white border border-red-500 hover:border-red-400 transition-all duration-300"
                            asChild
                          >
                            <a
                              href={paper.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2"
                            >
                              <Github className="h-4 w-4" />
                              <span>View Paper</span>
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative py-12 sm:py-16 md:py-24 lg:py-32 bg-black overflow-x-hidden">
          <div className="container relative px-3 sm:px-6 lg:px-8 z-10">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-gray-900/40 to-black/60 backdrop-blur-2xl px-6 md:px-8 py-16 md:py-20 lg:py-24"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <div className="relative mx-auto max-w-5xl text-center">
                <motion.h2
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tighter mb-8 font-orbitron leading-[0.9]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <span className="text-white">FOLLOW OUR </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-red-500 to-red-600">
                    RESEARCH
                  </span>
                  <br />
                  <span className="text-white">JOURNEY</span>
                </motion.h2>

                <motion.div
                  className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-4 border-0 shadow-2xl shadow-red-500/25 font-orbitron"
                    asChild
                  >
                    <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3">
                      <Github className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>JOIN DISCORD</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group border-2 border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:scale-105 transform transition-all duration-300 font-orbitron text-lg px-8 py-4 bg-black/30 backdrop-blur-sm"
                    asChild
                  >
                    <a href="/research" className="flex items-center space-x-3">
                      <BookOpen className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                      <span>VIEW RESEARCH</span>
                    </a>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  )
}
