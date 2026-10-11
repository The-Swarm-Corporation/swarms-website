import { ArrowRight, ArrowUpRight, Bot, GitCompareArrows, Github, Package, Plus } from "lucide-react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"

import { siteConfig } from "@/app/metadata"
import { CodeBlock } from "@/components/code-block"
import { CopyButton } from "@/components/copy-button"
import { Navigation } from "@/components/navigation"
import { PaperCard } from "@/components/paper-card"
import { AgentMath, BenchExplorer, FeatureExplorer, RouteHubCode } from "@/components/routehub/routehub-client"
import {
  FAQS,
  FEATURES,
  HERO_CODE,
  HERO_STATS,
  INSTALL,
  LAUNCH_POST,
  MIGRATE_DIFF,
  MIGRATION_POST,
  MIGRATION_URL,
  PAPER,
  PAPER_URL,
  PYPI_URL,
  QUICKSTART,
  REPO_URL,
  SKILL_INSTALL,
  SKILL_URL,
  VERSION,
} from "@/components/routehub/routehub-data"
import { CountUp } from "@/components/swarms-rs/count-up"
import { MotionRoot, Reveal } from "@/components/swarms-rs/reveal"
import { Button } from "@/components/ui/button"

// Title and description are sized to what Google shows (about 60 and 155
// characters) and lead with the queries this page targets.
const title = "RouteHub: Fast Open-Source LLM Gateway & LiteLLM Alternative"
const description =
  "RouteHub is an open-source Python LLM gateway. Call OpenAI, Anthropic, Gemini and 20+ providers with one completion(). Imports 383x faster than LiteLLM."
