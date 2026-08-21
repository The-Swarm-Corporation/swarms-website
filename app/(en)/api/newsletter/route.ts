import { type NextRequest, NextResponse } from "next/server"
import { apiError } from "@/lib/api-error"
import { sendWelcomeEmail } from "@/lib/email"
import { rateLimit } from "@/lib/rate-limit"

// WHATWG HTML-spec email pattern: restricts the local part to a safe
// character set, so markup like <script>…</script>@test.com is rejected.
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

const MAX_EMAIL_LENGTH = 254
const MAX_NAME_LENGTH = 100

// One legitimate visitor subscribes once; a handful of attempts covers typos.
const RATE_LIMIT = 5
const RATE_WINDOW_MS = 10 * 60 * 1000

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

function validName(value: unknown): value is string | undefined {
  if (value === undefined || value === null || value === "") return true
  return (
    typeof value === "string" &&
    value.length <= MAX_NAME_LENGTH &&
    // eslint-disable-next-line no-control-regex
    !/[<>\x00-\x1f\x7f]/.test(value)
  )
}

export async function POST(request: NextRequest) {
  try {
    if (!rateLimit(clientIp(request), RATE_LIMIT, RATE_WINDOW_MS)) {
      return apiError(429, "rate_limited", "Too many requests. Please try again later.", "Wait ten minutes before retrying; the limit is 5 attempts per 10 minutes per IP.")
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return apiError(400, "invalid_body", "Invalid request body", "Send a JSON object: { \"email\": \"you@example.com\" }.")
    }

    const { email, firstName, lastName } = (body ?? {}) as Record<string, unknown>

    if (!email || typeof email !== "string") {
      return apiError(400, "email_required", "Email is required", "Include an \"email\" string field in the JSON body.")
    }

    const normalizedEmail = email.trim()
    if (normalizedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(normalizedEmail)) {
      return apiError(400, "invalid_email", "Invalid email format", "Provide a valid address like you@example.com (max 254 chars).")
    }

    if (!validName(firstName) || !validName(lastName)) {
      return apiError(400, "invalid_name", "Invalid name", "Names are optional strings up to 100 chars without markup.")
    }

    console.log("Newsletter signup:", { email: normalizedEmail })

    // Send welcome email
    try {
      await sendWelcomeEmail({
        email: normalizedEmail,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      })
      console.log("Welcome email sent successfully to:", normalizedEmail)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the signup if email fails, but log the error
      // In production, you might want to queue this for retry
    }

    return NextResponse.json(
      {
        message: "Successfully subscribed to Swarms updates! Check your email for your $5 welcome credits.",
        contact: { email: normalizedEmail, firstName, lastName },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter signup error:", error)

    return apiError(500, "internal_error", "Failed to subscribe. Please try again.", "Retry shortly; if it persists, email kye@swarms.world.")
  }
}
