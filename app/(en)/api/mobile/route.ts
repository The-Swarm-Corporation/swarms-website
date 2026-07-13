import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
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
      await resend.emails.send({
        from: 'Swarms <kye@swarms.world>',
        to: [email],
        subject: 'You\'re on the Swarms Mobile App Waitlist!',
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Welcome to Swarms Mobile Waitlist</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f8f9fa;
                }
                .container {
                  background: #ffffff;
                  border-radius: 12px;
                  padding: 40px;
                  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 40px;
                }
                .logo {
                  color: #ef4444;
                  font-size: 36px;
                  font-weight: 900;
                  margin-bottom: 15px;
                }
                .title {
                  color: #1f2937;
                  font-size: 24px;
                  font-weight: 700;
                  margin-bottom: 8px;
                }
                .content {
                  color: #374151;
                  font-size: 16px;
                  margin-bottom: 30px;
                  line-height: 1.6;
                }
                .highlight {
                  background: linear-gradient(135deg, #ef4444, #dc2626);
                  color: white;
                  padding: 25px;
                  border-radius: 12px;
                  text-align: center;
                  margin: 35px 0;
                }
                .highlight h3 {
                  margin: 0 0 12px 0;
                  font-size: 22px;
                  font-weight: 700;
                }
                .footer {
                  text-align: center;
                  margin-top: 40px;
                  padding-top: 20px;
                  border-top: 1px solid #e5e7eb;
                  color: #6b7280;
                  font-size: 14px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <div class="logo">swarms</div>
                  <h1 class="title">You're on the list!</h1>
                </div>

                <div class="content">
                  <p>Thank you for joining the Swarms Mobile App waitlist!</p>
                  
                  <p>We're working hard to bring you the best mobile experience for managing and deploying AI agents. You'll be among the first to know when the app is ready.</p>
                </div>

                <div class="highlight">
                  <h3>What to Expect</h3>
                  <p>We'll notify you as soon as the app is available for early access. Stay tuned for updates!</p>
                </div>

                <div class="footer">
                  <p>Best regards,</p>
                  <p><strong>The Swarms Team</strong></p>
                  <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                  <p>This email was sent because you signed up for the Swarms Mobile App waitlist.</p>
                </div>
              </div>
            </body>
          </html>
        `,
        replyTo: 'support@swarms.world',
      })
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

    return NextResponse.json(
      {
        error: "Failed to join waitlist. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

