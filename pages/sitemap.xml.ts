import { GetServerSideProps } from 'next'
import { getPosts } from '@/lib/posts'
import { locales, defaultLocale } from '@/i18n'

interface SitemapUrl {
  loc: string
  lastmod?: string
  changefreq?: string
  priority?: number
}

function generateSitemap(urls: SitemapUrl[]): string {
  const urlsXml = urls
    .map((url) => {
      let xml = `    <url>
      <loc>${url.loc}</loc>`
      if (url.lastmod) {
        xml += `\n      <lastmod>${url.lastmod}</lastmod>`
      }
      if (url.changefreq) {
        xml += `\n      <changefreq>${url.changefreq}</changefreq>`
      }
      if (url.priority !== undefined) {
        xml += `\n      <priority>${url.priority}</priority>`
      }
      xml += `\n    </url>`
      return xml
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urlsXml}
</urlset>`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const urls: SitemapUrl[] = []
  const now = new Date().toISOString().split('T')[0]

  // 各言語のホームページとブログ一覧ページ
  for (const locale of locales) {
    urls.push({
      loc: `${baseUrl}/${locale}`,
      lastmod: now,
      changefreq: 'daily',
      priority: 1.0,
    })
    urls.push({
      loc: `${baseUrl}/${locale}/blog`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.9,
    })

    // 各言語の投稿ページ
    try {
      const posts = await getPosts(locale)
      for (const post of posts) {
        urls.push({
          loc: `${baseUrl}/${locale}/blog/${post.slug}`,
          lastmod: post.date ? new Date(post.date).toISOString().split('T')[0] : now,
          changefreq: 'monthly',
          priority: 0.8,
        })
      }
    } catch (error) {
      console.error(`Error loading posts for locale ${locale}:`, error)
    }
  }

  // ルートページ（デフォルトロケールにリダイレクト）
  urls.push({
    loc: baseUrl,
    lastmod: now,
    changefreq: 'daily',
    priority: 1.0,
  })

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
