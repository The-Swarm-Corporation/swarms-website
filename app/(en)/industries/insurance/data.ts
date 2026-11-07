import { ClipboardCheck, FileSearch, Receipt, Scale, ShieldAlert, Umbrella } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Insurance",
  description:
    "Claims intake and triage, coverage review, underwriting assessment, fraud signals and policy document checks, run as agent teams on the Swarms API with adjusters deciding.",
  bullets: [
    "Coverage, damage and fraud reviewers each answer independently, then a majority is tallied",
    "Underwriting submissions scored factor by factor, with the referral reasons written out",
    "Every vote, dissent and token count stored per claim for audit and chargeback",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "reviewers",
    label: "Reviewers",
    nodes: [
      { id: "coverage", label: "Coverage Reviewer", model: "gpt-5.4-mini", says: "peril covered, deductible $1,000 applies" },
      { id: "damage", label: "Damage Reviewer", model: "claude-sonnet-5-5", says: "estimate within 8% of photo-based range" },
      { id: "fraud", label: "Fraud Reviewer", model: "gemini-2.5-flash", says: "two prior claims at the address, flag for SIU" },
    ],
  },
  {
    id: "tally",
    label: "Consensus",
    nodes: [{ id: "tally", label: "Majority Tally", model: "gpt-5.4", says: "2 of 3 approve, fraud dissent attached" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Claim decision vote",
    description:
      "Coverage, damage and fraud reviewer agents read the same claim file independently and each return approve, investigate or deny with a reason. The majority recommendation and every dissent go to the adjuster, who makes the decision.",
    swarmType: "MajorityVoting",
    agents: ["Coverage Reviewer", "Damage Reviewer", "Fraud Reviewer"],
    icon: Scale,
  },
  {
    title: "FNOL intake and document extraction",
    description:
      "A first notice of loss arrives as a call transcript, a web form or an email. Agents extract the policy number, loss date, peril and parties, pull the matching fields from attached documents and write the triage note in the claims system's format.",
    swarmType: "SequentialWorkflow",
    agents: ["Intake Reader", "Document Extractor", "Triage Writer"],
    icon: FileSearch,
  },
  {
    title: "Underwriting submission review",
    description:
      "Property, loss history and location agents each score one part of a submission against the underwriting guide, and an aggregator writes the referral memo with the factors that drove the score. The underwriter accepts, refers or declines.",
    swarmType: "MixtureOfAgents",
    agents: ["Property Agent", "Loss History Agent", "Location Agent", "Underwriting Aggregator"],
    icon: ClipboardCheck,
  },
  {
    title: "Fraud signal screening",
    description:
      "Pattern, network and narrative agents screen a claim at the same time: repeat claimants and providers, links between parties across the book, and inconsistencies between the statement and the documents. Flags go to the SIU queue with the evidence listed.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Pattern Agent", "Network Agent", "Narrative Agent"],
    icon: ShieldAlert,
  },
  {
    title: "Subrogation and recovery",
    description:
      "A director agent reviews a closed claim for recovery potential, assigns liability and evidence sub-tasks to worker agents, and assembles the demand package for the recovery team to review and send.",
    swarmType: "HierarchicalSwarm",
    agents: ["Recovery Director", "Liability Agent", "Evidence Agent", "Demand Writer"],
    icon: Receipt,
  },
  {
    title: "Policy wording questions",
    description:
      "A router reads each coverage question from an agent or call center desk and sends it to the specialist for that line, which answers from the policy form and endorsements on file and quotes the clause it relied on.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Auto Policy Agent", "Property Policy Agent", "Liability Policy Agent"],
    icon: Umbrella,
  },
]

const claimVotePython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# Three reviewers read the same claim file independently. MajorityVoting
# returns the majority recommendation and keeps each vote, so a dissent from
# one reviewer is visible to the adjuster instead of averaged away.
CLAIM_FILE = """
Claim HO-2026-118342. Homeowners policy, Form HO-3, deductible $1,000.
Loss date 2026-10-28. Peril reported: water damage from a burst supply
line under the kitchen sink. Claimant estimate $14,850 (flooring, lower
cabinets, drywall). Plumber invoice attached dated 2026-10-29. Photos: 11.
Prior claims at this address: 2024 (wind, paid $6,200), 2025 (theft, denied).
"""

