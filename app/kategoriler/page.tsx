import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts, CATEGORY_LABELS } from '@/lib/posts'
import type { PostCategory } from '@/types/post'

export const metadata: Metadata = {
  title: 'Kategoriler',
  description: 'Vektörel Bakışı yazı kategorileri.',
}

export default function KategorilerPage() {
  const posts = getAllPosts()
  const counts: Record<string, number> = {}
  posts.forEach((p) => {
    counts[p.category] = (counts[p.category] ?? 0) + 1
  })

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-8">Kategoriler</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(Object.keys(CATEGORY_LABELS) as PostCategory[]).map((cat) => (
          <Link
            key={cat}
            href={`/kategori/${cat}`}
            className="flex items-center justify-between p-4 border border-border rounded hover:border-accent transition-colors group"
          >
            <span className="font-medium group-hover:text-accent transition-colors">
              {CATEGORY_LABELS[cat]}
            </span>
            <span className="text-sm text-muted">{counts[cat] ?? 0} yazı</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
