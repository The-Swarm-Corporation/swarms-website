# Email Setup Guide

This project uses [Resend](https://resend.com) to send welcome emails to users who sign up for the newsletter.

## Setup Instructions

### 1. Create a Resend Account
1. Go to [resend.com](https://resend.com) and sign up for an account
2. Navigate to the [API Keys section](https://resend.com/api-keys)
3. Create a new API key

### 2. Environment Configuration
Create a `.env.local` file in the root directory and add your Resend configuration:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx
RESEND_AUDIENCE_ID=6f8ca23c-e8e9-455b-8c64-d1dfe4f12211
```

**Getting your Audience ID:**
1. Log into your Resend dashboard
2. Go to the "Audiences" section
3. Select or create an audience for your newsletter subscribers
4. Copy the Audience ID from the audience settings

**Important:** Never commit your `.env.local` file to version control. It's already included in `.gitignore`.

### 3. Domain Configuration (Optional for Production)
For production use, you may want to:
1. Verify your sending domain in Resend
2. Update the `from` field in `/lib/email.ts` to use your domain
3. Configure SPF, DKIM, and DMARC records

## Email Features

### Audience Management
When users sign up for the newsletter, the system automatically:
- **Adds contacts** to your specified Resend audience
- **Stores user information** (first name, last name, email)
- **Sets subscription status** to active by default
- **Handles duplicate contacts** gracefully (Resend prevents duplicates automatically)

### Welcome Email
When users sign up for the newsletter, they automatically receive a professional welcome email that includes:

- **$20 Free Credits** promotion
- Links to create their account at `https://swarms.world/signin/signup`
- Documentation link to `https://docs.swarms.ai`
- API documentation link to `https://swarms.ai/api`
- Quick start resources and links
- Professional branding matching the website

### Email Template
The email template is located in `/lib/email.ts` and includes:
- Responsive HTML design
- Professional styling matching the Swarms brand
- Mobile-friendly layout
- Clear call-to-action buttons
- Comprehensive resource links

## API Integration

The email functionality is integrated into the newsletter signup API endpoint at `/app/api/newsletter/route.ts`.

### Error Handling
- **Contact creation failures** don't prevent email sending
- **Email sending failures** don't prevent successful newsletter signup
- **All errors are logged** for monitoring and debugging
- **Users see success message** even if background processes fail
- **Graceful degradation** - core signup functionality always works
- In production, consider implementing retry queues for failed operations

### Validation
- Email format validation before sending
- Required field validation
- Graceful error handling for malformed requests

## Testing

### Development
In development, you can test email sending by:
1. Setting up your Resend API key
2. Using the newsletter signup form
3. Checking the Resend dashboard for sent emails

### Production Considerations
- Monitor email delivery rates in Resend dashboard
- Set up webhook endpoints for delivery confirmations
- Consider implementing email analytics tracking
- Set up automated monitoring for email service health

## Customization

### Email Content
To modify the email content, edit the `/lib/email.ts` file:
- Update the HTML template
- Modify the styling
- Change links and CTAs
- Add or remove content sections

### Branding
The email uses the Swarms brand colors and styling:
- Primary color: `#ef4444` (red-500)
- Font family: System fonts with fallbacks
- Logo: Text-based "swarms" branding

## Security

- API keys are stored in environment variables
- Email addresses are validated before sending
- No sensitive information is logged
- Rate limiting should be implemented for production use

## Support

For issues with email delivery:
1. Check Resend dashboard for delivery status
2. Verify API key configuration
3. Check email logs in application console
4. Contact Resend support if needed
