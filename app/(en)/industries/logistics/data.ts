import { AlertTriangle, BarChart3, FileCheck, Inbox, Route, Truck } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Logistics",
  description:
    "Shipment exception handling, rerouting, carrier communication, customs documentation and route planning review, run as agent teams on the Swarms API.",
  bullets: [
    "Planner agents decompose each exception into tasks that workers pull in parallel",
    "Customs declarations, HS codes and carrier messages drafted in your document formats",
    "Per-run token usage and latency in Swarms Cloud, so the cost of an exception is known",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "planners",
    label: "Planners",
    nodes: [
      { id: "route-planner", label: "Route Planner", model: "gpt-5.4", says: "3 tasks queued: reroute, carrier notice, ETA update" },
      { id: "customs-planner", label: "Customs Planner", model: "claude-sonnet-5-5", says: "2 tasks queued: HS code check, broker message" },
    ],
  },
  {
    id: "workers",
    label: "Workers",
    nodes: [
      { id: "reroute", label: "Reroute Worker", model: "gpt-5.4-mini", says: "ROT via FRA, arrives 14h later than plan" },
      { id: "docs", label: "Documents Worker", model: "claude-haiku-5-5", says: "HS 8471.30 confirmed, invoice line 4 corrected" },
      { id: "notify", label: "Notify Worker", model: "gemini-2.5-flash", says: "customer and broker messages drafted" },
    ],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Exception desk",
    description:
      "Holds, delays and missed connections arrive from carrier feeds and tracking events. Planner agents split each exception into tasks, workers pull them from the queue and draft the reroute, the messages and the document fixes. The ops desk approves before anything is sent.",
    swarmType: "PlannerWorkerSwarm",
    agents: ["Route Planner", "Customs Planner", "Reroute Worker", "Documents Worker", "Notify Worker"],
    icon: AlertTriangle,
  },
  {
    title: "Customs document pack",
    description:
      "An invoice reader pulls parties, Incoterms, values and line items, an HS code agent classifies each line and flags uncertain ones, and a declaration writer fills the entry in the broker's format with the open questions listed on top.",
    swarmType: "SequentialWorkflow",
    agents: ["Invoice Reader", "HS Code Agent", "Declaration Writer"],
    icon: FileCheck,
  },
  {
    title: "Route plan review",
    description:
      "Cost, transit time and risk agents each review a proposed routing for a lane on the same data, and their three views are returned together so the planner sees the trade-offs side by side rather than a single blended score.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Cost Agent", "Transit Time Agent", "Risk Agent"],
    icon: Route,
  },
  {
    title: "Carrier tender comparison",
    description:
      "Rate, service and capacity agents read each carrier's response to a tender, and an aggregator writes the comparison table with the exceptions in each quote (fuel surcharge basis, accessorials, transit guarantees) called out.",
    swarmType: "MixtureOfAgents",
    agents: ["Rate Agent", "Service Agent", "Capacity Agent", "Tender Aggregator"],
    icon: Truck,
  },
  {
    title: "Inbound message triage",
    description:
      "Booking requests, tracking questions, damage claims and invoice disputes arrive in one inbox. A router reads each message and sends it to the specialist for that type, which drafts the reply and the system update for a coordinator to confirm.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Booking Agent", "Tracking Agent", "Claims Agent"],
    icon: Inbox,
  },
  {
    title: "Weekly network report",
    description:
      "A director agent assigns lane performance, carrier scorecards and cost variance to worker agents, then integrates their sections into the weekly operations report with the lanes that missed their service target listed first.",
    swarmType: "HierarchicalSwarm",
    agents: ["Ops Director", "Lane Agent", "Carrier Agent", "Report Writer"],
    icon: BarChart3,
  },
]

const exceptionDeskPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A PlannerWorkerSwarm: planners read the exceptions and fill a task queue,
# workers pull tasks from the queue and return their drafts. The ops desk
# approves every message and booking change before it leaves the system.
EXCEPTIONS = """
1. AWB 176-44821093, 12 pallets of server components, SIN -> AMS via DXB.
   Missed connection at DXB; next direct flight is in 31 hours.
   Consignee has a production line start on Thursday.
2. Container MSKU7781204, 40ft, Shanghai -> Rotterdam. Customs hold at
   Rotterdam: HS code on the invoice (8471.49) does not match the packing
   list description (storage units). Broker needs a corrected invoice.
3. Truck load TL-88213, Lyon -> Munich. Driver reports A8 closed by snow
   near Ulm; delivery window at the DC is 06:00 to 08:00 tomorrow.
"""

