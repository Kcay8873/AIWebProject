import Link from 'next/link'
import type { Post } from '@/types/post'
import { CATEGORY_LABELS } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
  featured?: boolean
}

export default function PostCard({ post, featured = false }: Props) {
  return (
    <article className="post-card">
      <div className="flex items-center gap-3 mb-2 text-xs text-muted">
        <span className="category-badge">
          {CATEGORY_LABELS[post.category] ?? post.category}
        </span>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>{post.readingTime} dk</span>
      </div>

      <Link href={`/yazi/${post.slug}`} className="group block">
        <h2
          className={`font-serif font-bold group-hover:text-accent transition-colors leading-snug mb-2 ${
            featured ? 'text-2xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h2>
      </Link>

      <p className="text-muted text-sm leading-relaxed line-clamp-2">
        {post.summary}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {post.tags.slice(0, 4).map((tag) => (
            <Link
              key={tag}
              href={`/etiket/${tag}`}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  )
}
