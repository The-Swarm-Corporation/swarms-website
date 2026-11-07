import { Activity, BatteryCharging, FileCheck, LineChart, MessagesSquare, Wrench } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Energy",
  description:
    "Grid event analysis, asset health review, maintenance planning, power trading research and outage reporting, run as agent teams on the Swarms API with operators deciding.",
  bullets: [
    "Grid, asset and market agents discuss one event in a GroupChat and return the transcript",
    "Asset health, outage reports and market notes drafted for the engineer or trader who decides",
    "Every run logged in Swarms Cloud with its inputs, each agent's turns and its cost",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "round1",
    label: "Round 1",
    nodes: [
      { id: "grid1", label: "Grid Ops Analyst", model: "gpt-5.4", says: "net load ramp 3.1 GW/h, 40 min early vs forecast" },
      { id: "asset1", label: "Asset Engineer", model: "claude-sonnet-5-5", says: "T-14 top-oil at 92 C, within rating for 2 more hours" },
      { id: "market1", label: "Market Analyst", model: "gemini-2.5-pro", says: "RT price at 3x day-ahead, imports constrained" },
    ],
  },
  {
    id: "round2",
    label: "Round 2",
    nodes: [
      { id: "grid2", label: "Grid Ops Analyst", model: "gpt-5.4", says: "battery discharge covers the ramp if started by 17:20" },
      { id: "asset2", label: "Asset Engineer", model: "claude-sonnet-5-5", says: "agree, hold T-14 load flat, no switching needed" },
      { id: "market2", label: "Market Analyst", model: "gemini-2.5-pro", says: "discharge window matches the price peak, note for desk" },
    ],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Grid event review",
    description: "A grid operations analyst, an asset engineer and a market analyst discuss one event over several turns: what happened, what it means for equipment and what it means for price. The transcript and a summary go to the control room, where the operator decides what to dispatch.",
    swarmType: "GroupChat",
    agents: ["Grid Ops Analyst", "Asset Engineer", "Market Analyst"],
    icon: MessagesSquare,
  },
  {
    title: "Asset health inspection",
    description: "Vibration, temperature, output and age agents each read the same fleet snapshot at the same time and rate every asset on their own signal. The maintenance engineer sees four independent reads per asset and decides what goes on the inspection list.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Vibration Agent", "Temperature Agent", "Output Agent", "Age Agent"],
    icon: Wrench,
  },
  {
    title: "Day-ahead market note",
    description: "A desk director splits the next trading day into load, weather and renewables, fuel and transmission questions, three analysts answer them, and the director writes the morning note. Traders read it; the agents do not place bids.",
    swarmType: "HierarchicalSwarm",
    agents: ["Desk Director", "Load Analyst", "Fuel Analyst", "Transmission Analyst"],
    icon: LineChart,
  },
  {
    title: "Outage report drafting",
    description: "After an outage, an event reader pulls the SCADA alarms and operator log into one record, a timeline builder orders them, and a writer drafts the report in the regulator's format for the operations manager to review and submit.",
    swarmType: "SequentialWorkflow",
    agents: ["Event Reader", "Timeline Builder", "Report Writer"],
    icon: FileCheck,
  },
  {
    title: "Compliance filing review",
    description: "Before a reliability standard filing goes out, several judge agents score the draft against the standard's requirements and the evidence attached, and an aggregator writes the review the compliance officer uses to fix the gaps.",
    swarmType: "CouncilAsAJudge",
    agents: ["Requirement Judge", "Evidence Judge", "Clarity Judge", "Aggregator"],
    icon: Activity,
  },
  {
    title: "Storage dispatch review",
    description: "Three forecasters independently propose a charge and discharge plan for a battery from the same price and load forecast, and the majority plan is returned with the dissent. The storage operator reviews it before anything is scheduled.",
    swarmType: "MajorityVoting",
    agents: ["Price Forecaster", "Load Forecaster", "Degradation Reviewer"],
    icon: BatteryCharging,
  },
]

const gridEventPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A GroupChat: three specialists discuss one grid event over several turns.
# The output is the transcript plus each agent's final position, for the
# control room to read. No agent dispatches anything.
event = (
    "17:05 local. Net load ramping at 3.1 GW per hour, about 40 minutes earlier "
    "than the day-ahead forecast. Solar dropping under cloud in the west zone. "
    "Transformer T-14 at the Westgate substation top-oil 92 C, rating 105 C. "
    "Real-time price 3x the day-ahead clear. Import path at 94 percent of limit. "
    "Battery fleet at 88 percent state of charge."
)

response = client.swarms.run(
    name="Evening Ramp Review",
    description="Grid, asset and market agents discuss a ramp event and recommend options.",
    swarm_type="GroupChat",
    task=(
        "Discuss the event below. Agree on what is happening, what it means for "
        "equipment and for price, and list the options the operator could take "
        "with the trade-offs of each. Do not issue instructions; the control room decides.\\n\\n"
        + event
    ),
    agents=[
        {
            "agent_name": "Grid Ops Analyst",
            "description": "Load, generation, ramps and reserve margins.",
            "system_prompt": (
                "You are a grid operations analyst in a balancing authority. Explain the "
                "ramp, the reserve position and which resources can respond in time. "
                "Speak in short turns and respond to what the other analysts say."
            ),
            "model_name": "gpt-5.4",
            "max_loops": 1,
        },
        {
            "agent_name": "Asset Engineer",
            "description": "Transformer, line and plant thermal limits.",
            "system_prompt": (
                "You are a substation asset engineer. For each piece of equipment named, "
                "state how long it can run at the described loading and what you would "
                "want the operator to avoid. Disagree with the others when the data says so."
            ),
            "model_name": "claude-sonnet-5-5",  # careful with limits and units
            "max_loops": 1,
        },
        {
            "agent_name": "Market Analyst",
            "description": "Real-time and day-ahead prices, imports and bids.",
            "system_prompt": (
                "You are a power market analyst. Explain the price move, whether it is "
                "likely to persist through the ramp, and what each option costs or earns. "
                "Keep every number tied to the data in the event."
            ),
            "model_name": "gemini-2.5-pro",
            "max_loops": 1,
        },
    ],
    max_loops=3,  # three rounds of discussion
)

print(response)`

const gridEventCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Evening Ramp Review",
    "description": "Grid, asset and market agents discuss a ramp event and recommend options.",
    "swarm_type": "GroupChat",
    "task": "Discuss the event and list the options the operator could take, with trade-offs. Do not issue instructions; the control room decides. Event: 17:05 local, net load ramping 3.1 GW/h, 40 minutes early vs forecast. Solar dropping in the west zone. Transformer T-14 top-oil 92 C, rating 105 C. Real-time price 3x day-ahead. Import path at 94 percent of limit. Battery fleet at 88 percent state of charge.",
    "agents": [
      {
        "agent_name": "Grid Ops Analyst",
        "system_prompt": "You are a grid operations analyst. Explain the ramp, the reserve position and which resources can respond in time. Short turns, respond to the others.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Asset Engineer",
        "system_prompt": "You are a substation asset engineer. State how long each named asset can run at the described loading and what the operator should avoid.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Market Analyst",
        "system_prompt": "You are a power market analyst. Explain the price move, whether it persists through the ramp, and what each option costs or earns.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      }
    ],
    "max_loops": 3
  }'

# The response "output" holds the discussion and each agent's final position.
# "usage" has input_tokens, output_tokens and total_tokens for the whole chat.`

