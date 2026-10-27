"use client"

import { type FormEvent, useState } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

import { EmailInput } from "@/components/ui/email-input"
import { CompanyLogoGrid } from "@/components/company-logo-grid"
import { SALES_PRODUCTS, type SalesProductId } from "@/lib/contact-sales"
import { cn } from "@/lib/utils"

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const fieldClass =
  "h-12 w-full rounded-xl border border-white/[0.14] bg-white/[0.03] px-4 text-base text-white placeholder:text-white/35 outline-none transition-colors duration-200 focus:border-white/40"

export function ContactSalesForm() {
  const [done, setDone] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [product, setProduct] = useState<SalesProductId | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return setError("Please enter your name.")
    if (!EMAIL_REGEX.test(email.trim())) return setError("Please enter a valid email address.")
    if (!product) return setError("Please choose a product.")
    setError("")
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact-sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), product }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        setError(data?.error?.message ?? "Something went wrong. Please try again.")
        return
      }
      setDone(true)
    } catch {
      setError("Network error. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="rounded-2xl border border-white/[0.1] bg-[#0a0a0a] p-6 sm:p-9">
      {done ? (
        <div role="status" aria-live="polite">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/[0.06]">
            <Check className="h-5 w-5 text-white" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            Thanks, {name.trim().split(/\s+/)[0]}
          </h2>
          <p className="mt-3 text-base leading-relaxed text-white/55">
            We sent a confirmation to <span className="text-white/80">{email.trim()}</span>. Someone from our team will
            reply within one business day.
          </p>
          <div className="mt-10 border-t border-white/[0.08] pt-8">
            <p className="mb-6 text-sm text-white/45">You&apos;re in good company with developers from</p>
            <CompanyLogoGrid count={9} />
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">Get started</h2>

          <form onSubmit={submit} className="mt-8" noValidate>
            <label htmlFor="sales-name" className="mb-2 block text-sm font-medium text-white/80">
              Full name <span className="text-white/40">*</span>
            </label>
            <input
              id="sales-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ada Lovelace"
              autoComplete="name"
              maxLength={100}
              required
              className={fieldClass}
            />

            <label htmlFor="sales-email" className="mb-2 mt-6 block text-sm font-medium text-white/80">
              Work email <span className="text-white/40">*</span>
            </label>
            <EmailInput
              id="sales-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className={fieldClass}
            />

            <fieldset className="mt-7">
              <legend className="mb-3 block text-sm font-medium text-white/80">
                Which product are you interested in? <span className="text-white/40">*</span>
              </legend>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SALES_PRODUCTS.map((p) => {
                  const selected = product === p.id
                  return (
                    <label
                      key={p.id}
                      className={cn(
                        "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors duration-200",
                        selected
                          ? "border-white/50 bg-white/[0.08] text-white"
                          : "border-white/[0.12] bg-white/[0.02] text-white/65 hover:border-white/25 hover:text-white",
                      )}
                    >
                      <input
                        type="radio"
                        name="product"
                        value={p.id}
                        checked={selected}
                        onChange={() => setProduct(p.id)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                          selected ? "border-white bg-white" : "border-white/30",
                        )}
                      >
                        {selected && <span className="h-1.5 w-1.5 rounded-full bg-black" />}
                      </span>
                      {p.label}
                    </label>
                  )
                })}
              </div>
            </fieldset>

            {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#27272a] bg-white px-7 text-base font-medium text-black transition-colors hover:bg-white/90 disabled:pointer-events-none disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Contact sales
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  )
}
