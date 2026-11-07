import { Ban, Check } from "lucide-react"

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
import { AlertTriageFunnel, AttackGrid } from "./visuals"

const industry = industryBySlug("cybersecurity")!

const neverDo = [
  { title: "No autonomous containment", body: "Agents do not isolate hosts, disable accounts, block domains or kill processes. They propose; an analyst carries out any action through the tools the team already uses." },
  { title: "No credential handling", body: "Agents are never given passwords, tokens, API keys for your systems or console sessions. The request contains alert text and log excerpts, and that is all they see." },
  { title: "No silent verdicts", body: "Every verdict is a proposal with its evidence lines. An analyst confirms, changes or rejects it, and both the proposal and the decision are kept." },
  { title: "No following links or detonating files", body: "Reviewers reason from headers, URLs and text they are handed. Sandboxing and detonation stay with your existing tooling." },
]

const integrations = [
  { name: "SIEM", items: "Correlated searches, saved-search results, notable events as text or JSON" },
  { name: "EDR", items: "Process trees, alert details and host timelines exported for a time window" },
  { name: "Mail gateway", items: "User-reported messages with headers, extracted URLs and body text" },
  { name: "Identity provider", items: "Sign-in logs, risk events and group changes for the accounts involved" },
  { name: "Cloud audit logs", items: "Control-plane events for the accounts and resources named in the alerts" },
  { name: "Ticketing", items: "The incident record the draft report and the agent run logs are attached to" },
]

export default function CybersecurityIndustryPage() {
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
          visual={<AlertTriageFunnel />}
          accent={industry.accent}
        />

        <IndustrySection
          id="boundaries"
          eyebrow="Boundaries"
          title="What the agents never do, and what feeds them"
          description="A security team's first question is what an agent can touch. The answer on this page is text in, text out. The left box is the standing rule set; the right is where the text comes from."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-3">
                <Ban className="h-4 w-4" style={{ color: "#ef4444" }} aria-hidden="true" />
                <h3 className="text-base font-semibold text-white">What the agents never do</h3>
              </div>
              <ul className="divide-y divide-white/[0.08]">
                {neverDo.map((n) => (
                  <li key={n.title} className="px-5 py-4">
                    <p className="text-sm font-semibold text-white/85">{n.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-white/50">{n.body}</p>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/[0.08] bg-black/40 px-5 py-3 font-mono text-[11px] text-white/45">Analysts approve any action. The agents read, correlate and write.</p>
            </div>
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
              <div className="flex items-center gap-3 border-b border-white/[0.08] px-5 py-3">
                <Check className="h-4 w-4 text-white/70" aria-hidden="true" />
                <h3 className="text-base font-semibold text-white">What feeds the request</h3>
              </div>
              <ul className="divide-y divide-white/[0.08]">
                {integrations.map((i) => (
                  <li key={i.name} className="grid gap-1 px-5 py-3.5 sm:grid-cols-[140px_minmax(0,1fr)]">
                    <p className="text-sm font-semibold text-white/85">{i.name}</p>
                    <p className="text-sm leading-relaxed text-white/50">{i.items}</p>
                  </li>
                ))}
              </ul>
              <p className="border-t border-white/[0.08] bg-black/40 px-5 py-3 font-mono text-[11px] text-white/45">Exports and read-only queries build the task string. Nothing writes back.</p>
            </div>
          </div>
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="An investigation as a HeavySwarm"
          description="Four stages in order: a question agent frames what must be answered, a research agent gathers the related events, an analysis agent maps indicators to tactics and techniques, and a synthesis agent drafts the report. Watch one cluster move through, then see the technique map fill in below."
          wide
        >
          <AgentFlowDiagram
            swarmType="HeavySwarm"
            task="Alert cluster INC-2026-0419, 7 alerts, 3 hosts"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Draft report"
          />
          <div className="mt-6">
            <AttackGrid />
          </div>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Question", "A fast model writes the questions: initial access, scope, persistence, exfiltration. Framing first keeps the research from wandering."],
              ["Research", "A long-context model gathers every related event and what is known about each indicator, citing the alert line it relies on."],
              ["Analysis", "A reasoning model maps each indicator to a tactic and technique with evidence and a confidence, and builds the likely timeline."],
              ["Synthesis", "The strongest writer drafts the report in your sections, lists open questions plainly, and ends with next steps for the analyst to approve."],
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
          title="Where security teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send in the request. Every output is a proposal or a draft for an analyst or engineer to act on."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the investigation from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape: a name, a swarm_type, a task and a list of agents. Set SWARMS_API_KEY from your Swarms Cloud account before running. No example here has access to a console, a credential or a containment action."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="The agent record, per incident"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and latency. Name each run after the incident id and the complete agent record for one incident can be pulled and attached to its ticket, as the audit example does."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.8} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">What an incident review can see</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The alert text that was sent, each stage's output, the model ids, token counts and latency, and the analyst's decision your ticketing system recorded. The swarm logs endpoint returns the first four; the decision stays with you.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Tuning from disagreements</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  When an analyst changes a proposed verdict, the proposal and its reason are already in the log. Reviewing those cases weekly is how the triage prompts get better, and the record of each change is the evidence that a person made the call.
                </p>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions security teams ask"
          description="What SOC leads, detection engineers and security platform teams ask before they put agents near an alert queue."
          faqs={faqs}
        />

        <IndustryCta
          title="Investigate your next cluster with a swarm"
          description="Create a Swarms Cloud account, copy the investigation example above, and paste in a redacted alert cluster. The draft report shows up in your logs with every stage and its cost."
        />

        <MoreIndustries current="cybersecurity" />
      </main>
    </div>
  )
}
