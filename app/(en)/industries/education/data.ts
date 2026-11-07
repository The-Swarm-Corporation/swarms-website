import { BarChart3, BookOpen, Gavel, ListChecks, MessageSquare, PenLine } from "lucide-react"

import type { FlowStage } from "@/components/industries/agent-flow-diagram"
import type { IndustryExample } from "@/components/industries/code-examples"
import type { IndustryFaq } from "@/components/industries/industry-faq"
import type { UseCase } from "@/components/industries/use-case-grid"

export const hero = {
  eyebrow: "Industries",
  title: "Swarms for Education",
  description:
    "Rubric-based grading, tutoring, feedback drafting, curriculum mapping to standards and student progress summaries, run as agent teams on the Swarms API with instructors deciding.",
  bullets: [
    "Rubric criteria argued for and against, judged, and returned with the transcript",
    "Mastery by student and objective, with a tutor's next step for the weakest cell",
    "Per-student token usage and latency in Swarms Cloud for cost per class",
  ],
}

export const flowStages: FlowStage[] = [
  {
    id: "debaters",
    label: "Debaters",
    nodes: [
      { id: "advocate", label: "Criterion Advocate", model: "claude-sonnet-5-5", says: "thesis stated in paragraph 1 and sustained, criterion met" },
      { id: "challenger", label: "Criterion Challenger", model: "gpt-5.4", says: "thesis restated but counter-argument never addressed" },
    ],
  },
  {
    id: "judge",
    label: "Judge",
    nodes: [{ id: "judge", label: "Rubric Judge", model: "claude-opus-5-5", says: "3 of 4 on argument, flagged for instructor" }],
  },
]

export const useCases: UseCase[] = [
  {
    title: "Rubric grading with a debate",
    description:
      "For each rubric criterion, an advocate argues the student met it, a challenger argues they did not, and a judge decides and quotes the evidence. The instructor sees the transcript and the proposed score, then accepts or overrides. The instructor's score is the grade.",
    swarmType: "DebateWithJudge",
    agents: ["Criterion Advocate", "Criterion Challenger", "Rubric Judge"],
    icon: Gavel,
  },
  {
    title: "Subject tutoring",
    description:
      "A router reads the student's question and sends it to the tutor for that subject, which works through the problem step by step, asks a checking question, and never gives the final answer before the student has tried.",
    swarmType: "MultiAgentRouter",
    agents: ["Router", "Algebra Tutor", "Writing Tutor", "Chemistry Tutor"],
    icon: MessageSquare,
  },
  {
    title: "Unit planning",
    description:
      "A director agent breaks a unit into standards coverage, activities and assessments, worker agents draft each part, and the director integrates them into a plan the teacher edits. The plan is a draft until the teacher says otherwise.",
    swarmType: "HierarchicalSwarm",
    agents: ["Curriculum Director", "Standards Agent", "Activity Agent", "Assessment Agent"],
    icon: BookOpen,
  },
  {
    title: "Written feedback drafts",
    description:
      "A rubric reader maps each comment to a criterion, a feedback writer drafts specific comments that quote the student's text, and a tone checker rewrites anything that is vague or discouraging before the instructor reviews.",
    swarmType: "SequentialWorkflow",
    agents: ["Rubric Reader", "Feedback Writer", "Tone Checker"],
    icon: PenLine,
  },
  {
    title: "Question bank review",
    description:
      "Candidate quiz items are scored by judge agents for alignment to the objective, a single defensible answer, and reading level, and an aggregator writes the ruling on each item. The instructor picks from the items that passed.",
    swarmType: "CouncilAsAJudge",
    agents: ["Alignment Judge", "Answer Key Judge", "Readability Judge", "Aggregator"],
    icon: ListChecks,
  },
  {
    title: "Class mastery report",
    description:
      "Mastery, misconception and next-step agents each read the week's scored work for a class, and an aggregator writes the report: which objectives the class has, which students are stuck where, and what to reteach first.",
    swarmType: "MixtureOfAgents",
    agents: ["Mastery Agent", "Misconception Agent", "Next-Step Agent", "Aggregator"],
    icon: BarChart3,
  },
]

