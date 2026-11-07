import { Bug, FileSearch, Mail, Radar, ScanSearch, Siren } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Cybersecurity",
  description:
    "Alert triage, threat intelligence research, phishing review, vulnerability prioritization and incident report drafting, run as agent teams on the Swarms API with analysts approving every action.",
  bullets: [
    "Question, research, analysis and synthesis agents on one alert cluster, one request",
    "Indicators mapped to tactics and techniques with the evidence listed per cell",
    "Draft incident reports in your template, with the analyst's verdict recorded separately",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "question",
    label: "Question",
    nodes: [{ id: "question", label: "Question Agent", model: "gpt-5.4-mini", says: "4 questions: initial access, scope, persistence, exfil" }],
  },
  {
    id: "research",
    label: "Research",
    nodes: [{ id: "research", label: "Research Agent", model: "gemini-2.5-pro", says: "41 related events pulled, 3 hosts, 2 accounts" }],
  },
  {
    id: "analysis",
    label: "Analysis",
    nodes: [{ id: "analysis", label: "Analysis Agent", model: "claude-sonnet-5-5", says: "indicators map to 5 techniques across 4 tactics" }],
  },
  {
    id: "synthesis",
    label: "Synthesis",
    nodes: [{ id: "synthesis", label: "Synthesis Agent", model: "claude-opus-5-5", says: "incident report drafted, 2 open questions for the analyst" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Incident investigation",
    description:
      "A question agent frames what must be answered about an alert cluster, a research agent gathers the related events and indicator context, an analysis agent maps indicators to tactics and techniques, and a synthesis agent drafts the incident report. The analyst confirms the verdict.",
    swarmType: "HeavySwarm",
    agents: ["Question Agent", "Research Agent", "Analysis Agent", "Synthesis Agent"],
    icon: ScanSearch,
  },
  {
    title: "Alert triage",
    description:
      "Raw alerts from the SIEM and EDR are deduplicated, correlated by host, account and time window, and given a proposed verdict (benign, suspicious, escalate) with the reason. The queue an analyst sees is the correlated set, with the proposed verdicts marked as proposals.",
    swarmType: "SequentialWorkflow",
    agents: ["Deduplicator", "Correlator", "Triage Agent"],
    icon: Siren,
  },
  {
    title: "Threat intelligence digest",
    description:
      "Vendor feed, open-source and internal telemetry agents each summarize what changed in the last day for your sector and stack, and an aggregator writes the digest with the items that touch assets you actually run on top.",
    swarmType: "MixtureOfAgents",
    agents: ["Vendor Feed Agent", "OSINT Agent", "Telemetry Agent", "Digest Aggregator"],
    icon: Radar,
  },
  {
    title: "Phishing report review",
    description:
      "User-reported emails go to three reviewers that examine headers, links and content independently and each vote malicious, suspicious or benign. The majority and any dissent go to the analyst who decides whether to pull the message from mailboxes.",
    swarmType: "MajorityVoting",
    agents: ["Header Reviewer", "Link Reviewer", "Content Reviewer"],
    icon: Mail,
  },
  {
    title: "Detection rule review",
    description:
      "A proposed detection rule is scored by judge agents for coverage of the technique, expected false positive rate against your log samples, and performance cost, and an aggregator writes the ruling. The detection engineer decides whether to deploy.",
    swarmType: "CouncilAsAJudge",
    agents: ["Coverage Judge", "False Positive Judge", "Performance Judge", "Aggregator"],
    icon: FileSearch,
  },
  {
    title: "Vulnerability prioritization",
    description:
      "Exposure, exploit and asset agents review the week's scanner findings at the same time: what is reachable, what has a public exploit, what runs on it. The three views are returned together so the patch owner sees why an item is at the top.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Exposure Agent", "Exploit Agent", "Asset Agent"],
    icon: Bug,
  },
]

const investigationPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A HeavySwarm runs four stages in order: question, research, analysis,
# synthesis. The alert cluster and the related events are pasted in; in
# production an integration builds this string from the SIEM. No agent here
# has access to a console, a credential or a containment action.
ALERT_CLUSTER = """
Cluster INC-2026-0419, first seen 2026-11-06 02:14 UTC, 7 alerts, 3 hosts.
- EDR: lsass.exe memory read by an unsigned binary on WKS-2231 (user j.alvarez)
- EDR: same binary hash on WKS-2240 and SRV-FILE-03 within 11 minutes
- SIEM: 4 failed then 1 successful logon for svc_backup from WKS-2231 to SRV-FILE-03
- SIEM: scheduled task created on SRV-FILE-03 named 'WindowsUpdateCheck'
- Proxy: 38 MB POST from SRV-FILE-03 to a domain registered 9 days ago
- Mail: j.alvarez opened an attachment 'Invoice_Q4.pdf.lnk' at 01:58 UTC
"""

