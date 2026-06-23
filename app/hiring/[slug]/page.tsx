import { Navigation } from "@/components/navigation"
import { positions, getPositionBySlug } from "@/lib/positions"
import { notFound } from "next/navigation"
import Link from "next/link"
import { 
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Briefcase,
  CheckCircle
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
      title: 'Position Not Found - The Swarms Corporation',
    }
  }
  
  return {
    title: `${position.title} - Careers - The Swarms Corporation`,
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

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd3f1c_WBVoBm5P_IHwxVFxeEFRy3RbiDslj91o5CTknsca5g/viewform?usp=sf_link'

export default async function PositionPage({ params }: PageProps) {
  const { slug } = await params
  const position = getPositionBySlug(slug)
  
  if (!position) {
    notFound()
  }
  
  const PositionIcon = position.icon
  
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-black text-white">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-red-950/10 to-black">
          <div className="max-w-4xl mx-auto">
            {/* Back Link */}
            <Link 
              href="/hiring"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>All positions</span>
            </Link>
            
            {/* Header */}
            <div className="flex items-start gap-6 mb-8">
              <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex-shrink-0">
                <PositionIcon className="w-8 h-8 text-red-400" />
              </div>
              <div>
                <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  {position.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-400">
                  <span className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-red-400" />
                    {position.department}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-red-400" />
                    {position.type}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    {position.location}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Mission Statement */}
            <div className="bg-gradient-to-br from-red-950/10 to-black border border-red-500/20 rounded-2xl p-8 mb-8">
              <p className="text-xl sm:text-2xl text-gray-200 leading-relaxed font-light">
                Our mission is to <span className="text-red-400 font-medium">build infrastructure for the agent economy</span>. We are creating autonomous agents that collaborate to simulate entire industries and civilizations.
              </p>
            </div>
            
            {/* Apply Button */}
            <div className="flex justify-start">
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 hover:scale-[1.02] hover:bg-red-700"
              >
                Apply for this role
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Content Sections */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* About the Role */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                About the role
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed font-light">
                {position.aboutRole}
              </p>
            </div>
            
            {/* What you'll do */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                What you&apos;ll do
              </h2>
              <ul className="space-y-4">
                {position.whatYoullDo.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="p-1 bg-red-500/10 border border-red-500/30 rounded-lg mt-1 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-lg text-gray-300 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* You may be a fit if */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                You may be a fit if
              </h2>
              <ul className="space-y-4">
                {position.youMayBeAFitIf.map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-3 flex-shrink-0" />
                    <span className="text-lg text-gray-300 leading-relaxed font-light">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        
        {/* Apply Section */}
        <section className="py-16 px-4 bg-gradient-to-b from-red-950/5 to-black">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-red-950/10 to-black border border-red-500/20 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                Apply for this role
              </h2>
              <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
                Ready to help build infrastructure for the agent economy? Submit your application and we&apos;ll be in touch soon.
              </p>
              <a 
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-all duration-500 hover:scale-[1.02] hover:bg-red-700"
              >
                Apply Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
              </a>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <section className="py-12 px-4 border-t border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <Link 
              href="/hiring"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View all open positions</span>
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}