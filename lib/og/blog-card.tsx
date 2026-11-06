import { ImageResponse } from "next/og"
import { format, parseISO } from "date-fns"
import type { BlogLocale, BlogPost } from "@/lib/blog"
import { renderOgCard, resolvePublicImage, size } from "./card"

export { size, contentType } from "./card"

// Post cards for /blog/<slug> and /zh/blog/<slug>. A post with an `image:`
// banner keeps it, cropped to 1200×630. A post without one gets the shared
// card with its title, first category, date, and read time.
export async function renderBlogCard(post: BlogPost | null, locale: BlogLocale) {
  const blog = locale === "zh" ? "Swarms 博客" : "Swarms Blog"

  if (!post) {
    return renderOgCard({ eyebrow: locale === "zh" ? "博客" : "Blog", title: blog, locale })
  }

  if (post.image) {
    const src = await resolvePublicImage(post.image)
    if (src) {
      return new ImageResponse(
        (
          <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#000000" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              width={size.width}
              height={size.height}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
          </div>
        ),
        size
      )
    }
    // If the asset can't be read, fall through to the shared card below.
  }

  const date = parseISO(post.date)
  return renderOgCard({
    eyebrow: locale === "zh" ? "博客" : "Blog",
    title: post.title,
    locale,
    footer: (
      <PostMeta
        category={post.categories[0]}
        date={locale === "zh" ? format(date, "yyyy年M月d日") : format(date, "MMMM d, yyyy")}
        readTime={post.readTime}
      />
    ),
  })
}

function PostMeta({ category, date, readTime }: { category?: string; date: string; readTime: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {category && (
        <div
          style={{
            display: "flex",
            padding: "8px 18px",
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            backgroundColor: "rgba(255,255,255,0.06)",
            color: "rgba(255,255,255,0.75)",
            fontSize: 16,
            fontWeight: 600,
            marginRight: 20,
            textTransform: "uppercase",
            letterSpacing: 2,
          }}
        >
          {category}
        </div>
      )}
      <span style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.5)", marginRight: 20 }}>{date}</span>
      <span style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.5)" }}>{readTime}</span>
    </div>
  )
}
