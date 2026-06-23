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
    <div className="min-h-screen bg-black text-white selection:bg-red-500/20 selection:text-red-200">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-red-900/5 via-black to-red-900/10" />
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-red-500/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-red-400/3 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_70%,transparent_110%)]" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black bg-gradient-to-r from-white via-red-100 to-red-300 bg-clip-text text-transparent leading-[0.95] tracking-tight">
            Advance the Agent Economy
          </h1>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black to-red-950/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-white">Our Mission</h2>
          <div className="space-y-4 text-gray-300 leading-relaxed">
            <p>
              We are building the infrastructure for the agent economy. Our work focuses on creating autonomous agents that collaborate to simulate entire industries and civilizations, enabling a future where AI agents work together to solve complex problems at scale.
            </p>
            <p>
              We seek exceptional individuals who combine deep technical expertise with the drive to push boundaries. We value humanity first, intense focus, research excellence, hard work, and creativity. If you are passionate about building infrastructure for the agent economy and have a track record of shipping complex systems, we want to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-red-950/5">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
              Open roles
            </h2>
          </div>
          
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <div className="relative">
              <button
                onClick={() => setDepartmentDropdownOpen(!departmentDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg text-white hover:bg-red-500/20 transition-colors"
              >
                <span>{activeDepartment}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${departmentDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {departmentDropdownOpen && (
                <div className="absolute top-full mt-2 left-0 bg-black border border-red-500/30 rounded-lg overflow-hidden z-10 min-w-[160px]">
                  {departments.map((dept) => (
                    <button
                      key={dept}
                      onClick={() => {
                        setActiveDepartment(dept)
                        setDepartmentDropdownOpen(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-red-500/10 transition-colors ${
                        activeDepartment === dept ? 'text-red-400 bg-red-500/10' : 'text-gray-300'
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
          <div className="flex flex-col gap-4 max-w-3xl mx-auto">
            {filteredPositions.map((position) => {
              const PositionIcon = position.icon
              return (
                <Link
                  key={position.slug}
                  href={`/hiring/${position.slug}`}
                  className="group relative flex items-center gap-5 bg-gradient-to-br from-red-950/5 to-black border border-red-500/20 rounded-xl p-5 hover:border-red-500/40 transition-all duration-500"
                >
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg group-hover:bg-red-500/20 group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                    <PositionIcon className="w-5 h-5 text-red-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent mb-1">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5 text-red-400/70" />
                        {position.department}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-red-400/70" />
                        {position.type}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-red-400/70" />
                        {position.location}
                      </span>
                    </div>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex-shrink-0">
                    <span className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium text-sm">
                      Apply
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
          
          {filteredPositions.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <p>No positions found for this department.</p>
              <button
                onClick={() => setActiveDepartment('All')}
                className="mt-4 text-red-400 hover:text-red-300 transition-colors"
              >
                View all positions
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 bg-black">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-400 mb-6 leading-relaxed font-light">
            Don&apos;t see a role that fits? We&apos;re always looking for exceptional talent.
          </p>
          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 hover:scale-[1.02] hover:bg-red-700"
          >
            Submit General Application
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </a>
        </div>
      </section>
    </div>
  )
}

export default HiringClientPage
