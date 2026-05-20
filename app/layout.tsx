import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Vektörel Bakışı — AI ve Teknoloji Haberleri',
    template: '%s | Vektörel Bakışı',
  },
  description:
    'Mühendis okur için AI ve teknoloji haberleri. Hype değil, analiz.',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: SITE_URL,
    siteName: 'Vektörel Bakışı',
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: SITE_URL,
    types: {
      'application/rss+xml': `${SITE_URL}/rss.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 w-full max-w-4xl mx-auto px-4 md:px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
