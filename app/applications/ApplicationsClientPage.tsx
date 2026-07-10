"use client"

import { Navigation } from "@/components/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  BarChart3,
  Brain,
  Building,
  BarChartIcon as ChartBar,
  Coins,
  DollarSign,
  FileText,
  HeartPulse,
  LineChart,
  Network,
  Shield,
  TrendingUp,
  Users,
  Wallet,
  Microscope,
  Stethoscope,
  Pill,
  FileSearch,
  Landmark,
  Lock,
  BarChart,
  GitBranch,
  GitMerge,
  GitPullRequest,
  MessageSquare,
  MessagesSquare,
  Bot,
  Cpu,
  Globe,
  Github,
  Twitter,
  Factory,
  Truck,
  Package,
  Hammer,
  Cog,
  Settings,
  ShoppingBag,
  Store,
  CreditCard,
  Tag,
  Smartphone,
  ShoppingCart,
  Zap,
  Lightbulb,
  Wind,
  Sun,
  Leaf,
  GraduationCap,
  BookOpen,
  School,
  PenTool,
  Layers,
  Map,
  Navigation2,
  Box,
  Clock,
} from "lucide-react"
import { SiDiscord as Discord } from "react-icons/si"
import Link from "next/link"
import Image from "next/image"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

// Reusable card for a single use case within an industry tab.
function UseCaseCard({
  icon: Icon,
  title,
  description,
  benefits,
  delay = 0,
}: {
  icon: any
  title: string
  description: string
  benefits: string[]
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: delay * 0.08, ease }}
      className="h-full"
    >
      <div className="group flex h-full flex-col rounded-lg border border-white/[0.08] bg-black p-6 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8">
        <Icon
          className="mb-4 h-5 w-5 flex-shrink-0 text-white/50 transition-colors duration-300 group-hover:text-white sm:mb-5"
          strokeWidth={1.5}
        />
        <h3 className="mb-2 text-base font-semibold text-white sm:text-lg">{title}</h3>
        <p className="mb-6 flex-grow text-sm font-normal leading-relaxed text-white/50 sm:text-base">
          {description}
        </p>
        <div className="mt-auto border-t border-white/[0.08] pt-4">
          <h4 className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-white/40">
            Key Benefits
          </h4>
          <ul className="space-y-2">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-white/60 sm:text-sm">
                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-white/40" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

// Reusable eyebrow + heading + description block for each industry tab.
function TabIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
      className="mx-auto mb-10 max-w-2xl text-center sm:mb-14"
    >
      <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">{eyebrow}</p>
      <h2 className="text-2xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-3xl md:text-4xl">
        {title}
      </h2>
      <p className="mt-4 text-sm font-normal leading-relaxed text-white/50 sm:text-base">{description}</p>
    </motion.div>
  )
}

const industries = [
  { value: "finance", label: "Finance", icon: DollarSign },
  { value: "healthcare", label: "Healthcare", icon: HeartPulse },
  { value: "manufacturing", label: "Manufacturing", icon: Factory },
  { value: "retail", label: "Retail", icon: ShoppingBag },
  { value: "energy", label: "Energy", icon: Zap },
  { value: "education", label: "Education", icon: GraduationCap },
  { value: "logistics", label: "Logistics", icon: Truck },
  { value: "defi", label: "DeFi", icon: Coins },
  { value: "collaboration", label: "Multi-Agent", icon: Network },
]

