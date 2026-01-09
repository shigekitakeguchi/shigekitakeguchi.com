import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ja" className="scroll-smooth">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}


