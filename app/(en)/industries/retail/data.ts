import { Boxes, Headset, MessageSquareText, PackageSearch, Tags, Warehouse } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Retail",
  description:
    "Catalog enrichment, pricing review, support ticket routing, demand analysis and compliance checks on product content, run as agent teams on the Swarms API.",
  bullets: [
    "AgentRearrange flows written as a string: intake, then copy and attributes in parallel, then compliance",
    "Pricing and markdown proposals returned with the reasoning for a merchandiser to approve",
    "Every run logged in Swarms Cloud with token usage and cost per SKU, ticket or store",
  ],
}

// The hero example's flow string. The diagram below mirrors it stage for stage.
export const rearrangeFlow = "Intake -> Copywriter, Attributes -> Compliance -> Publisher"

export const flowStages: FlowStage[] = [
  {
    id: "intake",
    label: "Intake",
    nodes: [{ id: "intake", label: "Intake", model: "gemini-2.5-flash", says: "supplier row normalised, category guessed as cookware" }],
  },
  {
    id: "enrich",
    label: "Enrich",
    nodes: [
      { id: "copy", label: "Copywriter", model: "claude-sonnet-5-5", says: "title and five bullets written for the category" },
      { id: "attrs", label: "Attributes", model: "gpt-4.1-mini", says: "material, capacity, dishwasher safe, induction ready" },
    ],
  },
  {
    id: "check",
    label: "Check",
    nodes: [{ id: "compliance", label: "Compliance", model: "gpt-5.4", says: "no banned claims, PFAS statement required for the EU listing" }],
  },
  {
    id: "publish",
    label: "Publish",
    nodes: [{ id: "publisher", label: "Publisher", model: "claude-haiku-5-5", says: "listing JSON assembled per marketplace" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Catalog enrichment",
    description: "A supplier row becomes a title, bullets, structured attributes and a compliance check. The flow string runs the copywriter and the attribute extractor at the same time, then the checker, then the publisher.",
    swarmType: "AgentRearrange",
    agents: ["Intake", "Copywriter", "Attributes", "Compliance", "Publisher"],
    icon: PackageSearch,
  },
  {
    title: "Price and markdown review",
    description: "A demand reader summarises sell-through and stock cover, a pricing agent proposes the change, and a margin checker tests it against floor and competitor rules. A merchandiser approves before anything changes.",
    swarmType: "SequentialWorkflow",
    agents: ["Demand Reader", "Pricing Agent", "Margin Checker"],
    icon: Tags,
  },
  {
    title: "Support ticket routing",
    description: "Each ticket goes to one specialist: orders, returns, product questions or shipping. The router returns the specialist's draft reply and the reason for the route, and an agent can escalate to a person.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Orders Agent", "Returns Agent", "Product Agent", "Shipping Agent"],
    icon: Headset,
  },
  {
    title: "Morning demand note",
    description: "Store, online and promotions agents each read the same overnight sales export and write their section. An aggregator produces one note with the SKUs that need a transfer or a reorder on top.",
    swarmType: "MixtureOfAgents",
    agents: ["Store Agent", "Online Agent", "Promotions Agent", "Aggregator"],
    icon: Boxes,
  },
  {
    title: "Review mining",
    description: "Agents read the week's product reviews in parallel, one per theme: fit and sizing, quality, delivery, and listing accuracy. The outputs come back together as a list of fixes for the catalog and the buyers.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Sizing Agent", "Quality Agent", "Delivery Agent", "Listing Agent"],
    icon: MessageSquareText,
  },
  {
    title: "Replenishment planning",
    description: "Planner agents break a reorder cycle into one task per store and category, workers pull tasks from the queue and draft the orders, and the planners assemble the proposal for the buying team.",
    swarmType: "PlannerWorkerSwarm",
    agents: ["Planner", "Store Worker", "Category Worker", "Order Writer"],
    icon: Warehouse,
  },
]

const catalogEnrichmentPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# One supplier row as it arrives in the feed.
RAW_ROW = {
    "sku": "CW-2041-BLK",
    "vendor_title": "SAUCEPAN 20CM S/S INDUCTION BLK HNDL",
    "vendor_attrs": "stainless 18/10; 2.8l; glass lid; dw safe; induction",
    "cost_price": "14.20",
    "markets": ["US", "EU"],
}

