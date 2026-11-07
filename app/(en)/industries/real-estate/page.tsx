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
import { DueDiligenceBoard, LeaseExpiryTimeline } from "./visuals"

const industry = industryBySlug("real-estate")!

// An example of the abstract the Abstract Writer is asked to return. The
// shape is defined in the task; it is not an API field.
const abstractExample = `{
  "tenant": "Northwind Dental PLLC",
  "premises": "Suite 410, Riverside Plaza, 212 Market St",
  "rentable_sf": 3240,
  "commencement": "2021-09-01",
  "expiration": "2027-08-31",
  "base_rent": [
    { "from": "2021-09-01", "to": "2024-08-31", "annual_psf": 27.00, "page": 14 },
    { "from": "2024-09-01", "to": "2027-08-31", "annual_psf": 28.50, "page": 14 }
  ],
  "renewal_options": [
    { "term_months": 60, "notice_by": "2026-11-30", "rent_basis": "95% of fair market", "page": 31 }
  ],
  "termination_option": null,
  "security_deposit": { "amount": 14580, "form": "cash", "page": 9 },
  "cam_structure": { "type": "pro rata", "base_year": 2021, "cap_pct": 5, "page": 18 },
  "exclusive_use": "general dentistry within the building",
  "assignment_rights": "landlord consent not unreasonably withheld; affiliates permitted",
  "critical_dates": [
    { "date": "2026-11-30", "event": "renewal notice deadline" },
    { "date": "2027-02-28", "event": "landlord relocation notice window closes" },
    { "date": "2027-08-31", "event": "expiration" }
  ],
  "flags_for_counsel": [
    { "clause": "Relocation", "page": 22, "reason": "amendment 2 changes the notice period; base lease still says 120 days" },
    { "clause": "Exclusive use", "page": 27, "reason": "carve-out for 'medical office' is broader than typical" }
  ]
}`

const abstractFields: { field: string; from: string }[] = [
  { field: "base_rent[]", from: "Term Extractor, with the page for each step" },
  { field: "renewal_options[]", from: "Term Extractor, notice_by computed by Critical Dates" },
  { field: "critical_dates[]", from: "Critical Dates, with the arithmetic in the run log" },
  { field: "flags_for_counsel[]", from: "Abstract Writer, every ambiguity it could not resolve" },
]

export default function RealEstateIndustryPage() {
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
          visual={<LeaseExpiryTimeline />}
          accent={industry.accent}
        />

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where real estate teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send. Abstracts, memos and listings come back as drafts; a lease administrator, analyst or counsel reviews them."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run it from Python, cURL or TypeScript"
          description="The Swarms API examples share one request shape. The TypeScript example runs due diligence as a HierarchicalSwarm, the Swarms Cloud example reconciles a portfolio run against the logs, and the framework example writes listings in-process. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="Lease abstraction as a sequential workflow"
          description="Read, extract, compute dates, write. Each agent receives the previous agent's output, and the model changes with the job: a long-context model for the first read, small models for extraction and arithmetic, a strong writer for the abstract a person will read. Watch a lease move through the pipeline."
        >
          <AgentFlowDiagram
            swarmType="SequentialWorkflow"
            task="Abstract the Suite 410 lease and two amendments"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Abstract"
            intervalMs={1400}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["The reader orders the documents", "A lease rarely arrives alone. The first agent finds the base lease and every amendment, orders them by date and maps the clauses to pages, so the extractor works from a table of contents instead of 80 loose pages."],
              ["Every term carries a page", "The rules string asks for a page citation on every extracted term and forbids inferring dates that are not stated or computable. A reviewer can open the lease to the page instead of re-reading it."],
              ["Ambiguity goes to counsel", "The writer puts anything it could not resolve into flags_for_counsel with the clause, the page and the reason. The agents draft the abstract; a lease administrator or counsel decides what it means."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="abstract"
          eyebrow="Output"
          title="What the abstraction returns"
          description="The abstract's shape is yours. You name the fields in the task and ask the Abstract Writer to return exactly those as JSON; the API hands the writer's output back in the output field. Below is an example of the response shape we asked the agents to produce for the Suite 410 lease. The field names are ours, not the API's."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-black">
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
                <span className="font-mono text-[11px] text-white/40">example abstract · output field of the response</span>
                <span className="ml-auto rounded border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-white/45">example</span>
              </div>
              <pre className="overflow-x-auto p-4 font-mono text-[11px] font-normal leading-relaxed text-white/75 sm:p-5 sm:text-[12.5px]">
                <code>{abstractExample}</code>
              </pre>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Where each field comes from</h3>
                <ul className="mt-3 space-y-3">
                  {abstractFields.map((f) => (
                    <li key={f.field} className="text-sm">
                      <code className="font-mono text-[12px] text-white/85">{f.field}</code>
                      <p className="mt-0.5 leading-relaxed text-white/50">{f.from}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Make it your schema</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Rename fields, add your asset system's identifiers, or drop what you do not track. The task string carries the field list, so the same pipeline can produce a retail abstract for one portfolio and an office abstract for another. Keep <code className="font-mono text-[12px] text-white/75">flags_for_counsel</code>: it is where the agents say what they could not decide.
                </p>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every lease and every deal with its run, its findings and its cost"
          description="The board shows a due diligence run as the director's workers draft findings and the analyst reviews them. Each run is logged in Swarms Cloud with every agent's output, token usage, latency and cost, so a deal team can trace a finding back to the document and a portfolio lead can see what the quarter's abstraction cost."
        >
          <div className="grid gap-6">
            <DueDiligenceBoard />
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.6} />
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions real estate teams ask"
          description="What asset managers, lease administrators, acquisitions analysts and proptech engineers ask before they put agents on a portfolio."
          faqs={faqs}
        />

        <IndustryCta
          title="Abstract your next lease with a swarm"
          description="Create a Swarms Cloud account, paste one lease into the example above, and name the fields you track. The abstract comes back with page citations and counsel flags, and the run shows up in your logs with its cost."
        />

        <MoreIndustries current="real-estate" />
      </main>
    </div>
  )
}
