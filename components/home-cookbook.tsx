"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"

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
  }
]

export function HomeCookbook() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setDirection(1)
      setCurrentIndex((prev) => (prev + 1) % cookbookResources.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9
    })
  }

  const swipeConfidenceThreshold = 10000
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = (newDirection: number) => {
    setDirection(newDirection)
    if (newDirection === 1) {
      setCurrentIndex((prev) => (prev + 1) % cookbookResources.length)
    } else {
      setCurrentIndex((prev) => (prev - 1 + cookbookResources.length) % cookbookResources.length)
    }
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
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
          Get started quickly with curated examples, templates, and implementation guides
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-0">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_e: MouseEvent | TouchEvent | PointerEvent, { offset, velocity }: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) => {
                const swipe = swipePower(offset.x, velocity.x)

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1)
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1)
                }
              }}
              className="w-full"
            >
              <Card className="h-full apple-card-hover border-white/10 bg-white/[0.02] mx-auto max-w-2xl">
                <CardHeader className="p-6 sm:p-8 md:p-10">
                  <div className="flex items-start justify-between mb-4 sm:mb-6">
                    <div className="bg-white/10 border border-white/20 px-2.5 sm:px-3 py-1 rounded-full">
                      <span className="text-xs font-bold text-white">
                        {cookbookResources[currentIndex].badge}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl sm:text-2xl text-white font-bold mb-2 sm:mb-3">
                    {cookbookResources[currentIndex].title}
                  </CardTitle>
                  <CardDescription className="text-white/60 leading-relaxed text-sm sm:text-base">
                    {cookbookResources[currentIndex].description}
                  </CardDescription>
                </CardHeader>
                <div className="px-6 sm:px-8 md:px-10 pb-6 sm:pb-8 md:pb-10">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="rounded-xl text-white/90 hover:text-white hover:bg-white/10 border border-white/20 bg-white/5 px-4 sm:px-6 py-2 sm:py-2.5 font-medium transition-all duration-200 hover:border-white/30 hover:scale-105 text-sm sm:text-base" 
                    asChild
                  >
                    <a 
                      href={cookbookResources[currentIndex].link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2"
                    >
                      <span>Get Started</span>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 sm:-left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
          aria-label="Previous card"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 sm:-right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all duration-300 flex items-center justify-center group"
          aria-label="Next card"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {cookbookResources.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1)
                setCurrentIndex(index)
                setIsAutoPlaying(false)
                setTimeout(() => setIsAutoPlaying(true), 10000)
              }}
              className="relative group"
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

