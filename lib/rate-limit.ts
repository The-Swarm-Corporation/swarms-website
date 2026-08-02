/**
 * Minimal in-memory sliding-window rate limiter.
 *
 * This app has no Redis/KV layer, so state lives in module scope: on
 * serverless deploys each instance keeps its own window, making the limit
 * best-effort rather than global. That still stops the cheap case (one
 * client hammering one instance), which is the abuse profile of a public
 * marketing-site form.
 */

interface Window {
  timestamps: number[]
}

const windows = new Map<string, Window>()

// Cap tracked keys so a spray of spoofed IPs can't grow the map unbounded.
const MAX_KEYS = 10_000

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const cutoff = now - windowMs

  if (windows.size >= MAX_KEYS && !windows.has(key)) {
    for (const [k, w] of windows) {
      if (w.timestamps[w.timestamps.length - 1] < cutoff) windows.delete(k)
    }
    // Everyone tracked is recent and the map is full: fail closed for new keys.
    if (windows.size >= MAX_KEYS) return false
  }

  const window = windows.get(key) ?? { timestamps: [] }
  window.timestamps = window.timestamps.filter((t) => t > cutoff)

  if (window.timestamps.length >= limit) {
    windows.set(key, window)
    return false
  }

  window.timestamps.push(now)
  windows.set(key, window)
  return true
}
