import Link from "next/link"
import {
  Twitter,
  MessageCircle,
  FileText,
  BookOpen,
  Send,
  Github,
  Package,
  Code,
  Rocket,
  Sparkles,
  Award,
  DollarSign,
  GraduationCap,
  Users,
  Calendar,
  Phone,
  Cloud,
  Activity,
  Building,
  Network,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/50 bg-black text-white">
      <div className="relative">
        {/* Glowing line at the top */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />

        <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Side - Logo and Mission */}
            <div className="lg:w-1/3 xl:w-1/4">
              <div className="flex flex-col gap-4">
                <img src="/logo.svg" alt="Swarms Logo" className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">Swarms</h2>
                  <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                    Enabling organizations to become fully autonomous through multi-agent collaboration.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Side - All Links */}
            <div className="lg:w-2/3 xl:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Products */}
            <div className="relative p-3 sm:p-4">
              <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-600" />
                Products
              </h3>

              <ul className="space-y-1 sm:space-y-2">
                {[
                  { name: "Products Overview", icon: Package, url: "/products" },
                  { name: "Simulations", icon: Network, url: "/simulations" },
                  { name: "Swarms Python", icon: Github, url: "https://github.com/kyegomez/swarms" },
                  {
                    name: "Swarms API",
                    icon: Code,
                    url: "https://docs.swarms.ai",
                  },
                  { name: "Swarms RS", icon: Rocket, url: "https://github.com/The-Swarm-Corporation/swarms-rs" },
                  { name: "Swarms Marketplace", icon: Sparkles, url: "https://swarms.world" },
                ].map((item, index) => (
                  <li key={index} className="group">
                    <Link
                      href={item.url}
                      target={item.url.startsWith("http") ? "_blank" : undefined}
                      rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center rounded-lg bg-transparent p-2 sm:p-2 text-sm transition-all duration-300 hover:bg-neutral-900/30 min-h-[44px] touch-manipulation"
                    >
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-neutral-800/50 transition-colors duration-300 group-hover:bg-neutral-800/70 flex-shrink-0">
                          <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                        </div>
                        <span className="text-xs text-gray-300 transition-colors duration-300 group-hover:text-gray-100 leading-tight truncate">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources & Programs */}
            <div className="relative p-3 sm:p-4">
              <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-600" />
                Resources & Programs
              </h3>

              <div className="grid gap-1 sm:gap-2">
                {[
                  { name: "Documentation", icon: BookOpen, url: "https://docs.swarms.world" },
                  { name: "Research Program", icon: Award, url: "/programs" },
                  { name: "Research", icon: BookOpen, url: "/research" },
                  { name: "Research Papers", icon: FileText, url: "/research-papers" },
                  { name: "Startup Program", icon: Rocket, url: "https://www.swarms.ai/programs/startups" },
                  { name: "Grants Program", icon: DollarSign, url: "https://grants.swarms.world", isNew: true },
                  { name: "Ecosystem Hub", icon: BookOpen, url: "https://ecosystem.swarms.world" },
                  { name: "Open Source", icon: Github, url: "/open-source" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center rounded-lg bg-transparent p-2 text-sm transition-all duration-300 hover:bg-neutral-900/30 min-h-[44px] touch-manipulation"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-neutral-800/50 transition-colors duration-300 group-hover:bg-neutral-800/70 flex-shrink-0">
                        <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                      </div>
                      <span className="text-xs text-gray-300 transition-colors duration-300 group-hover:text-gray-100 leading-tight truncate">{item.name}</span>
                      {item.isNew && (
                        <span className="text-xs px-1.5 py-0.5 bg-red-500/20 text-red-500 rounded-full flex-shrink-0">New</span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Community & Social */}
            <div className="relative p-3 sm:p-4">
              <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-600" />
                Community & Social
              </h3>

              <div className="grid gap-1 sm:gap-2">
                {[
                  { name: "Discord Community", icon: MessageCircle, url: "https://discord.gg/EamjgSaEQf" },
                  { name: "Swarms Twitter", icon: Twitter, url: "https://twitter.com/swarms_corp" },
                  { name: "LinkedIn", icon: Building, url: "https://www.linkedin.com/company/swarms-corp/" },
                  { name: "YouTube", icon: MessageCircle, url: "https://www.youtube.com/@kyegomez3242" },
                  { name: "GitHub", icon: Github, url: "https://github.com/kyegomez/swarms" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center rounded-lg bg-transparent p-2 text-sm transition-all duration-300 hover:bg-neutral-900/30 min-h-[44px] touch-manipulation"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-neutral-800/50 transition-colors duration-300 group-hover:bg-neutral-800/70 flex-shrink-0">
                        <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                      </div>
                      <span className="text-xs text-gray-300 transition-colors duration-300 group-hover:text-gray-100 leading-tight truncate">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Support & Contact */}
            <div className="relative p-3 sm:p-4">
              <h3 className="mb-2 sm:mb-3 flex items-center gap-2 text-xs sm:text-sm font-bold text-white">
                <span className="h-1 w-1 sm:h-1.5 sm:w-1.5 rounded-full bg-neutral-600" />
                Support & Contact
              </h3>

              <div className="grid gap-1 sm:gap-2">
                {[
                  { name: "Pricing", icon: DollarSign, url: "/pricing" },
                  { name: "Book a Call", icon: Phone, url: "https://cal.com/swarms" },
                  { name: "Careers", icon: Users, url: "/hiring" },
                  { name: "Status Page", icon: Activity, url: "https://status.swarms.ai" },
                  { name: "Email Support", icon: MessageCircle, url: "mailto:kye@swarms.world" },
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.url}
                    target={item.url.startsWith("http") ? "_blank" : undefined}
                    rel={item.url.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="group flex items-center rounded-lg bg-transparent p-2 text-sm transition-all duration-300 hover:bg-neutral-900/30 min-h-[44px] touch-manipulation"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded bg-neutral-800/50 transition-colors duration-300 group-hover:bg-neutral-800/70 flex-shrink-0">
                        <item.icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                      </div>
                      <span className="text-xs text-gray-300 transition-colors duration-300 group-hover:text-gray-100 leading-tight truncate">{item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            </div>
          </div>

          {/* Bottom section with copyright */}
          <div className="relative mt-4 sm:mt-6 border-t border-neutral-800/50 pt-3 sm:pt-4 text-center">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
            <div className="text-xs text-gray-500 px-4">© {new Date().getFullYear()} Swarms. All rights reserved.</div>
          </div>
        </div>

        {/* Decorative glowing line at the bottom */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neutral-700/50 to-transparent" />
      </div>
    </footer>
  )
}
