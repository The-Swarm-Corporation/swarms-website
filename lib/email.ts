import { renderEmail } from "@/lib/email-template"
import { getResend, sendEmail } from "@/lib/send-email"

interface WelcomeEmailData {
  email: string
  firstName?: string
  lastName?: string
}

// Newsletter signup: add the address to the Resend audience, then send the
// welcome email. The template escapes every field, so the caller-supplied
// name is safe to pass through as is.
export async function sendWelcomeEmail({ email, firstName, lastName }: WelcomeEmailData) {
  const name = firstName ? (lastName ? `${firstName} ${lastName}` : firstName) : "there"

  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (audienceId) {
    try {
      await getResend().contacts.create({
        email,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        unsubscribed: false,
        audienceId,
      })
    } catch (contactError) {
      console.error("Failed to add contact to audience:", contactError)
      // The welcome email still goes out.
    }
  } else {
    console.warn("RESEND_AUDIENCE_ID not configured - skipping contact creation")
  }

  const message = renderEmail({
    preheader: "Your $5 in credits are waiting. Create your account to claim them.",
    eyebrow: "Welcome",
    title: "Welcome to Swarms",
    greeting: name,
    paragraphs: [
      "Thanks for signing up. Swarms builds the infrastructure for the agent economy: an open-source multi-agent framework in Python and Rust, and a hosted API that runs agents and swarms for you.",
      "Your account comes with **$5 in free credits**. Create it to claim them and run your first agent today.",
    ],
    button: {
      label: "Create your account",
      url: "https://swarms.world/signin/signup",
    },
    note: {
      title: "Where to start.",
      body: "The quickstart at docs.swarms.ai gets you from install to a running swarm in a few minutes, and the API reference at swarms.ai/api covers every endpoint.",
    },
    footnote: "You are receiving this because you signed up for Swarms updates at swarms.ai.",
  })

  const { id, error } = await sendEmail({
    to: [email],
    subject: "Welcome to Swarms, your $5 in credits are waiting",
    html: message.html,
    text: message.text,
    replyTo: "support@swarms.world",
  })
  if (error) {
    throw new Error(`Email sending failed: ${error}`)
  }
  return { success: true, id }
}
