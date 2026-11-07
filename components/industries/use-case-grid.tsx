import type { LucideIcon } from "lucide-react"

export type UseCase = {
  title: string
  description: string
  /** The Swarms API swarm_type this use case maps to. */
  swarmType: string
  agents: string[]
  icon: LucideIcon
}

export function UseCaseGrid({ useCases, accent }: { useCases: UseCase[]; accent: string }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3">
      {useCases.map((u) => (
        <article key={u.title} className="group relative flex flex-col bg-[#0a0a0a] p-6 transition-colors hover:bg-[#0e0e0e]">
          <div className="flex items-center justify-between">
            <span className="flex h-9 w-9 items-center justify-center rounded-md border border-white/[0.1] bg-white/[0.03]">
              <u.icon className="h-4 w-4" style={{ color: accent }} aria-hidden="true" />
            </span>
            <span className="rounded border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-white/45">{u.swarmType}</span>
          </div>
          <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{u.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{u.description}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5">
            {u.agents.map((a) => (
              <li key={a} className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 text-[11px] text-white/60">
                {a}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  )
}
