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
import { PlannerWorkerQueue, ShipmentNetworkMap } from "./visuals"

const industry = industryBySlug("logistics")!

// One exception as the planner sees it, and the task list it produced for
// the workers. Illustrative content in the shape a PlannerWorkerSwarm run
// takes: the planner's decomposition, then each task with the worker that
// pulled it and the draft it returned.
const plannerOutput = {
  exception: "AWB 176-44821093, 12 pallets of server components, SIN to AMS via DXB. Missed connection at DXB; next direct flight in 31 hours. Consignee has a production line start on Thursday.",
  planner: "Route Planner",
  plannerModel: "gpt-5.4",
  tasks: [
    { id: "T1", task: "Evaluate alternative routings DXB to AMS that arrive before Thursday 06:00 local, including one via FRA or CDG with a road leg.", worker: "Reroute Worker", model: "gpt-5.4-mini", result: "Two options: DXB to FRA tonight plus road to AMS, arrives Wednesday 19:00; or DXB to AMS direct in 31h, arrives Thursday 11:00 and misses the line start." },
    { id: "T2", task: "Draft the consignee notice with the current status, both routing options and the time of the next update.", worker: "Notify Worker", model: "gemini-2.5-flash", result: "Draft notice written, 110 words, references AWB and the Thursday 06:00 deadline, next update 18:00 SGT." },
    { id: "T3", task: "Draft the carrier rebooking request for option 1 and list the documents that must travel with the split.", worker: "Documents Worker", model: "claude-haiku-5-5", result: "Rebooking request drafted; house AWB and packing list need the new routing, no change to the commercial invoice." },
    { id: "T4", task: "Prepare the ETA milestone update for the TMS, marked as proposed until ops confirms the routing.", worker: "Reroute Worker", model: "gpt-5.4-mini", result: "Proposed ETA Wednesday 19:00 CET if option 1 is approved; current ETA left unchanged." },
  ],
}

export default function LogisticsIndustryPage() {
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
          visual={<ShipmentNetworkMap />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="An exception desk as a planner and worker swarm"
          description="Planner agents read each exception and put tasks on a queue. Worker agents pull tasks as they free up and return drafts. The diagram shows one run; the queue monitor beneath it shows the mechanism that makes the pattern fit a quiet night and a storm equally well."
          wide
        >
          <AgentFlowDiagram
            swarmType="PlannerWorkerSwarm"
            task="Three open exceptions: missed connection, customs hold, road closure"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Drafts"
          />
          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
            <PlannerWorkerQueue />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["Planners write the task list", "A planner never fixes anything itself. It reads the exception and writes tasks a worker can finish in one pass: evaluate this routing, draft that message, check this tariff line. Planners run on stronger models because they decide what work exists."],
                ["Workers pull, they are not assigned", "Workers take the next task when they finish the current one, so three exceptions and thirty use the same request. Workers run on fast models because each task is short and well specified."],
                ["Everything comes back as a draft", "Reroute options, carrier messages and document corrections return marked for approval. The ops desk sends what it agrees with through the systems it already uses."],
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
          id="planner-output"
          eyebrow="Planner to workers"
          title="One exception, four tasks, three workers"
          description="What a planner's output looks like for a single missed connection, and the drafts the workers returned against it. The task text is what each worker actually received; the result is what the ops desk reads before approving."
          wide
        >
          <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
            <div className="grid gap-3 border-b border-white/[0.08] px-4 py-4 sm:grid-cols-[150px_minmax(0,1fr)]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Exception</p>
                <p className="mt-1 text-sm font-semibold text-white/85">{plannerOutput.planner}</p>
                <p className="font-mono text-[10px] text-white/35">{plannerOutput.plannerModel}</p>
              </div>
              <p className="text-sm leading-relaxed text-white/60">{plannerOutput.exception}</p>
            </div>
            <ol className="divide-y divide-white/[0.08]">
              {plannerOutput.tasks.map((t) => (
                <li key={t.id} className="grid gap-3 px-4 py-4 sm:grid-cols-[40px_minmax(0,1.1fr)_150px_minmax(0,1fr)]">
                  <span className="font-mono text-xs" style={{ color: industry.accent }}>
                    {t.id}
                  </span>
                  <p className="text-sm leading-relaxed text-white/70">{t.task}</p>
                  <div>
                    <p className="text-xs font-semibold text-white/80">{t.worker}</p>
                    <p className="font-mono text-[10px] text-white/35">{t.model}</p>
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">{t.result}</p>
                </li>
              ))}
            </ol>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] text-white/45">
              <span>4 tasks planned · 4 drafts returned</span>
              <span className="ml-auto">ops desk approves option 1 before the rebooking is sent</span>
            </div>
          </div>
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where logistics teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send in the request."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the desk from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape: a name, a swarm_type, a task and a list of agents. Set SWARMS_API_KEY from your Swarms Cloud account before running. Every output is a draft; nothing is booked, filed or sent."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="The cost of an exception, per shipment"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and latency. Name each run after the shipment reference and the spend on agents can be allocated to a shipment, a lane or a customer."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={1.8} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Overnight runs with a credit check</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The credits endpoint returns the account balance, so a nightly lane review can refuse to start if it would leave the desk short for daytime exception work. The Swarms Cloud example on this page does exactly that before submitting the batch.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Where the humans are</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Coordinators approve reroutes and messages, brokers file declarations, planners sign off on lane changes. The agents draft and compare; the TMS, the carrier portals and the customs systems are still driven by the people who drive them today.
                </p>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions logistics teams ask"
          description="What operations managers, customs leads and platform engineers ask before they put agents on an exception desk."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a planner on your next exception"
          description="Create a Swarms Cloud account, copy the exception desk example above, and paste in the open exceptions from your board. The run shows up in your logs with every task and its cost."
        />

        <MoreIndustries current="logistics" />
      </main>
    </div>
  )
}
