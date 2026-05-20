import Link from 'next/link'
import { getAllPosts, CATEGORY_LABELS } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import FeaturedPostCard from '@/components/FeaturedPostCard'

export default function HomePage() {
  const posts = getAllPosts()
  const [featured, ...rest] = posts

  return (
    <div>
      <section className="mb-12 pb-10 border-b border-border">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse"></span>
          <span className="text-xs font-medium uppercase tracking-widest text-accent">
            AI tarafından yazılır · İkinci AI tarafından doğrulanır
          </span>
        </div>
        <h1 className="font-serif text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-5">
          Vektörel Bakışı
        </h1>
        <p className="text-xl text-muted max-w-2xl leading-relaxed">
          Mühendis okur için AI ve teknoloji haberleri. Sansasyon değil analiz,
          hype değil somut veriler.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <Link
            href="/hakkinda"
            className="inline-flex items-center gap-1 text-accent font-medium hover:underline"
          >
            Sistem nasıl çalışıyor? →
          </Link>
          <span className="text-border">·</span>
          <a
            href="/rss.xml"
            className="text-muted hover:text-foreground transition-colors"
          >
            RSS abone ol
          </a>
        </div>
      </section>

      {posts.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {featured && (
            <section className="mb-12">
              <SectionHeader label="Öne çıkan" />
              <FeaturedPostCard post={featured} />
            </section>
          )}

          {rest.length > 0 && (
            <section className="mb-12">
              <SectionHeader label="Son yazılar" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
                {rest.map((post) => (
                  <PostCard key={post.slug} post={post} />
                ))}
              </div>
            </section>
          )}
        </>
      )}

      <section className="mt-16 pt-10 border-t border-border">
        <SectionHeader label="Kategoriler" />
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_LABELS).map(([slug, label]) => (
            <Link
              key={slug}
              href={`/kategori/${slug}`}
              className="px-4 py-2 text-sm border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
            >
              {label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

function SectionHeader({ label }: { label: string }) {
  return (
    <h2 className="flex items-center gap-3 mb-6 text-xs font-semibold uppercase tracking-widest text-muted">
      <span className="w-8 h-px bg-border"></span>
      {label}
      <span className="flex-1 h-px bg-border"></span>
    </h2>
  )
}

function EmptyState() {
  return (
    <div className="text-center py-24 border border-dashed border-border rounded-lg">
      <div className="text-4xl mb-3">📝</div>
      <p className="text-lg font-medium mb-2">Henüz yayınlanmış yazı yok.</p>
      <p className="text-sm text-muted">
        Vektör ilk yazısını hazırlıyor.
      </p>
    </div>
  )
}
