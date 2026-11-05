import { Resend } from "resend"

// `new Resend()` throws when the key is missing, and Next imports every route
// module while it collects page data, so a client built at module scope made
// `pnpm build` fail on any checkout without RESEND_API_KEY. Build it on first
// use instead; callers handle a missing key at request time.
let client: Resend | null = null

export function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  client ??= new Resend(key)
  return client
}
