import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import { BENCHMARK_METRICS } from "./swarms-rs-data"

// Bars are drawn on a log scale: the raw values span more than two orders of
// magnitude, so a linear bar for swarms-rs would be invisible. The numbers next
// to each bar are the real values.
function barWidth(value: number, max: number, min: number) {
  const span = Math.log(max) - Math.log(min / 2)
  return Math.max(4, ((Math.log(value) - Math.log(min / 2)) / span) * 100)
}

export function SwarmsRsBenchmarks() {
  return (
    <section id="benchmarks" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Benchmarks
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              130x to 440x faster to start, 25x to 68x lighter in memory
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Every framework drove the same model, prompts and tasks, so what differs is the
              framework itself: startup, memory, per-call overhead and real parallelism.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
            {BENCHMARK_METRICS.map((metric) => {
              const values = metric.rows.map((r) => r.value)
              const max = Math.max(...values)
              const min = Math.min(...values)
              return (
                <figure key={metric.id} className="bg-black p-6 sm:p-8">
                  <figcaption>
                    <h3 className="text-lg font-semibold tracking-tight text-white">
                      {metric.title}
                    </h3>
                    <p className="mt-1 text-sm font-normal text-white/45">{metric.sub}</p>
                  </figcaption>
                  <ul className="mt-6 space-y-3.5">
                    {metric.rows.map((row) => (
                      <li key={row.name}>
                        <div className="mb-1.5 flex items-baseline justify-between text-sm">
                          <span className={row.ours ? "font-medium text-white" : "text-white/50"}>
                            {row.name}
                          </span>
                          <span
                            className={`font-mono text-xs ${row.ours ? "text-white" : "text-white/50"}`}
                          >
                            {row.display}
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/[0.06]">
                          <div
                            className={`h-2 rounded-full ${row.ours ? "bg-white" : "bg-white/25"}`}
                            style={{ width: `${barWidth(row.value, max, min)}%` }}
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                </figure>
              )
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 text-xs font-normal text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <p>
              swarms-rs 0.3.0, Swarms Python 15.0.3, LangGraph 1.2.12, CrewAI 1.15.23 on Claude
              Sonnet 5.5. Bars use a log scale; labels show the measured values.
            </p>
            <Link
              href="/blog/swarms-rust-benchmarks"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Read the full benchmark
              <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
