import { Activity, ClipboardList, FileCheck2, Inbox, Pill, Stethoscope } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { TelemetryMetric } from "@/components/industries/cloud-telemetry"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Healthcare",
  description:
    "Intake triage, visit documentation, medical coding, prior authorization drafts and discharge packets, run as agent teams on the Swarms API with clinicians deciding.",
  bullets: [
    "Agents propose acuity, note sections and codes; the triage nurse, physician and coder decide",
    "One POST to the Swarms API runs the whole pipeline and returns a draft for review",
    "Per-run logs in Swarms Cloud so every draft can be traced back to what the agents saw",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "intake",
    label: "Intake",
    nodes: [{ id: "reader", label: "Intake Reader", model: "gemini-2.5-flash", says: "complaint, vitals and history pulled from the intake form" }],
  },
  {
    id: "triage",
    label: "Triage",
    nodes: [{ id: "triage", label: "Triage Agent", model: "gpt-5.4", says: "proposes ESI 3 with two red flags for the nurse" }],
  },
  {
    id: "documentation",
    label: "Documentation",
    nodes: [{ id: "drafter", label: "Note Drafter", model: "claude-sonnet-5-5", says: "HPI, exam and assessment drafted, gaps marked for the clinician" }],
  },
  {
    id: "coding",
    label: "Coding",
    nodes: [{ id: "coder", label: "Coding Agent", model: "gpt-4.1-mini", says: "three ICD-10 candidates listed with the supporting text" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Emergency intake triage",
    description: "An intake reader extracts complaint, vitals and history, a triage agent proposes an acuity level with the findings that drove it, and a handoff writer formats the summary the triage nurse sees before assigning the level.",
    swarmType: "SequentialWorkflow",
    agents: ["Intake Reader", "Triage Agent", "Handoff Writer"],
    icon: Activity,
  },
  {
    title: "Visit documentation",
    description: "A transcript or dictation is cleaned, split into HPI, ROS, exam, assessment and plan, and drafted in the note template. Missing elements are flagged rather than filled in, and the clinician edits and signs.",
    swarmType: "SequentialWorkflow",
    agents: ["Transcript Cleaner", "Section Extractor", "Note Drafter"],
    icon: ClipboardList,
  },
  {
    title: "ICD-10 coding assist",
    description: "Three coding agents on different models read the signed note independently and propose codes. Codes the majority agrees on go to the certified coder with the dissents attached, so a disagreement is visible instead of averaged away.",
    swarmType: "MajorityVoting",
    agents: ["Coder A", "Coder B", "Coder C"],
    icon: FileCheck2,
  },
  {
    title: "Prior authorization packets",
    description: "A policy reader and a chart summarizer run at the same time, then a letter drafter writes the medical necessity letter against the payer's criteria. The physician reviews and signs before anything is sent.",
    swarmType: "AgentRearrange",
    agents: ["Policy Reader", "Chart Summarizer", "Letter Drafter"],
    icon: Stethoscope,
  },
  {
    title: "Discharge summaries and instructions",
    description: "A summary agent, a medication reconciliation agent and a plain-language writer each work from the same encounter record, and the outputs are returned together for the discharging clinician to approve.",
    swarmType: "ConcurrentWorkflow",
    agents: ["Summary Agent", "Medication Reconciler", "Plain-language Writer"],
    icon: Pill,
  },
  {
    title: "Patient message routing",
    description: "A router classifies each portal message and hands it to a refill, scheduling or clinical-question specialist that drafts a reply. Clinical replies are queued for a nurse; nothing is sent to the patient by an agent.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Refill Specialist", "Scheduling Specialist", "Clinical Question Specialist"],
    icon: Inbox,
  },
]

