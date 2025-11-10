'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Locale } from '@/types';

interface LangSwitchProps {
  currentLocale: Locale;
}

export default function LangSwitch({ currentLocale }: LangSwitchProps) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('ja')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 ${
          currentLocale === 'ja'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
        aria-label="日本語に切り替え"
      >
        日本語
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 ${
          currentLocale === 'en'
            ? 'bg-neutral-900 text-white'
            : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
        }`}
        aria-label="Switch to English"
      >
        English
      </button>
    </div>
  );
}



