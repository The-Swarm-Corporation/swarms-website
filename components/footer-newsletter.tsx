"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle } from "lucide-react"
import { NEWSLETTER_SUBSCRIBED_KEY, POPUP_SEEN_KEY } from "@/components/home-newsletter"

export function FooterNewsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [error, setError] = useState("")

  // localStorage is only readable after mount; until then render the form.
  useEffect(() => {
    if (localStorage.getItem(NEWSLETTER_SUBSCRIBED_KEY)) {
      setIsSubscribed(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem(NEWSLETTER_SUBSCRIBED_KEY, email.trim())
        localStorage.setItem(POPUP_SEEN_KEY, "true")
        setIsSubscribed(true)
      } else {
        setError(data.error?.message || "Something went wrong. Please try again.")
      }
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex max-w-sm flex-col gap-3">
      <div>
        <h3 className="flex items-center gap-2 text-xs font-bold text-white sm:text-sm">
          <span className="h-1 w-1 rounded-full bg-neutral-600 sm:h-1.5 sm:w-1.5" />
          Sign up for our monthly newsletter
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-gray-500 sm:text-sm">
          Product updates, releases, and research. Once a month.
        </p>
      </div>

      {isSubscribed ? (
        <p className="flex items-center gap-2 text-sm text-gray-300">
          <CheckCircle className="h-4 w-4 shrink-0 text-white/70" />
          Thanks for subscribing.
        </p>
      ) : (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex h-11 items-center rounded-full border border-neutral-800 bg-neutral-950 p-1 pl-4 transition-colors duration-300 focus-within:border-neutral-600"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              aria-label="Email address"
              required
              autoComplete="email"
              data-lpignore="true"
              data-1p-ignore=""
              data-bwignore="true"
              data-form-type="other"
              className="min-w-0 flex-1 bg-transparent text-sm text-white placeholder-neutral-600 outline-none"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-full shrink-0 items-center gap-1.5 rounded-full border border-[#27272a] bg-[#1a1a1d] px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-[#3f3f46] hover:bg-[#232327] disabled:opacity-60"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
              {!isSubmitting && <ArrowRight className="h-3.5 w-3.5" />}
            </button>
          </form>
          {error && (
            <p role="alert" className="text-xs text-white/60">
              {error}
            </p>
          )}
        </>
      )}
    </div>
  )
}