const intakePipelinePython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# A sequential workflow: each agent receives the previous agent's output.
# Send de-identified text only. Every output is a draft for a clinician.
response = client.swarms.run(
    name="ED Intake Pipeline",
    description="Intake summary, proposed acuity, draft note and candidate codes for clinician review.",
    swarm_type="SequentialWorkflow",
    task=(
        "Intake form, de-identified. 54-year-old, chest tightness for 2 hours "
        "while climbing stairs, now resolved at rest. History: hypertension, "
        "smoker. Vitals: HR 96, BP 152/94, SpO2 97%, temp 37.1 C. Takes "
        "amlodipine. No allergies recorded."
    ),
    agents=[
        {
            "agent_name": "Intake Reader",
            "description": "Structures the raw intake form.",
            "system_prompt": (
                "You read emergency department intake forms. Return the chief "
                "complaint, onset and duration, vitals, relevant history and "
                "medications as labelled fields. Do not add anything that is not "
                "in the form."
            ),
            "model_name": "gemini-2.5-flash",  # fast extraction, no reasoning needed
            "max_loops": 1,
        },
        {
            "agent_name": "Triage Agent",
            "description": "Proposes an acuity level for the triage nurse.",
            "system_prompt": (
                "You support emergency triage nurses. From the structured intake, "
                "propose an Emergency Severity Index level from 1 to 5 and list the "
                "specific findings that drove it, including any red flags. State "
                "plainly that the triage nurse assigns the final level."
            ),
            "model_name": "gpt-5.4",  # stronger model for the judgement call
            "max_loops": 1,
        },
        {
            "agent_name": "Note Drafter",
            "description": "Drafts the visit note sections.",
            "system_prompt": (
                "You draft emergency visit notes for a physician to edit and sign. "
                "Write HPI, pertinent history, vitals and an assessment that lists "
                "differentials to consider, never a diagnosis. Mark every missing "
                "element as [CLINICIAN TO COMPLETE]."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Coding Agent",
            "description": "Lists candidate ICD-10-CM codes.",
            "system_prompt": (
                "You assist certified medical coders. From the draft note, list up "
                "to three candidate ICD-10-CM codes with the exact note text that "
                "supports each and a confidence from 0 to 1. The coder selects the "
                "final codes."
            ),
            "model_name": "gpt-4.1-mini",
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

# The whole response: the draft package plus the usage block.
print(response)`

const intakePipelineCurl = `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "ED Intake Pipeline",
    "description": "Intake summary, proposed acuity, draft note and candidate codes for clinician review.",
    "swarm_type": "SequentialWorkflow",
    "task": "Intake form, de-identified. 54-year-old, chest tightness for 2 hours while climbing stairs, now resolved at rest. History: hypertension, smoker. Vitals: HR 96, BP 152/94, SpO2 97%, temp 37.1 C. Takes amlodipine. No allergies recorded.",
    "agents": [
      {
        "agent_name": "Intake Reader",
        "system_prompt": "You read emergency department intake forms. Return the chief complaint, onset, vitals, relevant history and medications as labelled fields. Do not add anything that is not in the form.",
        "model_name": "gemini-2.5-flash",
        "max_loops": 1
      },
      {
        "agent_name": "Triage Agent",
        "system_prompt": "You support emergency triage nurses. Propose an ESI level from 1 to 5 and list the findings that drove it, including red flags. The triage nurse assigns the final level.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Note Drafter",
        "system_prompt": "You draft emergency visit notes for a physician to edit and sign. Write HPI, history, vitals and an assessment listing differentials to consider, never a diagnosis. Mark missing elements as [CLINICIAN TO COMPLETE].",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Coding Agent",
        "system_prompt": "You assist certified medical coders. List up to three candidate ICD-10-CM codes with the supporting note text and a confidence from 0 to 1. The coder selects the final codes.",
        "model_name": "gpt-4.1-mini",
        "max_loops": 1
      }
    ],
    "max_loops": 1
  }'

# The response JSON carries "output" (the draft package, agent by agent)
# and "usage" with input_tokens, output_tokens and total_tokens. The run
# also appears in Swarms Cloud under the name above.`

const codingVoteTs = `// ICD-10 coding assist as a vote: three coders on different models read the
// signed note independently and the Swarms API returns the majority result.
// The certified coder sees the majority codes and every dissent.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type SignedNote = { encounterId: string; setting: "outpatient" | "emergency" | "inpatient"; text: string }

type SwarmResponse = {
  output: unknown
  usage: { input_tokens: number; output_tokens: number; total_tokens: number }
}

const CODER_PROMPT =
  "You assist certified medical coders. Read the signed note and list the ICD-10-CM codes it " +
  "supports, one per line as CODE | description | supporting text quoted from the note. " +
  "Do not infer conditions that are not documented. The coder makes the final selection."

const coder = (name: string, model: string) => ({
  agent_name: name,
  system_prompt: CODER_PROMPT,
  model_name: model,
  max_loops: 1,
})

export async function proposeCodes(note: SignedNote): Promise<{ codes: unknown; tokens: number }> {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: "ICD-10 Coding Vote",
      description: "Independent coding proposals, majority codes to the coder queue.",
      swarm_type: "MajorityVoting",
      task: "Encounter " + note.encounterId + " (" + note.setting + "). Signed note follows.\\n\\n" + note.text,
      agents: [
        coder("Coder A", "gpt-4.1-mini"), // three cheap, fast models: the value is in the agreement
        coder("Coder B", "claude-haiku-5-5"),
        coder("Coder C", "gemini-2.5-flash"),
      ],
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error("Swarms API " + res.status + ": " + (await res.text()))
  const data = (await res.json()) as SwarmResponse
  return { codes: data.output, tokens: data.usage.total_tokens }
}

// De-identified example. Real notes stay inside your environment until you
// have a data handling agreement that covers them.
proposeCodes({
  encounterId: "ENC-2291",
  setting: "outpatient",
  text:
    "Follow-up for type 2 diabetes. Reports polyuria for two weeks. A1c today 9.4%, up from 7.8%. " +
    "Continues metformin 1000 mg twice daily. Feet examined, no ulcers. Plan: add empagliflozin, " +
    "recheck A1c in 3 months.",
}).then((r) => console.log(r.codes, r.tokens + " tokens"))`

const nightlyBatchPython = `import json
import os

import requests

BASE = "https://api.swarms.world"
HEADERS = {"x-api-key": os.environ["SWARMS_API_KEY"], "Content-Type": "application/json"}

# The documentation backlog from the day, de-identified before it leaves
# the record system. One batch request runs the same pipeline on every item
# and each run lands in the account's swarm logs for the coding team to review.
with open("backlog_deidentified.jsonl") as f:
    encounters = [json.loads(line) for line in f]

AGENTS = [
    {
        "agent_name": "Section Extractor",
        "system_prompt": (
            "Split the dictation into HPI, ROS, exam, assessment and plan. Quote "
            "the dictation; do not add content. Mark absent sections as MISSING."
        ),
        "model_name": "claude-haiku-5-5",  # cheap extraction across a large batch
        "max_loops": 1,
    },
    {
        "agent_name": "Note Drafter",
        "system_prompt": (
            "Draft the visit note from the extracted sections in the clinic's "
            "template. Leave MISSING sections as [CLINICIAN TO COMPLETE]. The "
            "clinician edits and signs."
        ),
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1,
    },
    {
        "agent_name": "Coding Agent",
        "system_prompt": (
            "List up to three candidate ICD-10-CM codes with supporting text and "
            "a confidence from 0 to 1. The certified coder selects the final codes."
        ),
        "model_name": "gpt-4.1-mini",
        "max_loops": 1,
    },
]

batch = [
    {
        "name": f"Documentation backlog {enc['encounter_id']}",
        "description": "Nightly documentation and coding drafts for review.",
        "swarm_type": "SequentialWorkflow",
        "task": enc["dictation"],
        "agents": AGENTS,
        "max_loops": 1,
    }
    for enc in encounters
]

# Check the balance before a large run so the batch does not stop halfway.
credits = requests.get(f"{BASE}/v1/account/credits", headers=HEADERS, timeout=30).json()
print("credits:", credits)

results = requests.post(
    f"{BASE}/v1/swarm/batch/completions", headers=HEADERS, json=batch, timeout=600
).json()

for enc, result in zip(encounters, results):
    usage = result.get("usage", {})
    print(enc["encounter_id"], usage.get("total_tokens"), "tokens")
    with open(f"drafts/{enc['encounter_id']}.json", "w") as out:
        json.dump(result, out, indent=2)

print(len(results), "drafts queued for clinician and coder review")`

const dischargeFramework = `from swarms import Agent, ConcurrentWorkflow

# The open-source swarms package runs the same pattern in your own process,
# which suits teams whose encounter data cannot leave their network.
# pip install swarms

summary = Agent(
    agent_name="Summary Agent",
    system_prompt=(
        "You draft hospital discharge summaries for the discharging physician to "
        "edit and sign. Cover reason for admission, hospital course, condition at "
        "discharge and follow-up. Quote the record; mark gaps as [CLINICIAN TO COMPLETE]."
    ),
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

med_rec = Agent(
    agent_name="Medication Reconciler",
    system_prompt=(
        "Compare the admission medication list with the discharge list. Return a "
        "table of continued, changed, new and stopped medications with the record "
        "text that supports each row. Flag any conflict for the pharmacist."
    ),
    model_name="gpt-4.1-mini",
    max_loops=1,
)

instructions = Agent(
    agent_name="Plain-language Writer",
    system_prompt=(
        "Write patient discharge instructions at a sixth-grade reading level: what "
        "happened, medicines to take, warning signs that mean call or return, and "
        "appointments. Do not add medical advice beyond the record."
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

workflow = ConcurrentWorkflow(
    name="Discharge Packet",
    description="Summary, medication reconciliation and patient instructions from one record.",
    agents=[summary, med_rec, instructions],
    max_loops=1,
)

record = """
De-identified. 67-year-old admitted with community-acquired pneumonia, right
lower lobe. Treated with IV ceftriaxone and azithromycin, afebrile by day 2,
oxygen weaned by day 3. Admission meds: lisinopril 10 mg, atorvastatin 40 mg.
Discharge meds: lisinopril 10 mg, atorvastatin 40 mg, amoxicillin-clavulanate
875/125 mg twice daily for 5 days. Follow-up with primary care in one week.
"""

packet = workflow.run(record)
print(packet)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "intake_pipeline.py",
    code: intakePipelinePython,
    note: "The Python SDK (pip install swarms-client) sends one request that runs the pipeline as a SequentialWorkflow: a fast model structures the intake form, a stronger model proposes the acuity level, the note is drafted with gaps marked, and candidate codes are listed. Everything returned is a draft for the triage nurse, physician and coder.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "intake_pipeline.sh",
    code: intakePipelineCurl,
    note: "The same pipeline as a raw HTTP call. The response carries the output and the usage block, and the run appears in your Swarms Cloud logs with its configuration so a reviewer can see exactly what each agent received.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "proposeCodes.ts",
    code: codingVoteTs,
    note: "Coding assist as a MajorityVoting swarm from a Node service. Three inexpensive models code the signed note independently, the API returns the majority result, and the coder reviews the agreed codes with every dissent visible.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Batch",
    file: "nightly_backlog.py",
    code: nightlyBatchPython,
    note: "The day's documentation backlog as one batch request to /v1/swarm/batch/completions, after a credit check. Each item becomes its own logged run with its own usage, and the drafts are written to disk for the morning review queue.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "discharge_packet.py",
    code: dischargeFramework,
    note: "The same agents on the open-source swarms package, running in your own process as a ConcurrentWorkflow. Useful when encounter data cannot leave your network; the Swarms API is the fit when you want hosted logging and billing.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Do the agents diagnose patients or assign acuity levels?",
    a: "No. The agents on this page extract, summarize, propose and draft. The triage nurse assigns the acuity level, the physician edits and signs the note, and the certified coder selects the codes. The prompts in the examples say so explicitly, and the outputs mark missing information for a clinician to complete rather than filling it in.",
  },
  {
    q: "How should protected health information be handled?",
    a: "Send the agents only what they need, de-identify where the workflow allows it, and keep the identified record in your own systems. The Swarms API keeps a per-run log of the request, each agent's output and usage so your privacy team can see exactly what was sent. Teams with contractual requirements around data handling and deployment should talk to us before sending any patient data.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    q: "Which swarm type fits clinical documentation?",
    a: "SequentialWorkflow when each step depends on the one before it (clean, extract, draft, code). ConcurrentWorkflow when several documents come from one record, such as a discharge summary, a medication reconciliation and patient instructions. MajorityVoting when the output is a proposal several independent agents should agree on, such as candidate codes.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Can different steps use different models?",
    a: "Yes. Each agent carries its own model_name. A fast, inexpensive model is enough to structure an intake form or split a dictation into sections, and a stronger model is worth paying for when the step involves judgement, such as proposing acuity or drafting the assessment. The examples on this page mix models for that reason.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "How do we review what an agent did on a specific encounter?",
    a: "Every run is logged in Swarms Cloud with its configuration, the task text, each agent's output and token usage, and the same history is available from the swarm logs endpoint. Name each run after the encounter, as the batch example does, and a reviewer can pull the full record for any draft without re-running it.",
  },
]

export const telemetryName = "ed-intake-pipeline · SequentialWorkflow"

export const telemetryMetrics: TelemetryMetric[] = [
  { label: "Encounters / hour", min: 24, max: 96, unit: "int", seed: 13 },
  { label: "p50 latency", min: 2.1, max: 6.4, unit: "seconds", seed: 15 },
  { label: "Tokens / min", min: 30_000, max: 120_000, unit: "compact", seed: 17 },
  { label: "Drafts awaiting review", min: 4, max: 38, unit: "int", seed: 19 },
]
