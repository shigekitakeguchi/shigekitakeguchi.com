import { Series, Walk, Locale } from '@/types';
import CardWalk from './CardWalk';

interface SeriesSectionProps {
  series: Series[];
  walks: Walk[];
  locale: Locale;
  dict: Record<string, string>;
}

export default function SeriesSection({ series, walks, locale, dict }: SeriesSectionProps) {
  const getSeriesWalks = (seriesItem: Series) => {
    return walks.filter((walk) => seriesItem.walkIds.includes(walk.id));
  };

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
        {dict['series.title']}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {series.map((seriesItem) => {
          const seriesWalks = getSeriesWalks(seriesItem);
          const title = locale === 'ja' ? seriesItem.title_ja : seriesItem.title_en;
          return (
            <div key={seriesItem.id} className="space-y-4">
              <h3 className="text-xl font-semibold text-neutral-900">{title}</h3>
              <div className="grid grid-cols-1 gap-4">
                {seriesWalks.length > 0 ? (
                  seriesWalks.map((walk) => (
                    <CardWalk key={walk.id} walk={walk} locale={locale} />
                  ))
                ) : (
                  <div className="text-neutral-500 text-sm">
                    {locale === 'ja' ? '動画がありません' : 'No videos available'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}



