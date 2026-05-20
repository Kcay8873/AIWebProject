import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByCategory, CATEGORY_LABELS, getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import type { PostCategory } from '@/types/post'

interface Props {
  params: Promise<{ kategori: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  const categories = [...new Set(posts.map((p) => p.category))]
  return categories.map((c) => ({ kategori: c }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params
  const label = CATEGORY_LABELS[kategori as PostCategory] ?? kategori
  return { title: label, description: `${label} kategorisindeki yazılar.` }
}

export default async function KategoriPage({ params }: Props) {
  const { kategori } = await params
  const label = CATEGORY_LABELS[kategori as PostCategory]
  if (!label) notFound()

  const posts = getPostsByCategory(kategori)

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-2">{label}</h1>
      <p className="text-muted text-sm mb-8">{posts.length} yazı</p>
      {posts.length === 0 ? (
        <p className="text-muted">Bu kategoride henüz yazı yok.</p>
      ) : (
        posts.map((post) => <PostCard key={post.slug} post={post} />)
      )}
    </div>
  )
}