response = client.swarms.run(
    name="Exception Desk",
    description="Planners decompose shipment exceptions, workers draft the fixes.",
    swarm_type="PlannerWorkerSwarm",
    task=(
        "Work the three exceptions below. For each one produce the reroute or "
        "schedule option, the customer and partner messages, and any document "
        "corrections. Mark every item as DRAFT for ops approval.\\n" + EXCEPTIONS
    ),
    agents=[
        {
            "agent_name": "Route Planner",
            "description": "Breaks transport exceptions into tasks for the workers.",
            "system_prompt": (
                "You are a senior freight planner. For each transport exception, list "
                "the tasks needed: alternative routings to evaluate, parties to notify, "
                "milestones to update. Be specific about airports, ports and cut-offs."
            ),
            "model_name": "gpt-5.4",  # the planner decides the work, so a stronger model
            "max_loops": 1,
            "role": "planner",
        },
        {
            "agent_name": "Customs Planner",
            "description": "Breaks customs and documentation exceptions into tasks.",
            "system_prompt": (
                "You are a customs compliance lead. For each documentation or customs "
                "exception, list the checks, corrections and broker communications "
                "needed, and the regulation or tariff heading each one depends on."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
            "role": "planner",
        },
        {
            "agent_name": "Reroute Worker",
            "system_prompt": "You evaluate alternative routings: give two options with transit time, added cost drivers and the new ETA for each. Prefer options that keep the consignee's deadline.",
            "model_name": "gpt-5.4-mini",  # many short tasks, fast model
            "max_loops": 1,
            "role": "worker",
        },
        {
            "agent_name": "Documents Worker",
            "system_prompt": "You check HS classifications and correct commercial documents. State the tariff heading you chose and why, and list the exact invoice lines to change.",
            "model_name": "claude-haiku-5-5",
            "max_loops": 1,
            "role": "worker",
        },
        {
            "agent_name": "Notify Worker",
            "system_prompt": "You draft messages to customers, brokers and carriers: short, factual, with the reference numbers and the next update time. Never promise a delivery time that is not in a worker's reroute option.",
            "model_name": "gemini-2.5-flash",
            "max_loops": 1,
            "role": "worker",
        },
    ],
    max_loops=1,
)

print(response)`

const exceptionDeskCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Exception Desk",
    "description": "Planners decompose shipment exceptions, workers draft the fixes.",
    "swarm_type": "PlannerWorkerSwarm",
    "task": "Work these exceptions and mark every item DRAFT for ops approval. 1) AWB 176-44821093, 12 pallets SIN to AMS via DXB, missed connection at DXB, next direct flight in 31 hours, consignee line start Thursday. 2) Container MSKU7781204 Shanghai to Rotterdam, customs hold: invoice HS 8471.49 does not match packing list description, broker needs a corrected invoice. 3) Truck TL-88213 Lyon to Munich, A8 closed by snow near Ulm, DC delivery window 06:00 to 08:00 tomorrow.",
    "agents": [
      {
        "agent_name": "Route Planner",
        "system_prompt": "You are a senior freight planner. For each transport exception list the tasks: routings to evaluate, parties to notify, milestones to update.",
        "model_name": "gpt-5.4",
        "max_loops": 1,
        "role": "planner"
      },
      {
        "agent_name": "Customs Planner",
        "system_prompt": "You are a customs compliance lead. For each documentation exception list the checks, corrections and broker communications needed.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1,
        "role": "planner"
      },
      {
        "agent_name": "Reroute Worker",
        "system_prompt": "Evaluate alternative routings: two options each with transit time, cost drivers and new ETA.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1,
        "role": "worker"
      },
      {
        "agent_name": "Documents Worker",
        "system_prompt": "Check HS classifications and correct commercial documents. State the heading chosen and the invoice lines to change.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1,
        "role": "worker"
      },
      {
        "agent_name": "Notify Worker",
        "system_prompt": "Draft short factual messages to customers, brokers and carriers with reference numbers and the next update time.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1,
        "role": "worker"
      }
    ],
    "max_loops": 1
  }'`

const customsPackTs = `// Customs document pack as a SequentialWorkflow: read the invoice, classify
// each line, write the declaration in the broker's format. A broker reviews
// and files it; the swarm never submits anything to a customs authority.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type InvoiceLine = { description: string; qty: number; unitValueUsd: number; origin: string }
type Shipment = { reference: string; shipper: string; consignee: string; incoterm: string; lines: InvoiceLine[] }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

export async function buildCustomsPack(s: Shipment): Promise<SwarmResponse> {
  const lines = s.lines.map((l, i) => \`\${i + 1}. \${l.description}, qty \${l.qty}, $\${l.unitValueUsd} each, origin \${l.origin}\`).join("\\n")

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: \`Customs Pack \${s.reference}\`,
      swarm_type: "SequentialWorkflow",
      task:
        \`Shipment \${s.reference}. Shipper \${s.shipper}, consignee \${s.consignee}, \${s.incoterm}. \` +
        \`Invoice lines:\\n\${lines}\\n\\nProduce the entry data for the import declaration and list every line where the classification is uncertain.\`,
      agents: [
        {
          agent_name: "Invoice Reader",
          system_prompt: "You extract parties, Incoterm, currency, total value and each line item from a commercial invoice into structured fields. Flag missing fields.",
          model_name: "claude-haiku-5-5", // extraction, fast and cheap
          max_loops: 1,
        },
        {
          agent_name: "HS Code Agent",
          system_prompt: "You classify each line to a 6-digit HS heading, state the General Rule of Interpretation you applied, and mark any line where two headings are plausible as UNCERTAIN with both candidates.",
          model_name: "gpt-5.4", // classification mistakes are expensive, stronger model
          max_loops: 1,
        },
        {
          agent_name: "Declaration Writer",
          system_prompt: "You fill the import entry fields (parties, Incoterm, value per line, HS per line, origin per line) as JSON and write a short cover note for the broker listing the UNCERTAIN lines first. Mark the output DRAFT.",
          model_name: "claude-sonnet-5-5",
          max_loops: 1,
        },
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)
  return (await res.json()) as SwarmResponse
}

buildCustomsPack({
  reference: "MSKU7781204",
  shipper: "Hualian Storage Technology Co.",
  consignee: "Nordwind Data Centers BV",
  incoterm: "FOB Shanghai",
  lines: [
    { description: "Solid-state storage units, 7.68 TB, for servers", qty: 240, unitValueUsd: 410, origin: "CN" },
    { description: "Rack rail kits, steel", qty: 60, unitValueUsd: 38, origin: "CN" },
    { description: "Power cables C13 to C14, 2 m", qty: 480, unitValueUsd: 3.2, origin: "VN" },
  ],
}).then((r) => {
  console.log(r.output)
  console.log("tokens:", r.usage.total_tokens)
})`

const nightlyCreditsPython = `import json
import os
import sys
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# The nightly route plan review runs one ConcurrentWorkflow per active lane.
# Before submitting, the job checks the account's credit balance in Swarms
# Cloud and refuses to start if the run would leave the desk without credits
# for the daytime exception work.
MIN_BALANCE_AFTER_RUN = 25.0
EST_COST_PER_LANE = 0.06  # from last week's usage in Swarms Cloud logs

lanes = [
    {"lane": "SHA-RTM", "mode": "ocean", "plan": "40ft via Singapore, 34 days, carrier A"},
    {"lane": "SIN-AMS", "mode": "air", "plan": "direct, 2 flights per week, carrier B"},
    {"lane": "LYS-MUC", "mode": "road", "plan": "single driver, A8 via Stuttgart, 11 hours"},
    {"lane": "LAX-ORD", "mode": "rail", "plan": "intermodal, 5 days door to door"},
]

credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()
print("credit balance:", json.dumps(credits, indent=2))

estimated = EST_COST_PER_LANE * len(lanes)
balance = float(next((v for v in credits.values() if isinstance(v, (int, float))), 0.0))
if balance - estimated < MIN_BALANCE_AFTER_RUN:
    print(f"skip: {len(lanes)} lanes at ~\${estimated:.2f} would leave \${balance - estimated:.2f}")
    sys.exit(0)

REVIEWERS = [
    {"agent_name": "Cost Agent", "system_prompt": "Review the lane plan for cost: rate basis, surcharges, accessorials, and where a different mode or carrier would be cheaper.", "model_name": "gpt-5.4-mini", "max_loops": 1},
    {"agent_name": "Transit Time Agent", "system_prompt": "Review the plan for transit time and schedule reliability, and name the connection most likely to slip.", "model_name": "claude-haiku-5-5", "max_loops": 1},
    {"agent_name": "Risk Agent", "system_prompt": "Review the plan for weather, congestion, customs and single-point-of-failure risk, with a mitigation for each.", "model_name": "gemini-2.5-flash", "max_loops": 1},
]

batch = [
    {
        "name": f"Lane Review {lane['lane']}",
        "swarm_type": "ConcurrentWorkflow",
        "task": f"Lane {lane['lane']} ({lane['mode']}). Current plan: {lane['plan']}. Review it.",
        "agents": REVIEWERS,
        "max_loops": 1,
    }
    for lane in lanes
]

res = requests.post(f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, data=json.dumps(batch), timeout=600)
res.raise_for_status()
for lane, result in zip(lanes, res.json()):
    print("=" * 72)
    print(lane["lane"], "·", result["usage"]["total_tokens"], "tokens")
    print(result["output"])

summary = requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json()
print("account summary after run:", summary)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "exception_desk.py",
    code: exceptionDeskPython,
    note: "The Python SDK (pip install swarms-client) runs the exception desk as a PlannerWorkerSwarm. Two planners on stronger models turn three exceptions into a task queue; three workers on fast models pull the tasks and return reroute options, document fixes and message drafts marked for ops approval.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "exception_desk.sh",
    code: exceptionDeskCurl,
    note: "The same desk as a raw HTTP call, with each agent's role field set to planner or worker. The response holds the output and the usage block billing is computed from, and the run appears in Swarms Cloud under the swarm name.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "buildCustomsPack.ts",
    code: customsPackTs,
    note: "A customs document pack as a SequentialWorkflow from a Node or edge runtime: invoice extraction on a cheap model, HS classification on a stronger one because misclassification is expensive, and a declaration writer that marks uncertain lines for the broker. Nothing is filed with a customs authority.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Credits",
    file: "nightly_lane_review.py",
    code: nightlyCreditsPython,
    note: "A nightly batch that checks the Swarms Cloud credit balance first, skips the run if it would leave the desk short for daytime exception work, then submits one ConcurrentWorkflow per lane to /v1/swarm/batch/completions and prints the account summary afterwards.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Why a PlannerWorkerSwarm for exceptions rather than a fixed pipeline?",
    a: "Exceptions do not arrive in a fixed shape. A missed air connection needs reroute options and two messages; a customs hold needs a tariff check, a corrected invoice and a broker note. Planners decide the task list per exception, workers pull whatever is on the queue, and the same request handles one exception or thirty without changing the agent roster.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Do the agents rebook freight or send messages to carriers?",
    a: "Not by themselves. Every worker output in the examples is a draft marked for ops approval. Booking changes, customs filings and customer messages go out through the systems and people that send them today. If you want an agent to take an action, you give it a tool with its own limits, and that is a separate decision from the drafting.",
  },
  {
    q: "How does the swarm get carrier events, tracking data and documents?",
    a: "You put them in the task. The examples paste the exception text, invoice lines and lane plans into the request; a production integration reads them from your TMS, carrier EDI or tracking feeds and builds the task string. Agents can also call tools you expose, such as a schedule lookup, under limits you set.",
  },
  {
    q: "Can we see what each exception cost to work?",
    a: "Yes. Each response carries a usage block with input, output and total tokens, and every run is stored in Swarms Cloud with the same data plus latency. Naming runs after the shipment reference, as the examples do, lets you allocate agent spend to a shipment, a lane or a customer.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "Which models should planners and workers use?",
    a: "Planners decide what work gets done, so they run on stronger models such as gpt-5.4 or claude-sonnet-5-5. Workers handle many short, well-specified tasks, so fast models such as gpt-5.4-mini, claude-haiku-5-5 and gemini-2.5-flash keep the cost per exception low. The one exception in the examples is HS classification, where a mistake costs more than the tokens, so it runs on a stronger model.",
  },
]

export const telemetryName = "exception-desk · PlannerWorkerSwarm"
