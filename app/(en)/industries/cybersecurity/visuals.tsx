"use client"

import { useMemo, useRef } from "react"

import { SimulatedBadge } from "@/components/industries/simulated-badge"
import { noise, useSimulationClock } from "@/components/industries/use-simulation"

const ACCENT = "#ffffff"
const RED = "#ef4444"
const MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace"

// Hero visual: an alert stream with severity badges flowing into a triage
// funnel (raw, deduplicated, correlated, escalated) with counts, and the
// triage agent's proposed verdict on the newest correlated cluster beside
// the analyst's confirmation.

type Severity = "critical" | "high" | "medium" | "low"
const SEV_COLOR: Record<Severity, string> = { critical: RED, high: "rgba(255,255,255,0.9)", medium: "rgba(255,255,255,0.6)", low: "rgba(255,255,255,0.35)" }
const SOURCES = ["EDR", "SIEM", "Proxy", "Mail", "IdP", "Cloud"]
const ALERT_NAMES = [
  "lsass memory read by unsigned binary",
  "impossible travel logon",
  "scheduled task created by script",
  "outbound POST to new domain",
  "attachment .lnk opened",
  "brute force then success",
  "new inbox forwarding rule",
  "S3 bucket policy changed",
  "PowerShell encoded command",
  "service account interactive logon",
]
const FUNNEL = ["Raw alerts", "Deduplicated", "Correlated", "Escalated"]
const VERDICTS = ["escalate", "suspicious", "benign"] as const

function severityFor(seed: number, i: number): Severity {
  const r = noise(seed, i)
  if (r < 0.08) return "critical"
  if (r < 0.3) return "high"
  if (r < 0.65) return "medium"
  return "low"
}

