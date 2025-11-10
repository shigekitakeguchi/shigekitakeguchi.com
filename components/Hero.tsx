import Image from 'next/image';
import Link from 'next/link';
import { Locale } from '@/types';

interface HeroProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-8 md:p-12">
          <div className="space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900">
              {dict['hero.title']}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-neutral-700">
              {dict['hero.sub']}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${locale}/walks`}
                className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400"
              >
                {dict['cta.latest']}
              </Link>
              <a
                href="https://medium.com/@example"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white text-neutral-900 border border-neutral-300 rounded-lg font-medium hover:bg-neutral-50 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400"
              >
                {dict['cta.medium']}
              </a>
              <a
                href="https://youtube.com/@example"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-red-500"
              >
                {dict['cta.youtube']}
              </a>
            </div>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-md">
            <Image
              src="https://via.placeholder.com/1400x788"
              alt={dict['hero.title']}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}



