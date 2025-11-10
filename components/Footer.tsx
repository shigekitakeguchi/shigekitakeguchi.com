import Link from 'next/link';
import LangSwitch from './LangSwitch';
import { Locale } from '@/types';

interface FooterProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function Footer({ locale, dict }: FooterProps) {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">街撮りch</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {dict['about.brief']}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href={`/${locale}/sitemap`}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
                >
                  {dict['footer.sitemap']}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/policy`}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
                >
                  {dict['footer.policy']}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-4">Language</h3>
            <LangSwitch currentLocale={locale} />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-200">
          <p className="text-sm text-neutral-500 text-center">{dict['footer.copyright']}</p>
        </div>
      </div>
    </footer>
  );
}



