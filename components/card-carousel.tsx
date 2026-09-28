"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight, type LucideIcon } from "lucide-react"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export type CarouselCardItem = {
  title: string
  description: string
  icon?: LucideIcon
  /** Monospace lines shown in a panel inside the card, with the caption below the card. */
  preview?: string[]
  /**
   * A headline amount. Stat cards are self-contained: the title, the description, and then
   * the amount all sit inside the card, with no icon and no caption.
   */
  stat?: { value: string; label: string }
  meta?: string
  badge?: string
  href?: string
  external?: boolean
  wide?: boolean
}

function CardShell({
  item,
  className,
  children,
}: {
  item: CarouselCardItem
  className: string
  children: React.ReactNode
}) {
  if (!item.href) {
    return <div className={className}>{children}</div>
  }
  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return (
    <Link href={item.href} className={className}>
      {children}
    </Link>
  )
}

/**
 * One row of large cards with captions underneath. The row starts at the page's max-w-7xl
 * content edge and bleeds off the right of the viewport, with snap scrolling and
 * previous/next buttons on larger screens.
 */
export function CardCarousel({ items, label }: { items: CarouselCardItem[]; label: string }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    setCanScrollPrev(el.scrollLeft > 4)
    setCanScrollNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener("resize", updateScrollState)
    return () => window.removeEventListener("resize", updateScrollState)
  }, [updateScrollState])

  // Step to the next or previous card's snap position.
  const scrollCards = (direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-card]"))
    const inset = cards[0]?.offsetLeft ?? 0
    const stops = cards.map((card) => card.offsetLeft - inset)
    const target =
      direction === 1
        ? stops.find((stop) => stop > el.scrollLeft + 4)
        : [...stops].reverse().find((stop) => stop < el.scrollLeft - 4)
    el.scrollTo({ left: target ?? (direction === 1 ? el.scrollWidth : 0), behavior: "smooth" })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: 0.1, ease }}
    >
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        aria-label={label}
        className="scrollbar-hide relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:gap-6 [padding-inline:max(1rem,calc((100%_-_80rem)_/_2))] [scroll-padding-inline:max(1rem,calc((100%_-_80rem)_/_2))] sm:[padding-inline:max(1.5rem,calc((100%_-_80rem)_/_2))] sm:[scroll-padding-inline:max(1.5rem,calc((100%_-_80rem)_/_2))] lg:[padding-inline:max(2rem,calc((100%_-_80rem)_/_2))] lg:[scroll-padding-inline:max(2rem,calc((100%_-_80rem)_/_2))]"
      >
        {items.map((item) => {
          const Icon = item.icon
          const interactive = Boolean(item.href)
          return (
            <CardShell
              key={item.title}
              item={item}
              className={`group flex shrink-0 snap-start flex-col ${
                item.wide ? "w-[85vw] sm:w-[560px] lg:w-[720px]" : "w-[80vw] sm:w-[380px] lg:w-[420px]"
              }`}
            >
              <div
                data-carousel-card
                className={`relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-[#0a0a0a] transition-colors duration-300 ${
                  item.stat
                    ? "flex min-h-[320px] flex-1 flex-col justify-between sm:min-h-[380px] lg:min-h-[440px]"
                    : "h-[300px] sm:h-[380px] lg:h-[440px]"
                } ${interactive ? "group-hover:border-white/[0.2]" : ""}`}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_80%_70%_at_30%_20%,black_20%,transparent_100%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl"
                />

                {item.stat ? (
                  <div className="relative p-6 sm:p-8">
                    <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50 sm:text-base">
                      {item.description}
                    </p>
                  </div>
                ) : (
                  <div className="relative flex items-start justify-between gap-2 p-6 sm:p-8">
                    {Icon && (
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.12] bg-black/60">
                        <Icon className="h-5 w-5 text-white/70" strokeWidth={1.5} />
                      </span>
                    )}
                    {item.badge ? (
                      <span className="rounded-full border border-white/[0.14] bg-black/60 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">
                        {item.badge}
                      </span>
                    ) : interactive ? (
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.14] bg-black/60 transition-colors duration-300 group-hover:border-white/40">
                        <ArrowRight className="h-4 w-4 text-white/50 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white" />
                      </span>
                    ) : null}
                  </div>
                )}

                {item.stat ? (
                  <div className="relative px-6 pb-6 sm:px-8 sm:pb-8">
                    <div className="text-6xl font-semibold leading-none tracking-tighter text-white sm:text-7xl lg:text-8xl">
                      {item.stat.value}
                    </div>
                    <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50 sm:text-base">
                      {item.stat.label}
                    </p>
                  </div>
                ) : item.preview ? (
                  <div
                    aria-hidden="true"
                    className={`absolute inset-x-5 bottom-5 overflow-hidden rounded-2xl border border-white/[0.08] bg-black/80 p-4 font-mono text-[11px] leading-6 text-white/60 transition-transform duration-500 sm:inset-x-8 sm:bottom-8 sm:p-5 ${
                      item.wide ? "sm:text-[14px]" : "sm:text-[13px]"
                    } ${interactive ? "group-hover:-translate-y-1" : ""}`}
                  >
                    {item.preview.map((line, i) => (
                      <div key={i} className="whitespace-pre">
                        {line || " "}
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>

              {!item.stat && (
                <div className="mt-5 max-w-[34rem] px-1 sm:mt-6 sm:px-2">
                  <p className="text-[15px] leading-relaxed text-white/50 sm:text-[17px]">
                    <span className="font-semibold text-white">{item.title}.</span> {item.description}
                  </p>
                  {item.meta && (
                    <p className="mt-3 font-mono text-[11px] text-white/40 transition-colors group-hover:text-white/60">
                      {item.meta}
                    </p>
                  )}
                </div>
              )}
            </CardShell>
          )
        })}
      </div>

      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mt-8 hidden max-w-7xl justify-end gap-3 sm:flex">
          <button
            type="button"
            onClick={() => scrollCards(-1)}
            disabled={!canScrollPrev}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollCards(1)}
            disabled={!canScrollNext}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.1] hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
