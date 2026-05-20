import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="font-serif text-xl font-bold hover:text-accent transition-colors flex items-center gap-2"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-accent"></span>
            Vektörel Bakışı
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              href="/kategoriler"
              className="px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-gray-100 transition-colors"
            >
              Kategoriler
            </Link>
            <Link
              href="/hakkinda"
              className="px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-gray-100 transition-colors"
            >
              Hakkında
            </Link>
            <a
              href="/rss.xml"
              className="px-3 py-1.5 rounded-md text-muted hover:text-foreground hover:bg-gray-100 transition-colors"
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
