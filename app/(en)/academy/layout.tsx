import type React from "react"
import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"

const title = "Swarms Academy — Free Multi-Agent AI Courses"
const description =
  "Swarms Academy courses teach the full multi-agent stack for free: a hands-on Swarms API course with live trials and quizzes, plus learning tracks for the Swarms Marketplace, the open-source Swarms framework, and more. Go from your first AI agent to production multi-agent systems."
const url = "https://swarms.ai/academy"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms academy",
    "swarms academy courses",
    "multi-agent course",
    "multi agent course",
    "multi-agent systems course",
    "free ai agent course",
    "ai agent course",
    "learn ai agents",
    "learn multi-agent systems",
    "agent orchestration course",
    "agent engineering course",
    "swarms api course",
    "swarms api tutorial",
    "swarms framework course",
    "swarms marketplace course",
    "learn swarms",
    "swarms tutorial",
    "ai agent training",
    "build ai agents course",
    "multi-agent orchestration tutorial",
    "ai agent school",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms Academy — Free Multi-Agent AI Courses",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms Academy — Free Multi-Agent AI Courses",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
