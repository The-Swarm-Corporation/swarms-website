// Shared content for the /stack page. The hero diagram, the layer explorer,
// and the coverage matrix all read from here so product names, jobs, and
// links cannot drift between sections.

export type ProductId = "python" | "rust" | "api" | "cloud" | "marketplace"
export type Job = "build" | "deploy" | "monetize"

export const JOBS: { id: Job; label: string; caption: string }[] = [
  {
    id: "build",
    label: "Build",
    caption: "Write the agent in Swarms Python or Swarms Rust.",
  },
  {
    id: "deploy",
    label: "Deploy",
    caption: "Serve it through the Swarms API and run it at scale on Swarms Cloud.",
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
    | { kind: "grid" }
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
    job: "deploy",
    name: "Swarms Cloud",
    short: "Cloud",
    handle: "cloud.swarms.world",
    role: "The control plane for your agents: design teams, run them at scale, trace every run, and host them.",
    facts: [
      "Auto Agent Builder and a visual Workflow Builder",
      "Batch runs one agent over 500 tasks; Grid runs every task against every agent",
      "A page for every agent and every run, with tokens and cost",
      "Encrypted Skills library, hosted MCP server, and scale-to-zero hosting (beta)",
    ],
    primary: { label: "Open Swarms Cloud", href: "https://cloud.swarms.world" },
    docs: { label: "What is Swarms Cloud?", href: "/blog/what-is-swarms-cloud" },
    artifact: { kind: "grid" },
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
    covered: ["python", "rust", "api", "cloud"],
  },
  {
    job: "build",
    need: "Use any model provider",
    how: "A model is a string. Change model_name to switch providers; the API reaches 2,000+ models with one key.",
    covered: ["python", "rust", "api", "cloud"],
  },
  {
    job: "build",
    need: "Give agents tools and MCP servers",
    how: "Attach functions or MCP servers in either framework or over the API, or buy them ready-made on the Marketplace.",
    covered: ["python", "rust", "api", "cloud", "marketplace"],
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
    need: "Design a team without writing code",
    how: "Describe the task to the Auto Agent Builder, or drag agents into a graph in the Workflow Builder.",
    covered: ["cloud"],
  },
  {
    job: "deploy",
    need: "Run one agent over hundreds of tasks",
    how: "Batch endpoints take a list of requests; Cloud's Batch and Grid runners add progress, retries, and CSV export.",
    covered: ["api", "cloud"],
  },
  {
    job: "deploy",
    need: "See tokens, cost, and logs for every run",
    how: "Every response carries usage, and every completion gets its own page with the exact payload.",
    covered: ["python", "api", "cloud"],
  },
  {
    job: "deploy",
    need: "Keep prompts and skills in one private library",
    how: "The Skills library stores SKILL.md, markdown, and JSON, encrypted under a per-user key.",
    covered: ["cloud"],
  },
  {
    job: "deploy",
    need: "Host an agent that costs nothing while idle",
    how: "S2A reads a GitHub repo, quotes the cost across clouds, and serves it behind an autoscaling HTTPS endpoint.",
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
