import { BarChart3, FileSearch, Landmark, Scale, ShieldAlert, TrendingUp } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Finance",
  description:
    "Equity research, risk review, trade approval, filing analysis, credit memos and client reporting, run as agent teams on the Swarms API.",
  bullets: [
    "Director, analyst and risk agents on the models that suit each role",
    "One POST to the Swarms API runs the whole desk and returns structured output",
    "Token usage, latency and cost per run in Swarms Cloud for audit and chargeback",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "director",
    label: "Director",
    nodes: [{ id: "pm", label: "Research Director", model: "gpt-5.4", says: "split the ticker into macro, fundamentals and tape" }],
  },
  {
    id: "analysts",
    label: "Analysts",
    nodes: [
      { id: "macro", label: "Macro Analyst", model: "gemini-2.5-pro", says: "rates path and FX drag summarised" },
      { id: "equity", label: "Equity Analyst", model: "claude-haiku-5-5", says: "10-K margins and guidance extracted" },
      { id: "quant", label: "Quant Analyst", model: "gpt-5.4-mini", says: "momentum and volume factors scored" },
    ],
  },
  {
    id: "risk",
    label: "Risk",
    nodes: [{ id: "risk", label: "Risk Officer", model: "claude-sonnet-5-5", says: "position capped at 60 bps, stop at 2%" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Equity research desk",
    description: "A director breaks a ticker into macro, fundamentals and price action, three analysts work in parallel, and a risk officer signs off before the memo is returned.",
    swarmType: "HierarchicalSwarm",
    agents: ["Research Director", "Macro Analyst", "Equity Analyst", "Quant Analyst", "Risk Officer"],
    icon: TrendingUp,
  },
  {
    title: "Trade approval committee",
    description: "Several independent reviewers vote on a proposed trade against mandate, liquidity and concentration rules. The majority decision and each dissent are returned.",
    swarmType: "MajorityVoting",
    agents: ["Mandate Reviewer", "Liquidity Reviewer", "Concentration Reviewer"],
    icon: Scale,
  },
  {
    title: "Filing and transcript review",
    description: "Each new 10-Q, 8-K or earnings call is read by agents that extract guidance changes, segment numbers and risk-factor edits, then diff them against the last filing.",
    swarmType: "SequentialWorkflow",
    agents: ["Filing Reader", "Change Extractor", "Diff Writer"],
    icon: FileSearch,
  },
  {
    title: "Portfolio risk review",
    description: "Exposure, factor and scenario agents each review the book on the same snapshot, and an aggregator writes the morning risk note with the breaches on top.",
    swarmType: "MixtureOfAgents",
    agents: ["Exposure Agent", "Factor Agent", "Scenario Agent", "Aggregator"],
    icon: ShieldAlert,
  },
  {
    title: "Credit memo drafting",
    description: "Financial spreading, covenant review and sector context run as separate agents, and a credit officer agent assembles the memo in the house template.",
    swarmType: "SequentialWorkflow",
    agents: ["Spreading Agent", "Covenant Agent", "Sector Agent", "Credit Officer"],
    icon: Landmark,
  },
  {
    title: "Client reporting",
    description: "Performance attribution, market commentary and compliance disclaimers are produced by different agents and merged into a client letter per mandate.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Attribution Agent", "Commentary Agent", "Compliance Agent"],
    icon: BarChart3,
  },
]

const researchDeskPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A hierarchical swarm: the director plans, the analysts work in parallel,
# and the risk officer reviews before anything is returned.
response = client.swarms.run(
    name="Equity Research Desk",
    description="Director-led research on a single ticker with a risk sign-off.",
    swarm_type="HierarchicalSwarm",
    task=(
        "Prepare an investment memo on NVDA ahead of earnings. Cover the macro "
        "backdrop, fundamentals from the latest 10-Q, price and volume action, "
        "and end with a position size and stop level the desk can act on."
    ),
    agents=[
        {
            "agent_name": "Macro Analyst",
            "description": "Rates, FX and sector rotation context.",
            "system_prompt": (
                "You are a macro strategist at a long/short fund. Explain how the "
                "rates path, the dollar and sector flows affect the name. Be specific "
                "and cite the data you rely on."
            ),
            "model_name": "gemini-2.5-pro",
            "max_loops": 1,
        },
        {
            "agent_name": "Equity Analyst",
            "description": "Fundamentals from filings and transcripts.",
            "system_prompt": (
                "You are a sell-side equity analyst. Extract revenue mix, gross margin "
                "trend, guidance changes and capex from the latest filing. Flag anything "
                "that changed since the prior quarter."
            ),
            "model_name": "claude-haiku-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Quant Analyst",
            "description": "Momentum, volume and factor exposure.",
            "system_prompt": (
                "You are a quantitative analyst. Score momentum, relative volume and "
                "factor exposures, and state the technical levels that matter into the print."
            ),
            "model_name": "gpt-5.4-mini",
            "max_loops": 1,
        },
        {
            "agent_name": "Risk Officer",
            "description": "Sizing, limits and stops.",
            "system_prompt": (
                "You are the desk risk officer. Given the analysts' views, propose a "
                "position size in basis points of NAV, a stop level and the mandate "
                "limits that apply. Reject the trade if the setup breaks a limit."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

# The memo, then the usage block billing is computed from.
print(response["output"])
print(response["usage"])`

const researchDeskCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Equity Research Desk",
    "swarm_type": "HierarchicalSwarm",
    "task": "Prepare an investment memo on NVDA ahead of earnings. Cover macro, fundamentals from the latest 10-Q, price and volume action, and end with a position size and stop level.",
    "agents": [
      {
        "agent_name": "Macro Analyst",
        "system_prompt": "You are a macro strategist. Explain how rates, the dollar and sector flows affect the name.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Equity Analyst",
        "system_prompt": "You are an equity analyst. Extract revenue mix, margin trend, guidance and capex from the latest filing.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Quant Analyst",
        "system_prompt": "You are a quant. Score momentum, relative volume and factor exposure and name the levels that matter.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Risk Officer",
        "system_prompt": "You are the desk risk officer. Propose size in bps of NAV, a stop, and the limits that apply. Reject the trade if a limit breaks.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'`

const tradeApprovalTs = `// Trade approval as a vote: three reviewers answer the same question
// independently and the Swarms API returns the majority decision.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Proposal = { ticker: string; side: "buy" | "sell"; notionalUsd: number; adv: number }

const reviewer = (name: string, model: string, rule: string) => ({
  agent_name: name,
  system_prompt:
    \`You review proposed trades for a long/short equity fund. Rule you enforce: \${rule} \` +
    "Answer APPROVE or REJECT on the first line, then one paragraph of reasoning.",
  model_name: model,
  max_loops: 1,
})

export async function approveTrade(p: Proposal) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Trade Approval Committee",
      swarm_type: "MajorityVoting",
      task:
        \`Proposed trade: \${p.side.toUpperCase()} \${p.ticker}, notional $\${p.notionalUsd.toLocaleString()}, \` +
        \`which is \${(p.notionalUsd / p.adv * 100).toFixed(1)}% of average daily volume. Approve or reject.\`,
      agents: [
        reviewer("Mandate Reviewer", "gpt-5.4-mini", "No single name above 5% of NAV and no sector above 25%."),
        reviewer("Liquidity Reviewer", "claude-haiku-5-5", "Notional must stay under 10% of average daily volume."),
        reviewer("Concentration Reviewer", "deepseek-v4-pro", "Reject if the book already holds a correlated position above 3% of NAV."),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)
  const data = await res.json()
  return { decision: data.output, usage: data.usage }
}

approveTrade({ ticker: "NVDA", side: "buy", notionalUsd: 2_400_000, adv: 31_000_000 })
  .then((r) => console.log(r.decision))`

const tradingDeskRust = `use std::env;

use anyhow::Result;
use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

// Three independent reads on the same tape before the open, run concurrently
// in Rust. Each agent stops at <DONE> so the workflow returns as soon as the
// slowest desk has finished.
#[tokio::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();

    let client = OpenAI::from_url(
        env::var("OPENAI_API_BASE").unwrap_or_else(|_| "https://api.openai.com/v1".into()),
        env::var("OPENAI_API_KEY")?,
    )
    .set_model("gpt-5.4");

    let market_analysis = client
        .agent_builder()
        .agent_name("Market Analysis Agent")
        .system_prompt(
            "You are a market analysis specialist on a trading desk. Identify the trend, \\
             key levels and technical indicators in the data you are given. End with <DONE>.",
        )
        .user_name("Trader")
        .max_loops(1)
        .temperature(0.2)
        .add_stop_word("<DONE>")
        .build();

    let trade_strategy = client
        .agent_builder()
        .agent_name("Trade Strategy Agent")
        .system_prompt(
            "You are a trading strategist. Propose entries, exits and position sizing for \\
             the scenario described. Be explicit about invalidation. End with <DONE>.",
        )
        .user_name("Trader")
        .max_loops(1)
        .temperature(0.3)
        .add_stop_word("<DONE>")
        .build();

    let risk_assessment = client
        .agent_builder()
        .agent_name("Risk Assessment Agent")
        .system_prompt(
            "You are the desk risk officer. Quantify downside, liquidity and gap risk and \\
             state the maximum size you would allow. End with <DONE>.",
        )
        .user_name("Trader")
        .max_loops(1)
        .temperature(0.2)
        .add_stop_word("<DONE>")
        .build();

    let workflow = ConcurrentWorkflow::builder()
        .name("Pre-Market Desk")
        .description("Independent market, strategy and risk reads on the same setup.")
        .agents(vec![
            Box::new(market_analysis),
            Box::new(trade_strategy),
            Box::new(risk_assessment),
        ])
        .build();

    let result = workflow
        .run(
            "ES futures are 0.8% below yesterday's close after a hot CPI print. RSI(14) is 34, \\
             volume is 1.6x the 20-day average and the 50-day moving average is 40 points below. \\
             Build a plan for the cash open.",
        )
        .await?;

    for message in &result.history {
        println!("── {} ──\\n{}\\n", message.role, message.content);
    }
    Ok(())
}`

const cloudAuditPython = `import os
import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"]}

# Swarms Cloud keeps the request history for every key, with each run's
# configuration, outcome and token usage. A desk can reconcile model spend per
# strategy or per mandate from the same place it runs, without re-running.
logs = requests.get(f"{BASE}/v1/swarm/logs", headers=HEADERS, timeout=60).json()
metrics = requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json()
credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()


def walk(node, key):
    """Yield every value stored under 'key' anywhere in a nested JSON document."""
    if isinstance(node, dict):
        for k, v in node.items():
            if k == key:
                yield v
            yield from walk(v, key)
    elif isinstance(node, list):
        for item in node:
            yield from walk(item, key)


# Token totals per swarm name, from the usage block each run stores.
tokens_by_swarm: dict[str, int] = {}
for entry in walk(logs, "data"):
    if not isinstance(entry, dict):
        continue
    name = entry.get("name", "unnamed")
    total = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
    tokens_by_swarm[name] = tokens_by_swarm.get(name, 0) + total

for name, total in sorted(tokens_by_swarm.items(), key=lambda kv: -kv[1]):
    print(f"{name:32s} {total:>12,} tokens")

print("completions:", metrics)
print("credit balance:", credits)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "research_desk.py",
    code: researchDeskPython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the whole desk as a HierarchicalSwarm. The director plans, the three analysts work in parallel on different models, and the Risk Officer reviews before the memo is returned with its token usage.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "research_desk.sh",
    code: researchDeskCurl,
    note: "The same desk as a raw HTTP call. The response carries the output, a job_id you can find later in Swarms Cloud, and the usage block that billing is computed from.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "approveTrade.ts",
    code: tradeApprovalTs,
    note: "Trade approval as a MajorityVoting swarm from a Node or edge runtime. Each reviewer enforces one rule on a different model, and the API returns the majority decision, so a disagreement between models shows up as a dissent instead of a single opinion.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Audit",
    file: "audit_spend.py",
    code: cloudAuditPython,
    note: "Swarms Cloud keeps every run with its usage and cost. This script pulls the swarm logs for the account, totals spend per swarm name for chargeback, and prints the remaining credit balance.",
  },
  {
    id: "rust",
    label: "Rust framework",
    file: "pre_market_desk.rs",
    code: tradingDeskRust,
    note: "The same pattern on the Swarms Rust framework (cargo add swarms-rs tokio anyhow dotenv) for teams that want the orchestration inside their own low-latency process. Three agents run concurrently on one Tokio runtime and the history of each is printed when the workflow returns.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Which Swarms API swarm type fits an investment research workflow?",
    a: "HierarchicalSwarm when a director should decompose the task and integrate the analysts' work, ConcurrentWorkflow when you want independent reads on the same data, and MajorityVoting or CouncilAsAJudge when the output is a decision that several reviewers should agree on. All of them take the same agents list, so switching is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Can different agents in the same swarm use different models?",
    a: "Yes. Each agent carries its own model_name, so a cheap fast model can do extraction while a stronger model writes the memo or reviews risk. The Swarms API exposes models from OpenAI, Anthropic, Google, DeepSeek and others under one key, with per-model pricing listed on the pricing page.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "How do we audit what the agents did and what it cost?",
    a: "Every run on the Swarms API is logged in Swarms Cloud with its inputs, each agent's output, token usage, latency and cost. The same data is available over the API from the swarm logs endpoint, so compliance can reconstruct a run and finance can allocate spend by desk or mandate.",
  },
  {
    q: "When should a finance team use the Rust framework instead of the API?",
    a: "Use the Swarms API when you want hosted orchestration, logging and billing without running infrastructure. Use the Rust framework when the agents must live inside a latency-sensitive process you already operate, or when data cannot leave your environment. Both share the same agent and workflow concepts.",
    link: { label: "Swarms Rust framework", href: "/swarms-rs" },
  },
  {
    q: "Do the agents place trades?",
    a: "Not by themselves. The examples on this page return memos, approvals and risk notes as structured output. Order routing stays with your execution systems and whatever controls already govern them. Agents can call tools you provide, so a desk can expose a paper-trading or order-staging tool with its own limits.",
  },
]

export const telemetryName = "equity-research-desk · HierarchicalSwarm"
