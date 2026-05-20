import { generateSitemap } from '@/lib/sitemap'

export async function GET() {
  const sitemap = generateSitemap()
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
