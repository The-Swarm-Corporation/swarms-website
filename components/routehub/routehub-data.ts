// Content for the /routehub landing page. Benchmark figures come from the
// RouteHub paper (October 2026: RouteHub at commit 55284e1 against LiteLLM
// 1.104.0 and the bare OpenAI and Anthropic SDKs, each in its own environment
// against an instant mock server). They match the "Introducing RouteHub" post.
// Code samples follow the RouteHub README and example.py.

export const REPO = "The-Swarm-Corporation/RouteHub"
export const REPO_URL = `https://github.com/${REPO}`
export const PYPI_URL = "https://pypi.org/project/routehub/"
export const PAPER_URL = `${REPO_URL}/blob/main/docs/routehub.pdf`
export const MIGRATION_URL = `${REPO_URL}/blob/main/skills/routehub/migrating-from-litellm.md`
export const SKILL_URL = `${REPO_URL}/blob/main/skills/routehub/SKILL.md`
export const LAUNCH_POST = "/blog/introducing-routehub"
export const MIGRATION_POST = "/blog/migrate-from-litellm-to-routehub"
export const VERSION = "0.2.0"
export const INSTALL = "pip install routehub"

// ---------------------------------------------------------------------------
// Hero

export const HERO_CODE = `import routehub

messages = [{"role": "user", "content": "Summarize the Q3 risks."}]

for model in [
    "gpt-5.4-mini",
    "claude-sonnet-4-6",
    "gemini/gemini-3-flash-preview",
    "groq/llama-3.3-70b-versatile",
]:
    response = routehub.completion(model=model, messages=messages)
    print(response.choices[0].message.content)`

// ---------------------------------------------------------------------------
// Benchmarks

export const HERO_STATS = [
  { value: "3.2 ms", label: "to import", note: "LiteLLM takes 1,235 ms, 383x longer" },
  { value: "267 ms", label: "fresh process to first response", note: "LiteLLM takes 1,464 ms, 5.5x longer" },
  { value: "54 MiB", label: "peak memory", note: "LiteLLM uses 211 MiB, 3.9x more" },
  { value: "9 µs", label: "added to each OpenAI call", note: "LiteLLM adds 647 µs" },
]

export type BenchRow = {
  name: string
  value: number
  display: string
  kind: "ours" | "sdk" | "litellm"
}

export type BenchVariant = {
  id: string
  label: string
  rows: BenchRow[]
  note: string
}

export type BenchMetric = {
  id: string
  label: string
  badge: string
  title: string
  sub: string
  variants: BenchVariant[]
}

const rh = (value: number, display: string): BenchRow => ({ name: "RouteHub", value, display, kind: "ours" })
const oa = (value: number, display: string): BenchRow => ({ name: "OpenAI SDK (bare)", value, display, kind: "sdk" })
const an = (value: number, display: string): BenchRow => ({ name: "Anthropic SDK (bare)", value, display, kind: "sdk" })
const ll = (value: number, display: string): BenchRow => ({ name: "LiteLLM", value, display, kind: "litellm" })

