"use client"

import { useState, type ReactNode } from "react"

import { CopyButton } from "@/components/copy-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tabbed code panel. The code is highlighted on the server (see highlight.tsx)
// and arrives here as rendered nodes, so this client component ships no Shiki.

export type IndustryExample = {
  id: string
  /** Tab label, for example "Swarms API · Python". */
  label: string
  file: string
  code: string
  /** One or two sentences under the panel explaining what the example does. */
  note: string
}

export type HighlightedIndustryExample = IndustryExample & { block: ReactNode }

export function IndustryCodeExamples({ examples, accent }: { examples: HighlightedIndustryExample[]; accent: string }) {
  const [value, setValue] = useState(examples[0]?.id ?? "")
  const current = examples.find((e) => e.id === value) ?? examples[0]

  return (
    <Tabs value={value} onValueChange={setValue} className="w-full">
      <TabsList aria-label="Code examples" className="flex h-auto w-full flex-wrap justify-start gap-1.5 rounded-none border-b border-white/[0.08] bg-transparent p-0 pb-3">
        {examples.map((ex) => (
          <TabsTrigger
            key={ex.id}
            value={ex.id}
            className="rounded-full border border-white/[0.1] bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-white/60 ring-offset-black transition-colors hover:text-white data-[state=active]:border-white/30 data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:shadow-none"
          >
            {ex.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {examples.map((ex) => (
        <TabsContent key={ex.id} value={ex.id} forceMount className="mt-5 min-w-0 ring-offset-black focus-visible:ring-white/40 data-[state=inactive]:hidden">
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black">
            <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: `${accent}99` }} />
              <span className="ml-3 font-mono text-[11px] font-normal text-white/40">{ex.file}</span>
              <CopyButton value={ex.code} className="ml-auto" />
            </div>
            <div className="p-4 sm:p-5">{ex.block}</div>
          </div>
        </TabsContent>
      ))}

      {current && <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">{current.note}</p>}
    </Tabs>
  )
}
