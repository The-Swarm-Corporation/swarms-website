import { ImageResponse } from "next/og"
import { format, parseISO } from "date-fns"
import type { BlogPost } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export async function renderBlogCard(post: BlogPost | null) {
  if (!post) {
    return new ImageResponse(<NotFoundCard />, size)
  }

  if (post.image) {
    return new ImageResponse(
      (
        <div style={{ display: "flex", width: "100%", height: "100%", backgroundColor: "#000000" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.image}
            width={size.width}
            height={size.height}
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
          />
        </div>
      ),
      size
    )
  }

  return new ImageResponse(<BrandedCard post={post} />, size)
}

function NotFoundCard() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000000",
      }}
    >
      <span style={{ fontSize: 56, fontWeight: 700, color: "#ffffff", letterSpacing: -1.5 }}>
        Swarms Blog
      </span>
    </div>
  )
}

function BrandedCard({ post }: { post: BlogPost }) {
  const dateStr = format(parseISO(post.date), "MMMM d, yyyy")
  const titleSize = post.title.length > 70 ? 48 : post.title.length > 45 ? 56 : 66

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#000000",
        backgroundImage: "radial-gradient(circle at 12% -10%, rgba(255,255,255,0.14), transparent 55%)",
        padding: "72px",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            backgroundColor: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 16,
            fontSize: 22,
            color: "#ffffff",
            fontWeight: 700,
          }}
        >
          S
        </div>
        <span style={{ fontSize: 26, fontWeight: 700, color: "#ffffff", letterSpacing: -0.5 }}>
          Swarms
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <span
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            marginBottom: 22,
          }}
        >
          Blog
        </span>
        <span
          style={{
            display: "flex",
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: 1.15,
            color: "#ffffff",
            letterSpacing: -1.5,
          }}
        >
          {post.title}
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {post.categories[0] && (
          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.18)",
              backgroundColor: "rgba(255,255,255,0.06)",
              color: "rgba(255,255,255,0.75)",
              fontSize: 18,
              marginRight: 20,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            {post.categories[0]}
          </div>
        )}
        <span style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.5)", marginRight: 20 }}>
          {dateStr}
        </span>
        <span style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
          {post.readTime}
        </span>
      </div>
    </div>
  )
}
