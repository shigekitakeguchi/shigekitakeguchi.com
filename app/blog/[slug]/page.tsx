import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts'
import Link from 'next/link'
import styles from './page.module.css'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPost({ params }: PageProps) {
  const post = getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href="/" className={styles.backLink}>
          ← ホームに戻る
        </Link>
        <h1 className={styles.title}>{post.title}</h1>
        <time className={styles.date}>
          {new Date(post.date).toLocaleDateString('ja-JP')}
        </time>
      </header>

      <main className={styles.main}>
        <article 
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
    </div>
  )
}

