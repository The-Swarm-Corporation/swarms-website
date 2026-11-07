import { BookMarked, FileSearch, FolderSearch, Gavel, ListChecks, Scale } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { TelemetryMetric } from "@/components/industries/cloud-telemetry"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Legal",
  description:
    "Contract review against a playbook, clause extraction, legal research with citation checks, memo drafting and due diligence, run as agent teams on the Swarms API with lawyers deciding.",
  bullets: [
    "Playbook rules become system-prompt lines, so flags come back with the rule and the quoted clause",
    "Judges on different models score the draft independently; a split vote is surfaced, never averaged",
    "Per-run logs in Swarms Cloud with the inputs, each agent's output and token usage, keyed by matter",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "drafter",
    label: "Candidate",
    nodes: [{ id: "drafter", label: "Review Drafter", model: "claude-sonnet-5-5", says: "8 clauses reviewed, 4 flags with the quoted text" }],
  },
  {
    id: "judges",
    label: "Judges",
    mode: "parallel",
    nodes: [
      { id: "playbook", label: "Playbook Judge", model: "gpt-5.4", says: "cap flag matches PB-07; non-compete flag missing" },
      { id: "precedent", label: "Precedent Judge", model: "gemini-2.5-pro", says: "cited fallback positions match the clause library" },
      { id: "consistency", label: "Consistency Judge", model: "deepseek-v4-pro", says: "defined terms used consistently, one section cross-reference wrong" },
    ],
  },
  {
    id: "ruling",
    label: "Ruling",
    nodes: [{ id: "ruling", label: "Ruling Writer", model: "claude-opus-5-5", says: "memo written, 5 flags ranked, 1 judge dissent noted" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Contract review against a playbook",
    description: "A drafter reviews every clause against the playbook and quotes the text behind each flag. Three judges score the draft for playbook fit, precedent and internal consistency, and a ruling writer ranks the flags for the reviewing attorney.",
    swarmType: "CouncilAsAJudge",
    agents: ["Review Drafter", "Playbook Judge", "Precedent Judge", "Consistency Judge", "Ruling Writer"],
    icon: Scale,
  },
  {
    title: "Clause extraction and abstraction",
    description: "A locator finds the clauses, an extractor pulls dates, parties, caps and notice periods with the source text, and a writer fills the firm's abstract template. Blank fields stay blank for a paralegal to resolve.",
    swarmType: "SequentialWorkflow",
    agents: ["Clause Locator", "Term Extractor", "Abstract Writer"],
    icon: ListChecks,
  },
  {
    title: "Research memo",
    description: "A question is broken down, researched, analysed and written up as a memo with a citation for every proposition. The memo goes to the citation council below before an associate reads it.",
    swarmType: "HeavySwarm",
    agents: ["Question Agent", "Research Agent", "Analysis Agent", "Synthesis Agent"],
    icon: BookMarked,
  },
  {
    title: "Citation verification",
    description: "Three verifiers independently check each citation in a draft for existence, pin cite and whether it supports the proposition. The majority result and every dissent go to the associate, who confirms against the source.",
    swarmType: "MajorityVoting",
    agents: ["Verifier A", "Verifier B", "Verifier C"],
    icon: Gavel,
  },
  {
    title: "Data room review",
    description: "Planners read the index and queue every agreement with the questions diligence needs answered; workers pull from the queue and abstract each document. The deal team reviews the abstracts and the issues list.",
    swarmType: "PlannerWorkerSwarm",
    agents: ["Index Planner", "Issues Planner", "Abstract Worker", "Abstract Worker"],
    icon: FolderSearch,
  },
  {
    title: "Discovery document routing",
    description: "A router classifies each document and sends it to a responsiveness, privilege-candidate or key-document reviewer. Privilege candidates are only flagged; an attorney makes every privilege determination.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Responsiveness Reviewer", "Privilege Candidate Reviewer", "Key Document Reviewer"],
    icon: FileSearch,
  },
]

const contractCouncilPython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# Council as a judge: the drafter produces the candidate review, the judges
# score it, and the ruling writer writes the memo. Nothing is redlined by agents.
PLAYBOOK = """
PB-03 Term: auto-renewal acceptable only with a 60-day opt-out notice.
PB-05 Termination: we require termination for convenience on 90 days notice.
PB-07 Limitation of liability: cap at 12 months of fees; carve-outs limited to
      confidentiality, IP indemnity, gross negligence and wilful misconduct.
PB-09 Governing law: Delaware or New York preferred; England and Wales acceptable.
PB-11 Non-compete: no non-compete binding on us; employee non-solicit up to 12 months.
PB-12 Data protection: breach notice within 72 hours, sub-processor list on request.
"""

