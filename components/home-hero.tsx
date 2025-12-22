"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useState, useEffect } from "react"

export function HomeHero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <motion.div
      className="relative overflow-hidden bg-black min-h-screen flex items-center"
      initial={{ opacity: 0 }}
      animate={mounted ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-30 z-0"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/swarms_characters_video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 w-full h-full bg-black/20 md:bg-black/15 z-10" />

      <div className="container relative px-4 sm:px-6 lg:px-8 z-50 w-full">
        <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12 py-16 md:py-24 text-center max-w-6xl mx-auto">
          <motion.div
            className="space-y-6 md:space-y-8 select-text w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1
              id="hero-title"
              className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-bold text-white leading-none"
              style={{ fontSize: 'clamp(3rem, 12vw, 14rem)' }}
            >
              swarms
            </h1>

            <p className="text-xl md:text-2xl lg:text-4xl text-white/80 max-w-4xl mx-auto font-medium leading-tight">
              The Enterprise-Grade Multi-Agent Infrastructure Stack
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full max-w-2xl mx-auto relative z-10 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <Button
              size="lg"
              className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7"
              asChild
            >
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Get started with Swarms AI on GitHub"
              >
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 bg-transparent backdrop-blur-sm"
              asChild
            >
              <a
                href="https://docs.swarms.world"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Swarms Documentation"
              >
                <span>Documentation</span>
                <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

