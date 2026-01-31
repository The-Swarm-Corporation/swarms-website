import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Zap,
  BarChart,
  Users,
  Code,
  Rocket,
  Award,
  Gift,
  Briefcase,
  Globe,
  MessageSquare,
  Layers,
  FileText,
} from "lucide-react"
import { CardWrapper } from "@/components/card-wrapper"
import { Navigation } from "@/components/navigation"
import { ScrollingTicker } from "@/components/scrolling-ticker"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata = {
  title: "Startup Program | Swarms AI",
  description:
    "Accelerate your AI startup with technical support, go-to-market resources, and up to $10,000 in credits.",
}

export default function StartupsPage() {
  const tickerAnnouncements = [
    "Swarms AI Startup Program - Applications Open Now",
    "Up to $10,000 in Swarms Credits for Qualified Startups",
    "Technical Support and Go-to-Market Resources Available",
    "Investment Opportunities for Top Performing Startups",
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
              Startup Initiative
            </div>
            <h1 className="text-2xl min-[400px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-4 sm:mb-6 break-words">
              Swarms Startup Program
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 sm:mb-8 break-words px-1">
              Accelerate your AI startup with technical support, go-to-market resources, and up to $10,000 in credits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="#program-tiers">View Program Tiers</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Program Overview */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Program Overview</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              The Swarms Startup Program is designed to help AI startups build, scale, and succeed with our
              multi-agent platform
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Gift,
                title: "Platform Credits",
                description:
                  "Up to $10,000 in Swarms AI platform credits to build and scale your multi-agent applications",
                link: "#program-tiers",
                linkText: "View Credit Tiers",
              },
              {
                icon: Code,
                title: "Technical Support",
                description:
                  "Direct access to our engineering team for implementation guidance and technical assistance",
                link: "#technical-support",
                linkText: "Support Details",
              },
              {
                icon: Globe,
                title: "Go-to-Market Support",
                description: "Co-marketing opportunities, case studies, and promotional support for your startup",
                link: "#go-to-market",
                linkText: "Marketing Resources",
              },
              {
                icon: MessageSquare,
                title: "Dedicated Account Manager",
                description: "A dedicated point of contact to help you navigate and maximize program benefits",
                link: "#application-process",
                linkText: "Learn More",
              },
              {
                icon: Briefcase,
                title: "Investment Opportunities",
                description: "Top-performing startups may be considered for investment from Swarms AI",
                link: "#investment",
                linkText: "Investment Details",
              },
              {
                icon: Users,
                title: "Startup Community",
                description: "Join a community of AI founders building with Swarms technology",
                link: "https://discord.gg/EamjgSaEQf",
                linkText: "Join Community",
              },
            ].map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={index}
                  className="backdrop-blur-sm bg-background/30 border-red-900/20 hover:border-red-500/50 transition-colors h-full"
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
                      <a href={feature.link}>
                        {feature.linkText} <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Program Tiers */}
        <div id="program-tiers" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Program Tiers</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Choose the tier that best fits your startup's stage and needs
            </p>
          </div>

          <Tabs defaultValue="launch" className="w-full">
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-0 mb-6 sm:mb-8 p-1">
              <TabsTrigger value="launch" className="min-h-[44px] sm:min-h-0 text-sm">Launch Tier</TabsTrigger>
              <TabsTrigger value="growth" className="min-h-[44px] sm:min-h-0 text-sm">Growth Tier</TabsTrigger>
              <TabsTrigger value="scale" className="min-h-[44px] sm:min-h-0 text-sm">Scale Tier</TabsTrigger>
            </TabsList>

            <TabsContent value="launch">
              <Card className="backdrop-blur-sm bg-background/30 border-red-900/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Launch Tier</CardTitle>
                    <Badge className="bg-blue-600">Early Stage</Badge>
                  </div>
                  <CardDescription className="text-lg">
                    For early-stage startups beginning their AI journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Benefits Include:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Gift className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          <strong>$2,500</strong> in Swarms AI platform credits
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Code className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          Email technical support with 48-hour response time
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Basic go-to-market resources and templates</span>
                      </li>
                      <li className="flex items-start">
                        <Users className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Access to startup community and forums</span>
                      </li>
                      <li className="flex items-start">
                        <Layers className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Monthly office hours with Swarms engineers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Eligibility:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Pre-seed or seed stage startup</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Less than $500K in funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Founded within the last 2 years</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <a href="https://cal.com/swarms/startup-launch" target="_blank" rel="noopener noreferrer">
                      Apply for Launch Tier
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <Card className="backdrop-blur-sm bg-background/30 border-red-900/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Growth Tier</CardTitle>
                    <Badge className="bg-purple-600">Mid Stage</Badge>
                  </div>
                  <CardDescription className="text-lg">
                    For startups with initial traction looking to scale
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Benefits Include:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Gift className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          <strong>$5,000</strong> in Swarms AI platform credits
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Code className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Priority email support with 24-hour response time</span>
                      </li>
                      <li className="flex items-start">
                        <MessageSquare className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          Bi-weekly check-ins with a technical account manager
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Co-marketing opportunities and case study</span>
                      </li>
                      <li className="flex items-start">
                        <Layers className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          Architectural review session with Swarms engineers
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Users className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Introductions to relevant partners and customers</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Eligibility:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Seed to Series A startup</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">$500K to $3M in funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Demonstrated product-market fit</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <a href="https://cal.com/swarms/startup-growth" target="_blank" rel="noopener noreferrer">
                      Apply for Growth Tier
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="scale">
              <Card className="backdrop-blur-sm bg-background/30 border-red-900/20">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-2xl">Scale Tier</CardTitle>
                    <Badge className="bg-red-600">Advanced</Badge>
                  </div>
                  <CardDescription className="text-lg">
                    For high-growth startups ready for significant expansion
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4">Benefits Include:</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Gift className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          <strong>$10,000</strong> in Swarms AI platform credits
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Code className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Premium support with dedicated Slack channel</span>
                      </li>
                      <li className="flex items-start">
                        <MessageSquare className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Dedicated account manager with weekly check-ins</span>
                      </li>
                      <li className="flex items-start">
                        <Globe className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Featured case study and joint PR opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <Layers className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">
                          Custom implementation support and architecture design
                        </span>
                      </li>
                      <li className="flex items-start">
                        <Briefcase className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Consideration for investment opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <Award className="mr-2 h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">Executive sponsor from Swarms leadership team</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4">Eligibility:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Series A or beyond</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">$3M+ in funding</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Significant revenue or user growth</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                        <span className="text-muted-foreground">Strategic alignment with Swarms AI</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                    <a href="https://cal.com/swarms/startup-scale" target="_blank" rel="noopener noreferrer">
                      Apply for Scale Tier
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Technical Support Section */}
        <div id="technical-support" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Technical Support</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Get the technical guidance you need to build successful multi-agent applications
            </p>
          </div>

          <CardWrapper className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-2xl font-bold mb-6">Implementation Support</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Code className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Architecture Design</span>
                      <span className="text-muted-foreground">
                        Get expert guidance on designing your multi-agent system architecture
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Layers className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Integration Assistance</span>
                      <span className="text-muted-foreground">
                        Support for integrating Swarms AI with your existing systems and workflows
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Zap className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Performance Optimization</span>
                      <span className="text-muted-foreground">
                        Guidance on optimizing your multi-agent systems for maximum efficiency
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Team Training</span>
                      <span className="text-muted-foreground">
                        Technical workshops and training sessions for your development team
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-6">Support Channels</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MessageSquare className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Dedicated Slack Channel</span>
                      <span className="text-muted-foreground">
                        Direct access to our engineering team for Scale tier members
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Users className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Office Hours</span>
                      <span className="text-muted-foreground">
                        Regular technical office hours with our engineering team
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Rocket className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Implementation Reviews</span>
                      <span className="text-muted-foreground">
                        Code and architecture reviews to ensure best practices
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Globe className="mr-3 h-6 w-6 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold block">Documentation & Resources</span>
                      <span className="text-muted-foreground">
                        Access to premium documentation, tutorials, and code samples
                      </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </CardWrapper>
        </div>

        {/* Go-to-Market Support */}
        <div id="go-to-market" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Go-to-Market Support</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Accelerate your market entry and growth with our marketing and business development resources
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Co-Marketing",
                description:
                  "Joint marketing campaigns, blog posts, and social media promotion to increase your visibility",
                items: [
                  "Featured case studies",
                  "Joint webinars and events",
                  "Social media promotion",
                  "Newsletter features",
                ],
              },
              {
                title: "Sales Enablement",
                description: "Resources and support to help you effectively sell your Swarms-powered solutions",
                items: ["Sales deck templates", "ROI calculators", "Competitive positioning", "Demo environments"],
              },
              {
                title: "Market Access",
                description: "Connections and opportunities to reach potential customers and partners",
                items: [
                  "Customer introductions",
                  "Partner ecosystem access",
                  "Industry event participation",
                  "Marketplace listing",
                ],
              },
            ].map((section, index) => (
              <CardWrapper key={index} className="p-6 hover:border-red-500/50 transition-colors h-full">
                <div className="space-y-4 h-full flex flex-col">
                  <h3 className="text-xl font-bold">{section.title}</h3>
                  <p className="text-muted-foreground">{section.description}</p>
                  <div className="mt-4 flex-grow">
                    <h4 className="font-medium text-sm mb-2">Includes:</h4>
                    <ul className="space-y-2">
                      {section.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                          <span className="text-muted-foreground text-sm">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardWrapper>
            ))}
          </div>
        </div>

        {/* Investment Opportunities */}
        <div id="investment" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Investment Opportunities</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Top-performing startups in our program may be considered for investment
            </p>
          </div>

          <Card className="backdrop-blur-sm bg-background/30 border-red-900/20">
            <CardHeader>
              <CardTitle className="text-2xl">Swarms AI Ventures</CardTitle>
              <CardDescription className="text-lg">Strategic investment for exceptional startups</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Swarms AI is committed to supporting the most promising startups in our ecosystem. Scale tier members
                who demonstrate exceptional growth, innovation, and strategic alignment with our vision may be
                considered for investment opportunities.
              </p>

              <div className="grid gap-6 md:grid-cols-2 mt-6">
                <div>
                  <h3 className="text-xl font-bold mb-4">Investment Criteria</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Strong product-market fit with demonstrated traction
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Innovative use of multi-agent technology</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Strong founding team with domain expertise</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Clear path to scalability and growth</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Investment Benefits</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Strategic capital to accelerate growth</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Executive mentorship from Swarms leadership</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">Introductions to our investor network</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-2 mt-1.5 shrink-0" />
                      <span className="text-muted-foreground">
                        Priority access to new Swarms features and capabilities
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-red-600 hover:bg-red-700" asChild>
                <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                  Schedule Investment Discussion
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Application Process */}
        <div id="application-process" className="mb-16 scroll-mt-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Application Process</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Join our startup program in three simple steps
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: FileText,
                title: "1. Submit Application",
                description:
                  "Schedule a call with our team to discuss your startup, your use case for Swarms AI, and which program tier is right for you.",
                link: "https://cal.com/swarms",
                linkText: "Schedule Application Call",
              },
              {
                icon: BarChart,
                title: "2. Evaluation",
                description:
                  "Our team will review your application based on your startup's stage, technical needs, and strategic alignment with Swarms AI.",
                link: "#program-tiers",
                linkText: "Review Eligibility",
              },
              {
                icon: Rocket,
                title: "3. Onboarding",
                description:
                  "Approved startups will be onboarded to the program, receive their credits, and be connected with their dedicated support resources.",
                link: "#technical-support",
                linkText: "View Support Resources",
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
                        <a href={step.link}>
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

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mx-auto max-w-[800px]">
              Common questions about the Swarms AI Startup Program
            </p>
          </div>

          <CardWrapper className="p-8">
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  question: "How long do the platform credits last?",
                  answer: "Platform credits are valid for 12 months from the date of enrollment in the program.",
                },
                {
                  question: "Can I upgrade to a higher tier later?",
                  answer:
                    "Yes, startups can apply to upgrade to a higher tier as they grow and meet the eligibility requirements.",
                },
                {
                  question: "Is the program available globally?",
                  answer: "Yes, the Swarms AI Startup Program is open to eligible startups worldwide.",
                },
                {
                  question: "Do you take equity in exchange for the program benefits?",
                  answer:
                    "No, we do not take equity in exchange for program benefits. Investment opportunities are separate and optional.",
                },
                {
                  question: "What happens after the 12-month program period?",
                  answer:
                    "Startups can apply for program renewal or transition to our standard pricing with potential discounts based on usage.",
                },
                {
                  question: "How quickly will I hear back after applying?",
                  answer:
                    "We typically review applications within 1-2 weeks and will schedule a follow-up call to discuss next steps.",
                },
              ].map((faq, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-lg font-bold">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardWrapper>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-lg border border-red-900/20 bg-background/30 px-6 py-12 backdrop-blur-sm">
          {/* Glowing orb effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <div className="w-[400px] h-[400px] rounded-full bg-red-500/10 blur-[100px]" />
          </div>

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">
              Ready to Accelerate Your AI Startup?
            </h2>
            <p className="text-muted-foreground mb-8">
              Join the Swarms AI Startup Program today and get the resources, support, and technology you need to build
              the next generation of AI applications.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="https://cal.com/swarms" target="_blank" rel="noopener noreferrer">
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-red-600 text-red-600 hover:bg-red-600/10 hover:scale-105 transition-all duration-300"
                asChild
              >
                <a href="mailto:kye@swarms.world">Contact Startup Team</a>
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
