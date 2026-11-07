import { AgentFlowDiagram } from "@/components/industries/agent-flow-diagram"
import { CloudTelemetry } from "@/components/industries/cloud-telemetry"
import { IndustryCodeExamples } from "@/components/industries/code-examples"
import { highlightIndustryExamples } from "@/components/industries/highlight"
import { IndustryCta } from "@/components/industries/industry-cta"
import { IndustryFaqSection } from "@/components/industries/industry-faq"
import { IndustryHero } from "@/components/industries/industry-hero"
import { IndustrySection } from "@/components/industries/industry-section"
import { MoreIndustries } from "@/components/industries/more-industries"
import { UseCaseGrid } from "@/components/industries/use-case-grid"
import { Navigation } from "@/components/navigation"
import { industryBySlug } from "@/lib/industries"

import { examples, faqs, flowStages, hero, telemetryName, useCases } from "./data"
import { DebateTranscript, MasteryHeatmap } from "./visuals"

const industry = industryBySlug("education")!

// How a rubric row becomes agent instructions and what comes back. The left
// column is the rubric as the department writes it; the middle is the task
// text and the agent rule derived from it; the right is the shape of the
// response the instructor reviews.
const rubricToPrompt = [
  {
    criterion: "Argument (0 to 4)",
    rubric: "Clear, arguable thesis sustained throughout; at least one counter-argument addressed with evidence.",
    prompt: "Task carries the level descriptors verbatim. Advocate and challenger must quote the essay for every claim. Judge weighs arguments against the rubric text only.",
    returns: "PROPOSED SCORE n/4, the deciding quote, one line for the instructor. Transcript attached.",
  },
  {
    criterion: "Evidence (0 to 4)",
    rubric: "Specific, correctly cited sources; the student explains how each supports the claim.",
    prompt: "Same debate shape. Challenger is told to point to what is missing, not to style or length, so unsupported claims are named by paragraph.",
    returns: "Proposed score with the unsupported claims listed by paragraph number.",
  },
  {
    criterion: "Organization (0 to 4)",
    rubric: "Each paragraph carries one idea; transitions connect them; the order serves the argument.",
    prompt: "Advocate and challenger are asked to map each paragraph to its idea before arguing, so the judge sees the same outline from both sides.",
    returns: "Proposed score, the paragraph map, and any paragraph flagged as carrying two ideas.",
  },
  {
    criterion: "Mechanics (0 to 2)",
    rubric: "Grammar, punctuation and spelling do not interfere with meaning.",
    prompt: "No debate. A single fast agent lists errors by line; the rubric gives little to argue about, so the cheaper pattern fits.",
    returns: "Error list by line and a proposed 0, 1 or 2, for the instructor to confirm.",
  },
]

export default function EducationIndustryPage() {
  const highlighted = highlightIndustryExamples(examples)

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main id="main-content">
        <IndustryHero
          eyebrow={hero.eyebrow}
          title={hero.title}
          description={hero.description}
          bullets={hero.bullets}
          primary={{ label: "Get an API key", href: "https://cloud.swarms.world/login" }}
          secondary={{ label: "See the code", href: "#code" }}
          visual={<MasteryHeatmap />}
          accent={industry.accent}
        />

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the grader or the tutor from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape: a name, a swarm_type, a task and a list of agents. Set SWARMS_API_KEY from your Swarms Cloud account before running. Nothing in these examples writes to a gradebook."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="Grading one criterion as a debate with a judge"
          description="An advocate argues the student met the criterion, a challenger argues they did not, and both must quote the essay. A judge on a stronger model weighs the two against the rubric text and proposes a score. The instructor reads the transcript and records the grade."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div>
              <AgentFlowDiagram
                swarmType="DebateWithJudge"
                task="Argument criterion, essay s-0427"
                stages={flowStages}
                accent={industry.accent}
                outputLabel="Proposed score"
              />
              <div className="mt-6 grid gap-6 sm:grid-cols-3">
                {[
                  ["Two sides, two providers", "The advocate and the challenger run on different providers so they do not share one model's reading habits. Both are told to quote the essay and to stay inside the rubric text."],
                  ["The judge decides between arguments", "A judge choosing between two specific, quoted cases is more consistent than a single agent scoring cold. The judge's note names the deciding evidence so the instructor can check it in seconds."],
                  ["The instructor records the grade", "The proposed score and transcript go to a review queue. Accepting or overriding is the instructor's action in the LMS, and the transcript stays attached as the rationale."],
                ].map(([title, body]) => (
                  <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                    <h3 className="text-base font-semibold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
                  </div>
                ))}
              </div>
            </div>
            <DebateTranscript />
          </div>
        </IndustrySection>

        <IndustrySection
          id="rubric-to-prompt"
          eyebrow="Rubric to prompt"
          title="How a rubric row becomes an agent's instructions"
          description="The department's rubric is the source of truth. Each row below shows the rubric text as written, what the request does with it, and the shape of what comes back for the instructor to review."
          wide
        >
          <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <th scope="col" className="px-4 py-3 font-medium">Criterion</th>
                  <th scope="col" className="px-4 py-3 font-medium">Rubric text</th>
                  <th scope="col" className="px-4 py-3 font-medium">What the request does</th>
                  <th scope="col" className="px-4 py-3 font-medium">What comes back</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.08]">
                {rubricToPrompt.map((row) => (
                  <tr key={row.criterion} className="align-top">
                    <th scope="row" className="px-4 py-4 font-semibold text-white/85">
                      {row.criterion}
                    </th>
                    <td className="px-4 py-4 leading-relaxed text-white/55">{row.rubric}</td>
                    <td className="px-4 py-4 leading-relaxed text-white/55">{row.prompt}</td>
                    <td className="px-4 py-4 leading-relaxed text-white/55">{row.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] text-white/45">
              Every row ends with the instructor. Proposed scores are not grades until a person records them.
            </p>
          </div>
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where schools and course teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send in the request. Agents draft, propose and explain; teachers and instructors decide."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Cost per class, transcript per student"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and latency. Name each run after the student id and the full transcript behind a proposed score is one query away when a student asks how a grade was reached."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={1.1} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">What a student can be shown</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The advocate's case, the challenger's case and the judge's deciding quote, all drawn from the student's own text. Instructors who show the transcript alongside their final score have a rationale that is specific to the essay rather than a form comment.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Where the humans are</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Instructors record grades, teachers approve unit plans, and tutors are a supplement to a class, not a replacement for one. The agents on this page propose scores, draft feedback and work through problems; the gradebook and the lesson plan are edited by people.
                </p>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions educators ask"
          description="What instructors, department heads and learning platform engineers ask before they put agents near a gradebook."
          faqs={faqs}
        />

        <IndustryCta
          title="Debate your next rubric criterion"
          description="Create a Swarms Cloud account, copy the rubric debate example above, and paste in one anonymized essay and one criterion. The transcript shows up in your logs with its cost."
        />

        <MoreIndustries current="education" />
      </main>
    </div>
  )
}
