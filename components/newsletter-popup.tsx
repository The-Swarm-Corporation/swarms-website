"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Sparkles, Users, Calendar, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface NewsletterPopupProps {
  isOpen: boolean
  onClose: () => void
}

export function NewsletterPopup({ isOpen, onClose }: NewsletterPopupProps) {
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    console.log("Submitting form with:", { email, firstName, lastName })

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
      console.log("Response:", data)

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
        setError(data.error || "Something went wrong")
        console.error("Subscription failed:", data)
      }
    } catch (err) {
      console.error("Network error:", err)
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-black border border-red-500/20 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8">
          {!isSuccess ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-4 animate-pulse">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Join the Swarms Community</h2>
                <p className="text-gray-300 text-sm">
                  Stay up to date with the latest updates, tutorials, events, and more from the world's first
                  multi-agent research lab.
                </p>
              </div>

              {/* Benefits */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Sparkles className="w-4 h-4 text-red-400" />
                  <span>Latest Updates</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <BookOpen className="w-4 h-4 text-red-400" />
                  <span>Tutorials</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Calendar className="w-4 h-4 text-red-400" />
                  <span>Events</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Mail className="w-4 h-4 text-red-400" />
                  <span>Research News</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-red-500"
                  />
                  <Input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-red-500"
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-red-500"
                />

                {error && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-400 text-sm text-center">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !email}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Joining...</span>
                    </div>
                  ) : (
                    "Join the Community"
                  )}
                </Button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
            </>
          ) : (
            /* Success State */
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 rounded-full mb-4 animate-bounce">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Welcome to Swarms!</h3>
              <p className="text-gray-300 text-sm">You've successfully joined our community. Stay tuned for updates!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
