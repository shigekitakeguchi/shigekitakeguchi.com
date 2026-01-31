import Link from 'next/link'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import enUS from 'date-fns/locale/en-US'
import Image from './Image'
import { PostData } from '@/lib/posts'

interface PostCardProps {
  post: PostData
  locale: string
}

export default function PostCard({ post, locale }: PostCardProps) {
  const dateLocale = locale === 'ja' ? ja : enUS
  const formattedDate = format(new Date(post.date), 'PPP', { locale: dateLocale })

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      {post.image && (
        <Link href={`/${locale}/blog/${post.slug}`} className="mb-4 block">
          <Image
            src={post.image}
            alt={post.title}
            width={600}
            height={338}
            className="mb-4 h-48 w-full rounded-lg object-cover"
            priority={false}
          />
        </Link>
      )}
      <h2 className="mb-2 text-2xl font-bold">
        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="text-gray-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
        >
          {post.title}
        </Link>
      </h2>
      <div className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        <time dateTime={post.date}>{formattedDate}</time>
      </div>
      {post.excerpt && (
        <p className="mb-4 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
      )}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
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
    </article>
  )
}
