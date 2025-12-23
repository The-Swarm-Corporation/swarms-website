import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Swarms API - Multi-Agent Orchestration Platform",
  description: "Build, deploy, and orchestrate intelligent agent swarms with our RESTful API. Built on a Rust runtime for sub-millisecond initialization and enterprise-grade performance.",
  keywords: ["Swarms API", "Multi-Agent", "Orchestration", "REST API", "AI Agents", "Enterprise AI"],
  openGraph: {
    title: "Swarms API - Multi-Agent Orchestration Platform",
    description: "Build, deploy, and orchestrate intelligent agent swarms with our RESTful API. Built on a Rust runtime for sub-millisecond initialization and enterprise-grade performance.",
    type: "website",
    url: "https://swarms.world/api",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms API - Multi-Agent Orchestration Platform",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Swarms API - Multi-Agent Orchestration Platform",
    description: "Build, deploy, and orchestrate intelligent agent swarms with our RESTful API. Built on a Rust runtime for sub-millisecond initialization and enterprise-grade performance.",
    images: [
      {
        url: "/seo_image.jpg",
        width: 1200,
        height: 630,
        alt: "Swarms API - Multi-Agent Orchestration Platform",
      },
    ],
  },
}

export default function APILayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

