"use client"

import { useEffect, useRef, useState } from "react"
import { Copy, Check, ChevronDown, FileText, Link2, ArrowUpRight } from "lucide-react"

export interface CopyPageLabels {
  copyPage: string
  copied: string
  copyPageDescription: string
  viewMarkdown: string
  viewMarkdownDescription: string
  copyLink: string
  copyLinkDescription: string
}

const EN_LABELS: CopyPageLabels = {
  copyPage: "Copy page",
  copied: "Copied",
  copyPageDescription: "Copy page as Markdown for LLMs",
  viewMarkdown: "View as Markdown",
  viewMarkdownDescription: "View this page as plain text",
  copyLink: "Copy link",
  copyLinkDescription: "Copy a link to this page",
}

// Split pill button next to the language toggle: clicking the label copies the
// whole post as markdown; the chevron opens a menu with markdown + link options.
export function CopyPageButton({
  markdown,
  markdownUrl,
  pageUrl,
  labels = EN_LABELS,
}: {
  markdown: string
  markdownUrl: string
  pageUrl: string
  labels?: CopyPageLabels
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState<"page" | "link" | null>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onPointerDown)
    document.addEventListener("touchstart", onPointerDown)
    return () => {
      document.removeEventListener("mousedown", onPointerDown)
      document.removeEventListener("touchstart", onPointerDown)
    }
  }, [open])

  const copyText = async (text: string, kind: "page" | "link") => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(kind)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      // Clipboard unavailable (e.g. insecure context); leave state unchanged.
    }
    setOpen(false)
  }

  const itemClass =
    "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-colors duration-200 hover:bg-white/[0.05]"
  const itemIconClass = "mt-0.5 h-4 w-4 shrink-0 text-white/50"

  return (
    <div ref={rootRef} className="relative">
      <div className="inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] text-sm font-medium text-white/60 transition-colors duration-300 hover:border-white/40">
        <button
          type="button"
          onClick={() => copyText(markdown, "page")}
          className="inline-flex items-center gap-2 py-1.5 pl-4 pr-2 transition-colors duration-300 hover:text-white"
          aria-label={labels.copyPageDescription}
        >
          {copied === "page" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copied === "page" ? labels.copied : labels.copyPage}
        </button>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center border-l border-white/15 py-1.5 pl-1.5 pr-2.5 transition-colors duration-300 hover:text-white"
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="More copy options"
        >
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-white/15 bg-neutral-950/95 p-2 shadow-2xl backdrop-blur-xl"
        >
          <button type="button" role="menuitem" className={itemClass} onClick={() => copyText(markdown, "page")}>
            {copied === "page" ? <Check className={itemIconClass} /> : <Copy className={itemIconClass} />}
            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">
                {copied === "page" ? labels.copied : labels.copyPage}
              </span>
              <span className="block text-xs text-white/50">{labels.copyPageDescription}</span>
            </span>
          </button>

          <a
            role="menuitem"
            href={markdownUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            <FileText className={itemIconClass} />
            <span className="min-w-0">
              <span className="flex items-center gap-1 text-sm font-medium text-white">
                {labels.viewMarkdown}
                <ArrowUpRight className="h-3.5 w-3.5 text-white/50" />
              </span>
              <span className="block text-xs text-white/50">{labels.viewMarkdownDescription}</span>
            </span>
          </a>

          <button type="button" role="menuitem" className={itemClass} onClick={() => copyText(pageUrl, "link")}>
            {copied === "link" ? <Check className={itemIconClass} /> : <Link2 className={itemIconClass} />}
            <span className="min-w-0">
              <span className="block text-sm font-medium text-white">
                {copied === "link" ? labels.copied : labels.copyLink}
              </span>
              <span className="block text-xs text-white/50">{labels.copyLinkDescription}</span>
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
