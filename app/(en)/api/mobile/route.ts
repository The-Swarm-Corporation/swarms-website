import { type NextRequest, NextResponse } from "next/server"
import { apiError } from "@/lib/api-error"
import { sendMobileWaitlistEmail } from "@/lib/email"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return apiError(400, "email_required", "Email is required", "Include an \"email\" string field in the JSON body.")
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return apiError(400, "invalid_email", "Invalid email format", "Provide a valid address like you@example.com.")
    }

    console.log("Mobile waitlist signup:", { email })

    // Add contact to audience
    const audienceId = process.env.RESEND_AUDIENCE_ID
    
    if (audienceId) {
      try {
        await resend.contacts.create({
          email: email,
          unsubscribed: false,
          audienceId: audienceId,
        })
        console.log("Contact added to audience successfully:", email)
      } catch (contactError: any) {
        // If contact already exists, that's okay - just log it
        if (contactError?.message?.includes("already exists") || contactError?.statusCode === 422) {
          console.log("Contact already exists in audience:", email)
        } else {
          console.error("Failed to add contact to audience:", contactError)
          // Continue even if contact creation fails
        }
      }
    } else {
      console.warn("RESEND_AUDIENCE_ID not configured - skipping contact creation")
    }

    // Optionally send a confirmation email
    try {
      await sendMobileWaitlistEmail(email)
      console.log("Confirmation email sent successfully to:", email)
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError)
      // Don't fail the signup if email fails
    }

    return NextResponse.json(
      {
        message: "Successfully added to waitlist!",
        email: email,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Mobile waitlist signup error:", error)

    return apiError(500, "internal_error", "Failed to join waitlist. Please try again.", "Retry shortly; if it persists, email kye@swarms.world.")
  }
}

