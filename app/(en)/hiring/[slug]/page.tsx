import { Navigation } from "@/components/navigation"
import {
  positions,
  getPositionBySlug,
  getApplyMethod,
  developerCriteria,
  APPLICATION_EMAIL,
  SWARMS_GITHUB_URL,
  SWARMS_RS_GITHUB_URL,
} from "@/lib/positions"
import { notFound } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle,
  Github
} from 'lucide-react'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return positions.map((position) => ({
    slug: position.slug,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const position = getPositionBySlug(slug)

  if (!position) {
    return {
      title: { absolute: 'Position Not Found - The Swarms Corporation' },
    }
  }

  return {
    title: { absolute: `${position.title} - Careers - The Swarms Corporation` },
    description: `Join The Swarms Corporation as a ${position.title}. ${position.description}`,
    keywords: [
      'careers',
      'jobs',
      'hiring',
      position.title.toLowerCase(),
      'agent economy',
      'AI',
    ],
    openGraph: {
      title: `${position.title} - The Swarms Corporation`,
      description: `Join us as a ${position.title}. ${position.description}`,
      type: 'website',
    },
  }
}

export default async function PositionPage({ params }: PageProps) {
  const { slug } = await params
  const position = getPositionBySlug(slug)

  if (!position) {
    notFound()
  }

  const apply = getApplyMethod(position)
  // Open the application form in a new tab; let mailto links open the mail client in place.
  const applyTargetProps = apply.type === 'form'
    ? { target: '_blank', rel: 'noopener noreferrer' as const }
    : {}

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white antialiased">
        {/* Hero Section */}
        <section className="relative px-6 py-24 sm:py-28 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/60 via-black to-black" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-neutral-500/10 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_60%,transparent_110%)]" />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            {/* Back Link */}
            <Link
              href="/hiring"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-10"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">All positions</span>
            </Link>

            {/* Header */}
            <div className="mb-8">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-3">
                Careers
              </p>
              <h1 className="text-4xl sm:text-5xl font-semibold mb-5 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight leading-[0.95]">
                {position.title}
              </h1>
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-neutral-400">
                <span className="flex items-center gap-1.5">
                  <Briefcase className="w-4 h-4 text-neutral-500" />
                  {position.department}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-neutral-500" />
                  {position.type}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                  {position.location}
                </span>
              </div>
            </div>

            {/* Apply Button */}
            <div className="mt-10 flex justify-start">
              <a
                href={apply.href}
                {...applyTargetProps}
                className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200"
              >
                Apply for this role
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </section>

        {/* Content Sections */}
        <section className="py-24 px-6 bg-black border-t border-white/5">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* About the Role */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Overview
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                About the role
              </h2>
              <p className="text-lg text-neutral-300 leading-relaxed font-light">
                {position.aboutRole}
              </p>
            </div>

            {/* What you'll do */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Responsibilities
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                What you&apos;ll do
              </h2>
              <ul className="space-y-4">
                {position.whatYoullDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-1 bg-white/5 border border-white/10 rounded-lg mt-1 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-neutral-300" />
                    </div>
                    <span className="text-lg text-neutral-300 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* You may be a fit if */}
            <div>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                Requirements
              </p>
              <h2 className="text-3xl sm:text-4xl font-semibold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                You may be a fit if
              </h2>
              <ul className="space-y-4">
                {position.youMayBeAFitIf.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-lg text-neutral-300 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Who we're looking for (developer roles only) */}
            {position.department === 'Engineering' && (
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
                  Developer Positions
                </p>
                <h2 className="text-3xl sm:text-4xl font-semibold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
                  Who we&apos;re looking for
                </h2>
                <p className="text-lg text-neutral-300 leading-relaxed font-light mb-6">
                  Every developer role at Swarms starts with your open source
                  work. Before you apply, we look for:
                </p>
                <ul className="space-y-4">
                  {developerCriteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-4">
                      <div className="p-1 bg-white/5 border border-white/10 rounded-lg mt-1 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-neutral-300" />
                      </div>
                      <span className="text-lg text-neutral-300 leading-relaxed font-light">
                        {criterion}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SWARMS_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-neutral-200"
                  >
                    <Github className="w-4 h-4" />
                    Swarms on GitHub
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                  <a
                    href={SWARMS_RS_GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/[0.14] bg-[#0a0a0a] px-6 py-3 text-sm font-medium text-white transition-colors hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    <Github className="w-4 h-4" />
                    swarms-rs on GitHub
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Apply Section */}
        <section className="py-24 px-6 bg-black border-t border-white/5">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-neutral-500 mb-4">
              Join Us
            </p>
            <h2 className="text-4xl sm:text-5xl font-semibold mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent tracking-tight">
              Apply for this role
            </h2>
            <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
              {apply.type === 'email' ? (
                <>
                  Ready to help build infrastructure for the agent economy? Email us at{' '}
                  <a href={apply.href} className="text-white underline underline-offset-4 hover:text-neutral-300 transition-colors">
                    {APPLICATION_EMAIL}
                  </a>{' '}
                  and we&apos;ll be in touch soon.
                </>
              ) : (
                <>Ready to help build infrastructure for the agent economy? Submit your application and we&apos;ll be in touch soon.</>
              )}
            </p>
            <a
              href={apply.href}
              {...applyTargetProps}
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-medium text-base transition-all duration-300 hover:scale-[1.02] hover:bg-neutral-200"
            >
              {apply.type === 'email' ? 'Apply via Email' : 'Apply Now'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>
        </section>

        {/* Footer */}
        <section className="py-12 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/hiring"
              className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">View all open positions</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
