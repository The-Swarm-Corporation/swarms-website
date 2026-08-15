"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Loader2 } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function AgentHQWaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/agenthq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setEmail("")
      } else {
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("AgentHQ waitlist signup error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-[100dvh] bg-black text-white"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <Navigation />

      <section className="relative flex min-h-[100dvh] items-center overflow-hidden bg-black">
        {/* Full-viewport game background */}
        <Image
          src="/agenthq_game_map.png"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
          aria-hidden
        />
        {/* Dark veil so the text stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-black/50"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/25 to-black/45"
        />

        <div
          className="container relative w-full px-4 sm:px-6 lg:px-8"
          style={{
            paddingLeft: "max(1rem, env(safe-area-inset-left))",
            paddingRight: "max(1rem, env(safe-area-inset-right))",
          }}
        >
          <div className="mx-auto flex max-w-3xl flex-col items-center py-24 text-center sm:py-28">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/60">
              Build. Manage. Research. Win.
            </p>

            <motion.h1
              className="font-bold leading-[0.95] tracking-tighter text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)]"
              style={{ fontSize: "clamp(2.75rem, 8vw, 5.5rem)" }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease }}
            >
              AgentHQ
            </motion.h1>

            <motion.p
              className="mt-6 max-w-xl text-base font-normal leading-relaxed text-white/80 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:mt-8 sm:text-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease }}
            >
              Build your own headquarters of AI agents: hire them, assign
              research, and grow your operation. Join the waitlist for early
              access.
            </motion.p>

            {/* Success Message */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 w-full max-w-lg rounded-lg border border-white/[0.18] bg-black/70 backdrop-blur-sm p-4 sm:mt-10 sm:p-5"
              >
                <div className="flex flex-col items-center justify-center gap-2 text-center sm:flex-row sm:gap-3 sm:text-left">
                  <CheckCircle
                    className="h-5 w-5 flex-shrink-0 text-white/70"
                    aria-hidden
                  />
                  <p className="text-sm font-medium text-white/80 sm:text-base">
                    You&apos;re on the list! We&apos;ll notify you when AgentHQ
                    is ready.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                id="agenthq-form-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                role="alert"
                className="mt-6 w-full max-w-lg rounded-lg border border-white/[0.18] bg-black/70 backdrop-blur-sm p-3 sm:mt-8 sm:p-4"
              >
                <p className="text-xs text-white/70 sm:text-sm">{error}</p>
              </motion.div>
            )}

            {/* Email Form */}
            {!showSuccess && (
              <motion.form
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
                onSubmit={handleSubmit}
                className="mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row"
              >
                <Input
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  aria-invalid={!!error}
                  aria-describedby={error ? "agenthq-form-error" : undefined}
                  className="h-12 min-h-[44px] w-full min-w-0 flex-1 rounded-lg border border-white/[0.18] bg-black/70 backdrop-blur-sm px-4 text-base text-white placeholder:text-white/50 focus:border-white/40 focus:outline-none focus-visible:ring-0 sm:h-14 sm:min-h-[48px] sm:px-6 sm:text-lg"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="h-12 min-h-[44px] w-full flex-shrink-0 rounded-full bg-white px-6 text-base font-medium text-black hover:bg-neutral-200 disabled:cursor-not-allowed disabled:opacity-50 sm:h-14 sm:min-h-[48px] sm:w-auto sm:px-8 sm:text-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2
                        className="mr-2 h-5 w-5 flex-shrink-0 animate-spin"
                        aria-hidden
                      />
                      <span>Submitting...</span>
                    </>
                  ) : (
                    "Get Early Access"
                  )}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
