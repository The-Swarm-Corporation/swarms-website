import { isValidElement } from "react"
import Image from "next/image"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { MermaidDiagram } from "@/components/blog/mermaid-diagram"
import { AppLink } from "@/components/app-link"
import { CodeBlock } from "@/components/code-block"
import { rehypeHeadingIds } from "@/lib/blog-toc"
import { publicImageDimensions } from "@/lib/image-dimensions"

// Remote hosts that post images may come from and that next.config.mjs
// allowlists for the image optimizer. Keep the two lists in sync.
const OPTIMIZED_REMOTE_HOSTS = new Set(["db.swarms.world", "pbs.twimg.com"])

// The article column is the max-w-6xl container (1152px) minus the 14rem
// table of contents and its gap on large screens, so about 870px of image.
const ARTICLE_IMAGE_SIZES = "(max-width: 1024px) 100vw, 896px"

function remoteHost(src: string): string | null {
  try {
    const url = new URL(src)
    return url.protocol === "https:" ? url.hostname : null
  } catch {
    return null
  }
}

// Shared article renderer for the English and Chinese blog post pages so the
// markdown styling stays identical across locales.
export function BlogMarkdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHeadingIds]}
      components={{
        video: ({ children, node, ...props }) => (
          <video
            {...props}
            className="mb-8 w-full rounded-2xl border border-white/10"
          >
            {children}
          </video>
        ),
        img: ({ node, src, alt, ...props }) => {
          const className = "mb-8 w-full rounded-2xl border border-white/10"
          if (typeof src === "string") {
            // Post images in /public go through the optimizer with their real
            // dimensions, so the browser reserves the right box before the
            // bytes arrive. Images on allowlisted hosts also go through it;
            // their size is unknown at build time, so 16:9 is the layout
            // guess and h-auto corrects it once loaded. Anything else (a post
            // can link anywhere) stays a plain <img>.
            const local = src.startsWith("/") && !src.startsWith("//")
            const dims = local ? publicImageDimensions(src) : null
            const host = local ? null : remoteHost(src)
            if (local || (host && OPTIMIZED_REMOTE_HOSTS.has(host))) {
              return (
                <Image
                  src={src}
                  alt={alt ?? ""}
                  width={dims?.width ?? 1920}
                  height={dims?.height ?? 1080}
                  sizes={ARTICLE_IMAGE_SIZES}
                  className={`${className} h-auto`}
                />
              )
            }
          }
          // eslint-disable-next-line @next/next/no-img-element
          return <img {...props} src={src} alt={alt ?? ""} className={className} />
        },
        h1: ({ children }) => (
          <h1 className="mb-6 mt-12 text-3xl font-semibold tracking-tighter text-white first:mt-0 sm:text-4xl">
            {children}
          </h1>
        ),
        // ids come from rehypeHeadingIds; scroll-mt clears the fixed navbar
        // when a sidebar link jumps to the heading.
        h2: ({ children, id }) => (
          <h2 id={id} className="mb-5 mt-10 scroll-mt-28 text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
            {children}
          </h2>
        ),
        h3: ({ children, id }) => (
          <h3 id={id} className="mb-4 mt-8 scroll-mt-28 text-xl font-semibold tracking-tight text-white sm:text-2xl">
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
            <CodeBlock
              chrome
              code={String(children)}
              lang={className}
              className="p-6 font-mono text-sm leading-relaxed"
            />
          )
        },
        pre: ({ children }) => {
          const child = Array.isArray(children) ? children[0] : children
          if (isValidElement(child) && child.type === MermaidDiagram) {
            return child
          }
          // CodeBlock renders its own rounded card, header and copy button.
          return <div className="mb-8">{children}</div>
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
          <AppLink
            href={href ?? "#"}
            className="text-white underline decoration-white/30 underline-offset-4 transition-colors duration-300 hover:decoration-white"
          >
            {children}
          </AppLink>
        ),
        strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
        em: ({ children }) => <em className="italic text-white/70">{children}</em>,
        hr: () => <hr className="my-10 border-white/10" />,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
