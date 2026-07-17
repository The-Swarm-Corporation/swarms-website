export type FaqItem = { question: string; answer: string }

export const academyFaq: FaqItem[] = [
  {
    question: "What is Swarms Academy?",
    answer:
      "Swarms Academy is the free learning hub for the Swarms multi-agent AI stack. It opens with a full four-part course on the Swarms API, with dedicated courses for the Swarms Marketplace and the open-source Swarms framework coming soon, taking you from your first AI agent to production multi-agent systems.",
  },
  {
    question: "Are Swarms Academy courses free?",
    answer:
      "Yes. Every Swarms Academy course is free, with no signup, paywall, or certificate fee. Lessons that execute live requests against the Swarms API use your own API key and consume a small number of credits, and new accounts include free credits to learn with.",
  },
  {
    question: "Which course should I start with?",
    answer:
      "Start with the Swarms API course. It is a four-part multi-agent course that covers authentication and your first agent, single-agent capabilities like streaming and structured outputs, multi-agent orchestration architectures, and production operations at scale.",
  },
  {
    question: "Do I need prior experience with AI agents?",
    answer:
      "No. The courses assume basic Python and nothing else. Every concept, from a single agent completion to hierarchical swarms and directed graph workflows, is introduced from first principles with runnable code examples.",
  },
  {
    question: "What is a multi-agent course?",
    answer:
      "A multi-agent course teaches you to build systems where several AI agents collaborate on one task: sequential pipelines, parallel fan-outs, hierarchical teams with a director, debate and consensus patterns, and graph workflows. The Swarms Academy multi-agent curriculum teaches each architecture with live, runnable API examples.",
  },
  {
    question: "How long do the courses take to complete?",
    answer:
      "The flagship Swarms API course takes about six hours across four parts, including live API trials, checkpoint projects, and end-of-part quizzes. Each part is self-contained, so you can complete one sitting at a time.",
  },
]

export const courseFaq: FaqItem[] = [
  {
    question: "How long does the Swarms API course take?",
    answer:
      "About six hours across four parts: Foundations (60 minutes), Single-Agent Capabilities (90 minutes), Multi-Agent Orchestration (105 minutes), and Production (90 minutes). Each part ends with a checkpoint project and a graded quiz.",
  },
  {
    question: "Is the Swarms API course free?",
    answer:
      "Yes, the full course is free with no signup. The embedded live API trials run against your own Swarms API key; new accounts include free credits, and every trial is labeled with whether it consumes credits.",
  },
  {
    question: "What do I need before starting?",
    answer:
      "Basic Python and a free Swarms API key from swarms.world/platform/api-keys. Every example also translates directly to any HTTP client or the OpenAI SDK, so Python is a convenience rather than a requirement.",
  },
  {
    question: "Does the course cover multi-agent orchestration?",
    answer:
      "Yes. Part 3 is a full multi-agent orchestration module covering SequentialWorkflow, ConcurrentWorkflow, HierarchicalSwarm, GroupChat, MixtureOfAgents, MajorityVoting, debate and council patterns, AgentRearrange, and GraphWorkflow DAGs, with guidance on choosing the right architecture.",
  },
  {
    question: "Can I run real API requests inside the course?",
    answer:
      "Yes. The course embeds twelve live API trials: paste your API key once and execute real requests against api.swarms.world directly from the lesson, edit the JSON request bodies, and inspect status codes, latency, and responses inline.",
  },
  {
    question: "Does the course track my progress?",
    answer:
      "Yes. The course tracks completed lessons, checkpoint projects, live trial runs, and quiz scores, and awards points for each: 10 per lesson, 15 per successful API trial, 25 per checkpoint, and 5 per correct quiz answer with a perfect-score bonus. Points rank you from Recruit up to Swarm Architect, and finishing every activity in a part earns its badge. Progress is stored in your browser, no account required.",
  },
  {
    question: "What should I do after finishing the course?",
    answer:
      "Ship something. The production part ends with an overnight batch pipeline capstone, and the Swarms API documentation at docs.swarms.ai continues with an examples library covering finance, healthcare, legal, and operations swarms, plus migration guides from LangGraph, CrewAI, and AutoGen.",
  },
]
