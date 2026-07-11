import type { Metadata } from "next"
import { siteConfig } from "../../metadata"
import { getPostBySlug, getAllPosts } from "@/lib/blog"

interface BlogPostLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: BlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return {
      title: { absolute: "Post Not Found | Swarms Blog" },
      description: "The requested blog post could not be found.",
    }
  }

  // The og:image / twitter:image tags are generated automatically by the
  // sibling opengraph-image.tsx / twitter-image.tsx files in this route
  // segment (they pass through post.image when set, otherwise render a
  // branded title+date card), so no manual images array is needed here.
  return {
    title: { absolute: `${post.title} | Swarms Blog` },
    description: post.description,
    keywords: [
      ...post.categories,
      "swarms blog", "AI blog", "multi-agent blog", "AI agents", "enterprise AI",
      "AI orchestration", "agent collaboration", "AI automation", "AI tutorials"
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.categories,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@swarms_corp",
      site: "@swarms_corp",
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${post.slug}`,
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
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostLayout({ children, params }: BlogPostLayoutProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <>
        {/* SEO: 404 structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Post Not Found",
              "description": "The requested blog post could not be found.",
              "url": `${siteConfig.url}/blog/${slug}`,
            }),
          }}
        />
        {children}
      </>
    )
  }

  return (
    <>
      {/* SEO: Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.image ?? `${siteConfig.url}/blog/${post.slug}/opengraph-image`,
            "author": {
              "@type": "Person",
              "name": post.author
            },
            "publisher": {
              "@type": "Organization",
              "name": siteConfig.company.name,
              "url": siteConfig.url,
              "logo": {
                "@type": "ImageObject",
                "url": "/logo.svg"
              }
            },
            "datePublished": post.date,
            "dateModified": post.date,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${siteConfig.url}/blog/${post.slug}`
            },
            "keywords": post.categories.join(", "),
            "articleSection": "AI & Technology",
            "inLanguage": "en-US",
            "potentialAction": {
              "@type": "ReadAction",
              "target": `${siteConfig.url}/blog/${post.slug}`
            }
          }),
        }}
      />
      {children}
    </>
  )
} 