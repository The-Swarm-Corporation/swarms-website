import { renderEmail, type RenderedEmail } from "@/lib/email-template"

// The two emails the contact sales route sends. Pass raw values: the
// template escapes every field before it reaches the HTML.

export function confirmationEmail(firstName: string, product: string): RenderedEmail {
  return renderEmail({
    preheader: `We received your request about ${product}. Expect a reply within one business day.`,
    eyebrow: "Sales",
    title: "Thanks for reaching out",
    greeting: firstName,
    paragraphs: [
      `We received your request about **${product}**. Someone from our team will reply to this address within one business day.`,
      "If you would rather talk sooner, you can book a time directly.",
    ],
    button: {
      label: "Book a call",
      url: "https://cal.com/swarms/swarms-strategy-session",
    },
    footnote:
      "In the meantime, the documentation at docs.swarms.ai and the pricing page at swarms.ai/pricing cover most first questions.",
  })
}

export function notificationEmail(name: string, email: string, product: string, ip: string): RenderedEmail {
  return renderEmail({
    preheader: `${name} is interested in ${product}.`,
    eyebrow: "Contact sales",
    title: "New sales inquiry",
    paragraphs: [`**${name}** asked to talk about **${product}**. Reply to this email to answer them directly.`],
    details: {
      title: "Inquiry",
      rows: [
        { label: "Name", value: name },
        { label: "Email", value: email },
        { label: "Interested in", value: product },
        { label: "Submitted", value: new Date().toUTCString() },
        { label: "IP", value: ip },
      ],
    },
  })
}
