"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, CheckCircle } from "lucide-react"

type ProductBadge = { text: string; variant?: "default" | "secondary" | "destructive" | "outline" }

type Product = {
  id: string
  label: string
  title: string
  description: string
  docsUrl: string
  getStartedUrl: string
  badges?: ProductBadge[]
  installation?: { command: string; language: string }
  codeExample?: { code: string; language: string }
}

const products: Product[] = [
  // Developer tools first
  {
    id: "swarms-python",
    label: "",
    title: "Swarms Python",
    description:
      "The flagship enterprise-grade production-ready multi-agent orchestration framework in Python. Build complex agent systems with sequential workflows, parallel processing, and mixture architectures.",
    docsUrl: "https://docs.swarms.world",
    getStartedUrl: "https://github.com/kyegomez/swarms",
    badges: [
      { text: "Python", variant: "secondary" },
      { text: "Production-Ready", variant: "outline" },
    ],
    installation: { command: "pip install -U swarms swarms-memory", language: "bash" },
    codeExample: {
      language: "python",
      code: `import os
from dotenv import load_dotenv
from swarm_models import OpenAIChat
from swarms import Agent, GroupChat, expertise_based


if __name__ == "__main__":

    load_dotenv()

    # Get the OpenAI API key from the environment variable
    api_key = os.getenv("OPENAI_API_KEY")

    # Create an instance of the OpenAIChat class
    model = OpenAIChat(
        openai_api_key=api_key,
        model_name="gpt-4o-mini",
        temperature=0.1,
    )

    # Example agents
    agent1 = Agent(
        agent_name="Financial-Analysis-Agent",
        system_prompt="You are a financial analyst specializing in investment strategies.",
        llm=model,
        max_loops=1,
        autosave=False,
        dashboard=False,
        verbose=True,
        dynamic_temperature_enabled=True,
        user_name="swarms_corp",
        retry_attempts=1,
        context_length=200000,
        output_type="string",
        streaming_on=False,
    )

    agent2 = Agent(
        agent_name="Tax-Adviser-Agent",
        system_prompt="You are a tax adviser who provides clear and concise guidance on tax-related queries.",
        llm=model,
        max_loops=1,
        autosave=False,
        dashboard=False,
        verbose=True,
        dynamic_temperature_enabled=True,
        user_name="swarms_corp",
        retry_attempts=1,
        context_length=200000,
        output_type="string",
        streaming_on=False,
    )

    agents = [agent1, agent2]

    chat = GroupChat(
        name="Investment Advisory",
        description="Financial and tax analysis group",
        agents=agents,
        speaker_fn=expertise_based,
    )

    history = chat.run(
        "How to optimize tax strategy for investments?"
    )
    print(history.model_dump_json(indent=2))`,
    },
  },
  {
    id: "swarms-rust",
    label: "",
    title: "Swarms Rust",
    description:
      "A high-performance implementation of the Swarms framework in Rust, designed for maximum efficiency and safety. Perfect for systems requiring blazing-fast performance and minimal resource usage.",
    docsUrl: "https://docs.rs/swarm-rs/0.1.4/swarm_rs/",
    getStartedUrl: "https://github.com/The-Swarm-Corporation/swarms-rs",
    badges: [],
    installation: { command: "cargo add swarm-rs", language: "bash" },
    codeExample: {
      language: "rust",
      code: `use std::env;

use anyhow::Result;
use swarms_rs::llm::provider::openai::OpenAI;
use swarms_rs::structs::concurrent_workflow::ConcurrentWorkflow;

#[tokio::main]
async fn main() -> Result<()> {
    dotenv::dotenv().ok();

    let subscriber = tracing_subscriber::fmt::Subscriber::builder()
        .with_env_filter(tracing_subscriber::EnvFilter::from_default_env())
        .with_line_number(true)
        .with_file(true)
        .finish();
    tracing::subscriber::set_global_default(subscriber)?;

    let base_url = env::var("DEEPSEEK_BASE_URL").unwrap();
    let api_key = env::var("DEEPSEEK_API_KEY").unwrap();
    let client = OpenAI::from_url(base_url, api_key).set_model("deepseek-chat");

    let agent_1 = client
        .agent_builder()
        .agent_name("Agent 1")
        .system_prompt("You are Agent 1, responsible for planning.")
        .user_name("M4n5ter")
        .max_loops(1)
        .temperature(0.3)
        .enable_autosave()
        .save_state_dir("./temp")
        .add_stop_word("<DONE>")
        .build();

    let agent_2 = client
        .agent_builder()
        .agent_name("Agent 2")
        .system_prompt("You are Agent 2, responsible for solving the problem.")
        .user_name("M4n5ter")
        .max_loops(1)
        .temperature(0.3)
        .enable_autosave()
        .save_state_dir("./temp")
        .add_stop_word("<DONE>")
        .build();

    let agents = vec![agent_1, agent_2]
        .into_iter()
        .map(|a| Box::new(a) as _)
        .collect::<Vec<_>>();

    let workflow = ConcurrentWorkflow::builder()
        .name("ConcurrentWorkflow")
        .metadata_output_dir("./temp/concurrent_workflow/metadata")
        .description("A Workflow to solve a problem with two agents.")
        .agents(agents)
        .build();

    let result = workflow.run("How to learn Rust?").await?;

    println!("{}", serde_json::to_string_pretty(&result)?);
    Ok(())
}`,
    },
  },
  {
    id: "swarms-api",
    label: "",
    title: "Swarms API",
    description:
      "Enterprise-grade Agent Swarm Management API for deploying and orchestrating sophisticated AI agent workflows in the cloud without managing infrastructure.",
    docsUrl: "https://docs.swarms.ai",
    getStartedUrl: "https://swarms.world/platform/api-keys",
    badges: [
      { text: "Cloud", variant: "secondary" },
      { text: "Enterprise", variant: "outline" },
    ],
    codeExample: {
      language: "python",
      code: `import requests

API_KEY = "your-api-key"
BASE_URL = "https://api.swarms.world"

headers = {"x-api-key": API_KEY, "Content-Type": "application/json"}

payload = {
  "name": "Financial Analysis Swarm",
  "agents": [
      {
          "agent_name": "Market Analyst",
          "description": "Analyzes market trends",
          "system_prompt": "You are a financial analyst expert.",
          "model_name": "gpt-4o",
          "role": "worker"
      },
      {
          "agent_name": "Economic Forecaster",
          "description": "Predicts economic trends",
          "system_prompt": "You are an expert in economic forecasting.",
          "model_name": "gpt-4o",
          "role": "worker"
      }
  ],
  "swarm_type": "HierarchicalSwarm",
  "task": "What are the best ETFs for AI and tech?"
}

response = requests.post(
  f"{BASE_URL}/v1/swarm/completions",
  headers=headers,
  json=payload
)

print(response.json())`,
    },
  },

  // Then the rest of the products
  {
    id: "swarms-chat",
    label: "",
    title: "Swarms Chat",
    description:
      "A no-code interface to interact with your swarm through natural language. Build, test, and deploy conversational agent systems without writing a single line of code.",
    docsUrl: "https://docs.swarms.world/en/latest/swarms_platform/chat/",
    getStartedUrl: "https://swarms.world/platform/chat",
    badges: [{ text: "No-Code", variant: "secondary" }],
  },
  {
    id: "swarms-enterprise",
    label: "",
    title: "Swarms Enterprise",
    description:
      "Custom deployment options with dedicated infrastructure, enhanced security features, and SLAs for enterprise customers with mission-critical requirements.",
    docsUrl: "https://docs.swarms.world/en/latest/swarms_cloud/enterprise/",
    getStartedUrl: "https://cal.com/swarms",
    badges: [
      { text: "Enterprise", variant: "secondary" },
      { text: "Custom Deployment", variant: "outline" },
    ],
  },
]

