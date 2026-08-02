import { type NextRequest, NextResponse } from "next/server"
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
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 },
      )
    }

    let body: unknown
    try {
      body = await request.json()
    } catch {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    const { email, firstName, lastName } = (body ?? {}) as Record<string, unknown>

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim()
    if (normalizedEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(normalizedEmail)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (!validName(firstName) || !validName(lastName)) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 })
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

    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 },
    )
  }
}
