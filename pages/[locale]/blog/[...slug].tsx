import { GetStaticProps, GetStaticPaths } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { getPost, getPosts } from '@/lib/posts'
import { format } from 'date-fns'
import { enUS, ja } from 'date-fns/locale'
import { locales } from '@/i18n'

interface PostPageProps {
  post: Awaited<ReturnType<typeof getPost>>
  nextPost: Awaited<ReturnType<typeof getPost>> | null
  prevPost: Awaited<ReturnType<typeof getPost>> | null
  locale: string
}

export default function PostPage({ post, nextPost, prevPost, locale }: PostPageProps) {
  const router = useRouter()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  const dateLocale = locale === 'ja' ? ja : enUS
  const formattedDate = format(new Date(post.date), 'PPP', { locale: dateLocale })
  
  // SEO用のURLとメタ情報
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const canonicalUrl = `${baseUrl}/${locale}/blog/${post.slug}`
  const ogImage = post.image ? `${baseUrl}${post.image}` : `${baseUrl}/images/og-default.jpg`
  
  // 構造化データ（JSON-LD）
  const structuredData = {
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
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    keywords: post.tags?.join(', '),
  }

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
        <title>{post.title} | {locale === 'ja' ? 'ブログ' : 'Blog'}</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta name="keywords" content={post.tags?.join(', ') || ''} />
        <meta name="author" content="Shigeki Takeguchi" />
        
        {/* Canonical URL */}
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
        
        {/* 構造化データ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
          <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href={`/${locale}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {locale === 'ja' ? 'ホーム' : 'Home'}
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href={`/${locale}/blog`} className="hover:text-blue-600 dark:hover:text-blue-400">
                {locale === 'ja' ? 'ブログ' : 'Blog'}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-gray-100" aria-current="page">
              {post.title}
            </li>
          </ol>
        </nav>
        
        <header className="mb-8">
          <Link
            href={`/${locale}/blog`}
            className="mb-4 inline-block text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
          >
            ← {locale === 'ja' ? 'ブログに戻る' : 'Back to Blog'}
          </Link>
          <h1 className="mb-4 text-4xl font-bold">{post.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={post.date}>{formattedDate}</time>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-gray-200 px-2 py-1 text-xs dark:bg-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <nav className="mt-12 flex justify-between border-t border-gray-200 pt-8 dark:border-gray-700">
          {prevPost ? (
            <Link
              href={`/${locale}/blog/${prevPost.slug}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
            >
              ← {prevPost.title}
            </Link>
          ) : (
            <div />
          )}
          {nextPost && (
            <Link
              href={`/${locale}/blog/${nextPost.slug}`}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
            >
              {nextPost.title} →
            </Link>
          )}
        </nav>
      </article>
    </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allParams = []
  for (const locale of locales) {
    const posts = await getPosts(locale)
    for (const post of posts) {
      // slugがスラッシュを含む場合は配列に分割
      const slugArray = post.slug.split('/')
      allParams.push({
        params: {
          locale,
          slug: slugArray,
        },
      })
    }
  }

  return {
    paths: allParams,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const locale = params?.locale as string
  // slugは配列なので、結合して文字列に変換
  const slugArray = params?.slug as string[]
  const slug = Array.isArray(slugArray) ? slugArray.join('/') : slugArray

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

  if (!locale) {
    return {
      notFound: true,
    }
  }

  try {
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
    console.error('Error loading messages:', error)
    return {
      props: {
        post,
        nextPost,
        prevPost,
        locale,
        messages: {},
      },
    }
  }
}
