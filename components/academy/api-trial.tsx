"use client"

import { useCallback, useEffect, useState } from "react"
import { Check, Copy, Loader2, Play } from "lucide-react"
import { POINTS, recordTrial, useAcademyProgress } from "@/lib/academy/progress"

const KEY_STORAGE = "swarms-academy-api-key"
const KEY_EVENT = "swarms-academy-api-key-change"
const BASE_URL = "https://api.swarms.world"

type TrialResult = {
  ok: boolean
  status: number | null
  ms: number
  body: string
}

export function ApiTrial({
  method,
  path,
  body,
  note,
}: {
  method: "GET" | "POST"
  path: string
  body?: string
  note?: string
}) {
  const [apiKey, setApiKey] = useState("")
  const [bodyText, setBodyText] = useState(body ?? "")
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<TrialResult | null>(null)
  const [copied, setCopied] = useState(false)
  const [earnedNow, setEarnedNow] = useState(false)
  const progress = useAcademyProgress()
  const trialKey = `${method} ${path}`
  const trialDone = Boolean(progress.trials[trialKey])

  // Share one key across every trial on the page (and across visits).
  useEffect(() => {
    setApiKey(localStorage.getItem(KEY_STORAGE) ?? "")
    const sync = () => setApiKey(localStorage.getItem(KEY_STORAGE) ?? "")
    window.addEventListener(KEY_EVENT, sync)
    return () => window.removeEventListener(KEY_EVENT, sync)
  }, [])

  const onKeyChange = useCallback((value: string) => {
    setApiKey(value)
    localStorage.setItem(KEY_STORAGE, value)
    window.dispatchEvent(new Event(KEY_EVENT))
  }, [])

  const run = useCallback(async () => {
    if (!apiKey.trim()) {
      setResult({ ok: false, status: null, ms: 0, body: "Paste your API key above first. Create one at swarms.world/platform/api-keys." })
      return
    }
    let payload: string | undefined
    if (method === "POST") {
      try {
        payload = JSON.stringify(JSON.parse(bodyText))
      } catch {
        setResult({ ok: false, status: null, ms: 0, body: "The request body is not valid JSON. Fix it and run again." })
        return
      }
    }
    setRunning(true)
    setResult(null)
    const started = performance.now()
    try {
      const response = await fetch(`${BASE_URL}${path}`, {
        method,
        headers: {
          "x-api-key": apiKey.trim(),
          ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        body: payload,
      })
      const ms = Math.round(performance.now() - started)
      const text = await response.text()
      let pretty = text
      try {
        pretty = JSON.stringify(JSON.parse(text), null, 2)
      } catch {
        // leave non-JSON responses as-is
      }
      setEarnedNow(response.ok ? recordTrial(trialKey) : false)
      setResult({ ok: response.ok, status: response.status, ms, body: pretty })
    } catch (error) {
      const ms = Math.round(performance.now() - started)
      setResult({
        ok: false,
        status: null,
        ms,
        body: `Request failed before reaching the API: ${error instanceof Error ? error.message : String(error)}. Check your network connection.`,
      })
    } finally {
      setRunning(false)
    }
  }, [apiKey, bodyText, method, path, trialKey])

  const copyCurl = useCallback(async () => {
    const lines = [`curl -X ${method} "${BASE_URL}${path}"`, `  -H "x-api-key: $SWARMS_API_KEY"`]
    if (method === "POST") {
      lines.push(`  -H "Content-Type: application/json"`)
      lines.push(`  -d '${bodyText.replace(/'/g, "'\\''")}'`)
    }
    await navigator.clipboard.writeText(lines.join(" \\\n"))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [bodyText, method, path])

  return (
    <div className="overflow-hidden rounded-lg border border-white/[0.16] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
          Try it live
        </span>
        {trialDone && (
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/[0.06] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-emerald-300">
            <Check className="h-3 w-3" />
            Done · {POINTS.trial} pts
          </span>
        )}
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] font-medium ${
            method === "GET" ? "border-white/20 text-white/70" : "border-white/40 bg-white/[0.06] text-white"
          }`}
        >
          {method}
        </span>
        <code className="font-mono text-[12.5px] text-white/80">{path}</code>
      </div>

      <div className="space-y-3 p-4 sm:p-5">
        <input
          type="password"
          value={apiKey}
          onChange={(e) => onKeyChange(e.target.value)}
          placeholder="Your Swarms API key (stays in this browser, sent only to api.swarms.world)"
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore=""
          data-bwignore="true"
          data-form-type="other"
          className="w-full rounded-md border border-white/[0.12] bg-black px-3 py-2 font-mono text-[12px] text-white placeholder-white/30 outline-none transition-colors focus:border-white/35"
        />

        {method === "POST" && (
          <textarea
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            spellCheck={false}
            rows={Math.min(18, bodyText.split("\n").length + 1)}
            className="w-full resize-y rounded-md border border-white/[0.12] bg-black px-3 py-2 font-mono text-[12px] leading-relaxed text-white/80 outline-none transition-colors focus:border-white/35"
            aria-label="Request body (editable JSON)"
          />
        )}

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={run}
            disabled={running}
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-xs font-medium text-black transition-colors hover:bg-neutral-200 disabled:pointer-events-none disabled:opacity-60"
          >
            {running ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Play className="h-3.5 w-3.5" />}
            {running ? "Running" : "Send request"}
          </button>
          <button
            type="button"
            onClick={copyCurl}
            className="inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-5 py-2 text-xs font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy as cURL"}
          </button>
          {note && <span className="text-[12px] leading-relaxed text-white/40">{note}</span>}
        </div>

        {result && (
          <div className="overflow-hidden rounded-md border border-white/[0.1]">
            <div className="flex items-center gap-3 border-b border-white/[0.08] bg-black px-3 py-2">
              <span
                className={`font-mono text-[11px] font-medium ${
                  result.ok ? "text-emerald-400/90" : "text-red-400/90"
                }`}
              >
                {result.status ?? "ERROR"}
              </span>
              <span className="font-mono text-[11px] text-white/40">{result.ms} ms</span>
              {earnedNow && (
                <span className="ml-auto font-mono text-[11px] font-semibold text-emerald-300">
                  +{POINTS.trial} pts
                </span>
              )}
            </div>
            <pre className="max-h-80 overflow-auto bg-black p-3 font-mono text-[11.5px] leading-relaxed text-white/70">
              <code>{result.body}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}
