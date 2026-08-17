import HiringClientPage from "./HiringClientPage"
import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Careers - The Swarms Corporation" },
  description:
    "Join The Swarms Corporation and advance the agent economy. We're hiring Agent Engineers, Front-end Engineers, a Rust Team Lead, Finance, Accounting Interns, CMO, and COO in San Francisco, Palo Alto, and New York.",
  keywords: [
    "careers",
    "jobs",
    "hiring",
    "agent engineer",
    "front-end engineer",
    "rust team lead",
    "CMO",
    "COO",
    "AI",
    "agent economy",
    "san francisco",
    "palo alto",
    "new york",
  ],
  openGraph: {
    title: "Careers - The Swarms Corporation",
    description:
      "Join The Swarms Corporation and advance the agent economy.",
    type: "website",
  },
}

export default function HiringPage() {
  return (
    <>
      <Navigation />
      <HiringClientPage />
    </>
  )
}
