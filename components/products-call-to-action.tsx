"use client"

import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProductsCallToAction() {
  return (
    <section className="relative bg-black py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(239,68,68,0.12)_0%,_rgba(0,0,0,0)_55%)]"
          />
          <div className="relative z-10 px-6 sm:px-10 md:px-14 py-12 sm:py-16 md:py-20 text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Get started today
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Sign up now and get $5 in free API credits. Join the marketplace and start building with Swarms.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center pt-2">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 w-full sm:w-auto font-bold text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7"
                asChild
              >
                <a href="https://swarms.world/signin" target="_blank" rel="noopener noreferrer">
                  Sign up now
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/20 text-white hover:bg-white/10 w-full sm:w-auto font-normal text-sm sm:text-base md:text-lg px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 bg-transparent backdrop-blur-sm"
                asChild
              >
                <a href="https://swarms.world" target="_blank" rel="noopener noreferrer">
                  Join marketplace
                  <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