const storageVoteTs = `// Storage dispatch review as a MajorityVoting swarm: three forecasters each
// propose a charge and discharge plan from the same forecast, and the API
// returns the majority plan with the dissent. The storage operator reviews
// it before anything is scheduled.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Forecast = { date: string; priceByHour: number[]; netLoadByHour: number[]; socPct: number; capacityMwh: number }

const forecaster = (name: string, model: string, focus: string) => ({
  agent_name: name,
  system_prompt:
    "You plan a grid battery's day. Focus: " + focus + " " +
    "Return a 24-row table of hour, action (CHARGE, HOLD, DISCHARGE) and MW, then two sentences on why. " +
    "The plan is a recommendation for the storage operator, who schedules it.",
  model_name: model,
  max_loops: 1,
})

export async function reviewStoragePlan(f: Forecast) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Storage Dispatch Review",
      description: "Three independent plans for one battery day, majority wins.",
      swarm_type: "MajorityVoting",
      task:
        "Plan " + f.date + " for a " + f.capacityMwh + " MWh battery starting at " + f.socPct + " percent state of charge.\\n" +
        "Day-ahead price by hour ($/MWh): " + f.priceByHour.join(", ") + "\\n" +
        "Net load forecast by hour (MW): " + f.netLoadByHour.join(", "),
      agents: [
        forecaster("Price Forecaster", "gpt-5.4", "capture the price spread between the midday trough and the evening peak."),
        forecaster("Load Forecaster", "gemini-2.5-pro", "discharge where the net load ramp is steepest, charge where it is flattest."),
        forecaster("Degradation Reviewer", "claude-sonnet-5-5", "keep cycles and depth of discharge inside the warranty limits even if revenue is lower."),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  const data = await res.json()
  return { plan: data.output as string, usage: data.usage }
}

const price = [38, 35, 33, 32, 33, 41, 58, 72, 61, 44, 29, 18, 12, 11, 15, 27, 52, 118, 164, 142, 96, 71, 55, 44]
const netLoad = [21, 20, 19.5, 19.2, 19.6, 21.5, 24, 26, 25, 22, 18, 15, 13.5, 13, 14, 17, 23, 29, 31, 30, 27, 25, 23, 22]

reviewStoragePlan({ date: "2026-11-08", priceByHour: price, netLoadByHour: netLoad, socPct: 42, capacityMwh: 400 }).then((r) => {
  console.log(r.plan)
  console.log(r.usage)
})`

const operationsAuditPython = `import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"]}

# After an event, the operations manager wants to see what the agents were
# told, what each one said and what the run cost. Swarms Cloud keeps that for
# every run, and the same data is available over the API.
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


# Pull out every run of the event review swarm, with its token total, so the
# operations log can reference the run alongside the operator's own entries.
EVENT_SWARM = "Evening Ramp Review"
runs = []
for entry in walk(logs, "data"):
    if not isinstance(entry, dict) or entry.get("name") != EVENT_SWARM:
        continue
    total = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
    runs.append((entry.get("created_at", ""), total, entry))

runs.sort()
print(f"{len(runs)} runs of {EVENT_SWARM!r}")
for created, total, entry in runs[-10:]:
    print(f"{created:>24}  {total:>9,} tokens  swarm_type={entry.get('swarm_type')}")

# Token totals across all swarms on the key, for the monthly operations budget.
by_name: dict[str, int] = {}
for entry in walk(logs, "data"):
    if isinstance(entry, dict):
        total = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
        by_name[entry.get("name", "unnamed")] = by_name.get(entry.get("name", "unnamed"), 0) + total

for name, total in sorted(by_name.items(), key=lambda kv: -kv[1]):
    print(f"{name:32s} {total:>12,} tokens")

print("summary:", metrics)`

