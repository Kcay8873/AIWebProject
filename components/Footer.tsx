export default function Footer() {
  return (
    <footer className="border-t border-border mt-12">
      <div className="max-w-3xl mx-auto px-4 py-6 text-sm text-muted flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>
          © {new Date().getFullYear()} Vektörel Bakışı —{' '}
          <span className="italic">Vektör tarafından yazılır, Lemma tarafından doğrulanır.</span>
        </p>
        <div className="flex gap-4">
          <a href="/rss.xml" className="hover:text-foreground transition-colors">
            RSS
          </a>
          <a
            href="https://github.com/kcay8873/aiwebproject"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
