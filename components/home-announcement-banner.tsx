"use client"

import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function HomeAnnouncementBanner() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease }}
      className="mb-6 sm:mb-8"
    >
      <Link
        href="/blog/swarms-v15-akira-release"
        className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.04] py-1.5 pl-1.5 pr-3 text-xs backdrop-blur-md transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.07] sm:text-sm"
      >
        <span className="rounded-full border border-red-500/30 bg-red-500/10 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-red-400">
          New
        </span>
        <span className="text-white/80 transition-colors duration-200 group-hover:text-white">
          Swarms v15 &ldquo;Akira&rdquo; just shipped
        </span>
        <span className="hidden text-white/40 sm:inline">·</span>
        <span className="hidden text-white/55 transition-colors duration-200 group-hover:text-white/80 sm:inline">
          Read the changelog
        </span>
        <ArrowRight className="h-3.5 w-3.5 text-white/55 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/80" />
      </Link>
    </motion.div>
  )
}
