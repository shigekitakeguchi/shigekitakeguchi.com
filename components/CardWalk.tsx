import Image from 'next/image';
import { Walk, Locale } from '@/types';

interface CardWalkProps {
  walk: Walk;
  locale: Locale;
}

export default function CardWalk({ walk, locale }: CardWalkProps) {
  const title = locale === 'ja' ? walk.title_ja : walk.title_en;
  const regionNames: Record<string, { ja: string; en: string }> = {
    Hokkaido: { ja: '北海道', en: 'Hokkaido' },
    Tohoku: { ja: '東北', en: 'Tohoku' },
    Kanto: { ja: '関東', en: 'Kanto' },
    Chubu: { ja: '中部', en: 'Chubu' },
    Kinki: { ja: '近畿', en: 'Kinki' },
    Chugoku: { ja: '中国', en: 'Chugoku' },
    Shikoku: { ja: '四国', en: 'Shikoku' },
    Kyushu: { ja: '九州', en: 'Kyushu' },
  };
  const regionName = regionNames[walk.region]?.[locale] || walk.region;
  const timeLabel = walk.time === 'Day' ? (locale === 'ja' ? '昼' : 'Day') : (locale === 'ja' ? '夜' : 'Night');

  return (
    <div className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white">
      <div className="relative aspect-video">
        <Image
          src={walk.thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-center justify-center">
          <a
            href={`https://youtube.com/watch?v=${walk.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-0 hover:opacity-100 transition-opacity bg-red-600 text-white rounded-full p-4 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
            aria-label={`Play ${title}`}
          >
            <svg
              className="w-12 h-12"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </a>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
            {regionName}
          </span>
          <span className="text-xs font-medium text-neutral-600 bg-neutral-100 px-2 py-1 rounded">
            {timeLabel}
          </span>
        </div>
        <h3 className="text-base font-semibold text-neutral-900 line-clamp-2">
          {title}
        </h3>
      </div>
    </div>
  );
}



