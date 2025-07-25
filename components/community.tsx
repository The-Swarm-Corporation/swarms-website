"use client"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CardWrapper } from "./card-wrapper"
import { motion } from "framer-motion"
import { 
  Github, 
  Twitter, 
  DiscIcon as Discord, 
  Youtube, 
  Users, 
  BookOpen, 
  Bell, 
  MessageSquare,
  ArrowRight,
  ExternalLink
} from "lucide-react"

export function Community() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const communityBenefits = [
    {
      icon: BookOpen,
      title: "LEARN TO BUILD AGENTS",
      description: "Access comprehensive tutorials, guides, and hands-on workshops to master multi-agent development.",
      gradient: "from-red-500 to-red-600",
      features: ["Step-by-step tutorials", "Best practices", "Code examples", "Workshop sessions"]
    },
    {
      icon: Bell,
      title: "STAY UP TO DATE",
      description: "Get the latest updates on new features, releases, and cutting-edge developments in the Swarms ecosystem.",
      gradient: "from-red-600 to-red-700",
      features: ["Release announcements", "Feature previews", "Roadmap updates", "Beta access"]
    },
    {
      icon: MessageSquare,
      title: "CONNECT WITH BUILDERS",
      description: "Join thousands of developers, share your projects, and collaborate on innovative AI solutions.",
      gradient: "from-red-700 to-red-800",
      features: ["Project showcases", "Code reviews", "Collaboration opportunities", "Mentorship programs"]
    },
    {
      icon: Users,
      title: "EXPERT SUPPORT",
      description: "Get help from the community and core team. Ask questions, share solutions, and grow together.",
      gradient: "from-red-500 to-red-600",
      features: ["Technical support", "Architecture guidance", "Performance optimization", "Troubleshooting"]
    }
  ]

  const socialLinks = [
    {
      name: "Discord",
      url: "https://discord.gg/NHfAfHf9zs",
      icon: Discord,
      color: "bg-[#5865F2] hover:bg-[#5865F2]/90",
      description: "Join our Discord community"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/swarms_corp",
      icon: Twitter,
      color: "bg-[#1DA1F2] hover:bg-[#1DA1F2]/90",
      description: "Follow us on Twitter"
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@kyegomez3242",
      icon: Youtube,
      color: "bg-[#FF0000] hover:bg-[#FF0000]/90",
      description: "Watch tutorials on YouTube"
    },
    {
      name: "GitHub",
      url: "https://github.com/kyegomez/swarms",
      icon: Github,
      color: "bg-[#24292E] hover:bg-[#24292E]/90",
      description: "Star us on GitHub"
    }
  ]

  return (
    <div className="container py-20 md:py-32 px-4 sm:px-6 bg-black relative">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-red-400 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-red-600 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center space-y-6 mb-16 md:mb-20 relative z-10"
      >
        <h2 className="text-4xl font-black tracking-tighter sm:text-5xl md:text-6xl text-white font-orbitron">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
            JOIN OUR COMMUNITY
          </span>
        </h2>
        <div className="w-32 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto" />
        <p className="text-xl text-gray-300 max-w-3xl mx-auto font-light font-orbitron">
          Connect with thousands of developers building the future of AI. Learn, share, and grow together in the most vibrant multi-agent community.
        </p>
      </motion.div>

      {/* Community Benefits Grid */}
      <motion.div
        className="grid gap-8 md:grid-cols-2 relative z-10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
      >
        {communityBenefits.map((benefit, index) => {
          const Icon = benefit.icon
          return (
            <motion.div key={index} variants={item}>
              <CardWrapper className="h-full transition-all duration-500 hover:translate-y-[-8px] hover:scale-[1.02] group">
                <Card className="border-2 border-red-500/20 bg-black/50 backdrop-blur-sm h-full relative overflow-hidden">
                  {/* Animated border */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <CardHeader className="relative z-10">
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${benefit.gradient} flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="absolute -inset-2 bg-red-500/20 blur-xl rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    <CardTitle className="text-2xl text-white font-black mb-2 tracking-wider font-orbitron">
                      {benefit.title}
                    </CardTitle>
                    <CardDescription className="text-gray-300 leading-relaxed text-base font-orbitron mb-6">
                      {benefit.description}
                    </CardDescription>

                    {/* Feature list */}
                    <div className="space-y-2">
                      {benefit.features.map((feat, featIndex) => (
                        <div key={featIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          <span className="text-sm text-gray-300 font-orbitron">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </CardHeader>
                  
                  {/* Hover effect line */}
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-red-500 to-red-600 group-hover:w-full transition-all duration-500" />
                </Card>
              </CardWrapper>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Social Links Section */}
      <motion.div
        className="mt-20 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="bg-black/50 backdrop-blur-sm border-2 border-red-500/20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-black text-white font-orbitron mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">
                CONNECT WITH US
              </span>
            </h3>
            <p className="text-gray-300 font-orbitron max-w-2xl mx-auto">
              Join our growing community of over 20,000 AI agent builders. Choose your preferred platform and start connecting today.
            </p>
          </div>

          {/* Social Links Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {socialLinks.map((social, index) => {
              const Icon = social.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Button
                    size="lg"
                    className={`w-full h-auto p-6 flex flex-col items-center space-y-3 font-orbitron transition-all duration-300 hover:scale-105 ${social.color}`}
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center space-y-3"
                    >
                      <Icon className="h-8 w-8" />
                      <div className="text-center">
                        <div className="font-bold text-lg">{social.name}</div>
                        <div className="text-sm opacity-90">{social.description}</div>
                      </div>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </motion.div>
              )
            })}
          </div>

          {/* Primary CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 hover:scale-105 transform transition-all duration-300 font-bold text-lg px-8 py-6 border-2 border-red-500 shadow-lg shadow-red-500/25 font-orbitron"
              asChild
            >
              <a
                href="https://discord.gg/NHfAfHf9zs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 mx-auto w-fit"
              >
                <Discord className="h-5 w-5" />
                <span>JOIN DISCORD COMMUNITY</span>
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            <p className="text-sm text-gray-400 mt-4 font-orbitron">
              Join 20,000+ developers building the future of AI
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
