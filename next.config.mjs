/** @type {import('next').NextConfig} */

// Routes that were removed but are still being crawled. Each 301s to the
// closest surviving page so inbound links keep their value instead of
// dead-ending in Search Console's "Not found (404)" bucket.
const removedRoutes = [
  { source: "/atp", destination: "/api" },
  { source: "/finance", destination: "/applications" },
  { source: "/kol-program", destination: "/programs" },
]

// Blog posts renamed after publication. The old slugs were live long enough to
// be indexed and linked, so they redirect rather than 404.
const renamedPosts = [
  { from: "what-is-cognitive-superintelligence", to: "what-is-collective-superintelligence" },
  { from: "unique-space-invader-avatars", to: "unique-agent-avatars" },
]

const nextConfig = {
  turbopack: {
    root: import.meta.dirname,
  },
  images: {
    // A few older posts use cover art hosted on Twitter instead of /public.
    remotePatterns: [{ protocol: "https", hostname: "pbs.twimg.com" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      ...removedRoutes.map((route) => ({ ...route, permanent: true })),
      ...renamedPosts.flatMap(({ from, to }) => [
        { source: `/blog/${from}`, destination: `/blog/${to}`, permanent: true },
        { source: `/zh/blog/${from}`, destination: `/zh/blog/${to}`, permanent: true },
      ]),
    ]
  },
  async headers() {
    return [
      {
        // The /markdown routes serve the raw source of a post that is already
        // published as HTML at the parent URL. They exist for AI agents and
        // copy-to-clipboard, not for search results, so keeping them out of the
        // index stops ~74 duplicate-content URLs from competing with the posts.
        source: "/blog/:slug/markdown",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        source: "/zh/blog/:slug/markdown",
        headers: [{ key: "X-Robots-Tag", value: "noindex, follow" }],
      },
      {
        // Blog posts are Accept-negotiated (proxy.ts rewrites text/markdown
        // requests to the /markdown variant), so caches must key on Accept
        // for BOTH variants or a CDN can serve cached HTML to a markdown
        // request. Set here as well as in proxy.ts because Next drops the
        // middleware-set Vary on prerendered HTML responses.
        source: "/blog/:slug",
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      },
      {
        source: "/zh/blog/:slug",
        headers: [{ key: "Vary", value: "Accept, Accept-Encoding" }],
      },
    ]
  },
}

export default nextConfig
