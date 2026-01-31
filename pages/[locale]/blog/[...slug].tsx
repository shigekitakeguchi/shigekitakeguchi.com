import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import enUS from 'date-fns/locale/en-US'
import fs from 'fs'
import path from 'path'
import { getPost, getPosts, PostData } from '@/lib/posts'
import Disqus from '@/components/Disqus'
import { locales } from '@/i18n'

interface PostPageProps {
  post: PostData
  nextPost: PostData | null
  prevPost: PostData | null
  locale: string
}

export default function PostPage({ post, nextPost, prevPost, locale }: PostPageProps) {
  const dateLocale = locale === 'ja' ? ja : enUS
  const formattedDate = format(new Date(post.date), 'PPP', { locale: dateLocale })

  // SEO用のURLとメタ情報
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const canonicalUrl = `${baseUrl}/${locale}/blog/${post.slug}`
  const ogImage = post.image
    ? `${baseUrl}${post.image}`
    : `${baseUrl}/images/og-default.jpg`

  // 構造化データ（JSON-LD）
  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt || post.title,
    image: post.image ? `${baseUrl}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: 'Shigeki Takeguchi',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Shigeki Takeguchi',
      url: baseUrl,
    },
  }

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
        name: locale === 'ja' ? 'ブログ' : 'Blog',
        item: `${baseUrl}/${locale}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  }

  return (
    <>
      <Head>
        <title>{`${post.title} | ${locale === 'ja' ? 'ブログ' : 'Blog'}`}</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta
          name="keywords"
          content={post.tags?.join(', ') || (locale === 'ja' ? 'ブログ,記事' : 'blog,article')}
        />
        <meta name="author" content="Shigeki Takeguchi" />

        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Shigeki Takeguchi" />
        <meta property="og:locale" content={locale === 'ja' ? 'ja_JP' : 'en_US'} />
        <meta property="article:published_time" content={post.date} />
        <meta property="article:author" content="Shigeki Takeguchi" />
        {post.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:creator" content="@shigektakeguchi" />

        {/* hreflang - 多言語対応 */}
        {locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`${baseUrl}/${loc}/blog/${post.slug}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/ja/blog/${post.slug}`} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbStructuredData) }}
        />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <article className="mx-auto max-w-3xl">
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
              <li className="flex items-center">
                <Link
                  href={`/${locale}/blog`}
                  className="hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {locale === 'ja' ? 'ブログ' : 'Blog'}
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center">/</li>
              <li
                className="flex items-center truncate text-gray-900 dark:text-gray-100"
                aria-current="page"
              >
                {post.title}
              </li>
            </ol>
          </nav>

          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>

          <div className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* 前後の記事へのリンク */}
          <nav className="mt-12 flex justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
            {prevPost ? (
              <Link
                href={`/${locale}/blog}/${prevPost.slug}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
              >
                ← {prevPost.title}
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link
                href={`/${locale}/blog/${nextPost.slug}`}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
              >
                {nextPost.title} →
              </Link>
            ) : (
              <div />
            )}
          </nav>

          {/* Disqusコメント */}
          <div className="mt-12">
            <Disqus
              identifier={post.slug}
              title={post.title}
              url={canonicalUrl}
            />
          </div>
        </article>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts: { locale: string; slug: string }[] = []

  for (const locale of locales) {
    const posts = await getPosts(locale)
    for (const post of posts) {
      allPosts.push({ locale, slug: post.slug })
    }
  }

  return {
    paths: allPosts.map(({ locale, slug }) => ({
      params: { locale, slug: slug.split('/') },
    })),
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string
  const slugArray = params?.slug as string[]
  const slug = slugArray ? slugArray.join('/') : ''

  if (!locale || !slug) {
    return {
      notFound: true,
    }
  }

  try {
    const post = await getPost(slug, locale)

    if (!post) {
      return {
        notFound: true,
      }
    }

    const allPosts = await getPosts(locale)
    const currentIndex = allPosts.findIndex((p) => p.slug === slug)
    const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null
    const prevPost =
      currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null

    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`)
    const messagesContent = fs.readFileSync(messagesPath, 'utf8')
    const messages = JSON.parse(messagesContent)

    return {
      props: {
        post,
        nextPost,
        prevPost,
        locale,
        messages,
      },
    }
  } catch (error) {
    console.error('Error loading post:', error)
    return {
      notFound: true,
    }
  }
}
