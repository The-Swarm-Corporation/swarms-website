// Content for the /swarms-rs landing page. Benchmark figures come from the
// "Swarms Rust Benchmarks" post (swarms-rs 0.3.0 vs Swarms Python 15.0.3,
// LangGraph 1.2.12 and CrewAI 1.15.23, all on Claude Sonnet 5.5). Code samples
// come from the swarms-rs README and the v0.3.0 changelog post.

export const REPO_URL = "https://github.com/The-Swarm-Corporation/swarms-rs"
export const CRATE_URL = "https://crates.io/crates/swarms-rs"
export const DOCS_URL = "https://docs.rs/swarms-rs/latest/swarms_rs/"
export const VERSION = "0.3.0"

export const HERO_STATS = [
  { value: "6 ms", label: "cold start", note: "130x to 440x faster than the others" },
  { value: "3.7 MB", label: "memory at startup", note: "25x to 68x less memory" },
  { value: "0.11 ms", label: "framework time per LLM call", note: "10x to 88x less overhead" },
  { value: "0.52 s", label: "for 100 parallel agents", note: "against an ideal 0.50 s" },
]

export type QuickstartStep = {
  n: number
  title: string
  body: string
  file: string
  lang: string
  code: string
  /** Shell line typed into the demo terminal. Omitted when the snippet is itself shell. */
  command?: string
  /** Illustrative terminal output, one entry per line. */
  output: string[]
}

export const QUICKSTART: QuickstartStep[] = [
  {
    n: 1,
    title: "Install and set one API key",
    body: "Create a project, add the crate, and export a key. One OpenRouter key reaches models from Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek and xAI.",
    file: "terminal",
    lang: "bash",
    code: `cargo new my-agents && cd my-agents
cargo add swarms-rs
cargo add tokio --features full
cargo add anyhow

export OPENROUTER_API_KEY="sk-or-..."`,
    output: [
      "Creating binary (application) `my-agents` package",
      "Adding swarms-rs v0.3.0 to dependencies",
      "Adding tokio v1 to dependencies",
      "Adding anyhow v1 to dependencies",
    ],
  },
  {
    n: 2,
    title: "Build and run your first agent",
    body: "Pick any model by its ID. Swapping the model is a one-string change, and tools work the same on every provider.",
    file: "src/main.rs",
    lang: "rust",
    code: `use swarms_rs::llm::provider::openrouter::OpenRouter;
use swarms_rs::structs::agent::Agent;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let agent = OpenRouter::from_env_with_model("anthropic/claude-opus-5.5")
        .agent_builder()
        .agent_name("Researcher")
        .system_prompt("You are a concise research assistant.")
        .build();

    println!("{}", agent.run("What is a vector database?".to_string()).await?);
    Ok(())
}`,
    command: "cargo run",
    output: [
      "Compiling my-agents v0.1.0",
      "Finished `dev` profile in 4.12s",
      "Running `target/debug/my-agents`",
      "A vector database stores data as high-dimensional vectors and finds",
      "the closest matches by similarity, so you can search by meaning",
      "instead of exact keywords.",
    ],
  },
  {
    n: 3,
    title: "Chain agents into a multi-model pipeline",
    body: "A SequentialWorkflow passes each agent's output to the next. Here a fast model researches, a strong model writes, and a third model edits. Run it with cargo run.",
    file: "src/main.rs",
    lang: "rust",
    code: `use swarms_rs::llm::provider::openrouter::OpenRouter;
use swarms_rs::structs::agent::Agent;
use swarms_rs::structs::sequential_workflow::SequentialWorkflow;

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    let client = OpenRouter::from_env();
    let stage = |model: &str, name: &str, prompt: &str| -> Box<dyn Agent> {
        Box::new(
            client
                .clone()
                .set_model(model)
                .agent_builder()
                .agent_name(name)
                .system_prompt(prompt)
                .build(),
        )
    };

    let workflow = SequentialWorkflow::builder()
        .name("OpenRouterPipeline")
        .agents(vec![
            stage("google/gemini-3.8-flash", "Researcher", "List the key facts as bullet points."),
            stage("anthropic/claude-opus-5.5", "Writer", "Turn the notes into a 300-word article."),
            stage("openai/gpt-5.5", "Editor", "Fix errors and return only the final article."),
        ])
        .build();

    let result = workflow.run("How Rust's borrow checker prevents data races").await?;
    if let Some(article) = result.history.last() {
        println!("{}", article.content);
    }
    Ok(())
}`,
    command: "cargo run",
    output: [
      "Compiling my-agents v0.1.0",
      "Finished `dev` profile in 4.31s",
      "Running `target/debug/my-agents`",
      "Rust's borrow checker prevents data races at compile time. Every value",
      "has one owner, and references are either shared and read-only or",
      "exclusive and mutable, never both at once...",
    ],
  },
]

