"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useRef, useState, useEffect } from "react"

const cookbookResources = [
  {
    title: "Examples Overview",
    description: "Complete examples directory with comprehensive guides and tutorials",
    link: "https://docs.swarms.world/en/latest/examples/",
    badge: "GUIDES"
  },
  {
    title: "Cookbook Index",
    description: "Curated example collection with best practices and patterns",
    link: "https://docs.swarms.world/en/latest/examples/cookbook_index/",
    badge: "COOKBOOK"
  },
  {
    title: "Paper Implementations",
    description: "Research paper implementations and academic examples",
    link: "https://docs.swarms.world/en/latest/examples/paper_implementations/",
    badge: "RESEARCH"
  },
  {
    title: "Templates & Applications",
    description: "Reusable templates and production-ready applications",
    link: "https://docs.swarms.world/en/latest/examples/templates/",
    badge: "TEMPLATES"
  },
  {
    title: "Swarms API Examples",
    description: "Client setup, basic usage, and API integration examples for the Swarms platform",
    link: "https://docs.swarms.ai/docs/examples/examples/client-setup",
    badge: "API"
  },
  {
    title: "Marketplace API",
    description: "Create, update, and manage prompts and agents on the marketplace via API",
    link: "https://docs.swarms.ai/docs/marketplace/prompts-api",
    badge: "MARKETPLACE"
  }
]

export function HomeCookbook() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 5)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5)
    }
  }

  useEffect(() => {
    checkScrollButtons()
    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener('scroll', checkScrollButtons)
      window.addEventListener('resize', checkScrollButtons)
      return () => {
        container.removeEventListener('scroll', checkScrollButtons)
        window.removeEventListener('resize', checkScrollButtons)
      }
    }
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      })
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <div className="container py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 bg-black">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 md:mb-20 px-2 sm:px-0"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
          Cookbook & Templates
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-normal">
          Get started quickly with curated examples, templates, implementation guides, and API documentation
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-7xl mx-auto">
        {/* Left Navigation Button */}
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className={`absolute left-0 sm:-left-4 md:-left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center group shadow-lg ${
            canScrollLeft
              ? 'bg-white/10 border-white/20 hover:border-white/30 hover:bg-white/15 cursor-pointer'
              : 'bg-white/5 border-white/10 opacity-40 cursor-not-allowed'
          }`}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className={`absolute right-0 sm:-right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full backdrop-blur-xl border transition-all duration-300 flex items-center justify-center group shadow-lg ${
            canScrollRight
              ? 'bg-white/10 border-white/20 hover:border-white/30 hover:bg-white/15 cursor-pointer'
              : 'bg-white/5 border-white/10 opacity-40 cursor-not-allowed'
          }`}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-white transition-colors" />
        </button>

        {/* Scrollable Cards Container */}
        <motion.div
          ref={scrollContainerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-4 sm:gap-6 lg:gap-8 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {cookbookResources.map((resource, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[380px]"
            >
              <Card className="h-full border-white/10 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/20 transition-all duration-300 flex flex-col">
                <CardHeader className="p-6 sm:p-8 flex-grow">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="bg-white/10 border border-white/20 px-2.5 sm:px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-white">
                        {resource.badge}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-white font-bold mb-2 sm:mb-3">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="text-white/60 leading-relaxed text-sm sm:text-base">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full rounded-xl text-white/90 hover:text-white hover:bg-white/10 border border-white/20 bg-white/5 px-4 sm:px-6 py-2 sm:py-2.5 font-medium transition-all duration-200 hover:border-white/30 text-sm sm:text-base" 
                    asChild
                  >
                    <a 
                      href={resource.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center justify-center gap-2"
                    >
                      <span>Explore</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

    </div>
  )
}

