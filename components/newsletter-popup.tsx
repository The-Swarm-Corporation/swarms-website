"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ArrowRight, Check, X } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const BENEFITS = ["Latest updates", "Tutorials", "Events", "Research news"]

interface NewsletterPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterPopup({ isOpen, onClose }: NewsletterPopupProps) {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")
  const dialogRef = useRef<HTMLDivElement>(null)

  // Escape closes, and the page behind the modal stops scrolling while it is up.
  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", onKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Remember the subscription so the site greets them as subscribed
        // (landing-page section) and never re-prompts.
        localStorage.setItem("swarms-newsletter-subscribed", email.trim())
        setIsSuccess(true)
        setTimeout(() => {
          onClose()
          setIsSuccess(false)
          setEmail("")
          setFirstName("")
          setLastName("")
        }, 3000)
      } else {
        setError(data.error?.message || "Something went wrong")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
            onClick={onClose}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="newsletter-popup-title"
            className="relative w-full max-w-lg overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] shadow-2xl"
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.35, ease }}
          >
            {/* Hairline grid, the same motif the hero uses */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_10%,transparent_100%)]"
            />

            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 rounded-lg p-1.5 text-white/40 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative p-6 sm:p-10">
              {!isSuccess ? (
                <>
                  <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    Newsletter
                  </p>
                  <h2
                    id="newsletter-popup-title"
                    className="mt-4 text-2xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-3xl"
                  >
                    Join the Swarms community
                  </h2>
                  <p className="mt-4 text-sm font-normal leading-relaxed text-white/50 sm:text-base">
                    Updates, tutorials, events and research from the world&apos;s first
                    multi-agent research lab.
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {BENEFITS.map((benefit) => (
                      <li
                        key={benefit}
                        className="rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50"
                      >
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="First name"
                        aria-label="First name"
                        autoComplete="given-name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-white/40"
                      />
                      <input
                        type="text"
                        placeholder="Last name"
                        aria-label="Last name"
                        autoComplete="family-name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-white/40"
                      />
                    </div>

                    <input
                      type="email"
                      placeholder="you@company.com"
                      aria-label="Email address"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full rounded-full border border-white/15 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-white/40"
                    />

                    {error && (
                      <p role="alert" className="pt-1 text-sm text-white/60">
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting || !email}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/25 border-t-black" />
                          Subscribing
                        </>
                      ) : (
                        <>
                          Subscribe
                          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-5 text-xs leading-relaxed text-white/35">
                    No spam, unsubscribe at any time. We respect your privacy.
                  </p>
                </>
              ) : (
                <div className="py-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]">
                    <Check className="h-5 w-5 text-white/80" />
                  </div>
                  <h2
                    id="newsletter-popup-title"
                    className="mt-6 text-2xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-3xl"
                  >
                    You&apos;re in.
                  </h2>
                  <p className="mt-4 text-sm font-normal leading-relaxed text-white/50 sm:text-base">
                    Check your inbox for a confirmation. The next issue lands there too.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
