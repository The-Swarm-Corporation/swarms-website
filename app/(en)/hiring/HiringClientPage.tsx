"use client"

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  MapPin,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Clock,
  Search,
  X
} from 'lucide-react'
import { positions, departments, GOOGLE_FORM_URL, type Department } from '@/lib/positions'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PAGE_SIZE = 6

const HiringClientPage = () => {
  const [activeDepartment, setActiveDepartment] = useState<Department>('All')
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

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

  const totalPages = Math.max(1, Math.ceil(filteredPositions.length / PAGE_SIZE))

  // Keep the current page in range whenever the filters change.
  useEffect(() => {
    setCurrentPage(1)
  }, [activeDepartment, searchQuery])

  const pagedPositions = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE
    return filteredPositions.slice(start, start + PAGE_SIZE)
  }, [filteredPositions, currentPage])

  const rangeStart = filteredPositions.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredPositions.length)

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

      {/* Positions Section */}
      <section className="border-b border-white/[0.08] bg-black">
        <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <motion.div
            className="mx-auto mb-10 max-w-3xl text-center sm:mb-14"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Open Roles
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Find your place
            </h2>
          </motion.div>

          {/* Filters */}
          <div className="mx-auto mb-6 flex max-w-3xl flex-col gap-4 sm:flex-row sm:items-center">
            {/* Search bar */}
            <div className="relative w-full flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search roles by title, department, or location..."
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
                <div className="absolute left-0 top-full z-10 mt-2 min-w-[180px] overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-1.5 shadow-2xl shadow-black/50">
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

          {/* Results count */}
          {filteredPositions.length > 0 && (
            <p className="mb-6 text-center text-sm text-white/40">
              Showing {rangeStart}–{rangeEnd} of {filteredPositions.length} {filteredPositions.length === 1 ? 'role' : 'roles'}
            </p>
          )}

          {/* Positions List */}
          <div className="mx-auto flex max-w-3xl flex-col gap-3">
            {pagedPositions.map((position, index) => {
              const PositionIcon = position.icon
              return (
                <motion.div
                  key={position.slug}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease }}
                >
                  <Link
                    href={`/hiring/${position.slug}`}
                    className="group relative flex items-center gap-5 rounded-lg border border-white/[0.08] bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a]"
                  >
                    <div className="flex-shrink-0 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-3 transition-colors duration-300 group-hover:border-white/20">
                      <PositionIcon className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white" strokeWidth={1.5} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-white">
                        {position.title}
                      </h3>
                      <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-white/50">
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="h-3.5 w-3.5 text-white/30" />
                          {position.department}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5 text-white/30" />
                          {position.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-white/30" />
                          {position.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-shrink-0 items-center gap-2 text-white/40 transition-colors duration-300 group-hover:text-white">
                      <span className="hidden text-sm font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:inline">
                        Apply
                      </span>
                      <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                aria-label="Previous page"
                className="flex items-center gap-1 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-4 py-2 text-sm text-white transition-colors hover:border-white/30 hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-white/[0.14] disabled:hover:bg-[#0a0a0a]"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? 'page' : undefined}
                    className={`h-9 w-9 rounded-full text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-white text-black'
                        : 'border border-white/[0.14] bg-[#0a0a0a] text-white/50 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
            <div className="py-16 text-center text-white/50">
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
