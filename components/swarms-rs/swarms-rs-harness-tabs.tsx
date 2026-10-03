"use client"

import type { ReactNode } from "react"
import { useState } from "react"

type Panel = {
  id: string
  label: string
  type: string
  tagline: string
  points: string[]
  code: ReactNode
}

// Every panel stays in the server HTML (hidden, not unmounted) so the code
// samples are crawlable; only the visible one is shown.
export function SwarmsRsHarnessTabs({ panels }: { panels: Panel[] }) {
  const [active, setActive] = useState(panels[0].id)

  return (
    <div>
      <div
        role="tablist"
        aria-label="Multi-agent harnesses"
        className="flex flex-wrap gap-1 rounded-2xl border border-white/[0.12] bg-[#0a0a0a] p-1 sm:w-fit sm:rounded-full"
      >
        {panels.map((panel) => (
          <button
            key={panel.id}
            type="button"
            role="tab"
            id={`harness-tab-${panel.id}`}
            aria-selected={active === panel.id}
            aria-controls={`harness-panel-${panel.id}`}
            onClick={() => setActive(panel.id)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
              active === panel.id ? "bg-white text-black" : "text-white/55 hover:text-white"
            }`}
          >
            {panel.label}
          </button>
        ))}
      </div>

      {panels.map((panel) => (
        <div
          key={panel.id}
          role="tabpanel"
          id={`harness-panel-${panel.id}`}
          aria-labelledby={`harness-tab-${panel.id}`}
          className={`mt-8 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12 ${
            active === panel.id ? "grid" : "hidden"
          }`}
        >
          <div>
            <p className="font-mono text-xs text-white/40">{panel.type}</p>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {panel.tagline}
            </h3>
            <ul className="mt-5 space-y-2.5">
              {panel.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-sm font-normal leading-relaxed text-white/55 sm:text-base"
                >
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-white/30" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="min-w-0 text-[13px] leading-relaxed [&_pre]:p-4">{panel.code}</div>
        </div>
      ))}
    </div>
  )
}
