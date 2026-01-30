import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Newsletter",
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
