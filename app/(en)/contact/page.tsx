import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import {
    Mail,
    Phone,
    MessageCircle,
    Briefcase,
    MapPin,
    Github,
    Twitter,
    Building,
} from "lucide-react"
import { SiDiscord, SiTelegram } from "react-icons/si"
import { ContactHero } from "./ContactHero"
import { siteConfig } from "@/app/metadata"

export const metadata: Metadata = {
    title: { absolute: "Contact Us - The Swarms Corporation" },
    description:
        "Get in touch with The Swarms Corporation. Reach support or sales, join the community on Discord, Telegram, X, or GitHub, or find our office and mailing address.",
    openGraph: {
        title: "Contact Us - The Swarms Corporation",
        description:
            "Reach Swarms support, sales, and community channels, or find our office and mailing address.",
        type: "website",
    },
    alternates: {
        canonical: `${siteConfig.url}/contact`,
    },
}

const SUPPORT_EMAIL = "support@swarms.world"
const GENERAL_EMAIL = "kye@swarms.world"
const SALES_URL = "https://cal.com/swarms/swarms-strategy-session"

const contactChannels = [
    {
        name: "Support",
        description:
            "Questions about the framework, the hosted API, billing, or your account.",
        icon: MessageCircle,
        label: SUPPORT_EMAIL,
        href: `mailto:${SUPPORT_EMAIL}`,
    },
    {
        name: "Sales & Enterprise",
        description:
            "Enterprise deployments, on-premise licensing, or a strategy session with the team.",
        icon: Phone,
        label: "Book a call",
        href: SALES_URL,
        external: true,
    },
    {
        name: "General inquiries",
        description: "Press, partnerships, or anything that doesn't fit elsewhere.",
        icon: Mail,
        label: GENERAL_EMAIL,
        href: `mailto:${GENERAL_EMAIL}`,
    },
    {
        name: "Careers",
        description: "Open roles across engineering, research, and go-to-market.",
        icon: Briefcase,
        label: "View open positions",
        href: "/hiring",
    },
]

const communityChannels = [
    {
        name: "Discord",
        icon: SiDiscord as React.ComponentType<{ className?: string }>,
        href: "https://discord.gg/EamjgSaEQf",
    },
    {
        name: "X (Twitter)",
        icon: Twitter,
        href: "https://twitter.com/swarms_corp",
    },
    {
        name: "Telegram",
        icon: SiTelegram as React.ComponentType<{ className?: string }>,
        href: "https://t.me/swarmsgroupchat",
    },
    {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/kyegomez/swarms",
    },
    {
        name: "LinkedIn",
        icon: Building,
        href: "https://www.linkedin.com/company/swarms-corp/",
    },
]

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navigation />

            <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
                <ContactHero />

                {/* Support & Sales */}
                <section className="border-b border-white/[0.08] bg-black">
                    <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-8 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                                Support & sales
                            </h2>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {contactChannels.map((channel) => (
                                    <Link
                                        key={channel.name}
                                        href={channel.href}
                                        target={channel.external || channel.href.startsWith("http") ? "_blank" : undefined}
                                        rel={channel.external || channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="group flex flex-col gap-3 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 transition-colors duration-300 hover:border-white/20"
                                    >
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/[0.06] transition-colors duration-300 group-hover:bg-white/[0.1]">
                                            <channel.icon className="h-4 w-4 text-white/70" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-medium text-white">{channel.name}</h3>
                                            <p className="mt-1 text-sm leading-relaxed text-white/50">
                                                {channel.description}
                                            </p>
                                        </div>
                                        <span className="mt-1 text-sm font-medium text-white underline underline-offset-4 decoration-white/30 group-hover:decoration-white">
                                            {channel.label}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Community */}
                <section className="border-b border-white/[0.08] bg-black">
                    <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                                Community
                            </h2>
                            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                                Join thousands of builders using Swarms in our community
                                channels for real-time help, announcements, and discussion.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                {communityChannels.map((channel) => (
                                    <a
                                        key={channel.name}
                                        href={channel.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:border-white/30 hover:text-white"
                                    >
                                        <channel.icon className="h-4 w-4" />
                                        {channel.name}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Company / Office */}
                <section className="bg-black">
                    <div className="container px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
                        <div className="mx-auto max-w-5xl">
                            <h2 className="mb-8 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                                Company
                            </h2>
                            <div className="flex flex-col gap-6 rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-6 sm:flex-row sm:items-start sm:p-8">
                                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                                    <MapPin className="h-4 w-4 text-white/70" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-base font-medium text-white">
                                        The Swarms Corporation
                                    </h3>
                                    <p className="max-w-2xl text-sm leading-relaxed text-white/50 sm:text-base">
                                        Founded in 2023 by{" "}
                                        <a
                                            href="https://github.com/kyegomez"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                                        >
                                            Kye Gomez
                                        </a>
                                        , Swarms is headquartered in the United States and
                                        operates as a distributed, remote-first team. For legal
                                        correspondence, mailing details, and our data practices,
                                        see our{" "}
                                        <Link
                                            href="/privacy"
                                            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                                        >
                                            Privacy Policy
                                        </Link>{" "}
                                        and{" "}
                                        <Link
                                            href="/terms"
                                            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                                        >
                                            Terms of Service
                                        </Link>
                                        . You can also check current platform status on our{" "}
                                        <a
                                            href="https://status.swarms.ai"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-white underline underline-offset-4 decoration-white/30 hover:decoration-white"
                                        >
                                            status page
                                        </a>
                                        .
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ContactPage",
                        "@id": `${siteConfig.url}/contact/#contactpage`,
                        url: `${siteConfig.url}/contact`,
                        name: "Contact Us - The Swarms Corporation",
                        about: {
                            "@id": `${siteConfig.url}/#organization`,
                        },
                        mainEntity: {
                            "@type": "Organization",
                            name: siteConfig.company.name,
                            url: siteConfig.url,
                            foundingDate: siteConfig.company.foundingDate,
                            address: {
                                "@type": "PostalAddress",
                                addressCountry: siteConfig.company.address.addressCountry,
                            },
                            contactPoint: [
                                {
                                    "@type": "ContactPoint",
                                    contactType: "customer support",
                                    email: SUPPORT_EMAIL,
                                },
                                {
                                    "@type": "ContactPoint",
                                    contactType: "sales",
                                    url: SALES_URL,
                                },
                            ],
                            sameAs: [
                                siteConfig.links.github,
                                "https://twitter.com/swarms_corp",
                                "https://discord.gg/EamjgSaEQf",
                                "https://www.linkedin.com/company/swarms-corp/",
                            ],
                        },
                    }),
                }}
            />
        </div>
    )
}