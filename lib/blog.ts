import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

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

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')

      const fullPath = path.join(postsDirectory, fileName)
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

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)

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

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.categories.includes(category))
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter((post) => post.featured)
}

export function getAllCategories(): string[] {
  const allPosts = getAllPosts()
  const categories = allPosts.flatMap((post) => post.categories)
  return Array.from(new Set(categories)).sort()
}
