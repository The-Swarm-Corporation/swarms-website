import { NextResponse } from "next/server"
import { API_NOT_FOUND } from "@/lib/api-error"

// Unknown /api paths must return structured JSON, not the HTML 404 page:
// agents probing the API surface cannot parse an app-shell error page. The
// body is shared with proxy.ts so blocked scaffolding routes and genuinely
// missing routes are indistinguishable.
function notFound() {
  return NextResponse.json(API_NOT_FOUND, { status: 404 })
}

export const GET = notFound
export const POST = notFound
export const PUT = notFound
export const PATCH = notFound
export const DELETE = notFound
export const HEAD = notFound
export const OPTIONS = notFound
