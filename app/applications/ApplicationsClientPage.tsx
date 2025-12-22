"use client"

import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { AnimatedBackground } from "@/components/animated-background"
import { CardWrapper } from "@/components/card-wrapper"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
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

export default function ApplicationsClientPage() {
  const tickerAnnouncements = [
    "Transform Industries with Multi-Agent AI Systems",
    "Revolutionize Finance, Healthcare, Manufacturing, and More with Swarms",
    "Unlock New Possibilities with Advanced Multi-Agent Collaboration",
    "Enterprise-Grade AI Solutions for Complex Industry Challenges",
  ]

  // Reusable card component for use cases
  const UseCaseCard = ({
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
            <h3 className="text-xl font-bold">{title}</h3>
          </div>
          <p className="text-muted-foreground mb-6 flex-grow">{description}</p>
          <div className="mt-auto">
            <h4 className="font-medium text-sm mb-2">Key Benefits:</h4>
            <ul className="space-y-2">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                  <span className="text-sm text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardWrapper>
    </motion.div>
  )

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
            <Badge className="mb-4 bg-red-500/20 text-red-400 hover:bg-red-500/30">Industry Solutions</Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              Transforming Industries with Multi-Agent AI
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Discover how Swarms AI's enterprise-grade multi-agent systems are revolutionizing industries with
              unprecedented intelligence, efficiency, and automation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="#industry-applications">
                  Explore Applications
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link href="/products">View Our Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Industry Applications */}
      <div id="industry-applications" className="container px-4 sm:px-6 py-16">
        <Tabs defaultValue="finance" className="w-full">
          <div className="flex justify-center mb-8 overflow-x-auto pb-2">
            <TabsList className="grid grid-cols-9 w-full max-w-5xl bg-background/30 backdrop-blur-sm border border-red-500/20 p-1 rounded-lg">
              <TabsTrigger
                value="finance"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <DollarSign className="mr-2 h-4 w-4" />
                Finance
              </TabsTrigger>
              <TabsTrigger
                value="healthcare"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <HeartPulse className="mr-2 h-4 w-4" />
                Healthcare
              </TabsTrigger>
              <TabsTrigger
                value="manufacturing"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Factory className="mr-2 h-4 w-4" />
                Manufacturing
              </TabsTrigger>
              <TabsTrigger
                value="retail"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Retail
              </TabsTrigger>
              <TabsTrigger
                value="energy"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Zap className="mr-2 h-4 w-4" />
                Energy
              </TabsTrigger>
              <TabsTrigger
                value="education"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <GraduationCap className="mr-2 h-4 w-4" />
                Education
              </TabsTrigger>
              <TabsTrigger
                value="logistics"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Truck className="mr-2 h-4 w-4" />
                Logistics
              </TabsTrigger>
              <TabsTrigger
                value="defi"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Coins className="mr-2 h-4 w-4" />
                DeFi
              </TabsTrigger>
              <TabsTrigger
                value="collaboration"
                className="data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)]"
              >
                <Network className="mr-2 h-4 w-4" />
                Multi-Agent
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Finance Tab */}
          <TabsContent value="finance" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  Finance & Investment Applications
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Leverage multi-agent systems to gain competitive advantages in financial markets with advanced
                  analytics, risk management, and automated trading strategies.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Healthcare Tab */}
          <TabsContent value="healthcare" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Healthcare Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform patient care, medical research, and healthcare operations with collaborative multi-agent
                  systems that enhance diagnosis, treatment planning, and operational efficiency.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Manufacturing Tab */}
          <TabsContent value="manufacturing" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Manufacturing Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Revolutionize manufacturing processes with intelligent multi-agent systems that optimize production,
                  enhance quality control, and enable predictive maintenance for increased efficiency and reduced costs.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Retail Tab */}
          <TabsContent value="retail" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Retail Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform retail operations with intelligent multi-agent systems that enhance customer experiences,
                  optimize inventory management, and deliver personalized marketing for increased sales and customer
                  loyalty.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Energy Tab */}
          <TabsContent value="energy" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Energy Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform energy production, distribution, and consumption with intelligent multi-agent systems that
                  optimize grid operations, enhance renewable integration, and enable predictive maintenance for
                  increased efficiency and reliability.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Education Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform learning experiences with intelligent multi-agent systems that personalize education,
                  enhance administrative efficiency, and provide data-driven insights for improved student outcomes.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Logistics Tab */}
          <TabsContent value="logistics" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Logistics Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Transform supply chain and logistics operations with intelligent multi-agent systems that optimize
                  routing, enhance inventory management, and enable predictive analytics for increased efficiency and
                  reliability.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* DeFi Tab */}
          <TabsContent value="defi" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">DeFi Applications</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Revolutionize decentralized finance with intelligent multi-agent systems that enhance liquidity
                  provision, risk management, yield optimization, and protocol security.
                </p>
              </motion.div>

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
            </div>
          </TabsContent>

          {/* Multi-Agent Collaboration Tab */}
          <TabsContent value="collaboration" className="space-y-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-8"
              >
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
                  Futuristic Multi-Agent Collaboration
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Explore cutting-edge applications of collaborative multi-agent systems that push the boundaries of
                  what's possible with AI, enabling unprecedented levels of intelligence and automation.
                </p>
              </motion.div>

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

              <div className="mt-12">
                <CardWrapper className="p-8 border-red-500/30 bg-gradient-to-br from-black via-red-950/20 to-black">
                  <div className="relative">
                    {/* Futuristic glowing elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-[80px]"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-500/10 rounded-full blur-[100px]"></div>

                    <div className="relative z-10">
                      <h3 className="text-3xl font-bold mb-6 text-center">The Future of Multi-Agent Collaboration</h3>

                      <div className="grid gap-8 md:grid-cols-3 mb-8">
                        <div className="text-center">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                            <Cpu className="h-8 w-8 text-red-500" />
                          </div>
                          <h4 className="text-xl font-bold mb-2">Cognitive Synergy</h4>
                          <p className="text-muted-foreground">
                            Agent systems that achieve exponentially greater capabilities through specialized
                            collaboration than the sum of individual agents.
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                            <Network className="h-8 w-8 text-red-500" />
                          </div>
                          <h4 className="text-xl font-bold mb-2">Emergent Intelligence</h4>
                          <p className="text-muted-foreground">
                            Complex behaviors and capabilities that emerge spontaneously from the interaction of simpler
                            agent systems.
                          </p>
                        </div>

                        <div className="text-center">
                          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/30 mb-4">
                            <Globe className="h-8 w-8 text-red-500" />
                          </div>
                          <h4 className="text-xl font-bold mb-2">Autonomous Evolution</h4>
                          <p className="text-muted-foreground">
                            Self-improving agent collectives that continuously evolve their capabilities, knowledge, and
                            collaboration methods.
                          </p>
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="text-lg mb-6">
                          Swarms AI is at the forefront of developing these next-generation multi-agent systems, pushing
                          the boundaries of what's possible with collaborative AI.
                        </p>
                        <Button size="lg" className="bg-red-600 hover:bg-red-700" asChild>
                          <a
                            href="https://docs.swarms.world/en/latest/swarms/research/"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Explore Our Research
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardWrapper>
              </div>
            </div>
          </TabsContent>
        </Tabs>
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
                  Ready to Transform Your Industry?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Discover how Swarms AI's multi-agent systems can revolutionize your operations, enhance
                  decision-making, and drive unprecedented efficiency.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button
                    size="lg"
                    className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                    asChild
                  >
                    <Link href="/products">Explore Our Products</Link>
                  </Button>
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
