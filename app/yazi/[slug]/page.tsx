import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllPosts, getPostBySlug, CATEGORY_LABELS } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      url: `${SITE_URL}/yazi/${post.slug}`,
    },
    alternates: {
      canonical: `${SITE_URL}/yazi/${post.slug}`,
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Vektör / Vektörel Bakışı' },
    publisher: {
      '@type': 'Organization',
      name: 'Vektörel Bakışı',
      url: SITE_URL,
    },
  }

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-8 border-b border-border pb-6">
        <div className="flex items-center gap-3 mb-3 text-sm text-muted">
          <span className="category-badge">
            {CATEGORY_LABELS[post.category] ?? post.category}
          </span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} dk okuma</span>
        </div>

        <h1 className="font-serif text-3xl font-bold leading-tight mb-3">
          {post.title}
        </h1>
        <p className="text-lg text-muted leading-relaxed">{post.summary}</p>
      </header>

      <div
        className="prose prose-slate max-w-none prose-headings:font-serif"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.sources && post.sources.length > 0 && (
        <footer className="mt-10 pt-6 border-t border-border">
          <h2 className="font-serif text-lg font-semibold mb-3">Kaynaklar</h2>
          <ul className="space-y-2 text-sm">
            {post.sources.map((src, i) => (
              <li key={i}>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {src.title}
                </a>
              </li>
            ))}
          </ul>
        </footer>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <a
              key={tag}
              href={`/etiket/${tag}`}
              className="text-xs px-2 py-1 bg-gray-100 text-muted rounded hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
