import Link from 'next/link';
import LangSwitch from './LangSwitch';
import { Locale } from '@/types';

interface HeaderProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function Header({ locale, dict }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-neutral-900 hover:text-neutral-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
          >
            街撮りch
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={`/${locale}/walks`}
              className="text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            >
              {dict['nav.walks']}
            </Link>
            <Link
              href={`/${locale}/articles`}
              className="text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            >
              {dict['nav.articles']}
            </Link>
            <Link
              href={`/${locale}/about`}
              className="text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            >
              {dict['nav.about']}
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="text-neutral-700 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            >
              {dict['nav.contact']}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <LangSwitch currentLocale={locale} />
            <a
              href="https://youtube.com/@example"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
            >
              {dict['cta.watchYouTube']}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}



