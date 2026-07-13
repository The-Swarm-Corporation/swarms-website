import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export type BlogLocale = 'en' | 'zh'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  author: string
  categories: string[]
  readTime: string
  featured: boolean
  excerpt: string
  content: string
  /** Optional cover art: a local path under /public (e.g. "/blog/my-post.png") or a remote image URL. */
  image?: string
}

const postsDirectory = path.join(process.cwd(), 'content/blog')

// Chinese translations live in content/blog/zh/<same-slug>.mdx
function localeDirectory(locale: BlogLocale) {
  return locale === 'zh' ? path.join(postsDirectory, 'zh') : postsDirectory
}

export function getAllPosts(locale: BlogLocale = 'en'): BlogPost[] {
  const dir = localeDirectory(locale)
  if (!fs.existsSync(dir)) {
    return []
  }

  const fileNames = fs.readdirSync(dir)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')

      const fullPath = path.join(dir, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')

      const matterResult = matter(fileContents)

      const content = matterResult.content
      const excerpt = content.length > 200 ? content.substring(0, 200) + '...' : content

      const data = matterResult.data as Omit<BlogPost, 'slug' | 'content' | 'excerpt'>

      return {
        slug,
        content,
        excerpt,
        ...data,
        categories: data.categories ?? [],
      }
    })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string, locale: BlogLocale = 'en'): BlogPost | null {
  try {
    const fullPath = path.join(localeDirectory(locale), `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    const content = matterResult.content
    const excerpt = content.length > 200 ? content.substring(0, 200) + '...' : content
    const data = matterResult.data as Omit<BlogPost, 'slug' | 'content' | 'excerpt'>

    return {
      slug,
      content,
      excerpt,
      ...data,
      categories: data.categories ?? [],
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

/** True when a Simplified Chinese translation exists for the slug. */
export function hasZhTranslation(slug: string): boolean {
  return fs.existsSync(path.join(localeDirectory('zh'), `${slug}.mdx`))
}

/**
 * The post as a single self-contained markdown document (title, description,
 * body). Used by the "Copy page" button and the /blog/<slug>/markdown routes
 * so LLM-ready markdown matches what readers see.
 */
export function formatPostMarkdown(post: BlogPost): string {
  const body = post.content.replace(/^\s*#\s+.+(\r?\n)+/, '')
  return `# ${post.title}\n\n> ${post.description}\n\n${body.trim()}\n`
}

export function getPostsByCategory(category: string, locale: BlogLocale = 'en'): BlogPost[] {
  const allPosts = getAllPosts(locale)
  return allPosts.filter((post) => post.categories.includes(category))
}

export function getFeaturedPosts(locale: BlogLocale = 'en'): BlogPost[] {
  const allPosts = getAllPosts(locale)
  return allPosts.filter((post) => post.featured)
}

export function getAllCategories(locale: BlogLocale = 'en'): string[] {
  const allPosts = getAllPosts(locale)
  const categories = allPosts.flatMap((post) => post.categories)
  return Array.from(new Set(categories)).sort()
}
