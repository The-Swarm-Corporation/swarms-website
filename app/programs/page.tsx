"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  FileText,
  Users,
  Rocket,
  Lightbulb,
  GraduationCap,
  Code,
} from "lucide-react"
import { Navigation } from "@/components/navigation"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const overviewFeatures = [
  {
    icon: Rocket,
    title: "Cutting-Edge Infrastructure",
    description: "Access to enterprise-grade multi-agent infrastructure for your research experiments",
    link: "https://cloud.swarms.ai",
    linkText: "Explore Cloud Platform",
  },
  {
    icon: Lightbulb,
    title: "Research Grants",
    description: "Unlimited Swarms credits for qualified academic and research institutions",
    link: "https://cal.com/swarms/research",
    linkText: "Apply for Grants",
  },
  {
    icon: GraduationCap,
    title: "Academic Support",
    description: "Dedicated technical support and collaboration with our research team",
    link: "https://docs.swarms.world/examples/overviews/paper-implementations",
    linkText: "Support Details",
  },
  {
    icon: Code,
    title: "Open Source",
    description: "Contribute to and build upon our open-source multi-agent framework",
    link: "https://github.com/kyegomez/swarms",
    linkText: "View GitHub",
  },
]

const focusAreas = [
  {
    title: "Multi-Agent Collaboration",
    description: "Research on how multiple AI agents can effectively collaborate to solve complex problems",
    link: "https://docs.swarms.world/architectures/overview",
    linkText: "Explore Architectures",
  },
  {
    title: "Agent Communication",
    description: "Protocols and methods for effective inter-agent communication and knowledge sharing",
    link: "https://docs.swarms.world/examples/overviews/examples-index",
    linkText: "View Examples",
  },
  {
    title: "Emergent Behaviors",
    description: "Study of emergent intelligence and behaviors in multi-agent systems",
    link: "https://docs.swarms.world/examples/overviews/paper-implementations",
    linkText: "Research Papers",
  },
  {
    title: "Specialized Agent Roles",
    description: "Research on role specialization and division of labor in agent swarms",
    link: "https://docs.swarms.world/agents/creating-agents",
    linkText: "Agent Documentation",
  },
  {
    title: "Swarm Optimization",
    description: "Techniques for optimizing performance and efficiency of large agent swarms",
    link: "https://docs.swarms.world/architectures/overview",
    linkText: "Optimization Guides",
  },
  {
    title: "Real-world Applications",
    description: "Applied research on multi-agent systems in healthcare, finance, and other domains",
    link: "https://docs.swarms.world/examples/overviews/examples-index",
    linkText: "Use Cases",
  },
]

const applicationSteps = [
  {
    icon: FileText,
    title: "1. Submit Application",
    description:
      "Complete our research program application form with details about your institution, research focus, and proposed use of multi-agent systems.",
    link: "https://cal.com/swarms/research",
    linkText: "Schedule Application Call",
  },
  {
    icon: BookOpen,
    title: "2. Research Evaluation",
    description:
      "Our team will review your application and evaluate how our platform can best support your specific multi-agent research objectives.",
    link: "https://docs.swarms.world/examples/overviews/paper-implementations",
    linkText: "Evaluation Criteria",
  },
  {
    icon: Users,
    title: "3. Onboarding & Support",
    description:
      "Approved researchers receive full platform access, dedicated technical support, and regular check-ins with our research team.",
    link: "https://docs.swarms.world/quickstart",
    linkText: "Onboarding Process",
  },
]

const technicalResources = [
  "Unlimited Swarms API credits for research purposes",
  "Access to enterprise-grade multi-agent infrastructure",
  "Priority access to new features and capabilities",
  "Advanced monitoring and analytics tools",
  "Custom agent development support",
]

const researchSupport = [
  "Dedicated technical support from our research team",
  "Collaboration opportunities with Swarms AI researchers",
  "Co-authorship opportunities for joint research",
  "Promotion of research findings through our channels",
  "Access to our research community and events",
]