export type Harness = {
  id: string
  label: string
  type: string
  tagline: string
  points: string[]
  file: string
  code: string
  command: string
  output: string[]
}

export const HARNESSES: Harness[] = [
  {
    id: "sequential",
    label: "Sequential",
    type: "SequentialWorkflow",
    tagline: "A pipeline where each agent builds on the last one's output.",
    points: [
      "Research, write, edit and review chains",
      "A different model for every stage",
      "The full history of every step is returned",
    ],
    file: "sequential.rs",
    code: `let workflow = SequentialWorkflow::builder()
    .name("Pipeline")
    .agents(vec![researcher, writer, editor])
    .build();

let result = workflow.run("How Rust prevents data races").await?;
println!("{}", result.history.last().unwrap().content);`,
    command: "cargo run --example sequential",
    output: [
      "Finished `dev` profile in 0.31s",
      "Running `target/debug/examples/sequential`",
      "Rust prevents data races by enforcing one rule at compile time: a value",
      "can have many readers or one writer, never both. Code that breaks the",
      "rule does not compile...",
    ],
  },
  {
    id: "concurrent",
    label: "Concurrent",
    type: "ConcurrentWorkflow",
    tagline: "Every agent works on the same task at the same time.",
    points: [
      "100 agents finish in 0.52 s when each call takes 0.50 s",
      "Ask a panel of models the same question",
      "Fan out analysis, then compare the answers",
    ],
    file: "concurrent.rs",
    code: `let workflow = ConcurrentWorkflow::builder()
    .name("ModelPanel")
    .agents(agents) // Vec<Box<dyn Agent>>, one model per agent
    .build();

let result = workflow
    .run("Should a new backend start as a monolith or microservices?")
    .await?;
for message in &result.history {
    println!("── {} ──\\n{}\\n", message.role, message.content);
}`,
    command: "cargo run --example concurrent",
    output: [
      "Finished `dev` profile in 0.28s",
      "Running `target/debug/examples/concurrent`",
      "── anthropic/claude-opus-5.5 ──",
      "Start with a monolith. Split a service out only when a team or a",
      "scaling limit forces it.",
      "── openai/gpt-5.5 ──",
      "Monolith first, with clean module boundaries you can cut along later.",
      "── google/gemini-3.8-flash ──",
      "A modular monolith. Microservices add operational cost you do not need yet.",
    ],
  },
  {
    id: "subagents",
    label: "Sub-agents and handoffs",
    type: "add_sub_agent / add_handoff",
    tagline: "A coordinator that delegates to specialists or transfers the task to one.",
    points: [
      "Sub-agents are called like tools, and the parent keeps going",
      "Handoffs transfer control along with the conversation so far",
      "Tools are named delegate_to_Researcher and transfer_to_Writer",
    ],
    file: "coordinator.rs",
    code: `let researcher = client
    .agent_builder()
    .agent_name("Researcher")
    .description("Looks up facts and returns a short, sourced summary")
    .system_prompt("You are a researcher. Answer with concise facts only.")
    .build();

let writer = client
    .agent_builder()
    .agent_name("Writer")
    .description("Writes the final, polished answer for the user")
    .system_prompt("Using the context you are given, write the final answer.")
    .build();

let coordinator = client
    .agent_builder()
    .agent_name("Coordinator")
    .system_prompt("Delegate fact-finding to the Researcher, then transfer to the Writer.")
    .add_sub_agent(researcher)
    .add_handoff(writer)
    .max_loops(4)
    .build();

let output = coordinator.run("Why did Rust adopt async/await?".to_string()).await?;`,
    command: "cargo run --example sub_agents_and_handoffs",
    output: [
      "Finished `dev` profile in 0.35s",
      "Running `target/debug/examples/sub_agents_and_handoffs`",
      "delegate_to_Researcher -> 3 facts returned",
      "transfer_to_Writer -> context passed",
      "Rust moved to async/await because green threads need a runtime and",
      "extra stack management, which conflicts with zero-cost abstractions...",
    ],
  },
  {
    id: "graph",
    label: "Graph",
    type: "DAGWorkflow",
    tagline: "Agents as nodes in a directed graph, with conditions on the edges.",
    points: [
      "Fan out from one agent and join branches back together",
      "Transform an output before the next agent sees it",
      "Skip an edge when a condition is not met",
    ],
    file: "graph.rs",
    code: `let mut workflow = DAGWorkflow::new("Graph Swarm", "Collect, process, summarize, analyze");

for agent in [collector, processor, summarizer, analyst] {
    workflow.register_agent(Box::new(agent));
}

workflow.connect_agents("Collector", "Processor", Flow::default())?;
workflow.connect_agents("Collector", "Summarizer", Flow {
    transform: Some(Arc::new(|out| format!("Summary request: {out}"))),
    condition: Some(Arc::new(|out| out.len() > 100)),
})?;
workflow.connect_agents("Processor", "Analyst", Flow::default())?;
workflow.connect_agents("Summarizer", "Analyst", Flow::default())?;

let results = workflow.execute_workflow("Collector", "How to build a graph database?").await?;`,
    command: "cargo run --example graph_workflow",
    output: [
      "Finished `dev` profile in 0.33s",
      "Running `target/debug/examples/graph_workflow`",
      "Collector     -> done",
      "Processor     -> done",
      "Summarizer    -> done (condition met: output > 100 chars)",
      "Analyst       -> done (joined 2 branches)",
    ],
  },
  {
    id: "rearrange",
    label: "Rearrange",
    type: "AgentRearrange",
    tagline: "Describe the whole flow in one string and let the engine run it.",
    points: [
      "Sequential and parallel steps in a single flow",
      "A comma means parallel, an arrow means then",
      "Change the topology by editing a string",
    ],
    file: "rearrange.rs",
    code: `let mut rearrange = AgentRearrange::builder()
    .name("Research Pipeline")
    .agents(agents) // Researcher, Analyst, Reviewer, Summarizer
    .flow("Researcher -> Analyst, Reviewer, Summarizer")
    .max_loops(1)
    .output_type(OutputType::Final)
    .build();

let result = rearrange.run("Analyze the Bitcoin and Ethereum markets").await?;`,
    command: "cargo run --example agent_rearrange_example",
    output: [
      "Finished `dev` profile in 0.30s",
      "Running `target/debug/examples/agent_rearrange_example`",
      "flow: Researcher -> [Analyst, Reviewer, Summarizer]",
      "Result: Bitcoin and Ethereum diverge on supply policy and on the",
      "role of staking in each network...",
    ],
  },
  {
    id: "router",
    label: "Router",
    type: "SwarmRouter",
    tagline: "Pick the swarm type at runtime from config, not from code.",
    points: [
      "One entry point for every workflow type",
      "Shared rules applied to every agent",
      "Works with agents on any provider",
    ],
    file: "router.rs",
    code: `let mut config = SwarmRouterConfig::with_agents(agents);
config.swarm_type = SwarmType::ConcurrentWorkflow;
config.rules = Some("Keep every answer under 100 words.".to_string());

let router = SwarmRouter::new_with_config(config)?;
let conversation = router.run("How should a small team version its API?").await?;
println!("{conversation}");`,
    command: "cargo run --example swarm_router",
    output: [
      "Finished `dev` profile in 0.29s",
      "Running `target/debug/examples/swarm_router`",
      "swarm_type: ConcurrentWorkflow, agents: 2, rules: applied",
      "Version in the URL path, keep old versions alive for a fixed window,",
      "and announce deprecations early.",
    ],
  },
]

