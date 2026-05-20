import { Feed } from 'feed'
import { getAllPosts } from './posts'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vektorelbakisi.com'

export function generateRssFeed(): string {
  const posts = getAllPosts()

  const feed = new Feed({
    title: 'Vektörel Bakışı',
    description: 'Mühendis okur için AI ve teknoloji haberleri',
    id: SITE_URL,
    link: SITE_URL,
    language: 'tr',
    copyright: `Vektörel Bakışı ${new Date().getFullYear()}`,
    author: {
      name: 'Vektör',
      link: SITE_URL,
    },
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${SITE_URL}/yazi/${post.slug}`,
      link: `${SITE_URL}/yazi/${post.slug}`,
      description: post.summary,
      date: new Date(post.date),
      category: [{ name: post.category }],
      author: [{ name: post.author }],
    })
  })

  return feed.rss2()
}
