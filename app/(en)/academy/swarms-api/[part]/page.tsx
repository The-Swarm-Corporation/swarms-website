import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react"

import { Navigation } from "@/components/navigation"
import { CourseBlocks } from "@/components/academy/course-blocks"
import { PartQuiz } from "@/components/academy/part-quiz"
import { LessonComplete } from "@/components/academy/lesson-complete"
import { PartProgress, PartToc } from "@/components/academy/part-progress"
import { siteConfig } from "@/app/metadata"
import { courseParts, getPart } from "@/lib/academy/swarms-api-course"

type PageProps = { params: Promise<{ part: string }> }

export function generateStaticParams() {
  return courseParts.map((p) => ({ part: p.slug }))
}

const partKeywords: Record<string, string[]> = {
  foundations: [
    "swarms api quickstart",
    "first ai agent tutorial",
    "agent completions endpoint",
    "swarms api key setup",
    "ai agent api for beginners",
  ],
  "agent-capabilities": [
    "ai agent streaming tutorial",
    "structured outputs llm",
    "llm function calling tutorial",
    "mcp integration tutorial",
    "autonomous ai agent tutorial",
    "openai compatible api",
  ],
  "multi-agent-orchestration": [
    "multi-agent orchestration course",
    "multi-agent orchestration tutorial",
    "sequential workflow agents",
    "concurrent workflow agents",
    "hierarchical swarm tutorial",
    "graph workflow agents",
    "multi-agent architectures",
  ],
  production: [
    "ai agents in production",
    "llm batch processing",
    "api rate limit handling",
    "llm cost optimization",
    "ai agent observability",
    "production llm checklist",
  ],
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) return {}
  const title = `Part ${part.part}: ${part.title} — The Swarms API Course`
  const url = `https://swarms.ai/academy/swarms-api/${part.slug}`
  return {
    title: { absolute: title },
    description: part.summary,
    keywords: [
      "swarms api course",
      "swarms academy courses",
      "multi-agent course",
      "learn multi-agent systems",
      ...(partKeywords[part.slug] ?? []),
    ],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: part.summary,
      siteName: siteConfig.name,
      images: [{ url: "/seo_image.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: part.summary,
      creator: "@swarms_corp",
      site: "@swarms_corp",
    },
  }
}

