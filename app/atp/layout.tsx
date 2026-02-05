import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "../metadata"

export const metadata: Metadata = {
  title: "ATP — Agent Trade Protocol | Swarms AI",
  description:
    "The premier agent-to-agent payment protocol on Solana. Automatic payment processing, response encryption, and zero-config middleware for the agent economy.",
}

export default function ATPLayout({ children }: { children: React.ReactNode }) {
  return children
}
