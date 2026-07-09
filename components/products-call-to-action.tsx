"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ProductsCallToAction() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
          className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
        >
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
              Ready to build?
            </h2>
            <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Sign up now and get $5 in free API credits. Join the marketplace
              and start building with Swarms.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button
              className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
              asChild
            >
              <a
                href="https://cloud.swarms.world/login"
                target="_blank"
                rel="noopener noreferrer"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              variant="outline"
              className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
              asChild
            >
              <a
                href="https://swarms.world"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join Marketplace
                <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
