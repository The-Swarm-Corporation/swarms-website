import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/app/metadata"
import { courseMeta, courseParts } from "@/lib/academy/swarms-api-course"
import { courseFaq } from "@/lib/academy/academy-faq"
import { CourseProgressCard, type PartSummary } from "@/components/academy/course-progress-card"

const partSummaries: PartSummary[] = courseParts.map((p) => ({
  part: p.part,
  slug: p.slug,
  title: p.title,
  lessonIds: p.lessons.map((l) => l.id),
  quizTotal: p.quiz.length,
}))

const title = "The Swarms API Course — Free Multi-Agent Course | Swarms Academy"
const description =
  "A free four-part multi-agent course from Swarms Academy: run your first AI agent, master streaming, tools, and MCP, orchestrate multi-agent swarms with every architecture, and ship to production. 31 lessons, 12 live API trials, graded quizzes."
const url = "https://swarms.ai/academy/swarms-api"

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  keywords: [
    "swarms api course",
    "swarms academy courses",
    "swarms academy",
    "multi-agent course",
    "multi agent course",
    "multi-agent orchestration course",
    "multi-agent systems course",
    "free ai agent course",
    "ai agent training course",
    "learn multi-agent systems",
    "swarms api tutorial",
    "learn swarms api",
    "ai agent api tutorial",
    "swarm orchestration tutorial",
    "agent completions api",
    "hierarchical swarm tutorial",
    "sequential workflow agents",
    "agent orchestration course",
    "build ai agents course",
    "llm agents course",
  ],
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description,
    siteName: siteConfig.name,
    images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@swarms_corp",
    site: "@swarms_corp",
    images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: title }],
  },
}

const totalLessons = courseParts.reduce((n, p) => n + p.lessons.length, 0)
const totalTrials = courseParts.reduce(
  (n, p) => n + p.lessons.reduce((m, l) => m + l.blocks.filter((b) => b.type === "trial").length, 0),
  0
)
const totalQuizQuestions = courseParts.reduce((n, p) => n + p.quiz.length, 0)

const courseJsonLd = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: courseMeta.title,
  description,
  url,
  provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
  isAccessibleForFree: true,
  educationalLevel: "Beginner",
  inLanguage: "en",
  timeRequired: "PT6H",
  teaches: courseParts.flatMap((p) => p.outcomes),
  about: [
    "Multi-agent systems",
    "AI agent orchestration",
    "Swarms API",
    "Agent engineering",
  ],
  coursePrerequisites: "Basic Python",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    category: "Free",
  },
  hasCourseInstance: {
    "@type": "CourseInstance",
    courseMode: "Online",
    courseWorkload: "PT6H",
  },
  hasPart: courseParts.map((p) => ({
    "@type": "Course",
    name: `Part ${p.part}: ${p.title}`,
    description: p.tagline,
    url: `${url}/${p.slug}`,
    timeRequired: `PT${parseInt(p.duration)}M`,
    provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
    isAccessibleForFree: true,
    inLanguage: "en",
  })),
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: courseFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
    { "@type": "ListItem", position: 2, name: "Swarms Academy", item: "https://swarms.ai/academy" },
    { "@type": "ListItem", position: 3, name: "The Swarms API Course", item: url },
  ],
}

