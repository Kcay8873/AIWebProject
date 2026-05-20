import Link from 'next/link'
import { CATEGORY_LABELS } from '@/lib/posts'

export default function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link
            href="/"
            className="font-serif text-xl font-bold hover:text-accent transition-colors"
          >
            Vektörel Bakışı
          </Link>
          <nav className="flex items-center gap-5 text-sm text-muted">
            <Link href="/kategoriler" className="hover:text-foreground transition-colors">
              Kategoriler
            </Link>
            <Link href="/hakkinda" className="hover:text-foreground transition-colors">
              Hakkında
            </Link>
            <a
              href="/rss.xml"
              className="hover:text-foreground transition-colors"
              aria-label="RSS Feed"
            >
              RSS
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
