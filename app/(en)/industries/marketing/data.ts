import { BarChart3, Globe2, Megaphone, PenLine, Route, Search } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Marketing",
  description:
    "Audience research, multichannel copy, brand review, localization, SEO briefs and performance reporting, run as agent teams on the Swarms API.",
  bullets: [
    "Researcher, copywriter, reviewer and analyst agents, each on the model that fits the job",
    "Style guide rules travel with the request, so the reviewer enforces the same guardrails on every draft",
    "Token usage, latency and cost per campaign in Swarms Cloud for reporting and chargeback",
  ],
}

// SequentialWorkflow: the output of each agent is the input of the next.
export const flowStages: FlowStage[] = [
  {
    id: "research",
    label: "Research",
    nodes: [{ id: "researcher", label: "Audience Researcher", model: "gemini-2.5-flash", says: "three segments, two competitor claims to avoid" }],
  },
  {
    id: "draft",
    label: "Draft",
    nodes: [{ id: "copywriter", label: "Copywriter", model: "claude-sonnet-5-5", says: "landing hero, three emails and six ad variants drafted" }],
  },
  {
    id: "review",
    label: "Brand review",
    nodes: [{ id: "reviewer", label: "Brand Reviewer", model: "gpt-5.4", says: "two variants rewritten for tone, one claim flagged" }],
  },
  {
    id: "format",
    label: "Format",
    nodes: [{ id: "formatter", label: "Channel Formatter", model: "gpt-4.1-mini", says: "character limits applied, UTM tags attached" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Campaign content pipeline",
    description: "A researcher summarises the audience and the competitors, a copywriter drafts for every channel, a brand reviewer checks each line against the style guide, and a formatter cuts the copy to each channel's limits.",
    swarmType: "SequentialWorkflow",
    agents: ["Audience Researcher", "Copywriter", "Brand Reviewer", "Channel Formatter"],
    icon: PenLine,
  },
  {
    title: "Subject line and headline selection",
    description: "Several candidate lines are scored by judge agents for clarity, brand fit and the claim they make, and an aggregator writes the ruling with the reasons, so the team sees why a line won.",
    swarmType: "CouncilAsAJudge",
    agents: ["Clarity Judge", "Brand Fit Judge", "Claims Judge", "Aggregator"],
    icon: Megaphone,
  },
  {
    title: "Weekly performance report",
    description: "Paid, email and organic specialists each read the same export and write their section, and an aggregator assembles the report with what changed and what to test next week.",
    swarmType: "MixtureOfAgents",
    agents: ["Paid Media Analyst", "Email Analyst", "Organic Analyst", "Report Writer"],
    icon: BarChart3,
  },
  {
    title: "Competitive and audience research",
    description: "Question, research, analysis and synthesis agents work through a positioning question in depth and return a brief with sources, the kind of document a strategist would otherwise spend a day on.",
    swarmType: "HeavySwarm",
    agents: ["Question Agent", "Research Agent", "Analysis Agent", "Synthesis Agent"],
    icon: Search,
  },
  {
    title: "Multi-market localization",
    description: "One approved campaign is adapted for several markets at the same time. Each market agent carries its own cultural notes and legal lines, and the outputs come back together for review.",
    swarmType: "ConcurrentWorkflow",
    agents: ["DE Market Agent", "FR Market Agent", "JP Market Agent", "BR Market Agent"],
    icon: Globe2,
  },
  {
    title: "Content brief routing",
    description: "Incoming briefs are routed to the specialist that fits the ask: long-form blog, lifecycle email, paid social or product launch. The router returns the specialist's draft and the reason for the route.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Blog Writer", "Lifecycle Writer", "Paid Social Writer", "Launch Writer"],
    icon: Route,
  },
]

const campaignPipelinePython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# The style guide becomes the rules string. Every agent in the swarm sees it,
# and the Brand Reviewer is told to enforce it line by line.
BRAND_RULES = """
- Voice: direct, specific, second person. No exclamation marks.
- Never claim 'the best', 'the fastest' or any superlative without a source.
- Do not name competitors. Describe the category instead.
- Prices are always written with the currency symbol and no decimals.
- Product name is 'Ledgerline' with a capital L, never 'LedgerLine'.
"""

response = client.swarms.run(
    name="Spring Launch Pipeline",
    description="Research, draft, brand review and channel formatting for one campaign.",
    swarm_type="SequentialWorkflow",
    task=(
        "Campaign: Ledgerline invoicing for freelancers, spring launch. Offer: three "
        "months free on annual plans. Audience: freelance designers and developers in "
        "the US and UK. Deliver a landing page hero, a three-email welcome sequence and "
        "six paid social variants (two per platform: LinkedIn, Instagram, X)."
    ),
    rules=BRAND_RULES,
    agents=[
        {
            "agent_name": "Audience Researcher",
            "description": "Segments, pains and competitor claims to avoid.",
            "system_prompt": (
                "You are a marketing researcher. Describe the audience segments, the "
                "words they use for the problem, and the claims competitors already make "
                "so the copy can avoid them. Return a short brief with headings."
            ),
            "model_name": "gemini-2.5-flash",  # fast and cheap for a summary pass
            "max_loops": 1,
        },
        {
            "agent_name": "Copywriter",
            "description": "Drafts for every channel from the brief.",
            "system_prompt": (
                "You are a senior copywriter. Using the research brief, write the landing "
                "hero (headline, subhead, CTA), three welcome emails (subject, preview, "
                "body) and six paid social variants. Label each piece."
            ),
            "model_name": "claude-sonnet-5-5",  # strongest writer in the pipeline
            "max_loops": 1,
        },
        {
            "agent_name": "Brand Reviewer",
            "description": "Enforces the rules on every line.",
            "system_prompt": (
                "You are the brand editor. Check every line of the drafts against the "
                "rules. Rewrite anything that breaks a rule and list each change with the "
                "rule it broke. Keep pieces that pass unchanged."
            ),
            "model_name": "gpt-5.4",
            "max_loops": 1,
        },
        {
            "agent_name": "Channel Formatter",
            "description": "Character limits and tracking.",
            "system_prompt": (
                "You format approved copy per channel. Enforce character limits for each "
                "platform, append UTM parameters to every link, and return JSON keyed by "
                "channel and variant."
            ),
            "model_name": "gpt-4.1-mini",  # mechanical step, small model
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const campaignPipelineCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Spring Launch Pipeline",
    "description": "Research, draft, brand review and channel formatting for one campaign.",
    "swarm_type": "SequentialWorkflow",
    "task": "Campaign: Ledgerline invoicing for freelancers, spring launch. Offer: three months free on annual plans. Audience: freelance designers and developers in the US and UK. Deliver a landing page hero, a three-email welcome sequence and six paid social variants.",
    "rules": "Voice: direct, specific, second person. No exclamation marks. Never claim the best or the fastest without a source. Do not name competitors. Prices carry the currency symbol and no decimals. The product name is Ledgerline with a capital L.",
    "agents": [
      {
        "agent_name": "Audience Researcher",
        "system_prompt": "You are a marketing researcher. Describe the audience segments, the words they use for the problem, and the claims competitors already make. Return a short brief with headings.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      },
      {
        "agent_name": "Copywriter",
        "system_prompt": "You are a senior copywriter. From the brief, write the landing hero, three welcome emails and six paid social variants. Label each piece.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Brand Reviewer",
        "system_prompt": "You are the brand editor. Check every line against the rules. Rewrite anything that breaks a rule and list each change with the rule it broke.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Channel Formatter",
        "system_prompt": "Enforce per-platform character limits, append UTM parameters to every link, and return JSON keyed by channel and variant.",
        "model_name": "gpt-4.1-mini",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# The response carries "output" (the formatted copy and the reviewer's change
# list) and "usage" with input_tokens, output_tokens and total_tokens.`

const subjectLineCouncilTs = `// Subject line selection as a council: three judges score every candidate
// on one dimension each and the aggregator writes the ruling.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Candidate = { id: string; subject: string; preview: string }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const judge = (name: string, model: string, dimension: string) => ({
  agent_name: name,
  system_prompt:
    "You judge email subject lines for a B2B software company. Score each candidate " +
    "from 1 to 10 on this dimension only: " + dimension + " " +
    "Return one line per candidate: id, score, one reason.",
  model_name: model,
  max_loops: 1,
})

export async function pickSubjectLine(candidates: Candidate[]): Promise<SwarmResponse> {
  const list = candidates
    .map((c) => "[" + c.id + "] " + c.subject + " | preview: " + c.preview)
    .join("\\n")

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Subject Line Council",
      description: "Judges score candidates, aggregator picks and explains.",
      swarm_type: "CouncilAsAJudge",
      task:
        "Pick the subject line for the Ledgerline spring launch email to freelancers. " +
        "Candidates:\\n" + list + "\\nReturn the winner, the runner-up and the reasons.",
      rules: "No exclamation marks. No superlatives without a source. Do not name competitors.",
      agents: [
        judge("Clarity Judge", "gpt-5.4-mini", "Clarity: does the reader know what they get in five words?"),
        judge("Brand Fit Judge", "claude-haiku-5-5", "Brand fit: direct, specific, second person, calm."),
        judge("Claims Judge", "gpt-4.1-mini", "Claims: is every promise one the product page supports?"),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  return (await res.json()) as SwarmResponse
}

pickSubjectLine([
  { id: "A", subject: "Three months of Ledgerline, free", preview: "Annual plans only, until 30 April" },
  { id: "B", subject: "Invoices that chase themselves", preview: "Automatic reminders are on by default" },
  { id: "C", subject: "Your spring offer is inside", preview: "A smaller bill for a year of invoicing" },
]).then((r) => {
  console.log(r.output)
  console.log("tokens:", r.usage.total_tokens)
})`

const localizationBatchPython = `import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# One approved campaign, several markets. Each market is its own swarm
# request, and the batch endpoint runs them all in one call. The runs land
# in Swarms Cloud under the names below, so spend per market is visible.
APPROVED_COPY = open("approved/spring_launch_en.md").read()

MARKETS = {
    "DE": "German, formal Sie. Prices in EUR. Mention the 14-day withdrawal right.",
    "FR": "French, vous. Prices in EUR. Avoid anglicisms where a French term exists.",
    "JP": "Japanese, polite desu/masu register. Prices in JPY with no decimals.",
    "BR": "Brazilian Portuguese, informal voce. Prices in BRL. Pix as a payment option.",
}


def market_request(code: str, notes: str) -> dict:
    return {
        "name": f"Spring Launch Localization {code}",
        "description": f"Adapt the approved spring launch copy for {code}.",
        "swarm_type": "SequentialWorkflow",
        "task": f"Adapt this approved campaign for the {code} market.\\n\\n{APPROVED_COPY}",
        "rules": "Keep the offer and the product name unchanged. Keep every link and UTM tag.",
        "agents": [
            {
                "agent_name": "Market Adapter",
                "system_prompt": (
                    "You localize marketing copy. Adapt tone, idiom, currency and legal lines "
                    f"for this market: {notes} Keep the structure and labels of the source."
                ),
                "model_name": "gemini-2.5-pro",
                "max_loops": 1,
            },
            {
                "agent_name": "Market Reviewer",
                "system_prompt": (
                    "You are a native-speaking brand editor for this market. Fix anything that "
                    "reads as translated, and list the changes you made."
                ),
                "model_name": "claude-sonnet-5-5",
                "max_loops": 1,
            },
        ],
        "max_loops": 1,
    }


batch = [market_request(code, notes) for code, notes in MARKETS.items()]

resp = requests.post(f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, json=batch, timeout=600)
resp.raise_for_status()
results = resp.json()

for code, result in zip(MARKETS, results):
    usage = result.get("usage", {})
    print(f"== {code}: {usage.get('total_tokens', '?')} tokens")
    print(result.get("output"))`

const channelVariantsFramework = `from swarms import Agent, ConcurrentWorkflow

# The open-source swarms package runs the same roles in-process. Here three
# channel writers work on one brief at the same time and the workflow returns
# all of their drafts together.
BRIEF = """
Product: Ledgerline invoicing for freelancers.
Offer: three months free on annual plans, until 30 April.
Audience: freelance designers and developers in the US and UK.
Rules: direct, specific, second person, no exclamation marks, no superlatives.
"""

linkedin = Agent(
    agent_name="LinkedIn Writer",
    system_prompt=(
        "You write LinkedIn ads for B2B software. Write two variants: a 150-character "
        "intro line, a headline under 70 characters and a CTA. Professional, no hype."
    ),
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

instagram = Agent(
    agent_name="Instagram Writer",
    system_prompt=(
        "You write Instagram ad captions for software products. Write two variants under "
        "125 characters with one concrete benefit each and no hashtags."
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

search = Agent(
    agent_name="Search Ads Writer",
    system_prompt=(
        "You write responsive search ads. Return eight headlines under 30 characters and "
        "four descriptions under 90 characters, each a complete thought."
    ),
    model_name="gpt-4.1-mini",
    max_loops=1,
)

workflow = ConcurrentWorkflow(
    name="Channel Variants",
    description="Three channel writers draft from one brief at the same time.",
    agents=[linkedin, instagram, search],
    max_loops=1,
)

result = workflow.run(BRIEF)
print(result)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "campaign_pipeline.py",
    code: campaignPipelinePython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the campaign as a SequentialWorkflow. The style guide goes in the rules field, so every agent sees it and the Brand Reviewer is asked to enforce it line by line. The response is the formatted copy plus the token usage for the run.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "campaign_pipeline.sh",
    code: campaignPipelineCurl,
    note: "The same pipeline as a raw HTTP call. The agents run in the order they are listed, each one receiving the previous output, and the response carries the output and the usage block that billing is computed from.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "pickSubjectLine.ts",
    code: subjectLineCouncilTs,
    note: "Subject line selection as a CouncilAsAJudge swarm from a Node or edge runtime. Each judge scores one dimension on a small model, and the aggregator returns the winner with the reasons, so the choice can be discussed instead of guessed at.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Batch",
    file: "localize_batch.py",
    code: localizationBatchPython,
    note: "Localization for four markets in one call to the batch endpoint. Each request has its own name, so the runs show up in Swarms Cloud per market with their token usage and cost, and a team can see what a market's adaptation costs before adding the next one.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "channel_variants.py",
    code: channelVariantsFramework,
    note: "The same roles on the open-source swarms package (pip install swarms) for teams that want the orchestration inside their own process. Three channel writers draft from one brief concurrently and the workflow returns every draft.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "How do brand guidelines get enforced across every agent?",
    a: "Put the style guide in the rules field of the request. Rules are a plain string that every agent in the swarm receives alongside its own system prompt, so the copywriter writes within them and the reviewer agent is asked to check each line against them and list what it changed. Keep the rules short and testable: one rule per line, each one a yes or no question about a sentence.",
  },
  {
    q: "Which swarm type fits a content pipeline?",
    a: "SequentialWorkflow when each step depends on the previous one (research, draft, review, format). ConcurrentWorkflow when several writers should work from the same brief at once, for example one agent per channel or per market. CouncilAsAJudge when the output is a choice between candidates and the team wants the reasons. All three take the same agents list, so switching is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Can we use a cheaper model for research and a stronger one for writing?",
    a: "Yes. Each agent has its own model_name. A fast model such as gemini-2.5-flash or gpt-4.1-mini is a good fit for summarising research or applying character limits, while claude-sonnet-5-5 or gpt-5.4 does the drafting and the review. Pricing per model is on the pricing page, and the usage block on every response shows what each run cost.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "Does the swarm publish the copy?",
    a: "No. The examples on this page return drafts, review notes and formatted JSON. Scheduling and publishing stay in your marketing tools, and a person approves what goes out. Agents can call tools you provide, so a team can expose a draft-creation tool in its CMS or email platform with its own permissions.",
  },
  {
    q: "How do we see what a campaign's content cost to produce?",
    a: "Every run on the Swarms API is logged in Swarms Cloud with its inputs, each agent's output, token usage, latency and cost. Name your requests after the campaign and the runs group themselves; the same data is available from the swarm logs endpoint for a spreadsheet or a dashboard.",
  },
]

export const telemetryName = "spring-launch-pipeline · SequentialWorkflow"