const rubricDebatePython = `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

# One rubric criterion, argued both ways, then judged. The instructor reads the
# transcript and the proposed score and records the actual grade. Nothing in
# this script writes to a gradebook.
RUBRIC_CRITERION = """
Criterion: Argument (0 to 4)
4: Clear, arguable thesis sustained through every paragraph; addresses at
   least one counter-argument and responds to it with evidence.
3: Clear thesis, mostly sustained; counter-argument mentioned but not answered.
2: Thesis present but vague or inconsistently supported.
1: No identifiable thesis; summary rather than argument.
"""

ESSAY = open("submissions/student_0427_essay.txt").read()

response = client.swarms.run(
    name="Rubric Debate: Argument",
    description="Advocate and challenger argue one criterion, a judge proposes a score.",
    swarm_type="DebateWithJudge",
    task=(
        "Decide how many points of 4 this essay earns on the Argument criterion. "
        "Quote the essay for every claim you make.\\n\\n"
        + RUBRIC_CRITERION
        + "\\nESSAY:\\n"
        + ESSAY
    ),
    agents=[
        {
            "agent_name": "Criterion Advocate",
            "description": "Makes the strongest honest case that the criterion was met.",
            "system_prompt": (
                "You argue that the student met the criterion at the highest level the "
                "evidence supports. Quote the essay. Do not invent strengths that are not there."
            ),
            "model_name": "claude-sonnet-5-5",
            "max_loops": 1,
        },
        {
            "agent_name": "Criterion Challenger",
            "description": "Makes the strongest honest case that the criterion was not met.",
            "system_prompt": (
                "You argue that the essay falls short of the criterion. Quote the essay. "
                "Point to what is missing, not to style or length."
            ),
            "model_name": "gpt-5.4",  # a different provider so the two sides do not share blind spots
            "max_loops": 1,
        },
        {
            "agent_name": "Rubric Judge",
            "description": "Decides the proposed score and explains it to the instructor.",
            "system_prompt": (
                "You are an experienced writing instructor. Weigh both arguments against "
                "the rubric text only. Return PROPOSED SCORE: n/4, the deciding evidence, "
                "and a one-line note for the instructor who will confirm or change it."
            ),
            "model_name": "claude-opus-5-5",  # the judgment is the deliverable
            "max_loops": 1,
        },
    ],
    max_loops=1,
)

# Transcript, proposed score and usage. The instructor's decision is recorded
# in the LMS by the instructor, with this output attached as the rationale.
print(response)`

const rubricDebateCurl = `# One rubric criterion argued both ways, then judged.
# The proposed score goes to the instructor, who records the grade.
# Requires: SWARMS_API_KEY from Swarms Cloud, jq for the summary at the end.
# Replace the essay text with an anonymized submission from your LMS export;
# the run is stored in Swarms Cloud under the name below.
curl -s -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Accept: application/json" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Rubric Debate: Argument",
    "description": "Advocate and challenger argue one criterion, a judge proposes a score.",
    "swarm_type": "DebateWithJudge",
    "task": "Decide how many points of 4 this essay earns on the Argument criterion (4: clear arguable thesis sustained throughout, addresses and answers a counter-argument; 3: clear thesis mostly sustained, counter-argument mentioned but not answered; 2: thesis vague or inconsistently supported; 1: no identifiable thesis). Quote the essay for every claim. ESSAY: Many people believe school uniforms limit expression, but the evidence from three districts that adopted them suggests the opposite ... [essay text continues]",
    "agents": [
      {
        "agent_name": "Criterion Advocate",
        "description": "Makes the strongest honest case that the criterion was met.",
        "system_prompt": "You argue that the student met the criterion at the highest level the evidence supports. Quote the essay. Do not invent strengths.",
        "model_name": "claude-sonnet-5-5",
        "max_loops": 1
      },
      {
        "agent_name": "Criterion Challenger",
        "description": "Makes the strongest honest case that the criterion was not met.",
        "system_prompt": "You argue that the essay falls short of the criterion. Quote the essay. Point to what is missing, not to style or length.",
        "model_name": "gpt-5.4",
        "max_loops": 1
      },
      {
        "agent_name": "Rubric Judge",
        "description": "Decides the proposed score and explains it to the instructor.",
        "system_prompt": "You are an experienced writing instructor. Weigh both arguments against the rubric text only. Return PROPOSED SCORE: n/4, the deciding evidence, and a one-line note for the instructor who will confirm or change it.",
        "model_name": "claude-opus-5-5",
        "max_loops": 1
      }
    ],
    "rules": "Quote the essay for every claim. Score against the rubric text only.",
    "max_loops": 1
  }' | jq '{proposed: .output, usage: .usage}'`

