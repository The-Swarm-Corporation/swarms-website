"use client"

import { useEffect, useRef, useState } from "react"
import { usePathname } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

// Prefetched pages swap in well under this, and quick fetches finish before it,
// so ordinary navigations never flash the loader.
const SHOW_AFTER_MS = 300
// A navigation that fails or is cancelled never changes the path; don't strand the overlay.
const GIVE_UP_AFTER_MS = 10_000

/**
 * Global loading screen for page navigations: when an internal link click has
 * not produced the new page within SHOW_AFTER_MS, the animated Swarms mark
 * covers the screen until the path changes. Mounted once per root layout.
 *
 * This is deliberately not an `app/loading.tsx`. A root Suspense boundary makes
 * every prerendered page ship the fallback first and reveal its real content
 * only after a streaming script runs, which flashes the loader on each hard
 * load and pushes back LCP on every page.
 */
export function RouteLoader({ label }: { label?: string }) {
  const pathname = usePathname()
  const [loadingFrom, setLoadingFrom] = useState<string | null>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    const clearTimers = () => {
      timers.current.forEach(clearTimeout)
      timers.current = []
    }

    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = (e.target as Element | null)?.closest?.("a[href]")
      if (!(link instanceof HTMLAnchorElement)) return
      if ((link.target && link.target !== "_self") || link.hasAttribute("download")) return
      const url = new URL(link.href)
      // Other sites, the current page (hash and query-only links) and static files are not page loads.
      if (url.origin !== location.origin || url.pathname === location.pathname) return
      if (/\.\w+$/.test(url.pathname)) return

      const from = location.pathname
      clearTimers()
      timers.current = [
        setTimeout(() => setLoadingFrom(from), SHOW_AFTER_MS),
        setTimeout(() => setLoadingFrom(null), GIVE_UP_AFTER_MS),
      ]
    }

    // Back/forward cache restores a page exactly as it was left, overlay included.
    const onPageShow = (e: PageTransitionEvent) => {
      if (!e.persisted) return
      clearTimers()
      setLoadingFrom(null)
    }

    document.addEventListener("click", onClick, { capture: true })
    window.addEventListener("pageshow", onPageShow)
    return () => {
      clearTimers()
      document.removeEventListener("click", onClick, { capture: true })
      window.removeEventListener("pageshow", onPageShow)
    }
  }, [])

  // The new page has rendered: cancel whatever is still scheduled.
  useEffect(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
    setLoadingFrom(null)
  }, [pathname])

  // The path check also covers the one render between the new page arriving and the effect above.
  if (loadingFrom === null || loadingFrom !== pathname) return null
  return <LoadingScreen label={label} />
}
