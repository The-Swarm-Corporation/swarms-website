// HTML for the two emails the contact sales route sends. Callers must pass
// already-escaped values (see escapeHtml).

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function layout(title: string, body: string): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#111;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="padding:32px 16px;">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:16px;padding:36px;">
          <tr><td>${body}</td></tr>
        </table>
        <p style="margin:20px 0 0;font-size:12px;color:#999;">The Swarms Corporation · swarms.ai</p>
      </td></tr>
    </table>
  </body>
</html>`
}

export function confirmationEmail(firstName: string, product: string): string {
  return layout(
    "Thanks for contacting Swarms",
    `<h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;">Thanks for reaching out, ${firstName}</h1>
     <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#444;">We received your request about <strong>${product}</strong>. Someone from our team will reply to this address within one business day.</p>
     <p style="margin:0 0 14px;font-size:16px;line-height:1.6;color:#444;">If you would rather talk sooner, you can book a time directly:</p>
     <p style="margin:0 0 24px;"><a href="https://cal.com/swarms/swarms-strategy-session" style="display:inline-block;background:#111;color:#fff;text-decoration:none;font-size:15px;font-weight:600;padding:12px 24px;border-radius:999px;">Book a call</a></p>
     <p style="margin:0;font-size:14px;line-height:1.6;color:#666;">In the meantime, the <a href="https://docs.swarms.ai" style="color:#111;">documentation</a> and <a href="https://www.swarms.ai/pricing" style="color:#111;">pricing page</a> cover most first questions.</p>`,
  )
}

export function notificationEmail(name: string, email: string, product: string, ip: string): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:8px 0;font-size:13px;color:#888;width:120px;vertical-align:top;">${label}</td><td style="padding:8px 0;font-size:15px;color:#111;">${value}</td></tr>`
  return layout(
    "New sales inquiry",
    `<h1 style="margin:0 0 20px;font-size:22px;">New sales inquiry</h1>
     <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
       ${row("Name", name)}
       ${row("Email", `<a href="mailto:${email}" style="color:#111;">${email}</a>`)}
       ${row("Interested in", product)}
       ${row("Submitted", new Date().toUTCString())}
       ${row("IP", ip)}
     </table>
     <p style="margin:20px 0 0;font-size:14px;color:#666;">Reply to this email to answer them directly.</p>`,
  )
}
