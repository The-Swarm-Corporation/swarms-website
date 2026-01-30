"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Navigation } from "@/components/navigation"
import { CheckCircle, Loader2, Mail } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [error, setError] = useState("")

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
          firstName: "",
          lastName: "",
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setShowSuccess(true)
        setEmail("")
      } else {
        setError(data.error || "Something went wrong. Please try again.")
      }
    } catch (err) {
      console.error("Newsletter signup error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-red-950/20 to-black" />
      <div className="absolute inset-0 bg-black/90" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 md:pt-40">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-4">
              <Image
                src="/logo.svg"
                alt="Swarms Logo"
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight"
          >
            Join our <span className="text-red-500">Newsletter</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-2"
          >
            Get updates, tutorials, livestreams, and more
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-base text-white/60 mb-8"
          >
            Stay in the loop with the latest from Swarms
          </motion.p>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CheckCircle className="w-6 h-6 text-red-500 shrink-0" />
                <p className="text-red-400 font-semibold">
                  You&apos;re subscribed! Check your email for welcome credits and next steps.
                </p>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg"
            >
              <p className="text-red-400 text-sm">{error}</p>
            </motion.div>
          )}

          {/* Email Form */}
          {!showSuccess && (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="pl-12 flex-1 h-12 sm:h-14 px-4 sm:px-6 text-base sm:text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 rounded-lg backdrop-blur-sm"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting || !email.trim()}
                className="h-12 sm:h-14 px-8 sm:px-10 bg-red-500 hover:bg-red-600 text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Submitting...
                  </>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </div>
  )
}
