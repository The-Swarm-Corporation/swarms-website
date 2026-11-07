import { Boxes, ClipboardList, Cog, Gauge, Route, Wrench } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Manufacturing",
  description:
    "Quality ticket triage, maintenance work orders, supplier risk review, root cause analysis and shift reporting, run as agent teams on the Swarms API.",
  bullets: [
    "One router, three specialists: quality, maintenance and supply, each on its own model",
    "Defect dispositions, work orders and supplier notes drafted for an engineer to approve",
    "Every ticket's route, output, token usage and cost logged in Swarms Cloud",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "router",
    label: "Router",
    nodes: [{ id: "router", label: "Ticket Router", model: "gpt-5.4-mini", says: "paint defect on station 3, sent to quality" }],
  },
  {
    id: "specialists",
    label: "Specialists",
    mode: "pick",
    nodes: [
      { id: "quality", label: "Quality Engineer", model: "claude-sonnet-5-5", says: "orange peel traced to booth humidity, hold 14 units" },
      { id: "maintenance", label: "Maintenance Planner", model: "gpt-5.4", says: "bearing vibration trend, P2 work order drafted" },
      { id: "supply", label: "Supply Analyst", model: "gemini-2.5-flash", says: "fastener lot late 6 days, 2 days of cover left" },
    ],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Shop-floor ticket routing",
    description: "Operators, sensors and ERP alerts all raise tickets in the same queue. A router reads each one and sends it to the quality, maintenance or supply specialist, which returns a drafted disposition, work order or supplier note for the line lead to approve.",
    swarmType: "MultiAgentRouter",
    agents: ["Ticket Router", "Quality Engineer", "Maintenance Planner", "Supply Analyst"],
    icon: Route,
  },
  {
    title: "Defect triage and 8D drafting",
    description: "A defect reader normalises the inspection record and photos' captions, a root cause analyst works through the fishbone against process data, and a writer fills the 8D template for the quality manager to review and sign.",
    swarmType: "SequentialWorkflow",
    agents: ["Defect Reader", "Root Cause Analyst", "8D Writer"],
    icon: ClipboardList,
  },
  {
    title: "Predictive maintenance review",
    description: "Vibration, thermal and maintenance history agents each read the same asset snapshot, and an aggregator writes one recommendation with a priority and a suggested window. The planner decides what goes on the schedule.",
    swarmType: "MixtureOfAgents",
    agents: ["Vibration Agent", "Thermal Agent", "History Agent", "Aggregator"],
    icon: Wrench,
  },
  {
    title: "Supplier risk analysis",
    description: "Delivery, quality and financial agents score a supplier from the same data at once: on-time history, PPM and corrective actions, and public filings. The three reads come back together for the sourcing team's quarterly review.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Delivery Agent", "Quality Agent", "Financial Agent"],
    icon: Boxes,
  },
  {
    title: "Work instruction revision",
    description: "When an engineering change lands, a reader extracts what changed, a procedure writer and a safety checker revise the work instruction in parallel, and an approver agent assembles the redlined draft for the process engineer.",
    swarmType: "AgentRearrange",
    agents: ["Change Reader", "Procedure Writer", "Safety Checker", "Approver"],
    icon: Cog,
  },
  {
    title: "Production planning what-if",
    description: "A planning director splits a what-if question (a rush order, a line down for a week) into capacity, materials and labour sub-questions, three workers answer them, and the director integrates a plan for the plant manager.",
    swarmType: "HierarchicalSwarm",
    agents: ["Planning Director", "Capacity Agent", "Materials Agent", "Labour Agent"],
    icon: Gauge,
  },
]

const ticketRouterPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A MultiAgentRouter: the router reads the ticket and picks one specialist.
# Each specialist runs on the model that suits its work and returns a draft
# for the line lead or engineer to approve.
ticket = (
    "Ticket 4471, Line 2, Station 3 (paint booth), 14:20. Operator reports "
    "orange peel on 14 consecutive door panels, lot DP-2291. Booth humidity "
    "reading 71 percent against a 55 to 65 percent spec. Units moved to the hold rack."
)

