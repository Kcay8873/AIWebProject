export const dynamic = 'force-static'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'

export async function GET() {
  const content = `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
