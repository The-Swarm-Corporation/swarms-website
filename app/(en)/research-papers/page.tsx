"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  BookOpen,
} from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

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
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main>
        {/* Hero */}
        <section className="relative flex min-h-[50vh] items-center overflow-hidden border-b border-white/[0.08] bg-black sm:min-h-[60vh]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Research
              </p>
              <h1
                className="font-bold leading-[0.95] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
              >
                Research Papers
              </h1>
              <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/50 sm:mt-8 sm:text-lg">
                Published research papers and academic publications from the
                Swarms Research Department.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Research Papers Table */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              className="mx-auto max-w-5xl overflow-hidden rounded-lg border border-white/[0.08]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="p-6 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Paper Title</th>
                      <th className="p-6 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {researchPapers.map((paper, index) => (
                      <motion.tr
                        key={index}
                        className="border-b border-white/[0.08] transition-colors duration-300 last:border-b-0 hover:bg-[#0a0a0a]"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.4, ease }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        <td className="p-6">
                          <h3 className="text-base font-medium text-white sm:text-lg">{paper.title}</h3>
                        </td>
                        <td className="p-6">
                          <Button
                            size="sm"
                            className="rounded-full bg-white px-4 text-black hover:bg-neutral-200"
                            asChild
                          >
                            <a
                              href={paper.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
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
        </section>

        {/* Call to Action */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-8 text-center sm:p-12"
            >
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Follow our research journey
              </h2>
              <div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://discord.gg/EamjgSaEQf" target="_blank" rel="noopener noreferrer">
                    Join Discord
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="/research">
                    <BookOpen className="mr-2 h-4 w-4" />
                    View research
                    <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  )
}
