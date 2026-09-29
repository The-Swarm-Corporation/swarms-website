// Shared content for the /stack page. The hero diagram, the layer explorer,
// and the coverage matrix all read from here so product names, jobs, and
// links cannot drift between sections.

export type ProductId = "python" | "rust" | "api" | "cloud" | "marketplace"
export type Job = "build" | "deploy" | "monitor" | "monetize"

export const JOBS: { id: Job; label: string; caption: string }[] = [
  {
    id: "build",
    label: "Build",
    caption: "Write the agent in Swarms Python or Swarms Rust.",
  },
  {
    id: "deploy",
    label: "Deploy",
    caption: "Serve it through the Swarms API, from any language.",
  },
  {
    id: "monitor",
    label: "Monitor",
    caption: "Watch every run in Swarms Cloud: logs, tokens, cost, and context use.",
  },
  {
    id: "monetize",
    label: "Monetize",
    caption: "List it on the Swarms Marketplace and keep 90% of every sale.",
  },
]

export type StackProduct = {
  id: ProductId
  job: Job
  name: string
  /** Short name printed on the diagram and used in tight table headers. */
  short: string
  /** Mono sub-label printed on the diagram and in the explorer rail. */
  handle: string
  role: string
  facts: string[]
  install?: string
  github?: string
  primary: { label: string; href: string }
  docs: { label: string; href: string }
  artifact:
    | { kind: "code"; file: string; code: string }
    | { kind: "telemetry" }
    | { kind: "sale"; file: string; code: string }
}

