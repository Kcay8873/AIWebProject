import Link from 'next/link'
import type { Post } from '@/types/post'
import { CATEGORY_LABELS } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
}

export default function PostCard({ post }: Props) {
  return (
    <article className="group">
      <Link
        href={`/kategori/${post.category}`}
        className="inline-block text-xs font-semibold uppercase tracking-widest text-accent hover:underline mb-2"
      >
        {CATEGORY_LABELS[post.category] ?? post.category}
      </Link>

      <Link href={`/yazi/${post.slug}`} className="block">
        <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight tracking-tight mb-2 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-muted text-base leading-relaxed line-clamp-3 mb-3">
          {post.summary}
        </p>
      </Link>

      <div className="flex items-center gap-2 text-xs text-muted">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="text-border">·</span>
        <span>{post.readingTime} dk okuma</span>
      </div>
    </article>
  )
}
