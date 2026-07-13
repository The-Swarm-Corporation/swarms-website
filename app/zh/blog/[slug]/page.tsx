import Link from "next/link"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlogCover } from "@/components/blog/blog-cover"
import { BlogCard } from "@/components/blog/blog-card"
import { BlogMarkdown } from "@/components/blog/blog-markdown"
import { ShareButtons } from "@/components/blog/share-buttons"
import { CopyPageButton } from "@/components/blog/copy-page-button"
import { LanguageToggle } from "@/components/language-toggle"
import { formatPostMarkdown, getAllPosts, getPostBySlug } from "@/lib/blog"
import { siteConfig } from "@/app/metadata"

interface ZhBlogPostPageProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return getAllPosts("zh").map((post) => ({ slug: post.slug }))
}

export default async function ZhBlogPostPage({ params }: ZhBlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug, "zh")

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllPosts("zh")
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3)

  // The frontmatter title is already rendered above as the page H1 — drop a
  // duplicate leading "# Title" heading from the markdown body if present.
  const bodyContent = post.content.replace(/^\s*#\s+.+(\r?\n)+/, "")

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="pt-28 sm:pt-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <nav aria-label="面包屑导航" className="mx-auto max-w-6xl">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/zh" className="transition-colors duration-300 hover:text-white">
                  首页
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/zh/blog" className="transition-colors duration-300 hover:text-white">
                  博客
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-white/60" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <article className="mx-auto max-w-6xl">
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/zh/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                返回博客
              </Link>
              <div className="flex flex-wrap items-center gap-2">
                <CopyPageButton
                  markdown={formatPostMarkdown(post)}
                  markdownUrl={`/zh/blog/${post.slug}/markdown`}
                  pageUrl={`${siteConfig.url}/zh/blog/${post.slug}`}
                  labels={{
                    copyPage: "复制页面",
                    copied: "已复制",
                    copyPageDescription: "以 Markdown 格式复制，便于用于 LLM",
                    viewMarkdown: "以 Markdown 查看",
                    viewMarkdownDescription: "以纯文本查看此页面",
                    copyLink: "复制链接",
                    copyLinkDescription: "复制本文链接",
                  }}
                />
                <LanguageToggle href={`/blog/${post.slug}`} label="English" />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-2">
              {post.categories.map((category) => (
                <span
                  key={category}
                  className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs font-medium uppercase tracking-[0.15em] text-white/60"
                >
                  {category}
                </span>
              ))}
            </div>

            <h1 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              {post.title}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/55 sm:text-lg">
              {post.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.08] pb-8 text-sm text-white/45">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{format(parseISO(post.date), "yyyy年M月d日")}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </article>

          {post.image && (
            <div className="mx-auto mt-10 max-w-6xl">
              <BlogCover
                slug={post.slug}
                image={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full rounded-2xl"
              />
            </div>
          )}

          <div className="mx-auto max-w-6xl py-14 sm:py-16">
            <div className="prose-blog">
              <BlogMarkdown content={bodyContent} />
            </div>

            <div className="mt-16 border-t border-white/[0.08] pt-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-white/45">
                分享本文
              </h2>
              <div className="mt-5">
                <ShareButtons
                  title={post.title}
                  description={post.description}
                  url={`${siteConfig.url}/zh/blog/${post.slug}`}
                />
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mx-auto max-w-6xl border-t border-white/[0.08] py-16 sm:py-20">
              <h2 className="mb-10 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                更多文章
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} locale="zh" />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
