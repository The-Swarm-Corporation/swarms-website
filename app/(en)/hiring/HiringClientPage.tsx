"use client"

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  Github,
  CheckCircle
} from 'lucide-react'
import {
  positions,
  departments,
  developerCriteria,
  GOOGLE_FORM_URL,
  SWARMS_GITHUB_URL,
  SWARMS_RS_GITHUB_URL,
  type Department
} from '@/lib/positions'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Each page of the roles grid shows exactly this many rows of cards, so the
// page size follows the column count at the current breakpoint.
const ROWS_PER_PAGE = 3

// Mirrors the grid's responsive classes: sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
const GRID_BREAKPOINTS = [
  { query: '(min-width: 1280px)', columns: 4 },
  { query: '(min-width: 1024px)', columns: 3 },
  { query: '(min-width: 640px)', columns: 2 },
]

function useGridColumns() {
  const [columns, setColumns] = useState(4)

  useEffect(() => {
    const mediaQueries = GRID_BREAKPOINTS.map((b) => window.matchMedia(b.query))
    const update = () => {
      const match = mediaQueries.findIndex((mq) => mq.matches)
      setColumns(match === -1 ? 1 : GRID_BREAKPOINTS[match].columns)
    }
    update()
    mediaQueries.forEach((mq) => mq.addEventListener('change', update))
    return () => mediaQueries.forEach((mq) => mq.removeEventListener('change', update))
  }, [])

  return columns
}

const values = [
  {
    title: 'Mission First',
    description:
      'Focus relentlessly on the objective: building and understanding large scale multi-agent systems that do economically useful work.',
  },
  {
    title: 'Move Fast',
    description:
      'Favor rapid iteration, decisive action, and learning through real-world testing rather than waiting for perfect certainty.',
  },
  {
    title: 'First-Principles Thinking',
    description:
      'Question assumptions, reduce problems to fundamentals, and find solutions from the ground up.',
  },
  {
    title: 'Own the Outcome',
    description:
      'Take responsibility for the result, solve problems across organizational boundaries, and hold a high bar for execution.',
  },
  {
    title: 'Build What Others Say Is Impossible',
    description:
      'Pursue ambitious technical goals, embrace difficult problems, and refuse to let conventional constraints define what can be achieved.',
  },
]

