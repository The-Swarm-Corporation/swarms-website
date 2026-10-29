import { highlightCodeExamples } from "@/components/code-examples"
import { MarketplaceClientPage } from "./MarketplaceClientPage"

const mcpExamples = [
  {
    lang: "Claude Code",
    file: "terminal",
    code: `claude mcp add --transport http swarms https://swarms.world/mcp \\
  --header "Authorization: Bearer $SWARMS_API_KEY"`,
  },
  {
    lang: "Cursor",
    file: ".cursor/mcp.json",
    code: `{
  "mcpServers": {
    "swarms": {
      "url": "https://swarms.world/mcp",
      "headers": { "Authorization": "Bearer sk-..." }
    }
  }
}`,
  },
]

const discoveryExamples = [
  { lang: "Load a prompt", file: "load_prompt.py", code: `from swarms import Agent

# Fetches the prompt from the marketplace and installs it
# as the system prompt automatically.
agent = Agent(
    model_name="gpt-4o-mini",
    marketplace_prompt_id="75fc0d28-b0d0-4372-bc04-824aa388b7d2",
)

response = agent.run("Summarize the key risks in this quarterly filing.")` },
  { lang: "Publish an agent", file: "publish_agent.py", code: `from swarms import Agent

agent = Agent(
    agent_name="Compliance Checker",
    agent_description="Reviews documents for regulatory compliance issues",
    model_name="gpt-4o",
    publish_to_marketplace=True,
    use_cases=[
        {"title": "Contract review", "description": "Flag non-compliant clauses in contracts"},
        {"title": "Policy audit", "description": "Check internal policies against regulations"},
    ],
    tags=["compliance", "legal", "document-review"],
)

# Validated and published to swarms.world the moment it runs.
agent.run("Review this vendor agreement for GDPR issues.")` },
]

const apiExamples = [
  { lang: "cURL", file: "openapi.spec.sh", code: `# The full API surface, generated from the live route code,
# so it cannot drift from what the API actually accepts.
curl https://swarms.world/openapi.json

# Human- and agent-readable index of the same 26 endpoints,
# grouped by purpose.
curl https://swarms.world/llms.txt` },
]

// The page body is a client component (framer-motion, tabs). The code
// examples are highlighted here on the server and passed in as rendered
// nodes, so Shiki never ships to the browser for this route.
export default function MarketplacePage() {
  return (
    <MarketplaceClientPage
      mcpExamples={highlightCodeExamples(mcpExamples)}
      discoveryExamples={highlightCodeExamples(discoveryExamples)}
      apiExamples={highlightCodeExamples(apiExamples)}
    />
  )
}
