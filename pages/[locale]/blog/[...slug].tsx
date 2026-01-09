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

  return (
    <>
      <Head>
        <title>{post.title} | {locale === 'ja' ? 'ブログ' : 'Blog'}</title>
        <meta name="description" content={post.excerpt || post.title} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt || post.title} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt || post.title} />
      </Head>
      <div className="container mx-auto px-4 py-8">
      <article className="mx-auto max-w-3xl">
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
