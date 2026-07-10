import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: { absolute: "Installation - Swarms Framework" },
  description:
    "Learn how to install the Swarms framework using pip, uv, conda, or from source. Get started with multi-agent AI orchestration in minutes.",
  keywords: [
    "swarms installation",
    "pip install swarms",
    "uv install",
    "conda install",
    "python package",
    "AI framework",
  ],
}

export default function InstallationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
