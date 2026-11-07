import { Building2, FileText, Home, Inbox, Scale, Search } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Real Estate",
  description:
    "Lease abstraction, acquisition due diligence, listing generation, rent roll review and portfolio reporting, run as agent teams on the Swarms API.",
  bullets: [
    "Lease reader, term extractor, critical-dates and abstract-writer agents in one pipeline",
    "Structured abstracts in the shape you define, ready for the asset management system",
    "Token usage and cost per lease, per property and per deal in Swarms Cloud",
  ],
}

// SequentialWorkflow: each agent hands its output to the next.
export const flowStages: FlowStage[] = [
  {
    id: "read",
    label: "Read",
    nodes: [{ id: "reader", label: "Lease Reader", model: "gemini-2.5-flash", says: "84 pages read, three amendments found and ordered" }],
  },
  {
    id: "extract",
    label: "Extract",
    nodes: [{ id: "extractor", label: "Term Extractor", model: "gpt-4.1-mini", says: "premises, term, base rent, steps, options, CAM pulled with page cites" }],
  },
  {
    id: "dates",
    label: "Dates",
    nodes: [{ id: "dates", label: "Critical Dates", model: "claude-haiku-5-5", says: "notice windows computed, renewal notice due 2027-03-31" }],
  },
  {
    id: "write",
    label: "Write",
    nodes: [{ id: "writer", label: "Abstract Writer", model: "claude-sonnet-5-5", says: "abstract assembled, two clauses marked for counsel" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Lease abstraction",
    description: "A reader orders the lease and its amendments, an extractor pulls the terms with page citations, a dates agent computes notice windows, and a writer assembles the abstract in your schema. Counsel reviews the flagged clauses.",
    swarmType: "SequentialWorkflow",
    agents: ["Lease Reader", "Term Extractor", "Critical Dates", "Abstract Writer"],
    icon: FileText,
  },
  {
    title: "Acquisition due diligence",
    description: "A director splits the data room into workstreams, title, environmental, financials and physical, and worker agents read their folders and draft findings. The director integrates them into a diligence memo for the deal team.",
    swarmType: "HierarchicalSwarm",
    agents: ["Deal Director", "Title Agent", "Environmental Agent", "Financials Agent", "Physical Agent"],
    icon: Search,
  },
  {
    title: "Listing generation",
    description: "From one fact sheet, agents write the long description, the highlights list and the portal snippets at the same time, each within the fair housing language rules you send as rules.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Description Writer", "Highlights Writer", "Portal Snippets Writer"],
    icon: Home,
  },
  {
    title: "Comparable sales and rent analysis",
    description: "Sales comps, rent comps and market context are each prepared by a specialist on the same subject property, and an aggregator writes the valuation support note with the adjustments it made.",
    swarmType: "MixtureOfAgents",
    agents: ["Sales Comps Agent", "Rent Comps Agent", "Market Agent", "Aggregator"],
    icon: Scale,
  },
  {
    title: "Tenant request routing",
    description: "Tenant emails go to one specialist each: maintenance, leasing, billing or legal notices. The router returns the draft reply or the work order summary and the reason for the route.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Maintenance Agent", "Leasing Agent", "Billing Agent", "Notices Agent"],
    icon: Inbox,
  },
  {
    title: "Investment committee pre-read",
    description: "One agent argues the case for the acquisition, another argues against it on the same underwriting, and a judge writes the pre-read with the points the committee should press on.",
    swarmType: "DebateWithJudge",
    agents: ["Bull Case", "Bear Case", "Judge"],
    icon: Building2,
  },
]

const leaseAbstractionPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# The lease and its amendments as text, already OCR'd by your document system.
lease_text = open("leases/riverside-plaza-suite-410.txt").read()

# The abstract schema the Abstract Writer must fill. This is your own shape,
# sent in the prompt, so the output drops straight into the asset system.
ABSTRACT_FIELDS = (
    "tenant, premises, rentable_sf, commencement, expiration, base_rent (list of "
    "{from, to, annual_psf}), renewal_options (list of {term_months, notice_by, "
    "rent_basis}), termination_option, security_deposit, cam_structure, "
    "exclusive_use, assignment_rights, critical_dates (list of {date, event}), "
    "flags_for_counsel (list of {clause, page, reason})"
)

