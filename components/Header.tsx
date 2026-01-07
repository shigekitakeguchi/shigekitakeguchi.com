import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'

export default function Header() {
  const t = useTranslations('common')
  const router = useRouter()
  const locale = (router.query.locale as string) || 'en'
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 初期テーマの設定
    const isDarkMode = document.documentElement.classList.contains('dark')
    setIsDark(isDarkMode)
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ja' : 'en'
    const pathWithoutLocale = router.asPath.replace(`/${locale}`, '')
    router.push(`/${newLocale}${pathWithoutLocale}`)
  }

  return (
    <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            {locale === 'ja' ? 'ブログ' : 'Blog'}
          </Link>

          <nav className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {t('home')}
            </Link>
            <Link
              href={`/${locale}/blog`}
              className="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              {t('blog')}
            </Link>
            <button
              onClick={switchLocale}
              className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              {locale === 'en' ? '日本語' : 'English'}
            </button>
            <button
              onClick={toggleTheme}
              className="rounded px-3 py-1 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle dark mode"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}


