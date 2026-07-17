"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { CheckCircle, Mail } from "lucide-react"

export const NEWSLETTER_SUBSCRIBED_KEY = "swarms-newsletter-subscribed"
const POPUP_SEEN_KEY = "swarms-newsletter-popup-seen"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const LABELS = {
  en: {
    eyebrow: "Newsletter",
    heading: "Get the latest from Swarms.",
    sub: "Build with Swarms Cloud or discover agents in the Marketplace. Sign up and get $5 in free API credits.",
    placeholder: "Enter your email address",
    emailAria: "Email address",
    cta: "Subscribe",
    submitting: "Subscribing...",
    thanksTitle: "Thanks for subscribing.",
    thanksBody: "You're on the list. Watch your inbox for updates from Swarms, and check your email for your $5 welcome credits.",
    genericError: "Something went wrong. Please try again.",
    networkError: "Network error. Please try again.",
  },
  zh: {
    eyebrow: "订阅通讯",
    heading: "获取 Swarms 最新动态。",
    sub: "Swarms Cloud 面向想要亲手构建智能体的开发者，Marketplace 面向想要直接使用现成智能体的开发者。立即注册即可获得 $5 免费 API 额度，加入市场，开始用 Swarms 构建。",
    placeholder: "输入您的邮箱地址",
    emailAria: "邮箱地址",
    cta: "订阅",
    submitting: "订阅中...",
    thanksTitle: "感谢订阅。",
    thanksBody: "您已成功加入订阅列表，请留意来自 Swarms 的更新邮件，欢迎邮件中还附有 $5 新人额度。",
    genericError: "出了点问题，请重试。",
    networkError: "网络错误，请重试。",
  },
}

export function HomeNewsletter({ locale = "en" }: { locale?: "en" | "zh" }) {
  const t = LABELS[locale]
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
        // A subscriber never needs the signup popup again.
        localStorage.setItem(POPUP_SEEN_KEY, "true")
        setIsSubscribed(true)
      } else {
        setError(data.error || t.genericError)
      }
    } catch {
      setError(t.networkError)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section aria-label={t.eyebrow} className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <motion.div
          className="mx-auto max-w-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease }}
        >
          <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
            {t.eyebrow}
          </p>

          {isSubscribed ? (
            <>
              <h2 className="flex max-w-3xl items-center gap-4 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                <CheckCircle className="h-8 w-8 shrink-0 text-white/70 sm:h-10 sm:w-10" />
                {t.thanksTitle}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                {t.thanksBody}
              </p>
            </>
          ) : (
            <>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                {t.heading}
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                {t.sub}
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex max-w-xl flex-col gap-3 sm:flex-row"
              >
                <div className="relative flex-1">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t.placeholder}
                    aria-label={t.emailAria}
                    required
                    autoComplete="email"
                    data-lpignore="true"
                    data-1p-ignore=""
                    data-bwignore="true"
                    data-form-type="other"
                    className="w-full rounded-full border border-white/15 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-white/40"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !email.trim()}
                  className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors duration-300 hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-50"
                >
                  {isSubmitting ? t.submitting : t.cta}
                </button>
              </form>

              {error && (
                <p role="alert" className="mt-4 text-sm text-white/60">
                  {error}
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