response = client.swarms.run(
    name="Lease Abstraction",
    description="Lease to a structured abstract with page citations and counsel flags.",
    swarm_type="SequentialWorkflow",
    task=f"Abstract this lease into the fields {ABSTRACT_FIELDS}.\\n\\n{lease_text}",
    rules=(
        "Quote the page for every extracted term. Never infer a date that is not "
        "stated or computable from stated terms. Where the lease and an amendment "
        "conflict, the later document wins and the conflict is flagged."
    ),
    agents=[
        {
            "agent_name": "Lease Reader",
            "system_prompt": (
                "You read commercial leases. Identify the base lease and every amendment, "
                "order them by date, and produce a clause map: section, title, page range."
            ),
            "model_name": "gemini-2.5-flash",  # long context, cheap for a first pass
            "max_loops": 1,
        },
        {
            "agent_name": "Term Extractor",
            "system_prompt": (
                "Using the clause map, extract premises, term, base rent schedule, options, "
                "deposit, CAM, exclusive use and assignment terms. Cite a page for each."
            ),
            "model_name": "gpt-4.1-mini",
            "max_loops": 1,
        },
        {
            "agent_name": "Critical Dates",
            "system_prompt": (
                "Compute every critical date from the extracted terms: rent steps, option "
                "notice windows, expiration, termination windows. Show the arithmetic."
            ),
            "model_name": "claude-haiku-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Abstract Writer",
            "system_prompt": (
                "Assemble the final abstract as JSON with exactly the requested fields. Put "
                "any ambiguous or unusual clause in flags_for_counsel with its page."
            ),
            "model_name": "claude-sonnet-5-5",  # the document a person will read
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const leaseAbstractionCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Lease Abstraction",
    "description": "Lease to a structured abstract with page citations and counsel flags.",
    "swarm_type": "SequentialWorkflow",
    "task": "Abstract the attached lease into: tenant, premises, rentable_sf, commencement, expiration, base_rent schedule, renewal_options, termination_option, security_deposit, cam_structure, exclusive_use, assignment_rights, critical_dates, flags_for_counsel. LEASE TEXT: ...",
    "rules": "Quote the page for every extracted term. Never infer a date that is not stated or computable. Where the lease and an amendment conflict, the later document wins and the conflict is flagged.",
    "agents": [
      {
        "agent_name": "Lease Reader",
        "system_prompt": "Identify the base lease and every amendment, order them by date, and produce a clause map with page ranges.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      },
      {
        "agent_name": "Term Extractor",
        "system_prompt": "Extract premises, term, base rent schedule, options, deposit, CAM, exclusive use and assignment terms. Cite a page for each.",
        "model_name": "gpt-4.1-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Critical Dates",
        "system_prompt": "Compute rent steps, option notice windows, expiration and termination windows from the extracted terms. Show the arithmetic.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Abstract Writer",
        "system_prompt": "Assemble the abstract as JSON with exactly the requested fields. Put ambiguous or unusual clauses in flags_for_counsel with their page.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# The response carries "output" (the abstract) and "usage" with
# input_tokens, output_tokens and total_tokens for the run.`

const dueDiligenceTs = `// Acquisition due diligence as a hierarchical swarm: the director splits the
// data room into workstreams, the workers draft findings, the director
// integrates them. The memo is a draft for the deal team and counsel.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type DataRoom = { property: string; folders: Record<string, string[]> }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const worker = (name: string, folder: string, focus: string, model: string) => ({
  agent_name: name,
  description: "Reads the " + folder + " folder of the data room.",
  system_prompt:
    "You are a due diligence analyst. Read the documents listed for the " + folder + " folder " +
    "and draft findings on: " + focus + " For each finding give the document, the page and " +
    "whether it is a closing condition, a price adjustment or a note. Mark anything that " +
    "needs outside counsel or a consultant.",
  model_name: model,
  max_loops: 1,
})

export async function runDiligence(room: DataRoom): Promise<SwarmResponse> {
  const index = Object.entries(room.folders)
    .map(([folder, docs]) => folder + ":\\n  " + docs.join("\\n  "))
    .join("\\n")

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Acquisition Diligence " + room.property,
      description: "Director-led diligence across four workstreams.",
      swarm_type: "HierarchicalSwarm",
      task:
        "Run due diligence on " + room.property + ". Data room index:\\n" + index +
        "\\nReturn a diligence memo with findings by workstream, open items and a closing checklist.",
      rules: "Cite the document and page for every finding. Do not estimate values that are not in the documents.",
      agents: [
        worker("Title Agent", "title", "vesting, easements, encroachments, exceptions on the commitment, survey conflicts.", "gpt-4.1-mini"),
        worker("Environmental Agent", "environmental", "Phase I findings, RECs, tank records, remediation history, next steps.", "claude-haiku-5-5"),
        worker("Financials Agent", "financials", "rent roll vs leases, trailing twelve, recoveries, arrears, capital spend.", "gpt-5.4"),
        worker("Physical Agent", "physical", "roof and structure, mechanical age, deferred maintenance, ADA, code items.", "gemini-2.5-flash"),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  return (await res.json()) as SwarmResponse
}

runDiligence({
  property: "Riverside Plaza, 212 Market St",
  folders: {
    title: ["commitment-2026-02.pdf", "alta-survey-2025.pdf", "recorded-easements.pdf"],
    environmental: ["phase-i-2026-01.pdf", "ust-closure-1998.pdf"],
    financials: ["rent-roll-2026-03.xlsx", "t12-2026-02.xlsx", "cam-recon-2025.pdf"],
    physical: ["pca-2026-01.pdf", "roof-warranty.pdf", "elevator-inspection-2025.pdf"],
  },
}).then((r) => {
  console.log(r.output)
  console.log("tokens:", r.usage.total_tokens)
})`

const portfolioAuditPython = `import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"]}

# After a portfolio abstraction run, pull the request history from Swarms
# Cloud and reconcile it: every lease that was submitted should have a
# completed run, and the token usage per property goes to the cost report.
# Request names follow "Lease Abstraction <property> <suite>".
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


submitted = {
    ("Riverside Plaza", "410"), ("Riverside Plaza", "520"), ("Riverside Plaza", "600"),
    ("Harbor Point", "100"), ("Harbor Point", "210"), ("Harbor Point", "300"),
}

seen: set[tuple[str, str]] = set()
tokens_by_property: dict[str, int] = {}

for entry in walk(logs, "data"):
    if not isinstance(entry, dict):
        continue
    name = str(entry.get("name", ""))
    if not name.startswith("Lease Abstraction "):
        continue
    rest = name.removeprefix("Lease Abstraction ")
    prop, _, suite = rest.rpartition(" ")
    seen.add((prop, suite))
    total = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
    tokens_by_property[prop] = tokens_by_property.get(prop, 0) + total

missing = submitted - seen
for prop, suite in sorted(missing):
    print(f"no run found for {prop} suite {suite}: resubmit")

for prop, total in sorted(tokens_by_property.items()):
    print(f"{prop:24s} {total:>10,} tokens")

print("account metrics:", metrics)`

const listingFramework = `from swarms import Agent, ConcurrentWorkflow

# The open-source swarms package runs the listing writers in-process. Three
# writers work from one fact sheet at the same time; the output is a draft
# the leasing team reviews before it goes to the portals.
FACT_SHEET = """
Unit 7B, 1180 Elm Street. 2 bed, 2 bath, 1,140 sf, 7th floor, south-facing.
Renovated 2024: quartz counters, induction range, in-unit washer and dryer.
Building: 2008, elevator, bike room, roof deck, 24-hour entry system.
Rent 3,250 USD per month, 12-month minimum, available 1 June. One cat permitted.
Transit: 6-minute walk to the Elm Street station. Parking space 175 USD per month.
"""

RULES = (
    "Fair housing: describe the property, never the ideal tenant. No references to "
    "families, religion, national origin, disability or any protected class. State "
    "only facts in the sheet. No superlatives."
)

description = Agent(
    agent_name="Description Writer",
    system_prompt="Write a 120 to 160 word listing description from the facts. " + RULES,
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

highlights = Agent(
    agent_name="Highlights Writer",
    system_prompt="Write eight bullet highlights, each under 60 characters, from the facts. " + RULES,
    model_name="gpt-4.1-mini",
    max_loops=1,
)

snippets = Agent(
    agent_name="Portal Snippets Writer",
    system_prompt=(
        "Write a 70-character headline and a 150-character summary for listing portals, "
        "plus a two-line social post. " + RULES
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

workflow = ConcurrentWorkflow(
    name="Listing Writers",
    description="Description, highlights and portal snippets from one fact sheet.",
    agents=[description, highlights, snippets],
    max_loops=1,
)

draft = workflow.run(FACT_SHEET)
print(draft)  # reviewed by the leasing team before publishing`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "lease_abstraction.py",
    code: leaseAbstractionPython,
    note: "The Python SDK (pip install swarms-client) sends one request that abstracts a lease as a SequentialWorkflow. The reader maps the documents on a long-context model, the extractor and dates agents run on small models, and the writer assembles the abstract in the fields you named in the task. Flagged clauses go to counsel.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "lease_abstraction.sh",
    code: leaseAbstractionCurl,
    note: "The same pipeline as a raw HTTP call. The agents run in list order, each receiving the previous output, and the response carries the abstract in output and the usage block that billing is computed from.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "runDiligence.ts",
    code: dueDiligenceTs,
    note: "Acquisition diligence as a HierarchicalSwarm from a Node or edge runtime. The director decomposes the data room into workstreams, each worker drafts findings with document and page citations, and the director integrates them into a memo for the deal team and counsel to review.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Audit",
    file: "reconcile_runs.py",
    code: portfolioAuditPython,
    note: "After a portfolio run, this script pulls the swarm logs from Swarms Cloud, checks that every submitted lease has a run, and totals token usage per property for the cost report. The same logs are what an auditor would use to see what each agent read and wrote.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "listing_writers.py",
    code: listingFramework,
    note: "Listing generation on the open-source swarms package (pip install swarms) for teams that want it inside their own process. Three writers draft from one fact sheet concurrently within the fair housing rules, and the leasing team reviews the draft.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "How accurate is lease abstraction, and who checks it?",
    a: "The pipeline is built so a person can check it quickly: every extracted term carries a page citation, dates show their arithmetic, and anything ambiguous lands in flags_for_counsel. The abstract is a draft for a lease administrator or counsel to review, and the agents never decide a legal question. Teams usually start by running the swarm on leases they have already abstracted by hand and comparing the two.",
  },
  {
    q: "Which swarm type fits which real estate workflow?",
    a: "SequentialWorkflow when each step depends on the last (read, extract, compute dates, write). HierarchicalSwarm when a director should split a job into workstreams and integrate them, as in due diligence. ConcurrentWorkflow when several writers should work from the same facts at once. DebateWithJudge when the committee wants both sides of a deal argued on the same underwriting.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Can we define our own abstract schema?",
    a: "Yes. The fields are yours: name them in the task and tell the Abstract Writer to return exactly those as JSON. The API returns the writer's output as the output field, so the shape of the abstract is whatever you asked for, and it can match your asset management system's import format.",
  },
  {
    q: "What does a portfolio of leases cost to abstract?",
    a: "It depends on lease length and the models you pick. The reader on a cheap long-context model such as gemini-2.5-flash carries most of the input tokens; the extractor and dates agents on small models are cheap; the writer on claude-sonnet-5-5 produces the document a person reads. Each response includes the token usage for the run, and Swarms Cloud totals it per request name, so cost per property is visible after the first few leases.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "Where do the documents go?",
    a: "The lease text goes in the request to the Swarms API, and the run is logged in Swarms Cloud with its inputs and outputs for your account. Teams that cannot send documents to a hosted API can run the same agents in-process with the open-source framework and keep the API for workflows that use public or already-shared documents.",
    link: { label: "Swarms framework", href: "/framework" },
  },
]

export const telemetryName = "lease-abstraction · SequentialWorkflow"
