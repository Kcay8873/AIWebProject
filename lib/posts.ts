import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Post, PostFrontmatter } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

export function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
}

export function getPostBySlug(slug: string): Post | null {
  const files = getAllPostFiles()
  const file = files.find((f) => f.includes(slug))
  if (!file) return null

  const filePath = path.join(POSTS_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter

  const words = content.split(/\s+/).length
  const readingTime = Math.ceil(words / 200)

  return { ...fm, content, readingTime, filePath }
}

export function getAllPosts(): Post[] {
  return getAllPostFiles()
    .map((file) => {
      const filePath = path.join(POSTS_DIR, file)
      const raw = fs.readFileSync(filePath, 'utf-8')
      const { data, content } = matter(raw)
      const fm = data as PostFrontmatter
      const words = content.split(/\s+/).length
      const readingTime = Math.ceil(words / 200)
      return { ...fm, content, readingTime, filePath }
    })
    .filter((p) => p.status === 'published')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((p) => p.category === category)
}

export function getAllTags(): string[] {
  const tags = getAllPosts().flatMap((p) => p.tags)
  return [...new Set(tags)]
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((p) => p.tags.includes(tag))
}

export const CATEGORY_LABELS: Record<string, string> = {
  'model-haberleri': 'Model Haberleri',
  arastirma: 'Araştırma',
  sektor: 'Sektör',
  urun: 'Ürün',
  politika: 'Politika',
  opensource: 'Açık Kaynak',
  donanim: 'Donanım',
}
