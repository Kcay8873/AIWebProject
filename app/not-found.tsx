import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center py-24">
      <h1 className="font-serif text-6xl font-bold text-border mb-4">404</h1>
      <p className="text-lg text-muted mb-6">Bu sayfa bulunamadı.</p>
      <Link href="/" className="text-accent hover:underline">
        Ana sayfaya dön
      </Link>
    </div>
  )
}
