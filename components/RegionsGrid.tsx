import Link from 'next/link';
import { Locale } from '@/types';

interface RegionsGridProps {
  locale: Locale;
  dict: Record<string, string>;
}

const regions = [
  { id: 'hokkaido', ja: '北海道', en: 'Hokkaido' },
  { id: 'tohoku', ja: '東北', en: 'Tohoku' },
  { id: 'kanto', ja: '関東', en: 'Kanto' },
  { id: 'chubu', ja: '中部', en: 'Chubu' },
  { id: 'kinki', ja: '近畿', en: 'Kinki' },
  { id: 'chugoku', ja: '中国', en: 'Chugoku' },
  { id: 'shikoku', ja: '四国', en: 'Shikoku' },
  { id: 'kyushu', ja: '九州', en: 'Kyushu' },
];

export default function RegionsGrid({ locale, dict }: RegionsGridProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
        {dict['regions.title']}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {regions.map((region) => {
          const name = locale === 'ja' ? region.ja : region.en;
          return (
            <Link
              key={region.id}
              href={`/${locale}/walks?region=${region.id}`}
              className="aspect-video rounded-2xl ring-1 ring-black/10 bg-gradient-to-br from-neutral-50 to-neutral-100 hover:from-neutral-100 hover:to-neutral-200 transition-all hover:shadow-md flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400"
            >
              <span className="text-lg font-semibold text-neutral-900">{name}</span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}



