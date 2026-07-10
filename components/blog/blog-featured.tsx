import Link from "next/link"
import { format, parseISO } from "date-fns"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/blog"
import { BlogCover } from "./blog-cover"

export function BlogFeatured({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative block overflow-hidden rounded-2xl border border-white/10"
    >
      <BlogCover
        slug={post.slug}
        image={post.image}
        alt={post.title}
        className="aspect-[4/5] w-full sm:aspect-[16/9] lg:aspect-[2.2/1]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"
      />
      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
        <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-white/50">
          <span className="rounded-full border border-white/20 bg-white/[0.08] px-3 py-1 text-white/80">
            Latest
          </span>
          {post.categories[0] && (
            <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-white/70">
              {post.categories[0]}
            </span>
          )}
          <time dateTime={post.date}>{format(parseISO(post.date), "MMMM d, yyyy")}</time>
        </div>
        <h2 className="max-w-2xl text-xl font-semibold leading-[1.1] tracking-tighter text-white sm:text-2xl md:text-3xl lg:text-4xl">
          {post.title}
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60 line-clamp-2 sm:text-base">
          {post.description}
        </p>
        <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors duration-300 group-hover:bg-neutral-200">
          Read article
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </div>
      </div>
    </Link>
  )
}
