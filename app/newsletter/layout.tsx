import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Newsletter — Swarms AI Updates, Tutorials & Livestreams" },
  description:
    "Join the Swarms newsletter for updates, tutorials, livestreams, and more.",
}

export default function NewsletterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