export default async function CoursePartPage({ params }: PageProps) {
  const { part: slug } = await params
  const part = getPart(slug)
  if (!part) notFound()

  const index = courseParts.findIndex((p) => p.slug === part.slug)
  const prev = index > 0 ? courseParts[index - 1] : null
  const next = index < courseParts.length - 1 ? courseParts[index + 1] : null

  const partUrl = `https://swarms.ai/academy/swarms-api/${part.slug}`
  const partJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `Part ${part.part}: ${part.title}`,
    description: part.summary,
    url: partUrl,
    provider: { "@type": "Organization", name: "Swarms", url: siteConfig.url },
    isAccessibleForFree: true,
    educationalLevel: part.part === 1 ? "Beginner" : "Intermediate",
    inLanguage: "en",
    timeRequired: `PT${parseInt(part.duration)}M`,
    teaches: part.outcomes,
    isPartOf: {
      "@type": "Course",
      name: "The Swarms API Course",
      url: "https://swarms.ai/academy/swarms-api",
    },
    syllabusSections: part.lessons.map((lesson, i) => ({
      "@type": "Syllabus",
      position: i + 1,
      name: lesson.title,
    })),
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", category: "Free" },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: `PT${parseInt(part.duration)}M`,
    },
  }
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
      { "@type": "ListItem", position: 2, name: "Swarms Academy", item: "https://swarms.ai/academy" },
      { "@type": "ListItem", position: 3, name: "The Swarms API Course", item: "https://swarms.ai/academy/swarms-api" },
      { "@type": "ListItem", position: 4, name: `Part ${part.part}: ${part.title}`, item: partUrl },
    ],
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(partJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Navigation />

      <main className="pt-[64px] sm:pt-[80px] md:pt-[96px]">
        {/* PART HEADER */}
        <header className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <div className="mx-auto max-w-3xl">
              <nav className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                <Link href="/academy" className="transition-colors hover:text-white">
                  Academy
                </Link>
                <span>/</span>
                <Link href="/academy/swarms-api" className="transition-colors hover:text-white">
                  Swarms API Course
                </Link>
                <span>/</span>
                <span className="text-white/60">Part {part.part} of 4</span>
              </nav>

              <h1 className="mt-6 text-3xl font-bold leading-[1.05] tracking-tighter text-white sm:text-4xl md:text-5xl">
                {part.title}
              </h1>
              <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/55 sm:text-lg">
                {part.summary}
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                {part.duration} · {part.lessons.length} lessons · checkpoint · {part.quiz.length}-question quiz
              </p>
              <PartProgress partNumber={part.part} lessonIds={part.lessons.map((l) => l.id)} />
            </div>
          </div>
        </header>

        {/* WHAT YOU'LL LEARN + TOC */}
        <section className="border-b border-white/[0.08] bg-black">
          <div className="container px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto grid max-w-3xl gap-8 md:grid-cols-2">
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6">
                <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  You will learn to
                </p>
                <ul className="space-y-2.5">
                  {part.outcomes.map((outcome) => (
                    <li key={outcome} className="flex gap-2.5 text-[13px] leading-relaxed text-white/60">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-white/35" strokeWidth={1.5} />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-lg border border-white/[0.08] bg-[#0a0a0a] p-5 sm:p-6">
                <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Lessons in this part
                </p>
                <PartToc
                  partNumber={part.part}
                  lessons={part.lessons.map((l) => ({ id: l.id, title: l.title }))}
                  checkpointTitle={part.checkpoint.title}
                  quizCount={part.quiz.length}
                />
              </div>
            </div>
          </div>
        </section>

        {/* LESSONS */}
        <section className="bg-black">
          <div className="container px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl divide-y divide-white/[0.08]">
              {part.lessons.map((lesson) => (
                <article key={lesson.id} id={`lesson-${lesson.id}`} className="scroll-mt-28 py-12 sm:py-16">
                  <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    Lesson {lesson.id.replace("-", ".")}
                  </p>
                  <h2 className="mb-6 text-2xl font-semibold leading-tight tracking-tighter text-white sm:text-3xl">
                    {lesson.title}
                  </h2>
                  <CourseBlocks blocks={lesson.blocks} />
                  <LessonComplete id={lesson.id} />
                </article>
              ))}

              {/* CHECKPOINT */}
              <article id="checkpoint" className="scroll-mt-28 py-12 sm:py-16">
                <div className="rounded-lg border border-white/[0.14] bg-white/[0.03] p-6 sm:p-10">
                  <p className="mb-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">
                    Checkpoint · Part {part.part}
                  </p>
                  <h2 className="mb-6 text-2xl font-semibold leading-tight tracking-tighter text-white sm:text-3xl">
                    {part.checkpoint.title}
                  </h2>
                  <CourseBlocks blocks={part.checkpoint.blocks} />
                  <LessonComplete id={String(part.part)} kind="checkpoint" />
                </div>
              </article>

              {/* QUIZ */}
              <article id="quiz" className="scroll-mt-28 py-12 sm:py-16">
                <PartQuiz questions={part.quiz} partNumber={part.part} />
              </article>
            </div>
          </div>
        </section>

        {/* PREV / NEXT */}
        <section className="border-t border-white/[0.08] bg-black">
          <div className="container px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <div className="mx-auto flex max-w-3xl flex-col gap-3 sm:flex-row">
              {prev ? (
                <Link
                  href={`/academy/swarms-api/${prev.slug}`}
                  className="group flex flex-1 flex-col gap-1.5 rounded-lg border border-white/[0.08] bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous · Part {prev.part}
                  </span>
                  <span className="text-sm font-medium text-white">{prev.title}</span>
                </Link>
              ) : (
                <Link
                  href="/academy/swarms-api"
                  className="group flex flex-1 flex-col gap-1.5 rounded-lg border border-white/[0.08] bg-black p-5 transition-colors duration-300 hover:bg-[#0a0a0a]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Course overview
                  </span>
                  <span className="text-sm font-medium text-white">The Swarms API Course</span>
                </Link>
              )}
              {next ? (
                <Link
                  href={`/academy/swarms-api/${next.slug}`}
                  className="group flex flex-1 flex-col items-end gap-1.5 rounded-lg border border-white/[0.08] bg-black p-5 text-right transition-colors duration-300 hover:bg-[#0a0a0a]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Next · Part {next.part}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-sm font-medium text-white">{next.title}</span>
                </Link>
              ) : (
                <a
                  href="https://docs.swarms.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 flex-col items-end gap-1.5 rounded-lg border border-white/[0.08] bg-black p-5 text-right transition-colors duration-300 hover:bg-[#0a0a0a]"
                >
                  <span className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Course complete
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="text-sm font-medium text-white">Keep going in the docs</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
