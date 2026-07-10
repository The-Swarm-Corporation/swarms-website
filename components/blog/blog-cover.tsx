import { cn } from "@/lib/utils"

const GLOW_POSITIONS = [
  "left-[10%] top-[-10%]",
  "right-[-10%] top-[20%]",
  "left-[-10%] bottom-[-10%]",
  "right-[15%] bottom-[-15%]",
  "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
]

function hashString(value: string) {
  let hash = 0
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function BlogCover({
  slug,
  image,
  alt,
  className,
}: {
  slug: string
  image?: string
  alt?: string
  className?: string
}) {
  if (image) {
    return (
      <div className={cn("relative overflow-hidden bg-black", className)}>
        {/* Cover art may be a local /public path or an arbitrary remote URL, so a
            plain <img> is used instead of next/image to avoid a remotePatterns allowlist. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={alt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
      </div>
    )
  }

  const seed = hashString(slug)
  const position = GLOW_POSITIONS[seed % GLOW_POSITIONS.length]
  const size = 200 + (seed % 3) * 60

  return (
    <div className={cn("relative overflow-hidden bg-black", className)}>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
      />
      <div
        aria-hidden="true"
        className={cn("pointer-events-none absolute rounded-full bg-white/[0.09] blur-3xl", position)}
        style={{ width: size, height: size }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
    </div>
  )
}