const url = `${siteConfig.url}/routehub`
const image = {
  url: "/route_hub_banner.png",
  width: 1280,
  height: 720,
  alt: "RouteHub, the open-source LLM gateway for Python",
}
const license = "https://www.apache.org/licenses/LICENSE-2.0"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "routehub",
    "llm gateway",
    "python llm gateway",
    "open source llm gateway",
    "litellm alternative",
    "litellm replacement",
    "litellm vs routehub",
    "fast litellm",
    "openai compatible gateway",
    "openai sdk gateway",
    "multi provider llm",
    "llm router python",
    "unified llm api",
    "anthropic prompt caching",
    "claude extended thinking api",
    "claude openai format",
    "ai agent infrastructure",
    "swarms routehub",
  ],
  category: "technology",
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
    images: [image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

// One linked graph: the page, the library it describes, its source code, the
// paper, the FAQ and the breadcrumb, joined by @id so search engines read them
// as one entity. The FAQ entries come from the same FAQS array the page
// renders, so the structured data always matches the visible answers.
const ids = {
  page: `${url}#webpage`,
  software: `${url}#software`,
  source: `${url}#source`,
  paper: `${url}#paper`,
  faq: `${url}#faq`,
  breadcrumb: `${url}#breadcrumb`,
}
// The root layout already describes the organization and the website under
// these ids, so the graph points at them.
const organization = { "@id": `${siteConfig.url}/#organization` }

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": ids.page,
      url,
      name: title,
      description,
      inLanguage: "en",
      isPartOf: { "@id": `${siteConfig.url}/#website` },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${image.url}`,
        width: image.width,
        height: image.height,
      },
      about: { "@id": ids.software },
      mainEntity: { "@id": ids.software },
      breadcrumb: { "@id": ids.breadcrumb },
    },
    {
      "@type": "SoftwareApplication",
      "@id": ids.software,
      name: "RouteHub",
      applicationCategory: "DeveloperApplication",
      applicationSubCategory: "LLM gateway",
      operatingSystem: "Any",
      softwareVersion: VERSION,
      softwareRequirements: "Python 3.10 or later",
      license,
      isAccessibleForFree: true,
      description,
      url,
      image: `${siteConfig.url}${image.url}`,
      downloadUrl: PYPI_URL,
      installUrl: PYPI_URL,
      sameAs: [REPO_URL, PYPI_URL],
      featureList: FEATURES.map((f) => f.name),
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      publisher: organization,
      subjectOf: { "@id": ids.paper },
    },
    {
      "@type": "SoftwareSourceCode",
      "@id": ids.source,
      name: "RouteHub",
      codeRepository: REPO_URL,
      programmingLanguage: "Python",
      runtimePlatform: "Python 3.10+",
      license,
      targetProduct: { "@id": ids.software },
      publisher: organization,
    },
    {
      "@type": "ScholarlyArticle",
      "@id": ids.paper,
      headline: PAPER.title,
      name: PAPER.title,
      author: PAPER.authors.map((name) => ({ "@type": "Person", name })),
      publisher: { "@type": "Organization", name: PAPER.org },
      datePublished: "2026-10",
      abstract: PAPER.abstract,
      url: PAPER_URL,
      encodingFormat: "application/pdf",
      about: { "@id": ids.software },
    },
    {
      "@type": "FAQPage",
      "@id": ids.faq,
      url,
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.q,
        acceptedAnswer: { "@type": "Answer", text: faq.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": ids.breadcrumb,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "RouteHub", item: url },
      ],
    },
  ],
}

export default function RouteHub() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-black text-white">
        <Navigation />

        <main id="main-content" className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
          <MotionRoot>
            <RouteHubHero />
            <RouteHubBenchmarks />
            <RouteHubQuickstart />
            <RouteHubFeatures />
            <RouteHubGetStarted />
            <RouteHubPaper />
            <RouteHubFaq />
          </MotionRoot>
        </main>
      </div>
    </>
  )
}

function RouteHubHero() {
  return (
    <section className="border-b border-white/[0.08] bg-black">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-12 pb-16 pt-12 sm:pb-20 sm:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14 lg:pb-24 lg:pt-20">
          <div>
            <Image
              src="/routehub_logo.svg"
              alt="RouteHub"
              width={511}
              height={128}
              unoptimized
              priority
              className="-ml-1.5 h-10 w-auto sm:h-12"
            />

            <h1
              className="mt-8 max-w-xl font-semibold leading-[1.04] tracking-tighter text-white"
              style={{ fontSize: "clamp(2.3rem, 4.6vw, 3.6rem)" }}
            >
              One LLM gateway for every provider, ready in 3.2&nbsp;milliseconds
            </h1>

            <p className="mt-6 max-w-lg text-base font-normal leading-relaxed text-white/55 sm:text-lg">
              The open-source LLM gateway behind Swarms. Call OpenAI, Anthropic, Gemini, Groq,
              OpenRouter, Ollama and any OpenAI-compatible server through one function, with
              LiteLLM&apos;s function names and 383x faster imports.
            </p>

            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                className="h-12 w-full rounded-full bg-white px-7 text-base font-medium text-black hover:bg-neutral-200 sm:w-auto"
                asChild
              >
                <a href="#quickstart">
                  Get started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-7 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                asChild
              >
                <a href={REPO_URL} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-5 w-5 text-white/60" />
                  View on GitHub
                </a>
              </Button>
            </div>

            <div className="mt-6 flex max-w-md items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
              <span className="font-mono text-sm text-white/30">$</span>
              <code className="font-mono text-sm text-white/85">{INSTALL}</code>
              <CopyButton value={INSTALL} className="ml-auto" />
              <a
                href={PYPI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden font-mono text-[11px] text-white/40 transition-colors hover:text-white sm:inline"
              >
                PyPI
              </a>
            </div>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-white/35">
              <span>v{VERSION}</span>
              <span aria-hidden="true">·</span>
              <span>Apache 2.0</span>
              <span aria-hidden="true">·</span>
              <span>Python 3.10+</span>
              <span aria-hidden="true">·</span>
              <a
                href={PAPER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 transition-colors hover:text-white"
              >
                Paper
                <ArrowUpRight className="h-3 w-3" />
              </a>
            </p>
          </div>

          <div className="min-w-0">
            <div className="overflow-hidden rounded-lg border border-white/[0.08] bg-[#0a0a0a]">
              <div className="flex items-center gap-1.5 border-b border-white/[0.08] px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/[0.12]" />
                <span className="ml-3 font-mono text-[11px] font-normal text-white/40">main.py</span>
                <CopyButton value={HERO_CODE} className="ml-auto" />
              </div>
              <div className="p-4 sm:p-5">
                <CodeBlock
                  code={HERO_CODE}
                  lang="python"
                  className="font-mono text-[11px] font-normal leading-relaxed sm:text-[12.5px]"
                />
              </div>
            </div>
            <p className="mt-4 text-sm font-normal text-white/40">
              Change the model string to change providers. The call and the response type stay
              the same.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function RouteHubBenchmarks() {
  return (
    <section id="benchmarks" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Benchmarks
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              383x faster to import than LiteLLM, and 5.5x faster to a first response
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Every library ran in its own environment against an instant mock server, so the
              numbers isolate what the client itself costs. The bare provider SDK is the floor: the
              same HTTP and parsing work with no gateway in front of it.
            </p>
          </Reveal>

          <Reveal>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
              {HERO_STATS.map((stat, i) => (
                <div key={stat.label} className="flex flex-col bg-black p-5 sm:p-6">
                  <dt className="order-2 mt-2 text-sm font-normal text-white/55">{stat.label}</dt>
                  <dd className="order-1 text-3xl font-semibold tracking-tighter text-white sm:text-4xl">
                    <CountUp value={stat.value} delay={0.2 + i * 0.1} duration={1.4} />
                  </dd>
                  <p className="order-3 mt-1 text-xs font-normal text-white/35">{stat.note}</p>
                </div>
              ))}
            </dl>
          </Reveal>

          <div className="mt-14 sm:mt-16">
            <BenchExplorer />
          </div>

          <Reveal className="mt-14 sm:mt-16">
            <AgentMath />
          </Reveal>

          <div className="mt-5 flex flex-col gap-3 text-xs font-normal leading-relaxed text-white/35 sm:flex-row sm:items-start sm:justify-between sm:gap-10">
            <p className="max-w-3xl">
              RouteHub (commit 55284e1) against LiteLLM 1.104.0 on an Apple M3 Pro with CPython 3.12,
              each in its own environment. The calculator uses the 22-message agent request for
              per-call overhead and the 67 ms handshake measured against api.openai.com; network
              savings scale with your round-trip time to the provider. The paper also covers async
              throughput, where LiteLLM&apos;s aiohttp transport pulls ahead at 128 requests in
              flight, and results for any-llm and aisuite.
            </p>
            <a
              href={PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              Full methodology in the paper
              <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function RouteHubQuickstart() {
  return (
    <section id="quickstart" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="max-w-3xl">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Quickstart
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Install it, set one key, and call any model
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              You need Python 3.10 or later and an API key for any supported provider. Each step
              builds on the one before it.
            </p>
          </Reveal>

          <ol className="mt-12 space-y-12 sm:mt-16 sm:space-y-16">
            {QUICKSTART.map((step) => (
              <li
                key={step.n}
                className="grid gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-12"
              >
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 font-mono text-sm text-white/80">
                    {step.n}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                    {step.body}
                  </p>
                </Reveal>
                <Reveal className="min-w-0" delay={0.1}>
                  <RouteHubCode
                    variants={[step.variant]}
                    nodes={[
                      <CodeBlock
                        key="code"
                        code={step.variant.code}
                        lang={step.variant.lang}
                        file={step.variant.file}
                      />,
                    ]}
                  />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

// Highlighting happens here on the server; the explorer only receives the
// rendered blocks, so Shiki stays out of the client bundle.
function RouteHubFeatures() {
  const nodes = Object.fromEntries(
    FEATURES.map((f) => [
      f.id,
      f.variants.map((v) => <CodeBlock key={v.label} code={v.code} lang={v.lang} file={v.file} />),
    ]),
  )

  return (
    <section id="features" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Features
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Everything an LLM gateway needs
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Pick a feature to see how it works and what it prints. The tabs above each sample
              switch between providers, approaches, or a before and after.
            </p>
          </Reveal>

          <FeatureExplorer nodes={nodes} />
        </div>
      </div>
    </section>
  )
}

function RouteHubGetStarted() {
  return (
    <section id="get-started" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Get started
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Start a new project, move off LiteLLM, or teach your coding agent
            </h2>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              RouteHub is free and open source under Apache 2.0. Pick the path that matches where
              you are today.
            </p>
          </Reveal>

          <div className="grid gap-5 lg:grid-cols-3">
            <Reveal className="flex">
              <PathCard
                icon={<Package className="h-4 w-4 text-white/70" />}
                title="New project"
                body="Install the package, export a key for any provider, and make your first call."
                links={[
                  { label: "Follow the quickstart", href: "#quickstart", primary: true },
                  { label: "PyPI", href: PYPI_URL },
                ]}
              >
                <div className="flex items-center gap-3 rounded-md border border-white/[0.08] bg-black px-4 py-3">
                  <span className="font-mono text-xs text-white/35" aria-hidden="true">
                    $
                  </span>
                  <code className="min-w-0 flex-1 truncate font-mono text-xs text-white/85 sm:text-[13px]">
                    {INSTALL}
                  </code>
                  <CopyButton value={INSTALL} />
                </div>
              </PathCard>
            </Reveal>

            <Reveal className="flex" delay={0.08}>
              <PathCard
                icon={<GitCompareArrows className="h-4 w-4 text-white/70" />}
                title="Migrating from LiteLLM"
                body="Same function names and module paths. Swap the import, then move global settings into each call."
                links={[
                  { label: "Step-by-step guide", href: MIGRATION_POST, primary: true },
                  { label: "Reference on GitHub", href: MIGRATION_URL },
                ]}
              >
                <pre className="overflow-x-auto rounded-md border border-white/[0.08] bg-black px-4 py-3 font-mono text-[11px] leading-relaxed sm:text-xs">
                  {MIGRATE_DIFF.split("\n").map((line, i) => (
                    <div
                      key={i}
                      className={
                        line.startsWith("+")
                          ? "text-emerald-400/90"
                          : line.startsWith("-")
                            ? "text-red-400/80"
                            : "text-white/40"
                      }
                    >
                      {line || " "}
                    </div>
                  ))}
                </pre>
              </PathCard>
            </Reveal>

            <Reveal className="flex" delay={0.16}>
              <PathCard
                icon={<Bot className="h-4 w-4 text-white/70" />}
                title="Coding agents"
                body="RouteHub ships an Agent Skill that shows Claude Code and other coding agents how to call it correctly, including which LiteLLM habits break."
                links={[{ label: "Read SKILL.md", href: SKILL_URL, primary: true }]}
              >
                <div className="relative rounded-md border border-white/[0.08] bg-black px-4 py-3 pr-10">
                  <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-white/75 sm:text-xs">
                    {SKILL_INSTALL}
                  </pre>
                  <CopyButton value={SKILL_INSTALL} className="absolute right-3 top-3.5" />
                </div>
              </PathCard>
            </Reveal>
          </div>

          <Reveal className="mt-5">
            <div className="grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Source on GitHub", sub: "The-Swarm-Corporation/RouteHub", href: REPO_URL },
                { label: "Package on PyPI", sub: "pip install routehub", href: PYPI_URL },
                { label: "Launch post", sub: "How it works and why it is fast", href: LAUNCH_POST },
                { label: "Community", sub: "Questions and feedback on Discord", href: "https://discord.gg/EamjgSaEQf" },
              ].map((item) => (
                <SmartLink
                  key={item.label}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 bg-black px-5 py-4 transition-colors hover:bg-[#0a0a0a]"
                >
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-white/85 group-hover:text-white">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[11px] text-white/35">
                      {item.sub}
                    </span>
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition-colors group-hover:text-white" />
                </SmartLink>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function PathCard({
  icon,
  title,
  body,
  links,
  children,
}: {
  icon: ReactNode
  title: string
  body: string
  links: { label: string; href: string; primary?: boolean }[]
  children: ReactNode
}) {
  return (
    <div className="flex w-full flex-col rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.03]">
        {icon}
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">{title}</h3>
      <p className="mt-2 text-sm font-normal leading-relaxed text-white/55">{body}</p>
      <div className="mt-5 min-w-0">{children}</div>
      <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
        {links.map((link) => (
          <SmartLink
            key={link.label}
            href={link.href}
            className={`group inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
              link.primary ? "text-white" : "text-white/55 hover:text-white"
            }`}
          >
            {link.label}
            {link.href.startsWith("#") ? (
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            ) : (
              <ArrowUpRight className="h-4 w-4 text-white/40 transition-colors group-hover:text-white" />
            )}
          </SmartLink>
        ))}
      </div>
    </div>
  )
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

function RouteHubPaper() {
  return (
    <section id="paper" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 max-w-3xl sm:mb-14">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Paper
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              The design and every benchmark, written up in full
            </h2>
          </Reveal>

          <Reveal>
            <PaperCard title={PAPER.title} href={PAPER_URL} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// Native <details> keeps every answer in the server HTML, where search engines
// and the FAQPage entry in the structured data above can both read it.
function RouteHubFaq() {
  return (
    <section id="faq" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal className="lg:sticky lg:top-32 lg:self-start">
            <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              FAQ
            </p>
            <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
              Questions about RouteHub
            </h2>
            <p className="mt-5 max-w-md text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              What Python developers ask before they switch LLM gateways.
            </p>
          </Reveal>

          <div className="border-t border-white/[0.08]">
            {FAQS.map((faq, i) => (
              <Reveal key={faq.q} delay={i * 0.05} y={14}>
                <details open={i === 0} className="group border-b border-white/[0.08]">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-white/85 transition-colors group-open:text-white group-hover:text-white sm:text-lg">
                      {faq.q}
                    </h3>
                    <Plus
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 group-open:rotate-45"
                    />
                  </summary>
                  <div className="pb-6 pr-10">
                    <p className="max-w-2xl text-sm font-normal leading-relaxed text-white/55 sm:text-base">
                      {faq.a}
                    </p>
                    {faq.link && (
                      <SmartLink
                        href={faq.link.href}
                        className="group/link mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-white/70 transition-colors hover:text-white"
                      >
                        {faq.link.label}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                      </SmartLink>
                    )}
                  </div>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