export const FEATURES = [
  {
    title: "Any model, one string",
    body: "AnyModel picks the provider from the model name. OpenRouter adds Anthropic, OpenAI, Google, Meta, Mistral, DeepSeek and xAI behind one key.",
  },
  {
    title: "Tools with a macro",
    body: "Annotate a plain Rust function with #[tool] and the agent can call it. Every call is stored with its name, arguments and JSON result, so workflows read results back as Rust types.",
  },
  {
    title: "MCP over STDIO and SSE",
    body: "Attach any Model Context Protocol server to an agent with a single builder call, and use the same tools across every multi-agent structure.",
  },
  {
    title: "Memory safe by construction",
    body: "Ownership removes data races and leaks without a garbage collector, which is why 100 agents run in 29 MB.",
  },
  {
    title: "State you can resume",
    body: "Turn on autosave and agents write their state to disk. Conversations round-trip through JSON.",
  },
  {
    title: "Built on Tokio",
    body: "Agents are async tasks. Batch execution, concurrent runs and workflows share the same runtime your service already uses.",
  },
]

export const BENCHMARK_METRICS = [
  {
    id: "cold-start",
    title: "Cold start",
    sub: "Process launch to agent ready",
    unit: "ms",
    rows: [
      { name: "swarms-rs", value: 6, display: "6 ms", ours: true },
      { name: "LangGraph", value: 780, display: "780 ms" },
      { name: "CrewAI", value: 1439, display: "1,439 ms" },
      { name: "Swarms (Python)", value: 2647, display: "2,647 ms" },
    ],
  },
  {
    id: "memory",
    title: "Memory at startup",
    sub: "Resident memory of an idle agent process",
    unit: "MB",
    rows: [
      { name: "swarms-rs", value: 3.7, display: "3.7 MB", ours: true },
      { name: "LangGraph", value: 94, display: "94 MB" },
      { name: "CrewAI", value: 179, display: "179 MB" },
      { name: "Swarms (Python)", value: 250, display: "250 MB" },
    ],
  },
  {
    id: "overhead",
    title: "Framework time per LLM call",
    sub: "Time the framework spends around each model call",
    unit: "ms",
    rows: [
      { name: "swarms-rs", value: 0.11, display: "0.11 ms", ours: true },
      { name: "Swarms (Python)", value: 1.11, display: "1.11 ms" },
      { name: "LangGraph", value: 1.77, display: "1.77 ms" },
      { name: "CrewAI", value: 9.68, display: "9.68 ms" },
    ],
  },
  {
    id: "parallel",
    title: "100 agents in parallel",
    sub: "Each call takes 0.50 s, so the ideal is 0.50 s",
    unit: "s",
    rows: [
      { name: "swarms-rs", value: 0.52, display: "0.52 s", ours: true },
      { name: "LangGraph", value: 0.72, display: "0.72 s" },
      { name: "Swarms (Python)", value: 2.21, display: "2.21 s" },
      { name: "CrewAI", value: 4.2, display: "4.20 s" },
    ],
  },
]

