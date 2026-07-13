import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Startup Program | Swarms AI" },
  description:
    "Accelerate your AI startup with technical support, go-to-market resources, and up to $10,000 in credits.",
}

export default function StartupsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
