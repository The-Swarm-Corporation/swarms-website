import Link from "next/link"
import { format, parseISO } from "date-fns"
import type { BlogPost } from "@/lib/blog"
import { BlogCover } from "./blog-cover"

export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <div className="overflow-hidden rounded-xl border border-white/10">
        <BlogCover
          slug={post.slug}
          image={post.image}
          alt={post.title}
          className="aspect-[4/3] w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-white/40">
        {post.categories[0] && <span className="text-white/60">{post.categories[0]}</span>}
        {post.categories[0] && <span aria-hidden="true">&middot;</span>}
        <time dateTime={post.date}>{format(parseISO(post.date), "MMM d, yyyy")}</time>
      </div>
      <h3 className="mt-2 text-lg font-medium leading-snug tracking-tight text-white transition-colors duration-300 group-hover:text-white/75">
        {post.title}
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-white/45">{post.description}</p>
    </Link>
  )
}
