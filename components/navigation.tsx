"use client"

import * as React from "react"
import Link from "next/link"
import {
  Menu,
  ChevronDown,
  Twitter,
  DiscIcon as Discord,
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
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeTab, setActiveTab] = React.useState("ecosystem")
  
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
      className={`text-sm font-medium transition-all duration-300 hover:text-red-500 hover:shadow-red-500/50 hover:text-shadow-glow border border-transparent hover:border-red-500/30 px-3 py-1.5 rounded-md hover:bg-red-500/5 ${className}`}
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

  // Custom menu item with enhanced hover effects
  const FuturisticMenuItem = ({
    icon: Icon,
    href,
    children,
    isNew = false,
  }: { icon: any; href: string; children: React.ReactNode; isNew?: boolean }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex cursor-pointer items-center w-full px-3 py-2 rounded-md transition-all duration-300 hover:bg-red-500/10 hover:backdrop-blur-sm group relative overflow-hidden border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/0 to-red-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
      <div className="mr-3 h-8 w-8 flex items-center justify-center rounded-md bg-background/50 border border-red-500/30 group-hover:border-red-500/60 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.4)] transition-all duration-300">
        <Icon className="h-4 w-4 text-red-500 group-hover:text-red-400 transition-colors duration-300" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium group-hover:text-red-500 transition-colors duration-300">
          {children}
        </span>
      </div>
      {isNew && <span className="ml-2 text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full border border-red-500/30">New</span>}
      <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className="h-3 w-3 text-red-500" />
      </div>
    </a>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-red-500/30 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-lg shadow-red-500/10">
      <div className="container flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <div className="mr-6 flex">
          <Link href="/" className="flex items-center group">
            <div className="relative w-8 h-8 transition-transform duration-300 group-hover:scale-110">
              <Image
                src="https://raw.githubusercontent.com/kyegomez/swarms/1899c807eb3874e095b677fbd6b9c877e7746918/swarms_logo_svg.svg"
                alt="Swarms Logo"
                width={32}
                height={32}
                className="transition-opacity duration-300 group-hover:opacity-80"
              />
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:space-x-4 xl:space-x-6">
          
          <NavLink href="/pricing">Pricing</NavLink>
          
          {/* Products Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("products")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-medium transition-all duration-300 hover:text-red-500 border border-transparent hover:border-red-500/30 px-3 py-1.5 rounded-md hover:bg-red-500/5">
              Products
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "products" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "products" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 mt-2 w-[280px] backdrop-blur-md bg-background/95 border-2 border-red-500/30 shadow-xl shadow-red-500/10 rounded-lg overflow-hidden z-50"
                >
                  <div className="p-2 space-y-1">
                    <Link href="/products" className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md">
                      <Package className="mr-3 h-4 w-4 text-red-500" />
                      Products Overview
                    </Link>
                    <Link href="/simulations" className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md">
                      <Network className="mr-3 h-4 w-4 text-red-500" />
                      Simulations
                    </Link>
                    <a
                      href="https://github.com/kyegomez/swarms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Github className="mr-3 h-4 w-4 text-red-500" />
                      Swarms Python
                    </a>
                    <Link href="/api" className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md">
                      <Code className="mr-3 h-4 w-4 text-red-500" />
                      Swarms API
                    </Link>
                    <a
                      href="https://github.com/The-Swarm-Corporation/swarms-rs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Rocket className="mr-3 h-4 w-4 text-red-500" />
                      Swarms RS
                    </a>
                    <a
                      href="https://swarms.world"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Sparkles className="mr-3 h-4 w-4 text-red-500" />
                      Swarms Marketplace
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
            <button className="flex items-center text-sm font-medium transition-all duration-300 hover:text-red-500 border border-transparent hover:border-red-500/30 px-3 py-1.5 rounded-md hover:bg-red-500/5 group">
              <span className="group-hover:text-shadow-glow">Resources</span>
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "resources" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "resources" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-[360px] backdrop-blur-md bg-background/80 border-2 border-red-500/30 shadow-xl shadow-red-500/10 rounded-lg overflow-hidden z-50"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-background/0 to-background/0 pointer-events-none"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                  <div className="p-4 relative">
                    <Tabs defaultValue="ecosystem" className="w-full" value={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="grid w-full grid-cols-4 mb-4 bg-background/30 backdrop-blur-md border-2 border-red-500/20 p-1 rounded-lg">
                        {[
                          { id: "ecosystem", label: "Ecosystem" },
                          { id: "community", label: "Community" },
                          { id: "programs", label: "Programs" },
                          { id: "tutorials", label: "Tutorials" },
                        ].map((tab) => (
                          <TabsTrigger
                            key={tab.id}
                            value={tab.id}
                            className={`
                              data-[state=active]:bg-red-500/10 
                              data-[state=active]:text-red-500 
                              data-[state=active]:shadow-[0_0_10px_rgba(239,68,68,0.2)] 
                              data-[state=active]:border-red-500/30
                              data-[state=active]:backdrop-blur-md
                              transition-all duration-300 ease-in-out
                              border border-transparent
                              rounded-md
                              relative
                              overflow-hidden
                              text-xs
                              hover:border-red-500/20
                            `}
                          >
                            {tab.label}
                            {activeTab === tab.id && (
                              <motion.div
                                layoutId="activeTabIndicator"
                                className="absolute bottom-0 left-0 right-0 h-[2px] bg-red-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                              />
                            )}
                          </TabsTrigger>
                        ))}
                      </TabsList>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeTab}
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <TabsContent value="ecosystem" className="space-y-2 mt-2 relative">
                            <FuturisticMenuItem icon={BookOpen} href="https://ecosystem.swarms.world">
                              Ecosystem Hub
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Cloud} href="https://cloud.swarms.ai">
                              Cloud Platform
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Activity} href="https://status.swarms.ai">
                              Status Page
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Github} href="https://github.com/kyegomez/swarms">
                              Main Repository
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Code} href="https://github.com/The-Swarm-Corporation">
                              Organization
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={DollarSign} href="https://grants.swarms.world" isNew={true}>
                              Grants Program
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Code} href="/open-source">
                              Open Source
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Sparkles} href="/applications">
                              Applications
                            </FuturisticMenuItem>
                          </TabsContent>

                          <TabsContent value="community" className="space-y-2 mt-2 relative">
                            <FuturisticMenuItem icon={Discord} href="https://discord.gg/EamjgSaEQf">
                              Discord Community
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Twitter} href="https://x.com/swarms_corp">
                              Twitter/X
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Calendar} href="https://lu.ma/swarms_calendar">
                              Events Calendar
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Phone} href="https://cal.com/swarms">
                              Book a Call
                            </FuturisticMenuItem>
                          </TabsContent>

                          <TabsContent value="programs" className="space-y-2 mt-2 relative">
                            <FuturisticMenuItem icon={Award} href="/programs">
                              Research Program
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Rocket} href="https://www.swarms.ai/programs/startups">
                              Startup Program
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={DollarSign} href="https://grants.swarms.world" isNew={true}>
                              Grants Program
                            </FuturisticMenuItem>
                          </TabsContent>

                          <TabsContent value="tutorials" className="space-y-2 mt-2 relative">
                            <FuturisticMenuItem icon={FileText} href="https://docs.swarms.world">
                              Documentation
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Download} href="/installation">
                              Installation Guide
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={GraduationCap} href="https://course.swarms.world">
                              Swarms Course
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={Users} href="https://contributors.swarms.world">
                              Contributors Portal
                            </FuturisticMenuItem>
                            <FuturisticMenuItem icon={FileText} href="/blog">
                              Blog
                            </FuturisticMenuItem>
                          </TabsContent>
                        </motion.div>
                      </AnimatePresence>
                    </Tabs>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">

          <Button className="hidden md:inline-flex bg-red-600 hover:bg-red-700 neon-glow border-2 border-red-500/50 hover:border-red-400/70 transition-all duration-300 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)]" asChild>
            <a href="https://github.com/kyegomez/swarms" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>

          <Button
            variant="ghost"
            className="hidden md:inline-flex hover:bg-red-500/10 hover:text-red-500 transition-all duration-300 border border-transparent hover:border-red-500/40 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]"
            asChild
          >
            <a href="https://docs.swarms.world" target="_blank" rel="noopener noreferrer">
              Docs
            </a>
          </Button>

          {/* Socials Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setHoveredDropdown("socials")}
            onMouseLeave={() => setHoveredDropdown(null)}
          >
            <button className="flex items-center text-sm font-medium transition-all duration-300 hover:text-red-500 border border-transparent hover:border-red-500/30 px-3 py-1.5 rounded-md hover:bg-red-500/5">
              Socials
              <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${hoveredDropdown === "socials" ? "rotate-180" : ""}`} />
            </button>
            
            <AnimatePresence>
              {hoveredDropdown === "socials" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full right-0 mt-2 w-[200px] backdrop-blur-md bg-background/95 border-2 border-red-500/30 shadow-xl shadow-red-500/10 rounded-lg overflow-hidden z-50"
                >
                  <div className="p-2 space-y-1">
                    <a
                      href="https://x.com/swarms_corp"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Twitter className="mr-3 h-4 w-4 text-red-500" />
                      Twitter/X
                    </a>
                    <a
                      href="https://discord.gg/EamjgSaEQf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Discord className="mr-3 h-4 w-4 text-red-500" />
                      Discord
                    </a>
                    <a
                      href="https://www.linkedin.com/company/swarms-corp/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <Building className="mr-3 h-4 w-4 text-red-500" />
                      LinkedIn
                    </a>
                    <a
                      href="https://www.youtube.com/@kyegomez3242"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex cursor-pointer items-center border border-transparent hover:border-red-500/30 hover:bg-red-500/10 transition-all duration-300 p-2 rounded-md"
                    >
                      <MessageCircle className="mr-3 h-4 w-4 text-red-500" />
                      YouTube
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-red-500/10 border border-transparent hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[400px] border-2 border-red-500/30 bg-background/95 backdrop-blur-md shadow-xl shadow-red-500/10"
            >
              <SheetHeader>
                <SheetTitle className="cyber-text border-b-2 border-red-500/30 pb-2">Menu</SheetTitle>
              </SheetHeader>
              <div className="grid gap-4 py-6">
                <Link
                  href="/"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/pricing"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="https://docs.swarms.world"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Docs
                </Link>
                <Link
                  href="/blog"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                <div className="space-y-3">
                  <div className="text-sm font-medium px-3 flex items-center">
                    <span>Products</span>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent"></div>
                  </div>
                  <Link
                    href="/products"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Package className="mr-3 h-4 w-4 text-red-500" />
                    Products Overview
                  </Link>
                  <Link
                    href="/simulations"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Network className="mr-3 h-4 w-4 text-red-500" />
                    Simulations
                  </Link>
                  <Link
                    href="https://github.com/kyegomez/swarms"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Github className="mr-3 h-4 w-4 text-red-500" />
                    Swarms Python
                  </Link>
                  <Link
                    href="https://docs.swarms.ai"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Code className="mr-3 h-4 w-4 text-red-500" />
                    Swarms API
                  </Link>
                  <Link
                    href="https://github.com/The-Swarm-Corporation/swarms-rs"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Rocket className="mr-3 h-4 w-4 text-red-500" />
                    Swarms RS
                  </Link>
                  <Link
                    href="https://swarms.world"
                    className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md block flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                    onClick={() => setIsOpen(false)}
                  >
                    <Sparkles className="mr-3 h-4 w-4 text-red-500" />
                    Swarms Marketplace
                  </Link>
                </div>

                <Link
                  href="https://swarms.world"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Marketplace
                </Link>

                <Link
                  href="/hiring"
                  className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>

                {/* Mobile Resources Section with Tabs */}
                <div className="space-y-3">
                  <div className="text-sm font-medium px-3 flex items-center">
                    <span>Resources</span>
                    <div className="ml-2 h-px flex-1 bg-gradient-to-r from-red-500/30 to-transparent"></div>
                  </div>

                  <Tabs defaultValue="ecosystem" className="w-full">
                    <TabsList className="w-full grid grid-cols-4 bg-background/30 backdrop-blur-sm border-2 border-red-500/20 rounded-md mb-3">
                      <TabsTrigger
                        value="ecosystem"
                        className="text-xs data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:border-red-500/30 border border-transparent hover:border-red-500/20 transition-all duration-300"
                      >
                        Ecosystem
                      </TabsTrigger>
                      <TabsTrigger
                        value="community"
                        className="text-xs data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:border-red-500/30 border border-transparent hover:border-red-500/20 transition-all duration-300"
                      >
                        Community
                      </TabsTrigger>
                      <TabsTrigger
                        value="programs"
                        className="text-xs data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:border-red-500/30 border border-transparent hover:border-red-500/20 transition-all duration-300"
                      >
                        Programs
                      </TabsTrigger>
                      <TabsTrigger
                        value="tutorials"
                        className="text-xs data-[state=active]:bg-red-500/10 data-[state=active]:text-red-500 data-[state=active]:border-red-500/30 border border-transparent hover:border-red-500/20 transition-all duration-300"
                      >
                        Tutorials
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ecosystem" className="space-y-2 mt-0">
                      <Link
                        href="https://ecosystem.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <BookOpen className="mr-3 h-4 w-4 text-red-500" />
                        Ecosystem Hub
                      </Link>
                      <Link
                        href="https://status.swarms.ai"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Activity className="mr-3 h-4 w-4 text-red-500" />
                        Status Page
                      </Link>
                      <Link
                        href="https://github.com/kyegomez/swarms"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Github className="mr-3 h-4 w-4 text-red-500" />
                        Main Repository
                      </Link>
                      <Link
                        href="https://github.com/The-Swarm-Corporation"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Code className="mr-3 h-4 w-4 text-red-500" />
                        Organization
                      </Link>
                      <Link
                        href="https://grants.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <DollarSign className="mr-3 h-4 w-4 text-red-500" />
                        Grants Program
                        <span className="ml-2 text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full border border-red-500/30">New</span>
                      </Link>
                      <Link
                        href="/open-source"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Code className="mr-3 h-4 w-4 text-red-500" />
                        Open Source
                      </Link>
                      <Link
                        href="/applications"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Sparkles className="mr-3 h-4 w-4 text-red-500" />
                        Applications
                      </Link>
                    </TabsContent>

                    <TabsContent value="community" className="space-y-2 mt-0">
                      <Link
                        href="https://discord.gg/EamjgSaEQf"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Discord className="mr-3 h-4 w-4 text-red-500" />
                        Discord Community
                      </Link>
                      <Link
                        href="https://x.com/swarms_corp"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Twitter className="mr-3 h-4 w-4 text-red-500" />
                        Twitter/X
                      </Link>
                      <Link
                        href="https://lu.ma/swarms_calendar"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Calendar className="mr-3 h-4 w-4 text-red-500" />
                        Events Calendar
                      </Link>
                      <Link
                        href="https://cal.com/swarms"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Phone className="mr-3 h-4 w-4 text-red-500" />
                        Book a Call
                      </Link>
                    </TabsContent>

                    <TabsContent value="programs" className="space-y-2 mt-0">
                      <Link
                        href="/programs"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Award className="mr-3 h-4 w-4 text-red-500" />
                        Research Program
                      </Link>
                      <Link
                        href="https://www.swarms.ai/programs/startups"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Rocket className="mr-3 h-4 w-4 text-red-500" />
                        Startup Program
                      </Link>
                      <Link
                        href="https://grants.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <DollarSign className="mr-3 h-4 w-4 text-red-500" />
                        Grants Program
                        <span className="ml-2 text-xs px-2 py-1 bg-red-500/20 text-red-500 rounded-full border border-red-500/30">New</span>
                      </Link>
                    </TabsContent>

                    <TabsContent value="tutorials" className="space-y-2 mt-0">
                      <Link
                        href="https://docs.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <FileText className="mr-3 h-4 w-4 text-red-500" />
                        Documentation
                      </Link>
                      <Link
                        href="/installation"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Download className="mr-3 h-4 w-4 text-red-500" />
                        Installation Guide
                      </Link>
                      <Link
                        href="https://course.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <GraduationCap className="mr-3 h-4 w-4 text-red-500" />
                        Swarms Course
                      </Link>
                      <Link
                        href="https://contributors.swarms.world"
                        className="text-sm font-medium hover:text-red-500 transition-all duration-300 hover:bg-red-500/10 p-3 rounded-md flex items-center border border-transparent hover:border-red-500/30 hover:shadow-[0_0_8px_rgba(239,68,68,0.2)]"
                        onClick={() => setIsOpen(false)}
                      >
                        <Users className="mr-3 h-4 w-4 text-red-500" />
                        Contributors Portal
                      </Link>
                    </TabsContent>
                  </Tabs>
                </div>

                <div className="border-t-2 border-red-500/30 pt-6">
                  <div className="flex justify-center space-x-4 mb-6">
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                      <a
                        href="https://x.com/swarms_corp"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Follow us on Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                      <a
                        href="https://discord.gg/EamjgSaEQf"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Join our Discord"
                      >
                        <Discord className="h-5 w-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild className="border border-transparent hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-300 hover:shadow-[0_0_8px_rgba(239,68,68,0.3)]">
                      <a
                        href="https://github.com/kyegomez/swarms"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View on GitHub"
                      >
                        <Github className="h-5 w-5" />
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
    </header>
  )
}
