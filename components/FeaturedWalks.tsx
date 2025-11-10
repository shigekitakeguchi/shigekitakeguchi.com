import { Walk, Locale } from '@/types';
import CardWalk from './CardWalk';

interface FeaturedWalksProps {
  walks: Walk[];
  locale: Locale;
  dict: Record<string, string>;
}

export default function FeaturedWalks({ walks, locale, dict }: FeaturedWalksProps) {
  const featuredWalks = walks.filter((walk) => walk.featured).slice(0, 3);

  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
        {dict['featured.title']}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredWalks.map((walk) => (
          <CardWalk key={walk.id} walk={walk} locale={locale} />
        ))}
      </div>
    </section>
  );
}



