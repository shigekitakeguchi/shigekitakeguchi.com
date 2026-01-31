import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { locales } from '@/i18n'

interface BlogPageProps {
  posts: Awaited<ReturnType<typeof getPosts>>
  locale: string
}

export default function BlogPage({ posts, locale }: BlogPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const canonicalUrl = `${baseUrl}/${locale}/blog`
  const pageTitle = locale === 'ja' ? 'すべての投稿' : 'All Posts'
  const pageDescription =
    locale === 'ja'
      ? 'すべてのブログ投稿一覧。街撮りchの中のひとのブログ。'
      : 'All blog posts. Blog by Shigeki Takeguchi.'

  // パンくずリストの構造化データ
  const breadcrumbStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: locale === 'ja' ? 'ホーム' : 'Home',
        item: `${baseUrl}/${locale}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: locale === 'ja' ? 'すべての投稿' : 'All Posts',
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{`${pageTitle} | ${locale === 'ja' ? 'ブログ' : 'Blog'}`}</title>
        <meta name="description" content={pageDescription} />
        <meta
          name="keywords"
          content={locale === 'ja' ? 'ブログ,投稿一覧,街撮り' : 'blog,posts,walking'}
        />

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={`${pageTitle} | ${locale === 'ja' ? 'ブログ' : 'Blog'}`}
        />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Shigeki Takeguchi" />
        <meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${pageTitle} | ${locale === 'ja' ? 'ブログ' : 'Blog'}`}
        />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:creator" content="@shigektakeguchi" />

        {/* hreflang - 多言語対応 */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${baseUrl}/${loc}/blog`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ja/blog`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          {/* パンくずリスト */}
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center">
                <Link
                  href={`/${locale}`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {locale === 'ja' ? 'ホーム' : 'Home'}
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">/</li>
              <li className="flex items-center text-gray-900 dark:text-gray-100" aria-current="page">
                {locale === 'ja' ? 'すべての投稿' : 'All Posts'}
              </li>
            </ol>
          </nav>

          <h1 className="mb-8 text-4xl font-bold">
            {locale === 'ja' ? 'すべての投稿' : 'All Posts'}
          </h1>

          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => <PostCard key={post.slug} post={post} locale={locale} />)
            ) : (
              <p className="text-gray-600 dark:text-gray-400">
                {locale === 'ja' ? '投稿が見つかりません' : 'No posts found'}
              </p>
            )}
          </div>
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
