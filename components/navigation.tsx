"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  ChevronDown,
  Twitter,
  Github,
  Calendar,
  BookOpen,
  Phone,
  FileText,
  Cloud,
  GraduationCap,
  Users,
  Sparkles,
  DollarSign,
  Award,
  Code,
  Rocket,
  Package,
  Activity,
  Download,
  Building,
  MessageCircle,
  Network,
} from "lucide-react"
import { SiDiscord, SiTelegram } from "react-icons/si"

const Discord = SiDiscord as React.ComponentType<{ className?: string }>
const Telegram = SiTelegram as React.ComponentType<{ className?: string }>
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("platform")
  
  // Add hover state management for dropdowns
  const [hoveredDropdown, setHoveredDropdown] = React.useState<string | null>(null)

  const NavLink = ({
    href,
    children,
    className = "",
    external = false,
  }: {
    href: string
    children: React.ReactNode
    className?: string
    external?: boolean
  }) => (
    <Link
      href={href}
      className={`text-sm font-semibold transition-all duration-300 text-white/85 hover:text-white border border-transparent hover:border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/[0.05] ${className}`}
      onClick={() => setIsOpen(false)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </Link>
  )

  const SocialButton = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
    <Button
      variant="ghost"
      size="icon"
      className="hidden md:inline-flex hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]"
      asChild
    >
      <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
        <Icon className="h-5 w-5" />
      </a>
    </Button>
  )

  // Custom menu item with Apple/Helius style
  const FuturisticMenuItem = ({
    icon: Icon,
    href,
    children,
    isNew = false,
    iconColor = "red",
  }: { icon: any; href: string; children: React.ReactNode; isNew?: boolean; iconColor?: "red" | "neutral" }) => {
    const iconClass = iconColor === "red" ? "text-red-500" : "text-neutral-400"
    const borderHoverClass = iconColor === "red" ? "group-hover:border-red-500/40" : "group-hover:border-neutral-600/50"
    
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
      >
        <div className={`mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 ${borderHoverClass} transition-all duration-200`}>
          <Icon className={`h-4 w-4 ${iconClass}`} />
        </div>
        <div className="flex-1 min-w-0">
          <span className="text-sm font-semibold text-white block">{children}</span>
        </div>
        {isNew && <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full border border-red-500/30">New</span>}
      </a>
    )
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-[9998] w-full pt-2 sm:pt-3 md:pt-4 pb-2 sm:pb-3 md:pb-4 scroll-optimized">
      <div className="container mx-auto max-w-[1600px] px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 md:px-6 rounded-xl sm:rounded-2xl bg-neutral-800/50 backdrop-blur-md border border-neutral-700/40 shadow-xl w-full">
        <div className="flex-shrink-0 mr-3 sm:mr-4 md:mr-6">
          <Link href="/" className="flex items-center group">
            <div className="relative w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/logo.svg"
                alt="Swarms AI Multi-Agent Framework Logo - Enterprise-Grade Autonomous Agent Infrastructure"
                width={32}
                height={32}
                className="transition-opacity duration-300 group-hover:opacity-80"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex lg:space-x-4 xl:space-x-6 flex-1 items-center">
          
          <NavLink href="/pricing">Pricing</NavLink>
          
          {/* Docs Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("docs")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-semibold transition-all duration-300 text-white/85 hover:text-white border border-transparent hover:border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
              Docs
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "docs" ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {hoveredDropdown === "docs" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-[300px] rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800/60 shadow-2xl overflow-hidden z-[9999]"
                >
                  <div className="p-2 relative">
                    <a
                      href="https://docs.swarms.world"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <BookOpen className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms Python Docs</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Framework documentation</p>
                      </div>
                    </a>
                    <a
                      href="https://docs.swarms.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Code className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms API Docs</span>
                        <p className="text-xs text-neutral-400 mt-0.5">API reference at docs.swarms.ai</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("products")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-semibold transition-all duration-300 text-white/85 hover:text-white border border-transparent hover:border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
              Products
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "products" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "products" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-[340px] rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800/60 shadow-2xl overflow-hidden z-[9999]"
                >
                  <div className="p-2 relative">
                    <Link href="/products" className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative">
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Package className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Products Overview</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Explore all products</p>
                      </div>
                    </Link>
                    <Link href="/simulations" className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative">
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Network className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Simulations</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Multi-agent simulations</p>
                      </div>
                    </Link>
                    <a
                      href="https://github.com/kyegomez/swarms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Github className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms Python</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Core Python framework</p>
                      </div>
                    </a>
                    <Link href="/api" className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative">
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Code className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms API</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Hosted API service</p>
                      </div>
                    </Link>
                    <a
                      href="https://github.com/The-Swarm-Corporation/swarms-rs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Rocket className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms RS</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Rust framework</p>
                      </div>
                    </a>
                    <a
                      href="https://swarms.world"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Sparkles className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Swarms Marketplace</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Buy & sell agents</p>
                      </div>
                    </a>
                    <a
                      href="https://swarms.world/agent-economy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <DollarSign className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Agent Economy</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Track marketplace performance</p>
                      </div>
                    </a>
                    <a
                      href="https://swarms.world/launch"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Rocket className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Launch on Marketplace</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Publish your agents</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>



          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("resources")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-semibold transition-all duration-300 text-white/85 hover:text-white border border-transparent hover:border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
              Resources
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-full left-0 mt-2 w-[650px] max-w-[calc(100vw-3rem)] rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800/60 shadow-2xl overflow-hidden z-[9999]"
                >
                  <div className="flex h-full">
                    <Tabs defaultValue="platform" className="w-full flex h-[320px]" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="flex flex-col w-[180px] h-full justify-start space-y-1 bg-neutral-900/50 backdrop-blur-sm border-r border-neutral-800/50 p-3 rounded-none">
                        {[
                          { id: "platform", label: "Platform" },
                          { id: "open_source", label: "Open Source" },
                          { id: "research", label: "Research" },
                          { id: "community", label: "Community" },
                          { id: "programs", label: "Programs" },
                          { id: "learn", label: "Learn" },
                        ].map((tab) => (
                          <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className={`
                              w-full
                              justify-start
                              px-3
                              py-2
                              data-[state=active]:bg-white/[0.08] 
                              data-[state=active]:text-white 
                              data-[state=active]:border-neutral-700/50
                              transition-all duration-200 ease-in-out
                              border border-transparent
                              rounded-lg
                              relative
                              text-sm
                              font-medium
                              hover:bg-white/[0.05]
                              text-neutral-400
                            `}
                          >
                            {tab.label}
                            {activeTab === tab.id && (
                              <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute left-0 top-0 bottom-0 w-[2px] bg-red-500/60 rounded-full"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              />
                            )}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <div className="flex-1 p-4 bg-transparent overflow-y-auto">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                          >
                            <TabsContent value="platform" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={BookOpen} href="https://ecosystem.swarms.world" iconColor="red">
                                Ecosystem Hub
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Cloud} href="https://cloud.swarms.ai" iconColor="red">
                                Cloud Platform
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Activity} href="https://status.swarms.ai" iconColor="red">
                                Status Page
                              </FuturisticMenuItem>
                            </TabsContent>

                            <TabsContent value="open_source" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={Github} href="https://github.com/kyegomez/swarms" iconColor="red">
                                Main Repository
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Code} href="https://github.com/The-Swarm-Corporation" iconColor="red">
                                Organization
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Code} href="/open-source" iconColor="red">
                                Open Source
                              </FuturisticMenuItem>
                            </TabsContent>

                            <TabsContent value="research" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={BookOpen} href="/research" iconColor="red">
                                Research
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={FileText} href="/research-papers" iconColor="red">
                                Research Papers
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Sparkles} href="/applications" iconColor="red">
                                Applications
                              </FuturisticMenuItem>
                            </TabsContent>

                            <TabsContent value="community" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={Discord} href="https://discord.gg/EamjgSaEQf" iconColor="red">
                                Discord Community
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Telegram} href="https://t.me/swarmsgroupchat" iconColor="red">
                                Telegram Group
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Twitter} href="https://x.com/swarms_corp" iconColor="red">
                                Twitter/X
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Calendar} href="https://lu.ma/swarms_calendar" iconColor="red">
                                Events Calendar
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Phone} href="https://cal.com/swarms" iconColor="red">
                                Book a Call
                              </FuturisticMenuItem>
                            </TabsContent>

                            <TabsContent value="programs" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={Award} href="/programs" iconColor="red">
                                Research Program
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Rocket} href="https://www.swarms.ai/programs/startups" iconColor="red">
                                Startup Program
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={DollarSign} href="https://grants.swarms.world" isNew={true} iconColor="red">
                                Grants Program
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Award} href="https://swarms.world/foundry" iconColor="red">
                                Foundry Program
                              </FuturisticMenuItem>
                            </TabsContent>

                            <TabsContent value="learn" className="space-y-1 mt-0 h-full">
                              <FuturisticMenuItem icon={FileText} href="https://docs.swarms.world" iconColor="red">
                                Documentation
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Download} href="/installation" iconColor="red">
                                Installation Guide
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={GraduationCap} href="https://course.swarms.world" iconColor="red">
                                Swarms Course
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={Users} href="https://contributors.swarms.world" iconColor="red">
                                Contributors Portal
                              </FuturisticMenuItem>
                              <FuturisticMenuItem icon={FileText} href="/blog" iconColor="red">
                                Blog
                              </FuturisticMenuItem>
                            </TabsContent>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </Tabs>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Socials Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("socials")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-semibold transition-all duration-300 text-white/85 hover:text-white border border-transparent hover:border-white/10 px-3 py-1.5 rounded-lg hover:bg-white/[0.05]">
              Socials
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "socials" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "socials" && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-2 w-[260px] rounded-2xl bg-neutral-950/95 backdrop-blur-2xl border border-neutral-800/60 shadow-2xl overflow-hidden z-[9999]"
                >
                  <div className="p-2 relative">
                    <a
                      href="https://x.com/swarms_corp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Twitter className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Twitter/X</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Follow us</p>
                      </div>
                    </a>
                    <a
                      href="https://discord.gg/EamjgSaEQf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Discord className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Discord</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Join community</p>
                      </div>
                    </a>
                    <a
                      href="https://www.linkedin.com/company/swarms-corp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Building className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">LinkedIn</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Professional network</p>
                      </div>
                    </a>
                    <a
                      href="https://medium.com/@kyeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <FileText className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Medium</span>
                        <p className="text-xs text-neutral-400 mt-0.5">@kyeg</p>
                      </div>
                    </a>
                    <a
                      href="https://www.youtube.com/@kyegomez3242"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <MessageCircle className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">YouTube</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Watch tutorials</p>
                      </div>
                    </a>
                    <a
                      href="https://t.me/swarmsgroupchat"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                    >
                      <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                        <Telegram className="h-4 w-4 text-red-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-semibold text-white block">Telegram</span>
                        <p className="text-xs text-neutral-400 mt-0.5">Join group chat</p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <div className="flex items-center justify-end space-x-1 sm:space-x-2 flex-shrink-0 ml-auto">

          <Button 
            variant="outline"
            className="hidden md:inline-flex rounded-xl text-xs sm:text-sm" 
            asChild
          >
            <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5">
              <Github className="h-4 w-4" />
              <span className="text-sm font-semibold">5.5k</span>
            </a>
          </Button>

          <Button variant="outline" className="hidden md:inline-flex rounded-xl text-xs sm:text-sm px-3 sm:px-4" asChild>
            <a href="https://cal.com/swarms/swarms-onboarding-session?overlayCalendar=true" target="_blank" rel="noopener noreferrer">
              <Calendar className="mr-2 h-4 w-4" />
              Get demo
            </a>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-red-500/10 border border-transparent hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)] h-9 w-9 sm:h-10 sm:w-10">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] max-w-[400px] border border-neutral-700/40 bg-neutral-800/50 backdrop-blur-md shadow-xl overflow-y-auto p-0"
            >
              <SheetHeader className="px-4 sm:px-6 pt-6 pb-4 border-b border-neutral-700/40">
                <SheetTitle className="text-lg sm:text-xl text-white font-semibold">Menu</SheetTitle>
              </SheetHeader>
              <div className="px-4 sm:px-6 py-4 sm:py-6 space-y-3 sm:space-y-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                <Link
                  href="/"
                  className="block text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg border border-transparent hover:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="block text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg border border-transparent hover:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <a
                  href="https://docs.swarms.world"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg border border-transparent hover:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Docs
                </a>
                <Link
                  href="/blog"
                  className="block text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg border border-transparent hover:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white/60 px-3 flex items-center">
                    <span>Products</span>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>
                  <Link
                    href="/products"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Products Overview
                  </Link>
                  <Link
                    href="/simulations"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Network className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Simulations
                  </Link>
                  <a
                    href="https://github.com/kyegomez/swarms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Swarms Python
                  </a>
                  <a
                    href="https://docs.swarms.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Code className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Swarms API
                  </a>
                  <a
                    href="https://github.com/The-Swarm-Corporation/swarms-rs"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Rocket className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Swarms RS
                  </a>
                  <a
                    href="https://swarms.world"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Swarms Marketplace
                  </a>
                  <a
                    href="https://swarms.world/agent-economy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <DollarSign className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Agent Economy
                  </a>
                  <a
                    href="https://swarms.world/launch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg flex items-center border border-transparent hover:border-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    <Rocket className="mr-3 h-4 w-4 text-white/60 flex-shrink-0" />
                    Launch on Marketplace
                  </a>
                </div>

                <Link
                  href="/hiring"
                  className="block text-sm font-semibold text-white/85 hover:text-white transition-all duration-300 hover:bg-white/[0.05] p-3 rounded-lg border border-transparent hover:border-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>

                {/* Mobile Resources Section with Tabs */}
                <div className="space-y-3">
                  <div className="text-sm font-semibold text-white/60 px-3 flex items-center">
                    <span>Resources</span>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-white/20 to-transparent"></div>
                  </div>

                  <Tabs defaultValue="platform" className="w-full">
                    <TabsList className="w-full grid grid-cols-2 sm:grid-cols-3 gap-1 bg-neutral-900/50 backdrop-blur-sm border border-neutral-700/40 rounded-lg mb-3 h-auto p-1">
                      <TabsTrigger
                        value="platform"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Platform
                      </TabsTrigger>
                      <TabsTrigger
                        value="open_source"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Open Source
                      </TabsTrigger>
                      <TabsTrigger
                        value="research"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Research
                      </TabsTrigger>
                      <TabsTrigger
                        value="community"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Community
                      </TabsTrigger>
                      <TabsTrigger
                        value="programs"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Programs
                      </TabsTrigger>
                      <TabsTrigger
                        value="learn"
                        className="text-xs data-[state=active]:bg-white/[0.08] data-[state=active]:text-white data-[state=active]:border-neutral-700/50 border border-transparent hover:bg-white/[0.05] hover:border-white/10 text-neutral-400 transition-all duration-200"
                      >
                        Learn
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="platform" className="space-y-1 mt-0">
                      <a
                        href="https://ecosystem.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <BookOpen className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Ecosystem Hub</span>
                        </div>
                      </a>
                      <a
                        href="https://cloud.swarms.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Cloud className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Cloud Platform</span>
                        </div>
                      </a>
                      <a
                        href="https://status.swarms.ai"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Activity className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Status Page</span>
                        </div>
                      </a>
                    </TabsContent>

                    <TabsContent value="open_source" className="space-y-1 mt-0">
                      <a
                        href="https://github.com/kyegomez/swarms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Github className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Main Repository</span>
                        </div>
                      </a>
                      <a
                        href="https://github.com/The-Swarm-Corporation"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Code className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Organization</span>
                        </div>
                      </a>
                      <Link
                        href="/open-source"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Code className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Open Source</span>
                        </div>
                      </Link>
                    </TabsContent>

                    <TabsContent value="research" className="space-y-1 mt-0">
                      <Link
                        href="/research"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <BookOpen className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Research</span>
                        </div>
                      </Link>
                      <Link
                        href="/research-papers"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <FileText className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Research Papers</span>
                        </div>
                      </Link>
                      <Link
                        href="/applications"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Sparkles className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Applications</span>
                        </div>
                      </Link>
                    </TabsContent>

                    <TabsContent value="community" className="space-y-1 mt-0">
                      <a
                        href="https://discord.gg/EamjgSaEQf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Discord className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Discord Community</span>
                        </div>
                      </a>
                      <a
                        href="https://x.com/swarms_corp"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Twitter className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Twitter/X</span>
                        </div>
                      </a>
                      <a
                        href="https://lu.ma/swarms_calendar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Calendar className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Events Calendar</span>
                        </div>
                      </a>
                      <a
                        href="https://cal.com/swarms"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Phone className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Book a Call</span>
                        </div>
                      </a>
                      <a
                        href="https://t.me/swarmsgroupchat"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Telegram className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Telegram Group</span>
                        </div>
                      </a>
                    </TabsContent>

                    <TabsContent value="programs" className="space-y-1 mt-0">
                      <Link
                        href="/programs"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Award className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Research Program</span>
                        </div>
                      </Link>
                      <a
                        href="https://www.swarms.ai/programs/startups"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Rocket className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Startup Program</span>
                        </div>
                      </a>
                      <a
                        href="https://swarms.world/foundry"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Award className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Foundry Program</span>
                        </div>
                      </a>
                      <a
                        href="https://grants.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <DollarSign className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Grants Program</span>
                          <span className="ml-2 text-xs px-2 py-0.5 bg-red-500/20 text-red-500 rounded-full border border-red-500/30">New</span>
                        </div>
                      </a>
                    </TabsContent>

                    <TabsContent value="learn" className="space-y-1 mt-0">
                      <a
                        href="https://docs.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <FileText className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Documentation</span>
                        </div>
                      </a>
                      <Link
                        href="/installation"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Download className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Installation Guide</span>
                        </div>
                      </Link>
                      <a
                        href="https://course.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <GraduationCap className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Swarms Course</span>
                        </div>
                      </a>
                      <a
                        href="https://contributors.swarms.world"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <Users className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Contributors Portal</span>
                        </div>
                      </a>
                      <Link
                        href="/blog"
                        className="group flex cursor-pointer items-center rounded-xl hover:bg-white/[0.05] transition-all duration-200 p-3 relative"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="mr-3 h-9 w-9 flex items-center justify-center rounded-lg bg-neutral-800/50 border border-neutral-700/30 group-hover:border-red-500/40 transition-all duration-200">
                          <FileText className="h-4 w-4 text-red-500" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-semibold text-white block">Blog</span>
                        </div>
                      </Link>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="border-t border-neutral-700/40 pt-6">
                  <div className="flex justify-center space-x-4 mb-6">
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                      <a
                        href="https://x.com/swarms_corp"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow us on Twitter"
                      >
                        <Twitter className="h-5 w-5 text-white/85 hover:text-white" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                      <a
                        href="https://discord.gg/EamjgSaEQf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Join our Discord"
                      >
                        <Discord className="h-5 w-5 text-white/85 hover:text-white" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-white/10 hover:bg-white/[0.05] transition-all duration-300">
                      <a
                        href="https://github.com/kyegomez/swarms"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-5 w-5 text-white/85 hover:text-white" />
                      </a>
                    </Button>
                  </div>
                  {/* Add Language Switcher to mobile menu */}
                  <div className="flex justify-center">
                    {/* Language switcher removed */}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
        </div>
      </div>
    </header>
  )
}
