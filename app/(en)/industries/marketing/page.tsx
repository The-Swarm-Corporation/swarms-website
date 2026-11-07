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
import { CampaignFunnelBoard, ContentPipelineKanban } from "./visuals"

const industry = industryBySlug("marketing")!

// How a style guide becomes the rules string. The left column is the kind of
// line a brand team already has; the right column is what goes in the request.
const guardrails: { guideline: string; rule: string; checkedBy: string }[] = [
  {
    guideline: "We sound direct and calm. We talk to one reader.",
    rule: "Voice: direct, specific, second person. No exclamation marks.",
    checkedBy: "Brand Reviewer rewrites the line and cites the rule",
  },
  {
    guideline: "Legal asked us to stop saying we are the fastest.",
    rule: "Never claim 'the best' or 'the fastest' without a source.",
    checkedBy: "Brand Reviewer flags the claim; Claims Judge scores it low",
  },
  {
    guideline: "We do not mention other products by name.",
    rule: "Do not name competitors. Describe the category instead.",
    checkedBy: "Audience Researcher lists them so the Copywriter can avoid them",
  },
  {
    guideline: "Prices look like $12, not $12.00 or 12 USD.",
    rule: "Prices carry the currency symbol and no decimals.",
    checkedBy: "Channel Formatter normalises every price it finds",
  },
  {
    guideline: "The product is Ledgerline. One word, capital L.",
    rule: "Product name is 'Ledgerline', never 'LedgerLine' or 'ledgerline'.",
    checkedBy: "Brand Reviewer and Channel Formatter both check spelling",
  },
]

export default function MarketingIndustryPage() {
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
          visual={<CampaignFunnelBoard />}
          accent={industry.accent}
        />

        <IndustrySection
          id="use-cases"
          eyebrow="Use cases"
          title="Where marketing teams put agents to work"
          description="Each card names the Swarms API swarm type it maps to and the agents you would send in the request. Drafts, scores and reports come back; publishing stays with your team."
        >
          <UseCaseGrid useCases={useCases} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="architecture"
          eyebrow="Architecture"
          title="A campaign as a sequential workflow"
          description="Research, draft, brand review and formatting run in order, and each agent receives the previous agent's output. The style guide travels with the request as rules, so the reviewer checks the same lines on every run. Watch a campaign move through the pipeline."
        >
          <AgentFlowDiagram
            swarmType="SequentialWorkflow"
            task="Spring launch: landing hero, welcome emails, six paid social variants"
            stages={flowStages}
            accent={industry.accent}
            outputLabel="Copy pack"
            intervalMs={1400}
          />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              ["Order is the contract", "In a SequentialWorkflow the agents list is the pipeline. The researcher's brief is the copywriter's input, the drafts are the reviewer's input, and the reviewed copy is what the formatter cuts to size."],
              ["Rules reach every agent", "The rules string is appended to every agent's context. The copywriter writes inside the guardrails and the reviewer is asked to list each rule a line broke, so the review is readable by the brand team."],
              ["Models match the step", "A fast model summarises research and applies character limits, a strong writer drafts, and a strong reviewer checks claims. Each agent carries its own model_name in the same request."],
            ].map(([title, body]) => (
              <div key={title} className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5">
                <h3 className="text-base font-semibold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
              </div>
            ))}
          </div>
        </IndustrySection>

        <IndustrySection
          id="guardrails"
          eyebrow="Brand guardrails"
          title="From the style guide to the rules field"
          description="Brand teams already have the guidelines. The work is rewriting each one as a line an agent can check with a yes or no, then sending the list as the rules string on every request. The table shows the translation and which agent in the pipeline acts on each rule."
          wide
        >
          <div className="overflow-x-auto rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">
                  <th scope="col" className="px-5 py-3 font-medium">Style guide says</th>
                  <th scope="col" className="px-5 py-3 font-medium">Line in <span className="normal-case tracking-normal text-white/60">rules</span></th>
                  <th scope="col" className="px-5 py-3 font-medium">Acted on by</th>
                </tr>
              </thead>
              <tbody>
                {guardrails.map((g) => (
                  <tr key={g.rule} className="border-b border-white/[0.06] last:border-b-0 align-top">
                    <td className="px-5 py-4 text-white/60">{g.guideline}</td>
                    <td className="px-5 py-4">
                      <code className="rounded border border-white/[0.1] bg-white/[0.03] px-2 py-1 font-mono text-[12px] text-white/85">{g.rule}</code>
                    </td>
                    <td className="px-5 py-4 text-white/55">{g.checkedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/50">
            The whole list goes in the <code className="font-mono text-[12.5px] text-white/75">rules</code> field as one string. Keep it short enough that a reviewer agent can quote the rule it applied; a page of prose is harder to enforce than ten lines.
          </p>
        </IndustrySection>

        <IndustrySection
          id="code"
          eyebrow="Code"
          title="Run the pipeline from Python, cURL or TypeScript"
          description="The Swarms API examples share one request shape. The batch example localizes one campaign for four markets in a single call, and the framework example runs the same roles in-process. Set SWARMS_API_KEY from your Swarms Cloud account before running."
          wide
        >
          <IndustryCodeExamples examples={highlighted} accent={industry.accent} />
        </IndustrySection>

        <IndustrySection
          id="cloud"
          eyebrow="Swarms Cloud"
          title="Every piece of content with its run, its reviewer notes and its cost"
          description="Each card on the board is one run of the pipeline. Swarms Cloud keeps the run with the researcher's brief, the drafts, the reviewer's change list and the token usage, so a content lead can see why a piece was sent back and what the month's content cost to produce."
        >
          <div className="grid gap-6">
            <ContentPipelineKanban />
            <CloudTelemetry accent={industry.accent} swarmName={telemetryName} scale={0.8} />
          </div>
        </IndustrySection>

        <IndustryFaqSection
          title="Questions marketing teams ask"
          description="What content leads, brand managers and marketing engineers ask before they put agents on a campaign."
          faqs={faqs}
        />

        <IndustryCta
          title="Run your next campaign brief through the pipeline"
          description="Create a Swarms Cloud account, paste your style guide into the rules field of the example above, and send your brief. The first run shows up in your logs with the reviewer's notes and its cost."
        />

        <MoreIndustries current="marketing" />
      </main>
    </div>
  )
}
