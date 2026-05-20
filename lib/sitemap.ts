import { getAllPosts } from './posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'

export function generateSitemap(): string {
  const posts = getAllPosts()

  const staticPages = ['', '/hakkinda', '/kategoriler', '/etiketler']
  const staticEntries = staticPages
    .map(
      (p) => `
  <url>
    <loc>${SITE_URL}${p}</loc>
    <changefreq>weekly</changefreq>
    <priority>${p === '' ? '1.0' : '0.8'}</priority>
  </url>`
    )
    .join('')

  const postEntries = posts
    .map(
      (post) => `
  <url>
    <loc>${SITE_URL}/yazi/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString().split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticEntries}
${postEntries}
</urlset>`
}
