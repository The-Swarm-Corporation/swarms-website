import { highlightCodeExamples } from "@/components/code-examples"
import { ApiClientPage } from "./ApiClientPage"

const agentExamples = [
  {
    lang: "Python",
    file: "agent.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "agent_config": {
            "agent_name": "Research Analyst",
            "system_prompt": "You are a senior research analyst.",
            "model_name": "gpt-4o",
            "max_tokens": 8192,
            "temperature": 0.5,
        },
        "task": "Summarize the state of multi-agent AI in 2025.",
    },
)

print(response.json())`,
  },
  {
    lang: "cURL",
    file: "agent.sh",
    code: `curl -X POST https://api.swarms.world/v1/agent/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "agent_config": {
      "agent_name": "Research Analyst",
      "system_prompt": "You are a senior research analyst.",
      "model_name": "gpt-4o",
      "max_tokens": 8192,
      "temperature": 0.5
    },
    "task": "Summarize the state of multi-agent AI in 2025."
  }'`,
  },
  {
    lang: "JavaScript",
    file: "agent.js",
    code: `const res = await fetch("https://api.swarms.world/v1/agent/completions", {
  method: "POST",
  headers: {
    "x-api-key": process.env.SWARMS_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    agent_config: {
      agent_name: "Research Analyst",
      system_prompt: "You are a senior research analyst.",
      model_name: "gpt-4o",
      max_tokens: 8192,
      temperature: 0.5,
    },
    task: "Summarize the state of multi-agent AI in 2025.",
  }),
})

console.log(await res.json())`,
  },
]

const swarmExamples = [
  {
    lang: "Python SDK",
    file: "swarm.py",
    code: `import os
from swarms_client import SwarmsClient

client = SwarmsClient(api_key=os.environ["SWARMS_API_KEY"])

response = client.swarms.run(
    name="Medical Analysis Swarm",
    description="Analyzes symptoms and recommends ICD codes",
    swarm_type="ConcurrentWorkflow",
    task="45-year-old female with chest pain. Analyze and provide ICD codes.",
    agents=[
        {
            "agent_name": "Symptom Analyzer",
            "system_prompt": "You analyze patient symptoms and surface key indicators.",
            "model_name": "gpt-4o",
            "temperature": 0.3,
        },
        {
            "agent_name": "ICD Code Specialist",
            "system_prompt": "You map symptoms to ICD codes with rationale.",
            "model_name": "gpt-4o",
            "temperature": 0.2,
        },
    ],
)

print(response)`,
  },
  {
    lang: "Python REST",
    file: "swarm_rest.py",
    code: `import os
import requests

response = requests.post(
    "https://api.swarms.world/v1/swarm/completions",
    headers={"x-api-key": os.environ["SWARMS_API_KEY"]},
    json={
        "name": "Market Research Swarm",
        "swarm_type": "MixtureOfAgents",
        "task": "Build a quarterly outlook for the semiconductor sector.",
        "agents": [
            {
                "agent_name": "Macro Analyst",
                "model_name": "gpt-4o",
                "system_prompt": "You are a macroeconomic analyst.",
            },
            {
                "agent_name": "Equity Analyst",
                "model_name": "claude-3-5-sonnet",
                "system_prompt": "You are an equity research analyst.",
            },
        ],
    },
)

print(response.json())`,
  },
  {
    lang: "cURL",
    file: "swarm.sh",
    code: `curl -X POST https://api.swarms.world/v1/swarm/completions \\
  -H "x-api-key: $SWARMS_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Market Research Swarm",
    "swarm_type": "MixtureOfAgents",
    "task": "Build a quarterly outlook for the semiconductor sector.",
    "agents": [
      { "agent_name": "Macro Analyst", "model_name": "gpt-4o" },
      { "agent_name": "Equity Analyst", "model_name": "claude-3-5-sonnet" }
    ]
  }'`,
  },
  {
    lang: "JavaScript",
    file: "swarm.js",
    code: `const res = await fetch("https://api.swarms.world/v1/swarm/completions", {
  method: "POST",
  headers: {
    "x-api-key": process.env.SWARMS_API_KEY,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Market Research Swarm",
    swarm_type: "MixtureOfAgents",
    task: "Build a quarterly outlook for the semiconductor sector.",
    agents: [
      { agent_name: "Macro Analyst", model_name: "gpt-4o" },
      { agent_name: "Equity Analyst", model_name: "claude-3-5-sonnet" },
    ],
  }),
})

console.log(await res.json())`,
  },
]

// The page body is a client component (framer-motion, tabs). The code
// examples are highlighted here on the server and passed in as rendered
// nodes, so Shiki never ships to the browser for this route.
export default function APIPage() {
  return (
    <ApiClientPage
      agentExamples={highlightCodeExamples(agentExamples)}
      swarmExamples={highlightCodeExamples(swarmExamples)}
    />
  )
}
