"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion, useScroll, useTransform } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"

const swarmsStack = [
  {
    title: "Swarms-RS",
    subtitle: "The First Multi-Agent Framework in Rust",
    description: "Ultra-fast, memory-safe, and production-ready multi-agent framework built in Rust for maximum performance and reliability.",
    link: "https://crates.io/crates/swarms-rs",
    docsLink: "https://docs.swarms.world",
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
    Ok(())
}`,
  },
  {
    title: "Swarms Python",
    subtitle: "Core Swarms Python Framework",
    description: "The original Swarms framework in Python with full backwards compatibility with LangChain, AutoGen, and other popular frameworks.",
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
final_post = workflow.run("AI history")`,
  },
  {
    title: "Swarms API",
    subtitle: "Ultra-Optimized Agent Execution Runtime",
    description: "Enterprise-grade hosted API with ultra-optimized runtime for deploying and scaling your agent swarms in production.",
    link: "https://docs.swarms.ai",
    docsLink: "https://docs.swarms.ai",
    code: `import requests

payload = {
    "agent_config": {
        "agent_name": "Research Analyst",
        "description": "Expert in analyzing and synthesizing research data",
        "system_prompt": "You are a Research Analyst with expertise in data analysis and synthesis.",
        "model_name": "gpt-4o-mini",
        "max_tokens": 8192,
        "temperature": 0.7
    },
    "task": "Analyze the impact of artificial intelligence on healthcare"
}

response = requests.post(
    "https://api.swarms.world/v1/agent/completions",
    headers={"x-api-key": "your-api-key"},
    json=payload
)`,
  },
  {
    title: "Swarms Marketplace",
    subtitle: "Buy & Sell Agents, Prompts & More",
    description: "Discover, buy, and sell agents, prompts, tools, and components on swarms.world - the premier marketplace for AI agents.",
    link: "https://swarms.world",
    docsLink: "https://swarms.world",
    image: "/marketplace_banner.png",
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Custom easing for smooth motion
    },
  },
}

export function HomeProducts() {
  return (
    <>
      {/* Products Section Header */}
      <div className="container py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-4 md:px-6 relative max-w-full overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center space-y-3 sm:space-y-4 md:space-y-6 px-2 sm:px-0"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            Products
          </motion.h2>
          <motion.p 
            className="text-base sm:text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-normal px-2 sm:px-0"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.6,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            We provide a range of frameworks, interfaces, and cloud services to help you build your own multi-agent systems.
          </motion.p>
        </motion.div>
      </div>

      {/* Product Cards with Scroll Snap */}
      {swarmsStack.map((product, index) => {
        const isEven = index % 2 === 0
        return (
          <ProductSection 
            key={index} 
            product={product} 
            index={index} 
            isEven={isEven}
          />
        )
      })}
    </>
  )
}

function ProductSection({ product, index, isEven }: { product: typeof swarmsStack[0], index: number, isEven: boolean }) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [30, -30])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.3, 1, 1, 0.3])

  return (
    <motion.div 
      ref={sectionRef}
      className="relative min-h-[80vh] sm:min-h-screen flex items-center py-8 sm:py-12 md:py-16 lg:py-24 xl:py-32 bg-black overflow-hidden scroll-optimized"
      style={{ opacity }}
    >
      {/* Subtle background gradient */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${isEven ? '20%' : '80%'} 50%, rgba(239, 68, 68, 0.1) 0%, transparent 50%)`,
          y,
        }}
      />

      <div className="container px-2 sm:px-4 md:px-6 relative z-10 w-full max-w-full overflow-hidden">
        <motion.div 
          className="grid lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Content Section */}
          <motion.div
            variants={itemVariants}
            className={`space-y-4 sm:space-y-6 md:space-y-8 ${isEven ? 'lg:order-1' : 'lg:order-2'} w-full max-w-full overflow-visible`}
          >
            <motion.div
              variants={itemVariants}
              className="space-y-3 sm:space-y-4"
            >
              <motion.h3 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-tight break-words"
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                {product.title}
              </motion.h3>
              <motion.p 
                className="text-sm sm:text-base md:text-lg lg:text-xl text-white/60 font-medium break-words"
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
              >
                {product.subtitle}
              </motion.p>
            </motion.div>

            <motion.p 
              className="text-sm sm:text-base md:text-lg text-white/60 leading-relaxed max-w-2xl break-words"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              {product.description}
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-2 sm:pt-4 w-full p-2 sm:p-3 md:p-4 -m-2 sm:-m-3 md:-m-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              viewport={{ once: true }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white hover:from-red-800 hover:via-red-700 hover:to-red-800 font-bold w-full sm:w-auto transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-900/50 group border-0 text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 flex-shrink-0" 
                asChild
              >
                <a href={product.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <span>Get Started</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-white/20 text-white hover:bg-white/10 hover:border-white/40 w-full sm:w-auto transition-all duration-300 hover:scale-105 group text-xs sm:text-sm md:text-base px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 flex-shrink-0" 
                asChild
              >
                <a href={product.docsLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                  <span>Documentation</span>
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 flex-shrink-0" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Code/Image Card Section */}
          <motion.div
            variants={itemVariants}
            className={`relative ${isEven ? 'lg:order-2' : 'lg:order-1'} mt-8 lg:mt-0 w-full max-w-full overflow-hidden`}
            initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            viewport={{ once: true }}
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ 
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {product.image ? (
                <div className="relative rounded-lg overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 w-full max-w-full">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover max-w-full"
                  />
                </div>
              ) : (
                <Card className="bg-white/[0.02] border border-white/10 backdrop-blur-sm hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/10 w-full max-w-full overflow-hidden">
                  <div className="p-3 sm:p-4 md:p-5 lg:p-6">
                    <div className="flex items-center space-x-2 mb-2 sm:mb-3 md:mb-4">
                      <motion.div 
                        className="w-2 h-2 bg-white/40 rounded-full flex-shrink-0"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: 0,
                        }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-white/40 rounded-full flex-shrink-0"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-white/40 rounded-full flex-shrink-0"
                        animate={{ opacity: [0.4, 1, 0.4] }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          delay: 0.6,
                        }}
                      />
                      <span className="text-white/40 text-xs ml-2 sm:ml-4 font-mono flex-shrink-0">code</span>
                    </div>
                    <div className="overflow-x-auto w-full -mx-3 sm:-mx-4 md:-mx-5 lg:-mx-6 px-3 sm:px-4 md:px-5 lg:px-6">
                      <motion.pre 
                        className="text-white/80 font-mono text-[10px] xs:text-xs sm:text-sm leading-relaxed whitespace-pre"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ 
                          duration: 0.6,
                          delay: 0.4,
                        }}
                        viewport={{ once: true }}
                      >
                        <code>{product.code}</code>
                      </motion.pre>
                    </div>
                  </div>
                </Card>
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

