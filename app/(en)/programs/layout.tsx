import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Research Programs | Swarms AI" },
  description: "Accelerate cutting-edge multi-agent research with limitless swarms credits and comprehensive support.",
}

export default function ProgramsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
