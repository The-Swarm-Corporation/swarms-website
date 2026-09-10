import { type NextRequest, NextResponse } from "next/server"
import { API_NOT_FOUND } from "./lib/api-error"

/**
 * Two jobs, both about how machines read this site.
 *
 * 1. Blocks debug/scaffolding API routes from ever being reachable in
 *    production. Next 16 renamed the `middleware` file convention to `proxy`;
 *    this is that convention, not an Express-style middleware chain.
 *
 *    `/api/test-audience` shipped to production and served the entire Resend
 *    audience — every subscriber's email and name — to unauthenticated GET
 *    requests. The route itself is deleted, but nothing structurally prevented
 *    it: this app has no auth layer, so every route under `app/api` is public
 *    the moment it is merged.
 *
 *    This is the backstop for that class of mistake. A route whose path
 *    segment is named like scaffolding is 404'd in production regardless of
 *    what it does. The body is the same JSON the api catch-all serves, so the
 *    response is indistinguishable from a route that does not exist.
 *
 *    It is intentionally NOT an allowlist of known-good routes: that breaks
 *    every time a legitimate route is added, and a guard people route around
 *    is worse than no guard. Genuine endpoints need real authentication,
 *    which this does not attempt to provide.
 *
 * 2. Markdown content negotiation for blog posts (acceptmarkdown.com). Blog
 *    posts already publish a raw-markdown variant at /blog/<slug>/markdown;
 *    a request for /blog/<slug> with `Accept: text/markdown` is 307-redirected
 *    to it, and the redirect carries `Vary: Accept`. See the inline comment
 *    for why this is a redirect and not a rewrite.
 */

const BLOCKED_SEGMENT = /^(test|tests|debug|dev|internal|admin|_test)([-_].*)?$/i

// /blog/<slug> or /zh/blog/<slug>, excluding deeper paths like the
// /markdown variant itself and excluding the /blog index pages.
const NEGOTIATED_BLOG_PATH = /^(\/zh)?\/blog\/([^/]+)$/

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/api")) {
    // Non-production (local dev, preview builds) keeps scaffolding routes
    // reachable so they stay useful for the debugging they were written for.
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.next()
    }

    const segments = pathname.split("/").filter(Boolean)
    if (segments.some((segment) => BLOCKED_SEGMENT.test(segment))) {
      return NextResponse.json(API_NOT_FOUND, { status: 404 })
    }

    return NextResponse.next()
  }

  const blogMatch = pathname.match(NEGOTIATED_BLOG_PATH)
  if (blogMatch) {
    const accept = request.headers.get("accept") ?? ""

    if (accept.includes("text/markdown")) {
      // Redirect rather than rewrite: both Next's local server and Vercel's
      // routing layer overwrite a middleware-set Vary on prerendered HTML
      // (confirmed against production), so a rewrite would leave the HTML
      // variant cacheable without Vary and let a CDN hand cached HTML to a
      // markdown request. With a redirect every URL serves exactly one
      // representation, which no cache can confuse, and middleware runs
      // before Vercel's cache so the redirect always fires. The redirect
      // response itself is the negotiated one, so it carries Vary: Accept.
      const url = request.nextUrl.clone()
      url.pathname = `${pathname}/markdown`
      const response = NextResponse.redirect(url, 307)
      response.headers.set("Vary", "Accept, Accept-Encoding")
      return response
    }

    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  // API routes for the scaffolding guard; blog post routes for markdown
  // negotiation. Page routes stay unmatched otherwise: content paths collide
  // with the blocked-segment words often enough that blocking them would
  // cause real breakage.
  matcher: ["/api/:path*", "/blog/:slug", "/zh/blog/:slug"],
}