export const PRODUCTS: StackProduct[] = [
  {
    id: "python",
    job: "build",
    name: "Swarms Python",
    short: "Python",
    handle: "pip install swarms",
    role: "The core framework. Agents, tools, memory, and multi-agent architectures in plain Python.",
    facts: [
      "Sequential, concurrent, hierarchical, graph, group chat, and more architectures",
      "Any provider: OpenAI, Anthropic, Gemini, Groq, DeepSeek, Ollama, vLLM",
      "Tools, MCP servers, and vector memory built in",
      "Publish an agent to the Marketplace from its constructor",
    ],
    install: "pip install -U swarms",
    github: "kyegomez/swarms",
    primary: { label: "View on GitHub", href: "https://github.com/kyegomez/swarms" },
    docs: { label: "Documentation", href: "https://docs.swarms.world" },
    artifact: {
      kind: "code",
      file: "workflow.py",
      code: `from swarms import Agent, SequentialWorkflow

researcher = Agent(
    agent_name="Researcher",
    system_prompt="Research the topic and list the key facts.",
    model_name="gpt-4.1",
)

writer = Agent(
    agent_name="Writer",
    system_prompt="Turn the research into a short brief.",
    model_name="gpt-4.1",
)

workflow = SequentialWorkflow(agents=[researcher, writer])
print(workflow.run("Where is battery storage heading in 2027?"))`,
    },
  },
  {
    id: "rust",
    job: "build",
    name: "Swarms Rust",
    short: "Rust",
    handle: "cargo add swarms-rs",
    role: "The same agent model in Rust, for services where latency, memory, and concurrency matter.",
    facts: [
      "Memory-safe with no garbage collector, async on Tokio",
      "Concurrent, sequential, and graph workflows",
      "MCP support over STDIO and SSE",
      "OpenAI, DeepSeek, and any OpenAI-compatible endpoint",
    ],
    install: "cargo add swarms-rs",
    github: "The-Swarm-Corporation/swarms-rs",
    primary: {
      label: "View on GitHub",
      href: "https://github.com/The-Swarm-Corporation/swarms-rs",
    },
    docs: { label: "docs.rs", href: "https://docs.rs/swarms-rs/latest/swarms_rs/" },
    artifact: {
      kind: "code",
      file: "main.rs",
      code: `use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = OpenAI::new(std::env::var("OPENAI_API_KEY")?)
        .set_model("gpt-4.1");

    let planner = client.agent_builder()
        .agent_name("Planner")
        .system_prompt("Break the work into clear steps.")
        .build();

    let solver = client.agent_builder()
        .agent_name("Solver")
        .system_prompt("Execute the plan and return the answer.")
        .build();

    let workflow = ConcurrentWorkflow::builder()
        .name("Plan and Solve")
        .agents(vec![Box::new(planner), Box::new(solver)])
        .build();

    let result = workflow.run("Design a rate limiter").await?;
    println!("{}", serde_json::to_string_pretty(&result)?);
    Ok(())
}`,
    },
  },
  {
    id: "api",
    job: "deploy",
    name: "Swarms API",
    short: "API",
    handle: "api.swarms.world",
    role: "Hosted multi-agent orchestration over REST. Send agent configs and a task, get the result back.",
    facts: [
      "16 swarm architectures behind one endpoint",
      "2,000+ models with one API key",
      "Batch endpoints for thousands of tasks per job",
      "SDKs for Python, TypeScript, Go, and Java",
    ],
    install: "pip install swarms-client",
    primary: { label: "Get an API key", href: "https://cloud.swarms.world/api-keys" },
    docs: { label: "API reference", href: "https://docs.swarms.ai" },
    artifact: {
      kind: "code",
      file: "swarm.py",
      code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/swarm/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "name": "Market Research Swarm",
        "swarm_type": "MixtureOfAgents",
        "task": "Build a quarterly outlook for semiconductors.",
        "agents": [
            {"agent_name": "Macro Analyst", "model_name": "gpt-4.1"},
            {"agent_name": "Equity Analyst", "model_name": "claude-opus-5"},
        ],
    },
)

result = response.json()
print(result["outputs"], result["usage"])`,
    },
  },
  {
    id: "cloud",
    job: "monitor",
    name: "Swarms Cloud",
    short: "Cloud",
    handle: "cloud.swarms.world",
    role: "The monitoring and telemetry layer. Every run your agents make, with its logs, tokens, cost, and context use.",
    facts: [
      "Searchable logs for every request, by agent, endpoint, ID, time, or task text",
      "A page for every completion with the exact request, response, tokens, and cost",
      "Per-agent activity, spend, and context-window use, run by run",
      "Token usage by day, week, or month, with an end-of-month spend projection",
    ],
    primary: { label: "Open Swarms Cloud", href: "https://cloud.swarms.world" },
    docs: { label: "What is Swarms Cloud?", href: "/blog/what-is-swarms-cloud" },
    artifact: { kind: "telemetry" },
  },
  {
    id: "marketplace",
    job: "monetize",
    name: "Swarms Marketplace",
    short: "Market",
    handle: "swarms.world",
    role: "Where agents, prompts, tools, MCP servers, and skills are bought and sold.",
    facts: [
      "Publish for free and keep 90% of every sale",
      "Buyers pay by card in 100+ countries, or in crypto",
      "Tokenize an agent on Solana and earn on every trade",
      "6,000+ listings, with a public API and an MCP server",
    ],
    primary: { label: "Open the Marketplace", href: "https://swarms.world" },
    docs: { label: "How selling works", href: "/marketplace" },
    artifact: {
      kind: "sale",
      file: "publish_agent.py",
      code: `from swarms import Agent

agent = Agent(
    agent_name="Compliance Checker",
    agent_description="Reviews documents for regulatory issues",
    model_name="gpt-4.1",
    publish_to_marketplace=True,
    tags=["compliance", "legal"],
)

# Validated and listed on swarms.world when it runs.
agent.run("Review this vendor agreement for GDPR issues.")`,
    },
  },
]

export const productById = Object.fromEntries(PRODUCTS.map((p) => [p.id, p])) as Record<
  ProductId,
  StackProduct
>

export type Need = {
  job: Job
  need: string
  how: string
  covered: ProductId[]
}

export const NEEDS: Need[] = [
  {
    job: "build",
    need: "Compose agents into teams",
    how: "Sequential, concurrent, hierarchical, and graph architectures in Python or Rust, or 16 of them over REST.",
    covered: ["python", "rust", "api"],
  },
  {
    job: "build",
    need: "Use any model provider",
    how: "A model is a string. Change model_name to switch providers; the API reaches 2,000+ models with one key.",
    covered: ["python", "rust", "api"],
  },
  {
    job: "build",
    need: "Give agents tools and MCP servers",
    how: "Attach functions or MCP servers in either framework or over the API, or buy them ready-made on the Marketplace.",
    covered: ["python", "rust", "api", "marketplace"],
  },
  {
    job: "build",
    need: "Run with native speed and memory safety",
    how: "Swarms Rust runs agents on Tokio with no garbage collector and zero-copy message passing.",
    covered: ["rust"],
  },
  {
    job: "build",
    need: "Remember across runs",
    how: "Vector memory in Python (Chroma, Pinecone, FAISS, Qdrant) and scoped shared memory in the API.",
    covered: ["python", "api"],
  },
  {
    job: "deploy",
    need: "Call agents from any language",
    how: "Plain REST plus SDKs for Python, TypeScript, Go, and Java.",
    covered: ["api"],
  },
  {
    job: "deploy",
    need: "Run multi-agent teams without managing servers",
    how: "Send agent configs and a task; the API runs the agents and the orchestration on hosted infrastructure.",
    covered: ["api"],
  },
  {
    job: "deploy",
    need: "Run one agent over thousands of tasks",
    how: "Batch endpoints take a list of complete requests and run them concurrently on the platform.",
    covered: ["api"],
  },
  {
    job: "deploy",
    need: "Stream results as they are generated",
    how: "Token-by-token streaming for low-latency interfaces and live progress on long runs.",
    covered: ["api"],
  },
  {
    job: "monitor",
    need: "See the logs, payload, and response of every run",
    how: "Search every request by agent, endpoint, ID, time, or task text, and open any completion to see exactly what was sent and returned.",
    covered: ["api", "cloud"],
  },
  {
    job: "monitor",
    need: "Track tokens and cost per agent",
    how: "Every API response carries usage, Python agents keep their own token accounting, and Cloud totals it all per agent and per run.",
    covered: ["python", "api", "cloud"],
  },
  {
    job: "monitor",
    need: "Catch agents about to run out of context",
    how: "Each agent's page shows how much of the model's context window every run filled.",
    covered: ["cloud"],
  },
  {
    job: "monitor",
    need: "Forecast your monthly spend",
    how: "Token Usage charts spend by day, week, or month and projects where the month will land.",
    covered: ["cloud"],
  },
  {
    job: "monitor",
    need: "Check each agent's effective configuration",
    how: "An agent's page lists all 34 configuration fields with the API's defaults filled in, including the ones you never set.",
    covered: ["cloud"],
  },
  {
    job: "monetize",
    need: "Sell agents, prompts, tools, MCP servers, and skills",
    how: "Listing is free in every category, with no minimum reputation to charge.",
    covered: ["marketplace"],
  },
  {
    job: "monetize",
    need: "Publish straight from code",
    how: "Set publish_to_marketplace=True on a Python agent and it is validated and listed when it runs.",
    covered: ["python", "marketplace"],
  },
  {
    job: "monetize",
    need: "Get paid by card or crypto",
    how: "A flat 10% platform fee. You keep 90% whether the buyer pays through Stripe or in SOL.",
    covered: ["marketplace"],
  },
  {
    job: "monetize",
    need: "Tokenize an agent",
    how: "Launch it on a Solana bonding curve with no capital and earn a share of every trade.",
    covered: ["marketplace"],
  },
  {
    job: "monetize",
    need: "Reuse what others have published",
    how: "Load a marketplace prompt into an agent by ID, or connect the marketplace MCP server to Claude Code or Cursor.",
    covered: ["python", "marketplace"],
  },
]

// Rendered as the FAQ section and as FAQPage structured data in layout.tsx,
// so the visible answers and the ones search engines read are the same text.
export const FAQS: { q: string; a: string; link?: { label: string; href: string } }[] = [
  {
    q: "What is the Swarms stack?",
    a: "The Swarms stack is a set of five products that cover the full life of an AI agent. Swarms Python and Swarms Rust are open-source frameworks for building agents and multi-agent systems. The Swarms API deploys and runs them, Swarms Cloud monitors every run, and the Swarms Marketplace is where you sell them. The hosted products share one account and one API key.",
  },
  {
    q: "Should I build my AI agents in Python or Rust?",
    a: "Start with Swarms Python if you want the widest choice of multi-agent architectures, model providers, tools, and examples. Choose Swarms Rust for services where latency, memory use, and concurrency matter: it is memory-safe, has no garbage collector, and runs async on Tokio. Both support MCP servers and OpenAI-compatible model endpoints.",
    link: { label: "Install Swarms", href: "/installation" },
  },
  {
    q: "How do I deploy an AI agent with Swarms?",
    a: "Send the agent's configuration and a task to the Swarms API at api.swarms.world, as plain REST from any language or through the SDKs for Python, TypeScript, Go, and Java. The API runs single agents, 16 multi-agent architectures, and batch jobs of thousands of tasks on hosted infrastructure, and returns token usage with every response.",
    link: { label: "About the Swarms API", href: "/api" },
  },
  {
    q: "How do I monitor AI agents in production?",
    a: "Swarms Cloud logs every request your agents make through the Swarms API. Search runs by agent, endpoint, ID, time, or task text, open any completion to see its exact request, response, tokens, and cost, and track spend and context-window use per agent, with a projection of where the month's spend will land.",
    link: { label: "What is Swarms Cloud?", href: "/blog/what-is-swarms-cloud" },
  },
  {
    q: "Which models and multi-agent architectures does the Swarms API support?",
    a: "One API key reaches 2,000+ models from providers including OpenAI, Anthropic, Google, xAI, DeepSeek, and Meta. The API offers 16 swarm architectures, among them sequential and concurrent workflows, hierarchical swarms, graph workflows, group chat, and mixture of agents. Switching models is a one-line change to model_name.",
  },
  {
    q: "How do I make money from an AI agent?",
    a: "Publish it on the Swarms Marketplace at swarms.world. Listing is free, and you keep 90% of every sale, whether the buyer pays by card through Stripe or in crypto. You can also launch the agent as a token on Solana and earn a share of every trade, or use Vault Mode to give access to token holders instead of charging a price.",
    link: { label: "How the Marketplace works", href: "/marketplace" },
  },
  {
    q: "What can I sell on the Swarms Marketplace?",
    a: "Agents, prompts, tools, MCP servers, and skills. Agents ship as code with their dependencies, prompts are text-only instructions, tools are typed Python functions, MCP servers give other agents tool access, and skills are SKILL.md instruction packs. A Swarms Python agent can be published straight from code by setting publish_to_marketplace=True.",
  },
  {
    q: "How much does it cost to get started?",
    a: "Swarms Python and Swarms Rust are free and open source. Swarms Cloud starts on a Free plan where you pay only for usage, and new accounts get $5 in API credits. Pro ($19.99 a month) and Premium ($100 a month) raise limits and unlock more features, and every plan pays the same price per token.",
    link: { label: "See pricing", href: "/pricing" },
  },
]
