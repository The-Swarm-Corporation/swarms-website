import { type NextRequest, NextResponse } from "next/server"
import { testAudienceConnection } from "@/lib/email"

export async function GET(request: NextRequest) {
  try {
    // Test audience connection
    const result = await testAudienceConnection()
    
    return NextResponse.json({
      message: "Audience connection test successful",
      ...result
    }, { status: 200 })
  } catch (error) {
    console.error("Audience test failed:", error)
    
    return NextResponse.json({
      error: "Audience connection test failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: "Email is required for testing" }, { status: 400 })
    }
    
    // Import here to avoid issues during testing
    const { sendWelcomeEmail } = await import("@/lib/email")
    
    // Test the full signup flow with audience creation + email
    await sendWelcomeEmail({ 
      email: email,
      firstName: firstName || 'Test',
      lastName: lastName || 'User'
    })
    
    return NextResponse.json({
      message: "Test signup successful - contact added to audience and email sent",
      testData: { email, firstName, lastName }
    }, { status: 200 })
  } catch (error) {
    console.error("Test signup failed:", error)
    
    return NextResponse.json({
      error: "Test signup failed",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}