const tutorRouterTs = `// A tutoring request routed to one subject tutor. MultiAgentRouter reads the
// question and dispatches it to a single specialist, so a student asking about
// stoichiometry never gets the algebra tutor's prompt.
const SWARMS_API = "https://api.swarms.world/v1/swarm/completions"

type TutorRequest = { studentId: string; grade: number; question: string; attempt?: string }

const TUTOR_RULES =
  "Work one step at a time. Ask the student to try the next step before you show it. " +
  "Never give the final answer until the student has attempted it. Keep each reply under 120 words. " +
  "If the question is not about your subject, say so in one sentence."

const tutor = (name: string, model: string, subject: string) => ({
  agent_name: name,
  description: \`Tutors \${subject} for middle and high school students.\`,
  system_prompt: \`You are a patient \${subject} tutor. \${TUTOR_RULES}\`,
  model_name: model,
  max_loops: 1,
})

export async function askTutor(req: TutorRequest) {
  const res = await fetch(SWARMS_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: \`Tutor \${req.studentId}\`,
      swarm_type: "MultiAgentRouter",
      task:
        \`Grade \${req.grade} student asks: \${req.question}\` +
        (req.attempt ? \`\\nTheir attempt so far: \${req.attempt}\` : "\\nThey have not attempted it yet."),
      agents: [
        tutor("Algebra Tutor", "gpt-5.4-mini", "algebra"), // short exchanges, fast models
        tutor("Writing Tutor", "claude-haiku-5-5", "essay writing"),
        tutor("Chemistry Tutor", "gemini-2.5-flash", "chemistry"),
      ],
      rules: "Route to exactly one tutor. Do not answer the question yourself.",
      max_loops: 1,
    }),
  })

  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)
  const data = await res.json()
  return { reply: data.output as string, usage: data.usage as { total_tokens: number } }
}

askTutor({
  studentId: "s-0427",
  grade: 10,
  question: "How many grams of water form when 4.0 g of hydrogen react completely with oxygen?",
  attempt: "I wrote 2H2 + O2 -> 2H2O and then got stuck.",
}).then((r) => {
  console.log(r.reply)
  console.log("tokens:", r.usage.total_tokens)
})`

