import { Inter } from 'next/font/google';
import './globals.css';
import { Locale } from '@/types';

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale === 'ja' || locale === 'en') ? locale as Locale : 'ja';

  return (
    <html lang={validLocale}>
      <head>
        <link rel="alternate" hrefLang="ja" href="https://shigekitakeguchi.com/ja" />
        <link rel="alternate" hrefLang="en" href="https://shigekitakeguchi.com/en" />
        <link rel="alternate" hrefLang="x-default" href="https://shigekitakeguchi.com/ja" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

