import { Resend } from "resend"

/**
 * The one way this site sends mail. Every message goes out from
 * notifications@swarms.world, the same sender the Swarms Marketplace uses, so
 * recipients see one consistent sender across both products.
 *
 * The Resend client is created on first use rather than at import time: the
 * API routes that import this file are loaded during `next build` to collect
 * their config, and the Resend constructor throws when the key is absent,
 * which used to make builds fail outside Vercel.
 */

export const EMAIL_FROM = "Swarms <notifications@swarms.world>"
export const EMAIL_REPLY_TO = "kye@swarms.world"

let client: Resend | undefined

export function getResend(): Resend {
  client ??= new Resend(process.env.RESEND_API_KEY)
  return client
}

export async function sendEmail(params: {
  to: string | string[]
  subject: string
  html: string
  text?: string
  replyTo?: string
}): Promise<{ id?: string; error?: string }> {
  const { replyTo, ...rest } = params
  const { data, error } = await getResend().emails.send({
    from: EMAIL_FROM,
    replyTo: replyTo ?? EMAIL_REPLY_TO,
    ...rest,
  })
  if (error) {
    console.error("Resend API error:", error)
    return { error: error.message || "Failed to send email" }
  }
  return { id: data?.id }
}
