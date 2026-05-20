import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'
import type { Post, PostFrontmatter } from '@/types/post'

const POSTS_DIR = path.join(process.cwd(), 'content/posts')

function getAllPostFiles(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return []
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
}

async function markdownToHtml(content: string): Promise<string> {
  const result = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content)
  return String(result)
}

function parsePostFile(file: string): {
  frontmatter: PostFrontmatter
  content: string
  filePath: string
} {
  const filePath = path.join(POSTS_DIR, file)
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  return {
    frontmatter: data as PostFrontmatter,
    content,
    filePath,
  }
}

function readingTimeMinutes(content: string): number {
  const words = content.split(/\s+/).length
  return Math.max(1, Math.ceil(words / 200))
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const files = getAllPostFiles()
  for (const file of files) {
    const parsed = parsePostFile(file)
    if (parsed.frontmatter.slug === slug) {
      const html = await markdownToHtml(parsed.content)
      return {
        ...parsed.frontmatter,
        content: html,
        readingTime: readingTimeMinutes(parsed.content),
        filePath: parsed.filePath,
      }
    }
  }
  return null
}

export function getAllPosts(): Post[] {
  return getAllPostFiles()
    .map((file) => {
      const parsed = parsePostFile(file)
      return {
        ...parsed.frontmatter,
        content: parsed.content,
        readingTime: readingTimeMinutes(parsed.content),
        filePath: parsed.filePath,
      }
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