response = client.swarms.run(
    name="Incident Investigation INC-2026-0419",
    description="Question, research, analysis and synthesis on one alert cluster.",
    swarm_type="HeavySwarm",
    task=(
        "Investigate the alert cluster below. Establish the likely sequence of "
        "events, map every indicator to a tactic and technique with the evidence "
        "for each mapping, list what is still unknown, and draft an incident report "
        "in sections: summary, timeline, affected assets, technique mapping, open "
        "questions, recommended next steps for the analyst. Mark the report DRAFT.\\n"
        + ALERT_CLUSTER
    ),
    agents=[
        {
            "agent_name": "Question Agent",
            "description": "Frames the questions the investigation must answer.",
            "system_prompt": "You are an incident commander. From the alerts, write the specific questions that must be answered to understand initial access, scope, persistence and exfiltration. Do not speculate on answers.",
            "model_name": "gpt-5.4-mini",  # framing is short, a fast model is enough
            "max_loops": 1,
        },
        {
            "agent_name": "Research Agent",
            "description": "Gathers related events and indicator context.",
            "system_prompt": "You are a threat researcher. For each question, pull together the related events from the cluster, what is known about each indicator (hash, domain, task name) and the gaps. Cite the alert line you rely on.",
            "model_name": "gemini-2.5-pro",  # long context across many events
            "max_loops": 1,
        },
        {
            "agent_name": "Analysis Agent",
            "description": "Maps indicators to tactics and techniques.",
            "system_prompt": "You are a detection analyst. Map every indicator to a tactic and a technique, give the evidence for each mapping and a confidence of low, medium or high. Build the most likely timeline.",
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Synthesis Agent",
            "description": "Writes the draft incident report.",
            "system_prompt": "You write incident reports for a security operations team. Use the sections requested, keep claims tied to evidence, list the open questions plainly and end with recommended next steps that the analyst, not you, will approve.",
            "model_name": "claude-opus-5-5",  # the report is the deliverable
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const investigationCurl = `# One alert cluster through question, research, analysis and synthesis.
# The draft report goes to the analyst; no agent here can touch a host.
# Requires: SWARMS_API_KEY from Swarms Cloud, jq for the summary at the end.
curl -s -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Incident Investigation INC-2026-0419",
    "description": "Question, research, analysis and synthesis on one alert cluster.",
    "swarm_type": "HeavySwarm",
    "task": "Investigate cluster INC-2026-0419 (7 alerts, 3 hosts): lsass memory read by an unsigned binary on WKS-2231 (user j.alvarez); same hash on WKS-2240 and SRV-FILE-03 within 11 minutes; 4 failed then 1 successful logon for svc_backup from WKS-2231 to SRV-FILE-03; scheduled task WindowsUpdateCheck created on SRV-FILE-03; 38 MB POST from SRV-FILE-03 to a 9-day-old domain; j.alvarez opened Invoice_Q4.pdf.lnk at 01:58 UTC. Map every indicator to a tactic and technique with evidence, list unknowns, and draft the incident report marked DRAFT.",
    "agents": [
      {
        "agent_name": "Question Agent",
        "system_prompt": "You are an incident commander. Write the specific questions the investigation must answer about initial access, scope, persistence and exfiltration. Do not speculate on answers.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Research Agent",
        "system_prompt": "You are a threat researcher. For each question, gather the related events and indicator context from the cluster and name the gaps. Cite the alert you rely on.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Analysis Agent",
        "system_prompt": "You are a detection analyst. Map every indicator to a tactic and technique with evidence and a confidence level, and build the most likely timeline.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Synthesis Agent",
        "system_prompt": "You write incident reports for a SOC. Use the requested sections, tie claims to evidence, list open questions and end with next steps for the analyst to approve.",
        "model_name": "claude-opus-5-5",
        "max_loops": 1
      }
    ],
    "rules": "Tie every claim to an alert line. Mark anything unknown as unknown.",
    "max_loops": 1
  }' | jq '{report: .output, usage: .usage}'`

const phishingVoteTs = `// Phishing report review as a MajorityVoting swarm. Three reviewers look at
// headers, links and content independently and vote. The analyst decides
// whether to pull the message; this code never touches a mailbox.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type ReportedEmail = {
  reportId: string
  from: string
  replyTo?: string
  subject: string
  authResults: string
  links: string[]
  bodyText: string
}

const reviewer = (name: string, model: string, focus: string) => ({
  agent_name: name,
  system_prompt:
    "You review user-reported emails for a security team. " +
    focus +
    " Answer MALICIOUS, SUSPICIOUS or BENIGN on the first line, then the specific evidence. Do not open or follow any link; reason from the text you are given.",
  model_name: model,
  max_loops: 1,
})

export async function reviewPhish(e: ReportedEmail) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: \`Phish Review \${e.reportId}\`,
      swarm_type: "MajorityVoting",
      task:
        \`Reported email \${e.reportId}.\\nFrom: \${e.from}\\nReply-To: \${e.replyTo ?? "(none)"}\\nSubject: \${e.subject}\\n\` +
        \`Authentication-Results: \${e.authResults}\\nLinks:\\n\${e.links.map((l) => "  " + l).join("\\n")}\\n\\nBody:\\n\${e.bodyText}\`,
      agents: [
        reviewer("Header Reviewer", "gpt-5.4-mini", "Focus on sender domain, reply-to mismatch, SPF, DKIM and DMARC results."),
        reviewer("Link Reviewer", "claude-haiku-5-5", "Focus on link domains versus display text, URL shorteners, lookalike domains and credential-harvest patterns."),
        reviewer("Content Reviewer", "gemini-2.5-flash", "Focus on urgency, payment or credential requests, and whether the request fits how this sender normally communicates."),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)
  const data = await res.json()
  // The majority verdict and each vote go to the analyst's queue as a proposal.
  return { proposal: data.output as string, usage: data.usage as { total_tokens: number } }
}

reviewPhish({
  reportId: "PR-88213",
  from: "Accounts Payable <ap@contoso-invoices.com>",
  replyTo: "ap.contoso@gmail.com",
  subject: "URGENT: updated bank details for invoice 4471",
  authResults: "spf=fail dkim=none dmarc=fail",
  links: ["https://contoso-invoices.com/secure/login?ref=4471"],
  bodyText: "Please update our bank details before Friday's payment run. Log in to confirm.",
}).then((r) => console.log(r.proposal, r.usage.total_tokens))`

const auditLogsPython = `import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"]}

# Every investigation run is stored in Swarms Cloud with its configuration,
# outcome and usage. This pulls the request history so the SOC can attach the
# agent record to an incident ticket and account for spend per incident.
logs = requests.get(f"{BASE}/v1/swarm/logs", headers=HEADERS, timeout=60).json()
metrics = requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json()


def walk(node, key):
    """Yield every value stored under key anywhere in a nested JSON document."""
    if isinstance(node, dict):
        for k, v in node.items():
            if k == key:
                yield v
            yield from walk(v, key)
    elif isinstance(node, list):
        for item in node:
            yield from walk(item, key)


# Group runs by the incident id embedded in the swarm name, for example
# "Incident Investigation INC-2026-0419", and total the tokens per incident.
by_incident: dict[str, dict] = {}
for entry in walk(logs, "data"):
    if not isinstance(entry, dict):
        continue
    name = str(entry.get("name", ""))
    incident = next((part for part in name.split() if part.startswith("INC-")), "other")
    tokens = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
    bucket = by_incident.setdefault(incident, {"runs": 0, "tokens": 0, "swarm_types": set()})
    bucket["runs"] += 1
    bucket["tokens"] += tokens
    for st in walk(entry, "swarm_type"):
        if isinstance(st, str):
            bucket["swarm_types"].add(st)

print(f"{'incident':20s} {'runs':>5s} {'tokens':>12s}  swarm types")
for incident, b in sorted(by_incident.items(), key=lambda kv: -kv[1]["tokens"]):
    print(f"{incident:20s} {b['runs']:>5d} {b['tokens']:>12,d}  {', '.join(sorted(b['swarm_types']))}")

print()
print("account summary:", metrics)

# Attach the raw entries for one incident to its ticket as the agent record.
INCIDENT = "INC-2026-0419"
record = [e for e in walk(logs, "data") if isinstance(e, dict) and INCIDENT in str(e.get("name", ""))]
print(f"{len(record)} runs for {INCIDENT} ready to attach to the ticket")`

const vulnFrameworkPython = `from swarms import Agent, ConcurrentWorkflow

# Vulnerability prioritization on the open-source swarms package (pip install
# swarms). Three agents read the same findings at once and the patch owner
# sees all three views. Nothing here changes a system.
exposure = Agent(
    agent_name="Exposure Agent",
    system_prompt=(
        "You assess network exposure. For each finding, say whether the asset is "
        "internet-facing, reachable from user networks only, or isolated, based on "
        "the asset notes. Rank findings by exposure."
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

exploit = Agent(
    agent_name="Exploit Agent",
    system_prompt=(
        "You assess exploitability. For each CVE, state whether public exploit code "
        "or active exploitation is noted in the finding, and whether the affected "
        "component is actually in use per the asset notes. Rank by exploitability."
    ),
    model_name="claude-haiku-5-5",
    max_loops=1,
)

asset = Agent(
    agent_name="Asset Agent",
    system_prompt=(
        "You assess business impact. For each asset, say what it runs, who owns it "
        "and what breaks if it is compromised, from the asset notes. Rank by impact."
    ),
    model_name="gemini-2.5-flash",
    max_loops=1,
)

workflow = ConcurrentWorkflow(
    name="Vulnerability Prioritization",
    description="Exposure, exploitability and impact views on the same findings.",
    agents=[exposure, exploit, asset],
    max_loops=1,
)

FINDINGS = """
1. CVE-2026-21001, critical, web framework RCE. Asset: web-portal-02, internet-facing,
   runs the customer portal, owner: platform team. Public exploit: yes.
2. CVE-2026-20417, high, SMB signing not enforced. Asset: SRV-FILE-03, internal only,
   finance shares, owner: infra team. Public exploit: no.
3. CVE-2026-19880, medium, outdated TLS library. Asset: build-runner-07, isolated
   build network, owner: dev tooling. Public exploit: no, component unused at runtime.
"""

result = workflow.run("Prioritize these findings for this week's patch window.\\n" + FINDINGS)
print(result)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "investigate.py",
    code: investigationPython,
    note: "The Python SDK (pip install swarms-client) runs one alert cluster through a HeavySwarm: a question agent on a fast model frames the investigation, a long-context model gathers the related events, an analysis agent maps indicators to techniques, and the synthesis agent on the strongest model drafts the report. The analyst confirms the verdict.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "investigate.sh",
    code: investigationCurl,
    note: "The same investigation as a raw HTTP call with the alert cluster inline. The response holds the output and the usage block billing is computed from, and the run is stored in Swarms Cloud under the incident id in its name.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "reviewPhish.ts",
    code: phishingVoteTs,
    note: "Phishing review as a MajorityVoting swarm from a Node or edge runtime. Header, link and content reviewers vote independently on fast models, and the majority with each dissent goes to the analyst as a proposal. The reviewers are told to reason from the text and never follow a link.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Audit",
    file: "incident_audit.py",
    code: auditLogsPython,
    note: "Swarms Cloud keeps every run with its configuration, outcome and usage. This script pulls the swarm logs, groups runs by the incident id in the swarm name, totals tokens per incident and collects the raw entries for one incident so they can be attached to its ticket.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "prioritize_vulns.py",
    code: vulnFrameworkPython,
    note: "The same kind of pattern on the open-source swarms package (pip install swarms) for teams that run the orchestration inside their own environment. Three agents read the findings concurrently and the patch owner sees exposure, exploitability and impact side by side.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Why a HeavySwarm for investigations rather than one large prompt?",
    a: "An investigation has stages that want different things: framing wants discipline, research wants context length, mapping wants careful reasoning, and the report wants writing quality. HeavySwarm runs question, research, analysis and synthesis as separate agents, so each can run on the model that fits and each stage's output is logged on its own. The analyst can see where a conclusion came from.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Do the agents contain hosts, disable accounts or block domains?",
    a: "No. Nothing on this page gives an agent a console, a credential or a containment action. The agents return proposed verdicts, mappings and draft reports; analysts approve any action and carry it out through the tools they already use. If a team later decides to expose a tool to an agent, that tool's limits are a separate design decision, and the Swarms Cloud logs show every call.",
  },
  {
    q: "How do alerts and logs get into the request?",
    a: "You put them in the task. The examples paste the alert cluster as text; a production integration builds that string from the SIEM, EDR, mail gateway or ticketing system and sends it on a trigger such as a new correlated cluster. Agents can also call tools you expose, such as a read-only indicator lookup, under limits you set.",
  },
  {
    q: "What about sending internal telemetry to third-party models?",
    a: "Each agent carries its own model_name, so you decide per agent which provider sees what. Teams commonly redact hostnames and usernames into consistent tokens before the request and map them back afterwards. Enterprise accounts can discuss data handling and deployment options with the Swarms team.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    q: "How is the agent record kept for an incident review?",
    a: "Every run is stored in Swarms Cloud with the request, each agent's output, the model ids, token counts and latency, and the swarm logs endpoint returns the same data. Naming runs after the incident id, as the examples do, lets the audit script on this page pull the complete agent record for one incident and attach it to the ticket.",
    link: { label: "Model pricing", href: "/pricing" },
  },
]

export const telemetryName = "incident-investigation · HeavySwarm"
