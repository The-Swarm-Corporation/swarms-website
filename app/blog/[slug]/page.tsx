import { isValidElement } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format, parseISO } from "date-fns"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { BlogCover } from "@/components/blog/blog-cover"
import { BlogCard } from "@/components/blog/blog-card"
import { MermaidDiagram } from "@/components/blog/mermaid-diagram"
import { ShareButtons } from "@/components/blog/share-buttons"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { siteConfig } from "@/app/metadata"

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getAllPosts()
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
          <nav aria-label="Breadcrumb" className="mx-auto max-w-4xl">
            <ol className="flex items-center gap-2 text-sm text-white/40">
              <li>
                <Link href="/" className="transition-colors duration-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors duration-300 hover:text-white">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate text-white/60" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <article className="mx-auto max-w-4xl">
            <Link
              href="/blog"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/50 transition-colors duration-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to blog
            </Link>

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
                <time dateTime={post.date}>{format(parseISO(post.date), "MMMM d, yyyy")}</time>
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </article>

          {post.image && (
            <div className="mx-auto mt-10 max-w-4xl">
              <BlogCover
                slug={post.slug}
                image={post.image}
                alt={post.title}
                className="aspect-[16/9] w-full rounded-2xl"
              />
            </div>
          )}

          <div className="mx-auto max-w-4xl py-14 sm:py-16">
            <div className="prose-blog">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                  video: ({ children, node, ...props }) => (
                    <video
                      {...props}
                      className="mb-8 w-full rounded-2xl border border-white/10"
                    >
                      {children}
                    </video>
                  ),
                  h1: ({ children }) => (
                    <h1 className="mb-6 mt-12 text-3xl font-semibold tracking-tighter text-white first:mt-0 sm:text-4xl">
                      {children}
                    </h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="mb-5 mt-10 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mb-4 mt-8 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h4 className="mb-3 mt-6 text-lg font-semibold tracking-tight text-white">
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="mb-6 text-base leading-relaxed text-white/65 sm:text-lg">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="mb-6 list-disc space-y-3 pl-6 text-base leading-relaxed text-white/65 sm:text-lg">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="mb-6 list-decimal space-y-3 pl-6 text-base leading-relaxed text-white/65 sm:text-lg">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => <li className="text-white/65">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="my-8 rounded-r-lg border-l-2 border-white/20 bg-white/[0.03] py-4 pl-6">
                      <div className="italic text-white/60">{children}</div>
                    </blockquote>
                  ),
                  code: ({ children, className }) => {
                    const isInline = !className
                    if (className?.includes("language-mermaid")) {
                      return <MermaidDiagram chart={String(children)} />
                    }
                    if (isInline) {
                      return (
                        <code className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.9em] text-white/85">
                          {children}
                        </code>
                      )
                    }
                    return (
                      <code className="block overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-6 font-mono text-sm text-white/75">
                        {children}
                      </code>
                    )
                  },
                  pre: ({ children }) => {
                    const child = Array.isArray(children) ? children[0] : children
                    if (isValidElement(child) && child.type === MermaidDiagram) {
                      return child
                    }
                    return (
                      <pre className="mb-8 overflow-x-auto rounded-lg border border-white/10 bg-white/[0.03] p-0 text-sm">
                        {children}
                      </pre>
                    )
                  },
                  table: ({ children }) => (
                    <div className="mb-8 overflow-x-auto rounded-lg border border-white/10">
                      <table className="min-w-full">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border-b border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium uppercase tracking-wide text-white/60">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border-b border-white/[0.06] px-4 py-3 text-sm text-white/65">
                      {children}
                    </td>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="text-white underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-white"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {children}
                    </a>
                  ),
                  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                  em: ({ children }) => <em className="italic text-white/70">{children}</em>,
                  hr: () => <hr className="my-10 border-white/10" />,
                }}
              >
                {bodyContent}
              </ReactMarkdown>
            </div>

            <div className="mt-16 border-t border-white/[0.08] pt-10">
              <h2 className="text-sm font-medium uppercase tracking-[0.15em] text-white/45">
                Share this post
              </h2>
              <div className="mt-5">
                <ShareButtons
                  title={post.title}
                  description={post.description}
                  url={`${siteConfig.url}/blog/${post.slug}`}
                />
              </div>
            </div>
          </div>

          {relatedPosts.length > 0 && (
            <div className="mx-auto max-w-4xl border-t border-white/[0.08] py-16 sm:py-20">
              <h2 className="mb-10 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                More from the blog
              </h2>
              <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {relatedPosts.slice(0, 3).map((relatedPost) => (
                  <BlogCard key={relatedPost.slug} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
