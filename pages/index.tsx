import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { defaultLocale, locales } from '@/i18n'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // デフォルトロケールにリダイレクト
    router.replace(`/${defaultLocale}`)
  }, [router])

  return null
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: `/${defaultLocale}`,
      permanent: false,
    },
  }
}

