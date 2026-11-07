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

import { examples, faqs, flowStages, hero, telemetryMetrics, telemetryName, useCases } from "./data"
import { DocumentationPipeline, IntakeBoard } from "./visuals"

const industry = industryBySlug("healthcare")!

// Who does what, artifact by artifact. The agents draft; a named person
// decides. This is the table a compliance reviewer asks for first.
const RESPONSIBILITIES: { artifact: string; agent: string; person: string; record: string }[] = [
  {
    artifact: "Acuity level",
    agent: "Triage Agent proposes an ESI level and lists the findings behind it",
    person: "Triage nurse assigns the level",
    record: "Proposal and findings in the run log; the assigned level in your EHR",
  },
  {
    artifact: "Visit note",
    agent: "Note Drafter writes HPI, exam and assessment, marks gaps as [CLINICIAN TO COMPLETE]",
    person: "Physician edits and signs",
    record: "Draft text per agent in the run log; the signed note in your EHR",
  },
  {
    artifact: "ICD-10 codes",
    agent: "Coding Agent lists candidates with supporting text and confidence",
    person: "Certified coder selects and submits",
    record: "Candidates and confidences in the run log; the claim in your billing system",
  },
  {
    artifact: "Patient instructions",
    agent: "Plain-language Writer drafts from the record at a set reading level",
    person: "Discharging clinician approves",
    record: "Draft in the run log; the approved copy in the discharge packet",
  },
  {
    artifact: "Prior authorization letter",
    agent: "Letter Drafter writes to the payer's criteria from the chart summary",
    person: "Physician reviews and signs",
    record: "Draft and criteria mapping in the run log; the submission with the payer",
  },
]

export default function HealthcareIndustryPage() {
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
          visual={<IntakeBoard />}
          accent={industry.accent}
        />

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where care teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the roster of agents you would send. In every one, the agents prepare material and a clinician, nurse or coder makes the decision."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="An intake pipeline as a sequential workflow"
          description="Each agent receives the previous agent's output, so the triage proposal is built on the structured intake, the note on the proposal, and the candidate codes on the note. Watch one de-identified encounter move through the four steps."
        >
          <AgentFlowDiagram
            swarmType="SequentialWorkflow"
            task="De-identified ED intake form, 54-year-old with exertional chest tightness"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Draft package"
            intervalMs={1400}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Cheap model first", "The intake reader only has to structure a form, so it runs on a fast, inexpensive model. The judgement steps that follow get a stronger one."],
              ["Gaps stay visible", "The note drafter is told to mark anything it cannot find as [CLINICIAN TO COMPLETE] instead of guessing, so the physician sees exactly where the record is thin."],
              ["Nothing is final", "The output is a draft package: a proposed acuity, a draft note and candidate codes. The triage nurse, physician and coder each sign off in your own systems."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="review"
          eyebrow="Review"
          title="Who reviews what"
          description="The split that compliance and clinical leadership ask about first. Agents draft and propose; a qualified person decides, and both halves are recorded."
          wide
        >
          <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#0a0a0a] font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <th scope="col" className="px-4 py-3 font-medium">Artifact</th>
                  <th scope="col" className="px-4 py-3 font-medium">Agent drafts</th>
                  <th scope="col" className="px-4 py-3 font-medium">Person decides</th>
                  <th scope="col" className="px-4 py-3 font-medium">Where it is recorded</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIBILITIES.map((row) => (
                  <tr key={row.artifact} className="border-t border-white/[0.08] bg-black align-top">
                    <th scope="row" className="px-4 py-3.5 font-semibold text-white">{row.artifact}</th>
                    <td className="px-4 py-3.5 leading-relaxed text-white/55">{row.agent}</td>
                    <td className="px-4 py-3.5 leading-relaxed text-white/85">{row.person}</td>
                    <td className="px-4 py-3.5 leading-relaxed text-white/55">{row.record}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </IndustrySection>

        <IndustrySection
          id="documentation"
          eyebrow="Documentation"
          title="From dictation to the coder's queue"
          description="One encounter at a time: the dictation is split into sections with gaps marked, the coding agent lists candidate ICD-10-CM codes with the text that supports each, and the certified coder accepts or drops them. The codes shown are real; the confidences and decisions are generated."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <DocumentationPipeline />
            <div className="flex flex-col gap-4">
              {[
                ["Confidence is a hint, not a threshold", "The coder sees every candidate with its confidence and supporting text. Nothing is auto-submitted, and a low-confidence code is still shown so the coder can accept it if the note supports it."],
                ["Dissent is kept", "When coding runs as a vote, the codes the agents disagreed on are returned alongside the majority, so the coder reviews the hard cases first."],
                ["Every draft traces back", "The run log holds the dictation the agents saw, each agent's output and the token usage, keyed by encounter, so a draft can be audited months later."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                  <h3 className="text-base font-semibold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the pipeline from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape. The last tab runs the same agents in-process with the open-source swarms package. Set SWARMS_API_KEY from your Swarms Cloud account, and send de-identified text until your data handling terms cover more."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every encounter's run, logged and reviewable"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and cost. Name each run after the encounter and the documentation team can pull the full record for any draft."
        >
          <CloudTelemetry accent={industry.accent} swarmName={telemetryName} metrics={telemetryMetrics} />
        </IndustrySection>

        <IndustryFaqSection
          title="Questions care teams ask"
          description="What clinical informatics, compliance and revenue cycle teams ask before an agent touches an encounter."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a draft in front of your clinicians"
          description="Create a Swarms Cloud account, copy the intake pipeline above, and run it on a de-identified encounter. The draft package and its log show up in your account on the first run."
        />

        <MoreIndustries current="healthcare" />
      </main>
    </div>
  )
}