response = client.swarms.run(
    name="Claim Decision Vote",
    description="Independent coverage, damage and fraud reviews with a majority tally.",
    swarm_type="MajorityVoting",
    task=(
        "Review the claim file below and answer with exactly one of APPROVE, "
        "INVESTIGATE or DENY on the first line, followed by your reasoning and "
        "the policy language or evidence you relied on.\\n\\n" + CLAIM_FILE
    ),
    agents=[
        {
            "agent_name": "Coverage Reviewer",
            "description": "Is the loss covered under the form and endorsements?",
            "system_prompt": (
                "You are a homeowners claims examiner. Decide whether the reported "
                "peril is covered under an HO-3 form, name any exclusion that could "
                "apply (gradual seepage, maintenance, flood) and state the deductible."
            ),
            "model_name": "gpt-5.4-mini",  # fast, the form logic is routine
            "max_loops": 1,
        },
        {
            "agent_name": "Damage Reviewer",
            "description": "Is the estimate consistent with the damage described?",
            "system_prompt": (
                "You are a property damage appraiser. Compare the estimate to the "
                "rooms, materials and photo count described, and say whether the "
                "amount is in a plausible range for this loss type or needs a field visit."
            ),
            "model_name": "claude-sonnet-5-5",  # stronger reasoning over the estimate
            "max_loops": 1,
        },
        {
            "agent_name": "Fraud Reviewer",
            "description": "Any indicators that warrant SIU referral?",
            "system_prompt": (
                "You are a special investigations analyst. Look for timing, prior "
                "claim history, document inconsistencies and invoice dates that do "
                "not fit the story. Recommend INVESTIGATE only with a concrete reason."
            ),
            "model_name": "gemini-2.5-flash",
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

# The majority recommendation, the individual votes and the usage block.
# The adjuster reads this in the claims system; nothing is paid from here.
print(response)`

const claimVoteCurl = `# One claim, three independent reviewers, a majority tally.
# The response is a recommendation for the adjuster; nothing is paid from here.
# Requires: SWARMS_API_KEY from Swarms Cloud, jq for the summary at the end.
# Replace the claim text with a redacted file exported from your claims system;
# the run is stored in Swarms Cloud under the name below.
curl -s -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Claim Decision Vote",
    "description": "Independent coverage, damage and fraud reviews with a majority tally.",
    "swarm_type": "MajorityVoting",
    "task": "Review claim HO-2026-118342: HO-3 homeowners policy, $1,000 deductible, water damage from a burst supply line reported 2026-10-28, estimate $14,850 for flooring, lower cabinets and drywall, plumber invoice dated 2026-10-29, 11 photos, prior claims at the address in 2024 (wind, paid) and 2025 (theft, denied). Answer APPROVE, INVESTIGATE or DENY on the first line, then your reasoning.",
    "agents": [
      {
        "agent_name": "Coverage Reviewer",
        "description": "Is the loss covered under the form and endorsements?",
        "system_prompt": "You are a homeowners claims examiner. Decide whether the peril is covered under an HO-3 form, name any exclusion that could apply and state the deductible.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Damage Reviewer",
        "description": "Is the estimate consistent with the damage described?",
        "system_prompt": "You are a property damage appraiser. Say whether the estimate is in a plausible range for the loss described or needs a field visit.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Fraud Reviewer",
        "description": "Any indicators that warrant SIU referral?",
        "system_prompt": "You are a special investigations analyst. Look for timing, history, document and invoice inconsistencies. Recommend INVESTIGATE only with a concrete reason.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      }
    ],
    "rules": "Each reviewer answers independently and never refers to another reviewer.",
    "max_loops": 1
  }' | jq '{recommendation: .output, usage: .usage}'`

const underwritingTs = `// Underwriting review as a MixtureOfAgents swarm: three specialists score
// their part of a submission in parallel and an aggregator writes the memo.
// The underwriter reads the memo and makes the accept, refer or decline call.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Submission = {
  applicant: string
  propertyType: string
  yearBuilt: number
  constructionClass: string
  zip: string
  priorLosses: { year: number; peril: string; paidUsd: number }[]
  requestedLimitUsd: number
}

const specialist = (name: string, model: string, focus: string) => ({
  agent_name: name,
  system_prompt:
    "You are a commercial property underwriting analyst. " +
    focus +
    " Score your area from 1 (favorable) to 5 (adverse), list the facts behind the score and name any guideline that requires referral.",
  model_name: model,
  max_loops: 1,
})

export async function reviewSubmission(s: Submission) {
  const losses = s.priorLosses.map((l) => \`\${l.year} \${l.peril} $\${l.paidUsd.toLocaleString()}\`).join("; ") || "none"

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Underwriting Submission Review",
      swarm_type: "MixtureOfAgents",
      task:
        \`Submission from \${s.applicant}: \${s.propertyType}, built \${s.yearBuilt}, \` +
        \`construction class \${s.constructionClass}, ZIP \${s.zip}, requested limit $\${s.requestedLimitUsd.toLocaleString()}. \` +
        \`Prior losses: \${losses}. Produce a referral memo with a composite score and the factors that drove it.\`,
      agents: [
        specialist("Property Agent", "gpt-5.4-mini", "Assess age, construction class, roof and systems for the property type."),
        specialist("Loss History Agent", "claude-haiku-5-5", "Assess frequency and severity of prior losses against the line's loss ratio targets."),
        specialist("Location Agent", "gemini-2.5-flash", "Assess wind, wildfire, flood and crime exposure for the ZIP and the protection class."),
        {
          agent_name: "Underwriting Aggregator",
          system_prompt:
            "You are a senior underwriter. Combine the three scores into a composite from 1 to 5, write a one-page referral memo and end with the reasons a human underwriter must review before any quote is issued.",
          model_name: "claude-sonnet-5-5", // the memo is the deliverable, so the strongest writer
          max_loops: 1,
        },
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)
  const data = await res.json()
  return { memo: data.output as string, usage: data.usage }
}

reviewSubmission({
  applicant: "Harbor Street Bakery LLC",
  propertyType: "single-story retail with commercial kitchen",
  yearBuilt: 1987,
  constructionClass: "joisted masonry",
  zip: "33139",
  priorLosses: [{ year: 2024, peril: "kitchen fire", paidUsd: 42_000 }],
  requestedLimitUsd: 1_200_000,
}).then((r) => console.log(r.memo))`

const batchFnolPython = `import json
import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# Overnight FNOL triage: every first notice of loss that arrived since the last
# run is turned into one swarm request, and the whole list is sent as a batch.
# The adjuster desk opens the triage notes in the morning; nothing is paid or
# denied by this job.
fnols = [
    {"id": "AU-2026-220114", "text": "Rear-ended at a stoplight on I-95, other driver cited. Bumper and trunk damage, no injuries reported. Police report number attached."},
    {"id": "HO-2026-118351", "text": "Tree fell on detached garage during the storm on 11/04. Roof partially collapsed, vehicle inside damaged. Photos attached."},
    {"id": "AU-2026-220117", "text": "Windshield cracked by road debris on the highway. No other damage. Glass shop quote attached."},
]

AGENTS = [
    {
        "agent_name": "Intake Reader",
        "system_prompt": "You are a claims intake specialist. Extract policy line, loss date, peril, parties, injuries and attached documents as JSON fields.",
        "model_name": "claude-haiku-5-5",  # extraction only, cheapest fast model
        "max_loops": 1,
    },
    {
        "agent_name": "Document Extractor",
        "system_prompt": "You read the documents named in the intake fields and extract amounts, dates and reference numbers. Say which fields are missing.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1,
    },
    {
        "agent_name": "Triage Writer",
        "system_prompt": "You write the triage note an adjuster reads first: severity, suggested handling track (fast track, standard, complex), open questions. Recommend; do not decide coverage.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1,
    },
]

batch = [
    {
        "name": f"FNOL Triage {f['id']}",
        "swarm_type": "SequentialWorkflow",
        "task": f"First notice of loss {f['id']}: {f['text']}",
        "agents": AGENTS,
        "max_loops": 1,
    }
    for f in fnols
]

res = requests.post(f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, data=json.dumps(batch), timeout=600)
res.raise_for_status()
results = res.json()

for fnol, result in zip(fnols, results):
    print("=" * 72)
    print(fnol["id"])
    print(result["output"])
    print("usage:", result["usage"])

# Each run in the batch also appears in Swarms Cloud with its usage, so the
# cost of the overnight job can be reconciled against the claim ids above.`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "claim_vote.py",
    code: claimVotePython,
    note: "The Python SDK (pip install swarms-client) sends one claim file to three reviewer agents as a MajorityVoting swarm. Each reviewer answers independently on a different model, the majority is tallied, and the response carries every vote so the adjuster can see the dissent before deciding.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "claim_vote.sh",
    code: claimVoteCurl,
    note: "The same vote as a raw HTTP call. The response holds the output with the majority recommendation and the usage block that billing is computed from, and the run is stored in Swarms Cloud under the swarm name.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "reviewSubmission.ts",
    code: underwritingTs,
    note: "Underwriting review as a MixtureOfAgents swarm from a Node or edge runtime. Three specialists score property, loss history and location in parallel, and an aggregator on a stronger model writes the referral memo. The underwriter still accepts, refers or declines.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Batch",
    file: "overnight_fnol.py",
    code: batchFnolPython,
    note: "Overnight intake as a batch: every first notice of loss becomes one SequentialWorkflow request and the list is submitted to /v1/swarm/batch/completions. Results come back in order with their usage, and each run is logged in Swarms Cloud against the claim id in its name.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Why MajorityVoting for claims instead of one agent?",
    a: "A single model reading a claim gives one opinion with no sense of how confident to be. Three reviewers on three different models answering independently show agreement or disagreement explicitly: a unanimous approve on a glass claim can go to a fast track, while a 2 to 1 split with a fraud dissent tells the adjuster exactly what to look at. The vote is a recommendation; the adjuster records the decision.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Do the agents approve or pay claims?",
    a: "No. The swarm returns a recommendation, the individual votes and the reasoning. Payment, reserve changes and denials stay in your claims system under your existing authority limits. If you want agents to take an action, you give them a tool with its own limits, and that is a separate design decision from the review itself.",
  },
  {
    q: "How is a decision reconstructed later for a complaint or a regulator?",
    a: "Every run is stored in Swarms Cloud with the request, each agent's output, the models used, token counts and latency, and the same record is available over the API from the swarm logs endpoint. Naming each run after the claim id, as the examples do, lets you pull the full agent record for one claim in one query.",
  },
  {
    q: "Can we keep claimant data out of certain models?",
    a: "Each agent in the request carries its own model_name, so you choose per agent which provider sees what. A common split is a redaction or extraction agent on one model producing structured fields, and the reviewers working from those fields rather than the raw documents. Enterprise accounts can also discuss data handling and deployment options with the Swarms team.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    q: "What does it cost to run a vote on every claim?",
    a: "Cost is the token usage of each agent at its model's price, and the usage block comes back with every response. Cheap fast models (gpt-5.4-mini, claude-haiku-5-5, gemini-2.5-flash) handle extraction and routine checks, and a stronger model is used only where the writing or reasoning matters. The Swarms Cloud telemetry on this page shows the kind of per-swarm spend view you get.",
    link: { label: "Model pricing", href: "/pricing" },
  },
]

export const telemetryName = "claim-decision-vote · MajorityVoting"
