import { Resend } from 'resend';
import { EMAIL_FROM, EMAIL_REPLY_TO, type EmailMessage } from './layout';
import { agentHQWaitlistEmail, mobileWaitlistEmail, welcomeEmail } from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);

interface WelcomeEmailData {
  email: string;
  firstName?: string;
  lastName?: string;
}

// Resend reports failures in the returned `error` rather than throwing.
async function sendEmail(to: string, { subject, html, text }: EmailMessage) {
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [to],
    replyTo: EMAIL_REPLY_TO,
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Email sending failed: ${error.message}`, { cause: error });
  }

  return data;
}

export function sendAgentHQWaitlistEmail(email: string) {
  return sendEmail(email, agentHQWaitlistEmail());
}

export function sendMobileWaitlistEmail(email: string) {
  return sendEmail(email, mobileWaitlistEmail());
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
    const data = await sendEmail(email, welcomeEmail(name));

    console.log('Welcome email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Error in sendWelcomeEmail:', error);
    throw error;
  }
}
