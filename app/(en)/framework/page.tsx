import { highlightCodeExamples } from "@/components/code-examples"
import { FrameworkClientPage } from "./FrameworkClientPage"

const codeExamples = [
  {
    lang: "Install",
    file: "install.sh",
    code: `# pip
pip install -U swarms

# or with uv
uv pip install -U swarms

# verify
python -c "import swarms; print(swarms.__version__)"`,
  },
  {
    lang: "Single Agent",
    file: "agent.py",
    code: `from swarms import Agent

agent = Agent(
    agent_name="Financial-Analyst",
    system_prompt="You are a senior financial analyst.",
    model_name="gpt-4o",
    max_loops=1,
    temperature=0.2,
)

response = agent.run(
    "Analyze the macro outlook for the semiconductor sector in 2026."
)
print(response)`,
  },
  {
    lang: "Sequential",
    file: "sequential.py",
    code: `from swarms import Agent, SequentialWorkflow

researcher = Agent(
    agent_name="Researcher",
    system_prompt="Research the topic and surface key facts.",
    model_name="gpt-4o",
)

writer = Agent(
    agent_name="Writer",
    system_prompt="Turn research into a publishable brief.",
    model_name="gpt-4o",
)

editor = Agent(
    agent_name="Editor",
    system_prompt="Tighten tone, fix structure, ship-ready output.",
    model_name="claude-3-5-sonnet",
)

workflow = SequentialWorkflow(agents=[researcher, writer, editor])
result = workflow.run("The future of multi-agent AI in finance")
print(result)`,
  },
  {
    lang: "Concurrent",
    file: "concurrent.py",
    code: `from swarms import Agent
from swarms.structs.concurrent_workflow import ConcurrentWorkflow

macro = Agent(
    agent_name="Macro-Analyst",
    system_prompt="You analyze macroeconomic trends.",
    model_name="gpt-4o",
)

equity = Agent(
    agent_name="Equity-Analyst",
    system_prompt="You analyze company fundamentals.",
    model_name="claude-3-5-sonnet",
)

quant = Agent(
    agent_name="Quant-Analyst",
    system_prompt="You analyze price action and signals.",
    model_name="gpt-4o",
)

workflow = ConcurrentWorkflow(agents=[macro, equity, quant])
print(workflow.run("Quarterly outlook for NVDA"))`,
  },
  {
    lang: "Hierarchical",
    file: "hierarchical.py",
    code: `from swarms import Agent
from swarms.structs.hiearchical_swarm import HierarchicalSwarm

director = Agent(
    agent_name="Director",
    system_prompt="Plan and delegate research tasks.",
    model_name="gpt-4o",
)

workers = [
    Agent(
        agent_name=f"Worker-{i}",
        system_prompt="Execute the assigned research subtask.",
        model_name="gpt-4o",
    )
    for i in range(3)
]

swarm = HierarchicalSwarm(
    name="Research Swarm",
    director=director,
    agents=workers,
    max_loops=2,
)
print(swarm.run("Build a 2026 outlook for AI infrastructure."))`,
  },
  {
    lang: "Tools",
    file: "tools.py",
    code: `from swarms import Agent
from swarms_tools import yahoo_finance_api, exa_search

agent = Agent(
    agent_name="Markets-Analyst",
    system_prompt="Use tools to answer market questions with citations.",
    model_name="gpt-4o",
    tools=[yahoo_finance_api, exa_search],
    max_loops=3,
)

print(agent.run("Latest earnings + analyst sentiment on AMD"))`,
  },
]

// The page body is a client component (framer-motion, tabs). The code
// examples are highlighted here on the server and passed in as rendered
// nodes, so Shiki never ships to the browser for this route.
export default function FrameworkPage() {
  return <FrameworkClientPage codeExamples={highlightCodeExamples(codeExamples)} />
}
