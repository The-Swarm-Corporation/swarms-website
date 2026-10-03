import { CodeBlock } from "@/components/code-block"

import { QUICKSTART } from "./swarms-rs-data"

export function SwarmsRsQuickstart() {
  return (
    <section id="quickstart" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Quickstart
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              From an empty project to a multi-model pipeline in three steps
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              You need the latest stable Rust and one OpenRouter key. Each step builds on the one
              before it.
            </p>
          </div>

          <ol className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
            {QUICKSTART.map((step) => (
              <li
                key={step.n}
                className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
              >
                <div className="lg:sticky lg:top-28 lg:self-start">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 font-mono text-sm text-white/80">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                    {step.body}
                  </p>
                </div>
                <div className="min-w-0 text-[13px] leading-relaxed [&_pre]:p-4">
                  <CodeBlock code={step.code} lang={step.lang} file={step.file} chrome />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
