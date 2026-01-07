import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'content')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  tags?: string[]
}

export async function getPosts(locale: string): Promise<PostData[]> {
  const localeDir = path.join(postsDirectory, locale)
  
  if (!fs.existsSync(localeDir)) {
    return []
  }

  const fileNames = fs.readdirSync(localeDir)
  const allPostsData = await Promise.all(
    fileNames
      .filter((name) => name.endsWith('.md'))
      .map(async (fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = path.join(localeDir, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data, content } = matter(fileContents)

        const processedContent = await remark().use(html).process(content)
        const contentHtml = processedContent.toString()

        return {
          slug,
          title: data.title || '',
          date: data.date || '',
          excerpt: data.excerpt || '',
          content: contentHtml,
          tags: data.tags || [],
        } as PostData
      })
  )

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPost(
  slug: string,
  locale: string
): Promise<PostData | null> {
  const localeDir = path.join(postsDirectory, locale)
  const fullPath = path.join(localeDir, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const processedContent = await remark().use(html).process(content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    content: contentHtml,
    tags: data.tags || [],
  } as PostData
}