const HiringClientPage = () => {
  const [activeDepartment, setActiveDepartment] = useState<Department>('All')
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)
  const columns = useGridColumns()
  const pageSize = columns * ROWS_PER_PAGE

  const filteredPositions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    return positions.filter((p) => {
      const matchesDepartment = activeDepartment === 'All' || p.department === activeDepartment
      if (!matchesDepartment) return false
      if (!query) return true
      const haystack = [
        p.title,
        p.department,
        p.type,
        p.location,
        p.description,
      ].join(' ').toLowerCase()
      return haystack.includes(query)
    })
  }, [activeDepartment, searchQuery])

  const totalPages = Math.max(1, Math.ceil(filteredPositions.length / pageSize))

  // Go back to the first page whenever the filters change.
  useEffect(() => {
    setPage(1)
  }, [activeDepartment, searchQuery])

  // Resizing changes the page size, which can leave the stored page out of range.
  const currentPage = Math.min(page, totalPages)

  const pagedPositions = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredPositions.slice(start, start + pageSize)
  }, [filteredPositions, currentPage, pageSize])

  const rangeStart = filteredPositions.length === 0 ? 0 : (currentPage - 1) * pageSize + 1
  const rangeEnd = Math.min(currentPage * pageSize, filteredPositions.length)

  const clearFilters = () => {
    setSearchQuery('')
    setActiveDepartment('All')
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
      {/* Hero Section */}
      <section className="relative flex min-h-[60vh] items-center overflow-hidden border-b border-white/[0.08] bg-black sm:min-h-[70vh]">
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
              Careers
            </p>
            <h1
              className="font-bold leading-[0.95] tracking-tighter text-white"
              style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
            >
              Join Swarms
            </h1>
            <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/50 sm:mt-8 sm:text-lg">
              Help us build the infrastructure for the agent economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="border-b border-white/[0.08] bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Our Mission
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              What we&apos;re building
            </h2>
            <div className="mt-8 space-y-6 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              <p>
                Our mission is to build the infrastructure necessary to bring
                the multi-trillion dollar agent economy to life. We do this
                by creating the best multi-agent tools, our marketplace, and
                a growing suite of products and research projects that let
                autonomous agents collaborate at scale.
              </p>
              <p>
                We seek exceptional individuals who combine deep technical
                expertise with the drive to push boundaries. We value
                humanity first, intense focus, research excellence, hard
                work, and creativity. If you are passionate about building
                the agent economy and have a track record of shipping
                complex systems, we want to hear from you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Who We're Looking For (developer positions) */}
      <section className="border-b border-white/[0.08] bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.div
            className="mx-auto max-w-3xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Developer Positions
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Who we&apos;re looking for
            </h2>
            <p className="mt-8 text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              We&apos;re looking to hire the world&apos;s best agentic and AI
              talent to work on agent infrastructure that hundreds of
              thousands of companies and people use every day. Before you
              apply, we look for:
            </p>

            <ul className="mx-auto mt-8 flex max-w-xl flex-col gap-3 text-left">
              {developerCriteria.map((criterion) => (
                <li
                  key={criterion}
                  className="flex items-start gap-4 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5"
                >
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-white/50" strokeWidth={1.5} />
                  <span className="text-base font-normal leading-relaxed text-white/70">
                    {criterion}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={SWARMS_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
              >
                <Github className="h-4 w-4" />
                Swarms on GitHub
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a
                href={SWARMS_RS_GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
              >
                <Github className="h-4 w-4" />
                swarms-rs on GitHub
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-b border-white/[0.08] bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <motion.div
              className="mb-10 sm:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Our Values
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                What we value
              </h2>
            </motion.div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  className="grid grid-cols-1 gap-3 py-8 md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.4fr)] md:items-baseline md:gap-8 md:py-10"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {value.title}
                  </h3>
                  <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                    {value.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="border-b border-white/[0.08] bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            {/* Header with search at the top of the section */}
            <motion.div
              className="mb-8 flex flex-col gap-6 sm:mb-10 md:flex-row md:items-end md:justify-between"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div>
                <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Open Roles
                </p>
                <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                  Open Roles
                </h2>
              </div>

              <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center md:max-w-xl">
                {/* Search bar */}
                <div className="relative w-full flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search roles"
                    aria-label="Search roles"
                    className="w-full rounded-full border border-white/[0.14] bg-[#0a0a0a] py-2.5 pl-11 pr-10 text-sm text-white placeholder:text-white/40 transition-colors focus:border-white/30 focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-white/40 transition-colors hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                <div className="relative flex-shrink-0">
                  <button
                    onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
                    className="flex w-full items-center justify-between gap-2 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-5 py-2.5 text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] sm:w-auto"
                  >
                    <span className="text-sm font-medium">{activeDepartment}</span>
                    <ChevronDown className={`h-4 w-4 text-white/40 transition-transform ${departmentDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {departmentDropdownOpen && (
                    <div className="absolute left-0 top-full z-20 mt-2 min-w-[200px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-1.5 shadow-2xl shadow-black/50 sm:left-auto sm:right-0">
                      {departments.map((dept) => (
                        <button
                          key={dept}
                          onClick={() => {
                            setActiveDepartment(dept)
                            setDepartmentDropdownOpen(false)
                          }}
                          className={`w-full rounded-md px-4 py-2 text-left text-sm transition-colors ${
                            activeDepartment === dept ? 'bg-white/[0.08] text-white' : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          {dept}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Results count */}
            {filteredPositions.length > 0 && (
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                Showing {rangeStart}–{rangeEnd} of {filteredPositions.length} {filteredPositions.length === 1 ? 'role' : 'roles'}
              </p>
            )}

            {/* Positions grid: 3 rows per page, 3 or 4 cards per row on desktop */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {pagedPositions.map((position, index) => (
                <motion.div
                  key={position.slug}
                  className="h-full"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % columns) * 0.05, ease }}
                >
                  <Link
                    href={`/hiring/${position.slug}`}
                    className="group flex h-full min-h-[140px] flex-col justify-between gap-8 rounded-[28px] bg-[#141414] p-7 transition-all duration-500 ease-out hover:scale-[1.02] hover:bg-[#1a1a1a] hover:shadow-2xl hover:shadow-black/60 sm:min-h-[200px] sm:p-8"
                  >
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight text-white">
                      {position.title}
                    </h3>

                    <span className="flex h-9 w-9 items-center justify-center self-end rounded-full bg-white/[0.1] text-white transition-colors duration-300 group-hover:bg-white group-hover:text-black">
                      <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="flex items-center gap-1 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-4 py-2 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.14] disabled:hover:bg-[#0a0a0a]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <span className="px-2 text-sm text-white/50 sm:hidden">
                  {currentPage} / {totalPages}
                </span>

                <div className="hidden items-center gap-1.5 sm:flex">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                    <button
                      key={pageNumber}
                      onClick={() => setPage(pageNumber)}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={currentPage === pageNumber ? 'page' : undefined}
                      className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                        currentPage === pageNumber
                          ? 'bg-white text-black'
                          : 'border border-white/[0.14] bg-[#0a0a0a] text-white/50 hover:border-white/30 hover:text-white'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="flex items-center gap-1 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-4 py-2 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.14] disabled:hover:bg-[#0a0a0a]"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}

            {filteredPositions.length === 0 && (
              <div className="rounded-lg border border-white/[0.08] py-16 text-center text-white/50">
                <p>No roles match your search.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-white transition-colors hover:text-white/70"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
            className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-8 text-center sm:p-12"
          >
            <p className="max-w-xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Don&apos;t see a role that fits? We&apos;re always looking for
              exceptional talent.
            </p>
            <a
              href={GOOGLE_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
            >
              Submit General Application
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default HiringClientPage