export const BENCHMARKS: BenchMetric[] = [
  {
    id: "import",
    label: "Import time",
    badge: "383x faster",
    title: "Time to import the library",
    sub: "Median of 20 fresh processes, in milliseconds",
    variants: [
      {
        id: "default",
        label: "",
        rows: [rh(3.2, "3.2 ms"), oa(217.2, "217.2 ms"), ll(1235.3, "1,235.3 ms")],
        note: "Importing RouteHub loads 18 modules and no third-party code. LiteLLM loads 2,502, including the OpenAI SDK, aiohttp, jinja2 and tokenizers, and with its default settings it also downloads a model price list from GitHub before your code runs.",
      },
    ],
  },
  {
    id: "first",
    label: "First response",
    badge: "5.5x faster",
    title: "Fresh process: import plus the first request",
    sub: "Median of 20 fresh processes, in milliseconds",
    variants: [
      {
        id: "default",
        label: "",
        rows: [rh(267, "267 ms"), oa(258, "258 ms"), ll(1464, "1,464 ms")],
        note: "RouteHub loads the OpenAI SDK when the first request needs it, so import plus first call is the fair comparison. It lands within 9 ms of the bare SDK. Serverless functions, CLI tools and CI jobs pay this on every start.",
      },
    ],
  },
  {
    id: "memory",
    label: "Peak memory",
    badge: "3.9x less",
    title: "Peak memory after the first request",
    sub: "Peak resident set size, in MiB",
    variants: [
      {
        id: "default",
        label: "",
        rows: [rh(54, "54 MiB"), oa(53, "53 MiB"), ll(211, "211 MiB")],
        note: "RouteHub stays within about a megabyte of the bare OpenAI SDK. LiteLLM's process holds 194 MiB before it sends a single request.",
      },
    ],
  },
  {
    id: "latency",
    label: "Per-call latency",
    badge: "+9 µs",
    title: "Latency of a warm call",
    sub: "Median of 1,200 sequential calls, in milliseconds",
    variants: [
      {
        id: "openai-1",
        label: "OpenAI · 1 message",
        rows: [rh(0.55, "0.55 ms"), oa(0.54, "0.54 ms"), ll(1.19, "1.19 ms")],
        note: "RouteHub adds 9 µs to the bare SDK, inside run-to-run noise. LiteLLM adds 647 µs to every call: it creates a logging object, runs cache and metadata hooks, converts the reply into its own type and hands a success handler to a thread pool.",
      },
      {
        id: "openai-agent",
        label: "OpenAI · agent request",
        rows: [rh(2.08, "2.08 ms"), oa(2.04, "2.04 ms"), ll(2.78, "2.78 ms")],
        note: "A 22-message conversation with four tools. Most of this time is the OpenAI SDK walking every message before it serializes the body. RouteHub adds 32 µs on top of that, LiteLLM 736 µs.",
      },
      {
        id: "anthropic-1",
        label: "Anthropic · 1 message",
        rows: [rh(0.26, "0.26 ms"), an(0.42, "0.42 ms"), ll(0.98, "0.98 ms")],
        note: "RouteHub calls Claude's native Messages API through its own adapter, and it is faster than the official Anthropic SDK even though it also translates the request and the response.",
      },
      {
        id: "anthropic-agent",
        label: "Anthropic · agent request",
        rows: [rh(0.29, "0.29 ms"), an(0.45, "0.45 ms"), ll(1.12, "1.12 ms")],
        note: "With 22 messages and four tools, RouteHub's single-pass translator sends the request in 0.29 ms, against 0.45 ms for the Anthropic SDK and 1.12 ms for LiteLLM.",
      },
    ],
  },
  {
    id: "streaming",
    label: "Streaming",
    badge: "6.7x faster",
    title: "Consuming a 200-chunk stream",
    sub: "Median of 200 streams, in milliseconds",
    variants: [
      {
        id: "openai",
        label: "OpenAI",
        rows: [rh(9.1, "9.1 ms"), oa(9.8, "9.8 ms"), ll(61.1, "61.1 ms")],
        note: "LiteLLM spends about 224 µs on every chunk and delivers the first one after 16.6 ms. At 100 chunks per second, 50 open streams at that cost keep a full CPU core busy on chunk handling alone.",
      },
      {
        id: "anthropic",
        label: "Anthropic",
        rows: [rh(1.2, "1.2 ms"), an(2.4, "2.4 ms"), ll(66.6, "66.6 ms")],
        note: "RouteHub parses Anthropic's event stream and builds every OpenAI chunk itself in about 5 µs per chunk. The Anthropic SDK needs about 10 µs per chunk for its own native events.",
      },
    ],
  },
  {
    id: "reconnect",
    label: "After a tool pause",
    badge: "67 ms saved",
    title: "A call after a 10-second tool pause",
    sub: "Real requests to api.openai.com, median of 6 runs, in milliseconds",
    variants: [
      {
        id: "default",
        label: "",
        rows: [rh(116, "116 ms"), oa(166, "166 ms"), ll(185, "185 ms")],
        note: "httpx and the OpenAI SDK close idle connections after 5 seconds. RouteHub keeps them open for 60, so an agent step that follows a long tool call skips the TCP and TLS handshake. Over a 50-step agent run that is about 3.3 seconds.",
      },
    ],
  },
  {
    id: "footprint",
    label: "Install size",
    badge: "21 vs 58",
    title: "What a clean install pulls in",
    sub: "Fully resolved dependency tree",
    variants: [
      {
        id: "packages",
        label: "Packages",
        rows: [
          { name: "RouteHub", value: 21, display: "21 packages", kind: "ours" },
          { name: "LiteLLM", value: 58, display: "58 packages", kind: "litellm" },
        ],
        note: "RouteHub has three direct dependencies: openai, pydantic and tiktoken. Every installed package is code that runs with your API keys, so a smaller tree is a smaller attack surface.",
      },
      {
        id: "disk",
        label: "Disk",
        rows: [
          { name: "RouteHub", value: 22.9, display: "22.9 MiB", kind: "ours" },
          { name: "LiteLLM", value: 168.5, display: "168.5 MiB", kind: "litellm" },
        ],
        note: "LiteLLM's 168.5 MiB includes boto3, huggingface_hub, tokenizers, aiohttp and jinja2, whether or not your code uses them.",
      },
    ],
  },
]

