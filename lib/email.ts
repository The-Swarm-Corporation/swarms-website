import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export async function sendWelcomeEmail({ email, firstName, lastName }: WelcomeEmailData) {
  const name = firstName ? (lastName ? `${firstName} ${lastName}` : firstName) : 'there';
  
  try {
    // Add contact to audience first
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    
    if (audienceId) {
      try {
        await resend.contacts.create({
          email: email,
          firstName: firstName || undefined,
          lastName: lastName || undefined,
          unsubscribed: false,
          audienceId: audienceId,
        });
        console.log('Contact added to audience successfully:', email);
      } catch (contactError) {
        console.error('Failed to add contact to audience:', contactError);
        // Continue with email sending even if contact creation fails
      }
    } else {
      console.warn('RESEND_AUDIENCE_ID not configured - skipping contact creation');
    }

    // Send welcome email
    const { data, error } = await resend.emails.send({
      from: 'Kye Gomez <kye@swarms.world>',
      to: [email],
      subject: 'Welcome to Swarms - Your $5 Credits Await!',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Swarms AI</title>
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
                text-align: left;
                margin-bottom: 40px;
                border-bottom: 2px solid #ef4444;
                padding-bottom: 20px;
              }
              .logo {
                color: #ef4444;
                font-size: 36px;
                font-weight: 900;
                margin-bottom: 15px;
                font-family: 'Orbitron', monospace;
                letter-spacing: 2px;
              }
              .title {
                color: #1f2937;
                font-size: 24px;
                font-weight: 700;
                margin-bottom: 8px;
                line-height: 1.3;
              }
              .subtitle {
                color: #6b7280;
                font-size: 16px;
                margin-bottom: 0;
                font-style: italic;
              }
              .content {
                color: #374151;
                font-size: 16px;
                margin-bottom: 30px;
                line-height: 1.6;
              }
              .content h4 {
                color: #1f2937;
                font-size: 20px;
                font-weight: 700;
                margin: 25px 0 15px 0;
                letter-spacing: 0.3px;
              }
              .content ul {
                margin: 15px 0;
                padding-left: 20px;
              }
              .content li {
                margin: 10px 0;
                line-height: 1.6;
              }
              .highlight {
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                padding: 25px;
                border-radius: 12px;
                text-align: left;
                margin: 35px 0;
                border-left: 5px solid #b91c1c;
              }
              .highlight h3 {
                margin: 0 0 12px 0;
                font-size: 22px;
                font-weight: 700;
                letter-spacing: 0.5px;
              }
              .highlight p {
                margin: 0;
                opacity: 0.95;
                font-size: 16px;
                line-height: 1.5;
              }
              .cta-button {
                display: inline-block;
                background: linear-gradient(135deg, #ef4444, #dc2626);
                color: white;
                text-decoration: none;
                padding: 16px 32px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 10px 10px 10px 0;
                transition: transform 0.2s;
              }
              .cta-button:hover {
                transform: translateY(-2px);
              }
              .secondary-button {
                display: inline-block;
                background: transparent;
                color: #ef4444;
                text-decoration: none;
                padding: 16px 32px;
                border: 2px solid #ef4444;
                border-radius: 8px;
                font-weight: 600;
                font-size: 16px;
                margin: 10px 10px 10px 0;
                transition: all 0.2s;
              }
              .secondary-button:hover {
                background: #ef4444;
                color: white;
              }
              .links {
                background: #f8fafc;
                padding: 25px;
                border-radius: 12px;
                margin: 35px 0;
                border: 1px solid #e2e8f0;
                border-left: 4px solid #ef4444;
              }
              .links h4 {
                color: #1f2937;
                margin: 0 0 18px 0;
                font-size: 20px;
                font-weight: 700;
                letter-spacing: 0.3px;
              }
              .links ul {
                margin: 0;
                padding: 0;
                list-style: none;
              }
              .links li {
                margin: 12px 0;
                padding: 8px 0;
                border-bottom: 1px solid #e2e8f0;
              }
              .links li:last-child {
                border-bottom: none;
              }
              .links a {
                color: #ef4444;
                text-decoration: none;
                font-weight: 600;
                font-size: 16px;
              }
              .links a:hover {
                color: #dc2626;
                text-decoration: underline;
              }
              .footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
              @media (max-width: 480px) {
                body {
                  padding: 10px;
                }
                .container {
                  padding: 20px;
                }
                .cta-button, .secondary-button {
                  display: block;
                  text-align: center;
                  margin: 10px 0;
                }
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <div class="logo">swarms</div>
                <h1 class="title">Welcome to Swarms AI!</h1>
                <p class="subtitle">Thank you for joining the future of multi-agent systems</p>
              </div>

              <div class="content">
                <p>Hi ${name},</p>
                
                <p>Thank you for signing up! Our mission at Swarms is to build the infrastructure necessary for the agent economy.</p>

                <p>You've just joined over <strong>160,000+ developers</strong> who are leveraging the most advanced multi-agent framework to transform their organizations with autonomous AI systems.</p>
              </div>

              <div class="highlight">
                <h3>Your $5 Free Credits Are Waiting</h3>
                <p>Complete your account setup to claim your credits and start building immediately.</p>
              </div>

              <div style="text-align: left; margin: 35px 0;">
                <a href="https://swarms.world/signin/signup" class="cta-button">Create Your Account & Get Credits</a>
                <br style="margin: 15px 0;">
                <a href="https://docs.swarms.ai" class="secondary-button">View Documentation</a>
              </div>

              <div class="links">
                <h4>Get Started with These Resources:</h4>
                <ul>
                  <li><a href="https://docs.swarms.ai/getting-started/quickstart">Quickstart Guide</a> - Get up and running quickly</li>
                  <li><a href="https://docs.swarms.ai/getting-started/api-key-setup">API Key Setup</a> - Configure your authentication</li>
                  <li><a href="https://docs.swarms.ai/clients/python-client">Python Client</a> - Client setup and basic usage</li>
                  <li><a href="https://docs.swarms.ai/examples/client-setup">Client Setup Examples</a> - Step-by-step implementation examples</li>
                  <li><a href="https://swarms.ai/api">API Reference</a> - Complete API documentation</li>
                </ul>
              </div>

              <div class="content">
                <h4>What you can build with Swarms:</h4>
                <ul>
                  <li><strong>Multi-Agent Structures</strong> - Complex hierarchical, sequential, and parallel systems</li>
                  <li><strong>Production Deployments</strong> - Enterprise-grade reliability and scaling</li>
                  <li><strong>Agent Monitoring</strong> - Real-time observability and debugging tools</li>
                  <li><strong>Enterprise Automation</strong> - Transform your organization with intelligent automation</li>
                </ul>

                <p>Whether you're using our <strong>Rust framework (Swarms-RS)</strong>, our battle-tested <strong>Python framework</strong>, or our ultra-optimized <strong>hosted API</strong> – we've got you covered.</p>

                <p>Questions? Our community is here to help! Join us on our social channels or check out our comprehensive documentation.</p>
              </div>

              <div class="footer">
                <p>Best regards,</p>
                <p><strong>The Swarms AI Team</strong></p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #e5e7eb;">
                <p>This email was sent because you signed up for the Swarms AI newsletter.<br>
                If you no longer wish to receive these emails, you can unsubscribe at any time.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      replyTo: 'support@swarms.world',
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw new Error(`Email sending failed: ${error.message}`);
    }

    console.log('Welcome email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    throw error;
  }
}

// Utility function to test audience connection
export async function testAudienceConnection() {
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  
  if (!audienceId) {
    throw new Error('RESEND_AUDIENCE_ID environment variable not set');
  }

  try {
    // Try to list contacts to verify audience exists and API key works
    const response = await resend.contacts.list({ 
      audienceId: audienceId 
    });
    console.log('Audience connection successful:', response);
    return { success: true, audienceId, response: response.data };
  } catch (error) {
    console.error('Audience connection failed:', error);
    throw error;
  }
}