const batchGradingTs = `// Grade a whole class overnight: one DebateWithJudge request per submission,
// submitted as a batch. Each proposed score lands in a review queue; the
// instructor confirms or changes every one before anything reaches the LMS.
const BATCH_API = "https://api.swarms.world/v1/swarm/batch/completions"

type Submission = { studentId: string; text: string }
type BatchResult = { output: unknown; usage: { input_tokens: number; output_tokens: number; total_tokens: number } }

const RUBRIC =
  "Criterion: Use of evidence (0 to 4). 4: every claim is supported by a specific, correctly cited source " +
  "and the student explains how it supports the claim. 3: most claims supported, explanation sometimes thin. " +
  "2: evidence present but generic or unexplained. 1: little or no evidence."

const AGENTS = [
  { agent_name: "Criterion Advocate", system_prompt: "Argue the student met the criterion at the highest level the evidence supports. Quote the essay.", model_name: "claude-sonnet-5-5", max_loops: 1 },
  { agent_name: "Criterion Challenger", system_prompt: "Argue the essay falls short of the criterion. Quote the essay. Point to what is missing.", model_name: "gpt-5.4", max_loops: 1 },
  { agent_name: "Rubric Judge", system_prompt: "Weigh both arguments against the rubric text only. Return PROPOSED SCORE: n/4, the deciding evidence, and a one-line note for the instructor.", model_name: "claude-opus-5-5", max_loops: 1 },
]

export async function gradeClass(submissions: Submission[]) {
  const batch = submissions.map((s) => ({
    name: \`Rubric Debate: Evidence \${s.studentId}\`,
    swarm_type: "DebateWithJudge",
    task: \`Decide how many points of 4 this essay earns on the criterion below. Quote the essay for every claim.\\n\\n\${RUBRIC}\\n\\nESSAY:\\n\${s.text}\`,
    agents: AGENTS,
    max_loops: 1,
  }))

  const res = await fetch(BATCH_API, {
    method: "POST",
    headers: {
      "x-api-key": process.env.SWARMS_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(batch),
  })
  if (!res.ok) throw new Error(\`Swarms API \${res.status}: \${await res.text()}\`)

  const results = (await res.json()) as BatchResult[]
  let tokens = 0
  const queue = results.map((r, i) => {
    tokens += r.usage.total_tokens
    return { studentId: submissions[i].studentId, proposed: r.output, status: "awaiting instructor review" as const }
  })

  console.log(\`\${queue.length} proposed scores queued for review, \${tokens} tokens\`)
  return queue
}

gradeClass([
  { studentId: "s-0427", text: "Three districts that adopted uniforms reported ... [essay text]" },
  { studentId: "s-0431", text: "Uniforms are bad because everyone says so ... [essay text]" },
]).then((queue) => console.table(queue.map(({ studentId, status }) => ({ studentId, status }))))`

const feedbackFrameworkPython = `from swarms import Agent, SequentialWorkflow

# Written feedback as a three-step pipeline on the open-source swarms package
# (pip install swarms). The output is a draft the instructor edits before the
# student sees it.
rubric_reader = Agent(
    agent_name="Rubric Reader",
    system_prompt=(
        "You read a student essay against the rubric provided and list, per criterion, "
        "the sentences in the essay that are the evidence for and against meeting it. "
        "Quote exactly; do not paraphrase."
    ),
    model_name="claude-haiku-5-5",  # extraction and quoting, a fast model is enough
    max_loops=1,
)

feedback_writer = Agent(
    agent_name="Feedback Writer",
    system_prompt=(
        "You write feedback for a tenth-grade student. For each criterion: one thing "
        "that worked, quoted from their essay, and one specific next step they can do "
        "in the revision. No generic praise. No grade."
    ),
    model_name="claude-sonnet-5-5",
    max_loops=1,
)

tone_checker = Agent(
    agent_name="Tone Checker",
    system_prompt=(
        "You edit the feedback so it is direct, specific and encouraging without being "
        "soft. Remove anything the student cannot act on. Keep the quotes. Mark the "
        "result DRAFT FOR INSTRUCTOR REVIEW at the top."
    ),
    model_name="gpt-5.4-mini",
    max_loops=1,
)

workflow = SequentialWorkflow(
    name="Feedback Draft",
    description="Rubric evidence, feedback draft, tone pass.",
    agents=[rubric_reader, feedback_writer, tone_checker],
    max_loops=1,
)

RUBRIC = """
Argument (0-4): clear thesis sustained throughout; counter-argument addressed.
Evidence (0-4): specific cited sources, explained.
Organization (0-4): paragraphs each carry one idea; transitions.
"""

essay = open("submissions/student_0427_essay.txt").read()

draft = workflow.run(
    "Write feedback for this essay using the rubric.\\n\\nRUBRIC:\\n" + RUBRIC + "\\nESSAY:\\n" + essay
)
print(draft)`

