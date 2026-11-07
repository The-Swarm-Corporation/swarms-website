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

import { examples, faqs, flowStages, hero, telemetryMetrics, telemetryName, useCases } from "./data"
import { CitationCheck, ContractScan } from "./visuals"

const industry = industryBySlug("legal")!

// Three playbook rules as the contracts team writes them, the system-prompt
// line each becomes, and what the drafter returns when the clause departs.
const PLAYBOOK_ROWS: { rule: string; written: string; prompt: string; returns: string }[] = [
  {
    rule: "PB-07",
    written: "Limitation of liability: cap at 12 months of fees. Carve-outs only for confidentiality, IP indemnity, gross negligence and wilful misconduct.",
    prompt: "Flag any liability cap below 12 months of fees and any carve-out beyond confidentiality, IP indemnity, gross negligence or wilful misconduct. Rate high. Quote the clause and propose the 12-month cap as the fallback.",
    returns: "Limitation of Liability, PB-07, high. Quoted clause: cap at 3 months of fees. Fallback: 12 months of fees, playbook carve-outs.",
  },
  {
    rule: "PB-09",
    written: "Governing law: Delaware or New York preferred. England and Wales acceptable. Anything else, escalate to the supervising attorney.",
    prompt: "If governing law is Delaware or New York, no flag. If England and Wales, flag low with no fallback. Any other jurisdiction, flag medium and write ESCALATE in the fallback field.",
    returns: "Governing Law, PB-09, medium. Quoted clause: laws of a jurisdiction outside the list. Fallback: ESCALATE.",
  },
  {
    rule: "PB-11",
    written: "Non-compete: we do not accept non-competes binding on us. A non-solicit of employees for up to 12 months is acceptable.",
    prompt: "Flag any covenant that restricts our business, customers or markets, rate high, and propose deleting it. A non-solicit of employees up to 12 months is within playbook; longer than 12 months, flag medium with 12 months as the fallback.",
    returns: "Non-compete, PB-11, high. Quoted clause: 12-month restriction on competing services. Fallback: delete; offer 12-month employee non-solicit.",
  },
]

export default function LegalIndustryPage() {
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
          visual={<ContractScan />}
          accent={industry.accent}
        />

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="Contract review as a council"
          description="The drafter produces the candidate review, three judges score it independently for playbook fit, precedent and consistency, and the ruling writer turns the scores into the memo the supervising attorney reads. Watch one agreement go through the council."
        >
          <AgentFlowDiagram
            swarmType="CouncilAsAJudge"
            task="Review the counterparty MSA against playbook v6"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Review memo"
            intervalMs={1500}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["One candidate, three scores", "The drafter's review is scored by judges that never see each other's work, so a missed rule shows up as a playbook finding and an over-reaching fallback as a precedent finding."],
              ["Dissent is written down", "When the judges disagree, the ruling writer records the disagreement instead of smoothing it over. The attorney sees which flags the council was unsure about first."],
              ["A memo, never a redline", "The agents quote clauses, cite rules and propose fallbacks. They do not edit the agreement. The reviewing attorney decides what to redline, accept or escalate."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="citations"
          eyebrow="Citations"
          title="Every citation checked before an associate reads the draft"
          description="Three verifiers on models from different providers check each citation independently: does the authority exist, does the pin cite land on the proposition, and is the proposition stated accurately. The majority call is recorded, a split is sent to the attorney, and the associate confirms against the reporter."
        >
          <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
            <CitationCheck />
            <div className="flex flex-col gap-4">
              {[
                ["NEEDS SOURCE beats a guess", "Each verifier is told to answer NEEDS SOURCE when it cannot confirm a citation from the materials it was given. A confident wrong answer from one model is outvoted by the other two and shows up as a dissent."],
                ["Three providers, one vote", "The verifiers run on models from different providers, so a blind spot shared by one model family does not become the council's answer."],
                ["The check reduces work, it does not replace it", "The associate still confirms every citation against the reporter before filing. The council's job is to make that pass faster by sorting the citations and showing its reasoning."],
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
          id="playbook"
          eyebrow="Playbook to prompt"
          title="How three playbook rules become system-prompt lines"
          description="The contracts team writes the rule the way it already does. Each rule becomes a line the drafter follows and the playbook judge scores against, and every flag comes back with the rule id, the quoted clause and the fallback."
          wide
        >
          <div className="overflow-x-auto rounded-lg border border-white/[0.08]">
            <table className="w-full min-w-[840px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[#0a0a0a] font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <th scope="col" className="px-4 py-3 font-medium">Rule</th>
                  <th scope="col" className="px-4 py-3 font-medium">As the playbook writes it</th>
                  <th scope="col" className="px-4 py-3 font-medium">System-prompt line</th>
                  <th scope="col" className="px-4 py-3 font-medium">What the drafter returns</th>
                </tr>
              </thead>
              <tbody>
                {PLAYBOOK_ROWS.map((row) => (
                  <tr key={row.rule} className="border-t border-white/[0.08] bg-black align-top">
                    <th scope="row" className="px-4 py-3.5 font-mono text-xs font-semibold" style={{ color: industry.accent }}>
                      {row.rule}
                    </th>
                    <td className="px-4 py-3.5 leading-relaxed text-white/55">{row.written}</td>
                    <td className="px-4 py-3.5 font-mono text-xs leading-relaxed text-white/75">{row.prompt}</td>
                    <td className="px-4 py-3.5 leading-relaxed text-white/55">{row.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </IndustrySection>

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where legal teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send. In every one, an attorney, associate or paralegal makes the call the agents prepared for, and privilege determinations stay with the attorney."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every run on the matter file"
          description="Runs from the API land in Swarms Cloud with their inputs, each agent's output, token usage and cost. Name runs after the matter and the document, as the batch example does, and the firm can see exactly what was sent, what came back and what it cost per matter."
        >
          <CloudTelemetry accent={industry.accent} swarmName={telemetryName} metrics={telemetryMetrics} />
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the council from Python, TypeScript or cURL"
          description="The Swarms API examples share one request shape; only swarm_type and the agents list change between the review council and the citation vote. The last tab runs a pipeline in-process with the open-source swarms package. Set SWARMS_API_KEY from your Swarms Cloud account."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustryFaqSection
          title="Questions legal teams ask"
          description="What general counsel, knowledge management and the firm's technology committee ask before an agent reads a contract."
          faqs={faqs}
        />

        <IndustryCta
          title="Put a reviewed memo in front of your attorneys"
          description="Create a Swarms Cloud account, copy the contract review council above, and paste in your own playbook rules. The memo and its run log show up in your account on the first call."
        />

        <MoreIndustries current="legal" />
      </main>
    </div>
  )
}
