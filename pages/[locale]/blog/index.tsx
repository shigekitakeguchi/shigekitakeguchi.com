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
  return (
    <>
      <Head>
        <title>{locale === 'ja' ? 'すべての投稿' : 'All Posts'} | {locale === 'ja' ? 'ブログ' : 'Blog'}</title>
        <meta name="description" content={locale === 'ja' ? 'すべてのブログ投稿一覧' : 'All blog posts'} />
      </Head>
      <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-bold">
          {locale === 'ja' ? 'すべての投稿' : 'All Posts'}
        </h1>
        <div className="space-y-6">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.slug} post={post} locale={locale} />
            ))
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


