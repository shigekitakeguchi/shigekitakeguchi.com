import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import fs from 'fs'
import path from 'path'
import { locales } from '@/i18n'

interface AboutPageProps {
  locale: string
}

export default function AboutPage({ locale }: AboutPageProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://shigekitakeguchi.com'
  const canonicalUrl = `${baseUrl}/${locale}/about`
  const title = locale === 'ja' ? 'Shigeki Takeguchiについて' : 'About Shigeki Takeguchi'
  const description =
    locale === 'ja'
      ? '街撮りchの中のひとのブログ。街の風景や散歩動画について発信しています。'
      : 'Blog by Shigeki Takeguchi, sharing city walks and walking videos.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonicalUrl} />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold">
            {locale === 'ja' ? 'Shigeki Takeguchiについて' : 'About Shigeki Takeguchi'}
          </h1>
          <div className="mb-6">
            <img
              src="/images/profile.jpg"
              alt="Shigeki Takeguchi"
              className="mx-auto w-48 rounded-lg"
            />
          </div>
          <div>
            {locale === 'ja' ? (
              <>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  竹口 茂樹 | 映像作家・フォトグラファー
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  日本を拠点に活動する映像作家・フォトグラファー、竹口 茂樹（Shigeki Takeguchi）です。
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  私の創作活動の核は、光と影、そして日本の建築が交差する場所に宿る「目に見えない美しさ」を
                  捉えることにあります。街角の何気ない風景や、古い木造建築の軒先には、それぞれ語るべき物語が
                  あると信じています。それは歴史であり、職人技であり、静かに流れる時間の集積です。
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  プロジェクト「まちどり」について
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  私は、YouTubeチャンネル「まちどり（Machidori）」のクリエイターでもあります。このチャンネルは、
                  日本のノスタルジックな街並みを没入感たっぷりに記録した、シネマティックな映像日誌です。
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  目まぐるしく展開する一般的なトラベル動画とは異なり、私は「スロー」で瞑想的な体験を届けることを
                  目指しています。伝統的な建物の細かな意匠や、その街が持つ独特の空気感に焦点を当てることで、
                  まるで私の隣を一緒に歩いているかのような感覚を味わっていただけるはずです。
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  建築を愛する方、日本文化に惹かれる方、あるいはただ心の平穏を求めている方へ。私の切り取った
                  一瞬が、あなたのスクリーンに静かな安らぎをもたらすことを願っています。
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  ぜひ、親しみを込めて「Shigeki」と呼んでください。日本の隠れた美しさを、共に探求していきましょう。
                </p>
              </>
            ) : (
              <>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Shigeki Takeguchi | Filmmaker & Photographer
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  My name is Shigeki Takeguchi, a filmmaker and photographer based in Japan.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  My work is centered on capturing the &quot;unseen&quot; beauty found in the intersection
                  of light, shadow, and Japanese architecture. I believe that every street corner and
                  every old wooden eave has a story to tell—a story of history, craftsmanship, and
                  the quiet passage of time.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The &quot;Machidori&quot; Project
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  I am the creator of the YouTube channel &quot;Machidori,&quot; a cinematic visual journal
                  where I document immersive walks through the nostalgic streets of Japan.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Unlike fast-paced travel videos, my goal is to provide a &quot;slow&quot; and meditative
                  experience. By focusing on the intricate details of traditional buildings and the
                  unique atmosphere of local neighborhoods, I invite you to experience Japan as if
                  you were walking right there beside me.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Whether you are an architecture enthusiast, a Japanophile, or simply someone seeking
                  a moment of tranquility, I hope my frames bring a sense of peace to your screen.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Please feel free to call me Shigeki. Let&apos;s explore the hidden beauty of Japan together.
                </p>
              </>
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
    const messagesPath = path.join(process.cwd(), 'messages', `${locale}.json`)
    const messagesContent = fs.readFileSync(messagesPath, 'utf8')
    const messages = JSON.parse(messagesContent)

    return {
      props: {
        locale,
        messages,
      },
    }
  } catch (error) {
    console.error('Error loading messages:', error)
    return {
      props: {
        locale,
        messages: {},
      },
    }
  }
}