export const examples: IndustryExample[] = [
  {
    id: "python",
    label: "Swarms API · Python",
    file: "rubric_debate.py",
    code: rubricDebatePython,
    note: "The Python SDK (pip install swarms-client) runs one rubric criterion as a DebateWithJudge swarm. An advocate and a challenger on different providers argue from the essay text, and a judge on a stronger model proposes a score with the deciding evidence. The response is the transcript the instructor reads before recording the grade.",
  },
  {
    id: "curl",
    label: "Swarms API · cURL",
    file: "rubric_debate.sh",
    code: rubricDebateCurl,
    note: "The same debate as a raw HTTP call with the rubric and essay inline in the task. The response holds the output and the usage block billing is computed from, and the run is stored in Swarms Cloud under the swarm name.",
  },
  {
    id: "typescript",
    label: "Swarms API · TypeScript",
    file: "askTutor.ts",
    code: tutorRouterTs,
    note: "Tutoring as a MultiAgentRouter swarm from a Node or edge runtime. The router reads the question and sends it to one subject tutor, each on a fast model because exchanges are short. The rules field tells the router not to answer the question itself.",
  },
  {
    id: "cloud",
    label: "Swarms Cloud · Batch",
    file: "gradeClass.ts",
    code: batchGradingTs,
    note: "A whole class graded as a batch: one DebateWithJudge request per submission posted to /v1/swarm/batch/completions. The results come back in order with their usage, each run is logged in Swarms Cloud under the student id, and every proposed score waits for the instructor.",
  },
  {
    id: "framework",
    label: "Python framework",
    file: "feedback_draft.py",
    code: feedbackFrameworkPython,
    note: "The same kind of pipeline on the open-source swarms package (pip install swarms) for teams that run the orchestration themselves. Three agents run in sequence in your own process and return a feedback draft marked for instructor review.",
  },
]

export const faqs: IndustryFaq[] = [
  {
    q: "Why have two agents argue about a rubric criterion instead of asking one to score it?",
    a: "A single agent asked to score tends to anchor on its first impression and write a justification afterwards. An advocate and a challenger have to find the evidence for and against in the essay text, and the judge decides between two specific arguments rather than grading cold. The instructor then sees why the proposed score is what it is, which is what makes accepting or overriding it fast.",
    link: { label: "Swarm types on the Swarms API", href: "/api" },
  },
  {
    q: "Who owns the grade?",
    a: "The instructor. Every example on this page returns a proposed score and a transcript. The grade is whatever the instructor records in the LMS, and the examples keep that step outside the swarm on purpose. The transcript can be attached as the rationale for the instructor's decision.",
  },
  {
    q: "How is student work kept private?",
    a: "The request contains only what you put in it, so student identifiers can be replaced with internal ids before the essay is sent, as the examples do. Each agent carries its own model_name, so you choose per agent which provider handles the text. Institutions with data processing requirements can discuss handling and deployment options with the Swarms team.",
    link: { label: "Talk to sales", href: "/contact-sales" },
  },
  {
    q: "What does grading a class cost?",
    a: "The usage block on every response gives input, output and total tokens, and the batch example sums them for a class. Cost is those tokens at each model's price. Advocates and challengers can run on mid-tier models; the judge, whose output the instructor reads, is where a stronger model earns its price.",
    link: { label: "Model pricing", href: "/pricing" },
  },
  {
    q: "Can the tutor be stopped from giving answers away?",
    a: "The tutor prompts in the examples tell each agent to work one step at a time and to withhold the final answer until the student has tried. That is a prompt rule, so test it against your own question bank and adjust. The rules field on the request applies a further instruction to every agent in the swarm, and the run logs in Swarms Cloud show exactly what each tutor said.",
  },
]

export const telemetryName = "rubric-debate · DebateWithJudge"
