import type { Metadata } from "next"
import { montserrat, orbitron } from "@/app/fonts"
import { Navigation } from "@/components/navigation"
import { NotFoundContent } from "@/components/not-found-content"
import { Footer } from "@/components/footer"
import "./globals.css"

// This file catches URLs that match no route at all, which is the bulk of the
// 404s in Search Console. The route groups each ship their own root layout and
// there is no shared app/layout.tsx, so this page has no layout above it and
// must render its own <html> and <body>.
export const metadata: Metadata = {
  title: { absolute: "Page not found | Swarms AI" },
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className="dark smooth-scroll" style={{ colorScheme: "dark" }}>
      <body className={`${montserrat.variable} ${orbitron.variable} font-sans antialiased`}>
        <Navigation />
        <NotFoundContent locale="en" />
        <Footer />
      </body>
    </html>
  )
}
