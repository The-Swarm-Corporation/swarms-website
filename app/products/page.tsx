"use client"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { CardWrapper } from "@/components/card-wrapper"
import { AnimatedBackground } from "@/components/animated-background"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Code,
  Cpu,
  Database,
  FileCode,
  Github,
  Globe,
  Grid3X3,
  MessageSquare,
  Package,
  Server,
  Shield,
  Terminal,
  Zap,
  BookOpen,
  Rocket,
  Copy,
  CheckCircle,
  ExternalLink,
  Twitter,
} from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function ProductsPage() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const CodeBlock = ({ code, language = "bash", id }: { code: string; language?: string; id: string }) => (
    <div className="relative mt-4 rounded-lg bg-black/80 border border-red-500/20 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-red-950/20 border-b border-red-500/20">
        <span className="text-xs text-red-400">{language}</span>
        <button
          onClick={() => copyToClipboard(code, id)}
          className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
          aria-label="Copy code"
        >
          {copied === id ? (
            <>
              <CheckCircle className="h-3 w-3" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-red-300">
        <code>{code}</code>
      </pre>
    </div>
  )

  const ProductCard = ({
    icon: Icon,
    title,
    description,
    docsUrl,
    getStartedUrl,
    badges = [],
    delay = 0,
  }: {
    icon: any
    title: string
    description: string
    docsUrl: string
    getStartedUrl: string
    badges?: { text: string; variant?: "default" | "secondary" | "destructive" | "outline" }[]
    delay?: number
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <CardWrapper className="h-full p-6 hover:border-red-500/50 transition-all duration-300">
        <div className="flex flex-col h-full">
          <div className="flex items-start gap-4 mb-4">
            <div className="relative">
              <div className="p-2 rounded-md bg-red-500/10 border border-red-500/20">
                <Icon className="h-6 w-6 text-red-500" />
              </div>
              <div className="absolute -inset-1 bg-red-500/10 blur-md rounded-md -z-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {badges.map((badge, i) => (
                  <Badge
                    key={i}
                    variant={badge.variant || "default"}
                    className={
                      badge.variant === "outline"
                        ? "border-red-500/50 text-red-400"
                        : badge.variant === "secondary"
                          ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                          : ""
                    }
                  >
                    {badge.text}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
          <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
          <div className="flex flex-wrap gap-3 mt-auto">
            <a
              href={docsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative", zIndex: 10 }}
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 h-10 px-4 py-2"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Documentation
            </a>
            <a
              href={getStartedUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative", zIndex: 10 }}
              className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white h-10 px-4 py-2"
            >
              <Rocket className="mr-2 h-4 w-4" />
              Get Started
            </a>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  )

  const tickerAnnouncements = [
    "Swarms: The Enterprise-Grade Multi-Agent Orchestration Framework",
    "Build, deploy, and scale autonomous AI agent swarms",
    "Now available in Python and Rust",
    "Explore our no-code interfaces and cloud API",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollingTicker
        announcements={tickerAnnouncements}
        className="py-2 bg-black/30 border-y border-red-600/20 backdrop-blur-sm"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <AnimatedBackground particleColor="rgba(239, 68, 68, 0.5)" className="opacity-40" />
        <div className="absolute inset-0 circuit-pattern opacity-20" aria-hidden="true" />
        <div className="absolute inset-0 cyber-gradient" aria-hidden="true" />

        <div className="container relative px-4 sm:px-6 py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-red-500/20 text-red-400 hover:bg-red-500/30">Enterprise-Grade</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">Swarms Product Suite</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Build, deploy, and scale autonomous AI agent swarms with unprecedented control and efficiency using our
              comprehensive suite of tools and frameworks.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white h-12 px-6 py-3"
              >
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
              <a
                href="https://docs.swarms.world"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-600 text-red-600 hover:bg-red-600/10 h-12 px-6 py-3"
              >
                <BookOpen className="mr-2 h-5 w-5" />
                Documentation
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Product Categories */}
      <div className="container px-4 sm:px-6 py-16">
        <Tabs defaultValue="frameworks" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-2xl bg-background/30 backdrop-blur-sm border border-red-500/20 p-1 rounded-lg">
              <TabsTrigger
                value="frameworks"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Code className="mr-2 h-4 w-4" />
                Frameworks
              </TabsTrigger>
              <TabsTrigger
                value="interfaces"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Grid3X3 className="mr-2 h-4 w-4" />
                Interfaces
              </TabsTrigger>
              <TabsTrigger
                value="cloud"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Server className="mr-2 h-4 w-4" />
                Cloud Services
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Frameworks Tab */}
          <TabsContent value="frameworks" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Development Frameworks</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Build powerful multi-agent systems with our enterprise-grade frameworks available in multiple
                  languages.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                <ProductCard
                  icon={FileCode}
                  title="Swarms Python"
                  description="The flagship enterprise-grade production-ready multi-agent orchestration framework in Python. Build complex agent systems with sequential workflows, parallel processing, and mixture architectures."
                  docsUrl="https://docs.swarms.world"
                  getStartedUrl="https://github.com/kyegomez/swarms"
                  badges={[
                    { text: "Python", variant: "secondary" },
                    { text: "Production-Ready", variant: "outline" },
                  ]}
                  delay={0}
                />

                <ProductCard
                  icon={Cpu}
                  title="Swarms Rust"
                  description="A high-performance implementation of the Swarms framework in Rust, designed for maximum efficiency and safety. Perfect for systems requiring blazing-fast performance and minimal resource usage."
                  docsUrl="https://docs.rs/swarm-rs/0.1.4/swarm_rs/"
                  getStartedUrl="https://github.com/The-Swarm-Corporation/swarms-rs"
                  badges={[
                    { text: "Rust", variant: "secondary" },
                    { text: "High Performance", variant: "outline" },
                  ]}
                  delay={1}
                />
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Quick Installation</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <FileCode className="mr-2 h-5 w-5 text-red-500" />
                      Python Installation
                    </h4>
                    <CodeBlock code="pip install -U swarms swarms-memory" language="bash" id="python-install" />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Cpu className="mr-2 h-5 w-5 text-red-500" />
                      Rust Installation
                    </h4>
                    <CodeBlock code="cargo add swarm-rs" language="bash" id="rust-install" />
                  </div>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">Example Usage</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <FileCode className="mr-2 h-5 w-5 text-red-500" />
                      Python Example
                    </h4>
                    <CodeBlock
                      code={`import os
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
    print(history.model_dump_json(indent=2))`}
                      language="python"
                      id="python-example"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Cpu className="mr-2 h-5 w-5 text-red-500" />
                      Rust Example
                    </h4>
                    <CodeBlock
                      code={`use std::env;

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
}`}
                      language="rust"
                      id="rust-example"
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Interfaces Tab */}
          <TabsContent value="interfaces" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">No-Code Interfaces</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Powerful visual interfaces for building and deploying agent swarms without writing code.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-3">
                <ProductCard
                  icon={MessageSquare}
                  title="Swarms Chat"
                  description="A no-code interface to interact with your swarm through natural language. Build, test, and deploy conversational agent systems without writing a single line of code."
                  docsUrl="https://docs.swarms.world/en/latest/swarms_platform/chat/"
                  getStartedUrl="https://swarms.world/platform/chat"
                  badges={[{ text: "No-Code", variant: "secondary" }]}
                  delay={0}
                />

                <ProductCard
                  icon={Grid3X3}
                  title="Swarms Drag n Drop"
                  description="Visual interface for designing complex agent workflows through an intuitive drag-and-drop experience. Connect agents, define workflows, and deploy with just a few clicks."
                  docsUrl="https://docs.swarms.world/en/latest/swarms_platform/dragndrop/"
                  getStartedUrl="https://swarms.world/platform/dragndrop"
                  badges={[{ text: "Visual Builder", variant: "secondary" }]}
                  delay={1}
                />

                <ProductCard
                  icon={Database}
                  title="Swarms Spreadsheet"
                  description="Massive concurrent swarm execution through a familiar spreadsheet interface. Process thousands of tasks in parallel with the power of multi-agent systems."
                  docsUrl="https://docs.swarms.world/en/latest/swarms_platform/spreadsheet/"
                  getStartedUrl="https://swarms.world/platform/spreadsheet"
                  badges={[{ text: "Mass Execution", variant: "secondary" }]}
                  delay={2}
                />
              </div>

              <div className="mt-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <CardWrapper className="p-8 border-red-500/30">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Swarms Marketplace</h3>
                        <p className="text-muted-foreground mb-6">
                          Discover and share agents, prompts, workflows, and more in the Swarms ecosystem. Find
                          pre-built solutions or share your creations with the community.
                        </p>
                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start">
                            <span className="mr-2 mt-1">
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            </span>
                            <span>Ready-to-use agent templates</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 mt-1">
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            </span>
                            <span>Community-contributed workflows</span>
                          </li>
                          <li className="flex items-start">
                            <span className="mr-2 mt-1">
                              <CheckCircle className="h-5 w-5 text-red-500" />
                            </span>
                            <span>Optimized prompts for specific use cases</span>
                          </li>
                        </ul>
                        <a
                          href="https://swarms.world"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ position: "relative", zIndex: 10 }}
                          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white h-10 px-4 py-2"
                        >
                          <Globe className="mr-2 h-4 w-4" />
                          Explore Marketplace
                        </a>
                      </div>
                    </div>
                  </CardWrapper>
                </motion.div>
              </div>
            </div>
          </TabsContent>

          {/* Cloud Services Tab */}
          <TabsContent value="cloud" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Cloud Services</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Deploy and manage AI agent swarms at scale with our enterprise-ready cloud infrastructure.
                </p>
              </motion.div>

              <div className="grid gap-6 md:grid-cols-2">
                <ProductCard
                  icon={Server}
                  title="Swarms API"
                  description="Enterprise-grade Agent Swarm Management API for deploying and orchestrating sophisticated AI agent workflows in the cloud without managing infrastructure."
                  docsUrl="https://docs.swarms.ai"
                  getStartedUrl="https://swarms.world/platform/api-keys"
                  badges={[
                    { text: "Cloud", variant: "secondary" },
                    { text: "Enterprise", variant: "outline" },
                  ]}
                  delay={0}
                />

                <ProductCard
                  icon={Shield}
                  title="Swarms Enterprise"
                  description="Custom deployment options with dedicated infrastructure, enhanced security features, and SLAs for enterprise customers with mission-critical requirements."
                  docsUrl="https://docs.swarms.world/en/latest/swarms_cloud/enterprise/"
                  getStartedUrl="https://cal.com/swarms"
                  badges={[
                    { text: "Enterprise", variant: "secondary" },
                    { text: "Custom Deployment", variant: "outline" },
                  ]}
                  delay={1}
                />
              </div>

              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-6">API Example</h3>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Terminal className="mr-2 h-5 w-5 text-red-500" />
                      Python API Client
                    </h4>
                    <CodeBlock
                      code={`import requests

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

print(response.json())`}
                      language="python"
                      id="api-example"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-medium mb-2 flex items-center">
                      <Package className="mr-2 h-5 w-5 text-red-500" />
                      API Features
                    </h4>
                    <CardWrapper className="p-6 h-full">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">
                            <Zap className="h-5 w-5 text-red-500" />
                          </span>
                          <span>High-performance infrastructure with automatic scaling</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">
                            <Shield className="h-5 w-5 text-red-500" />
                          </span>
                          <span>Enterprise-grade security with SOC 2 compliance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">
                            <Server className="h-5 w-5 text-red-500" />
                          </span>
                          <span>Managed infrastructure with high availability</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">
                            <Globe className="h-5 w-5 text-red-500" />
                          </span>
                          <span>Global deployment options for low-latency access</span>
                        </li>
                        <li className="flex items-start">
                          <span className="mr-2 mt-1">
                            <Database className="h-5 w-5 text-red-500" />
                          </span>
                          <span>Persistent storage for agent state and memory</span>
                        </li>
                      </ul>
                      <div className="mt-6">
                        <a
                          href="https://docs.swarms.ai"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ position: "relative", zIndex: 10 }}
                          className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-500/50 text-red-400 hover:bg-red-500/10 h-10 px-4 py-2"
                        >
                          <ExternalLink className="mr-2 h-4 w-4" />
                          API Documentation
                        </a>
                      </div>
                    </CardWrapper>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Features Section */}
      <div className="container px-4 sm:px-6 py-16 border-t border-red-500/20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Enterprise-Grade Features</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
              features: [
                "Multi-Model Support",
                "Custom Agent Creation",
                "Extensive Tool Library",
                "Multiple Memory Systems",
              ],
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
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <CardWrapper className="p-6 h-full hover:border-red-500/50 transition-all duration-300">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">{item.category}</h3>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Features</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {item.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Benefits</h4>
                    <ul className="text-sm text-muted-foreground space-y-2">
                      {item.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500/50 mr-2 mt-1.5 shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardWrapper>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <CardWrapper className="p-8 md:p-12 border-red-500/30">
            <div className="relative">
              {/* Glowing orb effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <div className="w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[100px]" />
              </div>

              <div className="relative max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-6">
                  Ready to Build the Future of AI?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Start building with Swarms today and join the revolution in enterprise AI orchestration.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a
                    href="https://docs.swarms.world/en/latest/swarms/install/install/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: "relative", zIndex: 10 }}
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 text-white h-12 px-6 py-3"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Get Started
                  </a>
                  <a
                    href="https://discord.gg/EamjgSaEQf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ position: "relative", zIndex: 10 }}
                    className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-red-600 text-red-600 hover:bg-red-600/10 h-12 px-6 py-3"
                  >
                    <Discord className="mr-2 h-5 w-5" />
                    Join Community
                  </a>
                </div>
              </div>
            </div>
          </CardWrapper>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="border-t border-red-500/20 py-8">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="https://raw.githubusercontent.com/kyegomez/swarms/1899c807eb3874e095b677fbd6b9c877e7746918/swarms_logo_svg.svg"
                    alt="Swarms Logo"
                    width={32}
                    height={32}
                  />
                </div>
                <span className="font-bold text-lg">Swarms AI</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/swarms_corp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9 p-0"
              >
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Swarms AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
