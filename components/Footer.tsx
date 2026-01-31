import { useRouter } from 'next/router'

export default function Footer() {
  const router = useRouter()
  const locale = (router.query.locale as string) || 'en'

  return (
    <footer className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {locale === 'ja'
              ? '© 2024 ブログ. All rights reserved.'
              : '© 2024 Blog. All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  )
}

