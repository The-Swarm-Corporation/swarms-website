/**
 * Shared shell for every email the website sends, matching the Swarms
 * Marketplace emails: table layout, 600px wide, system fonts, and inline
 * styles only (Gmail strips <style> blocks).
 */

export const EMAIL_FROM = 'Swarms <notifications@swarms.world>';
export const EMAIL_REPLY_TO = 'support@swarms.world';

// Images must be absolute URLs on a public host, and PNG rather than SVG.
export const EMAIL_ASSET_BASE_URL = 'https://www.swarms.ai';

const colors = {
  page: '#000000',
  card: '#18181b',
  cardBorder: '#27272a',
  title: '#ffffff',
  text: '#e4e4e7',
  muted: '#a1a1aa',
  footer: '#71717a',
  footerFaint: '#52525b',
  panel: '#27272a',
  panelBorder: '#3f3f46',
  button: '#121214',
  buttonBorder: '#27272a',
  buttonText: '#ffffff',
};

const font =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export interface EmailMessage {
  subject: string;
  html: string;
  text: string;
}

export interface EmailLink {
  label: string;
  href: string;
}

interface EmailLayout {
  // Inbox preview text shown after the subject line.
  preheader: string;
  eyebrow: string;
  title: string;
  // Pre-built HTML from the block helpers below. Escape any user input.
  content: string;
  cta?: EmailLink;
  // Optional HTML shown below the button.
  afterCta?: string;
  // Why the recipient got this email, shown in the footer.
  reason: string;
  // Show an unsubscribe link. Only the newsletter needs one; the waitlist
  // emails are one-off confirmations.
  unsubscribe?: boolean;
}

const unsubscribeLink: EmailLink = { label: 'Unsubscribe', href: `mailto:${EMAIL_REPLY_TO}?subject=Unsubscribe` };

const footerLinks: EmailLink[] = [
  { label: 'swarms.ai', href: 'https://www.swarms.ai' },
  { label: 'Docs', href: 'https://docs.swarms.ai' },
  { label: 'X', href: 'https://x.com/swarms_corp' },
  { label: 'Support', href: 'https://swarms.world/support' },
];

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function paragraph(html: string, { muted = false } = {}): string {
  return `<p style="margin: 0 0 16px; font-family: ${font}; font-size: 16px; line-height: 1.6; color: ${muted ? colors.muted : colors.text};">${html}</p>`;
}

export function heading(text: string): string {
  return `<p style="margin: 8px 0 12px; font-family: ${font}; font-size: 17px; font-weight: 600; line-height: 1.4; color: ${colors.title};">${text}</p>`;
}

export function strong(text: string): string {
  return `<strong style="font-weight: 600; color: ${colors.title};">${text}</strong>`;
}

export function link({ label, href }: EmailLink): string {
  return `<a href="${escapeHtml(href)}" style="color: ${colors.title}; text-decoration: underline;">${escapeHtml(label)}</a>`;
}

export function image(src: string, alt: string): string {
  return `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" width="520" style="display: block; width: 100%; max-width: 520px; height: auto; margin: 0 0 24px; border: 0; border-radius: 8px; color: ${colors.muted}; font-family: ${font}; font-size: 14px;">`;
}

// Inner panel. Pass an optional label for the small heading above the body.
export function panel(html: string, label?: string): string {
  const labelHtml = label
    ? `<p style="margin: 0 0 8px; font-family: ${font}; font-size: 13px; font-weight: 600; color: ${colors.muted};">${label}</p>`
    : '';
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 8px 0 16px; border-collapse: separate;">
      <tr>
        <td bgcolor="${colors.panel}" style="padding: 20px 24px; background-color: ${colors.panel}; border: 1px solid ${colors.panelBorder}; border-radius: 8px; font-family: ${font}; font-size: 15px; line-height: 1.6; color: ${colors.text};">
          ${labelHtml}${html}
        </td>
      </tr>
    </table>`;
}

// Rows separated by hairlines, for use inside a panel.
export function rows(items: string[]): string {
  const cells = items
    .map((item, index) => {
      const border = index < items.length - 1 ? `border-bottom: 1px solid ${colors.panelBorder};` : '';
      return `<tr><td style="padding: 10px 0; ${border} font-family: ${font}; font-size: 15px; line-height: 1.5; color: ${colors.text};">${item}</td></tr>`;
    })
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">${cells}</table>`;
}

export function bulletList(items: string[]): string {
  const cells = items
    .map(
      (item) =>
        `<tr><td valign="top" style="width: 20px; padding: 0 0 10px; font-family: ${font}; font-size: 16px; line-height: 1.6; color: ${colors.muted};">&bull;</td><td style="padding: 0 0 10px; font-family: ${font}; font-size: 16px; line-height: 1.6; color: ${colors.text};">${item}</td></tr>`,
    )
    .join('');
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; margin: 0 0 8px; border-collapse: collapse;">${cells}</table>`;
}