// Inputs to the agent-run calculator, all from the paper. Startup and
// per-call figures are the mock-server results (per-call is the overhead
// added to the bare OpenAI SDK for the 22-message agent request). The
// handshake is the real-network result against api.openai.com.
export const AGENT_MATH = {
  coldStart: { routehub: 267, litellm: 1464 },
  perCall: { routehub: 0.032, litellm: 0.736 },
  handshake: 67,
}

// ---------------------------------------------------------------------------
// Code panels shared by the quickstart and the feature explorer.

export type CodeVariant = {
  label: string
  file: string
  lang: string
  code: string
  /** Shell line typed into the demo terminal. Omitted when the snippet is itself shell. */
  command?: string
  /** Illustrative terminal output, one entry per line. No terminal when omitted. */
  output?: string[]
}

export type QuickstartStep = {
  n: number
  title: string
  body: string
  variant: CodeVariant
}

export const QUICKSTART: QuickstartStep[] = [
  {
    n: 1,
    title: "Install from PyPI",
    body: "Python 3.10 or later. RouteHub has three direct dependencies: openai, pydantic and tiktoken. Add the fast extra to use orjson for JSON.",
    variant: {
      label: "",
      file: "terminal",
      lang: "bash",
      code: `pip install routehub

# or with uv
uv add routehub

# with orjson for faster JSON handling
pip install "routehub[fast]"`,
      output: [
        "Collecting routehub",
        "Downloading routehub-0.2.0-py3-none-any.whl",
        "Collecting openai>=1.68 (from routehub)",
        "Collecting pydantic>=2.0 (from routehub)",
        "Collecting tiktoken>=0.7 (from routehub)",
        "Installing collected packages",
        "Successfully installed routehub-0.2.0",
      ],
    },
  },
  {
    n: 2,
    title: "Set a key and make your first call",
    body: "Export the key for your provider, then call completion(). The response is the OpenAI SDK's own ChatCompletion, so attribute access and type hints work as usual.",
    variant: {
      label: "",
      file: "main.py",
      lang: "python",
      code: `# export OPENAI_API_KEY="sk-..."
import routehub

response = routehub.completion(
    model="gpt-5.4-mini",
    messages=[{
        "role": "user",
        "content": "Name three risks of a single-region deployment.",
    }],
)
print(response.choices[0].message.content)
print(response.usage.total_tokens, "tokens")`,
      command: "python main.py",
      output: [
        "1. A regional outage takes the whole service down.",
        "2. Users far from the region see higher latency.",
        "3. Data residency rules can block some customers.",
        "61 tokens",
      ],
    },
  },
  {
    n: 3,
    title: "Change providers by changing one string",
    body: "Prefix the model with its provider, or use a bare name like claude-sonnet-4-6. Set the key for each provider you call. The function and the response type stay the same.",
    variant: {
      label: "",
      file: "providers.py",
      lang: "python",
      code: `import routehub

messages = [{"role": "user", "content": "Reply with one word: ready?"}]

for model in [
    "gpt-5.4-mini",
    "claude-sonnet-4-6",
    "gemini/gemini-3-flash-preview",
    "groq/llama-3.3-70b-versatile",
]:
    response = routehub.completion(model=model, messages=messages)
    print(f"{model:32} {response.choices[0].message.content}")`,
      command: "python providers.py",
      output: [
        "gpt-5.4-mini                     Ready.",
        "claude-sonnet-4-6                Ready.",
        "gemini/gemini-3-flash-preview    Ready",
        "groq/llama-3.3-70b-versatile     Ready!",
      ],
    },
  },
]

// ---------------------------------------------------------------------------
// Features

export type FeatureGroup = "call" | "claude" | "production" | "migrate"

export const FEATURE_GROUPS: { id: FeatureGroup; label: string }[] = [
  { id: "call", label: "Call any model" },
  { id: "claude", label: "Claude, natively" },
  { id: "production", label: "Run in production" },
  { id: "migrate", label: "Migrate" },
]

export type Feature = {
  id: string
  group: FeatureGroup
  name: string
  /** Mono sub-label shown in the rail. */
  handle: string
  summary: string
  facts: string[]
  variants: CodeVariant[]
}

const WEATHER_TOOL = `weather = {
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get the weather for a city.",
        "parameters": {
            "type": "object",
            "properties": {"city": {"type": "string"}},
            "required": ["city"],
        },
    },
}`

