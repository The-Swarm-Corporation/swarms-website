import type { ReactNode } from "react"

import { CodeBlock } from "@/components/code-block"

export type CodeExample = { lang: string; file: string; code: string }

/** A code example with its Shiki output already rendered on the server. */
export type HighlightedCodeExample = CodeExample & { block: ReactNode }

// The tabbed code panels on the product pages are client components (Radix
// tabs, framer-motion), so they cannot run Shiki without shipping it to the
// browser. Server pages call this instead and hand the client page the
// highlighted blocks as plain React nodes.
export function highlightCodeExamples(examples: CodeExample[]): HighlightedCodeExample[] {
  return examples.map((example) => ({
    ...example,
    block: (
      <CodeBlock
        code={example.code}
        file={example.file}
        className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
      />
    ),
  }))
}
