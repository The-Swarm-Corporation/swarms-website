import { type NextRequest, NextResponse } from "next/server"
import { apiError } from "@/lib/api-error"
import { renderEmail } from "@/lib/email-template"
import { getResend, sendEmail } from "@/lib/send-email"

// WHATWG HTML-spec email pattern (same as the newsletter route).
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/
const MAX_EMAIL_LENGTH = 254

function waitlistEmail() {
  return renderEmail({
    preheader: "AgentHQ is free right now. Sign in with your Swarms account and start playing.",
    eyebrow: "AgentHQ",
    title: "You're on the AgentHQ waitlist",
    paragraphs: [
      "Thanks for joining. AgentHQ makes multi-agent orchestration simple and fun: hire Claude and Codex agents, assign tasks in plain language, and watch them work in real time in an interactive office.",
      "It's free right now, and you can start playing today.",
    ],
    note: {
      title: "No new signup needed.",
      body: "Sign in at game.swarms.world with your existing Swarms Marketplace account. AgentHQ stays free for the next few weeks, until we launch our business model.",
    },
    button: {
      label: "Open AgentHQ",
      url: "https://game.swarms.world",
    },
    footnote:
      "The announcement post at swarms.ai/blog/introducing-agenthq has the full story. You received this email because you joined the AgentHQ waitlist.",
  })
}

export async function POST(request: NextRequest) {
  try {
    let body: unknown
    try {
      body = await request.json()
    } catch {
      return apiError(400, "invalid_body", "Invalid request body", 'Send a JSON object: { "email": "you@example.com" }.')
    }
    const { email } = (body ?? {}) as Record<string, unknown>

    if (!email || typeof email !== "string") {
      return apiError(400, "email_required", "Email is required", 'Include an "email" string field in the JSON body.')
    }
    const cleanEmail = email.trim()
    if (cleanEmail.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(cleanEmail)) {
      return apiError(400, "invalid_email", "Invalid email format", "Provide a valid address like you@example.com.")
    }

    console.log("AgentHQ waitlist signup:", { email: cleanEmail })

    // Add the address to the audience. An existing contact is fine.
    const audienceId = process.env.RESEND_AUDIENCE_ID
    if (audienceId) {
      try {
        await getResend().contacts.create({ email: cleanEmail, unsubscribed: false, audienceId })
      } catch (contactError: unknown) {
        const message = contactError instanceof Error ? contactError.message : String(contactError)
        if (!/already exists/i.test(message)) {
          console.error("Failed to add contact to audience:", contactError)
          // Continue even if contact creation fails
        }
      }
    } else {
      console.warn("RESEND_AUDIENCE_ID not configured - skipping contact creation")
    }

    // Confirmation email. Logged but not fatal: the signup already counts.
    const message = waitlistEmail()
    const { error } = await sendEmail({
      to: [cleanEmail],
      subject: "You're on the AgentHQ waitlist. Play now at game.swarms.world",
      html: message.html,
      text: message.text,
      replyTo: "support@swarms.world",
    })
    if (error) console.error("Failed to send confirmation email:", error)

    return NextResponse.json({ message: "Successfully added to waitlist!", email: cleanEmail }, { status: 200 })
  } catch (error) {
    console.error("AgentHQ waitlist signup error:", error)

    return apiError(500, "internal_error", "Failed to join waitlist. Please try again.", "Retry shortly; if it persists, email kye@swarms.world.")
  }
}
