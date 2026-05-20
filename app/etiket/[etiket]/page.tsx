import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface Props {
  params: Promise<{ etiket: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map((t) => ({ etiket: t }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { etiket } = await params
  return { title: `#${etiket}`, description: `#${etiket} etiketli yazılar.` }
}

export default async function EtiketPage({ params }: Props) {
  const { etiket } = await params
  const posts = getPostsByTag(etiket)
  if (posts.length === 0) notFound()

  return (
    <div>
      <h1 className="font-serif text-3xl font-bold mb-2">#{etiket}</h1>
      <p className="text-muted text-sm mb-8">{posts.length} yazı</p>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  )
}
