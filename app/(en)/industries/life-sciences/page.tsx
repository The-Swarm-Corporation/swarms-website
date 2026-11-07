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
import { AssayPlate, LiteratureFunnel } from "./visuals"

const industry = industryBySlug("life-sciences")!

// The path from a primary screen to a nominated candidate, and the split
// between what an agent prepares at each step and what a scientist decides.
const TIMELINE: { step: string; agent: string; scientist: string; swarmType: string }[] = [
  {
    step: "Primary screen",
    agent: "Assay agent reads the plate export, reports Z-prime and control separation, lists wells above threshold and notes edge or row patterns that suggest an artifact.",
    scientist: "Screening scientist confirms which wells count as hits.",
    swarmType: "ConcurrentWorkflow",
  },
  {
    step: "Hit confirmation",
    agent: "Dose-response agent fits the re-test curves and reports potency and curve quality with the raw points it used.",
    scientist: "Scientist accepts or rejects each curve fit.",
    swarmType: "ConcurrentWorkflow",
  },
  {
    step: "Literature and pathway context",
    agent: "Literature agent screens and extracts the published evidence; pathway agent maps the target's neighbours and shared liabilities.",
    scientist: "Project lead judges whether the biology supports the series.",
    swarmType: "SequentialWorkflow",
  },
  {
    step: "Safety read",
    agent: "Tox agent lists class alerts, known on-target liabilities and the safety data that is missing from the packet.",
    scientist: "Toxicologist decides which studies to run.",
    swarmType: "MixtureOfAgents",
  },
  {
    step: "Candidate brief",
    agent: "Aggregator combines every specialist's output into evidence for, evidence against and open questions, each claim with its source.",
    scientist: "Project team nominates, or sends the series back for more data.",
    swarmType: "MixtureOfAgents",
  },
]

export default function LifeSciencesIndustryPage() {
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
          visual={<AssayPlate />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="Target triage as a mixture of agents"
          description="Four specialists read the same packet at the same time, each on the model that suits its material, and an aggregator writes one brief with a source on every claim. Watch a run fan out and come back together."
        >
          <AgentFlowDiagram
            swarmType="MixtureOfAgents"
            task="Should the kinase target advance to hit confirmation?"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Sourced brief"
            intervalMs={1600}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Independent reads", "The literature, assay, pathway and tox agents never see each other's output, so an optimistic paper summary cannot colour the safety read. The aggregator is the only agent that sees everything."],
              ["Models matched to material", "A long-context model reads the stack of papers, a fast inexpensive one reads the plate table, and the aggregator writes on a stronger model. Each agent sets its own model_name."],
              ["A brief, not a verdict", "The aggregator is told to end with the data the team still needs rather than a recommendation. The project team decides whether the target advances, and the run log keeps what each agent said."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="timeline"
          eyebrow="From screen to candidate"
          title="What the agents prepare at each step, and who decides"
          description="The same specialists appear at different points of the discovery path. The pattern is the same throughout: an agent reads the data and writes it up with its sources, and a named scientist makes the call."
        >
          <ol className="relative border-l border-white/[0.1] pl-8 sm:pl-10">
            {TIMELINE.map((item, i) => (
              <li key={item.step} className={i < TIMELINE.length - 1 ? "pb-10" : ""}>
                <span
                  className="absolute -left-[13px] flex h-6 w-6 items-center justify-center rounded-full border bg-black font-mono text-[10px]"
                  style={{ borderColor: industry.accent, color: industry.accent }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-white">{item.step}</h3>
                  <span className="rounded border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-white/45">{item.swarmType}</span>
                </div>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Agent prepares</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{item.agent}</p>
                  </div>
                  <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Scientist decides</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/85">{item.scientist}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </IndustrySection>

        <IndustrySection
          id="literature"
          eyebrow="Literature"
          title="From a search to an evidence table"
          description="Retrieved papers are screened against the inclusion criteria on abstract, included papers are read in full, and findings are extracted into a table with the quoted passage behind every cell. Borderline calls are marked UNSURE and wait for a scientist."
          wide
        >
          <LiteratureFunnel />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the triage from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape; only swarm_type and the agents list change between target triage and literature triage. Set SWARMS_API_KEY from your Swarms Cloud account, and send derived data rather than structures or sequences until your data handling terms cover them."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where research and development teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send. In every one, a scientist, physician or statistician makes the decision the agents prepared for."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="A run record for every brief"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and cost. Name runs after the plate or project and the history doubles as the record of what the team read and what it cost."
        >
          <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.6} />
        </IndustrySection>

        <IndustryFaqSection
          title="Questions research teams ask"
          description="What discovery scientists, medical writers and research IT ask before an agent reads their data."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a sourced brief in front of your project team"
          description="Create a Swarms Cloud account, copy the target triage example above, and swap in your own abstracts and plate summary. The brief and its run log show up in your account on the first call."
        />

        <MoreIndustries current="life-sciences" />
      </main>
    </div>
  )
}
