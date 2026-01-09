import { GetServerSideProps } from 'next'
import { getPosts } from '@/lib/posts'
import { locales, defaultLocale } from '@/i18n'

function generateSitemap(urls: string[]): string {
  const urlsXml = urls
    .map(
      (url) => `    <url>
      <loc>${url}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.8</priority>
    </url>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com'
  const urls: string[] = []

  // 各言語のホームページとブログ一覧ページ
  for (const locale of locales) {
    urls.push(`${baseUrl}/${locale}`)
    urls.push(`${baseUrl}/${locale}/blog`)

    // 各言語の投稿ページ
    try {
      const posts = await getPosts(locale)
      for (const post of posts) {
        urls.push(`${baseUrl}/${locale}/blog/${post.slug}`)
      }
    } catch (error) {
      console.error(`Error loading posts for locale ${locale}:`, error)
    }
  }

  // ルートページ（デフォルトロケールにリダイレクト）
  urls.push(`${baseUrl}`)

  const sitemap = generateSitemap(urls)

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}

// デフォルトエクスポートは不要（getServerSidePropsが使用される）
export default function Sitemap() {
  return null
}
