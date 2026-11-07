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
import { ProductionLineBoard, WorkOrderBoard } from "./visuals"

const industry = industryBySlug("manufacturing")!

// The routing table the router agent follows, and why each specialist runs
// on the model it does.
const ROUTES: { ticket: string; examples: string; specialist: string; model: string; why: string; returns: string }[] = [
  {
    ticket: "Quality",
    examples: "Defects, nonconformances, holds, out-of-calibration tools, customer returns",
    specialist: "Quality Engineer",
    model: "claude-sonnet-5-5",
    why: "Dispositions need careful reasoning over the evidence and a clear chain from symptom to containment to decision.",
    returns: "Likely cause, containment, draft disposition marked for quality manager approval",
  },
  {
    ticket: "Maintenance",
    examples: "Sensor flags, equipment faults, drift, overdue inspections, operator-reported noise",
    specialist: "Maintenance Planner",
    model: "gpt-5.4",
    why: "Work orders combine failure-mode knowledge with parts and scheduling, where a strong general model earns its price.",
    returns: "Draft work order with priority P1 to P3, probable failure mode, parts and a shift window",
  },
  {
    ticket: "Supply",
    examples: "Late lots, shortages, supplier notices, packaging and consumables running low",
    specialist: "Supply Analyst",
    model: "gemini-2.5-flash",
    why: "High volume and mostly arithmetic on cover and lead times, so a fast, cheap model keeps the per-ticket cost low.",
    returns: "Days of cover, options (expedite, alternate, reschedule) and a draft supplier note",
  },
]

export default function ManufacturingIndustryPage() {
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
          visual={<ProductionLineBoard />}
          accent={industry.accent}
        />

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where plant teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to. The agents list is the roster you would send in the request. Every output is a draft for the engineer, planner or buyer who owns the decision."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="A ticket desk as a multi-agent router"
          description="The router reads each ticket and sends it to exactly one specialist. Only that specialist runs, so a supply question never pays for a quality engineer's reasoning, and the log records which route each ticket took. Watch tickets move through the desk."
        >
          <AgentFlowDiagram
            swarmType="MultiAgentRouter"
            task="Ticket 4471: orange peel on 14 door panels"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Draft"
            intervalMs={1400}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["The router reads, then picks", "A small fast model (gpt-5.4-mini) reads the ticket text and chooses the specialist whose description matches. It does not answer the ticket itself."],
              ["One specialist runs per ticket", "The chosen agent gets the full ticket and returns its draft. The other two are not called, which is what keeps a high-volume queue affordable."],
              ["The route is in the log", "Each run in Swarms Cloud shows which specialist the router chose, so a mis-routed ticket is visible and the agent descriptions can be tightened."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="routing"
          eyebrow="Routing table"
          title="Which tickets go where, and why that model"
          description="The router chooses from the agent descriptions in the request, so the table below is the request itself written out. Change a description or a model_name and the desk changes with it."
          wide
        >
          <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] lg:grid-cols-3">
            {ROUTES.map((r) => (
              <article key={r.ticket} className="flex flex-col bg-[#0a0a0a] p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{r.ticket} tickets</h3>
                  <span className="rounded border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-white/45">{r.model}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{r.examples}</p>
                <dl className="mt-5 space-y-3 text-sm">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Routed to</dt>
                    <dd className="mt-1 font-medium" style={{ color: industry.accent }}>
                      {r.specialist}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Why this model</dt>
                    <dd className="mt-1 leading-relaxed text-white/55">{r.why}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">What comes back</dt>
                    <dd className="mt-1 leading-relaxed text-white/55">{r.returns}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="maintenance"
          eyebrow="Maintenance"
          title="From sensor flag to shift slot, with the planner deciding"
          description="When the maintenance route fires, the agent drafts a work order with a priority, and a planner agent proposes a slot on the shift grid. The human planner confirms, moves or rejects the slot in the CMMS. The telemetry beside the board is what the reliability team sees in Swarms Cloud afterwards."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
            <WorkOrderBoard />
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={2.2} />
          </div>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the desk from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape. Set SWARMS_API_KEY from your Swarms Cloud account before running. The fourth tab is the nightly job's credit check."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustryFaqSection
          title="Questions plant teams ask"
          description="What quality managers, reliability engineers and the people who run the MES ask before they put agents on a line."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a ticket desk on one line"
          description="Create a Swarms Cloud account, copy the ticket desk example above, and paste in a real ticket from this week. The first run shows up in your logs with the route it took and its cost."
        />

        <MoreIndustries current="manufacturing" />
      </main>
    </div>
  )
}
