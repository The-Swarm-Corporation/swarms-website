import { ArrowRight } from "lucide-react"

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
import { RfiQueueBoard, ScheduleRiskGantt } from "./visuals"

const industry = industryBySlug("construction")!

// What the project team already produces, and what the agents hand back.
const DOCUMENT_FLOWS: { input: string; source: string; output: string; reviewer: string }[] = [
  { input: "Drawings, specs and sub scope letters", source: "Bid package export", output: "Review packet: scope gaps, quantity checks, unit price gaps, schedule and safety findings", reviewer: "Preconstruction manager" },
  { input: "RFIs from the field", source: "Project management system", output: "Drafted response with sheet and spec citations, routed to one discipline", reviewer: "Superintendent, then design team" },
  { input: "Submittals and product data", source: "Submittal log", output: "Review comments against the spec section and coordination drawings", reviewer: "Engineer of record" },
  { input: "Schedule update (P6, MS Project export)", source: "Scheduler's weekly update", output: "Risk register entries per trade with float remaining and drivers", reviewer: "Project manager" },
  { input: "Daily logs, toolbox talks, incident forms", source: "Field app export", output: "Weekly safety report, every item linked to its log entry", reviewer: "Safety manager" },
  { input: "Proposed change orders", source: "Owner or sub correspondence", output: "Scope, cost and schedule assessment with a recommendation", reviewer: "Project manager, owner's representative" },
]

export default function ConstructionIndustryPage() {
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
          visual={<RfiQueueBoard />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="A bid review as a concurrent workflow"
          description="Five reviewers read the same bid package at the same time. None of them waits on another, so the review takes as long as the slowest reader, and the response carries all five findings side by side for the preconstruction manager. Watch a run move through the desk."
        >
          <AgentFlowDiagram
            swarmType="ConcurrentWorkflow"
            task="Review the Riverside Clinic bid package"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Review packet"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Same documents, five readers", "Every agent gets the full task: scope letters, schedule of values, the proposed schedule and the safety plan. Each one reads for its own discipline and ignores the rest."],
              ["Models matched to the job", "Long scope letters go to a fast reader such as claude-haiku-5-5. The pricing judgement, where a wrong call costs money, runs on gpt-5.4. Each agent names its own model in the request."],
              ["Findings carry their source", "Each reviewer is told to cite the sheet, spec section or quote line behind every finding, so the estimator can check a claim in the documents instead of trusting the agent."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="schedule"
          eyebrow="Schedule risk"
          title="The weekly update, read by an agent before the meeting"
          description="A schedule risk agent reads each week's schedule export, finds the activities that slipped, follows the logic ties to see what they push, and reports the float left on everything else. The scheduler still owns the schedule; the agent writes the first draft of the risk register."
          wide
        >
          <ScheduleRiskGantt />
        </IndustrySection>

        <IndustrySection
          id="documents"
          eyebrow="Documents in, documents out"
          title="The paperwork a project already produces"
          description="Agents on the Swarms API read text, so each workflow starts from an export the project team already has. The right column is what comes back, and who reads it before it leaves the trailer."
          wide
        >
          <div className="overflow-hidden rounded-lg border border-white/[0.08]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="bg-white/[0.03] font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                    <th className="px-4 py-3 font-medium">Documents in</th>
                    <th className="px-4 py-3 font-medium">Where they come from</th>
                    <th className="px-4 py-3 font-medium">What comes back</th>
                    <th className="px-4 py-3 font-medium">Who reviews it</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCUMENT_FLOWS.map((row) => (
                    <tr key={row.input} className="border-t border-white/[0.08] bg-[#0a0a0a] align-top">
                      <td className="px-4 py-3.5 font-medium text-white/85">{row.input}</td>
                      <td className="px-4 py-3.5 text-white/50">{row.source}</td>
                      <td className="px-4 py-3.5 text-white/60">
                        <span className="inline-flex items-start gap-2">
                          <ArrowRight className="mt-1 h-3.5 w-3.5 shrink-0" style={{ color: industry.accent }} aria-hidden="true" />
                          <span>{row.output}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-white/50">{row.reviewer}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the review from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape. The last tab runs the same agents on the open-source swarms package inside your own process. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where project teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to. The agents list is the roster you would send in the request."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every review logged with the documents it read"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and cost. When a finding is questioned in a meeting, the project engineer can open the run and see what the agent was given and what it wrote."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.6} />
            <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
              <h3 className="text-base font-semibold text-white">How a run is reviewed</h3>
              <ol className="mt-3 space-y-3 text-sm leading-relaxed text-white/55">
                <li className="flex gap-3"><span className="font-mono text-white/35">01</span><span>The run returns a draft or a set of findings. Nothing is sent to the owner, the design team or a sub from the run itself.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">02</span><span>The project engineer opens the run in Swarms Cloud, checks a sampled finding against the cited sheet or spec section, and edits the draft.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">03</span><span>The superintendent or engineer of record signs and issues the document through the project management system, as before.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">04</span><span>The usage block on each run gives the project its cost per review, so model spend can be charged to the job.</span></li>
              </ol>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions project teams ask"
          description="What preconstruction managers, project engineers and the people who run the trailer ask before they put agents on a job."
          faqs={faqs}
        />

        <IndustryCta
          title="Put an agent review on your next bid"
          description="Create a Swarms Cloud account, copy the bid review example above, and paste in a scope letter and schedule of values. The first run shows up in your logs with its cost."
        />

        <MoreIndustries current="construction" />
      </main>
    </div>
  )
}
