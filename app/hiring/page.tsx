import HiringClientPage from "./HiringClientPage"
import { Navigation } from "@/components/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers - The Swarms Corporation",
  description:
    "Join The Swarms Corporation and advance the agent economy. We're hiring Agent Engineers, Front-end Engineers, Finance, Accounting Interns, CMO, and COO.",
  keywords: [
    "careers",
    "jobs",
    "hiring",
    "agent engineer",
    "front-end engineer",
    "CMO",
    "COO",
    "AI",
    "agent economy",
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
