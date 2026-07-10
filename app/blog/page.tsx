import { Navigation } from "@/components/navigation"
import { BlogFeatured } from "@/components/blog/blog-featured"
import { BlogIndexClient } from "@/components/blog/blog-index-client"
import { getAllPosts, getAllCategories } from "@/lib/blog"

export default function BlogPage() {
  const posts = getAllPosts()
  const categories = getAllCategories()
  const [featured] = posts

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <main className="pt-28 sm:pt-32">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="mb-5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
              Blog
            </p>
            <h1 className="max-w-4xl text-4xl font-semibold leading-[1.05] tracking-tighter text-white sm:text-5xl md:text-6xl">
              Swarms Blog
            </h1>
            <p className="mt-5 max-w-2xl text-base font-normal leading-relaxed text-white/50 sm:text-lg">
              Engineering notes, product updates, and guides for building
              multi-agent systems with Swarms.
            </p>
          </div>

          {featured && (
            <div className="mx-auto mt-10 max-w-7xl sm:mt-14">
              <BlogFeatured post={featured} />
            </div>
          )}

          <div className="mx-auto max-w-7xl pb-20 pt-14 sm:pb-28 sm:pt-20">
            <BlogIndexClient posts={posts} categories={categories} />
          </div>
        </div>
      </main>
    </div>
  )
}
