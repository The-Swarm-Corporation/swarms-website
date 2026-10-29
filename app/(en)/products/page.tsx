import { highlightCodeExamples } from "@/components/code-examples"
import { ProductsClientPage } from "./ProductsClientPage"

const featuredCode = [
  {
    lang: "Python",
    file: "workflow.py",
    code: `from swarms import Agent, SequentialWorkflow

researcher = Agent(
    agent_name="Researcher",
    system_prompt="Research the provided topic thoroughly.",
    model_name="gpt-4o",
)

writer = Agent(
    agent_name="Writer",
    system_prompt="Turn the research into a publishable blog post.",
    model_name="gpt-4o",
)

workflow = SequentialWorkflow(agents=[researcher, writer])
result = workflow.run("The future of multi-agent AI systems")
print(result)`,
  },
  {
    lang: "Swarms API",
    file: "request.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/swarm/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "name": "Financial Analysis Swarm",
        "swarm_type": "HierarchicalSwarm",
        "task": "What are the best ETFs for AI and tech?",
        "agents": [
            {
                "agent_name": "Market Analyst",
                "system_prompt": "You are a financial analyst expert.",
                "model_name": "gpt-4o",
            },
            {
                "agent_name": "Economic Forecaster",
                "system_prompt": "You are an expert in economic forecasting.",
                "model_name": "gpt-4o",
            },
        ],
    },
)

print(response.json())`,
  },
  {
    lang: "Rust",
    file: "main.rs",
    code: `use anyhow::Result;
use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    let client = OpenAI::new(std::env::var("OPENAI_API_KEY")?)
        .set_model("gpt-4o");

    let planner = client
        .agent_builder()
        .agent_name("Planner")
        .system_prompt("Plan the work into clear steps.")
        .build();

    let solver = client
        .agent_builder()
        .agent_name("Solver")
        .system_prompt("Execute the plan and return the answer.")
        .build();

    let workflow = ConcurrentWorkflow::builder()
        .name("ConcurrentWorkflow")
        .description("Two agents collaborating concurrently.")
        .agents(vec![Box::new(planner), Box::new(solver)])
        .build();

    let result = workflow.run("How to learn Rust efficiently?").await?;
    println!("{}", serde_json::to_string_pretty(&result)?);
    Ok(())
}`,
  },
]

// The page body is a client component (framer-motion, tabs). The code
// examples are highlighted here on the server and passed in as rendered
// nodes, so Shiki never ships to the browser for this route.
export default function ProductsPage() {
  return <ProductsClientPage featuredCode={highlightCodeExamples(featuredCode)} />
}
