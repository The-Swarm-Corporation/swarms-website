import { BookOpenCheck, ClipboardCheck, Crosshair, FlaskConical, Gavel, ShieldAlert } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Life Sciences",
  description:
    "Literature review, screening hit triage, pathway and safety context, trial document drafting and regulatory summaries, run as agent teams on the Swarms API.",
  bullets: [
    "Specialists on the models that suit each job, long-context models for papers, fast ones for plate data",
    "One POST to the Swarms API runs every specialist and the aggregator and returns a sourced brief",
    "Per-run logs with inputs, each agent's output and token usage, keyed by project or plate",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "specialists",
    label: "Specialists",
    mode: "parallel",
    nodes: [
      { id: "lit", label: "Literature Agent", model: "gemini-2.5-pro", says: "14 papers screened, 6 with primary data on the target" },
      { id: "assay", label: "Assay Agent", model: "gpt-5.4-mini", says: "plate 17: 4 hits above 3 SD, Z' 0.71" },
      { id: "pathway", label: "Pathway Agent", model: "deepseek-v4-pro", says: "two downstream nodes shared with a known liability" },
      { id: "tox", label: "Tox Agent", model: "claude-haiku-5-5", says: "no class alerts; hERG data absent, flagged" },
    ],
  },
  {
    id: "aggregator",
    label: "Aggregator",
    nodes: [{ id: "agg", label: "Aggregator", model: "claude-sonnet-5-5", says: "brief written, 11 claims each cited to a paper or a plate" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Target triage",
    description: "Literature, assay, pathway and toxicology agents review the same target in parallel and an aggregator writes a brief in which every claim points to a paper or a plate. The project team decides whether the target advances.",
    swarmType: "MixtureOfAgents",
    agents: ["Literature Agent", "Assay Agent", "Pathway Agent", "Tox Agent", "Aggregator"],
    icon: Crosshair,
  },
  {
    title: "Literature review and evidence tables",
    description: "Retrieved abstracts are screened against inclusion criteria, included papers are read in full, and findings are extracted into an evidence table with the quoted passage for each cell. A scientist resolves the borderline calls.",
    swarmType: "SequentialWorkflow",
    agents: ["Abstract Screener", "Full-text Reviewer", "Evidence Extractor"],
    icon: BookOpenCheck,
  },
  {
    title: "Screening plate review",
    description: "A plate QC agent, a dose-response agent and an artifact flagger each read the same plate export at once. The outputs come back together so the screening scientist confirms hits with the QC and artifact notes beside them.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Plate QC Agent", "Dose-response Agent", "Artifact Flagger"],
    icon: FlaskConical,
  },
  {
    title: "Protocol drafting",
    description: "A director splits a synopsis into endpoints, eligibility, schedule of assessments and statistics sections, writers draft each in parallel, and the director assembles the protocol for the medical monitor and biostatistician to review.",
    swarmType: "HierarchicalSwarm",
    agents: ["Protocol Director", "Endpoints Writer", "Eligibility Writer", "Statistics Writer"],
    icon: ClipboardCheck,
  },
  {
    title: "Adverse event narrative review",
    description: "Three reviewers independently propose seriousness and expectedness for each case narrative. The majority proposal and every dissent go to the pharmacovigilance physician, who makes the assessment.",
    swarmType: "MajorityVoting",
    agents: ["AE Reviewer A", "AE Reviewer B", "AE Reviewer C"],
    icon: ShieldAlert,
  },
  {
    title: "Regulatory document QC",
    description: "Judge agents check a clinical study report section against the protocol and the statistical analysis plan for mismatched numbers, endpoints and definitions, and an aggregator writes the findings list for medical writing.",
    swarmType: "CouncilAsAJudge",
    agents: ["Numbers Judge", "Endpoints Judge", "Definitions Judge", "Aggregator"],
    icon: Gavel,
  },
]

