import { ArrowUpRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Reveal } from "./reveal"
import { POSTS } from "./swarms-rs-data"

export function SwarmsRsReading() {
  return (
    <section id="reading" className="scroll-mt-24 border-b border-white/[0.08] bg-black">
      <div className="container px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Read more
              </p>
              <h2 className="text-3xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-4xl md:text-5xl">
                Everything we have written about swarms-rs
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              All posts
              <ArrowUpRight className="h-3.5 w-3.5 text-white/40" />
            </Link>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-3">
            {POSTS.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.1} className="flex">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex w-full flex-col overflow-hidden rounded-xl border border-white/[0.08] bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1 hover:border-white/25"
              >
                <div className="relative aspect-video border-b border-white/[0.08] bg-white/[0.03]">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-sm text-white/30">
                      swarms-rs
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-white/40">
                    <span>{post.tag}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="mt-3 text-base font-semibold leading-snug text-white/90 transition-colors group-hover:text-white sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-3 text-sm font-normal leading-relaxed text-white/50">
                    {post.blurb}
                  </p>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