const assetInspectionFramework = `from swarms import Agent, ConcurrentWorkflow

# The asset health inspection on the open-source swarms package, in your own
# process: four agents read the same fleet snapshot at the same time, each on
# one signal. pip install swarms, then set the provider keys for the models.

vibration = Agent(
    agent_name="Vibration Agent",
    system_prompt=(
        "You read vibration data for rotating plant (turbines, pumps, fans). For "
        "each asset give a rating GREEN, AMBER or RED from the RMS trend and any "
        "spectrum notes, and name the probable failure mode when not GREEN."
    ),
    model_name="gpt-4.1-mini",
    max_loops=1,
)

temperature = Agent(
    agent_name="Temperature Agent",
    system_prompt=(
        "You read winding, bearing and top-oil temperatures against ratings and "
        "ambient. Rate each asset GREEN, AMBER or RED and state the margin to its limit."
    ),
    model_name="claude-haiku-5-5",
    max_loops=1,
)

output = Agent(
    agent_name="Output Agent",
    system_prompt=(
        "You compare each asset's output with its expected output for the "
        "conditions (wind speed, irradiance, dispatch). Rate the shortfall and say "
        "whether it looks like curtailment, soiling, derate or a fault."
    ),
    model_name="gemini-2.5-flash",
    max_loops=1,
)

age = Agent(
    agent_name="Age Agent",
    system_prompt=(
        "You read service age, hours run and maintenance history. Rate each asset "
        "on overdue inspections and end-of-life risk, and list the next due task."
    ),
    model_name="deepseek-chat",
    max_loops=1,
)

inspection = ConcurrentWorkflow(
    name="Fleet Health Inspection",
    description="Four signals, four agents, one snapshot.",
    agents=[vibration, temperature, output, age],
    max_loops=1,
)

with open("fleet_snapshot_2026-11-07.txt", encoding="utf-8") as f:
    snapshot = f.read()

result = inspection.run(
    "Rate every asset in the snapshot below. The maintenance engineer will use "
    "the four ratings to build the inspection list; do not schedule anything.\\n\\n"
    + snapshot
)

print(result)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "ramp_review.py",
    code: gridEventPython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the event review as a GroupChat. The three agents take turns over three rounds, each on its own model, and the response carries the transcript with its token usage. The operator reads it; nothing is dispatched.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "ramp_review.sh",
    code: gridEventCurl,
    note: "The same discussion as a raw HTTP call. The event goes in the task string, and max_loops sets how many rounds the agents talk. The run shows up in Swarms Cloud under the swarm name with each agent's turns.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "reviewStoragePlan.ts",
    code: storageVoteTs,
    note: "Storage dispatch review as a MajorityVoting swarm from a Node or edge runtime. Three forecasters plan the same battery day from the same forecast with different priorities, and the API returns the majority plan with the dissent for the storage operator to review.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Audit",
    file: "operations_audit.py",
    code: operationsAuditPython,
    note: "After an event, this script pulls the swarm logs for the account, lists every run of the event review swarm with its token total so the operations log can reference it, and totals spend per swarm name for the monthly budget.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "fleet_inspection.py",
    code: assetInspectionFramework,
    note: "The asset health inspection on the open-source swarms package (pip install swarms) for teams that want the agents next to their historian. Four agents read the same snapshot concurrently and the four ratings come back together.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Which Swarms API swarm type fits a grid event review?",
    a: "GroupChat when you want specialists to talk an event through and challenge each other, with the transcript as the record. ConcurrentWorkflow when you want independent reads on the same snapshot without discussion. MajorityVoting when the output is a plan several forecasters should agree on. All of them take the same agents list, so switching is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Do the agents dispatch, switch or trade?",
    a: "No. Every example on this page returns analysis, a transcript, a rating or a recommended plan. Dispatch and switching stay with the control room and its EMS, and bids stay with the trading desk and its systems. Agents can call tools you provide, which is how a utility connects a read-only historian or market data query.",
  },
  {
    q: "How do agents get SCADA, historian or market data?",
    a: "The Swarms API takes text in the task field, so the common pattern is a small job that pulls the alarm list, the sensor window or the price curve from your systems and puts it in the task. For a fleet, the batch endpoints accept one request per asset or per site and return the results together.",
  },
  {
    q: "How do we show a regulator what the agents did?",
    a: "Every run on the Swarms API is logged in Swarms Cloud with its inputs, each agent's turns, token usage, latency and cost. The same data is available over the swarm logs endpoint, so an operations log or a compliance file can reference a run and reconstruct what the agents were told and what they wrote.",
  },
  {
    q: "What does a review cost and which models should we use?",
    a: "Each response carries a usage block with input, output and total tokens, and Swarms Cloud shows the cost per run. A discussion between three agents over three rounds on stronger models costs more than a single fast read, so most teams reserve GroupChat for events and use cheap models such as claude-haiku-5-5 or gemini-2.5-flash for fleet-wide ratings. Per-model prices are on the pricing page.",
    link: { label: "Model pricing", href: "/pricing" },
  },
]

export const telemetryName = "evening-ramp-review · GroupChat"
