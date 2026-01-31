import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

const postsDirectory = path.join(process.cwd(), 'content')

export interface PostData {
  slug: string
  title: string
  date: string
  excerpt?: string
  content: string
  tags?: string[]
  image?: string
}

/**
 * Markdown本文から最初の画像のパスを抽出する
 */
function extractFirstImage(content: string): string | undefined {
  // Markdown形式の画像: ![alt](/path/to/image.jpg "title")
  // 括弧内の最初のスペースまたは引用符までの部分を取得
  const markdownImageRegex = /!\[.*?\]\(([^")\s]+(?:\s+"[^"]*")?)\)/g
  const markdownMatch = markdownImageRegex.exec(content)
  if (markdownMatch && markdownMatch[1]) {
    const imagePath = markdownMatch[1].trim()
    const pathOnly = imagePath.split(/\s+/)[0]
    return pathOnly.replace(/^["']|["']$/g, '')
  }

  // HTML形式の画像: <img src="/path/to/image.jpg" ...>
  const htmlImageRegex = /<img[^>]+src=["']([^"']+)["'][^>]*>/i
  const htmlMatch = content.match(htmlImageRegex)
  if (htmlMatch && htmlMatch[1]) {
    return htmlMatch[1]
  }

  return undefined
}

/**
 * 再帰的にMarkdownファイルを検索する
 */
function getAllMarkdownFiles(
  dir: string,
  baseDir: string,
  fileList: string[] = []
): string[] {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      getAllMarkdownFiles(filePath, baseDir, fileList)
    } else if (file.endsWith('.md')) {
      const relativePath = path.relative(baseDir, filePath)
      fileList.push(relativePath)
    }
  })

  return fileList
}

export async function getPosts(locale: string): Promise<PostData[]> {
  const localeDir = path.join(postsDirectory, locale)

  if (!fs.existsSync(localeDir)) {
    return []
  }

  // 再帰的にすべてのMarkdownファイルを取得
  const filePaths = getAllMarkdownFiles(localeDir, localeDir)

  const allPostsData = await Promise.all(
    filePaths.map(async (filePath) => {
      // slugは相対パスから拡張子を除いたもの（スラッシュ区切り）
      const slug = filePath.replace(/\.md$/, '').replace(/\\/g, '/')
      const fullPath = path.join(localeDir, filePath)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data, content } = matter(fileContents)

      // published: falseの場合は除外（publishedフィールドがない場合は表示）
      if (data.published === false) {
        return null
      }

      const processedContent = await remark()
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeStringify, { allowDangerousHtml: true })
        .process(content)
      const contentHtml = String(processedContent)

      // dateを文字列に変換（Dateオブジェクトの場合はISO文字列に変換）
      let dateString = ''
      if (data.date) {
        if (data.date instanceof Date) {
          dateString = data.date.toISOString()
        } else if (typeof data.date === 'string') {
          dateString = data.date
        } else {
          dateString = String(data.date)
        }
      }

      // 画像を抽出（frontmatterのimageフィールドがあれば優先、なければ本文から抽出）
      // undefinedの場合はnullに変換してJSONシリアライズ可能にする
      const image = data.image || extractFirstImage(content) || null

      return {
        slug,
        title: data.title || '',
        date: dateString,
        excerpt: data.excerpt || '',
        content: contentHtml,
        tags: data.tags || [],
        image,
      } as PostData
    })
  )

  const filteredPosts = allPostsData.filter((post): post is PostData => post !== null)

  return filteredPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPost(slug: string, locale: string): Promise<PostData | null> {
  const localeDir = path.join(postsDirectory, locale)
  // slugはスラッシュ区切りなので、そのままパスとして使用
  const fullPath = path.join(localeDir, `${slug}.md`)

  if (!fs.existsSync(fullPath)) {
    return null
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // published: falseの場合はnullを返す（publishedフィールドがない場合は表示）
  if (data.published === false) {
    return null
  }

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content)
  const contentHtml = String(processedContent)

  // dateを文字列に変換（Dateオブジェクトの場合はISO文字列に変換）
  let dateString = ''
  if (data.date) {
    if (data.date instanceof Date) {
      dateString = data.date.toISOString()
    } else if (typeof data.date === 'string') {
      dateString = data.date
    } else {
      dateString = String(data.date)
    }
  }

  // 画像を抽出（frontmatterのimageフィールドがあれば優先、なければ本文から抽出）
  // undefinedの場合はnullに変換してJSONシリアライズ可能にする
  const image = data.image || extractFirstImage(content) || null

  return {
    slug,
    title: data.title || '',
    date: dateString,
    excerpt: data.excerpt || '',
    content: contentHtml,
    tags: data.tags || [],
    image,
  } as PostData
}
