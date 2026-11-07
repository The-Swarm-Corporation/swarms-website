import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

// Section shell shared by every industry page: eyebrow, heading, intro, body.
export function IndustrySection({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  wide = false,
}: {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  /** Let the heading run the full width instead of a reading-width column. */
  wide?: boolean
}) {
  return (
    <section id={id} className={cn("border-b border-white/[0.08] bg-black", className)}>
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className={cn("mb-10 sm:mb-14", wide ? "" : "max-w-3xl")}>
            {eyebrow && (
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {eyebrow}
              </p>
            )}
            <h2 className="text-2xl font-semibold leading-[1.15] tracking-tighter text-white sm:text-3xl">
              {title}
            </h2>
            {description && (
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                {description}
              </p>
            )}
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
