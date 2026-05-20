import { notFound } from 'next/navigation'
import Link from 'next/link'
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
  const post = await getPostBySlug(slug)
  if (!post) return {}

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorel-bakisi.vercel.app'

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
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorel-bakisi.vercel.app'
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
    <article className="max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="mb-10">
        <Link
          href={`/kategori/${post.category}`}
          className="inline-block text-xs font-semibold uppercase tracking-widest text-accent hover:underline mb-4"
        >
          {CATEGORY_LABELS[post.category] ?? post.category}
        </Link>

        <h1 className="font-serif text-4xl md:text-5xl font-bold leading-[1.15] tracking-tight mb-5">
          {post.title}
        </h1>
        <p className="text-xl text-muted font-serif leading-relaxed mb-6">
          {post.summary}
        </p>

        <div className="flex items-center gap-3 text-sm text-muted pt-4 border-t border-border">
          <div className="w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-serif font-bold text-sm">
            V
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-medium text-foreground">{post.author}</span>
            <span className="text-xs">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="mx-1.5">·</span>
              {post.readingTime} dk okuma
            </span>
          </div>
        </div>
      </header>

      <div
        className="prose prose-lg prose-slate max-w-none
          prose-headings:font-serif prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8
          prose-p:leading-[1.8] prose-p:text-foreground
          prose-a:text-accent prose-a:no-underline hover:prose-a:underline
          prose-strong:text-foreground
          prose-blockquote:border-l-accent prose-blockquote:font-serif prose-blockquote:italic
          prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-900 prose-pre:text-gray-100
          prose-li:my-1"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {post.sources && post.sources.length > 0 && (
        <footer className="mt-12 pt-8 border-t border-border">
          <h2 className="font-serif text-lg font-bold mb-4 flex items-center gap-2">
            <span className="inline-block w-1 h-5 bg-accent rounded"></span>
            Kaynaklar
          </h2>
          <ol className="space-y-3 text-sm">
            {post.sources.map((src, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-muted font-mono text-xs mt-0.5">[{i + 1}]</span>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline break-words"
                >
                  {src.title}
                </a>
              </li>
            ))}
          </ol>
        </footer>
      )}

      {post.tags && post.tags.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/etiket/${tag}`}
              className="text-xs px-3 py-1.5 bg-gray-100 text-muted rounded-full hover:bg-accent hover:text-white transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 pt-8 border-t border-border bg-blue-50/40 -mx-4 px-6 py-6 rounded-lg">
        <div className="flex items-start gap-4">
          <div className="text-2xl">🔍</div>
          <div className="text-sm">
            <p className="font-medium text-foreground mb-1">Bu yazı Lemma tarafından doğrulandı.</p>
            <p className="text-muted">
              Her yazı yayınlanmadan önce ikinci bir AI editor tarafından kaynak ve olgu kontrolünden geçer.{' '}
              <Link href="/hakkinda" className="text-accent hover:underline">
                Nasıl çalıştığımızı öğren →
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}
