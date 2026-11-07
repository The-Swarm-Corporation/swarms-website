import { CalendarClock, ClipboardCheck, FileQuestion, FileStack, HardHat, Receipt } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Construction",
  description:
    "Bid review, quantity takeoff, schedule risk, RFI responses, submittal routing and weekly safety reports, run as agent teams on the Swarms API.",
  bullets: [
    "Scope, estimating, scheduling and safety agents read the same documents in parallel",
    "RFIs and submittals routed to the right discipline with a drafted response for the superintendent",
    "Every run logged in Swarms Cloud with the documents it read, its output and its cost",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "reviewers",
    label: "Bid reviewers",
    mode: "parallel",
    nodes: [
      { id: "scope", label: "Scope Checker", model: "claude-haiku-5-5", says: "division 09 finishes missing from the sub's scope letter" },
      { id: "takeoff", label: "Quantity Takeoff", model: "gpt-4.1-mini", says: "CMU quantity on A-301 is 12% over the schedule of values" },
      { id: "cost", label: "Cost Estimator", model: "gpt-5.4", says: "steel unit price 8% above the last three bids on file" },
      { id: "schedule", label: "Schedule Risk", model: "gemini-2.5-pro", says: "envelope duration leaves no float before MEP rough-in" },
      { id: "safety", label: "Safety Reviewer", model: "claude-sonnet-5-5", says: "no fall protection plan for the precast erection phase" },
    ],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Bid package review",
    description: "Five agents read the same drawings, specs and sub quotes at once: one checks scope gaps, one does a quantity sanity check, one compares unit prices with past bids, one tests the schedule, one looks for safety plan gaps. The outputs come back together as one review packet.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Scope Checker", "Quantity Takeoff", "Cost Estimator", "Schedule Risk", "Safety Reviewer"],
    icon: Receipt,
  },
  {
    title: "RFI routing and drafting",
    description: "Each incoming RFI is read by a router that sends it to the structural, MEP, architectural or civil specialist. That agent drafts a response with the sheet and spec references it relied on, and the superintendent reviews before anything goes to the design team.",
    swarmType: "MultiAgentRouter",
    agents: ["RFI Router", "Structural", "MEP", "Architectural", "Civil"],
    icon: FileQuestion,
  },
  {
    title: "Schedule risk review",
    description: "A parser reads the exported P6 or MS Project schedule, a float analyst finds the activities with the least slack and the logic ties that drive them, and a writer turns that into a weekly risk register entry per trade.",
    swarmType: "SequentialWorkflow",
    agents: ["Schedule Parser", "Float Analyst", "Risk Register Writer"],
    icon: CalendarClock,
  },
  {
    title: "Submittal review",
    description: "Intake reads the submittal, then a spec checker and a drawing checker work in parallel on the product data against Division 23 and the coordination drawings. A reviewer agent writes the comments in the house template for the engineer of record to sign.",
    swarmType: "AgentRearrange",
    agents: ["Intake", "Spec Checker", "Drawing Checker", "Reviewer"],
    icon: ClipboardCheck,
  },
  {
    title: "Daily log to safety report",
    description: "Daily logs, toolbox talk notes and incident forms are read by agents that pull out hazards, near misses and open corrective actions, and a writer assembles the weekly safety report with every item linked to the log it came from.",
    swarmType: "SequentialWorkflow",
    agents: ["Log Reader", "Hazard Extractor", "Safety Report Writer"],
    icon: HardHat,
  },
  {
    title: "Change order assessment",
    description: "Scope, cost and schedule agents each assess a proposed change order against the contract documents on the same run, and an aggregator writes the recommendation the project manager takes to the owner's representative.",
    swarmType: "MixtureOfAgents",
    agents: ["Scope Agent", "Cost Agent", "Schedule Agent", "Aggregator"],
    icon: FileStack,
  },
]

const bidReviewPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A concurrent workflow: every reviewer reads the same bid package at the
# same time and the outputs come back together as one review packet.
with open("bid_package_summary.txt", encoding="utf-8") as f:
    bid_package = f.read()

