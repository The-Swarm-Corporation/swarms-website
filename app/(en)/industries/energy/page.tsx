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
import { AssetHealthMatrix, GridLoadCurve } from "./visuals"

const industry = industryBySlug("energy")!

// Which examples on this page serve the trading desk and which serve
// operations, and who holds the decision in each case.
const DESKS: { name: string; reader: string; items: { title: string; swarmType: string; decision: string }[] }[] = [
  {
    name: "Trading desk",
    reader: "Read by traders and the risk desk. The agents write notes and plans; bids and hedges go through the desk's own systems and limits.",
    items: [
      { title: "Day-ahead market note", swarmType: "HierarchicalSwarm", decision: "Trader decides what to bid" },
      { title: "Storage dispatch review", swarmType: "MajorityVoting", decision: "Storage operator schedules the plan" },
      { title: "Market turns in the event review", swarmType: "GroupChat", decision: "Desk reads the price view" },
    ],
  },
  {
    name: "Operations",
    reader: "Read by the control room, asset engineers and the compliance team. Switching and dispatch are issued from the EMS by the operator on shift.",
    items: [
      { title: "Grid event review", swarmType: "GroupChat", decision: "Operator decides what to dispatch" },
      { title: "Asset health inspection", swarmType: "ConcurrentWorkflow", decision: "Maintenance engineer builds the list" },
      { title: "Outage report drafting", swarmType: "SequentialWorkflow", decision: "Operations manager reviews and submits" },
      { title: "Compliance filing review", swarmType: "CouncilAsAJudge", decision: "Compliance officer fixes and files" },
    ],
  },
]

export default function EnergyIndustryPage() {
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
          visual={<AssetHealthMatrix />}
          accent={industry.accent}
        />

        <IndustrySection
          id="grid"
          eyebrow="Grid operations"
          title="A day on the grid, with the agents' flags on it"
          description="Net load falls through the solar hours and climbs into the evening peak. Agents watching the same feed flag the ramp when it comes early, the price when it spikes and the transformer when it runs warm. Each flag is a note for the control room, with the agent and model that wrote it. The operator dispatches."
          wide
        >
          <GridLoadCurve />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="An event review as a group chat"
          description="Three specialists take turns on one event. In the first round each states what it sees; in the following rounds they respond to each other, agree or disagree, and the transcript is what the control room gets. Watch a run move through the rounds."
        >
          <AgentFlowDiagram
            swarmType="GroupChat"
            task="17:05 ramp, 40 min early, T-14 at 92 C"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Transcript"
            intervalMs={1600}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Several turns per event","Each agent speaks, reads what the others said and speaks again. max_loops sets the number of rounds, so a minor alarm gets one round and a system event gets three."],
              ["Disagreement is kept", "The asset engineer can push back on the market analyst's option, and the transcript shows both positions. The operator sees both positions as the agents wrote them."],
              ["Recommendations only", "The task tells the agents not to issue instructions, and the output is text. Dispatch and switching are issued from the EMS by the operator on shift, as before."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where utilities and power traders put agents to work"
          description="Each card names the Swarms API swarm type it maps to. The agents list is the roster you would send in the request. Every output is read by a person who holds the decision."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="desks"
          eyebrow="Market and operations"
          title="Two desks, two kinds of reader"
          description="The same API serves the trading floor and the control room, but the outputs go to different people with different authority. This is how the examples on this page split, and who decides in each case."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-2">
            {DESKS.map((desk) => (
              <div key={desk.name} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6">
                <h3 className="text-lg font-semibold tracking-tight text-white">{desk.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{desk.reader}</p>
                <ul className="mt-5 divide-y divide-white/[0.06] border-t border-white/[0.08]">
                  {desk.items.map((item) => (
                    <li key={item.title} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 text-sm">
                      <span className="font-medium text-white/85">{item.title}</span>
                      <span className="rounded border border-white/[0.1] px-2 py-0.5 font-mono text-[10px] text-white/45">{item.swarmType}</span>
                      <span className="basis-full text-xs text-white/50">
                        <span style={{ color: industry.accent }}>Decision: </span>
                        {item.decision}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-white/50">
            Dispatch decisions stay with the control room. None of the swarms on this page has a path to the EMS, a breaker or a bid submission; they return text, and the people who already hold those authorities read it. If a utility gives an agent a tool, it should be a read-only query against the historian or market data, with no write path into an operational system.
          </p>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the review from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape. The last tab runs the fleet inspection on the open-source swarms package inside your own process. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every review on the record"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's turns, token usage and cost. When an event is reviewed afterwards, or a regulator asks what informed a decision, the run is there to reference alongside the operator's own log."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.8} />
            <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
              <h3 className="text-base font-semibold text-white">What the record holds</h3>
              <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-white/55">
                <li className="flex gap-3"><span className="font-mono text-white/35">01</span><span>The task as sent: the alarms, readings and prices the agents were given, so a review can check whether the input was right.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">02</span><span>Each agent's turns with its model, so a wrong statement can be traced to the agent and the round it came from.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">03</span><span>Token usage and cost per run, so the operations budget can be reconciled from the swarm logs endpoint.</span></li>
                <li className="flex gap-3"><span className="font-mono text-white/35">04</span><span>No record of a dispatch, because none was made. The operator's action lives in the EMS log, where it always has.</span></li>
              </ul>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions utilities and traders ask"
          description="What control room managers, asset engineers, traders and compliance officers ask before they put agents on a desk."
          faqs={faqs}
        />

        <IndustryCta
          title="Put an agent review on your next event"
          description="Create a Swarms Cloud account, copy the event review example above, and paste in last week's alarm list and prices. The first run shows up in your logs with each agent's turns and its cost."
        />

        <MoreIndustries current="energy" />
      </main>
    </div>
  )
}
