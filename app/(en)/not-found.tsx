import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { NotFoundContent } from "@/components/not-found-content"

// A 404 must never be indexed, and must never inherit the root layout's
// canonical (which would point Google at the homepage — the classic way a
// missing page gets reported as a soft 404 instead of a real one).
export const metadata: Metadata = {
  title: { absolute: "Page not found | Swarms AI" },
  description: "The page you are looking for does not exist.",
  robots: { index: false, follow: true },
  alternates: {},
}

export default function NotFound() {
  return (
    <>
      <Navigation />
      <NotFoundContent locale="en" />
    </>
  )
}
