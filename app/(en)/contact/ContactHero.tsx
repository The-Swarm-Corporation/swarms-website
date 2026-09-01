"use client"

import { motion } from "framer-motion"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function ContactHero() {
    return (
        <section className="relative flex min-h-[80vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
            />

            <div className="container relative w-full px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                >
                    <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                        Contact
                    </p>
                    <h1
                        className="font-bold leading-[0.95] tracking-tighter text-white"
                        style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
                    >
                        Get in touch
                    </h1>
                    <p className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/50 sm:mt-8 sm:text-lg">
                        Support, sales, or just hello, here's every way to reach us.
                    </p>
                </motion.div>
            </div>
        </section>
    )
}