function button({ label, href }: EmailLink): string {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin: 16px 0 24px; border-collapse: separate;">
      <tr>
        <td bgcolor="${colors.button}" style="background-color: ${colors.button}; border: 1px solid ${colors.buttonBorder}; border-radius: 9999px; mso-padding-alt: 14px 28px;">
          <a href="${escapeHtml(href)}" style="display: inline-block; padding: 14px 28px; font-family: ${font}; font-size: 15px; font-weight: 500; line-height: 1; color: ${colors.buttonText}; text-decoration: none; border-radius: 9999px;">${escapeHtml(label)}</a>
        </td>
      </tr>
    </table>`;
}

export function renderEmail({
  preheader,
  eyebrow,
  title,
  content,
  cta,
  afterCta = '',
  reason,
  unsubscribe = false,
}: EmailLayout): string {
  const footerLinkHtml = (unsubscribe ? [...footerLinks, unsubscribeLink] : footerLinks)
    .map(
      ({ label, href }) =>
        `<a href="${href}" style="color: ${colors.muted}; text-decoration: underline;">${label}</a>`,
    )
    .join(`<span style="color: ${colors.footerFaint};"> &nbsp;&middot;&nbsp; </span>`);

  return `<!DOCTYPE html>
<html lang="en" style="color-scheme: dark;">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <meta name="color-scheme" content="dark">
    <meta name="supported-color-schemes" content="dark">
    <title>${escapeHtml(title)}</title>
  </head>
  <body bgcolor="${colors.page}" style="margin: 0; padding: 0; width: 100%; background-color: ${colors.page}; color: ${colors.text};">
    <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all; font-size: 1px; line-height: 1px; color: ${colors.page};">${preheader}${'&#847;&zwnj;&nbsp;'.repeat(60)}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.page}" style="width: 100%; border-collapse: collapse; background-color: ${colors.page};">
      <tr>
        <td align="center" style="padding: 40px 16px;">
          <!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${colors.card}" style="width: 100%; max-width: 600px; border-collapse: separate; background-color: ${colors.card}; border: 1px solid ${colors.cardBorder}; border-radius: 12px;">
            <tr>
              <td style="padding: 32px 40px 0;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                  <tr>
                    <td style="padding-right: 10px; vertical-align: middle;">
                      <img src="${EMAIL_ASSET_BASE_URL}/email-logo.png" width="28" height="28" alt="" style="display: block; width: 28px; height: 28px; border: 0; color: ${colors.title}; font-family: ${font}; font-size: 14px;">
                    </td>
                    <td style="vertical-align: middle; font-family: ${font}; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: ${colors.title};">Swarms</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 32px 40px 32px;">
                <p style="margin: 0 0 10px; font-family: ${font}; font-size: 13px; font-weight: 600; color: ${colors.muted};">${escapeHtml(eyebrow)}</p>
                <h1 style="margin: 0 0 20px; font-family: ${font}; font-size: 28px; font-weight: 700; line-height: 1.2; letter-spacing: -0.02em; color: ${colors.title};">${escapeHtml(title)}</h1>
                ${content}
                ${cta ? button(cta) : ''}
                ${afterCta}
              </td>
            </tr>
            <tr>
              <td style="padding: 24px 40px 32px; border-top: 1px solid ${colors.cardBorder}; font-family: ${font}; font-size: 13px; line-height: 1.6; color: ${colors.footer};">
                <p style="margin: 0 0 12px; font-family: ${font};">${footerLinkHtml}</p>
                <p style="margin: 0 0 12px; font-family: ${font};">${reason} Questions? Reply to this email or write to <a href="mailto:${EMAIL_REPLY_TO}" style="color: ${colors.muted}; text-decoration: underline;">${EMAIL_REPLY_TO}</a>.</p>
                <p style="margin: 0; font-family: ${font}; color: ${colors.footerFaint};">&copy; ${new Date().getFullYear()} Swarms Corporation</p>
              </td>
            </tr>
          </table>
          <!--[if mso]></td></tr></table><![endif]-->
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

// Plain-text counterpart of renderEmail. `body` is the email's text, already
// laid out with blank lines between paragraphs.
export function renderText({
  title,
  body,
  reason,
  unsubscribe = false,
}: {
  title: string;
  body: string;
  reason: string;
  unsubscribe?: boolean;
}): string {
  const unsubscribeLine = unsubscribe ? ' To unsubscribe, reply with "unsubscribe".' : '';
  return [
    title,
    '',
    body.trim(),
    '',
    '---',
    footerLinks.map(({ label, href }) => `${label}: ${href}`).join('\n'),
    '',
    `${reason} Questions? Reply to this email or write to ${EMAIL_REPLY_TO}.${unsubscribeLine}`,
    '',
    `© ${new Date().getFullYear()} Swarms Corporation`,
  ].join('\n');
}
