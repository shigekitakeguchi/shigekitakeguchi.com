import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link'
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
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const allParams = []
  for (const locale of locales) {
    const posts = await getPosts(locale)
    for (const post of posts) {
      allParams.push({
        params: {
          locale,
          slug: post.slug,
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
  const slug = params?.slug as string

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

  const messages = (await import(`@/messages/${locale}.json`)).default

  return {
    props: {
      post,
      nextPost,
      prevPost,
      locale,
      messages,
    },
  }
}

