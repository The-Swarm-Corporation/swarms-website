"use client"

import { AnimatePresence, motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

import { JOBS, NEEDS, PRODUCTS, type Job, type ProductId } from "./stack-data"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

type Filter = "all" | Job

const GRID =
  "grid grid-cols-[minmax(0,1fr)_repeat(5,2.25rem)] sm:grid-cols-[minmax(0,1fr)_repeat(5,4.5rem)] lg:grid-cols-[minmax(0,1fr)_repeat(5,6.5rem)]"

export function StackCoverage({ onSelect }: { onSelect: (id: ProductId) => void }) {
  const [filter, setFilter] = useState<Filter>("all")
  const [open, setOpen] = useState<string | null>(null)
  const [hoverRow, setHoverRow] = useState<string | null>(null)

  const hoveredNeed = NEEDS.find((n) => n.need === hoverRow)
  const groups = JOBS.filter((j) => filter === "all" || j.id === filter)

  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-6 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Everything an AI agent team needs, mapped to the stack
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                {NEEDS.length} jobs that come up when you build, deploy, monitor, and sell agents, and
                the part of the stack that handles each one. Open a row to see how.
              </p>
            </div>

            <div
              role="radiogroup"
              aria-label="Filter by job"
              className="flex w-fit flex-wrap gap-1 rounded-full border border-white/[0.12] bg-[#0a0a0a] p-1"
            >
              {([{ id: "all", label: "All" }, ...JOBS] as { id: Filter; label: string }[]).map(
                (f) => {
                  const count =
                    f.id === "all" ? NEEDS.length : NEEDS.filter((n) => n.job === f.id).length
                  const active = filter === f.id
                  return (
                    <button
                      key={f.id}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => setFilter(f.id)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                        active ? "bg-white text-black" : "text-white/55 hover:text-white"
                      }`}
                    >
                      {f.label}
                      <span className={`ml-1.5 tabular-nums ${active ? "text-black/45" : "text-white/30"}`}>
                        {count}
                      </span>
                    </button>
                  )
                }
              )}
            </div>
          </div>

          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
            {/* Column headers: products, grouped by the job they serve */}
            <div className={`${GRID} border-b border-white/[0.08] px-3 pb-3 pt-4 sm:px-5`}>
              <div className="self-end text-xs font-medium text-white/35">Need</div>
              {PRODUCTS.map((p) => {
                const lit = hoveredNeed?.covered.includes(p.id)
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onSelect(p.id)}
                    title={`Open ${p.name}`}
                    className={`flex flex-col items-center gap-0.5 rounded px-0.5 text-center transition-colors ${
                      lit ? "text-white" : "text-white/50 hover:text-white"
                    }`}
                  >
                    <span className="hidden text-[10px] font-normal text-white/30 sm:block">
                      {JOBS.find((j) => j.id === p.job)!.label}
                    </span>
                    <span className="text-[10px] font-semibold leading-tight sm:text-xs">
                      <span className="sm:hidden">{p.short === "Python" ? "Py" : p.short === "Market" ? "Mkt" : p.short}</span>
                      <span className="hidden sm:inline">{p.short === "Market" ? "Marketplace" : p.short}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <AnimatePresence initial={false} mode="popLayout">
              {groups.map((job) => (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <div className="border-b border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs font-medium text-white/40 sm:px-5">
                    {job.label}
                  </div>
                  {NEEDS.filter((n) => n.job === job.id).map((need) => {
                    const isOpen = open === need.need
                    const panelId = `need-${need.need.replace(/\W+/g, "-").toLowerCase()}`
                    return (
                      <div
                        key={need.need}
                        className="border-b border-white/[0.06] last:border-b-0"
                        onMouseEnter={() => setHoverRow(need.need)}
                        onMouseLeave={() => setHoverRow(null)}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          onClick={() => setOpen(isOpen ? null : need.need)}
                          onFocus={() => setHoverRow(need.need)}
                          onBlur={() => setHoverRow(null)}
                          className={`${GRID} w-full items-center px-3 py-3.5 text-left transition-colors hover:bg-white/[0.03] sm:px-5 ${
                            isOpen ? "bg-white/[0.03]" : ""
                          }`}
                        >
                          <span className="flex min-w-0 items-center gap-2 pr-2 text-sm font-medium text-white/85 sm:text-[15px]">
                            <ChevronDown
                              aria-hidden="true"
                              className={`h-3.5 w-3.5 shrink-0 text-white/35 transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                            {need.need}
                          </span>
                          {PRODUCTS.map((p) => {
                            const covered = need.covered.includes(p.id)
                            return (
                              <span key={p.id} className="flex justify-center">
                                {covered ? (
                                  <span className="h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_0_3px_rgba(255,255,255,0.08)]" />
                                ) : (
                                  <span className="h-px w-2.5 bg-white/15" />
                                )}
                                <span className="sr-only">
                                  {p.name}: {covered ? "covered" : "not covered"}
                                </span>
                              </span>
                            )
                          })}
                        </button>
                        {/* Always rendered so every answer is in the page HTML;
                            collapsed rows are zero-height and inert. */}
                        <motion.div
                          id={panelId}
                          initial={false}
                          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="overflow-hidden"
                          aria-hidden={!isOpen}
                        >
                          <div
                            inert={!isOpen}
                            className="px-3 pb-4 pl-[2.1rem] sm:px-5 sm:pl-[2.6rem]"
                          >
                            <p className="max-w-2xl text-sm font-normal leading-relaxed text-white/55">
                              {need.how}
                            </p>
                            <div className="mt-3 flex flex-wrap gap-2">
                              {need.covered.map((id) => {
                                const p = PRODUCTS.find((x) => x.id === id)!
                                return (
                                  <button
                                    key={id}
                                    type="button"
                                    onClick={() => onSelect(id)}
                                    className="rounded-full border border-white/[0.14] px-3 py-1 text-xs font-medium text-white/70 transition-colors hover:border-white/35 hover:text-white"
                                  >
                                    {p.name}
                                  </button>
                                )
                              })}
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    )
                  })}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
