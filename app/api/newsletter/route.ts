import { type NextRequest, NextResponse } from "next/server"
import { sendWelcomeEmail } from "@/lib/email"

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    console.log("Newsletter signup:", { email, firstName, lastName })

    // Send welcome email
    try {
      await sendWelcomeEmail({ email, firstName, lastName })
      console.log("Welcome email sent successfully to:", email)
    } catch (emailError) {
      console.error("Failed to send welcome email:", emailError)
      // Don't fail the signup if email fails, but log the error
      // In production, you might want to queue this for retry
    }

    return NextResponse.json(
      {
        message: "Successfully subscribed to Swarms updates! Check your email for your $5 welcome credits.",
        contact: { email, firstName, lastName },
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Newsletter signup error:", error)

    return NextResponse.json(
      {
        error: "Failed to subscribe. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
