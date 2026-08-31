import { type NextRequest, NextResponse } from "next/server"
import { apiError } from "@/lib/api-error"
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

    console.log("AgentHQ waitlist signup:", { email })

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
        subject: 'Welcome to AgentHQ: play now at game.swarms.world',
        html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to the AgentHQ Waitlist</title>
          </head>
          <body style="margin:0; padding:0; background-color:#f5f7fa; font-family:-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#1d1d1f;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f7fa; padding:32px 16px;">
              <tr>
                <td align="center">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

                    <tr>
                      <td align="center" style="padding-bottom:24px;">
                        <div style="font-size:20px; font-weight:600; letter-spacing:-0.4px; color:#0071e3;">swarms</div>
                      </td>
                    </tr>

                    <tr>
                      <td style="background:#ffffff; border-radius:22px; padding:40px 36px; box-shadow:0 2px 12px rgba(0,0,0,0.06);">
                        <h1 style="margin:0 0 12px 0; font-size:30px; line-height:1.2; font-weight:700; letter-spacing:-0.8px; color:#1d1d1f;">You're on the AgentHQ waitlist</h1>
                        <p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#424245;">Thanks for joining. AgentHQ makes multi-agent orchestration fun, simple, and enjoyable: hire Claude and Codex agents, assign tasks in plain language, and watch them work in real time in an interactive office.</p>
                        <p style="margin:0; font-size:16px; line-height:1.6; color:#424245;">You can start playing right now.</p>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0 0 0;">
                          <tr>
                            <td style="background:#f5f7fa; border-radius:18px; padding:24px;">
                              <div style="font-size:13px; font-weight:600; letter-spacing:0.4px; text-transform:uppercase; color:#0071e3; margin-bottom:8px;">Play now</div>
                              <div style="font-size:17px; font-weight:600; color:#1d1d1f; margin-bottom:6px;">game.swarms.world</div>
                              <div style="font-size:15px; line-height:1.55; color:#6e6e73;">Sign in with your existing Swarms Marketplace account. No new signup needed.</div>
                            </td>
                          </tr>
                        </table>

                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:14px 0 0 0;">
                          <tr>
                            <td style="background:#f5f7fa; border-radius:18px; padding:24px;">
                              <div style="font-size:13px; font-weight:600; letter-spacing:0.4px; text-transform:uppercase; color:#0071e3; margin-bottom:8px;">Free access</div>
                              <div style="font-size:15px; line-height:1.55; color:#6e6e73;">AgentHQ is free for the next few weeks, until we launch our business model. Play as much as you want in the meantime.</div>
                            </td>
                          </tr>
                        </table>

                        <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:32px auto 8px auto;">
                          <tr>
                            <td style="background:#0071e3; border-radius:980px;">
                              <a href="https://game.swarms.world" style="display:inline-block; padding:14px 34px; font-size:16px; font-weight:600; color:#ffffff; text-decoration:none; letter-spacing:-0.2px;">Open AgentHQ</a>
                            </td>
                          </tr>
                        </table>

                        <p style="margin:18px 0 0 0; text-align:center; font-size:15px; line-height:1.5;">
                          <a href="https://www.swarms.ai/blog/introducing-agenthq" style="color:#0071e3; text-decoration:none; font-weight:500;">Read the AgentHQ announcement &rsaquo;</a>
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding:24px 8px 0 8px; text-align:center;">
                        <p style="margin:0 0 6px 0; font-size:14px; color:#6e6e73;">The Swarms Team</p>
                        <p style="margin:0; font-size:12px; line-height:1.5; color:#a1a1a6;">You received this email because you joined the AgentHQ waitlist.<br>Questions? Reply to this email or write to support@swarms.world.</p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
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
    console.error("AgentHQ waitlist signup error:", error)

    return apiError(500, "internal_error", "Failed to join waitlist. Please try again.", "Retry shortly; if it persists, email kye@swarms.world.")
  }
}