const resources = [
  {
    title: "API Documentation",
    description: "Comprehensive guides and references for the Swarms API",
    link: "https://docs.swarms.ai",
  },
  {
    title: "Cloud Dashboard",
    description: "Interactive console to manage and monitor your swarms",
    link: "https://cloud.swarms.ai/dashboard",
  },
  {
    title: "Research Examples",
    description: "Sample projects and case studies from our research partners",
    link: "https://docs.swarms.world/examples/overviews/examples-index",
  },
  {
    title: "GitHub Repository",
    description: "Access the open-source code and contribute to development",
    link: "https://github.com/kyegomez/swarms",
  },
  {
    title: "Technical Papers",
    description: "Research papers and technical documentation on multi-agent systems",
    link: "https://docs.swarms.world/examples/overviews/paper-implementations",
  },
  {
    title: "Community Forum",
    description: "Join our community of researchers and developers",
    link: "https://discord.gg/EamjgSaEQf",
  },
]

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string
  title: React.ReactNode
  description?: string
}) {
  return (
    <motion.div
      className="mx-auto mb-10 max-w-7xl sm:mb-14"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease }}
    >
      {eyebrow && (
        <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
          {eyebrow}
        </p>
      )}
      <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default function ProgramsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
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
                Research Initiative
              </motion.div>

              <motion.h1
                className="mt-6 font-bold leading-[0.95] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.75rem, 8vw, 6rem)" }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease }}
              >
                Swarms Research Program
              </motion.h1>

              <motion.p
                className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12, ease }}
              >
                Empowering researchers with limitless swarms credits and comprehensive support for
                multi-agent experiments.
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
                  <a href="https://cal.com/swarms/research" target="_blank" rel="noopener noreferrer">
                    Book a Call
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a
                    href="https://docs.swarms.world/examples/overviews/paper-implementations"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Program Details
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROGRAM OVERVIEW */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Program Overview"
              title="Everything researchers need to move fast."
              description="The Swarms Research Program provides academic researchers with the tools, resources, and support needed to advance multi-agent AI systems."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {overviewFeatures.map((feature) => (
                <a
                  key={feature.title}
                  href={feature.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <feature.icon
                    className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{feature.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {feature.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    {feature.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* RESEARCH FOCUS AREAS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Focus Areas"
              title="Research Focus Areas"
              description="Our program supports research across multiple domains of multi-agent systems."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {focusAreas.map((area) => (
                <a
                  key={area.title}
                  href={area.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[180px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{area.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {area.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    {area.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* APPLICATION PROCESS */}
        <section id="application-process" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="How to Apply"
              title="Application Process"
              description="Join our research program in three simple steps."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {applicationSteps.map((step) => (
                <a
                  key={step.title}
                  href={step.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[220px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <step.icon
                    className="h-5 w-5 text-white/50 transition-colors duration-300 group-hover:text-white"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{step.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {step.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    {step.linkText}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROGRAM BENEFITS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Program Benefits"
              title="Comprehensive support and resources"
              description="Researchers in our program receive full-stack technical resources and dedicated research support."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-lg border border-white/[0.08] bg-black md:grid-cols-2"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="border-b border-white/[0.08] p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
                <h3 className="mb-5 text-xl font-semibold text-white sm:text-2xl">
                  Technical Resources
                </h3>
                <ul className="mb-6 space-y-3">
                  {technicalResources.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                      <span className="text-sm leading-relaxed text-white/60">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                  asChild
                >
                  <a href="https://cloud.swarms.ai" target="_blank" rel="noopener noreferrer">
                    Explore Cloud Platform
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="p-6 sm:p-8 md:p-10">
                <h3 className="mb-5 text-xl font-semibold text-white sm:text-2xl">
                  Research Support
                </h3>
                <ul className="mb-6 space-y-3">
                  {researchSupport.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-2.5">
                      <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/40" strokeWidth={1.75} />
                      <span className="text-sm leading-relaxed text-white/60">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="rounded-full border-white/[0.14] bg-black font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white"
                  asChild
                >
                  <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                    View Documentation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ESSENTIAL RESOURCES */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
            <SectionHeading
              eyebrow="Resources"
              title="Essential Resources"
              description="Key documentation and tools to help you get started with your research."
            />

            <motion.div
              className="mx-auto grid max-w-7xl grid-cols-1 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              {resources.map((resource) => (
                <a
                  key={resource.title}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[160px] flex-col justify-between gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8"
                >
                  <div>
                    <h3 className="mb-2 text-base font-medium text-white">{resource.title}</h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {resource.description}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/60 transition-colors duration-300 group-hover:text-white">
                    Access Resource
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </a>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
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
                  Ready to Advance Multi-Agent Research?
                </h2>
                <p className="text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                  Join our ecosystem of researchers and engineers committed to pushing the boundaries
                  of multi-agent systems. Schedule a call with our team to discuss your research goals
                  and how we can support your work.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                  asChild
                >
                  <a href="https://cal.com/swarms/research" target="_blank" rel="noopener noreferrer">
                    Apply to the Program
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                  asChild
                >
                  <a href="mailto:research@swarms.ai">Contact Research Team</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://swarms.ai"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Swarms AI
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/kyegomez/swarms"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  )
}
