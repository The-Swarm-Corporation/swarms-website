"use client"

import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Search, X } from "lucide-react"
import type { BlogLocale, BlogPost } from "@/lib/blog"
import { cn } from "@/lib/utils"
import { BlogCard } from "./blog-card"

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const POSTS_PER_PAGE = 9

const LABELS = {
  en: {
    all: "All",
    searchPlaceholder: "Search articles...",
    searchAria: "Search blog articles",
    clearSearch: "Clear search",
    count: (n: number) => `${n} ${n === 1 ? "article" : "articles"}`,
    inCategory: (c: string) => ` in ${c}`,
    matching: (q: string) => ` matching "${q}"`,
    empty: "No articles found. Try a different search or category.",
    pagination: "Blog pagination",
    previous: "Previous",
    next: "Next",
  },
  zh: {
    all: "全部",
    searchPlaceholder: "搜索文章…",
    searchAria: "搜索博客文章",
    clearSearch: "清除搜索",
    count: (n: number) => `共 ${n} 篇文章`,
    inCategory: (c: string) => `（分类：${c}）`,
    matching: (q: string) => `（搜索："${q}"）`,
    empty: "未找到相关文章，请尝试其他搜索词或分类。",
    pagination: "博客分页",
    previous: "上一页",
    next: "下一页",
  },
}

export function BlogIndexClient({
  posts,
  categories,
  locale = "en",
}: {
  posts: BlogPost[]
  categories: string[]
  locale?: BlogLocale
}) {
  const t = LABELS[locale]
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(t.all)
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return posts.filter((post) => {
      const matchesCategory = active === t.all || post.categories.includes(active)
      const matchesQuery =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.categories.some((category) => category.toLowerCase().includes(q))
      return matchesCategory && matchesQuery
    })
  }, [posts, active, query])

  const totalPages = Math.max(1, Math.ceil(filtered.length / POSTS_PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE)

  const handleCategory = (category: string) => {
    setActive(category)
    setPage(1)
  }

  const handleQuery = (value: string) => {
    setQuery(value)
    setPage(1)
  }

  return (
    <div>
      <div className="flex flex-col gap-4 border-b border-white/[0.08] pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {[t.all, ...categories].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => handleCategory(category)}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all duration-300",
                active === category
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/[0.02] text-white/60 hover:border-white/30 hover:text-white"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
          <input
            type="text"
            value={query}
            onChange={(event) => handleQuery(event.target.value)}
            placeholder={t.searchPlaceholder}
            aria-label={t.searchAria}
            className="w-full rounded-full border border-white/10 bg-white/[0.02] py-2 pl-10 pr-9 text-sm text-white placeholder-white/35 outline-none transition-colors duration-300 focus:border-white/30"
          />
          {query && (
            <button
              type="button"
              onClick={() => handleQuery("")}
              aria-label={t.clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/35 transition-colors duration-300 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-6 text-sm text-white/40">
        {t.count(filtered.length)}
        {active !== t.all ? t.inCategory(active) : ""}
        {query ? t.matching(query) : ""}
      </p>

      {paged.length === 0 ? (
        <p className="py-16 text-center text-white/40">{t.empty}</p>
      ) : (
        <motion.div
          key={`${active}-${query}-${currentPage}`}
          className="mt-8 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          {paged.map((post) => (
            <BlogCard key={post.slug} post={post} locale={locale} />
          ))}
        </motion.div>
      )}

      {totalPages > 1 && (
        <nav aria-label={t.pagination} className="mt-14 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            {t.previous}
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? "page" : undefined}
                className={cn(
                  "h-9 w-9 rounded-full text-sm font-medium transition-all duration-300",
                  p === currentPage ? "bg-white text-black" : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                )}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="rounded-full border border-white/15 bg-white/[0.02] px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:border-white/30 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            {t.next}
          </button>
        </nav>
      )}
    </div>
  )
}
