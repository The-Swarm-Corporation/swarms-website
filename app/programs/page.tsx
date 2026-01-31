import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BookOpen,
  CheckCircle,
  FileText,
  Users,
  Rocket,
  Lightbulb,
  GraduationCap,
  Code,
} from "lucide-react"
import { CardWrapper } from "@/components/card-wrapper"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProgramsPage() {
  // Structured multilingual slogans for the ticker
  const tickerAnnouncements = [
    "Join the Swarms Research Program - Applications Open Now",
    "Limitless Credits for Academic Research",
    "Build Multi-Agent Systems with Enterprise Support",
    "Accelerate Your AI Research with Swarms",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ScrollingTicker
        announcements={tickerAnnouncements}
        className="py-2 bg-black/30 border-y border-red-600/20 backdrop-blur-sm"
      />

      {/* Hero Section */}
      <div className="container px-3 sm:px-4 md:px-6 py-10 sm:py-12 md:py-16 lg:py-20 overflow-x-hidden">
        <div className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 px-4 sm:px-6 py-10 sm:py-12 md:py-16 backdrop-blur-sm mb-10 sm:mb-16">
          {/* Glowing orb effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[600px] h-[600px] rounded-full bg-red-500/10 blur-[128px]" />
          </div>

          <div className="relative mx-auto max-w-3xl text-center">
            <div className="inline-block rounded-full bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-500 mb-4">
              Research Initiative
            </div>
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 break-words">
              Swarms Research Program
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 break-words px-1">
              Empowering researchers with limitless swarms credits and comprehensive support for multi-agent
              experiments.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://cal.com/swarms/research" target="_blank" rel="noopener noreferrer">
                  Book a Call
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a
                  href="https://docs.swarms.world/en/latest/swarms/research/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Program Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter sm:text-4xl mb-3 sm:mb-4 break-words px-1">Program Overview</h2>
            <p className="text-sm sm:text-base text-muted-foreground mx-auto max-w-[800px] break-words px-1">
              The Swarms Research Program provides academic researchers with the tools, resources, and support needed to
              advance multi-agent AI systems
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
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
                link: "https://docs.swarms.world/en/latest/swarms/research/",
                linkText: "Support Details",
              },
              {
                icon: Code,
                title: "Open Source",
                description: "Contribute to and build upon our open-source multi-agent framework",
                link: "https://github.com/kyegomez/swarms",
                linkText: "View GitHub",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="backdrop-blur-sm bg-background/30 border-red-900/20 hover:border-red-500/50 transition-colors"
                >
                  <CardHeader>
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 mb-4">
                      <Icon className="h-6 w-6 text-red-500" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="link" className="text-red-500 p-0" asChild>
                      <a href={feature.link} target="_blank" rel="noopener noreferrer">
                        {feature.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Research Focus Areas */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Research Focus Areas</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Our program supports research across multiple domains of multi-agent systems
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Multi-Agent Collaboration",
                description: "Research on how multiple AI agents can effectively collaborate to solve complex problems",
                link: "https://docs.swarms.world/en/latest/swarms/architectures/",
                linkText: "Explore Architectures",
              },
              {
                title: "Agent Communication",
                description: "Protocols and methods for effective inter-agent communication and knowledge sharing",
                link: "https://docs.swarms.world/en/latest/swarms/examples/",
                linkText: "View Examples",
              },
              {
                title: "Emergent Behaviors",
                description: "Study of emergent intelligence and behaviors in multi-agent systems",
                link: "https://docs.swarms.world/en/latest/swarms/research/",
                linkText: "Research Papers",
              },
              {
                title: "Specialized Agent Roles",
                description: "Research on role specialization and division of labor in agent swarms",
                link: "https://docs.swarms.world/en/latest/swarms/agents/",
                linkText: "Agent Documentation",
              },
              {
                title: "Swarm Optimization",
                description: "Techniques for optimizing performance and efficiency of large agent swarms",
                link: "https://docs.swarms.world/en/latest/swarms/optimization/",
                linkText: "Optimization Guides",
              },
              {
                title: "Real-world Applications",
                description: "Applied research on multi-agent systems in healthcare, finance, and other domains",
                link: "https://docs.swarms.world/en/latest/swarms/use_cases/",
                linkText: "Use Cases",
              },
            ].map((area, index) => (
              <CardWrapper key={index} className="p-6 hover:border-red-500/50 transition-colors h-full">
                <div className="space-y-4 flex flex-col h-full">
                  <h3 className="text-xl font-bold">{area.title}</h3>
                  <p className="text-muted-foreground flex-grow">{area.description}</p>
                  <div className="mt-auto pt-4">
                    <Button variant="link" className="text-red-500 p-0" asChild>
                      <a href={area.link} target="_blank" rel="noopener noreferrer">
                        {area.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>

        {/* Application Process */}
        <div id="application-process" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Application Process</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Join our research program in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
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
                link: "https://docs.swarms.world/en/latest/swarms/research/evaluation.html",
                linkText: "Evaluation Criteria",
              },
              {
                icon: Users,
                title: "3. Onboarding & Support",
                description:
                  "Approved researchers receive full platform access, dedicated technical support, and regular check-ins with our research team.",
                link: "https://docs.swarms.world/en/latest/swarms/research/onboarding.html",
                linkText: "Onboarding Process",
              },
            ].map((step, index) => {
              const Icon = step.icon
              return (
                <CardWrapper key={index} className="p-8 relative h-full">
                  <div className="space-y-4 flex flex-col h-full">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10">
                      <Icon className="h-6 w-6 text-red-500" />
                    </div>
                    <h3 className="text-xl font-bold">{step.title}</h3>
                    <p className="text-muted-foreground flex-grow">{step.description}</p>
                    <div className="mt-auto pt-4">
                      <Button variant="link" className="text-red-500 p-0" asChild>
                        <a href={step.link} target="_blank" rel="noopener noreferrer">
                          {step.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                  {index < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-red-500/50" />
                    </div>
                  )}
                </CardWrapper>
              )
            })}
          </div>
        </div>

        {/* Program Benefits */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Program Benefits</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Researchers in our program receive comprehensive support and resources
            </p>
          </div>

          <CardWrapper className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold mb-4">Technical Resources</h3>
                <ul className="space-y-3">
                  {[
                    "Unlimited Swarms API credits for research purposes",
                    "Access to enterprise-grade multi-agent infrastructure",
                    "Priority access to new features and capabilities",
                    "Advanced monitoring and analytics tools",
                    "Custom agent development support",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600/10" asChild>
                    <a href="https://cloud.swarms.ai" target="_blank" rel="noopener noreferrer">
                      Explore Cloud Platform
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold mb-4">Research Support</h3>
                <ul className="space-y-3">
                  {[
                    "Dedicated technical support from our research team",
                    "Collaboration opportunities with Swarms AI researchers",
                    "Co-authorship opportunities for joint research",
                    "Promotion of research findings through our channels",
                    "Access to our research community and events",
                  ].map((benefit, i) => (
                    <li key={i} className="flex items-start">
                      <CheckCircle className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-600/10" asChild>
                    <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
                      View Documentation
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </CardWrapper>
        </div>

        {/* Resources Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Essential Resources</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Key documentation and tools to help you get started with your research
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
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
                link: "https://docs.swarms.world/en/latest/swarms/examples/",
              },
              {
                title: "GitHub Repository",
                description: "Access the open-source code and contribute to development",
                link: "https://github.com/kyegomez/swarms",
              },
              {
                title: "Technical Papers",
                description: "Research papers and technical documentation on multi-agent systems",
                link: "https://docs.swarms.world/en/latest/swarms/papers/",
              },
              {
                title: "Community Forum",
                description: "Join our community of researchers and developers",
                link: "https://discord.gg/EamjgSaEQf",
              },
            ].map((resource, index) => (
              <Card
                key={index}
                className="backdrop-blur-sm bg-background/30 border-red-900/20 hover:border-red-500/50 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="text-xl">{resource.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="text-red-500 p-0" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                      Access Resource <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 px-6 py-12 backdrop-blur-sm">
          {/* Glowing orb effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ready to Advance Multi-Agent Research?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join our ecosystem of researchers and engineers committed to pushing the boundaries of multi-agent
              systems. Schedule a call with our team to discuss your research goals and how we can support your work.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://cal.com/swarms/research" target="_blank" rel="noopener noreferrer">
                  Apply to the Program
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="mailto:research@swarms.ai">Contact Research Team</a>
              </Button>
            </div>
          </div>
        </div>
      </div>

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
