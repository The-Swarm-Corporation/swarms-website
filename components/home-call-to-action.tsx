"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"

export function HomeCallToAction() {
  return (
    <div className="container py-24 md:py-32 lg:py-40 px-4 sm:px-6 bg-black">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-8 md:px-12 py-16 md:py-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 md:mb-8 leading-tight text-white">
            Ready to transform your enterprise
          </h2>

          <p className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-normal leading-relaxed mb-10 md:mb-12">
            Join thousands of developers building the future of AI with the most advanced multi-agent framework ever created
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-black hover:bg-white/90 font-bold w-full sm:w-auto px-8 py-6" asChild>
              <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-transparent w-full sm:w-auto px-8 py-6" asChild>
              <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                <span>View Documentation</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

