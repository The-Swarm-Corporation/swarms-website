import { isValidElement } from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import { MermaidDiagram } from "@/components/blog/mermaid-diagram"

// Shared article renderer for the English and Chinese blog post pages so the
// markdown styling stays identical across locales.
export function BlogMarkdown({ content }: { content: string }) {
  return (
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
      {content}
    </ReactMarkdown>
  )
}
