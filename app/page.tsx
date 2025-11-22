import Link from 'next/link'
import { getAllPosts } from '@/lib/posts'
import styles from './page.module.css'

export default async function Home() {
  const posts = getAllPosts()

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shigeki Takeguchi</h1>
        <p className={styles.description}>Personal Blog</p>
      </header>

      <main className={styles.main}>
        <section className={styles.posts}>
          <h2 className={styles.sectionTitle}>Latest Posts</h2>
          <div className={styles.postList}>
            {posts.map((post) => (
              <article key={post.slug} className={styles.postCard}>
                <Link href={`/blog/${post.slug}`} className={styles.postLink}>
                  <h3 className={styles.postTitle}>{post.title}</h3>
                  <p className={styles.postExcerpt}>{post.excerpt}</p>
                  <time className={styles.postDate}>
                    {new Date(post.date).toLocaleDateString('ja-JP')}
                  </time>
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

