import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { locales } from '@/i18n'

interface HomePageProps {
  posts: Awaited<ReturnType<typeof getPosts>>
  locale: string
}

export default function HomePage({ posts, locale }: HomePageProps) {
  const latestPosts = posts.slice(0, 5)

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const canonicalUrl = `${baseUrl}/${locale}`
  const siteTitle = locale === 'ja' ? 'Shigeki Takeguchi - ブログ' : 'Shigeki Takeguchi - Blog'
  const siteDescription =
    locale === 'ja'
      ? '日常の静寂と、日本の美しい街角を巡る映像日誌。'
      : 'A cinematic journey through the quiet beauty of Japan.'

  // 構造化データ（WebSite）
  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteTitle,
    description: siteDescription,
    url: baseUrl,
    publisher: {
      '@type': 'Person',
      name: 'Shigeki Takeguchi',
    },
  }

  // 構造化データ（Blog）
  const blogStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: siteTitle,
    description: siteDescription,
    url: `${baseUrl}/${locale}`,
    author: {
      '@type': 'Person',
      name: 'Shigeki Takeguchi',
    },
  }

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDescription} />
        <meta
          name="keywords"
          content={
            locale === 'ja'
              ? 'ブログ,街撮り,散歩,YouTube,映像日誌'
              : 'blog,walking,YouTube,cinematic,street'
          }
        />
        <meta name="author" content="Shigeki Takeguchi" />

        {/* Canonical URL */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Shigeki Takeguchi" />
        <meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:creator" content="@shigektakeguchi" />

        {/* hreflang */}
        {locales.map((loc) => (
          <link key={loc} rel="alternate" hrefLang={loc} href={`${baseUrl}/${loc}`} />
        ))}

        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogStructuredData) }}
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-4 text-4xl font-bold">
            {locale === 'ja' ? 'ブログへようこそ' : 'Welcome to My Blog'}
          </h1>
          <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
            {locale === 'ja'
              ? '日常の静寂と、日本の美しい街角を巡る映像日誌。'
              : 'A cinematic journey through the quiet beauty of Japan.'}
          </p>

          <section className="mb-12">
            <h2 className="mb-6 text-2xl font-semibold">
              {locale === 'ja' ? '最新の投稿' : 'Latest Posts'}
            </h2>
            <div className="space-y-6">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => <PostCard key={post.slug} post={post} locale={locale} />)
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  {locale === 'ja' ? '投稿が見つかりません' : 'No posts found'}
                </p>
              )}
            </div>
          </section>

          {posts.length > 5 && (
            <div className="text-center">
              <Link
                href={`/${locale}/blog`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
              >
                {locale === 'ja' ? 'すべての投稿を見る' : 'View All Posts'} →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: locales.map((locale) => ({ params: { locale } })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string

  if (!locale) {
    return {
      notFound: true,
    }
  }

  try {
    const posts = await getPosts(locale)
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`)
    const messagesContent = fs.readFileSync(messagesPath, 'utf8')
    const messages = JSON.parse(messagesContent)

    return {
      props: {
        posts,
        locale,
        messages,
      },
    }
  } catch (error) {
    console.error('Error loading posts or messages:', error)
    return {
      props: {
        posts: [],
        locale,
        messages: {},
      },
    }
  }
}
