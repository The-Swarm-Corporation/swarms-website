import type { Metadata } from "next"
import { siteConfig } from "@/app/metadata"
import { getPostBySlug } from "@/lib/blog"

interface ZhBlogPostLayoutProps {
  children: React.ReactNode
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ZhBlogPostLayoutProps): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug, "zh")

  if (!post) {
    return {
      title: { absolute: "未找到文章 | Swarms 博客" },
      description: "您访问的博客文章不存在。",
    }
  }

  const url = `${siteConfig.url}/zh/blog/${post.slug}`

  return {
    title: { absolute: `${post.title} | Swarms 博客` },
    description: post.description,
    keywords: [
      ...post.categories,
      "swarms博客", "AI博客", "多智能体系统", "AI智能体", "智能体编排",
      "多智能体框架", "AI智能体开发", "企业级AI",
    ],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: "zh_CN",
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.categories,
      images: [
        {
          url: post.image ?? "/seo_image.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "@swarms_corp",
      site: "@swarms_corp",
    },
    alternates: {
      canonical: url,
      languages: {
        en: `${siteConfig.url}/blog/${post.slug}`,
        "zh-Hans": url,
      },
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

export default function ZhBlogPostLayout({ children }: ZhBlogPostLayoutProps) {
  return <>{children}</>
}
