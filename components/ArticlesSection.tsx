import Image from 'next/image';
import { Article, Locale } from '@/types';

interface ArticlesSectionProps {
  articles: Article[];
  locale: Locale;
  dict: Record<string, string>;
}

export default function ArticlesSection({ articles, locale, dict }: ArticlesSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-8">
        {dict['articles.title']}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => {
          const title = locale === 'ja' ? article.title_ja : article.title_en;
          const excerpt = locale === 'ja' ? article.excerpt_ja : article.excerpt_en;
          return (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5 bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400"
            >
              {article.thumbnail && (
                <div className="relative aspect-video">
                  <Image
                    src={article.thumbnail}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-base font-semibold text-neutral-900 mb-2 line-clamp-2">
                  {title}
                </h3>
                <p className="text-sm text-neutral-600 leading-relaxed line-clamp-3">
                  {excerpt}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}



