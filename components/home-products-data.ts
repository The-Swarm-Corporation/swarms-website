// The homepage product rows. Kept apart from the (client) section component
// so the server page can highlight each product's code sample.
export type Product = {
  title: string
  github?: string
  subtitle: string
  file?: string
  description: string
  link: string
  ctaLabel?: string
  docsLink: string
  docsLabel?: string
  code?: string
  /** Command typed into the terminal under the code, and its illustrative output. */
  command?: string
  output?: string[]
  image?: string
}

export const swarmsStack: Product[] = [
  {
    title: "Swarms Python",
    github: "kyegomez/swarms",
    subtitle: "Core Framework",
    file: "workflow.py",
    description:
      "The original Swarms framework in Python with full backwards compatibility with LangChain, AutoGen, and other popular frameworks.",
    link: "https://github.com/kyegomez/swarms",
    docsLink: "https://docs.swarms.world",
    code: `from swarms import Agent, SequentialWorkflow

# Agent 1: The Researcher
researcher = Agent(
    agent_name="Researcher",
    system_prompt="Your job is to research...",
    model_name="gpt-4o-mini",
)

# Agent 2: The Writer
writer = Agent(
    agent_name="Writer",
    system_prompt="Your job is to write...",
    model_name="gpt-4o-mini",
)

# Create workflow
workflow = SequentialWorkflow(
    agents=[researcher, writer]
)
final_post = workflow.run("AI history")
print(final_post)`,
    command: "python workflow.py",
    output: [
      "── Researcher · gpt-4o-mini",
      "1956: the Dartmouth workshop coins \"artificial intelligence\".",
      "1997: Deep Blue beats Kasparov. 2012: AlexNet starts the deep",
      "learning era. 2017: the Transformer. 2022: ChatGPT reaches 100M users.",
      "── Writer · gpt-4o-mini",
      "From Dartmouth to ChatGPT: How AI Grew Up",
      "In the summer of 1956, a small group of researchers met at Dartmouth",
      "with a bold idea: machines could learn to think...",
    ],
  },
  {
    title: "Swarms API",
    subtitle: "Swarms Cloud",
    file: "agent.py",
    description:
      "Build, deploy, and scale enterprise-grade multi-agent systems in the cloud",
    link: "https://docs.swarms.ai",
    docsLink: "https://docs.swarms.ai",
    code: `import requests

payload = {
    "agent_config": {
        "agent_name": "Research Analyst",
        "description": "Expert in analyzing research data",
        "system_prompt": "You are a Research Analyst...",
        "model_name": "gpt-4o-mini",
        "max_tokens": 8192,
        "temperature": 0.7
    },
    "task": "Analyze the impact of AI on healthcare"
}

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": "your-api-key"},
    json=payload
)
print(response.json())`,
    command: "python agent.py",
    output: [
      "{",
      '  "id": "agent-7c1e4f20",',
      '  "outputs": [',
      '    { "role": "Research Analyst",',
      '      "content": "AI is changing healthcare in three places: faster',
      "        diagnostics from imaging models, shorter drug discovery cycles,",
      '        and less admin work for clinicians..." }',
      "  ],",
      '  "usage": {',
      '    "input_tokens": 412,',
      '    "output_tokens": 638,',
      '    "total_tokens": 1050',
      "  }",
      "}",
    ],
  },
  {
    title: "Swarms-RS",
    github: "The-Swarm-Corporation/swarms-rs",
    subtitle: "Rust Framework",
    file: "main.rs",
    description:
      "Ultra-fast, memory-safe, and production-ready multi-agent framework built in Rust for maximum performance and reliability.",
    link: "https://crates.io/crates/swarms-rs",
    docsLink: "https://docs.rs/swarms-rs/latest/swarms_rs/",
    code: `use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    let client = OpenAI::from_url(
        base_url, api_key
    ).set_model("deepseek-chat");

    let workflow = ConcurrentWorkflow::builder()
        .name("Trading Strategy")
        .agents(vec![...])
        .build();

    let result = workflow
        .run("BTC/USD").await?;
    println!("{result}");
    Ok(())
}`,
    command: "cargo run --release",
    output: [
      "Compiling trading-strategy v0.1.0",
      "Finished `release` profile in 6.84s",
      "Running `target/release/trading-strategy`",
      "── Market-Analyst",
      "BTC/USD is holding above its 50-day moving average with rising volume.",
      "── Risk-Manager",
      "Cap position size at 2% of the portfolio, stop-loss 4% below entry.",
    ],
  },
  {
    title: "Swarms Marketplace",
    subtitle: "Buy & Sell Agents",
    description:
      "Discover, buy, and sell agents, prompts, tools, MCP servers, and skills. Publish for free, keep 90% of every sale.",
    link: "/marketplace",
    docsLink: "https://swarms.world",
    docsLabel: "Open swarms.world",
    image: "/marketplace_banner.png",
  },
  {
    title: "AgentHQ",
    subtitle: "Agent Office",
    description:
      "AgentHQ makes agent orchestration fun, simple, and reliable. Hire real Claude and Codex agents, give them desks in a pixel art office, and watch every tool call stream live. Now in pre-beta, join the waitlist for early access.",
    link: "/agenthq",
    ctaLabel: "Join the Waitlist",
    docsLink: "/blog/introducing-agenthq",
    docsLabel: "Read the Announcement",
    image: "/agent_hq_banner.png",
  },
]
