import { GetStaticProps, GetStaticPaths } from 'next'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { getPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import { locales } from '@/i18n'

interface HomePageProps {
  posts: Awaited<ReturnType<typeof getPosts>>
  locale: string
}

export default function HomePage({ posts, locale }: HomePageProps) {
  const t = useTranslations('common')
  const latestPosts = posts.slice(0, 5)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-bold">
          {locale === 'ja' ? 'ブログへようこそ' : 'Welcome to My Blog'}
        </h1>
        <p className="mb-8 text-xl text-gray-600 dark:text-gray-400">
          {locale === 'ja'
            ? 'Next.jsとTailwind CSSで構築されたブログ'
            : 'A blog built with Next.js and Tailwind CSS'}
        </p>

        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-semibold">
            {locale === 'ja' ? '最新の投稿' : 'Latest Posts'}
          </h2>
          <div className="space-y-6">
            {latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <PostCard key={post.slug} post={post} locale={locale} />
              ))
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
  const posts = await getPosts(locale)
  const messages = (await import(`@/messages/${locale}.json`)).default

  return {
    props: {
      posts,
      locale,
      messages,
    },
  }
}

