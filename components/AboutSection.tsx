import { Locale } from '@/types';

interface AboutSectionProps {
  locale: Locale;
  dict: Record<string, string>;
}

export default function AboutSection({ locale, dict }: AboutSectionProps) {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 mb-6">
          {dict['about.title']}
        </h2>
        <p className="text-base leading-relaxed text-neutral-700 dark:text-neutral-300 mb-8">
          {dict['about.brief']}
        </p>
        <div className="flex gap-4">
          <a
            href="https://youtube.com/@example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            aria-label="YouTube"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </a>
          <a
            href="https://x.com/@example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
          <a
            href="https://instagram.com/@example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
          <a
            href="https://threads.net/@example"
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-600 hover:text-neutral-900 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-neutral-400 rounded"
            aria-label="Threads"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.186 8.072c-2.14-.092-3.956 1.794-3.956 3.956v.128c0 2.185 1.769 3.956 3.956 3.956s3.956-1.771 3.956-3.956v-.128c0-1.127-.785-2.14-1.813-2.64v3.356c0 .562-.458 1.02-1.02 1.02-.562 0-1.02-.458-1.02-1.02V4.586c0-.562.458-1.02 1.02-1.02h3.956c.562 0 1.02.458 1.02 1.02 0 .562-.458 1.02-1.02 1.02h-1.795c1.028.5 1.813 1.513 1.813 2.64v.128c0 3.297-2.67 5.996-5.996 5.996S6.01 15.453 6.01 12.156v-.128c0-3.297 2.67-5.996 5.996-5.996.562 0 1.02.458 1.02 1.02 0 .562-.458 1.02-1.02 1.02z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}



