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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navigation />
      
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/mobile_app_background.png)' }}
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-start justify-center px-4 sm:px-6 md:px-8 pt-24 sm:pt-32 md:pt-40">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Logo/Icon */}
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
            <span className="text-red-500">Swarms</span> Mobile App
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-8"
          >
            Join the waitlist to be among the first to experience Swarms on mobile
          </motion.p>

          {/* Success Message */}
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 p-6 bg-red-500/20 border border-red-500/50 rounded-lg backdrop-blur-sm"
            >
              <div className="flex items-center justify-center space-x-3">
                <CheckCircle className="w-6 h-6 text-red-500" />
                <p className="text-red-400 font-semibold">
                  You're on the list! We'll notify you when the app is ready.
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
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="flex-1 h-12 sm:h-14 px-4 sm:px-6 text-base sm:text-lg bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 rounded-lg backdrop-blur-sm"
              />
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

