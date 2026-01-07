import Link from 'next/link'
import { format } from 'date-fns'
import { enUS, ja } from 'date-fns/locale'

interface Post {
  slug: string
  title: string
  date: string
  excerpt?: string
  tags?: string[]
}

interface PostCardProps {
  post: Post
  locale: string
}

export default function PostCard({ post, locale }: PostCardProps) {
  const dateLocale = locale === 'ja' ? ja : enUS
  const formattedDate = format(new Date(post.date), 'PPP', { locale: dateLocale })

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <Link href={`/${locale}/blog/${post.slug}`}>
        <h2 className="mb-2 text-2xl font-semibold text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
          {post.title}
        </h2>
      </Link>
      <time
        dateTime={post.date}
        className="mb-3 block text-sm text-gray-600 dark:text-gray-400"
      >
        {formattedDate}
      </time>
      {post.excerpt && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700 dark:bg-gray-700 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <Link
        href={`/${locale}/blog/${post.slug}`}
        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
      >
        {locale === 'ja' ? '続きを読む' : 'Read more'} →
      </Link>
    </article>
  )
}


