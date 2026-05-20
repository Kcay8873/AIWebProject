export type PostCategory =
  | 'model-haberleri'
  | 'arastirma'
  | 'sektor'
  | 'urun'
  | 'politika'
  | 'opensource'
  | 'donanim'

export type PostStatus = 'draft' | 'review' | 'published'

export interface PostSource {
  title: string
  url: string
}

export interface PostFrontmatter {
  title: string
  slug: string
  date: string
  author: string
  category: PostCategory
  tags: string[]
  summary: string
  sources: PostSource[]
  coverImage?: string
  status: PostStatus
}

export interface Post extends PostFrontmatter {
  content: string
  readingTime: number
  filePath: string
}
