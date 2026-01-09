import type { AppProps } from 'next/app'
import { NextIntlClientProvider } from 'next-intl'
import { useRouter } from 'next/router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../styles/globals.css'
import { defaultLocale } from '@/i18n'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const messages = pageProps.messages || {}
  const locale = (pageProps.locale as string) || (router.query.locale as string) || defaultLocale
  
  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        <Footer />
      </div>
    </NextIntlClientProvider>
  )
}


