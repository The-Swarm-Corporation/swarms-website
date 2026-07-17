import { siteConfig } from "@/app/metadata"
import { academyFaq } from "@/lib/academy/academy-faq"

const url = "https://swarms.ai/academy"

const collectionJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Swarms Academy — Free Multi-Agent AI Courses",
  description:
    "Swarms Academy courses teach the full multi-agent stack for free: a hands-on Swarms API course with live trials and quizzes, plus learning tracks for the Swarms Marketplace, the open-source Swarms framework, and more.",
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
        "@type": "Course",
        position: 1,
        name: "The Swarms API Course",
        url: "https://swarms.ai/academy/swarms-api",
        description:
          "Free four-part multi-agent course: run your first agent, master streaming and tools, orchestrate multi-agent swarms, and ship to production.",
        provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
        isAccessibleForFree: true,
        educationalLevel: "Beginner",
        inLanguage: "en",
        timeRequired: "PT6H",
      },
      {
        "@type": "Course",
        position: 2,
        name: "Swarms Marketplace",
        url: "https://swarms.world",
        description: "Learn to publish, price, and sell AI agents and prompts.",
        provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
        isAccessibleForFree: true,
        inLanguage: "en",
      },
      {
        "@type": "Course",
        position: 3,
        name: "Swarms Framework",
        url: "https://docs.swarms.world",
        description: "Master the production-grade Python multi-agent framework.",
        provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
        isAccessibleForFree: true,
        inLanguage: "en",
      },
      {
        "@type": "Course",
        position: 4,
        name: "And More",
        url: `${siteConfig.url}/products`,
        description: "Swarms RS, Swarms Chat, simulations, and enterprise guides.",
        provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
        isAccessibleForFree: true,
        inLanguage: "en",
      },
    ],
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: academyFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Swarms Academy", item: url },
  ],
}

export const academyJsonLd = [collectionJsonLd, faqJsonLd, breadcrumbJsonLd]