response = client.swarms.run(
    name="Contract Review Council",
    description="Clause-by-clause review against the playbook, scored by judges, written as a memo for the attorney.",
    swarm_type="CouncilAsAJudge",
    task=(
        "Review the attached master services agreement (counterparty paper) "
        "against the playbook. For every clause that departs from a rule, quote "
        "the clause, name the rule and propose a fallback position.\\n\\n"
        + PLAYBOOK
        + "\\n\\nAGREEMENT TEXT:\\n" + open("msa_counterparty_draft.txt").read()
    ),
    agents=[
        {
            "agent_name": "Review Drafter",
            "description": "Produces the candidate clause-by-clause review.",
            "system_prompt": (
                "You are a commercial contracts reviewer. Go through the agreement "
                "clause by clause. For each departure from the playbook, quote the "
                "clause text, cite the playbook rule by id, rate the risk high, "
                "medium or low, and propose a fallback. Say when a clause is silent."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Playbook Judge",
            "description": "Checks the review against the playbook rules.",
            "system_prompt": (
                "Score the review for completeness against the playbook: every rule "
                "that the agreement touches must have a finding. List missed rules "
                "and false flags, each with the clause text."
            ),
            "model_name": "gpt-5.4",  # judges get stronger models than the drafter
            "max_loops": 1,
        },
        {
            "agent_name": "Precedent Judge",
            "description": "Checks fallbacks against the clause library.",
            "system_prompt": (
                "Score the proposed fallbacks against the firm's standard positions "
                "described in the playbook. Flag any fallback that goes beyond what "
                "the playbook allows."
            ),
            "model_name": "gemini-2.5-pro",
            "max_loops": 1,
        },
        {
            "agent_name": "Consistency Judge",
            "description": "Checks defined terms and cross-references.",
            "system_prompt": (
                "Score the review for internal consistency: defined terms used as "
                "defined, section references that resolve, and risk ratings that "
                "match the playbook's severity."
            ),
            "model_name": "deepseek-v4-pro",
            "max_loops": 1,
        },
        {
            "agent_name": "Ruling Writer",
            "description": "Writes the memo from the judges' scores.",
            "system_prompt": (
                "Write the review memo for the supervising attorney: flags ranked by "
                "risk, each with the quoted clause, the rule and the fallback, then "
                "the judges' dissents. This memo is a draft for a lawyer's review."
            ),
            "model_name": "claude-opus-5-5",  # final writing on the strongest model
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

print(response)`

const contractCouncilCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Contract Review Council",
    "description": "Clause-by-clause review against the playbook, scored by judges, written as a memo for the attorney.",
    "swarm_type": "CouncilAsAJudge",
    "task": "Review the master services agreement below against the playbook. PB-07: liability cap at 12 months of fees, carve-outs limited to confidentiality, IP indemnity, gross negligence and wilful misconduct. PB-09: governing law Delaware or New York preferred, England and Wales acceptable. PB-11: no non-compete binding on us. For every departure quote the clause, name the rule and propose a fallback. AGREEMENT TEXT: [paste the agreement here]",
    "agents": [
      {
        "agent_name": "Review Drafter",
        "system_prompt": "You are a commercial contracts reviewer. For each departure from the playbook quote the clause, cite the rule id, rate the risk high, medium or low and propose a fallback. Say when a clause is silent.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Playbook Judge",
        "system_prompt": "Score the review for completeness against the playbook. List missed rules and false flags with the clause text.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Precedent Judge",
        "system_prompt": "Score the proposed fallbacks against the standard positions in the playbook. Flag any fallback that goes beyond what the playbook allows.",
        "model_name": "gemini-2.5-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Consistency Judge",
        "system_prompt": "Score the review for internal consistency: defined terms, section references that resolve, risk ratings that match the playbook severity.",
        "model_name": "deepseek-v4-pro",
        "max_loops": 1
      },
      {
        "agent_name": "Ruling Writer",
        "system_prompt": "Write the review memo for the supervising attorney: flags ranked by risk with the quoted clause, rule and fallback, then the judges dissents. This is a draft for a lawyer to review.",
        "model_name": "claude-opus-5-5",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# "output" is the memo; "usage" has input_tokens, output_tokens and total_tokens.`

const citationCheckTs = `// Citation verification as a vote: three verifiers check each citation
// independently and the Swarms API returns the majority call per citation.
// The associate confirms every citation against the reporter before filing.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type Draft = { matter: string; text: string; citations: string[] }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const VERIFIER_PROMPT =
  "You verify citations in legal drafts. For each citation return one line: the citation, then " +
  "VERIFIED, NEEDS SOURCE or WRONG PIN CITE, then one sentence. VERIFIED means the authority exists, " +
  "the pin cite points at the quoted proposition and the proposition is stated accurately. If you " +
  "cannot confirm existence from the materials you are given, answer NEEDS SOURCE; never guess."

const verifier = (name: string, model: string) => ({
  agent_name: name,
  system_prompt: VERIFIER_PROMPT,
  model_name: model,
  max_loops: 1,
})

export async function checkCitations(draft: Draft): Promise<{ calls: unknown; tokens: number }> {
  const list = draft.citations.map((c, i) => String(i + 1) + ". " + c).join("\\n")

  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "Citation Check " + draft.matter,
      description: "Independent verification of every citation in a draft; majority call per citation.",
      swarm_type: "MajorityVoting",
      task: "Draft text:\\n\\n" + draft.text + "\\n\\nCitations to verify:\\n" + list,
      agents: [
        verifier("Verifier A", "gpt-5.4"), // three different providers, so one model's blind spot is outvoted
        verifier("Verifier B", "claude-sonnet-5-5"),
        verifier("Verifier C", "gemini-2.5-pro"),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  const data = (await res.json()) as SwarmResponse
  return { calls: data.output, tokens: data.usage.total_tokens }
}

// Placeholder parties and reporters; use your own draft and the sources the
// agents should check against.
checkCitations({
  matter: "M-4471",
  text: "A limitation of liability clause is enforced as written between sophisticated parties ...",
  citations: [
    "Northwind Traders v. Contoso Ltd., 412 F.3d 118, 124 (2d Cir. 2005)",
    "Litware, Inc. v. Tailspin Toys, 230 Cal. App. 4th 455, 462 (2014)",
  ],
}).then((r) => console.log(r.calls, r.tokens + " tokens"))`

const nightlyDataRoomPython = `import json
import os

import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# Before the nightly data room run: check the credit balance and that the
# models the swarm needs are available, then submit every agreement as one
# batch. Each item becomes its own run in the account's swarm logs, named
# after the matter and the document.
credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()
models = requests.get(f"{BASE}/v1/models/available", headers=HEADERS, timeout=30).json()
print("credits:", credits)
print("models:", models)

with open("data_room_index.json") as f:
    documents = json.load(f)  # [{"doc_id": "DR-0412", "title": "...", "text": "..."}, ...]

MATTER = "M-4471"

AGENTS = [
    {
        "agent_name": "Clause Locator",
        "system_prompt": (
            "Locate the term, termination, change of control, assignment, "
            "exclusivity, most-favoured-customer and governing law clauses. Return "
            "the section number and the full clause text for each; write ABSENT "
            "when a clause is not present."
        ),
        "model_name": "gemini-2.5-flash",  # fast, long context, cheap across a data room
        "max_loops": 1,
    },
    {
        "agent_name": "Term Extractor",
        "system_prompt": (
            "From the located clauses extract parties, effective date, term end, "
            "renewal mechanics, notice periods, change of control consequences and "
            "exclusivity scope. Quote the source text for every value."
        ),
        "model_name": "claude-haiku-5-5",
        "max_loops": 1,
    },
    {
        "agent_name": "Abstract Writer",
        "system_prompt": (
            "Fill the diligence abstract template from the extracted terms and list "
            "issues for the deal team. Leave fields blank where the extractor found "
            "nothing. A paralegal and an attorney review every abstract."
        ),
        "model_name": "gpt-5.4-mini",
        "max_loops": 1,
    },
]

batch = [
    {
        "name": f"{MATTER} abstract {doc['doc_id']}",
        "description": "Nightly data room abstraction for the deal team's review.",
        "swarm_type": "SequentialWorkflow",
        "task": f"Document {doc['doc_id']}: {doc['title']}\\n\\n{doc['text']}",
        "agents": AGENTS,
        "max_loops": 1,
    }
    for doc in documents
]

results = requests.post(
    f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, json=batch, timeout=900
).json()

os.makedirs("abstracts", exist_ok=True)
for doc, result in zip(documents, results):
    with open(f"abstracts/{doc['doc_id']}.json", "w") as out:
        json.dump(result, out, indent=2)
    print(doc["doc_id"], result.get("usage", {}).get("total_tokens"), "tokens")

print(len(results), "abstracts ready for the deal team")`

const clauseAbstractFramework = `from swarms import Agent, SequentialWorkflow

# The open-source swarms package runs the same pipeline inside your own
# environment, for documents that cannot leave the firm's network.
# pip install swarms

locator = Agent(
    agent_name="Clause Locator",
    system_prompt=(
        "Locate the term, termination, indemnification, limitation of liability, "
        "assignment, governing law, data protection and non-compete clauses. Return "
        "the section number and full clause text for each, or ABSENT."
    ),
    model_name="gemini-2.5-flash",
    max_loops=1,
)

extractor = Agent(
    agent_name="Term Extractor",
    system_prompt=(
        "From the located clauses extract: parties, effective date, initial term, "
        "renewal mechanics, termination rights and notice periods, liability cap and "
        "carve-outs, governing law and forum, breach notice deadline, restrictive "
        "covenants and their duration. Quote the source text for every value."
    ),
    model_name="claude-haiku-5-5",
    max_loops=1,
)

writer = Agent(
    agent_name="Abstract Writer",
    system_prompt=(
        "Fill the firm's contract abstract template from the extracted terms. Leave "
        "a field blank when the extractor found nothing and list it under Open "
        "Items. A paralegal completes the open items and an attorney reviews."
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

workflow = SequentialWorkflow(
    name="Contract Abstract",
    description="Locate, extract and abstract the key terms of one agreement.",
    agents=[locator, extractor, writer],
    max_loops=1,
)

with open("msa_counterparty_draft.txt") as f:
    agreement = f.read()

abstract = workflow.run(
    "Abstract the following master services agreement for the deal file.\\n\\n" + agreement
)
print(abstract)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "contract_council.py",
    code: contractCouncilPython,
    note: "The Python SDK (pip install swarms-client) runs the review as a CouncilAsAJudge: the drafter produces a clause-by-clause review against the playbook, three judges on different models score it independently, and the ruling writer produces the memo. The memo is a draft for the supervising attorney, and nothing is redlined by the agents.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "contract_council.sh",
    code: contractCouncilCurl,
    note: "The same council as a raw HTTP call with the playbook rules inlined in the task. The response carries the memo in output and the usage block, and the run is kept in Swarms Cloud with its configuration, so the matter file can point at the exact run.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "checkCitations.ts",
    code: citationCheckTs,
    note: "Citation verification as a MajorityVoting swarm from a Node service. Three verifiers on three providers check each citation independently and answer NEEDS SOURCE rather than guess; the API returns the majority call, and the associate confirms every citation against the reporter before anything is filed.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Nightly batch",
    file: "nightly_data_room.py",
    code: nightlyDataRoomPython,
    note: "A credit and model availability check, then the whole data room as one request to /v1/swarm/batch/completions. Every document becomes its own logged run named after the matter, and the abstracts are written to disk for the deal team's morning review.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "contract_abstract.py",
    code: clauseAbstractFramework,
    note: "The same locate, extract and abstract pipeline on the open-source swarms package, running in your own process. Suited to documents that cannot leave the firm's network; the Swarms API is the fit when you want hosted logging and billing per matter.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Do the agents give legal advice or make the final call on a contract?",
    a: "No. The agents flag departures from your playbook with the quoted clause and a proposed fallback, score each other's work and write a memo. The reviewing attorney decides what to redline, what to accept and what to escalate. The prompts in the examples say the output is a draft for a lawyer's review, and no agent edits the agreement.",
  },
  {
    q: "How does the council stop a fabricated citation reaching a filing?",
    a: "Three ways. The verifiers are told to answer NEEDS SOURCE when they cannot confirm a citation from the materials they are given, instead of guessing. They run independently on models from different providers, so one model's confident error is outvoted and surfaced as a dissent. And the associate confirms every citation against the reporter: the council reduces the work of checking, it does not replace it.",
  },
  {
    q: "How do we turn our playbook into something the agents follow?",
    a: "Each playbook rule becomes a line in a system prompt or in the task text, with its id, the acceptable position and the fallbacks. The drafter cites the rule id on every flag, and the playbook judge scores the review against the full list, so a rule the drafter missed shows up as a judge finding. The table on this page shows three rules written both ways.",
  },
  {
    q: "How is privileged or confidential material handled?",
    a: "Send the agents the documents a matter needs and nothing more, and keep privilege determinations with the attorney: the discovery routing use case only flags privilege candidates. The Swarms API keeps a per-run log of the request, each agent's output and usage, so the firm can see exactly what was sent on each matter. Firms with engagement terms or outside counsel guidelines that constrain data handling should talk to us before sending client material, and the open-source swarms package runs the same patterns inside the firm's network.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    q: "Which swarm type fits which legal task?",
    a: "CouncilAsAJudge when a draft should be scored by independent judges before a lawyer reads it, MajorityVoting when each item needs an agreed call (citations, responsiveness), SequentialWorkflow for locate, extract and abstract pipelines, HeavySwarm for research memos, and PlannerWorkerSwarm when a data room index has to be turned into a queue of documents. All of them take the same agents list.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
]

export const telemetryName = "contract-review-council · CouncilAsAJudge"

export const telemetryMetrics: TelemetryMetric[] = [
  { label: "Agreements / hour", min: 6, max: 28, unit: "int", seed: 23 },
  { label: "p50 latency", min: 8.2, max: 21.5, unit: "seconds", seed: 25 },
  { label: "Tokens / min", min: 60_000, max: 220_000, unit: "compact", seed: 27 },
  { label: "Spend / hour", min: 2.4, max: 9.8, unit: "usd", seed: 29 },
]
