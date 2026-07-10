import type { Metadata } from "next"
import { siteConfig } from "../metadata"

const title = "Swarms Research — Multi-Agent, Multimodal & Large-Scale Agentic Simulation"
const description =
  "Swarms Research advances multi-agent collaboration, multimodal intelligence, and large-scale agentic simulation. Explore active projects including VLAM, ModelGrid, HospitalSim, DART, SpikeMamba, and Senator Assembly."
const url = "https://swarms.ai/research"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms research",
    "multi-agent research",
    "ai research lab",
    "vision language action model",
    "VLAM",
    "ModelGrid",
    "HospitalSim",
    "multi-agent simulation",
    "spiking neural networks",
    "state space models",
    "mamba architecture",
    "diffusion transformer",
    "agentic simulation",
    "multimodal ai research",
    "autonomous systems research",
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
        alt: title,
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
        alt: title,
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

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: title,
  description,
  url,
  image: `${siteConfig.url}/seo_image.jpg`,
  isPartOf: {
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
  },
  mainEntity: {
    "@type": "ItemList",
    itemListElement: [
      {
        "@type": "ResearchProject",
        position: 1,
        name: "VLAM",
        description: "Vision-Language-Action Model combining vision perception, natural language understanding, and robotic action prediction.",
        url: "https://github.com/The-Swarm-Corporation/VLAM",
      },
      {
        "@type": "ResearchProject",
        position: 2,
        name: "ModelGrid",
        description: "A quantitative framework for dynamic memory allocation in multi-model deployment.",
        url: "https://github.com/The-Swarm-Corporation/ModelGrid",
      },
      {
        "@type": "ResearchProject",
        position: 3,
        name: "HospitalSim",
        description: "Multi-agent simulation of real-world hospital operations, patient care, and emergency response.",
        url: "https://github.com/The-Swarm-Corporation/HospitalSim",
      },
      {
        "@type": "ResearchProject",
        position: 4,
        name: "DART",
        description: "Diffusion-Autoregressive Recursive Transformer combining diffusion models with autoregressive generation.",
        url: "https://github.com/The-Swarm-Corporation/DART",
      },
      {
        "@type": "ResearchProject",
        position: 5,
        name: "SpikeMamba",
        description: "A joint spiking neural network and Mamba state space model architecture for language modeling.",
        url: "https://github.com/The-Swarm-Corporation/SpikeMamba",
      },
    ],
  },
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Research", item: url },
  ],
}

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  )
}
