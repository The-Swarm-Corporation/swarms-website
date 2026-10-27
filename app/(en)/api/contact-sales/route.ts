import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

import { apiError } from "@/lib/api-error"
import { salesProductLabel } from "@/lib/contact-sales"
import { confirmationEmail, escapeHtml, notificationEmail } from "@/lib/contact-sales-emails"
import { rateLimit } from "@/lib/rate-limit"

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM = "Swarms <notifications@swarms.world>"
const SALES_INBOX = "kye@swarms.world"

// WHATWG HTML-spec email pattern (same as the newsletter route).
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
const MAX_EMAIL_LENGTH = 254
const MAX_NAME_LENGTH = 100

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

export async function POST(request: NextRequest) {
  try {
    const ip = clientIp(request)
    if (!rateLimit(`contact-sales:${ip}`, RATE_LIMIT, RATE_WINDOW_MS)) {
      return apiError(429, "rate_limited", "Too many requests. Please try again later.", "Wait ten minutes before retrying.")
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return apiError(400, "invalid_body", "Invalid request body", 'Send JSON: { "name", "email", "product" }.')
    }
    const { name, email, product } = (body ?? {}) as Record<string, unknown>

    if (typeof email !== "string" || email.trim().length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(email.trim())) {
      return apiError(400, "invalid_email", "Please enter a valid email address.")
    }
    if (
      typeof name !== "string" ||
      !name.trim() ||
      name.trim().length > MAX_NAME_LENGTH ||
      // eslint-disable-next-line no-control-regex
      /[<>\x00-\x1f\x7f]/.test(name)
    ) {
      return apiError(400, "invalid_name", "Please enter your name (up to 100 characters).")
    }
    const productLabel = typeof product === "string" ? salesProductLabel(product) : undefined
    if (!productLabel) {
      return apiError(400, "invalid_product", "Please choose a product.")
    }

    const cleanEmail = email.trim()
    const cleanName = name.trim()
    const [firstName, ...rest] = cleanName.split(/\s+/)
    const lastName = rest.join(" ") || undefined

    // 1. Add them as a Resend contact. An existing contact is fine.
    try {
      const audienceId = process.env.RESEND_AUDIENCE_ID
      const { error } = audienceId
        ? await resend.contacts.create({ audienceId, email: cleanEmail, firstName, lastName, unsubscribed: false })
        : await resend.contacts.create({ email: cleanEmail, firstName, lastName, unsubscribed: false })
      if (error && !/already exists/i.test(error.message)) console.error("contact-sales: contact create failed", error)
    } catch (contactError) {
      console.error("contact-sales: contact create threw", contactError)
    }

    // 2. Notify sales. This is the email that must not be lost, so a failure
    //    here fails the request and the visitor is asked to retry.
    const { error: notifyError } = await resend.emails.send({
      from: FROM,
      to: [SALES_INBOX],
      replyTo: cleanEmail,
      subject: `Sales inquiry: ${cleanName} (${productLabel})`,
      html: notificationEmail(escapeHtml(cleanName), escapeHtml(cleanEmail), escapeHtml(productLabel), escapeHtml(ip)),
    })
    if (notifyError) {
      console.error("contact-sales: notification failed", notifyError)
      return apiError(502, "send_failed", "We couldn't send your request. Please try again.", "If it keeps failing, email kye@swarms.world.")
    }

    // 3. Confirm to the visitor. Logged but not fatal: sales already has it.
    const { error: confirmError } = await resend.emails.send({
      from: FROM,
      to: [cleanEmail],
      replyTo: SALES_INBOX,
      subject: "Thanks for contacting Swarms",
      html: confirmationEmail(escapeHtml(firstName), escapeHtml(productLabel)),
    })
    if (confirmError) console.error("contact-sales: confirmation failed", confirmError)

    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (error) {
    console.error("contact-sales error:", error)
    return apiError(500, "internal_error", "Something went wrong. Please try again.", "If it keeps failing, email kye@swarms.world.")
  }
}
