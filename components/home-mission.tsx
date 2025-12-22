"use client"

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion"
import { useRef } from "react"

export function HomeMission() {
  const prefersReducedMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 30,
    damping: 20,
    restDelta: 0.001,
  })

  const contentOpacity = prefersReducedMotion
    ? 1
    : useTransform(smoothProgress, [0.05, 0.2, 0.85, 0.98], [0, 1, 1, 0])

  const contentY = prefersReducedMotion ? 0 : useTransform(smoothProgress, [0.05, 0.25], [24, 0])
  const contentScale = prefersReducedMotion ? 1 : useTransform(smoothProgress, [0.08, 0.3], [0.98, 1])

  const glowOpacity = prefersReducedMotion
    ? 0.2
    : useTransform(smoothProgress, [0, 0.5, 1], [0.08, 0.22, 0.08])

  const glowScale = prefersReducedMotion ? 1 : useTransform(smoothProgress, [0, 1], [0.95, 1.05])
  const shimmerX = prefersReducedMotion ? "0%" : useTransform(smoothProgress, [0, 1], ["-25%", "25%"])

  return (
    <motion.section
      ref={sectionRef}
      className="relative bg-black min-h-screen w-full flex items-center justify-center overflow-hidden"
    >
      {/* Apple-ish atmospheric background */}
      <motion.div
        aria-hidden="true"
        style={{ opacity: glowOpacity, scale: glowScale }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -top-40 left-1/2 h-[680px] w-[680px] -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-48 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.08)_0%,_rgba(0,0,0,0)_55%)]" />
      </motion.div>

      {/* Subtle hairlines + vignette */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.55)_70%,_rgba(0,0,0,0.85)_100%)]" />
      </div>

      <div className="container px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <motion.div
          style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="flex flex-col items-center gap-4 md:gap-5 mb-10 md:mb-14">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-white/20" />
              <p className="text-sm md:text-base text-white/55 tracking-[0.24em] uppercase font-semibold">
                <span className="text-white font-bold">Our mission</span>
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[1.06] tracking-tight text-white">
            <motion.span
              className="block"
              initial={prefersReducedMotion ? false : { opacity: 0, filter: "blur(10px)" }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Build the infrastructure
            </motion.span>
            <motion.span
              className="block text-white/55 font-light mt-3 md:mt-5"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 8, filter: "blur(10px)" }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              necessary for the
            </motion.span>
            <motion.span
              className="block mt-6 md:mt-9"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10, filter: "blur(14px)" }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 1.0, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="relative inline-block">
                {/* shimmer highlight (very subtle) */}
                <motion.span
                  aria-hidden="true"
                  style={{ x: shimmerX }}
                  className="pointer-events-none absolute -inset-y-2 -inset-x-8 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl"
                />
                <span className="font-semibold bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                  multi-trillion dollar
                </span>
              </span>
              <span className="block mt-2 md:mt-4">
                <span className="font-semibold bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                  agent economy
                </span>
              </span>
            </motion.span>
          </h2>

          <p className="mt-10 md:mt-14 text-base md:text-lg text-white/45 max-w-2xl mx-auto font-normal leading-relaxed">
            Our stack prioritizes performance, reliability, and scalability, serving as the foundation for teams shipping production-grade autonomous systems.
          </p>
        </motion.div>
      </div>
    </motion.section>
  )
}