export function AlertTriageFunnel() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1000)

  // Two alerts arrive per tick; the stream shows the last seven.
  const stream = useMemo(() => {
    const out: { key: number; sev: Severity; source: string; name: string }[] = []
    for (let i = Math.max(0, tick * 2 - 6); i <= tick * 2 + 1; i++) {
      out.push({ key: i, sev: severityFor(301, i), source: SOURCES[Math.floor(noise(302, i) * SOURCES.length)], name: ALERT_NAMES[Math.floor(noise(303, i) * ALERT_NAMES.length)] })
    }
    return out.slice(-7).reverse()
  }, [tick])

  // Funnel counts for the current hour: each stage is a fraction of the last.
  const raw = 1180 + Math.round(noise(310, Math.floor(tick / 4)) * 260) + (tick % 4) * 2
  const dedup = Math.round(raw * (0.31 + noise(311, Math.floor(tick / 4)) * 0.06))
  const correlated = Math.round(dedup * (0.18 + noise(312, Math.floor(tick / 4)) * 0.05))
  const escalated = Math.round(correlated * (0.22 + noise(313, Math.floor(tick / 4)) * 0.08))
  const counts = [raw, dedup, correlated, escalated]

  // The cluster under triage changes every 4 ticks: agent proposes, then the
  // analyst confirms or changes it.
  const cluster = Math.floor(tick / 4)
  const phase = tick % 4
  const clusterId = `CL-${String(4400 + cluster).padStart(5, "0")}`
  const verdict = VERDICTS[noise(320, cluster) < 0.3 ? 0 : noise(320, cluster) < 0.7 ? 1 : 2]
  const analystAgrees = noise(321, cluster) < 0.8
  const analystVerdict = analystAgrees ? verdict : VERDICTS[(VERDICTS.indexOf(verdict) + 1) % 3]
  const hosts = 1 + Math.floor(noise(322, cluster) * 4)
  const alerts = 3 + Math.floor(noise(323, cluster) * 9)
  const reason = {
    escalate: "credential access followed by lateral movement to a file server within 11 minutes",
    suspicious: "single host, new scheduled task, no outbound traffic yet; needs the EDR timeline",
    benign: "matches the approved backup job window and the signed vendor binary",
  }[verdict]

  const W = 300
  const H = 190
  const FUNNEL_TOP = 18
  const ROW_H = 40
  const widthFor = (i: number) => W * (1 - i * 0.2)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">SOC · alert triage</span>
        <span className="hidden font-mono text-[11px] text-white/45 sm:inline">last hour</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated alerts" : "Paused"} />
      </div>

      <div className="grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="border-b border-white/[0.08] p-4 sm:border-b-0 sm:border-r">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Alert stream</p>
          <ul className="mt-3 space-y-1.5" aria-live="off">
            {stream.map((a, i) => (
              <li key={a.key} className="flex items-center gap-2 text-xs" style={{ opacity: 1 - i * 0.11 }}>
                <span className="w-14 shrink-0 rounded border px-1 py-px text-center font-mono text-[9px] uppercase tracking-wide" style={{ color: SEV_COLOR[a.sev], borderColor: a.sev === "critical" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.15)" }}>
                  {a.sev}
                </span>
                <span className="w-9 shrink-0 font-mono text-[10px] text-white/40">{a.source}</span>
                <span className="truncate text-white/60">{a.name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Triage funnel</p>
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" className="mt-2 block" role="img" aria-label={`Simulated triage funnel: ${raw} raw alerts, ${dedup} after deduplication, ${correlated} correlated clusters, ${escalated} escalated`}>
            {FUNNEL.map((label, i) => {
              const w = widthFor(i)
              const x = (W - w) / 2
              const y = FUNNEL_TOP + i * (ROW_H + 4)
              const last = i === FUNNEL.length - 1
              return (
                <g key={label}>
                  <rect x={x} y={y} width={w} height={ROW_H} rx={5} fill={last ? `${ACCENT}22` : `rgba(255,255,255,${(0.04 + i * 0.02).toFixed(2)})`} stroke={last ? ACCENT : "rgba(255,255,255,0.12)"} />
                  <text x={x + 10} y={y + 16} fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.45)" style={{ letterSpacing: 1 }}>
                    {label.toUpperCase()}
                  </text>
                  <text x={x + 10} y={y + 32} fontSize={14} fontFamily={MONO} fill={last ? ACCENT : "rgba(255,255,255,0.85)"}>
                    {counts[i].toLocaleString("en-US")}
                  </text>
                  <text x={x + w - 10} y={y + 32} textAnchor="end" fontSize={9} fontFamily={MONO} fill="rgba(255,255,255,0.35)">
                    {i === 0 ? "per hour" : `${Math.round((counts[i] / counts[i - 1]) * 100)}% of prior`}
                  </text>
                  {i < FUNNEL.length - 1 && running && (
                    <circle cx={W / 2} r={2.5} fill={ACCENT}>
                      <animate attributeName="cy" from={y + ROW_H} to={y + ROW_H + 4} dur="0.5s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>

      <div className="border-t border-white/[0.08] px-4 py-3">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Newest cluster</span>
          <span className="font-mono text-xs text-white/80">{clusterId}</span>
          <span className="text-xs text-white/50">
            {alerts} alerts · {hosts} host{hosts === 1 ? "" : "s"}
          </span>
        </div>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          <div className="rounded-md border border-white/[0.08] bg-black/40 p-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-white/85">Triage Agent</span>
              <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: phase >= 1 ? (verdict === "escalate" ? RED : verdict === "suspicious" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.9)") : "rgba(255,255,255,0.35)" }}>
                {phase >= 1 ? `proposed: ${verdict}` : "correlating"}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-white/35">claude-sonnet-5-5</p>
            <p className="mt-1.5 leading-snug text-white/55">{phase >= 1 ? reason : "grouping by host, account and time window"}</p>
          </div>
          <div className="rounded-md border border-white/[0.08] bg-black/40 p-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="font-semibold text-white/85">Analyst</span>
              <span className="font-mono text-[10px] uppercase tracking-wide" style={{ color: phase >= 3 ? "#fff" : "rgba(255,255,255,0.35)" }}>
                {phase >= 3 ? (analystAgrees ? `confirmed: ${analystVerdict}` : `changed to: ${analystVerdict}`) : "reviewing"}
              </span>
            </div>
            <p className="mt-0.5 font-mono text-[10px] text-white/35">human</p>
            <p className="mt-1.5 leading-snug text-white/55">
              {phase >= 3 ? (verdict === "escalate" && analystAgrees ? "ticket opened, investigation swarm started; no containment until approved" : analystAgrees ? "verdict recorded, cluster closed with the agent's reason attached" : "verdict changed; agent reason kept in the record for tuning") : "reads the proposed verdict and the evidence lines"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Second visual: a tactic-by-technique grid that lights up as the analysis
// agent maps indicators, with the HeavySwarm's report sections filling in
// beside it: question, research, analysis, synthesis.

const TACTICS = ["Recon", "Resource Dev", "Initial Access", "Execution", "Persistence", "Priv Esc", "Defense Evasion", "Cred Access", "Discovery", "Lateral Mvmt", "Collection", "Exfiltration"]
const TECHNIQUES: string[][] = [
  ["Active scanning", "Victim host info", "Search open sites", "Phishing for info", "Gather identities", "Network scanning"],
  ["Acquire domains", "Stage capabilities", "Compromise accounts", "Develop malware", "Obtain certificates", "Acquire servers"],
  ["Phishing attachment", "Drive-by", "Valid accounts", "External service", "Supply chain", "Removable media"],
  ["Scripting interpreter", "Scheduled task", "User execution", "Native API", "WMI", "Shared modules"],
  ["Scheduled task", "Registry run key", "Account creation", "Service install", "Boot scripts", "Browser extension"],
  ["Token manipulation", "Exploit for priv esc", "Process injection", "Bypass UAC", "Scheduled task", "Valid accounts"],
  ["Obfuscated files", "Indicator removal", "Masquerading", "Signed binary proxy", "Disable logging", "Timestomp"],
  ["Credential dumping", "Brute force", "Kerberoasting", "Input capture", "Unsecured credentials", "Forged tickets"],
  ["Account discovery", "Network share discovery", "System info", "Process discovery", "Remote system discovery", "Permission groups"],
  ["Remote services", "Pass the hash", "Lateral tool transfer", "Remote desktop", "SMB admin shares", "Internal spearphishing"],
  ["Data from local system", "Data from network share", "Archive collected data", "Screen capture", "Email collection", "Clipboard data"],
  ["Exfil over web service", "Exfil over C2", "Scheduled transfer", "Exfil to cloud storage", "Size limits", "Alternative protocol"],
]

// The investigation's mapping sequence: (tactic, technique row) pairs in the
// order the analysis agent finds them, plus the evidence line for each.
const MAPPING: { t: number; r: number; evidence: string }[] = [
  { t: 2, r: 0, evidence: "Invoice_Q4.pdf.lnk opened from mail at 01:58 UTC" },
  { t: 3, r: 2, evidence: "user double-clicked the .lnk, child process spawned" },
  { t: 3, r: 0, evidence: "PowerShell encoded command from the .lnk" },
  { t: 7, r: 0, evidence: "lsass.exe memory read by unsigned binary" },
  { t: 7, r: 1, evidence: "4 failed then 1 successful logon for svc_backup" },
  { t: 9, r: 0, evidence: "svc_backup logon from WKS-2231 to SRV-FILE-03" },
  { t: 4, r: 0, evidence: "task WindowsUpdateCheck created on SRV-FILE-03" },
  { t: 8, r: 1, evidence: "share enumeration on SRV-FILE-03" },
  { t: 10, r: 1, evidence: "finance share read in bulk" },
  { t: 11, r: 0, evidence: "38 MB POST to a 9-day-old domain" },
]
const CYCLE = MAPPING.length + 5

export function AttackGrid() {
  const ref = useRef<HTMLDivElement>(null)
  const { tick, running } = useSimulationClock(ref, 1300)

  const step = tick % CYCLE
  const mapped = Math.min(MAPPING.length, step)
  const lit = MAPPING.slice(0, mapped)
  const latest = lit[lit.length - 1]
  const done = step >= MAPPING.length

  const sections = [
    { name: "Question", agent: "Question Agent", model: "gpt-5.4-mini", ready: step >= 1, text: "How did the attacker get in, which hosts and accounts are involved, is there persistence, and did data leave?" },
    { name: "Research", agent: "Research Agent", model: "gemini-2.5-pro", ready: step >= 3, text: `${Math.min(41, 8 + mapped * 4)} related events across 3 hosts and 2 accounts; the binary hash is unknown to vendor feeds; the domain was registered 9 days ago.` },
    { name: "Analysis", agent: "Analysis Agent", model: "claude-sonnet-5-5", ready: step >= 5, text: done ? `${MAPPING.length} indicators mapped across ${new Set(MAPPING.map((m) => m.t)).size} tactics. Likely chain: phishing, execution, credential dumping, lateral movement, collection, exfiltration.` : `${mapped} of ${MAPPING.length} indicators mapped so far; chain forming from initial access to credential access.` },
    { name: "Synthesis", agent: "Synthesis Agent", model: "claude-opus-5-5", ready: done, text: "DRAFT incident report: summary, timeline, affected assets (WKS-2231, WKS-2240, SRV-FILE-03), technique mapping, 2 open questions, recommended next steps for analyst approval." },
  ]

  const CELL_W = 42
  const CELL_H = 14
  const GAP = 2
  const TOP = 48
  const W = TACTICS.length * (CELL_W + GAP)
  const H = TOP + TECHNIQUES[0].length * (CELL_H + GAP)

  return (
    <div ref={ref} className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
      <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
        <span className="text-sm font-semibold text-white/85">HeavySwarm · technique map and report</span>
        <span className="font-mono text-[11px] text-white/45">INC-2026-0419</span>
        <SimulatedBadge className="ml-auto" label={running ? "Simulated investigation" : "Paused"} />
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="overflow-x-auto p-4">
          <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ minWidth: 520 }} className="block" role="img" aria-label={`Simulated tactic and technique grid, ${mapped} of ${MAPPING.length} indicators mapped`}>
            {TACTICS.map((t, ti) => {
              const x = ti * (CELL_W + GAP)
              const words = t.split(" ")
              const tacticLit = lit.some((m) => m.t === ti)
              return (
                <g key={t}>
                  {words.map((w, wi) => (
                    <text key={wi} x={x + CELL_W / 2} y={14 + wi * 11} textAnchor="middle" fontSize={7.5} fontFamily={MONO} fill={tacticLit ? ACCENT : "rgba(255,255,255,0.45)"}>
                      {w.toUpperCase()}
                    </text>
                  ))}
                  {TECHNIQUES[ti].map((name, r) => {
                    const on = lit.some((m) => m.t === ti && m.r === r)
                    const isLatest = latest && latest.t === ti && latest.r === r
                    return (
                      <g key={name}>
                        <rect x={x} y={TOP + r * (CELL_H + GAP)} width={CELL_W} height={CELL_H} rx={2} fill={on ? (isLatest ? ACCENT : `${ACCENT}66`) : "rgba(255,255,255,0.05)"} stroke={isLatest ? "#fff" : "none"} strokeWidth={isLatest ? 1 : 0} style={{ transition: "fill 400ms" }}>
                          <title>{`${t}: ${name}`}</title>
                        </rect>
                      </g>
                    )
                  })}
                </g>
              )
            })}
          </svg>
          <div className="mt-3 min-h-[36px] font-mono text-[11px] leading-5 text-white/50">
            {latest ? (
              <p>
                <span className="text-white/35">{String(mapped).padStart(2, "0")}</span> Analysis Agent: <span className="text-white/85">{TACTICS[latest.t]}</span> / {TECHNIQUES[latest.t][latest.r]} <span className="text-white/35">· {latest.evidence}</span>
              </p>
            ) : (
              <p className="text-white/35">Analysis Agent: waiting on research before mapping indicators.</p>
            )}
            {done && <p className="text-white/40">Mapping complete; synthesis drafting the report.</p>}
          </div>
        </div>

        <div className="border-t border-white/[0.08] lg:border-l lg:border-t-0">
          <p className="px-4 pt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Report sections</p>
          <ol className="divide-y divide-white/[0.06]">
            {sections.map((s) => (
              <li key={s.name} className="px-4 py-3" style={{ opacity: s.ready ? 1 : 0.35, transition: "opacity 400ms" }}>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.ready ? ACCENT : "rgba(255,255,255,0.25)" }} aria-hidden="true" />
                  <span className="text-xs font-semibold text-white/85">{s.name}</span>
                  <span className="ml-auto font-mono text-[10px] text-white/35">{s.model}</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/55">{s.ready ? s.text : `${s.agent} waiting on the previous stage`}</p>
              </li>
            ))}
          </ol>
          <p className="border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[10px] leading-4 text-white/35">Report is a draft. The analyst confirms the verdict and approves any action.</p>
        </div>
      </div>
    </div>
  )
}