export default function ApplicationsClientPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* Hero Section */}
        <section className="relative flex min-h-[70vh] items-center overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl"
          />

          <div className="container relative w-full px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-24">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Industry Solutions
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Transforming Industries with Multi-Agent AI
              </motion.h1>

              <motion.p
                className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Discover how Swarms AI&apos;s enterprise-grade multi-agent systems are revolutionizing industries with
                unprecedented intelligence, efficiency, and automation.
              </motion.p>

              <motion.div
                className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease }}
              >
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href="#industry-applications">
                    Explore Applications
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <Link href="/products">View Our Products</Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industry Applications */}
        <section id="industry-applications" className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              className="mx-auto mb-10 max-w-7xl sm:mb-14"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Explore by Industry
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Built for every industry.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Nine industries, one infrastructure layer. See how multi-agent systems apply to your domain.
              </p>
            </motion.div>

            <Tabs defaultValue="finance" className="mx-auto w-full max-w-7xl">
              <div className="scrollbar-thin -mx-4 mb-10 flex justify-start overflow-x-auto px-4 pb-2 sm:mx-0 sm:justify-center sm:px-0 sm:pb-0 md:mb-14">
                <TabsList className="flex h-auto flex-nowrap gap-1 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-1 sm:grid sm:min-w-full sm:max-w-5xl sm:grid-cols-9">
                  {industries.map((industry) => (
                    <TabsTrigger
                      key={industry.value}
                      value={industry.value}
                      className="flex-shrink-0 whitespace-nowrap rounded-md text-xs font-medium text-white/50 transition-colors duration-300 hover:text-white/80 data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-none sm:text-sm"
                    >
                      <industry.icon className="mr-1 h-3 w-3 flex-shrink-0 sm:mr-2 sm:h-4 sm:w-4" />
                      {industry.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Finance Tab */}
              <TabsContent value="finance" className="space-y-12">
                <TabIntro
                  eyebrow="Finance"
                  title="Finance & Investment Applications"
                  description="Leverage multi-agent systems to gain competitive advantages in financial markets with advanced analytics, risk management, and automated trading strategies."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={BarChart3}
                    title="Algorithmic Trading"
                    description="Multi-agent systems that analyze market data, identify patterns, and execute trades with microsecond precision while continuously adapting to changing market conditions."
                    benefits={[
                      "24/7 market monitoring across global exchanges",
                      "Microsecond execution with minimal slippage",
                      "Adaptive strategies that evolve with market conditions",
                      "Multi-factor analysis beyond human capabilities",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={TrendingUp}
                    title="Risk Assessment"
                    description="Comprehensive risk analysis through collaborative agent networks that evaluate market, credit, liquidity, and operational risks across diverse portfolios and market scenarios."
                    benefits={[
                      "Real-time portfolio stress testing",
                      "Multi-dimensional risk factor analysis",
                      "Predictive risk modeling with scenario generation",
                      "Regulatory compliance monitoring and reporting",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={ChartBar}
                    title="Market Sentiment Analysis"
                    description="Advanced sentiment analysis through specialized agent teams that process news, social media, earnings calls, and alternative data sources to gauge market sentiment and predict price movements."
                    benefits={[
                      "Real-time processing of unstructured data sources",
                      "Cross-referenced sentiment analysis across platforms",
                      "Early detection of market-moving events",
                      "Quantified sentiment metrics for trading signals",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={FileText}
                    title="Financial Research"
                    description="Collaborative agent systems that analyze company filings, earnings reports, macroeconomic data, and industry trends to generate comprehensive investment research and recommendations."
                    benefits={[
                      "Automated analysis of quarterly earnings reports",
                      "Cross-sector correlation identification",
                      "Anomaly detection in financial statements",
                      "Competitive landscape mapping and monitoring",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Building}
                    title="Portfolio Optimization"
                    description="Multi-agent optimization systems that continuously rebalance portfolios based on risk tolerance, market conditions, tax implications, and investment goals across asset classes."
                    benefits={[
                      "Dynamic asset allocation optimization",
                      "Tax-loss harvesting opportunities identification",
                      "Multi-objective optimization (risk/return/liquidity)",
                      "Custom constraint handling for institutional mandates",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Brain}
                    title="Alternative Data Processing"
                    description="Specialized agent networks that collect, clean, analyze, and derive insights from alternative data sources including satellite imagery, IoT sensors, web traffic, and consumer spending patterns."
                    benefits={[
                      "Automated data collection from diverse sources",
                      "Signal extraction from noisy alternative datasets",
                      "Cross-validation across multiple data streams",
                      "Early trend identification before market pricing",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Healthcare Tab */}
              <TabsContent value="healthcare" className="space-y-12">
                <TabIntro
                  eyebrow="Healthcare"
                  title="Healthcare Applications"
                  description="Transform patient care, medical research, and healthcare operations with collaborative multi-agent systems that enhance diagnosis, treatment planning, and operational efficiency."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={Microscope}
                    title="Medical Research"
                    description="Accelerate medical research with multi-agent systems that analyze scientific literature, clinical trial data, and genomic information to identify novel treatment approaches and research opportunities."
                    benefits={[
                      "Automated literature review and synthesis",
                      "Cross-disciplinary research connection identification",
                      "Hypothesis generation and validation",
                      "Research prioritization based on potential impact",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Stethoscope}
                    title="Diagnostic Assistance"
                    description="Enhance diagnostic accuracy through collaborative agent systems that analyze patient data, medical imaging, lab results, and clinical notes to provide comprehensive diagnostic recommendations."
                    benefits={[
                      "Multi-modal medical data integration",
                      "Rare disease identification through pattern matching",
                      "Diagnostic confidence scoring with explanation",
                      "Continuous learning from clinical outcomes",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Pill}
                    title="Treatment Planning"
                    description="Optimize treatment plans with specialized agent teams that consider patient history, genetic factors, medication interactions, and latest clinical guidelines to recommend personalized treatment options."
                    benefits={[
                      "Personalized treatment recommendation",
                      "Drug interaction and contraindication checking",
                      "Treatment efficacy prediction based on patient factors",
                      "Continuous monitoring and plan adjustment",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={FileSearch}
                    title="Clinical Trial Optimization"
                    description="Streamline clinical trials with multi-agent systems that optimize patient recruitment, monitor trial progress, analyze interim results, and identify potential issues before they impact study outcomes."
                    benefits={[
                      "Intelligent patient matching for trial eligibility",
                      "Real-time protocol compliance monitoring",
                      "Early signal detection for safety concerns",
                      "Adaptive trial design recommendations",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Users}
                    title="Patient Monitoring"
                    description="Enhance patient care with agent networks that continuously monitor patient vital signs, medication adherence, and recovery progress, alerting healthcare providers to potential issues requiring intervention."
                    benefits={[
                      "24/7 multi-parameter patient monitoring",
                      "Early deterioration detection and alerting",
                      "Personalized recovery milestone tracking",
                      "Remote patient monitoring integration",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={BarChart}
                    title="Healthcare Operations"
                    description="Optimize healthcare facility operations with collaborative agents that manage resource allocation, staff scheduling, inventory management, and patient flow to maximize efficiency and quality of care."
                    benefits={[
                      "Dynamic staff scheduling optimization",
                      "Predictive resource allocation based on demand",
                      "Supply chain and inventory management",
                      "Patient flow optimization to reduce wait times",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Manufacturing Tab */}
              <TabsContent value="manufacturing" className="space-y-12">
                <TabIntro
                  eyebrow="Manufacturing"
                  title="Manufacturing Applications"
                  description="Revolutionize manufacturing processes with intelligent multi-agent systems that optimize production, enhance quality control, and enable predictive maintenance for increased efficiency and reduced costs."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={Settings}
                    title="Predictive Maintenance"
                    description="Prevent equipment failures with multi-agent systems that monitor machine performance, analyze vibration patterns, temperature fluctuations, and operational data to predict maintenance needs before failures occur."
                    benefits={[
                      "85% reduction in unplanned downtime",
                      "30% extension of machine lifespan",
                      "Real-time anomaly detection across production lines",
                      "Optimized maintenance scheduling and resource allocation",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Cog}
                    title="Production Optimization"
                    description="Maximize throughput and efficiency with collaborative agent networks that analyze production parameters, identify bottlenecks, and dynamically adjust settings to optimize yield, quality, and energy usage."
                    benefits={[
                      "15-25% increase in production throughput",
                      "Adaptive process control with real-time adjustments",
                      "Multi-objective optimization across competing factors",
                      "Continuous process improvement through learning",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Package}
                    title="Quality Control"
                    description="Enhance product quality with specialized agent teams that analyze visual inspection data, sensor readings, and process parameters to detect defects, identify root causes, and recommend corrective actions."
                    benefits={[
                      "99.8% defect detection accuracy",
                      "70% reduction in quality-related returns",
                      "Real-time process adjustment to prevent defects",
                      "Root cause analysis and continuous improvement",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={Truck}
                    title="Supply Chain Integration"
                    description="Optimize inventory and logistics with multi-agent systems that coordinate across suppliers, production facilities, and distribution networks to ensure materials availability while minimizing inventory costs."
                    benefits={[
                      "40% reduction in inventory holding costs",
                      "Just-in-time material coordination",
                      "Dynamic production scheduling based on supply chain status",
                      "Early detection of potential supply disruptions",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Hammer}
                    title="Product Design Optimization"
                    description="Accelerate product development with collaborative agents that generate design alternatives, simulate performance, analyze manufacturability, and optimize designs for cost, performance, and sustainability."
                    benefits={[
                      "60% faster design iteration cycles",
                      "Generative design with manufacturability constraints",
                      "Multi-physics simulation and optimization",
                      "Material selection optimization for cost and performance",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Factory}
                    title="Digital Twin Orchestration"
                    description="Create comprehensive digital representations with agent networks that integrate IoT data, process models, and simulation capabilities to create dynamic digital twins for monitoring, analysis, and optimization."
                    benefits={[
                      "Real-time virtual representation of physical assets",
                      "Scenario testing without production disruption",
                      "Predictive analytics for process optimization",
                      "Cross-system integration and coordination",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Retail Tab */}
              <TabsContent value="retail" className="space-y-12">
                <TabIntro
                  eyebrow="Retail"
                  title="Retail Applications"
                  description="Transform retail operations with intelligent multi-agent systems that enhance customer experiences, optimize inventory management, and deliver personalized marketing for increased sales and customer loyalty."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={ShoppingCart}
                    title="Demand Forecasting"
                    description="Enhance inventory planning with multi-agent systems that analyze historical sales data, market trends, weather patterns, and events to predict demand with unprecedented accuracy across product categories."
                    benefits={[
                      "35% reduction in stockouts and overstock situations",
                      "Multi-factor demand prediction incorporating external variables",
                      "Store-level and SKU-level forecasting precision",
                      "Dynamic adjustment to changing market conditions",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Tag}
                    title="Dynamic Pricing"
                    description="Optimize revenue with collaborative agent networks that analyze competitor pricing, inventory levels, demand patterns, and customer behavior to set optimal prices across channels and product categories."
                    benefits={[
                      "15-25% margin improvement through intelligent pricing",
                      "Real-time competitive price monitoring and response",
                      "Elasticity modeling for optimal price points",
                      "Promotion effectiveness optimization",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Smartphone}
                    title="Personalized Marketing"
                    description="Enhance customer engagement with specialized agent teams that analyze purchase history, browsing behavior, and preferences to deliver highly personalized product recommendations and marketing messages."
                    benefits={[
                      "3x increase in marketing campaign conversion rates",
                      "Individual-level personalization at scale",
                      "Cross-channel message coordination and timing",
                      "Continuous optimization based on response data",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={Store}
                    title="Store Layout Optimization"
                    description="Maximize sales per square foot with multi-agent systems that analyze customer traffic patterns, product affinities, and seasonal trends to recommend optimal store layouts and product placements."
                    benefits={[
                      "18% increase in sales through optimized product placement",
                      "Heat map analysis of customer movement patterns",
                      "Product affinity analysis for complementary placement",
                      "Seasonal and promotion-based layout recommendations",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={CreditCard}
                    title="Fraud Detection"
                    description="Protect revenue with agent networks that analyze transaction patterns, customer behavior, and device information to identify potentially fraudulent activities while minimizing false positives."
                    benefits={[
                      "92% reduction in fraudulent transaction losses",
                      "Real-time transaction risk scoring",
                      "Behavioral anomaly detection with context awareness",
                      "Continuous adaptation to new fraud patterns",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Users}
                    title="Customer Service Automation"
                    description="Enhance customer satisfaction with collaborative agents that handle inquiries, process returns, provide product information, and escalate complex issues to human agents when necessary."
                    benefits={[
                      "24/7 intelligent customer support availability",
                      "70% reduction in response time for common inquiries",
                      "Seamless handoff between AI and human agents",
                      "Continuous learning from customer interactions",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Energy Tab */}
              <TabsContent value="energy" className="space-y-12">
                <TabIntro
                  eyebrow="Energy"
                  title="Energy Applications"
                  description="Transform energy production, distribution, and consumption with intelligent multi-agent systems that optimize grid operations, enhance renewable integration, and enable predictive maintenance for increased efficiency and reliability."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={Zap}
                    title="Grid Optimization"
                    description="Enhance grid stability and efficiency with multi-agent systems that analyze load patterns, generation capacity, and transmission constraints to optimize power flow and prevent outages."
                    benefits={[
                      "30% reduction in transmission losses",
                      "Real-time power flow optimization",
                      "Congestion prediction and mitigation",
                      "Dynamic response to changing grid conditions",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Sun}
                    title="Renewable Integration"
                    description="Maximize renewable energy utilization with collaborative agent networks that forecast renewable generation, coordinate with conventional sources, and optimize storage to maintain grid stability."
                    benefits={[
                      "45% increase in renewable energy utilization",
                      "Advanced weather-based generation forecasting",
                      "Optimal storage charging/discharging schedules",
                      "Seamless integration of distributed energy resources",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Lightbulb}
                    title="Demand Response"
                    description="Reduce peak loads with specialized agent teams that coordinate with smart devices, industrial processes, and building systems to adjust consumption based on grid conditions and price signals."
                    benefits={[
                      "25% reduction in peak demand charges",
                      "Automated load shifting without comfort impact",
                      "Price-responsive consumption optimization",
                      "Aggregation of distributed flexible loads",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={Settings}
                    title="Predictive Maintenance"
                    description="Prevent equipment failures with multi-agent systems that monitor generation and transmission assets, analyze operational data, and predict maintenance needs before failures occur."
                    benefits={[
                      "75% reduction in unplanned outages",
                      "Condition-based maintenance optimization",
                      "Remaining useful life prediction for critical assets",
                      "Maintenance scheduling optimization",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Wind}
                    title="Energy Trading"
                    description="Optimize energy trading with agent networks that analyze market conditions, forecast prices, and execute trades to maximize revenue for generators and minimize costs for consumers."
                    benefits={[
                      "18% improvement in trading margins",
                      "Advanced price forecasting with multi-factor analysis",
                      "Automated bidding strategy optimization",
                      "Risk-managed portfolio optimization",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Leaf}
                    title="Microgrid Management"
                    description="Enable resilient local energy systems with collaborative agents that balance generation, storage, and consumption within microgrids, optimizing for reliability, cost, and sustainability."
                    benefits={[
                      "99.9% reliability in islanded operation",
                      "Optimal resource dispatch within microgrid boundaries",
                      "Seamless transition between grid-connected and islanded modes",
                      "Local energy market facilitation and optimization",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-12">
                <TabIntro
                  eyebrow="Education"
                  title="Education Applications"
                  description="Transform learning experiences with intelligent multi-agent systems that personalize education, enhance administrative efficiency, and provide data-driven insights for improved student outcomes."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={GraduationCap}
                    title="Personalized Learning"
                    description="Enhance student outcomes with multi-agent systems that analyze learning styles, knowledge gaps, and progress to deliver customized learning pathways and content recommendations for each student."
                    benefits={[
                      "40% improvement in concept mastery rates",
                      "Adaptive learning path generation for individual students",
                      "Real-time difficulty adjustment based on performance",
                      "Multi-modal content matching to learning preferences",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={BookOpen}
                    title="Intelligent Tutoring"
                    description="Support student learning with collaborative agent networks that provide personalized tutoring, answer questions, explain concepts, and guide problem-solving with contextual awareness of student knowledge."
                    benefits={[
                      "24/7 personalized learning support availability",
                      "Socratic questioning and guided discovery approaches",
                      "Misconception identification and targeted remediation",
                      "Adaptive explanation depth based on student understanding",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={PenTool}
                    title="Automated Assessment"
                    description="Enhance feedback quality with specialized agent teams that evaluate assignments, provide constructive feedback, and identify areas for improvement across written work, projects, and problem sets."
                    benefits={[
                      "90% reduction in assessment turnaround time",
                      "Consistent rubric application with detailed feedback",
                      "Plagiarism detection with source identification",
                      "Formative feedback focused on improvement",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={School}
                    title="Administrative Efficiency"
                    description="Streamline operations with multi-agent systems that handle scheduling, resource allocation, enrollment management, and administrative tasks to free educator time for teaching and mentoring."
                    benefits={[
                      "65% reduction in administrative workload for educators",
                      "Optimal class scheduling with multiple constraints",
                      "Automated enrollment management and communications",
                      "Resource allocation optimization across departments",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Users}
                    title="Student Success Prediction"
                    description="Improve retention with agent networks that analyze academic performance, engagement patterns, and behavioral indicators to identify at-risk students and recommend timely interventions."
                    benefits={[
                      "Early identification of 85% of at-risk students",
                      "Multi-factor risk assessment beyond grades alone",
                      "Personalized intervention recommendation",
                      "Continuous monitoring and risk reassessment",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Layers}
                    title="Curriculum Optimization"
                    description="Enhance learning outcomes with collaborative agents that analyze student performance data, learning objectives, and industry requirements to recommend curriculum improvements and content updates."
                    benefits={[
                      "Data-driven curriculum design and refinement",
                      "Skill gap analysis between curriculum and industry needs",
                      "Content effectiveness evaluation across student segments",
                      "Continuous curriculum improvement recommendations",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Logistics Tab */}
              <TabsContent value="logistics" className="space-y-12">
                <TabIntro
                  eyebrow="Logistics"
                  title="Logistics Applications"
                  description="Transform supply chain and logistics operations with intelligent multi-agent systems that optimize routing, enhance inventory management, and enable predictive analytics for increased efficiency and reliability."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={Truck}
                    title="Route Optimization"
                    description="Maximize delivery efficiency with multi-agent systems that analyze traffic patterns, delivery constraints, vehicle capacity, and customer preferences to determine optimal routing and scheduling."
                    benefits={[
                      "22% reduction in total miles driven",
                      "Dynamic route adjustment to traffic and weather conditions",
                      "Multi-vehicle coordination for optimal fleet utilization",
                      "Delivery time window compliance optimization",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Box}
                    title="Inventory Management"
                    description="Optimize stock levels with collaborative agent networks that forecast demand, monitor inventory levels, and recommend replenishment strategies across distribution networks to minimize costs."
                    benefits={[
                      "35% reduction in inventory holding costs",
                      "99.5% service level maintenance with minimal safety stock",
                      "Multi-echelon inventory optimization",
                      "Dynamic reorder point adjustment based on lead times",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Map}
                    title="Network Design"
                    description="Enhance distribution efficiency with specialized agent teams that analyze shipping patterns, facility costs, and service requirements to optimize warehouse locations and transportation networks."
                    benefits={[
                      "18% reduction in total logistics network costs",
                      "Service level optimization with minimal infrastructure",
                      "Scenario analysis for network resilience testing",
                      "Continuous network adaptation to changing demand patterns",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={Clock}
                    title="Demand Forecasting"
                    description="Improve planning with multi-agent systems that analyze historical data, market trends, promotions, and external factors to predict demand with high accuracy across products and locations."
                    benefits={[
                      "40% reduction in forecast error rates",
                      "SKU-location level forecasting precision",
                      "Promotion and event impact modeling",
                      "Automated detection of demand pattern changes",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Navigation2}
                    title="Last-Mile Optimization"
                    description="Enhance delivery experience with agent networks that coordinate drivers, optimize package grouping, and manage customer communications to maximize efficiency in the final delivery stage."
                    benefits={[
                      "30% increase in deliveries per driver hour",
                      "Real-time delivery exception management",
                      "Dynamic delivery slot optimization",
                      "Proactive customer communication and coordination",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Package}
                    title="Warehouse Automation"
                    description="Maximize fulfillment efficiency with collaborative agents that optimize picking routes, coordinate robotic systems, and manage inventory placement to minimize processing time and errors."
                    benefits={[
                      "65% increase in order fulfillment throughput",
                      "Optimal item slotting based on velocity and relationships",
                      "Coordinated human-robot workflow optimization",
                      "Dynamic workload balancing across fulfillment zones",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* DeFi Tab */}
              <TabsContent value="defi" className="space-y-12">
                <TabIntro
                  eyebrow="DeFi"
                  title="DeFi Applications"
                  description="Revolutionize decentralized finance with intelligent multi-agent systems that enhance liquidity provision, risk management, yield optimization, and protocol security."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={Wallet}
                    title="Yield Optimization"
                    description="Maximize returns with multi-agent systems that continuously monitor DeFi protocols, identify optimal yield opportunities, and automatically rebalance positions across lending platforms, liquidity pools, and staking options."
                    benefits={[
                      "Cross-protocol yield comparison and optimization",
                      "Gas-efficient rebalancing strategies",
                      "Risk-adjusted return maximization",
                      "Impermanent loss mitigation strategies",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={Shield}
                    title="Risk Management"
                    description="Enhance security with specialized agent networks that monitor smart contract interactions, detect anomalous transactions, and protect against exploits, flash loan attacks, and other DeFi vulnerabilities."
                    benefits={[
                      "Real-time protocol risk assessment",
                      "Anomalous transaction detection and alerting",
                      "Smart contract vulnerability monitoring",
                      "Cross-chain risk exposure analysis",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={Coins}
                    title="Liquidity Management"
                    description="Optimize liquidity provision with collaborative agents that analyze market conditions, fee structures, and impermanent loss potential to maximize returns while maintaining necessary liquidity across protocols."
                    benefits={[
                      "Dynamic liquidity allocation optimization",
                      "Fee generation vs. impermanent loss balancing",
                      "Multi-pool position management",
                      "Just-in-time liquidity provision strategies",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={Landmark}
                    title="DAO Governance"
                    description="Enhance decentralized governance with multi-agent systems that analyze proposal impacts, simulate outcomes, and provide comprehensive analysis to inform token holder voting decisions."
                    benefits={[
                      "Proposal impact simulation and analysis",
                      "Stakeholder interest representation",
                      "Governance participation optimization",
                      "Cross-protocol governance coordination",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={Lock}
                    title="MEV Protection"
                    description="Protect transactions with specialized agent teams that analyze mempool activity, identify potential MEV opportunities, and implement strategies to minimize value extraction from user transactions."
                    benefits={[
                      "Real-time mempool monitoring and analysis",
                      "Transaction routing optimization",
                      "Sandwich attack protection strategies",
                      "Private transaction channels utilization",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={LineChart}
                    title="Market Making"
                    description="Enhance liquidity with intelligent agent networks that provide competitive market making services across DEXs, optimizing spread, depth, and rebalancing to maximize returns while managing inventory risk."
                    benefits={[
                      "Multi-venue market making optimization",
                      "Dynamic spread and depth adjustment",
                      "Inventory risk management strategies",
                      "Cross-market arbitrage opportunity capture",
                    ]}
                    delay={5}
                  />
                </div>
              </TabsContent>

              {/* Multi-Agent Collaboration Tab */}
              <TabsContent value="collaboration" className="space-y-12">
                <TabIntro
                  eyebrow="Multi-Agent"
                  title="Futuristic Multi-Agent Collaboration"
                  description="Explore cutting-edge applications of collaborative multi-agent systems that push the boundaries of what's possible with AI, enabling unprecedented levels of intelligence and automation."
                />

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <UseCaseCard
                    icon={GitBranch}
                    title="Emergent Intelligence Networks"
                    description="Revolutionary agent networks that develop emergent intelligence through specialized roles, collaborative problem-solving, and continuous knowledge sharing, achieving capabilities beyond individual agent limitations."
                    benefits={[
                      "Complex problem decomposition and delegation",
                      "Emergent solution discovery through collaboration",
                      "Collective intelligence amplification",
                      "Adaptive role specialization based on task requirements",
                    ]}
                    delay={0}
                  />

                  <UseCaseCard
                    icon={GitMerge}
                    title="Autonomous Research Teams"
                    description="Self-organizing agent research teams that formulate hypotheses, design experiments, analyze results, and iterate on findings to accelerate scientific discovery across disciplines without human intervention."
                    benefits={[
                      "24/7 autonomous scientific exploration",
                      "Cross-disciplinary knowledge synthesis",
                      "Hypothesis generation and validation",
                      "Continuous research iteration and refinement",
                    ]}
                    delay={1}
                  />

                  <UseCaseCard
                    icon={GitPullRequest}
                    title="Cognitive Architecture Systems"
                    description="Advanced cognitive architectures with specialized agent modules for perception, reasoning, memory, learning, and decision-making that collaborate to form comprehensive artificial general intelligence systems."
                    benefits={[
                      "Modular cognitive function specialization",
                      "Integrated perception-reasoning-action loops",
                      "Distributed memory and knowledge representation",
                      "Collective decision-making under uncertainty",
                    ]}
                    delay={2}
                  />

                  <UseCaseCard
                    icon={MessageSquare}
                    title="Autonomous Negotiation Systems"
                    description="Multi-agent negotiation frameworks where specialized agents represent different stakeholders, interests, and constraints to reach optimal agreements through collaborative bargaining and compromise."
                    benefits={[
                      "Multi-stakeholder interest representation",
                      "Dynamic strategy adaptation during negotiation",
                      "Pareto-optimal solution identification",
                      "Fairness and equity consideration in outcomes",
                    ]}
                    delay={3}
                  />

                  <UseCaseCard
                    icon={MessagesSquare}
                    title="Collective Creativity Systems"
                    description="Collaborative creative agent networks that combine specialized expertise in different domains and artistic styles to generate novel ideas, designs, and content through iterative refinement and critique."
                    benefits={[
                      "Cross-domain creative synthesis",
                      "Iterative ideation and refinement",
                      "Style transfer and adaptation",
                      "Collaborative artistic creation",
                    ]}
                    delay={4}
                  />

                  <UseCaseCard
                    icon={Bot}
                    title="Autonomous Organization Systems"
                    description="Self-governing agent collectives that manage resources, assign tasks, monitor performance, and adapt strategies to achieve organizational goals with minimal human oversight."
                    benefits={[
                      "Autonomous resource allocation optimization",
                      "Dynamic task assignment and prioritization",
                      "Performance monitoring and improvement",
                      "Strategy adaptation to changing conditions",
                    ]}
                    delay={5}
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease }}
                  className="mx-auto mt-4 max-w-7xl overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 lg:p-12"
                >
                  <h3 className="mb-10 text-center text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                    The Future of Multi-Agent Collaboration
                  </h3>

                  <div className="mb-10 grid gap-8 sm:grid-cols-3">
                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03]">
                        <Cpu className="h-6 w-6 text-white/70" strokeWidth={1.5} />
                      </div>
                      <h4 className="mb-2 text-base font-semibold text-white sm:text-lg">Cognitive Synergy</h4>
                      <p className="text-sm leading-relaxed text-white/50">
                        Agent systems that achieve exponentially greater capabilities through specialized
                        collaboration than the sum of individual agents.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03]">
                        <Network className="h-6 w-6 text-white/70" strokeWidth={1.5} />
                      </div>
                      <h4 className="mb-2 text-base font-semibold text-white sm:text-lg">Emergent Intelligence</h4>
                      <p className="text-sm leading-relaxed text-white/50">
                        Complex behaviors and capabilities that emerge spontaneously from the interaction of simpler
                        agent systems.
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/[0.14] bg-white/[0.03]">
                        <Globe className="h-6 w-6 text-white/70" strokeWidth={1.5} />
                      </div>
                      <h4 className="mb-2 text-base font-semibold text-white sm:text-lg">Autonomous Evolution</h4>
                      <p className="text-sm leading-relaxed text-white/50">
                        Self-improving agent collectives that continuously evolve their capabilities, knowledge, and
                        collaboration methods.
                      </p>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="mx-auto mb-6 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg">
                      Swarms AI is at the forefront of developing these next-generation multi-agent systems, pushing
                      the boundaries of what&apos;s possible with collaborative AI.
                    </p>
                    <Button className="rounded-full bg-white px-6 font-medium text-black hover:bg-neutral-200" asChild>
                      <a
                        href="https://docs.swarms.world/examples/overviews/paper-implementations"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Explore Our Research
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
              className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:p-10 md:flex-row md:items-center lg:p-12"
            >
              <div className="max-w-2xl space-y-3">
                <h2 className="text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                  Ready to Transform Your Industry?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Discover how Swarms AI&apos;s multi-agent systems can revolutionize your operations, enhance
                  decision-making, and drive unprecedented efficiency.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/swarms-strategy-session" target="_blank" rel="noopener noreferrer">
                    Schedule a Consultation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <Link href="/products">Explore Our Products</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-8">
        <div className="container px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Link href="/" className="flex items-center">
                <div className="relative w-8 h-8 mr-2">
                  <Image
                    src="https://raw.githubusercontent.com/kyegomez/swarms/1899c807eb3874e095b677fbd6b9c877e7746918/swarms_logo_svg.svg"
                    alt="Swarms AI Multi-Agent Framework Logo - Enterprise-Grade Autonomous Agent Infrastructure"
                    width={32}
                    height={32}
                    loading="lazy"
                  />
                </div>
                <span className="font-bold text-lg text-white">Swarms AI</span>
              </Link>
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/kyegomez/swarms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-white/[0.14] bg-black text-white hover:border-white/30 hover:bg-white/[0.06] h-9 w-9 p-0"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/swarms_corp"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-white/[0.14] bg-black text-white hover:border-white/30 hover:bg-white/[0.06] h-9 w-9 p-0"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://discord.gg/EamjgSaEQf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ position: "relative", zIndex: 10 }}
                className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border border-white/[0.14] bg-black text-white hover:border-white/30 hover:bg-white/[0.06] h-9 w-9 p-0"
              >
                <Discord className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center md:text-left text-sm text-white/40">
            <p>© {new Date().getFullYear()} Swarms AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