response = client.swarms.run(
    name="Line 2 Ticket Desk",
    description="Route shop-floor tickets to the quality, maintenance or supply specialist.",
    swarm_type="MultiAgentRouter",
    task=ticket,
    agents=[
        {
            "agent_name": "Quality Engineer",
            "description": "Defects, nonconformances, holds and dispositions.",
            "system_prompt": (
                "You are a quality engineer on an automotive paint and assembly line. "
                "For a defect ticket, state the likely cause from the evidence given, "
                "the containment (what to hold, what to inspect), and a draft disposition "
                "(use as is, rework, scrap) marked FOR QUALITY MANAGER APPROVAL."
            ),
            "model_name": "claude-sonnet-5-5",  # careful reasoning on dispositions
            "max_loops": 1,
        },
        {
            "agent_name": "Maintenance Planner",
            "description": "Equipment faults, sensor flags and work orders.",
            "system_prompt": (
                "You are a maintenance planner. For an equipment ticket, draft a work "
                "order: asset, symptom, probable failure mode, parts likely needed, "
                "priority P1 to P3 with the reason, and the shift window you suggest."
            ),
            "model_name": "gpt-5.4",
            "max_loops": 1,
        },
        {
            "agent_name": "Supply Analyst",
            "description": "Late lots, shortages and supplier notices.",
            "system_prompt": (
                "You are a supply chain analyst. For a material ticket, state days of "
                "cover from the inventory figures given, the options (expedite, "
                "alternate supplier, reschedule) and draft the note to the supplier."
            ),
            "model_name": "gemini-2.5-flash",  # fast, cheap for volume tickets
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const ticketRouterCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Line 2 Ticket Desk",
    "description": "Route shop-floor tickets to the quality, maintenance or supply specialist.",
    "swarm_type": "MultiAgentRouter",
    "task": "Ticket 4472, Line 2, Station 1 (stamping press P-2), 15:05. Vibration sensor on the main drive bearing reads 7.1 mm/s RMS, up from 4.2 mm/s last week. Alarm threshold is 7.5 mm/s. Press is running. 2,400 panels left on the shift order.",
    "agents": [
      {
        "agent_name": "Quality Engineer",
        "system_prompt": "You are a quality engineer. For a defect ticket, state likely cause, containment and a draft disposition marked FOR QUALITY MANAGER APPROVAL.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Maintenance Planner",
        "system_prompt": "You are a maintenance planner. For an equipment ticket, draft a work order with asset, symptom, probable failure mode, parts, priority P1 to P3 with reason, and a suggested shift window.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Supply Analyst",
        "system_prompt": "You are a supply chain analyst. For a material ticket, state days of cover, the options, and draft the supplier note.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# The router sends this ticket to the Maintenance Planner. The response has
# "output" (the drafted work order) and "usage" (input_tokens, output_tokens,
# total_tokens), and the run appears in Swarms Cloud with the route it took.`

const supplierRiskTs = `// Supplier risk review as a ConcurrentWorkflow: three agents score the same
// supplier from different evidence at the same time, and the sourcing team
// gets all three reads in one response.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Supplier = {
  name: string
  part: string
  onTimePct12m: number
  ppm12m: number
  openScars: number
  notes: string
}

const scorer = (name: string, model: string, lens: string) => ({
  agent_name: name,
  system_prompt:
    "You assess suppliers for a tier-one automotive plant. Your lens: " + lens + " " +
    "Give a risk rating LOW, MEDIUM or HIGH on the first line, then the evidence you used " +
    "and the one question the sourcing team should ask this supplier.",
  model_name: model,
  max_loops: 1,
})

export async function reviewSupplier(s: Supplier) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Supplier Risk Review",
      description: "Delivery, quality and financial reads on one supplier, in parallel.",
      swarm_type: "ConcurrentWorkflow",
      task:
        "Supplier: " + s.name + ", part family: " + s.part + ".\\n" +
        "On-time delivery, trailing 12 months: " + s.onTimePct12m + " percent.\\n" +
        "Defects, trailing 12 months: " + s.ppm12m + " PPM. Open SCARs: " + s.openScars + ".\\n" +
        "Notes: " + s.notes,
      agents: [
        scorer("Delivery Agent", "gpt-4.1-mini", "on-time history, lead time changes and expedite frequency."),
        scorer("Quality Agent", "claude-haiku-5-5", "PPM trend, open corrective actions and repeat failure modes."),
        scorer("Financial Agent", "gpt-5.4", "signs of financial stress in the notes and any public information you were given."),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  const data = await res.json()
  return { review: data.output as string, usage: data.usage }
}

reviewSupplier({
  name: "Northfield Fasteners",
  part: "M8 and M10 flange bolts",
  onTimePct12m: 91.4,
  ppm12m: 380,
  openScars: 2,
  notes: "Two late lots in the last quarter, both attributed to a plating subcontractor change. Payment terms extended from 30 to 60 days at their request in August.",
}).then((r) => {
  console.log(r.review)
  console.log(r.usage)
})`

const nightlyCreditsPython = `import os
import sys

import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# The nightly job reviews every asset flagged by the condition monitoring
# system. Before it starts, check the Swarms Cloud credit balance and the
# day's usage so a plant does not find out about an empty account at 03:00.
credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()
metrics = requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json()

print("credit balance:", credits)
print("usage summary:", metrics)

MIN_CREDITS = float(os.environ.get("MIN_CREDITS", "25"))


def balance_of(doc) -> float:
    """Find the first numeric credit figure in the response, whatever the nesting."""
    if isinstance(doc, dict):
        for key in ("credits", "credit", "balance", "remaining_credits"):
            if isinstance(doc.get(key), (int, float)):
                return float(doc[key])
        for value in doc.values():
            found = balance_of(value)
            if found is not None:
                return found
    return None


balance = balance_of(credits)
if balance is not None and balance < MIN_CREDITS:
    print(f"balance {balance:.2f} below {MIN_CREDITS:.2f}, skipping the nightly review")
    sys.exit(1)

with open("flagged_assets_tonight.txt", encoding="utf-8") as f:
    flagged = f.read()

review = {
    "name": "Nightly Maintenance Review",
    "description": "Vibration, thermal and history reads on each flagged asset, aggregated.",
    "swarm_type": "MixtureOfAgents",
    "task": "Review each flagged asset below and recommend a priority and window for the planner.\\n\\n" + flagged,
    "agents": [
        {"agent_name": "Vibration Agent", "system_prompt": "You read vibration trends (RMS, peak, spectrum notes) and name the probable failure mode.", "model_name": "gpt-4.1-mini", "max_loops": 1},
        {"agent_name": "Thermal Agent", "system_prompt": "You read bearing and motor temperatures against ambient and rating and flag abnormal rise.", "model_name": "claude-haiku-5-5", "max_loops": 1},
        {"agent_name": "History Agent", "system_prompt": "You read the maintenance history and note repeat failures and overdue PMs.", "model_name": "gemini-2.5-flash", "max_loops": 1},
        {"agent_name": "Aggregator", "system_prompt": "You are the reliability engineer. Combine the three reads into one recommendation per asset: priority P1 to P3, suggested window, parts. Mark it FOR PLANNER REVIEW.", "model_name": "gpt-5.4", "max_loops": 1},
    ],
    "max_loops": 1,
}

resp = requests.post(f"{BASE}/v1/swarm/completions", headers=HEADERS, json=review, timeout=600)
resp.raise_for_status()
data = resp.json()
print(data["output"])
print(data["usage"])`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "ticket_desk.py",
    code: ticketRouterPython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the ticket desk as a MultiAgentRouter. The router reads the paint defect ticket, picks the Quality Engineer, and the response carries that agent's draft disposition with its token usage.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "ticket_desk.sh",
    code: ticketRouterCurl,
    note: "The same desk as a raw HTTP call with a different ticket: a vibration flag on a stamping press. The router sends it to the Maintenance Planner, and the drafted work order comes back in the output with the usage block.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "reviewSupplier.ts",
    code: supplierRiskTs,
    note: "Supplier risk as a ConcurrentWorkflow from a Node or edge runtime. Delivery, quality and financial agents read the same supplier record at the same time on different models, and the sourcing team gets three independent ratings in one response.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Credits",
    file: "nightly_review.py",
    code: nightlyCreditsPython,
    note: "A nightly job that checks the Swarms Cloud credit balance and usage summary before running the maintenance review as a MixtureOfAgents. If the balance is below the threshold the job exits so the planner sees an alert in the morning rather than a half-finished run.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Which Swarms API swarm type fits a shop-floor ticket queue?",
    a: "MultiAgentRouter when each ticket should go to exactly one specialist and you want the route recorded. MixtureOfAgents when several specialists should read the same asset and one aggregator should combine them. ConcurrentWorkflow when you want the independent reads without an aggregator. All of them take the same agents list, so switching is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "How do agents get data from the MES, CMMS or historian?",
    a: "The Swarms API takes text in the task field, so the common pattern is a small job that pulls the ticket, the sensor window or the work order history from your systems and puts it in the task. Agents can also call tools you provide, which is how a plant connects a historian query or a CMMS lookup without exporting everything up front.",
  },
  {
    q: "Do the agents release holds, close work orders or change the schedule?",
    a: "No. The examples on this page return drafts: a disposition marked for quality manager approval, a work order with a suggested priority and window, a supplier note. A person approves each one in the system of record, and the run log shows what the agent saw and wrote.",
  },
  {
    q: "Can we run the same review across every line or plant?",
    a: "Yes. The batch endpoints accept a list of requests and return the results together, so one nightly job can review every flagged asset or every open ticket. Each request is logged separately in Swarms Cloud with its inputs, outputs, token usage and cost, so each plant sees its own entries.",
  },
  {
    q: "What does a ticket cost to process?",
    a: "Each response carries a usage block with input, output and total tokens, and Swarms Cloud shows the cost per run. Routing on a small model such as gpt-5.4-mini and sending volume tickets to gemini-2.5-flash or claude-haiku-5-5 keeps the price per ticket low, with a stronger model reserved for the dispositions and work orders a person signs. Per-model prices are on the pricing page.",
    link: { label: "Model pricing", href: "/pricing" },
  },
]

export const telemetryName = "line-2-ticket-desk · MultiAgentRouter"