const structured = (model: string) => `from pydantic import BaseModel
import routehub

class RiskReport(BaseModel):
    title: str
    severity: int

response = routehub.completion(
    model="${model}",
    messages=[{
        "role": "user",
        "content": "Assess the main risk of a single-region deployment.",
    }],
    response_format=RiskReport,
)
report = RiskReport.model_validate_json(
    response.choices[0].message.content
)
print(report)`

export const FEATURES: Feature[] = [
  {
    id: "providers",
    group: "call",
    name: "Every major provider",
    handle: 'model="provider/model"',
    summary:
      "OpenAI, Anthropic, Gemini, Groq, xAI, DeepSeek, OpenRouter, Together, Mistral, Fireworks, Azure OpenAI, Ollama, vLLM and any OpenAI-compatible server, all through one function.",
    facts: [
      "Requests use the OpenAI chat format on every provider",
      "Responses are the OpenAI SDK's own ChatCompletion, ChatCompletionChunk and CreateEmbeddingResponse",
      "Bare names starting with gpt-, claude-, gemini-, grok-, deepseek- or mistral- need no prefix",
      "api_base= points any model at a proxy, a private endpoint or a local server",
    ],
    variants: [
      {
        label: "Hosted",
        file: "hosted.py",
        lang: "python",
        code: `import routehub

messages = [{"role": "user", "content": "Draft a release note."}]

routehub.completion(model="gpt-5.4", messages=messages)
routehub.completion(model="claude-sonnet-4-6", messages=messages)
routehub.completion(model="gemini/gemini-3-flash-preview", messages=messages)
routehub.completion(model="xai/grok-4", messages=messages)
routehub.completion(model="deepseek/deepseek-chat", messages=messages)
routehub.completion(
    model="openrouter/anthropic/claude-sonnet-4.6",
    messages=messages,
)`,
      },
      {
        label: "Local",
        file: "local.py",
        lang: "python",
        code: `import routehub

# Ollama on this machine, or set OLLAMA_API_BASE for a remote one
routehub.completion(model="ollama/llama3", messages=messages)

# A vLLM server
routehub.completion(
    model="hosted_vllm/meta-llama/Llama-3.3-70B-Instruct",
    messages=messages,
    api_base="http://gpu-box:8000/v1",
)

# Any OpenAI-compatible server
routehub.completion(
    model="support-model",
    messages=messages,
    api_base="https://llm.internal.example.com/v1",
)`,
      },
      {
        label: "Azure",
        file: "azure.py",
        lang: "python",
        code: `import os
import routehub

# AZURE_API_KEY, AZURE_API_BASE and AZURE_API_VERSION
# come from the environment...
routehub.completion(model="azure/gpt-prod", messages=messages)

# ...or from the call, so two tenants can use two resources
routehub.completion(
    model="azure/gpt-prod",
    messages=messages,
    api_base="https://acme.openai.azure.com",
    api_version="2024-10-21",
    api_key=os.environ["ACME_AZURE_KEY"],
)`,
      },
    ],
  },
  {
    id: "streaming",
    group: "call",
    name: "Streaming and async",
    handle: "stream=True",
    summary:
      "Stream tokens as they arrive, or send requests concurrently with acompletion. Both take exactly the same arguments as completion.",
    facts: [
      "Streams yield ChatCompletionChunk objects and work in a with block",
      'stream_options={"include_usage": True} adds a final usage chunk, exactly as OpenAI does',
      "aembedding and async model listing are there too",
      "Async HTTP clients are cached per event loop",
    ],
    variants: [
      {
        label: "Stream",
        file: "stream.py",
        lang: "python",
        code: `import routehub

stream = routehub.completion(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "What is an idempotency key?"}],
    stream=True,
    stream_options={"include_usage": True},
)
for chunk in stream:
    if chunk.usage:
        print(f"\\n{chunk.usage.total_tokens} tokens")
    elif chunk.choices and chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)`,
        command: "python stream.py",
        output: [
          "An idempotency key is a unique value a client sends with a",
          "request so the server can recognize retries and return the",
          "first result instead of running the operation twice.",
          "64 tokens",
        ],
      },
      {
        label: "Async",
        file: "fan_out.py",
        lang: "python",
        code: `import asyncio
import routehub

async def main():
    questions = ["Japan", "Kenya", "Peru"]
    responses = await asyncio.gather(*(
        routehub.acompletion(
            model="gpt-5.4-mini",
            messages=[{
                "role": "user",
                "content": f"Capital of {country}? One word.",
            }],
        )
        for country in questions
    ))
    print([r.choices[0].message.content for r in responses])

asyncio.run(main())`,
        command: "python fan_out.py",
        output: ["['Tokyo', 'Nairobi', 'Lima']"],
      },
    ],
  },
  {
    id: "tools",
    group: "call",
    name: "Tool calling",
    handle: "tools=[...]",
    summary:
      "Define tools once in the OpenAI format and use them on any provider. For Claude, RouteHub translates definitions, calls and results to Anthropic's format and back, including parallel calls.",
    facts: [
      "Read calls from message.tool_calls on every provider",
      'Return results as {"role": "tool"} messages with the call\'s id',
      "tool_choice is translated along with the tools",
    ],
    variants: [
      {
        label: "Claude",
        file: "tools.py",
        lang: "python",
        code: `import json
import routehub

${WEATHER_TOOL}

model = "claude-sonnet-4-6"
messages = [{"role": "user", "content": "What's the weather in Paris?"}]

response = routehub.completion(model=model, messages=messages, tools=[weather])
message = response.choices[0].message
call = message.tool_calls[0]
print(call.function.name, json.loads(call.function.arguments))

messages += [
    {"role": "assistant", "content": message.content,
     "tool_calls": [call.model_dump()]},
    {"role": "tool", "tool_call_id": call.id, "content": "Sunny, 21°C"},
]
final = routehub.completion(model=model, messages=messages, tools=[weather])
print(final.choices[0].message.content)`,
        command: "python tools.py",
        output: ["get_weather {'city': 'Paris'}", "It's sunny in Paris right now, about 21°C."],
      },
      {
        label: "Gemini",
        file: "tools.py",
        lang: "python",
        code: `import json
import routehub

${WEATHER_TOOL}

model = "gemini/gemini-3-flash-preview"
messages = [{"role": "user", "content": "What's the weather in Paris?"}]

response = routehub.completion(model=model, messages=messages, tools=[weather])
message = response.choices[0].message
call = message.tool_calls[0]
print(call.function.name, json.loads(call.function.arguments))

messages += [
    {"role": "assistant", "content": message.content,
     "tool_calls": [call.model_dump()]},
    {"role": "tool", "tool_call_id": call.id, "content": "Sunny, 21°C"},
]
final = routehub.completion(model=model, messages=messages, tools=[weather])
print(final.choices[0].message.content)`,
        command: "python tools.py",
        output: ["get_weather {'city': 'Paris'}", "It is currently sunny in Paris, with a temperature of 21°C."],
      },
    ],
  },
  {
    id: "structured",
    group: "call",
    name: "Structured output",
    handle: "response_format=Model",
    summary:
      "Pass a pydantic model and get back JSON that validates against it. For Claude, the schema is enforced through a forced tool call and returned as the message content.",
    facts: [
      "A pydantic model becomes a strict json_schema response format",
      "Validate the reply with Model.model_validate_json",
      "The same code works on OpenAI and Claude",
    ],
    variants: [
      {
        label: "OpenAI",
        file: "structured.py",
        lang: "python",
        code: structured("gpt-5.4-mini"),
        command: "python structured.py",
        output: ["title='A regional outage takes down the whole service' severity=4"],
      },
      {
        label: "Claude",
        file: "structured.py",
        lang: "python",
        code: structured("claude-sonnet-4-6"),
        command: "python structured.py",
        output: ["title='Single point of failure at the region level' severity=4"],
      },
    ],
  },
  {
    id: "claude",
    group: "claude",
    name: "Prompt caching and thinking",
    handle: "cache_control",
    summary:
      "Anthropic's OpenAI-compatible endpoint drops prompt caching, thinking output and cached-token usage. RouteHub calls the native Messages API instead, so all three work.",
    facts: [
      "cache_control markers on messages and tools go to Anthropic unchanged",
      "reasoning_effort turns on extended thinking; it comes back as reasoning_content and signed thinking_blocks",
      "Cache reads and writes are counted in usage, so cost accounting stays correct",
      "Images, PDFs and tool use are translated both ways",
    ],
    variants: [
      {
        label: "Prompt caching",
        file: "caching.py",
        lang: "python",
        code: `import routehub

messages = [
    {
        "role": "system",
        "content": [{
            "type": "text",
            "text": policy_handbook,
            "cache_control": {"type": "ephemeral"},
        }],
    },
    {"role": "user", "content": "Which policies cover vendor onboarding?"},
]

for attempt in (1, 2):
    response = routehub.completion(
        model="claude-sonnet-4-6", messages=messages
    )
    usage = response.usage
    print(
        f"call {attempt}:",
        f"read {usage.prompt_tokens_details.cached_tokens}",
        f"written {usage.cache_creation_input_tokens}",
    )`,
        command: "python caching.py",
        output: ["call 1: read 0 written 5214", "call 2: read 5214 written 0"],
      },
      {
        label: "Extended thinking",
        file: "thinking.py",
        lang: "python",
        code: `import routehub

response = routehub.completion(
    model="claude-sonnet-4-6",
    messages=[{"role": "user", "content": "Is 2027 a prime number?"}],
    reasoning_effort="medium",
)
message = response.choices[0].message
print("thinking:", message.reasoning_content)
print("answer:", message.content)

# Send message.thinking_blocks back on the assistant turn
# for multi-turn tool use, as Anthropic requires.`,
        command: "python thinking.py",
        output: [
          "thinking: sqrt(2027) is about 45, so I only need primes up to 43.",
          "2027 is odd, its digits sum to 11, and 7, 11, 13 ... 43 all leave remainders.",
          "answer: Yes. 2027 is a prime number.",
        ],
      },
    ],
  },
  {
    id: "errors",
    group: "production",
    name: "Typed errors and retries",
    handle: "except RateLimitError",
    summary:
      "Every provider failure is raised as a typed exception that carries the status code, provider and model. Each one subclasses the matching OpenAI SDK exception, so the handlers you already have keep working.",
    facts: [
      "RateLimitError, ContextWindowExceededError, AuthenticationError, ServiceUnavailableError and more",
      "num_retries retries rate limits, 5xx errors and connection failures with exponential backoff that respects retry-after",
      "The original error is chained as __cause__",
    ],
    variants: [
      {
        label: "Handle",
        file: "errors.py",
        lang: "python",
        code: `import routehub

try:
    routehub.completion(
        model="gpt-5.4-mini",
        messages=messages,
        num_retries=3,
    )
except routehub.ContextWindowExceededError:
    messages = messages[-10:]  # trim the conversation and retry
except routehub.RateLimitError as error:
    print(error.status_code, error.llm_provider, error.model)`,
        command: "python errors.py",
        output: ["429 openai gpt-5.4-mini"],
      },
      {
        label: "Bad key",
        file: "auth.py",
        lang: "python",
        code: `import routehub

try:
    routehub.completion(
        model="gpt-5.4-mini",
        messages=[{"role": "user", "content": "hi"}],
        api_key="sk-invalid",
        num_retries=0,
    )
except routehub.AuthenticationError as error:
    print(type(error).__name__, error.status_code, error.llm_provider)`,
        command: "python auth.py",
        output: ["AuthenticationError 401 openai"],
      },
    ],
  },
  {
    id: "config",
    group: "production",
    name: "No global state",
    handle: "per-call settings",
    summary:
      "Retries, TLS verification, timeouts and parameter dropping are arguments to each call. One tenant's settings never leak into another's, which matters when many agents or teams share a process.",
    facts: [
      "drop_params, num_retries, ssl_verify, request_timeout and set_verbose on every call",
      "Pass your own OpenAI or httpx client for a proxy or mTLS",
      "Clients are pooled per configuration, so per-call settings cost one hash lookup",
      "set_verbose never prints API keys or message content",
    ],
    variants: [
      {
        label: "RouteHub",
        file: "tenants.py",
        lang: "python",
        code: `import routehub

# Agent A: behind a corporate proxy with a private CA bundle
routehub.completion(
    model="gpt-5.4-mini",
    messages=messages,
    ssl_verify="/etc/ssl/corp-ca.pem",
    num_retries=5,
    request_timeout=30,
)

# Agent B, same process: defaults, untouched by Agent A
routehub.completion(model="claude-sonnet-4-6", messages=messages)`,
      },
      {
        label: "LiteLLM, for comparison",
        file: "tenants.py",
        lang: "python",
        code: `import litellm

# Module globals: every caller in the process now
# shares these settings, including other tenants
litellm.ssl_verify = False
litellm.num_retries = 5
litellm.drop_params = True

litellm.completion(model="gpt-5.4-mini", messages=messages)`,
      },
    ],
  },
  {
    id: "catalog",
    group: "production",
    name: "Model catalog and costs",
    handle: "get_model_info()",
    summary:
      "Context windows, output limits, per-token prices and capabilities from OpenRouter's live model list, plus every model each provider serves from its own API. Both cache for five minutes, with no bundled data file to go stale.",
    facts: [
      "get_model_info returns per-token prices, so spend can be computed per call",
      "Usage comes back in one shape for every provider, including cached and reasoning tokens",
      "register_model adds private, fine-tuned or self-hosted models",
      "get_all_models queries every configured provider concurrently",
    ],
    variants: [
      {
        label: "Cost per call",
        file: "cost.py",
        lang: "python",
        code: `import routehub

info = routehub.get_model_info("claude-sonnet-4-6")
print(info["max_input_tokens"], info["max_output_tokens"])

response = routehub.completion(
    model="claude-sonnet-4-6", messages=messages
)
usage = response.usage
cost = (
    usage.prompt_tokens * info["input_cost_per_token"]
    + usage.completion_tokens * info["output_cost_per_token"]
)
print(f"\${cost:.6f}")`,
        command: "python cost.py",
        output: ["1000000 128000", "$0.004215"],
      },
      {
        label: "All providers",
        file: "models.py",
        lang: "python",
        code: `from routehub.get_all_models import get_all_models, get_model

# Every provider with a key configured, plus OpenRouter
models = get_all_models()
chat = [m for m in models if m["type"] == "chat"]
print(len(chat), "chat models")

get_all_models(["anthropic", "gemini"])      # selected providers
get_model("anthropic", "claude-sonnet-4-6")  # one model`,
        command: "python models.py",
        output: ["412 chat models"],
      },
      {
        label: "Private models",
        file: "register.py",
        lang: "python",
        code: `import routehub

routehub.register_model({
    "acme-support-ft": {
        "max_input_tokens": 32768,
        "max_output_tokens": 4096,
        "supports_function_calling": True,
        "input_cost_per_token": 0.000002,
    }
})
print(routehub.supports_function_calling("acme-support-ft"))`,
        command: "python register.py",
        output: ["True"],
      },
    ],
  },
  {
    id: "testing",
    group: "production",
    name: "Testing without a provider",
    handle: "mock_response=",
    summary:
      "mock_response returns a real ChatCompletion, or a stream when stream=True, with no network call and no API key. Pass an exception to rehearse failure handling.",
    facts: [
      "Runs in CI with no secrets configured",
      "Exceptions rehearse outages, timeouts and retry paths",
      "RouteHub itself ships with 231 offline tests",
    ],
    variants: [
      {
        label: "Reply",
        file: "test_agent.py",
        lang: "python",
        code: `import routehub

response = routehub.completion(
    model="gpt-5.4-mini",
    messages=[{"role": "user", "content": "Is the deploy approved?"}],
    mock_response="Approved.",
)
print(response.choices[0].message.content)
print(type(response).__name__)`,
        command: "python test_agent.py",
        output: ["Approved.", "ChatCompletion"],
      },
      {
        label: "Outage",
        file: "test_outage.py",
        lang: "python",
        code: `import routehub

try:
    routehub.completion(
        model="gpt-5.4-mini",
        messages=[{"role": "user", "content": "Is the deploy approved?"}],
        mock_response=TimeoutError("simulated outage"),
    )
except TimeoutError as error:
    print(type(error).__name__, error)`,
        command: "python test_outage.py",
        output: ["TimeoutError simulated outage"],
      },
    ],
  },
  {
    id: "migrate",
    group: "migrate",
    name: "Drop-in for LiteLLM",
    handle: "from routehub import completion",
    summary:
      "RouteHub keeps LiteLLM's function names and module paths, so moving over is mostly a change of import. Settings move from module globals to arguments.",
    facts: [
      "routehub.utils and routehub.exceptions mirror litellm's modules",
      "Responses are OpenAI SDK objects: use attributes or .model_dump() instead of dictionary keys",
      "max_tokens is sent to OpenAI as max_completion_tokens, which reasoning models require",
      "litellm-only arguments such as metadata and caching are accepted and ignored",
    ],
    variants: [
      {
        label: "Before: LiteLLM",
        file: "agent.py",
        lang: "python",
        code: `import litellm
from litellm import completion
from litellm.exceptions import RateLimitError

litellm.drop_params = True
litellm.num_retries = 3

response = completion(model="claude-sonnet-4-6", messages=messages)
print(response["choices"][0]["message"]["content"])`,
      },
      {
        label: "After: RouteHub",
        file: "agent.py",
        lang: "python",
        code: `from routehub import completion
from routehub.exceptions import RateLimitError

response = completion(
    model="claude-sonnet-4-6",
    messages=messages,
    drop_params=True,
    num_retries=3,
)
print(response.choices[0].message.content)`,
      },
    ],
  },
]

