"use client"

import { useEffect, useState } from "react"
import { AlignLeft } from "lucide-react"
import type { TocHeading } from "@/lib/blog-toc"

// Fumadocs-style "On this page" outline: a thin track runs down the left of
// the list, steps right for subsections (with a short diagonal where the depth
// changes), and the section currently being read is highlighted.

const INDENT = 12 // px the track moves right per heading level
const DIAGONAL = 12 // px height of the slanted connector between levels
const ACTIVE_OFFSET = 140 // px from the top of the viewport that counts as "reading"

interface BlogTocProps {
  headings: TocHeading[]
  containerId: string
  title: string
}

export function BlogToc({ headings: initialHeadings, containerId, title }: BlogTocProps) {
  const [headings, setHeadings] = useState(initialHeadings)
  const [activeId, setActiveId] = useState(initialHeadings[0]?.id ?? "")

  // Re-read the rendered headings so links always match the real ids.
  useEffect(() => {
    const container = document.getElementById(containerId)
    if (!container) return
    const rendered: TocHeading[] = Array.from(
      container.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]"),
    ).map((el) => ({
      id: el.id,
      text: el.textContent?.trim() ?? "",
      depth: el.tagName === "H2" ? 2 : 3,
    }))
    const same =
      rendered.length === initialHeadings.length &&
      rendered.every((h, i) => h.id === initialHeadings[i].id && h.depth === initialHeadings[i].depth)
    if (!same) setHeadings(rendered)
  }, [containerId, initialHeadings])

  useEffect(() => {
    if (headings.length === 0) return
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom) {
        setActiveId(headings[headings.length - 1].id)
        return
      }
      let current = headings[0].id
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (!el) continue
        if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = h.id
        else break
      }
      setActiveId(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [headings])

  if (headings.length < 2) return null

  const minDepth = Math.min(...headings.map((h) => h.depth))
  const offsetOf = (h: TocHeading) => (h.depth - minDepth) * INDENT

  return (
    <nav aria-label={title} className="text-sm">
      <p className="mb-4 inline-flex items-center gap-2 text-white/60">
        <AlignLeft className="h-4 w-4" aria-hidden="true" />
        {title}
      </p>
      <ul className="relative">
        {headings.map((h, i) => {
          const x = offsetOf(h)
          const prevX = i === 0 ? x : offsetOf(headings[i - 1])
          const stepped = prevX !== x
          const lineTop = stepped ? DIAGONAL : 0
          const active = h.id === activeId
          return (
            <li key={h.id} className="relative">
              {stepped && (
                <svg
                  aria-hidden="true"
                  className="absolute top-0 overflow-visible text-white/15"
                  style={{ left: Math.min(prevX, x), width: Math.abs(x - prevX) + 1, height: DIAGONAL }}
                >
                  <line
                    x1={prevX < x ? 0.5 : Math.abs(x - prevX) + 0.5}
                    y1={0}
                    x2={prevX < x ? Math.abs(x - prevX) + 0.5 : 0.5}
                    y2={DIAGONAL}
                    stroke="currentColor"
                  />
                </svg>
              )}
              <span
                aria-hidden="true"
                className="absolute bottom-0 w-px bg-white/15"
                style={{ left: x, top: lineTop }}
              />
              <span
                aria-hidden="true"
                className={`absolute w-0.5 rounded-full bg-white transition-opacity duration-200 ${
                  active ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: x - 0.5, top: Math.max(lineTop, 4), bottom: 4 }}
              />
              <a
                href={`#${h.id}`}
                onClick={() => setActiveId(h.id)}
                aria-current={active ? "location" : undefined}
                className={`block py-1.5 leading-snug transition-colors duration-200 ${
                  active ? "text-white" : "text-white/45 hover:text-white/80"
                }`}
                style={{ paddingLeft: x + 16 }}
              >
                {h.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
