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
import { industryBySlug, RED } from "@/lib/industries"

import { examples, faqs, flowStages, hero, telemetryName, useCases } from "./data"
import { ClaimsPipelineBoard, UnderwritingRiskPanel } from "./visuals"

const industry = industryBySlug("insurance")!

// What a MajorityVoting response gives the adjuster for one claim: each
// reviewer's vote with its reason, the tally, and the decision line that the
// adjuster fills in. Illustrative content, laid out the way a claims system
// would show it.
const decisionRecord = {
  claim: "HO-2026-118342",
  peril: "Water damage, burst supply line under kitchen sink",
  votes: [
    { reviewer: "Coverage Reviewer", model: "gpt-5.4-mini", vote: "APPROVE", reason: "Sudden and accidental discharge is covered under HO-3 Coverage A. Gradual seepage exclusion does not apply on the facts given. $1,000 deductible." },
    { reviewer: "Damage Reviewer", model: "claude-sonnet-5-5", vote: "APPROVE", reason: "Estimate of $14,850 for flooring, lower cabinets and drywall is consistent with the room described and 11 photos. Field visit not required." },
    { reviewer: "Fraud Reviewer", model: "gemini-2.5-flash", vote: "INVESTIGATE", reason: "Plumber invoice is dated one day after the loss, which is plausible, but this is the third claim at the address in 24 months. Recommend an SIU desk review before payment." },
  ],
  tally: "APPROVE 2, INVESTIGATE 1, DENY 0",
  majority: "APPROVE, with the fraud dissent attached",
}

const VOTE_COLOR: Record<string, string> = { APPROVE: "rgba(255,255,255,0.9)", INVESTIGATE: "rgba(255,255,255,0.55)", DENY: RED }

export default function InsuranceIndustryPage() {
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
          visual={<ClaimsPipelineBoard />}
          accent={industry.accent}
        />

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where insurers put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send in the request. In every one of them the agents read, extract, score and draft; an adjuster, underwriter or investigator makes the decision."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="A claim decision as a majority vote"
          description="Three reviewer agents read the same claim file at the same time without seeing each other's answers. A tally agent counts the votes and returns the majority with each dissent attached. Watch a claim move through the desk."
        >
          <AgentFlowDiagram
            swarmType="MajorityVoting"
            task="Claim HO-2026-118342: approve, investigate or deny"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Recommendation"
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Independent reads", "Each reviewer gets the full claim file and its own system prompt: coverage checks the form and exclusions, damage checks the estimate, fraud checks history and timing. None of them sees the others' votes."],
              ["Models chosen per reviewer", "Routine form logic runs on a fast, cheap model. The estimate review, which needs more reasoning, runs on a stronger one. Mixing providers also means one model's blind spot is not everyone's."],
              ["Majority plus dissent", "The tally returns the winning vote and the count. A 3 of 3 approve on a glass claim can be fast-tracked by policy; a 2 to 1 split goes to the adjuster with the dissenting reason on top."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="decision-record"
          eyebrow="What comes back"
          title="The decision record an adjuster reads"
          description="A MajorityVoting response is a record, not a verdict. The left card is what one claim's response looks like once it is laid out in a claims system. The right panel is the underwriting counterpart: a submission scored factor by factor before an underwriter decides."
          wide
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
              <div className="flex flex-wrap items-center gap-3 border-b border-white/[0.08] px-4 py-3">
                <span className="text-sm font-semibold text-white/85">Decision record</span>
                <span className="font-mono text-[11px] text-white/45">{decisionRecord.claim}</span>
                <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Illustrative</span>
              </div>
              <div className="px-4 py-3 text-xs text-white/55">{decisionRecord.peril}</div>
              <ol className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
                {decisionRecord.votes.map((v, i) => (
                  <li key={v.reviewer} className="grid gap-2 px-4 py-3 sm:grid-cols-[24px_150px_minmax(0,1fr)]">
                    <span className="font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="text-sm font-semibold text-white/85">{v.reviewer}</p>
                      <p className="font-mono text-[10px] text-white/35">{v.model}</p>
                      <span className="mt-1.5 inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] tracking-wide" style={{ color: VOTE_COLOR[v.vote], borderColor: v.vote === "DENY" ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.25)" }}>
                        {v.vote}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed text-white/55">{v.reason}</p>
                  </li>
                ))}
              </ol>
              <div className="space-y-1.5 border-t border-white/[0.08] bg-black/40 px-4 py-3 font-mono text-[11px] leading-5">
                <p className="text-white/50">
                  tally <span className="text-white/80">{decisionRecord.tally}</span>
                </p>
                <p className="text-white/50">
                  majority <span style={{ color: industry.accent }}>{decisionRecord.majority}</span>
                </p>
                <p className="text-white/50">
                  adjuster decision <span className="text-white/35">pending, recorded in the claims system with the adjuster's name</span>
                </p>
              </div>
            </div>
            <UnderwritingRiskPanel />
          </div>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the review from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape: a name, a swarm_type, a task and a list of agents. Set SWARMS_API_KEY from your Swarms Cloud account before running. None of these examples pays, reserves or denies anything."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every vote logged against the claim"
          description="Runs from the API land in Swarms Cloud with their inputs, each reviewer's output, token usage and cost. Name each run after the claim id and the full agent record for one claim is one query away when a complaint or an audit asks for it."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={2.2} />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">What a regulator can ask for</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  The request text, each agent's system prompt and output, the model ids, token counts and latency for the run, and the adjuster decision your own system recorded afterwards. The swarm logs endpoint returns the first five; the sixth stays with you.
                </p>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">Where the humans are</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Adjusters decide claims, underwriters decide risks and SIU decides referrals. The agents on this page produce recommendations with reasons attached, and any authority limit you have today still applies to the person who acts on them.
                </p>
              </div>
            </div>
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions insurers ask"
          description="What claims leaders, underwriting managers and platform engineers ask before they put agents on a desk."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a vote on your next claim"
          description="Create a Swarms Cloud account, copy the claim vote example above, and paste in a redacted claim file. The run shows up in your logs with every vote and its cost."
        />

        <MoreIndustries current="insurance" />
      </main>
    </div>
  )
}
