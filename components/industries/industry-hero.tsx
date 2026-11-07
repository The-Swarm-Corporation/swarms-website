"use client"

import { motion } from "framer-motion"
import { ArrowRight, ArrowUpRight, Check } from "lucide-react"
import Link from "next/link"
import type { ReactNode } from "react"

import { Button } from "@/components/ui/button"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function IndustryHero({
  title,
  description,
  bullets,
  primary,
  secondary,
  visual,
  accent,
}: {
  /** Kept for the pages' data files; the hero no longer draws a badge. */
  eyebrow?: string
  title: string
  description: string
  bullets: string[]
  primary: { label: string; href: string }
  secondary: { label: string; href: string; external?: boolean }
  /** The page's own live visualization, rendered beside the copy. */
  visual: ReactNode
  accent: string
}) {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden border-b border-white/[0.08] bg-black">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_60%_40%,black_20%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: `${accent}14` }}
      />

      <div className="relative w-full px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:px-12 lg:pb-24 lg:pt-32 xl:px-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-14">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
              className="font-bold leading-[1.05] tracking-tighter text-white"
              style={{ fontSize: "clamp(1.875rem, 3vw, 2.75rem)" }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
              className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/55 sm:text-lg"
            >
              {description}
            </motion.p>

            <motion.ul
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="mt-7 space-y-2.5"
            >
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-white/70 sm:text-[15px]">
                  <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accent }} aria-hidden="true" />
                  <span>{b}</span>
                </li>
              ))}
            </motion.ul>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button className="h-11 rounded-full px-6 text-sm font-medium" asChild>
                <a href={primary.href} target="_blank" rel="noopener noreferrer">
                  {primary.label}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-11 rounded-full border-white/15 bg-transparent px-6 text-sm font-medium text-white hover:bg-white/[0.06]"
                asChild
              >
                {secondary.external ? (
                  <a href={secondary.href} target="_blank" rel="noopener noreferrer">
                    {secondary.label}
                    <ArrowUpRight className="ml-1 h-4 w-4 text-white/50" />
                  </a>
                ) : (
                  <Link href={secondary.href}>
                    {secondary.label}
                    <ArrowRight className="ml-1 h-4 w-4 text-white/50" />
                  </Link>
                )}
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="min-w-0"
          >
            {visual}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
