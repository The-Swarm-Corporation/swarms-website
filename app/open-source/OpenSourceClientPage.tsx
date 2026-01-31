"use client"

import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { GitHubRepositories } from "@/components/github-repositories"
import { AnimatedBackground } from "@/components/animated-background"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Github, Star, GitBranch, Code, BookOpen, Users, Globe } from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"

export default function OpenSourceClientPage() {
  const tickerAnnouncements = [
    "Swarms AI: Committed to Open Source Research",
    "Building the future of AI through collaborative development",
    "Join our community of contributors and researchers",
    "Explore our GitHub repositories and contribute to the ecosystem",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollingTicker
        announcements={tickerAnnouncements}
        className="py-2 bg-black/30 border-y border-red-600/20 backdrop-blur-sm"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <AnimatedBackground particleColor="rgba(239, 68, 68, 0.5)" className="opacity-40" />
        <div className="absolute inset-0 circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 cyber-gradient" aria-hidden="true" />

        <div className="container relative px-3 sm:px-6 py-12 sm:py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-3 sm:mb-4 bg-red-500/20 text-red-400 hover:bg-red-500/30 text-xs sm:text-sm">Open Source</Badge>
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 break-words px-1">
              Advancing AI Through Open Research
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto break-words px-1">
              Explore our open source repositories and join the community of researchers and developers building the
              future of multi-agent AI systems.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
              <a
                href="https://github.com/The-Swarm-Corporation"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white min-h-[44px] h-12 px-6 py-3 w-full sm:w-auto touch-manipulation"
              >
                <Github className="mr-2 h-5 w-5 flex-shrink-0" />
                View on GitHub
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-600 text-red-600 hover:bg-red-600/10 min-h-[44px] h-12 px-6 py-3 w-full sm:w-auto touch-manipulation"
              >
                <Discord className="mr-2 h-5 w-5 flex-shrink-0" />
                Join Our Community
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Open Source Mission */}
      <div className="container px-3 sm:px-6 py-10 sm:py-16 overflow-x-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 px-1"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl mb-3 sm:mb-4 break-words">Our Open Source Mission</h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto break-words px-1">
            At Swarms AI, we believe that open collaboration accelerates innovation. Our commitment to open source
            research drives the development of cutting-edge multi-agent systems that are accessible to everyone.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 md:grid-cols-3 mb-12 sm:mb-16">
          {[
            {
              icon: Code,
              title: "Transparent Development",
              description:
                "We develop in the open, sharing our progress, challenges, and breakthroughs with the global AI community.",
            },
            {
              icon: Users,
              title: "Community Collaboration",
              description:
                "Our repositories welcome contributions from researchers and developers worldwide, fostering a collaborative ecosystem.",
            },
            {
              icon: Globe,
              title: "Accessible Research",
              description:
                "We make advanced AI research accessible to everyone, democratizing access to cutting-edge multi-agent technology.",
            },
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 p-5 sm:p-6 md:p-8 backdrop-blur-sm min-w-0"
              >
                <div className="relative">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mb-4">
                    <Icon className="h-6 w-6 text-red-500" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 break-words">{item.title}</h3>
                  <p className="text-sm sm:text-base text-muted-foreground break-words">{item.description}</p>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub Repositories Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="text-center mb-6 sm:mb-8 px-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl mb-3 sm:mb-4 break-words">Our GitHub Repositories</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto break-words">
              Explore our open source repositories, ranked by stars. Find the tools and frameworks that power the next
              generation of AI systems.
            </p>
          </div>

          <GitHubRepositories organization="The-Swarm-Corporation" />
        </motion.div>

        {/* How to Contribute */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="text-center mb-6 sm:mb-8 px-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl mb-3 sm:mb-4 break-words">How to Contribute</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto break-words">
              Join our community of contributors and help shape the future of multi-agent AI systems.
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "1",
                title: "Explore Repositories",
                description: "Browse our GitHub repositories to find projects that interest you.",
                icon: Github,
              },
              {
                step: "2",
                title: "Fork & Clone",
                description: "Fork the repository and clone it to your local machine to start working.",
                icon: GitBranch,
              },
              {
                step: "3",
                title: "Make Changes",
                description: "Implement features, fix bugs, or improve documentation.",
                icon: Code,
              },
              {
                step: "4",
                title: "Submit PR",
                description: "Create a pull request with your changes for review and inclusion.",
                icon: Star,
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 p-4 sm:p-6 backdrop-blur-sm min-w-0"
              >
                <div className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-500/20 text-red-500 font-bold">
                  {item.step}
                </div>
                <div className="relative">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 mb-4">
                    <item.icon className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 break-words">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground break-words">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 px-4 sm:px-6 py-8 sm:py-12 backdrop-blur-sm">
            {/* Glowing orb effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[100px]" />
            </div>

            <div className="relative max-w-3xl mx-auto text-center px-1">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl mb-4 sm:mb-6 break-words">
                Ready to Join the Open Source Movement?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 break-words">
                Contribute to our repositories, join our community, and help us build the future of AI together.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4">
                <a
                  href="https://github.com/The-Swarm-Corporation"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: "relative", zIndex: 10 }}
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white min-h-[44px] h-12 px-6 py-3 w-full sm:w-auto touch-manipulation"
                >
                  <Github className="mr-2 h-5 w-5 flex-shrink-0" />
                  Explore Repositories
                </a>
                <a
                  href="https://docs.swarms.world/en/latest/swarms/contributing/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: "relative", zIndex: 10 }}
                  className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-600 text-red-600 hover:bg-red-600/10 min-h-[44px] h-12 px-6 py-3 w-full sm:w-auto touch-manipulation"
                >
                  <BookOpen className="mr-2 h-5 w-5 flex-shrink-0" />
                  Contribution Guidelines
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-red-500/20 py-8">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Swarms AI. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/The-Swarm-Corporation"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
              >
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