// ---------------------------------------------------------------------------
// Get started and the paper

export const SKILL_INSTALL = `git clone https://github.com/The-Swarm-Corporation/RouteHub.git
mkdir -p ~/.claude/skills
cp -r RouteHub/skills/routehub ~/.claude/skills/`

export const MIGRATE_DIFF = `- from litellm import completion
+ from routehub import completion

- litellm.num_retries = 3
- completion(model=model, messages=messages)
+ completion(model=model, messages=messages, num_retries=3)`

export const PAPER = {
  title: "RouteHub: A Low-Overhead, SDK-Native LLM Gateway for Agentic Workloads",
  authors: ["Kye Gomez", "Shryuk Grandhi", "Ayaan Gazali"],
  org: "The Swarm Corporation",
  abstract:
    "LLM gateways give applications one call signature for many model providers, and they sit on the critical path of every request. Agent workloads multiply the gateway's own costs: dozens of sequential calls per task, short-lived worker processes, and wide fan-out. We present RouteHub, a gateway that keeps LiteLLM's API but delegates transport, retries and response types to the official provider SDKs, loads nothing until a request needs it, pools clients per configuration and event loop, keeps connections alive across agent steps, and calls Anthropic's native Messages API through a single-pass translator.",
}

// ---------------------------------------------------------------------------
// FAQ. Rendered on the page and reused as FAQPage structured data, so each
// answer is plain text. `link` adds a visible follow-up link under the answer.