# AgentRearrange runs the agents in the order the flow string describes:
# "->" means the next step waits, "," means those agents run at the same time.
response = client.swarms.run(
    name="Catalog Enrichment",
    description="Supplier row to a finished, checked listing.",
    swarm_type="AgentRearrange",
    rearrange_flow="Intake -> Copywriter, Attributes -> Compliance -> Publisher",
    task=f"Enrich this supplier row into a complete listing: {RAW_ROW}",
    rules=(
        "Never invent a specification that is not in the row. Mark unknown values as "
        "null. Titles are under 80 characters. Bullets are complete sentences."
    ),
    agents=[
        {
            "agent_name": "Intake",
            "system_prompt": (
                "Normalise the supplier row: expand abbreviations, guess the category "
                "and return a clean JSON object the other agents can read."
            ),
            "model_name": "gemini-2.5-flash",  # cheap, fast, fine for normalisation
            "max_loops": 1,
        },
        {
            "agent_name": "Copywriter",
            "system_prompt": (
                "Write the product title and five benefit bullets for the category. "
                "Use only facts from the normalised row."
            ),
            "model_name": "claude-sonnet-5-5",  # the customer-facing text
            "max_loops": 1,
        },
        {
            "agent_name": "Attributes",
            "system_prompt": (
                "Extract structured attributes as JSON: material, capacity_l, diameter_cm, "
                "lid, dishwasher_safe, induction_ready, colour. Unknown values are null."
            ),
            "model_name": "gpt-4.1-mini",
            "max_loops": 1,
        },
        {
            "agent_name": "Compliance",
            "system_prompt": (
                "Check the copy and attributes for each target market. Flag banned claims, "
                "missing mandatory statements and any specification that is not in the "
                "source row. Return pass or fail per market with reasons."
            ),
            "model_name": "gpt-5.4",  # the gate before publishing
            "max_loops": 1,
        },
        {
            "agent_name": "Publisher",
            "system_prompt": (
                "Assemble the final listing JSON per market from the approved copy and "
                "attributes. Include the compliance result verbatim."
            ),
            "model_name": "claude-haiku-5-5",
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const catalogEnrichmentCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Catalog Enrichment",
    "description": "Supplier row to a finished, checked listing.",
    "swarm_type": "AgentRearrange",
    "rearrange_flow": "Intake -> Copywriter, Attributes -> Compliance -> Publisher",
    "task": "Enrich this supplier row into a complete listing: sku CW-2041-BLK, vendor title SAUCEPAN 20CM S/S INDUCTION BLK HNDL, attrs stainless 18/10; 2.8l; glass lid; dw safe; induction, markets US and EU.",
    "rules": "Never invent a specification that is not in the row. Mark unknown values as null. Titles under 80 characters. Bullets are complete sentences.",
    "agents": [
      {
        "agent_name": "Intake",
        "system_prompt": "Normalise the supplier row: expand abbreviations, guess the category and return clean JSON.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      },
      {
        "agent_name": "Copywriter",
        "system_prompt": "Write the product title and five benefit bullets using only facts from the normalised row.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Attributes",
        "system_prompt": "Extract structured attributes as JSON: material, capacity_l, diameter_cm, lid, dishwasher_safe, induction_ready, colour. Unknown values are null.",
        "model_name": "gpt-4.1-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Compliance",
        "system_prompt": "Check copy and attributes per market. Flag banned claims, missing mandatory statements and invented specifications. Return pass or fail per market with reasons.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Publisher",
        "system_prompt": "Assemble the final listing JSON per market from the approved copy and attributes, with the compliance result included verbatim.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# Every agent_name in rearrange_flow must match an entry in agents.
# The response carries "output" and "usage" (input, output and total tokens).`

const ticketRouterTs = `// Support ticket routing: the router reads the ticket and dispatches it to
// exactly one specialist, whose draft reply comes back with the route.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Ticket = { id: string; orderId?: string; subject: string; body: string }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const specialist = (name: string, description: string, prompt: string, model: string) => ({
  agent_name: name,
  description, // the router reads descriptions to choose a specialist
  system_prompt:
    prompt +
    " Write the reply in the brand voice: short sentences, no apologies in the first line, " +
    "one clear next step. If the case needs a refund over 100 USD or a legal question, " +
    "write ESCALATE on the first line and summarise for a human agent instead.",
  model_name: model,
  max_loops: 1,
})

export async function routeTicket(ticket: Ticket): Promise<SwarmResponse> {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Support Ticket Router",
      description: "One specialist per ticket, chosen by the router.",
      swarm_type: "MultiAgentRouter",
      task:
        "Ticket " + ticket.id + (ticket.orderId ? " for order " + ticket.orderId : "") +
        "\\nSubject: " + ticket.subject + "\\n\\n" + ticket.body,
      agents: [
        specialist("Orders Agent", "Order status, changes and cancellations before dispatch.",
          "You handle order questions. Confirm what can still change before dispatch.", "gpt-4.1-mini"),
        specialist("Returns Agent", "Returns, exchanges and refunds within the 30-day policy.",
          "You handle returns. State the policy window and the steps to start a return.", "claude-haiku-5-5"),
        specialist("Product Agent", "Sizing, materials, care and compatibility questions.",
          "You answer product questions from the listing attributes only. Never guess a spec.", "gpt-5.4-mini"),
        specialist("Shipping Agent", "Delivery times, tracking, lost and damaged parcels.",
          "You handle delivery issues. Give the carrier step and the date to wait until.", "claude-haiku-5-5"),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  return (await res.json()) as SwarmResponse
}

routeTicket({
  id: "T-88213",
  orderId: "ORD-553190",
  subject: "Pan arrived with a chipped lid",
  body: "The glass lid on the 20cm saucepan has a chip on the rim. Can I get a replacement lid rather than returning the whole pan?",
}).then((r) => {
  console.log(r.output)
  console.log("tokens:", r.usage.total_tokens)
})`

const nightlyCreditsPython = `import os
import sys
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# The nightly catalog job enriches every new SKU in the feed. Before it
# starts, check the credit balance in Swarms Cloud and stop early if the
# account cannot cover the batch, instead of failing halfway through.
credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()
print("credits:", credits)

new_rows = [
    {"sku": "CW-2041-BLK", "vendor_title": "SAUCEPAN 20CM S/S INDUCTION BLK HNDL"},
    {"sku": "CW-2042-BLK", "vendor_title": "SAUCEPAN 16CM S/S INDUCTION BLK HNDL"},
    {"sku": "BK-1177-WHT", "vendor_title": "MIXING BOWL SET 3PC CERAMIC WHT"},
]

# A conservative budget per SKU, agreed with finance for this job.
BUDGET_PER_SKU_USD = 0.05
needed = BUDGET_PER_SKU_USD * len(new_rows)

balance = None
for key in ("credits", "credit", "balance"):
    if isinstance(credits, dict) and isinstance(credits.get(key), (int, float)):
        balance = float(credits[key])
        break

if balance is not None and balance < needed:
    print(f"stopping: {len(new_rows)} SKUs need about {needed:.2f} USD, balance is {balance:.2f}")
    sys.exit(1)


def enrich_request(row: dict) -> dict:
    return {
        "name": f"Catalog Enrichment {row['sku']}",
        "swarm_type": "AgentRearrange",
        "rearrange_flow": "Intake -> Copywriter, Attributes -> Compliance -> Publisher",
        "task": f"Enrich this supplier row into a complete listing: {row}",
        "agents": [
            {"agent_name": "Intake", "system_prompt": "Normalise the supplier row into clean JSON.", "model_name": "gemini-2.5-flash", "max_loops": 1},
            {"agent_name": "Copywriter", "system_prompt": "Write a title under 80 characters and five bullets from the row only.", "model_name": "claude-sonnet-5-5", "max_loops": 1},
            {"agent_name": "Attributes", "system_prompt": "Extract structured attributes as JSON; unknown values are null.", "model_name": "gpt-4.1-mini", "max_loops": 1},
            {"agent_name": "Compliance", "system_prompt": "Flag banned claims, missing statements and invented specs per market.", "model_name": "gpt-5.4", "max_loops": 1},
            {"agent_name": "Publisher", "system_prompt": "Assemble the final listing JSON per market.", "model_name": "claude-haiku-5-5", "max_loops": 1},
        ],
        "max_loops": 1,
    }


batch = [enrich_request(row) for row in new_rows]
resp = requests.post(f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, json=batch, timeout=900)
resp.raise_for_status()

for row, result in zip(new_rows, resp.json()):
    usage = result.get("usage", {})
    print(row["sku"], "tokens:", usage.get("total_tokens"))

# Afterwards the run totals are in Swarms Cloud, or from the API:
print(requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json())`

const priceReviewFramework = `from swarms import Agent, SequentialWorkflow

# The open-source swarms package runs the same price review in-process.
# The output is a proposal for the merchandiser, not a price change.
SNAPSHOT = """
SKU CW-2041-BLK, 20cm induction saucepan. Current price 34 USD, cost 14.20 USD.
Weekly units, last 6 weeks: 212, 198, 171, 140, 122, 97. On hand: 1,840 across 6 stores
and the warehouse. Weeks of cover at current rate: 19. Category markdown floor: 35% margin.
Two listed competitors moved to 29 USD and 31 USD this month.
"""

demand_reader = Agent(
    agent_name="Demand Reader",
    system_prompt=(
        "You read sell-through and stock cover. Summarise the trend, the weeks of cover "
        "and whether the SKU is ahead of or behind the category."
    ),
    model_name="gemini-2.5-flash",
    max_loops=1,
)

pricing = Agent(
    agent_name="Pricing Agent",
    system_prompt=(
        "You propose a single price change with a start date and the expected effect on "
        "weeks of cover. Explain the reasoning in four sentences or fewer."
    ),
    model_name="gpt-5.4",
    max_loops=1,
)

margin_checker = Agent(
    agent_name="Margin Checker",
    system_prompt=(
        "You check the proposal against the margin floor and the competitor positions. "
        "Return APPROVE FOR REVIEW or REJECT with the rule that applies, then the proposal "
        "as JSON: sku, current_price, proposed_price, start_date, margin_pct, reason."
    ),
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

workflow = SequentialWorkflow(
    name="Price Review",
    description="Demand read, price proposal and margin check for one SKU.",
    agents=[demand_reader, pricing, margin_checker],
    max_loops=1,
)

proposal = workflow.run(SNAPSHOT)
print(proposal)  # goes to the merchandiser's queue, not to the price file`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "catalog_enrichment.py",
    code: catalogEnrichmentPython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the enrichment as an AgentRearrange swarm. The rearrange_flow string puts the copywriter and the attribute extractor in parallel after intake, then compliance, then the publisher. The response is the listing plus the token usage for the run.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "catalog_enrichment.sh",
    code: catalogEnrichmentCurl,
    note: "The same swarm as a raw HTTP call. Each name in the flow string must match an agent_name in the list. The response carries the output and the usage block that billing is computed from.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "routeTicket.ts",
    code: ticketRouterTs,
    note: "Ticket routing as a MultiAgentRouter swarm from a Node or edge runtime. The router reads each agent's description to choose one specialist, and the specialist's draft comes back with the route. Replies are drafts for your help desk, and the prompt tells the agent when to hand off to a person.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Credits",
    file: "nightly_catalog.py",
    code: nightlyCreditsPython,
    note: "A nightly job checks the account's credit balance before it starts, submits the new SKUs to the batch endpoint, and prints the account metrics afterwards. Each request carries the SKU in its name so the runs line up in Swarms Cloud with their token usage and cost.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "price_review.py",
    code: priceReviewFramework,
    note: "The same price review on the open-source swarms package (pip install swarms) for teams that want it inside their own process. The output is a proposal with the margin check attached; the merchandiser decides.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "What does the rearrange_flow string do?",
    a: "It is the wiring for an AgentRearrange swarm. Agent names separated by an arrow run one after the other, and names separated by a comma run at the same time on the same input. 'Intake -> Copywriter, Attributes -> Compliance -> Publisher' means intake first, then the copywriter and the attribute extractor in parallel, then compliance over both outputs, then the publisher. Every name must match an agent_name in the request.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Can the agents change prices or publish listings on their own?",
    a: "Not in the patterns on this page. The pricing swarm returns a proposal with the margin check attached, and the catalog swarm returns listing JSON with the compliance result. Writing to the price file or the marketplace stays in your systems, behind whatever approvals already apply. Agents can call tools you provide, so a team can expose a 'create draft listing' tool with its own permissions.",
  },
  {
    q: "How do we keep the agents from inventing specifications?",
    a: "Three things in the request: a rules string that forbids any specification not in the source row and asks for null on unknowns, an Attributes agent on a model that follows a JSON schema closely, and a Compliance agent whose job is to compare the copy against the source. The compliance output is returned with the listing, so a reviewer can see what was checked.",
  },
  {
    q: "Which models should we use for a catalog of thousands of SKUs?",
    a: "Use a cheap fast model such as gemini-2.5-flash or gpt-4.1-mini for intake and attribute extraction, which make up most of the tokens, and reserve claude-sonnet-5-5 or gpt-5.4 for the copy and the compliance gate. Each agent carries its own model_name, and the usage block on each response shows the cost per SKU.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "How do we run the catalog job for the whole feed?",
    a: "Send a JSON list of requests to the batch endpoint, one per SKU, with the SKU in each request's name. The runs appear in Swarms Cloud under those names with their token usage, latency and cost, and the credits endpoint lets the job check the balance before it starts.",
  },
]

export const telemetryName = "catalog-enrichment · AgentRearrange"
