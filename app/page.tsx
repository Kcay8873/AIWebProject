import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default function HomePage() {
  const posts = getAllPosts()

  return (
    <div>
      <section className="mb-10 border-b border-border pb-8">
        <h1 className="font-serif text-3xl font-bold mb-2">Vektörel Bakışı</h1>
        <p className="text-muted text-base">
          Mühendis okur için AI ve teknoloji haberleri. Hype değil, analiz.
        </p>
      </section>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg mb-2">Henüz yayınlanmış yazı yok.</p>
          <p className="text-sm">Vektör ilk yazısını yayınlamak için hazırlanıyor.</p>
        </div>
      ) : (
        <div>
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