export default function SwarmsApiCoursePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-white/[0.08] bg-black">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_70%_at_50%_35%,black_25%,transparent_100%)]"
          />
          <div className="container relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto flex max-w-4xl flex-col items-center py-20 text-center sm:py-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-white/60 sm:text-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                Swarms Academy · Free course
              </div>

              <h1
                className="mt-6 font-bold leading-[0.98] tracking-tighter text-white sm:mt-8"
                style={{ fontSize: "clamp(2.5rem, 7vw, 5.5rem)" }}
              >
                The Swarms API Course
              </h1>

              <p className="mt-6 max-w-3xl text-base font-normal leading-relaxed text-white/55 sm:mt-8 sm:text-lg md:text-xl">
                {courseMeta.tagline} Four parts, {totalLessons} lessons, {totalTrials} live
                API trials you can run directly in the page, and a checkpoint project plus
                graded quiz at the end of each part. Earn points as you go and rank up from
                Recruit to Swarm Architect.
              </p>

              <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
                <Button
                  className="h-12 w-full rounded-full bg-white px-8 text-base font-medium text-black hover:bg-neutral-200 sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <Link href={`/academy/swarms-api/${courseParts[0].slug}`}>
                    Start Part 1
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-12 w-full rounded-full border-white/[0.14] bg-[#0a0a0a] px-8 text-base font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:h-14 sm:w-auto sm:text-lg"
                  asChild
                >
                  <a href={courseMeta.keysUrl} target="_blank" rel="noopener noreferrer">
                    Get an API key
                    <ArrowUpRight className="ml-2 h-5 w-5 text-white/50" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] lg:grid-cols-4">
              {[
                { value: "4", label: "Parts, beginner to production" },
                { value: String(totalLessons), label: "Hands-on lessons" },
                { value: String(totalTrials), label: "Live API trials in the page" },
                { value: String(totalQuizQuestions), label: "Quiz questions to test recall" },
              ].map((stat) => (
                <div key={stat.label} className="bg-black p-5 sm:p-8">
                  <div className="text-2xl font-semibold tracking-tighter text-white sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-1.5 text-xs font-normal leading-relaxed text-white/50 sm:text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROGRESS + REWARDS */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <CourseProgressCard parts={partSummaries} />

              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2 lg:grid-cols-4">
                {[
                  { value: "+10 pts", label: "Complete a lesson" },
                  { value: "+15 pts", label: "Run a live API trial successfully" },
                  { value: "+25 pts", label: "Finish a checkpoint project" },
                  { value: "+5 / answer", label: "Quiz answers, +10 bonus for a perfect score" },
                ].map((item) => (
                  <div key={item.label} className="bg-black p-5 sm:p-6">
                    <div className="font-mono text-lg font-semibold tracking-tight text-emerald-300/90">
                      {item.value}
                    </div>
                    <div className="mt-1 text-xs leading-relaxed text-white/50 sm:text-sm">
                      {item.label}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-[13px] leading-relaxed text-white/40">
                Points and lesson progress are tracked in your browser: no account needed.
                Rank up from Recruit to Swarm Architect by completing lessons, running live
                trials, and acing the quizzes. Finish all lessons, the checkpoint, and the
                quiz in a part to earn its badge.
              </p>
            </div>
          </div>
        </section>

        {/* CURRICULUM */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto mb-10 max-w-7xl sm:mb-14">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Curriculum
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                From first request to production swarms.
              </h2>
              <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
                Each part builds on the last. Work through them in order, run the live
                trials as you go, and finish each checkpoint project and quiz before moving
                on.
              </p>
            </div>

            <div className="mx-auto max-w-7xl space-y-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08]">
              {courseParts.map((part) => (
                <Link
                  key={part.slug}
                  href={`/academy/swarms-api/${part.slug}`}
                  className="group flex flex-col gap-6 bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-8 md:flex-row md:items-start md:gap-10"
                >
                  <div className="flex items-center gap-4 md:w-40 md:flex-shrink-0 md:flex-col md:items-start md:gap-2">
                    <span className="font-mono text-3xl font-semibold tracking-tighter text-white/25 transition-colors duration-300 group-hover:text-white sm:text-4xl">
                      0{part.part}
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                      {part.duration} · {part.lessons.length} lessons
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white sm:text-xl">{part.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm font-normal leading-relaxed text-white/50">
                      {part.summary}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {part.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="rounded-full border border-white/[0.1] px-3 py-1 text-xs text-white/45"
                        >
                          {lesson.title}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <ArrowRight className="hidden h-5 w-5 flex-shrink-0 text-white/30 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white md:mt-2 md:block" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                FAQ
              </p>
              <h2 className="max-w-3xl text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                About the Swarms API course.
              </h2>
              <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
                {courseFaq.map((item) => (
                  <div key={item.question} className="bg-black p-6 sm:p-8">
                    <h3 className="mb-3 text-base font-medium text-white sm:text-lg">
                      {item.question}
                    </h3>
                    <p className="text-sm font-normal leading-relaxed text-white/50">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PREREQUISITES + CTA */}
        <section className="bg-black">
          <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            <div className="mx-auto grid max-w-7xl gap-px overflow-hidden rounded-lg border border-white/[0.08] bg-white/[0.08] md:grid-cols-2">
              <div className="bg-black p-6 sm:p-10">
                <h2 className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                  Before you start
                </h2>
                <ul className="mt-5 space-y-3">
                  {[
                    "Basic Python (every example also translates directly to any HTTP client)",
                    "A free Swarms API key from swarms.world/platform/api-keys",
                    "No prior experience with AI agents required",
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/55">
                      <span className="mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-white/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col justify-between gap-8 bg-black p-6 sm:p-10">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tighter text-white sm:text-3xl">
                    Ready when you are
                  </h2>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-white/50 sm:text-base">
                    Part 1 takes about an hour and ends with a working agent you built and
                    ran yourself.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    className="h-11 w-full rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-neutral-200 sm:w-auto"
                    asChild
                  >
                    <Link href={`/academy/swarms-api/${courseParts[0].slug}`}>
                      Begin the course
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-11 w-full rounded-full border-white/[0.14] bg-black px-6 text-sm font-medium text-white hover:border-white/30 hover:bg-white/[0.06] hover:text-white sm:w-auto"
                    asChild
                  >
                    <a href={courseMeta.docsUrl} target="_blank" rel="noopener noreferrer">
                      API documentation
                      <ArrowUpRight className="ml-2 h-4 w-4 text-white/50" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
