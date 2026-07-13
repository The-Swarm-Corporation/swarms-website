import type { Metadata } from "next"
import { Navigation } from "@/components/navigation"
import { BlogFeatured } from "@/components/blog/blog-featured"
import { BlogIndexClient } from "@/components/blog/blog-index-client"
import { LanguageToggle } from "@/components/language-toggle"
import { getAllPosts, getAllCategories } from "@/lib/blog"
import { siteConfig, zhSiteConfig } from "@/app/metadata"

export const metadata: Metadata = {
  title: { absolute: "博客 - Swarms AI" },
  description:
    "Swarms 中文博客：多智能体系统工程笔记、产品更新与实战指南，涵盖智能体编排、AI智能体开发与生产部署。",
  keywords: [
    "swarms博客",
    "多智能体系统",
    "AI智能体教程",
    "智能体编排",
    "AI智能体开发",
    "多智能体框架",
    ...zhSiteConfig.keywords.slice(0, 10),
  ],
  alternates: {
    canonical: `${siteConfig.url}/zh/blog`,
    languages: {
      en: `${siteConfig.url}/blog`,
      "zh-Hans": `${siteConfig.url}/zh/blog`,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: `${siteConfig.url}/zh/blog`,
    title: "博客 - Swarms AI",
    description:
      "Swarms 中文博客：多智能体系统工程笔记、产品更新与实战指南。",
    siteName: siteConfig.name,
    images: [{ url: "/seo_image.jpg", width: 1200, height: 630 }],
  },
}

export default function ZhBlogPage() {
  const posts = getAllPosts("zh")
  const categories = getAllCategories("zh")
  const [featured] = posts

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="pt-28 sm:pt-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                博客
              </p>
              <LanguageToggle href="/blog" label="English" />
            </div>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl">
              Swarms 博客
            </h1>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              多智能体系统工程笔记、产品更新与实战指南，助你用 Swarms 构建生产级 AI 智能体。
            </p>
          </div>

          {featured && (
            <div className="mx-auto mt-10 max-w-7xl sm:mt-14">
              <BlogFeatured post={featured} locale="zh" />
            </div>
          )}

          <div className="mx-auto max-w-7xl pb-20 pt-14 sm:pb-28 sm:pt-20">
            <BlogIndexClient posts={posts} categories={categories} locale="zh" />
          </div>
        </div>
      </main>
    </div>
  )
}
