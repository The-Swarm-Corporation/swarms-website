import { type NextRequest, NextResponse } from "next/server"

/**
 * Blocks debug/scaffolding API routes from ever being reachable in production.
 *
 * Next 16 renamed the `middleware` file convention to `proxy`; this is that
 * convention, not an Express-style middleware chain.
 *
 * `/api/test-audience` shipped to production and served the entire Resend
 * audience — every subscriber's email and name — to unauthenticated GET
 * requests. The route itself is deleted, but nothing structurally prevented
 * it: this app has no auth layer, so every route under `app/api` is public
 * the moment it is merged.
 *
 * This is the backstop for that class of mistake. A route whose path segment
 * is named like scaffolding is 404'd in production regardless of what it
 * does. 404 rather than 403 so the response is indistinguishable from a route
 * that does not exist.
 *
 * It is intentionally NOT an allowlist of known-good routes: that breaks
 * every time a legitimate route is added, and a guard people route around is
 * worse than no guard. Genuine endpoints need real authentication, which this
 * does not attempt to provide.
 */

const BLOCKED_SEGMENT = /^(test|tests|debug|dev|internal|admin|_test)([-_].*)?$/i

export function proxy(request: NextRequest) {
  // Non-production (local dev, preview builds) keeps these reachable so they
  // stay useful for the debugging they were written for.
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next()
  }

  const segments = request.nextUrl.pathname.split("/").filter(Boolean)

  if (segments.some((segment) => BLOCKED_SEGMENT.test(segment))) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  // Scoped to API routes: page routes are content and are matched by the
  // same words often enough that blocking them would cause real breakage.
  matcher: "/api/:path*",
}
