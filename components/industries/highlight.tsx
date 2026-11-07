import { CodeBlock } from "@/components/code-block"

import type { HighlightedIndustryExample, IndustryExample } from "./code-examples"

// Server-side helper: highlight every example once at render time and hand
// the client tabs ready-made nodes.
export function highlightIndustryExamples(examples: IndustryExample[]): HighlightedIndustryExample[] {
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
