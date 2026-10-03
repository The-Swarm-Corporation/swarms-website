import { CodeBlock } from "@/components/code-block"

import { HARNESSES } from "./swarms-rs-data"
import { SwarmsRsHarnessTabs } from "./swarms-rs-harness-tabs"

export function SwarmsRsHarnesses() {
  const panels = HARNESSES.map((harness) => ({
    id: harness.id,
    label: harness.label,
    type: harness.type,
    tagline: harness.tagline,
    points: harness.points,
    code: <CodeBlock code={harness.code} lang="rust" file={harness.file} chrome />,
  }))

  return (
    <section id="harnesses" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-12">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Multi-agent harnesses
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Six ways to put agents to work together
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Every structure takes the same agents, so you can start with a pipeline and move to a
              graph without rewriting them.
            </p>
          </div>

          <SwarmsRsHarnessTabs panels={panels} />
        </div>
      </div>
    </section>
  )
}
