import type { ReactNode } from "react"
import type { CourseBlock } from "@/lib/academy/swarms-api-course"
import { ApiTrial } from "@/components/academy/api-trial"

// Renders **bold** and `code` spans inside course prose strings.
export function InlineText({ text }: { text: string }) {
  const nodes: ReactNode[] = []
  const pattern = /(\*\*[^*]+\*\*|`[^`]+`)/g
  let last = 0
  let match: RegExpExecArray | null
  let key = 0
  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith("**")) {
      nodes.push(
        <strong key={key++} className="font-medium text-white">
          {token.slice(2, -2)}
        </strong>
      )
    } else {
      nodes.push(
        <code
          key={key++}
          className="rounded bg-white/[0.08] px-1.5 py-0.5 font-mono text-[0.85em] text-white/80"
        >
          {token.slice(1, -1)}
        </code>
      )
    }
    last = match.index + token.length
  }
  if (last < text.length) nodes.push(text.slice(last))
  return <>{nodes}</>
}

function CodePanel({ title, code }: { title?: string; code: string }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      {title && (
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
          <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{title}</span>
        </div>
      )}
      <div className="overflow-x-auto p-4 sm:p-5">
        <pre className="font-mono text-[11px] font-normal leading-relaxed text-white/70 sm:text-[12.5px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

const calloutLabels = { tip: "Tip", note: "Note", warn: "Warning" } as const

export function CourseBlocks({ blocks }: { blocks: CourseBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className="text-[15px] font-normal leading-relaxed text-white/60">
                <InlineText text={block.text} />
              </p>
            )
          case "h3":
            return (
              <h3 key={i} className="pt-2 text-lg font-medium tracking-tight text-white">
                {block.text}
              </h3>
            )
          case "code":
            return <CodePanel key={i} title={block.title} code={block.code} />
          case "list": {
            const items = block.items.map((item, j) => (
              <li key={j} className="text-[15px] font-normal leading-relaxed text-white/60">
                <InlineText text={item} />
              </li>
            ))
            return block.ordered ? (
              <ol key={i} className="ml-5 list-decimal space-y-2.5 marker:text-white/35">
                {items}
              </ol>
            ) : (
              <ul key={i} className="ml-5 list-disc space-y-2.5 marker:text-white/35">
                {items}
              </ul>
            )
          }
          case "table":
            return (
              <div key={i} className="overflow-x-auto rounded-lg border border-white/[0.08]">
                <table className="w-full min-w-[560px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08] bg-[#0a0a0a]">
                      {block.headers.map((h, j) => (
                        <th key={j} className="px-4 py-3 text-xs font-medium uppercase tracking-wider text-white/50">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j} className="border-b border-white/[0.06] last:border-b-0">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className={
                              k === 0
                                ? "px-4 py-3 font-mono text-[12.5px] text-white/80"
                                : "px-4 py-3 text-[13px] leading-relaxed text-white/55"
                            }
                          >
                            <InlineText text={cell} />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case "callout":
            return (
              <div key={i} className="rounded-lg border border-white/[0.12] bg-white/[0.03] p-4 sm:p-5">
                <p className="mb-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  {calloutLabels[block.variant]}
                  {block.title ? ` · ${block.title}` : ""}
                </p>
                <p className="text-sm font-normal leading-relaxed text-white/60">
                  <InlineText text={block.text} />
                </p>
              </div>
            )
          case "endpoint":
            return (
              <div key={i} className="flex flex-wrap items-center gap-3 rounded-lg border border-white/[0.08] bg-[#0a0a0a] px-4 py-3">
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                    block.method === "GET"
                      ? "border-white/20 text-white/70"
                      : "border-white/40 bg-white/[0.06] text-white"
                  }`}
                >
                  {block.method}
                </span>
                <code className="font-mono text-[13px] text-white/80">{block.path}</code>
                {block.text && (
                  <span className="w-full text-[13px] leading-relaxed text-white/45 sm:w-auto sm:flex-1">
                    {block.text}
                  </span>
                )}
              </div>
            )
          case "trial":
            return (
              <ApiTrial
                key={i}
                method={block.method}
                path={block.path}
                body={block.body}
                note={block.note}
              />
            )
        }
      })}
    </div>
  )
}