const targetTriagePython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A mixture of agents: every specialist answers the same question in
# parallel, then the aggregator writes one brief from all of their outputs.
# The brief is input to the project team's decision, not the decision.
response = client.swarms.run(
    name="Target Triage",
    description="Parallel literature, assay, pathway and tox reads on one target, aggregated into a sourced brief.",
    swarm_type="MixtureOfAgents",
    task=(
        "Target: a kinase implicated in a fibrotic indication. Attached context: "
        "14 abstracts from the last three years, the primary screen summary for "
        "plate 17 (384 compounds, 4 hits above 3 SD, Z-prime 0.71) and the "
        "pathway map. Should this target advance to hit confirmation? Give the "
        "evidence for and against, with a source for every claim."
    ),
    agents=[
        {
            "agent_name": "Literature Agent",
            "description": "Reads the abstracts and reports primary findings.",
            "system_prompt": (
                "You are a literature scientist. For each paper, state whether it "
                "contains primary data on the target, the model system, the effect "
                "size reported and any contradiction with other papers. Cite the "
                "paper for every statement."
            ),
            "model_name": "gemini-2.5-pro",  # long context for a stack of papers
            "max_loops": 1,
        },
        {
            "agent_name": "Assay Agent",
            "description": "Reads the screen summary.",
            "system_prompt": (
                "You are a screening scientist. Report plate quality (Z-prime, "
                "control separation), the hits and their effect relative to "
                "controls, and any pattern that suggests an artifact. Hits are "
                "candidates until a scientist confirms them."
            ),
            "model_name": "gpt-5.4-mini",  # tabular data, a fast model is enough
            "max_loops": 1,
        },
        {
            "agent_name": "Pathway Agent",
            "description": "Places the target in its pathway context.",
            "system_prompt": (
                "You are a systems biologist. Describe the target's upstream and "
                "downstream nodes, redundancy, and any node shared with a known "
                "liability. Separate what the map shows from what you infer."
            ),
            "model_name": "deepseek-v4-pro",
            "max_loops": 1,
        },
        {
            "agent_name": "Tox Agent",
            "description": "Flags safety signals and missing data.",
            "system_prompt": (
                "You are a toxicologist. List class-level alerts, known on-target "
                "liabilities and the safety data that is missing from the packet. "
                "Say clearly when there is no data rather than guessing."
            ),
            "model_name": "claude-haiku-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Aggregator",
            "description": "Writes the brief from the specialists' outputs.",
            "system_prompt": (
                "You write target triage briefs for a project team. Combine the "
                "specialists' outputs into evidence for, evidence against and open "
                "questions. Every claim carries its source. End with the data the "
                "team would need before a decision, not with a recommendation."
            ),
            "model_name": "claude-sonnet-5-5",  # final writing on a stronger model
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const targetTriageCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Target Triage",
    "description": "Parallel literature, assay, pathway and tox reads on one target, aggregated into a sourced brief.",
    "swarm_type": "MixtureOfAgents",
    "task": "Target: a kinase implicated in a fibrotic indication. Context: 14 abstracts from the last three years, the primary screen summary for plate 17 (384 compounds, 4 hits above 3 SD, Z-prime 0.71) and the pathway map. Should this target advance to hit confirmation? Give evidence for and against with a source for every claim.",
    "agents": [
      {
        "agent_name": "Literature Agent",
        "system_prompt": "You are a literature scientist. For each paper state whether it has primary data on the target, the model system, the effect size and any contradiction with other papers. Cite the paper for every statement.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Assay Agent",
        "system_prompt": "You are a screening scientist. Report plate quality, the hits and their effect relative to controls, and any pattern that suggests an artifact. Hits are candidates until a scientist confirms them.",
        "model_name": "gpt-5.4-mini",
        "max_loops": 1
      },
      {
        "agent_name": "Pathway Agent",
        "system_prompt": "You are a systems biologist. Describe upstream and downstream nodes, redundancy, and nodes shared with a known liability. Separate what the map shows from what you infer.",
        "model_name": "deepseek-v4-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Tox Agent",
        "system_prompt": "You are a toxicologist. List class-level alerts, known on-target liabilities and the safety data missing from the packet. Say when there is no data rather than guessing.",
        "model_name": "claude-haiku-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Aggregator",
        "system_prompt": "You write target triage briefs. Combine the specialists into evidence for, evidence against and open questions, every claim with its source. End with the data needed before a decision, not a recommendation.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# "output" holds the brief; "usage" holds input_tokens, output_tokens and
# total_tokens for the whole run, which Swarms Cloud also keeps in the log.`

const literatureTriageTs = `// Literature triage as a pipeline: screen abstracts against the criteria,
// read the included papers, extract an evidence table. A scientist settles
// the borderline calls the screener marks as UNSURE.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Abstract = { id: string; title: string; text: string }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const CRITERIA =
  "Include: primary data, in vivo or human, on the target in a fibrotic model. " +
  "Exclude: reviews, in silico only, non-mammalian models."

export async function triageLiterature(abstracts: Abstract[]): Promise<SwarmResponse> {
  const corpus = abstracts.map((a) => "[" + a.id + "] " + a.title + "\\n" + a.text).join("\\n\\n")

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Literature Triage",
      description: "Abstract screen, full-text review and evidence extraction with sources.",
      swarm_type: "SequentialWorkflow",
      task: "Criteria: " + CRITERIA + "\\n\\nAbstracts:\\n\\n" + corpus,
      agents: [
        {
          agent_name: "Abstract Screener",
          system_prompt:
            "Screen each abstract against the criteria. Return one line per id: INCLUDE, EXCLUDE or UNSURE, " +
            "then the criterion that decided it. UNSURE goes to a scientist; never guess.",
          model_name: "gemini-2.5-flash", // many short abstracts, a fast model is enough
          max_loops: 1,
        },
        {
          agent_name: "Full-text Reviewer",
          system_prompt:
            "For each INCLUDE, summarise model system, intervention, endpoint, effect size and n, " +
            "quoting the passage each value comes from. Mark values you cannot find as NOT REPORTED.",
          model_name: "gemini-2.5-pro", // long context for the full texts
          max_loops: 1,
        },
        {
          agent_name: "Evidence Extractor",
          system_prompt:
            "Build a markdown evidence table: paper id, model, intervention, endpoint, effect, n, quote. " +
            "One row per finding. Do not fill cells that the reviewer marked NOT REPORTED.",
          model_name: "claude-haiku-5-5",
          max_loops: 1,
        },
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  return (await res.json()) as SwarmResponse
}

triageLiterature([
  { id: "P-001", title: "Kinase inhibition reduces collagen deposition in a bleomycin model", text: "..." },
  { id: "P-002", title: "A review of kinase signalling in fibrosis", text: "..." },
  { id: "P-003", title: "Docking study of kinase ligands", text: "..." },
]).then((r) => console.log(r.output, r.usage.total_tokens + " tokens"))`

const runRecordPython = `import json
import os
from pathlib import Path

import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"]}

# Swarms Cloud keeps the request history for the key: each run's configuration,
# outcome and usage. A lab can file that history next to the plate or project
# it belongs to, so the brief a team read is reproducible from its inputs.
logs = requests.get(f"{BASE}/v1/swarm/logs", headers=HEADERS, timeout=60).json()
metrics = requests.get(f"{BASE}/v1/metrics/summary", headers=HEADERS, timeout=30).json()

records = Path("run_records")
records.mkdir(exist_ok=True)
(records / "swarm_logs.json").write_text(json.dumps(logs, indent=2))
(records / "metrics_summary.json").write_text(json.dumps(metrics, indent=2))


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


# Runs and token totals per swarm name, so a project can see what its
# triage, literature and QC swarms cost over the period.
runs_by_name: dict[str, int] = {}
tokens_by_name: dict[str, int] = {}
for entry in walk(logs, "data"):
    if not isinstance(entry, dict):
        continue
    name = entry.get("name", "unnamed")
    runs_by_name[name] = runs_by_name.get(name, 0) + 1
    total = sum(int(t) for t in walk(entry, "total_tokens") if isinstance(t, (int, float)))
    tokens_by_name[name] = tokens_by_name.get(name, 0) + total

for name in sorted(runs_by_name, key=lambda n: -tokens_by_name[n]):
    print(f"{name:28s} {runs_by_name[name]:>5} runs {tokens_by_name[name]:>12,} tokens")

print("summary:", metrics)
print("saved to", records.resolve())`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "target_triage.py",
    code: targetTriagePython,
    note: "The Python SDK (pip install swarms-client) runs the triage as a MixtureOfAgents: four specialists read the same packet in parallel on models chosen for their job, and the aggregator writes a brief in which every claim is sourced. The brief ends with the data the team needs, and the team decides.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "target_triage.sh",
    code: targetTriageCurl,
    note: "The same swarm as a raw HTTP call. The response carries the brief in output and the usage block, and the run is kept in Swarms Cloud with its configuration so the brief can be reproduced from its inputs.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "triageLiterature.ts",
    code: literatureTriageTs,
    note: "Literature triage as a SequentialWorkflow from a Node service: a fast model screens abstracts against the inclusion criteria, a long-context model reads the included papers, and an extractor builds the evidence table with a quote per cell. UNSURE calls go to a scientist.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Run records",
    file: "run_records.py",
    code: runRecordPython,
    note: "Pulls the account's swarm logs and metrics summary, files them with the project's run records, and totals runs and tokens per swarm name. The history is the same one Swarms Cloud shows, so what a team read can be traced to the exact inputs the agents received.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Do the agents decide which targets or hits advance?",
    a: "No. The specialists report what the papers, plates and maps show, and the aggregator writes a sourced brief that ends with open questions and the data still needed. The project team decides whether a target advances, the screening scientist confirms hits, and the medical monitor and biostatistician sign protocol content. The prompts in the examples say so.",
  },
  {
    q: "Why MixtureOfAgents for target triage rather than a pipeline?",
    a: "Because the literature, assay, pathway and tox reads are independent: none of them needs another's output to start, so they should run in parallel and be combined once. A SequentialWorkflow fits when each step builds on the previous one, such as screen, read, extract for literature. Both take the same agents list, so changing the pattern is a one-field change.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "How are claims kept traceable to their source?",
    a: "By instruction and by logging. Each specialist's prompt requires a citation, a plate id or a quoted passage for every statement, and the aggregator is told to keep those sources on every claim. The run log in Swarms Cloud holds the exact packet each agent saw and what it returned, so a reviewer can check a claim against the input months later.",
  },
  {
    q: "Which models should read papers, and which should read plate data?",
    a: "Each agent sets its own model_name. Long-context models suit a stack of full texts, fast inexpensive models suit tabular plate exports and short abstracts, and a stronger model is worth the cost for the final written brief or a judging role. The examples on this page mix them on that basis, and pricing is per model.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "Can we keep proprietary compound and sequence data out of the request?",
    a: "Yes. Send the agents the derived data they need (plate statistics, anonymised compound ids, the pathway map) and keep structures and sequences in your own systems. The open-source swarms package runs the same patterns in your own environment when nothing can leave it. Teams with contractual requirements on data handling should talk to us before sending confidential material.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
]

export const telemetryName = "target-triage · MixtureOfAgents"
