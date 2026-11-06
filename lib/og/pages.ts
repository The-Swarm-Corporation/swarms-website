import { renderOgCard, type OgCard } from "./card"

// Card copy for every static route, keyed by path. Each route's
// opengraph-image.tsx and twitter-image.tsx render the same entry, so the
// Open Graph and Twitter previews never drift apart. Dynamic routes (blog
// posts, hiring roles, course parts) build their card from their own data.

export interface OgPage extends Pick<OgCard, "eyebrow" | "title" | "description" | "locale"> {
  alt: string
}

export const ogPages = {
  "/": {
    eyebrow: "Multi-agent AI",
    title: "The infrastructure stack to build, deploy, and monetize AI agents",
    description: "Swarms Python and Rust, the Swarms API, Swarms Cloud, and the Swarms Marketplace.",
    alt: "Swarms: the infrastructure stack to build, deploy, and monetize AI agents",
  },
  "/academy": {
    eyebrow: "Swarms Academy",
    title: "Free multi-agent AI courses",
    description: "Learn the full Swarms stack with live API trials and quizzes, from your first agent to production.",
    alt: "Swarms Academy: free multi-agent AI courses",
  },
  "/academy/swarms-api": {
    eyebrow: "Swarms Academy",
    title: "The Swarms API Course",
    description: "A free four-part course: 31 lessons, 12 live API trials, and graded quizzes.",
    alt: "The Swarms API Course: a free four-part multi-agent course from Swarms Academy",
  },
  "/agenthq": {
    eyebrow: "AgentHQ · Waitlist",
    title: "Your headquarters of AI agents",
    description: "Hire agents, assign research, and grow your operation.",
    alt: "AgentHQ by Swarms: join the waitlist",
  },
  "/api": {
    eyebrow: "Swarms API",
    title: "Hosted multi-agent orchestration",
    description: "1,000+ models and 15+ swarm architectures behind one endpoint.",
    alt: "Swarms API: hosted multi-agent orchestration",
  },
  "/applications": {
    eyebrow: "Applications",
    title: "Multi-agent systems across industries",
    description: "How teams use Swarms multi-agent systems to automate work across their industry.",
    alt: "Swarms industry applications",
  },
  "/blog": {
    eyebrow: "Blog",
    title: "Swarms Blog",
    description: "Engineering notes, product updates, and guides for multi-agent AI.",
    alt: "Swarms Blog",
  },
  "/contact-sales": {
    eyebrow: "Contact sales",
    title: "Deploy multi-agent AI at scale",
    description: "Swarms Cloud, the Swarms API, RouteHub, and enterprise options for your organization.",
    alt: "Contact the Swarms sales team",
  },
  "/data-policy": {
    eyebrow: "Legal",
    title: "Data Policy",
    description: "How Swarms uses completions to improve our models, and your choices.",
    alt: "Swarms Data Policy",
  },
  "/framework": {
    eyebrow: "Swarms Framework",
    title: "The Python framework for multi-agent systems",
    description: "15+ swarm architectures, 1,000+ models, MCP support, and telemetry in one package.",
    alt: "Swarms Framework: the Python framework for multi-agent systems",
  },
  "/hiring": {
    eyebrow: "Careers",
    title: "Join Swarms",
    description: "Help us build the infrastructure for the agent economy. San Francisco, Palo Alto, and New York.",
    alt: "Careers at The Swarms Corporation",
  },
  "/installation": {
    eyebrow: "Installation",
    title: "Install the Swarms framework",
    description: "pip, uv, conda, or from source. Start building multi-agent systems in minutes.",
    alt: "Install the Swarms framework",
  },
  "/mobile": {
    eyebrow: "Swarms Mobile · Waitlist",
    title: "Multi-agent AI from your phone",
    description: "Build, monitor, and orchestrate multi-agent systems on the go.",
    alt: "Swarms Mobile app: join the waitlist",
  },
  "/newsletter": {
    eyebrow: "Newsletter",
    title: "Swarms updates, tutorials, and livestreams",
    description: "Product releases and guides from the Swarms team, in your inbox.",
    alt: "The Swarms newsletter",
  },
  "/open-source": {
    eyebrow: "Open source",
    title: "Open source research",
    description: "Swarms repositories and contributions to AI research and development.",
    alt: "Swarms open source research",
  },
  "/pricing": {
    eyebrow: "Pricing",
    title: "Free, Pro, Premium, and Enterprise",
    description: "Start free with no card required. Pro at $19.99/month, Premium at $100/month.",
    alt: "Swarms pricing: Free, Pro, Premium, and Enterprise",
  },
  "/privacy": {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description: "How The Swarms Corporation collects, uses, protects, and shares information.",
    alt: "Swarms Privacy Policy",
  },
  "/products": {
    eyebrow: "Products",
    title: "The complete multi-agent stack",
    description: "Swarms Python, Swarms API, Swarms Marketplace, Swarms RS, Swarms Chat, and Enterprise.",
    alt: "Swarms products: the complete multi-agent stack",
  },
  "/programs": {
    eyebrow: "Research programs",
    title: "Swarms credits for multi-agent research",
    description: "Unlimited Swarms API credits and dedicated support for research teams.",
    alt: "Swarms research programs",
  },
  "/programs/startups": {
    eyebrow: "Startup program",
    title: "Up to $10,000 in credits for AI startups",
    description: "Platform credits, technical support, and go-to-market resources.",
    alt: "The Swarms startup program",
  },
  "/research": {
    eyebrow: "Research",
    title: "RouteHub and GraphWorkflow",
    description: "Technical reports on an SDK-native LLM gateway and a compile-once graph execution engine.",
    alt: "Swarms research: RouteHub and GraphWorkflow papers",
  },
  "/research-papers": {
    eyebrow: "Research papers",
    title: "Published work on multi-agent systems",
    description: "Orchestration protocols, dynamic memory allocation, and large-scale agentic simulation.",
    alt: "Swarms research papers",
  },
  "/routehub": {
    eyebrow: "RouteHub",
    title: "The fast open-source LLM gateway",
    description: "One completion() for OpenAI, Anthropic, Gemini, and 20+ providers.",
    alt: "RouteHub: a fast open-source LLM gateway and LiteLLM alternative",
  },
  "/simulations": {
    eyebrow: "Simulations",
    title: "Organizations of thousands of agents",
    description: "Large-scale multi-agent simulation of hospitals, enterprises, and governments.",
    alt: "Swarms simulations: large-scale multi-agent organization simulation",
  },
  "/sitemap": {
    eyebrow: "Sitemap",
    title: "Every page on swarms.ai",
    description: "Products, docs, academy, research, blog posts, careers, and programs.",
    alt: "Sitemap of swarms.ai",
  },
  "/swarms-rs": {
    eyebrow: "Swarms Rust",
    title: "The multi-agent framework for Rust",
    description: "6 ms cold starts, 3.7 MB of memory, any model by name, and MCP.",
    alt: "Swarms Rust (swarms-rs): the multi-agent framework for Rust",
  },
  "/terms": {
    eyebrow: "Legal",
    title: "Terms of Service",
    description: "The terms that govern your use of the Swarms platform and services.",
    alt: "Swarms Terms of Service",
  },
  "/zh": {
    eyebrow: "多智能体 AI",
    title: "构建、部署和扩展 AI 智能体的企业级平台",
    description: "Python/Rust 多智能体框架、托管智能体 API 与智能体市场。",
    alt: "Swarms：构建、部署和扩展 AI 智能体的企业级平台",
    locale: "zh",
  },
  "/zh/blog": {
    eyebrow: "博客",
    title: "Swarms 博客",
    description: "多智能体系统工程笔记、产品更新与实战指南。",
    alt: "Swarms 博客",
    locale: "zh",
  },
  "/zh/framework": {
    eyebrow: "Swarms 框架",
    title: "企业级 Python 多智能体框架",
    description: "15+ 种智能体编排架构，支持 1,000+ 种大模型与原生 MCP。",
    alt: "Swarms 框架：企业级 Python 多智能体框架",
    locale: "zh",
  },
  "/zh/installation": {
    eyebrow: "安装指南",
    title: "安装 Swarms 多智能体框架",
    description: "通过 pip、uv、conda 或源码安装 Python 版本，并支持 Rust 版本。",
    alt: "安装 Swarms 多智能体框架",
    locale: "zh",
  },
  "/zh/pricing": {
    eyebrow: "价格方案",
    title: "从免费版到企业版",
    description: "免费版无需信用卡即可开始，专业版每月 $19.99，高级版每月 $100。",
    alt: "Swarms 价格方案",
    locale: "zh",
  },
} satisfies Record<string, OgPage>

export type OgPagePath = keyof typeof ogPages

export function renderPageCard(path: OgPagePath, extra?: Pick<OgCard, "art" | "footer">) {
  return renderOgCard({ ...ogPages[path], ...extra })
}
