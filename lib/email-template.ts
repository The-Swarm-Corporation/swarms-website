/**
 * The one layout every email from this site uses. It is the same template as
 * the Swarms Marketplace (swarms-platform, shared/utils/api/email-template.ts)
 * so mail from swarms.ai and from the platform reads as one sender. Keep the
 * two files in step when the design changes.
 *
 * Design: white page, near-black type, a light grey fill for blocks of data,
 * and one black pill for the action. The message sits on the page rather than
 * inside a card. Restraint over decoration: one accent, one typeface,
 * generous space, nothing competing with the sentence the reader came for.
 *
 * Email clients are not browsers, so the markup is deliberately old-fashioned:
 *
 * - Layout is tables with `role="presentation"` and the width/cellpadding
 *   attributes Outlook's Word engine needs, not CSS layout.
 * - Every coloured surface carries a `bgcolor` attribute as well as the CSS,
 *   because Gmail drops `background` shorthand it does not like.
 * - No gradients and no shadows. Gmail strips a gradient and leaves nothing
 *   behind it, which is how the old templates lost their header and button.
 * - `color-scheme: light` is declared so a client's dark mode does not invert
 *   the white page out from under the card.
 * - The only image is the logo, served as a PNG because Gmail refuses to
 *   render SVG. It carries alt text and sits beside the wordmark, so a
 *   blocked image costs nothing.
 * - `border-radius` is ignored by Outlook. Corners go square there; the design
 *   does not depend on them.
 *
 * Every email also ships a plain-text part, rendered from the same content, so
 * the two can never drift.
 */

const COLOR = {
  page: "#ffffff",
  surface: "#f5f5f7",
  hairline: "#d2d2d7",
  heading: "#1d1d1f",
  body: "#1d1d1f",
  muted: "#6e6e73",
  faint: "#86868b",
  buttonBg: "#1d1d1f",
  buttonText: "#ffffff",
} as const

const FONT =
  "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"

const SITE_URL = "https://www.swarms.ai"

// The same PNG the marketplace emails use, so both products show one mark.
const LOGO_URL =
  "https://epvxmjqxtlqhxrpcrldq.supabase.co/storage/v1/object/public/images/email/swarms-logo.png"

export interface EmailDetailRow {
  label: string
  value: string
}

export interface EmailContent {
  /** The inbox preview line. Written per email, never left to chance. */
  preheader: string
  /** Small label above the title, e.g. "Waitlist". Optional. */
  eyebrow?: string
  title: string
  /** Name to greet, already resolved to something sensible. */
  greeting?: string
  /** Lead paragraphs. Plain sentences; **bold** is the only markup allowed. */
  paragraphs: string[]
  details?: {
    title?: string
    rows: EmailDetailRow[]
  }
  /** A quiet aside: what happens next, who to contact, what a link is for. */
  note?: { title?: string; body: string }
  button?: { label: string; url: string }
  /** Small print under the button. */
  footnote?: string
  /**
   * Marketing mail only. Adds an unsubscribe link to the footer; transactional
   * mail (confirmations, notifications) never carries one.
   */
  unsubscribeUrl?: string
}

