export type CourseBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "code"; lang: string; title?: string; code: string }
  | { type: "list"; ordered?: boolean; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; variant: "tip" | "note" | "warn"; title?: string; text: string }
  | { type: "endpoint"; method: "GET" | "POST"; path: string; text?: string }
  | { type: "trial"; method: "GET" | "POST"; path: string; body?: string; note?: string }

export type QuizQuestion = {
  question: string
  options: string[]
  answer: number
  explanation: string
}

export type CourseLesson = {
  id: string
  title: string
  blocks: CourseBlock[]
}

export type CoursePart = {
  slug: string
  part: number
  title: string
  tagline: string
  summary: string
  duration: string
  outcomes: string[]
  lessons: CourseLesson[]
  checkpoint: { title: string; blocks: CourseBlock[] }
  quiz: QuizQuestion[]
}

export const courseMeta = {
  title: "The Swarms API Course",
  tagline:
    "A four-part curriculum that takes you from your first API call to production multi-agent systems.",
  baseUrl: "https://api.swarms.world",
  docsUrl: "https://docs.swarms.ai",
  keysUrl: "https://cloud.swarms.world/api-keys",
}

export const courseParts: CoursePart[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // PART 1 — FOUNDATIONS
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "foundations",
    part: 1,
    title: "Foundations: Your First Agent",
    tagline: "Set up your environment and run your first agent completion.",
    summary:
      "Understand what the Swarms API is, get authenticated, and run a single AI agent end to end. By the end of this part you will have executed your first agent completion and know how to read every field in the response.",
    duration: "60 min",
    outcomes: [
      "Understand the Swarms platform architecture: single agents, swarms, and workflows",
      "Create an API key and authenticate with the x-api-key header",
      "Verify connectivity with the health endpoint",
      "Configure an agent with AgentSpec and run POST /v1/agent/completions",
      "Discover available models and check your credit balance",
      "Read the usage field and handle every common error status",
    ],
    lessons: [
      {
        id: "1-1",
        title: "What is the Swarms API?",
        blocks: [
          {
            type: "p",
            text: "The Swarms API is a hosted platform for building and orchestrating AI agents. You describe an agent (its name, instructions, and model) in JSON, send it a task over HTTPS, and the platform runs it on managed infrastructure. There is nothing to deploy, no GPU to rent, and no framework to install: every capability is an HTTP endpoint.",
          },
          {
            type: "p",
            text: "The platform is organized in three tiers, and this course follows them in order:",
          },
          {
            type: "list",
            items: [
              "**Single agents**: one agent, one task. The `POST /v1/agent/completions` endpoint. This is where Part 1 and Part 2 live.",
              "**Multi-agent swarms**: multiple agents collaborating under an orchestration pattern such as `SequentialWorkflow`, `ConcurrentWorkflow`, or `HierarchicalSwarm`. Covered in Part 3.",
              "**Production operations**: batch execution, rate limits, cost controls, and observability. Covered in Part 4.",
            ],
          },
          {
            type: "p",
            text: "Everything runs against a single base URL:",
          },
          {
            type: "code",
            lang: "text",
            title: "Base URL",
            code: "https://api.swarms.world",
          },
          {
            type: "callout",
            variant: "note",
            title: "You choose the model",
            text: "Agents can run on models from OpenAI, Anthropic, Groq, and more. You select the model per agent with the `model_name` field, so a single swarm can mix a frontier model for synthesis with cheaper models for extraction.",
          },
        ],
      },
      {
        id: "1-2",
        title: "Get your API key",
        blocks: [
          {
            type: "p",
            text: "Every request is authenticated with an API key. Create one in the Swarms Platform under **API Keys** at swarms.world/platform/api-keys. Copy the key once it is shown; treat it like a password.",
          },
          {
            type: "p",
            text: "Store the key as an environment variable instead of hardcoding it. Create a `.env` file in your project:",
          },
          {
            type: "code",
            lang: "bash",
            title: ".env",
            code: 'SWARMS_API_KEY="your-api-key-here"',
          },
          {
            type: "p",
            text: "Then install the two libraries used throughout this course:",
          },
          {
            type: "code",
            lang: "bash",
            title: "Terminal",
            code: "pip install requests python-dotenv",
          },
          {
            type: "callout",
            variant: "warn",
            title: "Never commit keys",
            text: "Add `.env` to your `.gitignore`. If a key leaks, revoke it on the platform and create a new one. The API also accepts `Authorization: Bearer <key>` for OpenAI SDK compatibility, but `x-api-key` is the canonical header.",
          },
        ],
      },
      {
        id: "1-3",
        title: "Your first request: the health check",
        blocks: [
          {
            type: "p",
            text: "Before running any agent, confirm that your key and connection work. The health endpoint is free and requires no body:",
          },
          { type: "endpoint", method: "GET", path: "/health" },
          {
            type: "code",
            lang: "python",
            title: "health_check.py",
            code: `import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.swarms.world"
headers = {
    "x-api-key": os.getenv("SWARMS_API_KEY"),
    "Content-Type": "application/json",
}

response = requests.get(f"{BASE_URL}/health", headers=headers)
print(response.status_code)  # 200
print(response.json())`,
          },
          {
            type: "p",
            text: "A `200` response means you are authenticated and the service is operational. If you get `401`, your key is missing or wrong; check that `load_dotenv()` ran and that the variable name matches your `.env` file.",
          },
          {
            type: "p",
            text: "You can run this request right here. Paste your API key below (it is stored only in your browser and sent only to `api.swarms.world`), and every other trial in this course will reuse it:",
          },
          {
            type: "trial",
            method: "GET",
            path: "/health",
            note: "Free; consumes no credits.",
          },
        ],
      },
      {
        id: "1-4",
        title: "Anatomy of an agent",
        blocks: [
          {
            type: "p",
            text: "An agent is defined by an `agent_config` object (the AgentSpec schema). It tells the platform who the agent is, how it should behave, and which model to run. These are the fields you will use in almost every request:",
          },
          {
            type: "table",
            headers: ["Field", "Type", "Default", "What it does"],
            rows: [
              ["agent_name", "string", "-", "Identifier for the agent and its role"],
              ["description", "string", "-", "What the agent is for; helps coordination in swarms"],
              ["system_prompt", "string", "-", "The agent's instructions and persona"],
              ["model_name", "string", "gpt-4.1", "Which model runs the agent"],
              ["temperature", "number", "provider default", "Randomness; lower is more deterministic"],
              ["max_tokens", "integer", "8192", "Cap on generated output length"],
              ["max_loops", "int | \"auto\"", "1", "How many reasoning iterations the agent may run"],
              ["role", "string", "worker", "The agent's role inside a swarm"],
            ],
          },
          {
            type: "p",
            text: "The `system_prompt` is the most important field. Be specific about the agent's expertise, the shape of the output you expect, and what it should refuse to guess at. A precise prompt outperforms a clever one.",
          },
          {
            type: "callout",
            variant: "tip",
            title: "Start with max_loops: 1",
            text: "One loop means one pass over the task: predictable latency and cost. Higher loop counts and `\"auto\"` unlock autonomous behavior, which you will meet in Part 2.",
          },
        ],
      },
      {
        id: "1-5",
        title: "Run your first agent completion",
        blocks: [
          {
            type: "p",
            text: "Now put it together. An agent completion request has two parts: the `agent_config` describing the agent, and a `task` string describing the work:",
          },
          { type: "endpoint", method: "POST", path: "/v1/agent/completions" },
          {
            type: "code",
            lang: "python",
            title: "first_agent.py",
            code: `import os
import requests
from dotenv import load_dotenv

load_dotenv()

BASE_URL = "https://api.swarms.world"
headers = {
    "x-api-key": os.getenv("SWARMS_API_KEY"),
    "Content-Type": "application/json",
}

payload = {
    "agent_config": {
        "agent_name": "Research Analyst",
        "description": "Analyzes topics and produces structured summaries",
        "system_prompt": (
            "You are a research analyst. Analyze the given topic, "
            "identify the three most important trends, and present "
            "them as a numbered list with one supporting fact each."
        ),
        "model_name": "claude-sonnet-4-20250514",
        "max_loops": 1,
        "max_tokens": 4096,
        "temperature": 0.7,
    },
    "task": "What are the key trends in renewable energy adoption?",
}

response = requests.post(
    f"{BASE_URL}/v1/agent/completions", headers=headers, json=payload
)
result = response.json()
print(result["outputs"])
print(result["usage"])`,
          },
          {
            type: "p",
            text: "The response contains the agent's output plus metadata you should get in the habit of reading:",
          },
          {
            type: "list",
            items: [
              "**id**: unique identifier for this completion, useful when correlating logs",
              "**outputs**: the agent's answer, including the conversation structure",
              "**usage**: token counts for the request; this is what you are billed on",
              "**name**: the agent name you configured, echoed back",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Iterate on the prompt, not the code",
            text: "Once this script runs, improving output quality is almost always a matter of sharpening `system_prompt` and `task`. Keep the plumbing constant and treat prompts as the thing under development.",
          },
          {
            type: "p",
            text: "Run a real agent completion now. The body below is editable: change the task, the system prompt, or the temperature and watch the output change.",
          },
          {
            type: "trial",
            method: "POST",
            path: "/v1/agent/completions",
            body: `{
  "agent_config": {
    "agent_name": "Research Analyst",
    "description": "Analyzes topics and produces structured summaries",
    "system_prompt": "You are a research analyst. Identify the three most important trends on the given topic and present them as a numbered list with one supporting fact each.",
    "model_name": "gpt-4.1",
    "max_loops": 1,
    "max_tokens": 1024,
    "temperature": 0.7
  },
  "task": "What are the key trends in renewable energy adoption?"
}`,
            note: "Runs on your account; costs a small number of credits.",
          },
        ],
      },
      {
        id: "1-6",
        title: "Discover models and check your balance",
        blocks: [
          {
            type: "p",
            text: "Two read-only endpoints round out the foundations. First, list every model you can pass as `model_name`:",
          },
          { type: "endpoint", method: "GET", path: "/v1/models/available" },
          {
            type: "code",
            lang: "python",
            title: "models.py",
            code: `response = requests.get(
    f"{BASE_URL}/v1/models/available", headers=headers
)
print(response.json())`,
          },
          {
            type: "trial",
            method: "GET",
            path: "/v1/models/available",
            note: "Free; consumes no credits.",
          },
          {
            type: "p",
            text: "Second, check your credit balance. Completions consume credits based on token usage, so this is the number to watch while you learn:",
          },
          { type: "endpoint", method: "GET", path: "/v1/account/credits" },
          {
            type: "code",
            lang: "python",
            title: "credits.py",
            code: `response = requests.get(
    f"{BASE_URL}/v1/account/credits", headers=headers
)
print(response.json())  # regular, free, and referral credits`,
          },
          {
            type: "trial",
            method: "GET",
            path: "/v1/account/credits",
            note: "Free; consumes no credits.",
          },
        ],
      },
      {
        id: "1-7",
        title: "Reading responses and handling failures",
        blocks: [
          {
            type: "p",
            text: "Production habits start on day one, so learn to read the whole response now. A successful agent completion contains more than the answer:",
          },
          {
            type: "table",
            headers: ["Field", "What to do with it"],
            rows: [
              ["id", "Log it; it is how you find this run later in /v1/swarm/logs"],
              ["outputs", "The agent's conversation, including the final answer"],
              ["usage", "Input, output, and total token counts; multiply by model price to know cost"],
              ["temperature / model_name", "Echo of the configuration that actually ran"],
            ],
          },
          {
            type: "p",
            text: "Failures arrive as HTTP status codes, and each one tells you something different:",
          },
          {
            type: "table",
            headers: ["Status", "Meaning", "First thing to check"],
            rows: [
              ["400", "Malformed request", "JSON syntax and field names in your payload"],
              ["401", "Authentication failed", "The x-api-key header and the key itself"],
              ["402", "Insufficient credits", "Your balance at /v1/account/credits"],
              ["429", "Rate limit hit", "Your request frequency; wait and retry"],
              ["500", "Server-side error", "Retry once; if persistent, check service health"],
            ],
          },
          {
            type: "code",
            lang: "python",
            title: "safe_call.py",
            code: `response = requests.post(
    f"{BASE_URL}/v1/agent/completions", headers=headers, json=payload
)

if response.status_code == 200:
    result = response.json()
    print(result["outputs"])
elif response.status_code == 401:
    raise SystemExit("Check your SWARMS_API_KEY.")
elif response.status_code == 402:
    raise SystemExit("Out of credits: top up at swarms.world.")
else:
    print(response.status_code, response.text)`,
          },
          {
            type: "callout",
            variant: "note",
            title: "Part 4 goes deeper",
            text: "Retries, backoff, and rate-limit headers get a full lesson in Part 4. For now, the habit that matters is reading `usage` on every run and never ignoring a non-200 status.",
          },
        ],
      },
    ],
    checkpoint: {
      title: "Checkpoint project: a working research agent",
      blocks: [
        {
          type: "p",
          text: "Before moving to Part 2, build this on your own. It exercises everything in this part:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Write a script that runs the health check and exits with an error message if it fails",
            "Configure an agent with a domain of your choice (finance, medicine, engineering) and a system prompt that demands a specific output format",
            "Run the same task at `temperature` 0.1 and 1.0 and compare the outputs",
            "Print the token usage of each run, then fetch `/v1/account/credits` and confirm the balance moved",
          ],
        },
        {
          type: "p",
          text: "If you can predict roughly what a run will cost before you send it, you have internalized the core loop of the API.",
        },
      ],
    },
    quiz: [
      {
        question: "Which header authenticates every request to the Swarms API?",
        options: ["Authorization: Basic", "x-api-key", "X-Swarms-Token", "api-key"],
        answer: 1,
        explanation:
          "The canonical header is x-api-key. Authorization: Bearer is also accepted for OpenAI SDK compatibility, but x-api-key is the one to reach for.",
      },
      {
        question: "What is the base URL for all Swarms API requests?",
        options: [
          "https://api.swarms.ai",
          "https://swarms.world/api",
          "https://api.swarms.world",
          "https://docs.swarms.ai/v1",
        ],
        answer: 2,
        explanation: "Every endpoint in this course lives under https://api.swarms.world.",
      },
      {
        question: "Which endpoint runs a single agent on a task?",
        options: [
          "POST /v1/swarm/completions",
          "POST /v1/agent/completions",
          "POST /v1/agents/run",
          "GET /v1/agent/completions",
        ],
        answer: 1,
        explanation:
          "Single agents run through POST /v1/agent/completions with an agent_config object and a task string. The swarm endpoint is for multi-agent workflows in Part 3.",
      },
      {
        question: "An agent config omits max_loops. How many reasoning iterations does the agent run?",
        options: ["Unlimited until done", "1", "3", "It depends on the model"],
        answer: 1,
        explanation:
          "max_loops defaults to 1: one pass over the task with predictable latency and cost. Autonomy requires opting in with a higher count or \"auto\".",
      },
      {
        question: "Where do you look to know what a completed run cost you?",
        options: [
          "The outputs field",
          "The usage field of the response",
          "The X-RateLimit-Remaining header",
          "GET /health",
        ],
        answer: 1,
        explanation:
          "The usage field reports input, output, and total token counts for the run, which is what billing is computed from. Credits balance is at /v1/account/credits.",
      },
      {
        question: "A request returns 402. What happened?",
        options: [
          "The API key is invalid",
          "The request body is malformed",
          "Your account is out of credits",
          "You hit a rate limit",
        ],
        answer: 2,
        explanation:
          "402 means insufficient credits. Retrying will fail identically until you top up; 401 is a bad key, 400 is a bad payload, and 429 is a rate limit.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PART 2 — SINGLE-AGENT CAPABILITIES
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "agent-capabilities",
    part: 2,
    title: "Single-Agent Capabilities",
    tagline: "Memory, streaming, structured outputs, tools, MCP, and autonomy.",
    summary:
      "One agent can do far more than answer a prompt. This part upgrades your agent with conversation memory, real-time streaming, schema-enforced JSON, function tools, live web search, MCP connections, and fully autonomous multi-step execution.",
    duration: "90 min",
    outcomes: [
      "Build multi-turn conversations with the history field",
      "Stream tokens in real time with stream: true",
      "Enforce JSON schemas on outputs and attach function tools",
      "Connect agents to live data with web search and MCP servers",
      "Run autonomous agents with max_loops set to auto",
      "Use the OpenAI-compatible endpoint as a drop-in replacement",
      "Reuse saved configurations and marketplace prompts across projects",
    ],
    lessons: [
      {
        id: "2-1",
        title: "Multi-turn conversations",
        blocks: [
          {
            type: "p",
            text: "Agent completions are stateless: each request stands alone. To build a chatbot or research assistant that remembers earlier turns, thread the prior exchange back in through the `history` field:",
          },
          {
            type: "code",
            lang: "python",
            title: "conversation.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Assistant",
        "system_prompt": "You are a helpful research assistant.",
        "model_name": "gpt-4.1",
        "max_loops": 1,
    },
    "task": "Which of those is most relevant for solar?",
    "history": [
        {"role": "user", "content": "List three energy storage technologies."},
        {"role": "assistant", "content": "1. Lithium-ion batteries ..."},
    ],
}`,
          },
          {
            type: "p",
            text: "Your application owns the memory: append each user message and agent reply to a list, and send that list as `history` on the next call. This gives you full control over how much context to keep and lets you trim or summarize old turns to manage token costs.",
          },
        ],
      },
      {
        id: "2-2",
        title: "Streaming responses",
        blocks: [
          {
            type: "p",
            text: "For interactive interfaces, waiting for the full completion feels slow. Set `streaming_on: true` in the agent config to receive output as server-sent events while the agent generates it:",
          },
          {
            type: "code",
            lang: "python",
            title: "streaming.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Streaming Writer",
        "system_prompt": "You are a concise technical writer.",
        "model_name": "gpt-4.1",
        "streaming_on": True,
    },
    "task": "Explain how multi-agent systems divide work.",
}

with requests.post(
    f"{BASE_URL}/v1/agent/completions",
    headers=headers,
    json=payload,
    stream=True,
) as response:
    for line in response.iter_lines():
        if line:
            print(line.decode("utf-8"))`,
          },
          {
            type: "callout",
            variant: "note",
            title: "Streaming works for swarms too",
            text: "In Part 3 you will see the same flag stream tokens from every agent in a multi-agent workflow, including detecting when parallel agents interleave.",
          },
        ],
      },
      {
        id: "2-3",
        title: "Structured outputs",
        blocks: [
          {
            type: "p",
            text: "Free-form text is hard to build on. When the agent's output feeds a database, a UI, or another program, enforce a JSON schema so the response always parses. Describe the schema as a tool in `tools_list_dictionary`:",
          },
          {
            type: "code",
            lang: "python",
            title: "structured_output.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Data Extractor",
        "system_prompt": "Extract structured company data from text.",
        "model_name": "gpt-4.1",
        "max_loops": 1,
        "tools_list_dictionary": [
            {
                "type": "function",
                "function": {
                    "name": "extract_company",
                    "description": "Extract company facts",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "name": {"type": "string"},
                            "industry": {"type": "string"},
                            "employee_count": {"type": "integer"},
                        },
                        "required": ["name", "industry"],
                    },
                },
            }
        ],
    },
    "task": "Acme Robotics builds warehouse automation and employs 240 people.",
}`,
          },
          {
            type: "p",
            text: "The agent responds with a call to your function schema, giving you validated, machine-readable JSON. This same mechanism is how classic function calling works: define one tool per action your application can take, and dispatch on the function name the agent chooses.",
          },
          {
            type: "p",
            text: "Try it: run the extraction below, then change the input text and the schema and run it again.",
          },
          {
            type: "trial",
            method: "POST",
            path: "/v1/agent/completions",
            body: `{
  "agent_config": {
    "agent_name": "Data Extractor",
    "system_prompt": "Extract structured company data from text.",
    "model_name": "gpt-4.1",
    "max_loops": 1,
    "max_tokens": 1024,
    "tools_list_dictionary": [
      {
        "type": "function",
        "function": {
          "name": "extract_company",
          "description": "Extract company facts",
          "parameters": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "industry": { "type": "string" },
              "employee_count": { "type": "integer" }
            },
            "required": ["name", "industry"]
          }
        }
      }
    ]
  },
  "task": "Acme Robotics builds warehouse automation and employs 240 people."
}`,
            note: "Runs on your account; costs a small number of credits.",
          },
        ],
      },
      {
        id: "2-4",
        title: "Web search and vision",
        blocks: [
          {
            type: "p",
            text: "Models have knowledge cutoffs. For tasks that need current information (prices, news, live documentation), enable web search so the agent can retrieve real-time results before answering. The platform exposes search as a built-in capability; you simply instruct the agent to research and cite:",
          },
          {
            type: "code",
            lang: "python",
            title: "search_agent.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Market Researcher",
        "system_prompt": (
            "You are a market researcher with web search access. "
            "Search for current information before answering and "
            "cite the sources you used."
        ),
        "model_name": "gpt-4.1",
        "max_loops": 1,
    },
    "task": "Summarize this week's developments in solid-state batteries.",
}`,
          },
          {
            type: "p",
            text: "Agents can also process images. Pass an image URL in the `img` field of the request and the agent will analyze it alongside the task, which enables document parsing, chart reading, and visual inspection workflows.",
          },
          {
            type: "endpoint",
            method: "GET",
            path: "/v1/tools/available",
            text: "Lists every built-in tool and capability the API currently supports.",
          },
        ],
      },
      {
        id: "2-5",
        title: "MCP: connect agents to your systems",
        blocks: [
          {
            type: "p",
            text: "The Model Context Protocol (MCP) is an open standard for giving agents access to external tools and data sources. Point an agent at any MCP server (Gmail, Notion, your internal APIs) with the `mcp_url` field, and the agent discovers and calls that server's tools at runtime:",
          },
          {
            type: "code",
            lang: "python",
            title: "mcp_agent.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Ops Assistant",
        "system_prompt": "Use the available tools to complete the task.",
        "model_name": "gpt-4.1",
        "max_loops": 1,
        "mcp_config": {
            "url": "https://your-mcp-server.example.com/mcp",
            "transport": "streamable_http",
            "authorization_token": "your-mcp-token",
            "timeout": 10,
        },
    },
    "task": "Summarize the unread messages in my inbox.",
}`,
          },
          {
            type: "p",
            text: "Use `mcp_configs` (plural) to connect multiple servers to one agent. This is the pattern behind assistants that span Gmail, Calendar, and Notion in a single conversation.",
          },
        ],
      },
      {
        id: "2-6",
        title: "Autonomous agents and sub-agent delegation",
        blocks: [
          {
            type: "p",
            text: "Setting `max_loops` to `\"auto\"` turns the agent into an autonomous looper: it plans the task, executes steps one at a time, and decides for itself when the work is done. The platform provides built-in tools for planning, thinking, file operations, and delegation:",
          },
          {
            type: "code",
            lang: "python",
            title: "autonomous_agent.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Autonomous Researcher",
        "system_prompt": (
            "Plan the task, execute each step, and produce a "
            "final summary of your findings."
        ),
        "model_name": "claude-sonnet-4-20250514",
        "max_loops": "auto",
        "selected_tools": ["create_plan", "think", "complete_task"],
    },
    "task": (
        "Research three competing battery chemistries, compare "
        "energy density and cost, and recommend one for grid storage."
    ),
}`,
          },
          {
            type: "p",
            text: "Restrict `selected_tools` to the minimum the task needs; fewer tools means fewer wasted loops. Autonomous agents can also spawn specialists at runtime with `create_sub_agent` and `assign_task`, and you can predefine delegation targets with the `handoffs` field: a list of AgentSpec objects this agent may hand work to.",
          },
          {
            type: "callout",
            variant: "warn",
            title: "Autonomy costs more",
            text: "Each loop is another model call. Use `\"auto\"` when the task genuinely requires multi-step planning, and keep single-pass agents on `max_loops: 1`.",
          },
        ],
      },
      {
        id: "2-7",
        title: "The OpenAI-compatible endpoint",
        blocks: [
          {
            type: "p",
            text: "If you already have code written against the OpenAI SDK, you can route it through Swarms by changing only the base URL and key. The `/v1/chat/completions` endpoint accepts the standard OpenAI request schema and returns the standard response schema, including streaming:",
          },
          { type: "endpoint", method: "POST", path: "/v1/chat/completions" },
          {
            type: "code",
            lang: "python",
            title: "openai_compatible.py",
            code: `from openai import OpenAI

client = OpenAI(
    api_key=os.getenv("SWARMS_API_KEY"),
    base_url="https://api.swarms.world/v1",
)

response = client.chat.completions.create(
    model="gpt-4.1",
    messages=[{"role": "user", "content": "Hello, Swarms!"}],
)
print(response.choices[0].message.content)`,
          },
          {
            type: "p",
            text: "This is the lowest-friction migration path: start with a drop-in swap, then graduate to `/v1/agent/completions` and `/v1/swarm/completions` when you want agent configs, tools, and orchestration.",
          },
          {
            type: "trial",
            method: "POST",
            path: "/v1/chat/completions",
            body: `{
  "model": "gpt-4.1",
  "messages": [
    { "role": "user", "content": "In one sentence, what is a multi-agent swarm?" }
  ],
  "max_tokens": 256
}`,
            note: "The exact OpenAI request schema, served by Swarms.",
          },
        ],
      },
      {
        id: "2-8",
        title: "Reusing configurations and marketplace prompts",
        blocks: [
          {
            type: "p",
            text: "As you build, you accumulate agent configurations worth keeping. The platform remembers every distinct configuration you have run and lets you list them for reuse, so your applications can share one library of proven agents instead of duplicating JSON:",
          },
          { type: "endpoint", method: "GET", path: "/v1/agents/list" },
          {
            type: "trial",
            method: "GET",
            path: "/v1/agents/list",
            note: "Lists agent configurations you have created or used.",
          },
          {
            type: "p",
            text: "You can also skip prompt writing entirely. The Swarms Marketplace hosts production-tested prompts, and any agent can load one by ID with the `marketplace_prompt_id` field; the platform fetches it and installs it as the system prompt:",
          },
          {
            type: "code",
            lang: "python",
            title: "marketplace_prompt.py",
            code: `payload = {
    "agent_config": {
        "agent_name": "Marketplace Agent",
        "marketplace_prompt_id": "prompt-id-from-swarms-world",
        "model_name": "gpt-4.1",
        "max_loops": 1,
    },
    "task": "Analyze this quarter's sales figures.",
}`,
          },
          {
            type: "callout",
            variant: "tip",
            title: "Prompts are assets",
            text: "Treat working system prompts the way you treat working code: version them, reuse them, and consider publishing your best ones to the marketplace, where creators earn on every sale.",
          },
        ],
      },
    ],
    checkpoint: {
      title: "Checkpoint project: a structured research assistant",
      blocks: [
        {
          type: "p",
          text: "Combine three capabilities from this part into one agent:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Build an agent that researches a product category and returns results as schema-enforced JSON (name, price range, and a one-sentence rationale per item)",
            "Add conversation history so a follow-up question refines the previous answer instead of starting over",
            "Switch the same logic to the OpenAI-compatible endpoint and confirm your existing SDK code works unchanged",
          ],
        },
        {
          type: "p",
          text: "The goal is to feel the difference between an agent that chats and an agent that produces data your software can consume.",
        },
      ],
    },
    quiz: [
      {
        question: "Agent completions are stateless. How does an agent remember earlier turns of a conversation?",
        options: [
          "The platform stores sessions automatically",
          "Your application sends prior turns back in the history field",
          "You set memory: true in the agent config",
          "You reuse the same agent_name across requests",
        ],
        answer: 1,
        explanation:
          "Memory belongs to your application: append each exchange to a list and send it as history on the next request. That also gives you control over trimming context to manage cost.",
      },
      {
        question: "How do you get schema-enforced JSON from an agent?",
        options: [
          "Ask politely in the system prompt",
          "Set output_format to json",
          "Define a function schema in tools_list_dictionary",
          "Use GET instead of POST",
        ],
        answer: 2,
        explanation:
          "Describe the shape you want as a function schema in tools_list_dictionary; the agent responds with a call to that schema, giving you validated, parseable JSON.",
      },
      {
        question: "What does setting max_loops to \"auto\" do?",
        options: [
          "Retries failed requests automatically",
          "Lets the agent plan, execute steps, and decide when the task is done",
          "Streams output tokens automatically",
          "Runs the agent on multiple models at once",
        ],
        answer: 1,
        explanation:
          "\"auto\" turns the agent into an autonomous looper with built-in tools for planning, thinking, files, and delegation. Each loop is another model call, so use it when the task needs multi-step planning.",
      },
      {
        question: "Which field connects an agent to several MCP servers at once?",
        options: ["mcp_url", "mcp_config", "mcp_configs", "tools_list_dictionary"],
        answer: 2,
        explanation:
          "mcp_configs (plural) takes a list of MCP connections. mcp_url and mcp_config configure a single server; tools_list_dictionary defines your own function schemas.",
      },
      {
        question: "To route existing OpenAI SDK code through Swarms, what do you change?",
        options: [
          "Rewrite the calls against /v1/agent/completions",
          "Only the base_url and the API key",
          "The request schema to SwarmSpec",
          "Nothing; it works without changes",
        ],
        answer: 1,
        explanation:
          "/v1/chat/completions is a drop-in replacement: point the SDK at https://api.swarms.world/v1 with your Swarms key and the standard OpenAI request and response schemas work unchanged, including streaming.",
      },
      {
        question: "What does the marketplace_prompt_id field do?",
        options: [
          "Publishes your agent to the marketplace",
          "Loads a marketplace prompt as the agent's system prompt",
          "Charges buyers for your agent",
          "Links the agent to a marketplace listing for analytics",
        ],
        answer: 1,
        explanation:
          "The platform fetches the referenced marketplace prompt and installs it as the system prompt, so you can build on production-tested prompts instead of writing from scratch.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PART 3 — MULTI-AGENT ORCHESTRATION
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "multi-agent-orchestration",
    part: 3,
    title: "Multi-Agent Orchestration",
    tagline: "Compose agents into swarms with the right architecture for the job.",
    summary:
      "Complex work benefits from specialists. This part introduces the swarm completions endpoint and walks through the major orchestration architectures: sequential pipelines, parallel fan-outs, hierarchical teams, collaborative patterns, and directed graphs. You will learn to pick the right one on sight.",
    duration: "105 min",
    outcomes: [
      "Structure a SwarmSpec request for POST /v1/swarm/completions",
      "Build sequential pipelines where each agent refines the last agent's output",
      "Run independent analyses in parallel with ConcurrentWorkflow",
      "Coordinate specialist teams with HierarchicalSwarm",
      "Choose among GroupChat, MixtureOfAgents, MajorityVoting, and more",
      "Express fan-out/fan-in DAGs with the GraphWorkflow endpoint",
      "Stream every agent's tokens and fan swarms across multiple tasks",
    ],
    lessons: [
      {
        id: "3-1",
        title: "From one agent to a swarm",
        blocks: [
          {
            type: "p",
            text: "A single agent with a long prompt tends to blur roles: the same context window is asked to research, critique, and summarize at once. A swarm splits those roles into separate agents, each with a focused system prompt, and an orchestration pattern that controls how they interact. The result is usually higher quality output and prompts that are far easier to maintain.",
          },
          {
            type: "p",
            text: "Every multi-agent request goes to one endpoint and uses the SwarmSpec schema:",
          },
          { type: "endpoint", method: "POST", path: "/v1/swarm/completions" },
          {
            type: "table",
            headers: ["Field", "What it does"],
            rows: [
              ["name", "Identifier for the swarm run"],
              ["description", "What this swarm accomplishes"],
              ["swarm_type", "The orchestration architecture (the heart of this part)"],
              ["agents", "Array of AgentSpec objects; everything from Parts 1 and 2 applies"],
              ["task", "The objective the swarm works on"],
              ["max_loops", "How many rounds the swarm may run"],
              ["stream", "Stream tokens from every agent in real time"],
            ],
          },
          {
            type: "p",
            text: "The `swarm_type` field selects the architecture. You can list every supported value at any time:",
          },
          { type: "endpoint", method: "GET", path: "/v1/swarms/available" },
          {
            type: "trial",
            method: "GET",
            path: "/v1/swarms/available",
            note: "Free; consumes no credits.",
          },
        ],
      },
      {
        id: "3-2",
        title: "SequentialWorkflow: the pipeline",
        blocks: [
          {
            type: "p",
            text: "The simplest and most widely used architecture. Agents run in the order you list them, and each agent receives the previous agent's output. Use it whenever the work is a series of dependent steps: draft then edit, extract then analyze then summarize.",
          },
          {
            type: "code",
            lang: "python",
            title: "sequential_swarm.py",
            code: `payload = {
    "name": "Content Pipeline",
    "description": "Research, write, and edit an article",
    "swarm_type": "SequentialWorkflow",
    "task": "Produce a short article on grid-scale battery storage.",
    "agents": [
        {
            "agent_name": "Researcher",
            "system_prompt": "Gather the key facts and figures on the topic.",
            "model_name": "gpt-4.1",
            "max_loops": 1,
        },
        {
            "agent_name": "Writer",
            "system_prompt": "Turn the research into a clear 400-word article.",
            "model_name": "claude-sonnet-4-20250514",
            "max_loops": 1,
        },
        {
            "agent_name": "Editor",
            "system_prompt": "Tighten the prose and fix any factual slips.",
            "model_name": "gpt-4.1",
            "max_loops": 1,
        },
    ],
}

response = requests.post(
    f"{BASE_URL}/v1/swarm/completions", headers=headers, json=payload
)
print(response.json()["output"])`,
          },
          {
            type: "callout",
            variant: "tip",
            title: "Order is the design",
            text: "In a sequential swarm, the agent list is the architecture. Put cheap extraction early and expensive synthesis late, and make each system prompt state what it receives and what it must pass on.",
          },
          {
            type: "p",
            text: "Run your first swarm right now. Two agents, in sequence, on a small task (expect this to take noticeably longer than a single-agent call, since the agents run one after another):",
          },
          {
            type: "trial",
            method: "POST",
            path: "/v1/swarm/completions",
            body: `{
  "name": "Mini Content Pipeline",
  "description": "Research then summarize",
  "swarm_type": "SequentialWorkflow",
  "task": "Explain the case for grid-scale battery storage.",
  "agents": [
    {
      "agent_name": "Researcher",
      "system_prompt": "List the 4 most important facts on the topic, one line each.",
      "model_name": "gpt-4.1",
      "max_loops": 1,
      "max_tokens": 512
    },
    {
      "agent_name": "Writer",
      "system_prompt": "Turn the facts you receive into one tight paragraph.",
      "model_name": "gpt-4.1",
      "max_loops": 1,
      "max_tokens": 512
    }
  ]
}`,
            note: "Runs two agents on your account; costs more than a single completion.",
          },
        ],
      },
      {
        id: "3-3",
        title: "ConcurrentWorkflow: the fan-out",
        blocks: [
          {
            type: "p",
            text: "When analyses are independent of each other, run them at the same time. Every agent receives the same task in parallel, and their outputs are collected together. This is the pattern for multi-angle analysis: four specialists examining one earnings call, or separate agents covering technology, market, and regulatory angles of the same question.",
          },
          {
            type: "code",
            lang: "python",
            title: "concurrent_swarm.py",
            code: `payload = {
    "name": "Competitive Intelligence",
    "swarm_type": "ConcurrentWorkflow",
    "task": "Assess Tesla's position in the energy storage market.",
    "agents": [
        {
            "agent_name": "Technology Analyst",
            "system_prompt": "Evaluate the technology stack and moats.",
            "model_name": "gpt-4.1",
        },
        {
            "agent_name": "Market Analyst",
            "system_prompt": "Evaluate market share, pricing, and growth.",
            "model_name": "gpt-4.1",
        },
        {
            "agent_name": "Risk Analyst",
            "system_prompt": "Evaluate regulatory and supply chain risks.",
            "model_name": "gpt-4.1",
        },
    ],
}`,
          },
          {
            type: "p",
            text: "Concurrent runs finish in roughly the time of the slowest agent rather than the sum of all agents, so this architecture also buys latency. A common composite pattern adds a final synthesizer: run the fan-out concurrently, then feed the collected outputs to one agent that writes the unified report.",
          },
        ],
      },
      {
        id: "3-4",
        title: "HierarchicalSwarm: the team with a director",
        blocks: [
          {
            type: "p",
            text: "A hierarchical swarm adds management: a director agent decomposes the task, assigns work to specialist workers, reviews what comes back, and synthesizes the final answer. Use it when the task is broad enough that deciding who does what is itself part of the work. This is the architecture behind due diligence swarms, code review teams, and clinical case conferences.",
          },
          {
            type: "code",
            lang: "python",
            title: "hierarchical_swarm.py",
            code: `payload = {
    "name": "Investment Research Team",
    "swarm_type": "HierarchicalSwarm",
    "task": "Produce an investment memo on the AI infrastructure sector.",
    "agents": [
        {
            "agent_name": "Portfolio Director",
            "system_prompt": (
                "You direct a research team. Break the task down, "
                "delegate to your analysts, then synthesize their "
                "findings into a single memo with a recommendation."
            ),
            "model_name": "claude-sonnet-4-20250514",
            "role": "director",
        },
        {
            "agent_name": "Fundamentals Analyst",
            "system_prompt": "Analyze revenue, margins, and growth.",
            "model_name": "gpt-4.1",
            "role": "worker",
        },
        {
            "agent_name": "Macro Analyst",
            "system_prompt": "Analyze rates, spending cycles, and demand.",
            "model_name": "gpt-4.1",
            "role": "worker",
        },
    ],
}`,
          },
          {
            type: "callout",
            variant: "tip",
            title: "Spend on the director",
            text: "The director does the hardest cognitive work: decomposition and synthesis. Give it your strongest model and give workers cheaper ones. This single decision often halves swarm cost without hurting quality.",
          },
        ],
      },
      {
        id: "3-5",
        title: "Collaboration patterns: debate, consensus, and councils",
        blocks: [
          {
            type: "p",
            text: "Beyond pipelines and hierarchies, the API ships architectures where agents deliberate with each other. Each is a single `swarm_type` value away:",
          },
          {
            type: "table",
            headers: ["swarm_type", "How it works", "Reach for it when"],
            rows: [
              [
                "GroupChat",
                "Agents converse in a shared thread, building on each other's ideas",
                "Brainstorming and cross-functional planning",
              ],
              [
                "MixtureOfAgents",
                "Diverse specialists tackle the same task; outputs are combined",
                "Problems that benefit from several kinds of expertise",
              ],
              [
                "MajorityVoting",
                "Multiple agents answer independently; the majority wins",
                "Quality assurance and high-stakes classification",
              ],
              [
                "DebateWithJudge",
                "A Pro and Con agent argue; a judge synthesizes the verdict",
                "Decisions where you want both sides argued hard",
              ],
              [
                "LLMCouncil",
                "A council of different models peer-reviews, a chairman synthesizes",
                "Reducing single-model bias on important answers",
              ],
              [
                "CouncilAsAJudge",
                "A council evaluates a response across multiple dimensions",
                "Scoring and evaluating AI output itself",
              ],
            ],
          },
          {
            type: "p",
            text: "These patterns trade tokens for reliability: five voters cost five times one answer. Use them where a wrong answer is expensive, and use a single agent where it is not.",
          },
        ],
      },
      {
        id: "3-6",
        title: "Routing and dynamic architectures",
        blocks: [
          {
            type: "p",
            text: "Three architectures handle work whose shape is not known in advance:",
          },
          {
            type: "list",
            items: [
              "**MultiAgentRouter**: a dispatcher reads each incoming task and routes it to the best-suited agent. This is the IT-helpdesk pattern: one entry point, many specialists.",
              "**AgentRearrange**: you describe the flow between agents in a `rearrange_flow` string, mixing sequential and parallel hops, and the swarm reorganizes to match.",
              "**HeavySwarm**: the task is decomposed into specialized questions answered by dedicated research agents, then integrated. Built for deep, comprehensive analysis passes.",
            ],
          },
          {
            type: "code",
            lang: "python",
            title: "agent_rearrange.py",
            code: `payload = {
    "name": "Custom Flow",
    "swarm_type": "AgentRearrange",
    "task": "Analyze this product launch plan.",
    "rearrange_flow": "Researcher -> Analyst1, Analyst2 -> Summarizer",
    "agents": [
        {"agent_name": "Researcher", "system_prompt": "Gather facts."},
        {"agent_name": "Analyst1", "system_prompt": "Assess strengths."},
        {"agent_name": "Analyst2", "system_prompt": "Assess risks."},
        {"agent_name": "Summarizer", "system_prompt": "Write the brief."},
    ],
}`,
          },
          {
            type: "p",
            text: "The flow string reads left to right: commas mean those agents run in parallel, arrows mean the output moves to the next stage.",
          },
        ],
      },
      {
        id: "3-7",
        title: "GraphWorkflow: directed acyclic graphs",
        blocks: [
          {
            type: "p",
            text: "For production pipelines with genuine branching (fan-out into parallel branches that converge into a synthesis node), use the dedicated graph endpoint. Agents are nodes; edges define how data flows between them. The platform compiles the graph, runs independent branches in parallel, and joins them where edges converge:",
          },
          { type: "endpoint", method: "POST", path: "/v1/graph-workflow/completions" },
          {
            type: "code",
            lang: "python",
            title: "graph_workflow.py",
            code: `payload = {
    "name": "Lead Enrichment DAG",
    "task": "Research and score this sales lead: Acme Robotics.",
    "agents": [
        {"agent_name": "CompanyResearch", "system_prompt": "Research the company."},
        {"agent_name": "NewsResearch", "system_prompt": "Find recent news."},
        {"agent_name": "TechStack", "system_prompt": "Identify their tech stack."},
        {"agent_name": "Synthesizer", "system_prompt": "Merge all research."},
        {"agent_name": "Scorer", "system_prompt": "Score the lead 1-100."},
    ],
    "edges": [
        {"source": "CompanyResearch", "target": "Synthesizer"},
        {"source": "NewsResearch", "target": "Synthesizer"},
        {"source": "TechStack", "target": "Synthesizer"},
        {"source": "Synthesizer", "target": "Scorer"},
    ],
}

response = requests.post(
    f"{BASE_URL}/v1/graph-workflow/completions",
    headers=headers,
    json=payload,
)`,
          },
          {
            type: "p",
            text: "The three research nodes run in parallel, the synthesizer waits for all of them, and the scorer runs last. Edges accept optional metadata (severity, priority, routing tags) so operations teams can filter and audit per-edge behavior in production.",
          },
        ],
      },
      {
        id: "3-8",
        title: "Streaming swarms and running multiple tasks",
        blocks: [
          {
            type: "p",
            text: "Everything you learned about single-agent streaming scales up. Set `stream: true` on the SwarmSpec and the endpoint emits tokens from every agent in the workflow as they generate, tagged by agent, so a UI can show a sequential pipeline handing off in real time or parallel agents interleaving:",
          },
          {
            type: "code",
            lang: "python",
            title: "swarm_streaming.py",
            code: `payload = {
    "name": "Streaming Pipeline",
    "swarm_type": "SequentialWorkflow",
    "task": "Draft and refine a product announcement.",
    "stream": True,
    "agents": [
        {"agent_name": "Drafter", "system_prompt": "Write the first draft."},
        {"agent_name": "Refiner", "system_prompt": "Polish the draft."},
    ],
}

with requests.post(
    f"{BASE_URL}/v1/swarm/completions",
    headers=headers,
    json=payload,
    stream=True,
) as response:
    for line in response.iter_lines():
        if line:
            print(line.decode("utf-8"))`,
          },
          {
            type: "p",
            text: "Swarms can also carry more than one task. The `tasks` array runs a workflow across a list of objectives, and the dedicated BatchedGridWorkflow endpoint fans multiple agents across multiple tasks in a grid, all in a single request:",
          },
          { type: "endpoint", method: "POST", path: "/v1/batched-grid-workflow/completions" },
          {
            type: "code",
            lang: "python",
            title: "grid_workflow.py",
            code: `payload = {
    "name": "ETF Grid",
    "agents": [
        {"agent_name": "Tech Analyst", "system_prompt": "Analyze tech exposure."},
        {"agent_name": "Risk Analyst", "system_prompt": "Analyze risk profile."},
    ],
    "tasks": [
        "Evaluate the QQQ ETF.",
        "Evaluate the SPY ETF.",
    ],
}

response = requests.post(
    f"{BASE_URL}/v1/batched-grid-workflow/completions",
    headers=headers,
    json=payload,
)`,
          },
          {
            type: "callout",
            variant: "note",
            title: "Grid is a premium feature",
            text: "BatchedGridWorkflow, like the batch endpoints you will meet in Part 4, is available on Pro and Ultra plans. Every agent runs every task, so a 2-agent, 2-task grid executes 4 completions.",
          },
        ],
      },
      {
        id: "3-9",
        title: "Choosing the right architecture",
        blocks: [
          {
            type: "p",
            text: "Architecture selection is the highest-leverage decision in multi-agent design. A workable rule of thumb:",
          },
          {
            type: "table",
            headers: ["Your task looks like", "Use"],
            rows: [
              ["Dependent steps in a fixed order", "SequentialWorkflow"],
              ["Independent analyses of one input", "ConcurrentWorkflow"],
              ["Broad task needing decomposition and synthesis", "HierarchicalSwarm"],
              ["Open-ended ideation across functions", "GroupChat"],
              ["One entry point, many task types", "MultiAgentRouter"],
              ["High-stakes answer needing consensus", "MajorityVoting or LLMCouncil"],
              ["Branching pipeline with converging stages", "GraphWorkflow"],
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Start sequential, grow deliberately",
            text: "Most production systems begin as a 2-3 agent SequentialWorkflow. Add parallelism when latency demands it and hierarchy when task decomposition demands it. Complexity you add before you need it is complexity you debug anyway.",
          },
        ],
      },
    ],
    checkpoint: {
      title: "Checkpoint project: an investment memo swarm",
      blocks: [
        {
          type: "p",
          text: "Build the same deliverable three ways and compare:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Produce a one-page investment memo on a sector you know, first with a single agent from Part 1",
            "Rebuild it as a SequentialWorkflow (researcher, analyst, writer) and note the quality difference",
            "Rebuild it as a HierarchicalSwarm with a director and two workers, giving the director a stronger model",
            "Compare cost from the `usage` field of each run against the quality gain, and write down which you would ship",
          ],
        },
        {
          type: "p",
          text: "That cost-versus-quality judgment, made consciously, is exactly the skill Part 4 turns into production discipline.",
        },
      ],
    },
    quiz: [
      {
        question: "Which endpoint executes a multi-agent swarm?",
        options: [
          "POST /v1/agent/completions",
          "POST /v1/swarm/completions",
          "POST /v1/swarms/available",
          "POST /v1/chat/completions",
        ],
        answer: 1,
        explanation:
          "Multi-agent workflows go through POST /v1/swarm/completions with a SwarmSpec body. GET /v1/swarms/available lists the architectures you can put in swarm_type.",
      },
      {
        question: "Your task is four dependent steps: extract, analyze, draft, edit. Which architecture fits best?",
        options: ["ConcurrentWorkflow", "MajorityVoting", "SequentialWorkflow", "GroupChat"],
        answer: 2,
        explanation:
          "Dependent steps in a fixed order are exactly what SequentialWorkflow models: each agent receives the previous agent's output.",
      },
      {
        question: "In a HierarchicalSwarm, where should you spend your strongest (most expensive) model?",
        options: [
          "Spread evenly across all agents",
          "On the director doing decomposition and synthesis",
          "On the first worker in the list",
          "Model choice makes no difference in swarms",
        ],
        answer: 1,
        explanation:
          "The director does the hardest cognitive work. Strong model on the director, cheaper models on workers is the single highest-leverage cost decision in swarm design.",
      },
      {
        question: "In an AgentRearrange flow string \"A -> B, C -> D\", what happens after A finishes?",
        options: [
          "B runs, then C, then D",
          "B and C run in parallel, then D",
          "D runs immediately",
          "The swarm asks A to choose the next agent",
        ],
        answer: 1,
        explanation:
          "Arrows mean handoff to the next stage and commas mean those agents run in parallel: A's output fans out to B and C simultaneously, and their outputs converge on D.",
      },
      {
        question: "How does GraphWorkflow differ from the other architectures in this part?",
        options: [
          "It only supports two agents",
          "It has its own endpoint and models agents as nodes connected by edges",
          "It cannot run agents in parallel",
          "It requires a premium plan",
        ],
        answer: 1,
        explanation:
          "GraphWorkflow lives at POST /v1/graph-workflow/completions and takes explicit nodes and edges, which is how you express fan-out branches that converge into synthesis stages.",
      },
      {
        question: "You need one high-stakes answer and can afford redundancy. Which pattern trades tokens for reliability?",
        options: [
          "SequentialWorkflow with one agent",
          "MajorityVoting across several independent agents",
          "MultiAgentRouter",
          "Setting max_tokens higher",
        ],
        answer: 1,
        explanation:
          "MajorityVoting (and council patterns like LLMCouncil) run multiple independent agents and take the consensus: several times the cost, applied where a wrong answer is expensive.",
      },
      {
        question: "A 3-agent, 4-task BatchedGridWorkflow executes how many completions?",
        options: ["3", "4", "7", "12"],
        answer: 3,
        explanation:
          "Every agent runs every task in the grid: 3 agents times 4 tasks is 12 completions. Estimate grid costs with that multiplication before submitting.",
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // PART 4 — PRODUCTION
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: "production",
    part: 4,
    title: "Production: Scale, Cost, and Operations",
    tagline: "Batch execution, resilience, cost control, and observability.",
    summary:
      "The gap between a working demo and a production system is operational: processing thousands of tasks, surviving rate limits, controlling spend, and knowing what your agents did last night. This part covers the endpoints and habits that close the gap.",
    duration: "90 min",
    outcomes: [
      "Process thousands of tasks with the batch completion endpoints",
      "Apply reasoning agents to problems standard completions get wrong",
      "Handle rate limits with headers, backoff, and retries",
      "Cut spend with model tiering and overnight batch scheduling",
      "Monitor cost, errors, and usage with logs and metrics endpoints",
      "Understand regions, priority processing, and key hygiene",
      "Ship against a production readiness checklist",
    ],
    lessons: [
      {
        id: "4-1",
        title: "Batch processing at scale",
        blocks: [
          {
            type: "p",
            text: "Looping over ten thousand rows with sequential HTTP calls is slow and fragile. The batch endpoints accept a list of complete requests and execute them concurrently on the platform's thread pool. There is one for single agents and one for full swarms:",
          },
          { type: "endpoint", method: "POST", path: "/v1/agent/batch/completions" },
          { type: "endpoint", method: "POST", path: "/v1/swarm/batch/completions" },
          {
            type: "code",
            lang: "python",
            title: "batch_agents.py",
            code: `triage_agent = {
    "agent_name": "Ticket Triage",
    "system_prompt": (
        "Classify the support ticket by urgency (low/medium/high) "
        "and category. Respond as JSON."
    ),
    "model_name": "gpt-4.1",
    "max_loops": 1,
}

payload = [
    {"agent_config": triage_agent, "task": ticket}
    for ticket in tickets  # e.g. thousands of ticket strings
]

response = requests.post(
    f"{BASE_URL}/v1/agent/batch/completions",
    headers=headers,
    json=payload,
)
results = response.json()`,
          },
          {
            type: "p",
            text: "The swarm batch endpoint works the same way with SwarmSpec objects: fifty due-diligence swarms submitted as one overnight job is the canonical enterprise pattern. Batch endpoints are premium features available on Pro and Ultra plans.",
          },
        ],
      },
      {
        id: "4-2",
        title: "Reasoning agents",
        blocks: [
          {
            type: "p",
            text: "Some problems (multi-step quantitative analysis, competition-grade logic, careful legal reading) fail on a standard completion because the model commits to an early wrong step. Reasoning agents run architectures designed for deliberate, self-checking thought:",
          },
          { type: "endpoint", method: "POST", path: "/v1/reasoning-agent/completions" },
          {
            type: "code",
            lang: "python",
            title: "reasoning_agent.py",
            code: `payload = {
    "agent_name": "Quant Reasoner",
    "description": "Careful multi-step analytical reasoning",
    "system_prompt": "Work step by step and verify before answering.",
    "model_name": "claude-sonnet-4-20250514",
    "swarm_type": "reasoning-duo",
    "task": (
        "A company recognizes revenue over 24 months but bills "
        "quarterly in advance. Compute deferred revenue after month 7 "
        "on a $1.2M contract."
    ),
}

response = requests.post(
    f"{BASE_URL}/v1/reasoning-agent/completions",
    headers=headers,
    json=payload,
)`,
          },
          {
            type: "p",
            text: "List the available reasoning architectures (duos, self-consistency, iterative reflection, and more) before choosing:",
          },
          { type: "endpoint", method: "GET", path: "/v1/reasoning-agent/types" },
          {
            type: "callout",
            variant: "note",
            title: "Also available per-agent",
            text: "Standard agents accept `reasoning_enabled`, `reasoning_effort` (low/medium/high), and `thinking_tokens` for models with native reasoning support. The dedicated endpoint adds full reasoning architectures on top.",
          },
        ],
      },
      {
        id: "4-3",
        title: "Rate limits, retries, and error handling",
        blocks: [
          {
            type: "p",
            text: "Production code assumes requests will sometimes fail. The API enforces limits across multiple time windows; check your current standing at any time:",
          },
          { type: "endpoint", method: "GET", path: "/v1/rate/limits" },
          {
            type: "trial",
            method: "GET",
            path: "/v1/rate/limits",
            note: "Your live limits and current usage across time windows.",
          },
          {
            type: "p",
            text: "Every rate-limited response also carries live `X-RateLimit-*` headers (limit, remaining, reset) so you can throttle without extra API calls. The status codes to handle:",
          },
          {
            type: "table",
            headers: ["Status", "Meaning", "Your move"],
            rows: [
              ["400", "Malformed request body", "Fix the payload; do not retry as-is"],
              ["401", "Missing or invalid API key", "Check the x-api-key header"],
              ["402", "Insufficient credits", "Top up, then retry"],
              ["429", "Rate limit exceeded", "Back off and retry after the reset"],
              ["500", "Server error", "Retry with exponential backoff"],
            ],
          },
          {
            type: "code",
            lang: "python",
            title: "resilient_client.py",
            code: `import time

def call_with_retries(url, payload, max_retries=3):
    for attempt in range(max_retries + 1):
        response = requests.post(url, headers=headers, json=payload)
        if response.status_code == 200:
            return response.json()
        if response.status_code in (429, 500) and attempt < max_retries:
            wait = 2 ** attempt  # 1s, 2s, 4s
            remaining = response.headers.get("X-RateLimit-Remaining")
            print(f"Retry {attempt + 1} in {wait}s (remaining: {remaining})")
            time.sleep(wait)
            continue
        response.raise_for_status()`,
          },
          {
            type: "callout",
            variant: "warn",
            title: "Only retry what is safe",
            text: "Retry 429s and 500s. A 400 or 402 will fail identically on every attempt, and blind retries on those just burn quota and time.",
          },
        ],
      },
      {
        id: "4-4",
        title: "Cost management",
        blocks: [
          {
            type: "p",
            text: "Spend on the Swarms API is a function of tokens, models, and agent count, which means it is controllable. The endpoints that give you visibility:",
          },
          {
            type: "list",
            items: [
              "**GET /v1/account/credits**: current balance, including free and referral credits",
              "**GET /v1/usage/costs**: the per-operation pricing used to compute your bill",
              "**GET /v1/usage/report**: daily breakdowns of tokens, requests, and cost",
            ],
          },
          {
            type: "p",
            text: "The three levers that actually move the bill, in order of impact:",
          },
          {
            type: "list",
            ordered: true,
            items: [
              "**Tier your models.** Use frontier models only where the cognitive work is hardest (directors, synthesizers, judges) and cheaper models for extraction, classification, and formatting. This alone commonly cuts costs 2-5x.",
              "**Batch overnight.** Swarm completions submitted in the night-mode window (8 PM to 6 AM Pacific) get a 50% discount on token costs. Move every non-urgent pipeline there with a cron job.",
              "**Cap max_tokens and max_loops.** These are the only two settings that let costs run away. Set both deliberately on every agent.",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "Estimate before you scale",
            text: "Run one representative task, read its `usage` field, multiply by your volume, and check the result against `/v1/usage/costs`. Do this before launching any batch job, every time.",
          },
        ],
      },
      {
        id: "4-5",
        title: "Observability: logs and metrics",
        blocks: [
          {
            type: "p",
            text: "When a pipeline ran overnight, you need to know what happened without re-running it. Two endpoints cover most operational questions:",
          },
          { type: "endpoint", method: "GET", path: "/v1/swarm/logs" },
          {
            type: "p",
            text: "Returns the request history for all API keys on your account: what ran, when, with what configuration and outcome. Use it to audit failures and reconstruct what a swarm actually did.",
          },
          { type: "endpoint", method: "GET", path: "/v1/metrics/summary" },
          {
            type: "trial",
            method: "GET",
            path: "/v1/metrics/summary",
            note: "Your lifetime and recent completion counts.",
          },
          {
            type: "trial",
            method: "GET",
            path: "/v1/swarm/logs",
            note: "Request history for your API keys; response can be large.",
          },
          {
            type: "code",
            lang: "python",
            title: "ops_dashboard.py",
            code: `logs = requests.get(
    f"{BASE_URL}/v1/swarm/logs", headers=headers
).json()

metrics = requests.get(
    f"{BASE_URL}/v1/metrics/summary", headers=headers
).json()

credits = requests.get(
    f"{BASE_URL}/v1/account/credits", headers=headers
).json()

print("Recent completions:", metrics)
print("Credit balance:", credits)`,
          },
          {
            type: "p",
            text: "Wiring these three calls plus the `X-RateLimit-*` headers into one dashboard gives an operator cost, error, and quota visibility on a single screen. That is the whole production observability story for most teams.",
          },
        ],
      },
      {
        id: "4-6",
        title: "Regions, priority, and security",
        blocks: [
          {
            type: "p",
            text: "Three platform properties matter once real users depend on your agents:",
          },
          {
            type: "list",
            items: [
              "**Global availability.** The platform runs across four regions, and requests are served from the nearest one for lower latency and higher resilience. You do not configure anything; the same base URL routes globally.",
              "**Priority processing.** During high-demand periods, requests from Premium subscribers are processed ahead of the free tier. If your workload is latency-sensitive at peak hours, this is the operational reason to upgrade, separate from the premium-only endpoints.",
              "**Security posture.** Transport is encrypted, API keys are scoped and revocable, and the platform maintains security certifications and compliance standards (documented at docs.swarms.ai under Security). Your side of the contract: keep keys in a secrets manager, rotate them on any suspicion, and give each application its own key so revocation is surgical.",
            ],
          },
          {
            type: "callout",
            variant: "tip",
            title: "One key per application",
            text: "Separate keys per app also makes /v1/swarm/logs and usage reports attributable: when spend spikes, you know which system did it in one glance.",
          },
        ],
      },
      {
        id: "4-7",
        title: "The production readiness checklist",
        blocks: [
          {
            type: "p",
            text: "Before pointing real traffic at your agents, walk this list:",
          },
          {
            type: "list",
            items: [
              "API keys live in environment variables or a secrets manager, never in code",
              "Every call path handles 400, 401, 402, 429, and 500 distinctly",
              "429 and 500 retries use exponential backoff with a retry cap",
              "`max_tokens` and `max_loops` are explicitly set on every agent",
              "High-volume workloads use batch endpoints instead of request loops",
              "Non-urgent batches are scheduled into the overnight discount window",
              "A daily job reads `/v1/usage/report` and alerts on cost anomalies",
              "Failures are diagnosed from `/v1/swarm/logs` rather than re-runs",
              "One representative task's cost was measured before scaling to N",
            ],
          },
          {
            type: "p",
            text: "Teams that adopt this list before launch spend their first production week tuning prompts. Teams that skip it spend that week writing this list from incident reports.",
          },
        ],
      },
    ],
    checkpoint: {
      title: "Checkpoint project: an overnight batch pipeline",
      blocks: [
        {
          type: "p",
          text: "The capstone for the course. Build a small but genuinely production-shaped system:",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "Pick a repetitive task (score leads, triage tickets, summarize filings) and define one agent for it with explicit `max_tokens` and `max_loops`",
            "Measure the cost of one run from its `usage` field and estimate the cost of 500",
            "Submit 20+ tasks through `/v1/agent/batch/completions` wrapped in your retry function from lesson 4.3",
            "The next morning, verify the run from `/v1/swarm/logs` and `/v1/usage/report` without re-executing anything",
          ],
        },
        {
          type: "p",
          text: "If the numbers you estimated match the numbers you observed, you are operating the Swarms API the way production teams do, and you have finished the course. The examples library at docs.swarms.ai goes deeper on every pattern you have learned.",
        },
      ],
    },
    quiz: [
      {
        question: "You need to score 10,000 support tickets with one agent. What is the right approach?",
        options: [
          "A for-loop of 10,000 calls to /v1/agent/completions",
          "One request to /v1/agent/batch/completions with 10,000 entries",
          "A HierarchicalSwarm with 10,000 workers",
          "10,000 tabs of the playground",
        ],
        answer: 1,
        explanation:
          "The batch endpoint accepts a list of complete requests and executes them concurrently on the platform's thread pool: faster, simpler, and more reliable than a client-side loop.",
      },
      {
        question: "Which status codes should your client retry?",
        options: [
          "All non-200 responses",
          "400 and 401",
          "429 and 500, with exponential backoff",
          "Only network timeouts, never HTTP errors",
        ],
        answer: 2,
        explanation:
          "429 (rate limit) and 500 (server error) are transient. 400 and 402 fail identically on every attempt, so retrying them burns quota for nothing.",
      },
      {
        question: "What does the night-mode pricing window offer?",
        options: [
          "Free requests after midnight",
          "50% off swarm-completion token costs from 8 PM to 6 AM Pacific",
          "Double rate limits overnight",
          "Priority processing for all users",
        ],
        answer: 1,
        explanation:
          "Swarm completions in the 8 PM to 6 AM Pacific window cost half as much in tokens, which is why non-urgent batch pipelines should be scheduled overnight with cron.",
      },
      {
        question: "What is the highest-impact lever for cutting a swarm's cost?",
        options: [
          "Shorter agent names",
          "Tiering models: frontier only for directors and synthesis, cheaper models elsewhere",
          "Setting temperature to 0",
          "Removing agent descriptions",
        ],
        answer: 1,
        explanation:
          "Model tiering commonly cuts spend 2-5x. The two settings that let cost run away, max_tokens and max_loops, should also be set explicitly on every agent.",
      },
      {
        question: "An overnight batch behaved strangely. Where do you look first, without re-running anything?",
        options: [
          "GET /v1/swarm/logs",
          "GET /health",
          "POST /v1/agent/completions with the same payload",
          "The model provider's status page",
        ],
        answer: 0,
        explanation:
          "/v1/swarm/logs holds the request history for your keys: what ran, when, with what configuration and outcome. Diagnose from logs; re-running costs money and may not reproduce the issue.",
      },
      {
        question: "How can your client track remaining quota without extra API calls?",
        options: [
          "It cannot; you must poll /v1/rate/limits",
          "Read the X-RateLimit-* headers on responses",
          "Count requests locally",
          "Subscribe to a webhook",
        ],
        answer: 1,
        explanation:
          "Rate-limited responses carry X-RateLimit-* headers (limit, remaining, reset), so a client can throttle itself from data it already has. /v1/rate/limits exists for on-demand checks.",
      },
      {
        question: "Why give each application its own API key?",
        options: [
          "Keys expire per application",
          "It is required by the API",
          "Spend and logs stay attributable, and revocation affects only one system",
          "It increases rate limits",
        ],
        answer: 2,
        explanation:
          "Per-app keys make usage reports and /v1/swarm/logs tell you which system did what, and let you revoke a leaked key without taking down everything else.",
      },
    ],
  },
]

export function getPart(slug: string): CoursePart | undefined {
  return courseParts.find((p) => p.slug === slug)
}