export type Faq = {
  q: string
  a: string
  link?: { label: string; href: string }
}

export const FAQS: Faq[] = [
  {
    q: "What is RouteHub?",
    a: "RouteHub is an open-source LLM gateway for Python from the Swarms team. One completion() function calls OpenAI, Anthropic, Gemini, Groq, xAI, DeepSeek, OpenRouter, Mistral, Together, Fireworks, Azure OpenAI, Ollama, vLLM and any OpenAI-compatible server, and every response comes back as the official OpenAI SDK's ChatCompletion type. Install it with pip install routehub.",
    link: { label: "Read the launch post", href: LAUNCH_POST },
  },
  {
    q: "Is RouteHub a drop-in replacement for LiteLLM?",
    a: "For most Python code, yes. RouteHub keeps LiteLLM's function names and module paths, including completion, acompletion, embedding and routehub.utils.get_model_info, so the main change is the import. Settings that LiteLLM keeps in module globals, such as retries and timeouts, become arguments to each call.",
    link: { label: "Migrate from LiteLLM step by step", href: MIGRATION_POST },
  },
  {
    q: "How much faster is RouteHub than LiteLLM?",
    a: "In the RouteHub paper's benchmarks against LiteLLM 1.104.0, RouteHub imports in 3.2 ms against 1,235 ms (383x faster), reaches a first response from a fresh process in 267 ms against 1,464 ms (5.5x faster), peaks at 54 MiB of memory against 211 MiB, and adds 9 µs to each OpenAI call against 647 µs. LiteLLM's aiohttp transport is ahead on async throughput at 128 requests in flight.",
    link: { label: "Why is LiteLLM slow?", href: "/blog/why-is-litellm-slow" },
  },
  {
    q: "Which LLM providers does RouteHub support?",
    a: "More than 20, including OpenAI, Anthropic, Google Gemini, Groq, xAI, DeepSeek, OpenRouter, Mistral, Together, Fireworks, Azure OpenAI, Ollama and vLLM. Any server that speaks the OpenAI API works through api_base, including private endpoints and local servers. Native Bedrock and Vertex AI adapters are on the roadmap.",
  },
  {
    q: "Does RouteHub support streaming, async, tool calling and structured output?",
    a: "Yes. stream=True yields ChatCompletionChunk objects, acompletion takes the same arguments as completion for concurrent requests, tools defined once in the OpenAI format work on every provider, and passing a pydantic model returns JSON that validates against it. For Claude, RouteHub translates tool definitions, calls and results to Anthropic's format and back.",
  },
  {
    q: "Does RouteHub support Claude prompt caching and extended thinking?",
    a: "Yes. Anthropic's OpenAI-compatible endpoint drops prompt caching, thinking output and cached-token usage, so RouteHub calls Anthropic's native Messages API instead and keeps all three. In the paper's benchmarks, RouteHub's Claude path was also faster than the official Anthropic SDK for both regular and streaming calls.",
    link: { label: "Use Claude in OpenAI format from Python", href: "/blog/claude-openai-format-python" },
  },
  {
    q: "Does RouteHub include a proxy server like LiteLLM's?",
    a: "No. RouteHub is a Python library that runs inside your process. It has no proxy server, budgets, spend logging, callbacks or router. Teams that depend on those features can keep the LiteLLM proxy or choose a self-hosted gateway, and our comparison of LiteLLM alternatives covers both options.",
    link: { label: "Compare LiteLLM alternatives", href: "/blog/best-litellm-alternative" },
  },
  {
    q: "Is RouteHub free?",
    a: "Yes. RouteHub is free and open source under the Apache 2.0 license and runs on Python 3.10 and later. It has three direct dependencies (openai, pydantic and tiktoken) and installs 21 packages in total, against 58 for LiteLLM. You pay only your model providers for the tokens you use.",
    link: { label: "Compare Python LLM gateways", href: "/blog/best-llm-gateway-python" },
  },
]
