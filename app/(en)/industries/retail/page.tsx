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

import { examples, faqs, flowStages, hero, rearrangeFlow, telemetryName, useCases } from "./data"
import { CatalogEnrichmentStream, DemandHeatmap } from "./visuals"

const industry = industryBySlug("retail")!

// The flow string split into the pieces a reader needs to understand it.
const flowTokens: { text: string; kind: "agent" | "seq" | "par" }[] = [
  { text: "Intake", kind: "agent" },
  { text: "->", kind: "seq" },
  { text: "Copywriter", kind: "agent" },
  { text: ",", kind: "par" },
  { text: "Attributes", kind: "agent" },
  { text: "->", kind: "seq" },
  { text: "Compliance", kind: "agent" },
  { text: "->", kind: "seq" },
  { text: "Publisher", kind: "agent" },
]

const flowSteps: { step: string; title: string; body: string }[] = [
  {
    step: "1",
    title: "Intake runs alone",
    body: "The first name receives the task. Here that is the raw supplier row, and Intake returns a normalised JSON object.",
  },
  {
    step: "2",
    title: "A comma means at the same time",
    body: "Copywriter and Attributes both receive Intake's output and run in parallel. Neither waits for the other, so this stage takes as long as the slower of the two.",
  },
  {
    step: "3",
    title: "An arrow means wait for everything before it",
    body: "Compliance starts only when both parallel agents have finished, and it receives both outputs: the copy to check and the attributes to compare against the source.",
  },
  {
    step: "4",
    title: "The last name writes the response",
    body: "Publisher receives the compliance result and assembles the listing JSON per market. What it returns is the output field of the API response.",
  },
]

export default function RetailIndustryPage() {
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
          visual={<DemandHeatmap />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="Catalog enrichment as an AgentRearrange swarm"
          description="A supplier row goes in, a checked listing comes out. The flow string decides the shape: intake first, copy and attributes at the same time, then a compliance gate, then the publisher. The diagram mirrors the string. Watch a SKU move through it."
        >
          <AgentFlowDiagram
            swarmType="AgentRearrange"
            task="Enrich supplier row CW-2041-BLK into a listing for US and EU"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Listing"
            intervalMs={1400}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["The flow is a string", "rearrange_flow is one line in the request. Change the string and the same five agents run in a different shape; no code changes, no new deployment."],
              ["Parallel where it pays", "Copy and attributes do not depend on each other, so they run together. Compliance does depend on both, so it waits. The string says which is which."],
              ["A gate before publishing", "The Compliance agent sees the copy, the attributes and the source row. It returns pass or fail per market with reasons, and that result travels into the listing JSON."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="flow"
          eyebrow="Flow string"
          title="The flow string, explained"
          description="AgentRearrange takes the wiring as text. Arrows are sequence, commas are concurrency, and each name must match an agent_name in the request. Here is the hero example's string, piece by piece."
        >
          <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">rearrange_flow</p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-sm sm:text-base" aria-label={rearrangeFlow}>
              {flowTokens.map((tok, i) => (
                <span
                  key={`${tok.text}-${i}`}
                  className={
                    tok.kind === "agent"
                      ? "rounded border border-white/[0.14] bg-white/[0.04] px-2 py-1 text-white/90"
                      : tok.kind === "seq"
                        ? "px-1 text-white/45"
                        : "px-1 font-semibold"
                  }
                  style={tok.kind === "par" ? { color: industry.accent } : undefined}
                >
                  {tok.text}
                </span>
              ))}
            </p>
            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 font-mono text-[11px] text-white/50">
              <span>
                <span className="text-white/80">name</span> an agent_name from the agents list
              </span>
              <span>
                <span className="text-white/80">{"->"}</span> then (wait for everything on the left)
              </span>
              <span>
                <span style={{ color: industry.accent }}>,</span> and (run at the same time on the same input)
              </span>
            </div>
          </div>

          <ol className="mt-6 grid gap-4 sm:grid-cols-2">
            {flowSteps.map((s) => (
              <li key={s.step} className="flex gap-4 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono text-xs" style={{ borderColor: `${industry.accent}66`, color: industry.accent }}>
                  {s.step}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/50">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/50">
            Other shapes are the same syntax. <code className="font-mono text-[12.5px] text-white/75">{"Demand Reader -> Pricing Agent -> Margin Checker"}</code> is a straight pipeline; <code className="font-mono text-[12.5px] text-white/75">{"Intake -> Sizing, Quality, Delivery, Listing -> Writer"}</code> fans four readers out and gathers them into one writer.
          </p>
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where retail teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send. Listings, proposals and draft replies come back; the price file, the marketplace and the help desk stay under your controls."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run it from Python, cURL or TypeScript"
          description="The Swarms API examples share one request shape; the AgentRearrange ones add the rearrange_flow string. The Swarms Cloud example checks credits before a nightly batch. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every SKU with its run, its compliance result and its cost"
          description="The stream shows what one run of the enrichment swarm produces for a SKU. Each run is logged in Swarms Cloud with every agent's output, token usage, latency and cost, so a catalog lead can see which fields a listing got, why compliance flagged it, and what the nightly job spent."
        >
          <div className="grid gap-6">
            <CatalogEnrichmentStream />
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={2.2} />
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions retail teams ask"
          description="What catalog managers, pricing analysts, support leads and commerce engineers ask before they put agents on the feed."
          faqs={faqs}
        />

        <IndustryCta
          title="Enrich your next supplier feed with a swarm"
          description="Create a Swarms Cloud account, paste one supplier row into the example above, and send it. The listing and its compliance result come back, and the run shows up in your logs with its cost."
        />

        <MoreIndustries current="retail" />
      </main>
    </div>
  )
}
