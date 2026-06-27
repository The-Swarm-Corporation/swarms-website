"use client"

import React, { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  MapPin,
  ArrowRight,
  ChevronDown,
  Briefcase,
  Clock
} from 'lucide-react'
import { positions, departments, type Department } from '@/lib/positions'

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link'

const HiringClientPage = () => {
  const [activeDepartment, setActiveDepartment] = useState<Department>('All')
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false)

  const filteredPositions = useMemo(() => {
    if (activeDepartment === 'All') return positions
    return positions.filter(p => p.department === activeDepartment)
  }, [activeDepartment])

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
      {/* Hero Section — Join Swarms */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-black to-black" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neutral-500/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_60%,transparent_110%)]" />
        </div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-6">
            Careers
          </p>
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent leading-[0.95] tracking-tight">
            Join Swarms
          </h1>
          <p className="mt-8 text-lg sm:text-xl text-neutral-400 font-light leading-relaxed max-w-xl mx-auto">
            Help us build the infrastructure for the agent economy.
          </p>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
              What we&apos;re building
            </h2>
          </div>
          <div className="space-y-6 text-lg text-neutral-300 leading-relaxed font-light text-center max-w-2xl mx-auto">
            <p>
              Our mission is to build the infrastructure necessary to bring the multi-trillion dollar agent economy to life. We do this by creating the best multi-agent tools, our marketplace, and a growing suite of products and research projects that let autonomous agents collaborate at scale.
            </p>
            <p>
              We seek exceptional individuals who combine deep technical expertise with the drive to push boundaries. We value humanity first, intense focus, research excellence, hard work, and creativity. If you are passionate about building the agent economy and have a track record of shipping complex systems, we want to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Positions Section — Open Roles */}
      <section className="py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Open Roles
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
              Find your place
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center">
            <div className="relative">
              <button
                onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
                className="flex items-center gap-2 px-5 py-2.5 bg-neutral-900 border border-white/10 rounded-full text-white hover:bg-neutral-800 transition-colors"
              >
                <span className="text-sm font-medium">{activeDepartment}</span>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${departmentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {departmentDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden z-10 min-w-[180px] shadow-2xl shadow-black/50 p-1.5">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setActiveDepartment(dept)
                        setDepartmentDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg transition-colors ${
                        activeDepartment === dept ? 'text-white bg-white/10' : 'text-neutral-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {dept}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Positions List */}
          <div className="flex flex-col gap-3 max-w-3xl mx-auto">
            {filteredPositions.map((position) => {
              const PositionIcon = position.icon
              return (
                <Link
                  key={position.slug}
                  href={`/hiring/${position.slug}`}
                  className="group relative flex items-center gap-5 bg-neutral-900/60 border border-white/10 rounded-2xl p-5 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300"
                >
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:bg-white/10 transition-all duration-300 flex-shrink-0">
                    <PositionIcon className="w-5 h-5 text-neutral-300" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-neutral-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-neutral-500" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-neutral-500" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                        {position.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex-shrink-0 flex items-center gap-2 text-neutral-500 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:inline">
                      Apply
                    </span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </Link>
              )
            })}
          </div>

          {filteredPositions.length === 0 && (
            <div className="text-center py-16 text-neutral-400">
              <p>No positions found for this department.</p>
              <button
                onClick={() => setActiveDepartment('All')}
                className="mt-4 text-white hover:text-neutral-300 transition-colors"
              >
                View all positions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 px-6 bg-black border-t border-white/5">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed font-light">
            Don&apos;t see a role that fits? We&apos;re always looking for exceptional talent.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200"
          >
            Submit General Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default HiringClientPage
