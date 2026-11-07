import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

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
import { MarketSignalChart, RiskAllocationBoard } from "./visuals"

const industry = industryBySlug("finance")!

export default function FinanceIndustryPage() {
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
          visual={<MarketSignalChart />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="A research desk as a hierarchical swarm"
          description="The director decomposes the ticker, three analysts work in parallel on the models that suit their job, and a risk officer sizes the call before the memo is returned. Watch a run move through the desk."
        >
          <AgentFlowDiagram
            swarmType="HierarchicalSwarm"
            task="Investment memo on NVDA ahead of earnings"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Memo"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Director plans", "The director agent reads the task, writes sub-tasks for each analyst and decides what counts as done."],
              ["Analysts run in parallel", "Macro, equity and quant agents work at the same time on separate models, so the desk is as slow as its slowest analyst, not the sum."],
              ["Risk signs off", "The risk officer sees every analyst's output and returns a size, a stop and the limits that apply, or rejects the trade."],
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
          title="Where finance teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to. The agents list is the roster you would send in the request."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the desk from Python, TypeScript, cURL or Rust"
          description="The Swarms API examples share one request shape. The Rust example runs the same pattern in-process with the Swarms Rust framework. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every run logged, priced and reviewable"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and cost. The risk board shows the kind of control an agent can enforce on every run; the telemetry is what the desk sees afterwards."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <RiskAllocationBoard />
            <div className="flex flex-col gap-6">
              <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={1.4} />
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">In-process with Rust when latency matters</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Desks that already run Rust services can host the same agents and workflows inside their own process with the Swarms Rust framework, and keep the Swarms API for research and reporting jobs that benefit from hosted logging and billing.
                </p>
                <Link href="/swarms-rs" className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white">
                  Swarms Rust framework
                  <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
                </Link>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions finance teams ask"
          description="What portfolio managers, risk officers and platform engineers ask before they put agents on a desk."
          faqs={faqs}
        />

        <IndustryCta
          title="Put an agent desk on your next memo"
          description="Create a Swarms Cloud account, copy the research desk example above, and change the ticker. The first run shows up in your logs with its cost."
        />

        <MoreIndustries current="finance" />
      </main>
    </div>
  )
}
