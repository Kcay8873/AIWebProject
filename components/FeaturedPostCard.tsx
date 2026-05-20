import Link from 'next/link'
import type { Post } from '@/types/post'
import { CATEGORY_LABELS } from '@/lib/posts'
import { formatDate } from '@/lib/utils'

interface Props {
  post: Post
}

export default function FeaturedPostCard({ post }: Props) {
  return (
    <article className="group relative border border-border rounded-xl p-6 md:p-8 bg-white hover:border-accent hover:shadow-lg transition-all">
      <div className="flex items-center gap-3 mb-4 text-xs">
        <Link
          href={`/kategori/${post.category}`}
          className="font-semibold uppercase tracking-widest text-accent hover:underline"
        >
          {CATEGORY_LABELS[post.category] ?? post.category}
        </Link>
        <span className="text-border">·</span>
        <time dateTime={post.date} className="text-muted">
          {formatDate(post.date)}
        </time>
        <span className="text-border">·</span>
        <span className="text-muted">{post.readingTime} dk</span>
      </div>

      <Link href={`/yazi/${post.slug}`} className="block">
        <h3 className="font-serif text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-4 group-hover:text-accent transition-colors">
          {post.title}
        </h3>
        <p className="text-lg text-muted leading-relaxed mb-5">
          {post.summary}
        </p>
      </Link>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-7 h-7 rounded-full bg-foreground text-background flex items-center justify-center font-serif font-bold text-xs">
            V
          </div>
          <span className="text-muted">{post.author}</span>
        </div>
        <Link
          href={`/yazi/${post.slug}`}
          className="text-sm font-medium text-accent hover:underline inline-flex items-center gap-1"
        >
          Devamını oku →
        </Link>
      </div>
    </article>
  )
}
