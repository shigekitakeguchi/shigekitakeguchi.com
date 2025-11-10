import type { Metadata } from 'next';
import { getDictionary } from '@/lib/i18n';
import { mockWalks, mockArticles, mockSeries } from '@/lib/data';
import { Locale } from '@/types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeaturedWalks from '@/components/FeaturedWalks';
import SeriesSection from '@/components/SeriesSection';
import ArticlesSection from '@/components/ArticlesSection';
import RegionsGrid from '@/components/RegionsGrid';
import AboutSection from '@/components/AboutSection';
import NewsletterSection from '@/components/NewsletterSection';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale === 'ja' || resolvedParams.locale === 'en') ? resolvedParams.locale as Locale : 'ja';
  const dict = await getDictionary(locale);

  const baseUrl = 'https://shigekitakeguchi.com';
  const title = locale === 'ja'
    ? '街撮りch - 日本のささやかな日常を静かに歩く'
    : 'Machidori Channel - Quiet Walks Through Japan';
  const description = dict['hero.sub'];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      siteName: locale === 'ja' ? '街撮りch' : 'Machidori Channel',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      alternateLocale: locale === 'ja' ? 'en_US' : 'ja_JP',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        ja: `${baseUrl}/ja`,
        en: `${baseUrl}/en`,
        'x-default': `${baseUrl}/ja`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const resolvedParams = await params;
  const locale = (resolvedParams.locale === 'ja' || resolvedParams.locale === 'en') ? resolvedParams.locale as Locale : 'ja';
  const dict = await getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <Hero locale={locale} dict={dict} />
        <FeaturedWalks walks={mockWalks} locale={locale} dict={dict} />
        <SeriesSection series={mockSeries} walks={mockWalks} locale={locale} dict={dict} />
        <ArticlesSection articles={mockArticles} locale={locale} dict={dict} />
        <RegionsGrid locale={locale} dict={dict} />
        <AboutSection locale={locale} dict={dict} />
        <NewsletterSection locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: locale === 'ja' ? '街撮りch' : 'Machidori Channel',
            url: `https://shigekitakeguchi.com/${locale}`,
            alternateName: locale === 'ja' ? 'Machidori Channel' : '街撮りch',
            description: dict['about.brief'],
            inLanguage: [locale === 'ja' ? 'ja-JP' : 'en-US', locale === 'ja' ? 'en-US' : 'ja-JP'],
          }),
        }}
      />
    </>
  );
}


