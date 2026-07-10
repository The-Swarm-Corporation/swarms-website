"use client"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Code,
  ExternalLink,
  Github,
  GitBranch,
  GitFork,
  Globe,
  Search,
  Star,
  Users,
} from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
}

const missionPillars = [
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
]

const contributionSteps = [
  {
    step: "01",
    title: "Explore Repositories",
    description: "Browse our GitHub repositories to find projects that interest you.",
    icon: Github,
  },
  {
    step: "02",
    title: "Fork & Clone",
    description: "Fork the repository and clone it to your local machine to start working.",
    icon: GitBranch,
  },
  {
    step: "03",
    title: "Make Changes",
    description: "Implement features, fix bugs, or improve documentation.",
    icon: Code,
  },
  {
    step: "04",
    title: "Submit PR",
    description: "Create a pull request with your changes for review and inclusion.",
    icon: Star,
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description?: string
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-7xl sm:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
        {eyebrow}
      </p>
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

function OpenSourceRepositories({ organization }: { organization: string }) {
  const [repositories, setRepositories] = useState<Repository[]>([])
  const [filteredRepositories, setFilteredRepositories] = useState<Repository[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const repositoriesPerPage = 6

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch(
          `https://api.github.com/orgs/${organization}/repos?per_page=100&sort=stars&direction=desc`,
        )

        if (!response.ok) {
          throw new Error(`Failed to fetch repositories: ${response.status}`)
        }

        const data = await response.json()
        setRepositories(data)
        setFilteredRepositories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred")
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepositories()
  }, [organization])

  useEffect(() => {
    const filtered = repositories.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (repo.topics && repo.topics.some((topic) => topic.toLowerCase().includes(searchQuery.toLowerCase()))),
    )

    setFilteredRepositories(filtered)
    setCurrentPage(1)
  }, [searchQuery, repositories])

  const totalPages = Math.max(1, Math.ceil(filteredRepositories.length / repositoriesPerPage))
  const indexOfLastRepo = currentPage * repositoriesPerPage
  const indexOfFirstRepo = indexOfLastRepo - repositoriesPerPage
  const currentRepositories = filteredRepositories.slice(indexOfFirstRepo, indexOfLastRepo)

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
    document.getElementById("repositories-section")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div id="repositories-section">
      <div className="relative mx-auto mb-8 max-w-md sm:mb-10">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <Input
          type="text"
          placeholder="Search repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-11 rounded-full border-white/[0.14] bg-[#0a0a0a] pl-10 text-sm text-white placeholder:text-white/40 focus-visible:ring-white/20"
        />
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="animate-pulse space-y-3 bg-black p-5 sm:p-8">
              <div className="h-5 w-2/3 rounded bg-white/[0.08]" />
              <div className="h-3 w-full rounded bg-white/[0.06]" />
              <div className="h-3 w-5/6 rounded bg-white/[0.06]" />
              <div className="flex gap-4 pt-4">
                <div className="h-4 w-12 rounded bg-white/[0.06]" />
                <div className="h-4 w-12 rounded bg-white/[0.06]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg border border-white/[0.08] bg-black p-8 text-center">
          <p className="mb-2 text-base font-medium text-white">Failed to load repositories</p>
          <p className="text-sm text-white/50">{error}</p>
        </div>
      ) : filteredRepositories.length === 0 ? (
        <div className="rounded-lg border border-white/[0.08] bg-black p-8 text-center">
          <p className="mb-2 text-base font-medium text-white">No repositories found</p>
          <p className="text-sm text-white/50">Try adjusting your search query</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2 lg:grid-cols-3">
            {currentRepositories.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-[200px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-1.5 text-base font-medium text-white">
                      {repo.name}
                      <ExternalLink className="h-3.5 w-3.5 text-white/40 transition-colors group-hover:text-white/70" />
                    </h3>
                  </div>
                  {repo.language && (
                    <span className="mb-3 inline-block rounded-full border border-white/[0.12] px-2.5 py-0.5 text-[11px] font-medium text-white/50">
                      {repo.language}
                    </span>
                  )}
                  <p className="text-sm font-normal leading-relaxed text-white/50">
                    {repo.description || "No description provided"}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs text-white/50">
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-3.5 w-3.5" />
                    {repo.stargazers_count.toLocaleString()}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <GitFork className="h-3.5 w-3.5" />
                    {repo.forks_count.toLocaleString()}
                  </span>
                </div>
              </a>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center sm:mt-10">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-9 w-9 rounded-full border-white/[0.14] bg-black text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    onClick={() => handlePageChange(page)}
                    className={
                      currentPage === page
                        ? "h-9 w-9 rounded-full bg-white p-0 text-sm font-medium text-black hover:bg-neutral-200"
                        : "h-9 w-9 rounded-full border-white/[0.14] bg-black p-0 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                    }
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-9 w-9 rounded-full border-white/[0.14] bg-black text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white disabled:opacity-30"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default function OpenSourceClientPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Open Source
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Advancing AI through open research.
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Explore our open source repositories and join the community of
                researchers and developers building the future of multi-agent AI
                systems.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a
                    href="https://github.com/The-Swarm-Corporation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-5 w-5" />
                    View on GitHub
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a
                    href="https://discord.gg/EamjgSaEQf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Discord className="mr-2 h-5 w-5" />
                    Join Our Community
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Our Mission"
              title="Built in the open."
              description="At Swarms AI, we believe that open collaboration accelerates innovation. Our commitment to open source research drives the development of cutting-edge multi-agent systems that are accessible to everyone."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {missionPillars.map((item) => (
                <div
                  key={item.title}
                  className="group bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <item.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-white">{item.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* REPOSITORIES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="GitHub"
              title="Our repositories."
              description="Explore our open source repositories, ranked by stars. Find the tools and frameworks that power the next generation of AI systems."
            />

            <OpenSourceRepositories organization="The-Swarm-Corporation" />
          </div>
        </section>

        {/* HOW TO CONTRIBUTE */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Get Involved"
              title="How to contribute."
              description="Join our community of contributors and help shape the future of multi-agent AI systems."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {contributionSteps.map((item) => (
                <div
                  key={item.step}
                  className="group relative bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <p className="mb-6 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    {item.step}
                  </p>
                  <item.icon
                    className="mb-4 h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <h3 className="mb-2 text-base font-medium text-white">{item.title}</h3>
                  <p className="text-sm font-normal leading-relaxed text-white/50">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
            >
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  Ready to join the open source movement?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Contribute to our repositories, join our community, and help us
                  build the future of AI together.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a
                    href="https://github.com/The-Swarm-Corporation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" />
                    Explore Repositories
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a
                    href="https://docs.swarms.world/community/contributing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="mr-2 h-4 w-4" />
                    Contribution Guidelines
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