export const POSTS = [
  {
    slug: "swarms-rust-benchmarks",
    title: "Swarms Rust Benchmarks: 6 ms Cold Starts, 3.7 MB of Memory, and 100 Parallel Agents in 0.52 Seconds",
    blurb:
      "swarms-rs 0.3.0 against Swarms Python, LangGraph and CrewAI on Claude Sonnet 5.5, with the method, every result and a harness you can rerun.",
    date: "Sep 30, 2026",
    tag: "Research",
    image: "/benchmarking_swarms-rs.png",
  },
  {
    slug: "swarms-rust-v0-3-0-changelog",
    title: "Swarms Rust v0.3.0: OpenRouter, Any Model by Name, Sub-Agents and Handoffs",
    blurb:
      "The largest release so far: an OpenRouter provider, AnyModel, sub-agents, handoffs, typed tool outputs and fixes for deadlocks and silent failures.",
    date: "Sep 29, 2026",
    tag: "Product",
    image: "/swarms_rust_v0.3.png",
  },
  {
    slug: "swarms-v2-rust-framework",
    title: "Swarms v2.0: The First Multi-Agent Framework in Rust",
    blurb:
      "Why we built the framework in Rust: performance, memory safety and concurrency for multi-agent systems in production.",
    date: "Jan 15, 2024",
    tag: "Announcement",
    image: undefined as string | undefined,
  },
]

export const FAQS = [
  {
    q: "What is swarms-rs?",
    a: "swarms-rs is the Swarms multi-agent framework written in Rust. It gives you agents with tools, memory and MCP support, plus multi-agent structures such as sequential, concurrent, graph, rearrange and router workflows. It is published on crates.io and licensed under Apache-2.0.",
  },
  {
    q: "How do I get started with swarms-rs?",
    a: "Run cargo add swarms-rs along with tokio and anyhow, export an API key such as OPENROUTER_API_KEY, and build an agent with the builder API. The three-step quickstart on this page goes from an empty project to a multi-model pipeline.",
  },
  {
    q: "Which models and providers does swarms-rs support?",
    a: "OpenAI, Anthropic and DeepSeek have native providers, and OpenRouter gives you models from Google, Meta, Mistral, xAI and more with one key. AnyModel chooses the provider from the model name, such as anthropic/claude-opus-5-5 or openai/gpt-5.5, so switching providers is a one-string change.",
  },
  {
    q: "How fast is swarms-rs compared with Python frameworks?",
    a: "In our benchmark of swarms-rs 0.3.0 against Swarms Python 15.0.3, LangGraph 1.2.12 and CrewAI 1.15.23, all driving Claude Sonnet 5.5, swarms-rs started in 6 ms, used 3.7 MB at startup, added 0.11 ms of framework time per LLM call, and ran 100 agents in parallel in 0.52 seconds. The model's own response time is the same for every framework. The harness is open source so you can rerun it.",
  },
  {
    q: "Does swarms-rs support MCP and custom tools?",
    a: "Yes. Define tools with the #[tool] macro from swarms-macro, or attach MCP servers over STDIO or SSE with add_stdio_mcp_server and add_sse_mcp_server.",
  },
  {
    q: "Which multi-agent structures are included?",
    a: "SequentialWorkflow, ConcurrentWorkflow, DAGWorkflow for graphs, AgentRearrange for flows written as a string, SwarmRouter for choosing the swarm type at runtime, a batch executor, and sub-agents and handoffs on the agent builder.",
  },
  {
    q: "Should I use Swarms Python or swarms-rs?",
    a: "Use Python when you want the widest set of integrations and the fastest path to a prototype. Use swarms-rs for services where startup time, memory, latency and concurrency matter, such as serverless functions, high-throughput APIs and large swarms. Both follow the same agent model.",
  },
]
