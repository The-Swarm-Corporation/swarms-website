"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Loader2 } from "lucide-react"

export default function MobileWaitlistPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/mobile", {
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
      console.error("Mobile waitlist signup error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="min-h-[100dvh] min-h-[100svh] bg-black text-white relative overflow-x-hidden"
      style={{
        paddingLeft: "max(0.75rem, env(safe-area-inset-left))",
        paddingRight: "max(0.75rem, env(safe-area-inset-right))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <Navigation />

      {/* Background Image - mobile-optimized sizing */}
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url(/mobile_app_background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />

      {/* Main Content - flexible, touch-friendly layout; scrolls when viewport is short */}
      <div
        className="relative z-10 flex items-start sm:items-center justify-center min-h-[100dvh] min-h-[100svh] w-full max-w-full box-border overflow-y-auto overflow-x-hidden"
        style={{
          paddingTop: "max(5.5rem, calc(5rem + env(safe-area-inset-top)))",
          paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="w-full max-w-2xl mx-auto text-center px-3 min-[400px]:px-4 sm:px-6 md:px-8 flex flex-col items-center justify-center py-4 sm:py-8">
          {/* Logo/Icon - scales with viewport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3 min-[480px]:mb-4 sm:mb-5 flex-shrink-0"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 min-[380px]:w-16 min-[380px]:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
              <Image
                src="/logo.svg"
                alt="Swarms Logo"
                width={96}
                height={96}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </motion.div>

          {/* Headline - responsive type scale, no overflow */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl min-[360px]:text-3xl min-[480px]:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 min-[480px]:mb-3 leading-tight break-words overflow-hidden"
          >
            <span className="text-red-500">Swarms</span>{" "}
            <span className="inline">Mobile App</span>
          </motion.h1>

          {/* Sub-headline - readable on small screens */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm min-[360px]:text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 mb-5 min-[480px]:mb-6 sm:mb-8 max-w-full break-words leading-snug px-0.5"
          >
            Join the waitlist to be among the first to experience Swarms on
            mobile
          </motion.p>

          {/* Success Message - full width, readable */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full mb-5 sm:mb-8 p-4 min-[480px]:p-5 sm:p-6 bg-red-500/20 border border-red-500/50 rounded-xl backdrop-blur-sm"
            >
              <div className="flex flex-col min-[400px]:flex-row items-center justify-center gap-2 min-[400px]:gap-3 text-center min-[400px]:text-left">
                <CheckCircle
                  className="w-6 h-6 sm:w-7 sm:h-7 text-red-500 flex-shrink-0"
                  aria-hidden
                />
                <p className="text-red-400 font-semibold text-sm sm:text-base break-words">
                  You&apos;re on the list! We&apos;ll notify you when the app is
                  ready.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              id="mobile-form-error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              role="alert"
              className="w-full mb-4 sm:mb-6 p-3 min-[480px]:p-4 bg-red-500/20 border border-red-500/50 rounded-xl"
            >
              <p className="text-red-400 text-xs sm:text-sm break-words">
                {error}
              </p>
            </motion.div>
          )}

          {/* Email Form - stacked on mobile, 44px+ touch targets */}
          {!showSuccess && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-lg mx-auto"
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
                aria-describedby={error ? "mobile-form-error" : undefined}
                className="min-h-[44px] sm:min-h-[48px] h-12 sm:h-14 flex-1 w-full min-w-0 px-4 sm:px-6 text-base sm:text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 focus:ring-2 focus:ring-white/20 rounded-xl backdrop-blur-sm touch-manipulation"
              />
              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="min-h-[44px] sm:min-h-[48px] h-12 sm:h-14 w-full sm:w-auto sm:flex-shrink-0 px-6 sm:px-8 md:px-10 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white font-semibold text-base sm:text-lg rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
              >
                {isSubmitting ? (
                  <>
                    <Loader2
                      className="w-5 h-5 animate-spin mr-2 flex-shrink-0"
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
    </div>
  )
}

