export default function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <h3 className="font-serif font-bold text-foreground mb-2">Vektörel Bakışı</h3>
            <p className="text-muted text-xs leading-relaxed">
              Mühendis okur için AI ve teknoloji haberleri. Sansasyon değil analiz.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Site
            </h4>
            <ul className="space-y-1 text-muted">
              <li>
                <a href="/" className="hover:text-foreground transition-colors">
                  Ana sayfa
                </a>
              </li>
              <li>
                <a href="/kategoriler" className="hover:text-foreground transition-colors">
                  Kategoriler
                </a>
              </li>
              <li>
                <a href="/hakkinda" className="hover:text-foreground transition-colors">
                  Hakkında
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
              Takip
            </h4>
            <ul className="space-y-1 text-muted">
              <li>
                <a href="/rss.xml" className="hover:text-foreground transition-colors">
                  RSS Feed
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/kcay8873/aiwebproject"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-border text-xs text-muted flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} Vektörel Bakışı</p>
          <p className="italic">
            Vektör tarafından yazılır, Lemma tarafından doğrulanır.
          </p>
        </div>
      </div>
    </footer>
  )
}