response = client.swarms.run(
    name="Bid Package Review",
    description="Parallel scope, quantity, cost, schedule and safety review of a GC bid.",
    swarm_type="ConcurrentWorkflow",
    task=(
        "Review the attached bid package for the Riverside Clinic, a 3-story, "
        "42,000 sf outpatient building. Report findings by discipline and cite the "
        "sheet number, spec section or quote line every finding comes from.\\n\\n"
        + bid_package
    ),
    agents=[
        {
            "agent_name": "Scope Checker",
            "description": "Scope gaps between the drawings, specs and sub quotes.",
            "system_prompt": (
                "You are a preconstruction manager. Compare the subcontractor scope "
                "letters with the drawing index and spec divisions. List work that is "
                "in the documents but in no one's scope, and work that two subs both claim."
            ),
            "model_name": "claude-haiku-5-5",  # fast reader for long scope letters
            "max_loops": 1,
        },
        {
            "agent_name": "Quantity Takeoff",
            "description": "Sanity check of quantities against the schedule of values.",
            "system_prompt": (
                "You are an estimator. Check the quantities in the schedule of values "
                "against the dimensions and counts on the drawings. Flag any line that "
                "differs by more than 5 percent and show your arithmetic."
            ),
            "model_name": "gpt-4.1-mini",
            "max_loops": 1,
        },
        {
            "agent_name": "Cost Estimator",
            "description": "Unit prices against the firm's bid history.",
            "system_prompt": (
                "You are a senior estimator. Compare each major unit price with the "
                "three most recent comparable bids provided and explain any gap "
                "above 5 percent."
            ),
            "model_name": "gpt-5.4",  # stronger model for the pricing judgement
            "max_loops": 1,
        },
        {
            "agent_name": "Schedule Risk",
            "description": "Durations and logic in the proposed schedule.",
            "system_prompt": (
                "You are a project scheduler. Identify activities with unrealistic "
                "durations, missing predecessors and the trades on the critical path."
            ),
            "model_name": "gemini-2.5-pro",
            "max_loops": 1,
        },
        {
            "agent_name": "Safety Reviewer",
            "description": "Site-specific safety plan gaps.",
            "system_prompt": (
                "You are a construction safety manager. List the high-risk activities "
                "in this scope (work at height, excavation, cranes, hot work) and "
                "whether the submitted safety plan addresses each one."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const bidReviewCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Bid Package Review",
    "description": "Parallel scope, quantity, cost, schedule and safety review of a GC bid.",
    "swarm_type": "ConcurrentWorkflow",
    "task": "Review the bid package for the Riverside Clinic, a 3-story 42,000 sf outpatient building. Report findings by discipline and cite the sheet, spec section or quote line each finding comes from. Scope letters, schedule of values and sub quotes follow: ...",
    "agents": [
      {
        "agent_name": "Scope Checker",
        "system_prompt": "You are a preconstruction manager. Compare sub scope letters with the drawing index and spec divisions. List work no one has claimed and work two subs both claim.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Quantity Takeoff",
        "system_prompt": "You are an estimator. Check schedule of values quantities against the drawings and flag any line more than 5 percent off, showing the arithmetic.",
        "model_name": "gpt-4.1-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Cost Estimator",
        "system_prompt": "You are a senior estimator. Compare major unit prices with the three most recent comparable bids and explain any gap above 5 percent.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Schedule Risk",
        "system_prompt": "You are a project scheduler. Identify unrealistic durations, missing predecessors and the trades on the critical path.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Safety Reviewer",
        "system_prompt": "You are a construction safety manager. List high-risk activities in this scope and whether the safety plan addresses each one.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# The response carries "output" (the five reviews) and "usage"
# (input_tokens, output_tokens, total_tokens). The run also appears in
# Swarms Cloud under the swarm name.`

const rfiRouterTs = `// RFI handling as a MultiAgentRouter: a router agent reads the question and
// hands it to one discipline specialist, which drafts the response the
// superintendent reviews before it goes to the design team.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Rfi = { number: string; subject: string; question: string; sheets: string[] }

const specialist = (name: string, model: string, scope: string) => ({
  agent_name: name,
  description: scope,
  system_prompt:
    "You are the " + name.toLowerCase() + " reviewer on a general contractor's project team. " +
    "Draft a response to the RFI below. Cite every sheet, detail and spec section you rely on. " +
    "Mark the draft FOR SUPERINTENDENT REVIEW at the top and list any question the design team must answer.",
  model_name: model,
  max_loops: 1,
})

export async function draftRfiResponse(rfi: Rfi) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "RFI Desk",
      description: "Route each RFI to one discipline and draft a response for review.",
      swarm_type: "MultiAgentRouter",
      task:
        "RFI " + rfi.number + ": " + rfi.subject + "\\n" +
        "Referenced sheets: " + rfi.sheets.join(", ") + "\\n\\n" +
        rfi.question,
      agents: [
        specialist("Structural", "claude-sonnet-5-5", "Foundations, steel, concrete, connections and load paths."),
        specialist("MEP", "gpt-5.4", "Mechanical, electrical, plumbing and fire protection coordination."),
        specialist("Architectural", "claude-haiku-5-5", "Finishes, partitions, doors, hardware and envelope details."),
        specialist("Civil", "gemini-2.5-flash", "Grading, utilities, paving and stormwater."),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  const data = await res.json()
  return { draft: data.output as string, usage: data.usage }
}

draftRfiResponse({
  number: "RFI-087",
  subject: "Beam penetration for 10 inch supply duct at grid C-4",
  sheets: ["S-201", "S-501", "M-301"],
  question:
    "M-301 routes a 10 inch supply duct through W18x35 beam B-12 at grid C-4. " +
    "S-501 detail 6 limits web penetrations to 6 inches. Please confirm whether a " +
    "reinforced penetration is acceptable or the duct must be rerouted below the beam.",
}).then((r) => {
  console.log(r.draft)
  console.log(r.usage)
})`

const safetyBatchPython = `import glob
import os

import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# One request body per project. The batch endpoint runs all of them and
# returns the results in a list, so a Friday job can produce every weekly
# safety report in one call and leave one log entry per project in Swarms Cloud.
AGENTS = [
    {
        "agent_name": "Log Reader",
        "system_prompt": (
            "You read construction daily logs and toolbox talk notes. Pull out every "
            "hazard observation, near miss, incident and open corrective action with "
            "its date and the crew involved."
        ),
        "model_name": "claude-haiku-5-5",  # cheap reader for long logs
        "max_loops": 1,
    },
    {
        "agent_name": "Hazard Extractor",
        "system_prompt": (
            "You are a safety coordinator. Group the items from the log reader by "
            "hazard type (falls, struck-by, caught-between, electrical, excavation) "
            "and note which corrective actions are still open."
        ),
        "model_name": "gpt-4.1-mini",
        "max_loops": 1,
    },
    {
        "agent_name": "Safety Report Writer",
        "system_prompt": (
            "You write the weekly site safety report for the safety manager to review "
            "and sign. Every statement must cite the daily log date it comes from. "
            "Do not invent counts or statistics that are not in the logs."
        ),
        "model_name": "claude-sonnet-5-5",  # stronger writer for the signed report
        "max_loops": 1,
    },
]


def request_for(project_dir: str) -> dict:
    logs = []
    for path in sorted(glob.glob(os.path.join(project_dir, "daily-log-*.txt"))):
        with open(path, encoding="utf-8") as f:
            logs.append(f"### {os.path.basename(path)}\\n{f.read()}")
    return {
        "name": f"Weekly Safety Report: {os.path.basename(project_dir)}",
        "description": "Daily logs to a weekly safety report for review.",
        "swarm_type": "SequentialWorkflow",
        "task": "Write this week's safety report from the daily logs below.\\n\\n" + "\\n\\n".join(logs),
        "agents": AGENTS,
        "max_loops": 1,
    }


batch = [request_for(d) for d in sorted(glob.glob("projects/*"))]

resp = requests.post(f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, json=batch, timeout=600)
resp.raise_for_status()

for body, result in zip(batch, resp.json()):
    print("=" * 72)
    print(body["name"])
    print(result.get("output"))
    print("usage:", result.get("usage"))`

const scheduleRiskFramework = `from swarms import Agent, SequentialWorkflow

# The same schedule risk review on the open-source swarms package, running
# in your own process. pip install swarms, then set the provider keys for the
# models you name below.

schedule_parser = Agent(
    agent_name="Schedule Parser",
    system_prompt=(
        "You read a construction schedule exported as text (activity id, name, "
        "duration, start, finish, predecessors, total float). Normalise it into a "
        "table and list the activities with total float of 5 working days or less."
    ),
    model_name="gpt-4.1-mini",
    max_loops=1,
)

float_analyst = Agent(
    agent_name="Float Analyst",
    system_prompt=(
        "You are a project scheduler. From the parsed table, trace the critical "
        "path, name the trades on it, and for each low-float activity explain which "
        "predecessor logic drives it and what a one-week slip would do to the finish date."
    ),
    model_name="gemini-2.5-pro",
    max_loops=1,
)

risk_writer = Agent(
    agent_name="Risk Register Writer",
    system_prompt=(
        "You write weekly schedule risk register entries for a general contractor. "
        "One entry per trade at risk: activity, driver, float remaining, proposed "
        "mitigation, owner. Plain language for the project executive."
    ),
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

workflow = SequentialWorkflow(
    name="Schedule Risk Review",
    description="Parse the schedule, find the float, write the register.",
    agents=[schedule_parser, float_analyst, risk_writer],
    max_loops=1,
)

with open("riverside-clinic-week-14.txt", encoding="utf-8") as f:
    schedule_export = f.read()

result = workflow.run(
    "Week 14 schedule update for the Riverside Clinic. Structural steel finished "
    "four working days late. Review the schedule below and write the risk register.\\n\\n"
    + schedule_export
)

print(result)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "bid_review.py",
    code: bidReviewPython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the bid review as a ConcurrentWorkflow. Five reviewers read the same package at the same time on the models that suit each job, and the response carries all five reviews with their token usage.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "bid_review.sh",
    code: bidReviewCurl,
    note: "The same review as a raw HTTP call. Paste the scope letters and schedule of values into the task string, or build the body from files in a script. The response has the output and the usage block, and the run shows up in Swarms Cloud under the swarm name.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "draftRfiResponse.ts",
    code: rfiRouterTs,
    note: "RFI handling as a MultiAgentRouter from a Node or edge runtime. The router reads the question and sends it to one discipline specialist, and the draft comes back marked for superintendent review with the sheets and spec sections it relied on.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Batch",
    file: "weekly_safety_batch.py",
    code: safetyBatchPython,
    note: "A Friday job that builds one SequentialWorkflow request per project from the week's daily logs and submits them all to the batch endpoint. Each project's report comes back in the same list, and each run is logged separately in Swarms Cloud for the safety manager to review.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "schedule_risk.py",
    code: scheduleRiskFramework,
    note: "The schedule risk review on the open-source swarms package (pip install swarms) for teams that want the agents running inside their own scheduler integration. The three agents run in sequence and the register comes back as text.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Which Swarms API swarm type fits a bid or document review?",
    a: "ConcurrentWorkflow when several specialists should read the same package independently and you want all their findings together. SequentialWorkflow when one agent's output feeds the next, as in parsing a schedule before analysing it. MultiAgentRouter when each incoming item (an RFI, a submittal) should go to exactly one specialist. All of them take the same agents list, so changing the pattern is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "How do agents read drawings, specs and schedules?",
    a: "The Swarms API takes text in the task field, so most teams export what they already have: spec sections and scope letters as text, schedules as a CSV or XER export, drawing notes and schedules as extracted text, and daily logs from the field app's export. Agents can also call tools you provide, which is how a team connects a document system or a takeoff export without copying files around.",
  },
  {
    q: "Do the agents send RFI responses or approve submittals?",
    a: "No. Every example on this page returns a draft, a finding or a recommendation, marked for review. The superintendent, project engineer or engineer of record reads it and decides what goes out. Routing an item to a discipline is the one step the router does on its own, and the log shows which specialist it chose.",
  },
  {
    q: "Can we run one review for every project each week?",
    a: "Yes. The batch endpoints accept a list of requests, one per project, and return the results together. Each request is logged on its own in Swarms Cloud with its inputs, outputs, token usage and cost, so the safety manager or project executive sees one entry per project.",
  },
  {
    q: "What does a review cost and where do we see it?",
    a: "Each response carries a usage block with input, output and total tokens, and the run is logged in Swarms Cloud with its cost. Mixing models keeps the price down: a fast model such as claude-haiku-5-5 or gpt-4.1-mini reads the long documents, and a stronger model writes the one report a person signs. Per-model prices are on the pricing page.",
    link: { label: "Model pricing", href: "/pricing" },
  },
]

export const telemetryName = "bid-package-review · ConcurrentWorkflow"