function CodeBlock({ code, language = "bash", id }: { code: string; language?: string; id: string }) {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, blockId: string) => {
    navigator.clipboard.writeText(text)
    setCopied(blockId)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <Card className="mt-4 border-white/10 bg-white/[0.02]">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-xs uppercase tracking-wide text-white/50 font-medium">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="text-xs text-white/60 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
          aria-label="Copy code"
        >
          {copied === id ? (
            <>
              <CheckCircle className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm text-white/80 font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </Card>
  )
}

function ProductBlock({ product, index }: { product: Product; index: number }) {
  const isEven = index % 2 === 0

  return (
    <>
      {/* Spotlight section */}
      <section className="relative min-h-screen flex items-center py-20 md:py-28 overflow-hidden bg-black border-t border-white/10">
        {/* Optional background image for Swarms Chat */}
        {product.id === "swarms-chat" && (
          <div className="absolute inset-0">
            <Image
              src="/chat_product.png"
              alt="Swarms Chat interface"
              fill
              priority
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        )}

        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at ${isEven ? "30%" : "70%"} 25%, rgba(63,63,70,0.35), transparent 60%)`,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <div className="container relative px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
          <motion.div
            className="max-w-3xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.4 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              {product.title}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed">{product.description}</p>

            {product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-1">
                {product.badges.map((badge, i) => (
                  <Badge
                    key={i}
                    variant={badge.variant || "default"}
                    className={
                      badge.variant === "outline"
                        ? "border-white/20 text-white/80 bg-white/[0.02]"
                        : badge.variant === "secondary"
                          ? "bg-white/[0.06] text-white/90 border-white/10"
                          : ""
                    }
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-medium rounded-xl h-12 px-6 transition-all duration-200 active:scale-[0.98]"
                asChild
              >
                <a href={product.getStartedUrl} target="_blank" rel="noopener noreferrer">
                  Get Started
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/25 font-medium rounded-xl h-12 px-6 transition-all duration-200 active:scale-[0.98]"
                asChild
              >
                <a href={product.docsUrl} target="_blank" rel="noopener noreferrer">
                  Documentation
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Technical details section (only if needed) */}
      {(product.installation || product.codeExample) && (
        <section className="relative py-16 md:py-24 bg-black border-t border-white/10">
          <div className="container relative px-4 sm:px-6 lg:px-8 w-full max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
              className="mb-8 text-center"
            >
              <h3 className="text-2xl sm:text-3xl font-semibold text-white">{product.title} in Code</h3>
              <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
                Install and start using {product.title} with a minimal setup.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {product.installation && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-white/80">Install</h4>
                  <CodeBlock
                    code={product.installation.command}
                    language={product.installation.language}
                    id={`${product.id}-install`}
                  />
                </div>
              )}

              {product.codeExample && (
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-white/80">Example</h4>
                  <CodeBlock
                    code={product.codeExample.code}
                    language={product.codeExample.language}
                    id={`${product.id}-example`}
                  />
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}
    </>
  )
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black smooth-scroll overflow-x-hidden">
      <Navigation />

      {/* Hero Section - Full Viewport */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(82,82,91,0.24), transparent 65%), radial-gradient(circle at 0% 100%, rgba(24,24,27,0.9), transparent 70%)",
          }}
          animate={{
            opacity: [0.3, 0.45, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <div className="container relative px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto text-center space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="mb-4 bg-white/[0.06] text-white/90 border-white/10 hover:bg-white/[0.09]">
                Enterprise Multi-Agent Stack
              </Badge>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.9]">
              Swarms Product Suite
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              Build, deploy, and scale autonomous AI agent swarms with a comprehensive stack of frameworks, interfaces, and cloud
              services.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 pt-4"
            >
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 font-medium rounded-xl h-12 px-8 transition-all duration-200 active:scale-[0.98]"
                asChild
              >
                <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
                  Get Started on GitHub
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/25 font-medium rounded-xl h-12 px-8 transition-all duration-200 active:scale-[0.98]"
                asChild
              >
                <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                  Read the Docs
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Sections: spotlight + details per product */}
      {products.map((product, index) => (
        <ProductBlock key={product.id} product={product} index={index} />
      ))}

      {/* Features Section */}
      <section className="relative py-20 md:py-32 bg-black border-t border-white/10">
        <div className="container px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mx-auto mb-4 bg-white/[0.06] text-white/90 border-white/10">
              Enterprise-Grade
            </Badge>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
              Enterprise-Grade Features
            </h2>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Swarms provides everything you need to build powerful multi-agent systems for production use.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                category: "🏢 Enterprise Architecture",
                features: [
                  "Production-Ready Infrastructure",
                  "High Reliability Systems",
                  "Modular Design",
                  "Comprehensive Logging",
                ],
                benefits: ["Reduced downtime", "Easier maintenance", "Better debugging", "Enhanced monitoring"],
              },
              {
                category: "🤖 Agent Orchestration",
                features: [
                  "Hierarchical Swarms",
                  "Parallel Processing",
                  "Sequential Workflows",
                  "Graph-based Workflows",
                  "Dynamic Agent Rearrangement",
                ],
                benefits: ["Complex task handling", "Improved performance", "Flexible workflows", "Optimized execution"],
              },
              {
                category: "🔄 Integration Capabilities",
                features: ["Multi-Model Support", "Custom Agent Creation", "Extensive Tool Library", "Multiple Memory Systems"],
                benefits: [
                  "Provider flexibility",
                  "Custom solutions",
                  "Extended functionality",
                  "Enhanced memory management",
                ],
              },
              {
                category: "📈 Scalability",
                features: ["Concurrent Processing", "Resource Management", "Load Balancing", "Horizontal Scaling"],
                benefits: ["Higher throughput", "Efficient resource use", "Better performance", "Easy scaling"],
              },
              {
                category: "🛠️ Developer Tools",
                features: ["Simple API", "Extensive Documentation", "Active Community", "CLI Tools"],
                benefits: ["Faster development", "Easy learning curve", "Community support", "Quick deployment"],
              },
              {
                category: "🔐 Security Features",
                features: ["Error Handling", "Rate Limiting", "Monitoring Integration", "Audit Logging"],
                benefits: ["Improved reliability", "API protection", "Better monitoring", "Enhanced tracking"],
              },
              {
                category: "📊 Advanced Features",
                features: ["SpreadsheetSwarm", "Group Chat", "Agent Registry", "Mixture of Agents"],
                benefits: ["Mass agent management", "Collaborative AI", "Centralized control", "Complex solutions"],
              },
              {
                category: "🔌 Provider Support",
                features: ["OpenAI", "Anthropic", "ChromaDB", "Custom Providers"],
                benefits: ["Provider flexibility", "Storage options", "Custom integration", "Vendor independence"],
              },
              {
                category: "💪 Production Features",
                features: ["Automatic Retries", "Async Support", "Environment Management", "Type Safety"],
                benefits: ["Better reliability", "Improved performance", "Easy configuration", "Safer code"],
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <Card className="apple-card-hover border-white/10 bg-white/[0.02] h-full">
                  <CardHeader className="p-6">
                    <CardTitle className="text-xl font-semibold text-white mb-4">{item.category}</CardTitle>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-xs uppercase tracking-wide text-white/50 mb-2">Features</h4>
                        <ul className="text-sm text-white/70 space-y-1.5">
                          {item.features.map((feature, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/40 mr-2 mt-1.5 shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-xs uppercase tracking-wide text-white/50 mb-2">Benefits</h4>
                        <ul className="text-sm text-white/70 space-y-1.5">
                          {item.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start">
                              <span className="w-1.5 h-1.5 rounded-full bg-white/30 mr-2 mt-1.5 shrink-0" />
                              <span>{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black border-t border-white/10">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(circle at 50% 50%, rgba(63,63,70,0.35), transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.4 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        />

        <div className="container relative px-4 sm:px-6 lg:px-8 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="apple-card-hover border-white/10 bg-white/[0.02]">
              <CardHeader className="p-12 md:p-16 text-center">
                <div className="space-y-8">
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight">
                    Get Started Today
                  </h2>
                  <CardDescription className="text-xl sm:text-2xl md:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                    Sign up now and get $5 in free API credits. Join the marketplace and start building with Swarms.
                  </CardDescription>
                  <div className="flex flex-wrap justify-center gap-4 pt-6">
                    <Button
                      size="lg"
                      className="bg-white text-black hover:bg-white/90 font-medium rounded-xl h-14 px-10 text-base transition-all duration-200 active:scale-[0.98]"
                      asChild
                    >
                      <a href="https://swarms.world/signin" target="_blank" rel="noopener noreferrer">
                        Sign Up Now
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/15 bg-white/[0.02] text-white hover:bg-white/[0.06] hover:border-white/25 font-medium rounded-xl h-14 px-10 text-base transition-all duration-200 active:scale-[0.98]"
                      asChild
                    >
                      <a href="https://swarms.world" target="_blank" rel="noopener noreferrer">
                        Join Marketplace
                      </a>
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