/** Escapes a value for HTML. Every field below goes through this. */
export function escapeHtml(value: string): string {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/** Escapes, then allows the only markup callers may use: **bold** and newlines. */
function inline(value: string): string {
  return escapeHtml(value)
    .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight: 600;">$1</strong>')
    .replace(/\n/g, "<br>")
}

/** Drops the **bold** markers for the plain-text part. */
function plain(value: string): string {
  return String(value).replace(/\*\*(.+?)\*\*/g, "$1").trim()
}

function renderDetails(details: EmailContent["details"]): string {
  if (!details?.rows.length) return ""

  const rows = details.rows
    .map((row, i) => {
      const last = i === details.rows.length - 1
      const edge = last ? "" : `border-bottom: 1px solid ${COLOR.hairline};`
      return `
              <tr>
                <td style="padding: 12px 0; ${edge} font-family: ${FONT}; font-size: 14px; color: ${COLOR.muted};">${inline(row.label)}</td>
                <td align="right" style="padding: 12px 0; ${edge} font-family: ${FONT}; font-size: 14px; font-weight: 600; color: ${COLOR.heading};">${inline(row.value)}</td>
              </tr>`
    })
    .join("")

  const heading = details.title
    ? `<div style="font-family: ${FONT}; font-size: 13px; font-weight: 600; color: ${COLOR.muted}; padding-bottom: 10px;">${inline(details.title)}</div>`
    : ""

  return `
          <tr>
            <td style="padding: 8px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.surface}" style="width: 100%; border-collapse: separate; background-color: ${COLOR.surface}; border-radius: 14px;">
                <tr>
                  <td style="padding: 22px 24px;">
                    ${heading}
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">${rows}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

function renderNote(note: EmailContent["note"]): string {
  if (!note) return ""
  const title = note.title
    ? `<strong style="color: ${COLOR.heading}; font-weight: 600;">${inline(note.title)}</strong> `
    : ""
  return `
          <tr>
            <td style="padding: 24px 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td bgcolor="${COLOR.surface}" style="padding: 18px 22px; background-color: ${COLOR.surface}; border-radius: 14px; font-family: ${FONT}; font-size: 14px; line-height: 1.6; color: ${COLOR.muted};">
                    ${title}${inline(note.body)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

function renderButton(button: EmailContent["button"]): string {
  if (!button) return ""
  return `
          <tr>
            <td style="padding: 32px 0 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
                <tr>
                  <td bgcolor="${COLOR.buttonBg}" style="background-color: ${COLOR.buttonBg}; border-radius: 980px;">
                    <a href="${escapeHtml(button.url)}" style="display: inline-block; padding: 14px 30px; font-family: ${FONT}; font-size: 15px; font-weight: 500; line-height: 1; color: ${COLOR.buttonText}; text-decoration: none; border-radius: 980px;">${inline(button.label)}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
}

export interface RenderedEmail {
  html: string
  text: string
}

export function renderEmail(content: EmailContent): RenderedEmail {
  const year = new Date().getFullYear()

  const greeting = content.greeting
    ? `
          <tr>
            <td style="padding: 0 0 16px; font-family: ${FONT}; font-size: 17px; line-height: 1.55; color: ${COLOR.body};">Hi ${inline(content.greeting)},</td>
          </tr>`
    : ""

  const paragraphs = content.paragraphs
    .map(
      (p) => `
          <tr>
            <td style="padding: 0 0 16px; font-family: ${FONT}; font-size: 17px; line-height: 1.55; color: ${COLOR.body};">${inline(p)}</td>
          </tr>`,
    )
    .join("")

  const eyebrow = content.eyebrow
    ? `
          <tr>
            <td style="padding: 0 0 10px; font-family: ${FONT}; font-size: 13px; font-weight: 600; color: ${COLOR.muted};">${inline(content.eyebrow)}</td>
          </tr>`
    : ""

  const footnote = content.footnote
    ? `
          <tr>
            <td style="padding: 28px 0 0; font-family: ${FONT}; font-size: 13px; line-height: 1.6; color: ${COLOR.faint};">${inline(content.footnote)}</td>
          </tr>`
    : ""

  const unsubscribe = content.unsubscribeUrl
    ? `
              <div style="padding-top: 10px; color: ${COLOR.faint};">You're getting this because you signed up for Swarms. <a href="${escapeHtml(content.unsubscribeUrl)}" style="color: ${COLOR.heading}; text-decoration: underline;">Unsubscribe</a></div>`
    : ""

  const html = `<!DOCTYPE html>
<html lang="en" style="color-scheme: light; supported-color-schemes: light;">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="x-apple-disable-message-reformatting">
  <meta name="color-scheme" content="light">
  <meta name="supported-color-schemes" content="light">
  <title>${escapeHtml(plain(content.title))}</title>
  <style>
    :root { color-scheme: light; supported-color-schemes: light; }
    a { color: ${COLOR.heading}; }
    @media only screen and (max-width: 620px) {
      .sw-shell { padding: 16px 12px !important; }
      .sw-pad { padding: 28px 24px !important; }
      .sw-title { font-size: 24px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 0; width: 100%; background-color: ${COLOR.page}; color: ${COLOR.body};">
  <div style="display: none; max-height: 0; overflow: hidden; opacity: 0; mso-hide: all;">${escapeHtml(plain(content.preheader))}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="width: 100%; border-collapse: collapse; background-color: ${COLOR.page};">
    <tr>
      <td class="sw-shell" align="center" style="padding: 40px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLOR.page}" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: ${COLOR.page};">

          <tr>
            <td class="sw-pad" style="padding: 8px 40px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr>
                  <td style="padding-right: 10px; vertical-align: middle;"><img src="${LOGO_URL}" width="26" height="26" alt="Swarms" style="display: block; width: 26px; height: 26px; border: 0;"></td>
                  <td style="vertical-align: middle; font-family: ${FONT}; font-size: 16px; font-weight: 600; letter-spacing: -0.01em; color: ${COLOR.heading};">Swarms</td>
                </tr>
              </table>
            </td>
          </tr>

          <tr>
            <td class="sw-pad" style="padding: 32px 40px 40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; border-collapse: collapse;">${eyebrow}
                <tr>
                  <td class="sw-title" style="padding: 0 0 20px; font-family: ${FONT}; font-size: 30px; font-weight: 600; line-height: 1.15; letter-spacing: -0.022em; color: ${COLOR.heading};">${inline(content.title)}</td>
                </tr>${greeting}${paragraphs}${renderDetails(content.details)}${renderNote(content.note)}${renderButton(content.button)}${footnote}
              </table>
            </td>
          </tr>

          <tr>
            <td style="padding: 0 40px;"><div style="height: 1px; background-color: ${COLOR.hairline}; line-height: 1px; font-size: 0;">&nbsp;</div></td>
          </tr>

          <tr>
            <td class="sw-pad" style="padding: 24px 40px 32px; font-family: ${FONT}; font-size: 13px; line-height: 1.6; color: ${COLOR.faint};">
              Questions? Reply to this email or visit <a href="${SITE_URL}" style="color: ${COLOR.heading}; text-decoration: underline;">swarms.ai</a>.${unsubscribe}
              <div style="padding-top: 10px; color: ${COLOR.faint};">&copy; ${year} Swarms Corporation</div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`

  const textParts: string[] = []
  if (content.greeting) textParts.push(`Hi ${plain(content.greeting)},`)
  textParts.push(plain(content.title))
  content.paragraphs.forEach((p) => textParts.push(plain(p)))
  if (content.details?.rows.length) {
    const head = content.details.title ? `${content.details.title}:` : ""
    const rows = content.details.rows.map((r) => `- ${r.label}: ${plain(r.value)}`).join("\n")
    textParts.push([head, rows].filter(Boolean).join("\n"))
  }
  if (content.note) {
    const title = content.note.title ?? ""
    // Titles are written as sentence openers ("Next,"), so only add a colon
    // when the title does not already end in punctuation.
    const join = /[,.:;]$/.test(title) ? " " : ": "
    textParts.push([title, plain(content.note.body)].filter(Boolean).join(title ? join : ""))
  }
  if (content.button) textParts.push(`${content.button.label}: ${content.button.url}`)
  if (content.footnote) textParts.push(plain(content.footnote))
  textParts.push(`Questions? Reply to this email or visit ${SITE_URL}.\n\n© ${year} Swarms Corporation`)
  if (content.unsubscribeUrl) textParts.push(`Unsubscribe: ${content.unsubscribeUrl}`)

  return { html, text: textParts.join("\n\n") }
}
