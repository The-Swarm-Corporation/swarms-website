"use client"

import { motion } from "framer-motion"
import { Card, CardHeader, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function ProductsCallToAction() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black border-t border-white/10">
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(63,63,70,0.35), transparent 60%)",
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.4 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      />

      <div className="container relative px-4 sm:px-6 lg:px-8 z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <Card className="apple-card-hover border-white/10 bg-white/[0.02]">
            <CardHeader className="p-12 md:p-16 text-center">
              <div className="space-y-8">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                  Get Started Today
                </h2>
                <CardDescription className="text-xl sm:text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  Sign up now and get $5 in free API credits. Join the marketplace and start building with Swarms.
                </CardDescription>
                <div className="flex flex-wrap justify-center gap-4 pt-6">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-medium rounded-xl h-14 px-10 text-base transition-all duration-200 active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://swarms.world/signin" target="_blank" rel="noopener noreferrer">
                      Sign Up Now
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/25 font-medium rounded-xl h-14 px-10 text-base transition-all duration-200 active:scale-[0.98]"
                    asChild
                  >
                    <a href="https://swarms.world" target="_blank" rel="noopener noreferrer">
                      Join Marketplace
                    </a>
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}






