import { NextResponse } from "next/server"

/**
 * Structured JSON error shape shared by every API route, so agents get a
 * machine-parseable code, a human-readable message, and a resolution hint
 * instead of an HTML error page. Clients should read `error.message`.
 */
export interface ApiError {
  error: {
    code: string
    message: string
    hint?: string
  }
}

export function apiError(
  status: number,
  code: string,
  message: string,
  hint?: string,
): NextResponse<ApiError> {
  return NextResponse.json({ error: { code, message, ...(hint ? { hint } : {}) } }, { status })
}

/**
 * The one 404 body served for every unknown or blocked /api path, from both
 * the catch-all route and proxy.ts, so a blocked scaffolding route stays
 * indistinguishable from a route that never existed.
 */
export const API_NOT_FOUND = {
  error: {
    code: "not_found",
    message: "No API route exists at this path.",
    hint: "The swarms.ai site API only serves the routes used by the site itself. The public Swarms API is documented at https://docs.swarms.ai and the site index is at https://www.swarms.ai/sitemap.xml.",
  },
} as const
