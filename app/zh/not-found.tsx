import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { NotFoundContent } from "@/components/not-found-content"

// Same reasoning as the English 404: never indexed, and never inheriting the
// /zh layout's canonical, which would otherwise mark a missing page as a
// duplicate of the Chinese homepage.
export const metadata: Metadata = {
  title: { absolute: "页面不存在 | Swarms AI" },
  description: "您访问的页面不存在。",
  robots: { index: false, follow: true },
  alternates: {},
}

export default function ZhNotFound() {
  return (
    <>
      <Navigation />
      <NotFoundContent locale="zh" />
    </>
  )
}
